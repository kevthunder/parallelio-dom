Tiled = require('./Tiled')
BaseCharacter = require('parallelio').Character
DomUpdater = require('./DomUpdater')
Element = require('spark-starter').Element

class Character extends BaseCharacter
  @extend Tiled.definition({BaseTiled:Element})
  constructor: () ->
    super()
    @initDisplay()
    @baseCls = 'character'
    
  @properties
    selected:
      change: new DomUpdater callback: (old)->
        @display.toggleClass('selected',@selected)
    