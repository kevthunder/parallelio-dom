Tiled = require('./Tiled')
BaseCharacter = require('parallelio').Character
Updater = require('./Updater')
Element = require('spark-starter').Element

class Character extends BaseCharacter
  @extend Tiled.definition({BaseTiled:Element})
  constructor: () ->
    super()
    @initDisplay()
    @baseCls = 'character'
    
  @properties
    selected:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      change: (old)->
        @display.toggleClass('selected',@selected)
    