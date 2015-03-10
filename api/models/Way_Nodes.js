/**
* Way_nodes.js
*
* @description :: Represents relations between ways and nodes.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#way_nodes
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    way_id: {
      type: 'integer',
      primaryKey: true,
      numerical: true

    },
    sequence_id: {
      type: 'integer',
      primaryKey: true,
      numerical: true
    },
    node_id: {
      type: 'integer',
      numerical: true
    },
  },

   //Translate the entity from the XML parser into a proper model
  fromJXEntity: function(entityAttr) {
    return {
      way_id: Number(entityAttr.way_id),
      node_id: Number(entityAttr.ref),
      version: entityAttr.version || 0,
      sequence_id: entityAttr.sequence_id
    }
  }
};

