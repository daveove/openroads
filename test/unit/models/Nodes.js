var Nodes = require('../../../api/models/Nodes.js');

describe('Nodes', function() {
  describe('#withTags',function() {
    it('should correctly attach tags to entities', function() {

      var entities = [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ];

      var tags = [
        { id: 1 },
        { id: 1 },
        { id: 2 }
      ];

      var withTags = Nodes.withTags(entities, tags, 'id');
      withTags[0].should.have.property('tags').with.lengthOf(2);
    });
  });
});
