var libxml = require('libxmljs');
var info = require('./GeoInfo');

module.exports = {
  readChanges: function(xmlString) {
    var entities = [];
    var entity = {};
    var sequenceID = 0;
    var entityID = 0;
    var parentElem;
    var mode;

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
        entity = {
          action: mode,
          model: elem,

          //Grab all the attributes and zip them into one attribute object
          attributes: _(attrs)
            .map(function (kvArray) { return [kvArray[0], kvArray[3]] })
            .zipObject()
            .value()
        }
      }

      // If we're going to process a way_node or a tag, we need to save the parent ID
      if (elem === 'node' || elem === 'way') {
        parentElem = elem;
        entityID = entity.attributes.id;
      }

      // To enter into the db, we need to do some modifications to the attributes according to the model
      if (elem === 'nd') {
        entity.model = 'way_node';
        entity.attributes.id = entity.attributes.ref
        entity.attributes['way_id'] = entityID;
        entity.attributes['sequence_id'] = sequenceID;
        sequenceID += 1;
      }

      // For tags, we have to add the parent's id
      if (elem === 'tag') {
        entity.model = parentElem + '_tag';
        entity.attributes['id'] = entityID;
      }

      // If the entity is "not empty", then we can push it to the array
      if (_.has(entity, 'model')) {
        entity.id = Number(entity.attributes.id);
        // Rename the data attributes according to the model
        entity.attributes = modelMap[entity.model].fromJXEntity(entity.attributes);
        entities.push(entity);
        entity = {};
      }
    });

    // On every closing tags, we are closing parent ways
    parser.on('endElementNS', function(elem, attrs, prefix, uri, namespace) {
      if (elem === 'way') {
        //reset the counter
        sequenceID = 0;
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
          id: node.id,
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
          id: way.id,
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
