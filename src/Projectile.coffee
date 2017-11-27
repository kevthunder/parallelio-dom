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
    container:
      calcul: (invalidate)->
        originTile = invalidate.prop('originTile')
        targetTile = invalidate.prop('targetTile')
        if originTile.container == targetTile.container
          originTile.container
        else if invalidate.prop('prcPath') > 0.5
          targetTile.container
        else
          originTile.container
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.prop('container')
        if container?.getProperty('tileDisplay')
          invalidator.prop('tileDisplay',container)
        else if container?.getProperty('display')
          invalidator.prop('display',container)
    displayX:
      calcul: (invalidate)->
        startDisplayPos = invalidate.prop('startDisplayPos')
        (invalidate.prop('targetDisplayPos').x - startDisplayPos.x)*invalidate.prop('prcPath') + startDisplayPos.x
    displayY:
      calcul: (invalidate)->
        startDisplayPos = invalidate.prop('startDisplayPos')
        (invalidate.prop('targetDisplayPos').y - startDisplayPos.y)*invalidate.prop('prcPath') + startDisplayPos.y
    startDisplayPos:
      calcul: (invalidate)->
        originTile = invalidate.prop('originTile')
        container = invalidate.prop('container')
        offset = @startOffset;
        unless originTile.container == container
          dist = container.dist(originTile.container)
          offset.x += dist.x
          offset.y += dist.y
        {
          x: originTile.tileToDisplayX(originTile.x+offset.x)
          y: originTile.tileToDisplayY(originTile.y+offset.y)
        }
      output:(val)->
        Object.assign({},val)
    targetDisplayPos:
      calcul: (invalidate)->
        targetTile = invalidate.prop('targetTile')
        container = invalidate.prop('container')
        offset = @targetOffset;
        unless targetTile.container == container
          dist = container.dist(targetTile.container)
          offset.x += dist.x
          offset.y += dist.y
        {
          x: targetTile.tileToDisplayX(targetTile.x+offset.x)
          y: targetTile.tileToDisplayY(targetTile.y+offset.y)
        }
      output:(val)->
        Object.assign({},val)
    moving:
      change: ()->
        if @moving
          Updater.instance.addCallback(@callback('invalidatePrcPath'))
        else
          Updater.instance.removeCallback(@callback('invalidatePrcPath'))
    prcPath:
      calcul: (invalidate)->
        @pathTimeout.getPrc()

  destroy: ->
    Updater.instance.removeCallback(@callback('invalidatePrcPath'))


