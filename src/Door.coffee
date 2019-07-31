Tiled = require('./Tiled')
BaseDoor = require('parallelio').Door
DomUpdater = require('./DomUpdater')
Element = require('spark-starter').Element

module.exports = class Door extends BaseDoor
  @extend Tiled
  constructor: (direction) ->
    super(direction)
    @baseCls = 'door'
    @initDisplay()
    @open

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
        
    