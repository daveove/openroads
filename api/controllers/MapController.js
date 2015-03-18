var _ = require('lodash');

module.exports = {
  bbox: function(req, res) {

    // Creates a new bounding box object.
    // See api/services/BoundingBox.js.
    var paramString = req.query.bbox;
    var commaCount = (paramString.match(/,/g) || []).length;
    if (commaCount === 3) {
      var bbox = new BoundingBox.fromCoordinates(paramString.split(','));
      if (bbox.error) {
        sails.log.debug(bbox.error);
        return res.badRequest(bbox.error);
      }
    }
    else {
      return res.badRequest('Query must contain a valid bounding box');
    }

    // Calculate the tiles within this bounding box.
    // See api/services/QuadTile.js.
    var tiles = QuadTile.tilesForArea(bbox);

    // Query the node table for nodes with this tile.
    Nodes.find({
      tile: tiles,
      visible: true
    }).exec(function nodeResp(err, nodes) {

      if (err) {
        sails.log.debug(err);
        return res.serverError(err);
      }

      // If no nodes are found, just return an empty XML document.
      else if (!nodes.length) {
        res.set('Content-Type', 'text/xml');
        return res.send('<osm version="' + Api.version + '" generator="'
                        + Api.generator + '"></osm>');
      }
      else {

        // Create a list of node ID's.
        var nodeIDs = _.pluck(nodes, 'id');

        // Query both way_nodes and the node_tags endpoint.
        // Attach the node tags if they exist.
        async.parallel({
          wayNodes: function(cb) {
            Way_Nodes.find({ node_id: nodeIDs }).exec(cb);
          },
          nodeTags: function(cb) {
            Node_Tags.find({ node_id: nodeIDs }).exec(cb);
          }
        }, function wayNodeResp (err, wayNodeResp) {
          if (err) {
            sails.log.debug(err);
            return res.serverError(err);
          }
          var wayNodes = wayNodeResp.wayNodes;
          var nodeTags = wayNodeResp.nodeTags;

          // Use wayID to get ways and any missing nodes.
          // Also get way tags.
          wayIDs = _.chain(wayNodes).pluck('way_id').uniq().value();
          async.parallel({
            ways: function(cb) {
              Ways.find({ id: wayIDs, visible: true }).exec(cb);
            },
            wayNodes: function(cb) {
              Way_Nodes.find({ way_id: wayIDs }).exec(cb);
            },
            wayTags: function(cb) {
              Way_Tags.find({ way_id: wayIDs }).exec(cb);
            }
          }, function wayResp(err, wayResp) {
            if (err) {
              sails.log.debug(err);
              return res.serverError(err);
            }
            var allNodeIDs = _.chain(wayResp.wayNodes).pluck('node_id').uniq().value();
            var missingNodes = _.difference(allNodeIDs, nodeIDs);
            var ways = Ways.attachNodeIDs(wayResp.ways, wayResp.wayNodes);
            var wayTags = wayResp.wayTags;
            var xmlDoc;

            // Need to hit the Nodes server again.
            // Also get those tags.
            if (missingNodes.length) {
              async.parallel({
                nodes: function(cb) {
                  Nodes.find({ id: missingNodes, visible: true }).exec(cb);
                },
                nodeTags: function(cb) {
                  Node_Tags.find({ node_id: missingNodes }).exec(cb);
                }
              }, function missingNodeResp(err, missingNodeResp) {
                if (err) {
                  sails.log.debug(err);
                  return res.serverError(err);
                }
                nodes = nodes.concat(missingNodeResp.nodes);
                nodeTags = nodeTags.concat(missingNodeResp.nodeTags);
                xmlDoc = XML.write({
                  bbox: bbox,
                  nodes: Nodes.withTags(nodes, nodeTags, 'node_id'),
                  ways: Nodes.withTags(ways, wayTags, 'way_id')
                });
                res.set('Content-Type', 'text/xml');
                return res.send(xmlDoc.toString());
              });
            }

            // We have all the nodes, write the output.
            else {
              xmlDoc = XML.write({
                bbox: bbox,
                nodes: Nodes.withTags(nodes, nodeTags, 'node_id'),
                ways: Nodes.withTags(ways, wayTags, 'way_id')
              });
              res.set('Content-Type', 'text/xml');
              return res.send(xmlDoc.toString());
            }
          });
        });
      }
    });
  }
};
