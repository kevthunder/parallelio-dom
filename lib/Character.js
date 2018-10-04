(function(definition){var Character=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Character.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Character;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Character=Character;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Character=Character;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : require('./Tiled');
var BaseCharacter = dependencies.hasOwnProperty("BaseCharacter") ? dependencies.BaseCharacter : require('parallelio').Character.definition({
var Character, Updater;
  Tiled: Tiled
});

Updater = require('./Updater');

Character = class Character extends BaseCharacter {
  constructor() {
    super();
    this.baseCls = 'character';
  }

};

return(Character);});