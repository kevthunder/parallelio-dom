(function(definition){var Door=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Door.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Door;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Door=Door;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Door=Door;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var BaseDoor = dependencies.hasOwnProperty("BaseDoor") ? dependencies.BaseDoor : require('parallelio').Door.definition({
var Door, Updater;
  Tiled: Tiled
});

Updater = require('./Updater');

Door = (function() {
  class Door extends BaseDoor {
    constructor(direction) {
      super(direction);
      this.baseCls = 'door';
    }

  };

  Door.properties({
    direction: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        if (old != null) {
          this.display.removeClass(old);
        }
        if (this.direction != null) {
          return this.display.addClass(this.direction);
        }
      }
    }
  });

  return Door;

}).call(this);

return(Door);});