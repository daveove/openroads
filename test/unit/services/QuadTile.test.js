var geoRecordScale = 10000000;

describe('QuadTile', function() {
  describe('#lonlat2tile', function() {
    it('Should return the correct tile for a lat/lon pair', function() {
      var latitude = 97378629 / geoRecordScale;
      var longitude = 1237890525 / geoRecordScale;
      QuadTile.xy2tile(
        QuadTile.lon2x(longitude),
        QuadTile.lat2y(latitude)
      ).should.equal(3805368681)
    })
  })
})
