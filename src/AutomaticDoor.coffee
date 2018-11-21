Door = require('./Door')
BaseAutomaticDoor = require('parallelio').AutomaticDoor

class AutomaticDoor extends Door.definition({BaseDoor:BaseAutomaticDoor})