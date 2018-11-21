(function(definition){var Character=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Character.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Character;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Character=Character;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Character=Character;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var BaseCharacter = dependencies.hasOwnProperty("BaseCharacter") ? dependencies.BaseCharacter : require('parallelio').Character;
var Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : require('./Updater');
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var Character;
Character = (function() {
  class Character extends BaseCharacter {
    constructor() {
      super();
      this.initDisplay();
      this.baseCls = 'character';
    }

  };

  Character.extend(Tiled.definition({
    BaseTiled: Element
  }));

  Character.properties({
    selected: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      change: function(old) {
        return this.display.toggleClass('selected', this.selected);
      }
    }
  });

  return Character;

}).call(this);

return(Character);});