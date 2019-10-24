(function() {
  var ShipWeapon, Tile, Timing, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  ShipWeapon = Parallelio.DOM.ShipWeapon;

  Timing = Parallelio.Timing;

  describe('ShipWeapon', function() {
    it('create a div', function(done) {
      var container, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        return this.displayContainer = container;
      });
      tile.addChild(new ShipWeapon());
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.tile'));
        assert.isNotNull(container.querySelector('.weapon'));
        return done();
      });
    });
    return it('fire a projectile', function(done) {
      var container, tile, tile2, timing, weapon;
      timing = new Timing({
        running: false
      });
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile(1, 1)).tap(function() {
        return this.displayContainer = container;
      });
      tile2 = (new Tile(2, 2)).tap(function() {
        return this.displayContainer = container;
      });
      weapon = new ShipWeapon({
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
        weapon.lastProjectile.destroy();
        assert.isNull(container.querySelector('.projectile'));
        return done();
      });
    });
  });

}).call(this);
