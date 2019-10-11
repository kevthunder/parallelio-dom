Element = require('parallelio').Element
DomUpdater = require('./DomUpdater')

module.exports = class Display extends Element
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
    if this.displayProperty.value?
      @display.remove()
    