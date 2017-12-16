(function(definition){var Display=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Display.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Display;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Display=Display;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Display=Display;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('parallelio').Element;
var Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : require('./Updater');
var Display, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Display = (function(superClass) {
  extend(Display, superClass);

  function Display() {
    return Display.__super__.constructor.apply(this, arguments);
  }

  Display.include(EventEmitter.prototype);

  Display.properties({
    displayContainer: {
      updater: Updater.instance,
      "default": null,
      change: function() {
        if (this.displayContainer != null) {
          return this.display.appendTo(this.displayContainer);
        }
      }
    },
    cls: {
      updater: Updater.instance,
      change: function(old) {
        if (this.getPropertyInstance('display').calculated) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.cls != null) {
            return this.display.addClass(this.cls);
          }
        }
      }
    },
    display: {
      calcul: function() {
        var display, newDiv;
        newDiv = document.createElement("div");
        display = jQuery(newDiv).addClass(this.baseCls).addClass(this.cls).css({
          top: this.displayY,
          left: this.displayX
        });
        display.get(0)._parallelio_obj = this;
        return display;
      }
    },
    displayX: {
      updater: Updater.instance,
      "default": 0,
      change: function(old) {
        if (this.getPropertyInstance('display').calculated) {
          return this.display.css({
            left: this.displayX
          });
        }
      }
    },
    displayY: {
      updater: Updater.instance,
      "default": 0,
      change: function(old) {
        if (this.getPropertyInstance('display').calculated) {
          return this.display.css({
            top: this.displayY
          });
        }
      }
    }
  });

  Display.prototype.initDisplay = function() {
    return this.displayContainer;
  };

  Display.prototype.destroyDisplay = function() {
    if (this._display != null) {
      return this.display.remove();
    }
  };

  return Display;

})(Element);

return(Display);});