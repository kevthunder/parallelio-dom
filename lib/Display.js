(function(definition){var Display=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Display.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Display;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Display=Display;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Display=Display;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('parallelio').Element;
var Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : require('./Updater');
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var Display;
Display = (function() {
  class Display extends Element {
    initDisplay() {
      this.cls;
      this.displayX;
      this.displayY;
      return this.displayContainer;
    }

    destroyDisplay() {
      if (this._display != null) {
        return this.display.remove();
      }
    }

  };

  Display.include(EventEmitter.prototype);

  Display.properties({
    displayContainer: {
      updater: Updater.instance,
      default: null,
      change: function() {
        if (this.displayContainer != null) {
          return this.display.appendTo(this.displayContainer);
        }
      }
    },
    cls: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        if (old != null) {
          this.display.removeClass(old);
        }
        if (this.cls != null) {
          return this.display.addClass(this.cls);
        }
      }
    },
    display: {
      calcul: function() {
        var display, newDiv;
        newDiv = document.createElement("div");
        display = jQuery(newDiv).addClass(this.baseCls);
        display.get(0)._parallelio_obj = this;
        return display;
      }
    },
    displayX: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        return this.display.css({
          left: this.displayX
        });
      }
    },
    displayY: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        return this.display.css({
          top: this.displayY
        });
      }
    }
  });

  return Display;

}).call(this);

return(Display);});