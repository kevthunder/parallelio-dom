BaseUpdater = require('parallelio').Spark.Updater

class Updater extends BaseUpdater
  constructor: () ->
    super()
    @updateCallback = => @update()
    @binded = false

  update: ->
    loop
      if @callbacks.length == 0
        break
      @callbacks[0]()
    @binded = false

  requestFrame: () ->
    if !@binded
      window.requestAnimationFrame(@updateCallback)
      @binded = true

  addCallback: (callback)->
    super(callback)
    @requestFrame()

Updater.instance = new Updater()