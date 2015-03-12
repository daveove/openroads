var xmlString = '<osmChange version="0.3" generator="iD">' +
  '<create>' +
    '<node id="-1" lon="124.15472633706449" lat="10.151493406454932" version="0" changeset="57"/>' +
    '<node id="-4" lon="124.15647513734223" lat="10.153431321701245" version="0" changeset="57"/>' +
    '<node id="-7" lon="124.1574300037515" lat="10.152132338936662" version="0" changeset="57"/>' +
    '<node id="-10" lon="124.15568656789182" lat="10.150521804202976" version="0" changeset="57"/>' +
    '<node id="-13" lon="124.15447957383513" lat="10.150865033596354" version="0" changeset="57"/>' +
    '<node id="-16" lon="124.15571338998198" lat="10.151535649964192" version="0" changeset="57"/>' +
    '<node id="-19" lon="124.15605134831785" lat="10.152158741077868" version="0" changeset="57"/>' +
    '<node id="-22" lon="124.15670044289945" lat="10.152222106207892" version="0" changeset="57"/>' +
    '<node id="-25" lon="124.15683991776825" lat="10.152169301933752" version="0" changeset="57"/>' +
    '<way id="-1" version="0" changeset="57">' +
      '<nd ref="-1"/>' +
      '<nd ref="-4"/>' +
      '<nd ref="-7"/>' +
      '<nd ref="-10"/>' +
      '<nd ref="-13"/>' +
      '<nd ref="-16"/>' +
      '<nd ref="-19"/>' +
      '<nd ref="-22"/>' +
      '<nd ref="-25"/>' +
      '<tag k="highway" v="tertiary"/>' +
      '<tag k="name" v="Common Road Name"/>' +
    '</way>' +
  '</create>' +
  '<modify/>' +
  '<delete if-unused="true"/>' +
'</osmChange>'

var request = require('supertest');

describe('ChangesetsController', function() {
  describe('#upload',function() {
    it('Should upload a changeset', function(done) {
      request(sails.hooks.http.app)
        .post('/changesets/upload')
        .query({'changeset_id': 57})
        .send({'xmlString': xmlString})
        .expect(200,done);
    })
  })
})