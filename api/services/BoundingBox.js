var _ = require('lodash');
var maxArea = require('./MaxArea').area;

var nullLatLon = [null,null,null,null];
var lonLimit = 180.0;
var latLimit = 90.0;

// In OSM, the order goes min_lon, min_lat, max_lon, max_lat.
function Bbox(minMaxLatLon) {

  var bounds = _.map(minMaxLatLon, function(coord) {
    return parseFloat(coord);
  });

  // Check that coordinates exist and are numbers
  // Check that the min/max makes sense
  if (!isValidBounds(bounds)) {
    this.logError('Latitude/longitude bounds must be valid coordinates.');
  }
  else if (bounds[0] > bounds[2]) {
    this.logError('The minimum longitude must be less than the maximum, but is not.');
  }
  else if (bounds[1] > bounds[3]) {
    this.logError('The minimum latitude must be less than the maximum, but is not.');
  }
  else if (bounds[0] < -lonLimit ||
      bounds[1] < -latLimit ||
      bounds[2] > +lonLimit ||
      bounds[3] > +latLimit) {
    this.logError('Latitudes and longitudes are not within bounds.');
  }
  else if ((bounds[2] - bounds[0]) * (bounds[3] - bounds[1]) > maxArea) {
    this.logError('Request area is greater than maximum request area.');
  }
  else {
    this.error = null;
  }

  if (this.error) {
    bounds = nullLatLon;
  }

  this.minLon = bounds[0];
  this.minLat = bounds[1];
  this.maxLon = bounds[2];
  this.maxLat = bounds[3];
  return this;
}

Bbox.prototype.logError = function(msg) {
  this.error = msg;
}

Bbox.prototype.area = function() {
  return (this.maxLon - this.minLon) * (this.maxLat - this.minLat);
}

Bbox.prototype.centerLon = function() {
  return (this.minLon + this.maxLon) / 2.0;
}

Bbox.prototype.centerLat = function() {
  return (this.minLat + this.maxLat) / 2.0;
}

Bbox.prototype.width = function() {
  return this.maxLon - this.minLon;
}

Bbox.prototype.height = function() {
  return this.maxLat - this.minLat;
}

Bbox.prototype.toArray = function() {
  return [this.minLon, this.minLat, this.maxLon, this.maxLat];
}

Bbox.prototype.toString = function() {
  return this.toArray().join(',');
}

function isValidBounds(bounds) {
  for(var i = 0; i < 4; ++i) {
    var coord = bounds[i];
    if (!coord || isNaN(coord)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  fromString: function(paramString) {
    // Should be three commas in the string query
    var commaCount = (paramString.match(/,/g) || []).length;
    if (commaCount === 3) {
      return new Bbox(paramString.split(','));
    }
    else {
      return new Bbox(nullLatLon);
    }
  },
  fromCoordinates: function(minLon, minLat, maxLon, maxLat) {
    var coordinates = [minLon, minLat, maxLon, maxLat];
    if (_.every([coordinates], function(coordinate) {
      return coordinate && !isNaN(coordinate);
    })) {
      return new Bbox(coordinates);
    }
    else {
      return new Bbox(nullLatLon);
    }
  },
}
