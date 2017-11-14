(function(definition){Ship=definition(typeof(Parallelio.DOM)!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Ship.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Ship;}else{if(typeof(Parallelio.DOM)!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Ship=Ship;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Ship=Ship;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tile = dependencies.hasOwnProperty("Tile") ? dependencies.Tile : require('./Tile');
var TileContainer = dependencies.hasOwnProperty("TileContainer") ? dependencies.TileContainer : require('parallelio').TileContainer;
var DefaultGenerator = dependencies.hasOwnProperty("DefaultGenerator") ? dependencies.DefaultGenerator : require('parallelio').RoomGenerator;
var Ship, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
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

return(Ship);});