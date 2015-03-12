
/**
* Nodes.js
*
* @description :: Represents nodes.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#current_nodes
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'current_nodes',

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      index: true
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
  fromJXEntity: function(entity) {
    var ratio = GeoInfo.ratio;
    var lat = parseFloat(entity.lat) * ratio | 0;
    var lon = parseFloat(entity.lon) * ratio | 0;

    var model = {
      latitude: lat,
      longitude: lon,
      tile: QuadTile.xy2tile(QuadTile.lon2x(lon), QuadTile.lat2y(lat)),
      changeset_id: parseInt(entity.changeset, 10),
      visible: (entity.visible !== 'false' && entity.visible !== false),
      version: parseInt(entity.version, 10) || 0,
      timestamp: new Date()
    };
    return model;
  },

  configureIDs: function(id) {
    console.log(id);
  },
};
