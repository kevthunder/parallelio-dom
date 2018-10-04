(function(definition){var Wire=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Wire.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Wire;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Wire=Wire;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Wire=Wire;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var BaseWire = dependencies.hasOwnProperty("BaseWire") ? dependencies.BaseWire : require('parallelio').Wire.definition({
var Updater, Wire;
  Tiled: Tiled
});

Updater = require('./Updater');

Wire = (function() {
  class Wire extends BaseWire {
    constructor(wireType) {
      super(wireType);
      this.baseCls = 'wire';
      this.connectedDirections;
    }

    getClassFromDirection(d) {
      return 'conn' + d.name.charAt(0).toUpperCase() + d.name.slice(1);
    }

  };

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
          old.forEach((d) => {
            return this.display.removeClass(this.getClassFromDirection(d));
          });
        }
        return this.connectedDirections.forEach((d) => {
          return this.display.addClass(this.getClassFromDirection(d));
        });
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

  return Wire;

}).call(this);

return(Wire);});