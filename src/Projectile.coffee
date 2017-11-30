BaseProjectile = require('parallelio').Projectile
Display = require('./Display')
Updater = require('./Updater')

class Projectile extends BaseProjectile
  @extend Display
  init: ->
    super()
    @baseCls = 'projectile'
    @initDisplay()
  @properties
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.prop('container')
        if container?.getProperty('tileDisplay')
          invalidator.prop('tileDisplay',container)
        else if container?.getProperty('display')
          invalidator.prop('display',container)
        else 
          invalidator.prop('originTile').displayContainer
    displayX:
      calcul: (invalidate)->
        @originTile.tileToDisplayX invalidate.prop('x')
    displayY:
      calcul: (invalidate)->
        @originTile.tileToDisplayY invalidate.prop('y')
    moving:
      change: ()->
        if @moving
          Updater.instance.addCallback(@callback('invalidatePrcPath'))
        else
          Updater.instance.removeCallback(@callback('invalidatePrcPath'))

  destroy: ->
    Updater.instance.removeCallback(@callback('invalidatePrcPath'))


