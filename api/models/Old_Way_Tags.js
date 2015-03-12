/**
 * Way_tags.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'way_tags',

  attributes: {
    way_id: {
      type: 'integer',
      primaryKey: true,
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

  fromWayTag: function() {},
};
