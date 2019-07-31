Tiled = require('./Tiled')
Projectile = require('./Projectile')
Damageable = require('./Damageable')
BaseWeapon = require('parallelio').ShipWeapon
DomUpdater = require('./DomUpdater')

module.exports = class ShipWeapon extends BaseWeapon
  @extend Tiled
  @extend Damageable

  constructor: (direction) ->
    super(direction)
    @baseCls = 'weapon'

  @properties
    direction:
      change: new DomUpdater callback: (old)->
        if old?
          @display.removeClass(old.name)
        if @direction.name?
          @display.addClass(@direction.name)