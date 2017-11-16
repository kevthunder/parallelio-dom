(function(definition){Ship=definition(typeof(Parallelio.DOM)!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Ship.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Ship;}else{if(typeof(Parallelio.DOM)!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Ship=Ship;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Ship=Ship;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tile = dependencies.hasOwnProperty("Tile") ? dependencies.Tile : require('./Tile');
var TileContainer = dependencies.hasOwnProperty("TileContainer") ? dependencies.TileContainer : require('parallelio').TileContainer;
var DefaultGenerator = dependencies.hasOwnProperty("DefaultGenerator") ? dependencies.DefaultGenerator : require('parallelio').RoomGenerator;
var Door = dependencies.hasOwnProperty("Door") ? dependencies.Door : require('./Door');
var Ship, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Ship = (function(superClass) {
  extend(Ship, superClass);

  function Ship() {
    return Ship.__super__.constructor.apply(this, arguments);
  }

  Ship.include(EventEmitter.prototype);

  Ship.prototype.init = function() {
    Ship.__super__.init.call(this);
    return this.displayContainer;
  };

  Ship.properties({
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

  Ship.prototype.generate = function(generator) {
    generator = generator || (new Ship.Generator()).tap(function() {});
    return generator.getTiles().forEach((function(_this) {
      return function(tile) {
        return _this.addTile(tile);
      };
    })(this));
  };

  return Ship;

})(TileContainer);

Ship.Generator = (function(superClass) {
  extend(Generator, superClass);

  function Generator() {
    return Generator.__super__.constructor.apply(this, arguments);
  }

  Generator.prototype.wallFactory = function(opt) {
    return (new Tile(opt.x, opt.y)).tap(function() {
      this.cls = 'wall';
      return this.walkable = false;
    });
  };

  Generator.prototype.floorFactory = function(opt) {
    return new Tile.Floor(opt.x, opt.y);
  };

  Generator.prototype.doorFactory = function(opt) {
    return (new Tile.Floor(opt.x, opt.y)).tap(function() {
      return this.addChild(new Door(opt.direction));
    });
  };

  return Generator;

})(DefaultGenerator);

return(Ship);});