Tiled = require('./Tiled')
BaseDoor = require('parallelio').Door
Updater = require('./Updater')
Element = require('spark-starter').Element

class Door extends BaseDoor
  @extend Tiled.definition({BaseTiled:Element})
  constructor: (direction) ->
    super(direction)
    @initDisplay()
    @open
    @baseCls = 'door'

  @properties
    direction:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        if old?
          @display.removeClass(old)
        if @direction?
          @display.addClass(@direction)
    open:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        @display.toggleClass('close',!@open)
        @display.toggleClass('open',@open)
        
    