Tiled = require('./Tiled')
BaseCharacter = require('parallelio').Character
DomUpdater = require('./DomUpdater')
Element = require('spark-starter').Element

module.exports = class Character extends BaseCharacter
  @extend Tiled
  constructor: () ->
    super()
    @initDisplay()
    @baseCls = 'character'
    
  @properties
    selected:
      change: new DomUpdater callback: (old)->
        @display.toggleClass('selected',@selected)
    