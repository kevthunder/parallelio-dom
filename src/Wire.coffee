Tiled = require('./Tiled')
BaseWire = require('parallelio').Wire.definition({Tiled:Tiled})
Updater = require('./Updater')


class Wire extends BaseWire
  constructor: (wireType) ->
    super(wireType)
    @baseCls = 'wire'
    @connectedDirections

  @properties
    display:
      calcul: (invalidator,sup)->
        sup()
    connectedDirections:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        if old
          old.forEach (d) =>
            @display.removeClass @getClassFromDirection(d)
        @connectedDirections.forEach (d) =>
          @display.addClass @getClassFromDirection(d)
    wireType:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        if old
          @display.removeClass old
        @display.addClass @wireType
  
  getClassFromDirection: (d) ->
    'conn' + d.name.charAt(0).toUpperCase() + d.name.slice(1)