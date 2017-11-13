BaseTile = require('parallelio').Tile

class Tile extends BaseTile
  @include EventEmitter.prototype
  @size: 20
  init: ->
    super()
    @displayContainer
  @properties
    container: {}
    displayContainer:
      calcul: (invalidator) ->
        container = invalidator.prop('container')
        if container?.getProperty('tileDisplay')
          invalidator.prop('tileDisplay',container)
        else if container?.getProperty('display')
          invalidator.prop('display',container)
      change: ->
        if @displayContainer?
          @display.appendTo(@displayContainer)
    cls:
      change: (old)->
        if @getPropertyInstance('display').calculated
          if old?
            @display.removeClass(old)
          if @cls?
            @display.addClass(@cls)
    display:
      calcul: ->
        newDiv = document.createElement("div");
        displayPos = @getDisplayPos()
        display = jQuery(newDiv)
          .addClass('tile')
          .addClass(@cls)
          .css(top: displayPos.y, left: displayPos.x)
        display.get(0)._parallelio_obj = this
        display
  getDisplayPos: ->
    @tileToDisplayPos(@x, @y)
  tileToDisplayPos: (x, y) ->
    x:x*Tile.size, y:y*Tile.size
