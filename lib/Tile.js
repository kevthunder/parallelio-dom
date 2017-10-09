var BaseTile, Tile, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseTile = ((ref = this.Parallelio) != null ? ref.Tile : void 0) || require('parallelio').Tile;

Tile = (function(superClass) {
  extend(Tile, superClass);

  function Tile() {
    return Tile.__super__.constructor.apply(this, arguments);
  }

  Tile.include(EventEmitter.prototype);

  Tile.size = 20;

  Tile.prototype.init = function() {
    Tile.__super__.init.call(this);
    return this.containerDisplay = $('#TileContainer');
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
      },
      change: function() {
        if (this.displayContainer != null) {
          return this.display.appendTo(this.displayContainer);
        }
      }
    },
    cls: {
      change: function(old) {
        if (this.getPropertyInstance('display').calculated) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.cls != null) {
            return this.display.addClass(this.cls);
          }
        }
      }
    },
    display: {
      calcul: function() {
        var display, displayPos, newDiv;
        newDiv = document.createElement("div");
        displayPos = this.getDisplayPos();
        display = jQuery(newDiv).addClass('tile').addClass(this.cls).css({
          top: displayPos.y,
          left: displayPos.x
        });
        display.get(0)._parallelio_obj = this;
        return display;
      }
    }
  });

  Tile.prototype.getDisplayPos = function() {
    return this.tileToDisplayPos(this.x, this.y);
  };

  Tile.prototype.tileToDisplayPos = function(x, y) {
    return {
      x: x * Tile.size,
      y: y * Tile.size
    };
  };

  return Tile;

})(BaseTile);

if (typeof DOM !== "undefined" && DOM !== null) {
  DOM.Tile = Tile;
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = Tile;
} else {
  if (this.Parallelio == null) {
    this.Parallelio = {};
  }
  if (this.Parallelio.DOM == null) {
    this.Parallelio.DOM = {};
  }
  this.Parallelio.DOM.Tile = Tile;
}
