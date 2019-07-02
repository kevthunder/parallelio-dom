Element = require('parallelio').Element
DomUpdater = require('./DomUpdater')
EventEmitter = require('spark-starter').EventEmitter

class Display extends Element
  @include EventEmitter.prototype
  @properties
    displayContainer:
      default: null
      change: new DomUpdater callback: ->
        if @displayContainer?
          @display.appendTo(@displayContainer)
    cls:
      change: new DomUpdater callback: (old)->
        if old?
          @display.removeClass(old)
        if @cls?
          @display.addClass(@cls)
    display:
      calcul: ->
        newDiv = document.createElement("div");
        display = jQuery(newDiv)
          .addClass(@baseCls)
        display.get(0)._parallelio_obj = this
        display
    displayX:
      change: new DomUpdater callback: ->
        @display.css(left: @displayX)
    displayY:
      change: new DomUpdater callback: ->
        @display.css(top: @displayY)

  initDisplay: ->

  destroyDisplay: ->
    if @_display?
      @display.remove()
    