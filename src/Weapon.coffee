Tiled = require('./Tiled')
Projectile = require('./Projectile')
Damageable = require('./Damageable')
BaseWeapon = require('parallelio').Weapon.definition({Tiled:Tiled,Damageable:Damageable,Projectile:Projectile})
Updater = require('./Updater')

class Weapon extends BaseWeapon
  constructor: (direction) ->
    super(direction)
    @baseCls = 'weapon'

  @properties
    direction:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        if old?
          @display.removeClass(old.name)
        if @direction.name?
          @display.addClass(@direction.name)