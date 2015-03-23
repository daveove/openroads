
/**
* Nodes.js
*
* @description :: Represents nodes.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#current_nodes
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'nodes',

  attributes: {
    node_id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      index: true
    },
    version: {
      type: 'integer',
      index: true
    },
    latitude: {
      type: 'integer'
    },
    longitude: {
      type: 'integer'
    },
    changeset_id: {
      type: 'integer',
      index: true,
      model: 'changesets'
    },
    visible: {
      type: 'boolean',
    },
    timestamp: {
      type: 'datetime',
    },
    tile: {
      type: 'integer',
      index: true
    },
  }
};
