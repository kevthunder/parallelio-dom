PropertyWatcher = require('parallelio').Spark.PropertyWatcher

class DomUpdater extends PropertyWatcher

  constructor: (options)->
    super(options)

  init: ()->
    @updateDomCallback = => @updateDom()
    super()

  requestFrame: () ->
    if !@framebinded
      @framebinded = true
      window.requestAnimationFrame(@updateDomCallback)

  invalidate: ->
    @requestFrame()

  update: ()->
    @requestFrame()

  updateDom: (old)->
    value = @getProperty().get()
    if value != @old
      @old = value
      @handleChange(value, old)
      @framebinded = false