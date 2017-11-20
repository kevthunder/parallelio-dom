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
    return it('generate tiles', function(done) {
      var container, ship;
      container = document.createElement("div");
      document.body.appendChild(container);
      ship = (new Ship()).tap(function() {
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
