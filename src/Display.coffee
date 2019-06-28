Element = require('parallelio').Element
Updater = require('./Updater')
EventEmitter = require('spark-starter').EventEmitter

class Display extends Element
  @include EventEmitter.prototype
  @properties
    displayContainer:
      default: null
      change: new Updater callback: ->
        if @displayContainer?
          @display.appendTo(@displayContainer)
    cls:
      change: new Updater callback: (old)->
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
      change: new Updater callback: ->
        @display.css(left: @displayX)
    displayY:
      change: new Updater callback: ->
        @display.css(top: @displayY)

  initDisplay: ->
    @cls
    @displayX
    @displayY
    @displayContainer

  destroyDisplay: ->
    if @_display?
      @display.remove()
    