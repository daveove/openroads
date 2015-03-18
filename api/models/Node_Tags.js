/**
 * Node_tags.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'current_node_tags',

  attributes: {
    node_id: {
      type: 'integer',
      primaryKey: true,
      model: 'nodes'
    },
    k: {
      type: 'string',
      truthy: true
    },
    v: {
      type: 'string',
      truthy: true
    },
  },

  //Translate the entity from the XML parser into a proper model
  fromJXEntity: function(entityAttr) {
    return {
      node_id: Number(entityAttr.id),
      k: entityAttr.k,
      v: entityAttr.v,
    }
  },
  indexName: function() {
    return 'node_id'
  }
};

