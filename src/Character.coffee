Tiled = require('./Tiled')
BaseCharacter = require('parallelio').Character.definition({Tiled:Tiled})
Updater = require('./Updater')

class Character extends BaseCharacter
  constructor: () ->
    super()
    @baseCls = 'character'
    