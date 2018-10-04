BaseTile = require('parallelio').Tile
BaseFloor = require('parallelio').Floor
Display = require('./Display')

class Tile extends BaseTile
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
        @tileToDisplayX(invalidator.prop('x'))
    displayY:
      calcul: (invalidator) ->
        @tileToDisplayY(invalidator.prop('y'))
  tileToDisplayX: (x) ->
    x*Tile.size
  tileToDisplayY: (y) ->
    y*Tile.size

class Tile.Floor extends BaseFloor.definition({Tile:Tile})
  init: ->
    super()
    @cls = 'floor'