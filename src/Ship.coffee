#= require <Tile>
#--- Standalone ---
Tile = @DOM?.Tile || require('./Tile').Element
#--- Standalone end ---
TileContainer = @Parallelio?.TileContainer || require('parallelio').TileContainer
DefaultGenerator = @Parallelio?.RoomGenerator || require('parallelio').RoomGenerator



Ship = {}
class Ship.Tiled extends TileContainer
  @include EventEmitter.prototype
  @properties
    container: {}
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.prop('container')
        container.display || container
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

if DOM?
  DOM.Ship = Ship
#--- Standalone ---
if module?
  module.exports = Ship
else
  unless @Parallelio?
    @Parallelio = {}
  unless @Parallelio.DOM?
    @Parallelio.DOM = {}
  @Parallelio.DOM.Ship = Ship
#--- Standalone end ---