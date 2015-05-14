'use strict';

describe('Wrapper routes', function() {
  var router = app_router;
  var $main = $('#main-frame');

  describe('Editor route', function() {
    it('Should call the editor with the appropriate route data', function() {
      router.navigate('editor/123', {trigger: true});
      $main.attr('src').should.eql('//devseed.com/openroads-iD/123');
    });
  });

  describe('Analytics route', function() {
    it('Should call the dashboard with the appropriate route data', function() {
      router.navigate('analytics/abc', {trigger: true});
      $main.attr('src').should.eql('//devseed.com/openroads-analytics/abc');
    });
  });

  describe('Verification route', function() {
    it('Should call to-fix with the appropriate route data', function() {
      router.navigate('verification/a/b#c', {trigger: true});
      $main.attr('src').should.eql('//devseed.com/to-fix/a/b#c');
    });
  });

});
