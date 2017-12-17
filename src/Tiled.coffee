BaseTiled = require('parallelio').Tiled
Display = require('./Display')

class Tiled extends BaseTiled
  @extend Display
  @include EventEmitter.prototype
  
  constructor: () ->
    super()
    @initDisplay()

  @properties
    displayContainer:
      calcul: (invalidator) ->
        tile = invalidator.prop('tile')
        if tile?
          invalidator.prop('displayContainer',tile)
    displayX:
      calcul: (invalidator) ->
        tile = invalidator.prop('tile')
        if tile?
          tile.displayX + tile.tileToDisplayX(invalidator.prop('offsetX'))
    displayY:
      calcul: (invalidator) ->
        tile = invalidator.prop('tile')
        if tile?
          tile.displayY + tile.tileToDisplayY(invalidator.prop('offsetY'))
