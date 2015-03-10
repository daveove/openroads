var _ = require('lodash');
var knex = require('knex')({
  client: 'pg',
  connection: sails.config.connections.osmPostgreSQL,
  debug: 'true'
})
var Promise = require('bluebird')

//Create a way
var actions = [ { action: 'create',
    model: 'changeset',
    attributes:
     { id: 123,
       user_id: 1,
       created_at: new Date(),
       min_lat: 96322008,
       min_lon: 1238362150,
       max_lat: 96356914,
       max_lon: 1238402705,
       closed_at: new Date(),
       num_changes: 7 } },
  { action: 'create',
    model: 'node',
    attributes:
     { latitude: 96322008,
       longitude: 1238362150,
       node_id: -7,
       changeset_id: 123,
       visible: true,
       tile: 3823859596,
       version: '0',
       timestamp: new Date() } },
  { action: 'create',
    model: 'node',
    attributes:
     { latitude: 96356914,
       longitude: 1238402705,
       node_id: -10,
       changeset_id: 123,
       visible: true,
       tile: 3224965180,
       version: '0',
       timestamp: new Date() } },
  { action: 'create',
    model: 'way',
    attributes:
     { way_id: -4,
       changeset_id: 123,
       timestamp: new Date(),
       version: '0',
       visible: true } },
  { action: 'create',
    model: 'way_node',
    attributes: { way_id: -4, node_id: -7, version: 0, sequence_id: 0 } },
  { action: 'create',
    model: 'way_node',
    attributes: { way_id: -4, node_id: -10, version: 0, sequence_id: 1 } },
  { action: 'create',
    model: 'way_tag',
    attributes: { way_id: -4, k: 'highway', v: 'residential', version: 0 } },
  { action: 'create',
    model: 'way_tag',
    attributes: { way_id: -4, k: 'name', v: 'Fake Street', version: 0 } } ]


module.exports = {
  create: function(req, res) {
    // Parses XML into JSON change representation.
    var xml = req.body.xmlString
    try {
      var action = XML.readChanges(xml);
    }
    catch(e) {
      return res.badRequest('Problem parsing changeset xml');
    }

    // Uses change representation to update the database
    try {
      console.log('in the try block')
      knex.transaction(function(trx) {
        console.log('in the transaction')
        Promise.each(actions, function(entry) {
          console.log(entry)
          if (entry.action === 'create') {
            console.log('in the create block')
            var table = entry.model + 's';
            return knex(table).insert(entry.attributes).transacting(trx)
          } else if (entry.action === 'modify') {

          } else if (entry.action === 'delete') {

          }
        })
        .then(trx.commit)
        .catch(trx.rollback)
      }).then(function() {
        console.log('at the end')
      }).catch(function(error) {
        console.error('error: ', error)
      });
    }
    catch(e) {
      return res.badRequest('Error commiting changes');
    }
    // Place-holder response.
    return res.json([]);
  },
}
