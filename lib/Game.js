(function(definition){var Game=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Game.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Game;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Game=Game;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Game=Game;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseGame = dependencies.hasOwnProperty("BaseGame") ? dependencies.BaseGame : require('parallelio').Game;
var View = dependencies.hasOwnProperty("View") ? dependencies.View : require('./View');
var Game;
Game = (function() {
  class Game extends BaseGame {};

  Game.prototype.defaultViewClass = View;

  return Game;

}).call(this);

return(Game);});