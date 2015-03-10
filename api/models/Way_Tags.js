/**
* Way_tags.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    way_id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
        model: 'ways'
    },
    k: {
        type: 'string',
        truthy: true
    },
    v: {
        type: 'string',
        truthy: true
    },
    version: {
        type: 'integer',
        numerical: true
    },

  },

  //Translate the entity from the XML parser into a proper model
  fromJXEntity: function(entityAttr) {
    return {
      way_id: Number(entityAttr.id),
      k: entityAttr.k,
      v: entityAttr.v,
      version: entityAttr.version || 0
    }
  }
};

