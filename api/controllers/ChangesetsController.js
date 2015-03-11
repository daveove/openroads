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
        sails.log(err);
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
        return res.badRequest('Problem parsing changeset xml');
      }

      // Uses change representation to update the database
      knex.transaction(function(trx) {
        Promise.each(actions, function(entry) {
          if (entry.action === 'create') {
            var table = entry.model + 's';
            return knex(table).insert(entry.attributes).transacting(trx)
          }
          else if (entry.action === 'modify') {
            // TODO
          }
          else if (entry.action === 'delete') {
            // TODO
          }
        })
        .then(trx.commit)
        .catch(trx.rollback)
      }).then(function() {
        sails.log('at the end')
      }).catch(function(error) {
        Changesets.destroy({ id: cs.id });
        sails.log('error: ', error)
      });

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
        }
        return res.ok(changeset);
      });

    });
  }
}
