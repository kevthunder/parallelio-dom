(function(definition){var Ship=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);Ship.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Ship;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.Ship=Ship;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.Ship=Ship;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Tile = dependencies.hasOwnProperty("Tile") ? dependencies.Tile : require('./Tile');
var TileContainer = dependencies.hasOwnProperty("TileContainer") ? dependencies.TileContainer : require('parallelio').TileContainer;
var DefaultGenerator = dependencies.hasOwnProperty("DefaultGenerator") ? dependencies.DefaultGenerator : require('parallelio').RoomGenerator;
var Door = dependencies.hasOwnProperty("Door") ? dependencies.Door : require('./Door');
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var Ship;
Ship = (function() {
  class Ship extends TileContainer {
    init() {
      super.init();
      return this.displayContainer;
    }

    setDefaults() {
      if (this.displayContainer == null) {
        this.displayContainer = this.game.mainView.contentDisplay;
      }
      if (!(this.tiles.length > 0)) {
        this.generate();
      }
      if (this.game.mainTileContainer == null) {
        return this.game.mainTileContainer = this;
      }
    }

    generate(generator) {
      generator = generator || (new Ship.Generator()).tap(function() {});
      return generator.getTiles().forEach((tile) => {
        return this.addTile(tile);
      });
    }

  };

  Ship.include(EventEmitter.prototype);

  Ship.properties({
    container: {},
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.prop('container');
        if (container != null ? container.getProperty('contentDisplay') : void 0) {
          return container.contentDisplay;
        } else if (container != null ? container.getProperty('display') : void 0) {
          return container.display;
        }
      },
      change: function() {
        if (this.displayContainer != null) {
          return this.display.appendTo(this.displayContainer);
        }
      }
    },
    display: {
      calcul: function() {
        var display;
        display = $(document.createElement("div")).addClass('ship');
        display.get(0)._parallelio_obj = this;
        return display;
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

  return Ship;

}).call(this);

Ship.Generator = class Generator extends DefaultGenerator {
  wallFactory(opt) {
    return (new Tile(opt.x, opt.y)).tap(function() {
      this.cls = 'wall';
      return this.walkable = false;
    });
  }

  floorFactory(opt) {
    return new Tile.Floor(opt.x, opt.y);
  }

  doorFactory(opt) {
    return (new Tile.Floor(opt.x, opt.y)).tap(function() {
      return this.addChild(new Door(opt.direction));
    });
  }

};

return(Ship);});