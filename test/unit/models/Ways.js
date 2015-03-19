var wayWayNodes = require('../helpers/attachNodeIDs');
var Ways = require('../../../api/models/Ways.js');

describe('Ways', function() {
  describe('#attachNodeIDs',function() {
    it('should correctly attach node IDs to ways', function() {
      var ways = wayWayNodes.ways;
      var wayNodes = wayWayNodes.wayNodes;
      var result = wayWayNodes.result;
      Ways.attachNodeIDs(ways, wayNodes).should.eql(result);
    });
  });
});
