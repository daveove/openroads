var _ = require('lodash');
var knex = require('knex')({
  client: 'pg',
  connection: sails.config.connections.osmPostgreSQL.url,
  debug: false
});
var Promise = require('bluebird');

var newOldEntity = {
  node: function(n) {
    var node = _.clone(n.attributes);
    node.node_id = n.id;
    return node;
  },
  way: function(w) {
    var way = _.clone(w.attributes);
    way.way_id = w.id;
    return way;
  },
  node_tag: function(nt) {
    var nodeTag = _.clone(nt.attributes);
    nodeTag.node_id = wt.id;
  },
  way_tag: function(wt) {
    var wayTag = _.clone(wt.attributes);
    wayTag.way_id = wt.id
    return wayTag;
  },
  way_node: function(wn) {
    var wayNode = _.clone(wn.attributes);
    wayNode.version = wn.version;
    return wayNode;
  }
};

module.exports = {

  create: function(req, res) {

    // Check if User exists; if not, create user.
    var userName = req.body.user;
    var userID = parseInt(req.body.uid, 10);

    // Create user attributes now, to have more fine-grained control
    // in case of errors.
    var userAttributes = {
      display_name: userName || 'Openroads User',
      creation_time: new Date()
    }

    if (userID && !isNaN(userID)) {
      userAttributes.id = userID;
    }

    Users.findOrCreate({ id: userID }, {
      id: userID,
      display_name: userName,
      creation_time: new Date()
    }, function(err, user) {
      if (err) {
        sails.log.debug(err);
        return res.badRequest('Encountered error creating or finding user');
      }
      // Fill an object with changeset attributes
      var created = new Date();
      var closed = new Date();
      closed.setHours(created.getHours() + 1);
      var changesetAttributes = {
        user_id: userID,
        created_at: created,
        closed_at: closed,
        num_changes: 0
      }

      // If there's no changeset comment, use the ORM to save the changeset.
      // If there is a comment, enter a transaction block to save both.
      var changesetComment = req.body.comment;
      if (!changesetComment) {
        Changesets.create(changesetAttributes, function createChangeset(err, changeset) {
          if (err) {
            sails.log(err);
            return res.badRequest('Encountered error creating a new changeset');
          }
          return res.json({id: changeset.id});
        });
      }

      // Save both changeset and comment in a transaction block.
      else {
        changesetComment = {
          k: 'comment',
          v: changesetComment
        };
        knex.transaction(function(transaction) {
          knex.table(Changesets.tableName).insert(changesetAttributes).returning('id')
          .then(function(id) {

            // Returned id becomes the changeset tag's primary key
            changesetComment.changeset_id = parseInt(id[0], 10);
            return transaction
            .table(Changeset_Tags.tableName)
            .insert(changesetComment)
            .returning('changeset_id')
            .transacting(transaction);

            // Standard knex boilerplate for handling transaction
          }).then(transaction.commit)
          .catch(transaction.rollback);
        }).then(function(id) {
          return res.json({id: id[0]});
        }).catch(function(err) {
          sails.log(err);
          return res.badRequest('Encountered error creating a new changeset and comment tag');
        });
      }
    });
  },

  upload: function(req, res) {
    var changesetID = req.param('changeset_id');
    if (!changesetID || isNaN(changesetID)) {
      return res.badRequest('Changeset ID must be a non-zero number');
    }

    Changesets.find({ id: changesetID }).exec(function changesetResp(err, changesets) {
      if (err) {
        sails.log.debug(err);
        return res.badRequest('Encountered error finding changeset');
      }
      else if (!changesets.length) {
        return res.badRequest('Not a valid changeset');
      }
      var cs = changesets[0];
      // Keep track of the number of changes this upload operation is doing.
      var numChanges = parseInt(cs.num_changes, 10) || 0;
      var xml = req.body.xmlString;
      try {
        var actions = XML.readChanges(xml);
      }
      catch(e) {
        Changesets.destroy({ id: cs.id });
        return res.badRequest('Problem parsing changeset xml');
      }
      var transactionError = false;

      // Create a mapping of nodes and ways to their associated way_node and tags.
      // First group by type.
      var map = {
        node: {},
        way: {}
      };
      var associated = [];
      for (var i = 0, ii = actions.length; i < ii; ++i) {
        var action = actions[i];
        if (map[action.model]) {
          // Create an empty array to hold future associations
          action.associated = [];
          // Create an object that uses the node_id or way_id as pointers to the action.
          map[action.model][action.id] = action;
        }
        else {
          // Tags and way_nodes go here.
          associated.push(action);
        }
      }

      _.each(map, function(entityMap, name) {
        var accessor = name + '_id';
        for (var k = 0, kk = associated.length; k < kk; ++k) {
          var id = associated[k].attributes[accessor];
          var entity = entityMap[id];
          if (entity) {
            entity.associated.push(associated[k]);
          }
        }
      });

      var currentModels = {
        node: sails.models.nodes,
        way: sails.models.ways,
      };

      knex.transaction(function(transaction) {
        return Promise.each(actions, function(action) {
          var model = action.model;
          var currentTable = 'current_' + model + 's';
          var oldTable = model + 's';
          var placeholderID = action.id;
          var attributes = action.attributes;

          numChanges += 1;

          // sails.log.verbose('\n\n\n', action);
          if (action.action === 'create' ) {

            // For ways and nodes, re-map associations.
            if ( model === 'node' || model === 'way' ) {

              return transaction(currentTable).insert(attributes).returning('id')
              .then(function(id) {
                // It's a way or node, and it has associations
                // Remap the placeholder ID to the new, auto-generated ID from database.
                if (map[model] && action.associated) {
                  var accessor = model + '_id';
                  var newID = parseInt(id[0], 10);
                  _.each(action.associated, function(association) {
                    association.attributes[accessor] = newID;
                  });
                  action.id = newID;
                }
                return action;
              });

              // For way_nodes, way_tags, and node_tags, just do a straight insert.
              // As there are no associations to re-map.
            } else {
              return transaction(currentTable).insert(attributes);
            }

          } else if (action.action === 'modify') {
            console.log(model);

            // Save the original entity in the old entity (nodes, ways, etc) tables.

            // Update version of the model
            // If there's a version, increment it.
            if (attributes.version && !isNaN(attributes.version)) {
              attributes.version += 1;
            }

            // If there are associations and versions, write the versions
            // on those associations. Later we will check for them.
            if (action.associated && attributes.version) {
              _.each(action.associated, function(association) {
                association.version = attributes.version;
              });
            }

            if (model === 'way_node') {
              action.id = attributes.node_id;
            }

            var oldEntity = newOldEntity[model](action);

            // Create the old entity, if it fails, throw an error
            return transaction(oldTable)
            .insert(oldEntity)
            .then(function() {

              console.log(action);
              return transaction(currentTable)
              .where(action.key, '=', action.id)
              .update(attributes)

              .catch(function(err) {
                sails.log.debug(err);
              });
            })

            .catch(function(err) {
              sails.log.debug(err)
              throw new Error(err)
            })
          }

          else if (action.action === 'delete') {

            sails.log.debug('\n\n', 'delete', action);

            if (model === 'node' || model === 'way') {
              return currentModels[model].canBeDeleted(action.id)

              .then(function(yes) {
                if (yes) {
                  attributes.visible = false;
                  return transaction(currentTable)
                  .where(action.key, '=', action.id)
                  .update(attributes);
                } else {
                  sails.log.debug("Couldn't delete entity");
                  throw new Error("Couldn't delete entity");
                }
              })

              .catch(function(err) {
                sails.log.debug('Error in visibility check function');
                throw new Error('err');
              })

            } else {
              sails.log.debug(model, 'not a node/way delete');
              return action;
            }
          }
        })
      })

      .then(function() {
        // If all goes well, update the changeset
        var bbox = BoundingBox.fromScaledActions(actions).toScaled();
        Changesets.update({ id: cs.id }, {
          min_lon: bbox.minLon,
          min_lat: bbox.minLat,
          max_lon: bbox.maxLon,
          max_lat: bbox.maxLat,
          closed_at: new Date(),
          num_changes: numChanges
        }).exec(function updateChangeset(err, changeset) {
          if (err) {
            sails.log.debug(err);
            return res.serverError('Could not update changeset')
          }
          return res.json({
            changeset: changeset,
            actions: actions
          });
        });

      }).catch(function(err) {
        sails.log.debug(err);
        return Changesets.destroy({ id: cs.id }).then(function() {
          return res.serverError('Could not complete transaction');
        });;

      });
    });
  }
}
