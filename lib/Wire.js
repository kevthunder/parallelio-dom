(function(definition){var Wire=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Wire.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Wire;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Wire=Wire;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Wire=Wire;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var BaseWire = dependencies.hasOwnProperty("BaseWire") ? dependencies.BaseWire : require('parallelio').Wire.definition({
var Updater, Wire, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
  Tiled: Tiled
});

Updater = require('./Updater');

Wire = (function(superClass) {
  extend(Wire, superClass);

  function Wire(wireType) {
    Wire.__super__.constructor.call(this, wireType);
    this.baseCls = 'wire';
    this.connectedDirections;
  }

  Wire.properties({
    display: {
      calcul: function(invalidator, sup) {
        return sup();
      }
    },
    connectedDirections: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        if (old) {
          old.forEach((function(_this) {
            return function(d) {
              return _this.display.removeClass(_this.getClassFromDirection(d));
            };
          })(this));
        }
        return this.connectedDirections.forEach((function(_this) {
          return function(d) {
            return _this.display.addClass(_this.getClassFromDirection(d));
          };
        })(this));
      }
    },
    wireType: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        if (old) {
          this.display.removeClass(old);
        }
        return this.display.addClass(this.wireType);
      }
    }
  });

  Wire.prototype.getClassFromDirection = function(d) {
    return 'conn' + d.name.charAt(0).toUpperCase() + d.name.slice(1);
  };

  return Wire;

})(BaseWire);

return(Wire);});