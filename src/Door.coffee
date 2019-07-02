Tiled = require('./Tiled')
BaseDoor = require('parallelio').Door
DomUpdater = require('./DomUpdater')
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
      change: new DomUpdater callback: (old)->
        if old?
          @display.removeClass(old)
        if @direction?
          @display.addClass(@direction)
    open:
      change: new DomUpdater callback: (old)->
        @display.toggleClass('close',!@open)
        @display.toggleClass('open',@open)
        
    