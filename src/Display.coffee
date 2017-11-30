Element = require('parallelio').Element
Updater = require('./Updater')

class Display extends Element
  @include EventEmitter.prototype

  initDisplay: ->
    @displayContainer
    
  @properties
    displayContainer:
      updater: Updater.instance
      default: null
      change: ->
        if @displayContainer?
          @display.appendTo(@displayContainer)
    cls:
      updater: Updater.instance
      change: (old)->
        if @getPropertyInstance('display').calculated
          if old?
            @display.removeClass(old)
          if @cls?
            @display.addClass(@cls)
    display:
      calcul: ->
        newDiv = document.createElement("div");
        display = jQuery(newDiv)
          .addClass(@baseCls)
          .addClass(@cls)
          .css(top: @displayY, left: @displayX)
        display.get(0)._parallelio_obj = this
        display
    displayX:
      updater: Updater.instance
      default: 0
      change: (old)->
        if @getPropertyInstance('display').calculated
          @display.css(left: @displayX)
    displayY:
      updater: Updater.instance
      default: 0
      change: (old)->
        if @getPropertyInstance('display').calculated
          @display.css(top: @displayY)