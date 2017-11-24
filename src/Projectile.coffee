BaseProjectile = require('parallelio').Projectile
Display = require('./Display')

class Projectile extends BaseProjectile
  @extend Display
  init: ->
    super()
    @baseCls = 'projectile'
    @initDisplay()
