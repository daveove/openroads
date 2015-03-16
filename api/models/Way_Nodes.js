/**
* Way_nodes.js
*
* @description :: Represents relations between ways and nodes.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#way_nodes
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'current_way_nodes',

  attributes: {
    way_id: {
      type: 'integer',
      primaryKey: true,
      numeric: true,
      primaryKey:true,
      index: true,
      model: 'ways'
    },
    sequence_id: {
      type: 'integer',
    },
    node_id: {
      type: 'integer',
      index: true,
      numeric: true,
      model: 'nodes'
    },
  },

   //Translate the entity from the XML parser into a proper model
  fromJXEntity: function(entity) {
    return {
      way_id: parseInt(entity.way_id, 10),
      node_id: parseInt(entity.ref, 10),
      sequence_id: parseInt(entity.sequence_id)
    }
  },
  indexName: function() {
    return 'node_id'
  },

  configureIDs: function(id) {
    console.log(id);
  },
};

