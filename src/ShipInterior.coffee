Tile = require('./Tile')
TileContainer = require('parallelio').tiles.TileContainer
DefaultGenerator = require('parallelio').generators.RoomGenerator
Door = require('./AutomaticDoor')

module.exports = class ShipInterior extends TileContainer
  init: ->
    super()
    @displayContainer

  @properties
    container: {}
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.propByName('container')
        if container?.propertiesManager.getProperty('contentDisplay')
          container.contentDisplay
        else if container?.propertiesManager.getProperty('display')
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
      change: (val, old)->
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
    generator = generator || (new ShipInterior.Generator()).tap ->
    generator.getTiles().forEach (tile)=>
      @addTile(tile)

class ShipInterior.Generator extends DefaultGenerator
  wallFactory: (opt) ->
    (new Tile(opt.x,opt.y)).tap ->
      @cls = 'wall'
      @walkable = false
  floorFactory: (opt) ->
    (new Tile.Floor(opt.x,opt.y))
  doorFactory: (opt) ->
    (new Tile.Floor(opt.x,opt.y)).tap ->
      @addChild new Door(direction: opt.direction)