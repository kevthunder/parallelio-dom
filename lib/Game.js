(function(definition){var Game=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Game.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Game;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Game=Game;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Game=Game;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseGame = dependencies.hasOwnProperty("BaseGame") ? dependencies.BaseGame : require('parallelio').Game;
var View = dependencies.hasOwnProperty("View") ? dependencies.View : require('./View');
var PlayerController = dependencies.hasOwnProperty("PlayerController") ? dependencies.PlayerController : require('./PlayerController');
var Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : require('./Updater');
var Game;
Game = (function() {
  class Game extends BaseGame {};

  Game.properties({
    timing: {
      calcul: function(invalidator, original) {
        var timing;
        timing = original();
        timing.updater = Updater.instance;
        return timing;
      }
    }
  });

  Game.prototype.defaultViewClass = View;

  Game.prototype.defaultPlayerControllerClass = PlayerController;

  return Game;

}).call(this);

return(Game);});