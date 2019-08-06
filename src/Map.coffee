BaseMap = require('parallelio').Map

module.exports = class Map extends BaseMap
  @properties
    displayContainer:
      default: null
      change:->
        @locations.forEach (location)=>
          location.displayContainer = @displayContainer
        if @displayContainer?
          @displayContainer.append(@backgroundCanvas)
    game:
      change: (old)->
        if @game 
          @setDefaults()
    starMargin:
      default: 10
    backgroundCanvas:
      calcul: ->
        canvas = document.createElement("canvas");
        canvas.width = @boundaries.right - @boundaries.left + @starMargin*2
        canvas.height = @boundaries.bottom - @boundaries.top + @starMargin*2
        canvas.classList.add("mapBackground");
        canvas.style.top = @boundaries.top - @starMargin + "px"
        canvas.style.left = @boundaries.left - @starMargin + "px"
        @drawBackground(canvas)
        canvas

  setDefaults: ->
    unless @displayContainer?
      @displayContainer = @game.mainView.contentDisplay
      
  drawBackground: (canvas)->
    context = canvas.getContext('2d')
    @locations.forEach (location)=>
      location.draw?(this,context)
