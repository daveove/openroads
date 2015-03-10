var libxml = require('libxmljs');
var info = require('./GeoInfo');

module.exports = {
  readChanges: function(xmlString) {
    var entities = [];
    var currEntity = {};
    var sequence_id = 0;
    var entity_id = 0;
    var parentElem;
    var mode = 'create' //Modes can be either create, modify or destroy

    var modelMap = {
      'node': sails.models.nodes,
      'way': sails.models.ways,
      'way_node': sails.models.way_nodes,
      'way_tag': sails.models.way_tags,
      'node_tag': sails.models.node_tags
    }

    // Start a streaming parser. On each tag, we check what it is and create entities
    var parser = new libxml.SaxParser();

    // On every starting tag
    parser.on('startElementNS', function(elem, attrs, prefix, uri, namespace) {

      // Set the mode
      if (elem === 'create' || elem === 'modify' || elem === 'destroy') {
        mode = elem;
        return
      } 

      // Check if we're processing an entity
      if (elem === 'node' || elem === 'way' || elem === 'nd' || elem === 'tag')
      {
        currEntity = {
          action: mode,
          model: elem,
          attributes: _.chain(attrs) //Grab all the attributes and zip them into one attribute object
            .map(function (kvArray) { return [kvArray[0], kvArray[3]] })
            .zipObject()
            .value()
        }
      }

      // If we're going to process a way_node or a tag, we need to save the parent ID
      if (elem === 'node' || elem === 'way') {
        parentElem = elem;
        entity_id = currEntity.attributes.id;
      }

      // To enter into the db, we need to do some modifications to the attributes according to the model
      if (elem === 'nd') { 
        currEntity.model = 'way_node';
        currEntity.attributes['way_id'] = entity_id;
        currEntity.attributes['sequence_id'] = sequence_id;
        sequence_id += 1;
      }

      // For tags, we have to add the parent's id
      if (elem === 'tag') {
        currEntity.model = parentElem + '_tag';
        currEntity.attributes['id'] = entity_id;
      }

      // If the entity is "not empty", then we can push it to the array
      if (_.has(currEntity, 'model')) {
        // Rename the data attributes according to the model
        currEntity.attributes = modelMap[currEntity.model]
                                  .fromJXEntity(currEntity.attributes)
        entities.push(currEntity); currEntity = {};
      }
    });

    // On every closing tags, we are closing parent ways
    parser.on('endElementNS', function(elem, attrs, prefix, uri, namespace) {
      if (elem === 'way') {
        //reset the counter
        sequence_id = 0;
      }
    })

    // At the end of the document, get the bounding box
    // Might not be the best way to get bounding box, can we get it from query?
    parser.on('endDocument', function() {
      var flattened = _.pluck(entities, 'attributes')
      var minlon = _.min(flattened, 'longitude' ).longitude
      var maxlon = _.max(flattened, 'longitude' ).longitude
      var minlat = _.min(flattened, 'latitude').latitude
      var maxlat = _.max(flattened, 'latitude').latitude
      var id = _.pluck(flattened, 'changeset_id')[0]
      entities.unshift({
        action: 'create',
        model: 'changeset',
        attributes: {
          user_id: 1,
          id: id,
          created_at: new Date(),
          min_lat: minlat,
          min_lon: minlon,
          max_lat: maxlat,
          max_lon: maxlon,
          closed_at: new Date(),
          num_changes: entities.length
        }
      })
    })

    // Pass in the XML string
    parser.parseString(xmlString);
    return entities
  },

  write: function(obj) {
    var obj = obj || {},
      nodes = obj.nodes,
      ways = obj.ways,
      bbox = obj.bbox;

    var doc = new libxml.Document();
    doc.node('osm').attr({ version: 6, generator: 'DevelopmentSeed' });
    var root = doc.root();

    if (bbox) {
      root.node('bounds').attr({
        minlat: bbox.minLat,
        minlon: bbox.minLon,
        maxlat: bbox.maxLat,
        maxlon: bbox.maxLon
      });
    }

    if (nodes) {
      for (var i = 0, ii = nodes.length; i < ii; ++i) {
        var node = nodes[i];
        root.node('node').attr({
          id: node.node_id,
          visible: node.visible,
          version: node.version,
          changeset: node.changeset_id,
          timestamp: node.timestamp,
          user: 'DevelopmentSeed',
          uid: 1,
          lat: node.latitude / info.ratio,
          lon: node.longitude / info.ratio
        });
      }
    }

    if (ways) {
      for (var i = 0, ii = ways.length; i < ii; ++i) {
        var way = ways[i];
        var wayEl = root.node('way').attr({
          id: way.way_id,
          visible: way.visible,
          version: way.version,
          changeset: way.changeset_id,
          timestamp: way.timestamp,
          user: 'DevelopmentSeed',
          uid: 1
        });

        // Use the sequence ID to make sure nodes are ordered correctly.
        var wayNodes = way.nodes;
        var orderedNodes = [];
        for (var j = 0, jj = wayNodes.length; j < jj; ++j) {
          var wayNode = wayNodes[j];
          orderedNodes[parseInt(wayNode.sequence_id, 10)] = wayNode.node_id;
        }

        // Attach a node ref for each node, as long as it exists and it's id isn't '0'.
        for(var k = 0, kk = orderedNodes.length; k < kk; ++k) {
          var wayNode = orderedNodes[k];
          if (wayNode && wayNode !== '0') {
            wayEl.node('nd').attr({ ref: wayNode });
          }
        }
      }
    }

    return doc;
  }
};
