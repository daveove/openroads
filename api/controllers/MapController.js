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
        return res.badRequest(bbox.error);
      }
    }
    else {
      return res.badRequest(bbox.error);
    }

    // Calculate the tiles within this bounding box.
    // See api/services/QuadTile.js.
    var tiles = _.map(QuadTile.tilesForArea(bbox), function(tile) {
      return '' + tile;
    });

    // Query the node table for nodes with this tile.
    Nodes.find({ tile: tiles }).exec(function nodeResp(err, nodes) {
      if (err) {
        return res.badRequest(err);
      }

      // If no nodes are found, just return an empty XML document.
      else if (!nodes.length) {
        res.set('Content-Type', 'text/xml');
        return res.send('<osm version="' + Api.version + '" generator="'
                        + Api.generator + '"></osm>');
      }
      else {

        // Create a list of node ID's.
        var nodeIDs = _.pluck(nodes, 'node_id');

        // Query the way_nodes endpoint, returning every wayNode containing our nodes.
        Way_Nodes.find({ node_id: nodeIDs }).exec(function wayNodeResp(err, wayNodes) {
          if (err) {
            return res.badRequest(err);
          }

          // Get a unique list of way ID's
          var wayIDs = _(wayNodes).pluck('way_id').uniq().value();

          // Perform two separate db queries now using our unique way ID's.
          async.parallel({

            // First query returns the actual ways.
            ways: function(cb) {
              Ways.find({ way_id: wayIDs }).exec(cb);
            },

            // Second query hits way_nodes table again
            // to get any *nodes* that aren't in our BBox,
            // but are part of a way.
            wayNodes: function(cb) {
              Way_Nodes.find({ way_id: wayIDs }).exec(cb);
            }
          }, function wayResp(err, resp) {
            if (err) {
              return res.badRequest(err);
            }
            var allNodeIDs = _(resp.wayNodes).pluck('node_id').uniq().value();
            var missingNodes = _.difference(allNodeIDs, nodeIDs);
            var ways = Ways.attachNodeIDs(resp.ways, resp.wayNodes);
            var xmlDoc;

            // Need to hit the Nodes server again.
            if (missingNodes.length) {
              Nodes.find({ node_id: missingNodes }).exec(function missingNodeResp(err, missingNodes) {
                nodes = nodes.concat(missingNodes);
                xmlDoc = XML.write({bbox: bbox, nodes: nodes, ways: ways});
                res.set('Content-Type', 'text/xml');
                return res.send(xmlDoc.toString());
              });
            }

            // We have all the nodes, write the output.
            else {
              xmlDoc = XML.write({bbox: bbox, nodes: nodes, ways: ways});
              res.set('Content-Type', 'text/xml');
              return res.send(xmlDoc.toString());
            }
          });
        });
      }
    });
  }
};
