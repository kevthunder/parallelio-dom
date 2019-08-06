var BaseShip, Display, DomUpdater, Ship;

BaseShip = require('parallelio').Ship;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

module.exports = Ship = (function() {
  class Ship extends BaseShip {
    init() {
      this.baseCls = 'ship';
      return super.init();
    }

  };

  Ship.extend(Display);

  Ship.properties({
    displayContainer: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.displayContainer');
      }
    },
    displayX: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.x');
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.y');
      }
    },
    orbiting: {
      calcul: function(invalidator) {
        return invalidator.prop('travel') === null;
      },
      change: new DomUpdater({
        callback: function(old) {
          if (this.orbiting) {
            return this.display.addClass("orbiting");
          } else {
            return this.display.removeClass("orbiting");
          }
        }
      })
    }
  });

  return Ship;

}).call(this);

//# sourceMappingURL=maps/Ship.js.map
