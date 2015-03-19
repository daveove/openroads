var request = require('supertest');
var mocks = require('../helpers/changesets');

describe('ChangesetsController', function() {
  var id = -1;

  describe('#create', function() {

    // TODO complete this test once we have a mock DB.
    /*
    describe('#create', function() {
      it('Creates a user and changeset tag', function(done) {
        request(sails.hooks.http.app)
        .post('/changesets/create')
        .set('Accept', 'application/json')
        .send({
        })
        .expect(200)
        .end(function(err, res) {
        });
      });
    });
    */

  });

  describe('#upload',function() {
    it('Creates 2 nodes and a way with 2 tags', function(done) {
      request(sails.hooks.http.app)
        .post('/changesets/upload')
        .set('Accept', 'application/json')
        .query({'changeset_id': 1})
        .send({'xmlString': mocks.createWay})
        .expect(200)
        .end(function(err, res) {
          if (err) {
            sails.log.debug(res.error.text)
            return done(err)
          }
          //set the id for later tests;
          id = parseInt(JSON.parse(res.text).actions[0].id)
          done()
        })
    });

    it('Modifies a node', function(done) {
      request(sails.hooks.http.app)
      .post('/changesets/upload')
      .set('Accept', 'application/json')
      .query({'changeset_id': 1})
      .send({'xmlString': mocks.modifyNode(id)})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          sails.log.debug(res.error.text)
          return done(err)
        }
        done()
      })
    });

    it('Deletes a node', function(done) {
      request(sails.hooks.http.app)
      .post('/changesets/upload')
      .set('Accept', 'application/json')
      .query({'changeset_id': 1})
      .send({'xmlString': mocks.deleteNode(id)})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          sails.log.debug(res.error.text)
          return done(err)
        }
        done()
      })
    });

  })
})
