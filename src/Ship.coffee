BaseShip = require('parallelio').Ship
Display = require('./Display')
DomUpdater = require('./DomUpdater')

module.exports = class Ship extends BaseShip
  @extend Display

  @properties
    displayContainer:
      calcul: (invalidator) ->
        invalidator.propPath('location.displayContainer')
    displayX:
      calcul: (invalidator) ->
        invalidator.propPath('location.x')
    displayY:
      calcul: (invalidator) ->
        invalidator.propPath('location.y')
    orbiting:
      calcul: (invalidator) ->
        invalidator.propByName('travel') == null
      change: new DomUpdater callback: (old)->
        if @orbiting
          @display.addClass("orbiting")
        else
          @display.removeClass("orbiting")



  init: ->
    @baseCls = 'ship'
    super()

