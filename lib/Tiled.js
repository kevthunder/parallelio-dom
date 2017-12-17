(function(definition){var Tiled=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Tiled.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Tiled;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Tiled=Tiled;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Tiled=Tiled;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseTiled = dependencies.hasOwnProperty("BaseTiled") ? dependencies.BaseTiled : require('parallelio').Tiled;
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Tiled, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Tiled = (function(superClass) {
  extend(Tiled, superClass);

  Tiled.extend(Display);

  Tiled.include(EventEmitter.prototype);

  function Tiled() {
    Tiled.__super__.constructor.call(this);
    this.initDisplay();
  }

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

})(BaseTiled);

return(Tiled);});