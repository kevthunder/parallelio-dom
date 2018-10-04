(function(definition){var Updater=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Updater.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Updater;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Updater=Updater;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Updater=Updater;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseUpdater = dependencies.hasOwnProperty("BaseUpdater") ? dependencies.BaseUpdater : require('parallelio').Spark.Updater;
var Updater;
Updater = class Updater extends BaseUpdater {
  constructor() {
    super();
    this.updateCallback = () => {
      return this.update();
    };
    this.binded = false;
  }

  update() {
    super.update();
    this.binded = false;
    if (this.callbacks.length > 0) {
      return this.requestFrame();
    }
  }

  requestFrame() {
    if (!this.binded) {
      window.requestAnimationFrame(this.updateCallback);
      return this.binded = true;
    }
  }

  addCallback(callback) {
    super.addCallback(callback);
    return this.requestFrame();
  }

};

Updater.instance = new Updater();

return(Updater);});