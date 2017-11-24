Tiled = require('./Tiled')
Damageable = require('./Damageable')
BaseWeapon = require('parallelio').Weapon.definition({Tiled:Tiled,Damageable:Damageable})
Updater = require('./Updater')

class Weapon extends BaseWeapon
  constructor: (direction) ->
    @baseCls = 'weapon'
    super(direction)

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