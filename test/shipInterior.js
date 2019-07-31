(function() {
  var ShipInterior, assert;

  assert = chai.assert;

  ShipInterior = Parallelio.DOM.ShipInterior;

  describe('ShipInterior', function() {
    it('create a div', function(done) {
      var container, ship;
      container = document.createElement("div");
      document.body.appendChild(container);
      ship = (new ShipInterior()).tap(function() {
        return this.displayContainer = container;
      });
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.ship'));
        return done();
      });
    });
    return it('generate tiles', function(done) {
      var container, ship;
      container = document.createElement("div");
      document.body.appendChild(container);
      ship = (new ShipInterior()).tap(function() {
        return this.displayContainer = container;
      });
      ship.generate();
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.ship'));
        assert.isNotNull(container.querySelector('.tile'));
        assert.isNotNull(container.querySelector('.door'));
        assert.isNotNull(container.querySelector('.door.vertical'));
        return done();
      });
    });
  });

}).call(this);
