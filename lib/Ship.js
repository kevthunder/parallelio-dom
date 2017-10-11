var DefaultGenerator, Ship, Tile, TileContainer, ref, ref1, ref2,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Tile = ((ref = this.DOM) != null ? ref.Tile : void 0) || require('./Tile').Element;

TileContainer = ((ref1 = this.Parallelio) != null ? ref1.TileContainer : void 0) || require('parallelio').TileContainer;

DefaultGenerator = ((ref2 = this.Parallelio) != null ? ref2.RoomGenerator : void 0) || require('parallelio').RoomGenerator;

Ship = {};

Ship.Tiled = (function(superClass) {
  extend(Tiled, superClass);

  function Tiled() {
    return Tiled.__super__.constructor.apply(this, arguments);
  }

  Tiled.include(EventEmitter.prototype);

  Tiled.prototype.init = function() {
    Tiled.__super__.init.call(this);
    return this.displayContainer;
  };

  Tiled.properties({
    container: {},
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.prop('container');
        if (container != null ? container.getProperty('display') : void 0) {
          return container.display;
        }
      },
      change: function() {
        if (this.displayContainer != null) {
          return this.display.appendTo(this.displayContainer);
        }
      }
    },
    display: {
      calcul: function() {
        var display;
        display = $(document.createElement("div")).addClass('ship');
        display.get(0)._parallelio_obj = this;
        return display;
      }
    }
  });

  Tiled.prototype.generate = function(generator) {
    generator = generator || (new DefaultGenerator()).tap(function() {
      this.wallFactory = function(opt) {
        return (new Tile(opt.x, opt.y)).tap(function() {
          this.cls = 'wall';
          return this.walkable = false;
        });
      };
      return this.floorFactory = function(opt) {
        return (new Tile(opt.x, opt.y)).tap(function() {
          this.cls = 'floor';
          return this.walkable = true;
        });
      };
    });
    return generator.getTiles().forEach((function(_this) {
      return function(tile) {
        return _this.addTile(tile);
      };
    })(this));
  };

  return Tiled;

})(TileContainer);

if (typeof DOM !== "undefined" && DOM !== null) {
  DOM.Ship = Ship;
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = Ship;
} else {
  if (this.Parallelio == null) {
    this.Parallelio = {};
  }
  if (this.Parallelio.DOM == null) {
    this.Parallelio.DOM = {};
  }
  this.Parallelio.DOM.Ship = Ship;
}
