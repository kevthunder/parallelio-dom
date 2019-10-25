Element = require('spark-starter').Element

module.exports = class PlayerController extends Element
  @properties
    player:
      change: ->
        if @player
          @setDefaults()

    gameDisplay:
      change: ->
        if @gameDisplay
          $(@gameDisplay).on('click',@callback('checkTargetOrSelectable'))
          $(@gameDisplay).on('mouseover',@callback('checkFocus'))

  setDefaults: ()->
    unless @gameDisplay
      @gameDisplay = document.body

  checkFocus: (e)->
    @_bubbleUp e.target, (target)=>
      if @player.canFocusOn(target)
        @player.focused = target
        return true
  checkTargetOrSelectable: (e)->
    @_bubbleUp e.target, (target)=>
      if action = @player.canTargetActionOn(target)
        @player.selectedAction = action
        @player.setActionTarget(target)
        return true
      else if @player.canSelect(target)
        @player.selected = target
        return true
  _bubbleUp: (target,stopCallback)->
    while target
      target = if target._parallelio_obj?
        target._parallelio_obj
      else if target.parentNode?
        target.parentNode
      else if stopCallback(target)
        null
      else if target.tile?
        target.tile
      else if target.display?.get(0).parentNode?
        target.display.get(0).parentNode
      else
        null
    null  