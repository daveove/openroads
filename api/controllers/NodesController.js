/**
 * NodeController
 *
 * @description :: Server-side logic for managing nodes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var lxml = require('libxmljs');

module.exports = {

  single: function(req, res) {
    var nodeID = req.param('node_id');
    if (!nodeID || isNaN(nodeID)) {
      return res.badRequest('Node ID must be a non-zero number');
    }

    async.parallel({
      nodes: function(cb) {
        Nodes.find({ id : nodeID }).exec(cb);
      },
      nodeTags: function(cb) {
        Node_Tags.find({ node_id: nodeID }).exec(cb);
      }
    }, function nodeResp(err, resp) {
      var nodes = resp.nodes;
      var nodeTags = resp.nodeTags;
      if (err) {
        sails.log.debug(err);
        return res.serverError(err);
      }
      else if (!nodes.length || !nodes[0].visible) {
        res.set('Content-Type', 'text/xml');
        return res.send('<osm version="' + Api.version + '" generator="'
                        + Api.generator + '"></osm>');
      }
      var xmlDoc = XML.write({ nodes: Nodes.withTags(nodes, nodeTags, 'node_id') });
      res.set('Content-type', 'text/xml');
      return res.send(xmlDoc.toString());
    });
  }
};
