BaseTiled = require('parallelio').tiles.Tiled
Display = require('./Display')

module.exports = class Tiled extends Display
  
  constructor: () ->
    super()
    @initDisplay()

  @properties
    displayContainer:
      calcul: (invalidator) ->
        tile = invalidator.propByName('tile')
        if tile?
          invalidator.propByName('displayContainer',tile)
    displayX:
      calcul: (invalidator) ->
        tile = invalidator.propByName('tile')
        if tile?
          tile.displayX + tile.tileToDisplayX(invalidator.propByName('offsetX'))
    displayY:
      calcul: (invalidator) ->
        tile = invalidator.propByName('tile')
        if tile?
          tile.displayY + tile.tileToDisplayY(invalidator.propByName('offsetY'))
