/**
* Way_nodes.js
*
* @description :: Represents relations between ways and nodes.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#way_nodes
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'way_nodes',

  attributes: {
    way_id: {
      type: 'integer',
      primaryKey:true,
      index: true,
      model: 'ways',
    },
    version: {
      type: 'integer',
    },
    sequence_id: {
      type: 'integer',
    },
    node_id: {
      type: 'integer',
      index: true
    },
  },

  // TODO write from way node function
  fromWayNode: function() {},
  indexName: function() {
    return 'way_id'
  }
};