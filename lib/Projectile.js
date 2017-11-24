(function(definition){Projectile=definition(typeof(Parallelio.DOM)!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Projectile.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Projectile;}else{if(typeof(Parallelio.DOM)!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Projectile=Projectile;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Projectile=Projectile;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseProjectile = dependencies.hasOwnProperty("BaseProjectile") ? dependencies.BaseProjectile : require('parallelio').Projectile;
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Projectile, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Projectile = (function(superClass) {
  extend(Projectile, superClass);

  function Projectile() {
    return Projectile.__super__.constructor.apply(this, arguments);
  }

  Projectile.extend(Display);

  Projectile.prototype.init = function() {
    Projectile.__super__.init.call(this);
    this.baseCls = 'projectile';
    return this.initDisplay();
  };

  return Projectile;

})(BaseProjectile);

return(Projectile);});