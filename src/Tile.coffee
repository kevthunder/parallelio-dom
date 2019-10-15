BaseTile = require('parallelio').tiles.Tile
BaseFloor = require('parallelio').Floor
Display = require('./Display')

module.exports = class Tile extends BaseTile
  @extend Display
  @size: 20
  init: ->
    super()
    @baseCls = 'tile'
    @initDisplay()

  @properties
    container: {}
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.propByName('container')
        if container?.propertiesManager.getProperty('tileDisplay')
          invalidator.propByName('tileDisplay',container)
        else if container?.propertiesManager.getProperty('display')
          invalidator.propByName('display',container)
    displayX:
      calcul: (invalidator) ->
        @tileToDisplayX(invalidator.propByName('x'))
    displayY:
      calcul: (invalidator) ->
        @tileToDisplayY(invalidator.propByName('y'))
  tileToDisplayX: (x) ->
    x*Tile.size
  tileToDisplayY: (y) ->
    y*Tile.size

class Tile.Floor extends BaseFloor
  @extend Tile
  init: ->
    super()
    @baseCls = 'tile'
    @cls = 'floor'