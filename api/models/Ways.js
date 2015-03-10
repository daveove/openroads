/**
* Way.js
*
* @description :: Represents ways, or roads.
* Schema : : http://chrisnatali.github.io/osm_notes/osm_schema.html#current_ways
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attachNodeIDs: function(ways, wayNodes) {
    // For each way, attach every node it contains using the wayNodes server response.
    for (var j = 0, jj = ways.length; j < jj; ++j) {
      var way = ways[j];
      var nodesInWay = [];
      for (var i = 0, ii = wayNodes.length; i < ii; ++i) {
        var wayNode = wayNodes[i];
        if (wayNode.way_id === way.way_id) {
          nodesInWay.push(wayNode);
        }
      }
      way.nodes = nodesInWay;
    }
    return ways;
  },

  attributes: {
    way_id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      numerical: true
    },
    changeset_id: {
      type: 'integer',
      numerical: true,
      model: 'changesets'
    },
    timestamp: {
      type: 'datetime',
      date: true
    },
    visible: {
      type: 'boolean',
      boolean: true
    },
    version: {
      type: 'integer',
      numerical: true
    },

    //Foreign Keys
    ways_changeset_id_fkey: {
        model: 'changesets'
    }
  },

  //Translate the entity from the XML parser into a proper model
  fromJXEntity: function(entityAttr) {
    return {
      way_id: Number(entityAttr.id),
      changeset_id: Number(entityAttr.changeset),
      timestamp: new Date(),
      version: entityAttr.version || 0,
      visible: (typeof entityAttr.visible === 'undefined') || (entityAttr.visible === 'true')
    }
  }
};

