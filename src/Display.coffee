Element = require('parallelio').Element
Updater = require('./Updater')

class Display extends Element
  @include EventEmitter.prototype
  @properties
    displayContainer:
      updater: Updater.instance
      default: null
      change: ->
        if @displayContainer?
          @display.appendTo(@displayContainer)
    cls:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
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
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        @display.css(left: @displayX)
    displayY:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        @display.css(top: @displayY)

  initDisplay: ->
    @cls
    @displayX
    @displayY
    @displayContainer

  destroyDisplay: ->
    if @_display?
      @display.remove()
    