(function(definition){var Weapon=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Weapon.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Weapon;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Weapon=Weapon;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Weapon=Weapon;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var Projectile = dependencies.hasOwnProperty("Projectile") ? dependencies.Projectile : require('./Projectile');
var Damageable = dependencies.hasOwnProperty("Damageable") ? dependencies.Damageable : require('./Damageable');
var BaseWeapon = dependencies.hasOwnProperty("BaseWeapon") ? dependencies.BaseWeapon : require('parallelio').Weapon.definition({
var Updater, Weapon;
  Tiled: Tiled,
  Damageable: Damageable,
  Projectile: Projectile
});

Updater = require('./Updater');

Weapon = (function() {
  class Weapon extends BaseWeapon {
    constructor(direction) {
      super(direction);
      this.baseCls = 'weapon';
    }

  };

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

}).call(this);

return(Weapon);});