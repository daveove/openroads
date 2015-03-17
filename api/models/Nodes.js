
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
      numeric: true,
      truthy: true
    },
    longitude: {
      type: 'integer',
      required: true,
      numeric: true,
      truthy: true
    },
    changeset_id: {
      type: 'integer',
      numeric: true,
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
      numeric: true,
      required: true
    },
    version: {
      type: 'integer',
      numeric: true,
      required: true
    },
  },

  //Translate the entity from the XML parser into a proper model
  fromJXEntity: function(entity) {
    var ratio = GeoInfo.ratio;
    var lat = parseFloat(entity.lat);
    var lon = parseFloat(entity.lon)

    var model = {
      latitude: lat * ratio | 0,
      longitude: lon * ratio | 0,
      tile: QuadTile.xy2tile(QuadTile.lon2x(lon), QuadTile.lat2y(lat)),
      changeset_id: parseInt(entity.changeset, 10),
      visible: (entity.visible !== 'false' && entity.visible !== false),
      version: parseInt(entity.version, 10) || 0,
      timestamp: new Date()
    };
    return model;
  },

  indexName: function() {
    return 'id'
  },

  canBeDeleted: function(node_id) {
    return Way_Nodes.find({node_id: parseInt(node_id)})
      .then(function(waynodes) {
        if (waynodes) {
          return Ways.find({id: _.pluck(waynodes, 'way_id')})  
                  .then(function(ways) {
                  var visible = _.chain(ways)
                    .pluck('visible')
                    .reduce(function(curr, val) { return curr && val}, true)
                    .value()
                  sails.log.debug(visible)
                  return visible
                })
        } else {
          return true
        }
      })
      .catch(function(err) {
        sails.log.debug(err)          
        throw new Error(err)      
      })
  },

  configureIDs: function(id) {
  },
};
