(function(definition){var Tiled=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Tiled.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Tiled;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Tiled=Tiled;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Tiled=Tiled;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseTiled = dependencies.hasOwnProperty("BaseTiled") ? dependencies.BaseTiled : require('parallelio').Tiled;
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Tiled;
Tiled = (function() {
  class Tiled extends BaseTiled {
    constructor() {
      super();
      this.initDisplay();
    }

  };

  Tiled.extend(Display);

  Tiled.include(EventEmitter.prototype);

  Tiled.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.prop('tile');
        if (tile != null) {
          return invalidator.prop('displayContainer', tile);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.prop('tile');
        if (tile != null) {
          return tile.displayX + tile.tileToDisplayX(invalidator.prop('offsetX'));
        }
      }
    },
    displayY: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.prop('tile');
        if (tile != null) {
          return tile.displayY + tile.tileToDisplayY(invalidator.prop('offsetY'));
        }
      }
    }
  });

  return Tiled;

}).call(this);

return(Tiled);});