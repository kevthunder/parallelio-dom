Tile = require('./Tile')
TileContainer = require('parallelio').TileContainer
DefaultGenerator = require('parallelio').RoomGenerator

Ship = {}
class Ship.Tiled extends TileContainer
  @include EventEmitter.prototype
  init: ->
    super()
    @displayContainer

  @properties
    container: {}
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.prop('container')
        if container?.getProperty('display')
          container.display
      change: ->
        if @displayContainer?
          @display.appendTo(@displayContainer)
    display:
      calcul: ->
        display = $(document.createElement("div"))
          .addClass('ship')
        display.get(0)._parallelio_obj = this
        display
  generate: (generator)->
    generator = generator || (new DefaultGenerator()).tap ->
      @wallFactory = (opt) ->
        (new Tile(opt.x,opt.y)).tap ->
          @cls = 'wall'
          @walkable = false
      @floorFactory = (opt) ->
        (new Tile(opt.x,opt.y)).tap ->
          @cls = 'floor'
          @walkable = true
    generator.getTiles().forEach (tile)=>
      @addTile(tile)
