var xmlNodeModify = '<osmChange version="0.3" generator="iD">' +
  '<create/>' +
  '<modify>' +
    '<node id="-76703" lon="123.83676223498107" lat="9.632539331799256" version="1" changeset="123"/>' +
  '</modify>'  +
  '<delete if-unused="true"/>' +
'</osmChange>'

var jsonNodeModify = [
  { action: 'modify',
    model: 'node',
    id: -76703,
    indexName: 'id',
    attributes:
     { latitude: 96325393,
       longitude: 1238367622,
       changeset_id: 123,
       visible: true,
       tile: 3805365679,
       version: 1,
       timestamp: new Date() }  } ];

var xmlCreateWay = '<osmChange version="0.3" generator="iD">' +
  '<create>' +
    '<node id="-7" lon="123.83621506434201" lat="9.632200849325827" version="0" changeset="123"/>' +
    '<node id="-10" lon="123.84027056437253" lat="9.63569143353531" version="0" changeset="123"/>' +
    '<way id="-4" version="0" changeset="123">' +
      '<nd ref="-7"/>' +
      '<nd ref="-10"/>' +
      '<tag k="highway" v="residential"/>' +
      '<tag k="name" v="Fake Street"/>' +
    '</way>' +
  '</create>' +
  '<modify/>' +
  '<delete if-unused="true"/>' +
'</osmChange>';

var jsonWayCreate = [
  { action: 'create',
    model: 'node',
    id: -7,
    indexName: 'id',
    attributes:
     { latitude: 96322008,
       longitude: 1238362150,
       changeset_id: 123,
       visible: true,
       tile: 3805365678,
       version: 0,
       timestamp: new Date() } },
  { action: 'create',
    model: 'node',
    id: -10,
    indexName: 'id',
    attributes:
     { latitude: 96356914,
       longitude: 1238402705,
       changeset_id: 123,
       visible: true,
       tile: 3805366032,
       version: 0,
       timestamp: new Date() } },
  { action: 'create',
    model: 'way',
    id: -4,
    indexName: 'id',
    attributes:
     {
       changeset_id: 123,
       timestamp: new Date(),
       version: 0,
       visible: true } },
  { action: 'create',
    model: 'way_node',
    id: -7,
    indexName: 'node_id',
    attributes: { way_id: -4, node_id: -7, sequence_id: 0 } },
  { action: 'create',
    model: 'way_node',
    id: -10,
    indexName: 'node_id',
    attributes: { way_id: -4, node_id: -10, sequence_id: 1 } },
  { action: 'create',
    model: 'way_tag',
    id: -4,
    indexName: 'way_id',
    attributes: { way_id: -4, k: 'highway', v: 'residential' } },
  { action: 'create',
    model: 'way_tag',
    id: -4,
    indexName: 'way_id',
    attributes: {
      way_id: -4,
      k: 'name',
      v: 'Fake Street'
    } } ];

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
      rmTimestamps(XML.readChanges(xmlNodeModify))
        .should.be.eql(rmTimestamps(jsonNodeModify))
    }),
    it('Should translate a way creation', function() {
      rmTimestamps(XML.readChanges(xmlCreateWay))
        .should.be.eql(rmTimestamps(jsonWayCreate))
    })
  })
})
