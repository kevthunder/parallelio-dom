BaseDamageable = require('parallelio').Damageable
Display = require('./Display')
DomUpdater = require('./DomUpdater')

module.exports = class Damageable extends BaseDamageable
  @extend Display
  
  constructor: () ->
    super()
    @healthCls()
    @initDisplay()

  @properties
    healthClsSteps:
      default: 10
    healthCls:
      calcul: (invalidator)->
        'health-'+ (Math.ceil(invalidator.propByName('health') / invalidator.propByName('maxHealth') * invalidator.propByName('healthClsSteps')))
      change: new DomUpdater callback: (old)->
        if old?
          @display.removeClass(old)
        if @healthCls?
          @display.addClass(@healthCls)
    
