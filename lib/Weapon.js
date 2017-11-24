(function(definition){Weapon=definition(typeof(Parallelio.DOM)!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Weapon.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Weapon;}else{if(typeof(Parallelio.DOM)!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Weapon=Weapon;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Weapon=Weapon;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var Damageable = dependencies.hasOwnProperty("Damageable") ? dependencies.Damageable : require('./Damageable');
var BaseWeapon = dependencies.hasOwnProperty("BaseWeapon") ? dependencies.BaseWeapon : require('parallelio').Weapon.definition({
var Updater, Weapon, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
  Tiled: Tiled,
  Damageable: Damageable
});

Updater = require('./Updater');

Weapon = (function(superClass) {
  extend(Weapon, superClass);

  function Weapon(direction) {
    this.baseCls = 'weapon';
    Weapon.__super__.constructor.call(this, direction);
  }

  Weapon.properties({
    direction: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        if (old != null) {
          this.display.removeClass(old.name);
        }
        if (this.direction.name != null) {
          return this.display.addClass(this.direction.name);
        }
      }
    }
  });

  return Weapon;

})(BaseWeapon);

return(Weapon);});