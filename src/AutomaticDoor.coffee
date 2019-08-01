Door = require('./Door')
BaseAutomaticDoor = require('parallelio').AutomaticDoor

module.exports = class AutomaticDoor extends BaseAutomaticDoor 
  @extend Door

  init: ->
    @baseCls = 'door'
    super()
    @initDisplay()