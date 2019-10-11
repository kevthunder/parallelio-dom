var BaseProjectile, Display, Projectile, Updater;

BaseProjectile = require('parallelio').Projectile;

Display = require('./Display');

Updater = require('./Updater');

module.exports = Projectile = (function() {
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
        container = invalidator.propByName('container');
        if (container != null ? container.getProperty('tileDisplay') : void 0) {
          return invalidator.propByName('tileDisplay', container);
        } else if (container != null ? container.getProperty('display') : void 0) {
          return invalidator.propByName('display', container);
        } else {
          return invalidator.propByName('originTile').displayContainer;
        }
      }
    },
    displayX: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayX(invalidate.propByName('x'));
      }
    },
    displayY: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayY(invalidate.propByName('y'));
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

//# sourceMappingURL=maps/Projectile.js.map
