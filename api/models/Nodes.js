/**
* Nodes.js
*
* @description :: Represents nodes.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#current_nodes
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    node_id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    latitude: {
      type: 'integer',
      required: true,
      numerical: true,
      truthy: true
    },
    longitude: {
      type: 'integer',
      required: true,
      numerical: true,
      truthy: true
    },
    changeset_id: {
      type: 'integer',
      numerical: true
    },
    visible: {
      type: 'boolean',
      boolean: true
    },
    timestamp: {
      type: 'datetime',
      datetime: true
    },
    tile: {
      type: 'integer',
      index: true,
      numerical: true,
      required: true
    },
    version: {
      type: 'integer',
      numerical: true,
      required: true
    },

    // Foreign keys
    //changeset_id_fkey: {
      //model: 'changesets'
    //},
  }
};

