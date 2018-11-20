(function() {
  var Tile, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  describe('Tile', function() {
    return it('create a div', function(done) {
      var container, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        return this.displayContainer = container;
      });
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.tile'));
        return done();
      });
    });
  });

}).call(this);
