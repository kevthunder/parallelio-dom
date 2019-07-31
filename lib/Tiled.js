var BaseTiled, Display, EventEmitter, Tiled;

BaseTiled = require('parallelio').tiles.Tiled;

Display = require('./Display');

EventEmitter = require('spark-starter').EventEmitter;

module.exports = Tiled = (function() {
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

//# sourceMappingURL=maps/Tiled.js.map
