(function(definition){Door=definition(typeof(Parallelio.DOM)!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Door.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Door;}else{if(typeof(Parallelio.DOM)!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Door=Door;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Door=Door;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var BaseDoor = dependencies.hasOwnProperty("BaseDoor") ? dependencies.BaseDoor : require('parallelio').Door.definition({
var Door, Updater, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
  Tiled: Tiled
});

Updater = require('./Updater');

Door = (function(superClass) {
  extend(Door, superClass);

  function Door(direction) {
    this.baseCls = 'door';
    Door.__super__.constructor.call(this, direction);
  }

  Door.properties({
    direction: {
      updater: Updater.instance,
      change: function(old) {
        if (this.getPropertyInstance('display').calculated) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.direction != null) {
            return this.display.addClass(this.direction);
          }
        }
      }
    }
  });

  return Door;

})(BaseDoor);

return(Door);});