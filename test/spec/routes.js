'use strict';

describe('Wrapper routes', function() {

  describe('Editor route', function() {
    it('Should call the editor with the appropriate route data', function() {
      AppRouter.prototype.editor = sinon.spy();
      var router = new AppRouter();
      router.navigate('editor');
      assert(router.editor.called);
    });
  });

});
