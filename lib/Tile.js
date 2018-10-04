(function(definition){var Tile=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Tile.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Tile;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Tile=Tile;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Tile=Tile;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseTile = dependencies.hasOwnProperty("BaseTile") ? dependencies.BaseTile : require('parallelio').Tile;
var BaseFloor = dependencies.hasOwnProperty("BaseFloor") ? dependencies.BaseFloor : require('parallelio').Floor;
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Tile;
Tile = (function() {
  class Tile extends BaseTile {
    init() {
      super.init();
      this.baseCls = 'tile';
      return this.initDisplay();
    }

    tileToDisplayX(x) {
      return x * Tile.size;
    }

    tileToDisplayY(y) {
      return y * Tile.size;
    }

  };

  Tile.extend(Display);

  Tile.size = 20;

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

  return Tile;

}).call(this);

Tile.Floor = class Floor extends BaseFloor.definition({
    Tile: Tile
  }) {
  init() {
    super.init();
    return this.cls = 'floor';
  }

};

return(Tile);});