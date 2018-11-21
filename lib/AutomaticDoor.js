(function(definition){var AutomaticDoor=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);AutomaticDoor.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=AutomaticDoor;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.AutomaticDoor=AutomaticDoor;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.AutomaticDoor=AutomaticDoor;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Door = dependencies.hasOwnProperty("Door") ? dependencies.Door : require('./Door');
var BaseAutomaticDoor = dependencies.hasOwnProperty("BaseAutomaticDoor") ? dependencies.BaseAutomaticDoor : require('parallelio').AutomaticDoor;
var AutomaticDoor;
AutomaticDoor = class AutomaticDoor extends Door.definition({
    BaseDoor: BaseAutomaticDoor
  }) {};

return(AutomaticDoor);});