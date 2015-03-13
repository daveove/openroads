var _ = require('lodash');

module.exports = {

  create: function(req, res) {
    // Returns an XML doc from request body, or errors out.
    try {
      var xmlDoc = XML.read(req.body.xmlString);
    }
    catch(e) {
      return res.badRequest('XML malformed');
    }

    // Place-holder response.
    return res.json([]);
  },
}
