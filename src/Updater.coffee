Binder = require('parallelio').Spark.Binder

class Updater extends Binder

  constructor: (options)->
    super()
    @requestFrameCallback = => @requestFrame()
    @updateCallback = => @update()
    if options?
      @loadOptions(options)

  loadOptions: (options)->
    @scope = options.scope
    @property = options.property
    @callback = options.callback
    @autoBind = options.autoBind

  getProperty: ->
    if typeof @property == "string"
      @property = @scope.getPropertyInstance(@property)
    @property

  doBind: ->
    @update()
    @getProperty().on 'invalidated', @requestFrameCallback
    @getProperty().on 'updated', @requestFrameCallback

  doUnbind: ->
    @getProperty().off 'invalidated', @requestFrameCallback
    @getProperty().off 'updated', @requestFrameCallback
    
  requestFrame: () ->
    if !@framebinded
      window.requestAnimationFrame(@updateCallback)
      @framebinded = true

  update: (old)->
    value = @getProperty().get()
    @handleChange(value, old)
    @framebinded = false

  handleChange: (value, old)->
    @callback.call(@scope, old)