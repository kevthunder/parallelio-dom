BaseGame = require('parallelio').Game
View = require('./View')
PlayerController = require('./PlayerController')
Updater = require('./Updater')

class Game extends BaseGame
  @properties
    timing:
      calcul: (invalidator,original)->
        timing = original()
        timing.updater = Updater.instance
        timing
  defaultViewClass: View
  defaultPlayerControllerClass: PlayerController