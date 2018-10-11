Element = require('parallelio').Element

class View extends Element
  constructor: (@display = null) ->
    super()
    @hovered = false
    @keysInterval = {}
  @directionkeys = {
    38: {name: 'top',    x: 0,  y: -1}
    39: {name: 'right',  x: 1,  y: 0}
    40: {name: 'bottom', x: 0,  y: 1}
    37: {name: 'left',   x: -1, y: 0}
  }
  @properties
    x:
      default: 0
      change: ->
        @updateDisplayPos()
    y:
      default: 0
      change: ->
        @updateDisplayPos()
    display:
      change: ->
        if $('.viewContent', @display).length == 0
          $(@display).append('<div class="viewContent"></div>')
        @updateDisplayPos()
        $(@display).mouseenter @callback('mouseEnter')
        $(@display).mouseleave @callback('mouseLeave')
    contentDisplay:
      calcul: ->
        $('.viewContent', @display)
  mouseEnter: ->
    @hovered = true
    $('body').keydown( @callback('keyDown') )
    $('body').keyup( @callback('keyUp') )
  mouseLeave: ->
    @hovered = false
    $('body').off( 'keydown', @callback('keyDown') )
    $('body').off( 'keyup', @callback('keyUp') )
    for code, interval of @keysInterval
      clearInterval(interval)
  keyDown: (e) ->
    if View.directionkeys[e.which]?
      key = View.directionkeys[e.which]
      clearInterval(@keysInterval[key.name]) if @keysInterval[key.name]?
      @keysInterval[key.name] = setInterval =>
        @x+= key.x * 2
        @y+= key.y * 2
      , 10
  keyUp: (e) ->
    if View.directionkeys[e.which]?
      key = View.directionkeys[e.which]
      clearInterval(@keysInterval[key.name]) if @keysInterval[key.name]?
  updateDisplayPos: ->
    $('.viewContent', @display).css(
      left: @x+'px'
      top: @y+'px'
    )
  containsPoint: (x, y) -> 
    container = @display[0]
    while container
      x -= container.offsetLeft;
      y -= container.offsetTop;
      container = container.offsetParent
    0 <= x <= @display.width() and 0 <= y <= @display.height()
