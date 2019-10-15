Tiled = require('./Tiled')
BaseWire = require('parallelio').wiring.Wire
DomUpdater = require('./DomUpdater')


module.exports = class Wire extends BaseWire
  @extend Tiled
  constructor: (wireType) ->
    super(wireType)
    @baseCls = 'wire'
    @connectedDirections

  @properties
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