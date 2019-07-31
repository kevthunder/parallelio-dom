BaseDamageable = require('parallelio').Damageable
Display = require('./Display')
DomUpdater = require('./DomUpdater')
EventEmitter = require('spark-starter').EventEmitter

module.exports = class Damageable extends BaseDamageable
  @extend Display
  @include EventEmitter.prototype
  
  constructor: () ->
    super()
    @healthCls()
    @initDisplay()

  @properties
    healthClsSteps:
      default: 10
    healthCls:
      calcul: (invalidator)->
        'health-'+ (Math.ceil(invalidator.prop('health') / invalidator.prop('maxHealth') * invalidator.prop('healthClsSteps')))
      change: new DomUpdater callback: (old)->
        if old?
          @display.removeClass(old)
        if @healthCls?
          @display.addClass(@healthCls)
    
