BaseGame = require('parallelio').Game
View = require('./View')
PlayerController = require('./PlayerController')
# Updater = require('./Updater')

class Game extends BaseGame
  @properties
    timing:
      calcul: (invalidator,original)->
        timing = original()
        # timing.updater = Updater.instance
        timing
    mainUI:
      calcul: ->
        div = document.createElement("div");
        div.classList.add("ui")
        document.body.appendChild(div)
        div
  defaultViewClass: View
  defaultPlayerControllerClass: PlayerController