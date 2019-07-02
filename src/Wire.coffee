Tiled = require('./Tiled')
BaseWire = require('parallelio').Wire.definition({Tiled:Tiled})
DomUpdater = require('./DomUpdater')


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
      change: new DomUpdater callback: (old)->
        if old
          old.forEach (d) =>
            @display.removeClass @getClassFromDirection(d)
        @connectedDirections.forEach (d) =>
          @display.addClass @getClassFromDirection(d)
    wireType:
      change: new DomUpdater callback: (old)->
        if old
          @display.removeClass old
        @display.addClass @wireType
  
  getClassFromDirection: (d) ->
    'conn' + d.name.charAt(0).toUpperCase() + d.name.slice(1)