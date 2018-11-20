(function() {
  var Door, Tile, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  Door = Parallelio.DOM.Door;

  describe('Door', function() {
    return it('create a div', function(done) {
      var container, door, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        return this.displayContainer = container;
      });
      door = (new Door()).tap(function() {
        return this.displayContainer = container;
      });
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.tile'));
        assert.isNotNull(container.querySelector('.door'));
        return done();
      });
    });
  });

}).call(this);
