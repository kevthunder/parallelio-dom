(function() {
  var Tile, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  describe('Tile', function() {
    it('create a div', function(done) {
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
    return it('gets correctly positioned', function(done) {
      var container, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        this.displayContainer = container;
        this.x = 2;
        return this.y = 3;
      });
      return window.requestAnimationFrame(function() {
        var elem;
        elem = container.querySelector('.tile');
        assert.equal(elem.style.top, Tile.size * 3 + "px");
        assert.equal(elem.style.left, Tile.size * 2 + "px");
        return done();
      });
    });
  });

}).call(this);
