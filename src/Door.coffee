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
      change: (old)->
        if @getPropertyInstance('display').calculated
          if old?
            @display.removeClass(old)
          if @direction?
            @display.addClass(@direction)
    