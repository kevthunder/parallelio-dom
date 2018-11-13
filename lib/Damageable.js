(function(definition){var Damageable=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Damageable.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Damageable;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Damageable=Damageable;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Damageable=Damageable;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseDamageable = dependencies.hasOwnProperty("BaseDamageable") ? dependencies.BaseDamageable : require('parallelio').Damageable;
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : require('./Updater');
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var Damageable;
Damageable = (function() {
  class Damageable extends BaseDamageable {
    constructor() {
      super();
      this.healthCls();
      this.initDisplay();
    }

  };

  Damageable.extend(Display);

  Damageable.include(EventEmitter.prototype);

  Damageable.properties({
    healthClsSteps: {
      default: 10
    },
    healthCls: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      calcul: function(invalidator) {
        return 'health-' + (Math.ceil(invalidator.prop('health') / invalidator.prop('maxHealth') * invalidator.prop('healthClsSteps')));
      },
      change: function(old) {
        if (old != null) {
          this.display.removeClass(old);
        }
        if (this.healthCls != null) {
          return this.display.addClass(this.healthCls);
        }
      }
    }
  });

  return Damageable;

}).call(this);

return(Damageable);});