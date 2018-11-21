Tile = require('./Tile')
TileContainer = require('parallelio').TileContainer
DefaultGenerator = require('parallelio').RoomGenerator
Door = require('./AutomaticDoor')
EventEmitter = require('spark-starter').EventEmitter

class Ship extends TileContainer
  @include EventEmitter.prototype
  init: ->
    super()
    @displayContainer

  @properties
    container: {}
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.prop('container')
        if container?.getProperty('contentDisplay')
          container.contentDisplay
        else if container?.getProperty('display')
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
    game:
      change: (old)->
        if @game 
          @setDefaults()

  setDefaults: ->
    unless @displayContainer?
      @displayContainer = @game.mainView.contentDisplay
    unless @tiles.length > 0
      @generate()
    unless @game.mainTileContainer?
      @game.mainTileContainer = this
      
  generate: (generator)->
    generator = generator || (new Ship.Generator()).tap ->
    generator.getTiles().forEach (tile)=>
      @addTile(tile)

class Ship.Generator extends DefaultGenerator
  wallFactory: (opt) ->
    (new Tile(opt.x,opt.y)).tap ->
      @cls = 'wall'
      @walkable = false
  floorFactory: (opt) ->
    (new Tile.Floor(opt.x,opt.y))
  doorFactory: (opt) ->
    (new Tile.Floor(opt.x,opt.y)).tap ->
      @addChild new Door(opt.direction)