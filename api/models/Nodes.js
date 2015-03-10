
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
  fromJXEntity: function(entityAttr) {
    var ratioLat = Number(entityAttr.lat) * GeoInfo.ratio | 0;
    var ratioLon = Number(entityAttr.lon) * GeoInfo.ratio | 0;
    var tile = QuadTile.xy2tile(
                QuadTile.lon2x(ratioLon),
                QuadTile.lat2y(ratioLat)
              )
    return {
      latitude: ratioLat,
      longitude: ratioLon,
      node_id: Number(entityAttr.id),
      changeset_id: Number(entityAttr.changeset),
      visible: (typeof entityAttr.visible === 'undefined') || (entityAttr.visible === 'true'),
      tile: tile,
      version: entityAttr.version || 0,
      timestamp: new Date(),
    }
  }
};

