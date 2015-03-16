/**
* Way.js
*
* @description :: Represents ways, or roads.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#current_ways
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'ways',

  attributes: {
    way_id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      index: true
    },
    version: {
      type: 'integer'
    },
    changeset_id: {
      type: 'integer',
      model: 'changesets',
      index: true
    },
    timestamp: {
      type: 'datetime',
      index: true
    },
    visible: {
      type: 'boolean'
    }
  },

  fromWay: function() {},
};