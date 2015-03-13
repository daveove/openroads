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
    Nodes.find({ node_id: nodeID }).exec(function nodeResp(err, nodes) {
      if (err) {
        return res.badRequest(err);
      }
      else if (!nodes.length || !nodes[0].visible) {
        res.set('Content-Type', 'text/xml');
        return res.send('<osm version="' + Api.version + '" generator="'
                        + Api.generator + '"></osm>');
      }
      var xmlDoc = XML.write({ nodes: nodes });
      res.set('Content-type', 'text/xml');
      return res.send(xmlDoc.toString());
    });


  }


};
