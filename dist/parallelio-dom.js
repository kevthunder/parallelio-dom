(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Parallelio = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var AutomaticDoor, BaseAutomaticDoor, Door;

Door = require('./Door');

BaseAutomaticDoor = require('parallelio').AutomaticDoor;

module.exports = AutomaticDoor = (function() {
  class AutomaticDoor extends BaseAutomaticDoor {
    init() {
      this.baseCls = 'door';
      super.init();
      return this.initDisplay();
    }

  };

  AutomaticDoor.extend(Door);

  return AutomaticDoor;

}).call(this);



},{"./Door":6,"parallelio":90}],2:[function(require,module,exports){
var BaseCharacter, Character, DomUpdater, Element, Tiled;

Tiled = require('./Tiled');

BaseCharacter = require('parallelio').Character;

DomUpdater = require('./DomUpdater');

Element = require('spark-starter').Element;

module.exports = Character = (function() {
  class Character extends BaseCharacter {
    constructor() {
      super();
      this.initDisplay();
      this.baseCls = 'character';
    }

  };

  Character.extend(Tiled);

  Character.properties({
    selected: {
      change: new DomUpdater({
        callback: function(old) {
          return this.display.toggleClass('selected', this.selected);
        }
      })
    }
  });

  return Character;

}).call(this);



},{"./DomUpdater":5,"./Tiled":18,"parallelio":90,"spark-starter":99}],3:[function(require,module,exports){
var BaseDamageable, Damageable, Display, DomUpdater;

BaseDamageable = require('parallelio').Damageable;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

module.exports = Damageable = (function() {
  class Damageable extends BaseDamageable {
    constructor() {
      super();
      this.healthCls();
      this.initDisplay();
    }

  };

  Damageable.extend(Display);

  Damageable.properties({
    healthClsSteps: {
      default: 10
    },
    healthCls: {
      calcul: function(invalidator) {
        return 'health-' + (Math.ceil(invalidator.propByName('health') / invalidator.propByName('maxHealth') * invalidator.propByName('healthClsSteps')));
      },
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.healthCls != null) {
            return this.display.addClass(this.healthCls);
          }
        }
      })
    }
  });

  return Damageable;

}).call(this);



},{"./Display":4,"./DomUpdater":5,"parallelio":90}],4:[function(require,module,exports){
var Display, DomUpdater, Element;

Element = require('parallelio').Element;

DomUpdater = require('./DomUpdater');

module.exports = Display = (function() {
  class Display extends Element {
    initDisplay() {}

    destroyDisplay() {
      if (this.displayProperty.value != null) {
        return this.display.remove();
      }
    }

  };

  Display.properties({
    displayContainer: {
      default: null,
      change: new DomUpdater({
        callback: function() {
          if (this.displayContainer != null) {
            return this.display.appendTo(this.displayContainer);
          }
        }
      })
    },
    cls: {
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.cls != null) {
            return this.display.addClass(this.cls);
          }
        }
      })
    },
    display: {
      calcul: function() {
        var display, newDiv;
        newDiv = document.createElement("div");
        display = jQuery(newDiv).addClass(this.baseCls);
        display.get(0)._parallelio_obj = this;
        return display;
      }
    },
    displayX: {
      change: new DomUpdater({
        callback: function() {
          return this.display.css({
            left: this.displayX
          });
        }
      })
    },
    displayY: {
      change: new DomUpdater({
        callback: function() {
          return this.display.css({
            top: this.displayY
          });
        }
      })
    }
  });

  return Display;

}).call(this);



},{"./DomUpdater":5,"parallelio":90}],5:[function(require,module,exports){
var DomUpdater, PropertyWatcher;

PropertyWatcher = require('parallelio').Spark.watchers.PropertyWatcher;

module.exports = DomUpdater = class DomUpdater extends PropertyWatcher {
  constructor(options) {
    super(options);
  }

  init() {
    this.updateDomCallback = () => {
      return this.updateDom();
    };
    return super.init();
  }

  requestFrame() {
    if (!this.framebinded) {
      this.framebinded = true;
      return window.requestAnimationFrame(this.updateDomCallback);
    }
  }

  invalidate() {
    return this.requestFrame();
  }

  update() {
    return this.requestFrame();
  }

  updateDom(old) {
    var value;
    value = this.getProperty().get();
    if (value !== this.old) {
      this.old = value;
      this.handleChange(value, old);
    }
    return this.framebinded = false;
  }

};



},{"parallelio":90}],6:[function(require,module,exports){
var BaseDoor, DomUpdater, Door, Element, Tiled;

Tiled = require('./Tiled');

BaseDoor = require('parallelio').Door;

DomUpdater = require('./DomUpdater');

Element = require('spark-starter').Element;

module.exports = Door = (function() {
  class Door extends BaseDoor {
    init() {
      this.baseCls = 'door';
      super.init();
      return this.initDisplay();
    }

  };

  Door.extend(Tiled);

  Door.properties({
    direction: {
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.direction != null) {
            return this.display.addClass(this.direction);
          }
        }
      })
    },
    open: {
      change: new DomUpdater({
        callback: function(old) {
          this.display.toggleClass('close', !this.open);
          return this.display.toggleClass('open', this.open);
        }
      })
    }
  });

  return Door;

}).call(this);



},{"./DomUpdater":5,"./Tiled":18,"parallelio":90,"spark-starter":99}],7:[function(require,module,exports){
var BaseGame, Game, PlayerController, View;

BaseGame = require('parallelio').Game;

View = require('./View');

PlayerController = require('./PlayerController');

// Updater = require('./Updater')
module.exports = Game = (function() {
  class Game extends BaseGame {};

  Game.properties({
    timing: {
      calcul: function(invalidator, original) {
        var timing;
        timing = original();
        // timing.updater = Updater.instance
        return timing;
      }
    },
    mainUI: {
      calcul: function() {
        var div;
        div = document.createElement("div");
        div.classList.add("ui");
        document.body.appendChild(div);
        return div;
      }
    }
  });

  Game.prototype.defaultViewClass = View;

  Game.prototype.defaultPlayerControllerClass = PlayerController;

  return Game;

}).call(this);



},{"./PlayerController":9,"./View":20,"parallelio":90}],8:[function(require,module,exports){
var BaseMap, Map;

BaseMap = require('parallelio').Map;

module.exports = Map = (function() {
  class Map extends BaseMap {
    setDefaults() {
      if (this.displayContainer == null) {
        return this.displayContainer = this.game.mainView.contentDisplay;
      }
    }

    drawBackground(canvas) {
      var context;
      context = canvas.getContext('2d');
      return this.locations.forEach((location) => {
        return typeof location.draw === "function" ? location.draw(this, context) : void 0;
      });
    }

  };

  Map.properties({
    displayContainer: {
      default: null,
      change: function() {
        this.locations.forEach((location) => {
          return location.displayContainer = this.displayContainer;
        });
        if (this.displayContainer != null) {
          return this.displayContainer.append(this.backgroundCanvas);
        }
      }
    },
    game: {
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    },
    starMargin: {
      default: 10
    },
    backgroundCanvas: {
      calcul: function() {
        var canvas;
        canvas = document.createElement("canvas");
        canvas.width = this.boundaries.right - this.boundaries.left + this.starMargin * 2;
        canvas.height = this.boundaries.bottom - this.boundaries.top + this.starMargin * 2;
        canvas.classList.add("mapBackground");
        canvas.style.top = this.boundaries.top - this.starMargin + "px";
        canvas.style.left = this.boundaries.left - this.starMargin + "px";
        this.drawBackground(canvas);
        return canvas;
      }
    }
  });

  return Map;

}).call(this);



},{"parallelio":90}],9:[function(require,module,exports){
var Element, PlayerController;

Element = require('spark-starter').Element;

module.exports = PlayerController = (function() {
  class PlayerController extends Element {
    constructor(options) {
      super();
      this.setProperties(options);
    }

    setDefaults() {
      if (!this.gameDisplay) {
        return this.gameDisplay = document.body;
      }
    }

    checkFocus(e) {
      return this._bubbleUp(e.target, (target) => {
        if (this.player.canFocusOn(target)) {
          this.player.focused = target;
          return true;
        }
      });
    }

    checkTargetOrSelectable(e) {
      return this._bubbleUp(e.target, (target) => {
        var action;
        if (action = this.player.canTargetActionOn(target)) {
          this.player.selectedAction = action;
          this.player.setActionTarget(target);
          return true;
        } else if (this.player.canSelect(target)) {
          this.player.selected = target;
          return true;
        }
      });
    }

    _bubbleUp(target, stopCallback) {
      var ref;
      while (target) {
        target = target._parallelio_obj != null ? target._parallelio_obj : target.parentNode != null ? target.parentNode : stopCallback(target) ? null : target.tile != null ? target.tile : ((ref = target.display) != null ? ref.get(0).parentNode : void 0) != null ? target.display.get(0).parentNode : null;
      }
      return null;
    }

  };

  PlayerController.properties({
    player: {
      change: function() {
        if (this.player) {
          return this.setDefaults();
        }
      }
    },
    gameDisplay: {
      change: function() {
        if (this.gameDisplay) {
          $(this.gameDisplay).on('click', this.callback('checkTargetOrSelectable'));
          return $(this.gameDisplay).on('mouseover', this.callback('checkFocus'));
        }
      }
    }
  });

  return PlayerController;

}).call(this);



},{"spark-starter":99}],10:[function(require,module,exports){
var Display, DomUpdater, PlayerSelectionInfo;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

module.exports = PlayerSelectionInfo = (function() {
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
      calcul: function(invalidator) {
        var sel;
        sel = invalidator.prop("selection");
        if (sel != null) {
          return invalidator.prop("name", sel) || sel.constructor.name;
        }
      },
      change: new DomUpdater({
        callback: function(old) {
          return this.display.find(".name").text(this.name);
        }
      })
    },
    actions: {
      collection: true,
      calcul: function(invalidator) {
        return invalidator.propPath("player.availableActions") || [];
      },
      change: function() {
        var list;
        list = this.display.find(".actions ul");
        list.empty();
        return this.actions.forEach((action) => {
          var display, name;
          name = action.name || action.constructor.name;
          display = $('<li>' + name + '</li>');
          display.on("click", () => {
            return this.player.selectAction(action);
          });
          return list.append(display);
        });
      }
    },
    game: {
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    }
  });

  return PlayerSelectionInfo;

}).call(this);



},{"./Display":4,"./DomUpdater":5}],11:[function(require,module,exports){
var BaseProjectile, Display, Projectile, Updater;

BaseProjectile = require('parallelio').Projectile;

Display = require('./Display');

Updater = require('./Updater');

module.exports = Projectile = (function() {
  class Projectile extends BaseProjectile {
    init() {
      super.init();
      this.baseCls = 'projectile';
      return this.initDisplay();
    }

    destroy() {
      return this.destroyDisplay();
    }

  };

  Projectile.extend(Display);

  Projectile.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.propByName('container');
        if (container != null ? container.propertiesManager.getProperty('tileDisplay') : void 0) {
          return invalidator.propByName('tileDisplay', container);
        } else if (container != null ? container.propertiesManager.getProperty('display') : void 0) {
          return invalidator.propByName('display', container);
        } else {
          return invalidator.propByName('originTile').displayContainer;
        }
      }
    },
    displayX: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayX(invalidate.propByName('x'));
      }
    },
    displayY: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayY(invalidate.propByName('y'));
      }
    }
  });

  return Projectile;

}).call(this);



},{"./Display":4,"./Updater":19,"parallelio":90}],12:[function(require,module,exports){
var BaseShip, Display, DomUpdater, Ship;

BaseShip = require('parallelio').Ship;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

module.exports = Ship = (function() {
  class Ship extends BaseShip {
    init() {
      this.baseCls = 'ship';
      return super.init();
    }

  };

  Ship.extend(Display);

  Ship.properties({
    displayContainer: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.displayContainer');
      }
    },
    displayX: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.x');
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.y');
      }
    },
    orbiting: {
      calcul: function(invalidator) {
        return invalidator.propByName('travel') === null;
      },
      change: new DomUpdater({
        callback: function(old) {
          if (this.orbiting) {
            return this.display.addClass("orbiting");
          } else {
            return this.display.removeClass("orbiting");
          }
        }
      })
    }
  });

  return Ship;

}).call(this);



},{"./Display":4,"./DomUpdater":5,"parallelio":90}],13:[function(require,module,exports){
var DefaultGenerator, Door, ShipInterior, Tile, TileContainer;

Tile = require('./Tile');

TileContainer = require('parallelio').tiles.TileContainer;

DefaultGenerator = require('parallelio').RoomGenerator;

Door = require('./AutomaticDoor');

module.exports = ShipInterior = (function() {
  class ShipInterior extends TileContainer {
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
      generator = generator || (new ShipInterior.Generator()).tap(function() {});
      return generator.getTiles().forEach((tile) => {
        return this.addTile(tile);
      });
    }

  };

  ShipInterior.properties({
    container: {},
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.propByName('container');
        if (container != null ? container.propertiesManager.getProperty('contentDisplay') : void 0) {
          return container.contentDisplay;
        } else if (container != null ? container.propertiesManager.getProperty('display') : void 0) {
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
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    }
  });

  return ShipInterior;

}).call(this);

ShipInterior.Generator = class Generator extends DefaultGenerator {
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
      return this.addChild(new Door({
        direction: opt.direction
      }));
    });
  }

};



},{"./AutomaticDoor":1,"./Tile":17,"parallelio":90}],14:[function(require,module,exports){
var BaseWeapon, Damageable, DomUpdater, Projectile, ShipWeapon, Tiled;

Tiled = require('./Tiled');

Projectile = require('./Projectile');

Damageable = require('./Damageable');

BaseWeapon = require('parallelio').ShipWeapon;

DomUpdater = require('./DomUpdater');

module.exports = ShipWeapon = (function() {
  class ShipWeapon extends BaseWeapon {
    constructor(direction) {
      super(direction);
      this.baseCls = 'weapon';
    }

  };

  ShipWeapon.extend(Tiled);

  ShipWeapon.extend(Damageable);

  ShipWeapon.properties({
    direction: {
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old.name);
          }
          if (this.direction.name != null) {
            return this.display.addClass(this.direction.name);
          }
        }
      })
    },
    projectileClass: {
      default: Projectile
    }
  });

  return ShipWeapon;

}).call(this);



},{"./Damageable":3,"./DomUpdater":5,"./Projectile":11,"./Tiled":18,"parallelio":90}],15:[function(require,module,exports){
var BaseStarMapGenerator, Map, StarMapGenerator, StarSystem;

BaseStarMapGenerator = require('parallelio').StarMapGenerator;

Map = require('./Map');

StarSystem = require('./StarSystem');

module.exports = StarMapGenerator = (function() {
  class StarMapGenerator extends BaseStarMapGenerator {};

  StarMapGenerator.prototype.defOpt = Object.assign({}, BaseStarMapGenerator.prototype.defOpt, {
    mapClass: Map,
    starClass: StarSystem,
    linkClass: StarSystem.Link
  });

  return StarMapGenerator;

}).call(this);



},{"./Map":8,"./StarSystem":16,"parallelio":90}],16:[function(require,module,exports){
var BaseStarSystem, Display, StarSystem;

BaseStarSystem = require('parallelio').StarSystem;

Display = require('./Display');

module.exports = StarSystem = (function() {
  class StarSystem extends BaseStarSystem {
    init() {
      this.baseCls = 'star';
      return super.init();
    }

    draw(map, context) {
      context.beginPath();
      context.lineWidth = 1.5;
      context.strokeStyle = "#336";
      context.arc(this.x - map.boundaries.left + map.starMargin, this.y - map.boundaries.top + map.starMargin, map.starMargin, 0, 2 * Math.PI);
      context.stroke();
      return this.links.forEach((link) => {
        if (link.star1 === this) {
          return typeof link.draw === "function" ? link.draw(map, context) : void 0;
        }
      });
    }

  };

  StarSystem.extend(Display);

  StarSystem.properties({
    displayX: {
      calcul: function(invalidator) {
        return invalidator.propByName('x');
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return invalidator.propByName('y');
      }
    }
  });

  return StarSystem;

}).call(this);

StarSystem.Link = class Link extends BaseStarSystem.Link {
  draw(map, context) {
    var dist, x1, x2, xDist, y1, y2, yDist;
    xDist = this.star2.x - this.star1.x;
    yDist = this.star2.y - this.star1.y;
    dist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    x1 = this.star1.x + map.starMargin * xDist / dist - map.boundaries.left + map.starMargin;
    y1 = this.star1.y + map.starMargin * yDist / dist - map.boundaries.top + map.starMargin;
    x2 = this.star2.x - map.starMargin * xDist / dist - map.boundaries.left + map.starMargin;
    y2 = this.star2.y - map.starMargin * yDist / dist - map.boundaries.top + map.starMargin;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "#336";
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    return context.stroke();
  }

};



},{"./Display":4,"parallelio":90}],17:[function(require,module,exports){
var BaseFloor, BaseTile, Display, Tile;

BaseTile = require('parallelio').tiles.Tile;

BaseFloor = require('parallelio').Floor;

Display = require('./Display');

module.exports = Tile = (function() {
  class Tile extends BaseTile {
    init() {
      super.init();
      this.baseCls = 'tile';
      return this.initDisplay();
    }

    tileToDisplayX(x) {
      return x * Tile.size;
    }

    tileToDisplayY(y) {
      return y * Tile.size;
    }

  };

  Tile.extend(Display);

  Tile.size = 20;

  Tile.properties({
    container: {},
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.propByName('container');
        if (container != null ? container.propertiesManager.getProperty('tileDisplay') : void 0) {
          return invalidator.propByName('tileDisplay', container);
        } else if (container != null ? container.propertiesManager.getProperty('display') : void 0) {
          return invalidator.propByName('display', container);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        return this.tileToDisplayX(invalidator.propByName('x'));
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return this.tileToDisplayY(invalidator.propByName('y'));
      }
    }
  });

  return Tile;

}).call(this);

Tile.Floor = (function() {
  class Floor extends BaseFloor {
    init() {
      super.init();
      this.baseCls = 'tile';
      return this.cls = 'floor';
    }

  };

  Floor.extend(Tile);

  return Floor;

}).call(this);



},{"./Display":4,"parallelio":90}],18:[function(require,module,exports){
var BaseTiled, Display, Tiled;

BaseTiled = require('parallelio').tiles.Tiled;

Display = require('./Display');

module.exports = Tiled = (function() {
  class Tiled extends BaseTiled {
    constructor() {
      super();
      this.initDisplay();
    }

  };

  Tiled.extend(Display);

  Tiled.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.propByName('tile');
        if (tile != null) {
          return invalidator.propByName('displayContainer', tile);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.propByName('tile');
        if (tile != null) {
          return tile.displayX + tile.tileToDisplayX(invalidator.propByName('offsetX'));
        }
      }
    },
    displayY: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.propByName('tile');
        if (tile != null) {
          return tile.displayY + tile.tileToDisplayY(invalidator.propByName('offsetY'));
        }
      }
    }
  });

  return Tiled;

}).call(this);



},{"./Display":4,"parallelio":90}],19:[function(require,module,exports){
var BaseUpdater, Updater;

BaseUpdater = require('parallelio').Spark.Updater;

module.exports = Updater = class Updater extends BaseUpdater {
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



},{"parallelio":90}],20:[function(require,module,exports){
var BaseView, Display, DomUpdater, View;

BaseView = require('parallelio').View;

DomUpdater = require('./DomUpdater');

Display = require('./Display');

module.exports = View = (function() {
  class View extends BaseView {
    constructor(display = null) {
      super();
      if (display != null) {
        this.display = display;
      }
      this.hovered = false;
      this.keysInterval = {};
      this.baseCls = 'view';
      this.boundsStyles;
    }

    setDefaults() {
      super.setDefaults();
      if (this.displayContainer == null) {
        return this.displayContainer = $('body');
      }
    }

    mouseEnter() {
      this.hovered = true;
      $('body').keydown(this.callback('keyDown'));
      return $('body').keyup(this.callback('keyUp'));
    }

    mouseLeave() {
      var code, interval, ref, results;
      this.hovered = false;
      $('body').off('keydown', this.callback('keyDown'));
      $('body').off('keyup', this.callback('keyUp'));
      ref = this.keysInterval;
      results = [];
      for (code in ref) {
        interval = ref[code];
        results.push(clearInterval(interval));
      }
      return results;
    }

    keyDown(e) {
      var key;
      if (View.directionkeys[e.which] != null) {
        key = View.directionkeys[e.which];
        if (this.keysInterval[key.name] != null) {
          clearInterval(this.keysInterval[key.name]);
        }
        return this.keysInterval[key.name] = setInterval(() => {
          this.x += key.x * 2;
          return this.y += key.y * 2;
        }, 10);
      }
    }

    keyUp(e) {
      var key;
      if (View.directionkeys[e.which] != null) {
        key = View.directionkeys[e.which];
        if (this.keysInterval[key.name] != null) {
          return clearInterval(this.keysInterval[key.name]);
        }
      }
    }

    updateDisplayPos() {
      return $('.viewContent', this.display).css({
        left: this.x + 'px',
        top: this.y + 'px'
      });
    }

    containsPoint(x, y) {
      var container;
      container = this.display[0];
      while (container) {
        x -= container.offsetLeft;
        y -= container.offsetTop;
        container = container.offsetParent;
      }
      return (0 <= x && x <= this.display.width()) && (0 <= y && y <= this.display.height());
    }

  };

  View.extend(Display);

  View.directionkeys = {
    38: {
      name: 'top',
      x: 0,
      y: 1
    },
    39: {
      name: 'right',
      x: -1,
      y: 0
    },
    40: {
      name: 'bottom',
      x: 0,
      y: -1
    },
    37: {
      name: 'left',
      x: 1,
      y: 0
    }
  };

  View.properties({
    x: {
      default: 0,
      change: function() {
        return this.updateDisplayPos();
      }
    },
    y: {
      default: 0,
      change: function() {
        return this.updateDisplayPos();
      }
    },
    display: {
      calcul: function(invalidator, original) {
        var display;
        display = original();
        if ($('.viewContent', display).length === 0) {
          $(display).append('<div class="viewContent"></div>');
        }
        $(display).mouseenter(this.callback('mouseEnter'));
        return $(display).mouseleave(this.callback('mouseLeave'));
      },
      change: function() {
        return this.updateDisplayPos();
      }
    },
    contentDisplay: {
      calcul: function() {
        return $('.viewContent', this.display);
      }
    },
    boundsStyles: {
      calcul: function(invalidator) {
        return {
          top: invalidator.propPath('bounds.top') * 100 + '%',
          left: invalidator.propPath('bounds.left') * 100 + '%',
          bottom: (1 - invalidator.propPath('bounds.bottom')) * 100 + '%',
          right: (1 - invalidator.propPath('bounds.right')) * 100 + '%'
        };
      },
      change: new DomUpdater({
        callback: function(old) {
          return this.display.css(this.boundsStyles);
        }
      })
    }
  });

  return View;

}).call(this);



},{"./Display":4,"./DomUpdater":5,"parallelio":90}],21:[function(require,module,exports){
var BaseWire, DomUpdater, Tiled, Wire;

Tiled = require('./Tiled');

BaseWire = require('parallelio').wiring.Wire;

DomUpdater = require('./DomUpdater');

module.exports = Wire = (function() {
  class Wire extends BaseWire {
    constructor(wireType) {
      super(wireType);
      this.baseCls = 'wire';
      this.connectedDirections;
    }

    getClassFromDirection(d) {
      return 'conn' + d.name.charAt(0).toUpperCase() + d.name.slice(1);
    }

  };

  Wire.extend(Tiled);

  Wire.properties({
    connectedDirections: {
      change: new DomUpdater({
        callback: function(old) {
          if (old) {
            old.forEach((d) => {
              return this.display.removeClass(this.getClassFromDirection(d));
            });
          }
          return this.connectedDirections.forEach((d) => {
            return this.display.addClass(this.getClassFromDirection(d));
          });
        }
      })
    },
    wireType: {
      change: new DomUpdater({
        callback: function(old) {
          if (old) {
            this.display.removeClass(old);
          }
          return this.display.addClass(this.wireType);
        }
      })
    }
  });

  return Wire;

}).call(this);



},{"./DomUpdater":5,"./Tiled":18,"parallelio":90}],22:[function(require,module,exports){
module.exports = {
  "AutomaticDoor": require("./AutomaticDoor"),
  "Character": require("./Character"),
  "Damageable": require("./Damageable"),
  "Display": require("./Display"),
  "DomUpdater": require("./DomUpdater"),
  "Door": require("./Door"),
  "Game": require("./Game"),
  "Map": require("./Map"),
  "PlayerController": require("./PlayerController"),
  "PlayerSelectionInfo": require("./PlayerSelectionInfo"),
  "Projectile": require("./Projectile"),
  "Ship": require("./Ship"),
  "ShipInterior": require("./ShipInterior"),
  "ShipWeapon": require("./ShipWeapon"),
  "StarMapGenerator": require("./StarMapGenerator"),
  "StarSystem": require("./StarSystem"),
  "Tile": require("./Tile"),
  "Tiled": require("./Tiled"),
  "Updater": require("./Updater"),
  "View": require("./View"),
  "Wire": require("./Wire"),
}
},{"./AutomaticDoor":1,"./Character":2,"./Damageable":3,"./Display":4,"./DomUpdater":5,"./Door":6,"./Game":7,"./Map":8,"./PlayerController":9,"./PlayerSelectionInfo":10,"./Projectile":11,"./Ship":12,"./ShipInterior":13,"./ShipWeapon":14,"./StarMapGenerator":15,"./StarSystem":16,"./Tile":17,"./Tiled":18,"./Updater":19,"./View":20,"./Wire":21}],23:[function(require,module,exports){
var Parallelio, libs;

libs = require('./libs');

Parallelio = require('parallelio');

module.exports = Object.assign({}, Parallelio, {
  DOM: libs
});



},{"./libs":22,"parallelio":90}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],25:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],26:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":25,"timers":26}],27:[function(require,module,exports){
var Element, Grid, GridCell, GridRow;

Element = require('spark-starter').Element;

GridCell = require('./GridCell');

GridRow = require('./GridRow');

module.exports = Grid = (function() {
  class Grid extends Element {
    addCell(cell = null) {
      var row, spot;
      if (!cell) {
        cell = new GridCell();
      }
      spot = this.getFreeSpot();
      row = this.rows.get(spot.row);
      if (!row) {
        row = this.addRow();
      }
      row.addCell(cell);
      return cell;
    }

    addRow(row = null) {
      if (!row) {
        row = new GridRow();
      }
      this.rows.push(row);
      return row;
    }

    getFreeSpot() {
      var spot;
      spot = null;
      this.rows.some((row) => {
        if (row.cells.length < this.maxColumns) {
          return spot = {
            row: row.rowPosition,
            column: row.cells.length
          };
        }
      });
      if (!spot) {
        if (this.maxColumns > this.rows.length) {
          spot = {
            row: this.rows.length,
            column: 0
          };
        } else {
          spot = {
            row: 0,
            column: this.maxColumns + 1
          };
        }
      }
      return spot;
    }

  };

  Grid.properties({
    rows: {
      collection: true,
      itemAdded: function(row) {
        return row.grid = this;
      },
      itemRemoved: function(row) {
        if (row.grid === this) {
          return row.grid = null;
        }
      }
    },
    maxColumns: {
      calcul: function(invalidator) {
        var rows;
        rows = invalidator.prop(this.rowsProperty);
        return rows.reduce(function(max, row) {
          return Math.max(max, invalidator.prop(row.cellsProperty).length);
        }, 0);
      }
    }
  });

  return Grid;

}).call(this);

},{"./GridCell":28,"./GridRow":29,"spark-starter":99}],28:[function(require,module,exports){
var Element, GridCell;

Element = require('spark-starter').Element;

module.exports = GridCell = (function() {
  class GridCell extends Element {};

  GridCell.properties({
    grid: {
      calcul: function(invalidator) {
        return invalidator.propPath('grid.row');
      }
    },
    row: {},
    columnPosition: {
      calcul: function(invalidator) {
        var row;
        row = invalidator.prop(this.rowProperty);
        if (row) {
          return invalidator.prop(row.cellsProperty).indexOf(this);
        }
      }
    },
    width: {
      calcul: function(invalidator) {
        return 1 / invalidator.propPath('row.cells').length;
      }
    },
    left: {
      calcul: function(invalidator) {
        return invalidator.prop(this.widthProperty) * invalidator.prop(this.columnPositionProperty);
      }
    },
    right: {
      calcul: function(invalidator) {
        return invalidator.prop(this.widthProperty) * (invalidator.prop(this.columnPositionProperty) + 1);
      }
    },
    height: {
      calcul: function(invalidator) {
        return invalidator.propPath('row.height');
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.propPath('row.top');
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.propPath('row.bottom');
      }
    }
  });

  return GridCell;

}).call(this);

},{"spark-starter":99}],29:[function(require,module,exports){
var Element, GridCell, GridRow;

Element = require('spark-starter').Element;

GridCell = require('./GridCell');

module.exports = GridRow = (function() {
  class GridRow extends Element {
    addCell(cell = null) {
      if (!cell) {
        cell = new GridCell();
      }
      this.cells.push(cell);
      return cell;
    }

  };

  GridRow.properties({
    grid: {},
    cells: {
      collection: true,
      itemAdded: function(cell) {
        return cell.row = this;
      },
      itemRemoved: function(cell) {
        if (cell.row === this) {
          return cell.row = null;
        }
      }
    },
    rowPosition: {
      calcul: function(invalidator) {
        var grid;
        grid = invalidator.prop(this.gridProperty);
        if (grid) {
          return invalidator.prop(grid.rowsProperty).indexOf(this);
        }
      }
    },
    height: {
      calcul: function(invalidator) {
        return 1 / invalidator.propPath('grid.rows').length;
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.prop(this.heightProperty) * invalidator.prop(this.rowPositionProperty);
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.prop(this.heightProperty) * (invalidator.prop(this.rowPositionProperty) + 1);
      }
    }
  });

  return GridRow;

}).call(this);

},{"./GridCell":28,"spark-starter":99}],30:[function(require,module,exports){
module.exports = {
  "Grid": require("./Grid"),
  "GridCell": require("./GridCell"),
  "GridRow": require("./GridRow"),
}
},{"./Grid":27,"./GridCell":28,"./GridRow":29}],31:[function(require,module,exports){
(function(definition){var PathFinder=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);PathFinder.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=PathFinder;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.PathFinder=PathFinder;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.PathFinder=PathFinder;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var PathFinder;
PathFinder = (function() {
  class PathFinder extends Element {
    constructor(tilesContainer, from1, to1, options = {}) {
      super();
      this.tilesContainer = tilesContainer;
      this.from = from1;
      this.to = to1;
      this.reset();
      if (options.validTile != null) {
        this.validTileCallback = options.validTile;
      }
      if (options.arrived != null) {
        this.arrivedCallback = options.arrived;
      }
      if (options.efficiency != null) {
        this.efficiencyCallback = options.efficiency;
      }
    }

    reset() {
      this.queue = [];
      this.paths = {};
      this.solution = null;
      return this.started = false;
    }

    calcul() {
      while (!this.solution && (!this.started || this.queue.length)) {
        this.step();
      }
      return this.getPath();
    }

    step() {
      var next;
      if (this.queue.length) {
        next = this.queue.pop();
        this.addNextSteps(next);
        return true;
      } else if (!this.started) {
        return this.start();
      }
    }

    start() {
      this.started = true;
      if (this.to === false || this.tileIsValid(this.to)) {
        this.addNextSteps();
        return true;
      }
    }

    getPath() {
      var res, step;
      if (this.solution) {
        res = [this.solution];
        step = this.solution;
        while (step.prev != null) {
          res.unshift(step.prev);
          step = step.prev;
        }
        return res;
      }
    }

    getPosAtPrc(prc) {
      if (isNaN(prc)) {
        throw new Error('Invalid number');
      }
      if (this.solution) {
        return this.getPosAtTime(this.solution.getTotalLength() * prc);
      }
    }

    getPosAtTime(time) {
      var prc, step;
      if (this.solution) {
        if (time >= this.solution.getTotalLength()) {
          return this.solution.posToTileOffset(this.solution.getExit().x, this.solution.getExit().y);
        } else {
          step = this.solution;
          while (step.getStartLength() > time && (step.prev != null)) {
            step = step.prev;
          }
          prc = (time - step.getStartLength()) / step.getLength();
          return step.posToTileOffset(step.getEntry().x + (step.getExit().x - step.getEntry().x) * prc, step.getEntry().y + (step.getExit().y - step.getEntry().y) * prc);
        }
      }
    }

    getSolutionTileList() {
      var step, tilelist;
      if (this.solution) {
        step = this.solution;
        tilelist = [step.tile];
        while (step.prev != null) {
          step = step.prev;
          tilelist.unshift(step.tile);
        }
        return tilelist;
      }
    }

    tileIsValid(tile) {
      if (this.validTileCallback != null) {
        return this.validTileCallback(tile);
      } else {
        return (tile != null) && (!tile.emulated || (tile.tile !== 0 && tile.tile !== false));
      }
    }

    getTile(x, y) {
      var ref1;
      if (this.tilesContainer.getTile != null) {
        return this.tilesContainer.getTile(x, y);
      } else if (((ref1 = this.tilesContainer[y]) != null ? ref1[x] : void 0) != null) {
        return {
          x: x,
          y: y,
          tile: this.tilesContainer[y][x],
          emulated: true
        };
      }
    }

    getConnectedToTile(tile) {
      var connected, t;
      if (tile.getConnected != null) {
        return tile.getConnected();
      } else {
        connected = [];
        if (t = this.getTile(tile.x + 1, tile.y)) {
          connected.push(t);
        }
        if (t = this.getTile(tile.x - 1, tile.y)) {
          connected.push(t);
        }
        if (t = this.getTile(tile.x, tile.y + 1)) {
          connected.push(t);
        }
        if (t = this.getTile(tile.x, tile.y - 1)) {
          connected.push(t);
        }
        return connected;
      }
    }

    addNextSteps(step = null) {
      var i, len, next, ref1, results, tile;
      tile = step != null ? step.nextTile : this.from;
      ref1 = this.getConnectedToTile(tile);
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        next = ref1[i];
        if (this.tileIsValid(next)) {
          results.push(this.addStep(new PathFinder.Step(this, (step != null ? step : null), tile, next)));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

    tileEqual(tileA, tileB) {
      return tileA === tileB || ((tileA.emulated || tileB.emulated) && tileA.x === tileB.x && tileA.y === tileB.y);
    }

    arrivedAtDestination(step) {
      if (this.arrivedCallback != null) {
        return this.arrivedCallback(step);
      } else {
        return this.tileEqual(step.tile, this.to);
      }
    }

    addStep(step) {
      var solutionCandidate;
      if (this.paths[step.getExit().x] == null) {
        this.paths[step.getExit().x] = {};
      }
      if (!((this.paths[step.getExit().x][step.getExit().y] != null) && this.paths[step.getExit().x][step.getExit().y].getTotalLength() <= step.getTotalLength())) {
        if (this.paths[step.getExit().x][step.getExit().y] != null) {
          this.removeStep(this.paths[step.getExit().x][step.getExit().y]);
        }
        this.paths[step.getExit().x][step.getExit().y] = step;
        this.queue.splice(this.getStepRank(step), 0, step);
        solutionCandidate = new PathFinder.Step(this, step, step.nextTile, null);
        if (this.arrivedAtDestination(solutionCandidate) && !((this.solution != null) && this.solution.prev.getTotalLength() <= step.getTotalLength())) {
          return this.solution = solutionCandidate;
        }
      }
    }

    removeStep(step) {
      var index;
      index = this.queue.indexOf(step);
      if (index > -1) {
        return this.queue.splice(index, 1);
      }
    }

    best() {
      return this.queue[this.queue.length - 1];
    }

    getStepRank(step) {
      if (this.queue.length === 0) {
        return 0;
      } else {
        return this._getStepRank(step.getEfficiency(), 0, this.queue.length - 1);
      }
    }

    _getStepRank(efficiency, min, max) {
      var ref, refPos;
      refPos = Math.floor((max - min) / 2) + min;
      ref = this.queue[refPos].getEfficiency();
      if (ref === efficiency) {
        return refPos;
      } else if (ref > efficiency) {
        if (refPos === min) {
          return min;
        } else {
          return this._getStepRank(efficiency, min, refPos - 1);
        }
      } else {
        if (refPos === max) {
          return max + 1;
        } else {
          return this._getStepRank(efficiency, refPos + 1, max);
        }
      }
    }

  };

  PathFinder.properties({
    validTileCallback: {}
  });

  return PathFinder;

}).call(this);

PathFinder.Step = class Step {
  constructor(pathFinder, prev, tile1, nextTile) {
    this.pathFinder = pathFinder;
    this.prev = prev;
    this.tile = tile1;
    this.nextTile = nextTile;
  }

  posToTileOffset(x, y) {
    var tile;
    tile = Math.floor(x) === this.tile.x && Math.floor(y) === this.tile.y ? this.tile : (this.nextTile != null) && Math.floor(x) === this.nextTile.x && Math.floor(y) === this.nextTile.y ? this.nextTile : (this.prev != null) && Math.floor(x) === this.prev.tile.x && Math.floor(y) === this.prev.tile.y ? this.prev.tile : console.log('Math.floor(' + x + ') == ' + this.tile.x, 'Math.floor(' + y + ') == ' + this.tile.y, this);
    return {
      x: x,
      y: y,
      tile: tile,
      offsetX: x - tile.x,
      offsetY: y - tile.y
    };
  }

  getExit() {
    if (this.exit == null) {
      if (this.nextTile != null) {
        this.exit = {
          x: (this.tile.x + this.nextTile.x + 1) / 2,
          y: (this.tile.y + this.nextTile.y + 1) / 2
        };
      } else {
        this.exit = {
          x: this.tile.x + 0.5,
          y: this.tile.y + 0.5
        };
      }
    }
    return this.exit;
  }

  getEntry() {
    if (this.entry == null) {
      if (this.prev != null) {
        this.entry = {
          x: (this.tile.x + this.prev.tile.x + 1) / 2,
          y: (this.tile.y + this.prev.tile.y + 1) / 2
        };
      } else {
        this.entry = {
          x: this.tile.x + 0.5,
          y: this.tile.y + 0.5
        };
      }
    }
    return this.entry;
  }

  getLength() {
    if (this.length == null) {
      this.length = (this.nextTile == null) || (this.prev == null) ? 0.5 : this.prev.tile.x === this.nextTile.x || this.prev.tile.y === this.nextTile.y ? 1 : Math.sqrt(0.5);
    }
    return this.length;
  }

  getStartLength() {
    if (this.startLength == null) {
      this.startLength = this.prev != null ? this.prev.getTotalLength() : 0;
    }
    return this.startLength;
  }

  getTotalLength() {
    if (this.totalLength == null) {
      this.totalLength = this.getStartLength() + this.getLength();
    }
    return this.totalLength;
  }

  getEfficiency() {
    if (this.efficiency == null) {
      if (typeof this.pathFinder.efficiencyCallback === "function") {
        this.efficiency = this.pathFinder.efficiencyCallback(this);
      } else {
        this.efficiency = -this.getRemaining() * 1.1 - this.getTotalLength();
      }
    }
    return this.efficiency;
  }

  getRemaining() {
    var from, to, x, y;
    if (this.remaining == null) {
      from = this.getExit();
      to = {
        x: this.pathFinder.to.x + 0.5,
        y: this.pathFinder.to.y + 0.5
      };
      x = to.x - from.x;
      y = to.y - from.y;
      this.remaining = Math.sqrt(x * x + y * y);
    }
    return this.remaining;
  }

};

return(PathFinder);});
},{"spark-starter":99}],32:[function(require,module,exports){
if (typeof module !== "undefined" && module !== null) {
  module.exports = {
      greekAlphabet: require('./strings/greekAlphabet'),
      starNames: require('./strings/starNames')
  };
}
},{"./strings/greekAlphabet":33,"./strings/starNames":34}],33:[function(require,module,exports){
module.exports=[
"alpha",   "beta",    "gamma",   "delta",
"epsilon", "zeta",    "eta",     "theta",
"iota",    "kappa",   "lambda",  "mu",
"nu",      "xi",      "omicron", "pi",	
"rho",     "sigma",   "tau",     "upsilon",
"phi",     "chi",     "psi",     "omega"
]
},{}],34:[function(require,module,exports){
module.exports=[
"Achernar",     "Maia",        "Atlas",        "Salm",       "Alnilam",      "Nekkar",      "Elnath",       "Thuban",
"Achird",       "Marfik",      "Auva",         "Sargas",     "Alnitak",      "Nihal",       "Enif",         "Torcularis",
"Acrux",        "Markab",      "Avior",        "Sarin",      "Alphard",      "Nunki",       "Etamin",       "Turais",
"Acubens",      "Matar",       "Azelfafage",   "Sceptrum",   "Alphekka",     "Nusakan",     "Fomalhaut",    "Tyl",
"Adara",        "Mebsuta",     "Azha",         "Scheat",     "Alpheratz",    "Peacock",     "Fornacis",     "Unukalhai",
"Adhafera",     "Megrez",      "Azmidiske",    "Segin",      "Alrai",        "Phad",        "Furud",        "Vega",
"Adhil",        "Meissa",      "Baham",        "Seginus",    "Alrisha",      "Phaet",       "Gacrux",       "Vindemiatrix",
"Agena",        "Mekbuda",     "Becrux",       "Sham",       "Alsafi",       "Pherkad",     "Gianfar",      "Wasat",
"Aladfar",      "Menkalinan",  "Beid",         "Sharatan",   "Alsciaukat",   "Pleione",     "Gomeisa",      "Wezen",
"Alathfar",     "Menkar",      "Bellatrix",    "Shaula",     "Alshain",      "Polaris",     "Graffias",     "Wezn",
"Albaldah",     "Menkent",     "Betelgeuse",   "Shedir",     "Alshat",       "Pollux",      "Grafias",      "Yed",
"Albali",       "Menkib",      "Botein",       "Sheliak",    "Alsuhail",     "Porrima",     "Grumium",      "Yildun",
"Albireo",      "Merak",       "Brachium",     "Sirius",     "Altair",       "Praecipua",   "Hadar",        "Zaniah",
"Alchiba",      "Merga",       "Canopus",      "Situla",     "Altarf",       "Procyon",     "Haedi",        "Zaurak",
"Alcor",        "Merope",      "Capella",      "Skat",       "Alterf",       "Propus",      "Hamal",        "Zavijah",
"Alcyone",      "Mesarthim",   "Caph",         "Spica",      "Aludra",       "Rana",        "Hassaleh",     "Zibal",
"Alderamin",    "Metallah",    "Castor",       "Sterope",    "Alula",        "Ras",         "Heze",         "Zosma",
"Aldhibah",     "Miaplacidus", "Cebalrai",     "Sualocin",   "Alya",         "Rasalgethi",  "Hoedus",       "Aquarius",
"Alfirk",       "Minkar",      "Celaeno",      "Subra",      "Alzirr",       "Rasalhague",  "Homam",        "Aries",
"Algenib",      "Mintaka",     "Chara",        "Suhail",     "Ancha",        "Rastaban",    "Hyadum",       "Cepheus",
"Algieba",      "Mira",        "Chort",        "Sulafat",    "Angetenar",    "Regulus",     "Izar",         "Cetus",
"Algol",        "Mirach",      "Cursa",        "Syrma",      "Ankaa",        "Rigel",       "Jabbah",       "Columba",
"Algorab",      "Miram",       "Dabih",        "Tabit",      "Anser",        "Rotanev",     "Kajam",        "Coma",
"Alhena",       "Mirphak",     "Deneb",        "Talitha",    "Antares",      "Ruchba",      "Kaus",         "Corona",
"Alioth",       "Mizar",       "Denebola",     "Tania",      "Arcturus",     "Ruchbah",     "Keid",         "Crux",
"Alkaid",       "Mufrid",      "Dheneb",       "Tarazed",    "Arkab",        "Rukbat",      "Kitalpha",     "Draco",
"Alkalurops",   "Muliphen",    "Diadem",       "Taygeta",    "Arneb",        "Sabik",       "Kocab",        "Grus",
"Alkes",        "Murzim",      "Diphda",       "Tegmen",     "Arrakis",      "Sadalachbia", "Kornephoros",  "Hydra",
"Alkurhah",     "Muscida",     "Dschubba",     "Tejat",      "Ascella",      "Sadalmelik",  "Kraz",         "Lacerta",
"Almaak",       "Naos",        "Dsiban",       "Terebellum", "Asellus",      "Sadalsuud",   "Kuma",         "Mensa",
"Alnair",       "Nash",        "Dubhe",        "Thabit",     "Asterope",     "Sadr",        "Lesath",       "Maasym",
"Alnath",       "Nashira",     "Electra",      "Theemim",    "Atik",         "Saiph",       "Phoenix",      "Norma"
]
},{}],35:[function(require,module,exports){
var Direction;

module.exports = Direction = class Direction {
  constructor(name, x, y, inverseName) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.inverseName = inverseName;
  }

  getInverse() {
    return this.constructor[this.inverseName];
  }

};

Direction.up = new Direction('up', 0, -1, 'down');

Direction.down = new Direction('down', 0, 1, 'up');

Direction.left = new Direction('left', -1, 0, 'right');

Direction.right = new Direction('right', 1, 0, 'left');

Direction.adjacents = [Direction.up, Direction.down, Direction.left, Direction.right];

Direction.topLeft = new Direction('topLeft', -1, -1, 'bottomRight');

Direction.topRight = new Direction('topRight', 1, -1, 'bottomLeft');

Direction.bottomRight = new Direction('bottomRight', 1, 1, 'topLeft');

Direction.bottomLeft = new Direction('bottomLeft', -1, 1, 'topRight');

Direction.corners = [Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft];

Direction.all = [Direction.up, Direction.down, Direction.left, Direction.right, Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft];

},{}],36:[function(require,module,exports){
var Direction, Element, Tile;

Element = require('spark-starter').Element;

Direction = require('./Direction');

module.exports = Tile = (function() {
  class Tile extends Element {
    constructor(x1, y1) {
      super();
      this.x = x1;
      this.y = y1;
      this.init();
    }

    init() {
      var container;
      return container = null;
    }

    getRelativeTile(x, y) {
      if (this.container != null) {
        return this.container.getTile(this.x + x, this.y + y);
      }
    }

    findDirectionOf(tile) {
      if (tile.tile) {
        tile = tile.tile;
      }
      if ((tile.x != null) && (tile.y != null)) {
        return Direction.all.find((d) => {
          return d.x === tile.x - this.x && d.y === tile.y - this.y;
        });
      }
    }

    addChild(child, checkRef = true) {
      var index;
      index = this.children.indexOf(child);
      if (index === -1) {
        this.children.push(child);
      }
      if (checkRef) {
        child.tile = this;
      }
      return child;
    }

    removeChild(child, checkRef = true) {
      var index;
      index = this.children.indexOf(child);
      if (index > -1) {
        this.children.splice(index, 1);
      }
      if (checkRef && child.tile === this) {
        return child.tile = null;
      }
    }

    dist(tile) {
      var ctnDist, ref, x, y;
      if ((tile != null ? tile.getFinalTile : void 0) != null) {
        tile = tile.getFinalTile();
      }
      if (((tile != null ? tile.x : void 0) != null) && (tile.y != null) && (this.x != null) && (this.y != null) && (this.container === tile.container || (ctnDist = (ref = this.container) != null ? typeof ref.dist === "function" ? ref.dist(tile.container) : void 0 : void 0))) {
        x = tile.x - this.x;
        y = tile.y - this.y;
        if (ctnDist) {
          x += ctnDist.x;
          y += ctnDist.y;
        }
        return {
          x: x,
          y: y,
          length: Math.sqrt(x * x + y * y)
        };
      } else {
        return null;
      }
    }

    getFinalTile() {
      return this;
    }

  };

  Tile.properties({
    children: {
      collection: true
    },
    container: {
      change: function() {
        if (this.container != null) {
          return this.adjacentTiles.forEach(function(tile) {
            return tile.adjacentTilesProperty.invalidate();
          });
        }
      }
    },
    adjacentTiles: {
      calcul: function(invalidation) {
        if (invalidation.prop(this.containerProperty)) {
          return Direction.adjacents.map((d) => {
            return this.getRelativeTile(d.x, d.y);
          }).filter((t) => {
            return t != null;
          });
        }
      },
      collection: true
    }
  });

  return Tile;

}).call(this);

},{"./Direction":35,"spark-starter":99}],37:[function(require,module,exports){
var Element, TileContainer, TileReference;

Element = require('spark-starter').Element;

TileReference = require('./TileReference');

module.exports = TileContainer = (function() {
  class TileContainer extends Element {
    constructor() {
      super();
      this.init();
    }

    _addToBondaries(tile, boundaries) {
      if ((boundaries.top == null) || tile.y < boundaries.top) {
        boundaries.top = tile.y;
      }
      if ((boundaries.left == null) || tile.x < boundaries.left) {
        boundaries.left = tile.x;
      }
      if ((boundaries.bottom == null) || tile.y > boundaries.bottom) {
        boundaries.bottom = tile.y;
      }
      if ((boundaries.right == null) || tile.x > boundaries.right) {
        return boundaries.right = tile.x;
      }
    }

    init() {
      this.coords = {};
      return this.tiles = [];
    }

    addTile(tile) {
      if (!this.tiles.includes(tile)) {
        this.tiles.push(tile);
        if (this.coords[tile.x] == null) {
          this.coords[tile.x] = {};
        }
        this.coords[tile.x][tile.y] = tile;
        if (this.owner) {
          tile.container = this;
        }
        if (this.boundariesProperty.getter.calculated) {
          this._addToBondaries(tile, this.boundariesProperty.value);
        }
      }
      return this;
    }

    removeTile(tile) {
      var index;
      index = this.tiles.indexOf(tile);
      if (index > -1) {
        this.tiles.splice(index, 1);
        delete this.coords[tile.x][tile.y];
        if (this.owner) {
          tile.container = null;
        }
        if (this.boundariesProperty.getter.calculated) {
          if (this.boundaries.top === tile.y || this.boundaries.bottom === tile.y || this.boundaries.left === tile.x || this.boundaries.right === tile.x) {
            return this.boundariesProperty.invalidate();
          }
        }
      }
    }

    removeTileAt(x, y) {
      var tile;
      if (tile = this.getTile(x, y)) {
        return this.removeTile(tile);
      }
    }

    getTile(x, y) {
      var ref;
      if (((ref = this.coords[x]) != null ? ref[y] : void 0) != null) {
        return this.coords[x][y];
      }
    }

    loadMatrix(matrix) {
      var options, row, tile, x, y;
      for (y in matrix) {
        row = matrix[y];
        for (x in row) {
          tile = row[x];
          options = {
            x: parseInt(x),
            y: parseInt(y)
          };
          if (typeof tile === "function") {
            this.addTile(tile(options));
          } else {
            tile.x = options.x;
            tile.y = options.y;
            this.addTile(tile);
          }
        }
      }
      return this;
    }

    inRange(tile, range) {
      var found, i, j, ref, ref1, ref2, ref3, tiles, x, y;
      tiles = [];
      range--;
      for (x = i = ref = tile.x - range, ref1 = tile.x + range; (ref <= ref1 ? i <= ref1 : i >= ref1); x = ref <= ref1 ? ++i : --i) {
        for (y = j = ref2 = tile.y - range, ref3 = tile.y + range; (ref2 <= ref3 ? j <= ref3 : j >= ref3); y = ref2 <= ref3 ? ++j : --j) {
          if (Math.sqrt((x - tile.x) * (x - tile.x) + (y - tile.y) * (y - tile.y)) <= range && ((found = this.getTile(x, y)) != null)) {
            tiles.push(found);
          }
        }
      }
      return tiles;
    }

    allTiles() {
      return this.tiles.slice();
    }

    clearAll() {
      var i, len, ref, tile;
      if (this.owner) {
        ref = this.tiles;
        for (i = 0, len = ref.length; i < len; i++) {
          tile = ref[i];
          tile.container = null;
        }
      }
      this.coords = {};
      this.tiles = [];
      return this;
    }

    closest(originTile, filter) {
      var candidates, getScore;
      getScore = function(candidate) {
        if (candidate.score != null) {
          return candidate.score;
        } else {
          return candidate.score = candidate.getFinalTile().dist(originTile).length;
        }
      };
      candidates = this.tiles.filter(filter).map((t) => {
        return new TileReference(t);
      });
      candidates.sort((a, b) => {
        return getScore(a) - getScore(b);
      });
      if (candidates.length > 0) {
        return candidates[0].tile;
      } else {
        return null;
      }
    }

    copy() {
      var out;
      out = new TileContainer();
      out.coords = this.coords;
      out.tiles = this.tiles;
      out.owner = false;
      return out;
    }

    merge(ctn, mergeFn, asOwner = false) {
      var out, tmp;
      out = new TileContainer();
      out.owner = asOwner;
      tmp = ctn.copy();
      this.tiles.forEach(function(tileA) {
        var mergedTile, tileB;
        tileB = tmp.getTile(tileA.x, tileA.y);
        if (tileB) {
          tmp.removeTile(tileB);
        }
        mergedTile = mergeFn(tileA, tileB);
        if (mergedTile) {
          return out.addTile(mergedTile);
        }
      });
      tmp.tiles.forEach(function(tileB) {
        var mergedTile;
        mergedTile = mergeFn(null, tileB);
        if (mergedTile) {
          return out.addTile(mergedTile);
        }
      });
      return out;
    }

  };

  TileContainer.properties({
    owner: {
      default: true
    },
    boundaries: {
      calcul: function() {
        var boundaries;
        boundaries = {
          top: null,
          left: null,
          bottom: null,
          right: null
        };
        this.tiles.forEach((tile) => {
          return this._addToBondaries(tile, boundaries);
        });
        return boundaries;
      },
      output: function(val) {
        return Object.assign({}, val);
      }
    }
  });

  return TileContainer;

}).call(this);

},{"./TileReference":38,"spark-starter":99}],38:[function(require,module,exports){
var TileReference;

module.exports = TileReference = class TileReference {
  constructor(tile) {
    this.tile = tile;
    Object.defineProperties(this, {
      x: {
        get: () => {
          return this.getFinalTile().x;
        }
      },
      y: {
        get: () => {
          return this.getFinalTile().y;
        }
      }
    });
  }

  getFinalTile() {
    return this.tile.getFinalTile();
  }

};

},{}],39:[function(require,module,exports){
var Element, Tiled;

Element = require('spark-starter').Element;

module.exports = Tiled = (function() {
  class Tiled extends Element {
    putOnRandomTile(tiles) {
      var found;
      found = this.getRandomValidTile(tiles);
      if (found) {
        return this.tile = found;
      }
    }

    getRandomValidTile(tiles) {
      var candidate, pos, remaining;
      remaining = tiles.slice();
      while (remaining.length > 0) {
        pos = Math.floor(Math.random() * remaining.length);
        candidate = remaining.splice(pos, 1)[0];
        if (this.canGoOnTile(candidate)) {
          return candidate;
        }
      }
      return null;
    }

    canGoOnTile(tile) {
      return true;
    }

    getFinalTile() {
      return this.tile.getFinalTile();
    }

  };

  Tiled.properties({
    tile: {
      change: function(val, old) {
        if (old != null) {
          old.removeChild(this);
        }
        if (this.tile) {
          return this.tile.addChild(this);
        }
      }
    },
    offsetX: {
      default: 0
    },
    offsetY: {
      default: 0
    }
  });

  return Tiled;

}).call(this);

},{"spark-starter":99}],40:[function(require,module,exports){
module.exports = {
  "Direction": require("./Direction"),
  "Tile": require("./Tile"),
  "TileContainer": require("./TileContainer"),
  "TileReference": require("./TileReference"),
  "Tiled": require("./Tiled"),
}
},{"./Direction":35,"./Tile":36,"./TileContainer":37,"./TileReference":38,"./Tiled":39}],41:[function(require,module,exports){
(function (process,setImmediate){
(function(definition){var Timing=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Timing.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Timing;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Timing=Timing;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Timing=Timing;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var Timing;
Timing = (function() {
  class Timing extends Element {
    toggle(val) {
      if (typeof val === "undefined") {
        val = !this.running;
      }
      return this.running = val;
    }

    setTimeout(callback, time) {
      return new this.constructor.Timer({
        time: time,
        callback: callback,
        timing: this
      });
    }

    setInterval(callback, time) {
      return new this.constructor.Timer({
        time: time,
        callback: callback,
        repeat: true,
        timing: this
      });
    }

    pause() {
      return this.toggle(false);
    }

    unpause() {
      return this.toggle(true);
    }

  };

  Timing.properties({
    running: {
      default: true
    }
  });

  return Timing;

}).call(this);

Timing.Timer = (function() {
  class Timer extends Element {
    toggle(val) {
      if (typeof val === "undefined") {
        val = !this.paused;
      }
      return this.paused = val;
    }

    pause() {
      return this.toggle(true);
    }

    unpause() {
      return this.toggle(false);
    }

    start() {
      this.startTime = this.constructor.now();
      if (this.repeat) {
        return this.id = setInterval(this.tick.bind(this), this.remainingTime);
      } else {
        return this.id = setTimeout(this.tick.bind(this), this.remainingTime);
      }
    }

    stop() {
      this.remainingTime = this.time - (this.constructor.now() - this.startTime);
      if (this.repeat) {
        return clearInterval(this.id);
      } else {
        return clearTimeout(this.id);
      }
    }

    static now() {
      var ref;
      if ((typeof window !== "undefined" && window !== null ? (ref = window.performance) != null ? ref.now : void 0 : void 0) != null) {
        return window.performance.now();
      } else if ((typeof process !== "undefined" && process !== null ? process.uptime : void 0) != null) {
        return process.uptime() * 1000;
      } else {
        return Date.now();
      }
    }

    tick() {
      this.repetition += 1;
      if (this.callback != null) {
        this.callback();
      }
      if (this.repeat) {
        this.startTime = this.constructor.now();
        return this.remainingTime = this.time;
      } else {
        this.running = false;
        return this.remainingTime = 0;
      }
    }

    destroy() {
      if (this.repeat) {
        clearInterval(this.id);
      } else {
        clearTimeout(this.id);
      }
      this.running = false;
      return this.propertiesManager.destroy();
    }

  };

  Timer.properties({
    time: {
      default: 1000
    },
    paused: {
      default: false
    },
    running: {
      calcul: function(invalidator) {
        return !invalidator.prop(this.pausedProperty) && invalidator.propPath('timing.running') !== false;
      },
      change: function(val, old) {
        if (val) {
          return this.start();
        } else if (old) {
          return this.stop();
        }
      }
    },
    timing: {
      default: null
    },
    elapsedTime: {
      calcul: function(invalidator) {
        if (invalidator.prop(this.runningProperty)) {
          setImmediate(() => {
            return this.elapsedTimeProperty.invalidate();
          });
          return this.constructor.now() - this.startTime + this.time - this.remainingTime;
        } else {
          return this.time - this.remainingTime;
        }
      },
      set: function(val) {
        if (this.running) {
          this.stop();
          this.remainingTime = this.time - val;
          if (this.remainingTime <= 0) {
            return this.tick();
          } else {
            return this.start();
          }
        } else {
          this.remainingTime = this.time - val;
          return this.elapsedTimeProperty.invalidate();
        }
      }
    },
    prc: {
      calcul: function(invalidator) {
        return invalidator.prop(this.elapsedTimeProperty) / this.time;
      },
      set: function(val) {
        return this.elapsedTime = this.time * val;
      }
    },
    remainingTime: {
      calcul: function(invalidator) {
        return this.time;
      }
    },
    repeat: {
      default: false
    },
    repetition: {
      default: 0
    },
    callback: {
      default: null
    }
  });

  return Timer;

}).call(this);

return(Timing);});
}).call(this,require('_process'),require("timers").setImmediate)

},{"_process":25,"spark-starter":99,"timers":26}],42:[function(require,module,exports){
var CollectionPropertyWatcher, Connected, Element, SignalOperation;

Element = require('spark-starter').Element;

SignalOperation = require('./SignalOperation');

CollectionPropertyWatcher = require('spark-starter').watchers.CollectionPropertyWatcher;

module.exports = Connected = (function() {
  class Connected extends Element {
    canConnectTo(target) {
      return typeof target.addSignal === "function";
    }

    acceptSignal(signal) {
      return true;
    }

    onAddConnection(conn) {}

    onRemoveConnection(conn) {}

    onNewSignalType(signal) {}

    onAddSignal(signal, op) {}

    onRemoveSignal(signal, op) {}

    onRemoveSignalType(signal, op) {}

    onReplaceSignal(oldSignal, newSignal, op) {}

    containsSignal(signal, checkLast = false, checkOrigin) {
      return this.signals.find(function(c) {
        return c.match(signal, checkLast, checkOrigin);
      });
    }

    addSignal(signal, op) {
      var autoStart;
      if (!(op != null ? op.findLimiter(this) : void 0)) {
        if (!op) {
          op = new SignalOperation();
          autoStart = true;
        }
        op.addOperation(() => {
          var similar;
          if (!this.containsSignal(signal, true) && this.acceptSignal(signal)) {
            similar = this.containsSignal(signal);
            this.signals.push(signal);
            this.onAddSignal(signal, op);
            if (!similar) {
              return this.onNewSignalType(signal, op);
            }
          }
        });
        if (autoStart) {
          op.start();
        }
      }
      return signal;
    }

    removeSignal(signal, op) {
      var autoStart;
      if (!(op != null ? op.findLimiter(this) : void 0)) {
        if (!op) {
          op = new SignalOperation;
          autoStart = true;
        }
        op.addOperation(() => {
          var existing;
          if ((existing = this.containsSignal(signal, true)) && this.acceptSignal(signal)) {
            this.signals.splice(this.signals.indexOf(existing), 1);
            this.onRemoveSignal(signal, op);
            op.addOperation(() => {
              var similar;
              similar = this.containsSignal(signal);
              if (similar) {
                return this.onReplaceSignal(signal, similar, op);
              } else {
                return this.onRemoveSignalType(signal, op);
              }
            }, 0);
          }
          if (stepByStep) {
            return op.step();
          }
        });
        if (autoStart) {
          return op.start();
        }
      }
    }

    prepForwardedSignal(signal) {
      if (signal.last === this) {
        return signal;
      } else {
        return signal.withLast(this);
      }
    }

    checkForwardWatcher() {
      if (!this.forwardWatcher) {
        this.forwardWatcher = new CollectionPropertyWatcher({
          scope: this,
          property: 'outputs',
          onAdded: function(output, i) {
            return this.forwardedSignals.forEach((signal) => {
              return this.forwardSignalTo(signal, output);
            });
          },
          onRemoved: function(output, i) {
            return this.forwardedSignals.forEach((signal) => {
              return this.stopForwardedSignalTo(signal, output);
            });
          }
        });
        return this.forwardWatcher.bind();
      }
    }

    forwardSignal(signal, op) {
      var next;
      this.forwardedSignals.add(signal);
      next = this.prepForwardedSignal(signal);
      this.outputs.forEach(function(conn) {
        if (signal.last !== conn) {
          return conn.addSignal(next, op);
        }
      });
      return this.checkForwardWatcher();
    }

    forwardAllSignalsTo(conn, op) {
      return this.signals.forEach((signal) => {
        var next;
        next = this.prepForwardedSignal(signal);
        return conn.addSignal(next, op);
      });
    }

    stopForwardedSignal(signal, op) {
      var next;
      this.forwardedSignals.remove(signal);
      next = this.prepForwardedSignal(signal);
      return this.outputs.forEach(function(conn) {
        if (signal.last !== conn) {
          return conn.removeSignal(next, op);
        }
      });
    }

    stopAllForwardedSignalTo(conn, op) {
      return this.signals.forEach((signal) => {
        var next;
        next = this.prepForwardedSignal(signal);
        return conn.removeSignal(next, op);
      });
    }

    forwardSignalTo(signal, conn, op) {
      var next;
      next = this.prepForwardedSignal(signal);
      if (signal.last !== conn) {
        return conn.addSignal(next, op);
      }
    }

    stopForwardedSignalTo(signal, conn, op) {
      var next;
      next = this.prepForwardedSignal(signal);
      if (signal.last !== conn) {
        return conn.removeSignal(next, op);
      }
    }

  };

  Connected.properties({
    signals: {
      collection: true
    },
    inputs: {
      collection: true
    },
    outputs: {
      collection: true
    },
    forwardedSignals: {
      collection: true
    }
  });

  return Connected;

}).call(this);

},{"./SignalOperation":44,"spark-starter":99}],43:[function(require,module,exports){
var Element, Signal;

Element = require('spark-starter').Element;

module.exports = Signal = class Signal extends Element {
  constructor(origin, type = 'signal', exclusive = false) {
    super();
    this.origin = origin;
    this.type = type;
    this.exclusive = exclusive;
    this.last = this.origin;
  }

  withLast(last) {
    var signal;
    signal = new this.__proto__.constructor(this.origin, this.type, this.exclusive);
    signal.last = last;
    return signal;
  }

  copy() {
    var signal;
    signal = new this.__proto__.constructor(this.origin, this.type, this.exclusive);
    signal.last = this.last;
    return signal;
  }

  match(signal, checkLast = false, checkOrigin = this.exclusive) {
    return (!checkLast || signal.last === this.last) && (checkOrigin || signal.origin === this.origin) && signal.type === this.type;
  }

};

},{"spark-starter":99}],44:[function(require,module,exports){
var Element, SignalOperation;

Element = require('spark-starter').Element;

module.exports = SignalOperation = class SignalOperation extends Element {
  constructor() {
    super();
    this.queue = [];
    this.limiters = [];
  }

  addOperation(funct, priority = 1) {
    if (priority) {
      return this.queue.unshift(funct);
    } else {
      return this.queue.push(funct);
    }
  }

  addLimiter(connected) {
    if (!this.findLimiter(connected)) {
      return this.limiters.push(connected);
    }
  }

  findLimiter(connected) {
    return this.limiters.indexOf(connected) > -1;
  }

  start() {
    var results;
    results = [];
    while (this.queue.length) {
      results.push(this.step());
    }
    return results;
  }

  step() {
    var funct;
    if (this.queue.length === 0) {
      return this.done();
    } else {
      funct = this.queue.shift(funct);
      return funct(this);
    }
  }

  done() {}

};

},{"spark-starter":99}],45:[function(require,module,exports){
var Connected, Signal, SignalOperation, SignalSource;

Connected = require('./Connected');

Signal = require('./Signal');

SignalOperation = require('./SignalOperation');

module.exports = SignalSource = (function() {
  class SignalSource extends Connected {};

  SignalSource.properties({
    activated: {
      change: function() {
        var op;
        op = new SignalOperation();
        if (this.activated) {
          this.forwardSignal(this.signal, op);
        } else {
          this.stopForwardedSignal(this.signal, op);
        }
        return op.start();
      }
    },
    signal: {
      calcul: function() {
        return new Signal(this, 'power', true);
      }
    }
  });

  return SignalSource;

}).call(this);

},{"./Connected":42,"./Signal":43,"./SignalOperation":44}],46:[function(require,module,exports){
var Connected, Switch;

Connected = require('./Connected');

module.exports = Switch = class Switch extends Connected {};

},{"./Connected":42}],47:[function(require,module,exports){
var Connected, Direction, Tiled, Wire,
  indexOf = [].indexOf;

Tiled = require('parallelio-tiles').Tiled;

Direction = require('parallelio-tiles').Direction;

Connected = require('./Connected');

module.exports = Wire = (function() {
  class Wire extends Tiled {
    constructor(wireType = 'red') {
      super();
      this.wireType = wireType;
    }

    findDirectionsTo(conn) {
      var directions;
      directions = conn.tiles != null ? conn.tiles.map((tile) => {
        return this.tile.findDirectionOf(tile);
      }) : [this.tile.findDirectionOf(conn)];
      return directions.filter(function(d) {
        return d != null;
      });
    }

    canConnectTo(target) {
      return Connected.prototype.canConnectTo.call(this, target) && ((target.wireType == null) || target.wireType === this.wireType);
    }

    onNewSignalType(signal, op) {
      return this.forwardSignal(signal, op);
    }

  };

  Wire.extend(Connected);

  Wire.properties({
    outputs: {
      calcul: function(invalidation) {
        var parent;
        parent = invalidation.prop(this.tileProperty);
        if (parent) {
          return invalidation.prop(parent.adjacentTilesProperty).reduce((res, tile) => {
            return res.concat(invalidation.prop(tile.childrenProperty).filter((child) => {
              return this.canConnectTo(child);
            }).toArray());
          }, []);
        } else {
          return [];
        }
      }
    },
    connectedDirections: {
      calcul: function(invalidation) {
        return invalidation.prop(this.outputsProperty).reduce((out, conn) => {
          this.findDirectionsTo(conn).forEach(function(d) {
            if (indexOf.call(out, d) < 0) {
              return out.push(d);
            }
          });
          return out;
        }, []);
      }
    }
  });

  return Wire;

}).call(this);

},{"./Connected":42,"parallelio-tiles":40}],48:[function(require,module,exports){
module.exports = {
  "Connected": require("./Connected"),
  "Signal": require("./Signal"),
  "SignalOperation": require("./SignalOperation"),
  "SignalSource": require("./SignalSource"),
  "Switch": require("./Switch"),
  "Wire": require("./Wire"),
}
},{"./Connected":42,"./Signal":43,"./SignalOperation":44,"./SignalSource":45,"./Switch":46,"./Wire":47}],49:[function(require,module,exports){
var Airlock, Tile;

Tile = require('parallelio-tiles').Tile;

module.exports = Airlock = (function() {
  class Airlock extends Tile {
    attachTo(airlock) {
      return this.attachedTo = airlock;
    }

  };

  Airlock.properties({
    direction: {},
    attachedTo: {}
  });

  return Airlock;

}).call(this);



},{"parallelio-tiles":40}],50:[function(require,module,exports){
var Approach, Element, Timing;

Element = require('spark-starter').Element;

Timing = require('parallelio-timing');

module.exports = Approach = (function() {
  class Approach extends Element {
    start(location) {
      if (this.valid) {
        this.moving = true;
        this.subject.xMembers.addPropertyRef('position.offsetX', this);
        this.subject.yMembers.addPropertyRef('position.offsetY', this);
        return this.timeout = this.timing.setTimeout(() => {
          return this.done();
        }, this.duration);
      }
    }

    done() {
      this.subject.xMembers.removeRef('position.offsetX', this);
      this.subject.yMembers.removeRef('position.offsetY', this);
      this.subject.x = this.targetPos.x;
      this.subject.y = this.targetPos.x;
      this.subjectAirlock.attachTo(targetAirlock);
      this.moving = false;
      return this.complete = true;
    }

  };

  Approach.properties({
    timing: {
      calcul: function() {
        return new Timing();
      }
    },
    initialDist: {
      default: 500
    },
    rng: {
      default: Math.random
    },
    angle: {
      calcul: function() {
        return this.rng * Math.PI * 2;
      }
    },
    startingPos: {
      calcul: function() {
        return {
          x: this.startingPos.x + this.initialDist * Math.cos(this.angle),
          y: this.startingPos.y + this.initialDist * Math.sin(this.angle)
        };
      }
    },
    targetPos: {
      calcul: function() {
        return {
          x: this.targetAirlock.x - this.subjectAirlock.x,
          y: this.targetAirlock.y - this.subjectAirlock.y
        };
      }
    },
    subject: {},
    target: {},
    subjectAirlock: {
      calcul: function() {
        var airlocks;
        airlocks = this.subject.airlocks.slice();
        airlocks.sort((a, b) => {
          var valA, valB;
          valA = Math.abs(a.direction.x - Math.cos(this.angle)) + Math.abs(a.direction.y - Math.sin(this.angle));
          valB = Math.abs(b.direction.x - Math.cos(this.angle)) + Math.abs(b.direction.y - Math.sin(this.angle));
          return valA - valB;
        });
        return airlocks[0];
      }
    },
    targetAirlock: {
      calcul: function() {
        return this.target.airlocks.find((target) => {
          return target.direction.getInverse() === this.subjectAirlock.direction;
        });
      }
    },
    moving: {
      default: false
    },
    complete: {
      default: false
    },
    currentPos: {
      calcul: function(invalidator) {
        var end, prc, start;
        start = invalidator.prop(this.startingPosProperty);
        end = invalidator.prop(this.targetPosProperty);
        prc = invalidator.propPath("timeout.prc") || 0;
        return {
          x: (end.x - start.x) * prc + start.x,
          y: (end.y - start.y) * prc + start.y
        };
      }
    },
    duration: {
      default: 10000
    },
    timeout: {}
  });

  return Approach;

}).call(this);



},{"parallelio-timing":41,"spark-starter":99}],51:[function(require,module,exports){
var AutomaticDoor, Character, Door;

Door = require('./Door');

Character = require('./Character');

module.exports = AutomaticDoor = (function() {
  class AutomaticDoor extends Door {
    updateTileMembers(old) {
      var ref, ref1, ref2, ref3;
      if (old != null) {
        if ((ref = old.walkableMembers) != null) {
          ref.removeProperty(this.unlockedProperty);
        }
        if ((ref1 = old.transparentMembers) != null) {
          ref1.removeProperty(this.openProperty);
        }
      }
      if (this.tile) {
        if ((ref2 = this.tile.walkableMembers) != null) {
          ref2.addProperty(this.unlockedProperty);
        }
        return (ref3 = this.tile.transparentMembers) != null ? ref3.addProperty(this.openProperty) : void 0;
      }
    }

    init() {
      super.init();
      return this.open;
    }

    isActivatorPresent(invalidate) {
      return this.getReactiveTiles(invalidate).some((tile) => {
        var children;
        children = invalidate ? invalidate.prop(tile.childrenProperty) : tile.children;
        return children.some((child) => {
          return this.canBeActivatedBy(child);
        });
      });
    }

    canBeActivatedBy(elem) {
      return elem instanceof Character;
    }

    getReactiveTiles(invalidate) {
      var direction, tile;
      tile = invalidate ? invalidate.prop(this.tileProperty) : this.tile;
      if (!tile) {
        return [];
      }
      direction = invalidate ? invalidate.prop(this.directionProperty) : this.direction;
      if (direction === Door.directions.horizontal) {
        return [tile, tile.getRelativeTile(0, 1), tile.getRelativeTile(0, -1)].filter(function(t) {
          return t != null;
        });
      } else {
        return [tile, tile.getRelativeTile(1, 0), tile.getRelativeTile(-1, 0)].filter(function(t) {
          return t != null;
        });
      }
    }

  };

  AutomaticDoor.properties({
    open: {
      calcul: function(invalidate) {
        return !invalidate.prop(this.lockedProperty) && this.isActivatorPresent(invalidate);
      }
    },
    locked: {
      default: false
    },
    unlocked: {
      calcul: function(invalidate) {
        return !invalidate.prop(this.lockedProperty);
      }
    }
  });

  return AutomaticDoor;

}).call(this);



},{"./Character":52,"./Door":57}],52:[function(require,module,exports){
var Character, Damageable, Tiled, WalkAction;

Tiled = require('parallelio-tiles').Tiled;

Damageable = require('./Damageable');

WalkAction = require('./actions/WalkAction');

module.exports = Character = (function() {
  class Character extends Tiled {
    constructor(name) {
      super();
      this.name = name;
    }

    setDefaults() {
      if (!this.tile && (this.game.mainTileContainer != null)) {
        return this.putOnRandomTile(this.game.mainTileContainer.tiles);
      }
    }

    canGoOnTile(tile) {
      return (tile != null ? tile.walkable : void 0) !== false;
    }

    walkTo(tile) {
      var action;
      action = new WalkAction({
        actor: this,
        target: tile
      });
      action.execute();
      return action;
    }

    isSelectableBy(player) {
      return true;
    }

  };

  Character.extend(Damageable);

  Character.properties({
    game: {
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    },
    offsetX: {
      composed: true,
      default: 0.5
    },
    offsetY: {
      composed: true,
      default: 0.5
    },
    tile: {
      composed: true
    },
    defaultAction: {
      calcul: function() {
        return new WalkAction({
          actor: this
        });
      }
    },
    providedActions: {
      collection: true,
      calcul: function(invalidator) {
        return invalidator.propPath("tile.providedActions") || [];
      }
    }
  });

  return Character;

}).call(this);



},{"./Damageable":56,"./actions/WalkAction":88,"parallelio-tiles":40}],53:[function(require,module,exports){
var AttackMoveAction, CharacterAI, Door, PropertyWatcher, TileContainer, VisionCalculator, WalkAction;

TileContainer = require('parallelio-tiles').TileContainer;

VisionCalculator = require('./VisionCalculator');

Door = require('./Door');

WalkAction = require('./actions/WalkAction');

AttackMoveAction = require('./actions/AttackMoveAction');

PropertyWatcher = require('spark-starter').watchers.PropertyWatcher;

module.exports = CharacterAI = class CharacterAI {
  constructor(character) {
    this.character = character;
    this.nextActionCallback = () => {
      return this.nextAction();
    };
    this.visionMemory = new TileContainer();
    this.tileWatcher = new PropertyWatcher({
      callback: () => {
        return this.updateVisionMemory();
      },
      property: this.character.propertiesManager.getProperty('tile')
    });
  }

  start() {
    this.tileWatcher.bind();
    return this.nextAction();
  }

  nextAction() {
    var ennemy, unexplored;
    this.updateVisionMemory();
    if (ennemy = this.getClosestEnemy()) {
      return this.attackMoveTo(ennemy).on('end', nextActionCallback);
    } else if (unexplored = this.getClosestUnexplored()) {
      return this.walkTo(unexplored).on('end', nextActionCallback);
    } else {
      this.resetVisionMemory();
      return this.walkTo(this.getClosestUnexplored()).on('end', nextActionCallback);
    }
  }

  updateVisionMemory() {
    var calculator;
    calculator = new VisionCalculator(this.character.tile);
    calculator.calcul();
    return this.visionMemory = calculator.toContainer().merge(this.visionMemory, (a, b) => {
      if (a != null) {
        a = this.analyzeTile(a);
      }
      if ((a != null) && (b != null)) {
        a.visibility = Math.max(a.visibility, b.visibility);
        return a;
      } else {
        return a || b;
      }
    });
  }

  analyzeTile(tile) {
    var ref;
    tile.ennemySpotted = (ref = tile.getFinalTile().children) != null ? ref.find((c) => {
      return this.isEnnemy(c);
    }) : void 0;
    tile.explorable = this.isExplorable(tile);
    return tile;
  }

  isEnnemy(elem) {
    var ref;
    return (ref = this.character.owner) != null ? typeof ref.isEnemy === "function" ? ref.isEnemy(elem) : void 0 : void 0;
  }

  getClosestEnemy() {
    return this.visionMemory.closest(this.character.tile, (t) => {
      return t.ennemySpotted;
    });
  }

  getClosestUnexplored() {
    return this.visionMemory.closest(this.character.tile, (t) => {
      return t.visibility < 1 && t.explorable;
    });
  }

  isExplorable(tile) {
    var ref;
    tile = tile.getFinalTile();
    return tile.walkable || ((ref = tile.children) != null ? ref.find((c) => {
      return c instanceof Door;
    }) : void 0);
  }

  attackMoveTo(tile) {
    var action;
    tile = tile.getFinalTile();
    action = new AttackMoveAction({
      actor: this.character,
      target: tile
    });
    if (action.isReady()) {
      action.execute();
      return action;
    }
  }

  walkTo(tile) {
    var action;
    tile = tile.getFinalTile();
    action = new WalkAction({
      actor: this.character,
      target: tile
    });
    if (action.isReady()) {
      action.execute();
      return action;
    }
  }

};



},{"./Door":57,"./VisionCalculator":79,"./actions/AttackMoveAction":83,"./actions/WalkAction":88,"parallelio-tiles":40,"spark-starter":99}],54:[function(require,module,exports){
var Confrontation, Element, Ship, View;

Element = require('spark-starter').Element;

View = require('./View');

Ship = require('./Ship');

module.exports = Confrontation = (function() {
  class Confrontation extends Element {
    start() {
      game.mainView = this.view;
      subject.container = this.view;
      return opponent.container = this.view;
    }

  };

  Confrontation.properties({
    game: {
      default: null
    },
    subject: {
      default: null
    },
    view: {
      calcul: function() {
        return new View();
      }
    },
    opponent: {
      calcul: function() {
        return new Ship();
      }
    }
  });

  return Confrontation;

}).call(this);



},{"./Ship":73,"./View":78,"spark-starter":99}],55:[function(require,module,exports){
var DamagePropagation, Direction, Element, LineOfSight;

Element = require('spark-starter').Element;

LineOfSight = require('./LineOfSight');

Direction = require('parallelio-tiles').Direction;

module.exports = DamagePropagation = (function() {
  class DamagePropagation extends Element {
    constructor(options) {
      super(options);
    }

    getTileContainer() {
      return this.tile.container;
    }

    apply() {
      var damage, i, len, ref, results;
      ref = this.getDamaged();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        damage = ref[i];
        results.push(damage.target.damage(damage.damage));
      }
      return results;
    }

    getInitialTiles() {
      var ctn;
      ctn = this.getTileContainer();
      return ctn.inRange(this.tile, this.range);
    }

    getInitialDamages() {
      var damages, dmg, i, len, tile, tiles;
      damages = [];
      tiles = this.getInitialTiles();
      for (i = 0, len = tiles.length; i < len; i++) {
        tile = tiles[i];
        if (tile.damageable && (dmg = this.initialDamage(tile, tiles.length))) {
          damages.push(dmg);
        }
      }
      return damages;
    }

    getDamaged() {
      var added;
      if (this._damaged == null) {
        added = null;
        while (added = this.step(added)) {
          true;
        }
      }
      return this._damaged;
    }

    step(added) {
      if (added != null) {
        if (this.extendedDamage != null) {
          added = this.extend(added);
          this._damaged = added.concat(this._damaged);
          return added.length > 0 && added;
        }
      } else {
        return this._damaged = this.getInitialDamages();
      }
    }

    inDamaged(target, damaged) {
      var damage, i, index, len;
      for (index = i = 0, len = damaged.length; i < len; index = ++i) {
        damage = damaged[index];
        if (damage.target === target) {
          return index;
        }
      }
      return false;
    }

    extend(damaged) {
      var added, ctn, damage, dir, dmg, existing, i, j, k, len, len1, len2, local, ref, target, tile;
      ctn = this.getTileContainer();
      added = [];
      for (i = 0, len = damaged.length; i < len; i++) {
        damage = damaged[i];
        local = [];
        if (damage.target.x != null) {
          ref = Direction.adjacents;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            dir = ref[j];
            tile = ctn.getTile(damage.target.x + dir.x, damage.target.y + dir.y);
            if ((tile != null) && tile.damageable && this.inDamaged(tile, this._damaged) === false) {
              local.push(tile);
            }
          }
        }
        for (k = 0, len2 = local.length; k < len2; k++) {
          target = local[k];
          if (dmg = this.extendedDamage(target, damage, local.length)) {
            if ((existing = this.inDamaged(target, added)) === false) {
              added.push(dmg);
            } else {
              added[existing] = this.mergeDamage(added[existing], dmg);
            }
          }
        }
      }
      return added;
    }

    mergeDamage(d1, d2) {
      return {
        target: d1.target,
        power: d1.power + d2.power,
        damage: d1.damage + d2.damage
      };
    }

    modifyDamage(target, power) {
      if (typeof target.modifyDamage === 'function') {
        return Math.floor(target.modifyDamage(power, this.type));
      } else {
        return Math.floor(power);
      }
    }

  };

  DamagePropagation.properties({
    tile: {
      default: null
    },
    power: {
      default: 10
    },
    range: {
      default: 1
    },
    type: {
      default: null
    }
  });

  return DamagePropagation;

}).call(this);

DamagePropagation.Normal = class Normal extends DamagePropagation {
  initialDamage(target, nb) {
    var dmg;
    dmg = this.modifyDamage(target, this.power);
    if (dmg > 0) {
      return {
        target: target,
        power: this.power,
        damage: dmg
      };
    }
  }

};

DamagePropagation.Thermic = class Thermic extends DamagePropagation {
  extendedDamage(target, last, nb) {
    var dmg, power;
    power = (last.damage - 1) / 2 / nb * Math.min(1, last.target.health / last.target.maxHealth * 5);
    dmg = this.modifyDamage(target, power);
    if (dmg > 0) {
      return {
        target: target,
        power: power,
        damage: dmg
      };
    }
  }

  initialDamage(target, nb) {
    var dmg, power;
    power = this.power / nb;
    dmg = this.modifyDamage(target, power);
    if (dmg > 0) {
      return {
        target: target,
        power: power,
        damage: dmg
      };
    }
  }

};

DamagePropagation.Kinetic = class Kinetic extends DamagePropagation {
  extendedDamage(target, last, nb) {
    var dmg, power;
    power = (last.power - last.damage) * Math.min(1, last.target.health / last.target.maxHealth * 2) - 1;
    dmg = this.modifyDamage(target, power);
    if (dmg > 0) {
      return {
        target: target,
        power: power,
        damage: dmg
      };
    }
  }

  initialDamage(target, nb) {
    var dmg;
    dmg = this.modifyDamage(target, this.power);
    if (dmg > 0) {
      return {
        target: target,
        power: this.power,
        damage: dmg
      };
    }
  }

  modifyDamage(target, power) {
    if (typeof target.modifyDamage === 'function') {
      return Math.floor(target.modifyDamage(power, this.type));
    } else {
      return Math.floor(power * 0.25);
    }
  }

  mergeDamage(d1, d2) {
    return {
      target: d1.target,
      power: Math.floor((d1.power + d2.power) / 2),
      damage: Math.floor((d1.damage + d2.damage) / 2)
    };
  }

};

DamagePropagation.Explosive = (function() {
  class Explosive extends DamagePropagation {
    getDamaged() {
      var angle, i, inside, ref, shard, shardPower, shards, target;
      this._damaged = [];
      shards = Math.pow(this.range + 1, 2);
      shardPower = this.power / shards;
      inside = this.tile.health <= this.modifyDamage(this.tile, shardPower);
      if (inside) {
        shardPower *= 4;
      }
      for (shard = i = 0, ref = shards; (0 <= ref ? i <= ref : i >= ref); shard = 0 <= ref ? ++i : --i) {
        angle = this.rng() * Math.PI * 2;
        target = this.getTileHitByShard(inside, angle);
        if (target != null) {
          this._damaged.push({
            target: target,
            power: shardPower,
            damage: this.modifyDamage(target, shardPower)
          });
        }
      }
      return this._damaged;
    }

    getTileHitByShard(inside, angle) {
      var ctn, dist, target, vertex;
      ctn = this.getTileContainer();
      dist = this.range * this.rng();
      target = {
        x: this.tile.x + 0.5 + dist * Math.cos(angle),
        y: this.tile.y + 0.5 + dist * Math.sin(angle)
      };
      if (inside) {
        vertex = new LineOfSight(ctn, this.tile.x + 0.5, this.tile.y + 0.5, target.x, target.y);
        vertex.traversableCallback = (tile) => {
          return !inside || ((tile != null) && this.traversableCallback(tile));
        };
        return vertex.getEndPoint().tile;
      } else {
        return ctn.getTile(Math.floor(target.x), Math.floor(target.y));
      }
    }

  };

  Explosive.properties({
    rng: {
      default: Math.random
    },
    traversableCallback: {
      default: function(tile) {
        return !(typeof tile.getSolid === 'function' && tile.getSolid());
      }
    }
  });

  return Explosive;

}).call(this);



},{"./LineOfSight":63,"parallelio-tiles":40,"spark-starter":99}],56:[function(require,module,exports){
var Damageable, Element;

Element = require('spark-starter').Element;

module.exports = Damageable = (function() {
  class Damageable extends Element {
    damage(val) {
      return this.health = Math.max(0, this.health - val);
    }

    whenNoHealth() {}

  };

  Damageable.properties({
    damageable: {
      default: true
    },
    maxHealth: {
      default: 1000
    },
    health: {
      default: 1000,
      change: function() {
        if (this.health <= 0) {
          return this.whenNoHealth();
        }
      }
    }
  });

  return Damageable;

}).call(this);



},{"spark-starter":99}],57:[function(require,module,exports){
var Door, Tiled, directions;

Tiled = require('parallelio-tiles').Tiled;

directions = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};

module.exports = Door = (function() {
  class Door extends Tiled {
    updateTileMembers(old) {
      var ref, ref1, ref2, ref3;
      if (old != null) {
        if ((ref = old.walkableMembers) != null) {
          ref.removeProperty(this.openProperty);
        }
        if ((ref1 = old.transparentMembers) != null) {
          ref1.removeProperty(this.openProperty);
        }
      }
      if (this.tile) {
        if ((ref2 = this.tile.walkableMembers) != null) {
          ref2.addProperty(this.openProperty);
        }
        return (ref3 = this.tile.transparentMembers) != null ? ref3.addProperty(this.openProperty) : void 0;
      }
    }

  };

  Door.properties({
    tile: {
      change: function(val, old) {
        return this.updateTileMembers(old);
      }
    },
    open: {
      default: false
    },
    direction: {
      default: directions.horizontal
    }
  });

  Door.directions = directions;

  return Door;

}).call(this);



},{"parallelio-tiles":40}],58:[function(require,module,exports){
module.exports = require('spark-starter').Element;



},{"spark-starter":99}],59:[function(require,module,exports){
var Confrontation, Element, EncounterManager, PropertyWatcher;

Element = require('spark-starter').Element;

PropertyWatcher = require('spark-starter').watchers.PropertyWatcher;

Confrontation = require('./Confrontation');

module.exports = EncounterManager = (function() {
  class EncounterManager extends Element {
    init() {
      return this.locationWatcher.bind();
    }

    testEncounter() {
      if (this.rng() <= this.baseProbability) {
        return this.startEncounter();
      }
    }

    startEncounter() {
      var encounter;
      encounter = new Confrontation({
        subject: this.subject
      });
      return encounter.start();
    }

  };

  EncounterManager.properties({
    subject: {
      default: null
    },
    baseProbability: {
      default: 0.2
    },
    locationWatcher: {
      calcul: function() {
        return new PropertyWatcher({
          callback: () => {
            return this.testEncounter();
          },
          property: this.subject.propertiesManager.getProperty('location')
        });
      }
    },
    rng: {
      default: Math.random
    }
  });

  return EncounterManager;

}).call(this);



},{"./Confrontation":54,"spark-starter":99}],60:[function(require,module,exports){
var Floor, Tile;

Tile = require('parallelio-tiles').Tile;

module.exports = Floor = (function() {
  class Floor extends Tile {};

  Floor.properties({
    walkable: {
      composed: true
    },
    transparent: {
      composed: true
    }
  });

  return Floor;

}).call(this);



},{"parallelio-tiles":40}],61:[function(require,module,exports){
var Element, Game, Player, Timing, View;

Element = require('spark-starter').Element;

Timing = require('parallelio-timing');

View = require('./View');

Player = require('./Player');

module.exports = Game = (function() {
  class Game extends Element {
    start() {
      return this.currentPlayer;
    }

    add(elem) {
      elem.game = this;
      return elem;
    }

  };

  Game.properties({
    timing: {
      calcul: function() {
        return new Timing();
      }
    },
    mainView: {
      calcul: function() {
        if (this.views.length > 0) {
          return this.views.get(0);
        } else {
          return this.add(new this.defaultViewClass());
        }
      }
    },
    views: {
      collection: true
    },
    currentPlayer: {
      calcul: function() {
        if (this.players.length > 0) {
          return this.players.get(0);
        } else {
          return this.add(new this.defaultPlayerClass());
        }
      }
    },
    players: {
      collection: true
    }
  });

  Game.prototype.defaultViewClass = View;

  Game.prototype.defaultPlayerClass = Player;

  return Game;

}).call(this);



},{"./Player":68,"./View":78,"parallelio-timing":41,"spark-starter":99}],62:[function(require,module,exports){
var Collection, Inventory;

Collection = require('spark-starter').Collection;

module.exports = Inventory = class Inventory extends Collection {
  getByType(type) {
    var res;
    res = this.filter(function(r) {
      return r.type === type;
    });
    if (res.length) {
      return res[0];
    }
  }

  addByType(type, qte, partial = false) {
    var ressource;
    ressource = this.getByType(type);
    if (!ressource) {
      ressource = this.initRessource(type);
    }
    if (partial) {
      return ressource.partialChange(ressource.qte + qte);
    } else {
      return ressource.qte += qte;
    }
  }

  initRessource(type, opt) {
    return type.initRessource(opt);
  }

};



},{"spark-starter":99}],63:[function(require,module,exports){
var LineOfSight;

module.exports = LineOfSight = class LineOfSight {
  constructor(tiles, x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.tiles = tiles;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  setX1(val) {
    this.x1 = val;
    return this.invalidade();
  }

  setY1(val) {
    this.y1 = val;
    return this.invalidade();
  }

  setX2(val) {
    this.x2 = val;
    return this.invalidade();
  }

  setY2(val) {
    this.y2 = val;
    return this.invalidade();
  }

  invalidade() {
    this.endPoint = null;
    this.success = null;
    return this.calculated = false;
  }

  testTile(tile, entryX, entryY) {
    if (this.traversableCallback != null) {
      return this.traversableCallback(tile, entryX, entryY);
    } else {
      return (tile != null) && (typeof tile.getTransparent === 'function' ? tile.getTransparent() : typeof tile.transparent !== void 0 ? tile.transparent : true);
    }
  }

  testTileAt(x, y, entryX, entryY) {
    return this.testTile(this.tiles.getTile(Math.floor(x), Math.floor(y)), entryX, entryY);
  }

  reverseTracing() {
    var tmpX, tmpY;
    tmpX = this.x1;
    tmpY = this.y1;
    this.x1 = this.x2;
    this.y1 = this.y2;
    this.x2 = tmpX;
    this.y2 = tmpY;
    return this.reversed = !this.reversed;
  }

  calcul() {
    var nextX, nextY, positiveX, positiveY, ratio, tileX, tileY, total, x, y;
    ratio = (this.x2 - this.x1) / (this.y2 - this.y1);
    total = Math.abs(this.x2 - this.x1) + Math.abs(this.y2 - this.y1);
    positiveX = (this.x2 - this.x1) >= 0;
    positiveY = (this.y2 - this.y1) >= 0;
    tileX = x = this.x1;
    tileY = y = this.y1;
    if (this.reversed) {
      tileX = positiveX ? x : Math.ceil(x) - 1;
      tileY = positiveY ? y : Math.ceil(y) - 1;
    }
    while (total > Math.abs(x - this.x1) + Math.abs(y - this.y1) && this.testTileAt(tileX, tileY, x, y)) {
      nextX = positiveX ? Math.floor(x) + 1 : Math.ceil(x) - 1;
      nextY = positiveY ? Math.floor(y) + 1 : Math.ceil(y) - 1;
      if (this.x2 - this.x1 === 0) {
        y = nextY;
      } else if (this.y2 - this.y1 === 0) {
        x = nextX;
      } else if (Math.abs((nextX - x) / (this.x2 - this.x1)) < Math.abs((nextY - y) / (this.y2 - this.y1))) {
        x = nextX;
        y = (nextX - this.x1) / ratio + this.y1;
      } else {
        x = (nextY - this.y1) * ratio + this.x1;
        y = nextY;
      }
      tileX = positiveX ? x : Math.ceil(x) - 1;
      tileY = positiveY ? y : Math.ceil(y) - 1;
    }
    if (total <= Math.abs(x - this.x1) + Math.abs(y - this.y1)) {
      this.endPoint = {
        x: this.x2,
        y: this.y2,
        tile: this.tiles.getTile(Math.floor(this.x2), Math.floor(this.y2))
      };
      return this.success = true;
    } else {
      this.endPoint = {
        x: x,
        y: y,
        tile: this.tiles.getTile(Math.floor(tileX), Math.floor(tileY))
      };
      return this.success = false;
    }
  }

  forceSuccess() {
    this.endPoint = {
      x: this.x2,
      y: this.y2,
      tile: this.tiles.getTile(Math.floor(this.x2), Math.floor(this.y2))
    };
    this.success = true;
    return this.calculated = true;
  }

  getSuccess() {
    if (!this.calculated) {
      this.calcul();
    }
    return this.success;
  }

  getEndPoint() {
    if (!this.calculated) {
      this.calcul();
    }
    return this.endPoint;
  }

};



},{}],64:[function(require,module,exports){
var Element, Map;

Element = require('spark-starter').Element;

module.exports = Map = (function() {
  class Map extends Element {
    _addToBondaries(location, boundaries) {
      if ((boundaries.top == null) || location.y < boundaries.top) {
        boundaries.top = location.y;
      }
      if ((boundaries.left == null) || location.x < boundaries.left) {
        boundaries.left = location.x;
      }
      if ((boundaries.bottom == null) || location.y > boundaries.bottom) {
        boundaries.bottom = location.y;
      }
      if ((boundaries.right == null) || location.x > boundaries.right) {
        return boundaries.right = location.x;
      }
    }

  };

  Map.properties({
    locations: {
      collection: {
        closest: function(x, y) {
          var min, minDist;
          min = null;
          minDist = null;
          this.forEach(function(location) {
            var dist;
            dist = location.dist(x, y);
            if ((min == null) || minDist > dist) {
              min = location;
              return minDist = dist;
            }
          });
          return min;
        },
        closests: function(x, y) {
          var dists;
          dists = this.map(function(location) {
            return {
              dist: location.dist(x, y),
              location: location
            };
          });
          dists.sort(function(a, b) {
            return a.dist - b.dist;
          });
          return this.copy(dists.map(function(dist) {
            return dist.location;
          }));
        }
      }
    },
    boundaries: {
      calcul: function() {
        var boundaries;
        boundaries = {
          top: null,
          left: null,
          bottom: null,
          right: null
        };
        this.locations.forEach((location) => {
          return this._addToBondaries(location, boundaries);
        });
        return boundaries;
      },
      output: function(val) {
        return Object.assign({}, val);
      }
    }
  });

  return Map;

}).call(this);



},{"spark-starter":99}],65:[function(require,module,exports){
var Obstacle, Tiled;

Tiled = require('parallelio-tiles').Tiled;

module.exports = Obstacle = (function() {
  class Obstacle extends Tiled {
    updateWalkables(old) {
      var ref, ref1;
      if (old != null) {
        if ((ref = old.walkableMembers) != null) {
          ref.removeRef('walkable', this);
        }
      }
      if (this.tile) {
        return (ref1 = this.tile.walkableMembers) != null ? ref1.setValueRef(false, 'walkable', this) : void 0;
      }
    }

  };

  Obstacle.properties({
    tile: {
      change: function(val, old, overrided) {
        overrided(old);
        return this.updateWalkables(old);
      }
    }
  });

  return Obstacle;

}).call(this);



},{"parallelio-tiles":40}],66:[function(require,module,exports){
var Element, EventEmitter, PathWalk, Timing;

Element = require('spark-starter').Element;

Timing = require('parallelio-timing');

EventEmitter = require('events');

module.exports = PathWalk = (function() {
  class PathWalk extends Element {
    constructor(walker, path, options) {
      super(options);
      this.walker = walker;
      this.path = path;
    }

    start() {
      if (!this.path.solution) {
        this.path.calcul();
      }
      if (this.path.solution) {
        this.pathTimeout = this.timing.setTimeout(() => {
          return this.finish();
        }, this.totalTime);
        this.walker.tileMembers.addPropertyPath('position.tile', this);
        this.walker.offsetXMembers.addPropertyPath('position.offsetX', this);
        return this.walker.offsetYMembers.addPropertyPath('position.offsetY', this);
      }
    }

    stop() {
      return this.pathTimeout.pause();
    }

    finish() {
      this.walker.tile = this.position.tile;
      this.walker.offsetX = this.position.offsetX;
      this.walker.offsetY = this.position.offsetY;
      this.emit('finished');
      return this.end();
    }

    interrupt() {
      this.emit('interrupted');
      return this.end();
    }

    end() {
      this.emit('end');
      return this.destroy();
    }

    destroy() {
      if (this.walker.walk === this) {
        this.walker.walk = null;
      }
      this.walker.tileMembers.removeRef('position.tile', this);
      this.walker.offsetXMembers.removeRef('position.offsetX', this);
      this.walker.offsetYMembers.removeRef('position.offsetY', this);
      this.pathTimeout.destroy();
      this.propertiesManager.destroy();
      return this.removeAllListeners();
    }

  };

  PathWalk.include(EventEmitter.prototype);

  PathWalk.properties({
    speed: {
      default: 5
    },
    timing: {
      calcul: function() {
        return new Timing();
      }
    },
    pathLength: {
      calcul: function() {
        return this.path.solution.getTotalLength();
      }
    },
    totalTime: {
      calcul: function() {
        return this.pathLength / this.speed * 1000;
      }
    },
    position: {
      calcul: function(invalidator) {
        return this.path.getPosAtPrc(invalidator.propPath('pathTimeout.prc') || 0);
      }
    }
  });

  return PathWalk;

}).call(this);



},{"events":24,"parallelio-timing":41,"spark-starter":99}],67:[function(require,module,exports){
var Element, LineOfSight, PersonalWeapon, Timing;

Element = require('spark-starter').Element;

LineOfSight = require('./LineOfSight');

Timing = require('parallelio-timing');

module.exports = PersonalWeapon = (function() {
  class PersonalWeapon extends Element {
    constructor(options) {
      super(options);
    }

    canBeUsed() {
      return this.charged;
    }

    canUseOn(target) {
      return this.canUseFrom(this.user.tile, target);
    }

    canUseFrom(tile, target) {
      if (this.range === 1) {
        return this.inMeleeRange(tile, target);
      } else {
        return this.inRange(tile, target) && this.hasLineOfSight(tile, target);
      }
    }

    inRange(tile, target) {
      var ref, targetTile;
      targetTile = target.tile || target;
      return ((ref = tile.dist(targetTile)) != null ? ref.length : void 0) <= this.range;
    }

    inMeleeRange(tile, target) {
      var targetTile;
      targetTile = target.tile || target;
      return Math.abs(targetTile.x - tile.x) + Math.abs(targetTile.y - tile.y) === 1;
    }

    hasLineOfSight(tile, target) {
      var los, targetTile;
      targetTile = target.tile || target;
      los = new LineOfSight(targetTile.container, tile.x + 0.5, tile.y + 0.5, targetTile.x + 0.5, targetTile.y + 0.5);
      los.traversableCallback = function(tile) {
        return tile.walkable;
      };
      return los.getSuccess();
    }

    useOn(target) {
      if (this.canBeUsed()) {
        target.damage(this.power);
        this.charged = false;
        return this.recharge();
      }
    }

    recharge() {
      this.charging = true;
      return this.chargeTimeout = this.timing.setTimeout(() => {
        this.charging = false;
        return this.recharged();
      }, this.rechargeTime);
    }

    recharged() {
      return this.charged = true;
    }

    destroy() {
      if (this.chargeTimeout) {
        return this.chargeTimeout.destroy();
      }
    }

  };

  PersonalWeapon.properties({
    rechargeTime: {
      default: 1000
    },
    charged: {
      default: true
    },
    charging: {
      default: true
    },
    power: {
      default: 10
    },
    dps: {
      calcul: function(invalidator) {
        return invalidator.prop(this.powerProperty) / invalidator.prop(this.rechargeTimeProperty) * 1000;
      }
    },
    range: {
      default: 10
    },
    user: {
      default: null
    },
    timing: {
      calcul: function() {
        return new Timing();
      }
    }
  });

  return PersonalWeapon;

}).call(this);



},{"./LineOfSight":63,"parallelio-timing":41,"spark-starter":99}],68:[function(require,module,exports){
var Element, Player;

Element = require('spark-starter').Element;

module.exports = Player = (function() {
  class Player extends Element {
    constructor(options) {
      super(options);
    }

    setDefaults() {
      var first;
      first = this.game.players.length === 0;
      this.game.players.add(this);
      if (first && !this.controller && this.game.defaultPlayerControllerClass) {
        return this.controller = new this.game.defaultPlayerControllerClass();
      }
    }

    canTargetActionOn(elem) {
      var action, ref;
      action = this.selectedAction || ((ref = this.selected) != null ? ref.defaultAction : void 0);
      return (action != null) && typeof action.canTarget === "function" && action.canTarget(elem);
    }

    guessActionTarget(action) {
      var selected;
      selected = this.selected;
      if (typeof action.canTarget === "function" && (action.target == null) && action.actor !== selected && action.canTarget(selected)) {
        return action.withTarget(selected);
      } else {
        return action;
      }
    }

    canSelect(elem) {
      return typeof elem.isSelectableBy === "function" && elem.isSelectableBy(this);
    }

    canFocusOn(elem) {
      if (typeof elem.IsFocusableBy === "function") {
        return elem.IsFocusableBy(this);
      } else if (typeof elem.IsSelectableBy === "function") {
        return elem.IsSelectableBy(this);
      }
    }

    selectAction(action) {
      if (action.isReady()) {
        return action.start();
      } else {
        return this.selectedAction = action;
      }
    }

    setActionTarget(elem) {
      var action, ref;
      action = this.selectedAction || ((ref = this.selected) != null ? ref.defaultAction : void 0);
      action = action.withTarget(elem);
      if (action.isReady()) {
        action.start();
        return this.selectedAction = null;
      } else {
        return this.selectedAction = action;
      }
    }

  };

  Player.properties({
    name: {
      default: 'Player'
    },
    focused: {},
    selected: {
      change: function(val, old) {
        var ref;
        if (old != null ? old.propertiesManager.getProperty('selected') : void 0) {
          old.selected = false;
        }
        if ((ref = this.selected) != null ? ref.propertiesManager.getProperty('selected') : void 0) {
          return this.selected.selected = this;
        }
      }
    },
    globalActionProviders: {
      collection: true
    },
    actionProviders: {
      calcul: function(invalidator) {
        var res, selected;
        res = invalidator.prop(this.globalActionProvidersProperty).toArray();
        selected = invalidator.prop(this.selectedProperty);
        if (selected) {
          res.push(selected);
        }
        return res;
      }
    },
    availableActions: {
      calcul: function(invalidator) {
        return invalidator.prop(this.actionProvidersProperty).reduce((res, provider) => {
          var actions, selected;
          actions = invalidator.prop(provider.providedActionsProperty).toArray();
          selected = invalidator.prop(this.selectedProperty);
          if (selected != null) {
            actions = actions.map((action) => {
              return this.guessActionTarget(action);
            });
          }
          if (actions) {
            return res.concat(actions);
          } else {
            return res;
          }
        }, []);
      }
    },
    selectedAction: {},
    controller: {
      change: function(val, old) {
        if (this.controller) {
          return this.controller.player = this;
        }
      }
    },
    game: {
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    }
  });

  return Player;

}).call(this);



},{"spark-starter":99}],69:[function(require,module,exports){
var Element, Projectile, Timing;

Element = require('spark-starter').Element;

Timing = require('parallelio-timing');

module.exports = Projectile = (function() {
  class Projectile extends Element {
    constructor(options) {
      super(options);
      this.init();
    }

    init() {}

    launch() {
      this.moving = true;
      return this.pathTimeout = this.timing.setTimeout(() => {
        this.deliverPayload();
        return this.moving = false;
      }, this.pathLength / this.speed * 1000);
    }

    deliverPayload() {
      var payload;
      payload = new this.propagationType({
        tile: this.target.tile || this.target,
        power: this.power,
        range: this.blastRange
      });
      payload.apply();
      this.payloadDelivered();
      return payload;
    }

    payloadDelivered() {
      return this.destroy();
    }

    destroy() {
      return this.propertiesManager.destroy();
    }

  };

  Projectile.properties({
    origin: {
      default: null
    },
    target: {
      default: null
    },
    power: {
      default: 10
    },
    blastRange: {
      default: 1
    },
    propagationType: {
      default: null
    },
    speed: {
      default: 10
    },
    pathLength: {
      calcul: function() {
        var dist;
        if ((this.originTile != null) && (this.targetTile != null)) {
          dist = this.originTile.dist(this.targetTile);
          if (dist) {
            return dist.length;
          }
        }
        return 100;
      }
    },
    originTile: {
      calcul: function(invalidator) {
        var origin;
        origin = invalidator.prop(this.originProperty);
        if (origin != null) {
          return origin.tile || origin;
        }
      }
    },
    targetTile: {
      calcul: function(invalidator) {
        var target;
        target = invalidator.prop(this.targetProperty);
        if (target != null) {
          return target.tile || target;
        }
      }
    },
    container: {
      calcul: function(invalidate) {
        var originTile, targetTile;
        originTile = invalidate.prop(this.originTileProperty);
        targetTile = invalidate.prop(this.targetTileProperty);
        if (originTile.container === targetTile.container) {
          return originTile.container;
        } else if (invalidate.prop(this.prcPathProperty) > 0.5) {
          return targetTile.container;
        } else {
          return originTile.container;
        }
      }
    },
    x: {
      calcul: function(invalidate) {
        var startPos;
        startPos = invalidate.prop(this.startPosProperty);
        return (invalidate.prop(this.targetPosProperty).x - startPos.x) * invalidate.prop(this.prcPathProperty) + startPos.x;
      }
    },
    y: {
      calcul: function(invalidate) {
        var startPos;
        startPos = invalidate.prop(this.startPosProperty);
        return (invalidate.prop(this.targetPosProperty).y - startPos.y) * invalidate.prop(this.prcPathProperty) + startPos.y;
      }
    },
    startPos: {
      calcul: function(invalidate) {
        var container, dist, offset, originTile;
        originTile = invalidate.prop(this.originTileProperty);
        container = invalidate.prop(this.containerProperty);
        offset = this.startOffset;
        if (originTile.container !== container) {
          dist = container.dist(originTile.container);
          offset.x += dist.x;
          offset.y += dist.y;
        }
        return {
          x: originTile.x + offset.x,
          y: originTile.y + offset.y
        };
      },
      output: function(val) {
        return Object.assign({}, val);
      }
    },
    targetPos: {
      calcul: function(invalidate) {
        var container, dist, offset, targetTile;
        targetTile = invalidate.prop(this.targetTileProperty);
        container = invalidate.prop(this.containerProperty);
        offset = this.targetOffset;
        if (targetTile.container !== container) {
          dist = container.dist(targetTile.container);
          offset.x += dist.x;
          offset.y += dist.y;
        }
        return {
          x: targetTile.x + offset.x,
          y: targetTile.y + offset.y
        };
      },
      output: function(val) {
        return Object.assign({}, val);
      }
    },
    startOffset: {
      default: {
        x: 0.5,
        y: 0.5
      },
      output: function(val) {
        return Object.assign({}, val);
      }
    },
    targetOffset: {
      default: {
        x: 0.5,
        y: 0.5
      },
      output: function(val) {
        return Object.assign({}, val);
      }
    },
    prcPath: {
      calcul: function() {
        var ref;
        return ((ref = this.pathTimeout) != null ? ref.prc : void 0) || 0;
      }
    },
    timing: {
      calcul: function() {
        return new Timing();
      }
    },
    moving: {
      default: false
    }
  });

  return Projectile;

}).call(this);



},{"parallelio-timing":41,"spark-starter":99}],70:[function(require,module,exports){
var Element, Ressource;

Element = require('spark-starter').Element;

module.exports = Ressource = (function() {
  class Ressource extends Element {
    partialChange(qte) {
      var acceptable;
      acceptable = Math.max(this.minQte, Math.min(this.maxQte, qte));
      this.qte = acceptable;
      return qte - acceptable;
    }

  };

  Ressource.properties({
    type: {
      default: null
    },
    qte: {
      default: 0,
      ingest: function(qte) {
        if (this.maxQte !== null && qte > this.maxQte) {
          throw new Error('Cant have more than ' + this.maxQte + ' of ' + this.type.name);
        }
        if (this.minQte !== null && qte < this.minQte) {
          throw new Error('Cant have less than ' + this.minQte + ' of ' + this.type.name);
        }
        return qte;
      }
    },
    maxQte: {
      default: null
    },
    minQte: {
      default: 0
    }
  });

  return Ressource;

}).call(this);



},{"spark-starter":99}],71:[function(require,module,exports){
var Element, Ressource, RessourceType;

Element = require('spark-starter').Element;

Ressource = require('./Ressource');

module.exports = RessourceType = (function() {
  class RessourceType extends Element {
    initRessource(opt) {
      if (typeof opt !== "object") {
        opt = {
          qte: opt
        };
      }
      opt = Object.assign({}, this.defaultOptions, opt);
      return new this.ressourceClass(opt);
    }

  };

  RessourceType.properties({
    name: {
      default: null
    },
    ressourceClass: {
      default: Ressource
    },
    defaultOptions: {
      default: {}
    }
  });

  return RessourceType;

}).call(this);



},{"./Ressource":70,"spark-starter":99}],72:[function(require,module,exports){
var Direction, Door, Element, RoomGenerator, Tile, TileContainer,
  indexOf = [].indexOf;

Element = require('spark-starter').Element;

TileContainer = require('parallelio-tiles').TileContainer;

Tile = require('parallelio-tiles').Tile;

Direction = require('parallelio-tiles').Direction;

Door = require('./Door');

module.exports = RoomGenerator = (function() {
  class RoomGenerator extends Element {
    constructor(options) {
      super(options);
    }

    initTiles() {
      this.finalTiles = null;
      this.rooms = [];
      return this.free = this.tileContainer.allTiles().filter((tile) => {
        var direction, k, len, next, ref;
        ref = Direction.all;
        for (k = 0, len = ref.length; k < len; k++) {
          direction = ref[k];
          next = this.tileContainer.getTile(tile.x + direction.x, tile.y + direction.y);
          if (next == null) {
            return false;
          }
        }
        return true;
      });
    }

    calcul() {
      var i;
      this.initTiles();
      i = 0;
      while (this.step() || this.newRoom()) {
        i++;
      }
      this.createDoors();
      this.rooms;
      return this.makeFinalTiles();
    }

    floorFactory(opt) {
      return new Tile(opt.x, opt.y);
    }

    doorFactory(opt) {
      return this.floorFactory(opt);
    }

    makeFinalTiles() {
      return this.finalTiles = this.tileContainer.allTiles().map((tile) => {
        var opt;
        if (tile.factory != null) {
          opt = {
            x: tile.x,
            y: tile.y
          };
          if (tile.factoryOptions != null) {
            opt = Object.assign(opt, tile.factoryOptions);
          }
          return tile.factory(opt);
        }
      }).filter((tile) => {
        return tile != null;
      });
    }

    getTiles() {
      if (this.finalTiles == null) {
        this.calcul();
      }
      return this.finalTiles;
    }

    newRoom() {
      if (this.free.length) {
        this.volume = Math.floor(this.rng() * (this.maxVolume - this.minVolume)) + this.minVolume;
        return this.room = new RoomGenerator.Room();
      }
    }

    randomDirections() {
      var i, j, o, x;
      o = Direction.adjacents.slice();
      j = void 0;
      x = void 0;
      i = o.length;
      while (i) {
        j = Math.floor(this.rng() * i);
        x = o[--i];
        o[i] = o[j];
        o[j] = x;
      }
      return o;
    }

    step() {
      var success, tries;
      if (this.room) {
        if (this.free.length && this.room.tiles.length < this.volume - 1) {
          if (this.room.tiles.length) {
            tries = this.randomDirections();
            success = false;
            while (tries.length && !success) {
              success = this.expand(this.room, tries.pop(), this.volume);
            }
            if (!success) {
              this.roomDone();
            }
            return success;
          } else {
            this.allocateTile(this.randomFreeTile(), this.room);
            return true;
          }
        } else {
          this.roomDone();
          return false;
        }
      }
    }

    roomDone() {
      this.rooms.push(this.room);
      this.allocateWalls(this.room);
      return this.room = null;
    }

    expand(room, direction, max = 0) {
      var k, len, next, ref, second, success, tile;
      success = false;
      ref = room.tiles;
      for (k = 0, len = ref.length; k < len; k++) {
        tile = ref[k];
        if (max === 0 || room.tiles.length < max) {
          if (next = this.tileOffsetIsFree(tile, direction)) {
            this.allocateTile(next, room);
            success = true;
          }
          if ((second = this.tileOffsetIsFree(tile, direction, 2)) && !this.tileOffsetIsFree(tile, direction, 3)) {
            this.allocateTile(second, room);
          }
        }
      }
      return success;
    }

    allocateWalls(room) {
      var direction, k, len, next, nextRoom, otherSide, ref, results, tile;
      ref = room.tiles;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        tile = ref[k];
        results.push((function() {
          var l, len1, ref1, results1;
          ref1 = Direction.all;
          results1 = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            direction = ref1[l];
            next = this.tileContainer.getTile(tile.x + direction.x, tile.y + direction.y);
            if ((next != null) && next.room !== room) {
              if (indexOf.call(Direction.corners, direction) < 0) {
                otherSide = this.tileContainer.getTile(tile.x + direction.x * 2, tile.y + direction.y * 2);
                nextRoom = (otherSide != null ? otherSide.room : void 0) != null ? otherSide.room : null;
                room.addWall(next, nextRoom);
                if (nextRoom != null) {
                  nextRoom.addWall(next, room);
                }
              }
              if (this.wallFactory) {
                next.factory = (opt) => {
                  return this.wallFactory(opt);
                };
                next.factory.base = this.wallFactory;
              }
              results1.push(this.allocateTile(next));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      }
      return results;
    }

    createDoors() {
      var adjacent, door, k, len, ref, results, room, walls;
      ref = this.rooms;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        room = ref[k];
        results.push((function() {
          var l, len1, ref1, results1;
          ref1 = room.wallsByRooms();
          results1 = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            walls = ref1[l];
            if ((walls.room != null) && room.doorsForRoom(walls.room) < 1) {
              door = walls.tiles[Math.floor(this.rng() * walls.tiles.length)];
              door.factory = (opt) => {
                return this.doorFactory(opt);
              };
              door.factory.base = this.doorFactory;
              adjacent = this.tileContainer.getTile(door.x + 1, door.y);
              door.factoryOptions = {
                direction: adjacent.factory && adjacent.factory.base === this.floorFactory ? Door.directions.vertical : Door.directions.horizontal
              };
              room.addDoor(door, walls.room);
              results1.push(walls.room.addDoor(door, room));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      }
      return results;
    }

    allocateTile(tile, room = null) {
      var index;
      if (room != null) {
        room.addTile(tile);
        tile.factory = (opt) => {
          return this.floorFactory(opt);
        };
        tile.factory.base = this.floorFactory;
      }
      index = this.free.indexOf(tile);
      if (index > -1) {
        return this.free.splice(index, 1);
      }
    }

    tileOffsetIsFree(tile, direction, multiply = 1) {
      return this.tileIsFree(tile.x + direction.x * multiply, tile.y + direction.y * multiply);
    }

    tileIsFree(x, y) {
      var tile;
      tile = this.tileContainer.getTile(x, y);
      if ((tile != null) && indexOf.call(this.free, tile) >= 0) {
        return tile;
      } else {
        return false;
      }
    }

    randomFreeTile() {
      return this.free[Math.floor(this.rng() * this.free.length)];
    }

  };

  RoomGenerator.properties({
    rng: {
      default: Math.random
    },
    maxVolume: {
      default: 25
    },
    minVolume: {
      default: 50
    },
    width: {
      default: 30
    },
    height: {
      default: 15
    },
    tileContainer: {
      calcul: function() {
        var k, l, ref, ref1, tiles, x, y;
        tiles = new TileContainer();
        for (x = k = 0, ref = this.width; (0 <= ref ? k <= ref : k >= ref); x = 0 <= ref ? ++k : --k) {
          for (y = l = 0, ref1 = this.height; (0 <= ref1 ? l <= ref1 : l >= ref1); y = 0 <= ref1 ? ++l : --l) {
            tiles.addTile(new Tile(x, y));
          }
        }
        return tiles;
      }
    }
  });

  return RoomGenerator;

}).call(this);

RoomGenerator.Room = class Room {
  constructor() {
    this.tiles = [];
    this.walls = [];
    this.doors = [];
  }

  addTile(tile) {
    this.tiles.push(tile);
    return tile.room = this;
  }

  containsWall(tile) {
    var k, len, ref, wall;
    ref = this.walls;
    for (k = 0, len = ref.length; k < len; k++) {
      wall = ref[k];
      if (wall.tile === tile) {
        return wall;
      }
    }
    return false;
  }

  addWall(tile, nextRoom) {
    var existing;
    existing = this.containsWall(tile);
    if (existing) {
      return existing.nextRoom = nextRoom;
    } else {
      return this.walls.push({
        tile: tile,
        nextRoom: nextRoom
      });
    }
  }

  wallsByRooms() {
    var k, len, pos, ref, res, rooms, wall;
    rooms = [];
    res = [];
    ref = this.walls;
    for (k = 0, len = ref.length; k < len; k++) {
      wall = ref[k];
      pos = rooms.indexOf(wall.nextRoom);
      if (pos === -1) {
        pos = rooms.length;
        rooms.push(wall.nextRoom);
        res.push({
          room: wall.nextRoom,
          tiles: []
        });
      }
      res[pos].tiles.push(wall.tile);
    }
    return res;
  }

  addDoor(tile, nextRoom) {
    return this.doors.push({
      tile: tile,
      nextRoom: nextRoom
    });
  }

  doorsForRoom(room) {
    var door, k, len, ref, res;
    res = [];
    ref = this.doors;
    for (k = 0, len = ref.length; k < len; k++) {
      door = ref[k];
      if (door.nextRoom === room) {
        res.push(door.tile);
      }
    }
    return res;
  }

};



},{"./Door":57,"parallelio-tiles":40,"spark-starter":99}],73:[function(require,module,exports){
var Element, Ship, Travel, TravelAction;

Element = require('spark-starter').Element;

Travel = require('./Travel');

TravelAction = require('./actions/TravelAction');

module.exports = Ship = (function() {
  class Ship extends Element {
    travelTo(location) {
      var travel;
      travel = new Travel({
        traveller: this,
        startLocation: this.location,
        targetLocation: location
      });
      if (travel.valid) {
        travel.start();
        return this.travel = travel;
      }
    }

  };

  Ship.properties({
    location: {
      default: null
    },
    travel: {
      default: null
    },
    providedActions: {
      collection: true,
      calcul: function(invalidator) {
        return new TravelAction({
          actor: this
        });
      }
    },
    spaceCoodinate: {
      calcul: function(invalidator) {
        if (invalidator.prop(this.travelProperty)) {
          return invalidator.propPath('travel.spaceCoodinate');
        } else {
          return {
            x: invalidator.propPath('location.x'),
            y: invalidator.propPath('location.y')
          };
        }
      }
    }
  });

  return Ship;

}).call(this);



},{"./Travel":77,"./actions/TravelAction":87,"spark-starter":99}],74:[function(require,module,exports){
var Damageable, Projectile, ShipWeapon, Tiled, Timing;

Tiled = require('parallelio-tiles').Tiled;

Timing = require('parallelio-timing');

Damageable = require('./Damageable');

Projectile = require('./Projectile');

module.exports = ShipWeapon = (function() {
  class ShipWeapon extends Tiled {
    constructor(options) {
      super(options);
    }

    fire() {
      var projectile;
      if (this.canFire) {
        projectile = new this.projectileClass({
          origin: this,
          target: this.target,
          power: this.power,
          blastRange: this.blastRange,
          propagationType: this.propagationType,
          speed: this.projectileSpeed,
          timing: this.timing
        });
        projectile.launch();
        this.charged = false;
        this.recharge();
        return projectile;
      }
    }

    recharge() {
      this.charging = true;
      return this.chargeTimeout = this.timing.setTimeout(() => {
        this.charging = false;
        return this.recharged();
      }, this.rechargeTime);
    }

    recharged() {
      this.charged = true;
      if (this.autoFire) {
        return this.fire();
      }
    }

  };

  ShipWeapon.extend(Damageable);

  ShipWeapon.properties({
    rechargeTime: {
      default: 1000
    },
    power: {
      default: 10
    },
    blastRange: {
      default: 1
    },
    propagationType: {
      default: null
    },
    projectileSpeed: {
      default: 10
    },
    target: {
      default: null,
      change: function() {
        if (this.autoFire) {
          return this.fire();
        }
      }
    },
    charged: {
      default: true
    },
    charging: {
      default: true
    },
    enabled: {
      default: true
    },
    autoFire: {
      default: true
    },
    criticalHealth: {
      default: 0.3
    },
    canFire: {
      get: function() {
        return this.target && this.enabled && this.charged && this.health / this.maxHealth >= this.criticalHealth;
      }
    },
    timing: {
      calcul: function() {
        return new Timing();
      }
    },
    projectileClass: {
      default: Projectile
    }
  });

  return ShipWeapon;

}).call(this);



},{"./Damageable":56,"./Projectile":69,"parallelio-tiles":40,"parallelio-timing":41}],75:[function(require,module,exports){
var Element, Map, StarMapGenerator, StarSystem, starNames;

Element = require('spark-starter').Element;

Map = require('./Map');

StarSystem = require('./StarSystem');

starNames = require('parallelio-strings').starNames;

module.exports = StarMapGenerator = (function() {
  class StarMapGenerator extends Element {
    constructor(options) {
      super();
      this.opt = Object.assign({}, this.defOpt, options);
    }

    generate() {
      this.map = new this.opt.mapClass();
      this.stars = this.map.locations.copy();
      this.links = [];
      this.createStars(this.opt.nbStars);
      this.makeLinks();
      return this.map;
    }

    createStars(nb) {
      var i, k, ref, results;
      results = [];
      for (i = k = 0, ref = nb; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
        results.push(this.createStar());
      }
      return results;
    }

    createStar(opt = {}) {
      var name, pos, star;
      if (!(opt.x && opt.y)) {
        pos = this.randomStarPos();
        if (pos != null) {
          opt = Object.assign({}, opt, {
            x: pos.x,
            y: pos.y
          });
        } else {
          return null;
        }
      }
      if (!opt.name) {
        name = this.randomStarName();
        if (name != null) {
          opt = Object.assign({}, opt, {
            name: name
          });
        } else {
          return null;
        }
      }
      star = new this.opt.starClass(opt);
      this.map.locations.push(star);
      this.stars.push(star);
      return star;
    }

    randomStarPos() {
      var j, pos;
      j = 0;
      while (true) {
        pos = {
          x: Math.floor(this.opt.rng() * (this.opt.maxX - this.opt.minX) + this.opt.minX),
          y: Math.floor(this.opt.rng() * (this.opt.maxY - this.opt.minY) + this.opt.minY)
        };
        if (!(j < 10 && this.stars.find((star) => {
          return star.dist(pos.x, pos.y) <= this.opt.minStarDist;
        }))) {
          break;
        }
        j++;
      }
      if (!(j >= 10)) {
        return pos;
      }
    }

    randomStarName() {
      var name, pos, ref;
      if ((ref = this.opt.starNames) != null ? ref.length : void 0) {
        pos = Math.floor(this.opt.rng() * this.opt.starNames.length);
        name = this.opt.starNames[pos];
        this.opt.starNames.splice(pos, 1);
        return name;
      }
    }

    makeLinks() {
      return this.stars.forEach((star) => {
        return this.makeLinksFrom(star);
      });
    }

    makeLinksFrom(star) {
      var close, closests, link, needed, results, tries;
      tries = this.opt.linkTries;
      needed = this.opt.linksByStars - star.links.count();
      if (needed > 0) {
        closests = this.stars.filter((star2) => {
          return star2 !== star && !star.links.findStar(star2);
        }).closests(star.x, star.y);
        if (closests.count() > 0) {
          results = [];
          while (true) {
            close = closests.shift();
            link = this.createLink(star, close);
            if (this.validateLink(link)) {
              this.links.push(link);
              star.addLink(link);
              needed -= 1;
            } else {
              tries -= 1;
            }
            if (!(needed > 0 && tries > 0 && closests.count() > 0)) {
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    }

    createLink(star1, star2) {
      return new this.opt.linkClass(star1, star2);
    }

    validateLink(link) {
      return !this.stars.find((star) => {
        return star !== link.star1 && star !== link.star2 && link.closeToPoint(star.x, star.y, this.opt.minLinkDist);
      }) && !this.links.find((link2) => {
        return link2.intersectLink(link);
      });
    }

  };

  StarMapGenerator.prototype.defOpt = {
    nbStars: 20,
    minX: 0,
    maxX: 500,
    minY: 0,
    maxY: 500,
    minStarDist: 20,
    minLinkDist: 20,
    linksByStars: 3,
    linkTries: 3,
    mapClass: Map,
    starClass: StarSystem,
    linkClass: StarSystem.Link,
    rng: Math.random,
    starNames: starNames
  };

  return StarMapGenerator;

}).call(this);



},{"./Map":64,"./StarSystem":76,"parallelio-strings":32,"spark-starter":99}],76:[function(require,module,exports){
var Element, StarSystem;

Element = require('spark-starter').Element;

module.exports = StarSystem = (function() {
  class StarSystem extends Element {
    constructor(data) {
      super(data);
      this.init();
    }

    init() {}

    linkTo(star) {
      if (!this.links.findStar(star)) {
        return this.addLink(new this.constructor.Link(this, star));
      }
    }

    addLink(link) {
      this.links.add(link);
      link.otherStar(this).links.add(link);
      return link;
    }

    dist(x, y) {
      var xDist, yDist;
      xDist = this.x - x;
      yDist = this.y - y;
      return Math.sqrt((xDist * xDist) + (yDist * yDist));
    }

    isSelectableBy(player) {
      return true;
    }

  };

  StarSystem.properties({
    x: {},
    y: {},
    name: {},
    links: {
      collection: {
        findStar: function(star) {
          return this.find(function(link) {
            return link.star2 === star || link.star1 === star;
          });
        }
      }
    }
  });

  StarSystem.collenctionFn = {
    closest: function(x, y) {
      var min, minDist;
      min = null;
      minDist = null;
      this.forEach(function(star) {
        var dist;
        dist = star.dist(x, y);
        if ((min == null) || minDist > dist) {
          min = star;
          return minDist = dist;
        }
      });
      return min;
    },
    closests: function(x, y) {
      var dists;
      dists = this.map(function(star) {
        return {
          dist: star.dist(x, y),
          star: star
        };
      });
      dists.sort(function(a, b) {
        return a.dist - b.dist;
      });
      return this.copy(dists.map(function(dist) {
        return dist.star;
      }));
    }
  };

  return StarSystem;

}).call(this);

StarSystem.Link = class Link extends Element {
  constructor(star1, star2) {
    super();
    this.star1 = star1;
    this.star2 = star2;
  }

  remove() {
    this.star1.links.remove(this);
    return this.star2.links.remove(this);
  }

  otherStar(star) {
    if (star === this.star1) {
      return this.star2;
    } else {
      return this.star1;
    }
  }

  getLength() {
    return this.star1.dist(this.star2.x, this.star2.y);
  }

  inBoundaryBox(x, y, padding = 0) {
    var x1, x2, y1, y2;
    x1 = Math.min(this.star1.x, this.star2.x) - padding;
    y1 = Math.min(this.star1.y, this.star2.y) - padding;
    x2 = Math.max(this.star1.x, this.star2.x) + padding;
    y2 = Math.max(this.star1.y, this.star2.y) + padding;
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
  }

  closeToPoint(x, y, minDist) {
    var a, abDist, abcAngle, abxAngle, acDist, acxAngle, b, c, cdDist, xAbDist, xAcDist, yAbDist, yAcDist;
    if (!this.inBoundaryBox(x, y, minDist)) {
      return false;
    }
    a = this.star1;
    b = this.star2;
    c = {
      "x": x,
      "y": y
    };
    xAbDist = b.x - a.x;
    yAbDist = b.y - a.y;
    abDist = Math.sqrt((xAbDist * xAbDist) + (yAbDist * yAbDist));
    abxAngle = Math.atan(yAbDist / xAbDist);
    xAcDist = c.x - a.x;
    yAcDist = c.y - a.y;
    acDist = Math.sqrt((xAcDist * xAcDist) + (yAcDist * yAcDist));
    acxAngle = Math.atan(yAcDist / xAcDist);
    abcAngle = abxAngle - acxAngle;
    cdDist = Math.abs(Math.sin(abcAngle) * acDist);
    return cdDist <= minDist;
  }

  intersectLink(link) {
    var s, s1_x, s1_y, s2_x, s2_y, t, x1, x2, x3, x4, y1, y2, y3, y4;
    x1 = this.star1.x;
    y1 = this.star1.y;
    x2 = this.star2.x;
    y2 = this.star2.y;
    x3 = link.star1.x;
    y3 = link.star1.y;
    x4 = link.star2.x;
    y4 = link.star2.y;
    s1_x = x2 - x1;
    s1_y = y2 - y1;
    s2_x = x4 - x3;
    s2_y = y4 - y3;
    s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y);
    t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y);
    return s > 0 && s < 1 && t > 0 && t < 1;
  }

};



},{"spark-starter":99}],77:[function(require,module,exports){
var Element, Timing, Travel;

Element = require('spark-starter').Element;

Timing = require('parallelio-timing');

module.exports = Travel = (function() {
  class Travel extends Element {
    start(location) {
      if (this.valid) {
        this.moving = true;
        this.traveller.travel = this;
        return this.pathTimeout = this.timing.setTimeout(() => {
          this.traveller.location = this.targetLocation;
          this.traveller.travel = null;
          this.moving = false;
          return console.log('stop moving');
        }, this.duration);
      }
    }

  };

  Travel.properties({
    traveller: {
      default: null
    },
    startLocation: {
      default: null
    },
    targetLocation: {
      default: null
    },
    currentSection: {
      calcul: function() {
        return this.startLocation.links.findStar(this.targetLocation);
      }
    },
    duration: {
      default: 1000
    },
    moving: {
      default: false
    },
    valid: {
      calcul: function() {
        var ref, ref1;
        if (this.targetLocation === this.startLocation) {
          return false;
        }
        if ((((ref = this.targetLocation) != null ? ref.links : void 0) != null) && (((ref1 = this.startLocation) != null ? ref1.links : void 0) != null)) {
          return this.currentSection != null;
        }
      }
    },
    timing: {
      calcul: function() {
        return new Timing();
      }
    },
    spaceCoodinate: {
      calcul: function(invalidator) {
        var endX, endY, prc, startX, startY;
        startX = invalidator.propPath('startLocation.x');
        startY = invalidator.propPath('startLocation.y');
        endX = invalidator.propPath('targetLocation.x');
        endY = invalidator.propPath('targetLocation.y');
        prc = invalidator.propPath('pathTimeout.prc');
        return {
          x: (startX - endX) * prc + endX,
          y: (startY - endY) * prc + endY
        };
      }
    }
  });

  return Travel;

}).call(this);



},{"parallelio-timing":41,"spark-starter":99}],78:[function(require,module,exports){
var Element, Grid, View;

Element = require('spark-starter').Element;

Grid = require('parallelio-grids').Grid;

module.exports = View = (function() {
  class View extends Element {
    setDefaults() {
      var ref;
      if (!this.bounds) {
        this.grid = this.grid || ((ref = this.game.mainViewProperty.value) != null ? ref.grid : void 0) || new Grid();
        return this.bounds = this.grid.addCell();
      }
    }

    destroy() {
      return this.game = null;
    }

  };

  View.properties({
    game: {
      change: function(val, old) {
        if (this.game) {
          this.game.views.add(this);
          this.setDefaults();
        }
        if (old) {
          return old.views.remove(this);
        }
      }
    },
    x: {
      default: 0
    },
    y: {
      default: 0
    },
    grid: {
      default: null
    },
    bounds: {
      default: null
    }
  });

  return View;

}).call(this);



},{"parallelio-grids":30,"spark-starter":99}],79:[function(require,module,exports){
var Direction, LineOfSight, TileContainer, TileReference, VisionCalculator;

LineOfSight = require('./LineOfSight');

Direction = require('parallelio-tiles').Direction;

TileContainer = require('parallelio-tiles').TileContainer;

TileReference = require('parallelio-tiles').TileReference;

module.exports = VisionCalculator = class VisionCalculator {
  constructor(originTile, offset = {
      x: 0.5,
      y: 0.5
    }) {
    this.originTile = originTile;
    this.offset = offset;
    this.pts = {};
    this.visibility = {};
    this.stack = [];
    this.calculated = false;
  }

  calcul() {
    this.init();
    while (this.stack.length) {
      this.step();
    }
    return this.calculated = true;
  }

  init() {
    var firstBatch, initialPts;
    this.pts = {};
    this.visibility = {};
    initialPts = [
      {
        x: 0,
        y: 0
      },
      {
        x: 1,
        y: 0
      },
      {
        x: 0,
        y: 1
      },
      {
        x: 1,
        y: 1
      }
    ];
    initialPts.forEach((pt) => {
      return this.setPt(this.originTile.x + pt.x, this.originTile.y + pt.y, true);
    });
    firstBatch = [
      {
        x: -1,
        y: -1
      },
      {
        x: -1,
        y: 0
      },
      {
        x: -1,
        y: 1
      },
      {
        x: -1,
        y: 2
      },
      {
        x: 2,
        y: -1
      },
      {
        x: 2,
        y: 0
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 0,
        y: -1
      },
      {
        x: 1,
        y: -1
      },
      {
        x: 0,
        y: 2
      },
      {
        x: 1,
        y: 2
      }
    ];
    return this.stack = firstBatch.map((pt) => {
      return {
        x: this.originTile.x + pt.x,
        y: this.originTile.y + pt.y
      };
    });
  }

  setPt(x, y, val) {
    var adjancent;
    this.pts[x + ':' + y] = val;
    adjancent = [
      {
        x: 0,
        y: 0
      },
      {
        x: -1,
        y: 0
      },
      {
        x: 0,
        y: -1
      },
      {
        x: -1,
        y: -1
      }
    ];
    return adjancent.forEach((pt) => {
      return this.addVisibility(x + pt.x, y + pt.y, val ? 1 / adjancent.length : 0);
    });
  }

  getPt(x, y) {
    return this.pts[x + ':' + y];
  }

  addVisibility(x, y, val) {
    if (this.visibility[x] == null) {
      this.visibility[x] = {};
    }
    if (this.visibility[x][y] != null) {
      return this.visibility[x][y] += val;
    } else {
      return this.visibility[x][y] = val;
    }
  }

  getVisibility(x, y) {
    if ((this.visibility[x] == null) || (this.visibility[x][y] == null)) {
      return 0;
    } else {
      return this.visibility[x][y];
    }
  }

  canProcess(x, y) {
    return !this.stack.some((pt) => {
      return pt.x === x && pt.y === y;
    }) && (this.getPt(x, y) == null);
  }

  step() {
    var los, pt;
    pt = this.stack.shift();
    los = new LineOfSight(this.originTile.container, this.originTile.x + this.offset.x, this.originTile.y + this.offset.y, pt.x, pt.y);
    los.reverseTracing();
    los.traversableCallback = (tile, entryX, entryY) => {
      if (tile != null) {
        if (this.getVisibility(tile.x, tile.y) === 1) {
          return los.forceSuccess();
        } else {
          return tile.transparent;
        }
      }
    };
    this.setPt(pt.x, pt.y, los.getSuccess());
    if (los.getSuccess()) {
      return Direction.all.forEach((direction) => {
        var nextPt;
        nextPt = {
          x: pt.x + direction.x,
          y: pt.y + direction.y
        };
        if (this.canProcess(nextPt.x, nextPt.y)) {
          return this.stack.push(nextPt);
        }
      });
    }
  }

  getBounds() {
    var boundaries, col, ref, val, x, y;
    boundaries = {
      top: null,
      left: null,
      bottom: null,
      right: null
    };
    ref = this.visibility;
    for (x in ref) {
      col = ref[x];
      for (y in col) {
        val = col[y];
        if ((boundaries.top == null) || y < boundaries.top) {
          boundaries.top = y;
        }
        if ((boundaries.left == null) || x < boundaries.left) {
          boundaries.left = x;
        }
        if ((boundaries.bottom == null) || y > boundaries.bottom) {
          boundaries.bottom = y;
        }
        if ((boundaries.right == null) || x > boundaries.right) {
          boundaries.right = x;
        }
      }
    }
    return boundaries;
  }

  toContainer() {
    var col, ref, res, tile, val, x, y;
    res = new TileContainer();
    res.owner = false;
    ref = this.visibility;
    for (x in ref) {
      col = ref[x];
      for (y in col) {
        val = col[y];
        tile = this.originTile.container.getTile(x, y);
        if (val !== 0 && (tile != null)) {
          tile = new TileReference(tile);
          tile.visibility = val;
          res.addTile(tile);
        }
      }
    }
    return res;
  }

  toMap() {
    var i, j, ref, ref1, ref2, ref3, res, x, y;
    res = Object.assign({
      map: []
    }, this.getBounds());
    for (y = i = ref = res.top, ref1 = res.bottom - 1; (ref <= ref1 ? i <= ref1 : i >= ref1); y = ref <= ref1 ? ++i : --i) {
      res.map[y - res.top] = [];
      for (x = j = ref2 = res.left, ref3 = res.right - 1; (ref2 <= ref3 ? j <= ref3 : j >= ref3); x = ref2 <= ref3 ? ++j : --j) {
        res.map[y - res.top][x - res.left] = this.getVisibility(x, y);
      }
    }
    return res;
  }

};



},{"./LineOfSight":63,"parallelio-tiles":40}],80:[function(require,module,exports){
var Action, Element, EventEmitter;

Element = require('spark-starter').Element;

EventEmitter = require('events');

module.exports = Action = (function() {
  class Action extends Element {
    constructor(options) {
      super(options);
    }

    withActor(actor) {
      if (this.actor !== actor) {
        return this.copyWith({
          actor: actor
        });
      } else {
        return this;
      }
    }

    copyWith(options) {
      return new this.constructor(Object.assign({
        base: this.baseOrThis()
      }, this.propertiesManager.getManualDataProperties(), options));
    }

    baseOrThis() {
      return this.base || this;
    }

    start() {
      return this.execute();
    }

    validActor() {
      return this.actor != null;
    }

    isReady() {
      return this.validActor();
    }

    finish() {
      this.emit('finished');
      return this.end();
    }

    interrupt() {
      this.emit('interrupted');
      return this.end();
    }

    end() {
      this.emit('end');
      return this.destroy();
    }

    destroy() {
      return this.propertiesManager.destroy();
    }

  };

  Action.include(EventEmitter.prototype);

  Action.properties({
    actor: {},
    base: {}
  });

  return Action;

}).call(this);



},{"events":24,"spark-starter":99}],81:[function(require,module,exports){
var ActionProvider, Element;

Element = require('spark-starter').Element;

module.exports = ActionProvider = (function() {
  class ActionProvider extends Element {};

  ActionProvider.properties({
    providedActions: {
      collection: true
    }
  });

  return ActionProvider;

}).call(this);



},{"spark-starter":99}],82:[function(require,module,exports){
var AttackAction, EventBind, PropertyWatcher, TargetAction, WalkAction;

WalkAction = require('./WalkAction');

TargetAction = require('./TargetAction');

EventBind = require('spark-starter').EventBind;

PropertyWatcher = require('spark-starter').watchers.PropertyWatcher;

module.exports = AttackAction = (function() {
  class AttackAction extends TargetAction {
    validTarget() {
      return this.targetIsAttackable() && (this.canUseWeapon() || this.canWalkToTarget());
    }

    targetIsAttackable() {
      return this.target.damageable && this.target.health >= 0;
    }

    canMelee() {
      return Math.abs(this.target.tile.x - this.actor.tile.x) + Math.abs(this.target.tile.y - this.actor.tile.y) === 1;
    }

    canUseWeapon() {
      return this.bestUsableWeapon != null;
    }

    canUseWeaponAt(tile) {
      var ref;
      return ((ref = this.actor.weapons) != null ? ref.length : void 0) && this.actor.weapons.find((weapon) => {
        return weapon.canUseFrom(tile, this.target);
      });
    }

    canWalkToTarget() {
      return this.walkAction.isReady();
    }

    useWeapon() {
      this.bestUsableWeapon.useOn(this.target);
      return this.finish();
    }

    execute() {
      if (this.actor.walk != null) {
        this.actor.walk.interrupt();
      }
      if (this.bestUsableWeapon != null) {
        if (this.bestUsableWeapon.charged) {
          return this.useWeapon();
        } else {
          return this.weaponChargeWatcher.bind();
        }
      } else {
        this.walkAction.on('finished', () => {
          this.interruptBinder.unbind();
          this.walkAction.destroy();
          this.walkActionProperty.invalidate();
          if (this.isReady()) {
            return this.start();
          }
        });
        this.interruptBinder.bindTo(this.walkAction);
        return this.walkAction.execute();
      }
    }

  };

  AttackAction.properties({
    walkAction: {
      calcul: function() {
        var walkAction;
        walkAction = new WalkAction({
          actor: this.actor,
          target: this.target,
          parent: this.parent
        });
        walkAction.pathFinder.arrivedCallback = (step) => {
          return this.canUseWeaponAt(step.tile);
        };
        return walkAction;
      }
    },
    bestUsableWeapon: {
      calcul: function(invalidator) {
        var ref, usableWeapons;
        invalidator.propPath('actor.tile');
        if ((ref = this.actor.weapons) != null ? ref.length : void 0) {
          usableWeapons = this.actor.weapons.filter((weapon) => {
            return weapon.canUseOn(this.target);
          });
          usableWeapons.sort((a, b) => {
            return b.dps - a.dps;
          });
          return usableWeapons[0];
        } else {
          return null;
        }
      }
    },
    interruptBinder: {
      calcul: function() {
        return new EventBind('interrupted', null, () => {
          return this.interrupt();
        });
      },
      destroy: true
    },
    weaponChargeWatcher: {
      calcul: function() {
        return new PropertyWatcher({
          callback: () => {
            if (this.bestUsableWeapon.charged) {
              return this.useWeapon();
            }
          },
          property: this.bestUsableWeapon.propertiesManager.getProperty('charged')
        });
      },
      destroy: true
    }
  });

  return AttackAction;

}).call(this);



},{"./TargetAction":85,"./WalkAction":88,"spark-starter":99}],83:[function(require,module,exports){
var AttackAction, AttackMoveAction, EventBind, LineOfSight, PathFinder, PropertyWatcher, TargetAction, WalkAction;

WalkAction = require('./WalkAction');

AttackAction = require('./AttackAction');

TargetAction = require('./TargetAction');

PathFinder = require('parallelio-pathfinder');

LineOfSight = require('../LineOfSight');

PropertyWatcher = require('spark-starter').watchers.PropertyWatcher;

EventBind = require('spark-starter').EventBind;

module.exports = AttackMoveAction = (function() {
  class AttackMoveAction extends TargetAction {
    isEnemy(elem) {
      var ref;
      return (ref = this.actor.owner) != null ? typeof ref.isEnemy === "function" ? ref.isEnemy(elem) : void 0 : void 0;
    }

    validTarget() {
      return this.walkAction.validTarget();
    }

    testEnemySpotted() {
      this.enemySpottedProperty.invalidate();
      if (this.enemySpotted) {
        this.attackAction = new AttackAction({
          actor: this.actor,
          target: this.enemySpotted
        });
        this.attackAction.on('finished', () => {
          if (this.isReady()) {
            return this.start();
          }
        });
        this.interruptBinder.bindTo(this.attackAction);
        this.walkAction.interrupt();
        this.walkActionProperty.invalidate();
        return this.attackAction.execute();
      }
    }

    execute() {
      if (!this.testEnemySpotted()) {
        this.walkAction.on('finished', () => {
          return this.finished();
        });
        this.interruptBinder.bindTo(this.walkAction);
        this.tileWatcher.bind();
        return this.walkAction.execute();
      }
    }

  };

  AttackMoveAction.properties({
    walkAction: {
      calcul: function() {
        var walkAction;
        walkAction = new WalkAction({
          actor: this.actor,
          target: this.target,
          parent: this.parent
        });
        return walkAction;
      }
    },
    enemySpotted: {
      calcul: function() {
        var ref;
        this.path = new PathFinder(this.actor.tile.container, this.actor.tile, false, {
          validTile: (tile) => {
            return tile.transparent && (new LineOfSight(this.actor.tile.container, this.actor.tile.x, this.actor.tile.y, tile.x, tile.y)).getSuccess();
          },
          arrived: (step) => {
            return step.enemy = step.tile.children.find((c) => {
              return this.isEnemy(c);
            });
          },
          efficiency: (tile) => {}
        });
        this.path.calcul();
        return (ref = this.path.solution) != null ? ref.enemy : void 0;
      }
    },
    tileWatcher: {
      calcul: function() {
        return new PropertyWatcher({
          callback: () => {
            return this.testEnemySpotted();
          },
          property: this.actor.propertiesManager.getProperty('tile')
        });
      },
      destroy: true
    },
    interruptBinder: {
      calcul: function() {
        return new EventBind('interrupted', null, () => {
          return this.interrupt();
        });
      },
      destroy: true
    }
  });

  return AttackMoveAction;

}).call(this);



},{"../LineOfSight":63,"./AttackAction":82,"./TargetAction":85,"./WalkAction":88,"parallelio-pathfinder":31,"spark-starter":99}],84:[function(require,module,exports){
var ActionProvider, SimpleActionProvider;

ActionProvider = require('./ActionProvider');

module.exports = SimpleActionProvider = (function() {
  class SimpleActionProvider extends ActionProvider {};

  SimpleActionProvider.properties({
    providedActions: {
      calcul: function() {
        var actions;
        actions = this.actions || this.constructor.actions || [];
        if (typeof actions === "object") {
          actions = Object.keys(actions).map(function(key) {
            return actions[key];
          });
        }
        return actions.map((action) => {
          if (typeof action.withTarget === "function") {
            return action.withTarget(this);
          } else if (typeof action === "function") {
            return new action({
              target: this
            });
          } else {
            return action;
          }
        });
      }
    }
  });

  return SimpleActionProvider;

}).call(this);



},{"./ActionProvider":81}],85:[function(require,module,exports){
var Action, TargetAction;

Action = require('./Action');

module.exports = TargetAction = (function() {
  class TargetAction extends Action {
    withTarget(target) {
      if (this.target !== target) {
        return this.copyWith({
          target: target
        });
      } else {
        return this;
      }
    }

    canTarget(target) {
      var instance;
      instance = this.withTarget(target);
      if (instance.validTarget()) {
        return instance;
      }
    }

    validTarget() {
      return this.target != null;
    }

    isReady() {
      return super.isReady() && this.validTarget();
    }

  };

  TargetAction.properties({
    target: {}
  });

  return TargetAction;

}).call(this);



},{"./Action":80}],86:[function(require,module,exports){
var ActionProvider, Mixable, TiledActionProvider;

ActionProvider = require('./ActionProvider');

Mixable = require('spark-starter').Mixable;

module.exports = TiledActionProvider = (function() {
  class TiledActionProvider extends ActionProvider {
    validActionTile(tile) {
      return tile != null;
    }

    prepareActionTile(tile) {
      if (!tile.propertiesManager.getProperty('providedActions')) {
        return Mixable.Extension.make(ActionProvider.prototype, tile);
      }
    }

  };

  TiledActionProvider.properties({
    tile: {
      change: function(val, old, overrided) {
        overrided(old);
        return this.forwardedActions;
      }
    },
    actionTiles: {
      collection: true,
      calcul: function(invalidator) {
        var myTile;
        myTile = invalidator.prop(this.tileProperty);
        if (myTile) {
          return this.actionTilesCoord.map((coord) => {
            return myTile.getRelativeTile(coord.x, coord.y);
          }).filter((tile) => {
            return this.validActionTile(tile);
          });
        } else {
          return [];
        }
      }
    },
    forwardedActions: {
      collection: {
        compare: function(a, b) {
          return a.action === b.action && a.location === b.location;
        }
      },
      calcul: function(invalidator) {
        var actionTiles, actions;
        actionTiles = invalidator.prop(this.actionTilesProperty);
        actions = invalidator.prop(this.providedActionsProperty);
        return actionTiles.reduce((res, tile) => {
          return res.concat(actions.map(function(act) {
            return {
              action: act,
              location: tile
            };
          }));
        }, []);
      },
      itemAdded: function(forwarded) {
        this.prepareActionTile(forwarded.location);
        return forwarded.location.providedActions.add(forwarded.action);
      },
      itemRemoved: function(forwarded) {
        return forwarded.location.providedActions.remove(forwarded.action);
      }
    }
  });

  TiledActionProvider.prototype.actionTilesCoord = [
    {
      x: 0,
      y: -1
    },
    {
      x: -1,
      y: 0
    },
    {
      x: 0,
      y: 0
    },
    {
      x: +1,
      y: 0
    },
    {
      x: 0,
      y: +1
    }
  ];

  return TiledActionProvider;

}).call(this);



},{"./ActionProvider":81,"spark-starter":99}],87:[function(require,module,exports){
var TargetAction, Travel, TravelAction;

TargetAction = require('./TargetAction');

Travel = require('../Travel');

module.exports = TravelAction = (function() {
  class TravelAction extends TargetAction {
    validTarget() {
      return this.travel.valid;
    }

    execute() {
      return this.travel.start();
    }

  };

  TravelAction.properties({
    travel: {
      calcul: function() {
        return new Travel({
          traveller: this.actor,
          startLocation: this.actor.location,
          targetLocation: this.target
        });
      }
    }
  });

  return TravelAction;

}).call(this);



},{"../Travel":77,"./TargetAction":85}],88:[function(require,module,exports){
var PathFinder, PathWalk, TargetAction, WalkAction;

PathFinder = require('parallelio-pathfinder');

PathWalk = require('../PathWalk');

TargetAction = require('./TargetAction');

module.exports = WalkAction = (function() {
  class WalkAction extends TargetAction {
    execute() {
      if (this.actor.walk != null) {
        this.actor.walk.interrupt();
      }
      this.walk = this.actor.walk = new PathWalk(this.actor, this.pathFinder);
      this.actor.walk.on('finished', () => {
        return this.finish();
      });
      this.actor.walk.on('interrupted', () => {
        return this.interrupt();
      });
      return this.actor.walk.start();
    }

    destroy() {
      super.destroy();
      if (this.walk) {
        return this.walk.destroy();
      }
    }

    validTarget() {
      this.pathFinder.calcul();
      return this.pathFinder.solution != null;
    }

  };

  WalkAction.properties({
    pathFinder: {
      calcul: function() {
        return new PathFinder(this.actor.tile.container, this.actor.tile, this.target, {
          validTile: (tile) => {
            if (typeof this.actor.canGoOnTile === "function") {
              return this.actor.canGoOnTile(tile);
            } else {
              return tile.walkable;
            }
          }
        });
      }
    }
  });

  return WalkAction;

}).call(this);



},{"../PathWalk":66,"./TargetAction":85,"parallelio-pathfinder":31}],89:[function(require,module,exports){
module.exports = {
  "Airlock": require("./Airlock"),
  "Approach": require("./Approach"),
  "AutomaticDoor": require("./AutomaticDoor"),
  "Character": require("./Character"),
  "CharacterAI": require("./CharacterAI"),
  "Confrontation": require("./Confrontation"),
  "DamagePropagation": require("./DamagePropagation"),
  "Damageable": require("./Damageable"),
  "Door": require("./Door"),
  "Element": require("./Element"),
  "EnconterManager": require("./EnconterManager"),
  "Floor": require("./Floor"),
  "Game": require("./Game"),
  "Inventory": require("./Inventory"),
  "LineOfSight": require("./LineOfSight"),
  "Map": require("./Map"),
  "Obstacle": require("./Obstacle"),
  "PathWalk": require("./PathWalk"),
  "PersonalWeapon": require("./PersonalWeapon"),
  "Player": require("./Player"),
  "Projectile": require("./Projectile"),
  "Ressource": require("./Ressource"),
  "RessourceType": require("./RessourceType"),
  "RoomGenerator": require("./RoomGenerator"),
  "Ship": require("./Ship"),
  "ShipWeapon": require("./ShipWeapon"),
  "StarMapGenerator": require("./StarMapGenerator"),
  "StarSystem": require("./StarSystem"),
  "Travel": require("./Travel"),
  "View": require("./View"),
  "VisionCalculator": require("./VisionCalculator"),
  "actions": {
    "Action": require("./actions/Action"),
    "ActionProvider": require("./actions/ActionProvider"),
    "AttackAction": require("./actions/AttackAction"),
    "AttackMoveAction": require("./actions/AttackMoveAction"),
    "SimpleActionProvider": require("./actions/SimpleActionProvider"),
    "TargetAction": require("./actions/TargetAction"),
    "TiledActionProvider": require("./actions/TiledActionProvider"),
    "TravelAction": require("./actions/TravelAction"),
    "WalkAction": require("./actions/WalkAction"),
  },
}
},{"./Airlock":49,"./Approach":50,"./AutomaticDoor":51,"./Character":52,"./CharacterAI":53,"./Confrontation":54,"./DamagePropagation":55,"./Damageable":56,"./Door":57,"./Element":58,"./EnconterManager":59,"./Floor":60,"./Game":61,"./Inventory":62,"./LineOfSight":63,"./Map":64,"./Obstacle":65,"./PathWalk":66,"./PersonalWeapon":67,"./Player":68,"./Projectile":69,"./Ressource":70,"./RessourceType":71,"./RoomGenerator":72,"./Ship":73,"./ShipWeapon":74,"./StarMapGenerator":75,"./StarSystem":76,"./Travel":77,"./View":78,"./VisionCalculator":79,"./actions/Action":80,"./actions/ActionProvider":81,"./actions/AttackAction":82,"./actions/AttackMoveAction":83,"./actions/SimpleActionProvider":84,"./actions/TargetAction":85,"./actions/TiledActionProvider":86,"./actions/TravelAction":87,"./actions/WalkAction":88}],90:[function(require,module,exports){
var libs;

libs = require('./libs');

module.exports = Object.assign({}, libs, {
  grids: require('parallelio-grids'),
  PathFinder: require('parallelio-pathfinder'),
  strings: require('parallelio-strings'),
  tiles: require('parallelio-tiles'),
  Timing: require('parallelio-timing'),
  wiring: require('parallelio-wiring'),
  Spark: require('spark-starter')
});



},{"./libs":89,"parallelio-grids":30,"parallelio-pathfinder":31,"parallelio-strings":32,"parallelio-tiles":40,"parallelio-timing":41,"parallelio-wiring":48,"spark-starter":99}],91:[function(require,module,exports){
var Element, Mixable, PropertiesManager;

PropertiesManager = require('spark-properties').PropertiesManager;

Mixable = require('./Mixable');

module.exports = Element = (function() {
  class Element extends Mixable {
    constructor(data) {
      super();
      this.initPropertiesManager(data);
      this.init();
      this.propertiesManager.initWatchers();
    }

    initPropertiesManager(data) {
      this.propertiesManager = this.propertiesManager.useScope(this);
      this.propertiesManager.initProperties();
      this.propertiesManager.createScopeGetterSetters();
      if (typeof data === "object") {
        this.propertiesManager.setPropertiesData(data);
      }
      return this;
    }

    init() {
      return this;
    }

    tap(name) {
      var args;
      args = Array.prototype.slice.call(arguments);
      if (typeof name === 'function') {
        name.apply(this, args.slice(1));
      } else {
        this[name].apply(this, args.slice(1));
      }
      return this;
    }

    callback(name) {
      if (this._callbacks == null) {
        this._callbacks = {};
      }
      if (this._callbacks[name] == null) {
        this._callbacks[name] = (...args) => {
          this[name].apply(this, args);
          return null;
        };
        this._callbacks[name].owner = this;
      }
      return this._callbacks[name];
    }

    destroy() {
      return this.propertiesManager.destroy();
    }

    getFinalProperties() {
      return ['propertiesManager'];
    }

    extended(target) {
      if (target.propertiesManager) {
        return target.propertiesManager = target.propertiesManager.copyWith(this.propertiesManager.propertiesOptions);
      } else {
        return target.propertiesManager = this.propertiesManager;
      }
    }

    static property(prop, desc) {
      return this.prototype.propertiesManager = this.prototype.propertiesManager.withProperty(prop, desc);
    }

    static properties(properties) {
      return this.prototype.propertiesManager = this.prototype.propertiesManager.copyWith(properties);
    }

  };

  Element.prototype.propertiesManager = new PropertiesManager();

  return Element;

}).call(this);



},{"./Mixable":95,"spark-properties":106}],92:[function(require,module,exports){
var ActivablePropertyWatcher, Invalidator, PropertyWatcher;

PropertyWatcher = require('spark-properties').watchers.PropertyWatcher;

Invalidator = require('spark-properties').Invalidator;

module.exports = ActivablePropertyWatcher = class ActivablePropertyWatcher extends PropertyWatcher {
  loadOptions(options) {
    super.loadOptions(options);
    return this.active = options.active;
  }

  shouldBind() {
    var active;
    if (this.active != null) {
      if (this.invalidator == null) {
        this.invalidator = new Invalidator(this, this.scope);
        this.invalidator.callback = () => {
          return this.checkBind();
        };
      }
      this.invalidator.recycle();
      active = this.active(this.invalidator);
      this.invalidator.endRecycle();
      this.invalidator.bind();
      return active;
    } else {
      return true;
    }
  }

};



},{"spark-properties":106}],93:[function(require,module,exports){
var Invalidated, Invalidator;

Invalidator = require('spark-properties').Invalidator;

module.exports = Invalidated = class Invalidated {
  constructor(options) {
    if (options != null) {
      this.loadOptions(options);
    }
    if (!((options != null ? options.initByLoader : void 0) && (options.loader != null))) {
      this.init();
    }
  }

  loadOptions(options) {
    this.scope = options.scope;
    if (options.loaderAsScope && (options.loader != null)) {
      this.scope = options.loader;
    }
    return this.callback = options.callback;
  }

  init() {
    return this.update();
  }

  unknown() {
    return this.invalidator.validateUnknowns();
  }

  invalidate() {
    return this.update();
  }

  update() {
    if (this.invalidator == null) {
      this.invalidator = new Invalidator(this, this.scope);
    }
    this.invalidator.recycle();
    this.handleUpdate(this.invalidator);
    this.invalidator.endRecycle();
    this.invalidator.bind();
    return this;
  }

  handleUpdate(invalidator) {
    if (this.scope != null) {
      return this.callback.call(this.scope, invalidator);
    } else {
      return this.callback(invalidator);
    }
  }

  destroy() {
    if (this.invalidator) {
      return this.invalidator.unbind();
    }
  }

};



},{"spark-properties":106}],94:[function(require,module,exports){
var Loader, Overrider;

Overrider = require('./Overrider');

module.exports = Loader = (function() {
  class Loader extends Overrider {
    constructor() {
      super();
      this.initPreloaded();
    }

    initPreloaded() {
      var defList;
      defList = this.preloaded;
      this.preloaded = [];
      return this.load(defList);
    }

    load(defList) {
      var loaded, toLoad;
      toLoad = [];
      loaded = defList.map((def) => {
        var instance;
        if (def.instance == null) {
          def = Object.assign({
            loader: this
          }, def);
          instance = Loader.load(def);
          def = Object.assign({
            instance: instance
          }, def);
          if (def.initByLoader && (instance.init != null)) {
            toLoad.push(instance);
          }
        }
        return def;
      });
      this.preloaded = this.preloaded.concat(loaded);
      return toLoad.forEach(function(instance) {
        return instance.init();
      });
    }

    preload(def) {
      if (!Array.isArray(def)) {
        def = [def];
      }
      return this.preloaded = (this.preloaded || []).concat(def);
    }

    destroyLoaded() {
      return this.preloaded.forEach(function(def) {
        var ref;
        return (ref = def.instance) != null ? typeof ref.destroy === "function" ? ref.destroy() : void 0 : void 0;
      });
    }

    getFinalProperties() {
      return super.getFinalProperties().concat(['preloaded']);
    }

    extended(target) {
      super.extended(target);
      if (this.preloaded) {
        return target.preloaded = (target.preloaded || []).concat(this.preloaded);
      }
    }

    static loadMany(def) {
      return def.map((d) => {
        return this.load(d);
      });
    }

    static load(def) {
      if (typeof def.type.copyWith === "function") {
        return def.type.copyWith(def);
      } else {
        return new def.type(def);
      }
    }

    static preload(def) {
      return this.prototype.preload(def);
    }

  };

  Loader.prototype.preloaded = [];

  Loader.overrides({
    init: function() {
      this.init.withoutLoader();
      return this.initPreloaded();
    },
    destroy: function() {
      this.destroy.withoutLoader();
      return this.destroyLoaded();
    }
  });

  return Loader;

}).call(this);



},{"./Overrider":96}],95:[function(require,module,exports){
var Mixable,
  indexOf = [].indexOf;

module.exports = Mixable = (function() {
  class Mixable {
    static extend(obj) {
      this.Extension.make(obj, this);
      if (obj.prototype != null) {
        return this.Extension.make(obj.prototype, this.prototype);
      }
    }

    static include(obj) {
      return this.Extension.make(obj, this.prototype);
    }

  };

  Mixable.Extension = {
    makeOnce: function(source, target) {
      var ref;
      if (!((ref = target.extensions) != null ? ref.includes(source) : void 0)) {
        return this.make(source, target);
      }
    },
    make: function(source, target) {
      var i, len, originalFinalProperties, prop, ref;
      ref = this.getExtensionProperties(source, target);
      for (i = 0, len = ref.length; i < len; i++) {
        prop = ref[i];
        Object.defineProperty(target, prop.name, prop);
      }
      if (source.getFinalProperties && target.getFinalProperties) {
        originalFinalProperties = target.getFinalProperties;
        target.getFinalProperties = function() {
          return source.getFinalProperties().concat(originalFinalProperties.call(this));
        };
      } else {
        target.getFinalProperties = source.getFinalProperties || target.getFinalProperties;
      }
      target.extensions = (target.extensions || []).concat([source]);
      if (typeof source.extended === 'function') {
        return source.extended(target);
      }
    },
    alwaysFinal: ['extended', 'extensions', '__super__', 'constructor', 'getFinalProperties'],
    getExtensionProperties: function(source, target) {
      var alwaysFinal, props, targetChain;
      alwaysFinal = this.alwaysFinal;
      targetChain = this.getPrototypeChain(target);
      props = [];
      this.getPrototypeChain(source).every(function(obj) {
        var exclude;
        if (!targetChain.includes(obj)) {
          exclude = alwaysFinal;
          if (source.getFinalProperties != null) {
            exclude = exclude.concat(source.getFinalProperties());
          }
          if (typeof obj === 'function') {
            exclude = exclude.concat(["length", "prototype", "name"]);
          }
          props = props.concat(Object.getOwnPropertyNames(obj).filter((key) => {
            return !target.hasOwnProperty(key) && key.substr(0, 2) !== "__" && indexOf.call(exclude, key) < 0 && !props.find(function(prop) {
              return prop.name === key;
            });
          }).map(function(key) {
            var prop;
            prop = Object.getOwnPropertyDescriptor(obj, key);
            prop.name = key;
            return prop;
          }));
          return true;
        }
      });
      return props;
    },
    getPrototypeChain: function(obj) {
      var basePrototype, chain;
      chain = [];
      basePrototype = Object.getPrototypeOf(Object);
      while (true) {
        chain.push(obj);
        if (!((obj = Object.getPrototypeOf(obj)) && obj !== Object && obj !== basePrototype)) {
          break;
        }
      }
      return chain;
    }
  };

  return Mixable;

}).call(this);



},{}],96:[function(require,module,exports){
// todo : 
//  simplified form : @withoutName method
var Overrider;

module.exports = Overrider = (function() {
  class Overrider {
    static overrides(overrides) {
      return this.Override.applyMany(this.prototype, this.name, overrides);
    }

    getFinalProperties() {
      if (this._overrides != null) {
        return ['_overrides'].concat(Object.keys(this._overrides));
      } else {
        return [];
      }
    }

    extended(target) {
      if (this._overrides != null) {
        this.constructor.Override.applyMany(target, this.constructor.name, this._overrides);
      }
      if (this.constructor === Overrider) {
        return target.extended = this.extended;
      }
    }

  };

  Overrider.Override = {
    makeMany: function(target, namespace, overrides) {
      var fn, key, override, results;
      results = [];
      for (key in overrides) {
        fn = overrides[key];
        results.push(override = this.make(target, namespace, key, fn));
      }
      return results;
    },
    applyMany: function(target, namespace, overrides) {
      var key, override, results;
      results = [];
      for (key in overrides) {
        override = overrides[key];
        if (typeof override === "function") {
          override = this.make(target, namespace, key, override);
        }
        results.push(this.apply(target, namespace, override));
      }
      return results;
    },
    make: function(target, namespace, fnName, fn) {
      var override;
      override = {
        fn: {
          current: fn
        },
        name: fnName
      };
      override.fn['with' + namespace] = fn;
      return override;
    },
    emptyFn: function() {},
    apply: function(target, namespace, override) {
      var fnName, overrides, ref, ref1, without;
      fnName = override.name;
      overrides = target._overrides != null ? Object.assign({}, target._overrides) : {};
      without = ((ref = target._overrides) != null ? (ref1 = ref[fnName]) != null ? ref1.fn.current : void 0 : void 0) || target[fnName];
      override = Object.assign({}, override);
      if (overrides[fnName] != null) {
        override.fn = Object.assign({}, overrides[fnName].fn, override.fn);
      } else {
        override.fn = Object.assign({}, override.fn);
      }
      override.fn['without' + namespace] = without || this.emptyFn;
      if (without == null) {
        override.missingWithout = 'without' + namespace;
      } else if (override.missingWithout) {
        override.fn[override.missingWithout] = without;
      }
      Object.defineProperty(target, fnName, {
        configurable: true,
        get: function() {
          var finalFn, fn, key, ref2;
          finalFn = override.fn.current.bind(this);
          ref2 = override.fn;
          for (key in ref2) {
            fn = ref2[key];
            finalFn[key] = fn.bind(this);
          }
          if (this.constructor.prototype !== this) {
            Object.defineProperty(this, fnName, {
              value: finalFn
            });
          }
          return finalFn;
        }
      });
      overrides[fnName] = override;
      return target._overrides = overrides;
    }
  };

  return Overrider;

}).call(this);



},{}],97:[function(require,module,exports){
var Binder, Updater;

Binder = require('spark-binding').Binder;

module.exports = Updater = class Updater {
  constructor(options) {
    var ref;
    this.callbacks = [];
    this.next = [];
    this.updating = false;
    if ((options != null ? options.callback : void 0) != null) {
      this.addCallback(options.callback);
    }
    if ((options != null ? (ref = options.callbacks) != null ? ref.forEach : void 0 : void 0) != null) {
      options.callbacks.forEach((callback) => {
        return this.addCallback(callback);
      });
    }
  }

  update() {
    var callback;
    this.updating = true;
    this.next = this.callbacks.slice();
    while (this.callbacks.length > 0) {
      callback = this.callbacks.shift();
      this.runCallback(callback);
    }
    this.callbacks = this.next;
    this.updating = false;
    return this;
  }

  runCallback(callback) {
    return callback();
  }

  addCallback(callback) {
    if (!this.callbacks.includes(callback)) {
      this.callbacks.push(callback);
    }
    if (this.updating && !this.next.includes(callback)) {
      return this.next.push(callback);
    }
  }

  nextTick(callback) {
    if (this.updating) {
      if (!this.next.includes(callback)) {
        return this.next.push(callback);
      }
    } else {
      return this.addCallback(callback);
    }
  }

  removeCallback(callback) {
    var index;
    index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
    index = this.next.indexOf(callback);
    if (index !== -1) {
      return this.next.splice(index, 1);
    }
  }

  getBinder() {
    return new Updater.Binder(this);
  }

  destroy() {
    this.callbacks = [];
    return this.next = [];
  }

};

Updater.Binder = (function(superClass) {
  class Binder extends superClass {
    constructor(target, callback1) {
      super();
      this.target = target;
      this.callback = callback1;
    }

    getRef() {
      return {
        target: this.target,
        callback: this.callback
      };
    }

    doBind() {
      return this.target.addCallback(this.callback);
    }

    doUnbind() {
      return this.target.removeCallback(this.callback);
    }

  };

  return Binder;

}).call(this, Binder);



},{"spark-binding":100}],98:[function(require,module,exports){
module.exports = {
  "Element": require("./Element"),
  "Loader": require("./Loader"),
  "Mixable": require("./Mixable"),
  "Overrider": require("./Overrider"),
  "Updater": require("./Updater"),
  "Invalidated": {
    "ActivablePropertyWatcher": require("./Invalidated/ActivablePropertyWatcher"),
    "Invalidated": require("./Invalidated/Invalidated"),
  },
}
},{"./Element":91,"./Invalidated/ActivablePropertyWatcher":92,"./Invalidated/Invalidated":93,"./Loader":94,"./Mixable":95,"./Overrider":96,"./Updater":97}],99:[function(require,module,exports){
var libs;

libs = require('./libs');

module.exports = Object.assign({
  'Collection': require('spark-collection')
}, libs, require('spark-properties'), require('spark-binding'));



},{"./libs":98,"spark-binding":100,"spark-collection":104,"spark-properties":106}],100:[function(require,module,exports){
module.exports = {
  Binder: require('./src/Binder'),
  EventBind: require('./src/EventBind'),
  Reference: require('./src/Reference')
}

},{"./src/Binder":101,"./src/EventBind":102,"./src/Reference":103}],101:[function(require,module,exports){
class Binder {
  toggleBind (val = !this.binded) {
    if (val) {
      return this.bind()
    } else {
      return this.unbind()
    }
  }

  bind () {
    if (!this.binded && this.canBind()) {
      this.doBind()
    }
    this.binded = true
    return this
  }

  canBind () {
    return true
  }

  doBind () {
    throw new Error('Not implemented')
  }

  unbind () {
    if (this.binded && this.canBind()) {
      this.doUnbind()
    }
    this.binded = false
    return this
  }

  doUnbind () {
    throw new Error('Not implemented')
  }

  destroy () {
    this.unbind()
  }
};

module.exports = Binder

},{}],102:[function(require,module,exports){

const Binder = require('./Binder')
const Reference = require('./Reference')

class EventBind extends Binder {
  constructor (event1, target1, callback) {
    super()
    this.event = event1
    this.target = target1
    this.callback = callback
  }

  canBind () {
    return (this.callback != null) && (this.target != null)
  }

  bindTo (target) {
    this.unbind()
    this.target = target
    return this.bind()
  }

  doBind () {
    if (typeof this.target.addEventListener === 'function') {
      return this.target.addEventListener(this.event, this.callback)
    } else if (typeof this.target.addListener === 'function') {
      return this.target.addListener(this.event, this.callback)
    } else if (typeof this.target.on === 'function') {
      return this.target.on(this.event, this.callback)
    } else {
      throw new Error('No function to add event listeners was found')
    }
  }

  doUnbind () {
    if (typeof this.target.removeEventListener === 'function') {
      return this.target.removeEventListener(this.event, this.callback)
    } else if (typeof this.target.removeListener === 'function') {
      return this.target.removeListener(this.event, this.callback)
    } else if (typeof this.target.off === 'function') {
      return this.target.off(this.event, this.callback)
    } else {
      throw new Error('No function to remove event listeners was found')
    }
  }

  equals (eventBind) {
    return eventBind != null &&
      eventBind.constructor === this.constructor &&
      eventBind.event === this.event &&
      Reference.compareVal(eventBind.target, this.target) &&
      Reference.compareVal(eventBind.callback, this.callback)
  }

  static checkEmitter (emitter, fatal = true) {
    if (typeof emitter.addEventListener === 'function' || typeof emitter.addListener === 'function' || typeof emitter.on === 'function') {
      return true
    } else if (fatal) {
      throw new Error('No function to add event listeners was found')
    } else {
      return false
    }
  }
}
module.exports = EventBind

},{"./Binder":101,"./Reference":103}],103:[function(require,module,exports){
class Reference {
  constructor (data) {
    this.data = data
  }

  equals (ref) {
    return ref != null && ref.constructor === this.constructor && this.compareData(ref.data)
  }

  compareData (data) {
    if (data instanceof Reference) {
      return this.equals(data)
    }
    if (this.data === data) {
      return true
    }
    if (this.data == null || data == null) {
      return false
    }
    if (typeof this.data === 'object' && typeof data === 'object') {
      return Object.keys(this.data).length === Object.keys(data).length && Object.keys(data).every((key) => {
        return Reference.compareVal(this.data[key], data[key])
      })
    }
    return Reference.compareVal(this.data, data)
  }

  /**
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  static compareVal (val1, val2) {
    if (val1 === val2) {
      return true
    }
    if (val1 == null || val2 == null) {
      return false
    }
    if (typeof val1.equals === 'function') {
      return val1.equals(val2)
    }
    if (typeof val2.equals === 'function') {
      return val2.equals(val1)
    }
    if (Array.isArray(val1) && Array.isArray(val2)) {
      return val1.length === val2.length && val1.every((val, i) => {
        return this.compareVal(val, val2[i])
      })
    }
    // if (typeof val1 === 'object' && typeof val2 === 'object') {
    //   return Object.keys(val1).length === Object.keys(val2).length && Object.keys(val1).every((key) => {
    //     return this.compareVal(val1[key], val2[key])
    //   })
    // }
    return false
  }

  static makeReferred (obj, data) {
    if (data instanceof Reference) {
      obj.ref = data
    } else {
      obj.ref = new Reference(data)
    }
    obj.equals = function (obj2) {
      return obj2 != null && this.ref.equals(obj2.ref)
    }
    return obj
  }
};

module.exports = Reference

},{}],104:[function(require,module,exports){
module.exports = require('./src/Collection')

},{"./src/Collection":105}],105:[function(require,module,exports){
/**
 * @template T
 */
class Collection {
  /**
   * @param {Collection.<T>|Array.<T>|T} [arr]
   */
  constructor (arr) {
    if (arr != null) {
      if (typeof arr.toArray === 'function') {
        this._array = arr.toArray()
      } else if (Array.isArray(arr)) {
        this._array = arr
      } else {
        this._array = [arr]
      }
    } else {
      this._array = []
    }
  }

  changed () {}

  /**
   * @param {Collection.<T>|Array.<T>} old
   * @param {boolean} ordered
   * @param {function(T,T): boolean} compareFunction
   * @return {boolean}
   */
  checkChanges (old, ordered = true, compareFunction = null) {
    if (compareFunction == null) {
      compareFunction = function (a, b) {
        return a === b
      }
    }
    if (old != null) {
      old = this.copy(old.slice())
    } else {
      old = []
    }
    return this.count() !== old.length || (ordered ? this.some(function (val, i) {
      return !compareFunction(old.get(i), val)
    }) : this.some(function (a) {
      return !old.pluck(function (b) {
        return compareFunction(a, b)
      })
    }))
  }

  /**
   * @param {number} i
   * @return {T}
   */
  get (i) {
    return this._array[i]
  }

  /**
   * @return {T}
   */
  getRandom () {
    return this._array[Math.floor(Math.random() * this._array.length)]
  }

  /**
   * @param {number} i
   * @param {T} val
   * @return {T}
   */
  set (i, val) {
    var old
    if (this._array[i] !== val) {
      old = this.toArray()
      this._array[i] = val
      this.changed(old)
    }
    return val
  }

  /**
   * @param {T} val
   */
  add (val) {
    if (!this._array.includes(val)) {
      return this.push(val)
    }
    return this
  }

  /**
   * @param {T} val
   */
  remove (val) {
    var index, old
    index = this._array.indexOf(val)
    if (index !== -1) {
      old = this.toArray()
      this._array.splice(index, 1)
      this.changed(old)
    }
    return this
  }

  /**
   * @param {function(T): boolean} fn
   * @return {T}
   */
  pluck (fn) {
    var found, index, old
    index = this._array.findIndex(fn)
    if (index > -1) {
      old = this.toArray()
      found = this._array[index]
      this._array.splice(index, 1)
      this.changed(old)
      return found
    } else {
      return null
    }
  }

  /**
   * @return {Array.<T>}
   */
  toArray () {
    return this._array.slice()
  }

  /**
   * @return {number}
   */
  count () {
    return this._array.length
  }

  /**
   * @template ItemType
   * @param {Object} toAppend
   * @param {Collection.<ItemType>|Array.<ItemType>|ItemType} [arr]
   * @return {Collection.<ItemType>}
   */
  static newSubClass (toAppend, arr) {
    var SubClass
    if (typeof toAppend === 'object') {
      SubClass = class extends this {}
      Object.assign(SubClass.prototype, toAppend)
      return new SubClass(arr)
    } else {
      return new this(arr)
    }
  }

  /**
   * @param {Collection.<T>|Array.<T>|T} [arr]
   * @return {Collection.<T>}
   */
  copy (arr) {
    var coll
    if (arr == null) {
      arr = this.toArray()
    }
    coll = new this.constructor(arr)
    return coll
  }

  /**
   * @param {*} arr
   * @return {boolean}
   */
  equals (arr) {
    return (this.count() === (typeof arr.count === 'function' ? arr.count() : arr.length)) && this.every(function (val, i) {
      return arr[i] === val
    })
  }

  /**
   * @param {Collection.<T>|Array.<T>} arr
   * @return {Array.<T>}
   */
  getAddedFrom (arr) {
    return this._array.filter(function (item) {
      return !arr.includes(item)
    })
  }

  /**
   * @param {Collection.<T>|Array.<T>} arr
   * @return {Array.<T>}
   */
  getRemovedFrom (arr) {
    return arr.filter((item) => {
      return !this.includes(item)
    })
  }
};

Collection.readFunctions = ['every', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some', 'toString']

Collection.readListFunctions = ['concat', 'filter', 'slice']

Collection.writefunctions = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift']

Collection.readFunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    return this._array[funct](...arg)
  }
})

Collection.readListFunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    return this.copy(this._array[funct](...arg))
  }
})

Collection.writefunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    var old, res
    old = this.toArray()
    res = this._array[funct](...arg)
    this.changed(old)
    return res
  }
})

Object.defineProperty(Collection.prototype, 'length', {
  get: function () {
    return this.count()
  }
})

if (typeof Symbol !== 'undefined' && Symbol !== null ? Symbol.iterator : 0) {
  Collection.prototype[Symbol.iterator] = function () {
    return this._array[Symbol.iterator]()
  }
}

module.exports = Collection

},{}],106:[function(require,module,exports){
module.exports = {
  Invalidator: require('./src/Invalidator'),
  PropertiesManager: require('./src/PropertiesManager'),
  Property: require('./src/Property'),
  setters: {
    BaseSetter: require('./src/setters/BaseSetter'),
    BaseValueSetter: require('./src/setters/BaseValueSetter'),
    CollectionSetter: require('./src/setters/CollectionSetter'),
    ManualSetter: require('./src/setters/ManualSetter'),
    SimpleSetter: require('./src/setters/SimpleSetter')
  },
  watchers: {
    CollectionPropertyWatcher: require('./src/watchers/CollectionPropertyWatcher'),
    PropertyWatcher: require('./src/watchers/PropertyWatcher')
  },
  getters: {
    BaseGetter: require('./src/getters/BaseGetter'),
    CalculatedGetter: require('./src/getters/CalculatedGetter'),
    CompositeGetter: require('./src/getters/CompositeGetter'),
    InvalidatedGetter: require('./src/getters/InvalidatedGetter'),
    ManualGetter: require('./src/getters/ManualGetter'),
    SimpleGetter: require('./src/getters/SimpleGetter')
  }
}

},{"./src/Invalidator":107,"./src/PropertiesManager":108,"./src/Property":109,"./src/getters/BaseGetter":110,"./src/getters/CalculatedGetter":111,"./src/getters/CompositeGetter":112,"./src/getters/InvalidatedGetter":113,"./src/getters/ManualGetter":114,"./src/getters/SimpleGetter":115,"./src/setters/BaseSetter":116,"./src/setters/BaseValueSetter":117,"./src/setters/CollectionSetter":118,"./src/setters/ManualSetter":119,"./src/setters/SimpleSetter":120,"./src/watchers/CollectionPropertyWatcher":121,"./src/watchers/PropertyWatcher":122}],107:[function(require,module,exports){
const Binder = require('spark-binding').Binder
const EventBind = require('spark-binding').EventBind

const pluck = function (arr, fn) {
  var found, index
  index = arr.findIndex(fn)
  if (index > -1) {
    found = arr[index]
    arr.splice(index, 1)
    return found
  } else {
    return null
  }
}

class Invalidator extends Binder {
  constructor (invalidated, scope = null) {
    super()
    this.invalidated = invalidated
    this.scope = scope
    this.invalidationEvents = []
    this.recycled = []
    this.unknowns = []
    this.strict = this.constructor.strict
    this.invalid = false
    this.invalidateCallback = () => {
      this.invalidate()
    }
    this.invalidateCallback.owner = this
  }

  invalidate () {
    var functName
    this.invalid = true
    if (typeof this.invalidated === 'function') {
      this.invalidated()
    } else if (typeof this.callback === 'function') {
      this.callback()
    } else if ((this.invalidated != null) && typeof this.invalidated.invalidate === 'function') {
      this.invalidated.invalidate()
    } else if (typeof this.invalidated === 'string') {
      functName = 'invalidate' + this.invalidated.charAt(0).toUpperCase() + this.invalidated.slice(1)
      if (typeof this.scope[functName] === 'function') {
        this.scope[functName]()
      } else {
        this.scope[this.invalidated] = null
      }
    }
    return this
  }

  unknown () {
    if (this.invalidated != null && typeof this.invalidated.unknown === 'function') {
      return this.invalidated.unknown()
    } else {
      return this.invalidate()
    }
  }

  addEventBind (event, target, callback) {
    return this.addBinder(new EventBind(event, target, callback))
  }

  addBinder (binder) {
    if (binder.callback == null) {
      binder.callback = this.invalidateCallback
    }
    if (!this.invalidationEvents.some(function (eventBind) {
      return eventBind.equals(binder)
    })) {
      return this.invalidationEvents.push(pluck(this.recycled, function (eventBind) {
        return eventBind.equals(binder)
      }) || binder)
    }
  }

  getUnknownCallback (prop) {
    var callback
    callback = () => {
      return this.addUnknown(function () {
        return prop.get()
      }, prop)
    }
    callback.prop = prop
    return callback
  }

  addUnknown (fn, prop) {
    if (!this.findUnknown(prop)) {
      fn.prop = prop
      this.unknowns.push(fn)
      return this.unknown()
    }
  }

  findUnknown (prop) {
    if (prop != null) {
      return this.unknowns.find(function (unknown) {
        return unknown.prop === prop
      })
    }
  }

  event (event, target = this.scope) {
    if (this.checkEmitter(target)) {
      return this.addEventBind(event, target)
    }
  }

  value (val, event, target = this.scope) {
    this.event(event, target)
    return val
  }

  /**
   * @template T
   * @param {Property<T>} prop
   * @return {T}
   */
  prop (prop) {
    if (prop != null) {
      this.addEventBind('invalidated', prop.events, this.getUnknownCallback(prop))
      return this.value(prop.get(), 'updated', prop.events)
    }
  }

  propByName (prop, target = this.scope) {
    if (target.propertiesManager != null) {
      const property = target.propertiesManager.getProperty(prop)
      if (property) {
        return this.prop(property)
      }
    }
    if (target[prop + 'Property'] != null) {
      return this.prop(target[prop + 'Property'])
    }
    return target[prop]
  }

  propPath (path, target = this.scope) {
    var prop, val
    path = path.split('.')
    val = target
    while ((val != null) && path.length > 0) {
      prop = path.shift()
      val = this.propByName(prop, val)
    }
    return val
  }

  funct (funct) {
    var invalidator, res
    invalidator = new Invalidator(() => {
      return this.addUnknown(() => {
        var res2
        res2 = funct(invalidator)
        if (res !== res2) {
          return this.invalidate()
        }
      }, invalidator)
    })
    res = funct(invalidator)
    this.invalidationEvents.push(invalidator)
    return res
  }

  validateUnknowns () {
    var unknowns
    unknowns = this.unknowns
    this.unknowns = []
    return unknowns.forEach(function (unknown) {
      return unknown()
    })
  }

  isEmpty () {
    return this.invalidationEvents.length === 0
  }

  bind () {
    this.invalid = false
    this.invalidationEvents.forEach(function (eventBind) {
      eventBind.bind()
    })
    return this
  }

  recycle (fn) {
    var done, res
    this.recycled = this.invalidationEvents
    this.invalidationEvents = []
    done = this.endRecycle.bind(this)
    if (typeof fn === 'function') {
      if (fn.length > 1) {
        return fn(this, done)
      } else {
        res = fn(this)
        done()
        return res
      }
    } else {
      return done
    }
  }

  endRecycle () {
    this.recycled.forEach(function (eventBind) {
      return eventBind.unbind()
    })
    this.recycled = []
    return this
  }

  checkEmitter (emitter) {
    return EventBind.checkEmitter(emitter, this.strict)
  }

  checkPropInstance (prop) {
    return typeof prop.get === 'function' && this.checkEmitter(prop.events)
  }

  unbind () {
    this.invalidationEvents.forEach(function (eventBind) {
      eventBind.unbind()
    })
    return this
  }
};

Invalidator.strict = true

module.exports = Invalidator

},{"spark-binding":100}],108:[function(require,module,exports){
const Property = require('./Property')

class PropertiesManager {
  constructor (properties = {}, options = {}) {
    /**
     * @type {Array.<Property>}
     */
    this.properties = []
    this.globalOptions = Object.assign({ initWatchers: false }, options)
    this.propertiesOptions = Object.assign({}, properties)
  }

  /**
   * @param {*} properties
   * @param {*} options
   * @return {PropertiesManager}
   */
  copyWith (properties = {}, options = {}) {
    return new this.constructor(this.mergePropertiesOptions(this.propertiesOptions, properties), Object.assign({}, this.globalOptions, options))
  }

  withProperty (prop, options) {
    const properties = {}
    properties[prop] = options
    return this.copyWith(properties)
  }

  useScope (scope) {
    return this.copyWith({}, { scope: scope })
  }

  mergePropertiesOptions (...arg) {
    return arg.reduce((res, opt) => {
      Object.keys(opt).forEach((name) => {
        res[name] = this.mergePropertyOptions(res[name] || {}, opt[name])
      })
      return res
    }, {})
  }

  mergePropertyOptions (...arg) {
    const notMergable = ['default', 'scope']
    return arg.reduce((res, opt) => {
      Object.keys(opt).forEach((name) => {
        if (typeof res[name] === 'function' && typeof opt[name] === 'function' && !notMergable.includes(name)) {
          res[name] = this.mergeCallback(res[name], opt[name])
        } else {
          res[name] = opt[name]
        }
      })
      return res
    }, {})
  }

  mergeCallback (oldFunct, newFunct) {
    const fn = function (...arg) {
      return newFunct.call(this, ...arg, oldFunct.bind(this))
    }
    fn.components = (oldFunct.components || [oldFunct]).concat((oldFunct.newFunct || [newFunct]))
    fn.nbParams = newFunct.nbParams || newFunct.length
    return fn
  }

  initProperties () {
    this.addProperties(this.propertiesOptions)
    return this
  }

  createScopeGetterSetters () {
    this.properties.forEach((prop) => prop.createScopeGetterSetters())
    return this
  }

  initWatchers () {
    this.properties.forEach((prop) => prop.initWatchers())
    return this
  }

  initScope () {
    this.initProperties()
    this.createScopeGetterSetters()
    this.initWatchers()
    return this
  }

  addProperty (name, options) {
    const prop = new Property(Object.assign({ name: name }, this.globalOptions, options))
    this.properties.push(prop)
    return this
  }

  addProperties (options) {
    Object.keys(options).forEach((name) => this.addProperty(name, options[name]))
    return this
  }

  /**
   * @param {string} name
   * @returns {Property}
   */
  getProperty (name) {
    return this.properties.find((prop) => prop.options.name === name)
  }

  setPropertiesData (data, options = {}) {
    Object.keys(data).forEach((key) => {
      if (((options.whitelist == null) || options.whitelist.indexOf(key) !== -1) && ((options.blacklist == null) || options.blacklist.indexOf(key) === -1)) {
        const prop = this.getProperty(key)
        if (prop) {
          prop.set(data[key])
        }
      }
    })
    return this
  }

  getManualDataProperties () {
    return this.properties.reduce((res, prop) => {
      if (prop.getter.calculated && prop.manual) {
        res[prop.options.name] = prop.get()
      }
      return res
    }, {})
  }

  destroy () {
    this.properties.forEach((prop) => prop.destroy())
  }
}

module.exports = PropertiesManager

},{"./Property":109}],109:[function(require,module,exports){
const EventEmitter = require('events').EventEmitter

const SimpleGetter = require('./getters/SimpleGetter')
const CalculatedGetter = require('./getters/CalculatedGetter')
const InvalidatedGetter = require('./getters/InvalidatedGetter')
const ManualGetter = require('./getters/ManualGetter')
const CompositeGetter = require('./getters/CompositeGetter')

const ManualSetter = require('./setters/ManualSetter')
const SimpleSetter = require('./setters/SimpleSetter')
const BaseValueSetter = require('./setters/BaseValueSetter')
const CollectionSetter = require('./setters/CollectionSetter')

/**
 * @template T
 */
class Property {
  /**
   * @typedef {Object} PropertyOptions
   * @property {T} [default]
   * @property {function(import("./Invalidator")): T} [calcul]
   * @property {function(): T} [get]
   * @property {function(T)} [set]
   * @property {function(T,T)|import("./PropertyWatcher")<T>} [change]
   * @property {boolean|string|function(T,T):T} [composed]
   * @property {boolean|Object} [collection]
   * @property {*} [scope]
   *
   * @param {PropertyOptions} options
   */
  constructor (options = {}) {
    this.options = Object.assign({}, Property.defaultOptions, options)
    this.init()
  }

  init () {
    /**
     * @type {EventEmitter}
     */
    this.events = new this.options.EventEmitterClass()
    this.makeSetter()
    this.makeGetter()
    this.setter.init()
    this.getter.init()
    if (this.options.initWatchers) {
      this.initWatchers()
    }
  }

  initWatchers () {
    this.setter.loadInternalWatcher()
  }

  makeGetter () {
    if (typeof this.options.get === 'function') {
      this.getter = new ManualGetter(this)
    } else if (this.options.composed != null && this.options.composed !== false) {
      this.getter = new CompositeGetter(this)
    } else if (typeof this.options.calcul === 'function') {
      if ((this.options.calcul.nbParams || this.options.calcul.length) === 0) {
        this.getter = new CalculatedGetter(this)
      } else {
        this.getter = new InvalidatedGetter(this)
      }
    } else {
      this.getter = new SimpleGetter(this)
    }
  }

  makeSetter () {
    if (typeof this.options.set === 'function') {
      this.setter = new ManualSetter(this)
    } else if (this.options.collection != null && this.options.collection !== false) {
      this.setter = new CollectionSetter(this)
    } else if (this.options.composed != null && this.options.composed !== false) {
      this.setter = new BaseValueSetter(this)
    } else {
      this.setter = new SimpleSetter(this)
    }
  }

  /**
   * @param {*} options
   * @returns {Property<T>}
   */
  copyWith (options) {
    return new this.constructor(Object.assign({}, this.options, options))
  }

  /**
   * @returns {T}
   */
  get () {
    return this.getter.get()
  }

  invalidate () {
    this.getter.invalidate()
    return this
  }

  unknown () {
    this.getter.unknown()
    return this
  }

  set (val) {
    return this.setter.set(val)
  }

  createScopeGetterSetters () {
    if (this.options.scope) {
      const prop = this
      let opt = {}
      opt[this.options.name + 'Property'] = {
        get: function () {
          return prop
        }
      }
      opt = this.getter.getScopeGetterSetters(opt)
      opt = this.setter.getScopeGetterSetters(opt)
      Object.defineProperties(this.options.scope, opt)
    }
    return this
  }

  destroy () {
    if (this.options.destroy === true && this.value != null && this.value.destroy != null) {
      this.value.destroy()
    }
    if (typeof this.options.destroy === 'function') {
      this.callOptionFunct('destroy', this.value)
    }
    this.getter.destroy()
    this.value = null
  }

  callOptionFunct (funct, ...args) {
    if (typeof funct === 'string') {
      funct = this.options[funct]
    }
    return funct.apply(this.options.scope || this, args)
  }
}

Property.defaultOptions = {
  EventEmitterClass: EventEmitter,
  initWatchers: true
}
module.exports = Property

},{"./getters/CalculatedGetter":111,"./getters/CompositeGetter":112,"./getters/InvalidatedGetter":113,"./getters/ManualGetter":114,"./getters/SimpleGetter":115,"./setters/BaseValueSetter":117,"./setters/CollectionSetter":118,"./setters/ManualSetter":119,"./setters/SimpleSetter":120,"events":24}],110:[function(require,module,exports){

class BaseGetter {
  constructor (prop) {
    this.prop = prop
  }

  init () {
    this.calculated = false
    this.initiated = false
  }

  get () {
    throw new Error('Not implemented')
  }

  output () {
    if (typeof this.prop.options.output === 'function') {
      return this.prop.callOptionFunct('output', this.prop.value)
    } else {
      return this.prop.value
    }
  }

  revalidated () {
    this.calculated = true
    this.initiated = true
    return this
  }

  unknown () {
    if (this.calculated) {
      this.invalidateNotice()
    }
    return this
  }

  invalidate () {
    if (this.calculated) {
      this.calculated = false
      this.invalidateNotice()
    }
    return this
  }

  invalidateNotice () {
    this.prop.events.emit('invalidated')
  }

  /**
   * @param {PropertyDescriptorMap} opt
   * @return {PropertyDescriptorMap}
   */
  getScopeGetterSetters (opt) {
    const prop = this.prop
    opt[this.prop.options.name] = opt[this.prop.options.name] || {}
    opt[this.prop.options.name].get = function () {
      return prop.get()
    }
    opt[this.prop.options.name].enumerable = true
    opt[this.prop.options.name].configurable = true
    return opt
  }

  destroy () {
  }
}

module.exports = BaseGetter

},{}],111:[function(require,module,exports){

const BaseGetter = require('./BaseGetter')

class CalculatedGetter extends BaseGetter {
  get () {
    if (!this.calculated) {
      const old = this.prop.value
      const initiated = this.initiated
      this.calcul()
      if (!initiated) {
        this.prop.events.emit('updated', old)
      } else if (this.prop.setter.checkChanges(this.prop.value, old)) {
        this.prop.setter.changed(old)
      }
    }
    return this.output()
  }

  calcul () {
    this.prop.setter.setRawValue(this.prop.callOptionFunct('calcul'))
    this.prop.manual = false
    this.revalidated()
    return this.prop.value
  }
}

module.exports = CalculatedGetter

},{"./BaseGetter":110}],112:[function(require,module,exports){
const InvalidatedGetter = require('./InvalidatedGetter')
const Collection = require('spark-collection')
const Invalidator = require('../Invalidator')
const Reference = require('spark-binding').Reference

class CompositeGetter extends InvalidatedGetter {
  init () {
    super.init()
    if (this.prop.options.default != null) {
      this.baseValue = this.prop.options.default
    } else {
      this.prop.setter.setRawValue(null)
      this.baseValue = null
    }
    this.members = new CompositeGetter.Members(this.prop.options.members)
    if (this.prop.options.calcul != null) {
      this.members.unshift((prev, invalidator) => {
        return this.prop.options.calcul.bind(this.prop.options.scope)(invalidator)
      })
    }
    this.members.changed = (old) => {
      return this.invalidate()
    }
    this.prop.members = this.members

    if (typeof this.prop.options.composed === 'function') {
      this.join = this.prop.options.composed
    } else if (typeof this.prop.options.composed === 'string' && CompositeGetter.joinFunctions[this.prop.options.composed] != null) {
      this.join = CompositeGetter.joinFunctions[this.prop.options.composed]
    } else if (this.prop.options.default === false) {
      this.join = CompositeGetter.joinFunctions.or
    } else if (this.prop.options.default === true) {
      this.join = CompositeGetter.joinFunctions.and
    } else {
      this.join = CompositeGetter.joinFunctions.last
    }
  }

  calcul () {
    if (this.members.length) {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this.prop, this.prop.options.scope)
      }
      this.invalidator.recycle((invalidator, done) => {
        this.prop.setter.setRawValue(this.members.reduce((prev, member) => {
          var val
          val = typeof member === 'function' ? member(prev, this.invalidator) : member
          return this.join(prev, val)
        }, this.baseValue))
        done()
        if (invalidator.isEmpty()) {
          this.invalidator = null
        } else {
          invalidator.bind()
        }
      })
    } else {
      this.prop.setter.setRawValue(this.baseValue)
    }
    this.revalidated()
    return this.prop.value
  }

  /**
   * @param {PropertyDescriptorMap} opt
   * @return {PropertyDescriptorMap}
   */
  getScopeGetterSetters (opt) {
    opt = super.getScopeGetterSetters(opt)
    const members = this.members
    opt[this.prop.options.name + 'Members'] = {
      get: function () {
        return members
      }
    }
    return opt
  }
}

CompositeGetter.joinFunctions = {
  and: function (a, b) {
    return a && b
  },
  or: function (a, b) {
    return a || b
  },
  last: function (a, b) {
    return b
  },
  sum: function (a, b) {
    return a + b
  }
}

CompositeGetter.Members = class Members extends Collection {
  addProperty (prop) {
    if (this.findRefIndex(null, prop) === -1) {
      this.push(Reference.makeReferred(function (prev, invalidator) {
        return invalidator.prop(prop)
      }, {
        prop: prop
      }))
    }
    return this
  }

  addPropertyPath (name, obj) {
    if (this.findRefIndex(name, obj) === -1) {
      this.push(Reference.makeReferred(function (prev, invalidator) {
        return invalidator.propPath(name, obj)
      }, {
        name: name,
        obj: obj
      }))
    }
    return this
  }

  removeProperty (prop) {
    this.removeRef({ prop: prop })
    return this
  }

  addValueRef (val, data) {
    if (this.findRefIndex(data) === -1) {
      const fn = Reference.makeReferred(function (prev, invalidator) {
        return val
      }, data)
      fn.val = val
      this.push(fn)
    }
    return this
  }

  setValueRef (val, data) {
    const i = this.findRefIndex(data)
    if (i === -1) {
      this.addValueRef(val, data)
    } else if (this.get(i).val !== val) {
      const fn = Reference.makeReferred(function (prev, invalidator) {
        return val
      }, data)
      fn.val = val
      this.set(i, fn)
    }
    return this
  }

  getValueRef (data) {
    return this.findByRef(data).val
  }

  addFunctionRef (fn, data) {
    if (this.findRefIndex(data) === -1) {
      fn = Reference.makeReferred(fn, data)
      this.push(fn)
    }
    return this
  }

  findByRef (data) {
    return this._array[this.findRefIndex(data)]
  }

  findRefIndex (data) {
    return this._array.findIndex(function (member) {
      return (member.ref != null) && member.ref.compareData(data)
    })
  }

  removeRef (data) {
    var index, old
    index = this.findRefIndex(data)
    if (index !== -1) {
      old = this.toArray()
      this._array.splice(index, 1)
      this.changed(old)
    }
    return this
  }
}

module.exports = CompositeGetter

},{"../Invalidator":107,"./InvalidatedGetter":113,"spark-binding":100,"spark-collection":104}],113:[function(require,module,exports){
const Invalidator = require('../Invalidator')
const CalculatedGetter = require('./CalculatedGetter')

class InvalidatedGetter extends CalculatedGetter {
  get () {
    if (this.invalidator) {
      this.invalidator.validateUnknowns()
    }
    return super.get()
  }

  calcul () {
    if (!this.invalidator) {
      this.invalidator = new Invalidator(this.prop, this.prop.options.scope)
    }
    this.invalidator.recycle((invalidator, done) => {
      this.prop.setter.setRawValue(this.prop.callOptionFunct('calcul', invalidator))
      this.prop.manual = false
      done()
      if (invalidator.isEmpty()) {
        this.invalidator = null
      } else {
        invalidator.bind()
      }
    })
    this.revalidated()
    return this.output()
  }

  invalidate () {
    if (this.calculated) {
      this.calculated = false
      this.invalidateNotice()
      if (!this.calculated && this.invalidator != null) {
        this.invalidator.unbind()
      }
    }
    return this
  }

  destroy () {
    if (this.invalidator != null) {
      return this.invalidator.unbind()
    }
  }
}

module.exports = InvalidatedGetter

},{"../Invalidator":107,"./CalculatedGetter":111}],114:[function(require,module,exports){
const BaseGetter = require('./BaseGetter')

class ManualGetter extends BaseGetter {
  get () {
    this.prop.setter.setRawValue(this.prop.callOptionFunct('get'))
    this.calculated = true
    this.initiated = true
    return this.output()
  }
}

module.exports = ManualGetter

},{"./BaseGetter":110}],115:[function(require,module,exports){
const BaseGetter = require('./BaseGetter')

class SimpleGetter extends BaseGetter {
  get () {
    this.calculated = true
    if (!this.initiated) {
      this.initiated = true
      this.prop.events.emit('updated')
    }
    return this.output()
  }
}

module.exports = SimpleGetter

},{"./BaseGetter":110}],116:[function(require,module,exports){

const PropertyWatcher = require('../watchers/PropertyWatcher')

class BaseSetter {
  constructor (prop) {
    this.prop = prop
  }

  init () {
    this.setDefaultValue()
  }

  setDefaultValue () {
    this.setRawValue(this.ingest(this.prop.options.default))
  }

  loadInternalWatcher () {
    const changeOpt = this.prop.options.change
    if (typeof changeOpt === 'function') {
      return new PropertyWatcher({
        property: this.prop,
        callback: changeOpt,
        scope: this.prop.options.scope,
        autoBind: true
      })
    } else if (changeOpt != null && typeof changeOpt.copyWith === 'function') {
      return changeOpt.copyWith({
        property: this.prop,
        scope: this.prop.options.scope,
        autoBind: true
      })
    }
  }

  set (val) {
    throw new Error('Not implemented')
  }

  setRawValue (val) {
    this.prop.value = val
    return this.prop.value
  }

  ingest (val) {
    if (typeof this.prop.options.ingest === 'function') {
      val = this.prop.callOptionFunct('ingest', val)
    }
    return val
  }

  checkChanges (val, old) {
    return val !== old
  }

  changed (old) {
    this.prop.events.emit('updated', old)
    this.prop.events.emit('changed', old)
    return this
  }

  /**
   * @param {PropertyDescriptorMap} opt
   * @return {PropertyDescriptorMap}
   */
  getScopeGetterSetters (opt) {
    const prop = this.prop
    opt[this.prop.options.name] = opt[this.prop.options.name] || {}
    opt[this.prop.options.name].set = function (val) {
      return prop.set(val)
    }
    return opt
  }
}

module.exports = BaseSetter

},{"../watchers/PropertyWatcher":122}],117:[function(require,module,exports){
const BaseSetter = require('./BaseSetter')

class BaseValueSetter extends BaseSetter {
  set (val) {
    val = this.ingest(val)
    if (this.prop.getter.baseValue !== val) {
      this.prop.getter.baseValue = val
      this.prop.invalidate()
    }
    return this
  }
}

module.exports = BaseValueSetter

},{"./BaseSetter":116}],118:[function(require,module,exports){
const SimpleSetter = require('./SimpleSetter')
const Collection = require('spark-collection')
const CollectionPropertyWatcher = require('../watchers/CollectionPropertyWatcher')

class CollectionSetter extends SimpleSetter {
  init () {
    this.options = Object.assign(
      {},
      CollectionSetter.defaultOptions,
      typeof this.prop.options.collection === 'object' ? this.prop.options.collection : {}
    )
    super.init()
  }

  loadInternalWatcher () {
    if (
      typeof this.prop.options.change === 'function' ||
      typeof this.prop.options.itemAdded === 'function' ||
      typeof this.prop.options.itemRemoved === 'function'
    ) {
      return new CollectionPropertyWatcher({
        property: this.prop,
        callback: this.prop.options.change,
        onAdded: this.prop.options.itemAdded,
        onRemoved: this.prop.options.itemRemoved,
        scope: this.prop.options.scope,
        autoBind: true
      })
    } else {
      super.loadInternalWatcher()
    }
  }

  setRawValue (val) {
    this.prop.value = this.makeCollection(val)
    return this.prop.value
  }

  makeCollection (val) {
    val = this.valToArray(val)
    const prop = this.prop
    const col = Collection.newSubClass(this.options, val)
    col.changed = function (old) {
      prop.setter.changed(old)
    }
    return col
  }

  valToArray (val) {
    if (val == null) {
      return []
    } else if (typeof val.toArray === 'function') {
      return val.toArray()
    } else if (Array.isArray(val)) {
      return val.slice()
    } else {
      return [val]
    }
  }

  checkChanges (val, old) {
    var compareFunction
    if (typeof this.options.compare === 'function') {
      compareFunction = this.options.compare
    }
    return (new Collection(val)).checkChanges(old, this.options.ordered, compareFunction)
  }
}

CollectionSetter.defaultOptions = {
  compare: false,
  ordered: true
}

module.exports = CollectionSetter

},{"../watchers/CollectionPropertyWatcher":121,"./SimpleSetter":120,"spark-collection":104}],119:[function(require,module,exports){
const BaseSetter = require('./BaseSetter')

class ManualSetter extends BaseSetter {
  set (val) {
    this.prop.callOptionFunct('set', val)
  }
}

module.exports = ManualSetter

},{"./BaseSetter":116}],120:[function(require,module,exports){
const BaseSetter = require('./BaseSetter')

class SimpleSetter extends BaseSetter {
  set (val) {
    var old
    val = this.ingest(val)
    this.prop.getter.revalidated()
    if (this.checkChanges(val, this.prop.value)) {
      old = this.prop.value
      this.setRawValue(val)
      this.prop.manual = true
      this.changed(old)
    }
    return this
  }
}

module.exports = SimpleSetter

},{"./BaseSetter":116}],121:[function(require,module,exports){

const PropertyWatcher = require('./PropertyWatcher')

class CollectionPropertyWatcher extends PropertyWatcher {
  loadOptions (options) {
    super.loadOptions(options)
    this.onAdded = options.onAdded
    this.onRemoved = options.onRemoved
  }

  handleChange (value, old) {
    old = value.copy(old || [])
    if (typeof this.callback === 'function') {
      this.callback.call(this.scope, value, old)
    }
    if (typeof this.onAdded === 'function') {
      value.forEach((item, i) => {
        if (!old.includes(item)) {
          return this.onAdded.call(this.scope, item)
        }
      })
    }
    if (typeof this.onRemoved === 'function') {
      return old.forEach((item, i) => {
        if (!value.includes(item)) {
          return this.onRemoved.call(this.scope, item)
        }
      })
    }
  }
}

module.exports = CollectionPropertyWatcher

},{"./PropertyWatcher":122}],122:[function(require,module,exports){

const Binder = require('spark-binding').Binder
const Reference = require('spark-binding').Reference

/**
 * @template T
 */
class PropertyWatcher extends Binder {
  /**
   * @typedef {Object} PropertyWatcherOptions
   * @property {import("./Property")<T>|string} property
   * @property {function(T,T)} callback
   * @property {boolean} [autoBind]
   * @property {*} [scope]
   *
   * @param {PropertyWatcherOptions} options
   */
  constructor (options) {
    super()
    this.options = options
    this.invalidateCallback = () => {
      return this.invalidate()
    }
    this.updateCallback = (old) => {
      return this.update(old)
    }
    if (this.options != null) {
      this.loadOptions(this.options)
    }
    this.init()
  }

  loadOptions (options) {
    this.scope = options.scope
    this.property = options.property
    this.callback = options.callback
    this.autoBind = options.autoBind
    return this
  }

  copyWith (options) {
    return new this.constructor(Object.assign({}, this.options, options))
  }

  init () {
    if (this.autoBind) {
      return this.checkBind()
    }
  }

  getProperty () {
    if (typeof this.property === 'string') {
      return this.getPropByName(this.property)
    }
    return this.property
  }

  getPropByName (prop, target = this.scope) {
    if (target.propertiesManager != null) {
      return target.propertiesManager.getProperty(prop)
    } else if (target[prop + 'Property'] != null) {
      return target[prop + 'Property']
    } else {
      throw new Error(`Could not find the property ${prop}`)
    }
  }

  checkBind () {
    return this.toggleBind(this.shouldBind())
  }

  shouldBind () {
    return true
  }

  canBind () {
    return this.getProperty() != null
  }

  doBind () {
    this.update()
    this.getProperty().events.on('invalidated', this.invalidateCallback)
    return this.getProperty().events.on('updated', this.updateCallback)
  }

  doUnbind () {
    this.getProperty().events.off('invalidated', this.invalidateCallback)
    return this.getProperty().events.off('updated', this.updateCallback)
  }

  equals (watcher) {
    return watcher.constructor === this.constructor &&
      watcher != null &&
      watcher.event === this.event &&
      watcher.getProperty() === this.getProperty() &&
      Reference.compareVal(watcher.callback, this.callback)
  }

  invalidate () {
    return this.getProperty().get()
  }

  update (old) {
    var value
    value = this.getProperty().get()
    return this.handleChange(value, old)
  }

  handleChange (value, old) {
    return this.callback.call(this.scope, value, old)
  }
};

module.exports = PropertyWatcher

},{"spark-binding":100}]},{},[23])(23)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQXV0b21hdGljRG9vci5qcyIsImxpYi9DaGFyYWN0ZXIuanMiLCJsaWIvRGFtYWdlYWJsZS5qcyIsImxpYi9EaXNwbGF5LmpzIiwibGliL0RvbVVwZGF0ZXIuanMiLCJsaWIvRG9vci5qcyIsImxpYi9HYW1lLmpzIiwibGliL01hcC5qcyIsImxpYi9QbGF5ZXJDb250cm9sbGVyLmpzIiwibGliL1BsYXllclNlbGVjdGlvbkluZm8uanMiLCJsaWIvUHJvamVjdGlsZS5qcyIsImxpYi9TaGlwLmpzIiwibGliL1NoaXBJbnRlcmlvci5qcyIsImxpYi9TaGlwV2VhcG9uLmpzIiwibGliL1N0YXJNYXBHZW5lcmF0b3IuanMiLCJsaWIvU3RhclN5c3RlbS5qcyIsImxpYi9UaWxlLmpzIiwibGliL1RpbGVkLmpzIiwibGliL1VwZGF0ZXIuanMiLCJsaWIvVmlldy5qcyIsImxpYi9XaXJlLmpzIiwibGliL2xpYnMuanMiLCJsaWIvcGFyYWxsZWxpby1kb20uanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIi4uL3BhcmFsbGVsaW8tZ3JpZHMvbGliL0dyaWQuanMiLCIuLi9wYXJhbGxlbGlvLWdyaWRzL2xpYi9HcmlkQ2VsbC5qcyIsIi4uL3BhcmFsbGVsaW8tZ3JpZHMvbGliL0dyaWRSb3cuanMiLCIuLi9wYXJhbGxlbGlvLWdyaWRzL2xpYi9ncmlkcy5qcyIsIi4uL3BhcmFsbGVsaW8tcGF0aGZpbmRlci9kaXN0L3BhdGhmaW5kZXIuanMiLCIuLi9wYXJhbGxlbGlvLXN0cmluZ3Mvc3RyaW5ncy5qcyIsIi4uL3BhcmFsbGVsaW8tc3RyaW5ncy9zdHJpbmdzL2dyZWVrQWxwaGFiZXQuanNvbiIsIi4uL3BhcmFsbGVsaW8tc3RyaW5ncy9zdHJpbmdzL3N0YXJOYW1lcy5qc29uIiwiLi4vcGFyYWxsZWxpby10aWxlcy9saWIvRGlyZWN0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby10aWxlcy9saWIvVGlsZS5qcyIsIi4uL3BhcmFsbGVsaW8tdGlsZXMvbGliL1RpbGVDb250YWluZXIuanMiLCIuLi9wYXJhbGxlbGlvLXRpbGVzL2xpYi9UaWxlUmVmZXJlbmNlLmpzIiwiLi4vcGFyYWxsZWxpby10aWxlcy9saWIvVGlsZWQuanMiLCIuLi9wYXJhbGxlbGlvLXRpbGVzL2xpYi90aWxlcy5qcyIsIi4uL3BhcmFsbGVsaW8tdGltaW5nL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXRpbWluZy9kaXN0L3RpbWluZy5qcyIsIi4uL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9Db25uZWN0ZWQuanMiLCIuLi9wYXJhbGxlbGlvLXdpcmluZy9saWIvU2lnbmFsLmpzIiwiLi4vcGFyYWxsZWxpby13aXJpbmcvbGliL1NpZ25hbE9wZXJhdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9TaWduYWxTb3VyY2UuanMiLCIuLi9wYXJhbGxlbGlvLXdpcmluZy9saWIvU3dpdGNoLmpzIiwiLi4vcGFyYWxsZWxpby13aXJpbmcvbGliL1dpcmUuanMiLCIuLi9wYXJhbGxlbGlvLXdpcmluZy9saWIvd2lyaW5nLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvQWlybG9jay5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0FwcHJvYWNoLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvQXV0b21hdGljRG9vci5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0NoYXJhY3Rlci5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0NoYXJhY3RlckFJLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvQ29uZnJvbnRhdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0RhbWFnZVByb3BhZ2F0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvRGFtYWdlYWJsZS5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0Rvb3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9FbGVtZW50LmpzIiwiLi4vcGFyYWxsZWxpby9saWIvRW5jb250ZXJNYW5hZ2VyLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvRmxvb3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9HYW1lLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvSW52ZW50b3J5LmpzIiwiLi4vcGFyYWxsZWxpby9saWIvTGluZU9mU2lnaHQuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9NYXAuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9PYnN0YWNsZS5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1BhdGhXYWxrLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvUGVyc29uYWxXZWFwb24uanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9QbGF5ZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9Qcm9qZWN0aWxlLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvUmVzc291cmNlLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvUmVzc291cmNlVHlwZS5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1Jvb21HZW5lcmF0b3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9TaGlwLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvU2hpcFdlYXBvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1N0YXJNYXBHZW5lcmF0b3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9TdGFyU3lzdGVtLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvVHJhdmVsLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvVmlldy5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1Zpc2lvbkNhbGN1bGF0b3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0FjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQWN0aW9uUHJvdmlkZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0F0dGFja0FjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQXR0YWNrTW92ZUFjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvU2ltcGxlQWN0aW9uUHJvdmlkZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL1RhcmdldEFjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVGlsZWRBY3Rpb25Qcm92aWRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVHJhdmVsQWN0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvYWN0aW9ucy9XYWxrQWN0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvbGlicy5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL3BhcmFsbGVsaW8uanMiLCIuLi9zcGFyay1zdGFydGVyL2xpYi9FbGVtZW50LmpzIiwiLi4vc3Bhcmstc3RhcnRlci9saWIvSW52YWxpZGF0ZWQvQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9saWIvSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWQuanMiLCIuLi9zcGFyay1zdGFydGVyL2xpYi9Mb2FkZXIuanMiLCIuLi9zcGFyay1zdGFydGVyL2xpYi9NaXhhYmxlLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9saWIvT3ZlcnJpZGVyLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9saWIvVXBkYXRlci5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbGliL2xpYnMuanMiLCIuLi9zcGFyay1zdGFydGVyL2xpYi9zcGFyay1zdGFydGVyLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9ub2RlX21vZHVsZXMvc3BhcmstYmluZGluZy9pbmRleC5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLWJpbmRpbmcvc3JjL0JpbmRlci5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLWJpbmRpbmcvc3JjL0V2ZW50QmluZC5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLWJpbmRpbmcvc3JjL1JlZmVyZW5jZS5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLWNvbGxlY3Rpb24vaW5kZXguanMiLCIuLi9zcGFyay1zdGFydGVyL25vZGVfbW9kdWxlcy9zcGFyay1jb2xsZWN0aW9uL3NyYy9Db2xsZWN0aW9uLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9pbmRleC5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL0ludmFsaWRhdG9yLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvUHJvcGVydGllc01hbmFnZXIuanMiLCIuLi9zcGFyay1zdGFydGVyL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9Qcm9wZXJ0eS5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvQmFzZUdldHRlci5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvQ2FsY3VsYXRlZEdldHRlci5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvQ29tcG9zaXRlR2V0dGVyLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvZ2V0dGVycy9JbnZhbGlkYXRlZEdldHRlci5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvTWFudWFsR2V0dGVyLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvZ2V0dGVycy9TaW1wbGVHZXR0ZXIuanMiLCIuLi9zcGFyay1zdGFydGVyL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9zZXR0ZXJzL0Jhc2VTZXR0ZXIuanMiLCIuLi9zcGFyay1zdGFydGVyL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9zZXR0ZXJzL0Jhc2VWYWx1ZVNldHRlci5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL3NldHRlcnMvQ29sbGVjdGlvblNldHRlci5qcyIsIi4uL3NwYXJrLXN0YXJ0ZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL3NldHRlcnMvTWFudWFsU2V0dGVyLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvc2V0dGVycy9TaW1wbGVTZXR0ZXIuanMiLCIuLi9zcGFyay1zdGFydGVyL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy93YXRjaGVycy9Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyLmpzIiwiLi4vc3Bhcmstc3RhcnRlci9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvd2F0Y2hlcnMvUHJvcGVydHlXYXRjaGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBBdXRvbWF0aWNEb29yLCBCYXNlQXV0b21hdGljRG9vciwgRG9vcjtcblxuRG9vciA9IHJlcXVpcmUoJy4vRG9vcicpO1xuXG5CYXNlQXV0b21hdGljRG9vciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5BdXRvbWF0aWNEb29yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dG9tYXRpY0Rvb3IgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEF1dG9tYXRpY0Rvb3IgZXh0ZW5kcyBCYXNlQXV0b21hdGljRG9vciB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdkb29yJztcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHJldHVybiB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgQXV0b21hdGljRG9vci5leHRlbmQoRG9vcik7XG5cbiAgcmV0dXJuIEF1dG9tYXRpY0Rvb3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQXV0b21hdGljRG9vci5qcy5tYXBcbiIsInZhciBCYXNlQ2hhcmFjdGVyLCBDaGFyYWN0ZXIsIERvbVVwZGF0ZXIsIEVsZW1lbnQsIFRpbGVkO1xuXG5UaWxlZCA9IHJlcXVpcmUoJy4vVGlsZWQnKTtcblxuQmFzZUNoYXJhY3RlciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5DaGFyYWN0ZXI7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJhY3RlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgQmFzZUNoYXJhY3RlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5pbml0RGlzcGxheSgpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ2NoYXJhY3Rlcic7XG4gICAgfVxuXG4gIH07XG5cbiAgQ2hhcmFjdGVyLmV4dGVuZChUaWxlZCk7XG5cbiAgQ2hhcmFjdGVyLnByb3BlcnRpZXMoe1xuICAgIHNlbGVjdGVkOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJywgdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQ2hhcmFjdGVyO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0NoYXJhY3Rlci5qcy5tYXBcbiIsInZhciBCYXNlRGFtYWdlYWJsZSwgRGFtYWdlYWJsZSwgRGlzcGxheSwgRG9tVXBkYXRlcjtcblxuQmFzZURhbWFnZWFibGUgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuRGFtYWdlYWJsZTtcblxuRGlzcGxheSA9IHJlcXVpcmUoJy4vRGlzcGxheScpO1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGFtYWdlYWJsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRGFtYWdlYWJsZSBleHRlbmRzIEJhc2VEYW1hZ2VhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmhlYWx0aENscygpO1xuICAgICAgdGhpcy5pbml0RGlzcGxheSgpO1xuICAgIH1cblxuICB9O1xuXG4gIERhbWFnZWFibGUuZXh0ZW5kKERpc3BsYXkpO1xuXG4gIERhbWFnZWFibGUucHJvcGVydGllcyh7XG4gICAgaGVhbHRoQ2xzU3RlcHM6IHtcbiAgICAgIGRlZmF1bHQ6IDEwXG4gICAgfSxcbiAgICBoZWFsdGhDbHM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuICdoZWFsdGgtJyArIChNYXRoLmNlaWwoaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnaGVhbHRoJykgLyBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCdtYXhIZWFsdGgnKSAqIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2hlYWx0aENsc1N0ZXBzJykpKTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnJlbW92ZUNsYXNzKG9sZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmhlYWx0aENscyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKHRoaXMuaGVhbHRoQ2xzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gRGFtYWdlYWJsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9EYW1hZ2VhYmxlLmpzLm1hcFxuIiwidmFyIERpc3BsYXksIERvbVVwZGF0ZXIsIEVsZW1lbnQ7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuRWxlbWVudDtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BsYXkgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIERpc3BsYXkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBpbml0RGlzcGxheSgpIHt9XG5cbiAgICBkZXN0cm95RGlzcGxheSgpIHtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlQcm9wZXJ0eS52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgRGlzcGxheS5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYXBwZW5kVG8odGhpcy5kaXNwbGF5Q29udGFpbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjbHM6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3Mob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5jbHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXNwbGF5LCBuZXdEaXY7XG4gICAgICAgIG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpc3BsYXkgPSBqUXVlcnkobmV3RGl2KS5hZGRDbGFzcyh0aGlzLmJhc2VDbHMpO1xuICAgICAgICBkaXNwbGF5LmdldCgwKS5fcGFyYWxsZWxpb19vYmogPSB0aGlzO1xuICAgICAgICByZXR1cm4gZGlzcGxheTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXlYOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuY3NzKHtcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuZGlzcGxheVhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGRpc3BsYXlZOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuY3NzKHtcbiAgICAgICAgICAgIHRvcDogdGhpcy5kaXNwbGF5WVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIERpc3BsYXk7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRGlzcGxheS5qcy5tYXBcbiIsInZhciBEb21VcGRhdGVyLCBQcm9wZXJ0eVdhdGNoZXI7XG5cblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5TcGFyay53YXRjaGVycy5Qcm9wZXJ0eVdhdGNoZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9tVXBkYXRlciA9IGNsYXNzIERvbVVwZGF0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVdhdGNoZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMudXBkYXRlRG9tQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVEb20oKTtcbiAgICB9O1xuICAgIHJldHVybiBzdXBlci5pbml0KCk7XG4gIH1cblxuICByZXF1ZXN0RnJhbWUoKSB7XG4gICAgaWYgKCF0aGlzLmZyYW1lYmluZGVkKSB7XG4gICAgICB0aGlzLmZyYW1lYmluZGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlRG9tQ2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIGludmFsaWRhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdEZyYW1lKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdEZyYW1lKCk7XG4gIH1cblxuICB1cGRhdGVEb20ob2xkKSB7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5nZXRQcm9wZXJ0eSgpLmdldCgpO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5vbGQpIHtcbiAgICAgIHRoaXMub2xkID0gdmFsdWU7XG4gICAgICB0aGlzLmhhbmRsZUNoYW5nZSh2YWx1ZSwgb2xkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZnJhbWViaW5kZWQgPSBmYWxzZTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0RvbVVwZGF0ZXIuanMubWFwXG4iLCJ2YXIgQmFzZURvb3IsIERvbVVwZGF0ZXIsIERvb3IsIEVsZW1lbnQsIFRpbGVkO1xuXG5UaWxlZCA9IHJlcXVpcmUoJy4vVGlsZWQnKTtcblxuQmFzZURvb3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuRG9vcjtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9vciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRG9vciBleHRlbmRzIEJhc2VEb29yIHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ2Rvb3InO1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBEb29yLmV4dGVuZChUaWxlZCk7XG5cbiAgRG9vci5wcm9wZXJ0aWVzKHtcbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3Mob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9wZW46IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5LnRvZ2dsZUNsYXNzKCdjbG9zZScsICF0aGlzLm9wZW4pO1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkudG9nZ2xlQ2xhc3MoJ29wZW4nLCB0aGlzLm9wZW4pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIERvb3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRG9vci5qcy5tYXBcbiIsInZhciBCYXNlR2FtZSwgR2FtZSwgUGxheWVyQ29udHJvbGxlciwgVmlldztcblxuQmFzZUdhbWUgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuR2FtZTtcblxuVmlldyA9IHJlcXVpcmUoJy4vVmlldycpO1xuXG5QbGF5ZXJDb250cm9sbGVyID0gcmVxdWlyZSgnLi9QbGF5ZXJDb250cm9sbGVyJyk7XG5cbi8vIFVwZGF0ZXIgPSByZXF1aXJlKCcuL1VwZGF0ZXInKVxubW9kdWxlLmV4cG9ydHMgPSBHYW1lID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHYW1lIGV4dGVuZHMgQmFzZUdhbWUge307XG5cbiAgR2FtZS5wcm9wZXJ0aWVzKHtcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IsIG9yaWdpbmFsKSB7XG4gICAgICAgIHZhciB0aW1pbmc7XG4gICAgICAgIHRpbWluZyA9IG9yaWdpbmFsKCk7XG4gICAgICAgIC8vIHRpbWluZy51cGRhdGVyID0gVXBkYXRlci5pbnN0YW5jZVxuICAgICAgICByZXR1cm4gdGltaW5nO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWFpblVJOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGl2O1xuICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInVpXCIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBHYW1lLnByb3RvdHlwZS5kZWZhdWx0Vmlld0NsYXNzID0gVmlldztcblxuICBHYW1lLnByb3RvdHlwZS5kZWZhdWx0UGxheWVyQ29udHJvbGxlckNsYXNzID0gUGxheWVyQ29udHJvbGxlcjtcblxuICByZXR1cm4gR2FtZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9HYW1lLmpzLm1hcFxuIiwidmFyIEJhc2VNYXAsIE1hcDtcblxuQmFzZU1hcCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5NYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBNYXAgZXh0ZW5kcyBCYXNlTWFwIHtcbiAgICBzZXREZWZhdWx0cygpIHtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Q29udGFpbmVyID0gdGhpcy5nYW1lLm1haW5WaWV3LmNvbnRlbnREaXNwbGF5O1xuICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdCYWNrZ3JvdW5kKGNhbnZhcykge1xuICAgICAgdmFyIGNvbnRleHQ7XG4gICAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBsb2NhdGlvbi5kcmF3ID09PSBcImZ1bmN0aW9uXCIgPyBsb2NhdGlvbi5kcmF3KHRoaXMsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH07XG5cbiAgTWFwLnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXlDb250YWluZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBsb2NhdGlvbi5kaXNwbGF5Q29udGFpbmVyID0gdGhpcy5kaXNwbGF5Q29udGFpbmVyO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRhaW5lci5hcHBlbmQodGhpcy5iYWNrZ3JvdW5kQ2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3Rhck1hcmdpbjoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIGJhY2tncm91bmRDYW52YXM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYW52YXM7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuYm91bmRhcmllcy5yaWdodCAtIHRoaXMuYm91bmRhcmllcy5sZWZ0ICsgdGhpcy5zdGFyTWFyZ2luICogMjtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuYm91bmRhcmllcy5ib3R0b20gLSB0aGlzLmJvdW5kYXJpZXMudG9wICsgdGhpcy5zdGFyTWFyZ2luICogMjtcbiAgICAgICAgY2FudmFzLmNsYXNzTGlzdC5hZGQoXCJtYXBCYWNrZ3JvdW5kXCIpO1xuICAgICAgICBjYW52YXMuc3R5bGUudG9wID0gdGhpcy5ib3VuZGFyaWVzLnRvcCAtIHRoaXMuc3Rhck1hcmdpbiArIFwicHhcIjtcbiAgICAgICAgY2FudmFzLnN0eWxlLmxlZnQgPSB0aGlzLmJvdW5kYXJpZXMubGVmdCAtIHRoaXMuc3Rhck1hcmdpbiArIFwicHhcIjtcbiAgICAgICAgdGhpcy5kcmF3QmFja2dyb3VuZChjYW52YXMpO1xuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIE1hcDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9NYXAuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgUGxheWVyQ29udHJvbGxlcjtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBsYXllckNvbnRyb2xsZXIgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgaWYgKCF0aGlzLmdhbWVEaXNwbGF5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVEaXNwbGF5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZvY3VzKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9idWJibGVVcChlLnRhcmdldCwgKHRhcmdldCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY2FuRm9jdXNPbih0YXJnZXQpKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuZm9jdXNlZCA9IHRhcmdldDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tUYXJnZXRPclNlbGVjdGFibGUoZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2J1YmJsZVVwKGUudGFyZ2V0LCAodGFyZ2V0KSA9PiB7XG4gICAgICAgIHZhciBhY3Rpb247XG4gICAgICAgIGlmIChhY3Rpb24gPSB0aGlzLnBsYXllci5jYW5UYXJnZXRBY3Rpb25Pbih0YXJnZXQpKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc2VsZWN0ZWRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0QWN0aW9uVGFyZ2V0KHRhcmdldCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIuY2FuU2VsZWN0KHRhcmdldCkpIHtcbiAgICAgICAgICB0aGlzLnBsYXllci5zZWxlY3RlZCA9IHRhcmdldDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2J1YmJsZVVwKHRhcmdldCwgc3RvcENhbGxiYWNrKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgd2hpbGUgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQuX3BhcmFsbGVsaW9fb2JqICE9IG51bGwgPyB0YXJnZXQuX3BhcmFsbGVsaW9fb2JqIDogdGFyZ2V0LnBhcmVudE5vZGUgIT0gbnVsbCA/IHRhcmdldC5wYXJlbnROb2RlIDogc3RvcENhbGxiYWNrKHRhcmdldCkgPyBudWxsIDogdGFyZ2V0LnRpbGUgIT0gbnVsbCA/IHRhcmdldC50aWxlIDogKChyZWYgPSB0YXJnZXQuZGlzcGxheSkgIT0gbnVsbCA/IHJlZi5nZXQoMCkucGFyZW50Tm9kZSA6IHZvaWQgMCkgIT0gbnVsbCA/IHRhcmdldC5kaXNwbGF5LmdldCgwKS5wYXJlbnROb2RlIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICB9O1xuXG4gIFBsYXllckNvbnRyb2xsZXIucHJvcGVydGllcyh7XG4gICAgcGxheWVyOiB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBnYW1lRGlzcGxheToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURpc3BsYXkpIHtcbiAgICAgICAgICAkKHRoaXMuZ2FtZURpc3BsYXkpLm9uKCdjbGljaycsIHRoaXMuY2FsbGJhY2soJ2NoZWNrVGFyZ2V0T3JTZWxlY3RhYmxlJykpO1xuICAgICAgICAgIHJldHVybiAkKHRoaXMuZ2FtZURpc3BsYXkpLm9uKCdtb3VzZW92ZXInLCB0aGlzLmNhbGxiYWNrKCdjaGVja0ZvY3VzJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUGxheWVyQ29udHJvbGxlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9QbGF5ZXJDb250cm9sbGVyLmpzLm1hcFxuIiwidmFyIERpc3BsYXksIERvbVVwZGF0ZXIsIFBsYXllclNlbGVjdGlvbkluZm87XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclNlbGVjdGlvbkluZm8gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBsYXllclNlbGVjdGlvbkluZm8gZXh0ZW5kcyBEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnc2VsZWN0aW9uSW5mbyc7XG4gICAgICB0aGlzLm5hbWU7XG4gICAgICB0aGlzLmdhbWU7XG4gICAgICB0aGlzLmFjdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdHMoKSB7XG4gICAgICBpZiAoIXRoaXMuZGlzcGxheUNvbnRhaW5lciAmJiB0aGlzLmdhbWUubWFpblVJKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheUNvbnRhaW5lciA9IHRoaXMuZ2FtZS5tYWluVUk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucGxheWVyICYmIHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllciA9IHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFBsYXllclNlbGVjdGlvbkluZm8ucHJvcGVydGllcyh7XG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvciwgb3ZlcnJpZGVkKSB7XG4gICAgICAgIHZhciBkaXY7XG4gICAgICAgIGRpdiA9IG92ZXJyaWRlZCgpO1xuICAgICAgICBkaXYuaHRtbCgnPGRpdiBjbGFzcz1cIm5hbWVcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj5BY3Rpb25zIDo8L3NwYW4+PHVsPjwvdWw+PC9kaXY+Jyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgICB9XG4gICAgfSxcbiAgICBwbGF5ZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHNlbGVjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoXCJwbGF5ZXIuc2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBzZWw7XG4gICAgICAgIHNlbCA9IGludmFsaWRhdG9yLnByb3AoXCJzZWxlY3Rpb25cIik7XG4gICAgICAgIGlmIChzZWwgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKFwibmFtZVwiLCBzZWwpIHx8IHNlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmZpbmQoXCIubmFtZVwiKS50ZXh0KHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhY3Rpb25zOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoXCJwbGF5ZXIuYXZhaWxhYmxlQWN0aW9uc1wiKSB8fCBbXTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGlzdDtcbiAgICAgICAgbGlzdCA9IHRoaXMuZGlzcGxheS5maW5kKFwiLmFjdGlvbnMgdWxcIik7XG4gICAgICAgIGxpc3QuZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICAgICAgICB2YXIgZGlzcGxheSwgbmFtZTtcbiAgICAgICAgICBuYW1lID0gYWN0aW9uLm5hbWUgfHwgYWN0aW9uLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgZGlzcGxheSA9ICQoJzxsaT4nICsgbmFtZSArICc8L2xpPicpO1xuICAgICAgICAgIGRpc3BsYXkub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIuc2VsZWN0QWN0aW9uKGFjdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGxpc3QuYXBwZW5kKGRpc3BsYXkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdhbWU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQbGF5ZXJTZWxlY3Rpb25JbmZvO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1BsYXllclNlbGVjdGlvbkluZm8uanMubWFwXG4iLCJ2YXIgQmFzZVByb2plY3RpbGUsIERpc3BsYXksIFByb2plY3RpbGUsIFVwZGF0ZXI7XG5cbkJhc2VQcm9qZWN0aWxlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlByb2plY3RpbGU7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuVXBkYXRlciA9IHJlcXVpcmUoJy4vVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RpbGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFByb2plY3RpbGUgZXh0ZW5kcyBCYXNlUHJvamVjdGlsZSB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdwcm9qZWN0aWxlJztcbiAgICAgIHJldHVybiB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3lEaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgUHJvamVjdGlsZS5leHRlbmQoRGlzcGxheSk7XG5cbiAgUHJvamVjdGlsZS5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2NvbnRhaW5lcicpO1xuICAgICAgICBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ3RpbGVEaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgndGlsZURpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdkaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnZGlzcGxheScsIGNvbnRhaW5lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ29yaWdpblRpbGUnKS5kaXNwbGF5Q29udGFpbmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpblRpbGUudGlsZVRvRGlzcGxheVgoaW52YWxpZGF0ZS5wcm9wQnlOYW1lKCd4JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5UaWxlLnRpbGVUb0Rpc3BsYXlZKGludmFsaWRhdGUucHJvcEJ5TmFtZSgneScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQcm9qZWN0aWxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1Byb2plY3RpbGUuanMubWFwXG4iLCJ2YXIgQmFzZVNoaXAsIERpc3BsYXksIERvbVVwZGF0ZXIsIFNoaXA7XG5cbkJhc2VTaGlwID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNoaXA7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXAgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFNoaXAgZXh0ZW5kcyBCYXNlU2hpcCB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdzaGlwJztcbiAgICAgIHJldHVybiBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcC5leHRlbmQoRGlzcGxheSk7XG5cbiAgU2hpcC5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wUGF0aCgnbG9jYXRpb24uZGlzcGxheUNvbnRhaW5lcicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKCdsb2NhdGlvbi54Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ2xvY2F0aW9uLnknKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yYml0aW5nOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0cmF2ZWwnKSA9PT0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmICh0aGlzLm9yYml0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKFwib3JiaXRpbmdcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3MoXCJvcmJpdGluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2hpcDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TaGlwLmpzLm1hcFxuIiwidmFyIERlZmF1bHRHZW5lcmF0b3IsIERvb3IsIFNoaXBJbnRlcmlvciwgVGlsZSwgVGlsZUNvbnRhaW5lcjtcblxuVGlsZSA9IHJlcXVpcmUoJy4vVGlsZScpO1xuXG5UaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLnRpbGVzLlRpbGVDb250YWluZXI7XG5cbkRlZmF1bHRHZW5lcmF0b3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuUm9vbUdlbmVyYXRvcjtcblxuRG9vciA9IHJlcXVpcmUoJy4vQXV0b21hdGljRG9vcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXBJbnRlcmlvciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU2hpcEludGVyaW9yIGV4dGVuZHMgVGlsZUNvbnRhaW5lciB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlDb250YWluZXI7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdHMoKSB7XG4gICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGFpbmVyID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29udGFpbmVyID0gdGhpcy5nYW1lLm1haW5WaWV3LmNvbnRlbnREaXNwbGF5O1xuICAgICAgfVxuICAgICAgaWYgKCEodGhpcy50aWxlcy5sZW5ndGggPiAwKSkge1xuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5tYWluVGlsZUNvbnRhaW5lciA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUoZ2VuZXJhdG9yKSB7XG4gICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IgfHwgKG5ldyBTaGlwSW50ZXJpb3IuR2VuZXJhdG9yKCkpLnRhcChmdW5jdGlvbigpIHt9KTtcbiAgICAgIHJldHVybiBnZW5lcmF0b3IuZ2V0VGlsZXMoKS5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFRpbGUodGlsZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfTtcblxuICBTaGlwSW50ZXJpb3IucHJvcGVydGllcyh7XG4gICAgY29udGFpbmVyOiB7fSxcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2NvbnRhaW5lcicpO1xuICAgICAgICBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ2NvbnRlbnREaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmNvbnRlbnREaXNwbGF5O1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdkaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmRpc3BsYXk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFwcGVuZFRvKHRoaXMuZGlzcGxheUNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXNwbGF5O1xuICAgICAgICBkaXNwbGF5ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKS5hZGRDbGFzcygnc2hpcCcpO1xuICAgICAgICBkaXNwbGF5LmdldCgwKS5fcGFyYWxsZWxpb19vYmogPSB0aGlzO1xuICAgICAgICByZXR1cm4gZGlzcGxheTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdhbWU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTaGlwSW50ZXJpb3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cblNoaXBJbnRlcmlvci5HZW5lcmF0b3IgPSBjbGFzcyBHZW5lcmF0b3IgZXh0ZW5kcyBEZWZhdWx0R2VuZXJhdG9yIHtcbiAgd2FsbEZhY3Rvcnkob3B0KSB7XG4gICAgcmV0dXJuIChuZXcgVGlsZShvcHQueCwgb3B0LnkpKS50YXAoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNscyA9ICd3YWxsJztcbiAgICAgIHJldHVybiB0aGlzLndhbGthYmxlID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBmbG9vckZhY3Rvcnkob3B0KSB7XG4gICAgcmV0dXJuIG5ldyBUaWxlLkZsb29yKG9wdC54LCBvcHQueSk7XG4gIH1cblxuICBkb29yRmFjdG9yeShvcHQpIHtcbiAgICByZXR1cm4gKG5ldyBUaWxlLkZsb29yKG9wdC54LCBvcHQueSkpLnRhcChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZENoaWxkKG5ldyBEb29yKHtcbiAgICAgICAgZGlyZWN0aW9uOiBvcHQuZGlyZWN0aW9uXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TaGlwSW50ZXJpb3IuanMubWFwXG4iLCJ2YXIgQmFzZVdlYXBvbiwgRGFtYWdlYWJsZSwgRG9tVXBkYXRlciwgUHJvamVjdGlsZSwgU2hpcFdlYXBvbiwgVGlsZWQ7XG5cblRpbGVkID0gcmVxdWlyZSgnLi9UaWxlZCcpO1xuXG5Qcm9qZWN0aWxlID0gcmVxdWlyZSgnLi9Qcm9qZWN0aWxlJyk7XG5cbkRhbWFnZWFibGUgPSByZXF1aXJlKCcuL0RhbWFnZWFibGUnKTtcblxuQmFzZVdlYXBvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5TaGlwV2VhcG9uO1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcFdlYXBvbiA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU2hpcFdlYXBvbiBleHRlbmRzIEJhc2VXZWFwb24ge1xuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGlvbikge1xuICAgICAgc3VwZXIoZGlyZWN0aW9uKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICd3ZWFwb24nO1xuICAgIH1cblxuICB9O1xuXG4gIFNoaXBXZWFwb24uZXh0ZW5kKFRpbGVkKTtcblxuICBTaGlwV2VhcG9uLmV4dGVuZChEYW1hZ2VhYmxlKTtcblxuICBTaGlwV2VhcG9uLnByb3BlcnRpZXMoe1xuICAgIGRpcmVjdGlvbjoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyhvbGQubmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbi5uYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5kaXJlY3Rpb24ubmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgcHJvamVjdGlsZUNsYXNzOiB7XG4gICAgICBkZWZhdWx0OiBQcm9qZWN0aWxlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2hpcFdlYXBvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TaGlwV2VhcG9uLmpzLm1hcFxuIiwidmFyIEJhc2VTdGFyTWFwR2VuZXJhdG9yLCBNYXAsIFN0YXJNYXBHZW5lcmF0b3IsIFN0YXJTeXN0ZW07XG5cbkJhc2VTdGFyTWFwR2VuZXJhdG9yID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlN0YXJNYXBHZW5lcmF0b3I7XG5cbk1hcCA9IHJlcXVpcmUoJy4vTWFwJyk7XG5cblN0YXJTeXN0ZW0gPSByZXF1aXJlKCcuL1N0YXJTeXN0ZW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFyTWFwR2VuZXJhdG9yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTdGFyTWFwR2VuZXJhdG9yIGV4dGVuZHMgQmFzZVN0YXJNYXBHZW5lcmF0b3Ige307XG5cbiAgU3Rhck1hcEdlbmVyYXRvci5wcm90b3R5cGUuZGVmT3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgQmFzZVN0YXJNYXBHZW5lcmF0b3IucHJvdG90eXBlLmRlZk9wdCwge1xuICAgIG1hcENsYXNzOiBNYXAsXG4gICAgc3RhckNsYXNzOiBTdGFyU3lzdGVtLFxuICAgIGxpbmtDbGFzczogU3RhclN5c3RlbS5MaW5rXG4gIH0pO1xuXG4gIHJldHVybiBTdGFyTWFwR2VuZXJhdG9yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1N0YXJNYXBHZW5lcmF0b3IuanMubWFwXG4iLCJ2YXIgQmFzZVN0YXJTeXN0ZW0sIERpc3BsYXksIFN0YXJTeXN0ZW07XG5cbkJhc2VTdGFyU3lzdGVtID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlN0YXJTeXN0ZW07XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFyU3lzdGVtID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTdGFyU3lzdGVtIGV4dGVuZHMgQmFzZVN0YXJTeXN0ZW0ge1xuICAgIGluaXQoKSB7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnc3Rhcic7XG4gICAgICByZXR1cm4gc3VwZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIGRyYXcobWFwLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgY29udGV4dC5saW5lV2lkdGggPSAxLjU7XG4gICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCIjMzM2XCI7XG4gICAgICBjb250ZXh0LmFyYyh0aGlzLnggLSBtYXAuYm91bmRhcmllcy5sZWZ0ICsgbWFwLnN0YXJNYXJnaW4sIHRoaXMueSAtIG1hcC5ib3VuZGFyaWVzLnRvcCArIG1hcC5zdGFyTWFyZ2luLCBtYXAuc3Rhck1hcmdpbiwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgIHJldHVybiB0aGlzLmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgICAgaWYgKGxpbmsuc3RhcjEgPT09IHRoaXMpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIGxpbmsuZHJhdyA9PT0gXCJmdW5jdGlvblwiID8gbGluay5kcmF3KG1hcCwgY29udGV4dCkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9O1xuXG4gIFN0YXJTeXN0ZW0uZXh0ZW5kKERpc3BsYXkpO1xuXG4gIFN0YXJTeXN0ZW0ucHJvcGVydGllcyh7XG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ3gnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXlZOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd5Jyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU3RhclN5c3RlbTtcblxufSkuY2FsbCh0aGlzKTtcblxuU3RhclN5c3RlbS5MaW5rID0gY2xhc3MgTGluayBleHRlbmRzIEJhc2VTdGFyU3lzdGVtLkxpbmsge1xuICBkcmF3KG1hcCwgY29udGV4dCkge1xuICAgIHZhciBkaXN0LCB4MSwgeDIsIHhEaXN0LCB5MSwgeTIsIHlEaXN0O1xuICAgIHhEaXN0ID0gdGhpcy5zdGFyMi54IC0gdGhpcy5zdGFyMS54O1xuICAgIHlEaXN0ID0gdGhpcy5zdGFyMi55IC0gdGhpcy5zdGFyMS55O1xuICAgIGRpc3QgPSBNYXRoLnNxcnQoKHhEaXN0ICogeERpc3QpICsgKHlEaXN0ICogeURpc3QpKTtcbiAgICB4MSA9IHRoaXMuc3RhcjEueCArIG1hcC5zdGFyTWFyZ2luICogeERpc3QgLyBkaXN0IC0gbWFwLmJvdW5kYXJpZXMubGVmdCArIG1hcC5zdGFyTWFyZ2luO1xuICAgIHkxID0gdGhpcy5zdGFyMS55ICsgbWFwLnN0YXJNYXJnaW4gKiB5RGlzdCAvIGRpc3QgLSBtYXAuYm91bmRhcmllcy50b3AgKyBtYXAuc3Rhck1hcmdpbjtcbiAgICB4MiA9IHRoaXMuc3RhcjIueCAtIG1hcC5zdGFyTWFyZ2luICogeERpc3QgLyBkaXN0IC0gbWFwLmJvdW5kYXJpZXMubGVmdCArIG1hcC5zdGFyTWFyZ2luO1xuICAgIHkyID0gdGhpcy5zdGFyMi55IC0gbWFwLnN0YXJNYXJnaW4gKiB5RGlzdCAvIGRpc3QgLSBtYXAuYm91bmRhcmllcy50b3AgKyBtYXAuc3Rhck1hcmdpbjtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gMTtcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCIjMzM2XCI7XG4gICAgY29udGV4dC5tb3ZlVG8oeDEsIHkxKTtcbiAgICBjb250ZXh0LmxpbmVUbyh4MiwgeTIpO1xuICAgIHJldHVybiBjb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvU3RhclN5c3RlbS5qcy5tYXBcbiIsInZhciBCYXNlRmxvb3IsIEJhc2VUaWxlLCBEaXNwbGF5LCBUaWxlO1xuXG5CYXNlVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS50aWxlcy5UaWxlO1xuXG5CYXNlRmxvb3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuRmxvb3I7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaWxlIGV4dGVuZHMgQmFzZVRpbGUge1xuICAgIGluaXQoKSB7XG4gICAgICBzdXBlci5pbml0KCk7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAndGlsZSc7XG4gICAgICByZXR1cm4gdGhpcy5pbml0RGlzcGxheSgpO1xuICAgIH1cblxuICAgIHRpbGVUb0Rpc3BsYXlYKHgpIHtcbiAgICAgIHJldHVybiB4ICogVGlsZS5zaXplO1xuICAgIH1cblxuICAgIHRpbGVUb0Rpc3BsYXlZKHkpIHtcbiAgICAgIHJldHVybiB5ICogVGlsZS5zaXplO1xuICAgIH1cblxuICB9O1xuXG4gIFRpbGUuZXh0ZW5kKERpc3BsYXkpO1xuXG4gIFRpbGUuc2l6ZSA9IDIwO1xuXG4gIFRpbGUucHJvcGVydGllcyh7XG4gICAgY29udGFpbmVyOiB7fSxcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2NvbnRhaW5lcicpO1xuICAgICAgICBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ3RpbGVEaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgndGlsZURpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdkaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnZGlzcGxheScsIGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXlYOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVUb0Rpc3BsYXlYKGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ3gnKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlVG9EaXNwbGF5WShpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd5JykpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbGU7XG5cbn0pLmNhbGwodGhpcyk7XG5cblRpbGUuRmxvb3IgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEZsb29yIGV4dGVuZHMgQmFzZUZsb29yIHtcbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3RpbGUnO1xuICAgICAgcmV0dXJuIHRoaXMuY2xzID0gJ2Zsb29yJztcbiAgICB9XG5cbiAgfTtcblxuICBGbG9vci5leHRlbmQoVGlsZSk7XG5cbiAgcmV0dXJuIEZsb29yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1RpbGUuanMubWFwXG4iLCJ2YXIgQmFzZVRpbGVkLCBEaXNwbGF5LCBUaWxlZDtcblxuQmFzZVRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLnRpbGVzLlRpbGVkO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZWQgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFRpbGVkIGV4dGVuZHMgQmFzZVRpbGVkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgVGlsZWQuZXh0ZW5kKERpc3BsYXkpO1xuXG4gIFRpbGVkLnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXlDb250YWluZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHRpbGU7XG4gICAgICAgIHRpbGUgPSBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0aWxlJyk7XG4gICAgICAgIGlmICh0aWxlICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnZGlzcGxheUNvbnRhaW5lcicsIHRpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgdGlsZTtcbiAgICAgICAgdGlsZSA9IGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ3RpbGUnKTtcbiAgICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aWxlLmRpc3BsYXlYICsgdGlsZS50aWxlVG9EaXNwbGF5WChpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCdvZmZzZXRYJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgdGlsZTtcbiAgICAgICAgdGlsZSA9IGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ3RpbGUnKTtcbiAgICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aWxlLmRpc3BsYXlZICsgdGlsZS50aWxlVG9EaXNwbGF5WShpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCdvZmZzZXRZJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVGlsZWQ7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvVGlsZWQuanMubWFwXG4iLCJ2YXIgQmFzZVVwZGF0ZXIsIFVwZGF0ZXI7XG5cbkJhc2VVcGRhdGVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNwYXJrLlVwZGF0ZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlciA9IGNsYXNzIFVwZGF0ZXIgZXh0ZW5kcyBCYXNlVXBkYXRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51cGRhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG4gICAgdGhpcy5iaW5kZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBzdXBlci51cGRhdGUoKTtcbiAgICB0aGlzLmJpbmRlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNhbGxiYWNrcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RnJhbWUoKTtcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RnJhbWUoKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzLmJpbmRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICBzdXBlci5hZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdEZyYW1lKCk7XG4gIH1cblxufTtcblxuVXBkYXRlci5pbnN0YW5jZSA9IG5ldyBVcGRhdGVyKCk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvVXBkYXRlci5qcy5tYXBcbiIsInZhciBCYXNlVmlldywgRGlzcGxheSwgRG9tVXBkYXRlciwgVmlldztcblxuQmFzZVZpZXcgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuVmlldztcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlldyA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihkaXNwbGF5ID0gbnVsbCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIGlmIChkaXNwbGF5ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaG92ZXJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5rZXlzSW50ZXJ2YWwgPSB7fTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICd2aWV3JztcbiAgICAgIHRoaXMuYm91bmRzU3R5bGVzO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgc3VwZXIuc2V0RGVmYXVsdHMoKTtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Q29udGFpbmVyID0gJCgnYm9keScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1vdXNlRW50ZXIoKSB7XG4gICAgICB0aGlzLmhvdmVyZWQgPSB0cnVlO1xuICAgICAgJCgnYm9keScpLmtleWRvd24odGhpcy5jYWxsYmFjaygna2V5RG93bicpKTtcbiAgICAgIHJldHVybiAkKCdib2R5Jykua2V5dXAodGhpcy5jYWxsYmFjaygna2V5VXAnKSk7XG4gICAgfVxuXG4gICAgbW91c2VMZWF2ZSgpIHtcbiAgICAgIHZhciBjb2RlLCBpbnRlcnZhbCwgcmVmLCByZXN1bHRzO1xuICAgICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XG4gICAgICAkKCdib2R5Jykub2ZmKCdrZXlkb3duJywgdGhpcy5jYWxsYmFjaygna2V5RG93bicpKTtcbiAgICAgICQoJ2JvZHknKS5vZmYoJ2tleXVwJywgdGhpcy5jYWxsYmFjaygna2V5VXAnKSk7XG4gICAgICByZWYgPSB0aGlzLmtleXNJbnRlcnZhbDtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoY29kZSBpbiByZWYpIHtcbiAgICAgICAgaW50ZXJ2YWwgPSByZWZbY29kZV07XG4gICAgICAgIHJlc3VsdHMucHVzaChjbGVhckludGVydmFsKGludGVydmFsKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBrZXlEb3duKGUpIHtcbiAgICAgIHZhciBrZXk7XG4gICAgICBpZiAoVmlldy5kaXJlY3Rpb25rZXlzW2Uud2hpY2hdICE9IG51bGwpIHtcbiAgICAgICAga2V5ID0gVmlldy5kaXJlY3Rpb25rZXlzW2Uud2hpY2hdO1xuICAgICAgICBpZiAodGhpcy5rZXlzSW50ZXJ2YWxba2V5Lm5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMua2V5c0ludGVydmFsW2tleS5uYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c0ludGVydmFsW2tleS5uYW1lXSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnggKz0ga2V5LnggKiAyO1xuICAgICAgICAgIHJldHVybiB0aGlzLnkgKz0ga2V5LnkgKiAyO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAga2V5VXAoZSkge1xuICAgICAgdmFyIGtleTtcbiAgICAgIGlmIChWaWV3LmRpcmVjdGlvbmtleXNbZS53aGljaF0gIT0gbnVsbCkge1xuICAgICAgICBrZXkgPSBWaWV3LmRpcmVjdGlvbmtleXNbZS53aGljaF07XG4gICAgICAgIGlmICh0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBjbGVhckludGVydmFsKHRoaXMua2V5c0ludGVydmFsW2tleS5uYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEaXNwbGF5UG9zKCkge1xuICAgICAgcmV0dXJuICQoJy52aWV3Q29udGVudCcsIHRoaXMuZGlzcGxheSkuY3NzKHtcbiAgICAgICAgbGVmdDogdGhpcy54ICsgJ3B4JyxcbiAgICAgICAgdG9wOiB0aGlzLnkgKyAncHgnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250YWluc1BvaW50KHgsIHkpIHtcbiAgICAgIHZhciBjb250YWluZXI7XG4gICAgICBjb250YWluZXIgPSB0aGlzLmRpc3BsYXlbMF07XG4gICAgICB3aGlsZSAoY29udGFpbmVyKSB7XG4gICAgICAgIHggLT0gY29udGFpbmVyLm9mZnNldExlZnQ7XG4gICAgICAgIHkgLT0gY29udGFpbmVyLm9mZnNldFRvcDtcbiAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLm9mZnNldFBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoMCA8PSB4ICYmIHggPD0gdGhpcy5kaXNwbGF5LndpZHRoKCkpICYmICgwIDw9IHkgJiYgeSA8PSB0aGlzLmRpc3BsYXkuaGVpZ2h0KCkpO1xuICAgIH1cblxuICB9O1xuXG4gIFZpZXcuZXh0ZW5kKERpc3BsYXkpO1xuXG4gIFZpZXcuZGlyZWN0aW9ua2V5cyA9IHtcbiAgICAzODoge1xuICAgICAgbmFtZTogJ3RvcCcsXG4gICAgICB4OiAwLFxuICAgICAgeTogMVxuICAgIH0sXG4gICAgMzk6IHtcbiAgICAgIG5hbWU6ICdyaWdodCcsXG4gICAgICB4OiAtMSxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIDQwOiB7XG4gICAgICBuYW1lOiAnYm90dG9tJyxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAtMVxuICAgIH0sXG4gICAgMzc6IHtcbiAgICAgIG5hbWU6ICdsZWZ0JyxcbiAgICAgIHg6IDEsXG4gICAgICB5OiAwXG4gICAgfVxuICB9O1xuXG4gIFZpZXcucHJvcGVydGllcyh7XG4gICAgeDoge1xuICAgICAgZGVmYXVsdDogMCxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZURpc3BsYXlQb3MoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHk6IHtcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVEaXNwbGF5UG9zKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yLCBvcmlnaW5hbCkge1xuICAgICAgICB2YXIgZGlzcGxheTtcbiAgICAgICAgZGlzcGxheSA9IG9yaWdpbmFsKCk7XG4gICAgICAgIGlmICgkKCcudmlld0NvbnRlbnQnLCBkaXNwbGF5KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkKGRpc3BsYXkpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInZpZXdDb250ZW50XCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJChkaXNwbGF5KS5tb3VzZWVudGVyKHRoaXMuY2FsbGJhY2soJ21vdXNlRW50ZXInKSk7XG4gICAgICAgIHJldHVybiAkKGRpc3BsYXkpLm1vdXNlbGVhdmUodGhpcy5jYWxsYmFjaygnbW91c2VMZWF2ZScpKTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVEaXNwbGF5UG9zKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjb250ZW50RGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICQoJy52aWV3Q29udGVudCcsIHRoaXMuZGlzcGxheSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBib3VuZHNTdHlsZXM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IGludmFsaWRhdG9yLnByb3BQYXRoKCdib3VuZHMudG9wJykgKiAxMDAgKyAnJScsXG4gICAgICAgICAgbGVmdDogaW52YWxpZGF0b3IucHJvcFBhdGgoJ2JvdW5kcy5sZWZ0JykgKiAxMDAgKyAnJScsXG4gICAgICAgICAgYm90dG9tOiAoMSAtIGludmFsaWRhdG9yLnByb3BQYXRoKCdib3VuZHMuYm90dG9tJykpICogMTAwICsgJyUnLFxuICAgICAgICAgIHJpZ2h0OiAoMSAtIGludmFsaWRhdG9yLnByb3BQYXRoKCdib3VuZHMucmlnaHQnKSkgKiAxMDAgKyAnJSdcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuY3NzKHRoaXMuYm91bmRzU3R5bGVzKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBWaWV3O1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1ZpZXcuanMubWFwXG4iLCJ2YXIgQmFzZVdpcmUsIERvbVVwZGF0ZXIsIFRpbGVkLCBXaXJlO1xuXG5UaWxlZCA9IHJlcXVpcmUoJy4vVGlsZWQnKTtcblxuQmFzZVdpcmUgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykud2lyaW5nLldpcmU7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXaXJlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBXaXJlIGV4dGVuZHMgQmFzZVdpcmUge1xuICAgIGNvbnN0cnVjdG9yKHdpcmVUeXBlKSB7XG4gICAgICBzdXBlcih3aXJlVHlwZSk7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnd2lyZSc7XG4gICAgICB0aGlzLmNvbm5lY3RlZERpcmVjdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NGcm9tRGlyZWN0aW9uKGQpIHtcbiAgICAgIHJldHVybiAnY29ubicgKyBkLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkLm5hbWUuc2xpY2UoMSk7XG4gICAgfVxuXG4gIH07XG5cbiAgV2lyZS5leHRlbmQoVGlsZWQpO1xuXG4gIFdpcmUucHJvcGVydGllcyh7XG4gICAgY29ubmVjdGVkRGlyZWN0aW9uczoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICBpZiAob2xkKSB7XG4gICAgICAgICAgICBvbGQuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LnJlbW92ZUNsYXNzKHRoaXMuZ2V0Q2xhc3NGcm9tRGlyZWN0aW9uKGQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0ZWREaXJlY3Rpb25zLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5nZXRDbGFzc0Zyb21EaXJlY3Rpb24oZCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgd2lyZVR5cGU6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnJlbW92ZUNsYXNzKG9sZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy53aXJlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gV2lyZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9XaXJlLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQXV0b21hdGljRG9vclwiOiByZXF1aXJlKFwiLi9BdXRvbWF0aWNEb29yXCIpLFxuICBcIkNoYXJhY3RlclwiOiByZXF1aXJlKFwiLi9DaGFyYWN0ZXJcIiksXG4gIFwiRGFtYWdlYWJsZVwiOiByZXF1aXJlKFwiLi9EYW1hZ2VhYmxlXCIpLFxuICBcIkRpc3BsYXlcIjogcmVxdWlyZShcIi4vRGlzcGxheVwiKSxcbiAgXCJEb21VcGRhdGVyXCI6IHJlcXVpcmUoXCIuL0RvbVVwZGF0ZXJcIiksXG4gIFwiRG9vclwiOiByZXF1aXJlKFwiLi9Eb29yXCIpLFxuICBcIkdhbWVcIjogcmVxdWlyZShcIi4vR2FtZVwiKSxcbiAgXCJNYXBcIjogcmVxdWlyZShcIi4vTWFwXCIpLFxuICBcIlBsYXllckNvbnRyb2xsZXJcIjogcmVxdWlyZShcIi4vUGxheWVyQ29udHJvbGxlclwiKSxcbiAgXCJQbGF5ZXJTZWxlY3Rpb25JbmZvXCI6IHJlcXVpcmUoXCIuL1BsYXllclNlbGVjdGlvbkluZm9cIiksXG4gIFwiUHJvamVjdGlsZVwiOiByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlXCIpLFxuICBcIlNoaXBcIjogcmVxdWlyZShcIi4vU2hpcFwiKSxcbiAgXCJTaGlwSW50ZXJpb3JcIjogcmVxdWlyZShcIi4vU2hpcEludGVyaW9yXCIpLFxuICBcIlNoaXBXZWFwb25cIjogcmVxdWlyZShcIi4vU2hpcFdlYXBvblwiKSxcbiAgXCJTdGFyTWFwR2VuZXJhdG9yXCI6IHJlcXVpcmUoXCIuL1N0YXJNYXBHZW5lcmF0b3JcIiksXG4gIFwiU3RhclN5c3RlbVwiOiByZXF1aXJlKFwiLi9TdGFyU3lzdGVtXCIpLFxuICBcIlRpbGVcIjogcmVxdWlyZShcIi4vVGlsZVwiKSxcbiAgXCJUaWxlZFwiOiByZXF1aXJlKFwiLi9UaWxlZFwiKSxcbiAgXCJVcGRhdGVyXCI6IHJlcXVpcmUoXCIuL1VwZGF0ZXJcIiksXG4gIFwiVmlld1wiOiByZXF1aXJlKFwiLi9WaWV3XCIpLFxuICBcIldpcmVcIjogcmVxdWlyZShcIi4vV2lyZVwiKSxcbn0iLCJ2YXIgUGFyYWxsZWxpbywgbGlicztcblxubGlicyA9IHJlcXVpcmUoJy4vbGlicycpO1xuXG5QYXJhbGxlbGlvID0gcmVxdWlyZSgncGFyYWxsZWxpbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sIFBhcmFsbGVsaW8sIHtcbiAgRE9NOiBsaWJzXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9wYXJhbGxlbGlvLWRvbS5qcy5tYXBcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCBvYmplY3RDcmVhdGVQb2x5ZmlsbFxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBvYmplY3RLZXlzUG9seWZpbGxcbnZhciBiaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgZnVuY3Rpb25CaW5kUG9seWZpbGxcblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfZXZlbnRzJykpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxudmFyIGhhc0RlZmluZVByb3BlcnR5O1xudHJ5IHtcbiAgdmFyIG8gPSB7fTtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sICd4JywgeyB2YWx1ZTogMCB9KTtcbiAgaGFzRGVmaW5lUHJvcGVydHkgPSBvLnggPT09IDA7XG59IGNhdGNoIChlcnIpIHsgaGFzRGVmaW5lUHJvcGVydHkgPSBmYWxzZSB9XG5pZiAoaGFzRGVmaW5lUHJvcGVydHkpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgICAgLy8gY2hlY2sgd2hldGhlciB0aGUgaW5wdXQgaXMgYSBwb3NpdGl2ZSBudW1iZXIgKHdob3NlIHZhbHVlIGlzIHplcm8gb3JcbiAgICAgIC8vIGdyZWF0ZXIgYW5kIG5vdCBhIE5hTikuXG4gICAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBhcmcgIT09IGFyZylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICAgICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBkZWZhdWx0TWF4TGlzdGVuZXJzO1xufVxuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiblwiIGFyZ3VtZW50IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuLy8gVGhlc2Ugc3RhbmRhbG9uZSBlbWl0KiBmdW5jdGlvbnMgYXJlIHVzZWQgdG8gb3B0aW1pemUgY2FsbGluZyBvZiBldmVudFxuLy8gaGFuZGxlcnMgZm9yIGZhc3QgY2FzZXMgYmVjYXVzZSBlbWl0KCkgaXRzZWxmIG9mdGVuIGhhcyBhIHZhcmlhYmxlIG51bWJlciBvZlxuLy8gYXJndW1lbnRzIGFuZCBjYW4gYmUgZGVvcHRpbWl6ZWQgYmVjYXVzZSBvZiB0aGF0LiBUaGVzZSBmdW5jdGlvbnMgYWx3YXlzIGhhdmVcbi8vIHRoZSBzYW1lIG51bWJlciBvZiBhcmd1bWVudHMgYW5kIHRodXMgZG8gbm90IGdldCBkZW9wdGltaXplZCwgc28gdGhlIGNvZGVcbi8vIGluc2lkZSB0aGVtIGNhbiBleGVjdXRlIGZhc3Rlci5cbmZ1bmN0aW9uIGVtaXROb25lKGhhbmRsZXIsIGlzRm4sIHNlbGYpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZik7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRPbmUoaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJnMSkge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZiwgYXJnMSk7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmLCBhcmcxKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdFR3byhoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxLCBhcmcyKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxLCBhcmcyKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEsIGFyZzIpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0VGhyZWUoaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJnMSwgYXJnMiwgYXJnMykge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZiwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbWl0TWFueShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmdzKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuYXBwbHkoc2VsZiwgYXJncyk7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBldmVudHM7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cylcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09IG51bGwpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSlcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmICghaGFuZGxlcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGlzRm4gPSB0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJztcbiAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICBjYXNlIDE6XG4gICAgICBlbWl0Tm9uZShoYW5kbGVyLCBpc0ZuLCB0aGlzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGVtaXRPbmUoaGFuZGxlciwgaXNGbiwgdGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIGVtaXRUd28oaGFuZGxlciwgaXNGbiwgdGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgZW1pdFRocmVlKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICBkZWZhdWx0OlxuICAgICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICBlbWl0TWFueShoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKCFldmVudHMpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IG9iamVjdENyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmICghZXhpc3RpbmcpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgICAgaWYgKHByZXBlbmQpIHtcbiAgICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIGlmICghZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBtID0gJGdldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgICAgaWYgKG0gJiYgbSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSkge1xuICAgICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgXCInICsgU3RyaW5nKHR5cGUpICsgJ1wiIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQuJyk7XG4gICAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCclczogJXMnLCB3Lm5hbWUsIHcubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQsIGFyZ3VtZW50c1swXSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQsIGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCwgYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICBhcmd1bWVudHNbMl0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSlcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gYmluZC5jYWxsKG9uY2VXcmFwcGVyLCBzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKCFldmVudHMpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKCFsaXN0KVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG9iamVjdENyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKCFldmVudHMpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoIWV2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG9iamVjdENyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IG9iamVjdEtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG9iamVjdENyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoIWV2ZW50cylcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmICghZXZsaXN0ZW5lcilcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID8gdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0Lm93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuLy8gQWJvdXQgMS41eCBmYXN0ZXIgdGhhbiB0aGUgdHdvLWFyZyB2ZXJzaW9uIG9mIEFycmF5I3NwbGljZSgpLlxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSlcbiAgICBsaXN0W2ldID0gbGlzdFtrXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvYmplY3RDcmVhdGVQb2x5ZmlsbChwcm90bykge1xuICB2YXIgRiA9IGZ1bmN0aW9uKCkge307XG4gIEYucHJvdG90eXBlID0gcHJvdG87XG4gIHJldHVybiBuZXcgRjtcbn1cbmZ1bmN0aW9uIG9iamVjdEtleXNQb2x5ZmlsbChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIgayBpbiBvYmopIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrKSkge1xuICAgIGtleXMucHVzaChrKTtcbiAgfVxuICByZXR1cm4gaztcbn1cbmZ1bmN0aW9uIGZ1bmN0aW9uQmluZFBvbHlmaWxsKGNvbnRleHQpIHtcbiAgdmFyIGZuID0gdGhpcztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJ2YXIgbmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzL2Jyb3dzZXIuanMnKS5uZXh0VGljaztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpbW1lZGlhdGVJZHMgPSB7fTtcbnZhciBuZXh0SW1tZWRpYXRlSWQgPSAwO1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkgeyB0aW1lb3V0LmNsb3NlKCk7IH07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gVGhhdCdzIG5vdCBob3cgbm9kZS5qcyBpbXBsZW1lbnRzIGl0IGJ1dCB0aGUgZXhwb3NlZCBhcGkgaXMgdGhlIHNhbWUuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IGZ1bmN0aW9uKGZuKSB7XG4gIHZhciBpZCA9IG5leHRJbW1lZGlhdGVJZCsrO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZmFsc2UgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgaW1tZWRpYXRlSWRzW2lkXSA9IHRydWU7XG5cbiAgbmV4dFRpY2soZnVuY3Rpb24gb25OZXh0VGljaygpIHtcbiAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xuICAgICAgLy8gZm4uY2FsbCgpIGlzIGZhc3RlciBzbyB3ZSBvcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiB1c2UtY2FzZVxuICAgICAgLy8gQHNlZSBodHRwOi8vanNwZXJmLmNvbS9jYWxsLWFwcGx5LXNlZ3VcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uY2FsbChudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIFByZXZlbnQgaWRzIGZyb20gbGVha2luZ1xuICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaWQ7XG59O1xuXG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XG4gIGRlbGV0ZSBpbW1lZGlhdGVJZHNbaWRdO1xufTsiLCJ2YXIgRWxlbWVudCwgR3JpZCwgR3JpZENlbGwsIEdyaWRSb3c7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuR3JpZENlbGwgPSByZXF1aXJlKCcuL0dyaWRDZWxsJyk7XG5cbkdyaWRSb3cgPSByZXF1aXJlKCcuL0dyaWRSb3cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHcmlkIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgYWRkQ2VsbChjZWxsID0gbnVsbCkge1xuICAgICAgdmFyIHJvdywgc3BvdDtcbiAgICAgIGlmICghY2VsbCkge1xuICAgICAgICBjZWxsID0gbmV3IEdyaWRDZWxsKCk7XG4gICAgICB9XG4gICAgICBzcG90ID0gdGhpcy5nZXRGcmVlU3BvdCgpO1xuICAgICAgcm93ID0gdGhpcy5yb3dzLmdldChzcG90LnJvdyk7XG4gICAgICBpZiAoIXJvdykge1xuICAgICAgICByb3cgPSB0aGlzLmFkZFJvdygpO1xuICAgICAgfVxuICAgICAgcm93LmFkZENlbGwoY2VsbCk7XG4gICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG5cbiAgICBhZGRSb3cocm93ID0gbnVsbCkge1xuICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgcm93ID0gbmV3IEdyaWRSb3coKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucm93cy5wdXNoKHJvdyk7XG4gICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuICAgIGdldEZyZWVTcG90KCkge1xuICAgICAgdmFyIHNwb3Q7XG4gICAgICBzcG90ID0gbnVsbDtcbiAgICAgIHRoaXMucm93cy5zb21lKChyb3cpID0+IHtcbiAgICAgICAgaWYgKHJvdy5jZWxscy5sZW5ndGggPCB0aGlzLm1heENvbHVtbnMpIHtcbiAgICAgICAgICByZXR1cm4gc3BvdCA9IHtcbiAgICAgICAgICAgIHJvdzogcm93LnJvd1Bvc2l0aW9uLFxuICAgICAgICAgICAgY29sdW1uOiByb3cuY2VsbHMubGVuZ3RoXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIXNwb3QpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4Q29sdW1ucyA+IHRoaXMucm93cy5sZW5ndGgpIHtcbiAgICAgICAgICBzcG90ID0ge1xuICAgICAgICAgICAgcm93OiB0aGlzLnJvd3MubGVuZ3RoLFxuICAgICAgICAgICAgY29sdW1uOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcG90ID0ge1xuICAgICAgICAgICAgcm93OiAwLFxuICAgICAgICAgICAgY29sdW1uOiB0aGlzLm1heENvbHVtbnMgKyAxXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNwb3Q7XG4gICAgfVxuXG4gIH07XG5cbiAgR3JpZC5wcm9wZXJ0aWVzKHtcbiAgICByb3dzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgaXRlbUFkZGVkOiBmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgcmV0dXJuIHJvdy5ncmlkID0gdGhpcztcbiAgICAgIH0sXG4gICAgICBpdGVtUmVtb3ZlZDogZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIGlmIChyb3cuZ3JpZCA9PT0gdGhpcykge1xuICAgICAgICAgIHJldHVybiByb3cuZ3JpZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG1heENvbHVtbnM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHJvd3M7XG4gICAgICAgIHJvd3MgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMucm93c1Byb3BlcnR5KTtcbiAgICAgICAgcmV0dXJuIHJvd3MucmVkdWNlKGZ1bmN0aW9uKG1heCwgcm93KSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1heCwgaW52YWxpZGF0b3IucHJvcChyb3cuY2VsbHNQcm9wZXJ0eSkubGVuZ3RoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gR3JpZDtcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBFbGVtZW50LCBHcmlkQ2VsbDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRDZWxsID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHcmlkQ2VsbCBleHRlbmRzIEVsZW1lbnQge307XG5cbiAgR3JpZENlbGwucHJvcGVydGllcyh7XG4gICAgZ3JpZDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ2dyaWQucm93Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICByb3c6IHt9LFxuICAgIGNvbHVtblBvc2l0aW9uOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciByb3c7XG4gICAgICAgIHJvdyA9IGludmFsaWRhdG9yLnByb3AodGhpcy5yb3dQcm9wZXJ0eSk7XG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcChyb3cuY2VsbHNQcm9wZXJ0eSkuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wUGF0aCgncm93LmNlbGxzJykubGVuZ3RoO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCh0aGlzLndpZHRoUHJvcGVydHkpICogaW52YWxpZGF0b3IucHJvcCh0aGlzLmNvbHVtblBvc2l0aW9uUHJvcGVydHkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AodGhpcy53aWR0aFByb3BlcnR5KSAqIChpbnZhbGlkYXRvci5wcm9wKHRoaXMuY29sdW1uUG9zaXRpb25Qcm9wZXJ0eSkgKyAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3Jvdy5oZWlnaHQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvcDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3Jvdy50b3AnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3Jvdy5ib3R0b20nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBHcmlkQ2VsbDtcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBFbGVtZW50LCBHcmlkQ2VsbCwgR3JpZFJvdztcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5HcmlkQ2VsbCA9IHJlcXVpcmUoJy4vR3JpZENlbGwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkUm93ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHcmlkUm93IGV4dGVuZHMgRWxlbWVudCB7XG4gICAgYWRkQ2VsbChjZWxsID0gbnVsbCkge1xuICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgIGNlbGwgPSBuZXcgR3JpZENlbGwoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2VsbHMucHVzaChjZWxsKTtcbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICB9O1xuXG4gIEdyaWRSb3cucHJvcGVydGllcyh7XG4gICAgZ3JpZDoge30sXG4gICAgY2VsbHM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWUsXG4gICAgICBpdGVtQWRkZWQ6IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgcmV0dXJuIGNlbGwucm93ID0gdGhpcztcbiAgICAgIH0sXG4gICAgICBpdGVtUmVtb3ZlZDogZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICBpZiAoY2VsbC5yb3cgPT09IHRoaXMpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yb3cgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByb3dQb3NpdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgZ3JpZDtcbiAgICAgICAgZ3JpZCA9IGludmFsaWRhdG9yLnByb3AodGhpcy5ncmlkUHJvcGVydHkpO1xuICAgICAgICBpZiAoZ3JpZCkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKGdyaWQucm93c1Byb3BlcnR5KS5pbmRleE9mKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wUGF0aCgnZ3JpZC5yb3dzJykubGVuZ3RoO1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9wOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHRoaXMuaGVpZ2h0UHJvcGVydHkpICogaW52YWxpZGF0b3IucHJvcCh0aGlzLnJvd1Bvc2l0aW9uUHJvcGVydHkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHRoaXMuaGVpZ2h0UHJvcGVydHkpICogKGludmFsaWRhdG9yLnByb3AodGhpcy5yb3dQb3NpdGlvblByb3BlcnR5KSArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEdyaWRSb3c7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJHcmlkXCI6IHJlcXVpcmUoXCIuL0dyaWRcIiksXG4gIFwiR3JpZENlbGxcIjogcmVxdWlyZShcIi4vR3JpZENlbGxcIiksXG4gIFwiR3JpZFJvd1wiOiByZXF1aXJlKFwiLi9HcmlkUm93XCIpLFxufSIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgUGF0aEZpbmRlcj1kZWZpbml0aW9uKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIj9QYXJhbGxlbGlvOnRoaXMuUGFyYWxsZWxpbyk7UGF0aEZpbmRlci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPVBhdGhGaW5kZXI7fWVsc2V7aWYodHlwZW9mIFBhcmFsbGVsaW8hPT1cInVuZGVmaW5lZFwiJiZQYXJhbGxlbGlvIT09bnVsbCl7UGFyYWxsZWxpby5QYXRoRmluZGVyPVBhdGhGaW5kZXI7fWVsc2V7aWYodGhpcy5QYXJhbGxlbGlvPT1udWxsKXt0aGlzLlBhcmFsbGVsaW89e307fXRoaXMuUGFyYWxsZWxpby5QYXRoRmluZGVyPVBhdGhGaW5kZXI7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cbnZhciBFbGVtZW50ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRWxlbWVudFwiKSA/IGRlcGVuZGVuY2llcy5FbGVtZW50IDogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG52YXIgUGF0aEZpbmRlcjtcblBhdGhGaW5kZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBhdGhGaW5kZXIgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0aWxlc0NvbnRhaW5lciwgZnJvbTEsIHRvMSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy50aWxlc0NvbnRhaW5lciA9IHRpbGVzQ29udGFpbmVyO1xuICAgICAgdGhpcy5mcm9tID0gZnJvbTE7XG4gICAgICB0aGlzLnRvID0gdG8xO1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgaWYgKG9wdGlvbnMudmFsaWRUaWxlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWxpZFRpbGVDYWxsYmFjayA9IG9wdGlvbnMudmFsaWRUaWxlO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuYXJyaXZlZCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYXJyaXZlZENhbGxiYWNrID0gb3B0aW9ucy5hcnJpdmVkO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuZWZmaWNpZW5jeSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZWZmaWNpZW5jeUNhbGxiYWNrID0gb3B0aW9ucy5lZmZpY2llbmN5O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgdGhpcy5wYXRocyA9IHt9O1xuICAgICAgdGhpcy5zb2x1dGlvbiA9IG51bGw7XG4gICAgICByZXR1cm4gdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2FsY3VsKCkge1xuICAgICAgd2hpbGUgKCF0aGlzLnNvbHV0aW9uICYmICghdGhpcy5zdGFydGVkIHx8IHRoaXMucXVldWUubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnN0ZXAoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmdldFBhdGgoKTtcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgbmV4dCA9IHRoaXMucXVldWUucG9wKCk7XG4gICAgICAgIHRoaXMuYWRkTmV4dFN0ZXBzKG5leHQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnRvID09PSBmYWxzZSB8fCB0aGlzLnRpbGVJc1ZhbGlkKHRoaXMudG8pKSB7XG4gICAgICAgIHRoaXMuYWRkTmV4dFN0ZXBzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhdGgoKSB7XG4gICAgICB2YXIgcmVzLCBzdGVwO1xuICAgICAgaWYgKHRoaXMuc29sdXRpb24pIHtcbiAgICAgICAgcmVzID0gW3RoaXMuc29sdXRpb25dO1xuICAgICAgICBzdGVwID0gdGhpcy5zb2x1dGlvbjtcbiAgICAgICAgd2hpbGUgKHN0ZXAucHJldiAhPSBudWxsKSB7XG4gICAgICAgICAgcmVzLnVuc2hpZnQoc3RlcC5wcmV2KTtcbiAgICAgICAgICBzdGVwID0gc3RlcC5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UG9zQXRQcmMocHJjKSB7XG4gICAgICBpZiAoaXNOYU4ocHJjKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbnVtYmVyJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zb2x1dGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQb3NBdFRpbWUodGhpcy5zb2x1dGlvbi5nZXRUb3RhbExlbmd0aCgpICogcHJjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3NBdFRpbWUodGltZSkge1xuICAgICAgdmFyIHByYywgc3RlcDtcbiAgICAgIGlmICh0aGlzLnNvbHV0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lID49IHRoaXMuc29sdXRpb24uZ2V0VG90YWxMZW5ndGgoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNvbHV0aW9uLnBvc1RvVGlsZU9mZnNldCh0aGlzLnNvbHV0aW9uLmdldEV4aXQoKS54LCB0aGlzLnNvbHV0aW9uLmdldEV4aXQoKS55KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGVwID0gdGhpcy5zb2x1dGlvbjtcbiAgICAgICAgICB3aGlsZSAoc3RlcC5nZXRTdGFydExlbmd0aCgpID4gdGltZSAmJiAoc3RlcC5wcmV2ICE9IG51bGwpKSB7XG4gICAgICAgICAgICBzdGVwID0gc3RlcC5wcmV2O1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcmMgPSAodGltZSAtIHN0ZXAuZ2V0U3RhcnRMZW5ndGgoKSkgLyBzdGVwLmdldExlbmd0aCgpO1xuICAgICAgICAgIHJldHVybiBzdGVwLnBvc1RvVGlsZU9mZnNldChzdGVwLmdldEVudHJ5KCkueCArIChzdGVwLmdldEV4aXQoKS54IC0gc3RlcC5nZXRFbnRyeSgpLngpICogcHJjLCBzdGVwLmdldEVudHJ5KCkueSArIChzdGVwLmdldEV4aXQoKS55IC0gc3RlcC5nZXRFbnRyeSgpLnkpICogcHJjKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGdldFNvbHV0aW9uVGlsZUxpc3QoKSB7XG4gICAgICB2YXIgc3RlcCwgdGlsZWxpc3Q7XG4gICAgICBpZiAodGhpcy5zb2x1dGlvbikge1xuICAgICAgICBzdGVwID0gdGhpcy5zb2x1dGlvbjtcbiAgICAgICAgdGlsZWxpc3QgPSBbc3RlcC50aWxlXTtcbiAgICAgICAgd2hpbGUgKHN0ZXAucHJldiAhPSBudWxsKSB7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAucHJldjtcbiAgICAgICAgICB0aWxlbGlzdC51bnNoaWZ0KHN0ZXAudGlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGVsaXN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRpbGVJc1ZhbGlkKHRpbGUpIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkVGlsZUNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRUaWxlQ2FsbGJhY2sodGlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKHRpbGUgIT0gbnVsbCkgJiYgKCF0aWxlLmVtdWxhdGVkIHx8ICh0aWxlLnRpbGUgIT09IDAgJiYgdGlsZS50aWxlICE9PSBmYWxzZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFRpbGUoeCwgeSkge1xuICAgICAgdmFyIHJlZjE7XG4gICAgICBpZiAodGhpcy50aWxlc0NvbnRhaW5lci5nZXRUaWxlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZXNDb250YWluZXIuZ2V0VGlsZSh4LCB5KTtcbiAgICAgIH0gZWxzZSBpZiAoKChyZWYxID0gdGhpcy50aWxlc0NvbnRhaW5lclt5XSkgIT0gbnVsbCA/IHJlZjFbeF0gOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB4LFxuICAgICAgICAgIHk6IHksXG4gICAgICAgICAgdGlsZTogdGhpcy50aWxlc0NvbnRhaW5lclt5XVt4XSxcbiAgICAgICAgICBlbXVsYXRlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbm5lY3RlZFRvVGlsZSh0aWxlKSB7XG4gICAgICB2YXIgY29ubmVjdGVkLCB0O1xuICAgICAgaWYgKHRpbGUuZ2V0Q29ubmVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRpbGUuZ2V0Q29ubmVjdGVkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25uZWN0ZWQgPSBbXTtcbiAgICAgICAgaWYgKHQgPSB0aGlzLmdldFRpbGUodGlsZS54ICsgMSwgdGlsZS55KSkge1xuICAgICAgICAgIGNvbm5lY3RlZC5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ID0gdGhpcy5nZXRUaWxlKHRpbGUueCAtIDEsIHRpbGUueSkpIHtcbiAgICAgICAgICBjb25uZWN0ZWQucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA9IHRoaXMuZ2V0VGlsZSh0aWxlLngsIHRpbGUueSArIDEpKSB7XG4gICAgICAgICAgY29ubmVjdGVkLnB1c2godCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgPSB0aGlzLmdldFRpbGUodGlsZS54LCB0aWxlLnkgLSAxKSkge1xuICAgICAgICAgIGNvbm5lY3RlZC5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25uZWN0ZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkTmV4dFN0ZXBzKHN0ZXAgPSBudWxsKSB7XG4gICAgICB2YXIgaSwgbGVuLCBuZXh0LCByZWYxLCByZXN1bHRzLCB0aWxlO1xuICAgICAgdGlsZSA9IHN0ZXAgIT0gbnVsbCA/IHN0ZXAubmV4dFRpbGUgOiB0aGlzLmZyb207XG4gICAgICByZWYxID0gdGhpcy5nZXRDb25uZWN0ZWRUb1RpbGUodGlsZSk7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5leHQgPSByZWYxW2ldO1xuICAgICAgICBpZiAodGhpcy50aWxlSXNWYWxpZChuZXh0KSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmFkZFN0ZXAobmV3IFBhdGhGaW5kZXIuU3RlcCh0aGlzLCAoc3RlcCAhPSBudWxsID8gc3RlcCA6IG51bGwpLCB0aWxlLCBuZXh0KSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICB0aWxlRXF1YWwodGlsZUEsIHRpbGVCKSB7XG4gICAgICByZXR1cm4gdGlsZUEgPT09IHRpbGVCIHx8ICgodGlsZUEuZW11bGF0ZWQgfHwgdGlsZUIuZW11bGF0ZWQpICYmIHRpbGVBLnggPT09IHRpbGVCLnggJiYgdGlsZUEueSA9PT0gdGlsZUIueSk7XG4gICAgfVxuXG4gICAgYXJyaXZlZEF0RGVzdGluYXRpb24oc3RlcCkge1xuICAgICAgaWYgKHRoaXMuYXJyaXZlZENhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyaXZlZENhbGxiYWNrKHN0ZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZUVxdWFsKHN0ZXAudGlsZSwgdGhpcy50byk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkU3RlcChzdGVwKSB7XG4gICAgICB2YXIgc29sdXRpb25DYW5kaWRhdGU7XG4gICAgICBpZiAodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XSA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF0gPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICghKCh0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdW3N0ZXAuZ2V0RXhpdCgpLnldICE9IG51bGwpICYmIHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF1bc3RlcC5nZXRFeGl0KCkueV0uZ2V0VG90YWxMZW5ndGgoKSA8PSBzdGVwLmdldFRvdGFsTGVuZ3RoKCkpKSB7XG4gICAgICAgIGlmICh0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdW3N0ZXAuZ2V0RXhpdCgpLnldICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZVN0ZXAodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSA9IHN0ZXA7XG4gICAgICAgIHRoaXMucXVldWUuc3BsaWNlKHRoaXMuZ2V0U3RlcFJhbmsoc3RlcCksIDAsIHN0ZXApO1xuICAgICAgICBzb2x1dGlvbkNhbmRpZGF0ZSA9IG5ldyBQYXRoRmluZGVyLlN0ZXAodGhpcywgc3RlcCwgc3RlcC5uZXh0VGlsZSwgbnVsbCk7XG4gICAgICAgIGlmICh0aGlzLmFycml2ZWRBdERlc3RpbmF0aW9uKHNvbHV0aW9uQ2FuZGlkYXRlKSAmJiAhKCh0aGlzLnNvbHV0aW9uICE9IG51bGwpICYmIHRoaXMuc29sdXRpb24ucHJldi5nZXRUb3RhbExlbmd0aCgpIDw9IHN0ZXAuZ2V0VG90YWxMZW5ndGgoKSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zb2x1dGlvbiA9IHNvbHV0aW9uQ2FuZGlkYXRlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlU3RlcChzdGVwKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICBpbmRleCA9IHRoaXMucXVldWUuaW5kZXhPZihzdGVwKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYmVzdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlW3RoaXMucXVldWUubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgZ2V0U3RlcFJhbmsoc3RlcCkge1xuICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN0ZXBSYW5rKHN0ZXAuZ2V0RWZmaWNpZW5jeSgpLCAwLCB0aGlzLnF1ZXVlLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRTdGVwUmFuayhlZmZpY2llbmN5LCBtaW4sIG1heCkge1xuICAgICAgdmFyIHJlZiwgcmVmUG9zO1xuICAgICAgcmVmUG9zID0gTWF0aC5mbG9vcigobWF4IC0gbWluKSAvIDIpICsgbWluO1xuICAgICAgcmVmID0gdGhpcy5xdWV1ZVtyZWZQb3NdLmdldEVmZmljaWVuY3koKTtcbiAgICAgIGlmIChyZWYgPT09IGVmZmljaWVuY3kpIHtcbiAgICAgICAgcmV0dXJuIHJlZlBvcztcbiAgICAgIH0gZWxzZSBpZiAocmVmID4gZWZmaWNpZW5jeSkge1xuICAgICAgICBpZiAocmVmUG9zID09PSBtaW4pIHtcbiAgICAgICAgICByZXR1cm4gbWluO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTdGVwUmFuayhlZmZpY2llbmN5LCBtaW4sIHJlZlBvcyAtIDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVmUG9zID09PSBtYXgpIHtcbiAgICAgICAgICByZXR1cm4gbWF4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U3RlcFJhbmsoZWZmaWNpZW5jeSwgcmVmUG9zICsgMSwgbWF4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFBhdGhGaW5kZXIucHJvcGVydGllcyh7XG4gICAgdmFsaWRUaWxlQ2FsbGJhY2s6IHt9XG4gIH0pO1xuXG4gIHJldHVybiBQYXRoRmluZGVyO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5QYXRoRmluZGVyLlN0ZXAgPSBjbGFzcyBTdGVwIHtcbiAgY29uc3RydWN0b3IocGF0aEZpbmRlciwgcHJldiwgdGlsZTEsIG5leHRUaWxlKSB7XG4gICAgdGhpcy5wYXRoRmluZGVyID0gcGF0aEZpbmRlcjtcbiAgICB0aGlzLnByZXYgPSBwcmV2O1xuICAgIHRoaXMudGlsZSA9IHRpbGUxO1xuICAgIHRoaXMubmV4dFRpbGUgPSBuZXh0VGlsZTtcbiAgfVxuXG4gIHBvc1RvVGlsZU9mZnNldCh4LCB5KSB7XG4gICAgdmFyIHRpbGU7XG4gICAgdGlsZSA9IE1hdGguZmxvb3IoeCkgPT09IHRoaXMudGlsZS54ICYmIE1hdGguZmxvb3IoeSkgPT09IHRoaXMudGlsZS55ID8gdGhpcy50aWxlIDogKHRoaXMubmV4dFRpbGUgIT0gbnVsbCkgJiYgTWF0aC5mbG9vcih4KSA9PT0gdGhpcy5uZXh0VGlsZS54ICYmIE1hdGguZmxvb3IoeSkgPT09IHRoaXMubmV4dFRpbGUueSA/IHRoaXMubmV4dFRpbGUgOiAodGhpcy5wcmV2ICE9IG51bGwpICYmIE1hdGguZmxvb3IoeCkgPT09IHRoaXMucHJldi50aWxlLnggJiYgTWF0aC5mbG9vcih5KSA9PT0gdGhpcy5wcmV2LnRpbGUueSA/IHRoaXMucHJldi50aWxlIDogY29uc29sZS5sb2coJ01hdGguZmxvb3IoJyArIHggKyAnKSA9PSAnICsgdGhpcy50aWxlLngsICdNYXRoLmZsb29yKCcgKyB5ICsgJykgPT0gJyArIHRoaXMudGlsZS55LCB0aGlzKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICB0aWxlOiB0aWxlLFxuICAgICAgb2Zmc2V0WDogeCAtIHRpbGUueCxcbiAgICAgIG9mZnNldFk6IHkgLSB0aWxlLnlcbiAgICB9O1xuICB9XG5cbiAgZ2V0RXhpdCgpIHtcbiAgICBpZiAodGhpcy5leGl0ID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLm5leHRUaWxlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5leGl0ID0ge1xuICAgICAgICAgIHg6ICh0aGlzLnRpbGUueCArIHRoaXMubmV4dFRpbGUueCArIDEpIC8gMixcbiAgICAgICAgICB5OiAodGhpcy50aWxlLnkgKyB0aGlzLm5leHRUaWxlLnkgKyAxKSAvIDJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXhpdCA9IHtcbiAgICAgICAgICB4OiB0aGlzLnRpbGUueCArIDAuNSxcbiAgICAgICAgICB5OiB0aGlzLnRpbGUueSArIDAuNVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5leGl0O1xuICB9XG5cbiAgZ2V0RW50cnkoKSB7XG4gICAgaWYgKHRoaXMuZW50cnkgPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMucHJldiAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZW50cnkgPSB7XG4gICAgICAgICAgeDogKHRoaXMudGlsZS54ICsgdGhpcy5wcmV2LnRpbGUueCArIDEpIC8gMixcbiAgICAgICAgICB5OiAodGhpcy50aWxlLnkgKyB0aGlzLnByZXYudGlsZS55ICsgMSkgLyAyXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVudHJ5ID0ge1xuICAgICAgICAgIHg6IHRoaXMudGlsZS54ICsgMC41LFxuICAgICAgICAgIHk6IHRoaXMudGlsZS55ICsgMC41XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVudHJ5O1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9ICh0aGlzLm5leHRUaWxlID09IG51bGwpIHx8ICh0aGlzLnByZXYgPT0gbnVsbCkgPyAwLjUgOiB0aGlzLnByZXYudGlsZS54ID09PSB0aGlzLm5leHRUaWxlLnggfHwgdGhpcy5wcmV2LnRpbGUueSA9PT0gdGhpcy5uZXh0VGlsZS55ID8gMSA6IE1hdGguc3FydCgwLjUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBnZXRTdGFydExlbmd0aCgpIHtcbiAgICBpZiAodGhpcy5zdGFydExlbmd0aCA9PSBudWxsKSB7XG4gICAgICB0aGlzLnN0YXJ0TGVuZ3RoID0gdGhpcy5wcmV2ICE9IG51bGwgPyB0aGlzLnByZXYuZ2V0VG90YWxMZW5ndGgoKSA6IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXJ0TGVuZ3RoO1xuICB9XG5cbiAgZ2V0VG90YWxMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMudG90YWxMZW5ndGggPT0gbnVsbCkge1xuICAgICAgdGhpcy50b3RhbExlbmd0aCA9IHRoaXMuZ2V0U3RhcnRMZW5ndGgoKSArIHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRvdGFsTGVuZ3RoO1xuICB9XG5cbiAgZ2V0RWZmaWNpZW5jeSgpIHtcbiAgICBpZiAodGhpcy5lZmZpY2llbmN5ID09IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoRmluZGVyLmVmZmljaWVuY3lDYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuZWZmaWNpZW5jeSA9IHRoaXMucGF0aEZpbmRlci5lZmZpY2llbmN5Q2FsbGJhY2sodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVmZmljaWVuY3kgPSAtdGhpcy5nZXRSZW1haW5pbmcoKSAqIDEuMSAtIHRoaXMuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWZmaWNpZW5jeTtcbiAgfVxuXG4gIGdldFJlbWFpbmluZygpIHtcbiAgICB2YXIgZnJvbSwgdG8sIHgsIHk7XG4gICAgaWYgKHRoaXMucmVtYWluaW5nID09IG51bGwpIHtcbiAgICAgIGZyb20gPSB0aGlzLmdldEV4aXQoKTtcbiAgICAgIHRvID0ge1xuICAgICAgICB4OiB0aGlzLnBhdGhGaW5kZXIudG8ueCArIDAuNSxcbiAgICAgICAgeTogdGhpcy5wYXRoRmluZGVyLnRvLnkgKyAwLjVcbiAgICAgIH07XG4gICAgICB4ID0gdG8ueCAtIGZyb20ueDtcbiAgICAgIHkgPSB0by55IC0gZnJvbS55O1xuICAgICAgdGhpcy5yZW1haW5pbmcgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbWFpbmluZztcbiAgfVxuXG59O1xuXG5yZXR1cm4oUGF0aEZpbmRlcik7fSk7IiwiaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlICE9PSBudWxsKSB7XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgZ3JlZWtBbHBoYWJldDogcmVxdWlyZSgnLi9zdHJpbmdzL2dyZWVrQWxwaGFiZXQnKSxcbiAgICAgIHN0YXJOYW1lczogcmVxdWlyZSgnLi9zdHJpbmdzL3N0YXJOYW1lcycpXG4gIH07XG59IiwibW9kdWxlLmV4cG9ydHM9W1xuXCJhbHBoYVwiLCAgIFwiYmV0YVwiLCAgICBcImdhbW1hXCIsICAgXCJkZWx0YVwiLFxuXCJlcHNpbG9uXCIsIFwiemV0YVwiLCAgICBcImV0YVwiLCAgICAgXCJ0aGV0YVwiLFxuXCJpb3RhXCIsICAgIFwia2FwcGFcIiwgICBcImxhbWJkYVwiLCAgXCJtdVwiLFxuXCJudVwiLCAgICAgIFwieGlcIiwgICAgICBcIm9taWNyb25cIiwgXCJwaVwiLFx0XG5cInJob1wiLCAgICAgXCJzaWdtYVwiLCAgIFwidGF1XCIsICAgICBcInVwc2lsb25cIixcblwicGhpXCIsICAgICBcImNoaVwiLCAgICAgXCJwc2lcIiwgICAgIFwib21lZ2FcIlxuXSIsIm1vZHVsZS5leHBvcnRzPVtcblwiQWNoZXJuYXJcIiwgICAgIFwiTWFpYVwiLCAgICAgICAgXCJBdGxhc1wiLCAgICAgICAgXCJTYWxtXCIsICAgICAgIFwiQWxuaWxhbVwiLCAgICAgIFwiTmVra2FyXCIsICAgICAgXCJFbG5hdGhcIiwgICAgICAgXCJUaHViYW5cIixcblwiQWNoaXJkXCIsICAgICAgIFwiTWFyZmlrXCIsICAgICAgXCJBdXZhXCIsICAgICAgICAgXCJTYXJnYXNcIiwgICAgIFwiQWxuaXRha1wiLCAgICAgIFwiTmloYWxcIiwgICAgICAgXCJFbmlmXCIsICAgICAgICAgXCJUb3JjdWxhcmlzXCIsXG5cIkFjcnV4XCIsICAgICAgICBcIk1hcmthYlwiLCAgICAgIFwiQXZpb3JcIiwgICAgICAgIFwiU2FyaW5cIiwgICAgICBcIkFscGhhcmRcIiwgICAgICBcIk51bmtpXCIsICAgICAgIFwiRXRhbWluXCIsICAgICAgIFwiVHVyYWlzXCIsXG5cIkFjdWJlbnNcIiwgICAgICBcIk1hdGFyXCIsICAgICAgIFwiQXplbGZhZmFnZVwiLCAgIFwiU2NlcHRydW1cIiwgICBcIkFscGhla2thXCIsICAgICBcIk51c2FrYW5cIiwgICAgIFwiRm9tYWxoYXV0XCIsICAgIFwiVHlsXCIsXG5cIkFkYXJhXCIsICAgICAgICBcIk1lYnN1dGFcIiwgICAgIFwiQXpoYVwiLCAgICAgICAgIFwiU2NoZWF0XCIsICAgICBcIkFscGhlcmF0elwiLCAgICBcIlBlYWNvY2tcIiwgICAgIFwiRm9ybmFjaXNcIiwgICAgIFwiVW51a2FsaGFpXCIsXG5cIkFkaGFmZXJhXCIsICAgICBcIk1lZ3JlelwiLCAgICAgIFwiQXptaWRpc2tlXCIsICAgIFwiU2VnaW5cIiwgICAgICBcIkFscmFpXCIsICAgICAgICBcIlBoYWRcIiwgICAgICAgIFwiRnVydWRcIiwgICAgICAgIFwiVmVnYVwiLFxuXCJBZGhpbFwiLCAgICAgICAgXCJNZWlzc2FcIiwgICAgICBcIkJhaGFtXCIsICAgICAgICBcIlNlZ2ludXNcIiwgICAgXCJBbHJpc2hhXCIsICAgICAgXCJQaGFldFwiLCAgICAgICBcIkdhY3J1eFwiLCAgICAgICBcIlZpbmRlbWlhdHJpeFwiLFxuXCJBZ2VuYVwiLCAgICAgICAgXCJNZWtidWRhXCIsICAgICBcIkJlY3J1eFwiLCAgICAgICBcIlNoYW1cIiwgICAgICAgXCJBbHNhZmlcIiwgICAgICAgXCJQaGVya2FkXCIsICAgICBcIkdpYW5mYXJcIiwgICAgICBcIldhc2F0XCIsXG5cIkFsYWRmYXJcIiwgICAgICBcIk1lbmthbGluYW5cIiwgIFwiQmVpZFwiLCAgICAgICAgIFwiU2hhcmF0YW5cIiwgICBcIkFsc2NpYXVrYXRcIiwgICBcIlBsZWlvbmVcIiwgICAgIFwiR29tZWlzYVwiLCAgICAgIFwiV2V6ZW5cIixcblwiQWxhdGhmYXJcIiwgICAgIFwiTWVua2FyXCIsICAgICAgXCJCZWxsYXRyaXhcIiwgICAgXCJTaGF1bGFcIiwgICAgIFwiQWxzaGFpblwiLCAgICAgIFwiUG9sYXJpc1wiLCAgICAgXCJHcmFmZmlhc1wiLCAgICAgXCJXZXpuXCIsXG5cIkFsYmFsZGFoXCIsICAgICBcIk1lbmtlbnRcIiwgICAgIFwiQmV0ZWxnZXVzZVwiLCAgIFwiU2hlZGlyXCIsICAgICBcIkFsc2hhdFwiLCAgICAgICBcIlBvbGx1eFwiLCAgICAgIFwiR3JhZmlhc1wiLCAgICAgIFwiWWVkXCIsXG5cIkFsYmFsaVwiLCAgICAgICBcIk1lbmtpYlwiLCAgICAgIFwiQm90ZWluXCIsICAgICAgIFwiU2hlbGlha1wiLCAgICBcIkFsc3VoYWlsXCIsICAgICBcIlBvcnJpbWFcIiwgICAgIFwiR3J1bWl1bVwiLCAgICAgIFwiWWlsZHVuXCIsXG5cIkFsYmlyZW9cIiwgICAgICBcIk1lcmFrXCIsICAgICAgIFwiQnJhY2hpdW1cIiwgICAgIFwiU2lyaXVzXCIsICAgICBcIkFsdGFpclwiLCAgICAgICBcIlByYWVjaXB1YVwiLCAgIFwiSGFkYXJcIiwgICAgICAgIFwiWmFuaWFoXCIsXG5cIkFsY2hpYmFcIiwgICAgICBcIk1lcmdhXCIsICAgICAgIFwiQ2Fub3B1c1wiLCAgICAgIFwiU2l0dWxhXCIsICAgICBcIkFsdGFyZlwiLCAgICAgICBcIlByb2N5b25cIiwgICAgIFwiSGFlZGlcIiwgICAgICAgIFwiWmF1cmFrXCIsXG5cIkFsY29yXCIsICAgICAgICBcIk1lcm9wZVwiLCAgICAgIFwiQ2FwZWxsYVwiLCAgICAgIFwiU2thdFwiLCAgICAgICBcIkFsdGVyZlwiLCAgICAgICBcIlByb3B1c1wiLCAgICAgIFwiSGFtYWxcIiwgICAgICAgIFwiWmF2aWphaFwiLFxuXCJBbGN5b25lXCIsICAgICAgXCJNZXNhcnRoaW1cIiwgICBcIkNhcGhcIiwgICAgICAgICBcIlNwaWNhXCIsICAgICAgXCJBbHVkcmFcIiwgICAgICAgXCJSYW5hXCIsICAgICAgICBcIkhhc3NhbGVoXCIsICAgICBcIlppYmFsXCIsXG5cIkFsZGVyYW1pblwiLCAgICBcIk1ldGFsbGFoXCIsICAgIFwiQ2FzdG9yXCIsICAgICAgIFwiU3Rlcm9wZVwiLCAgICBcIkFsdWxhXCIsICAgICAgICBcIlJhc1wiLCAgICAgICAgIFwiSGV6ZVwiLCAgICAgICAgIFwiWm9zbWFcIixcblwiQWxkaGliYWhcIiwgICAgIFwiTWlhcGxhY2lkdXNcIiwgXCJDZWJhbHJhaVwiLCAgICAgXCJTdWFsb2NpblwiLCAgIFwiQWx5YVwiLCAgICAgICAgIFwiUmFzYWxnZXRoaVwiLCAgXCJIb2VkdXNcIiwgICAgICAgXCJBcXVhcml1c1wiLFxuXCJBbGZpcmtcIiwgICAgICAgXCJNaW5rYXJcIiwgICAgICBcIkNlbGFlbm9cIiwgICAgICBcIlN1YnJhXCIsICAgICAgXCJBbHppcnJcIiwgICAgICAgXCJSYXNhbGhhZ3VlXCIsICBcIkhvbWFtXCIsICAgICAgICBcIkFyaWVzXCIsXG5cIkFsZ2VuaWJcIiwgICAgICBcIk1pbnRha2FcIiwgICAgIFwiQ2hhcmFcIiwgICAgICAgIFwiU3VoYWlsXCIsICAgICBcIkFuY2hhXCIsICAgICAgICBcIlJhc3RhYmFuXCIsICAgIFwiSHlhZHVtXCIsICAgICAgIFwiQ2VwaGV1c1wiLFxuXCJBbGdpZWJhXCIsICAgICAgXCJNaXJhXCIsICAgICAgICBcIkNob3J0XCIsICAgICAgICBcIlN1bGFmYXRcIiwgICAgXCJBbmdldGVuYXJcIiwgICAgXCJSZWd1bHVzXCIsICAgICBcIkl6YXJcIiwgICAgICAgICBcIkNldHVzXCIsXG5cIkFsZ29sXCIsICAgICAgICBcIk1pcmFjaFwiLCAgICAgIFwiQ3Vyc2FcIiwgICAgICAgIFwiU3lybWFcIiwgICAgICBcIkFua2FhXCIsICAgICAgICBcIlJpZ2VsXCIsICAgICAgIFwiSmFiYmFoXCIsICAgICAgIFwiQ29sdW1iYVwiLFxuXCJBbGdvcmFiXCIsICAgICAgXCJNaXJhbVwiLCAgICAgICBcIkRhYmloXCIsICAgICAgICBcIlRhYml0XCIsICAgICAgXCJBbnNlclwiLCAgICAgICAgXCJSb3RhbmV2XCIsICAgICBcIkthamFtXCIsICAgICAgICBcIkNvbWFcIixcblwiQWxoZW5hXCIsICAgICAgIFwiTWlycGhha1wiLCAgICAgXCJEZW5lYlwiLCAgICAgICAgXCJUYWxpdGhhXCIsICAgIFwiQW50YXJlc1wiLCAgICAgIFwiUnVjaGJhXCIsICAgICAgXCJLYXVzXCIsICAgICAgICAgXCJDb3JvbmFcIixcblwiQWxpb3RoXCIsICAgICAgIFwiTWl6YXJcIiwgICAgICAgXCJEZW5lYm9sYVwiLCAgICAgXCJUYW5pYVwiLCAgICAgIFwiQXJjdHVydXNcIiwgICAgIFwiUnVjaGJhaFwiLCAgICAgXCJLZWlkXCIsICAgICAgICAgXCJDcnV4XCIsXG5cIkFsa2FpZFwiLCAgICAgICBcIk11ZnJpZFwiLCAgICAgIFwiRGhlbmViXCIsICAgICAgIFwiVGFyYXplZFwiLCAgICBcIkFya2FiXCIsICAgICAgICBcIlJ1a2JhdFwiLCAgICAgIFwiS2l0YWxwaGFcIiwgICAgIFwiRHJhY29cIixcblwiQWxrYWx1cm9wc1wiLCAgIFwiTXVsaXBoZW5cIiwgICAgXCJEaWFkZW1cIiwgICAgICAgXCJUYXlnZXRhXCIsICAgIFwiQXJuZWJcIiwgICAgICAgIFwiU2FiaWtcIiwgICAgICAgXCJLb2NhYlwiLCAgICAgICAgXCJHcnVzXCIsXG5cIkFsa2VzXCIsICAgICAgICBcIk11cnppbVwiLCAgICAgIFwiRGlwaGRhXCIsICAgICAgIFwiVGVnbWVuXCIsICAgICBcIkFycmFraXNcIiwgICAgICBcIlNhZGFsYWNoYmlhXCIsIFwiS29ybmVwaG9yb3NcIiwgIFwiSHlkcmFcIixcblwiQWxrdXJoYWhcIiwgICAgIFwiTXVzY2lkYVwiLCAgICAgXCJEc2NodWJiYVwiLCAgICAgXCJUZWphdFwiLCAgICAgIFwiQXNjZWxsYVwiLCAgICAgIFwiU2FkYWxtZWxpa1wiLCAgXCJLcmF6XCIsICAgICAgICAgXCJMYWNlcnRhXCIsXG5cIkFsbWFha1wiLCAgICAgICBcIk5hb3NcIiwgICAgICAgIFwiRHNpYmFuXCIsICAgICAgIFwiVGVyZWJlbGx1bVwiLCBcIkFzZWxsdXNcIiwgICAgICBcIlNhZGFsc3V1ZFwiLCAgIFwiS3VtYVwiLCAgICAgICAgIFwiTWVuc2FcIixcblwiQWxuYWlyXCIsICAgICAgIFwiTmFzaFwiLCAgICAgICAgXCJEdWJoZVwiLCAgICAgICAgXCJUaGFiaXRcIiwgICAgIFwiQXN0ZXJvcGVcIiwgICAgIFwiU2FkclwiLCAgICAgICAgXCJMZXNhdGhcIiwgICAgICAgXCJNYWFzeW1cIixcblwiQWxuYXRoXCIsICAgICAgIFwiTmFzaGlyYVwiLCAgICAgXCJFbGVjdHJhXCIsICAgICAgXCJUaGVlbWltXCIsICAgIFwiQXRpa1wiLCAgICAgICAgIFwiU2FpcGhcIiwgICAgICAgXCJQaG9lbml4XCIsICAgICAgXCJOb3JtYVwiXG5dIiwidmFyIERpcmVjdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rpb24gPSBjbGFzcyBEaXJlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB4LCB5LCBpbnZlcnNlTmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuaW52ZXJzZU5hbWUgPSBpbnZlcnNlTmFtZTtcbiAgfVxuXG4gIGdldEludmVyc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3JbdGhpcy5pbnZlcnNlTmFtZV07XG4gIH1cblxufTtcblxuRGlyZWN0aW9uLnVwID0gbmV3IERpcmVjdGlvbigndXAnLCAwLCAtMSwgJ2Rvd24nKTtcblxuRGlyZWN0aW9uLmRvd24gPSBuZXcgRGlyZWN0aW9uKCdkb3duJywgMCwgMSwgJ3VwJyk7XG5cbkRpcmVjdGlvbi5sZWZ0ID0gbmV3IERpcmVjdGlvbignbGVmdCcsIC0xLCAwLCAncmlnaHQnKTtcblxuRGlyZWN0aW9uLnJpZ2h0ID0gbmV3IERpcmVjdGlvbigncmlnaHQnLCAxLCAwLCAnbGVmdCcpO1xuXG5EaXJlY3Rpb24uYWRqYWNlbnRzID0gW0RpcmVjdGlvbi51cCwgRGlyZWN0aW9uLmRvd24sIERpcmVjdGlvbi5sZWZ0LCBEaXJlY3Rpb24ucmlnaHRdO1xuXG5EaXJlY3Rpb24udG9wTGVmdCA9IG5ldyBEaXJlY3Rpb24oJ3RvcExlZnQnLCAtMSwgLTEsICdib3R0b21SaWdodCcpO1xuXG5EaXJlY3Rpb24udG9wUmlnaHQgPSBuZXcgRGlyZWN0aW9uKCd0b3BSaWdodCcsIDEsIC0xLCAnYm90dG9tTGVmdCcpO1xuXG5EaXJlY3Rpb24uYm90dG9tUmlnaHQgPSBuZXcgRGlyZWN0aW9uKCdib3R0b21SaWdodCcsIDEsIDEsICd0b3BMZWZ0Jyk7XG5cbkRpcmVjdGlvbi5ib3R0b21MZWZ0ID0gbmV3IERpcmVjdGlvbignYm90dG9tTGVmdCcsIC0xLCAxLCAndG9wUmlnaHQnKTtcblxuRGlyZWN0aW9uLmNvcm5lcnMgPSBbRGlyZWN0aW9uLnRvcExlZnQsIERpcmVjdGlvbi50b3BSaWdodCwgRGlyZWN0aW9uLmJvdHRvbVJpZ2h0LCBEaXJlY3Rpb24uYm90dG9tTGVmdF07XG5cbkRpcmVjdGlvbi5hbGwgPSBbRGlyZWN0aW9uLnVwLCBEaXJlY3Rpb24uZG93biwgRGlyZWN0aW9uLmxlZnQsIERpcmVjdGlvbi5yaWdodCwgRGlyZWN0aW9uLnRvcExlZnQsIERpcmVjdGlvbi50b3BSaWdodCwgRGlyZWN0aW9uLmJvdHRvbVJpZ2h0LCBEaXJlY3Rpb24uYm90dG9tTGVmdF07XG4iLCJ2YXIgRGlyZWN0aW9uLCBFbGVtZW50LCBUaWxlO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbkRpcmVjdGlvbiA9IHJlcXVpcmUoJy4vRGlyZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGlsZSBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHgxLCB5MSkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMueCA9IHgxO1xuICAgICAgdGhpcy55ID0geTE7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgdmFyIGNvbnRhaW5lcjtcbiAgICAgIHJldHVybiBjb250YWluZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGdldFJlbGF0aXZlVGlsZSh4LCB5KSB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0VGlsZSh0aGlzLnggKyB4LCB0aGlzLnkgKyB5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kRGlyZWN0aW9uT2YodGlsZSkge1xuICAgICAgaWYgKHRpbGUudGlsZSkge1xuICAgICAgICB0aWxlID0gdGlsZS50aWxlO1xuICAgICAgfVxuICAgICAgaWYgKCh0aWxlLnggIT0gbnVsbCkgJiYgKHRpbGUueSAhPSBudWxsKSkge1xuICAgICAgICByZXR1cm4gRGlyZWN0aW9uLmFsbC5maW5kKChkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGQueCA9PT0gdGlsZS54IC0gdGhpcy54ICYmIGQueSA9PT0gdGlsZS55IC0gdGhpcy55O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDaGlsZChjaGlsZCwgY2hlY2tSZWYgPSB0cnVlKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgICBpZiAoY2hlY2tSZWYpIHtcbiAgICAgICAgY2hpbGQudGlsZSA9IHRoaXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQoY2hpbGQsIGNoZWNrUmVmID0gdHJ1ZSkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKGNoZWNrUmVmICYmIGNoaWxkLnRpbGUgPT09IHRoaXMpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkLnRpbGUgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRpc3QodGlsZSkge1xuICAgICAgdmFyIGN0bkRpc3QsIHJlZiwgeCwgeTtcbiAgICAgIGlmICgodGlsZSAhPSBudWxsID8gdGlsZS5nZXRGaW5hbFRpbGUgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgdGlsZSA9IHRpbGUuZ2V0RmluYWxUaWxlKCk7XG4gICAgICB9XG4gICAgICBpZiAoKCh0aWxlICE9IG51bGwgPyB0aWxlLnggOiB2b2lkIDApICE9IG51bGwpICYmICh0aWxlLnkgIT0gbnVsbCkgJiYgKHRoaXMueCAhPSBudWxsKSAmJiAodGhpcy55ICE9IG51bGwpICYmICh0aGlzLmNvbnRhaW5lciA9PT0gdGlsZS5jb250YWluZXIgfHwgKGN0bkRpc3QgPSAocmVmID0gdGhpcy5jb250YWluZXIpICE9IG51bGwgPyB0eXBlb2YgcmVmLmRpc3QgPT09IFwiZnVuY3Rpb25cIiA/IHJlZi5kaXN0KHRpbGUuY29udGFpbmVyKSA6IHZvaWQgMCA6IHZvaWQgMCkpKSB7XG4gICAgICAgIHggPSB0aWxlLnggLSB0aGlzLng7XG4gICAgICAgIHkgPSB0aWxlLnkgLSB0aGlzLnk7XG4gICAgICAgIGlmIChjdG5EaXN0KSB7XG4gICAgICAgICAgeCArPSBjdG5EaXN0Lng7XG4gICAgICAgICAgeSArPSBjdG5EaXN0Lnk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB4LFxuICAgICAgICAgIHk6IHksXG4gICAgICAgICAgbGVuZ3RoOiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldEZpbmFsVGlsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICB9O1xuXG4gIFRpbGUucHJvcGVydGllcyh7XG4gICAgY2hpbGRyZW46IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9LFxuICAgIGNvbnRhaW5lcjoge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGphY2VudFRpbGVzLmZvckVhY2goZnVuY3Rpb24odGlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbGUuYWRqYWNlbnRUaWxlc1Byb3BlcnR5LmludmFsaWRhdGUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWRqYWNlbnRUaWxlczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRpb24pIHtcbiAgICAgICAgaWYgKGludmFsaWRhdGlvbi5wcm9wKHRoaXMuY29udGFpbmVyUHJvcGVydHkpKSB7XG4gICAgICAgICAgcmV0dXJuIERpcmVjdGlvbi5hZGphY2VudHMubWFwKChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWxhdGl2ZVRpbGUoZC54LCBkLnkpO1xuICAgICAgICAgIH0pLmZpbHRlcigodCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHQgIT0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBUaWxlO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwidmFyIEVsZW1lbnQsIFRpbGVDb250YWluZXIsIFRpbGVSZWZlcmVuY2U7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuVGlsZVJlZmVyZW5jZSA9IHJlcXVpcmUoJy4vVGlsZVJlZmVyZW5jZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVDb250YWluZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFRpbGVDb250YWluZXIgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBfYWRkVG9Cb25kYXJpZXModGlsZSwgYm91bmRhcmllcykge1xuICAgICAgaWYgKChib3VuZGFyaWVzLnRvcCA9PSBudWxsKSB8fCB0aWxlLnkgPCBib3VuZGFyaWVzLnRvcCkge1xuICAgICAgICBib3VuZGFyaWVzLnRvcCA9IHRpbGUueTtcbiAgICAgIH1cbiAgICAgIGlmICgoYm91bmRhcmllcy5sZWZ0ID09IG51bGwpIHx8IHRpbGUueCA8IGJvdW5kYXJpZXMubGVmdCkge1xuICAgICAgICBib3VuZGFyaWVzLmxlZnQgPSB0aWxlLng7XG4gICAgICB9XG4gICAgICBpZiAoKGJvdW5kYXJpZXMuYm90dG9tID09IG51bGwpIHx8IHRpbGUueSA+IGJvdW5kYXJpZXMuYm90dG9tKSB7XG4gICAgICAgIGJvdW5kYXJpZXMuYm90dG9tID0gdGlsZS55O1xuICAgICAgfVxuICAgICAgaWYgKChib3VuZGFyaWVzLnJpZ2h0ID09IG51bGwpIHx8IHRpbGUueCA+IGJvdW5kYXJpZXMucmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGJvdW5kYXJpZXMucmlnaHQgPSB0aWxlLng7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuY29vcmRzID0ge307XG4gICAgICByZXR1cm4gdGhpcy50aWxlcyA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRpbGUodGlsZSkge1xuICAgICAgaWYgKCF0aGlzLnRpbGVzLmluY2x1ZGVzKHRpbGUpKSB7XG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgaWYgKHRoaXMuY29vcmRzW3RpbGUueF0gPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY29vcmRzW3RpbGUueF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvb3Jkc1t0aWxlLnhdW3RpbGUueV0gPSB0aWxlO1xuICAgICAgICBpZiAodGhpcy5vd25lcikge1xuICAgICAgICAgIHRpbGUuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib3VuZGFyaWVzUHJvcGVydHkuZ2V0dGVyLmNhbGN1bGF0ZWQpIHtcbiAgICAgICAgICB0aGlzLl9hZGRUb0JvbmRhcmllcyh0aWxlLCB0aGlzLmJvdW5kYXJpZXNQcm9wZXJ0eS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbW92ZVRpbGUodGlsZSkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgaW5kZXggPSB0aGlzLnRpbGVzLmluZGV4T2YodGlsZSk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLnRpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvb3Jkc1t0aWxlLnhdW3RpbGUueV07XG4gICAgICAgIGlmICh0aGlzLm93bmVyKSB7XG4gICAgICAgICAgdGlsZS5jb250YWluZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvdW5kYXJpZXNQcm9wZXJ0eS5nZXR0ZXIuY2FsY3VsYXRlZCkge1xuICAgICAgICAgIGlmICh0aGlzLmJvdW5kYXJpZXMudG9wID09PSB0aWxlLnkgfHwgdGhpcy5ib3VuZGFyaWVzLmJvdHRvbSA9PT0gdGlsZS55IHx8IHRoaXMuYm91bmRhcmllcy5sZWZ0ID09PSB0aWxlLnggfHwgdGhpcy5ib3VuZGFyaWVzLnJpZ2h0ID09PSB0aWxlLngpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvdW5kYXJpZXNQcm9wZXJ0eS5pbnZhbGlkYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlVGlsZUF0KHgsIHkpIHtcbiAgICAgIHZhciB0aWxlO1xuICAgICAgaWYgKHRpbGUgPSB0aGlzLmdldFRpbGUoeCwgeSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlVGlsZSh0aWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUaWxlKHgsIHkpIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoKChyZWYgPSB0aGlzLmNvb3Jkc1t4XSkgIT0gbnVsbCA/IHJlZlt5XSA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHNbeF1beV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9hZE1hdHJpeChtYXRyaXgpIHtcbiAgICAgIHZhciBvcHRpb25zLCByb3csIHRpbGUsIHgsIHk7XG4gICAgICBmb3IgKHkgaW4gbWF0cml4KSB7XG4gICAgICAgIHJvdyA9IG1hdHJpeFt5XTtcbiAgICAgICAgZm9yICh4IGluIHJvdykge1xuICAgICAgICAgIHRpbGUgPSByb3dbeF07XG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHg6IHBhcnNlSW50KHgpLFxuICAgICAgICAgICAgeTogcGFyc2VJbnQoeSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICh0eXBlb2YgdGlsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRpbGUodGlsZShvcHRpb25zKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpbGUueCA9IG9wdGlvbnMueDtcbiAgICAgICAgICAgIHRpbGUueSA9IG9wdGlvbnMueTtcbiAgICAgICAgICAgIHRoaXMuYWRkVGlsZSh0aWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluUmFuZ2UodGlsZSwgcmFuZ2UpIHtcbiAgICAgIHZhciBmb3VuZCwgaSwgaiwgcmVmLCByZWYxLCByZWYyLCByZWYzLCB0aWxlcywgeCwgeTtcbiAgICAgIHRpbGVzID0gW107XG4gICAgICByYW5nZS0tO1xuICAgICAgZm9yICh4ID0gaSA9IHJlZiA9IHRpbGUueCAtIHJhbmdlLCByZWYxID0gdGlsZS54ICsgcmFuZ2U7IChyZWYgPD0gcmVmMSA/IGkgPD0gcmVmMSA6IGkgPj0gcmVmMSk7IHggPSByZWYgPD0gcmVmMSA/ICsraSA6IC0taSkge1xuICAgICAgICBmb3IgKHkgPSBqID0gcmVmMiA9IHRpbGUueSAtIHJhbmdlLCByZWYzID0gdGlsZS55ICsgcmFuZ2U7IChyZWYyIDw9IHJlZjMgPyBqIDw9IHJlZjMgOiBqID49IHJlZjMpOyB5ID0gcmVmMiA8PSByZWYzID8gKytqIDogLS1qKSB7XG4gICAgICAgICAgaWYgKE1hdGguc3FydCgoeCAtIHRpbGUueCkgKiAoeCAtIHRpbGUueCkgKyAoeSAtIHRpbGUueSkgKiAoeSAtIHRpbGUueSkpIDw9IHJhbmdlICYmICgoZm91bmQgPSB0aGlzLmdldFRpbGUoeCwgeSkpICE9IG51bGwpKSB7XG4gICAgICAgICAgICB0aWxlcy5wdXNoKGZvdW5kKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aWxlcztcbiAgICB9XG5cbiAgICBhbGxUaWxlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLnRpbGVzLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgY2xlYXJBbGwoKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZWYsIHRpbGU7XG4gICAgICBpZiAodGhpcy5vd25lcikge1xuICAgICAgICByZWYgPSB0aGlzLnRpbGVzO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB0aWxlID0gcmVmW2ldO1xuICAgICAgICAgIHRpbGUuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jb29yZHMgPSB7fTtcbiAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsb3Nlc3Qob3JpZ2luVGlsZSwgZmlsdGVyKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlcywgZ2V0U2NvcmU7XG4gICAgICBnZXRTY29yZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICBpZiAoY2FuZGlkYXRlLnNjb3JlICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlLnNjb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjYW5kaWRhdGUuc2NvcmUgPSBjYW5kaWRhdGUuZ2V0RmluYWxUaWxlKCkuZGlzdChvcmlnaW5UaWxlKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjYW5kaWRhdGVzID0gdGhpcy50aWxlcy5maWx0ZXIoZmlsdGVyKS5tYXAoKHQpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaWxlUmVmZXJlbmNlKHQpO1xuICAgICAgfSk7XG4gICAgICBjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGdldFNjb3JlKGEpIC0gZ2V0U2NvcmUoYik7XG4gICAgICB9KTtcbiAgICAgIGlmIChjYW5kaWRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZXNbMF0udGlsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICB2YXIgb3V0O1xuICAgICAgb3V0ID0gbmV3IFRpbGVDb250YWluZXIoKTtcbiAgICAgIG91dC5jb29yZHMgPSB0aGlzLmNvb3JkcztcbiAgICAgIG91dC50aWxlcyA9IHRoaXMudGlsZXM7XG4gICAgICBvdXQub3duZXIgPSBmYWxzZTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgbWVyZ2UoY3RuLCBtZXJnZUZuLCBhc093bmVyID0gZmFsc2UpIHtcbiAgICAgIHZhciBvdXQsIHRtcDtcbiAgICAgIG91dCA9IG5ldyBUaWxlQ29udGFpbmVyKCk7XG4gICAgICBvdXQub3duZXIgPSBhc093bmVyO1xuICAgICAgdG1wID0gY3RuLmNvcHkoKTtcbiAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbih0aWxlQSkge1xuICAgICAgICB2YXIgbWVyZ2VkVGlsZSwgdGlsZUI7XG4gICAgICAgIHRpbGVCID0gdG1wLmdldFRpbGUodGlsZUEueCwgdGlsZUEueSk7XG4gICAgICAgIGlmICh0aWxlQikge1xuICAgICAgICAgIHRtcC5yZW1vdmVUaWxlKHRpbGVCKTtcbiAgICAgICAgfVxuICAgICAgICBtZXJnZWRUaWxlID0gbWVyZ2VGbih0aWxlQSwgdGlsZUIpO1xuICAgICAgICBpZiAobWVyZ2VkVGlsZSkge1xuICAgICAgICAgIHJldHVybiBvdXQuYWRkVGlsZShtZXJnZWRUaWxlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0bXAudGlsZXMuZm9yRWFjaChmdW5jdGlvbih0aWxlQikge1xuICAgICAgICB2YXIgbWVyZ2VkVGlsZTtcbiAgICAgICAgbWVyZ2VkVGlsZSA9IG1lcmdlRm4obnVsbCwgdGlsZUIpO1xuICAgICAgICBpZiAobWVyZ2VkVGlsZSkge1xuICAgICAgICAgIHJldHVybiBvdXQuYWRkVGlsZShtZXJnZWRUaWxlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICB9O1xuXG4gIFRpbGVDb250YWluZXIucHJvcGVydGllcyh7XG4gICAgb3duZXI6IHtcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGJvdW5kYXJpZXM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBib3VuZGFyaWVzO1xuICAgICAgICBib3VuZGFyaWVzID0ge1xuICAgICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgICBsZWZ0OiBudWxsLFxuICAgICAgICAgIGJvdHRvbTogbnVsbCxcbiAgICAgICAgICByaWdodDogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYWRkVG9Cb25kYXJpZXModGlsZSwgYm91bmRhcmllcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYm91bmRhcmllcztcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBUaWxlQ29udGFpbmVyO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwidmFyIFRpbGVSZWZlcmVuY2U7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZVJlZmVyZW5jZSA9IGNsYXNzIFRpbGVSZWZlcmVuY2Uge1xuICBjb25zdHJ1Y3Rvcih0aWxlKSB7XG4gICAgdGhpcy50aWxlID0gdGlsZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICB4OiB7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbmFsVGlsZSgpLng7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB5OiB7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbmFsVGlsZSgpLnk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldEZpbmFsVGlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aWxlLmdldEZpbmFsVGlsZSgpO1xuICB9XG5cbn07XG4iLCJ2YXIgRWxlbWVudCwgVGlsZWQ7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlZCA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGlsZWQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBwdXRPblJhbmRvbVRpbGUodGlsZXMpIHtcbiAgICAgIHZhciBmb3VuZDtcbiAgICAgIGZvdW5kID0gdGhpcy5nZXRSYW5kb21WYWxpZFRpbGUodGlsZXMpO1xuICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGUgPSBmb3VuZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSYW5kb21WYWxpZFRpbGUodGlsZXMpIHtcbiAgICAgIHZhciBjYW5kaWRhdGUsIHBvcywgcmVtYWluaW5nO1xuICAgICAgcmVtYWluaW5nID0gdGlsZXMuc2xpY2UoKTtcbiAgICAgIHdoaWxlIChyZW1haW5pbmcubGVuZ3RoID4gMCkge1xuICAgICAgICBwb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByZW1haW5pbmcubGVuZ3RoKTtcbiAgICAgICAgY2FuZGlkYXRlID0gcmVtYWluaW5nLnNwbGljZShwb3MsIDEpWzBdO1xuICAgICAgICBpZiAodGhpcy5jYW5Hb09uVGlsZShjYW5kaWRhdGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY2FuR29PblRpbGUodGlsZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0RmluYWxUaWxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGlsZS5nZXRGaW5hbFRpbGUoKTtcbiAgICB9XG5cbiAgfTtcblxuICBUaWxlZC5wcm9wZXJ0aWVzKHtcbiAgICB0aWxlOiB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKHZhbCwgb2xkKSB7XG4gICAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICAgIG9sZC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aWxlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGlsZS5hZGRDaGlsZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgb2Zmc2V0WDoge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgb2Zmc2V0WToge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbGVkO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiRGlyZWN0aW9uXCI6IHJlcXVpcmUoXCIuL0RpcmVjdGlvblwiKSxcbiAgXCJUaWxlXCI6IHJlcXVpcmUoXCIuL1RpbGVcIiksXG4gIFwiVGlsZUNvbnRhaW5lclwiOiByZXF1aXJlKFwiLi9UaWxlQ29udGFpbmVyXCIpLFxuICBcIlRpbGVSZWZlcmVuY2VcIjogcmVxdWlyZShcIi4vVGlsZVJlZmVyZW5jZVwiKSxcbiAgXCJUaWxlZFwiOiByZXF1aXJlKFwiLi9UaWxlZFwiKSxcbn0iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIFRpbWluZz1kZWZpbml0aW9uKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIj9QYXJhbGxlbGlvOnRoaXMuUGFyYWxsZWxpbyk7VGltaW5nLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9VGltaW5nO31lbHNle2lmKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIiYmUGFyYWxsZWxpbyE9PW51bGwpe1BhcmFsbGVsaW8uVGltaW5nPVRpbWluZzt9ZWxzZXtpZih0aGlzLlBhcmFsbGVsaW89PW51bGwpe3RoaXMuUGFyYWxsZWxpbz17fTt9dGhpcy5QYXJhbGxlbGlvLlRpbWluZz1UaW1pbmc7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cbnZhciBFbGVtZW50ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRWxlbWVudFwiKSA/IGRlcGVuZGVuY2llcy5FbGVtZW50IDogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG52YXIgVGltaW5nO1xuVGltaW5nID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaW1pbmcgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICB0b2dnbGUodmFsKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YWwgPSAhdGhpcy5ydW5uaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucnVubmluZyA9IHZhbDtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aW1lKSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IuVGltZXIoe1xuICAgICAgICB0aW1lOiB0aW1lLFxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIHRpbWluZzogdGhpc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIHRpbWUpIHtcbiAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5UaW1lcih7XG4gICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgcmVwZWF0OiB0cnVlLFxuICAgICAgICB0aW1pbmc6IHRoaXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9XG5cbiAgICB1bnBhdXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKHRydWUpO1xuICAgIH1cblxuICB9O1xuXG4gIFRpbWluZy5wcm9wZXJ0aWVzKHtcbiAgICBydW5uaW5nOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVGltaW5nO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5UaW1pbmcuVGltZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFRpbWVyIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgdG9nZ2xlKHZhbCkge1xuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdmFsID0gIXRoaXMucGF1c2VkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucGF1c2VkID0gdmFsO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKHRydWUpO1xuICAgIH1cblxuICAgIHVucGF1c2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5vdygpO1xuICAgICAgaWYgKHRoaXMucmVwZWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIHRoaXMucmVtYWluaW5nVGltZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCA9IHNldFRpbWVvdXQodGhpcy50aWNrLmJpbmQodGhpcyksIHRoaXMucmVtYWluaW5nVGltZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgIHRoaXMucmVtYWluaW5nVGltZSA9IHRoaXMudGltZSAtICh0aGlzLmNvbnN0cnVjdG9yLm5vdygpIC0gdGhpcy5zdGFydFRpbWUpO1xuICAgICAgaWYgKHRoaXMucmVwZWF0KSB7XG4gICAgICAgIHJldHVybiBjbGVhckludGVydmFsKHRoaXMuaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dCh0aGlzLmlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbm93KCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cgIT09IG51bGwgPyAocmVmID0gd2luZG93LnBlcmZvcm1hbmNlKSAhPSBudWxsID8gcmVmLm5vdyA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2VzcyAhPT0gbnVsbCA/IHByb2Nlc3MudXB0aW1lIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzLnVwdGltZSgpICogMTAwMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICB0aGlzLnJlcGV0aXRpb24gKz0gMTtcbiAgICAgIGlmICh0aGlzLmNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucmVwZWF0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5ub3coKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtYWluaW5nVGltZSA9IHRoaXMudGltZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdUaW1lID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgaWYgKHRoaXMucmVwZWF0KSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5pZCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgfTtcblxuICBUaW1lci5wcm9wZXJ0aWVzKHtcbiAgICB0aW1lOiB7XG4gICAgICBkZWZhdWx0OiAxMDAwXG4gICAgfSxcbiAgICBwYXVzZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBydW5uaW5nOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiAhaW52YWxpZGF0b3IucHJvcCh0aGlzLnBhdXNlZFByb3BlcnR5KSAmJiBpbnZhbGlkYXRvci5wcm9wUGF0aCgndGltaW5nLnJ1bm5pbmcnKSAhPT0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChvbGQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHRpbWluZzoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgZWxhcHNlZFRpbWU6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgaWYgKGludmFsaWRhdG9yLnByb3AodGhpcy5ydW5uaW5nUHJvcGVydHkpKSB7XG4gICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsYXBzZWRUaW1lUHJvcGVydHkuaW52YWxpZGF0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5vdygpIC0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLnRpbWUgLSB0aGlzLnJlbWFpbmluZ1RpbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGltZSAtIHRoaXMucmVtYWluaW5nVGltZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICB0aGlzLnJlbWFpbmluZ1RpbWUgPSB0aGlzLnRpbWUgLSB2YWw7XG4gICAgICAgICAgaWYgKHRoaXMucmVtYWluaW5nVGltZSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aWNrKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtYWluaW5nVGltZSA9IHRoaXMudGltZSAtIHZhbDtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbGFwc2VkVGltZVByb3BlcnR5LmludmFsaWRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJjOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHRoaXMuZWxhcHNlZFRpbWVQcm9wZXJ0eSkgLyB0aGlzLnRpbWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxhcHNlZFRpbWUgPSB0aGlzLnRpbWUgKiB2YWw7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1haW5pbmdUaW1lOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWU7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXBlYXQ6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICByZXBldGl0aW9uOiB7XG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBjYWxsYmFjazoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbWVyO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5yZXR1cm4oVGltaW5nKTt9KTsiLCJ2YXIgQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlciwgQ29ubmVjdGVkLCBFbGVtZW50LCBTaWduYWxPcGVyYXRpb247XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuU2lnbmFsT3BlcmF0aW9uID0gcmVxdWlyZSgnLi9TaWduYWxPcGVyYXRpb24nKTtcblxuQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS53YXRjaGVycy5Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbm5lY3RlZCA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQ29ubmVjdGVkIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY2FuQ29ubmVjdFRvKHRhcmdldCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0YXJnZXQuYWRkU2lnbmFsID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfVxuXG4gICAgYWNjZXB0U2lnbmFsKHNpZ25hbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb25BZGRDb25uZWN0aW9uKGNvbm4pIHt9XG5cbiAgICBvblJlbW92ZUNvbm5lY3Rpb24oY29ubikge31cblxuICAgIG9uTmV3U2lnbmFsVHlwZShzaWduYWwpIHt9XG5cbiAgICBvbkFkZFNpZ25hbChzaWduYWwsIG9wKSB7fVxuXG4gICAgb25SZW1vdmVTaWduYWwoc2lnbmFsLCBvcCkge31cblxuICAgIG9uUmVtb3ZlU2lnbmFsVHlwZShzaWduYWwsIG9wKSB7fVxuXG4gICAgb25SZXBsYWNlU2lnbmFsKG9sZFNpZ25hbCwgbmV3U2lnbmFsLCBvcCkge31cblxuICAgIGNvbnRhaW5zU2lnbmFsKHNpZ25hbCwgY2hlY2tMYXN0ID0gZmFsc2UsIGNoZWNrT3JpZ2luKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduYWxzLmZpbmQoZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gYy5tYXRjaChzaWduYWwsIGNoZWNrTGFzdCwgY2hlY2tPcmlnaW4pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkU2lnbmFsKHNpZ25hbCwgb3ApIHtcbiAgICAgIHZhciBhdXRvU3RhcnQ7XG4gICAgICBpZiAoIShvcCAhPSBudWxsID8gb3AuZmluZExpbWl0ZXIodGhpcykgOiB2b2lkIDApKSB7XG4gICAgICAgIGlmICghb3ApIHtcbiAgICAgICAgICBvcCA9IG5ldyBTaWduYWxPcGVyYXRpb24oKTtcbiAgICAgICAgICBhdXRvU3RhcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG9wLmFkZE9wZXJhdGlvbigoKSA9PiB7XG4gICAgICAgICAgdmFyIHNpbWlsYXI7XG4gICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zU2lnbmFsKHNpZ25hbCwgdHJ1ZSkgJiYgdGhpcy5hY2NlcHRTaWduYWwoc2lnbmFsKSkge1xuICAgICAgICAgICAgc2ltaWxhciA9IHRoaXMuY29udGFpbnNTaWduYWwoc2lnbmFsKTtcbiAgICAgICAgICAgIHRoaXMuc2lnbmFscy5wdXNoKHNpZ25hbCk7XG4gICAgICAgICAgICB0aGlzLm9uQWRkU2lnbmFsKHNpZ25hbCwgb3ApO1xuICAgICAgICAgICAgaWYgKCFzaW1pbGFyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uTmV3U2lnbmFsVHlwZShzaWduYWwsIG9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXV0b1N0YXJ0KSB7XG4gICAgICAgICAgb3Auc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNpZ25hbDtcbiAgICB9XG5cbiAgICByZW1vdmVTaWduYWwoc2lnbmFsLCBvcCkge1xuICAgICAgdmFyIGF1dG9TdGFydDtcbiAgICAgIGlmICghKG9wICE9IG51bGwgPyBvcC5maW5kTGltaXRlcih0aGlzKSA6IHZvaWQgMCkpIHtcbiAgICAgICAgaWYgKCFvcCkge1xuICAgICAgICAgIG9wID0gbmV3IFNpZ25hbE9wZXJhdGlvbjtcbiAgICAgICAgICBhdXRvU3RhcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG9wLmFkZE9wZXJhdGlvbigoKSA9PiB7XG4gICAgICAgICAgdmFyIGV4aXN0aW5nO1xuICAgICAgICAgIGlmICgoZXhpc3RpbmcgPSB0aGlzLmNvbnRhaW5zU2lnbmFsKHNpZ25hbCwgdHJ1ZSkpICYmIHRoaXMuYWNjZXB0U2lnbmFsKHNpZ25hbCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2lnbmFscy5zcGxpY2UodGhpcy5zaWduYWxzLmluZGV4T2YoZXhpc3RpbmcpLCAxKTtcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmVTaWduYWwoc2lnbmFsLCBvcCk7XG4gICAgICAgICAgICBvcC5hZGRPcGVyYXRpb24oKCkgPT4ge1xuICAgICAgICAgICAgICB2YXIgc2ltaWxhcjtcbiAgICAgICAgICAgICAgc2ltaWxhciA9IHRoaXMuY29udGFpbnNTaWduYWwoc2lnbmFsKTtcbiAgICAgICAgICAgICAgaWYgKHNpbWlsYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vblJlcGxhY2VTaWduYWwoc2lnbmFsLCBzaW1pbGFyLCBvcCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25SZW1vdmVTaWduYWxUeXBlKHNpZ25hbCwgb3ApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0ZXBCeVN0ZXApIHtcbiAgICAgICAgICAgIHJldHVybiBvcC5zdGVwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGF1dG9TdGFydCkge1xuICAgICAgICAgIHJldHVybiBvcC5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJlcEZvcndhcmRlZFNpZ25hbChzaWduYWwpIHtcbiAgICAgIGlmIChzaWduYWwubGFzdCA9PT0gdGhpcykge1xuICAgICAgICByZXR1cm4gc2lnbmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNpZ25hbC53aXRoTGFzdCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZvcndhcmRXYXRjaGVyKCkge1xuICAgICAgaWYgKCF0aGlzLmZvcndhcmRXYXRjaGVyKSB7XG4gICAgICAgIHRoaXMuZm9yd2FyZFdhdGNoZXIgPSBuZXcgQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgICAgc2NvcGU6IHRoaXMsXG4gICAgICAgICAgcHJvcGVydHk6ICdvdXRwdXRzJyxcbiAgICAgICAgICBvbkFkZGVkOiBmdW5jdGlvbihvdXRwdXQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcndhcmRlZFNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcndhcmRTaWduYWxUbyhzaWduYWwsIG91dHB1dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uUmVtb3ZlZDogZnVuY3Rpb24ob3V0cHV0LCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3J3YXJkZWRTaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9wRm9yd2FyZGVkU2lnbmFsVG8oc2lnbmFsLCBvdXRwdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZFdhdGNoZXIuYmluZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvcndhcmRTaWduYWwoc2lnbmFsLCBvcCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICB0aGlzLmZvcndhcmRlZFNpZ25hbHMuYWRkKHNpZ25hbCk7XG4gICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICB0aGlzLm91dHB1dHMuZm9yRWFjaChmdW5jdGlvbihjb25uKSB7XG4gICAgICAgIGlmIChzaWduYWwubGFzdCAhPT0gY29ubikge1xuICAgICAgICAgIHJldHVybiBjb25uLmFkZFNpZ25hbChuZXh0LCBvcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tGb3J3YXJkV2F0Y2hlcigpO1xuICAgIH1cblxuICAgIGZvcndhcmRBbGxTaWduYWxzVG8oY29ubiwgb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICAgIHJldHVybiBjb25uLmFkZFNpZ25hbChuZXh0LCBvcCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9wRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCwgb3ApIHtcbiAgICAgIHZhciBuZXh0O1xuICAgICAgdGhpcy5mb3J3YXJkZWRTaWduYWxzLnJlbW92ZShzaWduYWwpO1xuICAgICAgbmV4dCA9IHRoaXMucHJlcEZvcndhcmRlZFNpZ25hbChzaWduYWwpO1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm4pIHtcbiAgICAgICAgaWYgKHNpZ25hbC5sYXN0ICE9PSBjb25uKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm4ucmVtb3ZlU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcEFsbEZvcndhcmRlZFNpZ25hbFRvKGNvbm4sIG9wKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4ge1xuICAgICAgICB2YXIgbmV4dDtcbiAgICAgICAgbmV4dCA9IHRoaXMucHJlcEZvcndhcmRlZFNpZ25hbChzaWduYWwpO1xuICAgICAgICByZXR1cm4gY29ubi5yZW1vdmVTaWduYWwobmV4dCwgb3ApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yd2FyZFNpZ25hbFRvKHNpZ25hbCwgY29ubiwgb3ApIHtcbiAgICAgIHZhciBuZXh0O1xuICAgICAgbmV4dCA9IHRoaXMucHJlcEZvcndhcmRlZFNpZ25hbChzaWduYWwpO1xuICAgICAgaWYgKHNpZ25hbC5sYXN0ICE9PSBjb25uKSB7XG4gICAgICAgIHJldHVybiBjb25uLmFkZFNpZ25hbChuZXh0LCBvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEZvcndhcmRlZFNpZ25hbFRvKHNpZ25hbCwgY29ubiwgb3ApIHtcbiAgICAgIHZhciBuZXh0O1xuICAgICAgbmV4dCA9IHRoaXMucHJlcEZvcndhcmRlZFNpZ25hbChzaWduYWwpO1xuICAgICAgaWYgKHNpZ25hbC5sYXN0ICE9PSBjb25uKSB7XG4gICAgICAgIHJldHVybiBjb25uLnJlbW92ZVNpZ25hbChuZXh0LCBvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgQ29ubmVjdGVkLnByb3BlcnRpZXMoe1xuICAgIHNpZ25hbHM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9LFxuICAgIGlucHV0czoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZVxuICAgIH0sXG4gICAgb3V0cHV0czoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZVxuICAgIH0sXG4gICAgZm9yd2FyZGVkU2lnbmFsczoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIENvbm5lY3RlZDtcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBFbGVtZW50LCBTaWduYWw7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWduYWwgPSBjbGFzcyBTaWduYWwgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Iob3JpZ2luLCB0eXBlID0gJ3NpZ25hbCcsIGV4Y2x1c2l2ZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZXhjbHVzaXZlID0gZXhjbHVzaXZlO1xuICAgIHRoaXMubGFzdCA9IHRoaXMub3JpZ2luO1xuICB9XG5cbiAgd2l0aExhc3QobGFzdCkge1xuICAgIHZhciBzaWduYWw7XG4gICAgc2lnbmFsID0gbmV3IHRoaXMuX19wcm90b19fLmNvbnN0cnVjdG9yKHRoaXMub3JpZ2luLCB0aGlzLnR5cGUsIHRoaXMuZXhjbHVzaXZlKTtcbiAgICBzaWduYWwubGFzdCA9IGxhc3Q7XG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxuXG4gIGNvcHkoKSB7XG4gICAgdmFyIHNpZ25hbDtcbiAgICBzaWduYWwgPSBuZXcgdGhpcy5fX3Byb3RvX18uY29uc3RydWN0b3IodGhpcy5vcmlnaW4sIHRoaXMudHlwZSwgdGhpcy5leGNsdXNpdmUpO1xuICAgIHNpZ25hbC5sYXN0ID0gdGhpcy5sYXN0O1xuICAgIHJldHVybiBzaWduYWw7XG4gIH1cblxuICBtYXRjaChzaWduYWwsIGNoZWNrTGFzdCA9IGZhbHNlLCBjaGVja09yaWdpbiA9IHRoaXMuZXhjbHVzaXZlKSB7XG4gICAgcmV0dXJuICghY2hlY2tMYXN0IHx8IHNpZ25hbC5sYXN0ID09PSB0aGlzLmxhc3QpICYmIChjaGVja09yaWdpbiB8fCBzaWduYWwub3JpZ2luID09PSB0aGlzLm9yaWdpbikgJiYgc2lnbmFsLnR5cGUgPT09IHRoaXMudHlwZTtcbiAgfVxuXG59O1xuIiwidmFyIEVsZW1lbnQsIFNpZ25hbE9wZXJhdGlvbjtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hbE9wZXJhdGlvbiA9IGNsYXNzIFNpZ25hbE9wZXJhdGlvbiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICB0aGlzLmxpbWl0ZXJzID0gW107XG4gIH1cblxuICBhZGRPcGVyYXRpb24oZnVuY3QsIHByaW9yaXR5ID0gMSkge1xuICAgIGlmIChwcmlvcml0eSkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUudW5zaGlmdChmdW5jdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnB1c2goZnVuY3QpO1xuICAgIH1cbiAgfVxuXG4gIGFkZExpbWl0ZXIoY29ubmVjdGVkKSB7XG4gICAgaWYgKCF0aGlzLmZpbmRMaW1pdGVyKGNvbm5lY3RlZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpbWl0ZXJzLnB1c2goY29ubmVjdGVkKTtcbiAgICB9XG4gIH1cblxuICBmaW5kTGltaXRlcihjb25uZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5saW1pdGVycy5pbmRleE9mKGNvbm5lY3RlZCkgPiAtMTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHZhciByZXN1bHRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICB3aGlsZSAodGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdHMucHVzaCh0aGlzLnN0ZXAoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICB2YXIgZnVuY3Q7XG4gICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bmN0ID0gdGhpcy5xdWV1ZS5zaGlmdChmdW5jdCk7XG4gICAgICByZXR1cm4gZnVuY3QodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZG9uZSgpIHt9XG5cbn07XG4iLCJ2YXIgQ29ubmVjdGVkLCBTaWduYWwsIFNpZ25hbE9wZXJhdGlvbiwgU2lnbmFsU291cmNlO1xuXG5Db25uZWN0ZWQgPSByZXF1aXJlKCcuL0Nvbm5lY3RlZCcpO1xuXG5TaWduYWwgPSByZXF1aXJlKCcuL1NpZ25hbCcpO1xuXG5TaWduYWxPcGVyYXRpb24gPSByZXF1aXJlKCcuL1NpZ25hbE9wZXJhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hbFNvdXJjZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU2lnbmFsU291cmNlIGV4dGVuZHMgQ29ubmVjdGVkIHt9O1xuXG4gIFNpZ25hbFNvdXJjZS5wcm9wZXJ0aWVzKHtcbiAgICBhY3RpdmF0ZWQ6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcDtcbiAgICAgICAgb3AgPSBuZXcgU2lnbmFsT3BlcmF0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2YXRlZCkge1xuICAgICAgICAgIHRoaXMuZm9yd2FyZFNpZ25hbCh0aGlzLnNpZ25hbCwgb3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RvcEZvcndhcmRlZFNpZ25hbCh0aGlzLnNpZ25hbCwgb3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcC5zdGFydCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2lnbmFsOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNpZ25hbCh0aGlzLCAncG93ZXInLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTaWduYWxTb3VyY2U7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJ2YXIgQ29ubmVjdGVkLCBTd2l0Y2g7XG5cbkNvbm5lY3RlZCA9IHJlcXVpcmUoJy4vQ29ubmVjdGVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3dpdGNoID0gY2xhc3MgU3dpdGNoIGV4dGVuZHMgQ29ubmVjdGVkIHt9O1xuIiwidmFyIENvbm5lY3RlZCwgRGlyZWN0aW9uLCBUaWxlZCwgV2lyZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cblRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVkO1xuXG5EaXJlY3Rpb24gPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuRGlyZWN0aW9uO1xuXG5Db25uZWN0ZWQgPSByZXF1aXJlKCcuL0Nvbm5lY3RlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdpcmUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFdpcmUgZXh0ZW5kcyBUaWxlZCB7XG4gICAgY29uc3RydWN0b3Iod2lyZVR5cGUgPSAncmVkJykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMud2lyZVR5cGUgPSB3aXJlVHlwZTtcbiAgICB9XG5cbiAgICBmaW5kRGlyZWN0aW9uc1RvKGNvbm4pIHtcbiAgICAgIHZhciBkaXJlY3Rpb25zO1xuICAgICAgZGlyZWN0aW9ucyA9IGNvbm4udGlsZXMgIT0gbnVsbCA/IGNvbm4udGlsZXMubWFwKCh0aWxlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGUuZmluZERpcmVjdGlvbk9mKHRpbGUpO1xuICAgICAgfSkgOiBbdGhpcy50aWxlLmZpbmREaXJlY3Rpb25PZihjb25uKV07XG4gICAgICByZXR1cm4gZGlyZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZCAhPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuQ29ubmVjdFRvKHRhcmdldCkge1xuICAgICAgcmV0dXJuIENvbm5lY3RlZC5wcm90b3R5cGUuY2FuQ29ubmVjdFRvLmNhbGwodGhpcywgdGFyZ2V0KSAmJiAoKHRhcmdldC53aXJlVHlwZSA9PSBudWxsKSB8fCB0YXJnZXQud2lyZVR5cGUgPT09IHRoaXMud2lyZVR5cGUpO1xuICAgIH1cblxuICAgIG9uTmV3U2lnbmFsVHlwZShzaWduYWwsIG9wKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3J3YXJkU2lnbmFsKHNpZ25hbCwgb3ApO1xuICAgIH1cblxuICB9O1xuXG4gIFdpcmUuZXh0ZW5kKENvbm5lY3RlZCk7XG5cbiAgV2lyZS5wcm9wZXJ0aWVzKHtcbiAgICBvdXRwdXRzOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdGlvbikge1xuICAgICAgICB2YXIgcGFyZW50O1xuICAgICAgICBwYXJlbnQgPSBpbnZhbGlkYXRpb24ucHJvcCh0aGlzLnRpbGVQcm9wZXJ0eSk7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0aW9uLnByb3AocGFyZW50LmFkamFjZW50VGlsZXNQcm9wZXJ0eSkucmVkdWNlKChyZXMsIHRpbGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuY29uY2F0KGludmFsaWRhdGlvbi5wcm9wKHRpbGUuY2hpbGRyZW5Qcm9wZXJ0eSkuZmlsdGVyKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYW5Db25uZWN0VG8oY2hpbGQpO1xuICAgICAgICAgICAgfSkudG9BcnJheSgpKTtcbiAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjb25uZWN0ZWREaXJlY3Rpb25zOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0aW9uLnByb3AodGhpcy5vdXRwdXRzUHJvcGVydHkpLnJlZHVjZSgob3V0LCBjb25uKSA9PiB7XG4gICAgICAgICAgdGhpcy5maW5kRGlyZWN0aW9uc1RvKGNvbm4pLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgaWYgKGluZGV4T2YuY2FsbChvdXQsIGQpIDwgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gb3V0LnB1c2goZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSwgW10pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFdpcmU7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJDb25uZWN0ZWRcIjogcmVxdWlyZShcIi4vQ29ubmVjdGVkXCIpLFxuICBcIlNpZ25hbFwiOiByZXF1aXJlKFwiLi9TaWduYWxcIiksXG4gIFwiU2lnbmFsT3BlcmF0aW9uXCI6IHJlcXVpcmUoXCIuL1NpZ25hbE9wZXJhdGlvblwiKSxcbiAgXCJTaWduYWxTb3VyY2VcIjogcmVxdWlyZShcIi4vU2lnbmFsU291cmNlXCIpLFxuICBcIlN3aXRjaFwiOiByZXF1aXJlKFwiLi9Td2l0Y2hcIiksXG4gIFwiV2lyZVwiOiByZXF1aXJlKFwiLi9XaXJlXCIpLFxufSIsInZhciBBaXJsb2NrLCBUaWxlO1xuXG5UaWxlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGU7XG5cbm1vZHVsZS5leHBvcnRzID0gQWlybG9jayA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQWlybG9jayBleHRlbmRzIFRpbGUge1xuICAgIGF0dGFjaFRvKGFpcmxvY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dGFjaGVkVG8gPSBhaXJsb2NrO1xuICAgIH1cblxuICB9O1xuXG4gIEFpcmxvY2sucHJvcGVydGllcyh7XG4gICAgZGlyZWN0aW9uOiB7fSxcbiAgICBhdHRhY2hlZFRvOiB7fVxuICB9KTtcblxuICByZXR1cm4gQWlybG9jaztcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9BaXJsb2NrLmpzLm1hcFxuIiwidmFyIEFwcHJvYWNoLCBFbGVtZW50LCBUaW1pbmc7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHByb2FjaCA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQXBwcm9hY2ggZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBzdGFydChsb2NhdGlvbikge1xuICAgICAgaWYgKHRoaXMudmFsaWQpIHtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnN1YmplY3QueE1lbWJlcnMuYWRkUHJvcGVydHlSZWYoJ3Bvc2l0aW9uLm9mZnNldFgnLCB0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0LnlNZW1iZXJzLmFkZFByb3BlcnR5UmVmKCdwb3NpdGlvbi5vZmZzZXRZJywgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kb25lKCk7XG4gICAgICAgIH0sIHRoaXMuZHVyYXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRvbmUoKSB7XG4gICAgICB0aGlzLnN1YmplY3QueE1lbWJlcnMucmVtb3ZlUmVmKCdwb3NpdGlvbi5vZmZzZXRYJywgdGhpcyk7XG4gICAgICB0aGlzLnN1YmplY3QueU1lbWJlcnMucmVtb3ZlUmVmKCdwb3NpdGlvbi5vZmZzZXRZJywgdGhpcyk7XG4gICAgICB0aGlzLnN1YmplY3QueCA9IHRoaXMudGFyZ2V0UG9zLng7XG4gICAgICB0aGlzLnN1YmplY3QueSA9IHRoaXMudGFyZ2V0UG9zLng7XG4gICAgICB0aGlzLnN1YmplY3RBaXJsb2NrLmF0dGFjaFRvKHRhcmdldEFpcmxvY2spO1xuICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICB9XG5cbiAgfTtcblxuICBBcHByb2FjaC5wcm9wZXJ0aWVzKHtcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltaW5nKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbml0aWFsRGlzdDoge1xuICAgICAgZGVmYXVsdDogNTAwXG4gICAgfSxcbiAgICBybmc6IHtcbiAgICAgIGRlZmF1bHQ6IE1hdGgucmFuZG9tXG4gICAgfSxcbiAgICBhbmdsZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm5nICogTWF0aC5QSSAqIDI7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydGluZ1Bvczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB0aGlzLnN0YXJ0aW5nUG9zLnggKyB0aGlzLmluaXRpYWxEaXN0ICogTWF0aC5jb3ModGhpcy5hbmdsZSksXG4gICAgICAgICAgeTogdGhpcy5zdGFydGluZ1Bvcy55ICsgdGhpcy5pbml0aWFsRGlzdCAqIE1hdGguc2luKHRoaXMuYW5nbGUpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICB0YXJnZXRQb3M6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogdGhpcy50YXJnZXRBaXJsb2NrLnggLSB0aGlzLnN1YmplY3RBaXJsb2NrLngsXG4gICAgICAgICAgeTogdGhpcy50YXJnZXRBaXJsb2NrLnkgLSB0aGlzLnN1YmplY3RBaXJsb2NrLnlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN1YmplY3Q6IHt9LFxuICAgIHRhcmdldDoge30sXG4gICAgc3ViamVjdEFpcmxvY2s6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhaXJsb2NrcztcbiAgICAgICAgYWlybG9ja3MgPSB0aGlzLnN1YmplY3QuYWlybG9ja3Muc2xpY2UoKTtcbiAgICAgICAgYWlybG9ja3Muc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIHZhciB2YWxBLCB2YWxCO1xuICAgICAgICAgIHZhbEEgPSBNYXRoLmFicyhhLmRpcmVjdGlvbi54IC0gTWF0aC5jb3ModGhpcy5hbmdsZSkpICsgTWF0aC5hYnMoYS5kaXJlY3Rpb24ueSAtIE1hdGguc2luKHRoaXMuYW5nbGUpKTtcbiAgICAgICAgICB2YWxCID0gTWF0aC5hYnMoYi5kaXJlY3Rpb24ueCAtIE1hdGguY29zKHRoaXMuYW5nbGUpKSArIE1hdGguYWJzKGIuZGlyZWN0aW9uLnkgLSBNYXRoLnNpbih0aGlzLmFuZ2xlKSk7XG4gICAgICAgICAgcmV0dXJuIHZhbEEgLSB2YWxCO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFpcmxvY2tzWzBdO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGFyZ2V0QWlybG9jazoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFpcmxvY2tzLmZpbmQoKHRhcmdldCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuZGlyZWN0aW9uLmdldEludmVyc2UoKSA9PT0gdGhpcy5zdWJqZWN0QWlybG9jay5kaXJlY3Rpb247XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgbW92aW5nOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgY29tcGxldGU6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBjdXJyZW50UG9zOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBlbmQsIHByYywgc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gaW52YWxpZGF0b3IucHJvcCh0aGlzLnN0YXJ0aW5nUG9zUHJvcGVydHkpO1xuICAgICAgICBlbmQgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMudGFyZ2V0UG9zUHJvcGVydHkpO1xuICAgICAgICBwcmMgPSBpbnZhbGlkYXRvci5wcm9wUGF0aChcInRpbWVvdXQucHJjXCIpIHx8IDA7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogKGVuZC54IC0gc3RhcnQueCkgKiBwcmMgKyBzdGFydC54LFxuICAgICAgICAgIHk6IChlbmQueSAtIHN0YXJ0LnkpICogcHJjICsgc3RhcnQueVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgZHVyYXRpb246IHtcbiAgICAgIGRlZmF1bHQ6IDEwMDAwXG4gICAgfSxcbiAgICB0aW1lb3V0OiB7fVxuICB9KTtcblxuICByZXR1cm4gQXBwcm9hY2g7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQXBwcm9hY2guanMubWFwXG4iLCJ2YXIgQXV0b21hdGljRG9vciwgQ2hhcmFjdGVyLCBEb29yO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9Eb29yJyk7XG5cbkNoYXJhY3RlciA9IHJlcXVpcmUoJy4vQ2hhcmFjdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXV0b21hdGljRG9vciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQXV0b21hdGljRG9vciBleHRlbmRzIERvb3Ige1xuICAgIHVwZGF0ZVRpbGVNZW1iZXJzKG9sZCkge1xuICAgICAgdmFyIHJlZiwgcmVmMSwgcmVmMiwgcmVmMztcbiAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoKHJlZiA9IG9sZC53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgICByZWYucmVtb3ZlUHJvcGVydHkodGhpcy51bmxvY2tlZFByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHJlZjEgPSBvbGQudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgICAgcmVmMS5yZW1vdmVQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgICAgaWYgKChyZWYyID0gdGhpcy50aWxlLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICAgIHJlZjIuYWRkUHJvcGVydHkodGhpcy51bmxvY2tlZFByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHJlZjMgPSB0aGlzLnRpbGUudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsID8gcmVmMy5hZGRQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSkgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHJldHVybiB0aGlzLm9wZW47XG4gICAgfVxuXG4gICAgaXNBY3RpdmF0b3JQcmVzZW50KGludmFsaWRhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFJlYWN0aXZlVGlsZXMoaW52YWxpZGF0ZSkuc29tZSgodGlsZSkgPT4ge1xuICAgICAgICB2YXIgY2hpbGRyZW47XG4gICAgICAgIGNoaWxkcmVuID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCh0aWxlLmNoaWxkcmVuUHJvcGVydHkpIDogdGlsZS5jaGlsZHJlbjtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuLnNvbWUoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2FuQmVBY3RpdmF0ZWRCeShjaGlsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuQmVBY3RpdmF0ZWRCeShlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbSBpbnN0YW5jZW9mIENoYXJhY3RlcjtcbiAgICB9XG5cbiAgICBnZXRSZWFjdGl2ZVRpbGVzKGludmFsaWRhdGUpIHtcbiAgICAgIHZhciBkaXJlY3Rpb24sIHRpbGU7XG4gICAgICB0aWxlID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCh0aGlzLnRpbGVQcm9wZXJ0eSkgOiB0aGlzLnRpbGU7XG4gICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgZGlyZWN0aW9uID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCh0aGlzLmRpcmVjdGlvblByb3BlcnR5KSA6IHRoaXMuZGlyZWN0aW9uO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRG9vci5kaXJlY3Rpb25zLmhvcml6b250YWwpIHtcbiAgICAgICAgcmV0dXJuIFt0aWxlLCB0aWxlLmdldFJlbGF0aXZlVGlsZSgwLCAxKSwgdGlsZS5nZXRSZWxhdGl2ZVRpbGUoMCwgLTEpXS5maWx0ZXIoZnVuY3Rpb24odCkge1xuICAgICAgICAgIHJldHVybiB0ICE9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFt0aWxlLCB0aWxlLmdldFJlbGF0aXZlVGlsZSgxLCAwKSwgdGlsZS5nZXRSZWxhdGl2ZVRpbGUoLTEsIDApXS5maWx0ZXIoZnVuY3Rpb24odCkge1xuICAgICAgICAgIHJldHVybiB0ICE9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIEF1dG9tYXRpY0Rvb3IucHJvcGVydGllcyh7XG4gICAgb3Blbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHJldHVybiAhaW52YWxpZGF0ZS5wcm9wKHRoaXMubG9ja2VkUHJvcGVydHkpICYmIHRoaXMuaXNBY3RpdmF0b3JQcmVzZW50KGludmFsaWRhdGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbG9ja2VkOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgdW5sb2NrZWQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4gIWludmFsaWRhdGUucHJvcCh0aGlzLmxvY2tlZFByb3BlcnR5KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBBdXRvbWF0aWNEb29yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0F1dG9tYXRpY0Rvb3IuanMubWFwXG4iLCJ2YXIgQ2hhcmFjdGVyLCBEYW1hZ2VhYmxlLCBUaWxlZCwgV2Fsa0FjdGlvbjtcblxuVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWQ7XG5cbkRhbWFnZWFibGUgPSByZXF1aXJlKCcuL0RhbWFnZWFibGUnKTtcblxuV2Fsa0FjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9XYWxrQWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBUaWxlZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdHMoKSB7XG4gICAgICBpZiAoIXRoaXMudGlsZSAmJiAodGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyICE9IG51bGwpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1dE9uUmFuZG9tVGlsZSh0aGlzLmdhbWUubWFpblRpbGVDb250YWluZXIudGlsZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNhbkdvT25UaWxlKHRpbGUpIHtcbiAgICAgIHJldHVybiAodGlsZSAhPSBudWxsID8gdGlsZS53YWxrYWJsZSA6IHZvaWQgMCkgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIHdhbGtUbyh0aWxlKSB7XG4gICAgICB2YXIgYWN0aW9uO1xuICAgICAgYWN0aW9uID0gbmV3IFdhbGtBY3Rpb24oe1xuICAgICAgICBhY3RvcjogdGhpcyxcbiAgICAgICAgdGFyZ2V0OiB0aWxlXG4gICAgICB9KTtcbiAgICAgIGFjdGlvbi5leGVjdXRlKCk7XG4gICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cblxuICAgIGlzU2VsZWN0YWJsZUJ5KHBsYXllcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gIH07XG5cbiAgQ2hhcmFjdGVyLmV4dGVuZChEYW1hZ2VhYmxlKTtcblxuICBDaGFyYWN0ZXIucHJvcGVydGllcyh7XG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgb2Zmc2V0WDoge1xuICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICBkZWZhdWx0OiAwLjVcbiAgICB9LFxuICAgIG9mZnNldFk6IHtcbiAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgZGVmYXVsdDogMC41XG4gICAgfSxcbiAgICB0aWxlOiB7XG4gICAgICBjb21wb3NlZDogdHJ1ZVxuICAgIH0sXG4gICAgZGVmYXVsdEFjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBXYWxrQWN0aW9uKHtcbiAgICAgICAgICBhY3RvcjogdGhpc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3ZpZGVkQWN0aW9uczoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZSxcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKFwidGlsZS5wcm92aWRlZEFjdGlvbnNcIikgfHwgW107XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQ2hhcmFjdGVyO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0NoYXJhY3Rlci5qcy5tYXBcbiIsInZhciBBdHRhY2tNb3ZlQWN0aW9uLCBDaGFyYWN0ZXJBSSwgRG9vciwgUHJvcGVydHlXYXRjaGVyLCBUaWxlQ29udGFpbmVyLCBWaXNpb25DYWxjdWxhdG9yLCBXYWxrQWN0aW9uO1xuXG5UaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVDb250YWluZXI7XG5cblZpc2lvbkNhbGN1bGF0b3IgPSByZXF1aXJlKCcuL1Zpc2lvbkNhbGN1bGF0b3InKTtcblxuRG9vciA9IHJlcXVpcmUoJy4vRG9vcicpO1xuXG5XYWxrQWN0aW9uID0gcmVxdWlyZSgnLi9hY3Rpb25zL1dhbGtBY3Rpb24nKTtcblxuQXR0YWNrTW92ZUFjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9BdHRhY2tNb3ZlQWN0aW9uJyk7XG5cblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS53YXRjaGVycy5Qcm9wZXJ0eVdhdGNoZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyQUkgPSBjbGFzcyBDaGFyYWN0ZXJBSSB7XG4gIGNvbnN0cnVjdG9yKGNoYXJhY3Rlcikge1xuICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xuICAgIHRoaXMubmV4dEFjdGlvbkNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubmV4dEFjdGlvbigpO1xuICAgIH07XG4gICAgdGhpcy52aXNpb25NZW1vcnkgPSBuZXcgVGlsZUNvbnRhaW5lcigpO1xuICAgIHRoaXMudGlsZVdhdGNoZXIgPSBuZXcgUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVZpc2lvbk1lbW9yeSgpO1xuICAgICAgfSxcbiAgICAgIHByb3BlcnR5OiB0aGlzLmNoYXJhY3Rlci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgndGlsZScpXG4gICAgfSk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnRpbGVXYXRjaGVyLmJpbmQoKTtcbiAgICByZXR1cm4gdGhpcy5uZXh0QWN0aW9uKCk7XG4gIH1cblxuICBuZXh0QWN0aW9uKCkge1xuICAgIHZhciBlbm5lbXksIHVuZXhwbG9yZWQ7XG4gICAgdGhpcy51cGRhdGVWaXNpb25NZW1vcnkoKTtcbiAgICBpZiAoZW5uZW15ID0gdGhpcy5nZXRDbG9zZXN0RW5lbXkoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNrTW92ZVRvKGVubmVteSkub24oJ2VuZCcsIG5leHRBY3Rpb25DYWxsYmFjayk7XG4gICAgfSBlbHNlIGlmICh1bmV4cGxvcmVkID0gdGhpcy5nZXRDbG9zZXN0VW5leHBsb3JlZCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrVG8odW5leHBsb3JlZCkub24oJ2VuZCcsIG5leHRBY3Rpb25DYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzZXRWaXNpb25NZW1vcnkoKTtcbiAgICAgIHJldHVybiB0aGlzLndhbGtUbyh0aGlzLmdldENsb3Nlc3RVbmV4cGxvcmVkKCkpLm9uKCdlbmQnLCBuZXh0QWN0aW9uQ2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZpc2lvbk1lbW9yeSgpIHtcbiAgICB2YXIgY2FsY3VsYXRvcjtcbiAgICBjYWxjdWxhdG9yID0gbmV3IFZpc2lvbkNhbGN1bGF0b3IodGhpcy5jaGFyYWN0ZXIudGlsZSk7XG4gICAgY2FsY3VsYXRvci5jYWxjdWwoKTtcbiAgICByZXR1cm4gdGhpcy52aXNpb25NZW1vcnkgPSBjYWxjdWxhdG9yLnRvQ29udGFpbmVyKCkubWVyZ2UodGhpcy52aXNpb25NZW1vcnksIChhLCBiKSA9PiB7XG4gICAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgIGEgPSB0aGlzLmFuYWx5emVUaWxlKGEpO1xuICAgICAgfVxuICAgICAgaWYgKChhICE9IG51bGwpICYmIChiICE9IG51bGwpKSB7XG4gICAgICAgIGEudmlzaWJpbGl0eSA9IE1hdGgubWF4KGEudmlzaWJpbGl0eSwgYi52aXNpYmlsaXR5KTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYSB8fCBiO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYW5hbHl6ZVRpbGUodGlsZSkge1xuICAgIHZhciByZWY7XG4gICAgdGlsZS5lbm5lbXlTcG90dGVkID0gKHJlZiA9IHRpbGUuZ2V0RmluYWxUaWxlKCkuY2hpbGRyZW4pICE9IG51bGwgPyByZWYuZmluZCgoYykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaXNFbm5lbXkoYyk7XG4gICAgfSkgOiB2b2lkIDA7XG4gICAgdGlsZS5leHBsb3JhYmxlID0gdGhpcy5pc0V4cGxvcmFibGUodGlsZSk7XG4gICAgcmV0dXJuIHRpbGU7XG4gIH1cblxuICBpc0VubmVteShlbGVtKSB7XG4gICAgdmFyIHJlZjtcbiAgICByZXR1cm4gKHJlZiA9IHRoaXMuY2hhcmFjdGVyLm93bmVyKSAhPSBudWxsID8gdHlwZW9mIHJlZi5pc0VuZW15ID09PSBcImZ1bmN0aW9uXCIgPyByZWYuaXNFbmVteShlbGVtKSA6IHZvaWQgMCA6IHZvaWQgMDtcbiAgfVxuXG4gIGdldENsb3Nlc3RFbmVteSgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpb25NZW1vcnkuY2xvc2VzdCh0aGlzLmNoYXJhY3Rlci50aWxlLCAodCkgPT4ge1xuICAgICAgcmV0dXJuIHQuZW5uZW15U3BvdHRlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsb3Nlc3RVbmV4cGxvcmVkKCkge1xuICAgIHJldHVybiB0aGlzLnZpc2lvbk1lbW9yeS5jbG9zZXN0KHRoaXMuY2hhcmFjdGVyLnRpbGUsICh0KSA9PiB7XG4gICAgICByZXR1cm4gdC52aXNpYmlsaXR5IDwgMSAmJiB0LmV4cGxvcmFibGU7XG4gICAgfSk7XG4gIH1cblxuICBpc0V4cGxvcmFibGUodGlsZSkge1xuICAgIHZhciByZWY7XG4gICAgdGlsZSA9IHRpbGUuZ2V0RmluYWxUaWxlKCk7XG4gICAgcmV0dXJuIHRpbGUud2Fsa2FibGUgfHwgKChyZWYgPSB0aWxlLmNoaWxkcmVuKSAhPSBudWxsID8gcmVmLmZpbmQoKGMpID0+IHtcbiAgICAgIHJldHVybiBjIGluc3RhbmNlb2YgRG9vcjtcbiAgICB9KSA6IHZvaWQgMCk7XG4gIH1cblxuICBhdHRhY2tNb3ZlVG8odGlsZSkge1xuICAgIHZhciBhY3Rpb247XG4gICAgdGlsZSA9IHRpbGUuZ2V0RmluYWxUaWxlKCk7XG4gICAgYWN0aW9uID0gbmV3IEF0dGFja01vdmVBY3Rpb24oe1xuICAgICAgYWN0b3I6IHRoaXMuY2hhcmFjdGVyLFxuICAgICAgdGFyZ2V0OiB0aWxlXG4gICAgfSk7XG4gICAgaWYgKGFjdGlvbi5pc1JlYWR5KCkpIHtcbiAgICAgIGFjdGlvbi5leGVjdXRlKCk7XG4gICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHdhbGtUbyh0aWxlKSB7XG4gICAgdmFyIGFjdGlvbjtcbiAgICB0aWxlID0gdGlsZS5nZXRGaW5hbFRpbGUoKTtcbiAgICBhY3Rpb24gPSBuZXcgV2Fsa0FjdGlvbih7XG4gICAgICBhY3RvcjogdGhpcy5jaGFyYWN0ZXIsXG4gICAgICB0YXJnZXQ6IHRpbGVcbiAgICB9KTtcbiAgICBpZiAoYWN0aW9uLmlzUmVhZHkoKSkge1xuICAgICAgYWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQ2hhcmFjdGVyQUkuanMubWFwXG4iLCJ2YXIgQ29uZnJvbnRhdGlvbiwgRWxlbWVudCwgU2hpcCwgVmlldztcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5WaWV3ID0gcmVxdWlyZSgnLi9WaWV3Jyk7XG5cblNoaXAgPSByZXF1aXJlKCcuL1NoaXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb25mcm9udGF0aW9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBDb25mcm9udGF0aW9uIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgc3RhcnQoKSB7XG4gICAgICBnYW1lLm1haW5WaWV3ID0gdGhpcy52aWV3O1xuICAgICAgc3ViamVjdC5jb250YWluZXIgPSB0aGlzLnZpZXc7XG4gICAgICByZXR1cm4gb3Bwb25lbnQuY29udGFpbmVyID0gdGhpcy52aWV3O1xuICAgIH1cblxuICB9O1xuXG4gIENvbmZyb250YXRpb24ucHJvcGVydGllcyh7XG4gICAgZ2FtZToge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgc3ViamVjdDoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgdmlldzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWaWV3KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvcHBvbmVudDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaGlwKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQ29uZnJvbnRhdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Db25mcm9udGF0aW9uLmpzLm1hcFxuIiwidmFyIERhbWFnZVByb3BhZ2F0aW9uLCBEaXJlY3Rpb24sIEVsZW1lbnQsIExpbmVPZlNpZ2h0O1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbkxpbmVPZlNpZ2h0ID0gcmVxdWlyZSgnLi9MaW5lT2ZTaWdodCcpO1xuXG5EaXJlY3Rpb24gPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuRGlyZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhbWFnZVByb3BhZ2F0aW9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEYW1hZ2VQcm9wYWdhdGlvbiBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdldFRpbGVDb250YWluZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aWxlLmNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBhcHBseSgpIHtcbiAgICAgIHZhciBkYW1hZ2UsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICAgICAgcmVmID0gdGhpcy5nZXREYW1hZ2VkKCk7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZGFtYWdlID0gcmVmW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goZGFtYWdlLnRhcmdldC5kYW1hZ2UoZGFtYWdlLmRhbWFnZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgZ2V0SW5pdGlhbFRpbGVzKCkge1xuICAgICAgdmFyIGN0bjtcbiAgICAgIGN0biA9IHRoaXMuZ2V0VGlsZUNvbnRhaW5lcigpO1xuICAgICAgcmV0dXJuIGN0bi5pblJhbmdlKHRoaXMudGlsZSwgdGhpcy5yYW5nZSk7XG4gICAgfVxuXG4gICAgZ2V0SW5pdGlhbERhbWFnZXMoKSB7XG4gICAgICB2YXIgZGFtYWdlcywgZG1nLCBpLCBsZW4sIHRpbGUsIHRpbGVzO1xuICAgICAgZGFtYWdlcyA9IFtdO1xuICAgICAgdGlsZXMgPSB0aGlzLmdldEluaXRpYWxUaWxlcygpO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gdGlsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGlsZSA9IHRpbGVzW2ldO1xuICAgICAgICBpZiAodGlsZS5kYW1hZ2VhYmxlICYmIChkbWcgPSB0aGlzLmluaXRpYWxEYW1hZ2UodGlsZSwgdGlsZXMubGVuZ3RoKSkpIHtcbiAgICAgICAgICBkYW1hZ2VzLnB1c2goZG1nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRhbWFnZXM7XG4gICAgfVxuXG4gICAgZ2V0RGFtYWdlZCgpIHtcbiAgICAgIHZhciBhZGRlZDtcbiAgICAgIGlmICh0aGlzLl9kYW1hZ2VkID09IG51bGwpIHtcbiAgICAgICAgYWRkZWQgPSBudWxsO1xuICAgICAgICB3aGlsZSAoYWRkZWQgPSB0aGlzLnN0ZXAoYWRkZWQpKSB7XG4gICAgICAgICAgdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2RhbWFnZWQ7XG4gICAgfVxuXG4gICAgc3RlcChhZGRlZCkge1xuICAgICAgaWYgKGFkZGVkICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuZXh0ZW5kZWREYW1hZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIGFkZGVkID0gdGhpcy5leHRlbmQoYWRkZWQpO1xuICAgICAgICAgIHRoaXMuX2RhbWFnZWQgPSBhZGRlZC5jb25jYXQodGhpcy5fZGFtYWdlZCk7XG4gICAgICAgICAgcmV0dXJuIGFkZGVkLmxlbmd0aCA+IDAgJiYgYWRkZWQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYW1hZ2VkID0gdGhpcy5nZXRJbml0aWFsRGFtYWdlcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluRGFtYWdlZCh0YXJnZXQsIGRhbWFnZWQpIHtcbiAgICAgIHZhciBkYW1hZ2UsIGksIGluZGV4LCBsZW47XG4gICAgICBmb3IgKGluZGV4ID0gaSA9IDAsIGxlbiA9IGRhbWFnZWQubGVuZ3RoOyBpIDwgbGVuOyBpbmRleCA9ICsraSkge1xuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2VkW2luZGV4XTtcbiAgICAgICAgaWYgKGRhbWFnZS50YXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGV4dGVuZChkYW1hZ2VkKSB7XG4gICAgICB2YXIgYWRkZWQsIGN0biwgZGFtYWdlLCBkaXIsIGRtZywgZXhpc3RpbmcsIGksIGosIGssIGxlbiwgbGVuMSwgbGVuMiwgbG9jYWwsIHJlZiwgdGFyZ2V0LCB0aWxlO1xuICAgICAgY3RuID0gdGhpcy5nZXRUaWxlQ29udGFpbmVyKCk7XG4gICAgICBhZGRlZCA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZGFtYWdlZC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2VkW2ldO1xuICAgICAgICBsb2NhbCA9IFtdO1xuICAgICAgICBpZiAoZGFtYWdlLnRhcmdldC54ICE9IG51bGwpIHtcbiAgICAgICAgICByZWYgPSBEaXJlY3Rpb24uYWRqYWNlbnRzO1xuICAgICAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgICBkaXIgPSByZWZbal07XG4gICAgICAgICAgICB0aWxlID0gY3RuLmdldFRpbGUoZGFtYWdlLnRhcmdldC54ICsgZGlyLngsIGRhbWFnZS50YXJnZXQueSArIGRpci55KTtcbiAgICAgICAgICAgIGlmICgodGlsZSAhPSBudWxsKSAmJiB0aWxlLmRhbWFnZWFibGUgJiYgdGhpcy5pbkRhbWFnZWQodGlsZSwgdGhpcy5fZGFtYWdlZCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGxvY2FsLnB1c2godGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoayA9IDAsIGxlbjIgPSBsb2NhbC5sZW5ndGg7IGsgPCBsZW4yOyBrKyspIHtcbiAgICAgICAgICB0YXJnZXQgPSBsb2NhbFtrXTtcbiAgICAgICAgICBpZiAoZG1nID0gdGhpcy5leHRlbmRlZERhbWFnZSh0YXJnZXQsIGRhbWFnZSwgbG9jYWwubGVuZ3RoKSkge1xuICAgICAgICAgICAgaWYgKChleGlzdGluZyA9IHRoaXMuaW5EYW1hZ2VkKHRhcmdldCwgYWRkZWQpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgYWRkZWQucHVzaChkbWcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYWRkZWRbZXhpc3RpbmddID0gdGhpcy5tZXJnZURhbWFnZShhZGRlZFtleGlzdGluZ10sIGRtZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWRkZWQ7XG4gICAgfVxuXG4gICAgbWVyZ2VEYW1hZ2UoZDEsIGQyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IGQxLnRhcmdldCxcbiAgICAgICAgcG93ZXI6IGQxLnBvd2VyICsgZDIucG93ZXIsXG4gICAgICAgIGRhbWFnZTogZDEuZGFtYWdlICsgZDIuZGFtYWdlXG4gICAgICB9O1xuICAgIH1cblxuICAgIG1vZGlmeURhbWFnZSh0YXJnZXQsIHBvd2VyKSB7XG4gICAgICBpZiAodHlwZW9mIHRhcmdldC5tb2RpZnlEYW1hZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGFyZ2V0Lm1vZGlmeURhbWFnZShwb3dlciwgdGhpcy50eXBlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihwb3dlcik7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgRGFtYWdlUHJvcGFnYXRpb24ucHJvcGVydGllcyh7XG4gICAgdGlsZToge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgcG93ZXI6IHtcbiAgICAgIGRlZmF1bHQ6IDEwXG4gICAgfSxcbiAgICByYW5nZToge1xuICAgICAgZGVmYXVsdDogMVxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIERhbWFnZVByb3BhZ2F0aW9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5EYW1hZ2VQcm9wYWdhdGlvbi5Ob3JtYWwgPSBjbGFzcyBOb3JtYWwgZXh0ZW5kcyBEYW1hZ2VQcm9wYWdhdGlvbiB7XG4gIGluaXRpYWxEYW1hZ2UodGFyZ2V0LCBuYikge1xuICAgIHZhciBkbWc7XG4gICAgZG1nID0gdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCB0aGlzLnBvd2VyKTtcbiAgICBpZiAoZG1nID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBvd2VyOiB0aGlzLnBvd2VyLFxuICAgICAgICBkYW1hZ2U6IGRtZ1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxufTtcblxuRGFtYWdlUHJvcGFnYXRpb24uVGhlcm1pYyA9IGNsYXNzIFRoZXJtaWMgZXh0ZW5kcyBEYW1hZ2VQcm9wYWdhdGlvbiB7XG4gIGV4dGVuZGVkRGFtYWdlKHRhcmdldCwgbGFzdCwgbmIpIHtcbiAgICB2YXIgZG1nLCBwb3dlcjtcbiAgICBwb3dlciA9IChsYXN0LmRhbWFnZSAtIDEpIC8gMiAvIG5iICogTWF0aC5taW4oMSwgbGFzdC50YXJnZXQuaGVhbHRoIC8gbGFzdC50YXJnZXQubWF4SGVhbHRoICogNSk7XG4gICAgZG1nID0gdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCBwb3dlcik7XG4gICAgaWYgKGRtZyA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwb3dlcjogcG93ZXIsXG4gICAgICAgIGRhbWFnZTogZG1nXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxEYW1hZ2UodGFyZ2V0LCBuYikge1xuICAgIHZhciBkbWcsIHBvd2VyO1xuICAgIHBvd2VyID0gdGhpcy5wb3dlciAvIG5iO1xuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgcG93ZXIpO1xuICAgIGlmIChkbWcgPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgcG93ZXI6IHBvd2VyLFxuICAgICAgICBkYW1hZ2U6IGRtZ1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxufTtcblxuRGFtYWdlUHJvcGFnYXRpb24uS2luZXRpYyA9IGNsYXNzIEtpbmV0aWMgZXh0ZW5kcyBEYW1hZ2VQcm9wYWdhdGlvbiB7XG4gIGV4dGVuZGVkRGFtYWdlKHRhcmdldCwgbGFzdCwgbmIpIHtcbiAgICB2YXIgZG1nLCBwb3dlcjtcbiAgICBwb3dlciA9IChsYXN0LnBvd2VyIC0gbGFzdC5kYW1hZ2UpICogTWF0aC5taW4oMSwgbGFzdC50YXJnZXQuaGVhbHRoIC8gbGFzdC50YXJnZXQubWF4SGVhbHRoICogMikgLSAxO1xuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgcG93ZXIpO1xuICAgIGlmIChkbWcgPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgcG93ZXI6IHBvd2VyLFxuICAgICAgICBkYW1hZ2U6IGRtZ1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpbml0aWFsRGFtYWdlKHRhcmdldCwgbmIpIHtcbiAgICB2YXIgZG1nO1xuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgdGhpcy5wb3dlcik7XG4gICAgaWYgKGRtZyA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwb3dlcjogdGhpcy5wb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbW9kaWZ5RGFtYWdlKHRhcmdldCwgcG93ZXIpIHtcbiAgICBpZiAodHlwZW9mIHRhcmdldC5tb2RpZnlEYW1hZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHRhcmdldC5tb2RpZnlEYW1hZ2UocG93ZXIsIHRoaXMudHlwZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihwb3dlciAqIDAuMjUpO1xuICAgIH1cbiAgfVxuXG4gIG1lcmdlRGFtYWdlKGQxLCBkMikge1xuICAgIHJldHVybiB7XG4gICAgICB0YXJnZXQ6IGQxLnRhcmdldCxcbiAgICAgIHBvd2VyOiBNYXRoLmZsb29yKChkMS5wb3dlciArIGQyLnBvd2VyKSAvIDIpLFxuICAgICAgZGFtYWdlOiBNYXRoLmZsb29yKChkMS5kYW1hZ2UgKyBkMi5kYW1hZ2UpIC8gMilcbiAgICB9O1xuICB9XG5cbn07XG5cbkRhbWFnZVByb3BhZ2F0aW9uLkV4cGxvc2l2ZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRXhwbG9zaXZlIGV4dGVuZHMgRGFtYWdlUHJvcGFnYXRpb24ge1xuICAgIGdldERhbWFnZWQoKSB7XG4gICAgICB2YXIgYW5nbGUsIGksIGluc2lkZSwgcmVmLCBzaGFyZCwgc2hhcmRQb3dlciwgc2hhcmRzLCB0YXJnZXQ7XG4gICAgICB0aGlzLl9kYW1hZ2VkID0gW107XG4gICAgICBzaGFyZHMgPSBNYXRoLnBvdyh0aGlzLnJhbmdlICsgMSwgMik7XG4gICAgICBzaGFyZFBvd2VyID0gdGhpcy5wb3dlciAvIHNoYXJkcztcbiAgICAgIGluc2lkZSA9IHRoaXMudGlsZS5oZWFsdGggPD0gdGhpcy5tb2RpZnlEYW1hZ2UodGhpcy50aWxlLCBzaGFyZFBvd2VyKTtcbiAgICAgIGlmIChpbnNpZGUpIHtcbiAgICAgICAgc2hhcmRQb3dlciAqPSA0O1xuICAgICAgfVxuICAgICAgZm9yIChzaGFyZCA9IGkgPSAwLCByZWYgPSBzaGFyZHM7ICgwIDw9IHJlZiA/IGkgPD0gcmVmIDogaSA+PSByZWYpOyBzaGFyZCA9IDAgPD0gcmVmID8gKytpIDogLS1pKSB7XG4gICAgICAgIGFuZ2xlID0gdGhpcy5ybmcoKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmdldFRpbGVIaXRCeVNoYXJkKGluc2lkZSwgYW5nbGUpO1xuICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9kYW1hZ2VkLnB1c2goe1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICBwb3dlcjogc2hhcmRQb3dlcixcbiAgICAgICAgICAgIGRhbWFnZTogdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCBzaGFyZFBvd2VyKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fZGFtYWdlZDtcbiAgICB9XG5cbiAgICBnZXRUaWxlSGl0QnlTaGFyZChpbnNpZGUsIGFuZ2xlKSB7XG4gICAgICB2YXIgY3RuLCBkaXN0LCB0YXJnZXQsIHZlcnRleDtcbiAgICAgIGN0biA9IHRoaXMuZ2V0VGlsZUNvbnRhaW5lcigpO1xuICAgICAgZGlzdCA9IHRoaXMucmFuZ2UgKiB0aGlzLnJuZygpO1xuICAgICAgdGFyZ2V0ID0ge1xuICAgICAgICB4OiB0aGlzLnRpbGUueCArIDAuNSArIGRpc3QgKiBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgIHk6IHRoaXMudGlsZS55ICsgMC41ICsgZGlzdCAqIE1hdGguc2luKGFuZ2xlKVxuICAgICAgfTtcbiAgICAgIGlmIChpbnNpZGUpIHtcbiAgICAgICAgdmVydGV4ID0gbmV3IExpbmVPZlNpZ2h0KGN0biwgdGhpcy50aWxlLnggKyAwLjUsIHRoaXMudGlsZS55ICsgMC41LCB0YXJnZXQueCwgdGFyZ2V0LnkpO1xuICAgICAgICB2ZXJ0ZXgudHJhdmVyc2FibGVDYWxsYmFjayA9ICh0aWxlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICFpbnNpZGUgfHwgKCh0aWxlICE9IG51bGwpICYmIHRoaXMudHJhdmVyc2FibGVDYWxsYmFjayh0aWxlKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB2ZXJ0ZXguZ2V0RW5kUG9pbnQoKS50aWxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN0bi5nZXRUaWxlKE1hdGguZmxvb3IodGFyZ2V0LngpLCBNYXRoLmZsb29yKHRhcmdldC55KSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgRXhwbG9zaXZlLnByb3BlcnRpZXMoe1xuICAgIHJuZzoge1xuICAgICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgICB9LFxuICAgIHRyYXZlcnNhYmxlQ2FsbGJhY2s6IHtcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgcmV0dXJuICEodHlwZW9mIHRpbGUuZ2V0U29saWQgPT09ICdmdW5jdGlvbicgJiYgdGlsZS5nZXRTb2xpZCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBFeHBsb3NpdmU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRGFtYWdlUHJvcGFnYXRpb24uanMubWFwXG4iLCJ2YXIgRGFtYWdlYWJsZSwgRWxlbWVudDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhbWFnZWFibGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIERhbWFnZWFibGUgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBkYW1hZ2UodmFsKSB7XG4gICAgICByZXR1cm4gdGhpcy5oZWFsdGggPSBNYXRoLm1heCgwLCB0aGlzLmhlYWx0aCAtIHZhbCk7XG4gICAgfVxuXG4gICAgd2hlbk5vSGVhbHRoKCkge31cblxuICB9O1xuXG4gIERhbWFnZWFibGUucHJvcGVydGllcyh7XG4gICAgZGFtYWdlYWJsZToge1xuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgbWF4SGVhbHRoOiB7XG4gICAgICBkZWZhdWx0OiAxMDAwXG4gICAgfSxcbiAgICBoZWFsdGg6IHtcbiAgICAgIGRlZmF1bHQ6IDEwMDAsXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLndoZW5Ob0hlYWx0aCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gRGFtYWdlYWJsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9EYW1hZ2VhYmxlLmpzLm1hcFxuIiwidmFyIERvb3IsIFRpbGVkLCBkaXJlY3Rpb25zO1xuXG5UaWxlZCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlZDtcblxuZGlyZWN0aW9ucyA9IHtcbiAgaG9yaXpvbnRhbDogJ2hvcml6b250YWwnLFxuICB2ZXJ0aWNhbDogJ3ZlcnRpY2FsJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb29yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEb29yIGV4dGVuZHMgVGlsZWQge1xuICAgIHVwZGF0ZVRpbGVNZW1iZXJzKG9sZCkge1xuICAgICAgdmFyIHJlZiwgcmVmMSwgcmVmMiwgcmVmMztcbiAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoKHJlZiA9IG9sZC53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgICByZWYucmVtb3ZlUHJvcGVydHkodGhpcy5vcGVuUHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgocmVmMSA9IG9sZC50cmFuc3BhcmVudE1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgICByZWYxLnJlbW92ZVByb3BlcnR5KHRoaXMub3BlblByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMudGlsZSkge1xuICAgICAgICBpZiAoKHJlZjIgPSB0aGlzLnRpbGUud2Fsa2FibGVNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgICAgcmVmMi5hZGRQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChyZWYzID0gdGhpcy50aWxlLnRyYW5zcGFyZW50TWVtYmVycykgIT0gbnVsbCA/IHJlZjMuYWRkUHJvcGVydHkodGhpcy5vcGVuUHJvcGVydHkpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIERvb3IucHJvcGVydGllcyh7XG4gICAgdGlsZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVUaWxlTWVtYmVycyhvbGQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgb3Blbjoge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGRpcmVjdGlvbjoge1xuICAgICAgZGVmYXVsdDogZGlyZWN0aW9ucy5ob3Jpem9udGFsXG4gICAgfVxuICB9KTtcblxuICBEb29yLmRpcmVjdGlvbnMgPSBkaXJlY3Rpb25zO1xuXG4gIHJldHVybiBEb29yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0Rvb3IuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0VsZW1lbnQuanMubWFwXG4iLCJ2YXIgQ29uZnJvbnRhdGlvbiwgRWxlbWVudCwgRW5jb3VudGVyTWFuYWdlciwgUHJvcGVydHlXYXRjaGVyO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS53YXRjaGVycy5Qcm9wZXJ0eVdhdGNoZXI7XG5cbkNvbmZyb250YXRpb24gPSByZXF1aXJlKCcuL0NvbmZyb250YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbmNvdW50ZXJNYW5hZ2VyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBFbmNvdW50ZXJNYW5hZ2VyIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9uV2F0Y2hlci5iaW5kKCk7XG4gICAgfVxuXG4gICAgdGVzdEVuY291bnRlcigpIHtcbiAgICAgIGlmICh0aGlzLnJuZygpIDw9IHRoaXMuYmFzZVByb2JhYmlsaXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0RW5jb3VudGVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRFbmNvdW50ZXIoKSB7XG4gICAgICB2YXIgZW5jb3VudGVyO1xuICAgICAgZW5jb3VudGVyID0gbmV3IENvbmZyb250YXRpb24oe1xuICAgICAgICBzdWJqZWN0OiB0aGlzLnN1YmplY3RcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGVuY291bnRlci5zdGFydCgpO1xuICAgIH1cblxuICB9O1xuXG4gIEVuY291bnRlck1hbmFnZXIucHJvcGVydGllcyh7XG4gICAgc3ViamVjdDoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgYmFzZVByb2JhYmlsaXR5OiB7XG4gICAgICBkZWZhdWx0OiAwLjJcbiAgICB9LFxuICAgIGxvY2F0aW9uV2F0Y2hlcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXN0RW5jb3VudGVyKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wZXJ0eTogdGhpcy5zdWJqZWN0LnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdsb2NhdGlvbicpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgcm5nOiB7XG4gICAgICBkZWZhdWx0OiBNYXRoLnJhbmRvbVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEVuY291bnRlck1hbmFnZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRW5jb250ZXJNYW5hZ2VyLmpzLm1hcFxuIiwidmFyIEZsb29yLCBUaWxlO1xuXG5UaWxlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGU7XG5cbm1vZHVsZS5leHBvcnRzID0gRmxvb3IgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEZsb29yIGV4dGVuZHMgVGlsZSB7fTtcblxuICBGbG9vci5wcm9wZXJ0aWVzKHtcbiAgICB3YWxrYWJsZToge1xuICAgICAgY29tcG9zZWQ6IHRydWVcbiAgICB9LFxuICAgIHRyYW5zcGFyZW50OiB7XG4gICAgICBjb21wb3NlZDogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEZsb29yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0Zsb29yLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIEdhbWUsIFBsYXllciwgVGltaW5nLCBWaWV3O1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJyk7XG5cblZpZXcgPSByZXF1aXJlKCcuL1ZpZXcnKTtcblxuUGxheWVyID0gcmVxdWlyZSgnLi9QbGF5ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHYW1lIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgc3RhcnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyO1xuICAgIH1cblxuICAgIGFkZChlbGVtKSB7XG4gICAgICBlbGVtLmdhbWUgPSB0aGlzO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuXG4gIH07XG5cbiAgR2FtZS5wcm9wZXJ0aWVzKHtcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltaW5nKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWluVmlldzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMudmlld3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdzLmdldCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IHRoaXMuZGVmYXVsdFZpZXdDbGFzcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdmlld3M6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9LFxuICAgIGN1cnJlbnRQbGF5ZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcnMuZ2V0KDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmFkZChuZXcgdGhpcy5kZWZhdWx0UGxheWVyQ2xhc3MoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsYXllcnM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRWaWV3Q2xhc3MgPSBWaWV3O1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRQbGF5ZXJDbGFzcyA9IFBsYXllcjtcblxuICByZXR1cm4gR2FtZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9HYW1lLmpzLm1hcFxuIiwidmFyIENvbGxlY3Rpb24sIEludmVudG9yeTtcblxuQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5Db2xsZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVudG9yeSA9IGNsYXNzIEludmVudG9yeSBleHRlbmRzIENvbGxlY3Rpb24ge1xuICBnZXRCeVR5cGUodHlwZSkge1xuICAgIHZhciByZXM7XG4gICAgcmVzID0gdGhpcy5maWx0ZXIoZnVuY3Rpb24ocikge1xuICAgICAgcmV0dXJuIHIudHlwZSA9PT0gdHlwZTtcbiAgICB9KTtcbiAgICBpZiAocmVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlc1swXTtcbiAgICB9XG4gIH1cblxuICBhZGRCeVR5cGUodHlwZSwgcXRlLCBwYXJ0aWFsID0gZmFsc2UpIHtcbiAgICB2YXIgcmVzc291cmNlO1xuICAgIHJlc3NvdXJjZSA9IHRoaXMuZ2V0QnlUeXBlKHR5cGUpO1xuICAgIGlmICghcmVzc291cmNlKSB7XG4gICAgICByZXNzb3VyY2UgPSB0aGlzLmluaXRSZXNzb3VyY2UodHlwZSk7XG4gICAgfVxuICAgIGlmIChwYXJ0aWFsKSB7XG4gICAgICByZXR1cm4gcmVzc291cmNlLnBhcnRpYWxDaGFuZ2UocmVzc291cmNlLnF0ZSArIHF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNzb3VyY2UucXRlICs9IHF0ZTtcbiAgICB9XG4gIH1cblxuICBpbml0UmVzc291cmNlKHR5cGUsIG9wdCkge1xuICAgIHJldHVybiB0eXBlLmluaXRSZXNzb3VyY2Uob3B0KTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0ludmVudG9yeS5qcy5tYXBcbiIsInZhciBMaW5lT2ZTaWdodDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lT2ZTaWdodCA9IGNsYXNzIExpbmVPZlNpZ2h0IHtcbiAgY29uc3RydWN0b3IodGlsZXMsIHgxID0gMCwgeTEgPSAwLCB4MiA9IDAsIHkyID0gMCkge1xuICAgIHRoaXMudGlsZXMgPSB0aWxlcztcbiAgICB0aGlzLngxID0geDE7XG4gICAgdGhpcy55MSA9IHkxO1xuICAgIHRoaXMueDIgPSB4MjtcbiAgICB0aGlzLnkyID0geTI7XG4gIH1cblxuICBzZXRYMSh2YWwpIHtcbiAgICB0aGlzLngxID0gdmFsO1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhZGUoKTtcbiAgfVxuXG4gIHNldFkxKHZhbCkge1xuICAgIHRoaXMueTEgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZGFkZSgpO1xuICB9XG5cbiAgc2V0WDIodmFsKSB7XG4gICAgdGhpcy54MiA9IHZhbDtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkYWRlKCk7XG4gIH1cblxuICBzZXRZMih2YWwpIHtcbiAgICB0aGlzLnkyID0gdmFsO1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhZGUoKTtcbiAgfVxuXG4gIGludmFsaWRhZGUoKSB7XG4gICAgdGhpcy5lbmRQb2ludCA9IG51bGw7XG4gICAgdGhpcy5zdWNjZXNzID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XG4gIH1cblxuICB0ZXN0VGlsZSh0aWxlLCBlbnRyeVgsIGVudHJ5WSkge1xuICAgIGlmICh0aGlzLnRyYXZlcnNhYmxlQ2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhdmVyc2FibGVDYWxsYmFjayh0aWxlLCBlbnRyeVgsIGVudHJ5WSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodGlsZSAhPSBudWxsKSAmJiAodHlwZW9mIHRpbGUuZ2V0VHJhbnNwYXJlbnQgPT09ICdmdW5jdGlvbicgPyB0aWxlLmdldFRyYW5zcGFyZW50KCkgOiB0eXBlb2YgdGlsZS50cmFuc3BhcmVudCAhPT0gdm9pZCAwID8gdGlsZS50cmFuc3BhcmVudCA6IHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHRlc3RUaWxlQXQoeCwgeSwgZW50cnlYLCBlbnRyeVkpIHtcbiAgICByZXR1cm4gdGhpcy50ZXN0VGlsZSh0aGlzLnRpbGVzLmdldFRpbGUoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSksIGVudHJ5WCwgZW50cnlZKTtcbiAgfVxuXG4gIHJldmVyc2VUcmFjaW5nKCkge1xuICAgIHZhciB0bXBYLCB0bXBZO1xuICAgIHRtcFggPSB0aGlzLngxO1xuICAgIHRtcFkgPSB0aGlzLnkxO1xuICAgIHRoaXMueDEgPSB0aGlzLngyO1xuICAgIHRoaXMueTEgPSB0aGlzLnkyO1xuICAgIHRoaXMueDIgPSB0bXBYO1xuICAgIHRoaXMueTIgPSB0bXBZO1xuICAgIHJldHVybiB0aGlzLnJldmVyc2VkID0gIXRoaXMucmV2ZXJzZWQ7XG4gIH1cblxuICBjYWxjdWwoKSB7XG4gICAgdmFyIG5leHRYLCBuZXh0WSwgcG9zaXRpdmVYLCBwb3NpdGl2ZVksIHJhdGlvLCB0aWxlWCwgdGlsZVksIHRvdGFsLCB4LCB5O1xuICAgIHJhdGlvID0gKHRoaXMueDIgLSB0aGlzLngxKSAvICh0aGlzLnkyIC0gdGhpcy55MSk7XG4gICAgdG90YWwgPSBNYXRoLmFicyh0aGlzLngyIC0gdGhpcy54MSkgKyBNYXRoLmFicyh0aGlzLnkyIC0gdGhpcy55MSk7XG4gICAgcG9zaXRpdmVYID0gKHRoaXMueDIgLSB0aGlzLngxKSA+PSAwO1xuICAgIHBvc2l0aXZlWSA9ICh0aGlzLnkyIC0gdGhpcy55MSkgPj0gMDtcbiAgICB0aWxlWCA9IHggPSB0aGlzLngxO1xuICAgIHRpbGVZID0geSA9IHRoaXMueTE7XG4gICAgaWYgKHRoaXMucmV2ZXJzZWQpIHtcbiAgICAgIHRpbGVYID0gcG9zaXRpdmVYID8geCA6IE1hdGguY2VpbCh4KSAtIDE7XG4gICAgICB0aWxlWSA9IHBvc2l0aXZlWSA/IHkgOiBNYXRoLmNlaWwoeSkgLSAxO1xuICAgIH1cbiAgICB3aGlsZSAodG90YWwgPiBNYXRoLmFicyh4IC0gdGhpcy54MSkgKyBNYXRoLmFicyh5IC0gdGhpcy55MSkgJiYgdGhpcy50ZXN0VGlsZUF0KHRpbGVYLCB0aWxlWSwgeCwgeSkpIHtcbiAgICAgIG5leHRYID0gcG9zaXRpdmVYID8gTWF0aC5mbG9vcih4KSArIDEgOiBNYXRoLmNlaWwoeCkgLSAxO1xuICAgICAgbmV4dFkgPSBwb3NpdGl2ZVkgPyBNYXRoLmZsb29yKHkpICsgMSA6IE1hdGguY2VpbCh5KSAtIDE7XG4gICAgICBpZiAodGhpcy54MiAtIHRoaXMueDEgPT09IDApIHtcbiAgICAgICAgeSA9IG5leHRZO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnkyIC0gdGhpcy55MSA9PT0gMCkge1xuICAgICAgICB4ID0gbmV4dFg7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKChuZXh0WCAtIHgpIC8gKHRoaXMueDIgLSB0aGlzLngxKSkgPCBNYXRoLmFicygobmV4dFkgLSB5KSAvICh0aGlzLnkyIC0gdGhpcy55MSkpKSB7XG4gICAgICAgIHggPSBuZXh0WDtcbiAgICAgICAgeSA9IChuZXh0WCAtIHRoaXMueDEpIC8gcmF0aW8gKyB0aGlzLnkxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IChuZXh0WSAtIHRoaXMueTEpICogcmF0aW8gKyB0aGlzLngxO1xuICAgICAgICB5ID0gbmV4dFk7XG4gICAgICB9XG4gICAgICB0aWxlWCA9IHBvc2l0aXZlWCA/IHggOiBNYXRoLmNlaWwoeCkgLSAxO1xuICAgICAgdGlsZVkgPSBwb3NpdGl2ZVkgPyB5IDogTWF0aC5jZWlsKHkpIC0gMTtcbiAgICB9XG4gICAgaWYgKHRvdGFsIDw9IE1hdGguYWJzKHggLSB0aGlzLngxKSArIE1hdGguYWJzKHkgLSB0aGlzLnkxKSkge1xuICAgICAgdGhpcy5lbmRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy54MixcbiAgICAgICAgeTogdGhpcy55MixcbiAgICAgICAgdGlsZTogdGhpcy50aWxlcy5nZXRUaWxlKE1hdGguZmxvb3IodGhpcy54MiksIE1hdGguZmxvb3IodGhpcy55MikpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMuc3VjY2VzcyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5kUG9pbnQgPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHRpbGU6IHRoaXMudGlsZXMuZ2V0VGlsZShNYXRoLmZsb29yKHRpbGVYKSwgTWF0aC5mbG9vcih0aWxlWSkpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMuc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZvcmNlU3VjY2VzcygpIHtcbiAgICB0aGlzLmVuZFBvaW50ID0ge1xuICAgICAgeDogdGhpcy54MixcbiAgICAgIHk6IHRoaXMueTIsXG4gICAgICB0aWxlOiB0aGlzLnRpbGVzLmdldFRpbGUoTWF0aC5mbG9vcih0aGlzLngyKSwgTWF0aC5mbG9vcih0aGlzLnkyKSlcbiAgICB9O1xuICAgIHRoaXMuc3VjY2VzcyA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlZCA9IHRydWU7XG4gIH1cblxuICBnZXRTdWNjZXNzKCkge1xuICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XG4gICAgICB0aGlzLmNhbGN1bCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzO1xuICB9XG5cbiAgZ2V0RW5kUG9pbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNhbGN1bGF0ZWQpIHtcbiAgICAgIHRoaXMuY2FsY3VsKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVuZFBvaW50O1xuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTGluZU9mU2lnaHQuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgTWFwO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBNYXAgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBfYWRkVG9Cb25kYXJpZXMobG9jYXRpb24sIGJvdW5kYXJpZXMpIHtcbiAgICAgIGlmICgoYm91bmRhcmllcy50b3AgPT0gbnVsbCkgfHwgbG9jYXRpb24ueSA8IGJvdW5kYXJpZXMudG9wKSB7XG4gICAgICAgIGJvdW5kYXJpZXMudG9wID0gbG9jYXRpb24ueTtcbiAgICAgIH1cbiAgICAgIGlmICgoYm91bmRhcmllcy5sZWZ0ID09IG51bGwpIHx8IGxvY2F0aW9uLnggPCBib3VuZGFyaWVzLmxlZnQpIHtcbiAgICAgICAgYm91bmRhcmllcy5sZWZ0ID0gbG9jYXRpb24ueDtcbiAgICAgIH1cbiAgICAgIGlmICgoYm91bmRhcmllcy5ib3R0b20gPT0gbnVsbCkgfHwgbG9jYXRpb24ueSA+IGJvdW5kYXJpZXMuYm90dG9tKSB7XG4gICAgICAgIGJvdW5kYXJpZXMuYm90dG9tID0gbG9jYXRpb24ueTtcbiAgICAgIH1cbiAgICAgIGlmICgoYm91bmRhcmllcy5yaWdodCA9PSBudWxsKSB8fCBsb2NhdGlvbi54ID4gYm91bmRhcmllcy5yaWdodCkge1xuICAgICAgICByZXR1cm4gYm91bmRhcmllcy5yaWdodCA9IGxvY2F0aW9uLng7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgTWFwLnByb3BlcnRpZXMoe1xuICAgIGxvY2F0aW9uczoge1xuICAgICAgY29sbGVjdGlvbjoge1xuICAgICAgICBjbG9zZXN0OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgdmFyIG1pbiwgbWluRGlzdDtcbiAgICAgICAgICBtaW4gPSBudWxsO1xuICAgICAgICAgIG1pbkRpc3QgPSBudWxsO1xuICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihsb2NhdGlvbikge1xuICAgICAgICAgICAgdmFyIGRpc3Q7XG4gICAgICAgICAgICBkaXN0ID0gbG9jYXRpb24uZGlzdCh4LCB5KTtcbiAgICAgICAgICAgIGlmICgobWluID09IG51bGwpIHx8IG1pbkRpc3QgPiBkaXN0KSB7XG4gICAgICAgICAgICAgIG1pbiA9IGxvY2F0aW9uO1xuICAgICAgICAgICAgICByZXR1cm4gbWluRGlzdCA9IGRpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2VzdHM6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICB2YXIgZGlzdHM7XG4gICAgICAgICAgZGlzdHMgPSB0aGlzLm1hcChmdW5jdGlvbihsb2NhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgZGlzdDogbG9jYXRpb24uZGlzdCh4LCB5KSxcbiAgICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRpc3RzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuZGlzdCAtIGIuZGlzdDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb3B5KGRpc3RzLm1hcChmdW5jdGlvbihkaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzdC5sb2NhdGlvbjtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGJvdW5kYXJpZXM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBib3VuZGFyaWVzO1xuICAgICAgICBib3VuZGFyaWVzID0ge1xuICAgICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgICBsZWZ0OiBudWxsLFxuICAgICAgICAgIGJvdHRvbTogbnVsbCxcbiAgICAgICAgICByaWdodDogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRUb0JvbmRhcmllcyhsb2NhdGlvbiwgYm91bmRhcmllcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYm91bmRhcmllcztcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBNYXA7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTWFwLmpzLm1hcFxuIiwidmFyIE9ic3RhY2xlLCBUaWxlZDtcblxuVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JzdGFjbGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIE9ic3RhY2xlIGV4dGVuZHMgVGlsZWQge1xuICAgIHVwZGF0ZVdhbGthYmxlcyhvbGQpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgICAgaWYgKChyZWYgPSBvbGQud2Fsa2FibGVNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgICAgcmVmLnJlbW92ZVJlZignd2Fsa2FibGUnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMudGlsZSkge1xuICAgICAgICByZXR1cm4gKHJlZjEgPSB0aGlzLnRpbGUud2Fsa2FibGVNZW1iZXJzKSAhPSBudWxsID8gcmVmMS5zZXRWYWx1ZVJlZihmYWxzZSwgJ3dhbGthYmxlJywgdGhpcykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgT2JzdGFjbGUucHJvcGVydGllcyh7XG4gICAgdGlsZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCwgb3ZlcnJpZGVkKSB7XG4gICAgICAgIG92ZXJyaWRlZChvbGQpO1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVXYWxrYWJsZXMob2xkKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBPYnN0YWNsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9PYnN0YWNsZS5qcy5tYXBcbiIsInZhciBFbGVtZW50LCBFdmVudEVtaXR0ZXIsIFBhdGhXYWxrLCBUaW1pbmc7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKTtcblxuRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF0aFdhbGsgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBhdGhXYWxrIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Iod2Fsa2VyLCBwYXRoLCBvcHRpb25zKSB7XG4gICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgIHRoaXMud2Fsa2VyID0gd2Fsa2VyO1xuICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgIGlmICghdGhpcy5wYXRoLnNvbHV0aW9uKSB7XG4gICAgICAgIHRoaXMucGF0aC5jYWxjdWwoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhdGguc29sdXRpb24pIHtcbiAgICAgICAgdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZpbmlzaCgpO1xuICAgICAgICB9LCB0aGlzLnRvdGFsVGltZSk7XG4gICAgICAgIHRoaXMud2Fsa2VyLnRpbGVNZW1iZXJzLmFkZFByb3BlcnR5UGF0aCgncG9zaXRpb24udGlsZScsIHRoaXMpO1xuICAgICAgICB0aGlzLndhbGtlci5vZmZzZXRYTWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ3Bvc2l0aW9uLm9mZnNldFgnLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyLm9mZnNldFlNZW1iZXJzLmFkZFByb3BlcnR5UGF0aCgncG9zaXRpb24ub2Zmc2V0WScsIHRoaXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoVGltZW91dC5wYXVzZSgpO1xuICAgIH1cblxuICAgIGZpbmlzaCgpIHtcbiAgICAgIHRoaXMud2Fsa2VyLnRpbGUgPSB0aGlzLnBvc2l0aW9uLnRpbGU7XG4gICAgICB0aGlzLndhbGtlci5vZmZzZXRYID0gdGhpcy5wb3NpdGlvbi5vZmZzZXRYO1xuICAgICAgdGhpcy53YWxrZXIub2Zmc2V0WSA9IHRoaXMucG9zaXRpb24ub2Zmc2V0WTtcbiAgICAgIHRoaXMuZW1pdCgnZmluaXNoZWQnKTtcbiAgICAgIHJldHVybiB0aGlzLmVuZCgpO1xuICAgIH1cblxuICAgIGludGVycnVwdCgpIHtcbiAgICAgIHRoaXMuZW1pdCgnaW50ZXJydXB0ZWQnKTtcbiAgICAgIHJldHVybiB0aGlzLmVuZCgpO1xuICAgIH1cblxuICAgIGVuZCgpIHtcbiAgICAgIHRoaXMuZW1pdCgnZW5kJyk7XG4gICAgICByZXR1cm4gdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLndhbGtlci53YWxrID09PSB0aGlzKSB7XG4gICAgICAgIHRoaXMud2Fsa2VyLndhbGsgPSBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy53YWxrZXIudGlsZU1lbWJlcnMucmVtb3ZlUmVmKCdwb3NpdGlvbi50aWxlJywgdGhpcyk7XG4gICAgICB0aGlzLndhbGtlci5vZmZzZXRYTWVtYmVycy5yZW1vdmVSZWYoJ3Bvc2l0aW9uLm9mZnNldFgnLCB0aGlzKTtcbiAgICAgIHRoaXMud2Fsa2VyLm9mZnNldFlNZW1iZXJzLnJlbW92ZVJlZigncG9zaXRpb24ub2Zmc2V0WScsIHRoaXMpO1xuICAgICAgdGhpcy5wYXRoVGltZW91dC5kZXN0cm95KCk7XG4gICAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIH1cblxuICB9O1xuXG4gIFBhdGhXYWxrLmluY2x1ZGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5cbiAgUGF0aFdhbGsucHJvcGVydGllcyh7XG4gICAgc3BlZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IDVcbiAgICB9LFxuICAgIHRpbWluZzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhdGhMZW5ndGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGguc29sdXRpb24uZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdGFsVGltZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aExlbmd0aCAvIHRoaXMuc3BlZWQgKiAxMDAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgcG9zaXRpb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5nZXRQb3NBdFByYyhpbnZhbGlkYXRvci5wcm9wUGF0aCgncGF0aFRpbWVvdXQucHJjJykgfHwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUGF0aFdhbGs7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvUGF0aFdhbGsuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgTGluZU9mU2lnaHQsIFBlcnNvbmFsV2VhcG9uLCBUaW1pbmc7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuTGluZU9mU2lnaHQgPSByZXF1aXJlKCcuL0xpbmVPZlNpZ2h0Jyk7XG5cblRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGVyc29uYWxXZWFwb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBlcnNvbmFsV2VhcG9uIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY2FuQmVVc2VkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hhcmdlZDtcbiAgICB9XG5cbiAgICBjYW5Vc2VPbih0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhblVzZUZyb20odGhpcy51c2VyLnRpbGUsIHRhcmdldCk7XG4gICAgfVxuXG4gICAgY2FuVXNlRnJvbSh0aWxlLCB0YXJnZXQpIHtcbiAgICAgIGlmICh0aGlzLnJhbmdlID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluTWVsZWVSYW5nZSh0aWxlLCB0YXJnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5SYW5nZSh0aWxlLCB0YXJnZXQpICYmIHRoaXMuaGFzTGluZU9mU2lnaHQodGlsZSwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpblJhbmdlKHRpbGUsIHRhcmdldCkge1xuICAgICAgdmFyIHJlZiwgdGFyZ2V0VGlsZTtcbiAgICAgIHRhcmdldFRpbGUgPSB0YXJnZXQudGlsZSB8fCB0YXJnZXQ7XG4gICAgICByZXR1cm4gKChyZWYgPSB0aWxlLmRpc3QodGFyZ2V0VGlsZSkpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSA8PSB0aGlzLnJhbmdlO1xuICAgIH1cblxuICAgIGluTWVsZWVSYW5nZSh0aWxlLCB0YXJnZXQpIHtcbiAgICAgIHZhciB0YXJnZXRUaWxlO1xuICAgICAgdGFyZ2V0VGlsZSA9IHRhcmdldC50aWxlIHx8IHRhcmdldDtcbiAgICAgIHJldHVybiBNYXRoLmFicyh0YXJnZXRUaWxlLnggLSB0aWxlLngpICsgTWF0aC5hYnModGFyZ2V0VGlsZS55IC0gdGlsZS55KSA9PT0gMTtcbiAgICB9XG5cbiAgICBoYXNMaW5lT2ZTaWdodCh0aWxlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBsb3MsIHRhcmdldFRpbGU7XG4gICAgICB0YXJnZXRUaWxlID0gdGFyZ2V0LnRpbGUgfHwgdGFyZ2V0O1xuICAgICAgbG9zID0gbmV3IExpbmVPZlNpZ2h0KHRhcmdldFRpbGUuY29udGFpbmVyLCB0aWxlLnggKyAwLjUsIHRpbGUueSArIDAuNSwgdGFyZ2V0VGlsZS54ICsgMC41LCB0YXJnZXRUaWxlLnkgKyAwLjUpO1xuICAgICAgbG9zLnRyYXZlcnNhYmxlQ2FsbGJhY2sgPSBmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgIHJldHVybiB0aWxlLndhbGthYmxlO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBsb3MuZ2V0U3VjY2VzcygpO1xuICAgIH1cblxuICAgIHVzZU9uKHRhcmdldCkge1xuICAgICAgaWYgKHRoaXMuY2FuQmVVc2VkKCkpIHtcbiAgICAgICAgdGFyZ2V0LmRhbWFnZSh0aGlzLnBvd2VyKTtcbiAgICAgICAgdGhpcy5jaGFyZ2VkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2hhcmdlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVjaGFyZ2UoKSB7XG4gICAgICB0aGlzLmNoYXJnaW5nID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLmNoYXJnZVRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFyZ2luZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNoYXJnZWQoKTtcbiAgICAgIH0sIHRoaXMucmVjaGFyZ2VUaW1lKTtcbiAgICB9XG5cbiAgICByZWNoYXJnZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFyZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgaWYgKHRoaXMuY2hhcmdlVGltZW91dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFyZ2VUaW1lb3V0LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBQZXJzb25hbFdlYXBvbi5wcm9wZXJ0aWVzKHtcbiAgICByZWNoYXJnZVRpbWU6IHtcbiAgICAgIGRlZmF1bHQ6IDEwMDBcbiAgICB9LFxuICAgIGNoYXJnZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGNoYXJnaW5nOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBwb3dlcjoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIGRwczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCh0aGlzLnBvd2VyUHJvcGVydHkpIC8gaW52YWxpZGF0b3IucHJvcCh0aGlzLnJlY2hhcmdlVGltZVByb3BlcnR5KSAqIDEwMDA7XG4gICAgICB9XG4gICAgfSxcbiAgICByYW5nZToge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIHVzZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHRpbWluZzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQZXJzb25hbFdlYXBvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9QZXJzb25hbFdlYXBvbi5qcy5tYXBcbiIsInZhciBFbGVtZW50LCBQbGF5ZXI7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBsYXllciBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgdmFyIGZpcnN0O1xuICAgICAgZmlyc3QgPSB0aGlzLmdhbWUucGxheWVycy5sZW5ndGggPT09IDA7XG4gICAgICB0aGlzLmdhbWUucGxheWVycy5hZGQodGhpcyk7XG4gICAgICBpZiAoZmlyc3QgJiYgIXRoaXMuY29udHJvbGxlciAmJiB0aGlzLmdhbWUuZGVmYXVsdFBsYXllckNvbnRyb2xsZXJDbGFzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyID0gbmV3IHRoaXMuZ2FtZS5kZWZhdWx0UGxheWVyQ29udHJvbGxlckNsYXNzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FuVGFyZ2V0QWN0aW9uT24oZWxlbSkge1xuICAgICAgdmFyIGFjdGlvbiwgcmVmO1xuICAgICAgYWN0aW9uID0gdGhpcy5zZWxlY3RlZEFjdGlvbiB8fCAoKHJlZiA9IHRoaXMuc2VsZWN0ZWQpICE9IG51bGwgPyByZWYuZGVmYXVsdEFjdGlvbiA6IHZvaWQgMCk7XG4gICAgICByZXR1cm4gKGFjdGlvbiAhPSBudWxsKSAmJiB0eXBlb2YgYWN0aW9uLmNhblRhcmdldCA9PT0gXCJmdW5jdGlvblwiICYmIGFjdGlvbi5jYW5UYXJnZXQoZWxlbSk7XG4gICAgfVxuXG4gICAgZ3Vlc3NBY3Rpb25UYXJnZXQoYWN0aW9uKSB7XG4gICAgICB2YXIgc2VsZWN0ZWQ7XG4gICAgICBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgICBpZiAodHlwZW9mIGFjdGlvbi5jYW5UYXJnZXQgPT09IFwiZnVuY3Rpb25cIiAmJiAoYWN0aW9uLnRhcmdldCA9PSBudWxsKSAmJiBhY3Rpb24uYWN0b3IgIT09IHNlbGVjdGVkICYmIGFjdGlvbi5jYW5UYXJnZXQoc2VsZWN0ZWQpKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24ud2l0aFRhcmdldChzZWxlY3RlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNhblNlbGVjdChlbGVtKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGVsZW0uaXNTZWxlY3RhYmxlQnkgPT09IFwiZnVuY3Rpb25cIiAmJiBlbGVtLmlzU2VsZWN0YWJsZUJ5KHRoaXMpO1xuICAgIH1cblxuICAgIGNhbkZvY3VzT24oZWxlbSkge1xuICAgICAgaWYgKHR5cGVvZiBlbGVtLklzRm9jdXNhYmxlQnkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gZWxlbS5Jc0ZvY3VzYWJsZUJ5KHRoaXMpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbS5Jc1NlbGVjdGFibGVCeSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBlbGVtLklzU2VsZWN0YWJsZUJ5KHRoaXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEFjdGlvbihhY3Rpb24pIHtcbiAgICAgIGlmIChhY3Rpb24uaXNSZWFkeSgpKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24uc3RhcnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkQWN0aW9uID0gYWN0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGlvblRhcmdldChlbGVtKSB7XG4gICAgICB2YXIgYWN0aW9uLCByZWY7XG4gICAgICBhY3Rpb24gPSB0aGlzLnNlbGVjdGVkQWN0aW9uIHx8ICgocmVmID0gdGhpcy5zZWxlY3RlZCkgIT0gbnVsbCA/IHJlZi5kZWZhdWx0QWN0aW9uIDogdm9pZCAwKTtcbiAgICAgIGFjdGlvbiA9IGFjdGlvbi53aXRoVGFyZ2V0KGVsZW0pO1xuICAgICAgaWYgKGFjdGlvbi5pc1JlYWR5KCkpIHtcbiAgICAgICAgYWN0aW9uLnN0YXJ0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkQWN0aW9uID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkQWN0aW9uID0gYWN0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFBsYXllci5wcm9wZXJ0aWVzKHtcbiAgICBuYW1lOiB7XG4gICAgICBkZWZhdWx0OiAnUGxheWVyJ1xuICAgIH0sXG4gICAgZm9jdXNlZDoge30sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgaWYgKG9sZCAhPSBudWxsID8gb2xkLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdzZWxlY3RlZCcpIDogdm9pZCAwKSB7XG4gICAgICAgICAgb2xkLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChyZWYgPSB0aGlzLnNlbGVjdGVkKSAhPSBudWxsID8gcmVmLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdzZWxlY3RlZCcpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQuc2VsZWN0ZWQgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBnbG9iYWxBY3Rpb25Qcm92aWRlcnM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9LFxuICAgIGFjdGlvblByb3ZpZGVyczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgcmVzLCBzZWxlY3RlZDtcbiAgICAgICAgcmVzID0gaW52YWxpZGF0b3IucHJvcCh0aGlzLmdsb2JhbEFjdGlvblByb3ZpZGVyc1Byb3BlcnR5KS50b0FycmF5KCk7XG4gICAgICAgIHNlbGVjdGVkID0gaW52YWxpZGF0b3IucHJvcCh0aGlzLnNlbGVjdGVkUHJvcGVydHkpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICByZXMucHVzaChzZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9LFxuICAgIGF2YWlsYWJsZUFjdGlvbnM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AodGhpcy5hY3Rpb25Qcm92aWRlcnNQcm9wZXJ0eSkucmVkdWNlKChyZXMsIHByb3ZpZGVyKSA9PiB7XG4gICAgICAgICAgdmFyIGFjdGlvbnMsIHNlbGVjdGVkO1xuICAgICAgICAgIGFjdGlvbnMgPSBpbnZhbGlkYXRvci5wcm9wKHByb3ZpZGVyLnByb3ZpZGVkQWN0aW9uc1Byb3BlcnR5KS50b0FycmF5KCk7XG4gICAgICAgICAgc2VsZWN0ZWQgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMuc2VsZWN0ZWRQcm9wZXJ0eSk7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zLm1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmd1ZXNzQWN0aW9uVGFyZ2V0KGFjdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuY29uY2F0KGFjdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgW10pO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0ZWRBY3Rpb246IHt9LFxuICAgIGNvbnRyb2xsZXI6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlcikge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIucGxheWVyID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFBsYXllcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9QbGF5ZXIuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgUHJvamVjdGlsZSwgVGltaW5nO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdGlsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUHJvamVjdGlsZSBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHt9XG5cbiAgICBsYXVuY2goKSB7XG4gICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRlbGl2ZXJQYXlsb2FkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgfSwgdGhpcy5wYXRoTGVuZ3RoIC8gdGhpcy5zcGVlZCAqIDEwMDApO1xuICAgIH1cblxuICAgIGRlbGl2ZXJQYXlsb2FkKCkge1xuICAgICAgdmFyIHBheWxvYWQ7XG4gICAgICBwYXlsb2FkID0gbmV3IHRoaXMucHJvcGFnYXRpb25UeXBlKHtcbiAgICAgICAgdGlsZTogdGhpcy50YXJnZXQudGlsZSB8fCB0aGlzLnRhcmdldCxcbiAgICAgICAgcG93ZXI6IHRoaXMucG93ZXIsXG4gICAgICAgIHJhbmdlOiB0aGlzLmJsYXN0UmFuZ2VcbiAgICAgIH0pO1xuICAgICAgcGF5bG9hZC5hcHBseSgpO1xuICAgICAgdGhpcy5wYXlsb2FkRGVsaXZlcmVkKCk7XG4gICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBwYXlsb2FkRGVsaXZlcmVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgUHJvamVjdGlsZS5wcm9wZXJ0aWVzKHtcbiAgICBvcmlnaW46IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHRhcmdldDoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgcG93ZXI6IHtcbiAgICAgIGRlZmF1bHQ6IDEwXG4gICAgfSxcbiAgICBibGFzdFJhbmdlOiB7XG4gICAgICBkZWZhdWx0OiAxXG4gICAgfSxcbiAgICBwcm9wYWdhdGlvblR5cGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHNwZWVkOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgcGF0aExlbmd0aDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc3Q7XG4gICAgICAgIGlmICgodGhpcy5vcmlnaW5UaWxlICE9IG51bGwpICYmICh0aGlzLnRhcmdldFRpbGUgIT0gbnVsbCkpIHtcbiAgICAgICAgICBkaXN0ID0gdGhpcy5vcmlnaW5UaWxlLmRpc3QodGhpcy50YXJnZXRUaWxlKTtcbiAgICAgICAgICBpZiAoZGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3QubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgb3JpZ2luVGlsZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgb3JpZ2luO1xuICAgICAgICBvcmlnaW4gPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMub3JpZ2luUHJvcGVydHkpO1xuICAgICAgICBpZiAob3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gb3JpZ2luLnRpbGUgfHwgb3JpZ2luO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB0YXJnZXRUaWxlOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciB0YXJnZXQ7XG4gICAgICAgIHRhcmdldCA9IGludmFsaWRhdG9yLnByb3AodGhpcy50YXJnZXRQcm9wZXJ0eSk7XG4gICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQudGlsZSB8fCB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRhaW5lcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHZhciBvcmlnaW5UaWxlLCB0YXJnZXRUaWxlO1xuICAgICAgICBvcmlnaW5UaWxlID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMub3JpZ2luVGlsZVByb3BlcnR5KTtcbiAgICAgICAgdGFyZ2V0VGlsZSA9IGludmFsaWRhdGUucHJvcCh0aGlzLnRhcmdldFRpbGVQcm9wZXJ0eSk7XG4gICAgICAgIGlmIChvcmlnaW5UaWxlLmNvbnRhaW5lciA9PT0gdGFyZ2V0VGlsZS5jb250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm4gb3JpZ2luVGlsZS5jb250YWluZXI7XG4gICAgICAgIH0gZWxzZSBpZiAoaW52YWxpZGF0ZS5wcm9wKHRoaXMucHJjUGF0aFByb3BlcnR5KSA+IDAuNSkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXRUaWxlLmNvbnRhaW5lcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb3JpZ2luVGlsZS5jb250YWluZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICB2YXIgc3RhcnRQb3M7XG4gICAgICAgIHN0YXJ0UG9zID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMuc3RhcnRQb3NQcm9wZXJ0eSk7XG4gICAgICAgIHJldHVybiAoaW52YWxpZGF0ZS5wcm9wKHRoaXMudGFyZ2V0UG9zUHJvcGVydHkpLnggLSBzdGFydFBvcy54KSAqIGludmFsaWRhdGUucHJvcCh0aGlzLnByY1BhdGhQcm9wZXJ0eSkgKyBzdGFydFBvcy54O1xuICAgICAgfVxuICAgIH0sXG4gICAgeToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHZhciBzdGFydFBvcztcbiAgICAgICAgc3RhcnRQb3MgPSBpbnZhbGlkYXRlLnByb3AodGhpcy5zdGFydFBvc1Byb3BlcnR5KTtcbiAgICAgICAgcmV0dXJuIChpbnZhbGlkYXRlLnByb3AodGhpcy50YXJnZXRQb3NQcm9wZXJ0eSkueSAtIHN0YXJ0UG9zLnkpICogaW52YWxpZGF0ZS5wcm9wKHRoaXMucHJjUGF0aFByb3BlcnR5KSArIHN0YXJ0UG9zLnk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydFBvczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHZhciBjb250YWluZXIsIGRpc3QsIG9mZnNldCwgb3JpZ2luVGlsZTtcbiAgICAgICAgb3JpZ2luVGlsZSA9IGludmFsaWRhdGUucHJvcCh0aGlzLm9yaWdpblRpbGVQcm9wZXJ0eSk7XG4gICAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdGUucHJvcCh0aGlzLmNvbnRhaW5lclByb3BlcnR5KTtcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy5zdGFydE9mZnNldDtcbiAgICAgICAgaWYgKG9yaWdpblRpbGUuY29udGFpbmVyICE9PSBjb250YWluZXIpIHtcbiAgICAgICAgICBkaXN0ID0gY29udGFpbmVyLmRpc3Qob3JpZ2luVGlsZS5jb250YWluZXIpO1xuICAgICAgICAgIG9mZnNldC54ICs9IGRpc3QueDtcbiAgICAgICAgICBvZmZzZXQueSArPSBkaXN0Lnk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBvcmlnaW5UaWxlLnggKyBvZmZzZXQueCxcbiAgICAgICAgICB5OiBvcmlnaW5UaWxlLnkgKyBvZmZzZXQueVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIG91dHB1dDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGFyZ2V0UG9zOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdGUpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciwgZGlzdCwgb2Zmc2V0LCB0YXJnZXRUaWxlO1xuICAgICAgICB0YXJnZXRUaWxlID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMudGFyZ2V0VGlsZVByb3BlcnR5KTtcbiAgICAgICAgY29udGFpbmVyID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMuY29udGFpbmVyUHJvcGVydHkpO1xuICAgICAgICBvZmZzZXQgPSB0aGlzLnRhcmdldE9mZnNldDtcbiAgICAgICAgaWYgKHRhcmdldFRpbGUuY29udGFpbmVyICE9PSBjb250YWluZXIpIHtcbiAgICAgICAgICBkaXN0ID0gY29udGFpbmVyLmRpc3QodGFyZ2V0VGlsZS5jb250YWluZXIpO1xuICAgICAgICAgIG9mZnNldC54ICs9IGRpc3QueDtcbiAgICAgICAgICBvZmZzZXQueSArPSBkaXN0Lnk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB0YXJnZXRUaWxlLnggKyBvZmZzZXQueCxcbiAgICAgICAgICB5OiB0YXJnZXRUaWxlLnkgKyBvZmZzZXQueVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIG91dHB1dDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RhcnRPZmZzZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgeDogMC41LFxuICAgICAgICB5OiAwLjVcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdmFsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhcmdldE9mZnNldDoge1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB4OiAwLjUsXG4gICAgICAgIHk6IDAuNVxuICAgICAgfSxcbiAgICAgIG91dHB1dDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcHJjUGF0aDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgcmV0dXJuICgocmVmID0gdGhpcy5wYXRoVGltZW91dCkgIT0gbnVsbCA/IHJlZi5wcmMgOiB2b2lkIDApIHx8IDA7XG4gICAgICB9XG4gICAgfSxcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltaW5nKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3Zpbmc6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUHJvamVjdGlsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Qcm9qZWN0aWxlLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFJlc3NvdXJjZTtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3NvdXJjZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUmVzc291cmNlIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgcGFydGlhbENoYW5nZShxdGUpIHtcbiAgICAgIHZhciBhY2NlcHRhYmxlO1xuICAgICAgYWNjZXB0YWJsZSA9IE1hdGgubWF4KHRoaXMubWluUXRlLCBNYXRoLm1pbih0aGlzLm1heFF0ZSwgcXRlKSk7XG4gICAgICB0aGlzLnF0ZSA9IGFjY2VwdGFibGU7XG4gICAgICByZXR1cm4gcXRlIC0gYWNjZXB0YWJsZTtcbiAgICB9XG5cbiAgfTtcblxuICBSZXNzb3VyY2UucHJvcGVydGllcyh7XG4gICAgdHlwZToge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgcXRlOiB7XG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgaW5nZXN0OiBmdW5jdGlvbihxdGUpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4UXRlICE9PSBudWxsICYmIHF0ZSA+IHRoaXMubWF4UXRlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGhhdmUgbW9yZSB0aGFuICcgKyB0aGlzLm1heFF0ZSArICcgb2YgJyArIHRoaXMudHlwZS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5taW5RdGUgIT09IG51bGwgJiYgcXRlIDwgdGhpcy5taW5RdGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgaGF2ZSBsZXNzIHRoYW4gJyArIHRoaXMubWluUXRlICsgJyBvZiAnICsgdGhpcy50eXBlLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdGU7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYXhRdGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG1pblF0ZToge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJlc3NvdXJjZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9SZXNzb3VyY2UuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgUmVzc291cmNlLCBSZXNzb3VyY2VUeXBlO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblJlc3NvdXJjZSA9IHJlcXVpcmUoJy4vUmVzc291cmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzc291cmNlVHlwZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUmVzc291cmNlVHlwZSBleHRlbmRzIEVsZW1lbnQge1xuICAgIGluaXRSZXNzb3VyY2Uob3B0KSB7XG4gICAgICBpZiAodHlwZW9mIG9wdCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICBvcHQgPSB7XG4gICAgICAgICAgcXRlOiBvcHRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdCk7XG4gICAgICByZXR1cm4gbmV3IHRoaXMucmVzc291cmNlQ2xhc3Mob3B0KTtcbiAgICB9XG5cbiAgfTtcblxuICBSZXNzb3VyY2VUeXBlLnByb3BlcnRpZXMoe1xuICAgIG5hbWU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHJlc3NvdXJjZUNsYXNzOiB7XG4gICAgICBkZWZhdWx0OiBSZXNzb3VyY2VcbiAgICB9LFxuICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICBkZWZhdWx0OiB7fVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJlc3NvdXJjZVR5cGU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvUmVzc291cmNlVHlwZS5qcy5tYXBcbiIsInZhciBEaXJlY3Rpb24sIERvb3IsIEVsZW1lbnQsIFJvb21HZW5lcmF0b3IsIFRpbGUsIFRpbGVDb250YWluZXIsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblRpbGVDb250YWluZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZUNvbnRhaW5lcjtcblxuVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlO1xuXG5EaXJlY3Rpb24gPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuRGlyZWN0aW9uO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9Eb29yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vbUdlbmVyYXRvciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUm9vbUdlbmVyYXRvciBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGluaXRUaWxlcygpIHtcbiAgICAgIHRoaXMuZmluYWxUaWxlcyA9IG51bGw7XG4gICAgICB0aGlzLnJvb21zID0gW107XG4gICAgICByZXR1cm4gdGhpcy5mcmVlID0gdGhpcy50aWxlQ29udGFpbmVyLmFsbFRpbGVzKCkuZmlsdGVyKCh0aWxlKSA9PiB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24sIGssIGxlbiwgbmV4dCwgcmVmO1xuICAgICAgICByZWYgPSBEaXJlY3Rpb24uYWxsO1xuICAgICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBkaXJlY3Rpb24gPSByZWZba107XG4gICAgICAgICAgbmV4dCA9IHRoaXMudGlsZUNvbnRhaW5lci5nZXRUaWxlKHRpbGUueCArIGRpcmVjdGlvbi54LCB0aWxlLnkgKyBkaXJlY3Rpb24ueSk7XG4gICAgICAgICAgaWYgKG5leHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bCgpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdGhpcy5pbml0VGlsZXMoKTtcbiAgICAgIGkgPSAwO1xuICAgICAgd2hpbGUgKHRoaXMuc3RlcCgpIHx8IHRoaXMubmV3Um9vbSgpKSB7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICAgIHRoaXMuY3JlYXRlRG9vcnMoKTtcbiAgICAgIHRoaXMucm9vbXM7XG4gICAgICByZXR1cm4gdGhpcy5tYWtlRmluYWxUaWxlcygpO1xuICAgIH1cblxuICAgIGZsb29yRmFjdG9yeShvcHQpIHtcbiAgICAgIHJldHVybiBuZXcgVGlsZShvcHQueCwgb3B0LnkpO1xuICAgIH1cblxuICAgIGRvb3JGYWN0b3J5KG9wdCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmxvb3JGYWN0b3J5KG9wdCk7XG4gICAgfVxuXG4gICAgbWFrZUZpbmFsVGlsZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maW5hbFRpbGVzID0gdGhpcy50aWxlQ29udGFpbmVyLmFsbFRpbGVzKCkubWFwKCh0aWxlKSA9PiB7XG4gICAgICAgIHZhciBvcHQ7XG4gICAgICAgIGlmICh0aWxlLmZhY3RvcnkgIT0gbnVsbCkge1xuICAgICAgICAgIG9wdCA9IHtcbiAgICAgICAgICAgIHg6IHRpbGUueCxcbiAgICAgICAgICAgIHk6IHRpbGUueVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHRpbGUuZmFjdG9yeU9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0ID0gT2JqZWN0LmFzc2lnbihvcHQsIHRpbGUuZmFjdG9yeU9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGlsZS5mYWN0b3J5KG9wdCk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZpbHRlcigodGlsZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGlsZSAhPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0VGlsZXMoKSB7XG4gICAgICBpZiAodGhpcy5maW5hbFRpbGVzID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jYWxjdWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmZpbmFsVGlsZXM7XG4gICAgfVxuXG4gICAgbmV3Um9vbSgpIHtcbiAgICAgIGlmICh0aGlzLmZyZWUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudm9sdW1lID0gTWF0aC5mbG9vcih0aGlzLnJuZygpICogKHRoaXMubWF4Vm9sdW1lIC0gdGhpcy5taW5Wb2x1bWUpKSArIHRoaXMubWluVm9sdW1lO1xuICAgICAgICByZXR1cm4gdGhpcy5yb29tID0gbmV3IFJvb21HZW5lcmF0b3IuUm9vbSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJhbmRvbURpcmVjdGlvbnMoKSB7XG4gICAgICB2YXIgaSwgaiwgbywgeDtcbiAgICAgIG8gPSBEaXJlY3Rpb24uYWRqYWNlbnRzLnNsaWNlKCk7XG4gICAgICBqID0gdm9pZCAwO1xuICAgICAgeCA9IHZvaWQgMDtcbiAgICAgIGkgPSBvLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpKSB7XG4gICAgICAgIGogPSBNYXRoLmZsb29yKHRoaXMucm5nKCkgKiBpKTtcbiAgICAgICAgeCA9IG9bLS1pXTtcbiAgICAgICAgb1tpXSA9IG9bal07XG4gICAgICAgIG9bal0gPSB4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgc3RlcCgpIHtcbiAgICAgIHZhciBzdWNjZXNzLCB0cmllcztcbiAgICAgIGlmICh0aGlzLnJvb20pIHtcbiAgICAgICAgaWYgKHRoaXMuZnJlZS5sZW5ndGggJiYgdGhpcy5yb29tLnRpbGVzLmxlbmd0aCA8IHRoaXMudm9sdW1lIC0gMSkge1xuICAgICAgICAgIGlmICh0aGlzLnJvb20udGlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0cmllcyA9IHRoaXMucmFuZG9tRGlyZWN0aW9ucygpO1xuICAgICAgICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKHRyaWVzLmxlbmd0aCAmJiAhc3VjY2Vzcykge1xuICAgICAgICAgICAgICBzdWNjZXNzID0gdGhpcy5leHBhbmQodGhpcy5yb29tLCB0cmllcy5wb3AoKSwgdGhpcy52b2x1bWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHRoaXMucm9vbURvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFsbG9jYXRlVGlsZSh0aGlzLnJhbmRvbUZyZWVUaWxlKCksIHRoaXMucm9vbSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yb29tRG9uZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJvb21Eb25lKCkge1xuICAgICAgdGhpcy5yb29tcy5wdXNoKHRoaXMucm9vbSk7XG4gICAgICB0aGlzLmFsbG9jYXRlV2FsbHModGhpcy5yb29tKTtcbiAgICAgIHJldHVybiB0aGlzLnJvb20gPSBudWxsO1xuICAgIH1cblxuICAgIGV4cGFuZChyb29tLCBkaXJlY3Rpb24sIG1heCA9IDApIHtcbiAgICAgIHZhciBrLCBsZW4sIG5leHQsIHJlZiwgc2Vjb25kLCBzdWNjZXNzLCB0aWxlO1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmVmID0gcm9vbS50aWxlcztcbiAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICB0aWxlID0gcmVmW2tdO1xuICAgICAgICBpZiAobWF4ID09PSAwIHx8IHJvb20udGlsZXMubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgICAgaWYgKG5leHQgPSB0aGlzLnRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hbGxvY2F0ZVRpbGUobmV4dCwgcm9vbSk7XG4gICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKChzZWNvbmQgPSB0aGlzLnRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uLCAyKSkgJiYgIXRoaXMudGlsZU9mZnNldElzRnJlZSh0aWxlLCBkaXJlY3Rpb24sIDMpKSB7XG4gICAgICAgICAgICB0aGlzLmFsbG9jYXRlVGlsZShzZWNvbmQsIHJvb20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgYWxsb2NhdGVXYWxscyhyb29tKSB7XG4gICAgICB2YXIgZGlyZWN0aW9uLCBrLCBsZW4sIG5leHQsIG5leHRSb29tLCBvdGhlclNpZGUsIHJlZiwgcmVzdWx0cywgdGlsZTtcbiAgICAgIHJlZiA9IHJvb20udGlsZXM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgdGlsZSA9IHJlZltrXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbCwgbGVuMSwgcmVmMSwgcmVzdWx0czE7XG4gICAgICAgICAgcmVmMSA9IERpcmVjdGlvbi5hbGw7XG4gICAgICAgICAgcmVzdWx0czEgPSBbXTtcbiAgICAgICAgICBmb3IgKGwgPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4xOyBsKyspIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IHJlZjFbbF07XG4gICAgICAgICAgICBuZXh0ID0gdGhpcy50aWxlQ29udGFpbmVyLmdldFRpbGUodGlsZS54ICsgZGlyZWN0aW9uLngsIHRpbGUueSArIGRpcmVjdGlvbi55KTtcbiAgICAgICAgICAgIGlmICgobmV4dCAhPSBudWxsKSAmJiBuZXh0LnJvb20gIT09IHJvb20pIHtcbiAgICAgICAgICAgICAgaWYgKGluZGV4T2YuY2FsbChEaXJlY3Rpb24uY29ybmVycywgZGlyZWN0aW9uKSA8IDApIHtcbiAgICAgICAgICAgICAgICBvdGhlclNpZGUgPSB0aGlzLnRpbGVDb250YWluZXIuZ2V0VGlsZSh0aWxlLnggKyBkaXJlY3Rpb24ueCAqIDIsIHRpbGUueSArIGRpcmVjdGlvbi55ICogMik7XG4gICAgICAgICAgICAgICAgbmV4dFJvb20gPSAob3RoZXJTaWRlICE9IG51bGwgPyBvdGhlclNpZGUucm9vbSA6IHZvaWQgMCkgIT0gbnVsbCA/IG90aGVyU2lkZS5yb29tIDogbnVsbDtcbiAgICAgICAgICAgICAgICByb29tLmFkZFdhbGwobmV4dCwgbmV4dFJvb20pO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0Um9vbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0Um9vbS5hZGRXYWxsKG5leHQsIHJvb20pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGhpcy53YWxsRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIG5leHQuZmFjdG9yeSA9IChvcHQpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndhbGxGYWN0b3J5KG9wdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBuZXh0LmZhY3RvcnkuYmFzZSA9IHRoaXMud2FsbEZhY3Rvcnk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0czEucHVzaCh0aGlzLmFsbG9jYXRlVGlsZShuZXh0KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHRzMS5wdXNoKHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzMTtcbiAgICAgICAgfSkuY2FsbCh0aGlzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBjcmVhdGVEb29ycygpIHtcbiAgICAgIHZhciBhZGphY2VudCwgZG9vciwgaywgbGVuLCByZWYsIHJlc3VsdHMsIHJvb20sIHdhbGxzO1xuICAgICAgcmVmID0gdGhpcy5yb29tcztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICByb29tID0gcmVmW2tdO1xuICAgICAgICByZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBsLCBsZW4xLCByZWYxLCByZXN1bHRzMTtcbiAgICAgICAgICByZWYxID0gcm9vbS53YWxsc0J5Um9vbXMoKTtcbiAgICAgICAgICByZXN1bHRzMSA9IFtdO1xuICAgICAgICAgIGZvciAobCA9IDAsIGxlbjEgPSByZWYxLmxlbmd0aDsgbCA8IGxlbjE7IGwrKykge1xuICAgICAgICAgICAgd2FsbHMgPSByZWYxW2xdO1xuICAgICAgICAgICAgaWYgKCh3YWxscy5yb29tICE9IG51bGwpICYmIHJvb20uZG9vcnNGb3JSb29tKHdhbGxzLnJvb20pIDwgMSkge1xuICAgICAgICAgICAgICBkb29yID0gd2FsbHMudGlsZXNbTWF0aC5mbG9vcih0aGlzLnJuZygpICogd2FsbHMudGlsZXMubGVuZ3RoKV07XG4gICAgICAgICAgICAgIGRvb3IuZmFjdG9yeSA9IChvcHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb29yRmFjdG9yeShvcHQpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBkb29yLmZhY3RvcnkuYmFzZSA9IHRoaXMuZG9vckZhY3Rvcnk7XG4gICAgICAgICAgICAgIGFkamFjZW50ID0gdGhpcy50aWxlQ29udGFpbmVyLmdldFRpbGUoZG9vci54ICsgMSwgZG9vci55KTtcbiAgICAgICAgICAgICAgZG9vci5mYWN0b3J5T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGFkamFjZW50LmZhY3RvcnkgJiYgYWRqYWNlbnQuZmFjdG9yeS5iYXNlID09PSB0aGlzLmZsb29yRmFjdG9yeSA/IERvb3IuZGlyZWN0aW9ucy52ZXJ0aWNhbCA6IERvb3IuZGlyZWN0aW9ucy5ob3Jpem9udGFsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJvb20uYWRkRG9vcihkb29yLCB3YWxscy5yb29tKTtcbiAgICAgICAgICAgICAgcmVzdWx0czEucHVzaCh3YWxscy5yb29tLmFkZERvb3IoZG9vciwgcm9vbSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0czEucHVzaCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0czE7XG4gICAgICAgIH0pLmNhbGwodGhpcykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgYWxsb2NhdGVUaWxlKHRpbGUsIHJvb20gPSBudWxsKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICBpZiAocm9vbSAhPSBudWxsKSB7XG4gICAgICAgIHJvb20uYWRkVGlsZSh0aWxlKTtcbiAgICAgICAgdGlsZS5mYWN0b3J5ID0gKG9wdCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZsb29yRmFjdG9yeShvcHQpO1xuICAgICAgICB9O1xuICAgICAgICB0aWxlLmZhY3RvcnkuYmFzZSA9IHRoaXMuZmxvb3JGYWN0b3J5O1xuICAgICAgfVxuICAgICAgaW5kZXggPSB0aGlzLmZyZWUuaW5kZXhPZih0aWxlKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyZWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aWxlT2Zmc2V0SXNGcmVlKHRpbGUsIGRpcmVjdGlvbiwgbXVsdGlwbHkgPSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy50aWxlSXNGcmVlKHRpbGUueCArIGRpcmVjdGlvbi54ICogbXVsdGlwbHksIHRpbGUueSArIGRpcmVjdGlvbi55ICogbXVsdGlwbHkpO1xuICAgIH1cblxuICAgIHRpbGVJc0ZyZWUoeCwgeSkge1xuICAgICAgdmFyIHRpbGU7XG4gICAgICB0aWxlID0gdGhpcy50aWxlQ29udGFpbmVyLmdldFRpbGUoeCwgeSk7XG4gICAgICBpZiAoKHRpbGUgIT0gbnVsbCkgJiYgaW5kZXhPZi5jYWxsKHRoaXMuZnJlZSwgdGlsZSkgPj0gMCkge1xuICAgICAgICByZXR1cm4gdGlsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByYW5kb21GcmVlVGlsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZyZWVbTWF0aC5mbG9vcih0aGlzLnJuZygpICogdGhpcy5mcmVlLmxlbmd0aCldO1xuICAgIH1cblxuICB9O1xuXG4gIFJvb21HZW5lcmF0b3IucHJvcGVydGllcyh7XG4gICAgcm5nOiB7XG4gICAgICBkZWZhdWx0OiBNYXRoLnJhbmRvbVxuICAgIH0sXG4gICAgbWF4Vm9sdW1lOiB7XG4gICAgICBkZWZhdWx0OiAyNVxuICAgIH0sXG4gICAgbWluVm9sdW1lOiB7XG4gICAgICBkZWZhdWx0OiA1MFxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIGRlZmF1bHQ6IDMwXG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIGRlZmF1bHQ6IDE1XG4gICAgfSxcbiAgICB0aWxlQ29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaywgbCwgcmVmLCByZWYxLCB0aWxlcywgeCwgeTtcbiAgICAgICAgdGlsZXMgPSBuZXcgVGlsZUNvbnRhaW5lcigpO1xuICAgICAgICBmb3IgKHggPSBrID0gMCwgcmVmID0gdGhpcy53aWR0aDsgKDAgPD0gcmVmID8gayA8PSByZWYgOiBrID49IHJlZik7IHggPSAwIDw9IHJlZiA/ICsrayA6IC0taykge1xuICAgICAgICAgIGZvciAoeSA9IGwgPSAwLCByZWYxID0gdGhpcy5oZWlnaHQ7ICgwIDw9IHJlZjEgPyBsIDw9IHJlZjEgOiBsID49IHJlZjEpOyB5ID0gMCA8PSByZWYxID8gKytsIDogLS1sKSB7XG4gICAgICAgICAgICB0aWxlcy5hZGRUaWxlKG5ldyBUaWxlKHgsIHkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGVzO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJvb21HZW5lcmF0b3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cblJvb21HZW5lcmF0b3IuUm9vbSA9IGNsYXNzIFJvb20ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy53YWxscyA9IFtdO1xuICAgIHRoaXMuZG9vcnMgPSBbXTtcbiAgfVxuXG4gIGFkZFRpbGUodGlsZSkge1xuICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICByZXR1cm4gdGlsZS5yb29tID0gdGhpcztcbiAgfVxuXG4gIGNvbnRhaW5zV2FsbCh0aWxlKSB7XG4gICAgdmFyIGssIGxlbiwgcmVmLCB3YWxsO1xuICAgIHJlZiA9IHRoaXMud2FsbHM7XG4gICAgZm9yIChrID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICB3YWxsID0gcmVmW2tdO1xuICAgICAgaWYgKHdhbGwudGlsZSA9PT0gdGlsZSkge1xuICAgICAgICByZXR1cm4gd2FsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkV2FsbCh0aWxlLCBuZXh0Um9vbSkge1xuICAgIHZhciBleGlzdGluZztcbiAgICBleGlzdGluZyA9IHRoaXMuY29udGFpbnNXYWxsKHRpbGUpO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgcmV0dXJuIGV4aXN0aW5nLm5leHRSb29tID0gbmV4dFJvb207XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGxzLnB1c2goe1xuICAgICAgICB0aWxlOiB0aWxlLFxuICAgICAgICBuZXh0Um9vbTogbmV4dFJvb21cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHdhbGxzQnlSb29tcygpIHtcbiAgICB2YXIgaywgbGVuLCBwb3MsIHJlZiwgcmVzLCByb29tcywgd2FsbDtcbiAgICByb29tcyA9IFtdO1xuICAgIHJlcyA9IFtdO1xuICAgIHJlZiA9IHRoaXMud2FsbHM7XG4gICAgZm9yIChrID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICB3YWxsID0gcmVmW2tdO1xuICAgICAgcG9zID0gcm9vbXMuaW5kZXhPZih3YWxsLm5leHRSb29tKTtcbiAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgIHBvcyA9IHJvb21zLmxlbmd0aDtcbiAgICAgICAgcm9vbXMucHVzaCh3YWxsLm5leHRSb29tKTtcbiAgICAgICAgcmVzLnB1c2goe1xuICAgICAgICAgIHJvb206IHdhbGwubmV4dFJvb20sXG4gICAgICAgICAgdGlsZXM6IFtdXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVzW3Bvc10udGlsZXMucHVzaCh3YWxsLnRpbGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWRkRG9vcih0aWxlLCBuZXh0Um9vbSkge1xuICAgIHJldHVybiB0aGlzLmRvb3JzLnB1c2goe1xuICAgICAgdGlsZTogdGlsZSxcbiAgICAgIG5leHRSb29tOiBuZXh0Um9vbVxuICAgIH0pO1xuICB9XG5cbiAgZG9vcnNGb3JSb29tKHJvb20pIHtcbiAgICB2YXIgZG9vciwgaywgbGVuLCByZWYsIHJlcztcbiAgICByZXMgPSBbXTtcbiAgICByZWYgPSB0aGlzLmRvb3JzO1xuICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgZG9vciA9IHJlZltrXTtcbiAgICAgIGlmIChkb29yLm5leHRSb29tID09PSByb29tKSB7XG4gICAgICAgIHJlcy5wdXNoKGRvb3IudGlsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Sb29tR2VuZXJhdG9yLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFNoaXAsIFRyYXZlbCwgVHJhdmVsQWN0aW9uO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblRyYXZlbCA9IHJlcXVpcmUoJy4vVHJhdmVsJyk7XG5cblRyYXZlbEFjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9UcmF2ZWxBY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgdHJhdmVsVG8obG9jYXRpb24pIHtcbiAgICAgIHZhciB0cmF2ZWw7XG4gICAgICB0cmF2ZWwgPSBuZXcgVHJhdmVsKHtcbiAgICAgICAgdHJhdmVsbGVyOiB0aGlzLFxuICAgICAgICBzdGFydExvY2F0aW9uOiB0aGlzLmxvY2F0aW9uLFxuICAgICAgICB0YXJnZXRMb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgICAgaWYgKHRyYXZlbC52YWxpZCkge1xuICAgICAgICB0cmF2ZWwuc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhdmVsID0gdHJhdmVsO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFNoaXAucHJvcGVydGllcyh7XG4gICAgbG9jYXRpb246IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHRyYXZlbDoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgcHJvdmlkZWRBY3Rpb25zOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gbmV3IFRyYXZlbEFjdGlvbih7XG4gICAgICAgICAgYWN0b3I6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzcGFjZUNvb2RpbmF0ZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICBpZiAoaW52YWxpZGF0b3IucHJvcCh0aGlzLnRyYXZlbFByb3BlcnR5KSkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wUGF0aCgndHJhdmVsLnNwYWNlQ29vZGluYXRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGludmFsaWRhdG9yLnByb3BQYXRoKCdsb2NhdGlvbi54JyksXG4gICAgICAgICAgICB5OiBpbnZhbGlkYXRvci5wcm9wUGF0aCgnbG9jYXRpb24ueScpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFNoaXA7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvU2hpcC5qcy5tYXBcbiIsInZhciBEYW1hZ2VhYmxlLCBQcm9qZWN0aWxlLCBTaGlwV2VhcG9uLCBUaWxlZCwgVGltaW5nO1xuXG5UaWxlZCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlZDtcblxuVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKTtcblxuRGFtYWdlYWJsZSA9IHJlcXVpcmUoJy4vRGFtYWdlYWJsZScpO1xuXG5Qcm9qZWN0aWxlID0gcmVxdWlyZSgnLi9Qcm9qZWN0aWxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcFdlYXBvbiA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU2hpcFdlYXBvbiBleHRlbmRzIFRpbGVkIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmaXJlKCkge1xuICAgICAgdmFyIHByb2plY3RpbGU7XG4gICAgICBpZiAodGhpcy5jYW5GaXJlKSB7XG4gICAgICAgIHByb2plY3RpbGUgPSBuZXcgdGhpcy5wcm9qZWN0aWxlQ2xhc3Moe1xuICAgICAgICAgIG9yaWdpbjogdGhpcyxcbiAgICAgICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0LFxuICAgICAgICAgIHBvd2VyOiB0aGlzLnBvd2VyLFxuICAgICAgICAgIGJsYXN0UmFuZ2U6IHRoaXMuYmxhc3RSYW5nZSxcbiAgICAgICAgICBwcm9wYWdhdGlvblR5cGU6IHRoaXMucHJvcGFnYXRpb25UeXBlLFxuICAgICAgICAgIHNwZWVkOiB0aGlzLnByb2plY3RpbGVTcGVlZCxcbiAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgIH0pO1xuICAgICAgICBwcm9qZWN0aWxlLmxhdW5jaCgpO1xuICAgICAgICB0aGlzLmNoYXJnZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWNoYXJnZSgpO1xuICAgICAgICByZXR1cm4gcHJvamVjdGlsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZWNoYXJnZSgpIHtcbiAgICAgIHRoaXMuY2hhcmdpbmcgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuY2hhcmdlVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNoYXJnaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2hhcmdlZCgpO1xuICAgICAgfSwgdGhpcy5yZWNoYXJnZVRpbWUpO1xuICAgIH1cblxuICAgIHJlY2hhcmdlZCgpIHtcbiAgICAgIHRoaXMuY2hhcmdlZCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5hdXRvRmlyZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maXJlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcFdlYXBvbi5leHRlbmQoRGFtYWdlYWJsZSk7XG5cbiAgU2hpcFdlYXBvbi5wcm9wZXJ0aWVzKHtcbiAgICByZWNoYXJnZVRpbWU6IHtcbiAgICAgIGRlZmF1bHQ6IDEwMDBcbiAgICB9LFxuICAgIHBvd2VyOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgYmxhc3RSYW5nZToge1xuICAgICAgZGVmYXVsdDogMVxuICAgIH0sXG4gICAgcHJvcGFnYXRpb25UeXBlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBwcm9qZWN0aWxlU3BlZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IDEwXG4gICAgfSxcbiAgICB0YXJnZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvRmlyZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZpcmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2hhcmdlZDoge1xuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgY2hhcmdpbmc6IHtcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGVuYWJsZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGF1dG9GaXJlOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBjcml0aWNhbEhlYWx0aDoge1xuICAgICAgZGVmYXVsdDogMC4zXG4gICAgfSxcbiAgICBjYW5GaXJlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgJiYgdGhpcy5lbmFibGVkICYmIHRoaXMuY2hhcmdlZCAmJiB0aGlzLmhlYWx0aCAvIHRoaXMubWF4SGVhbHRoID49IHRoaXMuY3JpdGljYWxIZWFsdGg7XG4gICAgICB9XG4gICAgfSxcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltaW5nKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9qZWN0aWxlQ2xhc3M6IHtcbiAgICAgIGRlZmF1bHQ6IFByb2plY3RpbGVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTaGlwV2VhcG9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1NoaXBXZWFwb24uanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgTWFwLCBTdGFyTWFwR2VuZXJhdG9yLCBTdGFyU3lzdGVtLCBzdGFyTmFtZXM7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuTWFwID0gcmVxdWlyZSgnLi9NYXAnKTtcblxuU3RhclN5c3RlbSA9IHJlcXVpcmUoJy4vU3RhclN5c3RlbScpO1xuXG5zdGFyTmFtZXMgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXN0cmluZ3MnKS5zdGFyTmFtZXM7XG5cbm1vZHVsZS5leHBvcnRzID0gU3Rhck1hcEdlbmVyYXRvciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU3Rhck1hcEdlbmVyYXRvciBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLm9wdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmT3B0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgIHRoaXMubWFwID0gbmV3IHRoaXMub3B0Lm1hcENsYXNzKCk7XG4gICAgICB0aGlzLnN0YXJzID0gdGhpcy5tYXAubG9jYXRpb25zLmNvcHkoKTtcbiAgICAgIHRoaXMubGlua3MgPSBbXTtcbiAgICAgIHRoaXMuY3JlYXRlU3RhcnModGhpcy5vcHQubmJTdGFycyk7XG4gICAgICB0aGlzLm1ha2VMaW5rcygpO1xuICAgICAgcmV0dXJuIHRoaXMubWFwO1xuICAgIH1cblxuICAgIGNyZWF0ZVN0YXJzKG5iKSB7XG4gICAgICB2YXIgaSwgaywgcmVmLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gayA9IDAsIHJlZiA9IG5iOyAoMCA8PSByZWYgPyBrIDwgcmVmIDogayA+IHJlZik7IGkgPSAwIDw9IHJlZiA/ICsrayA6IC0taykge1xuICAgICAgICByZXN1bHRzLnB1c2godGhpcy5jcmVhdGVTdGFyKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgY3JlYXRlU3RhcihvcHQgPSB7fSkge1xuICAgICAgdmFyIG5hbWUsIHBvcywgc3RhcjtcbiAgICAgIGlmICghKG9wdC54ICYmIG9wdC55KSkge1xuICAgICAgICBwb3MgPSB0aGlzLnJhbmRvbVN0YXJQb3MoKTtcbiAgICAgICAgaWYgKHBvcyAhPSBudWxsKSB7XG4gICAgICAgICAgb3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0LCB7XG4gICAgICAgICAgICB4OiBwb3MueCxcbiAgICAgICAgICAgIHk6IHBvcy55XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghb3B0Lm5hbWUpIHtcbiAgICAgICAgbmFtZSA9IHRoaXMucmFuZG9tU3Rhck5hbWUoKTtcbiAgICAgICAgaWYgKG5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgIG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdCwge1xuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGFyID0gbmV3IHRoaXMub3B0LnN0YXJDbGFzcyhvcHQpO1xuICAgICAgdGhpcy5tYXAubG9jYXRpb25zLnB1c2goc3Rhcik7XG4gICAgICB0aGlzLnN0YXJzLnB1c2goc3Rhcik7XG4gICAgICByZXR1cm4gc3RhcjtcbiAgICB9XG5cbiAgICByYW5kb21TdGFyUG9zKCkge1xuICAgICAgdmFyIGosIHBvcztcbiAgICAgIGogPSAwO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgcG9zID0ge1xuICAgICAgICAgIHg6IE1hdGguZmxvb3IodGhpcy5vcHQucm5nKCkgKiAodGhpcy5vcHQubWF4WCAtIHRoaXMub3B0Lm1pblgpICsgdGhpcy5vcHQubWluWCksXG4gICAgICAgICAgeTogTWF0aC5mbG9vcih0aGlzLm9wdC5ybmcoKSAqICh0aGlzLm9wdC5tYXhZIC0gdGhpcy5vcHQubWluWSkgKyB0aGlzLm9wdC5taW5ZKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoIShqIDwgMTAgJiYgdGhpcy5zdGFycy5maW5kKChzdGFyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHN0YXIuZGlzdChwb3MueCwgcG9zLnkpIDw9IHRoaXMub3B0Lm1pblN0YXJEaXN0O1xuICAgICAgICB9KSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgICBpZiAoIShqID49IDEwKSkge1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJhbmRvbVN0YXJOYW1lKCkge1xuICAgICAgdmFyIG5hbWUsIHBvcywgcmVmO1xuICAgICAgaWYgKChyZWYgPSB0aGlzLm9wdC5zdGFyTmFtZXMpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSB7XG4gICAgICAgIHBvcyA9IE1hdGguZmxvb3IodGhpcy5vcHQucm5nKCkgKiB0aGlzLm9wdC5zdGFyTmFtZXMubGVuZ3RoKTtcbiAgICAgICAgbmFtZSA9IHRoaXMub3B0LnN0YXJOYW1lc1twb3NdO1xuICAgICAgICB0aGlzLm9wdC5zdGFyTmFtZXMuc3BsaWNlKHBvcywgMSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1ha2VMaW5rcygpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZUxpbmtzRnJvbShzdGFyKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VMaW5rc0Zyb20oc3Rhcikge1xuICAgICAgdmFyIGNsb3NlLCBjbG9zZXN0cywgbGluaywgbmVlZGVkLCByZXN1bHRzLCB0cmllcztcbiAgICAgIHRyaWVzID0gdGhpcy5vcHQubGlua1RyaWVzO1xuICAgICAgbmVlZGVkID0gdGhpcy5vcHQubGlua3NCeVN0YXJzIC0gc3Rhci5saW5rcy5jb3VudCgpO1xuICAgICAgaWYgKG5lZWRlZCA+IDApIHtcbiAgICAgICAgY2xvc2VzdHMgPSB0aGlzLnN0YXJzLmZpbHRlcigoc3RhcjIpID0+IHtcbiAgICAgICAgICByZXR1cm4gc3RhcjIgIT09IHN0YXIgJiYgIXN0YXIubGlua3MuZmluZFN0YXIoc3RhcjIpO1xuICAgICAgICB9KS5jbG9zZXN0cyhzdGFyLngsIHN0YXIueSk7XG4gICAgICAgIGlmIChjbG9zZXN0cy5jb3VudCgpID4gMCkge1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY2xvc2UgPSBjbG9zZXN0cy5zaGlmdCgpO1xuICAgICAgICAgICAgbGluayA9IHRoaXMuY3JlYXRlTGluayhzdGFyLCBjbG9zZSk7XG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUxpbmsobGluaykpIHtcbiAgICAgICAgICAgICAgdGhpcy5saW5rcy5wdXNoKGxpbmspO1xuICAgICAgICAgICAgICBzdGFyLmFkZExpbmsobGluayk7XG4gICAgICAgICAgICAgIG5lZWRlZCAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJpZXMgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG5lZWRlZCA+IDAgJiYgdHJpZXMgPiAwICYmIGNsb3Nlc3RzLmNvdW50KCkgPiAwKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUxpbmsoc3RhcjEsIHN0YXIyKSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMub3B0LmxpbmtDbGFzcyhzdGFyMSwgc3RhcjIpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlTGluayhsaW5rKSB7XG4gICAgICByZXR1cm4gIXRoaXMuc3RhcnMuZmluZCgoc3RhcikgPT4ge1xuICAgICAgICByZXR1cm4gc3RhciAhPT0gbGluay5zdGFyMSAmJiBzdGFyICE9PSBsaW5rLnN0YXIyICYmIGxpbmsuY2xvc2VUb1BvaW50KHN0YXIueCwgc3Rhci55LCB0aGlzLm9wdC5taW5MaW5rRGlzdCk7XG4gICAgICB9KSAmJiAhdGhpcy5saW5rcy5maW5kKChsaW5rMikgPT4ge1xuICAgICAgICByZXR1cm4gbGluazIuaW50ZXJzZWN0TGluayhsaW5rKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9O1xuXG4gIFN0YXJNYXBHZW5lcmF0b3IucHJvdG90eXBlLmRlZk9wdCA9IHtcbiAgICBuYlN0YXJzOiAyMCxcbiAgICBtaW5YOiAwLFxuICAgIG1heFg6IDUwMCxcbiAgICBtaW5ZOiAwLFxuICAgIG1heFk6IDUwMCxcbiAgICBtaW5TdGFyRGlzdDogMjAsXG4gICAgbWluTGlua0Rpc3Q6IDIwLFxuICAgIGxpbmtzQnlTdGFyczogMyxcbiAgICBsaW5rVHJpZXM6IDMsXG4gICAgbWFwQ2xhc3M6IE1hcCxcbiAgICBzdGFyQ2xhc3M6IFN0YXJTeXN0ZW0sXG4gICAgbGlua0NsYXNzOiBTdGFyU3lzdGVtLkxpbmssXG4gICAgcm5nOiBNYXRoLnJhbmRvbSxcbiAgICBzdGFyTmFtZXM6IHN0YXJOYW1lc1xuICB9O1xuXG4gIHJldHVybiBTdGFyTWFwR2VuZXJhdG9yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1N0YXJNYXBHZW5lcmF0b3IuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgU3RhclN5c3RlbTtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXJTeXN0ZW0gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFN0YXJTeXN0ZW0gZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICBzdXBlcihkYXRhKTtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7fVxuXG4gICAgbGlua1RvKHN0YXIpIHtcbiAgICAgIGlmICghdGhpcy5saW5rcy5maW5kU3RhcihzdGFyKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaW5rKG5ldyB0aGlzLmNvbnN0cnVjdG9yLkxpbmsodGhpcywgc3RhcikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFkZExpbmsobGluaykge1xuICAgICAgdGhpcy5saW5rcy5hZGQobGluayk7XG4gICAgICBsaW5rLm90aGVyU3Rhcih0aGlzKS5saW5rcy5hZGQobGluayk7XG4gICAgICByZXR1cm4gbGluaztcbiAgICB9XG5cbiAgICBkaXN0KHgsIHkpIHtcbiAgICAgIHZhciB4RGlzdCwgeURpc3Q7XG4gICAgICB4RGlzdCA9IHRoaXMueCAtIHg7XG4gICAgICB5RGlzdCA9IHRoaXMueSAtIHk7XG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KCh4RGlzdCAqIHhEaXN0KSArICh5RGlzdCAqIHlEaXN0KSk7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RhYmxlQnkocGxheWVyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgfTtcblxuICBTdGFyU3lzdGVtLnByb3BlcnRpZXMoe1xuICAgIHg6IHt9LFxuICAgIHk6IHt9LFxuICAgIG5hbWU6IHt9LFxuICAgIGxpbmtzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB7XG4gICAgICAgIGZpbmRTdGFyOiBmdW5jdGlvbihzdGFyKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZmluZChmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gbGluay5zdGFyMiA9PT0gc3RhciB8fCBsaW5rLnN0YXIxID09PSBzdGFyO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBTdGFyU3lzdGVtLmNvbGxlbmN0aW9uRm4gPSB7XG4gICAgY2xvc2VzdDogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgdmFyIG1pbiwgbWluRGlzdDtcbiAgICAgIG1pbiA9IG51bGw7XG4gICAgICBtaW5EaXN0ID0gbnVsbDtcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihzdGFyKSB7XG4gICAgICAgIHZhciBkaXN0O1xuICAgICAgICBkaXN0ID0gc3Rhci5kaXN0KHgsIHkpO1xuICAgICAgICBpZiAoKG1pbiA9PSBudWxsKSB8fCBtaW5EaXN0ID4gZGlzdCkge1xuICAgICAgICAgIG1pbiA9IHN0YXI7XG4gICAgICAgICAgcmV0dXJuIG1pbkRpc3QgPSBkaXN0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtaW47XG4gICAgfSxcbiAgICBjbG9zZXN0czogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgdmFyIGRpc3RzO1xuICAgICAgZGlzdHMgPSB0aGlzLm1hcChmdW5jdGlvbihzdGFyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGlzdDogc3Rhci5kaXN0KHgsIHkpLFxuICAgICAgICAgIHN0YXI6IHN0YXJcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgZGlzdHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmRpc3QgLSBiLmRpc3Q7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLmNvcHkoZGlzdHMubWFwKGZ1bmN0aW9uKGRpc3QpIHtcbiAgICAgICAgcmV0dXJuIGRpc3Quc3RhcjtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFN0YXJTeXN0ZW07XG5cbn0pLmNhbGwodGhpcyk7XG5cblN0YXJTeXN0ZW0uTGluayA9IGNsYXNzIExpbmsgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc3RhcjEsIHN0YXIyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXIxID0gc3RhcjE7XG4gICAgdGhpcy5zdGFyMiA9IHN0YXIyO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuc3RhcjEubGlua3MucmVtb3ZlKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnN0YXIyLmxpbmtzLnJlbW92ZSh0aGlzKTtcbiAgfVxuXG4gIG90aGVyU3RhcihzdGFyKSB7XG4gICAgaWYgKHN0YXIgPT09IHRoaXMuc3RhcjEpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXIyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGFyMTtcbiAgICB9XG4gIH1cblxuICBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcjEuZGlzdCh0aGlzLnN0YXIyLngsIHRoaXMuc3RhcjIueSk7XG4gIH1cblxuICBpbkJvdW5kYXJ5Qm94KHgsIHksIHBhZGRpbmcgPSAwKSB7XG4gICAgdmFyIHgxLCB4MiwgeTEsIHkyO1xuICAgIHgxID0gTWF0aC5taW4odGhpcy5zdGFyMS54LCB0aGlzLnN0YXIyLngpIC0gcGFkZGluZztcbiAgICB5MSA9IE1hdGgubWluKHRoaXMuc3RhcjEueSwgdGhpcy5zdGFyMi55KSAtIHBhZGRpbmc7XG4gICAgeDIgPSBNYXRoLm1heCh0aGlzLnN0YXIxLngsIHRoaXMuc3RhcjIueCkgKyBwYWRkaW5nO1xuICAgIHkyID0gTWF0aC5tYXgodGhpcy5zdGFyMS55LCB0aGlzLnN0YXIyLnkpICsgcGFkZGluZztcbiAgICByZXR1cm4geCA+PSB4MSAmJiB4IDw9IHgyICYmIHkgPj0geTEgJiYgeSA8PSB5MjtcbiAgfVxuXG4gIGNsb3NlVG9Qb2ludCh4LCB5LCBtaW5EaXN0KSB7XG4gICAgdmFyIGEsIGFiRGlzdCwgYWJjQW5nbGUsIGFieEFuZ2xlLCBhY0Rpc3QsIGFjeEFuZ2xlLCBiLCBjLCBjZERpc3QsIHhBYkRpc3QsIHhBY0Rpc3QsIHlBYkRpc3QsIHlBY0Rpc3Q7XG4gICAgaWYgKCF0aGlzLmluQm91bmRhcnlCb3goeCwgeSwgbWluRGlzdCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYSA9IHRoaXMuc3RhcjE7XG4gICAgYiA9IHRoaXMuc3RhcjI7XG4gICAgYyA9IHtcbiAgICAgIFwieFwiOiB4LFxuICAgICAgXCJ5XCI6IHlcbiAgICB9O1xuICAgIHhBYkRpc3QgPSBiLnggLSBhLng7XG4gICAgeUFiRGlzdCA9IGIueSAtIGEueTtcbiAgICBhYkRpc3QgPSBNYXRoLnNxcnQoKHhBYkRpc3QgKiB4QWJEaXN0KSArICh5QWJEaXN0ICogeUFiRGlzdCkpO1xuICAgIGFieEFuZ2xlID0gTWF0aC5hdGFuKHlBYkRpc3QgLyB4QWJEaXN0KTtcbiAgICB4QWNEaXN0ID0gYy54IC0gYS54O1xuICAgIHlBY0Rpc3QgPSBjLnkgLSBhLnk7XG4gICAgYWNEaXN0ID0gTWF0aC5zcXJ0KCh4QWNEaXN0ICogeEFjRGlzdCkgKyAoeUFjRGlzdCAqIHlBY0Rpc3QpKTtcbiAgICBhY3hBbmdsZSA9IE1hdGguYXRhbih5QWNEaXN0IC8geEFjRGlzdCk7XG4gICAgYWJjQW5nbGUgPSBhYnhBbmdsZSAtIGFjeEFuZ2xlO1xuICAgIGNkRGlzdCA9IE1hdGguYWJzKE1hdGguc2luKGFiY0FuZ2xlKSAqIGFjRGlzdCk7XG4gICAgcmV0dXJuIGNkRGlzdCA8PSBtaW5EaXN0O1xuICB9XG5cbiAgaW50ZXJzZWN0TGluayhsaW5rKSB7XG4gICAgdmFyIHMsIHMxX3gsIHMxX3ksIHMyX3gsIHMyX3ksIHQsIHgxLCB4MiwgeDMsIHg0LCB5MSwgeTIsIHkzLCB5NDtcbiAgICB4MSA9IHRoaXMuc3RhcjEueDtcbiAgICB5MSA9IHRoaXMuc3RhcjEueTtcbiAgICB4MiA9IHRoaXMuc3RhcjIueDtcbiAgICB5MiA9IHRoaXMuc3RhcjIueTtcbiAgICB4MyA9IGxpbmsuc3RhcjEueDtcbiAgICB5MyA9IGxpbmsuc3RhcjEueTtcbiAgICB4NCA9IGxpbmsuc3RhcjIueDtcbiAgICB5NCA9IGxpbmsuc3RhcjIueTtcbiAgICBzMV94ID0geDIgLSB4MTtcbiAgICBzMV95ID0geTIgLSB5MTtcbiAgICBzMl94ID0geDQgLSB4MztcbiAgICBzMl95ID0geTQgLSB5MztcbiAgICBzID0gKC1zMV95ICogKHgxIC0geDMpICsgczFfeCAqICh5MSAtIHkzKSkgLyAoLXMyX3ggKiBzMV95ICsgczFfeCAqIHMyX3kpO1xuICAgIHQgPSAoczJfeCAqICh5MSAtIHkzKSAtIHMyX3kgKiAoeDEgLSB4MykpIC8gKC1zMl94ICogczFfeSArIHMxX3ggKiBzMl95KTtcbiAgICByZXR1cm4gcyA+IDAgJiYgcyA8IDEgJiYgdCA+IDAgJiYgdCA8IDE7XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TdGFyU3lzdGVtLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFRpbWluZywgVHJhdmVsO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhdmVsID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUcmF2ZWwgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBzdGFydChsb2NhdGlvbikge1xuICAgICAgaWYgKHRoaXMudmFsaWQpIHtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyYXZlbGxlci50cmF2ZWwgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJhdmVsbGVyLmxvY2F0aW9uID0gdGhpcy50YXJnZXRMb2NhdGlvbjtcbiAgICAgICAgICB0aGlzLnRyYXZlbGxlci50cmF2ZWwgPSBudWxsO1xuICAgICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdzdG9wIG1vdmluZycpO1xuICAgICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBUcmF2ZWwucHJvcGVydGllcyh7XG4gICAgdHJhdmVsbGVyOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBzdGFydExvY2F0aW9uOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICB0YXJnZXRMb2NhdGlvbjoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgY3VycmVudFNlY3Rpb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0TG9jYXRpb24ubGlua3MuZmluZFN0YXIodGhpcy50YXJnZXRMb2NhdGlvbik7XG4gICAgICB9XG4gICAgfSxcbiAgICBkdXJhdGlvbjoge1xuICAgICAgZGVmYXVsdDogMTAwMFxuICAgIH0sXG4gICAgbW92aW5nOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgdmFsaWQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldExvY2F0aW9uID09PSB0aGlzLnN0YXJ0TG9jYXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCgoKHJlZiA9IHRoaXMudGFyZ2V0TG9jYXRpb24pICE9IG51bGwgPyByZWYubGlua3MgOiB2b2lkIDApICE9IG51bGwpICYmICgoKHJlZjEgPSB0aGlzLnN0YXJ0TG9jYXRpb24pICE9IG51bGwgPyByZWYxLmxpbmtzIDogdm9pZCAwKSAhPSBudWxsKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZWN0aW9uICE9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHRpbWluZzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNwYWNlQ29vZGluYXRlOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBlbmRYLCBlbmRZLCBwcmMsIHN0YXJ0WCwgc3RhcnRZO1xuICAgICAgICBzdGFydFggPSBpbnZhbGlkYXRvci5wcm9wUGF0aCgnc3RhcnRMb2NhdGlvbi54Jyk7XG4gICAgICAgIHN0YXJ0WSA9IGludmFsaWRhdG9yLnByb3BQYXRoKCdzdGFydExvY2F0aW9uLnknKTtcbiAgICAgICAgZW5kWCA9IGludmFsaWRhdG9yLnByb3BQYXRoKCd0YXJnZXRMb2NhdGlvbi54Jyk7XG4gICAgICAgIGVuZFkgPSBpbnZhbGlkYXRvci5wcm9wUGF0aCgndGFyZ2V0TG9jYXRpb24ueScpO1xuICAgICAgICBwcmMgPSBpbnZhbGlkYXRvci5wcm9wUGF0aCgncGF0aFRpbWVvdXQucHJjJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogKHN0YXJ0WCAtIGVuZFgpICogcHJjICsgZW5kWCxcbiAgICAgICAgICB5OiAoc3RhcnRZIC0gZW5kWSkgKiBwcmMgKyBlbmRZXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVHJhdmVsO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1RyYXZlbC5qcy5tYXBcbiIsInZhciBFbGVtZW50LCBHcmlkLCBWaWV3O1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbkdyaWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLWdyaWRzJykuR3JpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBWaWV3IGV4dGVuZHMgRWxlbWVudCB7XG4gICAgc2V0RGVmYXVsdHMoKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCF0aGlzLmJvdW5kcykge1xuICAgICAgICB0aGlzLmdyaWQgPSB0aGlzLmdyaWQgfHwgKChyZWYgPSB0aGlzLmdhbWUubWFpblZpZXdQcm9wZXJ0eS52YWx1ZSkgIT0gbnVsbCA/IHJlZi5ncmlkIDogdm9pZCAwKSB8fCBuZXcgR3JpZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5ib3VuZHMgPSB0aGlzLmdyaWQuYWRkQ2VsbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICByZXR1cm4gdGhpcy5nYW1lID0gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICBWaWV3LnByb3BlcnRpZXMoe1xuICAgIGdhbWU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHRoaXMuZ2FtZS52aWV3cy5hZGQodGhpcyk7XG4gICAgICAgICAgdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbGQpIHtcbiAgICAgICAgICByZXR1cm4gb2xkLnZpZXdzLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgeDoge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgeToge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgYm91bmRzOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVmlldztcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9WaWV3LmpzLm1hcFxuIiwidmFyIERpcmVjdGlvbiwgTGluZU9mU2lnaHQsIFRpbGVDb250YWluZXIsIFRpbGVSZWZlcmVuY2UsIFZpc2lvbkNhbGN1bGF0b3I7XG5cbkxpbmVPZlNpZ2h0ID0gcmVxdWlyZSgnLi9MaW5lT2ZTaWdodCcpO1xuXG5EaXJlY3Rpb24gPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuRGlyZWN0aW9uO1xuXG5UaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVDb250YWluZXI7XG5cblRpbGVSZWZlcmVuY2UgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZVJlZmVyZW5jZTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaXNpb25DYWxjdWxhdG9yID0gY2xhc3MgVmlzaW9uQ2FsY3VsYXRvciB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpblRpbGUsIG9mZnNldCA9IHtcbiAgICAgIHg6IDAuNSxcbiAgICAgIHk6IDAuNVxuICAgIH0pIHtcbiAgICB0aGlzLm9yaWdpblRpbGUgPSBvcmlnaW5UaWxlO1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgIHRoaXMucHRzID0ge307XG4gICAgdGhpcy52aXNpYmlsaXR5ID0ge307XG4gICAgdGhpcy5zdGFjayA9IFtdO1xuICAgIHRoaXMuY2FsY3VsYXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgY2FsY3VsKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHdoaWxlICh0aGlzLnN0YWNrLmxlbmd0aCkge1xuICAgICAgdGhpcy5zdGVwKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB2YXIgZmlyc3RCYXRjaCwgaW5pdGlhbFB0cztcbiAgICB0aGlzLnB0cyA9IHt9O1xuICAgIHRoaXMudmlzaWJpbGl0eSA9IHt9O1xuICAgIGluaXRpYWxQdHMgPSBbXG4gICAgICB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDEsXG4gICAgICAgIHk6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDEsXG4gICAgICAgIHk6IDFcbiAgICAgIH1cbiAgICBdO1xuICAgIGluaXRpYWxQdHMuZm9yRWFjaCgocHQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnNldFB0KHRoaXMub3JpZ2luVGlsZS54ICsgcHQueCwgdGhpcy5vcmlnaW5UaWxlLnkgKyBwdC55LCB0cnVlKTtcbiAgICB9KTtcbiAgICBmaXJzdEJhdGNoID0gW1xuICAgICAge1xuICAgICAgICB4OiAtMSxcbiAgICAgICAgeTogLTFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IC0xLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAtMSxcbiAgICAgICAgeTogMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogLTEsXG4gICAgICAgIHk6IDJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDIsXG4gICAgICAgIHk6IC0xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAyLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAyLFxuICAgICAgICB5OiAxXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAyLFxuICAgICAgICB5OiAyXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAtMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMSxcbiAgICAgICAgeTogLTFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDEsXG4gICAgICAgIHk6IDJcbiAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiB0aGlzLnN0YWNrID0gZmlyc3RCYXRjaC5tYXAoKHB0KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiB0aGlzLm9yaWdpblRpbGUueCArIHB0LngsXG4gICAgICAgIHk6IHRoaXMub3JpZ2luVGlsZS55ICsgcHQueVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFB0KHgsIHksIHZhbCkge1xuICAgIHZhciBhZGphbmNlbnQ7XG4gICAgdGhpcy5wdHNbeCArICc6JyArIHldID0gdmFsO1xuICAgIGFkamFuY2VudCA9IFtcbiAgICAgIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogLTEsXG4gICAgICAgIHk6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IC0xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAtMSxcbiAgICAgICAgeTogLTFcbiAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiBhZGphbmNlbnQuZm9yRWFjaCgocHQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZpc2liaWxpdHkoeCArIHB0LngsIHkgKyBwdC55LCB2YWwgPyAxIC8gYWRqYW5jZW50Lmxlbmd0aCA6IDApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UHQoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLnB0c1t4ICsgJzonICsgeV07XG4gIH1cblxuICBhZGRWaXNpYmlsaXR5KHgsIHksIHZhbCkge1xuICAgIGlmICh0aGlzLnZpc2liaWxpdHlbeF0gPT0gbnVsbCkge1xuICAgICAgdGhpcy52aXNpYmlsaXR5W3hdID0ge307XG4gICAgfVxuICAgIGlmICh0aGlzLnZpc2liaWxpdHlbeF1beV0gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlzaWJpbGl0eVt4XVt5XSArPSB2YWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2liaWxpdHlbeF1beV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmlzaWJpbGl0eSh4LCB5KSB7XG4gICAgaWYgKCh0aGlzLnZpc2liaWxpdHlbeF0gPT0gbnVsbCkgfHwgKHRoaXMudmlzaWJpbGl0eVt4XVt5XSA9PSBudWxsKSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2liaWxpdHlbeF1beV07XG4gICAgfVxuICB9XG5cbiAgY2FuUHJvY2Vzcyh4LCB5KSB7XG4gICAgcmV0dXJuICF0aGlzLnN0YWNrLnNvbWUoKHB0KSA9PiB7XG4gICAgICByZXR1cm4gcHQueCA9PT0geCAmJiBwdC55ID09PSB5O1xuICAgIH0pICYmICh0aGlzLmdldFB0KHgsIHkpID09IG51bGwpO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICB2YXIgbG9zLCBwdDtcbiAgICBwdCA9IHRoaXMuc3RhY2suc2hpZnQoKTtcbiAgICBsb3MgPSBuZXcgTGluZU9mU2lnaHQodGhpcy5vcmlnaW5UaWxlLmNvbnRhaW5lciwgdGhpcy5vcmlnaW5UaWxlLnggKyB0aGlzLm9mZnNldC54LCB0aGlzLm9yaWdpblRpbGUueSArIHRoaXMub2Zmc2V0LnksIHB0LngsIHB0LnkpO1xuICAgIGxvcy5yZXZlcnNlVHJhY2luZygpO1xuICAgIGxvcy50cmF2ZXJzYWJsZUNhbGxiYWNrID0gKHRpbGUsIGVudHJ5WCwgZW50cnlZKSA9PiB7XG4gICAgICBpZiAodGlsZSAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFZpc2liaWxpdHkodGlsZS54LCB0aWxlLnkpID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIGxvcy5mb3JjZVN1Y2Nlc3MoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGlsZS50cmFuc3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZXRQdChwdC54LCBwdC55LCBsb3MuZ2V0U3VjY2VzcygpKTtcbiAgICBpZiAobG9zLmdldFN1Y2Nlc3MoKSkge1xuICAgICAgcmV0dXJuIERpcmVjdGlvbi5hbGwuZm9yRWFjaCgoZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIHZhciBuZXh0UHQ7XG4gICAgICAgIG5leHRQdCA9IHtcbiAgICAgICAgICB4OiBwdC54ICsgZGlyZWN0aW9uLngsXG4gICAgICAgICAgeTogcHQueSArIGRpcmVjdGlvbi55XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmNhblByb2Nlc3MobmV4dFB0LngsIG5leHRQdC55KSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnN0YWNrLnB1c2gobmV4dFB0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Qm91bmRzKCkge1xuICAgIHZhciBib3VuZGFyaWVzLCBjb2wsIHJlZiwgdmFsLCB4LCB5O1xuICAgIGJvdW5kYXJpZXMgPSB7XG4gICAgICB0b3A6IG51bGwsXG4gICAgICBsZWZ0OiBudWxsLFxuICAgICAgYm90dG9tOiBudWxsLFxuICAgICAgcmlnaHQ6IG51bGxcbiAgICB9O1xuICAgIHJlZiA9IHRoaXMudmlzaWJpbGl0eTtcbiAgICBmb3IgKHggaW4gcmVmKSB7XG4gICAgICBjb2wgPSByZWZbeF07XG4gICAgICBmb3IgKHkgaW4gY29sKSB7XG4gICAgICAgIHZhbCA9IGNvbFt5XTtcbiAgICAgICAgaWYgKChib3VuZGFyaWVzLnRvcCA9PSBudWxsKSB8fCB5IDwgYm91bmRhcmllcy50b3ApIHtcbiAgICAgICAgICBib3VuZGFyaWVzLnRvcCA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChib3VuZGFyaWVzLmxlZnQgPT0gbnVsbCkgfHwgeCA8IGJvdW5kYXJpZXMubGVmdCkge1xuICAgICAgICAgIGJvdW5kYXJpZXMubGVmdCA9IHg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChib3VuZGFyaWVzLmJvdHRvbSA9PSBudWxsKSB8fCB5ID4gYm91bmRhcmllcy5ib3R0b20pIHtcbiAgICAgICAgICBib3VuZGFyaWVzLmJvdHRvbSA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChib3VuZGFyaWVzLnJpZ2h0ID09IG51bGwpIHx8IHggPiBib3VuZGFyaWVzLnJpZ2h0KSB7XG4gICAgICAgICAgYm91bmRhcmllcy5yaWdodCA9IHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJvdW5kYXJpZXM7XG4gIH1cblxuICB0b0NvbnRhaW5lcigpIHtcbiAgICB2YXIgY29sLCByZWYsIHJlcywgdGlsZSwgdmFsLCB4LCB5O1xuICAgIHJlcyA9IG5ldyBUaWxlQ29udGFpbmVyKCk7XG4gICAgcmVzLm93bmVyID0gZmFsc2U7XG4gICAgcmVmID0gdGhpcy52aXNpYmlsaXR5O1xuICAgIGZvciAoeCBpbiByZWYpIHtcbiAgICAgIGNvbCA9IHJlZlt4XTtcbiAgICAgIGZvciAoeSBpbiBjb2wpIHtcbiAgICAgICAgdmFsID0gY29sW3ldO1xuICAgICAgICB0aWxlID0gdGhpcy5vcmlnaW5UaWxlLmNvbnRhaW5lci5nZXRUaWxlKHgsIHkpO1xuICAgICAgICBpZiAodmFsICE9PSAwICYmICh0aWxlICE9IG51bGwpKSB7XG4gICAgICAgICAgdGlsZSA9IG5ldyBUaWxlUmVmZXJlbmNlKHRpbGUpO1xuICAgICAgICAgIHRpbGUudmlzaWJpbGl0eSA9IHZhbDtcbiAgICAgICAgICByZXMuYWRkVGlsZSh0aWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgdG9NYXAoKSB7XG4gICAgdmFyIGksIGosIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcmVzLCB4LCB5O1xuICAgIHJlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbWFwOiBbXVxuICAgIH0sIHRoaXMuZ2V0Qm91bmRzKCkpO1xuICAgIGZvciAoeSA9IGkgPSByZWYgPSByZXMudG9wLCByZWYxID0gcmVzLmJvdHRvbSAtIDE7IChyZWYgPD0gcmVmMSA/IGkgPD0gcmVmMSA6IGkgPj0gcmVmMSk7IHkgPSByZWYgPD0gcmVmMSA/ICsraSA6IC0taSkge1xuICAgICAgcmVzLm1hcFt5IC0gcmVzLnRvcF0gPSBbXTtcbiAgICAgIGZvciAoeCA9IGogPSByZWYyID0gcmVzLmxlZnQsIHJlZjMgPSByZXMucmlnaHQgLSAxOyAocmVmMiA8PSByZWYzID8gaiA8PSByZWYzIDogaiA+PSByZWYzKTsgeCA9IHJlZjIgPD0gcmVmMyA/ICsraiA6IC0taikge1xuICAgICAgICByZXMubWFwW3kgLSByZXMudG9wXVt4IC0gcmVzLmxlZnRdID0gdGhpcy5nZXRWaXNpYmlsaXR5KHgsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvVmlzaW9uQ2FsY3VsYXRvci5qcy5tYXBcbiIsInZhciBBY3Rpb24sIEVsZW1lbnQsIEV2ZW50RW1pdHRlcjtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5FdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEFjdGlvbiBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHdpdGhBY3RvcihhY3Rvcikge1xuICAgICAgaWYgKHRoaXMuYWN0b3IgIT09IGFjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcHlXaXRoKHtcbiAgICAgICAgICBhY3RvcjogYWN0b3JcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb3B5V2l0aChvcHRpb25zKSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGJhc2U6IHRoaXMuYmFzZU9yVGhpcygpXG4gICAgICB9LCB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmdldE1hbnVhbERhdGFQcm9wZXJ0aWVzKCksIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICBiYXNlT3JUaGlzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYmFzZSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZSgpO1xuICAgIH1cblxuICAgIHZhbGlkQWN0b3IoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hY3RvciAhPSBudWxsO1xuICAgIH1cblxuICAgIGlzUmVhZHkoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZEFjdG9yKCk7XG4gICAgfVxuXG4gICAgZmluaXNoKCkge1xuICAgICAgdGhpcy5lbWl0KCdmaW5pc2hlZCcpO1xuICAgICAgcmV0dXJuIHRoaXMuZW5kKCk7XG4gICAgfVxuXG4gICAgaW50ZXJydXB0KCkge1xuICAgICAgdGhpcy5lbWl0KCdpbnRlcnJ1cHRlZCcpO1xuICAgICAgcmV0dXJuIHRoaXMuZW5kKCk7XG4gICAgfVxuXG4gICAgZW5kKCkge1xuICAgICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllc01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICB9O1xuXG4gIEFjdGlvbi5pbmNsdWRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuXG4gIEFjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgICBhY3Rvcjoge30sXG4gICAgYmFzZToge31cbiAgfSk7XG5cbiAgcmV0dXJuIEFjdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9hY3Rpb25zL0FjdGlvbi5qcy5tYXBcbiIsInZhciBBY3Rpb25Qcm92aWRlciwgRWxlbWVudDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGlvblByb3ZpZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBBY3Rpb25Qcm92aWRlciBleHRlbmRzIEVsZW1lbnQge307XG5cbiAgQWN0aW9uUHJvdmlkZXIucHJvcGVydGllcyh7XG4gICAgcHJvdmlkZWRBY3Rpb25zOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQWN0aW9uUHJvdmlkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9BY3Rpb25Qcm92aWRlci5qcy5tYXBcbiIsInZhciBBdHRhY2tBY3Rpb24sIEV2ZW50QmluZCwgUHJvcGVydHlXYXRjaGVyLCBUYXJnZXRBY3Rpb24sIFdhbGtBY3Rpb247XG5cbldhbGtBY3Rpb24gPSByZXF1aXJlKCcuL1dhbGtBY3Rpb24nKTtcblxuVGFyZ2V0QWN0aW9uID0gcmVxdWlyZSgnLi9UYXJnZXRBY3Rpb24nKTtcblxuRXZlbnRCaW5kID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50QmluZDtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBBdHRhY2tBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEF0dGFja0FjdGlvbiBleHRlbmRzIFRhcmdldEFjdGlvbiB7XG4gICAgdmFsaWRUYXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXRJc0F0dGFja2FibGUoKSAmJiAodGhpcy5jYW5Vc2VXZWFwb24oKSB8fCB0aGlzLmNhbldhbGtUb1RhcmdldCgpKTtcbiAgICB9XG5cbiAgICB0YXJnZXRJc0F0dGFja2FibGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuZGFtYWdlYWJsZSAmJiB0aGlzLnRhcmdldC5oZWFsdGggPj0gMDtcbiAgICB9XG5cbiAgICBjYW5NZWxlZSgpIHtcbiAgICAgIHJldHVybiBNYXRoLmFicyh0aGlzLnRhcmdldC50aWxlLnggLSB0aGlzLmFjdG9yLnRpbGUueCkgKyBNYXRoLmFicyh0aGlzLnRhcmdldC50aWxlLnkgLSB0aGlzLmFjdG9yLnRpbGUueSkgPT09IDE7XG4gICAgfVxuXG4gICAgY2FuVXNlV2VhcG9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYmVzdFVzYWJsZVdlYXBvbiAhPSBudWxsO1xuICAgIH1cblxuICAgIGNhblVzZVdlYXBvbkF0KHRpbGUpIHtcbiAgICAgIHZhciByZWY7XG4gICAgICByZXR1cm4gKChyZWYgPSB0aGlzLmFjdG9yLndlYXBvbnMpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSAmJiB0aGlzLmFjdG9yLndlYXBvbnMuZmluZCgod2VhcG9uKSA9PiB7XG4gICAgICAgIHJldHVybiB3ZWFwb24uY2FuVXNlRnJvbSh0aWxlLCB0aGlzLnRhcmdldCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5XYWxrVG9UYXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrQWN0aW9uLmlzUmVhZHkoKTtcbiAgICB9XG5cbiAgICB1c2VXZWFwb24oKSB7XG4gICAgICB0aGlzLmJlc3RVc2FibGVXZWFwb24udXNlT24odGhpcy50YXJnZXQpO1xuICAgICAgcmV0dXJuIHRoaXMuZmluaXNoKCk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZSgpIHtcbiAgICAgIGlmICh0aGlzLmFjdG9yLndhbGsgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFjdG9yLndhbGsuaW50ZXJydXB0KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5iZXN0VXNhYmxlV2VhcG9uICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5jaGFyZ2VkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudXNlV2VhcG9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMud2VhcG9uQ2hhcmdlV2F0Y2hlci5iaW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMud2Fsa0FjdGlvbi5vbignZmluaXNoZWQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbnRlcnJ1cHRCaW5kZXIudW5iaW5kKCk7XG4gICAgICAgICAgdGhpcy53YWxrQWN0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLndhbGtBY3Rpb25Qcm9wZXJ0eS5pbnZhbGlkYXRlKCk7XG4gICAgICAgICAgaWYgKHRoaXMuaXNSZWFkeSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJydXB0QmluZGVyLmJpbmRUbyh0aGlzLndhbGtBY3Rpb24pO1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrQWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBBdHRhY2tBY3Rpb24ucHJvcGVydGllcyh7XG4gICAgd2Fsa0FjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdhbGtBY3Rpb247XG4gICAgICAgIHdhbGtBY3Rpb24gPSBuZXcgV2Fsa0FjdGlvbih7XG4gICAgICAgICAgYWN0b3I6IHRoaXMuYWN0b3IsXG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgICBwYXJlbnQ6IHRoaXMucGFyZW50XG4gICAgICAgIH0pO1xuICAgICAgICB3YWxrQWN0aW9uLnBhdGhGaW5kZXIuYXJyaXZlZENhbGxiYWNrID0gKHN0ZXApID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jYW5Vc2VXZWFwb25BdChzdGVwLnRpbGUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gd2Fsa0FjdGlvbjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJlc3RVc2FibGVXZWFwb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHJlZiwgdXNhYmxlV2VhcG9ucztcbiAgICAgICAgaW52YWxpZGF0b3IucHJvcFBhdGgoJ2FjdG9yLnRpbGUnKTtcbiAgICAgICAgaWYgKChyZWYgPSB0aGlzLmFjdG9yLndlYXBvbnMpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSB7XG4gICAgICAgICAgdXNhYmxlV2VhcG9ucyA9IHRoaXMuYWN0b3Iud2VhcG9ucy5maWx0ZXIoKHdlYXBvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdlYXBvbi5jYW5Vc2VPbih0aGlzLnRhcmdldCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXNhYmxlV2VhcG9ucy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYi5kcHMgLSBhLmRwcztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdXNhYmxlV2VhcG9uc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaW50ZXJydXB0QmluZGVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEV2ZW50QmluZCgnaW50ZXJydXB0ZWQnLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJydXB0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3k6IHRydWVcbiAgICB9LFxuICAgIHdlYXBvbkNoYXJnZVdhdGNoZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5jaGFyZ2VkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZVdlYXBvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcGVydHk6IHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgnY2hhcmdlZCcpXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3k6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBBdHRhY2tBY3Rpb247XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9BdHRhY2tBY3Rpb24uanMubWFwXG4iLCJ2YXIgQXR0YWNrQWN0aW9uLCBBdHRhY2tNb3ZlQWN0aW9uLCBFdmVudEJpbmQsIExpbmVPZlNpZ2h0LCBQYXRoRmluZGVyLCBQcm9wZXJ0eVdhdGNoZXIsIFRhcmdldEFjdGlvbiwgV2Fsa0FjdGlvbjtcblxuV2Fsa0FjdGlvbiA9IHJlcXVpcmUoJy4vV2Fsa0FjdGlvbicpO1xuXG5BdHRhY2tBY3Rpb24gPSByZXF1aXJlKCcuL0F0dGFja0FjdGlvbicpO1xuXG5UYXJnZXRBY3Rpb24gPSByZXF1aXJlKCcuL1RhcmdldEFjdGlvbicpO1xuXG5QYXRoRmluZGVyID0gcmVxdWlyZSgncGFyYWxsZWxpby1wYXRoZmluZGVyJyk7XG5cbkxpbmVPZlNpZ2h0ID0gcmVxdWlyZSgnLi4vTGluZU9mU2lnaHQnKTtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlcjtcblxuRXZlbnRCaW5kID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50QmluZDtcblxubW9kdWxlLmV4cG9ydHMgPSBBdHRhY2tNb3ZlQWN0aW9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBBdHRhY2tNb3ZlQWN0aW9uIGV4dGVuZHMgVGFyZ2V0QWN0aW9uIHtcbiAgICBpc0VuZW15KGVsZW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICByZXR1cm4gKHJlZiA9IHRoaXMuYWN0b3Iub3duZXIpICE9IG51bGwgPyB0eXBlb2YgcmVmLmlzRW5lbXkgPT09IFwiZnVuY3Rpb25cIiA/IHJlZi5pc0VuZW15KGVsZW0pIDogdm9pZCAwIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHZhbGlkVGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMud2Fsa0FjdGlvbi52YWxpZFRhcmdldCgpO1xuICAgIH1cblxuICAgIHRlc3RFbmVteVNwb3R0ZWQoKSB7XG4gICAgICB0aGlzLmVuZW15U3BvdHRlZFByb3BlcnR5LmludmFsaWRhdGUoKTtcbiAgICAgIGlmICh0aGlzLmVuZW15U3BvdHRlZCkge1xuICAgICAgICB0aGlzLmF0dGFja0FjdGlvbiA9IG5ldyBBdHRhY2tBY3Rpb24oe1xuICAgICAgICAgIGFjdG9yOiB0aGlzLmFjdG9yLFxuICAgICAgICAgIHRhcmdldDogdGhpcy5lbmVteVNwb3R0ZWRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXR0YWNrQWN0aW9uLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc1JlYWR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnJ1cHRCaW5kZXIuYmluZFRvKHRoaXMuYXR0YWNrQWN0aW9uKTtcbiAgICAgICAgdGhpcy53YWxrQWN0aW9uLmludGVycnVwdCgpO1xuICAgICAgICB0aGlzLndhbGtBY3Rpb25Qcm9wZXJ0eS5pbnZhbGlkYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dGFja0FjdGlvbi5leGVjdXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhlY3V0ZSgpIHtcbiAgICAgIGlmICghdGhpcy50ZXN0RW5lbXlTcG90dGVkKCkpIHtcbiAgICAgICAgdGhpcy53YWxrQWN0aW9uLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maW5pc2hlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnJ1cHRCaW5kZXIuYmluZFRvKHRoaXMud2Fsa0FjdGlvbik7XG4gICAgICAgIHRoaXMudGlsZVdhdGNoZXIuYmluZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrQWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBBdHRhY2tNb3ZlQWN0aW9uLnByb3BlcnRpZXMoe1xuICAgIHdhbGtBY3Rpb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3YWxrQWN0aW9uO1xuICAgICAgICB3YWxrQWN0aW9uID0gbmV3IFdhbGtBY3Rpb24oe1xuICAgICAgICAgIGFjdG9yOiB0aGlzLmFjdG9yLFxuICAgICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXG4gICAgICAgICAgcGFyZW50OiB0aGlzLnBhcmVudFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHdhbGtBY3Rpb247XG4gICAgICB9XG4gICAgfSxcbiAgICBlbmVteVNwb3R0ZWQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHRoaXMucGF0aCA9IG5ldyBQYXRoRmluZGVyKHRoaXMuYWN0b3IudGlsZS5jb250YWluZXIsIHRoaXMuYWN0b3IudGlsZSwgZmFsc2UsIHtcbiAgICAgICAgICB2YWxpZFRpbGU6ICh0aWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGlsZS50cmFuc3BhcmVudCAmJiAobmV3IExpbmVPZlNpZ2h0KHRoaXMuYWN0b3IudGlsZS5jb250YWluZXIsIHRoaXMuYWN0b3IudGlsZS54LCB0aGlzLmFjdG9yLnRpbGUueSwgdGlsZS54LCB0aWxlLnkpKS5nZXRTdWNjZXNzKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhcnJpdmVkOiAoc3RlcCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0ZXAuZW5lbXkgPSBzdGVwLnRpbGUuY2hpbGRyZW4uZmluZCgoYykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0VuZW15KGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlZmZpY2llbmN5OiAodGlsZSkgPT4ge31cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGF0aC5jYWxjdWwoKTtcbiAgICAgICAgcmV0dXJuIChyZWYgPSB0aGlzLnBhdGguc29sdXRpb24pICE9IG51bGwgPyByZWYuZW5lbXkgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfSxcbiAgICB0aWxlV2F0Y2hlcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXN0RW5lbXlTcG90dGVkKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wZXJ0eTogdGhpcy5hY3Rvci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgndGlsZScpXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3k6IHRydWVcbiAgICB9LFxuICAgIGludGVycnVwdEJpbmRlcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEJpbmQoJ2ludGVycnVwdGVkJywgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmludGVycnVwdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQXR0YWNrTW92ZUFjdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9hY3Rpb25zL0F0dGFja01vdmVBY3Rpb24uanMubWFwXG4iLCJ2YXIgQWN0aW9uUHJvdmlkZXIsIFNpbXBsZUFjdGlvblByb3ZpZGVyO1xuXG5BY3Rpb25Qcm92aWRlciA9IHJlcXVpcmUoJy4vQWN0aW9uUHJvdmlkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVBY3Rpb25Qcm92aWRlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU2ltcGxlQWN0aW9uUHJvdmlkZXIgZXh0ZW5kcyBBY3Rpb25Qcm92aWRlciB7fTtcblxuICBTaW1wbGVBY3Rpb25Qcm92aWRlci5wcm9wZXJ0aWVzKHtcbiAgICBwcm92aWRlZEFjdGlvbnM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3Rpb25zO1xuICAgICAgICBhY3Rpb25zID0gdGhpcy5hY3Rpb25zIHx8IHRoaXMuY29uc3RydWN0b3IuYWN0aW9ucyB8fCBbXTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25zID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgYWN0aW9ucyA9IE9iamVjdC5rZXlzKGFjdGlvbnMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb25zW2tleV07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbnMubWFwKChhY3Rpb24pID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi53aXRoVGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24ud2l0aFRhcmdldCh0aGlzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBhY3Rpb24oe1xuICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2ltcGxlQWN0aW9uUHJvdmlkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9TaW1wbGVBY3Rpb25Qcm92aWRlci5qcy5tYXBcbiIsInZhciBBY3Rpb24sIFRhcmdldEFjdGlvbjtcblxuQWN0aW9uID0gcmVxdWlyZSgnLi9BY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXRBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFRhcmdldEFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XG4gICAgd2l0aFRhcmdldCh0YXJnZXQpIHtcbiAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcHlXaXRoKHtcbiAgICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNhblRhcmdldCh0YXJnZXQpIHtcbiAgICAgIHZhciBpbnN0YW5jZTtcbiAgICAgIGluc3RhbmNlID0gdGhpcy53aXRoVGFyZ2V0KHRhcmdldCk7XG4gICAgICBpZiAoaW5zdGFuY2UudmFsaWRUYXJnZXQoKSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRUYXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBpc1JlYWR5KCkge1xuICAgICAgcmV0dXJuIHN1cGVyLmlzUmVhZHkoKSAmJiB0aGlzLnZhbGlkVGFyZ2V0KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgVGFyZ2V0QWN0aW9uLnByb3BlcnRpZXMoe1xuICAgIHRhcmdldDoge31cbiAgfSk7XG5cbiAgcmV0dXJuIFRhcmdldEFjdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9hY3Rpb25zL1RhcmdldEFjdGlvbi5qcy5tYXBcbiIsInZhciBBY3Rpb25Qcm92aWRlciwgTWl4YWJsZSwgVGlsZWRBY3Rpb25Qcm92aWRlcjtcblxuQWN0aW9uUHJvdmlkZXIgPSByZXF1aXJlKCcuL0FjdGlvblByb3ZpZGVyJyk7XG5cbk1peGFibGUgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuTWl4YWJsZTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlZEFjdGlvblByb3ZpZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaWxlZEFjdGlvblByb3ZpZGVyIGV4dGVuZHMgQWN0aW9uUHJvdmlkZXIge1xuICAgIHZhbGlkQWN0aW9uVGlsZSh0aWxlKSB7XG4gICAgICByZXR1cm4gdGlsZSAhPSBudWxsO1xuICAgIH1cblxuICAgIHByZXBhcmVBY3Rpb25UaWxlKHRpbGUpIHtcbiAgICAgIGlmICghdGlsZS5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgncHJvdmlkZWRBY3Rpb25zJykpIHtcbiAgICAgICAgcmV0dXJuIE1peGFibGUuRXh0ZW5zaW9uLm1ha2UoQWN0aW9uUHJvdmlkZXIucHJvdG90eXBlLCB0aWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBUaWxlZEFjdGlvblByb3ZpZGVyLnByb3BlcnRpZXMoe1xuICAgIHRpbGU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQsIG92ZXJyaWRlZCkge1xuICAgICAgICBvdmVycmlkZWQob2xkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZGVkQWN0aW9ucztcbiAgICAgIH1cbiAgICB9LFxuICAgIGFjdGlvblRpbGVzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgbXlUaWxlO1xuICAgICAgICBteVRpbGUgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMudGlsZVByb3BlcnR5KTtcbiAgICAgICAgaWYgKG15VGlsZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvblRpbGVzQ29vcmQubWFwKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG15VGlsZS5nZXRSZWxhdGl2ZVRpbGUoY29vcmQueCwgY29vcmQueSk7XG4gICAgICAgICAgfSkuZmlsdGVyKCh0aWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZEFjdGlvblRpbGUodGlsZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBmb3J3YXJkZWRBY3Rpb25zOiB7XG4gICAgICBjb2xsZWN0aW9uOiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYS5hY3Rpb24gPT09IGIuYWN0aW9uICYmIGEubG9jYXRpb24gPT09IGIubG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBhY3Rpb25UaWxlcywgYWN0aW9ucztcbiAgICAgICAgYWN0aW9uVGlsZXMgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMuYWN0aW9uVGlsZXNQcm9wZXJ0eSk7XG4gICAgICAgIGFjdGlvbnMgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMucHJvdmlkZWRBY3Rpb25zUHJvcGVydHkpO1xuICAgICAgICByZXR1cm4gYWN0aW9uVGlsZXMucmVkdWNlKChyZXMsIHRpbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzLmNvbmNhdChhY3Rpb25zLm1hcChmdW5jdGlvbihhY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGFjdGlvbjogYWN0LFxuICAgICAgICAgICAgICBsb2NhdGlvbjogdGlsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgIH0sXG4gICAgICBpdGVtQWRkZWQ6IGZ1bmN0aW9uKGZvcndhcmRlZCkge1xuICAgICAgICB0aGlzLnByZXBhcmVBY3Rpb25UaWxlKGZvcndhcmRlZC5sb2NhdGlvbik7XG4gICAgICAgIHJldHVybiBmb3J3YXJkZWQubG9jYXRpb24ucHJvdmlkZWRBY3Rpb25zLmFkZChmb3J3YXJkZWQuYWN0aW9uKTtcbiAgICAgIH0sXG4gICAgICBpdGVtUmVtb3ZlZDogZnVuY3Rpb24oZm9yd2FyZGVkKSB7XG4gICAgICAgIHJldHVybiBmb3J3YXJkZWQubG9jYXRpb24ucHJvdmlkZWRBY3Rpb25zLnJlbW92ZShmb3J3YXJkZWQuYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIFRpbGVkQWN0aW9uUHJvdmlkZXIucHJvdG90eXBlLmFjdGlvblRpbGVzQ29vcmQgPSBbXG4gICAge1xuICAgICAgeDogMCxcbiAgICAgIHk6IC0xXG4gICAgfSxcbiAgICB7XG4gICAgICB4OiAtMSxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICB7XG4gICAgICB4OiArMSxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiArMVxuICAgIH1cbiAgXTtcblxuICByZXR1cm4gVGlsZWRBY3Rpb25Qcm92aWRlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9hY3Rpb25zL1RpbGVkQWN0aW9uUHJvdmlkZXIuanMubWFwXG4iLCJ2YXIgVGFyZ2V0QWN0aW9uLCBUcmF2ZWwsIFRyYXZlbEFjdGlvbjtcblxuVGFyZ2V0QWN0aW9uID0gcmVxdWlyZSgnLi9UYXJnZXRBY3Rpb24nKTtcblxuVHJhdmVsID0gcmVxdWlyZSgnLi4vVHJhdmVsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhdmVsQWN0aW9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUcmF2ZWxBY3Rpb24gZXh0ZW5kcyBUYXJnZXRBY3Rpb24ge1xuICAgIHZhbGlkVGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhdmVsLnZhbGlkO1xuICAgIH1cblxuICAgIGV4ZWN1dGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmF2ZWwuc3RhcnQoKTtcbiAgICB9XG5cbiAgfTtcblxuICBUcmF2ZWxBY3Rpb24ucHJvcGVydGllcyh7XG4gICAgdHJhdmVsOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyYXZlbCh7XG4gICAgICAgICAgdHJhdmVsbGVyOiB0aGlzLmFjdG9yLFxuICAgICAgICAgIHN0YXJ0TG9jYXRpb246IHRoaXMuYWN0b3IubG9jYXRpb24sXG4gICAgICAgICAgdGFyZ2V0TG9jYXRpb246IHRoaXMudGFyZ2V0XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRyYXZlbEFjdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9hY3Rpb25zL1RyYXZlbEFjdGlvbi5qcy5tYXBcbiIsInZhciBQYXRoRmluZGVyLCBQYXRoV2FsaywgVGFyZ2V0QWN0aW9uLCBXYWxrQWN0aW9uO1xuXG5QYXRoRmluZGVyID0gcmVxdWlyZSgncGFyYWxsZWxpby1wYXRoZmluZGVyJyk7XG5cblBhdGhXYWxrID0gcmVxdWlyZSgnLi4vUGF0aFdhbGsnKTtcblxuVGFyZ2V0QWN0aW9uID0gcmVxdWlyZSgnLi9UYXJnZXRBY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXYWxrQWN0aW9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBXYWxrQWN0aW9uIGV4dGVuZHMgVGFyZ2V0QWN0aW9uIHtcbiAgICBleGVjdXRlKCkge1xuICAgICAgaWYgKHRoaXMuYWN0b3Iud2FsayAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYWN0b3Iud2Fsay5pbnRlcnJ1cHQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMud2FsayA9IHRoaXMuYWN0b3Iud2FsayA9IG5ldyBQYXRoV2Fsayh0aGlzLmFjdG9yLCB0aGlzLnBhdGhGaW5kZXIpO1xuICAgICAgdGhpcy5hY3Rvci53YWxrLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluaXNoKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWN0b3Iud2Fsay5vbignaW50ZXJydXB0ZWQnLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVycnVwdCgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5hY3Rvci53YWxrLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgIGlmICh0aGlzLndhbGspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsay5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRUYXJnZXQoKSB7XG4gICAgICB0aGlzLnBhdGhGaW5kZXIuY2FsY3VsKCk7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoRmluZGVyLnNvbHV0aW9uICE9IG51bGw7XG4gICAgfVxuXG4gIH07XG5cbiAgV2Fsa0FjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgICBwYXRoRmluZGVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFBhdGhGaW5kZXIodGhpcy5hY3Rvci50aWxlLmNvbnRhaW5lciwgdGhpcy5hY3Rvci50aWxlLCB0aGlzLnRhcmdldCwge1xuICAgICAgICAgIHZhbGlkVGlsZTogKHRpbGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5hY3Rvci5jYW5Hb09uVGlsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdG9yLmNhbkdvT25UaWxlKHRpbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRpbGUud2Fsa2FibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBXYWxrQWN0aW9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL2FjdGlvbnMvV2Fsa0FjdGlvbi5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkFpcmxvY2tcIjogcmVxdWlyZShcIi4vQWlybG9ja1wiKSxcbiAgXCJBcHByb2FjaFwiOiByZXF1aXJlKFwiLi9BcHByb2FjaFwiKSxcbiAgXCJBdXRvbWF0aWNEb29yXCI6IHJlcXVpcmUoXCIuL0F1dG9tYXRpY0Rvb3JcIiksXG4gIFwiQ2hhcmFjdGVyXCI6IHJlcXVpcmUoXCIuL0NoYXJhY3RlclwiKSxcbiAgXCJDaGFyYWN0ZXJBSVwiOiByZXF1aXJlKFwiLi9DaGFyYWN0ZXJBSVwiKSxcbiAgXCJDb25mcm9udGF0aW9uXCI6IHJlcXVpcmUoXCIuL0NvbmZyb250YXRpb25cIiksXG4gIFwiRGFtYWdlUHJvcGFnYXRpb25cIjogcmVxdWlyZShcIi4vRGFtYWdlUHJvcGFnYXRpb25cIiksXG4gIFwiRGFtYWdlYWJsZVwiOiByZXF1aXJlKFwiLi9EYW1hZ2VhYmxlXCIpLFxuICBcIkRvb3JcIjogcmVxdWlyZShcIi4vRG9vclwiKSxcbiAgXCJFbGVtZW50XCI6IHJlcXVpcmUoXCIuL0VsZW1lbnRcIiksXG4gIFwiRW5jb250ZXJNYW5hZ2VyXCI6IHJlcXVpcmUoXCIuL0VuY29udGVyTWFuYWdlclwiKSxcbiAgXCJGbG9vclwiOiByZXF1aXJlKFwiLi9GbG9vclwiKSxcbiAgXCJHYW1lXCI6IHJlcXVpcmUoXCIuL0dhbWVcIiksXG4gIFwiSW52ZW50b3J5XCI6IHJlcXVpcmUoXCIuL0ludmVudG9yeVwiKSxcbiAgXCJMaW5lT2ZTaWdodFwiOiByZXF1aXJlKFwiLi9MaW5lT2ZTaWdodFwiKSxcbiAgXCJNYXBcIjogcmVxdWlyZShcIi4vTWFwXCIpLFxuICBcIk9ic3RhY2xlXCI6IHJlcXVpcmUoXCIuL09ic3RhY2xlXCIpLFxuICBcIlBhdGhXYWxrXCI6IHJlcXVpcmUoXCIuL1BhdGhXYWxrXCIpLFxuICBcIlBlcnNvbmFsV2VhcG9uXCI6IHJlcXVpcmUoXCIuL1BlcnNvbmFsV2VhcG9uXCIpLFxuICBcIlBsYXllclwiOiByZXF1aXJlKFwiLi9QbGF5ZXJcIiksXG4gIFwiUHJvamVjdGlsZVwiOiByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlXCIpLFxuICBcIlJlc3NvdXJjZVwiOiByZXF1aXJlKFwiLi9SZXNzb3VyY2VcIiksXG4gIFwiUmVzc291cmNlVHlwZVwiOiByZXF1aXJlKFwiLi9SZXNzb3VyY2VUeXBlXCIpLFxuICBcIlJvb21HZW5lcmF0b3JcIjogcmVxdWlyZShcIi4vUm9vbUdlbmVyYXRvclwiKSxcbiAgXCJTaGlwXCI6IHJlcXVpcmUoXCIuL1NoaXBcIiksXG4gIFwiU2hpcFdlYXBvblwiOiByZXF1aXJlKFwiLi9TaGlwV2VhcG9uXCIpLFxuICBcIlN0YXJNYXBHZW5lcmF0b3JcIjogcmVxdWlyZShcIi4vU3Rhck1hcEdlbmVyYXRvclwiKSxcbiAgXCJTdGFyU3lzdGVtXCI6IHJlcXVpcmUoXCIuL1N0YXJTeXN0ZW1cIiksXG4gIFwiVHJhdmVsXCI6IHJlcXVpcmUoXCIuL1RyYXZlbFwiKSxcbiAgXCJWaWV3XCI6IHJlcXVpcmUoXCIuL1ZpZXdcIiksXG4gIFwiVmlzaW9uQ2FsY3VsYXRvclwiOiByZXF1aXJlKFwiLi9WaXNpb25DYWxjdWxhdG9yXCIpLFxuICBcImFjdGlvbnNcIjoge1xuICAgIFwiQWN0aW9uXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvQWN0aW9uXCIpLFxuICAgIFwiQWN0aW9uUHJvdmlkZXJcIjogcmVxdWlyZShcIi4vYWN0aW9ucy9BY3Rpb25Qcm92aWRlclwiKSxcbiAgICBcIkF0dGFja0FjdGlvblwiOiByZXF1aXJlKFwiLi9hY3Rpb25zL0F0dGFja0FjdGlvblwiKSxcbiAgICBcIkF0dGFja01vdmVBY3Rpb25cIjogcmVxdWlyZShcIi4vYWN0aW9ucy9BdHRhY2tNb3ZlQWN0aW9uXCIpLFxuICAgIFwiU2ltcGxlQWN0aW9uUHJvdmlkZXJcIjogcmVxdWlyZShcIi4vYWN0aW9ucy9TaW1wbGVBY3Rpb25Qcm92aWRlclwiKSxcbiAgICBcIlRhcmdldEFjdGlvblwiOiByZXF1aXJlKFwiLi9hY3Rpb25zL1RhcmdldEFjdGlvblwiKSxcbiAgICBcIlRpbGVkQWN0aW9uUHJvdmlkZXJcIjogcmVxdWlyZShcIi4vYWN0aW9ucy9UaWxlZEFjdGlvblByb3ZpZGVyXCIpLFxuICAgIFwiVHJhdmVsQWN0aW9uXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvVHJhdmVsQWN0aW9uXCIpLFxuICAgIFwiV2Fsa0FjdGlvblwiOiByZXF1aXJlKFwiLi9hY3Rpb25zL1dhbGtBY3Rpb25cIiksXG4gIH0sXG59IiwidmFyIGxpYnM7XG5cbmxpYnMgPSByZXF1aXJlKCcuL2xpYnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCBsaWJzLCB7XG4gIGdyaWRzOiByZXF1aXJlKCdwYXJhbGxlbGlvLWdyaWRzJyksXG4gIFBhdGhGaW5kZXI6IHJlcXVpcmUoJ3BhcmFsbGVsaW8tcGF0aGZpbmRlcicpLFxuICBzdHJpbmdzOiByZXF1aXJlKCdwYXJhbGxlbGlvLXN0cmluZ3MnKSxcbiAgdGlsZXM6IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKSxcbiAgVGltaW5nOiByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpLFxuICB3aXJpbmc6IHJlcXVpcmUoJ3BhcmFsbGVsaW8td2lyaW5nJyksXG4gIFNwYXJrOiByZXF1aXJlKCdzcGFyay1zdGFydGVyJylcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL3BhcmFsbGVsaW8uanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgTWl4YWJsZSwgUHJvcGVydGllc01hbmFnZXI7XG5cblByb3BlcnRpZXNNYW5hZ2VyID0gcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLlByb3BlcnRpZXNNYW5hZ2VyO1xuXG5NaXhhYmxlID0gcmVxdWlyZSgnLi9NaXhhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudCA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRWxlbWVudCBleHRlbmRzIE1peGFibGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXRQcm9wZXJ0aWVzTWFuYWdlcihkYXRhKTtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5pbml0V2F0Y2hlcnMoKTtcbiAgICB9XG5cbiAgICBpbml0UHJvcGVydGllc01hbmFnZXIoZGF0YSkge1xuICAgICAgdGhpcy5wcm9wZXJ0aWVzTWFuYWdlciA9IHRoaXMucHJvcGVydGllc01hbmFnZXIudXNlU2NvcGUodGhpcyk7XG4gICAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmluaXRQcm9wZXJ0aWVzKCk7XG4gICAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmNyZWF0ZVNjb3BlR2V0dGVyU2V0dGVycygpO1xuICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc01hbmFnZXIuc2V0UHJvcGVydGllc0RhdGEoZGF0YSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGFwKG5hbWUpIHtcbiAgICAgIHZhciBhcmdzO1xuICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbmFtZS5hcHBseSh0aGlzLCBhcmdzLnNsaWNlKDEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJncy5zbGljZSgxKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayhuYW1lKSB7XG4gICAgICBpZiAodGhpcy5fY2FsbGJhY2tzID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fY2FsbGJhY2tzW25hbWVdID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW25hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0ub3duZXIgPSB0aGlzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tuYW1lXTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllc01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGdldEZpbmFsUHJvcGVydGllcygpIHtcbiAgICAgIHJldHVybiBbJ3Byb3BlcnRpZXNNYW5hZ2VyJ107XG4gICAgfVxuXG4gICAgZXh0ZW5kZWQodGFyZ2V0KSB7XG4gICAgICBpZiAodGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQucHJvcGVydGllc01hbmFnZXIgPSB0YXJnZXQucHJvcGVydGllc01hbmFnZXIuY29weVdpdGgodGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5wcm9wZXJ0aWVzT3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyID0gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcGVydHkocHJvcCwgZGVzYykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvdG90eXBlLnByb3BlcnRpZXNNYW5hZ2VyID0gdGhpcy5wcm90b3R5cGUucHJvcGVydGllc01hbmFnZXIud2l0aFByb3BlcnR5KHByb3AsIGRlc2MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3RvdHlwZS5wcm9wZXJ0aWVzTWFuYWdlciA9IHRoaXMucHJvdG90eXBlLnByb3BlcnRpZXNNYW5hZ2VyLmNvcHlXaXRoKHByb3BlcnRpZXMpO1xuICAgIH1cblxuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnByb3BlcnRpZXNNYW5hZ2VyID0gbmV3IFByb3BlcnRpZXNNYW5hZ2VyKCk7XG5cbiAgcmV0dXJuIEVsZW1lbnQ7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRWxlbWVudC5qcy5tYXBcbiIsInZhciBBY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXIsIEludmFsaWRhdG9yLCBQcm9wZXJ0eVdhdGNoZXI7XG5cblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXByb3BlcnRpZXMnKS53YXRjaGVycy5Qcm9wZXJ0eVdhdGNoZXI7XG5cbkludmFsaWRhdG9yID0gcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLkludmFsaWRhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlciA9IGNsYXNzIEFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlciBleHRlbmRzIFByb3BlcnR5V2F0Y2hlciB7XG4gIGxvYWRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBzdXBlci5sb2FkT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmUgPSBvcHRpb25zLmFjdGl2ZTtcbiAgfVxuXG4gIHNob3VsZEJpbmQoKSB7XG4gICAgdmFyIGFjdGl2ZTtcbiAgICBpZiAodGhpcy5hY3RpdmUgIT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuaW52YWxpZGF0b3IgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMsIHRoaXMuc2NvcGUpO1xuICAgICAgICB0aGlzLmludmFsaWRhdG9yLmNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrQmluZCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdGhpcy5pbnZhbGlkYXRvci5yZWN5Y2xlKCk7XG4gICAgICBhY3RpdmUgPSB0aGlzLmFjdGl2ZSh0aGlzLmludmFsaWRhdG9yKTtcbiAgICAgIHRoaXMuaW52YWxpZGF0b3IuZW5kUmVjeWNsZSgpO1xuICAgICAgdGhpcy5pbnZhbGlkYXRvci5iaW5kKCk7XG4gICAgICByZXR1cm4gYWN0aXZlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9JbnZhbGlkYXRlZC9BY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXIuanMubWFwXG4iLCJ2YXIgSW52YWxpZGF0ZWQsIEludmFsaWRhdG9yO1xuXG5JbnZhbGlkYXRvciA9IHJlcXVpcmUoJ3NwYXJrLXByb3BlcnRpZXMnKS5JbnZhbGlkYXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnZhbGlkYXRlZCA9IGNsYXNzIEludmFsaWRhdGVkIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zICE9IG51bGwpIHtcbiAgICAgIHRoaXMubG9hZE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICghKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmluaXRCeUxvYWRlciA6IHZvaWQgMCkgJiYgKG9wdGlvbnMubG9hZGVyICE9IG51bGwpKSkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbG9hZE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLnNjb3BlO1xuICAgIGlmIChvcHRpb25zLmxvYWRlckFzU2NvcGUgJiYgKG9wdGlvbnMubG9hZGVyICE9IG51bGwpKSB7XG4gICAgICB0aGlzLnNjb3BlID0gb3B0aW9ucy5sb2FkZXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1bmtub3duKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yLnZhbGlkYXRlVW5rbm93bnMoKTtcbiAgfVxuXG4gIGludmFsaWRhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaW52YWxpZGF0b3IgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG5ldyBJbnZhbGlkYXRvcih0aGlzLCB0aGlzLnNjb3BlKTtcbiAgICB9XG4gICAgdGhpcy5pbnZhbGlkYXRvci5yZWN5Y2xlKCk7XG4gICAgdGhpcy5oYW5kbGVVcGRhdGUodGhpcy5pbnZhbGlkYXRvcik7XG4gICAgdGhpcy5pbnZhbGlkYXRvci5lbmRSZWN5Y2xlKCk7XG4gICAgdGhpcy5pbnZhbGlkYXRvci5iaW5kKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoYW5kbGVVcGRhdGUoaW52YWxpZGF0b3IpIHtcbiAgICBpZiAodGhpcy5zY29wZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuc2NvcGUsIGludmFsaWRhdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soaW52YWxpZGF0b3IpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuaW52YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL0ludmFsaWRhdGVkL0ludmFsaWRhdGVkLmpzLm1hcFxuIiwidmFyIExvYWRlciwgT3ZlcnJpZGVyO1xuXG5PdmVycmlkZXIgPSByZXF1aXJlKCcuL092ZXJyaWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgTG9hZGVyIGV4dGVuZHMgT3ZlcnJpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXRQcmVsb2FkZWQoKTtcbiAgICB9XG5cbiAgICBpbml0UHJlbG9hZGVkKCkge1xuICAgICAgdmFyIGRlZkxpc3Q7XG4gICAgICBkZWZMaXN0ID0gdGhpcy5wcmVsb2FkZWQ7XG4gICAgICB0aGlzLnByZWxvYWRlZCA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXMubG9hZChkZWZMaXN0KTtcbiAgICB9XG5cbiAgICBsb2FkKGRlZkxpc3QpIHtcbiAgICAgIHZhciBsb2FkZWQsIHRvTG9hZDtcbiAgICAgIHRvTG9hZCA9IFtdO1xuICAgICAgbG9hZGVkID0gZGVmTGlzdC5tYXAoKGRlZikgPT4ge1xuICAgICAgICB2YXIgaW5zdGFuY2U7XG4gICAgICAgIGlmIChkZWYuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgIGRlZiA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgbG9hZGVyOiB0aGlzXG4gICAgICAgICAgfSwgZGVmKTtcbiAgICAgICAgICBpbnN0YW5jZSA9IExvYWRlci5sb2FkKGRlZik7XG4gICAgICAgICAgZGVmID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2VcbiAgICAgICAgICB9LCBkZWYpO1xuICAgICAgICAgIGlmIChkZWYuaW5pdEJ5TG9hZGVyICYmIChpbnN0YW5jZS5pbml0ICE9IG51bGwpKSB7XG4gICAgICAgICAgICB0b0xvYWQucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWY7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucHJlbG9hZGVkID0gdGhpcy5wcmVsb2FkZWQuY29uY2F0KGxvYWRlZCk7XG4gICAgICByZXR1cm4gdG9Mb2FkLmZvckVhY2goZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmluaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHByZWxvYWQoZGVmKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGVmKSkge1xuICAgICAgICBkZWYgPSBbZGVmXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnByZWxvYWRlZCA9ICh0aGlzLnByZWxvYWRlZCB8fCBbXSkuY29uY2F0KGRlZik7XG4gICAgfVxuXG4gICAgZGVzdHJveUxvYWRlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZWxvYWRlZC5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICB2YXIgcmVmO1xuICAgICAgICByZXR1cm4gKHJlZiA9IGRlZi5pbnN0YW5jZSkgIT0gbnVsbCA/IHR5cGVvZiByZWYuZGVzdHJveSA9PT0gXCJmdW5jdGlvblwiID8gcmVmLmRlc3Ryb3koKSA6IHZvaWQgMCA6IHZvaWQgMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZpbmFsUHJvcGVydGllcygpIHtcbiAgICAgIHJldHVybiBzdXBlci5nZXRGaW5hbFByb3BlcnRpZXMoKS5jb25jYXQoWydwcmVsb2FkZWQnXSk7XG4gICAgfVxuXG4gICAgZXh0ZW5kZWQodGFyZ2V0KSB7XG4gICAgICBzdXBlci5leHRlbmRlZCh0YXJnZXQpO1xuICAgICAgaWYgKHRoaXMucHJlbG9hZGVkKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQucHJlbG9hZGVkID0gKHRhcmdldC5wcmVsb2FkZWQgfHwgW10pLmNvbmNhdCh0aGlzLnByZWxvYWRlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWRNYW55KGRlZikge1xuICAgICAgcmV0dXJuIGRlZi5tYXAoKGQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZChkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkKGRlZikge1xuICAgICAgaWYgKHR5cGVvZiBkZWYudHlwZS5jb3B5V2l0aCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBkZWYudHlwZS5jb3B5V2l0aChkZWYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBkZWYudHlwZShkZWYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwcmVsb2FkKGRlZikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvdG90eXBlLnByZWxvYWQoZGVmKTtcbiAgICB9XG5cbiAgfTtcblxuICBMb2FkZXIucHJvdG90eXBlLnByZWxvYWRlZCA9IFtdO1xuXG4gIExvYWRlci5vdmVycmlkZXMoe1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbml0LndpdGhvdXRMb2FkZXIoKTtcbiAgICAgIHJldHVybiB0aGlzLmluaXRQcmVsb2FkZWQoKTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kZXN0cm95LndpdGhvdXRMb2FkZXIoKTtcbiAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3lMb2FkZWQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBMb2FkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTG9hZGVyLmpzLm1hcFxuIiwidmFyIE1peGFibGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1peGFibGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIE1peGFibGUge1xuICAgIHN0YXRpYyBleHRlbmQob2JqKSB7XG4gICAgICB0aGlzLkV4dGVuc2lvbi5tYWtlKG9iaiwgdGhpcyk7XG4gICAgICBpZiAob2JqLnByb3RvdHlwZSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkV4dGVuc2lvbi5tYWtlKG9iai5wcm90b3R5cGUsIHRoaXMucHJvdG90eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5jbHVkZShvYmopIHtcbiAgICAgIHJldHVybiB0aGlzLkV4dGVuc2lvbi5tYWtlKG9iaiwgdGhpcy5wcm90b3R5cGUpO1xuICAgIH1cblxuICB9O1xuXG4gIE1peGFibGUuRXh0ZW5zaW9uID0ge1xuICAgIG1ha2VPbmNlOiBmdW5jdGlvbihzb3VyY2UsIHRhcmdldCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghKChyZWYgPSB0YXJnZXQuZXh0ZW5zaW9ucykgIT0gbnVsbCA/IHJlZi5pbmNsdWRlcyhzb3VyY2UpIDogdm9pZCAwKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ha2U6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgaSwgbGVuLCBvcmlnaW5hbEZpbmFsUHJvcGVydGllcywgcHJvcCwgcmVmO1xuICAgICAgcmVmID0gdGhpcy5nZXRFeHRlbnNpb25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBwcm9wID0gcmVmW2ldO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wLm5hbWUsIHByb3ApO1xuICAgICAgfVxuICAgICAgaWYgKHNvdXJjZS5nZXRGaW5hbFByb3BlcnRpZXMgJiYgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcykge1xuICAgICAgICBvcmlnaW5hbEZpbmFsUHJvcGVydGllcyA9IHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXM7XG4gICAgICAgIHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc291cmNlLmdldEZpbmFsUHJvcGVydGllcygpLmNvbmNhdChvcmlnaW5hbEZpbmFsUHJvcGVydGllcy5jYWxsKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXMgPSBzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzIHx8IHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXM7XG4gICAgICB9XG4gICAgICB0YXJnZXQuZXh0ZW5zaW9ucyA9ICh0YXJnZXQuZXh0ZW5zaW9ucyB8fCBbXSkuY29uY2F0KFtzb3VyY2VdKTtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlLmV4dGVuZGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuZXh0ZW5kZWQodGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFsd2F5c0ZpbmFsOiBbJ2V4dGVuZGVkJywgJ2V4dGVuc2lvbnMnLCAnX19zdXBlcl9fJywgJ2NvbnN0cnVjdG9yJywgJ2dldEZpbmFsUHJvcGVydGllcyddLFxuICAgIGdldEV4dGVuc2lvblByb3BlcnRpZXM6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgYWx3YXlzRmluYWwsIHByb3BzLCB0YXJnZXRDaGFpbjtcbiAgICAgIGFsd2F5c0ZpbmFsID0gdGhpcy5hbHdheXNGaW5hbDtcbiAgICAgIHRhcmdldENoYWluID0gdGhpcy5nZXRQcm90b3R5cGVDaGFpbih0YXJnZXQpO1xuICAgICAgcHJvcHMgPSBbXTtcbiAgICAgIHRoaXMuZ2V0UHJvdG90eXBlQ2hhaW4oc291cmNlKS5ldmVyeShmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIGV4Y2x1ZGU7XG4gICAgICAgIGlmICghdGFyZ2V0Q2hhaW4uaW5jbHVkZXMob2JqKSkge1xuICAgICAgICAgIGV4Y2x1ZGUgPSBhbHdheXNGaW5hbDtcbiAgICAgICAgICBpZiAoc291cmNlLmdldEZpbmFsUHJvcGVydGllcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBleGNsdWRlID0gZXhjbHVkZS5jb25jYXQoc291cmNlLmdldEZpbmFsUHJvcGVydGllcygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV4Y2x1ZGUgPSBleGNsdWRlLmNvbmNhdChbXCJsZW5ndGhcIiwgXCJwcm90b3R5cGVcIiwgXCJuYW1lXCJdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5maWx0ZXIoKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICF0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCIgJiYgaW5kZXhPZi5jYWxsKGV4Y2x1ZGUsIGtleSkgPCAwICYmICFwcm9wcy5maW5kKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3AubmFtZSA9PT0ga2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3A7XG4gICAgICAgICAgICBwcm9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgICAgICBwcm9wLm5hbWUgPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH0sXG4gICAgZ2V0UHJvdG90eXBlQ2hhaW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGJhc2VQcm90b3R5cGUsIGNoYWluO1xuICAgICAgY2hhaW4gPSBbXTtcbiAgICAgIGJhc2VQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0KTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNoYWluLnB1c2gob2JqKTtcbiAgICAgICAgaWYgKCEoKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSAmJiBvYmogIT09IE9iamVjdCAmJiBvYmogIT09IGJhc2VQcm90b3R5cGUpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGFpbjtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIE1peGFibGU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTWl4YWJsZS5qcy5tYXBcbiIsIi8vIHRvZG8gOiBcbi8vICBzaW1wbGlmaWVkIGZvcm0gOiBAd2l0aG91dE5hbWUgbWV0aG9kXG52YXIgT3ZlcnJpZGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE92ZXJyaWRlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgT3ZlcnJpZGVyIHtcbiAgICBzdGF0aWMgb3ZlcnJpZGVzKG92ZXJyaWRlcykge1xuICAgICAgcmV0dXJuIHRoaXMuT3ZlcnJpZGUuYXBwbHlNYW55KHRoaXMucHJvdG90eXBlLCB0aGlzLm5hbWUsIG92ZXJyaWRlcyk7XG4gICAgfVxuXG4gICAgZ2V0RmluYWxQcm9wZXJ0aWVzKCkge1xuICAgICAgaWYgKHRoaXMuX292ZXJyaWRlcyAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbJ19vdmVycmlkZXMnXS5jb25jYXQoT2JqZWN0LmtleXModGhpcy5fb3ZlcnJpZGVzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXh0ZW5kZWQodGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5fb3ZlcnJpZGVzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5PdmVycmlkZS5hcHBseU1hbnkodGFyZ2V0LCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsIHRoaXMuX292ZXJyaWRlcyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gT3ZlcnJpZGVyKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuZXh0ZW5kZWQgPSB0aGlzLmV4dGVuZGVkO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIE92ZXJyaWRlci5PdmVycmlkZSA9IHtcbiAgICBtYWtlTWFueTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlcykge1xuICAgICAgdmFyIGZuLCBrZXksIG92ZXJyaWRlLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrZXkgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICAgIGZuID0gb3ZlcnJpZGVzW2tleV07XG4gICAgICAgIHJlc3VsdHMucHVzaChvdmVycmlkZSA9IHRoaXMubWFrZSh0YXJnZXQsIG5hbWVzcGFjZSwga2V5LCBmbikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSxcbiAgICBhcHBseU1hbnk6IGZ1bmN0aW9uKHRhcmdldCwgbmFtZXNwYWNlLCBvdmVycmlkZXMpIHtcbiAgICAgIHZhciBrZXksIG92ZXJyaWRlLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrZXkgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICAgIG92ZXJyaWRlID0gb3ZlcnJpZGVzW2tleV07XG4gICAgICAgIGlmICh0eXBlb2Ygb3ZlcnJpZGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG92ZXJyaWRlID0gdGhpcy5tYWtlKHRhcmdldCwgbmFtZXNwYWNlLCBrZXksIG92ZXJyaWRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzLnB1c2godGhpcy5hcHBseSh0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0sXG4gICAgbWFrZTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIGZuTmFtZSwgZm4pIHtcbiAgICAgIHZhciBvdmVycmlkZTtcbiAgICAgIG92ZXJyaWRlID0ge1xuICAgICAgICBmbjoge1xuICAgICAgICAgIGN1cnJlbnQ6IGZuXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IGZuTmFtZVxuICAgICAgfTtcbiAgICAgIG92ZXJyaWRlLmZuWyd3aXRoJyArIG5hbWVzcGFjZV0gPSBmbjtcbiAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICB9LFxuICAgIGVtcHR5Rm46IGZ1bmN0aW9uKCkge30sXG4gICAgYXBwbHk6IGZ1bmN0aW9uKHRhcmdldCwgbmFtZXNwYWNlLCBvdmVycmlkZSkge1xuICAgICAgdmFyIGZuTmFtZSwgb3ZlcnJpZGVzLCByZWYsIHJlZjEsIHdpdGhvdXQ7XG4gICAgICBmbk5hbWUgPSBvdmVycmlkZS5uYW1lO1xuICAgICAgb3ZlcnJpZGVzID0gdGFyZ2V0Ll9vdmVycmlkZXMgIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24oe30sIHRhcmdldC5fb3ZlcnJpZGVzKSA6IHt9O1xuICAgICAgd2l0aG91dCA9ICgocmVmID0gdGFyZ2V0Ll9vdmVycmlkZXMpICE9IG51bGwgPyAocmVmMSA9IHJlZltmbk5hbWVdKSAhPSBudWxsID8gcmVmMS5mbi5jdXJyZW50IDogdm9pZCAwIDogdm9pZCAwKSB8fCB0YXJnZXRbZm5OYW1lXTtcbiAgICAgIG92ZXJyaWRlID0gT2JqZWN0LmFzc2lnbih7fSwgb3ZlcnJpZGUpO1xuICAgICAgaWYgKG92ZXJyaWRlc1tmbk5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgb3ZlcnJpZGUuZm4gPSBPYmplY3QuYXNzaWduKHt9LCBvdmVycmlkZXNbZm5OYW1lXS5mbiwgb3ZlcnJpZGUuZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3ZlcnJpZGUuZm4gPSBPYmplY3QuYXNzaWduKHt9LCBvdmVycmlkZS5mbik7XG4gICAgICB9XG4gICAgICBvdmVycmlkZS5mblsnd2l0aG91dCcgKyBuYW1lc3BhY2VdID0gd2l0aG91dCB8fCB0aGlzLmVtcHR5Rm47XG4gICAgICBpZiAod2l0aG91dCA9PSBudWxsKSB7XG4gICAgICAgIG92ZXJyaWRlLm1pc3NpbmdXaXRob3V0ID0gJ3dpdGhvdXQnICsgbmFtZXNwYWNlO1xuICAgICAgfSBlbHNlIGlmIChvdmVycmlkZS5taXNzaW5nV2l0aG91dCkge1xuICAgICAgICBvdmVycmlkZS5mbltvdmVycmlkZS5taXNzaW5nV2l0aG91dF0gPSB3aXRob3V0O1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZm5OYW1lLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZmluYWxGbiwgZm4sIGtleSwgcmVmMjtcbiAgICAgICAgICBmaW5hbEZuID0gb3ZlcnJpZGUuZm4uY3VycmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgIHJlZjIgPSBvdmVycmlkZS5mbjtcbiAgICAgICAgICBmb3IgKGtleSBpbiByZWYyKSB7XG4gICAgICAgICAgICBmbiA9IHJlZjJba2V5XTtcbiAgICAgICAgICAgIGZpbmFsRm5ba2V5XSA9IGZuLmJpbmQodGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAhPT0gdGhpcykge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGZuTmFtZSwge1xuICAgICAgICAgICAgICB2YWx1ZTogZmluYWxGblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaW5hbEZuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG92ZXJyaWRlc1tmbk5hbWVdID0gb3ZlcnJpZGU7XG4gICAgICByZXR1cm4gdGFyZ2V0Ll9vdmVycmlkZXMgPSBvdmVycmlkZXM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBPdmVycmlkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvT3ZlcnJpZGVyLmpzLm1hcFxuIiwidmFyIEJpbmRlciwgVXBkYXRlcjtcblxuQmluZGVyID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLkJpbmRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVyID0gY2xhc3MgVXBkYXRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmO1xuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5uZXh0ID0gW107XG4gICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgIGlmICgob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5jYWxsYmFjayA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hZGRDYWxsYmFjayhvcHRpb25zLmNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKChvcHRpb25zICE9IG51bGwgPyAocmVmID0gb3B0aW9ucy5jYWxsYmFja3MpICE9IG51bGwgPyByZWYuZm9yRWFjaCA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5jYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHZhciBjYWxsYmFjaztcbiAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLm5leHQgPSB0aGlzLmNhbGxiYWNrcy5zbGljZSgpO1xuICAgIHdoaWxlICh0aGlzLmNhbGxiYWNrcy5sZW5ndGggPiAwKSB7XG4gICAgICBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzLnNoaWZ0KCk7XG4gICAgICB0aGlzLnJ1bkNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdGhpcy5jYWxsYmFja3MgPSB0aGlzLm5leHQ7XG4gICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcnVuQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfVxuXG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0aGlzLmNhbGxiYWNrcy5pbmNsdWRlcyhjYWxsYmFjaykpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodGhpcy51cGRhdGluZyAmJiAhdGhpcy5uZXh0LmluY2x1ZGVzKGNhbGxiYWNrKSkge1xuICAgICAgcmV0dXJuIHRoaXMubmV4dC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBuZXh0VGljayhjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLnVwZGF0aW5nKSB7XG4gICAgICBpZiAoIXRoaXMubmV4dC5pbmNsdWRlcyhjYWxsYmFjaykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV4dC5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdmFyIGluZGV4O1xuICAgIGluZGV4ID0gdGhpcy5jYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgaW5kZXggPSB0aGlzLm5leHQuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMubmV4dC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGdldEJpbmRlcigpIHtcbiAgICByZXR1cm4gbmV3IFVwZGF0ZXIuQmluZGVyKHRoaXMpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgIHJldHVybiB0aGlzLm5leHQgPSBbXTtcbiAgfVxuXG59O1xuXG5VcGRhdGVyLkJpbmRlciA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGNsYXNzIEJpbmRlciBleHRlbmRzIHN1cGVyQ2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgY2FsbGJhY2sxKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2sxO1xuICAgIH1cblxuICAgIGdldFJlZigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmNhbGxiYWNrXG4gICAgICB9O1xuICAgIH1cblxuICAgIGRvQmluZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5hZGRDYWxsYmFjayh0aGlzLmNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBkb1VuYmluZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5yZW1vdmVDYWxsYmFjayh0aGlzLmNhbGxiYWNrKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gQmluZGVyO1xuXG59KS5jYWxsKHRoaXMsIEJpbmRlcik7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvVXBkYXRlci5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkVsZW1lbnRcIjogcmVxdWlyZShcIi4vRWxlbWVudFwiKSxcbiAgXCJMb2FkZXJcIjogcmVxdWlyZShcIi4vTG9hZGVyXCIpLFxuICBcIk1peGFibGVcIjogcmVxdWlyZShcIi4vTWl4YWJsZVwiKSxcbiAgXCJPdmVycmlkZXJcIjogcmVxdWlyZShcIi4vT3ZlcnJpZGVyXCIpLFxuICBcIlVwZGF0ZXJcIjogcmVxdWlyZShcIi4vVXBkYXRlclwiKSxcbiAgXCJJbnZhbGlkYXRlZFwiOiB7XG4gICAgXCJBY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXJcIjogcmVxdWlyZShcIi4vSW52YWxpZGF0ZWQvQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyXCIpLFxuICAgIFwiSW52YWxpZGF0ZWRcIjogcmVxdWlyZShcIi4vSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWRcIiksXG4gIH0sXG59IiwidmFyIGxpYnM7XG5cbmxpYnMgPSByZXF1aXJlKCcuL2xpYnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHtcbiAgJ0NvbGxlY3Rpb24nOiByZXF1aXJlKCdzcGFyay1jb2xsZWN0aW9uJylcbn0sIGxpYnMsIHJlcXVpcmUoJ3NwYXJrLXByb3BlcnRpZXMnKSwgcmVxdWlyZSgnc3BhcmstYmluZGluZycpKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9zcGFyay1zdGFydGVyLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJpbmRlcjogcmVxdWlyZSgnLi9zcmMvQmluZGVyJyksXG4gIEV2ZW50QmluZDogcmVxdWlyZSgnLi9zcmMvRXZlbnRCaW5kJyksXG4gIFJlZmVyZW5jZTogcmVxdWlyZSgnLi9zcmMvUmVmZXJlbmNlJylcbn1cbiIsImNsYXNzIEJpbmRlciB7XG4gIHRvZ2dsZUJpbmQgKHZhbCA9ICF0aGlzLmJpbmRlZCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmJpbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy51bmJpbmQoKVxuICAgIH1cbiAgfVxuXG4gIGJpbmQgKCkge1xuICAgIGlmICghdGhpcy5iaW5kZWQgJiYgdGhpcy5jYW5CaW5kKCkpIHtcbiAgICAgIHRoaXMuZG9CaW5kKClcbiAgICB9XG4gICAgdGhpcy5iaW5kZWQgPSB0cnVlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNhbkJpbmQgKCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBkb0JpbmQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJylcbiAgfVxuXG4gIHVuYmluZCAoKSB7XG4gICAgaWYgKHRoaXMuYmluZGVkICYmIHRoaXMuY2FuQmluZCgpKSB7XG4gICAgICB0aGlzLmRvVW5iaW5kKClcbiAgICB9XG4gICAgdGhpcy5iaW5kZWQgPSBmYWxzZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkb1VuYmluZCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy51bmJpbmQoKVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRlclxuIiwiXG5jb25zdCBCaW5kZXIgPSByZXF1aXJlKCcuL0JpbmRlcicpXG5jb25zdCBSZWZlcmVuY2UgPSByZXF1aXJlKCcuL1JlZmVyZW5jZScpXG5cbmNsYXNzIEV2ZW50QmluZCBleHRlbmRzIEJpbmRlciB7XG4gIGNvbnN0cnVjdG9yIChldmVudDEsIHRhcmdldDEsIGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZXZlbnQgPSBldmVudDFcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDFcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgfVxuXG4gIGNhbkJpbmQgKCkge1xuICAgIHJldHVybiAodGhpcy5jYWxsYmFjayAhPSBudWxsKSAmJiAodGhpcy50YXJnZXQgIT0gbnVsbClcbiAgfVxuXG4gIGJpbmRUbyAodGFyZ2V0KSB7XG4gICAgdGhpcy51bmJpbmQoKVxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0XG4gICAgcmV0dXJuIHRoaXMuYmluZCgpXG4gIH1cblxuICBkb0JpbmQgKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjaylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5hZGRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFkZExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5vbih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGZ1bmN0aW9uIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMgd2FzIGZvdW5kJylcbiAgICB9XG4gIH1cblxuICBkb1VuYmluZCAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjaylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5vZmYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5vZmYodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpXG4gICAgfVxuICB9XG5cbiAgZXF1YWxzIChldmVudEJpbmQpIHtcbiAgICByZXR1cm4gZXZlbnRCaW5kICE9IG51bGwgJiZcbiAgICAgIGV2ZW50QmluZC5jb25zdHJ1Y3RvciA9PT0gdGhpcy5jb25zdHJ1Y3RvciAmJlxuICAgICAgZXZlbnRCaW5kLmV2ZW50ID09PSB0aGlzLmV2ZW50ICYmXG4gICAgICBSZWZlcmVuY2UuY29tcGFyZVZhbChldmVudEJpbmQudGFyZ2V0LCB0aGlzLnRhcmdldCkgJiZcbiAgICAgIFJlZmVyZW5jZS5jb21wYXJlVmFsKGV2ZW50QmluZC5jYWxsYmFjaywgdGhpcy5jYWxsYmFjaylcbiAgfVxuXG4gIHN0YXRpYyBjaGVja0VtaXR0ZXIgKGVtaXR0ZXIsIGZhdGFsID0gdHJ1ZSkge1xuICAgIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbWl0dGVyLmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAoZmF0YWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZnVuY3Rpb24gdG8gYWRkIGV2ZW50IGxpc3RlbmVycyB3YXMgZm91bmQnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRCaW5kXG4iLCJjbGFzcyBSZWZlcmVuY2Uge1xuICBjb25zdHJ1Y3RvciAoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgfVxuXG4gIGVxdWFscyAocmVmKSB7XG4gICAgcmV0dXJuIHJlZiAhPSBudWxsICYmIHJlZi5jb25zdHJ1Y3RvciA9PT0gdGhpcy5jb25zdHJ1Y3RvciAmJiB0aGlzLmNvbXBhcmVEYXRhKHJlZi5kYXRhKVxuICB9XG5cbiAgY29tcGFyZURhdGEgKGRhdGEpIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzKGRhdGEpXG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgPT09IGRhdGEpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgPT0gbnVsbCB8fCBkYXRhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5kYXRhKS5sZW5ndGggPT09IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhkYXRhKS5ldmVyeSgoa2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBSZWZlcmVuY2UuY29tcGFyZVZhbCh0aGlzLmRhdGFba2V5XSwgZGF0YVtrZXldKVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIFJlZmVyZW5jZS5jb21wYXJlVmFsKHRoaXMuZGF0YSwgZGF0YSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyp9IHZhbDFcbiAgICogQHBhcmFtIHsqfSB2YWwyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgY29tcGFyZVZhbCAodmFsMSwgdmFsMikge1xuICAgIGlmICh2YWwxID09PSB2YWwyKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAodmFsMSA9PSBudWxsIHx8IHZhbDIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsMS5lcXVhbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWwxLmVxdWFscyh2YWwyKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbDIuZXF1YWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdmFsMi5lcXVhbHModmFsMSlcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsMSkgJiYgQXJyYXkuaXNBcnJheSh2YWwyKSkge1xuICAgICAgcmV0dXJuIHZhbDEubGVuZ3RoID09PSB2YWwyLmxlbmd0aCAmJiB2YWwxLmV2ZXJ5KCh2YWwsIGkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVZhbCh2YWwsIHZhbDJbaV0pXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyBpZiAodHlwZW9mIHZhbDEgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwyID09PSAnb2JqZWN0Jykge1xuICAgIC8vICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbDEpLmxlbmd0aCA9PT0gT2JqZWN0LmtleXModmFsMikubGVuZ3RoICYmIE9iamVjdC5rZXlzKHZhbDEpLmV2ZXJ5KChrZXkpID0+IHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVZhbCh2YWwxW2tleV0sIHZhbDJba2V5XSlcbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgc3RhdGljIG1ha2VSZWZlcnJlZCAob2JqLCBkYXRhKSB7XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcbiAgICAgIG9iai5yZWYgPSBkYXRhXG4gICAgfSBlbHNlIHtcbiAgICAgIG9iai5yZWYgPSBuZXcgUmVmZXJlbmNlKGRhdGEpXG4gICAgfVxuICAgIG9iai5lcXVhbHMgPSBmdW5jdGlvbiAob2JqMikge1xuICAgICAgcmV0dXJuIG9iajIgIT0gbnVsbCAmJiB0aGlzLnJlZi5lcXVhbHMob2JqMi5yZWYpXG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWZlcmVuY2VcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMvQ29sbGVjdGlvbicpXG4iLCIvKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmNsYXNzIENvbGxlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxUPnxBcnJheS48VD58VH0gW2Fycl1cbiAgICovXG4gIGNvbnN0cnVjdG9yIChhcnIpIHtcbiAgICBpZiAoYXJyICE9IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJyLnRvQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fYXJyYXkgPSBhcnIudG9BcnJheSgpXG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICB0aGlzLl9hcnJheSA9IGFyclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYXJyYXkgPSBbYXJyXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hcnJheSA9IFtdXG4gICAgfVxuICB9XG5cbiAgY2hhbmdlZCAoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPn0gb2xkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3JkZXJlZFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFQsVCk6IGJvb2xlYW59IGNvbXBhcmVGdW5jdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgY2hlY2tDaGFuZ2VzIChvbGQsIG9yZGVyZWQgPSB0cnVlLCBjb21wYXJlRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgaWYgKGNvbXBhcmVGdW5jdGlvbiA9PSBudWxsKSB7XG4gICAgICBjb21wYXJlRnVuY3Rpb24gPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA9PT0gYlxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgIG9sZCA9IHRoaXMuY29weShvbGQuc2xpY2UoKSlcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkID0gW11cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY291bnQoKSAhPT0gb2xkLmxlbmd0aCB8fCAob3JkZXJlZCA/IHRoaXMuc29tZShmdW5jdGlvbiAodmFsLCBpKSB7XG4gICAgICByZXR1cm4gIWNvbXBhcmVGdW5jdGlvbihvbGQuZ2V0KGkpLCB2YWwpXG4gICAgfSkgOiB0aGlzLnNvbWUoZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiAhb2xkLnBsdWNrKGZ1bmN0aW9uIChiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYilcbiAgICAgIH0pXG4gICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIGdldCAoaSkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheVtpXVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge1R9XG4gICAqL1xuICBnZXRSYW5kb20gKCkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLl9hcnJheS5sZW5ndGgpXVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpXG4gICAqIEBwYXJhbSB7VH0gdmFsXG4gICAqIEByZXR1cm4ge1R9XG4gICAqL1xuICBzZXQgKGksIHZhbCkge1xuICAgIHZhciBvbGRcbiAgICBpZiAodGhpcy5fYXJyYXlbaV0gIT09IHZhbCkge1xuICAgICAgb2xkID0gdGhpcy50b0FycmF5KClcbiAgICAgIHRoaXMuX2FycmF5W2ldID0gdmFsXG4gICAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIH1cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtUfSB2YWxcbiAgICovXG4gIGFkZCAodmFsKSB7XG4gICAgaWYgKCF0aGlzLl9hcnJheS5pbmNsdWRlcyh2YWwpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKHZhbClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1R9IHZhbFxuICAgKi9cbiAgcmVtb3ZlICh2YWwpIHtcbiAgICB2YXIgaW5kZXgsIG9sZFxuICAgIGluZGV4ID0gdGhpcy5fYXJyYXkuaW5kZXhPZih2YWwpXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgb2xkID0gdGhpcy50b0FycmF5KClcbiAgICAgIHRoaXMuX2FycmF5LnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihUKTogYm9vbGVhbn0gZm5cbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHBsdWNrIChmbikge1xuICAgIHZhciBmb3VuZCwgaW5kZXgsIG9sZFxuICAgIGluZGV4ID0gdGhpcy5fYXJyYXkuZmluZEluZGV4KGZuKVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgZm91bmQgPSB0aGlzLl9hcnJheVtpbmRleF1cbiAgICAgIHRoaXMuX2FycmF5LnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpXG4gICAgICByZXR1cm4gZm91bmRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgdG9BcnJheSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5LnNsaWNlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBjb3VudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5Lmxlbmd0aFxuICB9XG5cbiAgLyoqXG4gICAqIEB0ZW1wbGF0ZSBJdGVtVHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9BcHBlbmRcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxJdGVtVHlwZT58QXJyYXkuPEl0ZW1UeXBlPnxJdGVtVHlwZX0gW2Fycl1cbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48SXRlbVR5cGU+fVxuICAgKi9cbiAgc3RhdGljIG5ld1N1YkNsYXNzICh0b0FwcGVuZCwgYXJyKSB7XG4gICAgdmFyIFN1YkNsYXNzXG4gICAgaWYgKHR5cGVvZiB0b0FwcGVuZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIFN1YkNsYXNzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9XG4gICAgICBPYmplY3QuYXNzaWduKFN1YkNsYXNzLnByb3RvdHlwZSwgdG9BcHBlbmQpXG4gICAgICByZXR1cm4gbmV3IFN1YkNsYXNzKGFycilcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKGFycilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxUPnxBcnJheS48VD58VH0gW2Fycl1cbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48VD59XG4gICAqL1xuICBjb3B5IChhcnIpIHtcbiAgICB2YXIgY29sbFxuICAgIGlmIChhcnIgPT0gbnVsbCkge1xuICAgICAgYXJyID0gdGhpcy50b0FycmF5KClcbiAgICB9XG4gICAgY29sbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGFycilcbiAgICByZXR1cm4gY29sbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gYXJyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBlcXVhbHMgKGFycikge1xuICAgIHJldHVybiAodGhpcy5jb3VudCgpID09PSAodHlwZW9mIGFyci5jb3VudCA9PT0gJ2Z1bmN0aW9uJyA/IGFyci5jb3VudCgpIDogYXJyLmxlbmd0aCkpICYmIHRoaXMuZXZlcnkoZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgcmV0dXJuIGFycltpXSA9PT0gdmFsXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPn0gYXJyXG4gICAqIEByZXR1cm4ge0FycmF5LjxUPn1cbiAgICovXG4gIGdldEFkZGVkRnJvbSAoYXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuICFhcnIuaW5jbHVkZXMoaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBhcnJcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgZ2V0UmVtb3ZlZEZyb20gKGFycikge1xuICAgIHJldHVybiBhcnIuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuaW5jbHVkZXMoaXRlbSlcbiAgICB9KVxuICB9XG59O1xuXG5Db2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMgPSBbJ2V2ZXJ5JywgJ2ZpbmQnLCAnZmluZEluZGV4JywgJ2ZvckVhY2gnLCAnaW5jbHVkZXMnLCAnaW5kZXhPZicsICdqb2luJywgJ2xhc3RJbmRleE9mJywgJ21hcCcsICdyZWR1Y2UnLCAncmVkdWNlUmlnaHQnLCAnc29tZScsICd0b1N0cmluZyddXG5cbkNvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMgPSBbJ2NvbmNhdCcsICdmaWx0ZXInLCAnc2xpY2UnXVxuXG5Db2xsZWN0aW9uLndyaXRlZnVuY3Rpb25zID0gWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXVxuXG5Db2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHJldHVybiB0aGlzLl9hcnJheVtmdW5jdF0oLi4uYXJnKVxuICB9XG59KVxuXG5Db2xsZWN0aW9uLnJlYWRMaXN0RnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGZ1bmN0KSB7XG4gIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uICguLi5hcmcpIHtcbiAgICByZXR1cm4gdGhpcy5jb3B5KHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpKVxuICB9XG59KVxuXG5Db2xsZWN0aW9uLndyaXRlZnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGZ1bmN0KSB7XG4gIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uICguLi5hcmcpIHtcbiAgICB2YXIgb2xkLCByZXNcbiAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgIHJlcyA9IHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpXG4gICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICByZXR1cm4gcmVzXG4gIH1cbn0pXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xsZWN0aW9uLnByb3RvdHlwZSwgJ2xlbmd0aCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnQoKVxuICB9XG59KVxuXG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sICE9PSBudWxsID8gU3ltYm9sLml0ZXJhdG9yIDogMCkge1xuICBDb2xsZWN0aW9uLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheVtTeW1ib2wuaXRlcmF0b3JdKClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBJbnZhbGlkYXRvcjogcmVxdWlyZSgnLi9zcmMvSW52YWxpZGF0b3InKSxcbiAgUHJvcGVydGllc01hbmFnZXI6IHJlcXVpcmUoJy4vc3JjL1Byb3BlcnRpZXNNYW5hZ2VyJyksXG4gIFByb3BlcnR5OiByZXF1aXJlKCcuL3NyYy9Qcm9wZXJ0eScpLFxuICBzZXR0ZXJzOiB7XG4gICAgQmFzZVNldHRlcjogcmVxdWlyZSgnLi9zcmMvc2V0dGVycy9CYXNlU2V0dGVyJyksXG4gICAgQmFzZVZhbHVlU2V0dGVyOiByZXF1aXJlKCcuL3NyYy9zZXR0ZXJzL0Jhc2VWYWx1ZVNldHRlcicpLFxuICAgIENvbGxlY3Rpb25TZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL3NldHRlcnMvQ29sbGVjdGlvblNldHRlcicpLFxuICAgIE1hbnVhbFNldHRlcjogcmVxdWlyZSgnLi9zcmMvc2V0dGVycy9NYW51YWxTZXR0ZXInKSxcbiAgICBTaW1wbGVTZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL3NldHRlcnMvU2ltcGxlU2V0dGVyJylcbiAgfSxcbiAgd2F0Y2hlcnM6IHtcbiAgICBDb2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyOiByZXF1aXJlKCcuL3NyYy93YXRjaGVycy9Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyJyksXG4gICAgUHJvcGVydHlXYXRjaGVyOiByZXF1aXJlKCcuL3NyYy93YXRjaGVycy9Qcm9wZXJ0eVdhdGNoZXInKVxuICB9LFxuICBnZXR0ZXJzOiB7XG4gICAgQmFzZUdldHRlcjogcmVxdWlyZSgnLi9zcmMvZ2V0dGVycy9CYXNlR2V0dGVyJyksXG4gICAgQ2FsY3VsYXRlZEdldHRlcjogcmVxdWlyZSgnLi9zcmMvZ2V0dGVycy9DYWxjdWxhdGVkR2V0dGVyJyksXG4gICAgQ29tcG9zaXRlR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL0NvbXBvc2l0ZUdldHRlcicpLFxuICAgIEludmFsaWRhdGVkR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL0ludmFsaWRhdGVkR2V0dGVyJyksXG4gICAgTWFudWFsR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL01hbnVhbEdldHRlcicpLFxuICAgIFNpbXBsZUdldHRlcjogcmVxdWlyZSgnLi9zcmMvZ2V0dGVycy9TaW1wbGVHZXR0ZXInKVxuICB9XG59XG4iLCJjb25zdCBCaW5kZXIgPSByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykuQmluZGVyXG5jb25zdCBFdmVudEJpbmQgPSByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykuRXZlbnRCaW5kXG5cbmNvbnN0IHBsdWNrID0gZnVuY3Rpb24gKGFyciwgZm4pIHtcbiAgdmFyIGZvdW5kLCBpbmRleFxuICBpbmRleCA9IGFyci5maW5kSW5kZXgoZm4pXG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgZm91bmQgPSBhcnJbaW5kZXhdXG4gICAgYXJyLnNwbGljZShpbmRleCwgMSlcbiAgICByZXR1cm4gZm91bmRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmNsYXNzIEludmFsaWRhdG9yIGV4dGVuZHMgQmluZGVyIHtcbiAgY29uc3RydWN0b3IgKGludmFsaWRhdGVkLCBzY29wZSA9IG51bGwpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5pbnZhbGlkYXRlZCA9IGludmFsaWRhdGVkXG4gICAgdGhpcy5zY29wZSA9IHNjb3BlXG4gICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMgPSBbXVxuICAgIHRoaXMucmVjeWNsZWQgPSBbXVxuICAgIHRoaXMudW5rbm93bnMgPSBbXVxuICAgIHRoaXMuc3RyaWN0ID0gdGhpcy5jb25zdHJ1Y3Rvci5zdHJpY3RcbiAgICB0aGlzLmludmFsaWQgPSBmYWxzZVxuICAgIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlKClcbiAgICB9XG4gICAgdGhpcy5pbnZhbGlkYXRlQ2FsbGJhY2sub3duZXIgPSB0aGlzXG4gIH1cblxuICBpbnZhbGlkYXRlICgpIHtcbiAgICB2YXIgZnVuY3ROYW1lXG4gICAgdGhpcy5pbnZhbGlkID0gdHJ1ZVxuICAgIGlmICh0eXBlb2YgdGhpcy5pbnZhbGlkYXRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlZCgpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5jYWxsYmFjaygpXG4gICAgfSBlbHNlIGlmICgodGhpcy5pbnZhbGlkYXRlZCAhPSBudWxsKSAmJiB0eXBlb2YgdGhpcy5pbnZhbGlkYXRlZC5pbnZhbGlkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVkLmludmFsaWRhdGUoKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuaW52YWxpZGF0ZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmdW5jdE5hbWUgPSAnaW52YWxpZGF0ZScgKyB0aGlzLmludmFsaWRhdGVkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5pbnZhbGlkYXRlZC5zbGljZSgxKVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnNjb3BlW2Z1bmN0TmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5zY29wZVtmdW5jdE5hbWVdKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2NvcGVbdGhpcy5pbnZhbGlkYXRlZF0gPSBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmtub3duICgpIHtcbiAgICBpZiAodGhpcy5pbnZhbGlkYXRlZCAhPSBudWxsICYmIHR5cGVvZiB0aGlzLmludmFsaWRhdGVkLnVua25vd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGVkLnVua25vd24oKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKClcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudEJpbmQgKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkQmluZGVyKG5ldyBFdmVudEJpbmQoZXZlbnQsIHRhcmdldCwgY2FsbGJhY2spKVxuICB9XG5cbiAgYWRkQmluZGVyIChiaW5kZXIpIHtcbiAgICBpZiAoYmluZGVyLmNhbGxiYWNrID09IG51bGwpIHtcbiAgICAgIGJpbmRlci5jYWxsYmFjayA9IHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrXG4gICAgfVxuICAgIGlmICghdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuc29tZShmdW5jdGlvbiAoZXZlbnRCaW5kKSB7XG4gICAgICByZXR1cm4gZXZlbnRCaW5kLmVxdWFscyhiaW5kZXIpXG4gICAgfSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKHBsdWNrKHRoaXMucmVjeWNsZWQsIGZ1bmN0aW9uIChldmVudEJpbmQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5lcXVhbHMoYmluZGVyKVxuICAgICAgfSkgfHwgYmluZGVyKVxuICAgIH1cbiAgfVxuXG4gIGdldFVua25vd25DYWxsYmFjayAocHJvcCkge1xuICAgIHZhciBjYWxsYmFja1xuICAgIGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVW5rbm93bihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcm9wLmdldCgpXG4gICAgICB9LCBwcm9wKVxuICAgIH1cbiAgICBjYWxsYmFjay5wcm9wID0gcHJvcFxuICAgIHJldHVybiBjYWxsYmFja1xuICB9XG5cbiAgYWRkVW5rbm93biAoZm4sIHByb3ApIHtcbiAgICBpZiAoIXRoaXMuZmluZFVua25vd24ocHJvcCkpIHtcbiAgICAgIGZuLnByb3AgPSBwcm9wXG4gICAgICB0aGlzLnVua25vd25zLnB1c2goZm4pXG4gICAgICByZXR1cm4gdGhpcy51bmtub3duKClcbiAgICB9XG4gIH1cblxuICBmaW5kVW5rbm93biAocHJvcCkge1xuICAgIGlmIChwcm9wICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnVua25vd25zLmZpbmQoZnVuY3Rpb24gKHVua25vd24pIHtcbiAgICAgICAgcmV0dXJuIHVua25vd24ucHJvcCA9PT0gcHJvcFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBldmVudCAoZXZlbnQsIHRhcmdldCA9IHRoaXMuc2NvcGUpIHtcbiAgICBpZiAodGhpcy5jaGVja0VtaXR0ZXIodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRCaW5kKGV2ZW50LCB0YXJnZXQpXG4gICAgfVxuICB9XG5cbiAgdmFsdWUgKHZhbCwgZXZlbnQsIHRhcmdldCA9IHRoaXMuc2NvcGUpIHtcbiAgICB0aGlzLmV2ZW50KGV2ZW50LCB0YXJnZXQpXG4gICAgcmV0dXJuIHZhbFxuICB9XG5cbiAgLyoqXG4gICAqIEB0ZW1wbGF0ZSBUXG4gICAqIEBwYXJhbSB7UHJvcGVydHk8VD59IHByb3BcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHByb3AgKHByb3ApIHtcbiAgICBpZiAocHJvcCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFkZEV2ZW50QmluZCgnaW52YWxpZGF0ZWQnLCBwcm9wLmV2ZW50cywgdGhpcy5nZXRVbmtub3duQ2FsbGJhY2socHJvcCkpXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZShwcm9wLmdldCgpLCAndXBkYXRlZCcsIHByb3AuZXZlbnRzKVxuICAgIH1cbiAgfVxuXG4gIHByb3BCeU5hbWUgKHByb3AsIHRhcmdldCA9IHRoaXMuc2NvcGUpIHtcbiAgICBpZiAodGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KHByb3ApXG4gICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcChwcm9wZXJ0eSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRhcmdldFtwcm9wICsgJ1Byb3BlcnR5J10gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcCh0YXJnZXRbcHJvcCArICdQcm9wZXJ0eSddKVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0W3Byb3BdXG4gIH1cblxuICBwcm9wUGF0aCAocGF0aCwgdGFyZ2V0ID0gdGhpcy5zY29wZSkge1xuICAgIHZhciBwcm9wLCB2YWxcbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpXG4gICAgdmFsID0gdGFyZ2V0XG4gICAgd2hpbGUgKCh2YWwgIT0gbnVsbCkgJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICBwcm9wID0gcGF0aC5zaGlmdCgpXG4gICAgICB2YWwgPSB0aGlzLnByb3BCeU5hbWUocHJvcCwgdmFsKVxuICAgIH1cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBmdW5jdCAoZnVuY3QpIHtcbiAgICB2YXIgaW52YWxpZGF0b3IsIHJlc1xuICAgIGludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFVua25vd24oKCkgPT4ge1xuICAgICAgICB2YXIgcmVzMlxuICAgICAgICByZXMyID0gZnVuY3QoaW52YWxpZGF0b3IpXG4gICAgICAgIGlmIChyZXMgIT09IHJlczIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKClcbiAgICAgICAgfVxuICAgICAgfSwgaW52YWxpZGF0b3IpXG4gICAgfSlcbiAgICByZXMgPSBmdW5jdChpbnZhbGlkYXRvcilcbiAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKGludmFsaWRhdG9yKVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIHZhbGlkYXRlVW5rbm93bnMgKCkge1xuICAgIHZhciB1bmtub3duc1xuICAgIHVua25vd25zID0gdGhpcy51bmtub3duc1xuICAgIHRoaXMudW5rbm93bnMgPSBbXVxuICAgIHJldHVybiB1bmtub3ducy5mb3JFYWNoKGZ1bmN0aW9uICh1bmtub3duKSB7XG4gICAgICByZXR1cm4gdW5rbm93bigpXG4gICAgfSlcbiAgfVxuXG4gIGlzRW1wdHkgKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5sZW5ndGggPT09IDBcbiAgfVxuXG4gIGJpbmQgKCkge1xuICAgIHRoaXMuaW52YWxpZCA9IGZhbHNlXG4gICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRCaW5kKSB7XG4gICAgICBldmVudEJpbmQuYmluZCgpXG4gICAgfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVjeWNsZSAoZm4pIHtcbiAgICB2YXIgZG9uZSwgcmVzXG4gICAgdGhpcy5yZWN5Y2xlZCA9IHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzXG4gICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMgPSBbXVxuICAgIGRvbmUgPSB0aGlzLmVuZFJlY3ljbGUuYmluZCh0aGlzKVxuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChmbi5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBmbih0aGlzLCBkb25lKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzID0gZm4odGhpcylcbiAgICAgICAgZG9uZSgpXG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRvbmVcbiAgICB9XG4gIH1cblxuICBlbmRSZWN5Y2xlICgpIHtcbiAgICB0aGlzLnJlY3ljbGVkLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50QmluZCkge1xuICAgICAgcmV0dXJuIGV2ZW50QmluZC51bmJpbmQoKVxuICAgIH0pXG4gICAgdGhpcy5yZWN5Y2xlZCA9IFtdXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNoZWNrRW1pdHRlciAoZW1pdHRlcikge1xuICAgIHJldHVybiBFdmVudEJpbmQuY2hlY2tFbWl0dGVyKGVtaXR0ZXIsIHRoaXMuc3RyaWN0KVxuICB9XG5cbiAgY2hlY2tQcm9wSW5zdGFuY2UgKHByb3ApIHtcbiAgICByZXR1cm4gdHlwZW9mIHByb3AuZ2V0ID09PSAnZnVuY3Rpb24nICYmIHRoaXMuY2hlY2tFbWl0dGVyKHByb3AuZXZlbnRzKVxuICB9XG5cbiAgdW5iaW5kICgpIHtcbiAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEJpbmQpIHtcbiAgICAgIGV2ZW50QmluZC51bmJpbmQoKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufTtcblxuSW52YWxpZGF0b3Iuc3RyaWN0ID0gdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRhdG9yXG4iLCJjb25zdCBQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vUHJvcGVydHknKVxuXG5jbGFzcyBQcm9wZXJ0aWVzTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wZXJ0aWVzID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48UHJvcGVydHk+fVxuICAgICAqL1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdXG4gICAgdGhpcy5nbG9iYWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IGluaXRXYXRjaGVyczogZmFsc2UgfSwgb3B0aW9ucylcbiAgICB0aGlzLnByb3BlcnRpZXNPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcGVydGllcylcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsqfSBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Byb3BlcnRpZXNNYW5hZ2VyfVxuICAgKi9cbiAgY29weVdpdGggKHByb3BlcnRpZXMgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMubWVyZ2VQcm9wZXJ0aWVzT3B0aW9ucyh0aGlzLnByb3BlcnRpZXNPcHRpb25zLCBwcm9wZXJ0aWVzKSwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nbG9iYWxPcHRpb25zLCBvcHRpb25zKSlcbiAgfVxuXG4gIHdpdGhQcm9wZXJ0eSAocHJvcCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fVxuICAgIHByb3BlcnRpZXNbcHJvcF0gPSBvcHRpb25zXG4gICAgcmV0dXJuIHRoaXMuY29weVdpdGgocHJvcGVydGllcylcbiAgfVxuXG4gIHVzZVNjb3BlIChzY29wZSkge1xuICAgIHJldHVybiB0aGlzLmNvcHlXaXRoKHt9LCB7IHNjb3BlOiBzY29wZSB9KVxuICB9XG5cbiAgbWVyZ2VQcm9wZXJ0aWVzT3B0aW9ucyAoLi4uYXJnKSB7XG4gICAgcmV0dXJuIGFyZy5yZWR1Y2UoKHJlcywgb3B0KSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhvcHQpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgcmVzW25hbWVdID0gdGhpcy5tZXJnZVByb3BlcnR5T3B0aW9ucyhyZXNbbmFtZV0gfHwge30sIG9wdFtuYW1lXSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcmVzXG4gICAgfSwge30pXG4gIH1cblxuICBtZXJnZVByb3BlcnR5T3B0aW9ucyAoLi4uYXJnKSB7XG4gICAgY29uc3Qgbm90TWVyZ2FibGUgPSBbJ2RlZmF1bHQnLCAnc2NvcGUnXVxuICAgIHJldHVybiBhcmcucmVkdWNlKChyZXMsIG9wdCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMob3B0KS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzW25hbWVdID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvcHRbbmFtZV0gPT09ICdmdW5jdGlvbicgJiYgIW5vdE1lcmdhYmxlLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgcmVzW25hbWVdID0gdGhpcy5tZXJnZUNhbGxiYWNrKHJlc1tuYW1lXSwgb3B0W25hbWVdKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1tuYW1lXSA9IG9wdFtuYW1lXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sIHt9KVxuICB9XG5cbiAgbWVyZ2VDYWxsYmFjayAob2xkRnVuY3QsIG5ld0Z1bmN0KSB7XG4gICAgY29uc3QgZm4gPSBmdW5jdGlvbiAoLi4uYXJnKSB7XG4gICAgICByZXR1cm4gbmV3RnVuY3QuY2FsbCh0aGlzLCAuLi5hcmcsIG9sZEZ1bmN0LmJpbmQodGhpcykpXG4gICAgfVxuICAgIGZuLmNvbXBvbmVudHMgPSAob2xkRnVuY3QuY29tcG9uZW50cyB8fCBbb2xkRnVuY3RdKS5jb25jYXQoKG9sZEZ1bmN0Lm5ld0Z1bmN0IHx8IFtuZXdGdW5jdF0pKVxuICAgIGZuLm5iUGFyYW1zID0gbmV3RnVuY3QubmJQYXJhbXMgfHwgbmV3RnVuY3QubGVuZ3RoXG4gICAgcmV0dXJuIGZuXG4gIH1cblxuICBpbml0UHJvcGVydGllcyAoKSB7XG4gICAgdGhpcy5hZGRQcm9wZXJ0aWVzKHRoaXMucHJvcGVydGllc09wdGlvbnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNyZWF0ZVNjb3BlR2V0dGVyU2V0dGVycyAoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzLmZvckVhY2goKHByb3ApID0+IHByb3AuY3JlYXRlU2NvcGVHZXR0ZXJTZXR0ZXJzKCkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGluaXRXYXRjaGVycyAoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzLmZvckVhY2goKHByb3ApID0+IHByb3AuaW5pdFdhdGNoZXJzKCkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGluaXRTY29wZSAoKSB7XG4gICAgdGhpcy5pbml0UHJvcGVydGllcygpXG4gICAgdGhpcy5jcmVhdGVTY29wZUdldHRlclNldHRlcnMoKVxuICAgIHRoaXMuaW5pdFdhdGNoZXJzKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkUHJvcGVydHkgKG5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBwcm9wID0gbmV3IFByb3BlcnR5KE9iamVjdC5hc3NpZ24oeyBuYW1lOiBuYW1lIH0sIHRoaXMuZ2xvYmFsT3B0aW9ucywgb3B0aW9ucykpXG4gICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gocHJvcClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkUHJvcGVydGllcyAob3B0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG5hbWUpID0+IHRoaXMuYWRkUHJvcGVydHkobmFtZSwgb3B0aW9uc1tuYW1lXSkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcmV0dXJucyB7UHJvcGVydHl9XG4gICAqL1xuICBnZXRQcm9wZXJ0eSAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXMuZmluZCgocHJvcCkgPT4gcHJvcC5vcHRpb25zLm5hbWUgPT09IG5hbWUpXG4gIH1cblxuICBzZXRQcm9wZXJ0aWVzRGF0YSAoZGF0YSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoKChvcHRpb25zLndoaXRlbGlzdCA9PSBudWxsKSB8fCBvcHRpb25zLndoaXRlbGlzdC5pbmRleE9mKGtleSkgIT09IC0xKSAmJiAoKG9wdGlvbnMuYmxhY2tsaXN0ID09IG51bGwpIHx8IG9wdGlvbnMuYmxhY2tsaXN0LmluZGV4T2Yoa2V5KSA9PT0gLTEpKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLmdldFByb3BlcnR5KGtleSlcbiAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICBwcm9wLnNldChkYXRhW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBnZXRNYW51YWxEYXRhUHJvcGVydGllcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcy5yZWR1Y2UoKHJlcywgcHJvcCkgPT4ge1xuICAgICAgaWYgKHByb3AuZ2V0dGVyLmNhbGN1bGF0ZWQgJiYgcHJvcC5tYW51YWwpIHtcbiAgICAgICAgcmVzW3Byb3Aub3B0aW9ucy5uYW1lXSA9IHByb3AuZ2V0KClcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LCB7fSlcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMucHJvcGVydGllcy5mb3JFYWNoKChwcm9wKSA9PiBwcm9wLmRlc3Ryb3koKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3BlcnRpZXNNYW5hZ2VyXG4iLCJjb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcblxuY29uc3QgU2ltcGxlR2V0dGVyID0gcmVxdWlyZSgnLi9nZXR0ZXJzL1NpbXBsZUdldHRlcicpXG5jb25zdCBDYWxjdWxhdGVkR2V0dGVyID0gcmVxdWlyZSgnLi9nZXR0ZXJzL0NhbGN1bGF0ZWRHZXR0ZXInKVxuY29uc3QgSW52YWxpZGF0ZWRHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvSW52YWxpZGF0ZWRHZXR0ZXInKVxuY29uc3QgTWFudWFsR2V0dGVyID0gcmVxdWlyZSgnLi9nZXR0ZXJzL01hbnVhbEdldHRlcicpXG5jb25zdCBDb21wb3NpdGVHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvQ29tcG9zaXRlR2V0dGVyJylcblxuY29uc3QgTWFudWFsU2V0dGVyID0gcmVxdWlyZSgnLi9zZXR0ZXJzL01hbnVhbFNldHRlcicpXG5jb25zdCBTaW1wbGVTZXR0ZXIgPSByZXF1aXJlKCcuL3NldHRlcnMvU2ltcGxlU2V0dGVyJylcbmNvbnN0IEJhc2VWYWx1ZVNldHRlciA9IHJlcXVpcmUoJy4vc2V0dGVycy9CYXNlVmFsdWVTZXR0ZXInKVxuY29uc3QgQ29sbGVjdGlvblNldHRlciA9IHJlcXVpcmUoJy4vc2V0dGVycy9Db2xsZWN0aW9uU2V0dGVyJylcblxuLyoqXG4gKiBAdGVtcGxhdGUgVFxuICovXG5jbGFzcyBQcm9wZXJ0eSB7XG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wZXJ0eU9wdGlvbnNcbiAgICogQHByb3BlcnR5IHtUfSBbZGVmYXVsdF1cbiAgICogQHByb3BlcnR5IHtmdW5jdGlvbihpbXBvcnQoXCIuL0ludmFsaWRhdG9yXCIpKTogVH0gW2NhbGN1bF1cbiAgICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiBUfSBbZ2V0XVxuICAgKiBAcHJvcGVydHkge2Z1bmN0aW9uKFQpfSBbc2V0XVxuICAgKiBAcHJvcGVydHkge2Z1bmN0aW9uKFQsVCl8aW1wb3J0KFwiLi9Qcm9wZXJ0eVdhdGNoZXJcIik8VD59IFtjaGFuZ2VdXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbnxzdHJpbmd8ZnVuY3Rpb24oVCxUKTpUfSBbY29tcG9zZWRdXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbnxPYmplY3R9IFtjb2xsZWN0aW9uXVxuICAgKiBAcHJvcGVydHkgeyp9IFtzY29wZV1cbiAgICpcbiAgICogQHBhcmFtIHtQcm9wZXJ0eU9wdGlvbnN9IG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBQcm9wZXJ0eS5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucylcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAgICAgKi9cbiAgICB0aGlzLmV2ZW50cyA9IG5ldyB0aGlzLm9wdGlvbnMuRXZlbnRFbWl0dGVyQ2xhc3MoKVxuICAgIHRoaXMubWFrZVNldHRlcigpXG4gICAgdGhpcy5tYWtlR2V0dGVyKClcbiAgICB0aGlzLnNldHRlci5pbml0KClcbiAgICB0aGlzLmdldHRlci5pbml0KClcbiAgICBpZiAodGhpcy5vcHRpb25zLmluaXRXYXRjaGVycykge1xuICAgICAgdGhpcy5pbml0V2F0Y2hlcnMoKVxuICAgIH1cbiAgfVxuXG4gIGluaXRXYXRjaGVycyAoKSB7XG4gICAgdGhpcy5zZXR0ZXIubG9hZEludGVybmFsV2F0Y2hlcigpXG4gIH1cblxuICBtYWtlR2V0dGVyICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5nZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZ2V0dGVyID0gbmV3IE1hbnVhbEdldHRlcih0aGlzKVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNvbXBvc2VkICE9IG51bGwgJiYgdGhpcy5vcHRpb25zLmNvbXBvc2VkICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBuZXcgQ29tcG9zaXRlR2V0dGVyKHRoaXMpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKCh0aGlzLm9wdGlvbnMuY2FsY3VsLm5iUGFyYW1zIHx8IHRoaXMub3B0aW9ucy5jYWxjdWwubGVuZ3RoKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmdldHRlciA9IG5ldyBDYWxjdWxhdGVkR2V0dGVyKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdldHRlciA9IG5ldyBJbnZhbGlkYXRlZEdldHRlcih0aGlzKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldHRlciA9IG5ldyBTaW1wbGVHZXR0ZXIodGhpcylcbiAgICB9XG4gIH1cblxuICBtYWtlU2V0dGVyICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuc2V0dGVyID0gbmV3IE1hbnVhbFNldHRlcih0aGlzKVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNvbGxlY3Rpb24gIT0gbnVsbCAmJiB0aGlzLm9wdGlvbnMuY29sbGVjdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2V0dGVyID0gbmV3IENvbGxlY3Rpb25TZXR0ZXIodGhpcylcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb21wb3NlZCAhPSBudWxsICYmIHRoaXMub3B0aW9ucy5jb21wb3NlZCAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2V0dGVyID0gbmV3IEJhc2VWYWx1ZVNldHRlcih0aGlzKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldHRlciA9IG5ldyBTaW1wbGVTZXR0ZXIodGhpcylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9wZXJ0eTxUPn1cbiAgICovXG4gIGNvcHlXaXRoIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucykpXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1R9XG4gICAqL1xuICBnZXQgKCkge1xuICAgIHJldHVybiB0aGlzLmdldHRlci5nZXQoKVxuICB9XG5cbiAgaW52YWxpZGF0ZSAoKSB7XG4gICAgdGhpcy5nZXR0ZXIuaW52YWxpZGF0ZSgpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHVua25vd24gKCkge1xuICAgIHRoaXMuZ2V0dGVyLnVua25vd24oKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXQgKHZhbCkge1xuICAgIHJldHVybiB0aGlzLnNldHRlci5zZXQodmFsKVxuICB9XG5cbiAgY3JlYXRlU2NvcGVHZXR0ZXJTZXR0ZXJzICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNjb3BlKSB7XG4gICAgICBjb25zdCBwcm9wID0gdGhpc1xuICAgICAgbGV0IG9wdCA9IHt9XG4gICAgICBvcHRbdGhpcy5vcHRpb25zLm5hbWUgKyAnUHJvcGVydHknXSA9IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3B0ID0gdGhpcy5nZXR0ZXIuZ2V0U2NvcGVHZXR0ZXJTZXR0ZXJzKG9wdClcbiAgICAgIG9wdCA9IHRoaXMuc2V0dGVyLmdldFNjb3BlR2V0dGVyU2V0dGVycyhvcHQpXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLm9wdGlvbnMuc2NvcGUsIG9wdClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVzdHJveSA9PT0gdHJ1ZSAmJiB0aGlzLnZhbHVlICE9IG51bGwgJiYgdGhpcy52YWx1ZS5kZXN0cm95ICE9IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUuZGVzdHJveSgpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuY2FsbE9wdGlvbkZ1bmN0KCdkZXN0cm95JywgdGhpcy52YWx1ZSlcbiAgICB9XG4gICAgdGhpcy5nZXR0ZXIuZGVzdHJveSgpXG4gICAgdGhpcy52YWx1ZSA9IG51bGxcbiAgfVxuXG4gIGNhbGxPcHRpb25GdW5jdCAoZnVuY3QsIC4uLmFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIGZ1bmN0ID09PSAnc3RyaW5nJykge1xuICAgICAgZnVuY3QgPSB0aGlzLm9wdGlvbnNbZnVuY3RdXG4gICAgfVxuICAgIHJldHVybiBmdW5jdC5hcHBseSh0aGlzLm9wdGlvbnMuc2NvcGUgfHwgdGhpcywgYXJncylcbiAgfVxufVxuXG5Qcm9wZXJ0eS5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgRXZlbnRFbWl0dGVyQ2xhc3M6IEV2ZW50RW1pdHRlcixcbiAgaW5pdFdhdGNoZXJzOiB0cnVlXG59XG5tb2R1bGUuZXhwb3J0cyA9IFByb3BlcnR5XG4iLCJcbmNsYXNzIEJhc2VHZXR0ZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcCkge1xuICAgIHRoaXMucHJvcCA9IHByb3BcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuY2FsY3VsYXRlZCA9IGZhbHNlXG4gICAgdGhpcy5pbml0aWF0ZWQgPSBmYWxzZVxuICB9XG5cbiAgZ2V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gIH1cblxuICBvdXRwdXQgKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMub3V0cHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wLmNhbGxPcHRpb25GdW5jdCgnb3V0cHV0JywgdGhpcy5wcm9wLnZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wLnZhbHVlXG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZWQgKCkge1xuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWVcbiAgICB0aGlzLmluaXRpYXRlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5rbm93biAoKSB7XG4gICAgaWYgKHRoaXMuY2FsY3VsYXRlZCkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlTm90aWNlKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGludmFsaWRhdGUgKCkge1xuICAgIGlmICh0aGlzLmNhbGN1bGF0ZWQpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlZCA9IGZhbHNlXG4gICAgICB0aGlzLmludmFsaWRhdGVOb3RpY2UoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgaW52YWxpZGF0ZU5vdGljZSAoKSB7XG4gICAgdGhpcy5wcm9wLmV2ZW50cy5lbWl0KCdpbnZhbGlkYXRlZCcpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eURlc2NyaXB0b3JNYXB9IG9wdFxuICAgKiBAcmV0dXJuIHtQcm9wZXJ0eURlc2NyaXB0b3JNYXB9XG4gICAqL1xuICBnZXRTY29wZUdldHRlclNldHRlcnMgKG9wdCkge1xuICAgIGNvbnN0IHByb3AgPSB0aGlzLnByb3BcbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0gPSBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0gfHwge31cbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0uZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByb3AuZ2V0KClcbiAgICB9XG4gICAgb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdLmVudW1lcmFibGUgPSB0cnVlXG4gICAgb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdLmNvbmZpZ3VyYWJsZSA9IHRydWVcbiAgICByZXR1cm4gb3B0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VHZXR0ZXJcbiIsIlxuY29uc3QgQmFzZUdldHRlciA9IHJlcXVpcmUoJy4vQmFzZUdldHRlcicpXG5cbmNsYXNzIENhbGN1bGF0ZWRHZXR0ZXIgZXh0ZW5kcyBCYXNlR2V0dGVyIHtcbiAgZ2V0ICgpIHtcbiAgICBpZiAoIXRoaXMuY2FsY3VsYXRlZCkge1xuICAgICAgY29uc3Qgb2xkID0gdGhpcy5wcm9wLnZhbHVlXG4gICAgICBjb25zdCBpbml0aWF0ZWQgPSB0aGlzLmluaXRpYXRlZFxuICAgICAgdGhpcy5jYWxjdWwoKVxuICAgICAgaWYgKCFpbml0aWF0ZWQpIHtcbiAgICAgICAgdGhpcy5wcm9wLmV2ZW50cy5lbWl0KCd1cGRhdGVkJywgb2xkKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3Auc2V0dGVyLmNoZWNrQ2hhbmdlcyh0aGlzLnByb3AudmFsdWUsIG9sZCkpIHtcbiAgICAgICAgdGhpcy5wcm9wLnNldHRlci5jaGFuZ2VkKG9sZClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KClcbiAgfVxuXG4gIGNhbGN1bCAoKSB7XG4gICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZSh0aGlzLnByb3AuY2FsbE9wdGlvbkZ1bmN0KCdjYWxjdWwnKSlcbiAgICB0aGlzLnByb3AubWFudWFsID0gZmFsc2VcbiAgICB0aGlzLnJldmFsaWRhdGVkKClcbiAgICByZXR1cm4gdGhpcy5wcm9wLnZhbHVlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDYWxjdWxhdGVkR2V0dGVyXG4iLCJjb25zdCBJbnZhbGlkYXRlZEdldHRlciA9IHJlcXVpcmUoJy4vSW52YWxpZGF0ZWRHZXR0ZXInKVxuY29uc3QgQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ3NwYXJrLWNvbGxlY3Rpb24nKVxuY29uc3QgSW52YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9JbnZhbGlkYXRvcicpXG5jb25zdCBSZWZlcmVuY2UgPSByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykuUmVmZXJlbmNlXG5cbmNsYXNzIENvbXBvc2l0ZUdldHRlciBleHRlbmRzIEludmFsaWRhdGVkR2V0dGVyIHtcbiAgaW5pdCAoKSB7XG4gICAgc3VwZXIuaW5pdCgpXG4gICAgaWYgKHRoaXMucHJvcC5vcHRpb25zLmRlZmF1bHQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5iYXNlVmFsdWUgPSB0aGlzLnByb3Aub3B0aW9ucy5kZWZhdWx0XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcC5zZXR0ZXIuc2V0UmF3VmFsdWUobnVsbClcbiAgICAgIHRoaXMuYmFzZVZhbHVlID0gbnVsbFxuICAgIH1cbiAgICB0aGlzLm1lbWJlcnMgPSBuZXcgQ29tcG9zaXRlR2V0dGVyLk1lbWJlcnModGhpcy5wcm9wLm9wdGlvbnMubWVtYmVycylcbiAgICBpZiAodGhpcy5wcm9wLm9wdGlvbnMuY2FsY3VsICE9IG51bGwpIHtcbiAgICAgIHRoaXMubWVtYmVycy51bnNoaWZ0KChwcmV2LCBpbnZhbGlkYXRvcikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wLm9wdGlvbnMuY2FsY3VsLmJpbmQodGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUpKGludmFsaWRhdG9yKVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5tZW1iZXJzLmNoYW5nZWQgPSAob2xkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKClcbiAgICB9XG4gICAgdGhpcy5wcm9wLm1lbWJlcnMgPSB0aGlzLm1lbWJlcnNcblxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY29tcG9zZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuam9pbiA9IHRoaXMucHJvcC5vcHRpb25zLmNvbXBvc2VkXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY29tcG9zZWQgPT09ICdzdHJpbmcnICYmIENvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zW3RoaXMucHJvcC5vcHRpb25zLmNvbXBvc2VkXSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmpvaW4gPSBDb21wb3NpdGVHZXR0ZXIuam9pbkZ1bmN0aW9uc1t0aGlzLnByb3Aub3B0aW9ucy5jb21wb3NlZF1cbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcC5vcHRpb25zLmRlZmF1bHQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmpvaW4gPSBDb21wb3NpdGVHZXR0ZXIuam9pbkZ1bmN0aW9ucy5vclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wLm9wdGlvbnMuZGVmYXVsdCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5qb2luID0gQ29tcG9zaXRlR2V0dGVyLmpvaW5GdW5jdGlvbnMuYW5kXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuam9pbiA9IENvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zLmxhc3RcbiAgICB9XG4gIH1cblxuICBjYWxjdWwgKCkge1xuICAgIGlmICh0aGlzLm1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICBpZiAoIXRoaXMuaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG5ldyBJbnZhbGlkYXRvcih0aGlzLnByb3AsIHRoaXMucHJvcC5vcHRpb25zLnNjb3BlKVxuICAgICAgfVxuICAgICAgdGhpcy5pbnZhbGlkYXRvci5yZWN5Y2xlKChpbnZhbGlkYXRvciwgZG9uZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3Auc2V0dGVyLnNldFJhd1ZhbHVlKHRoaXMubWVtYmVycy5yZWR1Y2UoKHByZXYsIG1lbWJlcikgPT4ge1xuICAgICAgICAgIHZhciB2YWxcbiAgICAgICAgICB2YWwgPSB0eXBlb2YgbWVtYmVyID09PSAnZnVuY3Rpb24nID8gbWVtYmVyKHByZXYsIHRoaXMuaW52YWxpZGF0b3IpIDogbWVtYmVyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuam9pbihwcmV2LCB2YWwpXG4gICAgICAgIH0sIHRoaXMuYmFzZVZhbHVlKSlcbiAgICAgICAgZG9uZSgpXG4gICAgICAgIGlmIChpbnZhbGlkYXRvci5pc0VtcHR5KCkpIHtcbiAgICAgICAgICB0aGlzLmludmFsaWRhdG9yID0gbnVsbFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGludmFsaWRhdG9yLmJpbmQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3Auc2V0dGVyLnNldFJhd1ZhbHVlKHRoaXMuYmFzZVZhbHVlKVxuICAgIH1cbiAgICB0aGlzLnJldmFsaWRhdGVkKClcbiAgICByZXR1cm4gdGhpcy5wcm9wLnZhbHVlXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eURlc2NyaXB0b3JNYXB9IG9wdFxuICAgKiBAcmV0dXJuIHtQcm9wZXJ0eURlc2NyaXB0b3JNYXB9XG4gICAqL1xuICBnZXRTY29wZUdldHRlclNldHRlcnMgKG9wdCkge1xuICAgIG9wdCA9IHN1cGVyLmdldFNjb3BlR2V0dGVyU2V0dGVycyhvcHQpXG4gICAgY29uc3QgbWVtYmVycyA9IHRoaXMubWVtYmVyc1xuICAgIG9wdFt0aGlzLnByb3Aub3B0aW9ucy5uYW1lICsgJ01lbWJlcnMnXSA9IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWVtYmVyc1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0XG4gIH1cbn1cblxuQ29tcG9zaXRlR2V0dGVyLmpvaW5GdW5jdGlvbnMgPSB7XG4gIGFuZDogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiXG4gIH0sXG4gIG9yOiBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhIHx8IGJcbiAgfSxcbiAgbGFzdDogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYlxuICB9LFxuICBzdW06IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEgKyBiXG4gIH1cbn1cblxuQ29tcG9zaXRlR2V0dGVyLk1lbWJlcnMgPSBjbGFzcyBNZW1iZXJzIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGFkZFByb3BlcnR5IChwcm9wKSB7XG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KG51bGwsIHByb3ApID09PSAtMSkge1xuICAgICAgdGhpcy5wdXNoKFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZnVuY3Rpb24gKHByZXYsIGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHByb3ApXG4gICAgICB9LCB7XG4gICAgICAgIHByb3A6IHByb3BcbiAgICAgIH0pKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkUHJvcGVydHlQYXRoIChuYW1lLCBvYmopIHtcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgobmFtZSwgb2JqKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHVzaChSZWZlcmVuY2UubWFrZVJlZmVycmVkKGZ1bmN0aW9uIChwcmV2LCBpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgobmFtZSwgb2JqKVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvYmo6IG9ialxuICAgICAgfSkpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVQcm9wZXJ0eSAocHJvcCkge1xuICAgIHRoaXMucmVtb3ZlUmVmKHsgcHJvcDogcHJvcCB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRWYWx1ZVJlZiAodmFsLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KGRhdGEpID09PSAtMSkge1xuICAgICAgY29uc3QgZm4gPSBSZWZlcmVuY2UubWFrZVJlZmVycmVkKGZ1bmN0aW9uIChwcmV2LCBpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdmFsXG4gICAgICB9LCBkYXRhKVxuICAgICAgZm4udmFsID0gdmFsXG4gICAgICB0aGlzLnB1c2goZm4pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRWYWx1ZVJlZiAodmFsLCBkYXRhKSB7XG4gICAgY29uc3QgaSA9IHRoaXMuZmluZFJlZkluZGV4KGRhdGEpXG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlUmVmKHZhbCwgZGF0YSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0KGkpLnZhbCAhPT0gdmFsKSB7XG4gICAgICBjb25zdCBmbiA9IFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZnVuY3Rpb24gKHByZXYsIGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB2YWxcbiAgICAgIH0sIGRhdGEpXG4gICAgICBmbi52YWwgPSB2YWxcbiAgICAgIHRoaXMuc2V0KGksIGZuKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0VmFsdWVSZWYgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQnlSZWYoZGF0YSkudmFsXG4gIH1cblxuICBhZGRGdW5jdGlvblJlZiAoZm4sIGRhdGEpIHtcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgoZGF0YSkgPT09IC0xKSB7XG4gICAgICBmbiA9IFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZm4sIGRhdGEpXG4gICAgICB0aGlzLnB1c2goZm4pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmaW5kQnlSZWYgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbdGhpcy5maW5kUmVmSW5kZXgoZGF0YSldXG4gIH1cblxuICBmaW5kUmVmSW5kZXggKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkuZmluZEluZGV4KGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgIHJldHVybiAobWVtYmVyLnJlZiAhPSBudWxsKSAmJiBtZW1iZXIucmVmLmNvbXBhcmVEYXRhKGRhdGEpXG4gICAgfSlcbiAgfVxuXG4gIHJlbW92ZVJlZiAoZGF0YSkge1xuICAgIHZhciBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLmZpbmRSZWZJbmRleChkYXRhKVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgICB0aGlzLl9hcnJheS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9zaXRlR2V0dGVyXG4iLCJjb25zdCBJbnZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJylcbmNvbnN0IENhbGN1bGF0ZWRHZXR0ZXIgPSByZXF1aXJlKCcuL0NhbGN1bGF0ZWRHZXR0ZXInKVxuXG5jbGFzcyBJbnZhbGlkYXRlZEdldHRlciBleHRlbmRzIENhbGN1bGF0ZWRHZXR0ZXIge1xuICBnZXQgKCkge1xuICAgIGlmICh0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnZhbGlkYXRlVW5rbm93bnMoKVxuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuZ2V0KClcbiAgfVxuXG4gIGNhbGN1bCAoKSB7XG4gICAgaWYgKCF0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMucHJvcCwgdGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUpXG4gICAgfVxuICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcbiAgICAgIHRoaXMucHJvcC5zZXR0ZXIuc2V0UmF3VmFsdWUodGhpcy5wcm9wLmNhbGxPcHRpb25GdW5jdCgnY2FsY3VsJywgaW52YWxpZGF0b3IpKVxuICAgICAgdGhpcy5wcm9wLm1hbnVhbCA9IGZhbHNlXG4gICAgICBkb25lKClcbiAgICAgIGlmIChpbnZhbGlkYXRvci5pc0VtcHR5KCkpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludmFsaWRhdG9yLmJpbmQoKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5yZXZhbGlkYXRlZCgpXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KClcbiAgfVxuXG4gIGludmFsaWRhdGUgKCkge1xuICAgIGlmICh0aGlzLmNhbGN1bGF0ZWQpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlZCA9IGZhbHNlXG4gICAgICB0aGlzLmludmFsaWRhdGVOb3RpY2UoKVxuICAgICAgaWYgKCF0aGlzLmNhbGN1bGF0ZWQgJiYgdGhpcy5pbnZhbGlkYXRvciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IudW5iaW5kKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLmludmFsaWRhdG9yICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW52YWxpZGF0ZWRHZXR0ZXJcbiIsImNvbnN0IEJhc2VHZXR0ZXIgPSByZXF1aXJlKCcuL0Jhc2VHZXR0ZXInKVxuXG5jbGFzcyBNYW51YWxHZXR0ZXIgZXh0ZW5kcyBCYXNlR2V0dGVyIHtcbiAgZ2V0ICgpIHtcbiAgICB0aGlzLnByb3Auc2V0dGVyLnNldFJhd1ZhbHVlKHRoaXMucHJvcC5jYWxsT3B0aW9uRnVuY3QoJ2dldCcpKVxuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWVcbiAgICB0aGlzLmluaXRpYXRlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpcy5vdXRwdXQoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFudWFsR2V0dGVyXG4iLCJjb25zdCBCYXNlR2V0dGVyID0gcmVxdWlyZSgnLi9CYXNlR2V0dGVyJylcblxuY2xhc3MgU2ltcGxlR2V0dGVyIGV4dGVuZHMgQmFzZUdldHRlciB7XG4gIGdldCAoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVkID0gdHJ1ZVxuICAgIGlmICghdGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZVxuICAgICAgdGhpcy5wcm9wLmV2ZW50cy5lbWl0KCd1cGRhdGVkJylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUdldHRlclxuIiwiXG5jb25zdCBQcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCcuLi93YXRjaGVycy9Qcm9wZXJ0eVdhdGNoZXInKVxuXG5jbGFzcyBCYXNlU2V0dGVyIHtcbiAgY29uc3RydWN0b3IgKHByb3ApIHtcbiAgICB0aGlzLnByb3AgPSBwcm9wXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLnNldERlZmF1bHRWYWx1ZSgpXG4gIH1cblxuICBzZXREZWZhdWx0VmFsdWUgKCkge1xuICAgIHRoaXMuc2V0UmF3VmFsdWUodGhpcy5pbmdlc3QodGhpcy5wcm9wLm9wdGlvbnMuZGVmYXVsdCkpXG4gIH1cblxuICBsb2FkSW50ZXJuYWxXYXRjaGVyICgpIHtcbiAgICBjb25zdCBjaGFuZ2VPcHQgPSB0aGlzLnByb3Aub3B0aW9ucy5jaGFuZ2VcbiAgICBpZiAodHlwZW9mIGNoYW5nZU9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICBwcm9wZXJ0eTogdGhpcy5wcm9wLFxuICAgICAgICBjYWxsYmFjazogY2hhbmdlT3B0LFxuICAgICAgICBzY29wZTogdGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUsXG4gICAgICAgIGF1dG9CaW5kOiB0cnVlXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoY2hhbmdlT3B0ICE9IG51bGwgJiYgdHlwZW9mIGNoYW5nZU9wdC5jb3B5V2l0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGNoYW5nZU9wdC5jb3B5V2l0aCh7XG4gICAgICAgIHByb3BlcnR5OiB0aGlzLnByb3AsXG4gICAgICAgIHNjb3BlOiB0aGlzLnByb3Aub3B0aW9ucy5zY29wZSxcbiAgICAgICAgYXV0b0JpbmQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgc2V0ICh2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gIH1cblxuICBzZXRSYXdWYWx1ZSAodmFsKSB7XG4gICAgdGhpcy5wcm9wLnZhbHVlID0gdmFsXG4gICAgcmV0dXJuIHRoaXMucHJvcC52YWx1ZVxuICB9XG5cbiAgaW5nZXN0ICh2YWwpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcC5vcHRpb25zLmluZ2VzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsID0gdGhpcy5wcm9wLmNhbGxPcHRpb25GdW5jdCgnaW5nZXN0JywgdmFsKVxuICAgIH1cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBjaGVja0NoYW5nZXMgKHZhbCwgb2xkKSB7XG4gICAgcmV0dXJuIHZhbCAhPT0gb2xkXG4gIH1cblxuICBjaGFuZ2VkIChvbGQpIHtcbiAgICB0aGlzLnByb3AuZXZlbnRzLmVtaXQoJ3VwZGF0ZWQnLCBvbGQpXG4gICAgdGhpcy5wcm9wLmV2ZW50cy5lbWl0KCdjaGFuZ2VkJywgb2xkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eURlc2NyaXB0b3JNYXB9IG9wdFxuICAgKiBAcmV0dXJuIHtQcm9wZXJ0eURlc2NyaXB0b3JNYXB9XG4gICAqL1xuICBnZXRTY29wZUdldHRlclNldHRlcnMgKG9wdCkge1xuICAgIGNvbnN0IHByb3AgPSB0aGlzLnByb3BcbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0gPSBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0gfHwge31cbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0uc2V0ID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIHByb3Auc2V0KHZhbClcbiAgICB9XG4gICAgcmV0dXJuIG9wdFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVNldHRlclxuIiwiY29uc3QgQmFzZVNldHRlciA9IHJlcXVpcmUoJy4vQmFzZVNldHRlcicpXG5cbmNsYXNzIEJhc2VWYWx1ZVNldHRlciBleHRlbmRzIEJhc2VTZXR0ZXIge1xuICBzZXQgKHZhbCkge1xuICAgIHZhbCA9IHRoaXMuaW5nZXN0KHZhbClcbiAgICBpZiAodGhpcy5wcm9wLmdldHRlci5iYXNlVmFsdWUgIT09IHZhbCkge1xuICAgICAgdGhpcy5wcm9wLmdldHRlci5iYXNlVmFsdWUgPSB2YWxcbiAgICAgIHRoaXMucHJvcC5pbnZhbGlkYXRlKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VWYWx1ZVNldHRlclxuIiwiY29uc3QgU2ltcGxlU2V0dGVyID0gcmVxdWlyZSgnLi9TaW1wbGVTZXR0ZXInKVxuY29uc3QgQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ3NwYXJrLWNvbGxlY3Rpb24nKVxuY29uc3QgQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJy4uL3dhdGNoZXJzL0NvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXInKVxuXG5jbGFzcyBDb2xsZWN0aW9uU2V0dGVyIGV4dGVuZHMgU2ltcGxlU2V0dGVyIHtcbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgQ29sbGVjdGlvblNldHRlci5kZWZhdWx0T3B0aW9ucyxcbiAgICAgIHR5cGVvZiB0aGlzLnByb3Aub3B0aW9ucy5jb2xsZWN0aW9uID09PSAnb2JqZWN0JyA/IHRoaXMucHJvcC5vcHRpb25zLmNvbGxlY3Rpb24gOiB7fVxuICAgIClcbiAgICBzdXBlci5pbml0KClcbiAgfVxuXG4gIGxvYWRJbnRlcm5hbFdhdGNoZXIgKCkge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLnByb3Aub3B0aW9ucy5jaGFuZ2UgPT09ICdmdW5jdGlvbicgfHxcbiAgICAgIHR5cGVvZiB0aGlzLnByb3Aub3B0aW9ucy5pdGVtQWRkZWQgPT09ICdmdW5jdGlvbicgfHxcbiAgICAgIHR5cGVvZiB0aGlzLnByb3Aub3B0aW9ucy5pdGVtUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgcmV0dXJuIG5ldyBDb2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgICAgcHJvcGVydHk6IHRoaXMucHJvcCxcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMucHJvcC5vcHRpb25zLmNoYW5nZSxcbiAgICAgICAgb25BZGRlZDogdGhpcy5wcm9wLm9wdGlvbnMuaXRlbUFkZGVkLFxuICAgICAgICBvblJlbW92ZWQ6IHRoaXMucHJvcC5vcHRpb25zLml0ZW1SZW1vdmVkLFxuICAgICAgICBzY29wZTogdGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUsXG4gICAgICAgIGF1dG9CaW5kOiB0cnVlXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5sb2FkSW50ZXJuYWxXYXRjaGVyKClcbiAgICB9XG4gIH1cblxuICBzZXRSYXdWYWx1ZSAodmFsKSB7XG4gICAgdGhpcy5wcm9wLnZhbHVlID0gdGhpcy5tYWtlQ29sbGVjdGlvbih2YWwpXG4gICAgcmV0dXJuIHRoaXMucHJvcC52YWx1ZVxuICB9XG5cbiAgbWFrZUNvbGxlY3Rpb24gKHZhbCkge1xuICAgIHZhbCA9IHRoaXMudmFsVG9BcnJheSh2YWwpXG4gICAgY29uc3QgcHJvcCA9IHRoaXMucHJvcFxuICAgIGNvbnN0IGNvbCA9IENvbGxlY3Rpb24ubmV3U3ViQ2xhc3ModGhpcy5vcHRpb25zLCB2YWwpXG4gICAgY29sLmNoYW5nZWQgPSBmdW5jdGlvbiAob2xkKSB7XG4gICAgICBwcm9wLnNldHRlci5jaGFuZ2VkKG9sZClcbiAgICB9XG4gICAgcmV0dXJuIGNvbFxuICB9XG5cbiAgdmFsVG9BcnJheSAodmFsKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHZhbC50b0FycmF5KClcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgcmV0dXJuIHZhbC5zbGljZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbdmFsXVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrQ2hhbmdlcyAodmFsLCBvbGQpIHtcbiAgICB2YXIgY29tcGFyZUZ1bmN0aW9uXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuY29tcGFyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29tcGFyZUZ1bmN0aW9uID0gdGhpcy5vcHRpb25zLmNvbXBhcmVcbiAgICB9XG4gICAgcmV0dXJuIChuZXcgQ29sbGVjdGlvbih2YWwpKS5jaGVja0NoYW5nZXMob2xkLCB0aGlzLm9wdGlvbnMub3JkZXJlZCwgY29tcGFyZUZ1bmN0aW9uKVxuICB9XG59XG5cbkNvbGxlY3Rpb25TZXR0ZXIuZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGNvbXBhcmU6IGZhbHNlLFxuICBvcmRlcmVkOiB0cnVlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvblNldHRlclxuIiwiY29uc3QgQmFzZVNldHRlciA9IHJlcXVpcmUoJy4vQmFzZVNldHRlcicpXG5cbmNsYXNzIE1hbnVhbFNldHRlciBleHRlbmRzIEJhc2VTZXR0ZXIge1xuICBzZXQgKHZhbCkge1xuICAgIHRoaXMucHJvcC5jYWxsT3B0aW9uRnVuY3QoJ3NldCcsIHZhbClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hbnVhbFNldHRlclxuIiwiY29uc3QgQmFzZVNldHRlciA9IHJlcXVpcmUoJy4vQmFzZVNldHRlcicpXG5cbmNsYXNzIFNpbXBsZVNldHRlciBleHRlbmRzIEJhc2VTZXR0ZXIge1xuICBzZXQgKHZhbCkge1xuICAgIHZhciBvbGRcbiAgICB2YWwgPSB0aGlzLmluZ2VzdCh2YWwpXG4gICAgdGhpcy5wcm9wLmdldHRlci5yZXZhbGlkYXRlZCgpXG4gICAgaWYgKHRoaXMuY2hlY2tDaGFuZ2VzKHZhbCwgdGhpcy5wcm9wLnZhbHVlKSkge1xuICAgICAgb2xkID0gdGhpcy5wcm9wLnZhbHVlXG4gICAgICB0aGlzLnNldFJhd1ZhbHVlKHZhbClcbiAgICAgIHRoaXMucHJvcC5tYW51YWwgPSB0cnVlXG4gICAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlU2V0dGVyXG4iLCJcbmNvbnN0IFByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJy4vUHJvcGVydHlXYXRjaGVyJylcblxuY2xhc3MgQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlciBleHRlbmRzIFByb3BlcnR5V2F0Y2hlciB7XG4gIGxvYWRPcHRpb25zIChvcHRpb25zKSB7XG4gICAgc3VwZXIubG9hZE9wdGlvbnMob3B0aW9ucylcbiAgICB0aGlzLm9uQWRkZWQgPSBvcHRpb25zLm9uQWRkZWRcbiAgICB0aGlzLm9uUmVtb3ZlZCA9IG9wdGlvbnMub25SZW1vdmVkXG4gIH1cblxuICBoYW5kbGVDaGFuZ2UgKHZhbHVlLCBvbGQpIHtcbiAgICBvbGQgPSB2YWx1ZS5jb3B5KG9sZCB8fCBbXSlcbiAgICBpZiAodHlwZW9mIHRoaXMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnNjb3BlLCB2YWx1ZSwgb2xkKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMub25BZGRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICBpZiAoIW9sZC5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9uQWRkZWQuY2FsbCh0aGlzLnNjb3BlLCBpdGVtKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMub25SZW1vdmVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gb2xkLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgaWYgKCF2YWx1ZS5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9uUmVtb3ZlZC5jYWxsKHRoaXMuc2NvcGUsIGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlclxuIiwiXG5jb25zdCBCaW5kZXIgPSByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykuQmluZGVyXG5jb25zdCBSZWZlcmVuY2UgPSByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykuUmVmZXJlbmNlXG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqL1xuY2xhc3MgUHJvcGVydHlXYXRjaGVyIGV4dGVuZHMgQmluZGVyIHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IFByb3BlcnR5V2F0Y2hlck9wdGlvbnNcbiAgICogQHByb3BlcnR5IHtpbXBvcnQoXCIuL1Byb3BlcnR5XCIpPFQ+fHN0cmluZ30gcHJvcGVydHlcbiAgICogQHByb3BlcnR5IHtmdW5jdGlvbihULFQpfSBjYWxsYmFja1xuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IFthdXRvQmluZF1cbiAgICogQHByb3BlcnR5IHsqfSBbc2NvcGVdXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlXYXRjaGVyT3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0ZSgpXG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ2FsbGJhY2sgPSAob2xkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUob2xkKVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zICE9IG51bGwpIHtcbiAgICAgIHRoaXMubG9hZE9wdGlvbnModGhpcy5vcHRpb25zKVxuICAgIH1cbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgbG9hZE9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgICB0aGlzLnNjb3BlID0gb3B0aW9ucy5zY29wZVxuICAgIHRoaXMucHJvcGVydHkgPSBvcHRpb25zLnByb3BlcnR5XG4gICAgdGhpcy5jYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2tcbiAgICB0aGlzLmF1dG9CaW5kID0gb3B0aW9ucy5hdXRvQmluZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjb3B5V2l0aCAob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcihPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpKVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgaWYgKHRoaXMuYXV0b0JpbmQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrQmluZCgpXG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvcGVydHkgKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFByb3BCeU5hbWUodGhpcy5wcm9wZXJ0eSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydHlcbiAgfVxuXG4gIGdldFByb3BCeU5hbWUgKHByb3AsIHRhcmdldCA9IHRoaXMuc2NvcGUpIHtcbiAgICBpZiAodGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0YXJnZXQucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkocHJvcClcbiAgICB9IGVsc2UgaWYgKHRhcmdldFtwcm9wICsgJ1Byb3BlcnR5J10gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRhcmdldFtwcm9wICsgJ1Byb3BlcnR5J11cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0aGUgcHJvcGVydHkgJHtwcm9wfWApXG4gICAgfVxuICB9XG5cbiAgY2hlY2tCaW5kICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGVCaW5kKHRoaXMuc2hvdWxkQmluZCgpKVxuICB9XG5cbiAgc2hvdWxkQmluZCAoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNhbkJpbmQgKCkge1xuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5KCkgIT0gbnVsbFxuICB9XG5cbiAgZG9CaW5kICgpIHtcbiAgICB0aGlzLnVwZGF0ZSgpXG4gICAgdGhpcy5nZXRQcm9wZXJ0eSgpLmV2ZW50cy5vbignaW52YWxpZGF0ZWQnLCB0aGlzLmludmFsaWRhdGVDYWxsYmFjaylcbiAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eSgpLmV2ZW50cy5vbigndXBkYXRlZCcsIHRoaXMudXBkYXRlQ2FsbGJhY2spXG4gIH1cblxuICBkb1VuYmluZCAoKSB7XG4gICAgdGhpcy5nZXRQcm9wZXJ0eSgpLmV2ZW50cy5vZmYoJ2ludmFsaWRhdGVkJywgdGhpcy5pbnZhbGlkYXRlQ2FsbGJhY2spXG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHkoKS5ldmVudHMub2ZmKCd1cGRhdGVkJywgdGhpcy51cGRhdGVDYWxsYmFjaylcbiAgfVxuXG4gIGVxdWFscyAod2F0Y2hlcikge1xuICAgIHJldHVybiB3YXRjaGVyLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yICYmXG4gICAgICB3YXRjaGVyICE9IG51bGwgJiZcbiAgICAgIHdhdGNoZXIuZXZlbnQgPT09IHRoaXMuZXZlbnQgJiZcbiAgICAgIHdhdGNoZXIuZ2V0UHJvcGVydHkoKSA9PT0gdGhpcy5nZXRQcm9wZXJ0eSgpICYmXG4gICAgICBSZWZlcmVuY2UuY29tcGFyZVZhbCh3YXRjaGVyLmNhbGxiYWNrLCB0aGlzLmNhbGxiYWNrKVxuICB9XG5cbiAgaW52YWxpZGF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHkoKS5nZXQoKVxuICB9XG5cbiAgdXBkYXRlIChvbGQpIHtcbiAgICB2YXIgdmFsdWVcbiAgICB2YWx1ZSA9IHRoaXMuZ2V0UHJvcGVydHkoKS5nZXQoKVxuICAgIHJldHVybiB0aGlzLmhhbmRsZUNoYW5nZSh2YWx1ZSwgb2xkKVxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlICh2YWx1ZSwgb2xkKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnNjb3BlLCB2YWx1ZSwgb2xkKVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3BlcnR5V2F0Y2hlclxuIl19
