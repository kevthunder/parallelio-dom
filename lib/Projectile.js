(function(definition){var Projectile=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Projectile.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Projectile;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Projectile=Projectile;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Projectile=Projectile;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseProjectile = dependencies.hasOwnProperty("BaseProjectile") ? dependencies.BaseProjectile : require('parallelio').Projectile;
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : require('./Updater');
var Projectile;
Projectile = (function() {
  class Projectile extends BaseProjectile {
    init() {
      super.init();
      this.baseCls = 'projectile';
      return this.initDisplay();
    }

    destroy() {
      this.destroyDisplay();
      return Updater.instance.removeCallback(this.callback('invalidatePrcPath'));
    }

  };

  Projectile.extend(Display);

  Projectile.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.prop('container');
        if (container != null ? container.getProperty('tileDisplay') : void 0) {
          return invalidator.prop('tileDisplay', container);
        } else if (container != null ? container.getProperty('display') : void 0) {
          return invalidator.prop('display', container);
        } else {
          return invalidator.prop('originTile').displayContainer;
        }
      }
    },
    displayX: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayX(invalidate.prop('x'));
      }
    },
    displayY: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayY(invalidate.prop('y'));
      }
    },
    moving: {
      change: function() {
        if (this.moving) {
          return Updater.instance.addCallback(this.callback('invalidatePrcPath'));
        } else {
          return Updater.instance.removeCallback(this.callback('invalidatePrcPath'));
        }
      }
    }
  });

  return Projectile;

}).call(this);

return(Projectile);});