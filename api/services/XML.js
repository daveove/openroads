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
      if (elem === 'node' || elem === 'way' || elem === 'nd' || elem === 'tag') {
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

      // If we're processing a way node, we need to do some modifications to the attributes
      if (elem === 'nd') { 
        currEntity.model = 'way_node';
        currEntity.attributes['node_id'] = currEntity.attributes['ref']; // rename attribute
        delete currEntity.attributes.ref;
        currEntity.attributes['way_id'] = entity_id;
        currEntity.attributes['sequence_id'] = sequence_id;
        sequence_id += 1;
      }

      // For tags, we have to add the parent's id
      if (elem === 'tag') {
        currEntity.model = parentElem + '_tag';
        currEntity.attributes[parentElem + '_id'] = entity_id;
      }

      // If the entity is "not empty", then we can push it to the array
      if (_.has(currEntity, 'model')) {
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
