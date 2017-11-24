(function(definition){Updater=definition(typeof(Parallelio.DOM)!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Updater.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Updater;}else{if(typeof(Parallelio.DOM)!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Updater=Updater;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Updater=Updater;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseUpdater = dependencies.hasOwnProperty("BaseUpdater") ? dependencies.BaseUpdater : require('parallelio').Spark.Updater;
var Updater, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Updater = (function(superClass) {
  extend(Updater, superClass);

  function Updater() {
    Updater.__super__.constructor.call(this);
    this.updateCallback = (function(_this) {
      return function() {
        return _this.update();
      };
    })(this);
    this.binded = false;
  }

  Updater.prototype.update = function() {
    Updater.__super__.update.call(this);
    this.binded = false;
    if (this.callbacks.length > 0) {
      return requestFrame();
    }
  };

  Updater.prototype.requestFrame = function() {
    if (!this.binded) {
      window.requestAnimationFrame(this.updateCallback);
      return this.binded = true;
    }
  };

  Updater.prototype.addCallback = function(callback) {
    Updater.__super__.addCallback.call(this, callback);
    return this.requestFrame();
  };

  return Updater;

})(BaseUpdater);

Updater.instance = new Updater();

return(Updater);});