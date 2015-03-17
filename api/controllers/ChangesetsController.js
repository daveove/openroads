var _ = require('lodash');
var knex = require('knex')({
  client: 'pg',
  connection: sails.config.connections.osmPostgreSQL,
  debug: 'true'
});
var Promise = require('bluebird');

module.exports = {

  create: function(req, res) {
    // TODO save changeset comment along with changeset
    var changesetComment = req.body.comment;

    // Check if User exists; if not, create user.
    // TODO Need a better way to control users here;
    // this is strictly for beta purposes.
    var userName = req.body.user;
    var userID = req.body.uid;
    Users.findOrCreate({ id: userID }, {
      id: userID,
      display_name: userName,
      creation_time: new Date()
    }, function(err, user) {
      if (err) {
        sails.log(err);
        return res.badRequest('Encountered error creating or finding user');
      }
      // Fill an object with changeset attributes
      var created = new Date();
      var closed = new Date();
      closed.setHours(created.getHours() + 1);
      var cs = {
        user_id: userID,
        created_at: created,
        closed_at: closed,
        num_changes: 0
      }
      Changesets.create(cs, function createChangeset(err, changeset) {
        if (err) {
          sails.log(err);
          return res.badRequest('Encountered error creating a new changeset');
        }
        return res.ok(changeset);
      });
    });
  },

  upload: function(req, res) {
    var changesetID = req.param('changeset_id');
    if (!changesetID || isNaN(changesetID)) {
      return res.badRequest('Changeset ID must be a non-zero number');
    }

    Changesets.find({ id: changesetID }).exec(function changesetResp(err, changesets) {
      if (err) {
        return res.badRequest('Encountered error finding changeset');
      }
      else if (!changesets.length) {
        return res.badRequest('Not a valid changeset');
      }
      var cs = changesets[0];
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
        'node': sails.models.nodes,
        'way': sails.models.ways,
      };

      var oldModels = {
        'node': sails.models.old_nodes,
        'way': sails.models.old_ways,
        'way_node': sails.models.old_way_nodes,
        'way_tag': sails.models.old_way_tags,
        'node_tag': sails.models.old_node_tags
      };

      knex.transaction(function(transaction) {
        return Promise.each(actions, function(action) {
          var model = action.model;
          var currentTable = 'current_' + model + 's';
          var oldTable = model + 's';
          var placeholderID = action.id;

          // sails.log.verbose('\n\n\n', action);
          if (action.action === 'create' ) {

            // For ways and nodes, re-map associations.
            if ( model === 'node' || model === 'way' ) {

              return transaction(currentTable).insert(action.attributes).returning('id')
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
              return transaction(currentTable).insert(action.attributes);
            }

          } else if (action.action === 'modify') {
            // Save the original entity in the old entity (nodes, ways, etc) tables.
            var oldEntity = _.clone(action.attributes, true);

            // Assign ID to oldEntity
            // indexName returns the primary key column name on the model.
            oldEntity[oldModels[model].indexName()] = action.id

            // Create the old entity, if it fails, throw an error
            return transaction(oldTable)
            .insert(oldEntity)
            .then(function() {

              // Update version of the model and its attributes in the current_ tables
              action.attributes.version += 1;
              return transaction(currentTable)
              .where(action.indexName, '=', action.id)
              .update(action.attributes)
            })
            .catch(function(err) {
              sails.log.debug(err)
              throw new Error(err)
            })

          } else if (action.action === 'delete') {
            if (model === 'node' || model === 'way') {
              return currentModels[model].canBeDeleted(action.id)
              .then(function(yes) {
                if (yes) {
                  action.attributes.visible = false;
                  return transaction(currentTable)
                  .where(action.indexName, '=', action.id)
                  .update(action.attributes);
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
              sails.log.debug('not a node/way delete');
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
          closed_at: new Date()
        }).exec(function updateChangeset(err, changeset) {
          if (err) {
            sails.log(err);
            return res.serverError('Could not update changeset')
          }
          return res.ok({
            changeset: changeset,
            actions: actions
          });
        });

      }).catch(function(error) {
        return Changesets.destroy({ id: cs.id }).then(function() {
          return res.serverError('Could not complete transaction');
        });;

      });
    });
  }
}
