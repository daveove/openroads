var libxml = require('libxmljs');
var mock = require('../helpers/XML.readChanges');

function rmTimestamps(actionArray) {
  return actionArray.map(function(action) {
    var timestamps = ['timestamp', 'created_at', 'closed_at']
    _.each(timestamps, function(attribute) {
      if (_.has(action.attributes, attribute) ) {
        action.attributes = _.omit(action.attributes, attribute);
      }
    })
    return action;
  })
}

describe('XML', function() {
  describe('#readChanges', function() {
    it('Should translate a single node modify', function() {
      rmTimestamps(XML.readChanges(mock.xmlNodeModify))
        .should.be.eql(rmTimestamps(mock.jsonNodeModify))
    }),
    it('Should translate a way creation', function() {
      rmTimestamps(XML.readChanges(mock.xmlCreateWay))
        .should.be.eql(rmTimestamps(mock.jsonCreateWay))
    })
  });

  describe('#write', function() {
    it('Should correctly write tags to nodes', function() {
      var nodes = [{
        tags: [{ k: 1, v: 1 }]
      }];
      var xml = XML.write({ nodes: nodes }).toString();
      var doc = libxml.parseXmlString(xml);
      var tag = doc.find('//tag');
      doc.get('//tag').toString().should.eql('<tag k="1" v="1"/>');
    });
    it('Should correctly write tags to ways', function() {
      var ways = [{
        tags: [{ k: 1, v: 1 }],
        nodes: []
      }];
      var xml = XML.write({ ways: ways }).toString();
      var doc = libxml.parseXmlString(xml);
      var tag = doc.find('//tag');
      doc.get('//tag').toString().should.eql('<tag k="1" v="1"/>');
    });
  });

});
