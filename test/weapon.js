(function() {
  var Tile, Timing, Weapon, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  Weapon = Parallelio.DOM.Weapon;

  Timing = Parallelio.Timing;

  describe('Weapon', function() {
    it('create a div', function(done) {
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
    return it('fire a projectile', function(done) {
      var container, tile, tile2, timing, weapon;
      timing = new Timing(false);
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile(1, 1)).tap(function() {
        return this.displayContainer = container;
      });
      tile2 = (new Tile(2, 2)).tap(function() {
        return this.displayContainer = container;
      });
      weapon = new Weapon({
        autoFire: false,
        target: tile2,
        timing: timing
      });
      tile.addChild(weapon);
      weapon.lastProjectile = weapon.fire();
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.tile'));
        assert.isNotNull(container.querySelector('.weapon'));
        assert.isNotNull(container.querySelector('.projectile'));
        return done();
      });
    });
  });

}).call(this);
