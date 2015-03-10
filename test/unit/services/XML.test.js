var xmlNodeModify = '<osmChange version="0.3" generator="iD">' + 
  '<create/>' + 
  '<modify>' + 
    '<node id="-76703" lon="123.83676223498107" lat="9.632539331799256" version="1" changeset="123"/>' + 
  '</modify>'  +
  '<delete if-unused="true"/>' +
'</osmChange>' 

var jsonNodeModify = [ { action: 'create',
    model: 'changeset',
    attributes:
     { id: 123,
       user_id: 1,
       created_at: new Date(),
       min_lat: 96325393,
       min_lon: 1238367622,
       max_lat: 96325393,
       max_lon: 1238367622,
       closed_at: new Date(),
       num_changes: 1 } },
  { action: 'modify',
    model: 'node',
    attributes:
     { latitude: 96325393,
       longitude: 1238367622,
       node_id: -76703,
       changeset_id: 123,
       visible: true,
       tile: 373828584,
       version: '1',
       timestamp: new Date() }  } ]

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
'</osmChange>'

var jsonWayCreate = [ { action: 'create',
    model: 'changeset',
    attributes:
     { id: 123,
       user_id: 1,
       created_at: new Date(),
       min_lat: 96322008,
       min_lon: 1238362150,
       max_lat: 96356914,
       max_lon: 1238402705,
       closed_at: new Date(),
       num_changes: 7 } },
  { action: 'create',
    model: 'node',
    attributes:
     { latitude: 96322008,
       longitude: 1238362150,
       node_id: -7,
       changeset_id: 123,
       visible: true,
       tile: 3823859596,
       version: '0',
       timestamp: new Date() } },
  { action: 'create',
    model: 'node',
    attributes:
     { latitude: 96356914,
       longitude: 1238402705,
       node_id: -10,
       changeset_id: 123,
       visible: true,
       tile: 3224965180,
       version: '0',
       timestamp: new Date() } },
  { action: 'create',
    model: 'way',
    attributes:
     { way_id: -4,
       changeset_id: 123,
       timestamp: new Date(),
       version: '0',
       visible: true } },
  { action: 'create',
    model: 'way_node',
    attributes: { way_id: -4, node_id: -7, version: 0, sequence_id: 0 } },
  { action: 'create',
    model: 'way_node',
    attributes: { way_id: -4, node_id: -10, version: 0, sequence_id: 1 } },
  { action: 'create',
    model: 'way_tag',
    attributes: { way_id: -4, k: 'highway', v: 'residential', version: 0 } },
  { action: 'create',
    model: 'way_tag',
    attributes: { way_id: -4, k: 'name', v: 'Fake Street', version: 0 } } ]

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
