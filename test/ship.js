(function() {
  var Ship, assert;

  assert = chai.assert;

  Ship = Parallelio.DOM.Ship;

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
      assert.isNotNull(container.querySelector('.tile'));
      return assert.isNotNull(container.querySelector('.door'));
    });
  });

}).call(this);
