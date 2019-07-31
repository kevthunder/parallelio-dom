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
        container = invalidator.prop('container')
        if container?.getProperty('tileDisplay')
          invalidator.prop('tileDisplay',container)
        else if container?.getProperty('display')
          invalidator.prop('display',container)
    displayX:
      calcul: (invalidator) ->
        debugger
        @tileToDisplayX(invalidator.prop('x'))
    displayY:
      calcul: (invalidator) ->
        @tileToDisplayY(invalidator.prop('y'))
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