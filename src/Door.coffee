Tiled = require('./Tiled')
BaseDoor = require('parallelio').Door.definition({Tiled:Tiled})

class Door extends BaseDoor
  constructor: (direction) ->
    @baseCls = 'door'
    super(direction)
    