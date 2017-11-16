(function(definition){Tile=definition(typeof(Parallelio.DOM)!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Tile.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Tile;}else{if(typeof(Parallelio.DOM)!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Tile=Tile;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Tile=Tile;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseTile = dependencies.hasOwnProperty("BaseTile") ? dependencies.BaseTile : require('parallelio').Tile;
var Floor = dependencies.hasOwnProperty("Floor") ? dependencies.Floor : require('parallelio').Floor;
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Tile, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Tile = (function(superClass) {
  extend(Tile, superClass);

  function Tile() {
    return Tile.__super__.constructor.apply(this, arguments);
  }

  Tile.extend(Display);

  Tile.size = 20;

  Tile.prototype.init = function() {
    Tile.__super__.init.call(this);
    this.baseCls = 'tile';
    return this.initDisplay();
  };

  Tile.properties({
    container: {},
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.prop('container');
        if (container != null ? container.getProperty('tileDisplay') : void 0) {
          return invalidator.prop('tileDisplay', container);
        } else if (container != null ? container.getProperty('display') : void 0) {
          return invalidator.prop('display', container);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        return this.tileToDisplayX(invalidator.prop('x'));
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return this.tileToDisplayY(invalidator.prop('y'));
      }
    }
  });

  Tile.prototype.tileToDisplayX = function(x) {
    return x * Tile.size;
  };

  Tile.prototype.tileToDisplayY = function(y) {
    return y * Tile.size;
  };

  return Tile;

})(BaseTile);

Tile.Floor = (function(superClass) {
  extend(Floor, superClass);

  function Floor() {
    return Floor.__super__.constructor.apply(this, arguments);
  }

  Floor.prototype.init = function() {
    Floor.__super__.init.call(this);
    return this.cls = 'floor';
  };

  return Floor;

})(Floor.definition({
  Tile: Tile
}));

return(Tile);});