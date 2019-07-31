BaseView = require('parallelio').View
DomUpdater = require('./DomUpdater')
Display = require('./Display')

module.exports = class View extends BaseView
  @extend Display
  constructor: (display = null) ->
    super()
    if display?
      @display = display
    @hovered = false
    @keysInterval = {}
    @baseCls = 'view'
    @boundsStyles
  @directionkeys = {
    38: {name: 'top',    x: 0,  y: 1}
    39: {name: 'right',  x: -1,  y: 0}
    40: {name: 'bottom', x: 0,  y: -1}
    37: {name: 'left',   x: 1, y: 0}
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
      calcul:(invalidator,original)->
        display = original()
        if $('.viewContent', display).length == 0
          $(display).append('<div class="viewContent"></div>')
        $(display).mouseenter @callback('mouseEnter')
        $(display).mouseleave @callback('mouseLeave')
      change: ->
        @updateDisplayPos()
    contentDisplay:
      calcul: ->
        $('.viewContent', @display)
    boundsStyles:
      calcul: (invalidator)->
        top: invalidator.prop('top',@bounds)*100 + '%'
        left: invalidator.prop('left',@bounds)*100 + '%'
        bottom: (1-invalidator.prop('bottom',@bounds))*100 + '%'
        right: (1-invalidator.prop('right',@bounds))*100 + '%'
      change: new DomUpdater callback: (old)->
        @display.css(@boundsStyles)

  setDefaults: ->
    super()
    unless @displayContainer?
      @displayContainer = $('body')
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
