Tiled = require('./Tiled')
Projectile = require('./Projectile')
Damageable = require('./Damageable')
BaseWeapon = require('parallelio').Weapon.definition({Tiled:Tiled,Damageable:Damageable,Projectile:Projectile})
DomUpdater = require('./DomUpdater')

class Weapon extends BaseWeapon
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