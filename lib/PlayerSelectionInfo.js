(function(definition){var PlayerSelectionInfo=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);PlayerSelectionInfo.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=PlayerSelectionInfo;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.PlayerSelectionInfo=PlayerSelectionInfo;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.PlayerSelectionInfo=PlayerSelectionInfo;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : require('./Display');
var Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : require('./Updater');
var PlayerSelectionInfo;
PlayerSelectionInfo = (function() {
  class PlayerSelectionInfo extends Display {
    constructor() {
      super();
      this.initDisplay();
      this.baseCls = 'selectionInfo';
      this.name;
      this.game;
      this.actions;
    }

    setDefaults() {
      if (!this.displayContainer && this.game.mainUI) {
        this.displayContainer = this.game.mainUI;
      }
      if (!this.player && this.game.currentPlayer) {
        return this.player = this.game.currentPlayer;
      }
    }

  };

  PlayerSelectionInfo.properties({
    display: {
      calcul: function(invalidator, overrided) {
        var div;
        div = overrided();
        div.html('<div class="name"></div><div class="actions"><span class="title">Actions :</span><ul></ul></div>');
        return div;
      }
    },
    player: {
      default: null
    },
    selection: {
      calcul: function(invalidator) {
        return invalidator.propPath("player.selected");
      }
    },
    name: {
      updater: Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      calcul: function(invalidator) {
        var sel;
        sel = invalidator.prop("selection");
        if (sel != null) {
          return invalidator.prop("name", sel) || sel.constructor.name;
        }
      },
      change: function() {
        return this.display.find(".name").text(this.name);
      }
    },
    actions: {
      collection: true,
      calcul: function(invalidator) {
        return invalidator.propPath("selection.availableActions") || [];
      },
      change: function() {
        var list;
        list = this.display.find(".actions ul");
        list.empty();
        return this.actions.forEach(function(action) {
          var display, name;
          name = action.name || action.constructor.name;
          display = $('<li>' + name + '</li>');
          display.on("click", function() {
            return action.start();
          });
          return list.append(display);
        });
      }
    },
    game: {
      change: function(old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    }
  });

  return PlayerSelectionInfo;

}).call(this);

return(PlayerSelectionInfo);});