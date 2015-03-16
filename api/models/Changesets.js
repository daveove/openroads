/**
* Changesets.js
*
* @description :: Represents changesets.
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

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      numeric: true,
      index: true
    },
    user_id: {
      type: 'integer',
      index: true,
      required: false,
      numeric: true
    },
    created_at: {
      type: 'datetime',
    },
    closed_at: {
      type: 'datetime',
    },
    min_lat: {
      type: 'integer',
      index: true,
    },
    min_lon: {
      type: 'integer',
      index: true,
    },
    max_lat: {
      type: 'integer',
      index: true,
    },
    max_lon: {
      type: 'integer',
      index: true,
    },
    num_changes: {
      type: 'integer',
      required: true,
      numeric: true
    },
  },
};

