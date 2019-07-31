(function() {
  var Display, Tile, TileContainer, Wire, assert, createWireStage;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  Wire = Parallelio.DOM.Wire;

  TileContainer = Parallelio.tiles.TileContainer;

  Display = Parallelio.DOM.Display;

  createWireStage = function() {
    var Container;
    Container = (function() {
      class Container extends TileContainer {};

      Container.extend(Display);

      return Container;

    }).call(this);
    return (new Container).tap(function() {
      var b, container, m, n, r;
      container = document.createElement("div");
      document.body.appendChild(container);
      this.display = container;
      // tile with red wire
      r = function(opt) {
        return (new Tile(opt.x, opt.y)).tap(function() {
          return this.addChild(new Wire("red"));
        });
      };
      // tile with blue wire
      b = function(opt) {
        return (new Tile(opt.x, opt.y)).tap(function() {
          return this.addChild(new Wire("blue"));
        });
      };
      // tile with red and blue wire
      m = function(opt) {
        return (new Tile(opt.x, opt.y)).tap(function() {
          this.addChild(new Wire("red"));
          return this.addChild(new Wire("blue"));
        });
      };
      // tile with no wire
      n = function(opt) {
        return new Tile(opt.x, opt.y);
      };
      return this.loadMatrix([[n, b, r, n], [r, m, r, r], [b, b, r, n], [n, b, r, n]]);
    });
  };

  describe('Wire', function() {
    it('create a div', function(done) {
      var container, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        return this.displayContainer = container;
      });
      tile.addChild(new Wire("blue"));
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.tile'));
        assert.isNotNull(container.querySelector('.wire.blue'));
        return done();
      });
    });
    return it('add directionnal classes', function(done) {
      var container;
      container = createWireStage();
      return window.requestAnimationFrame(function() {
        assert.isTrue(container.getTile(1, 2).children.get(0).display.is(".connUp"));
        assert.isTrue(container.getTile(1, 2).children.get(0).display.is(".connDown"));
        assert.isTrue(container.getTile(1, 2).children.get(0).display.is(".connLeft"));
        assert.isFalse(container.getTile(1, 2).children.get(0).display.is(".connRight"));
        return done();
      });
    });
  });

}).call(this);
