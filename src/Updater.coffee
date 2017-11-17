BaseUpdater = require('parallelio').Spark.Updater

class Updater extends BaseUpdater
  constructor: () ->
    super()
    @updateCallback = => @update()
    @binded = false

  update: ->
    super()
    @binded = false
    if @callbacks.length > 0
      @requestFrame()

  requestFrame: () ->
    if !@binded
      window.requestAnimationFrame(@updateCallback)
      @binded = true

  addCallback: (callback)->
    super(callback)
    @requestFrame()

Updater.instance = new Updater()