var createWay = '<osmChange version="0.3" generator="iD">' +
  '<create>' +
    '<node id="-1" lon="124.15472633706449" lat="10.151493406454932" version="0" changeset="1"/>' +
    '<node id="-4" lon="124.15647513734223" lat="10.153431321701245" version="0" changeset="1"/>' +
    '<way id="-1" version="0" changeset="1">' +
      '<nd ref="-1"/>' +
      '<nd ref="-4"/>' +
      '<tag k="highway" v="tertiary"/>' +
      '<tag k="name" v="Common Road Name"/>' +
    '</way>' +
  '</create>' +
  '<modify/>' +
  '<delete if-unused="true"/>' +
'</osmChange>'

var request = require('supertest');

var modifyNode = '<osmChange version="0.3" generator="iD">' + 
  '<create/>' +
  '<modify>' +
    '<node id="164932" lon="123.81275264816284" lat="9.626730050553016" version="0" changeset="1"/>' +
  '</modify>' +
  '<delete if-unused="true"/>' +
'</osmChange>'

describe('ChangesetsController', function() {
  describe('#upload',function() {
    it('Creates 2 nodes and a way with 2 tags', function(done) {
      request(sails.hooks.http.app)
        .post('/changesets/upload')
        .set('Accept', 'application/json')
        .query({'changeset_id': 1})
        .send({'xmlString': createWay})
        .expect(200)
        .end(function(err, res) {
          if (err) {
            sails.log.debug(res.error.text)
            return done(err)
          }
          done()
        })
    }),
    it('Modifies a node', function(done) {
      request(sails.hooks.http.app)
      .post('/changesets/upload')
      .set('Accept', 'application/json')
      .query({'changeset_id': 1})
      .send({'xmlString': modifyNode})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          sails.log.debug(res.error.text)
          return done(err)
        }
        done()
      })
    })
  })
})