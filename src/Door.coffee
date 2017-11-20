Tiled = require('./Tiled')
BaseDoor = require('parallelio').Door.definition({Tiled:Tiled})
Updater = require('./Updater')

class Door extends BaseDoor
  constructor: (direction) ->
    @baseCls = 'door'
    super(direction)

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
    