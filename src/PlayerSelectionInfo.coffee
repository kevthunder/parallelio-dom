Display = require('./Display')
Updater = require('./Updater')

class PlayerSelectionInfo extends Display
  constructor: () ->
    super()
    @initDisplay()
    @baseCls = 'selectionInfo'
    @name
    @game
    @actions

  @properties
    display:
      calcul: (invalidator, overrided)->
        div = overrided()
        div.html('<div class="name"></div><div class="actions"><span class="title">Actions :</span><ul></ul></div>')
        div
    player:
      default: null
    selection:
      calcul: (invalidator)->
        invalidator.propPath("player.selected")
    name:
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      calcul: (invalidator) ->
        sel = invalidator.prop("selection")
        if sel?
          invalidator.prop("name",sel) || sel.constructor.name
      change: ->
        @display.find(".name").text(@name)

    actions:
      collection: true 
      calcul: (invalidator)->
        invalidator.propPath("selection.availableActions") || []
      change: ->
        list = @display.find(".actions ul")
        list.empty()
        @actions.forEach (action)->
          name = action.name || action.constructor.name
          display = $('<li>'+name+'</li>')
          display.on "click", ->
            action.start()
          list.append(display)



    game:
      change: (old)->
        if @game 
          @setDefaults()

  setDefaults: ()->
    if !@displayContainer and @game.mainUI
      @displayContainer = @game.mainUI
    if !@player and @game.currentPlayer
      @player = @game.currentPlayer


