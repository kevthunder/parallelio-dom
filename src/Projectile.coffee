BaseProjectile = require('parallelio').Projectile
Display = require('./Display')
Updater = require('./Updater')

module.exports = class Projectile extends BaseProjectile
  @extend Display
  init: ->
    super()
    @baseCls = 'projectile'
    @initDisplay()
  @properties
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.propByName('container')
        if container?.propertiesManager.getProperty('tileDisplay')
          invalidator.propByName('tileDisplay',container)
        else if container?.propertiesManager.getProperty('display')
          invalidator.propByName('display',container)
        else 
          invalidator.propByName('originTile').displayContainer
    displayX:
      calcul: (invalidate)->
        @originTile.tileToDisplayX invalidate.propByName('x')
    displayY:
      calcul: (invalidate)->
        @originTile.tileToDisplayY invalidate.propByName('y')

  destroy: ->
    @destroyDisplay()


