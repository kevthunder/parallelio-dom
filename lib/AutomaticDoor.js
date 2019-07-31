var AutomaticDoor, BaseAutomaticDoor, Door;

Door = require('./Door');

BaseAutomaticDoor = require('parallelio').AutomaticDoor;

module.exports = AutomaticDoor = (function() {
  class AutomaticDoor extends BaseAutomaticDoor {};

  AutomaticDoor.extend(Door);

  return AutomaticDoor;

}).call(this);

//# sourceMappingURL=maps/AutomaticDoor.js.map
