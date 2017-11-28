(function() {
  var Tile, Weapon, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  Weapon = Parallelio.DOM.Weapon;

  describe('Weapon', function() {
    return it('create a div', function(done) {
      var container, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        return this.displayContainer = container;
      });
      tile.addChild(new Weapon());
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.tile'));
        assert.isNotNull(container.querySelector('.weapon'));
        return done();
      });
    });
  });

}).call(this);
