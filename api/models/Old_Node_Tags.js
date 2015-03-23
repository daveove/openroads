/**
 * Node_tags.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'node_tags',

  attributes: {
    node_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
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
    version: {
      type: 'integer',
      numerical: true
    },
  }
};
