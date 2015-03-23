var xmlNodeModify = '<osmChange version="0.3" generator="iD">' +
  '<create/>' +
  '<modify>' +
    '<node id="-76703" lon="123.83676223498107" lat="9.632539331799256" version="1" changeset="123"/>' +
  '</modify>'  +
  '<delete if-unused="true"/>' +
'</osmChange>';

var jsonNodeModify = [{
  action: 'modify',
  model: 'node',
  id: -76703,
  key: 'id',
  attributes: {
    latitude: 96325393,
    longitude: 1238367622,
    changeset_id: 123,
    visible: true,
    tile: 3805365679,
    version: 1,
    timestamp: new Date()
  }
}];

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

var jsonCreateWay = [{
  action: 'create',
  model: 'node',
  id: -7,
  key: 'id',
  attributes: {
    latitude: 96322008,
    longitude: 1238362150,
    changeset_id: 123,
    visible: true,
    tile: 3805365678,
    version: 1,
    timestamp: new Date()
  }
}, {
  action: 'create',
  model: 'node',
  id: -10,
  key: 'id',
  attributes: {
    latitude: 96356914,
    longitude: 1238402705,
    changeset_id: 123,
    visible: true,
    tile: 3805366032,
    version: 1,
    timestamp: new Date()
  }
}, {
  action: 'create',
  model: 'way',
  id: -4,
  key: 'id',
  attributes: {
    changeset_id: 123,
    timestamp: new Date(),
    version: 1,
    visible: true
  }
}, {
  action: 'create',
  model: 'way_node',
  id: -7,
  key: 'node_id',
  attributes: {
    way_id: -4,
    node_id: -7,
    sequence_id: 0
  }
}, {
  action: 'create',
  model: 'way_node',
  id: -10,
  key: 'node_id',
  attributes: {
    way_id: -4,
    node_id: -10,
    sequence_id: 1
  }
}, {
  action: 'create',
  model: 'way_tag',
  id: -4,
  key: 'way_id',
  attributes: {
    way_id: -4,
    k: 'highway',
    v: 'residential'
  }
}, {
  action: 'create',
  model: 'way_tag',
  id: -4,
  key: 'way_id',
  attributes: {
    way_id: -4,
    k: 'name',
    v: 'Fake Street'
  }
}];

var simpleCreate = '<osmChange version="0.3" generator="iD"><create><node id="-1" lon="123.80713073806761" lat="9.623874044911773" version="0" changeset="7"><tag k="leisure" v="park"/><tag k="name" v="New park"/></node></create><modify/><delete if-unused="true"/></osmChange>';
var simpleModify = '<osmChange version="0.3" generator="iD"><create/><modify><node id="165562" lon="123.81275264816284" lat="9.626730050553016" version="0" changeset="9"/></modify><delete if-unused="true"/></osmChange>';
var simpleDestroy = '<osmChange version="0.3" generator="iD"><create/><modify/><delete if-unused="true"><way id="165530" version="0" changeset="10"><nd ref="165562"/><nd ref="165563"/></way><node id="165562" lon="123.8126079" lat="9.6264056" version="0" changeset="10"/><node id="165563" lon="123.8171569" lat="9.6242266" version="0" changeset="10"/></delete></osmChange>';

module.exports = {
  simple: {
    create: simpleCreate,
    modify: simpleModify,
    delete: simpleDestroy
  },
  modify: {
    xml: xmlNodeModify,
    json: jsonNodeModify
  },
  create: {
    xml: xmlCreateWay,
    json: jsonCreateWay
  }
};

