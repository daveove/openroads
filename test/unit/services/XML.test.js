var libxml = require('libxmljs');
var mock = require('../helpers/XML.readChanges');
var _ = require('lodash');

function rmTimestamps(actionArray) {
  return actionArray.map(function(action) {
    var timestamps = ['timestamp', 'created_at', 'closed_at'];
    _.each(timestamps, function(attribute) {
      if (_.has(action.attributes, attribute) ) {
        action.attributes = _.omit(action.attributes, attribute);
      }
    });
    return action;
  })
}

describe.only('XML', function() {
  describe('#readChanges', function() {

    // -----------
    // Simple strings
    // ------------
    function simpleChangeset(mode) {
      return function() {
        return _.chain(XML.readChanges(mock.simple[mode]))
        .pluck('action')
        .uniq().value()
        .should.be.eql([mode])
        .and.have.lengthOf(1)
    }}

    it('Should translate a creation changeset', simpleChangeset('create')),
    it('Should translate a modification changeset', simpleChangeset('modify')),
    it('Should translate a deletion changeset', simpleChangeset('delete'))

    // -----------
    // Long strings
    // ------------


    // -----------
    // Exactly translated
    // -----------

    it('Should translate a single node modify', function() {
      rmTimestamps(XML.readChanges(mock.modify.xml))
        .should.be.eql(rmTimestamps(mock.modify.json))
    }),
    it('Should translate a way creation', function() {
      rmTimestamps(XML.readChanges(mock.create.xml))
        .should.be.eql(rmTimestamps(mock.create.json))
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

