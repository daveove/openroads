
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
      model: 'changesets'
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
  },

  //Translate the entity from the XML parser into a proper model
  fromJXEntity: function(entity, create) {
    var ratio = GeoInfo.ratio;
    var lat = parseInt(entity.lat) * ratio || null,
    var lon = parseInt(entity.lon) * ratio || null,

    var model = {
      latitude: lat,
      longitude: lon,
      tile: QuadTile.xy2tile(QuadTile.lon2x(lon), QuadTile.lat2y(lat)),
      changeset_id: parseInt(entity.changeset, 10),
      visible: !!entity.visible,
      version: entity.version || 0,
      timestamp: new Date()
    };

    if (!create && entity.id) {
      model.node_id = entity.id;
    }

    return model;
  }
};
