/**
* Changesets.js
*
* @description :: Represents nodes.
* For schema, see: http://chrisnatali.github.io/osm_notes/osm_schema.html#changesets
*
* In the OSM API, this model times out (closes) an hour after the last update
* up to a maximum of 24 hours.
* In iD, changesets are closed right after they open, so a timeout isn't necessary.
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // Maximum number of elements allowed in a changeset
  max: 50000,

  bbox: function() {
    this.bbox =  BoundingBox.fromCoordinates(this.min_lon, this.min_lat, this.max_lon, this.max_lat);
    return this.bbox;
  },

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      numerical: true
    },
    user_id: {
      type: 'integer',
      index: true,
      required: true,
      numerical: true
    },
    created_at: {
      type: 'datetime',
      index: true,
      required: true
    },
    min_lat: {
      type: 'integer',
      index: true,
      required: true,
      numerical: true,
      truthy: true
    },
    min_lon: {
      type: 'integer',
      index: true,
      required: true,
      numerical: true,
      truthy: true
    },
    max_lat: {
      type: 'integer',
      index: true,
      required: true,
      numerical: true,
      truthy: true
    },
    max_lon: {
      type: 'integer',
      index: true,
      required: true,
      numerical: true,
      truthy: true
    },
    closed_at: {
      type: 'datetime',
      index: true,
      required: true
    },
    num_changes: {
      type: 'integer',
      required: true,
      numerical: true,
      greaterThan: 0
    },

    // Foreign keys
    //changesets_user_id_feky {
      //model: 'users'
    //},
  },
};

