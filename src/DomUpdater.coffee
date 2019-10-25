PropertyWatcher = require('parallelio').Spark.watchers.PropertyWatcher

module.exports = class DomUpdater extends PropertyWatcher

  constructor: (options)->
    super(options)

  init: ()->
    @updateDomCallback = => @updateDom()
    super()

  requestFrame: () ->
    if !@framebinded
      @framebinded = true
      window.requestAnimationFrame(@updateDomCallback)

  validContext: ->
    true
    
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