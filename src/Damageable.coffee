BaseDamageable = require('parallelio').Damageable
Display = require('./Display')
Updater = require('./Updater')

class Damageable extends BaseDamageable
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
      updater: Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      calcul: (invalidator)->
        'health-'+ (Math.ceil(invalidator.prop('health') / invalidator.prop('maxHealth') * invalidator.prop('healthClsSteps')))
      change: (old)->
        if old?
          @display.removeClass(old)
        if @healthCls?
          @display.addClass(@healthCls)
    
