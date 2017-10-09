(function() {
  var Ship, assert;

  assert = chai.assert;

  Ship = Parallelio.DOM.Ship.Tiled;

  describe('Ship', function() {
    it('create a div', function() {
      var container, ship;
      container = document.createElement("div");
      document.body.appendChild(container);
      ship = (new Ship()).tap(function() {
        return this.displayContainer = container;
      });
      return assert.isNotNull(container.querySelector('.ship'));
    });
    return it('generate tiles', function() {
      var container, ship;
      container = document.createElement("div");
      document.body.appendChild(container);
      ship = (new Ship()).tap(function() {
        return this.displayContainer = container;
      });
      ship.generate();
      assert.isNotNull(container.querySelector('.ship'));
      return assert.isNotNull(container.querySelector('.tile'));
    });
  });

}).call(this);
