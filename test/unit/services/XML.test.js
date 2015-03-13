var xmlNodeModify = '<osmChange version="0.3" generator="iD">' + 
  '<create/>' + 
  '<modify>' + 
    '<node id="-76703" lon="123.83676223498107" lat="9.632539331799256" version="1" changeset="123"/>' + 
  '</modify>'  +
  '<delete if-unused="true"/>' +
'</osmChange>' 

var jsonNodeModify = [ 
  { 
    action: 'modify',
    model: 'node',
    attributes: { 
      id: '-76703',
      lon: '123.83676223498107',
      lat: '9.632539331799256',
      version: '1',
      changeset: '123' 
    } 
  } 
]

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

var jsonWayCreate = [ 
  { 
    action: 'create',
    model: 'node',
    attributes: { 
      id: '-7',
      lon: '123.83621506434201',
      lat: '9.632200849325827',
      version: '0',
      changeset: '123' 
    } 
  },
  { 
    action: 'create',
    model: 'node',
    attributes: { 
      id: '-10',
      lon: '123.84027056437253',
      lat: '9.63569143353531',
      version: '0',
      changeset: '123' 
    } 
  },
  { 
    action: 'create',
    model: 'way',
    attributes: { id: '-4', version: '0', changeset: '123' } 
  },
  { 
    action: 'create',
    model: 'way_node',
    attributes: { node_id: '-7', way_id: '-4', sequence_id: 0 } 
  },
  { 
    action: 'create',
    model: 'way_node',
    attributes: { node_id: '-10', way_id: '-4', sequence_id: 1 } 
  },
  { 
    action: 'create',
    model: 'way_tag',
    attributes: { k: 'highway', v: 'residential', way_id: '-4' } 
  },
  { 
    action: 'create',
    model: 'way_tag',
    attributes: { k: 'name', v: 'Fake Street', way_id: '-4' } 
  } 
]


describe('XML', function() {
  describe('#readChanges', function() {
    it('Should translate a single node modify', function() {
      XML.readChanges(xmlNodeModify).should.be.eql(jsonNodeModify)
    }),
    it('Should translate a way creation', function() {
      XML.readChanges(xmlCreateWay).should.be.eql(jsonWayCreate)
    })
  })
})
