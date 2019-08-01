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



},{"./Door":6,"parallelio":140}],2:[function(require,module,exports){
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



},{"./DomUpdater":5,"./Tiled":14,"parallelio":140,"spark-starter":165}],3:[function(require,module,exports){
var BaseDamageable, Damageable, Display, DomUpdater, EventEmitter;

BaseDamageable = require('parallelio').Damageable;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

EventEmitter = require('spark-starter').EventEmitter;

module.exports = Damageable = (function() {
  class Damageable extends BaseDamageable {
    constructor() {
      super();
      this.healthCls();
      this.initDisplay();
    }

  };

  Damageable.extend(Display);

  Damageable.include(EventEmitter.prototype);

  Damageable.properties({
    healthClsSteps: {
      default: 10
    },
    healthCls: {
      calcul: function(invalidator) {
        return 'health-' + (Math.ceil(invalidator.prop('health') / invalidator.prop('maxHealth') * invalidator.prop('healthClsSteps')));
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



},{"./Display":4,"./DomUpdater":5,"parallelio":140,"spark-starter":165}],4:[function(require,module,exports){
var Display, DomUpdater, Element, EventEmitter;

Element = require('parallelio').Element;

DomUpdater = require('./DomUpdater');

EventEmitter = require('spark-starter').EventEmitter;

module.exports = Display = (function() {
  class Display extends Element {
    initDisplay() {}

    destroyDisplay() {
      if (this._display != null) {
        return this.display.remove();
      }
    }

  };

  Display.include(EventEmitter.prototype);

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



},{"./DomUpdater":5,"parallelio":140,"spark-starter":165}],5:[function(require,module,exports){
var DomUpdater, PropertyWatcher;

PropertyWatcher = require('parallelio').Spark.Invalidated.PropertyWatcher;

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
      return this.framebinded = false;
    }
  }

};



},{"parallelio":140}],6:[function(require,module,exports){
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



},{"./DomUpdater":5,"./Tiled":14,"parallelio":140,"spark-starter":165}],7:[function(require,module,exports){
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



},{"./PlayerController":8,"./View":16,"parallelio":140}],8:[function(require,module,exports){
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



},{"spark-starter":165}],9:[function(require,module,exports){
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



},{"./Display":4,"./DomUpdater":5}],10:[function(require,module,exports){
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
      this.destroyDisplay();
      return Updater.instance.removeCallback(this.callback('invalidatePrcPath'));
    }

  };

  Projectile.extend(Display);

  Projectile.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.prop('container');
        if (container != null ? container.getProperty('tileDisplay') : void 0) {
          return invalidator.prop('tileDisplay', container);
        } else if (container != null ? container.getProperty('display') : void 0) {
          return invalidator.prop('display', container);
        } else {
          return invalidator.prop('originTile').displayContainer;
        }
      }
    },
    displayX: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayX(invalidate.prop('x'));
      }
    },
    displayY: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayY(invalidate.prop('y'));
      }
    },
    moving: {
      change: function() {
        if (this.moving) {
          return Updater.instance.addCallback(this.callback('invalidatePrcPath'));
        } else {
          return Updater.instance.removeCallback(this.callback('invalidatePrcPath'));
        }
      }
    }
  });

  return Projectile;

}).call(this);



},{"./Display":4,"./Updater":15,"parallelio":140}],11:[function(require,module,exports){
var DefaultGenerator, Door, EventEmitter, ShipInterior, Tile, TileContainer;

Tile = require('./Tile');

TileContainer = require('parallelio').tiles.TileContainer;

DefaultGenerator = require('parallelio').RoomGenerator;

Door = require('./AutomaticDoor');

EventEmitter = require('spark-starter').EventEmitter;

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

  ShipInterior.include(EventEmitter.prototype);

  ShipInterior.properties({
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
      return this.addChild(new Door(opt.direction));
    });
  }

};



},{"./AutomaticDoor":1,"./Tile":13,"parallelio":140,"spark-starter":165}],12:[function(require,module,exports){
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



},{"./Damageable":3,"./DomUpdater":5,"./Projectile":10,"./Tiled":14,"parallelio":140}],13:[function(require,module,exports){
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
        container = invalidator.prop('container');
        if (container != null ? container.getProperty('tileDisplay') : void 0) {
          return invalidator.prop('tileDisplay', container);
        } else if (container != null ? container.getProperty('display') : void 0) {
          return invalidator.prop('display', container);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        return this.tileToDisplayX(invalidator.prop('x'));
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return this.tileToDisplayY(invalidator.prop('y'));
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



},{"./Display":4,"parallelio":140}],14:[function(require,module,exports){
var BaseTiled, Display, EventEmitter, Tiled;

BaseTiled = require('parallelio').tiles.Tiled;

Display = require('./Display');

EventEmitter = require('spark-starter').EventEmitter;

module.exports = Tiled = (function() {
  class Tiled extends BaseTiled {
    constructor() {
      super();
      this.initDisplay();
    }

  };

  Tiled.extend(Display);

  Tiled.include(EventEmitter.prototype);

  Tiled.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.prop('tile');
        if (tile != null) {
          return invalidator.prop('displayContainer', tile);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.prop('tile');
        if (tile != null) {
          return tile.displayX + tile.tileToDisplayX(invalidator.prop('offsetX'));
        }
      }
    },
    displayY: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.prop('tile');
        if (tile != null) {
          return tile.displayY + tile.tileToDisplayY(invalidator.prop('offsetY'));
        }
      }
    }
  });

  return Tiled;

}).call(this);



},{"./Display":4,"parallelio":140,"spark-starter":165}],15:[function(require,module,exports){
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



},{"parallelio":140}],16:[function(require,module,exports){
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
          top: invalidator.prop('top', this.bounds) * 100 + '%',
          left: invalidator.prop('left', this.bounds) * 100 + '%',
          bottom: (1 - invalidator.prop('bottom', this.bounds)) * 100 + '%',
          right: (1 - invalidator.prop('right', this.bounds)) * 100 + '%'
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



},{"./Display":4,"./DomUpdater":5,"parallelio":140}],17:[function(require,module,exports){
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
    display: {
      calcul: function(invalidator, sup) {
        return sup();
      }
    },
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



},{"./DomUpdater":5,"./Tiled":14,"parallelio":140}],18:[function(require,module,exports){
module.exports = {
  "AutomaticDoor": require("./AutomaticDoor"),
  "Character": require("./Character"),
  "Damageable": require("./Damageable"),
  "Display": require("./Display"),
  "DomUpdater": require("./DomUpdater"),
  "Door": require("./Door"),
  "Game": require("./Game"),
  "PlayerController": require("./PlayerController"),
  "PlayerSelectionInfo": require("./PlayerSelectionInfo"),
  "Projectile": require("./Projectile"),
  "ShipInterior": require("./ShipInterior"),
  "ShipWeapon": require("./ShipWeapon"),
  "Tile": require("./Tile"),
  "Tiled": require("./Tiled"),
  "Updater": require("./Updater"),
  "View": require("./View"),
  "Wire": require("./Wire"),
}
},{"./AutomaticDoor":1,"./Character":2,"./Damageable":3,"./Display":4,"./DomUpdater":5,"./Door":6,"./Game":7,"./PlayerController":8,"./PlayerSelectionInfo":9,"./Projectile":10,"./ShipInterior":11,"./ShipWeapon":12,"./Tile":13,"./Tiled":14,"./Updater":15,"./View":16,"./Wire":17}],19:[function(require,module,exports){
var Parallelio, libs;

libs = require('./libs');

Parallelio = require('parallelio');

module.exports = Object.assign({}, Parallelio, {
  DOM: libs
});



},{"./libs":18,"parallelio":140}],20:[function(require,module,exports){
(function(definition){var Grid=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Grid.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Grid;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Grid=Grid;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Grid=Grid;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var GridCell = dependencies.hasOwnProperty("GridCell") ? dependencies.GridCell : require('./GridCell');
var GridRow = dependencies.hasOwnProperty("GridRow") ? dependencies.GridRow : require('./GridRow');
var Grid;
Grid = (function() {
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

  Grid.extend(EventEmitter);

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
        rows = invalidator.prop('rows');
        return rows.reduce(function(max, row) {
          return Math.max(max, invalidator.prop('cells', row).length);
        }, 0);
      }
    }
  });

  return Grid;

}).call(this);

return(Grid);});
},{"./GridCell":21,"./GridRow":22,"spark-starter":43}],21:[function(require,module,exports){
(function(definition){var GridCell=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);GridCell.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=GridCell;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.GridCell=GridCell;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.GridCell=GridCell;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var GridCell;
GridCell = (function() {
  class GridCell extends Element {};

  GridCell.extend(EventEmitter);

  GridCell.properties({
    grid: {
      calcul: function(invalidator) {
        return invalidator.prop('grid', invalidator.prop('row'));
      }
    },
    row: {},
    columnPosition: {
      calcul: function(invalidator) {
        var row;
        row = invalidator.prop('row');
        if (row) {
          return invalidator.prop('cells', row).indexOf(this);
        }
      }
    },
    width: {
      calcul: function(invalidator) {
        return 1 / invalidator.prop('cells', invalidator.prop('row')).length;
      }
    },
    left: {
      calcul: function(invalidator) {
        return invalidator.prop('width') * invalidator.prop('columnPosition');
      }
    },
    right: {
      calcul: function(invalidator) {
        return invalidator.prop('width') * (invalidator.prop('columnPosition') + 1);
      }
    },
    height: {
      calcul: function(invalidator) {
        return invalidator.prop('height', invalidator.prop('row'));
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.prop('top', invalidator.prop('row'));
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.prop('bottom', invalidator.prop('row'));
      }
    }
  });

  return GridCell;

}).call(this);

return(GridCell);});
},{"spark-starter":43}],22:[function(require,module,exports){
(function(definition){var GridRow=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);GridRow.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=GridRow;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.GridRow=GridRow;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.GridRow=GridRow;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var GridCell = dependencies.hasOwnProperty("GridCell") ? dependencies.GridCell : require('./GridCell');
var GridRow;
GridRow = (function() {
  class GridRow extends Element {
    addCell(cell = null) {
      if (!cell) {
        cell = new GridCell();
      }
      this.cells.push(cell);
      return cell;
    }

  };

  GridRow.extend(EventEmitter);

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
        grid = invalidator.prop('grid');
        if (grid) {
          return invalidator.prop('rows', grid).indexOf(this);
        }
      }
    },
    height: {
      calcul: function(invalidator) {
        return 1 / invalidator.prop('rows', invalidator.prop('grid')).length;
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.prop('height') * invalidator.prop('rowPosition');
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.prop('height') * (invalidator.prop('rowPosition') + 1);
      }
    }
  });

  return GridRow;

}).call(this);

return(GridRow);});
},{"./GridCell":21,"spark-starter":43}],23:[function(require,module,exports){
if(module){
  module.exports = {
    Grid: require('./Grid.js'),
    GridCell: require('./GridCell.js'),
    GridRow: require('./GridRow.js')
  };
}
},{"./Grid.js":20,"./GridCell.js":21,"./GridRow.js":22}],24:[function(require,module,exports){
(function(definition){var Binder=definition(typeof Spark!=="undefined"?Spark:this.Spark);Binder.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Binder;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Binder=Binder;}else{if(this.Spark==null){this.Spark={};}this.Spark.Binder=Binder;}}})(function(){
var Binder;
Binder = (function() {
  class Binder {
    bind() {
      if (!this.binded && (this.callback != null) && (this.target != null)) {
        this.doBind();
      }
      return this.binded = true;
    }
    doBind() {
      throw new Error('Not implemented');
    }
    unbind() {
      if (this.binded && (this.callback != null) && (this.target != null)) {
        this.doUnbind();
      }
      return this.binded = false;
    }
    doUnbind() {
      throw new Error('Not implemented');
    }
    equals(binder) {
      return this.constructor.compareRefered(binder, this);
    }
    getRef() {}
    static compareRefered(obj1, obj2) {
      return obj1 === obj2 || ((obj1 != null) && (obj2 != null) && obj1.constructor === obj2.constructor && this.compareRef(obj1.ref, obj2.ref));
    }
    static compareRef(ref1, ref2) {
      return (ref1 != null) && (ref2 != null) && (ref1 === ref2 || (Array.isArray(ref1) && Array.isArray(ref1) && ref1.every((val, i) => {
        return this.compareRefered(ref1[i], ref2[i]);
      })) || (typeof ref1 === "object" && typeof ref2 === "object" && Object.keys(ref1).join() === Object.keys(ref2).join() && Object.keys(ref1).every((key) => {
        return this.compareRefered(ref1[key], ref2[key]);
      })));
    }
  };
  Object.defineProperty(Binder.prototype, 'ref', {
    get: function() {
      return this.getRef();
    }
  });
  return Binder;
}).call(this);
return(Binder);});


},{}],25:[function(require,module,exports){
(function(definition){var Collection=definition(typeof Spark!=="undefined"?Spark:this.Spark);Collection.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Collection;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Collection=Collection;}else{if(this.Spark==null){this.Spark={};}this.Spark.Collection=Collection;}}})(function(){
var Collection;
Collection = (function() {
  class Collection {
    constructor(arr) {
      if (arr != null) {
        if (typeof arr.toArray === 'function') {
          this._array = arr.toArray();
        } else if (Array.isArray(arr)) {
          this._array = arr;
        } else {
          this._array = [arr];
        }
      } else {
        this._array = [];
      }
    }
    changed() {}
    checkChanges(old, ordered = true, compareFunction = null) {
      if (compareFunction == null) {
        compareFunction = function(a, b) {
          return a === b;
        };
      }
      old = this.copy(old.slice());
      return this.count() !== old.length || (ordered ? this.some(function(val, i) {
        return !compareFunction(old.get(i), val);
      }) : this.some(function(a) {
        return !old.pluck(function(b) {
          return compareFunction(a, b);
        });
      }));
    }
    get(i) {
      return this._array[i];
    }
    set(i, val) {
      var old;
      if (this._array[i] !== val) {
        old = this.toArray();
        this._array[i] = val;
        this.changed(old);
      }
      return val;
    }
    add(val) {
      if (!this._array.includes(val)) {
        return this.push(val);
      }
    }
    remove(val) {
      var index, old;
      index = this._array.indexOf(val);
      if (index !== -1) {
        old = this.toArray();
        this._array.splice(index, 1);
        return this.changed(old);
      }
    }
    pluck(fn) {
      var found, index, old;
      index = this._array.findIndex(fn);
      if (index > -1) {
        old = this.toArray();
        found = this._array[index];
        this._array.splice(index, 1);
        this.changed(old);
        return found;
      } else {
        return null;
      }
    }
    toArray() {
      return this._array.slice();
    }
    count() {
      return this._array.length;
    }
    static newSubClass(fn, arr) {
      var SubClass;
      if (typeof fn === 'object') {
        SubClass = class extends this {};
        Object.assign(SubClass.prototype, fn);
        return new SubClass(arr);
      } else {
        return new this(arr);
      }
    }
    copy(arr) {
      var coll;
      if (arr == null) {
        arr = this.toArray();
      }
      coll = new this.constructor(arr);
      return coll;
    }
    equals(arr) {
      return (this.count() === (typeof arr.count === 'function' ? arr.count() : arr.length)) && this.every(function(val, i) {
        return arr[i] === val;
      });
    }
    getAddedFrom(arr) {
      return this._array.filter(function(item) {
        return !arr.includes(item);
      });
    }
    getRemovedFrom(arr) {
      return arr.filter((item) => {
        return !this.includes(item);
      });
    }
  };
  Collection.readFunctions = ['every', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some', 'toString'];
  Collection.readListFunctions = ['concat', 'filter', 'slice'];
  Collection.writefunctions = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
  Collection.readFunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      return this._array[funct](...arg);
    };
  });
  Collection.readListFunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      return this.copy(this._array[funct](...arg));
    };
  });
  Collection.writefunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      var old, res;
      old = this.toArray();
      res = this._array[funct](...arg);
      this.changed(old);
      return res;
    };
  });
  return Collection;
}).call(this);
Object.defineProperty(Collection.prototype, 'length', {
  get: function() {
    return this.count();
  }
});
if (typeof Symbol !== "undefined" && Symbol !== null ? Symbol.iterator : void 0) {
  Collection.prototype[Symbol.iterator] = function() {
    return this._array[Symbol.iterator]();
  };
}
return(Collection);});


},{}],26:[function(require,module,exports){
(function(definition){var Element=definition(typeof Spark!=="undefined"?Spark:this.Spark);Element.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Element;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Element=Element;}else{if(this.Spark==null){this.Spark={};}this.Spark.Element=Element;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Property = dependencies.hasOwnProperty("Property") ? dependencies.Property : require('./Property');
var Mixable = dependencies.hasOwnProperty("Mixable") ? dependencies.Mixable : require('./Mixable');
var Element;
Element = class Element extends Mixable {
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

  getFinalProperties() {
    if (this._properties != null) {
      return ['_properties'].concat(this._properties.map(function(prop) {
        return prop.name;
      }));
    } else {
      return [];
    }
  }

  extended(target) {
    var i, len, options, property, ref, results;
    if (this._properties != null) {
      ref = this._properties;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        property = ref[i];
        options = Object.assign({}, property.options);
        results.push((new Property(property.name, options)).bind(target));
      }
      return results;
    }
  }

  static property(prop, desc) {
    return (new Property(prop, desc)).bind(this.prototype);
  }

  static properties(properties) {
    var desc, prop, results;
    results = [];
    for (prop in properties) {
      desc = properties[prop];
      results.push(this.property(prop, desc));
    }
    return results;
  }

};

return(Element);});


},{"./Mixable":30,"./Property":32}],27:[function(require,module,exports){
(function(definition){var EventBind=definition(typeof Spark!=="undefined"?Spark:this.Spark);EventBind.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=EventBind;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.EventBind=EventBind;}else{if(this.Spark==null){this.Spark={};}this.Spark.EventBind=EventBind;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Binder = dependencies.hasOwnProperty("Binder") ? dependencies.Binder : require('./Binder');
var EventBind;
EventBind = class EventBind extends Binder {
  constructor(event1, target1, callback) {
    super();
    this.event = event1;
    this.target = target1;
    this.callback = callback;
  }

  getRef() {
    return {
      event: this.event,
      target: this.target,
      callback: this.callback
    };
  }

  doBind() {
    if (typeof this.target.addEventListener === 'function') {
      return this.target.addEventListener(this.event, this.callback);
    } else if (typeof this.target.addListener === 'function') {
      return this.target.addListener(this.event, this.callback);
    } else if (typeof this.target.on === 'function') {
      return this.target.on(this.event, this.callback);
    } else {
      throw new Error('No function to add event listeners was found');
    }
  }

  doUnbind() {
    if (typeof this.target.removeEventListener === 'function') {
      return this.target.removeEventListener(this.event, this.callback);
    } else if (typeof this.target.removeListener === 'function') {
      return this.target.removeListener(this.event, this.callback);
    } else if (typeof this.target.off === 'function') {
      return this.target.off(this.event, this.callback);
    } else {
      throw new Error('No function to remove event listeners was found');
    }
  }

  equals(eventBind) {
    return super.equals(eventBind) && eventBind.event === this.event;
  }

  match(event, target) {
    return event === this.event && target === this.target;
  }

  static checkEmitter(emitter, fatal = true) {
    if (typeof emitter.addEventListener === 'function' || typeof emitter.addListener === 'function' || typeof emitter.on === 'function') {
      return true;
    } else if (fatal) {
      throw new Error('No function to add event listeners was found');
    } else {
      return false;
    }
  }

};

return(EventBind);});


},{"./Binder":24}],28:[function(require,module,exports){
(function(definition){var EventEmitter=definition(typeof Spark!=="undefined"?Spark:this.Spark);EventEmitter.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=EventEmitter;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.EventEmitter=EventEmitter;}else{if(this.Spark==null){this.Spark={};}this.Spark.EventEmitter=EventEmitter;}}})(function(){
var EventEmitter;
EventEmitter = (function() {
  class EventEmitter {
    getAllEvents() {
      return this._events || (this._events = {});
    }
    getListeners(e) {
      var events;
      events = this.getAllEvents();
      return events[e] || (events[e] = []);
    }
    hasListener(e, listener) {
      return this.getListeners(e).includes(listener);
    }
    addListener(e, listener) {
      if (!this.hasListener(e, listener)) {
        this.getListeners(e).push(listener);
        return this.listenerAdded(e, listener);
      }
    }
    listenerAdded(e, listener) {}
    removeListener(e, listener) {
      var index, listeners;
      listeners = this.getListeners(e);
      index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
        return this.listenerRemoved(e, listener);
      }
    }
    listenerRemoved(e, listener) {}
    emitEvent(e, ...args) {
      var listeners;
      listeners = this.getListeners(e).slice();
      return listeners.forEach(function(listener) {
        return listener(...args);
      });
    }
  };
  EventEmitter.prototype.emit = EventEmitter.prototype.emitEvent;
  EventEmitter.prototype.trigger = EventEmitter.prototype.emitEvent;
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  return EventEmitter;
}).call(this);
return(EventEmitter);});


},{}],29:[function(require,module,exports){
(function(definition){var Invalidator=definition(typeof Spark!=="undefined"?Spark:this.Spark);Invalidator.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Invalidator;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Invalidator=Invalidator;}else{if(this.Spark==null){this.Spark={};}this.Spark.Invalidator=Invalidator;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Binder = dependencies.hasOwnProperty("Binder") ? dependencies.Binder : require('./Binder');
var EventBind = dependencies.hasOwnProperty("EventBind") ? dependencies.EventBind : require('./EventBind');
var Invalidator, pluck;
pluck = function(arr, fn) {
  var found, index;
  index = arr.findIndex(fn);
  if (index > -1) {
    found = arr[index];
    arr.splice(index, 1);
    return found;
  } else {
    return null;
  }
};

Invalidator = (function() {
  class Invalidator extends Binder {
    constructor(property, obj = null) {
      super();
      this.property = property;
      this.obj = obj;
      this.invalidationEvents = [];
      this.recycled = [];
      this.unknowns = [];
      this.strict = this.constructor.strict;
      this.invalidated = false;
      this.invalidateCallback = () => {
        this.invalidate();
        return null;
      };
      this.invalidateCallback.owner = this;
    }

    invalidate() {
      var functName;
      this.invalidated = true;
      if (typeof this.property === "function") {
        return this.property();
      } else if (typeof this.callback === "function") {
        return this.callback();
      } else if ((this.property != null) && typeof this.property.invalidate === "function") {
        return this.property.invalidate();
      } else if (typeof this.property === "string") {
        functName = 'invalidate' + this.property.charAt(0).toUpperCase() + this.property.slice(1);
        if (typeof this.obj[functName] === "function") {
          return this.obj[functName]();
        } else {
          return this.obj[this.property] = null;
        }
      }
    }

    unknown() {
      if (typeof this.property.unknown === "function") {
        return this.property.unknown();
      } else {
        return this.invalidate();
      }
    }

    addEventBind(event, target, callback) {
      return this.addBinder(new EventBind(event, target, callback));
    }

    addBinder(binder) {
      if (binder.callback == null) {
        binder.callback = this.invalidateCallback;
      }
      if (!this.invalidationEvents.some(function(eventBind) {
        return eventBind.equals(binder);
      })) {
        return this.invalidationEvents.push(pluck(this.recycled, function(eventBind) {
          return eventBind.equals(binder);
        }) || binder);
      }
    }

    getUnknownCallback(prop, target) {
      var callback;
      callback = () => {
        return this.addUnknown(function() {
          return target[prop];
        }, prop, target);
      };
      callback.ref = {
        prop: prop,
        target: target
      };
      return callback;
    }

    addUnknown(fn, prop, target) {
      if (!this.findUnknown(prop, target)) {
        fn.ref = {
          "prop": prop,
          "target": target
        };
        this.unknowns.push(fn);
        return this.unknown();
      }
    }

    findUnknown(prop, target) {
      if ((prop != null) || (target != null)) {
        return this.unknowns.find(function(unknown) {
          return unknown.ref.prop === prop && unknown.ref.target === target;
        });
      }
    }

    event(event, target = this.obj) {
      if (this.checkEmitter(target)) {
        return this.addEventBind(event, target);
      }
    }

    value(val, event, target = this.obj) {
      this.event(event, target);
      return val;
    }

    prop(prop, target = this.obj) {
      if (typeof prop !== 'string') {
        throw new Error('Property name must be a string');
      }
      if (this.checkEmitter(target)) {
        this.addEventBind(prop + 'Invalidated', target, this.getUnknownCallback(prop, target));
        return this.value(target[prop], prop + 'Updated', target);
      } else {
        return target[prop];
      }
    }

    propInitiated(prop, target = this.obj) {
      var initiated;
      initiated = target.getPropertyInstance(prop).initiated;
      if (!initiated && this.checkEmitter(target)) {
        this.event(prop + 'Updated', target);
      }
      return initiated;
    }

    funct(funct) {
      var invalidator, res;
      invalidator = new Invalidator(() => {
        return this.addUnknown(() => {
          var res2;
          res2 = funct(invalidator);
          if (res !== res2) {
            return this.invalidate();
          }
        }, invalidator);
      });
      res = funct(invalidator);
      this.invalidationEvents.push(invalidator);
      return res;
    }

    validateUnknowns(prop, target = this.obj) {
      var unknowns;
      unknowns = this.unknowns;
      this.unknowns = [];
      return unknowns.forEach(function(unknown) {
        return unknown();
      });
    }

    isEmpty() {
      return this.invalidationEvents.length === 0;
    }

    bind() {
      this.invalidated = false;
      return this.invalidationEvents.forEach(function(eventBind) {
        return eventBind.bind();
      });
    }

    recycle(callback) {
      var done, res;
      this.recycled = this.invalidationEvents;
      this.invalidationEvents = [];
      done = () => {
        this.recycled.forEach(function(eventBind) {
          return eventBind.unbind();
        });
        return this.recycled = [];
      };
      if (typeof callback === "function") {
        if (callback.length > 1) {
          return callback(this, done);
        } else {
          res = callback(this);
          done();
          return res;
        }
      } else {
        return done;
      }
    }

    checkEmitter(emitter) {
      return EventBind.checkEmitter(emitter, this.strict);
    }

    unbind() {
      return this.invalidationEvents.forEach(function(eventBind) {
        return eventBind.unbind();
      });
    }

  };

  Invalidator.strict = true;

  return Invalidator;

}).call(this);

return(Invalidator);});


},{"./Binder":24,"./EventBind":27}],30:[function(require,module,exports){
(function(definition){var Mixable=definition(typeof Spark!=="undefined"?Spark:this.Spark);Mixable.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Mixable;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Mixable=Mixable;}else{if(this.Spark==null){this.Spark={};}this.Spark.Mixable=Mixable;}}})(function(){
var Mixable,
  indexOf = [].indexOf;
Mixable = (function() {
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
    make: function(source, target) {
      var i, len, prop, ref;
      ref = this.getExtensionProperties(source, target);
      for (i = 0, len = ref.length; i < len; i++) {
        prop = ref[i];
        Object.defineProperty(target, prop.name, prop);
      }
      target.extensions = (target.extensions || []).concat([source]);
      if (typeof source.extended === 'function') {
        return source.extended(target);
      }
    },
    alwaysFinal: ['extended', 'extensions', '__super__', 'constructor'],
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
return(Mixable);});


},{}],31:[function(require,module,exports){
(function(definition){var Overrider=definition(typeof Spark!=="undefined"?Spark:this.Spark);Overrider.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Overrider;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Overrider=Overrider;}else{if(this.Spark==null){this.Spark={};}this.Spark.Overrider=Overrider;}}})(function(){
var Overrider;
Overrider = (function() {
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
return(Overrider);});


},{}],32:[function(require,module,exports){
(function(definition){var Property=definition(typeof Spark!=="undefined"?Spark:this.Spark);Property.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Property;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Property=Property;}else{if(this.Spark==null){this.Spark={};}this.Spark.Property=Property;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BasicProperty = dependencies.hasOwnProperty("BasicProperty") ? dependencies.BasicProperty : require('./PropertyTypes/BasicProperty');
var CollectionProperty = dependencies.hasOwnProperty("CollectionProperty") ? dependencies.CollectionProperty : require('./PropertyTypes/CollectionProperty');
var ComposedProperty = dependencies.hasOwnProperty("ComposedProperty") ? dependencies.ComposedProperty : require('./PropertyTypes/ComposedProperty');
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./PropertyTypes/DynamicProperty');
var CalculatedProperty = dependencies.hasOwnProperty("CalculatedProperty") ? dependencies.CalculatedProperty : require('./PropertyTypes/CalculatedProperty');
var InvalidatedProperty = dependencies.hasOwnProperty("InvalidatedProperty") ? dependencies.InvalidatedProperty : require('./PropertyTypes/InvalidatedProperty');
var ActivableProperty = dependencies.hasOwnProperty("ActivableProperty") ? dependencies.ActivableProperty : require('./PropertyTypes/ActivableProperty');
var UpdatedProperty = dependencies.hasOwnProperty("UpdatedProperty") ? dependencies.UpdatedProperty : require('./PropertyTypes/UpdatedProperty');
var PropertyOwner = dependencies.hasOwnProperty("PropertyOwner") ? dependencies.PropertyOwner : require('./PropertyOwner');
var Mixable = dependencies.hasOwnProperty("Mixable") ? dependencies.Mixable : require('./Mixable');
var Property;
Property = (function() {
  class Property {
    constructor(name, options = {}) {
      this.name = name;
      this.options = options;
    }

    bind(target) {
      var parent, prop;
      prop = this;
      if (!(typeof target.getProperty === 'function' && target.getProperty(this.name) === this)) {
        if (typeof target.getProperty === 'function' && ((parent = target.getProperty(this.name)) != null)) {
          this.override(parent);
        }
        this.getInstanceType().bind(target, prop);
        target._properties = (target._properties || []).concat([prop]);
        if (parent != null) {
          target._properties = target._properties.filter(function(existing) {
            return existing !== parent;
          });
        }
        this.makeOwner(target);
      }
      return prop;
    }

    override(parent) {
      var key, ref, results, value;
      if (this.options.parent == null) {
        this.options.parent = parent.options;
        ref = parent.options;
        results = [];
        for (key in ref) {
          value = ref[key];
          if (typeof this.options[key] === 'function' && typeof value === 'function') {
            results.push(this.options[key].overrided = value);
          } else if (typeof this.options[key] === 'undefined') {
            results.push(this.options[key] = value);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    }

    makeOwner(target) {
      var ref;
      if (!((ref = target.extensions) != null ? ref.includes(PropertyOwner.prototype) : void 0)) {
        return Mixable.Extension.make(PropertyOwner.prototype, target);
      }
    }

    getInstanceVarName() {
      return this.options.instanceVarName || '_' + this.name;
    }

    isInstantiated(obj) {
      return obj[this.getInstanceVarName()] != null;
    }

    getInstance(obj) {
      var Type, varName;
      varName = this.getInstanceVarName();
      if (!this.isInstantiated(obj)) {
        Type = this.getInstanceType();
        obj[varName] = new Type(this, obj);
      }
      return obj[varName];
    }

    getInstanceType() {
      if (!this.instanceType) {
        this.composers.forEach((composer) => {
          return composer.compose(this);
        });
      }
      return this.instanceType;
    }

  };

  Property.prototype.composers = [ComposedProperty, CollectionProperty, DynamicProperty, BasicProperty, UpdatedProperty, CalculatedProperty, InvalidatedProperty, ActivableProperty];

  return Property;

}).call(this);

return(Property);});


},{"./Mixable":30,"./PropertyOwner":33,"./PropertyTypes/ActivableProperty":34,"./PropertyTypes/BasicProperty":35,"./PropertyTypes/CalculatedProperty":36,"./PropertyTypes/CollectionProperty":37,"./PropertyTypes/ComposedProperty":38,"./PropertyTypes/DynamicProperty":39,"./PropertyTypes/InvalidatedProperty":40,"./PropertyTypes/UpdatedProperty":41}],33:[function(require,module,exports){
(function(definition){var PropertyOwner=definition(typeof Spark!=="undefined"?Spark:this.Spark);PropertyOwner.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=PropertyOwner;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.PropertyOwner=PropertyOwner;}else{if(this.Spark==null){this.Spark={};}this.Spark.PropertyOwner=PropertyOwner;}}})(function(){
var PropertyOwner;
PropertyOwner = class PropertyOwner {
  getProperty(name) {
    return this._properties && this._properties.find(function(prop) {
      return prop.name === name;
    });
  }
  getPropertyInstance(name) {
    var res;
    res = this.getProperty(name);
    if (res) {
      return res.getInstance(this);
    }
  }
  getProperties() {
    return this._properties.slice();
  }
  getPropertyInstances() {
    return this._properties.map((prop) => {
      return prop.getInstance(this);
    });
  }
  getInstantiatedProperties() {
    return this._properties.filter((prop) => {
      return prop.isInstantiated(this);
    }).map((prop) => {
      return prop.getInstance(this);
    });
  }
  getManualDataProperties() {
    return this._properties.reduce((res, prop) => {
      var instance;
      if (prop.isInstantiated(this)) {
        instance = prop.getInstance(this);
        if (instance.calculated && instance.manual) {
          res[prop.name] = instance.value;
        }
      }
      return res;
    }, {});
  }
  setProperties(data, options = {}) {
    var key, prop, val;
    for (key in data) {
      val = data[key];
      if (((options.whitelist == null) || options.whitelist.indexOf(key) !== -1) && ((options.blacklist == null) || options.blacklist.indexOf(key) === -1)) {
        prop = this.getPropertyInstance(key);
        if (prop != null) {
          prop.set(val);
        }
      }
    }
    return this;
  }
  destroyProperties() {
    this.getInstantiatedProperties().forEach((prop) => {
      return prop.destroy();
    });
    this._properties = [];
    return true;
  }
  listenerAdded(event, listener) {
    return this._properties.forEach((prop) => {
      if (prop.getInstanceType().prototype.changeEventName === event) {
        return prop.getInstance(this).get();
      }
    });
  }
  extended(target) {
    return target.listenerAdded = this.listenerAdded;
  }
};
return(PropertyOwner);});


},{}],34:[function(require,module,exports){
(function(definition){var ActivableProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);ActivableProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=ActivableProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.ActivableProperty=ActivableProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.ActivableProperty=ActivableProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var BasicProperty = dependencies.hasOwnProperty("BasicProperty") ? dependencies.BasicProperty : require('./BasicProperty');
var Overrider = dependencies.hasOwnProperty("Overrider") ? dependencies.Overrider : require('../Overrider');
var ActivableProperty;
ActivableProperty = (function() {
  class ActivableProperty extends BasicProperty {
    isActive() {
      return true;
    }

    manualActive() {
      return this.active;
    }

    callbackActive() {
      var invalidator;
      invalidator = this.activeInvalidator || new Invalidator(this, this.obj);
      invalidator.recycle((invalidator, done) => {
        this.active = this.callOptionFunct(this.activeFunct, invalidator);
        done();
        if (this.active || invalidator.isEmpty()) {
          invalidator.unbind();
          return this.activeInvalidator = null;
        } else {
          this.invalidator = invalidator;
          this.activeInvalidator = invalidator;
          return invalidator.bind();
        }
      });
      return this.active;
    }

    static compose(prop) {
      if (typeof prop.options.active !== "undefined") {
        prop.instanceType.extend(ActivableProperty);
        if (typeof prop.options.active === "boolean") {
          prop.instanceType.prototype.active = prop.options.active;
          return prop.instanceType.prototype.isActive = this.prototype.manualActive;
        } else if (typeof prop.options.active === 'function') {
          prop.instanceType.prototype.activeFunct = prop.options.active;
          return prop.instanceType.prototype.isActive = this.prototype.callbackActive;
        }
      }
    }

  };

  ActivableProperty.extend(Overrider);

  ActivableProperty.overrides({
    get: function() {
      var out;
      if (this.isActive()) {
        out = this.get.withoutActivableProperty();
        if (this.pendingChanges) {
          this.changed(this.pendingOld);
        }
        return out;
      } else {
        this.initiated = true;
        return void 0;
      }
    },
    changed: function(old) {
      if (this.isActive()) {
        this.pendingChanges = false;
        this.pendingOld = void 0;
        this.changed.withoutActivableProperty(old);
      } else {
        this.pendingChanges = true;
        if (typeof this.pendingOld === 'undefined') {
          this.pendingOld = old;
        }
      }
      return this;
    }
  });

  return ActivableProperty;

}).call(this);

return(ActivableProperty);});


},{"../Invalidator":29,"../Overrider":31,"./BasicProperty":35}],35:[function(require,module,exports){
(function(definition){var BasicProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);BasicProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=BasicProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.BasicProperty=BasicProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.BasicProperty=BasicProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Mixable = dependencies.hasOwnProperty("Mixable") ? dependencies.Mixable : require('../Mixable');
var BasicProperty;
BasicProperty = class BasicProperty extends Mixable {
  constructor(property, obj) {
    super();
    this.property = property;
    this.obj = obj;
    this.init();
  }

  init() {
    this.value = this.ingest(this.default);
    return this.calculated = false;
  }

  get() {
    this.calculated = true;
    return this.output();
  }

  set(val) {
    return this.setAndCheckChanges(val);
  }

  callbackSet(val) {
    this.callOptionFunct("set", val);
    return this;
  }

  setAndCheckChanges(val) {
    var old;
    val = this.ingest(val);
    this.revalidated();
    if (this.checkChanges(val, this.value)) {
      old = this.value;
      this.value = val;
      this.manual = true;
      this.changed(old);
    }
    return this;
  }

  checkChanges(val, old) {
    return val !== old;
  }

  destroy() {}

  callOptionFunct(funct, ...args) {
    if (typeof funct === 'string') {
      funct = this.property.options[funct];
    }
    if (typeof funct.overrided === 'function') {
      args.push((...args) => {
        return this.callOptionFunct(funct.overrided, ...args);
      });
    }
    return funct.apply(this.obj, args);
  }

  revalidated() {
    this.calculated = true;
    return this.initiated = true;
  }

  ingest(val) {
    if (typeof this.property.options.ingest === 'function') {
      return val = this.callOptionFunct("ingest", val);
    } else {
      return val;
    }
  }

  output() {
    if (typeof this.property.options.output === 'function') {
      return this.callOptionFunct("output", this.value);
    } else {
      return this.value;
    }
  }

  changed(old) {
    this.callChangedFunctions(old);
    if (typeof this.obj.emitEvent === 'function') {
      this.obj.emitEvent(this.updateEventName, [old]);
      this.obj.emitEvent(this.changeEventName, [old]);
    }
    return this;
  }

  callChangedFunctions(old) {
    if (typeof this.property.options.change === 'function') {
      return this.callOptionFunct("change", old);
    }
  }

  hasChangedFunctions() {
    return typeof this.property.options.change === 'function';
  }

  hasChangedEvents() {
    return typeof this.obj.getListeners === 'function' && this.obj.getListeners(this.changeEventName).length > 0;
  }

  static compose(prop) {
    if (prop.instanceType == null) {
      prop.instanceType = class extends BasicProperty {};
    }
    if (typeof prop.options.set === 'function') {
      prop.instanceType.prototype.set = this.prototype.callbackSet;
    } else {
      prop.instanceType.prototype.set = this.prototype.setAndCheckChanges;
    }
    prop.instanceType.prototype.default = prop.options.default;
    prop.instanceType.prototype.initiated = typeof prop.options.default !== 'undefined';
    return this.setEventNames(prop);
  }

  static setEventNames(prop) {
    prop.instanceType.prototype.changeEventName = prop.options.changeEventName || prop.name + 'Changed';
    prop.instanceType.prototype.updateEventName = prop.options.updateEventName || prop.name + 'Updated';
    return prop.instanceType.prototype.invalidateEventName = prop.options.invalidateEventName || prop.name + 'Invalidated';
  }

  static bind(target, prop) {
    var maj, opt;
    maj = prop.name.charAt(0).toUpperCase() + prop.name.slice(1);
    opt = {
      configurable: true,
      get: function() {
        return prop.getInstance(this).get();
      }
    };
    if (prop.options.set !== false) {
      opt.set = function(val) {
        return prop.getInstance(this).set(val);
      };
    }
    Object.defineProperty(target, prop.name, opt);
    target['get' + maj] = function() {
      return prop.getInstance(this).get();
    };
    if (prop.options.set !== false) {
      target['set' + maj] = function(val) {
        prop.getInstance(this).set(val);
        return this;
      };
    }
    return target['invalidate' + maj] = function() {
      prop.getInstance(this).invalidate();
      return this;
    };
  }

};

return(BasicProperty);});


},{"../Mixable":30}],36:[function(require,module,exports){
(function(definition){var CalculatedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);CalculatedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=CalculatedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.CalculatedProperty=CalculatedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.CalculatedProperty=CalculatedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./DynamicProperty');
var Overrider = dependencies.hasOwnProperty("Overrider") ? dependencies.Overrider : require('../Overrider');
var CalculatedProperty;
CalculatedProperty = (function() {
  class CalculatedProperty extends DynamicProperty {
    calcul() {
      this.value = this.callOptionFunct(this.calculFunct);
      this.manual = false;
      this.revalidated();
      return this.value;
    }

    static compose(prop) {
      if (typeof prop.options.calcul === 'function') {
        prop.instanceType.prototype.calculFunct = prop.options.calcul;
        if (!(prop.options.calcul.length > 0)) {
          return prop.instanceType.extend(CalculatedProperty);
        }
      }
    }

  };

  CalculatedProperty.extend(Overrider);

  CalculatedProperty.overrides({
    get: function() {
      var initiated, old;
      if (this.invalidator) {
        this.invalidator.validateUnknowns();
      }
      if (!this.calculated) {
        old = this.value;
        initiated = this.initiated;
        this.calcul();
        if (this.checkChanges(this.value, old)) {
          if (initiated) {
            this.changed(old);
          } else if (typeof this.obj.emitEvent === 'function') {
            this.obj.emitEvent(this.updateEventName, [old]);
          }
        }
      }
      return this.output();
    }
  });

  return CalculatedProperty;

}).call(this);

return(CalculatedProperty);});


},{"../Invalidator":29,"../Overrider":31,"./DynamicProperty":39}],37:[function(require,module,exports){
(function(definition){var CollectionProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);CollectionProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=CollectionProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.CollectionProperty=CollectionProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.CollectionProperty=CollectionProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./DynamicProperty');
var Collection = dependencies.hasOwnProperty("Collection") ? dependencies.Collection : require('../Collection');
var CollectionProperty;
CollectionProperty = (function() {
  class CollectionProperty extends DynamicProperty {
    ingest(val) {
      if (typeof this.property.options.ingest === 'function') {
        val = this.callOptionFunct("ingest", val);
      }
      if (val == null) {
        return [];
      } else if (typeof val.toArray === 'function') {
        return val.toArray();
      } else if (Array.isArray(val)) {
        return val.slice();
      } else {
        return [val];
      }
    }

    checkChangedItems(val, old) {
      var compareFunction;
      if (typeof this.collectionOptions.compare === 'function') {
        compareFunction = this.collectionOptions.compare;
      }
      return (new Collection(val)).checkChanges(old, this.collectionOptions.ordered, compareFunction);
    }

    output() {
      var col, prop, value;
      value = this.value;
      if (typeof this.property.options.output === 'function') {
        value = this.callOptionFunct("output", this.value);
      }
      prop = this;
      col = Collection.newSubClass(this.collectionOptions, value);
      col.changed = function(old) {
        return prop.changed(old);
      };
      return col;
    }

    callChangedFunctions(old) {
      if (typeof this.property.options.itemAdded === 'function') {
        this.value.forEach((item, i) => {
          if (!old.includes(item)) {
            return this.callOptionFunct("itemAdded", item, i);
          }
        });
      }
      if (typeof this.property.options.itemRemoved === 'function') {
        old.forEach((item, i) => {
          if (!this.value.includes(item)) {
            return this.callOptionFunct("itemRemoved", item, i);
          }
        });
      }
      return super.callChangedFunctions(old);
    }

    hasChangedFunctions() {
      return super.hasChangedFunctions() || typeof this.property.options.itemAdded === 'function' || typeof this.property.options.itemRemoved === 'function';
    }

    static compose(prop) {
      if (prop.options.collection != null) {
        prop.instanceType = class extends CollectionProperty {};
        prop.instanceType.prototype.collectionOptions = Object.assign({}, this.defaultCollectionOptions, typeof prop.options.collection === 'object' ? prop.options.collection : {});
        if (prop.options.collection.compare != null) {
          return prop.instanceType.prototype.checkChanges = this.prototype.checkChangedItems;
        }
      }
    }

  };

  CollectionProperty.defaultCollectionOptions = {
    compare: false,
    ordered: true
  };

  return CollectionProperty;

}).call(this);

return(CollectionProperty);});


},{"../Collection":25,"./DynamicProperty":39}],38:[function(require,module,exports){
(function(definition){var ComposedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);ComposedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=ComposedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.ComposedProperty=ComposedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.ComposedProperty=ComposedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var CalculatedProperty = dependencies.hasOwnProperty("CalculatedProperty") ? dependencies.CalculatedProperty : require('./CalculatedProperty');
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var Collection = dependencies.hasOwnProperty("Collection") ? dependencies.Collection : require('../Collection');
var ComposedProperty;
ComposedProperty = (function() {
  class ComposedProperty extends CalculatedProperty {
    init() {
      super.init();
      return this.initComposed();
    }

    initComposed() {
      if (this.property.options.hasOwnProperty('default')) {
        this.default = this.property.options.default;
      } else {
        this.default = this.value = true;
      }
      this.members = new ComposedProperty.Members(this.property.options.members);
      this.members.changed = (old) => {
        return this.invalidate();
      };
      return this.join = typeof this.property.options.composed === 'function' ? this.property.options.composed : this.property.options.default === false ? ComposedProperty.joinFunctions.or : ComposedProperty.joinFunctions.and;
    }

    calcul() {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this, this.obj);
      }
      this.invalidator.recycle((invalidator, done) => {
        this.value = this.members.reduce((prev, member) => {
          var val;
          val = typeof member === 'function' ? member(this.invalidator) : member;
          return this.join(prev, val);
        }, this.default);
        done();
        if (invalidator.isEmpty()) {
          return this.invalidator = null;
        } else {
          return invalidator.bind();
        }
      });
      this.revalidated();
      return this.value;
    }

    static compose(prop) {
      if (prop.options.composed != null) {
        return prop.instanceType = class extends ComposedProperty {};
      }
    }

    static bind(target, prop) {
      CalculatedProperty.bind(target, prop);
      return Object.defineProperty(target, prop.name + 'Members', {
        configurable: true,
        get: function() {
          return prop.getInstance(this).members;
        }
      });
    }

  };

  ComposedProperty.joinFunctions = {
    and: function(a, b) {
      return a && b;
    },
    or: function(a, b) {
      return a || b;
    }
  };

  return ComposedProperty;

}).call(this);

ComposedProperty.Members = class Members extends Collection {
  addPropertyRef(name, obj) {
    var fn;
    if (this.findRefIndex(name, obj) === -1) {
      fn = function(invalidator) {
        return invalidator.prop(name, obj);
      };
      fn.ref = {
        name: name,
        obj: obj
      };
      return this.push(fn);
    }
  }

  addValueRef(val, name, obj) {
    var fn;
    if (this.findRefIndex(name, obj) === -1) {
      fn = function(invalidator) {
        return val;
      };
      fn.ref = {
        name: name,
        obj: obj,
        val: val
      };
      return this.push(fn);
    }
  }

  setValueRef(val, name, obj) {
    var fn, i, ref;
    i = this.findRefIndex(name, obj);
    if (i === -1) {
      return this.addValueRef(val, name, obj);
    } else if (this.get(i).ref.val !== val) {
      ref = {
        name: name,
        obj: obj,
        val: val
      };
      fn = function(invalidator) {
        return val;
      };
      fn.ref = ref;
      return this.set(i, fn);
    }
  }

  getValueRef(name, obj) {
    return this.findByRef(name, obj).ref.val;
  }

  addFunctionRef(fn, name, obj) {
    if (this.findRefIndex(name, obj) === -1) {
      fn.ref = {
        name: name,
        obj: obj
      };
      return this.push(fn);
    }
  }

  findByRef(name, obj) {
    return this._array[this.findRefIndex(name, obj)];
  }

  findRefIndex(name, obj) {
    return this._array.findIndex(function(member) {
      return (member.ref != null) && member.ref.obj === obj && member.ref.name === name;
    });
  }

  removeRef(name, obj) {
    var index, old;
    index = this.findRefIndex(name, obj);
    if (index !== -1) {
      old = this.toArray();
      this._array.splice(index, 1);
      return this.changed(old);
    }
  }

};

return(ComposedProperty);});


},{"../Collection":25,"../Invalidator":29,"./CalculatedProperty":36}],39:[function(require,module,exports){
(function(definition){var DynamicProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);DynamicProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=DynamicProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.DynamicProperty=DynamicProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.DynamicProperty=DynamicProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var BasicProperty = dependencies.hasOwnProperty("BasicProperty") ? dependencies.BasicProperty : require('./BasicProperty');
var DynamicProperty;
DynamicProperty = class DynamicProperty extends BasicProperty {
  callbackGet() {
    var res;
    res = this.callOptionFunct("get");
    this.revalidated();
    return res;
  }

  invalidate() {
    if (this.calculated || this.active === false) {
      this.calculated = false;
      this._invalidateNotice();
    }
    return this;
  }

  _invalidateNotice() {
    if (this.isImmediate()) {
      this.get();
      return false;
    } else {
      if (typeof this.obj.emitEvent === 'function') {
        this.obj.emitEvent(this.invalidateEventName);
      }
      return true;
    }
  }

  isImmediate() {
    return this.property.options.immediate !== false && (this.property.options.immediate === true || (typeof this.property.options.immediate === 'function' ? this.callOptionFunct("immediate") : this.hasChangedEvents() || this.hasChangedFunctions()));
  }

  static compose(prop) {
    if (typeof prop.options.get === 'function' || typeof prop.options.calcul === 'function' || typeof prop.options.active === 'function') {
      if (prop.instanceType == null) {
        prop.instanceType = class extends DynamicProperty {};
      }
    }
    if (typeof prop.options.get === 'function') {
      return prop.instanceType.prototype.get = this.prototype.callbackGet;
    }
  }

};

return(DynamicProperty);});


},{"../Invalidator":29,"./BasicProperty":35}],40:[function(require,module,exports){
(function(definition){var InvalidatedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);InvalidatedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=InvalidatedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.InvalidatedProperty=InvalidatedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.InvalidatedProperty=InvalidatedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var CalculatedProperty = dependencies.hasOwnProperty("CalculatedProperty") ? dependencies.CalculatedProperty : require('./CalculatedProperty');
var InvalidatedProperty;
InvalidatedProperty = (function() {
  class InvalidatedProperty extends CalculatedProperty {
    unknown() {
      if (this.calculated || this.active === false) {
        this._invalidateNotice();
      }
      return this;
    }

    static compose(prop) {
      if (typeof prop.options.calcul === 'function' && prop.options.calcul.length > 0) {
        return prop.instanceType.extend(InvalidatedProperty);
      }
    }

  };

  InvalidatedProperty.overrides({
    calcul: function() {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this, this.obj);
      }
      this.invalidator.recycle((invalidator, done) => {
        this.value = this.callOptionFunct(this.calculFunct, invalidator);
        this.manual = false;
        done();
        if (invalidator.isEmpty()) {
          return this.invalidator = null;
        } else {
          return invalidator.bind();
        }
      });
      this.revalidated();
      return this.value;
    },
    destroy: function() {
      this.destroy.withoutInvalidatedProperty();
      if (this.invalidator != null) {
        return this.invalidator.unbind();
      }
    },
    invalidate: function() {
      if (this.calculated || this.active === false) {
        this.calculated = false;
        if (this._invalidateNotice() && !this.calculated && (this.invalidator != null)) {
          this.invalidator.unbind();
        }
      }
      return this;
    }
  });

  return InvalidatedProperty;

}).call(this);

return(InvalidatedProperty);});


},{"../Invalidator":29,"./CalculatedProperty":36}],41:[function(require,module,exports){
(function(definition){var UpdatedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);UpdatedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=UpdatedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.UpdatedProperty=UpdatedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.UpdatedProperty=UpdatedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./DynamicProperty');
var Overrider = dependencies.hasOwnProperty("Overrider") ? dependencies.Overrider : require('../Overrider');
var UpdatedProperty;
UpdatedProperty = (function() {
  class UpdatedProperty extends DynamicProperty {
    initRevalidate() {
      this.revalidateCallback = () => {
        this.updating = true;
        this.get();
        this.getUpdater().unbind();
        if (this.pendingChanges) {
          this.changed(this.pendingOld);
        }
        return this.updating = false;
      };
      return this.revalidateCallback.owner = this;
    }

    getUpdater() {
      if (typeof this.updater === 'undefined') {
        if (this.property.options.updater != null) {
          this.updater = this.property.options.updater;
          if (typeof this.updater.getBinder === 'function') {
            this.updater = this.updater.getBinder();
          }
          if (typeof this.updater.bind !== 'function' || typeof this.updater.unbind !== 'function') {
            this.updater = null;
          } else {
            this.updater.callback = this.revalidateCallback;
          }
        } else {
          this.updater = null;
        }
      }
      return this.updater;
    }

    static compose(prop) {
      if (prop.options.updater != null) {
        return prop.instanceType.extend(UpdatedProperty);
      }
    }

  };

  UpdatedProperty.extend(Overrider);

  UpdatedProperty.overrides({
    init: function() {
      this.init.withoutUpdatedProperty();
      return this.initRevalidate();
    },
    _invalidateNotice: function() {
      var res;
      res = this._invalidateNotice.withoutUpdatedProperty();
      if (res) {
        this.getUpdater().bind();
      }
      return res;
    },
    isImmediate: function() {
      return false;
    },
    changed: function(old) {
      if (this.updating) {
        this.pendingChanges = false;
        this.pendingOld = void 0;
        this.changed.withoutUpdatedProperty(old);
      } else {
        this.pendingChanges = true;
        if (typeof this.pendingOld === 'undefined') {
          this.pendingOld = old;
        }
        this.getUpdater().bind();
      }
      return this;
    }
  });

  return UpdatedProperty;

}).call(this);

return(UpdatedProperty);});


},{"../Invalidator":29,"../Overrider":31,"./DynamicProperty":39}],42:[function(require,module,exports){
(function(definition){var Updater=definition(typeof Spark!=="undefined"?Spark:this.Spark);Updater.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Updater;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Updater=Updater;}else{if(this.Spark==null){this.Spark={};}this.Spark.Updater=Updater;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Binder = dependencies.hasOwnProperty("Binder") ? dependencies.Binder : require('./Binder');
var Updater;
Updater = class Updater {
  constructor() {
    this.callbacks = [];
    this.next = [];
    this.updating = false;
  }

  update() {
    var callback;
    this.updating = true;
    this.next = this.callbacks.slice();
    while (this.callbacks.length > 0) {
      callback = this.callbacks.shift();
      callback();
    }
    this.callbacks = this.next;
    this.updating = false;
    return this;
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

return(Updater);});


},{"./Binder":24}],43:[function(require,module,exports){
if(module){
  module.exports = {
    Binder: require('./Binder.js'),
    Collection: require('./Collection.js'),
    Element: require('./Element.js'),
    EventBind: require('./EventBind.js'),
    EventEmitter: require('./EventEmitter.js'),
    Invalidator: require('./Invalidator.js'),
    Mixable: require('./Mixable.js'),
    Overrider: require('./Overrider.js'),
    Property: require('./Property.js'),
    PropertyOwner: require('./PropertyOwner.js'),
    Updater: require('./Updater.js'),
    ActivableProperty: require('./PropertyTypes/ActivableProperty.js'),
    BasicProperty: require('./PropertyTypes/BasicProperty.js'),
    CalculatedProperty: require('./PropertyTypes/CalculatedProperty.js'),
    CollectionProperty: require('./PropertyTypes/CollectionProperty.js'),
    ComposedProperty: require('./PropertyTypes/ComposedProperty.js'),
    DynamicProperty: require('./PropertyTypes/DynamicProperty.js'),
    InvalidatedProperty: require('./PropertyTypes/InvalidatedProperty.js'),
    UpdatedProperty: require('./PropertyTypes/UpdatedProperty.js')
  };
}
},{"./Binder.js":24,"./Collection.js":25,"./Element.js":26,"./EventBind.js":27,"./EventEmitter.js":28,"./Invalidator.js":29,"./Mixable.js":30,"./Overrider.js":31,"./Property.js":32,"./PropertyOwner.js":33,"./PropertyTypes/ActivableProperty.js":34,"./PropertyTypes/BasicProperty.js":35,"./PropertyTypes/CalculatedProperty.js":36,"./PropertyTypes/CollectionProperty.js":37,"./PropertyTypes/ComposedProperty.js":38,"./PropertyTypes/DynamicProperty.js":39,"./PropertyTypes/InvalidatedProperty.js":40,"./PropertyTypes/UpdatedProperty.js":41,"./Updater.js":42}],44:[function(require,module,exports){
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
},{"spark-starter":64}],45:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],46:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],47:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./Mixable":51,"./Property":53,"dup":26}],48:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./Binder":45,"dup":27}],49:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],50:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"./Binder":45,"./EventBind":48,"dup":29}],51:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],52:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],53:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./Mixable":51,"./PropertyOwner":54,"./PropertyTypes/ActivableProperty":55,"./PropertyTypes/BasicProperty":56,"./PropertyTypes/CalculatedProperty":57,"./PropertyTypes/CollectionProperty":58,"./PropertyTypes/ComposedProperty":59,"./PropertyTypes/DynamicProperty":60,"./PropertyTypes/InvalidatedProperty":61,"./PropertyTypes/UpdatedProperty":62,"dup":32}],54:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],55:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"../Invalidator":50,"../Overrider":52,"./BasicProperty":56,"dup":34}],56:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"../Mixable":51,"dup":35}],57:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"../Invalidator":50,"../Overrider":52,"./DynamicProperty":60,"dup":36}],58:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"../Collection":46,"./DynamicProperty":60,"dup":37}],59:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"../Collection":46,"../Invalidator":50,"./CalculatedProperty":57,"dup":38}],60:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"../Invalidator":50,"./BasicProperty":56,"dup":39}],61:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"../Invalidator":50,"./CalculatedProperty":57,"dup":40}],62:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"../Invalidator":50,"../Overrider":52,"./DynamicProperty":60,"dup":41}],63:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./Binder":45,"dup":42}],64:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"./Binder.js":45,"./Collection.js":46,"./Element.js":47,"./EventBind.js":48,"./EventEmitter.js":49,"./Invalidator.js":50,"./Mixable.js":51,"./Overrider.js":52,"./Property.js":53,"./PropertyOwner.js":54,"./PropertyTypes/ActivableProperty.js":55,"./PropertyTypes/BasicProperty.js":56,"./PropertyTypes/CalculatedProperty.js":57,"./PropertyTypes/CollectionProperty.js":58,"./PropertyTypes/ComposedProperty.js":59,"./PropertyTypes/DynamicProperty.js":60,"./PropertyTypes/InvalidatedProperty.js":61,"./PropertyTypes/UpdatedProperty.js":62,"./Updater.js":63,"dup":43}],65:[function(require,module,exports){
if (typeof module !== "undefined" && module !== null) {
  module.exports = {
      greekAlphabet: require('./strings/greekAlphabet'),
      starNames: require('./strings/starNames')
  };
}
},{"./strings/greekAlphabet":66,"./strings/starNames":67}],66:[function(require,module,exports){
module.exports=[
"alpha",   "beta",    "gamma",   "delta",
"epsilon", "zeta",    "eta",     "theta",
"iota",    "kappa",   "lambda",  "mu",
"nu",      "xi",      "omicron", "pi",	
"rho",     "sigma",   "tau",     "upsilon",
"phi",     "chi",     "psi",     "omega"
]
},{}],67:[function(require,module,exports){
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
},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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
            return tile.invalidateAdjacentTiles();
          });
        }
      }
    },
    adjacentTiles: {
      calcul: function(invalidation) {
        if (invalidation.prop('container')) {
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

},{"./Direction":68,"spark-starter":165}],70:[function(require,module,exports){
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
      var ref;
      if (!this.tiles.includes(tile)) {
        this.tiles.push(tile);
        if (this.coords[tile.x] == null) {
          this.coords[tile.x] = {};
        }
        this.coords[tile.x][tile.y] = tile;
        if (this.owner) {
          tile.container = this;
        }
        if ((ref = this._boundaries) != null ? ref.calculated : void 0) {
          this._addToBondaries(tile, this._boundaries.value);
        }
      }
      return this;
    }

    removeTile(tile) {
      var index, ref;
      index = this.tiles.indexOf(tile);
      if (index > -1) {
        this.tiles.splice(index, 1);
        delete this.coords[tile.x][tile.y];
        if (this.owner) {
          tile.container = null;
        }
        if ((ref = this._boundaries) != null ? ref.calculated : void 0) {
          if (this.boundaries.top === tile.y || this.boundaries.bottom === tile.y || this.boundaries.left === tile.x || this.boundaries.right === tile.x) {
            return this.invalidateBoundaries();
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

},{"./TileReference":71,"spark-starter":165}],71:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){
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
      change: function(old) {
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

},{"spark-starter":165}],73:[function(require,module,exports){
module.exports = {
  "Direction": require("./Direction"),
  "Tile": require("./Tile"),
  "TileContainer": require("./TileContainer"),
  "TileReference": require("./TileReference"),
  "Tiled": require("./Tiled"),
}
},{"./Direction":68,"./Tile":69,"./TileContainer":70,"./TileReference":71,"./Tiled":72}],74:[function(require,module,exports){
(function (process){
(function(definition){var Timing=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Timing.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Timing;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Timing=Timing;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Timing=Timing;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BaseUpdater = dependencies.hasOwnProperty("BaseUpdater") ? dependencies.BaseUpdater : require('spark-starter').Updater;
var Timing;
Timing = class Timing {
  constructor(running = true) {
    this.running = running;
    this.children = [];
  }

  addChild(child) {
    var index;
    index = this.children.indexOf(child);
    if (this.updater) {
      child.updater.dispatcher = this.updater;
    }
    if (index === -1) {
      this.children.push(child);
    }
    child.parent = this;
    return this;
  }

  removeChild(child) {
    var index;
    index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
    if (child.parent === this) {
      child.parent = null;
    }
    return this;
  }

  toggle(val) {
    if (typeof val === "undefined") {
      val = !this.running;
    }
    this.running = val;
    return this.children.forEach(function(child) {
      return child.toggle(val);
    });
  }

  setTimeout(callback, time) {
    var timer;
    timer = new this.constructor.Timer(time, callback, this.running);
    this.addChild(timer);
    return timer;
  }

  setInterval(callback, time) {
    var timer;
    timer = new this.constructor.Timer(time, callback, this.running, true);
    this.addChild(timer);
    return timer;
  }

  pause() {
    return this.toggle(false);
  }

  unpause() {
    return this.toggle(true);
  }

};

Timing.Timer = class Timer {
  constructor(time1, callback, running = true, repeat = false) {
    this.time = time1;
    this.running = running;
    this.repeat = repeat;
    this.remainingTime = this.time;
    this.updater = new Timing.Updater(this);
    this.dispatcher = new BaseUpdater();
    if (callback) {
      this.dispatcher.addCallback(callback);
    }
    if (this.running) {
      this._start();
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

  toggle(val) {
    if (typeof val === "undefined") {
      val = !this.running;
    }
    if (val) {
      return this._start();
    } else {
      return this._stop();
    }
  }

  pause() {
    return this.toggle(false);
  }

  unpause() {
    return this.toggle(true);
  }

  getElapsedTime() {
    if (this.running) {
      return this.constructor.now() - this.startTime + this.time - this.remainingTime;
    } else {
      return this.time - this.remainingTime;
    }
  }

  setElapsedTime(val) {
    this._stop();
    this.remainingTime = this.time - val;
    return this._start();
  }

  getPrc() {
    return this.getElapsedTime() / this.time;
  }

  setPrc(val) {
    return this.setElapsedTime(this.time * val);
  }

  _start() {
    this.running = true;
    this.updater.forwardCallbacks();
    this.startTime = this.constructor.now();
    if (this.repeat && !this.interupted) {
      return this.id = setInterval(this.tick.bind(this), this.remainingTime);
    } else {
      return this.id = setTimeout(this.tick.bind(this), this.remainingTime);
    }
  }

  _stop() {
    var wasInterupted;
    wasInterupted = this.interupted;
    this.running = false;
    this.updater.unforwardCallbacks();
    this.remainingTime = this.time - (this.constructor.now() - this.startTime);
    this.interupted = this.remainingTime !== this.time;
    if (this.repeat && !wasInterupted) {
      return clearInterval(this.id);
    } else {
      return clearTimeout(this.id);
    }
  }

  tick() {
    var wasInterupted;
    wasInterupted = this.interupted;
    this.interupted = false;
    if (this.repeat) {
      this.remainingTime = this.time;
    } else {
      this.remainingTime = 0;
    }
    this.dispatcher.update();
    if (this.repeat) {
      if (wasInterupted) {
        return this._start();
      } else {
        return this.startTime = this.constructor.now();
      }
    } else {
      return this.destroy();
    }
  }

  destroy() {
    if (this.repeat) {
      clearInterval(this.id);
    } else {
      clearTimeout(this.id);
    }
    this.updater.destroy();
    this.dispatcher.destroy();
    this.running = false;
    if (this.parent) {
      return this.parent.removeChild(this);
    }
  }

};

Timing.Updater = class Updater {
  constructor(parent) {
    this.parent = parent;
    this.dispatcher = new BaseUpdater();
    this.callbacks = [];
  }

  addCallback(callback) {
    var ref;
    if (!this.callbacks.includes(callback)) {
      this.callbacks.push(callback);
    }
    if (((ref = this.parent) != null ? ref.running : void 0) && this.dispatcher) {
      return this.dispatcher.addCallback(callback);
    }
  }

  removeCallback(callback) {
    var index;
    index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
    if (this.dispatcher) {
      return this.dispatcher.removeCallback(callback);
    }
  }

  getBinder() {
    if (this.dispatcher) {
      return new BaseUpdater.Binder(this);
    }
  }

  forwardCallbacks() {
    if (this.dispatcher) {
      return this.callbacks.forEach((callback) => {
        return this.dispatcher.addCallback(callback);
      });
    }
  }

  unforwardCallbacks() {
    if (this.dispatcher) {
      return this.callbacks.forEach((callback) => {
        return this.dispatcher.removeCallback(callback);
      });
    }
  }

  destroy() {
    this.unforwardCallbacks();
    this.callbacks = [];
    return this.parent = null;
  }

};

return(Timing);});
}).call(this,require('_process'))

},{"_process":141,"spark-starter":94}],75:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],76:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],77:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./Mixable":81,"./Property":83,"dup":26}],78:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./Binder":75,"dup":27}],79:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],80:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"./Binder":75,"./EventBind":78,"dup":29}],81:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],82:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],83:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./Mixable":81,"./PropertyOwner":84,"./PropertyTypes/ActivableProperty":85,"./PropertyTypes/BasicProperty":86,"./PropertyTypes/CalculatedProperty":87,"./PropertyTypes/CollectionProperty":88,"./PropertyTypes/ComposedProperty":89,"./PropertyTypes/DynamicProperty":90,"./PropertyTypes/InvalidatedProperty":91,"./PropertyTypes/UpdatedProperty":92,"dup":32}],84:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],85:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"../Invalidator":80,"../Overrider":82,"./BasicProperty":86,"dup":34}],86:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"../Mixable":81,"dup":35}],87:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"../Invalidator":80,"../Overrider":82,"./DynamicProperty":90,"dup":36}],88:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"../Collection":76,"./DynamicProperty":90,"dup":37}],89:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"../Collection":76,"../Invalidator":80,"./CalculatedProperty":87,"dup":38}],90:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"../Invalidator":80,"./BasicProperty":86,"dup":39}],91:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"../Invalidator":80,"./CalculatedProperty":87,"dup":40}],92:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"../Invalidator":80,"../Overrider":82,"./DynamicProperty":90,"dup":41}],93:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./Binder":75,"dup":42}],94:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"./Binder.js":75,"./Collection.js":76,"./Element.js":77,"./EventBind.js":78,"./EventEmitter.js":79,"./Invalidator.js":80,"./Mixable.js":81,"./Overrider.js":82,"./Property.js":83,"./PropertyOwner.js":84,"./PropertyTypes/ActivableProperty.js":85,"./PropertyTypes/BasicProperty.js":86,"./PropertyTypes/CalculatedProperty.js":87,"./PropertyTypes/CollectionProperty.js":88,"./PropertyTypes/ComposedProperty.js":89,"./PropertyTypes/DynamicProperty.js":90,"./PropertyTypes/InvalidatedProperty.js":91,"./PropertyTypes/UpdatedProperty.js":92,"./Updater.js":93,"dup":43}],95:[function(require,module,exports){
var CollectionPropertyWatcher, Connected, Element, SignalOperation;

Element = require('spark-starter').Element;

SignalOperation = require('./SignalOperation');

CollectionPropertyWatcher = require('spark-starter').Invalidated.CollectionPropertyWatcher;

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

},{"./SignalOperation":97,"spark-starter":165}],96:[function(require,module,exports){
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

},{"spark-starter":165}],97:[function(require,module,exports){
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

},{"spark-starter":165}],98:[function(require,module,exports){
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

},{"./Connected":95,"./Signal":96,"./SignalOperation":97}],99:[function(require,module,exports){
var Connected, Switch;

Connected = require('./Connected');

module.exports = Switch = class Switch extends Connected {};

},{"./Connected":95}],100:[function(require,module,exports){
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
        parent = invalidation.prop('tile');
        if (parent) {
          return invalidation.prop('adjacentTiles', parent).reduce((res, tile) => {
            return res.concat(invalidation.prop('children', tile).filter((child) => {
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
        return invalidation.prop('outputs').reduce((out, conn) => {
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

},{"./Connected":95,"parallelio-tiles":73}],101:[function(require,module,exports){
module.exports = {
  "Connected": require("./Connected"),
  "Signal": require("./Signal"),
  "SignalOperation": require("./SignalOperation"),
  "SignalSource": require("./SignalSource"),
  "Switch": require("./Switch"),
  "Wire": require("./Wire"),
}
},{"./Connected":95,"./Signal":96,"./SignalOperation":97,"./SignalSource":98,"./Switch":99,"./Wire":100}],102:[function(require,module,exports){
var AutomaticDoor, Character, Door;

Door = require('./Door');

Character = require('./Character');

module.exports = AutomaticDoor = (function() {
  class AutomaticDoor extends Door {
    updateTileMembers(old) {
      var ref, ref1, ref2, ref3;
      if (old != null) {
        if ((ref = old.walkableMembers) != null) {
          ref.removeRef('unlocked', this);
        }
        if ((ref1 = old.transparentMembers) != null) {
          ref1.removeRef('open', this);
        }
      }
      if (this.tile) {
        if ((ref2 = this.tile.walkableMembers) != null) {
          ref2.addPropertyRef('unlocked', this);
        }
        return (ref3 = this.tile.transparentMembers) != null ? ref3.addPropertyRef('open', this) : void 0;
      }
    }

    init() {
      super.init();
      return this.open;
    }

    isActivatorPresent(invalidate) {
      return this.getReactiveTiles(invalidate).some((tile) => {
        var children;
        children = invalidate ? invalidate.prop('children', tile) : tile.children;
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
      tile = invalidate ? invalidate.prop('tile') : this.tile;
      if (!tile) {
        return [];
      }
      direction = invalidate ? invalidate.prop('direction') : this.direction;
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
        return !invalidate.prop('locked') && this.isActivatorPresent(invalidate);
      }
    },
    locked: {
      default: false
    },
    unlocked: {
      calcul: function(invalidate) {
        return !invalidate.prop('locked');
      }
    }
  });

  return AutomaticDoor;

}).call(this);



},{"./Character":103,"./Door":108}],103:[function(require,module,exports){
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
      change: function(old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    },
    offsetX: {
      default: 0.5
    },
    offsetY: {
      default: 0.5
    },
    defaultAction: {
      calcul: function() {
        return new WalkAction({
          actor: this
        });
      }
    },
    availableActions: {
      collection: true,
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.prop("tile");
        if (tile) {
          return invalidator.prop("providedActions", tile);
        } else {
          return [];
        }
      }
    }
  });

  return Character;

}).call(this);



},{"./Damageable":107,"./actions/WalkAction":138,"parallelio-tiles":73}],104:[function(require,module,exports){
var AttackMoveAction, CharacterAI, Door, PropertyWatcher, TileContainer, VisionCalculator, WalkAction;

TileContainer = require('parallelio-tiles').TileContainer;

VisionCalculator = require('./VisionCalculator');

Door = require('./Door');

WalkAction = require('./actions/WalkAction');

AttackMoveAction = require('./actions/AttackMoveAction');

PropertyWatcher = require('spark-starter').Invalidated.PropertyWatcher;

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
      property: this.character.getPropertyInstance('tile')
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



},{"./Door":108,"./VisionCalculator":130,"./actions/AttackMoveAction":134,"./actions/WalkAction":138,"parallelio-tiles":73,"spark-starter":165}],105:[function(require,module,exports){
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



},{"./Ship":124,"./View":129,"spark-starter":165}],106:[function(require,module,exports){
var DamagePropagation, Direction, Element, LineOfSight;

Element = require('spark-starter').Element;

LineOfSight = require('./LineOfSight');

Direction = require('parallelio-tiles').Direction;

module.exports = DamagePropagation = (function() {
  class DamagePropagation extends Element {
    constructor(options) {
      super();
      this.setProperties(options);
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



},{"./LineOfSight":114,"parallelio-tiles":73,"spark-starter":165}],107:[function(require,module,exports){
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



},{"spark-starter":165}],108:[function(require,module,exports){
var Door, Tiled;

Tiled = require('parallelio-tiles').Tiled;

module.exports = Door = (function() {
  class Door extends Tiled {
    constructor(direction = Door.directions.horizontal) {
      super();
      this.direction = direction;
    }

    updateTileMembers(old) {
      var ref, ref1, ref2, ref3;
      if (old != null) {
        if ((ref = old.walkableMembers) != null) {
          ref.removeRef('open', this);
        }
        if ((ref1 = old.transparentMembers) != null) {
          ref1.removeRef('open', this);
        }
      }
      if (this.tile) {
        if ((ref2 = this.tile.walkableMembers) != null) {
          ref2.addPropertyRef('open', this);
        }
        return (ref3 = this.tile.transparentMembers) != null ? ref3.addPropertyRef('open', this) : void 0;
      }
    }

  };

  Door.properties({
    tile: {
      change: function(old) {
        return this.updateTileMembers(old);
      }
    },
    open: {
      default: false
    },
    direction: {}
  });

  Door.directions = {
    horizontal: 'horizontal',
    vertical: 'vertical'
  };

  return Door;

}).call(this);



},{"parallelio-tiles":73}],109:[function(require,module,exports){
module.exports = require('spark-starter').Element;



},{"spark-starter":165}],110:[function(require,module,exports){
var Confrontation, Element, EncounterManager, PropertyWatcher;

Element = require('spark-starter').Element;

PropertyWatcher = require('spark-starter').Invalidated.PropertyWatcher;

Confrontation = require('./Confrontation');

module.exports = EncounterManager = (function() {
  class EncounterManager extends Element {
    init() {
      return this.locationWatcher.bind();
    }

    testEncounter() {
      if (Math.random() <= this.baseProbability) {
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
          property: this.subject.getPropertyInstance('location')
        });
      }
    }
  });

  return EncounterManager;

}).call(this);



},{"./Confrontation":105,"spark-starter":165}],111:[function(require,module,exports){
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



},{"parallelio-tiles":73}],112:[function(require,module,exports){
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



},{"./Player":119,"./View":129,"parallelio-timing":74,"spark-starter":165}],113:[function(require,module,exports){
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



},{"spark-starter":165}],114:[function(require,module,exports){
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



},{}],115:[function(require,module,exports){
var Element, Map;

Element = require('spark-starter').Element;

module.exports = Map = (function() {
  class Map extends Element {};

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
    }
  });

  return Map;

}).call(this);



},{"spark-starter":165}],116:[function(require,module,exports){
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
      change: function(old, overrided) {
        overrided(old);
        return this.updateWalkables(old);
      }
    }
  });

  return Obstacle;

}).call(this);



},{"parallelio-tiles":73}],117:[function(require,module,exports){
var Element, EventEmitter, PathWalk, Timing;

Element = require('spark-starter').Element;

Timing = require('parallelio-timing');

EventEmitter = require('spark-starter').EventEmitter;

module.exports = PathWalk = (function() {
  class PathWalk extends Element {
    constructor(walker, path, options) {
      super();
      this.walker = walker;
      this.path = path;
      this.setProperties(options);
    }

    start() {
      if (!this.path.solution) {
        this.path.calcul();
      }
      if (this.path.solution) {
        this.pathTimeout = this.timing.setTimeout(() => {
          return this.finish();
        }, this.totalTime);
        return this.pathTimeout.updater.addCallback(this.callback('update'));
      }
    }

    stop() {
      return this.pathTimeout.pause();
    }

    update() {
      var pos;
      pos = this.path.getPosAtPrc(this.pathTimeout.getPrc());
      this.walker.tile = pos.tile;
      this.walker.offsetX = pos.offsetX;
      return this.walker.offsetY = pos.offsetY;
    }

    finish() {
      this.update();
      this.trigger('finished');
      return this.end();
    }

    interrupt() {
      this.update();
      this.trigger('interrupted');
      return this.end();
    }

    end() {
      this.trigger('end');
      return this.destroy();
    }

    destroy() {
      if (this.walker.walk === this) {
        this.walker.walk = null;
      }
      this.pathTimeout.destroy();
      this.destroyProperties();
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
    }
  });

  return PathWalk;

}).call(this);



},{"parallelio-timing":74,"spark-starter":165}],118:[function(require,module,exports){
var Element, LineOfSight, PersonalWeapon, Timing;

Element = require('spark-starter').Element;

LineOfSight = require('./LineOfSight');

Timing = require('parallelio-timing');

module.exports = PersonalWeapon = (function() {
  class PersonalWeapon extends Element {
    constructor(options) {
      super();
      this.setProperties(options);
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
        return invalidator.prop('power') / invalidator.prop('rechargeTime') * 1000;
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



},{"./LineOfSight":114,"parallelio-timing":74,"spark-starter":165}],119:[function(require,module,exports){
var Element, EventEmitter, Player;

Element = require('spark-starter').Element;

EventEmitter = require('spark-starter').EventEmitter;

module.exports = Player = (function() {
  class Player extends Element {
    constructor(options) {
      super();
      this.setProperties(options);
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

  Player.include(EventEmitter.prototype);

  Player.properties({
    name: {
      default: 'Player'
    },
    focused: {},
    selected: {
      change: function(old) {
        var ref;
        if (old != null ? old.getProperty('selected') : void 0) {
          old.selected = false;
        }
        if ((ref = this.selected) != null ? ref.getProperty('selected') : void 0) {
          return this.selected.selected = this;
        }
      }
    },
    selectedAction: {},
    controller: {
      change: function(old) {
        if (this.controller) {
          return this.controller.player = this;
        }
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

  return Player;

}).call(this);



},{"spark-starter":165}],120:[function(require,module,exports){
var Element, Projectile, Timing;

Element = require('spark-starter').Element;

Timing = require('parallelio-timing');

module.exports = Projectile = (function() {
  class Projectile extends Element {
    constructor(options) {
      super();
      this.setProperties(options);
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
      return this.destroyProperties();
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
        origin = invalidator.prop('origin');
        if (origin != null) {
          return origin.tile || origin;
        }
      }
    },
    targetTile: {
      calcul: function(invalidator) {
        var target;
        target = invalidator.prop('target');
        if (target != null) {
          return target.tile || target;
        }
      }
    },
    container: {
      calcul: function(invalidate) {
        var originTile, targetTile;
        originTile = invalidate.prop('originTile');
        targetTile = invalidate.prop('targetTile');
        if (originTile.container === targetTile.container) {
          return originTile.container;
        } else if (invalidate.prop('prcPath') > 0.5) {
          return targetTile.container;
        } else {
          return originTile.container;
        }
      }
    },
    x: {
      calcul: function(invalidate) {
        var startPos;
        startPos = invalidate.prop('startPos');
        return (invalidate.prop('targetPos').x - startPos.x) * invalidate.prop('prcPath') + startPos.x;
      }
    },
    y: {
      calcul: function(invalidate) {
        var startPos;
        startPos = invalidate.prop('startPos');
        return (invalidate.prop('targetPos').y - startPos.y) * invalidate.prop('prcPath') + startPos.y;
      }
    },
    startPos: {
      calcul: function(invalidate) {
        var container, dist, offset, originTile;
        originTile = invalidate.prop('originTile');
        container = invalidate.prop('container');
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
        targetTile = invalidate.prop('targetTile');
        container = invalidate.prop('container');
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
        return ((ref = this.pathTimeout) != null ? ref.getPrc() : void 0) || 0;
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



},{"parallelio-timing":74,"spark-starter":165}],121:[function(require,module,exports){
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



},{"spark-starter":165}],122:[function(require,module,exports){
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



},{"./Ressource":121,"spark-starter":165}],123:[function(require,module,exports){
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
      super();
      this.setProperties(options);
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
              next.factory = this.wallFactory;
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
      var door, k, len, ref, results, room, walls;
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
              door.factory = this.doorFactory;
              door.factoryOptions = {
                direction: this.tileContainer.getTile(door.x + 1, door.y).factory === this.floorFactory ? Door.directions.vertical : Door.directions.horizontal
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
        tile.factory = this.floorFactory;
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
    },
    floorFactory: {
      default: function(opt) {
        return new Tile(opt.x, opt.y);
      }
    },
    wallFactory: {
      default: null
    },
    doorFactory: {
      calcul: function() {
        return this.floorFactory;
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



},{"./Door":108,"parallelio-tiles":73,"spark-starter":165}],124:[function(require,module,exports){
var Element, Ship, Travel;

Element = require('spark-starter').Element;

Travel = require('./Travel');

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
    }
  });

  return Ship;

}).call(this);



},{"./Travel":128,"spark-starter":165}],125:[function(require,module,exports){
var Damageable, Projectile, ShipWeapon, Tiled, Timing;

Tiled = require('parallelio-tiles').Tiled;

Timing = require('parallelio-timing');

Damageable = require('./Damageable');

Projectile = require('./Projectile');

module.exports = ShipWeapon = (function() {
  class ShipWeapon extends Tiled {
    constructor(options) {
      super();
      this.setProperties(options);
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



},{"./Damageable":107,"./Projectile":120,"parallelio-tiles":73,"parallelio-timing":74}],126:[function(require,module,exports){
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
    minStarDist: 10,
    minLinkDist: 10,
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



},{"./Map":115,"./StarSystem":127,"parallelio-strings":65,"spark-starter":165}],127:[function(require,module,exports){
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



},{"spark-starter":165}],128:[function(require,module,exports){
var Element, Travel;

Element = require('spark-starter').Element;

module.exports = Travel = (function() {
  class Travel extends Element {
    start(location) {
      if (this.valid) {
        this.moving = true;
        return this.pathTimeout = this.timing.setTimeout(() => {
          this.traveller.location = this.targetLocation;
          return this.moving = false;
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
        if (this.targetLocation === this.startLocation) {
          return false;
        }
        if ((this.targetLocation.links != null) && (this.startLocation.links != null)) {
          return this.currentSection != null;
        }
      }
    },
    timing: {
      calcul: function() {
        return new Timing();
      }
    }
  });

  return Travel;

}).call(this);



},{"spark-starter":165}],129:[function(require,module,exports){
var Element, Grid, View;

Element = require('spark-starter').Element;

Grid = require('parallelio-grids').Grid;

module.exports = View = (function() {
  class View extends Element {
    setDefaults() {
      var ref, ref1;
      if (!this.bounds) {
        this.grid = this.grid || ((ref = this.game._mainView) != null ? (ref1 = ref.value) != null ? ref1.grid : void 0 : void 0) || new Grid();
        return this.bounds = this.grid.addCell();
      }
    }

    destroy() {
      return this.game = null;
    }

  };

  View.properties({
    game: {
      change: function(old) {
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



},{"parallelio-grids":23,"spark-starter":165}],130:[function(require,module,exports){
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



},{"./LineOfSight":114,"parallelio-tiles":73}],131:[function(require,module,exports){
var Action, Element, EventEmitter;

Element = require('spark-starter').Element;

EventEmitter = require('spark-starter').EventEmitter;

module.exports = Action = (function() {
  class Action extends Element {
    constructor(options) {
      super();
      this.setProperties(options);
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
        base: this
      }, this.getManualDataProperties(), options));
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
      this.trigger('finished');
      return this.end();
    }

    interrupt() {
      this.trigger('interrupted');
      return this.end();
    }

    end() {
      this.trigger('end');
      return this.destroy();
    }

    destroy() {
      return this.destroyProperties();
    }

  };

  Action.include(EventEmitter.prototype);

  Action.properties({
    actor: {}
  });

  return Action;

}).call(this);



},{"spark-starter":165}],132:[function(require,module,exports){
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



},{"spark-starter":165}],133:[function(require,module,exports){
var AttackAction, EventBind, PropertyWatcher, TargetAction, WalkAction;

WalkAction = require('./WalkAction');

TargetAction = require('./TargetAction');

EventBind = require('spark-starter').EventBind;

PropertyWatcher = require('spark-starter').Invalidated.PropertyWatcher;

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
          property: this.bestUsableWeapon.getPropertyInstance('charged')
        });
      },
      destroy: true
    }
  });

  return AttackAction;

}).call(this);



},{"./TargetAction":136,"./WalkAction":138,"spark-starter":165}],134:[function(require,module,exports){
var AttackAction, AttackMoveAction, EventBind, LineOfSight, PathFinder, PropertyWatcher, TargetAction, WalkAction;

WalkAction = require('./WalkAction');

AttackAction = require('./AttackAction');

TargetAction = require('./TargetAction');

PathFinder = require('parallelio-pathfinder');

LineOfSight = require('../LineOfSight');

PropertyWatcher = require('spark-starter').Invalidated.PropertyWatcher;

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
      this.invalidateEnemySpotted();
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
        this.invalidateWalkAction();
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
          property: this.actor.getPropertyInstance('tile')
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



},{"../LineOfSight":114,"./AttackAction":133,"./TargetAction":136,"./WalkAction":138,"parallelio-pathfinder":44,"spark-starter":165}],135:[function(require,module,exports){
var ActionProvider, SimpleActionProvider;

ActionProvider = require('./ActionProvider');

module.exports = SimpleActionProvider = (function() {
  class SimpleActionProvider extends ActionProvider {};

  SimpleActionProvider.properties({
    providedActions: {
      calcul: function() {
        var actions;
        actions = this.actions || this.constructor.actions;
        if (typeof actions === "object") {
          actions = Object.keys(actions).map(function(key) {
            return actions[key];
          });
        }
        return actions.map((action) => {
          return new action({
            target: this
          });
        });
      }
    }
  });

  return SimpleActionProvider;

}).call(this);



},{"./ActionProvider":132}],136:[function(require,module,exports){
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



},{"./Action":131}],137:[function(require,module,exports){
var ActionProvider, Mixable, TiledActionProvider;

ActionProvider = require('./ActionProvider');

Mixable = require('spark-starter').Mixable;

module.exports = TiledActionProvider = (function() {
  class TiledActionProvider extends ActionProvider {
    validActionTile(tile) {
      return tile != null;
    }

    prepareActionTile(tile) {
      if (!tile.getPropertyInstance('providedActions')) {
        return Mixable.Extension.make(ActionProvider.prototype, tile);
      }
    }

  };

  TiledActionProvider.properties({
    tile: {
      change: function(old, overrided) {
        overrided(old);
        return this.forwardedActions;
      }
    },
    actionTiles: {
      collection: true,
      calcul: function(invalidator) {
        var myTile;
        myTile = invalidator.prop('tile');
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
        actionTiles = invalidator.prop('actionTiles');
        actions = invalidator.prop('providedActions');
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



},{"./ActionProvider":132,"spark-starter":165}],138:[function(require,module,exports){
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



},{"../PathWalk":117,"./TargetAction":136,"parallelio-pathfinder":44}],139:[function(require,module,exports){
module.exports = {
  "AutomaticDoor": require("./AutomaticDoor"),
  "Character": require("./Character"),
  "CharacterAI": require("./CharacterAI"),
  "Confrontation": require("./Confrontation"),
  "Damageable": require("./Damageable"),
  "DamagePropagation": require("./DamagePropagation"),
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
    "WalkAction": require("./actions/WalkAction"),
  },
}
},{"./AutomaticDoor":102,"./Character":103,"./CharacterAI":104,"./Confrontation":105,"./DamagePropagation":106,"./Damageable":107,"./Door":108,"./Element":109,"./EnconterManager":110,"./Floor":111,"./Game":112,"./Inventory":113,"./LineOfSight":114,"./Map":115,"./Obstacle":116,"./PathWalk":117,"./PersonalWeapon":118,"./Player":119,"./Projectile":120,"./Ressource":121,"./RessourceType":122,"./RoomGenerator":123,"./Ship":124,"./ShipWeapon":125,"./StarMapGenerator":126,"./StarSystem":127,"./Travel":128,"./View":129,"./VisionCalculator":130,"./actions/Action":131,"./actions/ActionProvider":132,"./actions/AttackAction":133,"./actions/AttackMoveAction":134,"./actions/SimpleActionProvider":135,"./actions/TargetAction":136,"./actions/TiledActionProvider":137,"./actions/WalkAction":138}],140:[function(require,module,exports){
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



},{"./libs":139,"parallelio-grids":23,"parallelio-pathfinder":44,"parallelio-strings":65,"parallelio-tiles":73,"parallelio-timing":74,"parallelio-wiring":101,"spark-starter":165}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
var Binder, Referred;

Referred = require('./Referred');

module.exports = Binder = class Binder extends Referred {
  toggleBind(val = !this.binded) {
    if (val) {
      return this.bind();
    } else {
      return this.unbind();
    }
  }

  bind() {
    if (!this.binded && this.canBind()) {
      this.doBind();
    }
    return this.binded = true;
  }

  canBind() {
    return (this.callback != null) && (this.target != null);
  }

  doBind() {
    throw new Error('Not implemented');
  }

  unbind() {
    if (this.binded && this.canBind()) {
      this.doUnbind();
    }
    return this.binded = false;
  }

  doUnbind() {
    throw new Error('Not implemented');
  }

  equals(binder) {
    return this.compareRefered(binder);
  }

  destroy() {
    return this.unbind();
  }

};



},{"./Referred":163}],143:[function(require,module,exports){
var Collection;

module.exports = Collection = (function() {
  class Collection {
    constructor(arr) {
      if (arr != null) {
        if (typeof arr.toArray === 'function') {
          this._array = arr.toArray();
        } else if (Array.isArray(arr)) {
          this._array = arr;
        } else {
          this._array = [arr];
        }
      } else {
        this._array = [];
      }
    }

    changed() {}

    checkChanges(old, ordered = true, compareFunction = null) {
      if (compareFunction == null) {
        compareFunction = function(a, b) {
          return a === b;
        };
      }
      if (old != null) {
        old = this.copy(old.slice());
      } else {
        old = [];
      }
      return this.count() !== old.length || (ordered ? this.some(function(val, i) {
        return !compareFunction(old.get(i), val);
      }) : this.some(function(a) {
        return !old.pluck(function(b) {
          return compareFunction(a, b);
        });
      }));
    }

    get(i) {
      return this._array[i];
    }

    getRandom() {
      return this._array[Math.floor(Math.random() * this._array.length)];
    }

    set(i, val) {
      var old;
      if (this._array[i] !== val) {
        old = this.toArray();
        this._array[i] = val;
        this.changed(old);
      }
      return val;
    }

    add(val) {
      if (!this._array.includes(val)) {
        return this.push(val);
      }
    }

    remove(val) {
      var index, old;
      index = this._array.indexOf(val);
      if (index !== -1) {
        old = this.toArray();
        this._array.splice(index, 1);
        return this.changed(old);
      }
    }

    pluck(fn) {
      var found, index, old;
      index = this._array.findIndex(fn);
      if (index > -1) {
        old = this.toArray();
        found = this._array[index];
        this._array.splice(index, 1);
        this.changed(old);
        return found;
      } else {
        return null;
      }
    }

    toArray() {
      return this._array.slice();
    }

    count() {
      return this._array.length;
    }

    static newSubClass(fn, arr) {
      var SubClass;
      if (typeof fn === 'object') {
        SubClass = class extends this {};
        Object.assign(SubClass.prototype, fn);
        return new SubClass(arr);
      } else {
        return new this(arr);
      }
    }

    copy(arr) {
      var coll;
      if (arr == null) {
        arr = this.toArray();
      }
      coll = new this.constructor(arr);
      return coll;
    }

    equals(arr) {
      return (this.count() === (typeof arr.count === 'function' ? arr.count() : arr.length)) && this.every(function(val, i) {
        return arr[i] === val;
      });
    }

    getAddedFrom(arr) {
      return this._array.filter(function(item) {
        return !arr.includes(item);
      });
    }

    getRemovedFrom(arr) {
      return arr.filter((item) => {
        return !this.includes(item);
      });
    }

  };

  Collection.readFunctions = ['every', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some', 'toString'];

  Collection.readListFunctions = ['concat', 'filter', 'slice'];

  Collection.writefunctions = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

  Collection.readFunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      return this._array[funct](...arg);
    };
  });

  Collection.readListFunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      return this.copy(this._array[funct](...arg));
    };
  });

  Collection.writefunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      var old, res;
      old = this.toArray();
      res = this._array[funct](...arg);
      this.changed(old);
      return res;
    };
  });

  return Collection;

}).call(this);

Object.defineProperty(Collection.prototype, 'length', {
  get: function() {
    return this.count();
  }
});

if (typeof Symbol !== "undefined" && Symbol !== null ? Symbol.iterator : void 0) {
  Collection.prototype[Symbol.iterator] = function() {
    return this._array[Symbol.iterator]();
  };
}



},{}],144:[function(require,module,exports){
var Element, Mixable, Property;

Property = require('./Property');

Mixable = require('./Mixable');

module.exports = Element = class Element extends Mixable {
  constructor(data) {
    super();
    if (typeof data === "object" && (this.setProperties != null)) {
      this.setProperties(data);
    }
    this.init();
  }

  init() {}

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

  getFinalProperties() {
    if (this._properties != null) {
      return ['_properties'].concat(this._properties.map(function(prop) {
        return prop.name;
      }));
    } else {
      return [];
    }
  }

  extended(target) {
    var i, len, options, property, ref, results;
    if (this._properties != null) {
      ref = this._properties;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        property = ref[i];
        options = Object.assign({}, property.options);
        results.push((new Property(property.name, options)).bind(target));
      }
      return results;
    }
  }

  static property(prop, desc) {
    return (new Property(prop, desc)).bind(this.prototype);
  }

  static properties(properties) {
    var desc, prop, results;
    results = [];
    for (prop in properties) {
      desc = properties[prop];
      results.push(this.property(prop, desc));
    }
    return results;
  }

};



},{"./Mixable":153,"./Property":155}],145:[function(require,module,exports){
var Binder, EventBind;

Binder = require('./Binder');

module.exports = EventBind = class EventBind extends Binder {
  constructor(event1, target1, callback) {
    super();
    this.event = event1;
    this.target = target1;
    this.callback = callback;
  }

  getRef() {
    return {
      event: this.event,
      target: this.target,
      callback: this.callback
    };
  }

  bindTo(target) {
    this.unbind();
    this.target = target;
    return this.bind();
  }

  doBind() {
    if (typeof this.target.addEventListener === 'function') {
      return this.target.addEventListener(this.event, this.callback);
    } else if (typeof this.target.addListener === 'function') {
      return this.target.addListener(this.event, this.callback);
    } else if (typeof this.target.on === 'function') {
      return this.target.on(this.event, this.callback);
    } else {
      throw new Error('No function to add event listeners was found');
    }
  }

  doUnbind() {
    if (typeof this.target.removeEventListener === 'function') {
      return this.target.removeEventListener(this.event, this.callback);
    } else if (typeof this.target.removeListener === 'function') {
      return this.target.removeListener(this.event, this.callback);
    } else if (typeof this.target.off === 'function') {
      return this.target.off(this.event, this.callback);
    } else {
      throw new Error('No function to remove event listeners was found');
    }
  }

  equals(eventBind) {
    return super.equals(eventBind) && eventBind.event === this.event;
  }

  match(event, target) {
    return event === this.event && target === this.target;
  }

  static checkEmitter(emitter, fatal = true) {
    if (typeof emitter.addEventListener === 'function' || typeof emitter.addListener === 'function' || typeof emitter.on === 'function') {
      return true;
    } else if (fatal) {
      throw new Error('No function to add event listeners was found');
    } else {
      return false;
    }
  }

};



},{"./Binder":142}],146:[function(require,module,exports){
var EventEmitter;

module.exports = EventEmitter = (function() {
  class EventEmitter {
    getAllEvents() {
      return this._events || (this._events = {});
    }

    getListeners(e) {
      var events;
      events = this.getAllEvents();
      return events[e] || (events[e] = []);
    }

    hasListener(e, listener) {
      return this.getListeners(e).includes(listener);
    }

    addListener(e, listener) {
      if (!this.hasListener(e, listener)) {
        this.getListeners(e).push(listener);
        return this.listenerAdded(e, listener);
      }
    }

    listenerAdded(e, listener) {}

    removeListener(e, listener) {
      var index, listeners;
      listeners = this.getListeners(e);
      index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
        return this.listenerRemoved(e, listener);
      }
    }

    listenerRemoved(e, listener) {}

    emitEvent(e, ...args) {
      var listeners;
      listeners = this.getListeners(e).slice();
      return listeners.forEach(function(listener) {
        return listener(...args);
      });
    }

    removeAllListeners() {
      return this._events = {};
    }

  };

  EventEmitter.prototype.emit = EventEmitter.prototype.emitEvent;

  EventEmitter.prototype.trigger = EventEmitter.prototype.emitEvent;

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  return EventEmitter;

}).call(this);



},{}],147:[function(require,module,exports){
var ActivablePropertyWatcher, Invalidator, PropertyWatcher;

PropertyWatcher = require('./PropertyWatcher');

Invalidator = require('../Invalidator');

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



},{"../Invalidator":151,"./PropertyWatcher":150}],148:[function(require,module,exports){
var CollectionPropertyWatcher, PropertyWatcher;

PropertyWatcher = require('./PropertyWatcher');

module.exports = CollectionPropertyWatcher = class CollectionPropertyWatcher extends PropertyWatcher {
  loadOptions(options) {
    super.loadOptions(options);
    this.onAdded = options.onAdded;
    return this.onRemoved = options.onRemoved;
  }

  handleChange(value, old) {
    old = value.copy(old || []);
    if (typeof this.callback === 'function') {
      this.callback.call(this.scope, old);
    }
    if (typeof this.onAdded === 'function') {
      value.forEach((item, i) => {
        if (!old.includes(item)) {
          return this.onAdded.call(this.scope, item);
        }
      });
    }
    if (typeof this.onRemoved === 'function') {
      return old.forEach((item, i) => {
        if (!value.includes(item)) {
          return this.onRemoved.call(this.scope, item);
        }
      });
    }
  }

};



},{"./PropertyWatcher":150}],149:[function(require,module,exports){
var Invalidated, Invalidator;

Invalidator = require('../Invalidator');

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



},{"../Invalidator":151}],150:[function(require,module,exports){
var Binder, PropertyWatcher;

Binder = require('../Binder');

module.exports = PropertyWatcher = class PropertyWatcher extends Binder {
  constructor(options1) {
    var ref;
    super();
    this.options = options1;
    this.invalidateCallback = () => {
      return this.invalidate();
    };
    this.updateCallback = (old) => {
      return this.update(old);
    };
    if (this.options != null) {
      this.loadOptions(this.options);
    }
    if (!(((ref = this.options) != null ? ref.initByLoader : void 0) && (this.options.loader != null))) {
      this.init();
    }
  }

  loadOptions(options) {
    this.scope = options.scope;
    if (options.loaderAsScope && (options.loader != null)) {
      this.scope = options.loader;
    }
    this.property = options.property;
    this.callback = options.callback;
    return this.autoBind = options.autoBind;
  }

  copyWith(opt) {
    return new this.__proto__.constructor(Object.assign({}, this.options, opt));
  }

  init() {
    if (this.autoBind) {
      return this.checkBind();
    }
  }

  getProperty() {
    if (typeof this.property === "string") {
      this.property = this.scope.getPropertyInstance(this.property);
    }
    return this.property;
  }

  checkBind() {
    return this.toggleBind(this.shouldBind());
  }

  shouldBind() {
    return true;
  }

  canBind() {
    return this.getProperty() != null;
  }

  doBind() {
    this.update();
    this.getProperty().on('invalidated', this.invalidateCallback);
    return this.getProperty().on('updated', this.updateCallback);
  }

  doUnbind() {
    this.getProperty().off('invalidated', this.invalidateCallback);
    return this.getProperty().off('updated', this.updateCallback);
  }

  getRef() {
    if (typeof this.property === "string") {
      return {
        property: this.property,
        target: this.scope,
        callback: this.callback
      };
    } else {
      return {
        property: this.property.property.name,
        target: this.property.obj,
        callback: this.callback
      };
    }
  }

  invalidate() {
    return this.getProperty().get();
  }

  update(old) {
    var value;
    value = this.getProperty().get();
    return this.handleChange(value, old);
  }

  handleChange(value, old) {
    return this.callback.call(this.scope, old);
  }

};



},{"../Binder":142}],151:[function(require,module,exports){
var Binder, EventBind, Invalidator, pluck;

Binder = require('./Binder');

EventBind = require('./EventBind');

pluck = function(arr, fn) {
  var found, index;
  index = arr.findIndex(fn);
  if (index > -1) {
    found = arr[index];
    arr.splice(index, 1);
    return found;
  } else {
    return null;
  }
};

module.exports = Invalidator = (function() {
  class Invalidator extends Binder {
    constructor(invalidated, scope = null) {
      super();
      this.invalidated = invalidated;
      this.scope = scope;
      this.invalidationEvents = [];
      this.recycled = [];
      this.unknowns = [];
      this.strict = this.constructor.strict;
      this.invalid = false;
      this.invalidateCallback = () => {
        this.invalidate();
        return null;
      };
      this.invalidateCallback.owner = this;
    }

    invalidate() {
      var functName;
      this.invalid = true;
      if (typeof this.invalidated === "function") {
        return this.invalidated();
      } else if (typeof this.callback === "function") {
        return this.callback();
      } else if ((this.invalidated != null) && typeof this.invalidated.invalidate === "function") {
        return this.invalidated.invalidate();
      } else if (typeof this.invalidated === "string") {
        functName = 'invalidate' + this.invalidated.charAt(0).toUpperCase() + this.invalidated.slice(1);
        if (typeof this.scope[functName] === "function") {
          return this.scope[functName]();
        } else {
          return this.scope[this.invalidated] = null;
        }
      }
    }

    unknown() {
      var ref;
      if (typeof ((ref = this.invalidated) != null ? ref.unknown : void 0) === "function") {
        return this.invalidated.unknown();
      } else {
        return this.invalidate();
      }
    }

    addEventBind(event, target, callback) {
      return this.addBinder(new EventBind(event, target, callback));
    }

    addBinder(binder) {
      if (binder.callback == null) {
        binder.callback = this.invalidateCallback;
      }
      if (!this.invalidationEvents.some(function(eventBind) {
        return eventBind.equals(binder);
      })) {
        return this.invalidationEvents.push(pluck(this.recycled, function(eventBind) {
          return eventBind.equals(binder);
        }) || binder);
      }
    }

    getUnknownCallback(prop) {
      var callback;
      callback = () => {
        return this.addUnknown(function() {
          return prop.get();
        }, prop);
      };
      callback.ref = {
        prop: prop
      };
      return callback;
    }

    addUnknown(fn, prop) {
      if (!this.findUnknown(prop)) {
        fn.ref = {
          "prop": prop
        };
        this.unknowns.push(fn);
        return this.unknown();
      }
    }

    findUnknown(prop) {
      if ((prop != null) || (typeof target !== "undefined" && target !== null)) {
        return this.unknowns.find(function(unknown) {
          return unknown.ref.prop === prop;
        });
      }
    }

    event(event, target = this.scope) {
      if (this.checkEmitter(target)) {
        return this.addEventBind(event, target);
      }
    }

    value(val, event, target = this.scope) {
      this.event(event, target);
      return val;
    }

    prop(prop, target = this.scope) {
      var propInstance;
      if (typeof prop === 'string') {
        if ((target.getPropertyInstance != null) && (propInstance = target.getPropertyInstance(prop))) {
          prop = propInstance;
        } else {
          return target[prop];
        }
      } else if (!this.checkPropInstance(prop)) {
        throw new Error('Property must be a PropertyInstance or a string');
      }
      this.addEventBind('invalidated', prop, this.getUnknownCallback(prop));
      return this.value(prop.get(), 'updated', prop);
    }

    propPath(path, target = this.scope) {
      var prop, val;
      path = path.split('.');
      val = target;
      while ((val != null) && path.length > 0) {
        prop = path.shift();
        val = this.prop(prop, val);
      }
      return val;
    }

    propInitiated(prop, target = this.scope) {
      var initiated;
      if (typeof prop === 'string' && (target.getPropertyInstance != null)) {
        prop = target.getPropertyInstance(prop);
      } else if (!this.checkPropInstance(prop)) {
        throw new Error('Property must be a PropertyInstance or a string');
      }
      initiated = prop.initiated;
      if (!initiated) {
        this.event('updated', prop);
      }
      return initiated;
    }

    funct(funct) {
      var invalidator, res;
      invalidator = new Invalidator(() => {
        return this.addUnknown(() => {
          var res2;
          res2 = funct(invalidator);
          if (res !== res2) {
            return this.invalidate();
          }
        }, invalidator);
      });
      res = funct(invalidator);
      this.invalidationEvents.push(invalidator);
      return res;
    }

    validateUnknowns() {
      var unknowns;
      unknowns = this.unknowns;
      this.unknowns = [];
      return unknowns.forEach(function(unknown) {
        return unknown();
      });
    }

    isEmpty() {
      return this.invalidationEvents.length === 0;
    }

    bind() {
      this.invalid = false;
      return this.invalidationEvents.forEach(function(eventBind) {
        return eventBind.bind();
      });
    }

    recycle(callback) {
      var done, res;
      this.recycled = this.invalidationEvents;
      this.invalidationEvents = [];
      done = this.endRecycle.bind(this);
      if (typeof callback === "function") {
        if (callback.length > 1) {
          return callback(this, done);
        } else {
          res = callback(this);
          done();
          return res;
        }
      } else {
        return done;
      }
    }

    endRecycle() {
      this.recycled.forEach(function(eventBind) {
        return eventBind.unbind();
      });
      return this.recycled = [];
    }

    checkEmitter(emitter) {
      return EventBind.checkEmitter(emitter, this.strict);
    }

    checkPropInstance(prop) {
      return typeof prop.get === "function" && this.checkEmitter(prop);
    }

    unbind() {
      return this.invalidationEvents.forEach(function(eventBind) {
        return eventBind.unbind();
      });
    }

  };

  Invalidator.strict = true;

  return Invalidator;

}).call(this);



},{"./Binder":142,"./EventBind":145}],152:[function(require,module,exports){
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



},{"./Overrider":154}],153:[function(require,module,exports){
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



},{}],154:[function(require,module,exports){
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



},{}],155:[function(require,module,exports){
var BasicProperty, CalculatedProperty, CollectionProperty, ComposedProperty, DynamicProperty, InvalidatedProperty, Mixable, Property, PropertyOwner;

BasicProperty = require('./PropertyTypes/BasicProperty');

CollectionProperty = require('./PropertyTypes/CollectionProperty');

ComposedProperty = require('./PropertyTypes/ComposedProperty');

DynamicProperty = require('./PropertyTypes/DynamicProperty');

CalculatedProperty = require('./PropertyTypes/CalculatedProperty');

InvalidatedProperty = require('./PropertyTypes/InvalidatedProperty');

PropertyOwner = require('./PropertyOwner');

Mixable = require('./Mixable');

module.exports = Property = (function() {
  class Property {
    constructor(name, options = {}) {
      this.name = name;
      this.options = options;
    }

    bind(target) {
      var parent, prop;
      prop = this;
      if (!(typeof target.getProperty === 'function' && target.getProperty(this.name) === this)) {
        if (typeof target.getProperty === 'function' && ((parent = target.getProperty(this.name)) != null)) {
          this.override(parent);
        }
        this.getInstanceType().bind(target, prop);
        target._properties = (target._properties || []).concat([prop]);
        if (parent != null) {
          target._properties = target._properties.filter(function(existing) {
            return existing !== parent;
          });
        }
        this.makeOwner(target);
      }
      return prop;
    }

    override(parent) {
      var key, ref, results, value;
      if (this.options.parent == null) {
        this.options.parent = parent.options;
        ref = parent.options;
        results = [];
        for (key in ref) {
          value = ref[key];
          if (typeof this.options[key] === 'function' && typeof value === 'function') {
            results.push(this.options[key].overrided = value);
          } else if (typeof this.options[key] === 'undefined') {
            results.push(this.options[key] = value);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    }

    makeOwner(target) {
      var ref;
      if (!((ref = target.extensions) != null ? ref.includes(PropertyOwner.prototype) : void 0)) {
        return Mixable.Extension.make(PropertyOwner.prototype, target);
      }
    }

    getInstanceVarName() {
      return this.options.instanceVarName || '_' + this.name;
    }

    isInstantiated(obj) {
      return obj[this.getInstanceVarName()] != null;
    }

    getInstance(obj) {
      var Type, varName;
      varName = this.getInstanceVarName();
      if (!this.isInstantiated(obj)) {
        Type = this.getInstanceType();
        obj[varName] = new Type(this, obj);
        obj[varName].init();
      }
      return obj[varName];
    }

    getInstanceType() {
      if (!this.instanceType) {
        this.composers.forEach((composer) => {
          return composer.compose(this);
        });
      }
      return this.instanceType;
    }

  };

  Property.prototype.composers = [ComposedProperty, CollectionProperty, DynamicProperty, BasicProperty, CalculatedProperty, InvalidatedProperty];

  return Property;

}).call(this);



},{"./Mixable":153,"./PropertyOwner":156,"./PropertyTypes/BasicProperty":157,"./PropertyTypes/CalculatedProperty":158,"./PropertyTypes/CollectionProperty":159,"./PropertyTypes/ComposedProperty":160,"./PropertyTypes/DynamicProperty":161,"./PropertyTypes/InvalidatedProperty":162}],156:[function(require,module,exports){
var PropertyOwner;

module.exports = PropertyOwner = class PropertyOwner {
  getProperty(name) {
    return this._properties && this._properties.find(function(prop) {
      return prop.name === name;
    });
  }

  getPropertyInstance(name) {
    var res;
    res = this.getProperty(name);
    if (res) {
      return res.getInstance(this);
    }
  }

  getProperties() {
    return this._properties.slice();
  }

  getPropertyInstances() {
    return this._properties.map((prop) => {
      return prop.getInstance(this);
    });
  }

  getInstantiatedProperties() {
    return this._properties.filter((prop) => {
      return prop.isInstantiated(this);
    }).map((prop) => {
      return prop.getInstance(this);
    });
  }

  getManualDataProperties() {
    return this._properties.reduce((res, prop) => {
      var instance;
      if (prop.isInstantiated(this)) {
        instance = prop.getInstance(this);
        if (instance.calculated && instance.manual) {
          res[prop.name] = instance.value;
        }
      }
      return res;
    }, {});
  }

  setProperties(data, options = {}) {
    var key, prop, val;
    for (key in data) {
      val = data[key];
      if (((options.whitelist == null) || options.whitelist.indexOf(key) !== -1) && ((options.blacklist == null) || options.blacklist.indexOf(key) === -1)) {
        prop = this.getPropertyInstance(key);
        if (prop != null) {
          prop.set(val);
        }
      }
    }
    return this;
  }

  destroyProperties() {
    this.getInstantiatedProperties().forEach((prop) => {
      return prop.destroy();
    });
    this._properties = [];
    return true;
  }

  listenerAdded(event, listener) {
    return this._properties.forEach((prop) => {
      if (prop.getInstanceType().prototype.changeEventName === event) {
        return prop.getInstance(this).get();
      }
    });
  }

  extended(target) {
    return target.listenerAdded = this.listenerAdded;
  }

};



},{}],157:[function(require,module,exports){
var BasicProperty, EventEmitter, Loader, Mixable, PropertyWatcher, Referred;

Mixable = require('../Mixable');

EventEmitter = require('../EventEmitter');

Loader = require('../Loader');

PropertyWatcher = require('../Invalidated/PropertyWatcher');

Referred = require('../Referred');

module.exports = BasicProperty = (function() {
  class BasicProperty extends Mixable {
    constructor(property, obj) {
      super();
      this.property = property;
      this.obj = obj;
    }

    init() {
      var preload;
      this.value = this.ingest(this.default);
      this.calculated = false;
      this.initiated = false;
      preload = this.constructor.getPreload(this.obj, this.property, this);
      if (preload.length > 0) {
        return Loader.loadMany(preload);
      }
    }

    get() {
      this.calculated = true;
      if (!this.initiated) {
        this.initiated = true;
        this.emitEvent('updated');
      }
      return this.output();
    }

    set(val) {
      return this.setAndCheckChanges(val);
    }

    callbackSet(val) {
      this.callOptionFunct("set", val);
      return this;
    }

    setAndCheckChanges(val) {
      var old;
      val = this.ingest(val);
      this.revalidated();
      if (this.checkChanges(val, this.value)) {
        old = this.value;
        this.value = val;
        this.manual = true;
        this.changed(old);
      }
      return this;
    }

    checkChanges(val, old) {
      return val !== old;
    }

    destroy() {
      var ref;
      if (this.property.options.destroy === true && (((ref = this.value) != null ? ref.destroy : void 0) != null)) {
        this.value.destroy();
      }
      if (typeof this.property.options.destroy === 'function') {
        this.callOptionFunct('destroy', this.value);
      }
      return this.value = null;
    }

    callOptionFunct(funct, ...args) {
      if (typeof funct === 'string') {
        funct = this.property.options[funct];
      }
      if (typeof funct.overrided === 'function') {
        args.push((...args) => {
          return this.callOptionFunct(funct.overrided, ...args);
        });
      }
      return funct.apply(this.obj, args);
    }

    revalidated() {
      this.calculated = true;
      return this.initiated = true;
    }

    ingest(val) {
      if (typeof this.property.options.ingest === 'function') {
        return val = this.callOptionFunct("ingest", val);
      } else {
        return val;
      }
    }

    output() {
      if (typeof this.property.options.output === 'function') {
        return this.callOptionFunct("output", this.value);
      } else {
        return this.value;
      }
    }

    changed(old) {
      this.emitEvent('updated', old);
      this.emitEvent('changed', old);
      return this;
    }

    static compose(prop) {
      if (prop.instanceType == null) {
        prop.instanceType = class extends BasicProperty {};
      }
      if (typeof prop.options.set === 'function') {
        prop.instanceType.prototype.set = this.prototype.callbackSet;
      } else {
        prop.instanceType.prototype.set = this.prototype.setAndCheckChanges;
      }
      return prop.instanceType.prototype.default = prop.options.default;
    }

    static bind(target, prop) {
      var maj, opt, preload;
      maj = prop.name.charAt(0).toUpperCase() + prop.name.slice(1);
      opt = {
        configurable: true,
        get: function() {
          return prop.getInstance(this).get();
        }
      };
      if (prop.options.set !== false) {
        opt.set = function(val) {
          return prop.getInstance(this).set(val);
        };
      }
      Object.defineProperty(target, prop.name, opt);
      target['get' + maj] = function() {
        return prop.getInstance(this).get();
      };
      if (prop.options.set !== false) {
        target['set' + maj] = function(val) {
          prop.getInstance(this).set(val);
          return this;
        };
      }
      target['invalidate' + maj] = function() {
        prop.getInstance(this).invalidate();
        return this;
      };
      preload = this.getPreload(target, prop);
      if (preload.length > 0) {
        Mixable.Extension.makeOnce(Loader.prototype, target);
        return target.preload(preload);
      }
    }

    static getPreload(target, prop, instance) {
      var preload, ref, ref1, toLoad;
      preload = [];
      if (typeof prop.options.change === "function") {
        toLoad = {
          type: PropertyWatcher,
          loaderAsScope: true,
          property: instance || prop.name,
          initByLoader: true,
          autoBind: true,
          callback: prop.options.change,
          ref: {
            prop: prop.name,
            callback: prop.options.change,
            context: 'change'
          }
        };
      }
      if (typeof ((ref = prop.options.change) != null ? ref.copyWith : void 0) === "function") {
        toLoad = {
          type: prop.options.change,
          loaderAsScope: true,
          property: instance || prop.name,
          initByLoader: true,
          autoBind: true,
          ref: {
            prop: prop.name,
            type: prop.options.change,
            context: 'change'
          }
        };
      }
      if ((toLoad != null) && !((ref1 = target.preloaded) != null ? ref1.find(function(loaded) {
        return Referred.compareRef(toLoad.ref, loaded.ref) && !instance || (loaded.instance != null);
      }) : void 0)) {
        preload.push(toLoad);
      }
      return preload;
    }

  };

  BasicProperty.extend(EventEmitter);

  return BasicProperty;

}).call(this);



},{"../EventEmitter":146,"../Invalidated/PropertyWatcher":150,"../Loader":152,"../Mixable":153,"../Referred":163}],158:[function(require,module,exports){
var CalculatedProperty, DynamicProperty, Invalidator, Overrider;

Invalidator = require('../Invalidator');

DynamicProperty = require('./DynamicProperty');

Overrider = require('../Overrider');

module.exports = CalculatedProperty = (function() {
  class CalculatedProperty extends DynamicProperty {
    calcul() {
      this.value = this.callOptionFunct(this.calculFunct);
      this.manual = false;
      this.revalidated();
      return this.value;
    }

    static compose(prop) {
      if (typeof prop.options.calcul === 'function') {
        prop.instanceType.prototype.calculFunct = prop.options.calcul;
        if (!(prop.options.calcul.length > 0)) {
          return prop.instanceType.extend(CalculatedProperty);
        }
      }
    }

  };

  CalculatedProperty.extend(Overrider);

  CalculatedProperty.overrides({
    get: function() {
      var initiated, old;
      if (this.invalidator) {
        this.invalidator.validateUnknowns();
      }
      if (!this.calculated) {
        old = this.value;
        initiated = this.initiated;
        this.calcul();
        if (this.checkChanges(this.value, old)) {
          if (initiated) {
            this.changed(old);
          } else {
            this.emitEvent('updated', old);
          }
        } else if (!initiated) {
          this.emitEvent('updated', old);
        }
      }
      return this.output();
    }
  });

  return CalculatedProperty;

}).call(this);



},{"../Invalidator":151,"../Overrider":154,"./DynamicProperty":161}],159:[function(require,module,exports){
var Collection, CollectionProperty, CollectionPropertyWatcher, DynamicProperty, Referred;

DynamicProperty = require('./DynamicProperty');

Collection = require('../Collection');

Referred = require('../Referred');

CollectionPropertyWatcher = require('../Invalidated/CollectionPropertyWatcher');

module.exports = CollectionProperty = (function() {
  class CollectionProperty extends DynamicProperty {
    ingest(val) {
      if (typeof this.property.options.ingest === 'function') {
        val = this.callOptionFunct("ingest", val);
      }
      if (val == null) {
        return [];
      } else if (typeof val.toArray === 'function') {
        return val.toArray();
      } else if (Array.isArray(val)) {
        return val.slice();
      } else {
        return [val];
      }
    }

    checkChangedItems(val, old) {
      var compareFunction;
      if (typeof this.collectionOptions.compare === 'function') {
        compareFunction = this.collectionOptions.compare;
      }
      return (new Collection(val)).checkChanges(old, this.collectionOptions.ordered, compareFunction);
    }

    output() {
      var col, prop, value;
      value = this.value;
      if (typeof this.property.options.output === 'function') {
        value = this.callOptionFunct("output", this.value);
      }
      prop = this;
      col = Collection.newSubClass(this.collectionOptions, value);
      col.changed = function(old) {
        return prop.changed(old);
      };
      return col;
    }

    static compose(prop) {
      if (prop.options.collection != null) {
        prop.instanceType = class extends CollectionProperty {};
        prop.instanceType.prototype.collectionOptions = Object.assign({}, this.defaultCollectionOptions, typeof prop.options.collection === 'object' ? prop.options.collection : {});
        if (prop.options.collection.compare != null) {
          return prop.instanceType.prototype.checkChanges = this.prototype.checkChangedItems;
        }
      }
    }

    static getPreload(target, prop, instance) {
      var preload, ref, ref1;
      preload = [];
      if (typeof prop.options.change === "function" || typeof prop.options.itemAdded === 'function' || typeof prop.options.itemRemoved === 'function') {
        ref = {
          prop: prop.name,
          context: 'change'
        };
        if (!((ref1 = target.preloaded) != null ? ref1.find(function(loaded) {
          return Referred.compareRef(ref, loaded.ref) && (loaded.instance != null);
        }) : void 0)) {
          preload.push({
            type: CollectionPropertyWatcher,
            loaderAsScope: true,
            scope: target,
            property: instance || prop.name,
            initByLoader: true,
            autoBind: true,
            callback: prop.options.change,
            onAdded: prop.options.itemAdded,
            onRemoved: prop.options.itemRemoved,
            ref: ref
          });
        }
      }
      return preload;
    }

  };

  CollectionProperty.defaultCollectionOptions = {
    compare: false,
    ordered: true
  };

  return CollectionProperty;

}).call(this);



},{"../Collection":143,"../Invalidated/CollectionPropertyWatcher":148,"../Referred":163,"./DynamicProperty":161}],160:[function(require,module,exports){
var CalculatedProperty, Collection, ComposedProperty, Invalidator;

CalculatedProperty = require('./CalculatedProperty');

Invalidator = require('../Invalidator');

Collection = require('../Collection');

module.exports = ComposedProperty = (function() {
  class ComposedProperty extends CalculatedProperty {
    init() {
      this.initComposed();
      return super.init();
    }

    initComposed() {
      if (this.property.options.hasOwnProperty('default')) {
        this.default = this.property.options.default;
      } else {
        this.default = this.value = true;
      }
      this.members = new ComposedProperty.Members(this.property.options.members);
      this.members.changed = (old) => {
        return this.invalidate();
      };
      return this.join = typeof this.property.options.composed === 'function' ? this.property.options.composed : this.property.options.default === false ? ComposedProperty.joinFunctions.or : ComposedProperty.joinFunctions.and;
    }

    calcul() {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this, this.obj);
      }
      this.invalidator.recycle((invalidator, done) => {
        this.value = this.members.reduce((prev, member) => {
          var val;
          val = typeof member === 'function' ? member(this.invalidator) : member;
          return this.join(prev, val);
        }, this.default);
        done();
        if (invalidator.isEmpty()) {
          return this.invalidator = null;
        } else {
          return invalidator.bind();
        }
      });
      this.revalidated();
      return this.value;
    }

    static compose(prop) {
      if (prop.options.composed != null) {
        return prop.instanceType = class extends ComposedProperty {};
      }
    }

    static bind(target, prop) {
      CalculatedProperty.bind(target, prop);
      return Object.defineProperty(target, prop.name + 'Members', {
        configurable: true,
        get: function() {
          return prop.getInstance(this).members;
        }
      });
    }

  };

  ComposedProperty.joinFunctions = {
    and: function(a, b) {
      return a && b;
    },
    or: function(a, b) {
      return a || b;
    }
  };

  return ComposedProperty;

}).call(this);

ComposedProperty.Members = class Members extends Collection {
  addPropertyRef(name, obj) {
    var fn;
    if (this.findRefIndex(name, obj) === -1) {
      fn = function(invalidator) {
        return invalidator.prop(name, obj);
      };
      fn.ref = {
        name: name,
        obj: obj
      };
      return this.push(fn);
    }
  }

  addValueRef(val, name, obj) {
    var fn;
    if (this.findRefIndex(name, obj) === -1) {
      fn = function(invalidator) {
        return val;
      };
      fn.ref = {
        name: name,
        obj: obj,
        val: val
      };
      return this.push(fn);
    }
  }

  setValueRef(val, name, obj) {
    var fn, i, ref;
    i = this.findRefIndex(name, obj);
    if (i === -1) {
      return this.addValueRef(val, name, obj);
    } else if (this.get(i).ref.val !== val) {
      ref = {
        name: name,
        obj: obj,
        val: val
      };
      fn = function(invalidator) {
        return val;
      };
      fn.ref = ref;
      return this.set(i, fn);
    }
  }

  getValueRef(name, obj) {
    return this.findByRef(name, obj).ref.val;
  }

  addFunctionRef(fn, name, obj) {
    if (this.findRefIndex(name, obj) === -1) {
      fn.ref = {
        name: name,
        obj: obj
      };
      return this.push(fn);
    }
  }

  findByRef(name, obj) {
    return this._array[this.findRefIndex(name, obj)];
  }

  findRefIndex(name, obj) {
    return this._array.findIndex(function(member) {
      return (member.ref != null) && member.ref.obj === obj && member.ref.name === name;
    });
  }

  removeRef(name, obj) {
    var index, old;
    index = this.findRefIndex(name, obj);
    if (index !== -1) {
      old = this.toArray();
      this._array.splice(index, 1);
      return this.changed(old);
    }
  }

};



},{"../Collection":143,"../Invalidator":151,"./CalculatedProperty":158}],161:[function(require,module,exports){
var BasicProperty, DynamicProperty, Invalidator;

Invalidator = require('../Invalidator');

BasicProperty = require('./BasicProperty');

module.exports = DynamicProperty = class DynamicProperty extends BasicProperty {
  callbackGet() {
    var res;
    res = this.callOptionFunct("get");
    this.revalidated();
    return res;
  }

  invalidate() {
    if (this.calculated) {
      this.calculated = false;
      this._invalidateNotice();
    }
    return this;
  }

  _invalidateNotice() {
    this.emitEvent('invalidated');
    return true;
  }

  static compose(prop) {
    if (typeof prop.options.get === 'function' || typeof prop.options.calcul === 'function') {
      if (prop.instanceType == null) {
        prop.instanceType = class extends DynamicProperty {};
      }
    }
    if (typeof prop.options.get === 'function') {
      return prop.instanceType.prototype.get = this.prototype.callbackGet;
    }
  }

};



},{"../Invalidator":151,"./BasicProperty":157}],162:[function(require,module,exports){
var CalculatedProperty, InvalidatedProperty, Invalidator;

Invalidator = require('../Invalidator');

CalculatedProperty = require('./CalculatedProperty');

module.exports = InvalidatedProperty = (function() {
  class InvalidatedProperty extends CalculatedProperty {
    unknown() {
      if (this.calculated || this.active === false) {
        this._invalidateNotice();
      }
      return this;
    }

    static compose(prop) {
      if (typeof prop.options.calcul === 'function' && prop.options.calcul.length > 0) {
        return prop.instanceType.extend(InvalidatedProperty);
      }
    }

  };

  InvalidatedProperty.overrides({
    calcul: function() {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this, this.obj);
      }
      this.invalidator.recycle((invalidator, done) => {
        this.value = this.callOptionFunct(this.calculFunct, invalidator);
        this.manual = false;
        done();
        if (invalidator.isEmpty()) {
          return this.invalidator = null;
        } else {
          return invalidator.bind();
        }
      });
      this.revalidated();
      return this.value;
    },
    destroy: function() {
      this.destroy.withoutInvalidatedProperty();
      if (this.invalidator != null) {
        return this.invalidator.unbind();
      }
    },
    invalidate: function() {
      if (this.calculated || this.active === false) {
        this.calculated = false;
        this._invalidateNotice();
        if (!this.calculated && (this.invalidator != null)) {
          this.invalidator.unbind();
        }
      }
      return this;
    }
  });

  return InvalidatedProperty;

}).call(this);



},{"../Invalidator":151,"./CalculatedProperty":158}],163:[function(require,module,exports){
var Referred;

module.exports = Referred = (function() {
  class Referred {
    compareRefered(refered) {
      return this.constructor.compareRefered(refered, this);
    }

    getRef() {}

    static compareRefered(obj1, obj2) {
      return obj1 === obj2 || ((obj1 != null) && (obj2 != null) && obj1.constructor === obj2.constructor && this.compareRef(obj1.ref, obj2.ref));
    }

    static compareRef(ref1, ref2) {
      return (ref1 != null) && (ref2 != null) && (ref1 === ref2 || (Array.isArray(ref1) && Array.isArray(ref1) && ref1.every((val, i) => {
        return this.compareRefered(ref1[i], ref2[i]);
      })) || (typeof ref1 === "object" && typeof ref2 === "object" && Object.keys(ref1).join() === Object.keys(ref2).join() && Object.keys(ref1).every((key) => {
        return this.compareRefered(ref1[key], ref2[key]);
      })));
    }

  };

  Object.defineProperty(Referred.prototype, 'ref', {
    get: function() {
      return this.getRef();
    }
  });

  return Referred;

}).call(this);



},{}],164:[function(require,module,exports){
var Binder, Updater;

Binder = require('./Binder');

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



},{"./Binder":142}],165:[function(require,module,exports){
module.exports = {
  "Binder": require("./Binder"),
  "Collection": require("./Collection"),
  "Element": require("./Element"),
  "EventBind": require("./EventBind"),
  "EventEmitter": require("./EventEmitter"),
  "Invalidator": require("./Invalidator"),
  "Loader": require("./Loader"),
  "Mixable": require("./Mixable"),
  "Overrider": require("./Overrider"),
  "Property": require("./Property"),
  "PropertyOwner": require("./PropertyOwner"),
  "Referred": require("./Referred"),
  "Updater": require("./Updater"),
  "Invalidated": {
    "ActivablePropertyWatcher": require("./Invalidated/ActivablePropertyWatcher"),
    "CollectionPropertyWatcher": require("./Invalidated/CollectionPropertyWatcher"),
    "Invalidated": require("./Invalidated/Invalidated"),
    "PropertyWatcher": require("./Invalidated/PropertyWatcher"),
  },
  "PropertyTypes": {
    "BasicProperty": require("./PropertyTypes/BasicProperty"),
    "CalculatedProperty": require("./PropertyTypes/CalculatedProperty"),
    "CollectionProperty": require("./PropertyTypes/CollectionProperty"),
    "ComposedProperty": require("./PropertyTypes/ComposedProperty"),
    "DynamicProperty": require("./PropertyTypes/DynamicProperty"),
    "InvalidatedProperty": require("./PropertyTypes/InvalidatedProperty"),
  },
}
},{"./Binder":142,"./Collection":143,"./Element":144,"./EventBind":145,"./EventEmitter":146,"./Invalidated/ActivablePropertyWatcher":147,"./Invalidated/CollectionPropertyWatcher":148,"./Invalidated/Invalidated":149,"./Invalidated/PropertyWatcher":150,"./Invalidator":151,"./Loader":152,"./Mixable":153,"./Overrider":154,"./Property":155,"./PropertyOwner":156,"./PropertyTypes/BasicProperty":157,"./PropertyTypes/CalculatedProperty":158,"./PropertyTypes/CollectionProperty":159,"./PropertyTypes/ComposedProperty":160,"./PropertyTypes/DynamicProperty":161,"./PropertyTypes/InvalidatedProperty":162,"./Referred":163,"./Updater":164}]},{},[19])(19)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQXV0b21hdGljRG9vci5qcyIsImxpYi9DaGFyYWN0ZXIuanMiLCJsaWIvRGFtYWdlYWJsZS5qcyIsImxpYi9EaXNwbGF5LmpzIiwibGliL0RvbVVwZGF0ZXIuanMiLCJsaWIvRG9vci5qcyIsImxpYi9HYW1lLmpzIiwibGliL1BsYXllckNvbnRyb2xsZXIuanMiLCJsaWIvUGxheWVyU2VsZWN0aW9uSW5mby5qcyIsImxpYi9Qcm9qZWN0aWxlLmpzIiwibGliL1NoaXBJbnRlcmlvci5qcyIsImxpYi9TaGlwV2VhcG9uLmpzIiwibGliL1RpbGUuanMiLCJsaWIvVGlsZWQuanMiLCJsaWIvVXBkYXRlci5qcyIsImxpYi9WaWV3LmpzIiwibGliL1dpcmUuanMiLCJsaWIvbGlicy5qcyIsImxpYi9wYXJhbGxlbGlvLWRvbS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL2xpYi9HcmlkLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbGliL0dyaWRDZWxsLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbGliL0dyaWRSb3cuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9saWIvZ3JpZHMuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvQmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0NvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvRWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9FdmVudEJpbmQuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvRXZlbnRFbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0ludmFsaWRhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL01peGFibGUuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvT3ZlcnJpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5T3duZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9BY3RpdmFibGVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eVR5cGVzL0Jhc2ljUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9DYWxjdWxhdGVkUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9Db2xsZWN0aW9uUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9Db21wb3NlZFByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5VHlwZXMvRHluYW1pY1Byb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5VHlwZXMvSW52YWxpZGF0ZWRQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eVR5cGVzL1VwZGF0ZWRQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9VcGRhdGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL3NwYXJrLXN0YXJ0ZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1wYXRoZmluZGVyL2Rpc3QvcGF0aGZpbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXN0cmluZ3Mvc3RyaW5ncy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXN0cmluZ3Mvc3RyaW5ncy9ncmVla0FscGhhYmV0Lmpzb24iLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1zdHJpbmdzL3N0cmluZ3Mvc3Rhck5hbWVzLmpzb24iLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvRGlyZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL1RpbGUuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvVGlsZUNvbnRhaW5lci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXRpbGVzL2xpYi9UaWxlUmVmZXJlbmNlLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL1RpbGVkLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL3RpbGVzLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGltaW5nL2Rpc3QvdGltaW5nLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9Db25uZWN0ZWQuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby13aXJpbmcvbGliL1NpZ25hbC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvU2lnbmFsT3BlcmF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9TaWduYWxTb3VyY2UuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby13aXJpbmcvbGliL1N3aXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvV2lyZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvd2lyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0F1dG9tYXRpY0Rvb3IuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvQ2hhcmFjdGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0NoYXJhY3RlckFJLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0NvbmZyb250YXRpb24uanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvRGFtYWdlUHJvcGFnYXRpb24uanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvRGFtYWdlYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9Eb29yLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0VsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvRW5jb250ZXJNYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0Zsb29yLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0dhbWUuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvSW52ZW50b3J5LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0xpbmVPZlNpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL01hcC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9PYnN0YWNsZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9QYXRoV2Fsay5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9QZXJzb25hbFdlYXBvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9QbGF5ZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvUHJvamVjdGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9SZXNzb3VyY2UuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvUmVzc291cmNlVHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9Sb29tR2VuZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL1NoaXAuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvU2hpcFdlYXBvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9TdGFyTWFwR2VuZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL1N0YXJTeXN0ZW0uanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvVHJhdmVsLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL1ZpZXcuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvVmlzaW9uQ2FsY3VsYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0FjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0FjdGlvblByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQXR0YWNrQWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQXR0YWNrTW92ZUFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL1NpbXBsZUFjdGlvblByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVGFyZ2V0QWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVGlsZWRBY3Rpb25Qcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL1dhbGtBY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvbGlicy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9wYXJhbGxlbGlvLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9CaW5kZXIuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvQ29sbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9FbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0V2ZW50QmluZC5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9FdmVudEVtaXR0ZXIuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvSW52YWxpZGF0ZWQvQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0ludmFsaWRhdGVkL0NvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWQuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvSW52YWxpZGF0ZWQvUHJvcGVydHlXYXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0ludmFsaWRhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0xvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9NaXhhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL092ZXJyaWRlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eU93bmVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5VHlwZXMvQmFzaWNQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eVR5cGVzL0NhbGN1bGF0ZWRQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eVR5cGVzL0NvbGxlY3Rpb25Qcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eVR5cGVzL0NvbXBvc2VkUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9EeW5hbWljUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9JbnZhbGlkYXRlZFByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1JlZmVycmVkLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1VwZGF0ZXIuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvc3Bhcmstc3RhcnRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIEF1dG9tYXRpY0Rvb3IsIEJhc2VBdXRvbWF0aWNEb29yLCBEb29yO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9Eb29yJyk7XG5cbkJhc2VBdXRvbWF0aWNEb29yID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkF1dG9tYXRpY0Rvb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gQXV0b21hdGljRG9vciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQXV0b21hdGljRG9vciBleHRlbmRzIEJhc2VBdXRvbWF0aWNEb29yIHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ2Rvb3InO1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBBdXRvbWF0aWNEb29yLmV4dGVuZChEb29yKTtcblxuICByZXR1cm4gQXV0b21hdGljRG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9BdXRvbWF0aWNEb29yLmpzLm1hcFxuIiwidmFyIEJhc2VDaGFyYWN0ZXIsIENoYXJhY3RlciwgRG9tVXBkYXRlciwgRWxlbWVudCwgVGlsZWQ7XG5cblRpbGVkID0gcmVxdWlyZSgnLi9UaWxlZCcpO1xuXG5CYXNlQ2hhcmFjdGVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkNoYXJhY3RlcjtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBCYXNlQ2hhcmFjdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnY2hhcmFjdGVyJztcbiAgICB9XG5cbiAgfTtcblxuICBDaGFyYWN0ZXIuZXh0ZW5kKFRpbGVkKTtcblxuICBDaGFyYWN0ZXIucHJvcGVydGllcyh7XG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnLCB0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBDaGFyYWN0ZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQ2hhcmFjdGVyLmpzLm1hcFxuIiwidmFyIEJhc2VEYW1hZ2VhYmxlLCBEYW1hZ2VhYmxlLCBEaXNwbGF5LCBEb21VcGRhdGVyLCBFdmVudEVtaXR0ZXI7XG5cbkJhc2VEYW1hZ2VhYmxlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkRhbWFnZWFibGU7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5FdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRFbWl0dGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhbWFnZWFibGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIERhbWFnZWFibGUgZXh0ZW5kcyBCYXNlRGFtYWdlYWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5oZWFsdGhDbHMoKTtcbiAgICAgIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBEYW1hZ2VhYmxlLmV4dGVuZChEaXNwbGF5KTtcblxuICBEYW1hZ2VhYmxlLmluY2x1ZGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5cbiAgRGFtYWdlYWJsZS5wcm9wZXJ0aWVzKHtcbiAgICBoZWFsdGhDbHNTdGVwczoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIGhlYWx0aENsczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gJ2hlYWx0aC0nICsgKE1hdGguY2VpbChpbnZhbGlkYXRvci5wcm9wKCdoZWFsdGgnKSAvIGludmFsaWRhdG9yLnByb3AoJ21heEhlYWx0aCcpICogaW52YWxpZGF0b3IucHJvcCgnaGVhbHRoQ2xzU3RlcHMnKSkpO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3Mob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuaGVhbHRoQ2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5oZWFsdGhDbHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBEYW1hZ2VhYmxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0RhbWFnZWFibGUuanMubWFwXG4iLCJ2YXIgRGlzcGxheSwgRG9tVXBkYXRlciwgRWxlbWVudCwgRXZlbnRFbWl0dGVyO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkVsZW1lbnQ7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxuRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50RW1pdHRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEaXNwbGF5IGV4dGVuZHMgRWxlbWVudCB7XG4gICAgaW5pdERpc3BsYXkoKSB7fVxuXG4gICAgZGVzdHJveURpc3BsYXkoKSB7XG4gICAgICBpZiAodGhpcy5fZGlzcGxheSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgRGlzcGxheS5pbmNsdWRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuXG4gIERpc3BsYXkucHJvcGVydGllcyh7XG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFwcGVuZFRvKHRoaXMuZGlzcGxheUNvbnRhaW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2xzOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnJlbW92ZUNsYXNzKG9sZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmNscyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKHRoaXMuY2xzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBkaXNwbGF5OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlzcGxheSwgbmV3RGl2O1xuICAgICAgICBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXNwbGF5ID0galF1ZXJ5KG5ld0RpdikuYWRkQ2xhc3ModGhpcy5iYXNlQ2xzKTtcbiAgICAgICAgZGlzcGxheS5nZXQoMCkuX3BhcmFsbGVsaW9fb2JqID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGRpc3BsYXk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmNzcyh7XG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmRpc3BsYXlYXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmNzcyh7XG4gICAgICAgICAgICB0b3A6IHRoaXMuZGlzcGxheVlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBEaXNwbGF5O1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0Rpc3BsYXkuanMubWFwXG4iLCJ2YXIgRG9tVXBkYXRlciwgUHJvcGVydHlXYXRjaGVyO1xuXG5Qcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuU3BhcmsuSW52YWxpZGF0ZWQuUHJvcGVydHlXYXRjaGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvbVVwZGF0ZXIgPSBjbGFzcyBEb21VcGRhdGVyIGV4dGVuZHMgUHJvcGVydHlXYXRjaGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZURvbUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfTtcbiAgICByZXR1cm4gc3VwZXIuaW5pdCgpO1xuICB9XG5cbiAgcmVxdWVzdEZyYW1lKCkge1xuICAgIGlmICghdGhpcy5mcmFtZWJpbmRlZCkge1xuICAgICAgdGhpcy5mcmFtZWJpbmRlZCA9IHRydWU7XG4gICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZURvbUNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBpbnZhbGlkYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RGcmFtZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RGcmFtZSgpO1xuICB9XG5cbiAgdXBkYXRlRG9tKG9sZCkge1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuZ2V0UHJvcGVydHkoKS5nZXQoKTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMub2xkKSB7XG4gICAgICB0aGlzLm9sZCA9IHZhbHVlO1xuICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUsIG9sZCk7XG4gICAgICByZXR1cm4gdGhpcy5mcmFtZWJpbmRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0RvbVVwZGF0ZXIuanMubWFwXG4iLCJ2YXIgQmFzZURvb3IsIERvbVVwZGF0ZXIsIERvb3IsIEVsZW1lbnQsIFRpbGVkO1xuXG5UaWxlZCA9IHJlcXVpcmUoJy4vVGlsZWQnKTtcblxuQmFzZURvb3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuRG9vcjtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9vciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRG9vciBleHRlbmRzIEJhc2VEb29yIHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ2Rvb3InO1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBEb29yLmV4dGVuZChUaWxlZCk7XG5cbiAgRG9vci5wcm9wZXJ0aWVzKHtcbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3Mob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9wZW46IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5LnRvZ2dsZUNsYXNzKCdjbG9zZScsICF0aGlzLm9wZW4pO1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkudG9nZ2xlQ2xhc3MoJ29wZW4nLCB0aGlzLm9wZW4pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIERvb3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRG9vci5qcy5tYXBcbiIsInZhciBCYXNlR2FtZSwgR2FtZSwgUGxheWVyQ29udHJvbGxlciwgVmlldztcblxuQmFzZUdhbWUgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuR2FtZTtcblxuVmlldyA9IHJlcXVpcmUoJy4vVmlldycpO1xuXG5QbGF5ZXJDb250cm9sbGVyID0gcmVxdWlyZSgnLi9QbGF5ZXJDb250cm9sbGVyJyk7XG5cbi8vIFVwZGF0ZXIgPSByZXF1aXJlKCcuL1VwZGF0ZXInKVxubW9kdWxlLmV4cG9ydHMgPSBHYW1lID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHYW1lIGV4dGVuZHMgQmFzZUdhbWUge307XG5cbiAgR2FtZS5wcm9wZXJ0aWVzKHtcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IsIG9yaWdpbmFsKSB7XG4gICAgICAgIHZhciB0aW1pbmc7XG4gICAgICAgIHRpbWluZyA9IG9yaWdpbmFsKCk7XG4gICAgICAgIC8vIHRpbWluZy51cGRhdGVyID0gVXBkYXRlci5pbnN0YW5jZVxuICAgICAgICByZXR1cm4gdGltaW5nO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWFpblVJOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGl2O1xuICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInVpXCIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBHYW1lLnByb3RvdHlwZS5kZWZhdWx0Vmlld0NsYXNzID0gVmlldztcblxuICBHYW1lLnByb3RvdHlwZS5kZWZhdWx0UGxheWVyQ29udHJvbGxlckNsYXNzID0gUGxheWVyQ29udHJvbGxlcjtcblxuICByZXR1cm4gR2FtZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9HYW1lLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFBsYXllckNvbnRyb2xsZXI7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBQbGF5ZXJDb250cm9sbGVyIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0cygpIHtcbiAgICAgIGlmICghdGhpcy5nYW1lRGlzcGxheSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lRGlzcGxheSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tGb2N1cyhlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYnViYmxlVXAoZS50YXJnZXQsICh0YXJnZXQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmNhbkZvY3VzT24odGFyZ2V0KSkge1xuICAgICAgICAgIHRoaXMucGxheWVyLmZvY3VzZWQgPSB0YXJnZXQ7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoZWNrVGFyZ2V0T3JTZWxlY3RhYmxlKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9idWJibGVVcChlLnRhcmdldCwgKHRhcmdldCkgPT4ge1xuICAgICAgICB2YXIgYWN0aW9uO1xuICAgICAgICBpZiAoYWN0aW9uID0gdGhpcy5wbGF5ZXIuY2FuVGFyZ2V0QWN0aW9uT24odGFyZ2V0KSkge1xuICAgICAgICAgIHRoaXMucGxheWVyLnNlbGVjdGVkQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgIHRoaXMucGxheWVyLnNldEFjdGlvblRhcmdldCh0YXJnZXQpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyLmNhblNlbGVjdCh0YXJnZXQpKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc2VsZWN0ZWQgPSB0YXJnZXQ7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF9idWJibGVVcCh0YXJnZXQsIHN0b3BDYWxsYmFjaykge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Ll9wYXJhbGxlbGlvX29iaiAhPSBudWxsID8gdGFyZ2V0Ll9wYXJhbGxlbGlvX29iaiA6IHRhcmdldC5wYXJlbnROb2RlICE9IG51bGwgPyB0YXJnZXQucGFyZW50Tm9kZSA6IHN0b3BDYWxsYmFjayh0YXJnZXQpID8gbnVsbCA6IHRhcmdldC50aWxlICE9IG51bGwgPyB0YXJnZXQudGlsZSA6ICgocmVmID0gdGFyZ2V0LmRpc3BsYXkpICE9IG51bGwgPyByZWYuZ2V0KDApLnBhcmVudE5vZGUgOiB2b2lkIDApICE9IG51bGwgPyB0YXJnZXQuZGlzcGxheS5nZXQoMCkucGFyZW50Tm9kZSA6IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICBQbGF5ZXJDb250cm9sbGVyLnByb3BlcnRpZXMoe1xuICAgIHBsYXllcjoge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZURpc3BsYXk6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVEaXNwbGF5KSB7XG4gICAgICAgICAgJCh0aGlzLmdhbWVEaXNwbGF5KS5vbignY2xpY2snLCB0aGlzLmNhbGxiYWNrKCdjaGVja1RhcmdldE9yU2VsZWN0YWJsZScpKTtcbiAgICAgICAgICByZXR1cm4gJCh0aGlzLmdhbWVEaXNwbGF5KS5vbignbW91c2VvdmVyJywgdGhpcy5jYWxsYmFjaygnY2hlY2tGb2N1cycpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFBsYXllckNvbnRyb2xsZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvUGxheWVyQ29udHJvbGxlci5qcy5tYXBcbiIsInZhciBEaXNwbGF5LCBEb21VcGRhdGVyLCBQbGF5ZXJTZWxlY3Rpb25JbmZvO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJTZWxlY3Rpb25JbmZvID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBQbGF5ZXJTZWxlY3Rpb25JbmZvIGV4dGVuZHMgRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5pbml0RGlzcGxheSgpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3NlbGVjdGlvbkluZm8nO1xuICAgICAgdGhpcy5uYW1lO1xuICAgICAgdGhpcy5nYW1lO1xuICAgICAgdGhpcy5hY3Rpb25zO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgaWYgKCF0aGlzLmRpc3BsYXlDb250YWluZXIgJiYgdGhpcy5nYW1lLm1haW5VSSkge1xuICAgICAgICB0aGlzLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmdhbWUubWFpblVJO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnBsYXllciAmJiB0aGlzLmdhbWUuY3VycmVudFBsYXllcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIgPSB0aGlzLmdhbWUuY3VycmVudFBsYXllcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBQbGF5ZXJTZWxlY3Rpb25JbmZvLnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IsIG92ZXJyaWRlZCkge1xuICAgICAgICB2YXIgZGl2O1xuICAgICAgICBkaXYgPSBvdmVycmlkZWQoKTtcbiAgICAgICAgZGl2Lmh0bWwoJzxkaXYgY2xhc3M9XCJuYW1lXCI+PC9kaXY+PGRpdiBjbGFzcz1cImFjdGlvbnNcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+QWN0aW9ucyA6PC9zcGFuPjx1bD48L3VsPjwvZGl2PicpO1xuICAgICAgICByZXR1cm4gZGl2O1xuICAgICAgfVxuICAgIH0sXG4gICAgcGxheWVyOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBzZWxlY3Rpb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKFwicGxheWVyLnNlbGVjdGVkXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgc2VsO1xuICAgICAgICBzZWwgPSBpbnZhbGlkYXRvci5wcm9wKFwic2VsZWN0aW9uXCIpO1xuICAgICAgICBpZiAoc2VsICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcChcIm5hbWVcIiwgc2VsKSB8fCBzZWwuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5maW5kKFwiLm5hbWVcIikudGV4dCh0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgYWN0aW9uczoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZSxcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKFwic2VsZWN0aW9uLmF2YWlsYWJsZUFjdGlvbnNcIikgfHwgW107XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxpc3Q7XG4gICAgICAgIGxpc3QgPSB0aGlzLmRpc3BsYXkuZmluZChcIi5hY3Rpb25zIHVsXCIpO1xuICAgICAgICBsaXN0LmVtcHR5KCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihhY3Rpb24pIHtcbiAgICAgICAgICB2YXIgZGlzcGxheSwgbmFtZTtcbiAgICAgICAgICBuYW1lID0gYWN0aW9uLm5hbWUgfHwgYWN0aW9uLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgZGlzcGxheSA9ICQoJzxsaT4nICsgbmFtZSArICc8L2xpPicpO1xuICAgICAgICAgIGRpc3BsYXkub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uc3RhcnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbGlzdC5hcHBlbmQoZGlzcGxheSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQbGF5ZXJTZWxlY3Rpb25JbmZvO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1BsYXllclNlbGVjdGlvbkluZm8uanMubWFwXG4iLCJ2YXIgQmFzZVByb2plY3RpbGUsIERpc3BsYXksIFByb2plY3RpbGUsIFVwZGF0ZXI7XG5cbkJhc2VQcm9qZWN0aWxlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlByb2plY3RpbGU7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuVXBkYXRlciA9IHJlcXVpcmUoJy4vVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RpbGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFByb2plY3RpbGUgZXh0ZW5kcyBCYXNlUHJvamVjdGlsZSB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdwcm9qZWN0aWxlJztcbiAgICAgIHJldHVybiB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZGVzdHJveURpc3BsYXkoKTtcbiAgICAgIHJldHVybiBVcGRhdGVyLmluc3RhbmNlLnJlbW92ZUNhbGxiYWNrKHRoaXMuY2FsbGJhY2soJ2ludmFsaWRhdGVQcmNQYXRoJykpO1xuICAgIH1cblxuICB9O1xuXG4gIFByb2plY3RpbGUuZXh0ZW5kKERpc3BsYXkpO1xuXG4gIFByb2plY3RpbGUucHJvcGVydGllcyh7XG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBpbnZhbGlkYXRvci5wcm9wKCdjb250YWluZXInKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLmdldFByb3BlcnR5KCd0aWxlRGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ3RpbGVEaXNwbGF5JywgY29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXIgIT0gbnVsbCA/IGNvbnRhaW5lci5nZXRQcm9wZXJ0eSgnZGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ2Rpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCdvcmlnaW5UaWxlJykuZGlzcGxheUNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5UaWxlLnRpbGVUb0Rpc3BsYXlYKGludmFsaWRhdGUucHJvcCgneCcpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXlZOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luVGlsZS50aWxlVG9EaXNwbGF5WShpbnZhbGlkYXRlLnByb3AoJ3knKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3Zpbmc6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgICAgIHJldHVybiBVcGRhdGVyLmluc3RhbmNlLmFkZENhbGxiYWNrKHRoaXMuY2FsbGJhY2soJ2ludmFsaWRhdGVQcmNQYXRoJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBVcGRhdGVyLmluc3RhbmNlLnJlbW92ZUNhbGxiYWNrKHRoaXMuY2FsbGJhY2soJ2ludmFsaWRhdGVQcmNQYXRoJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUHJvamVjdGlsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Qcm9qZWN0aWxlLmpzLm1hcFxuIiwidmFyIERlZmF1bHRHZW5lcmF0b3IsIERvb3IsIEV2ZW50RW1pdHRlciwgU2hpcEludGVyaW9yLCBUaWxlLCBUaWxlQ29udGFpbmVyO1xuXG5UaWxlID0gcmVxdWlyZSgnLi9UaWxlJyk7XG5cblRpbGVDb250YWluZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykudGlsZXMuVGlsZUNvbnRhaW5lcjtcblxuRGVmYXVsdEdlbmVyYXRvciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5Sb29tR2VuZXJhdG9yO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9BdXRvbWF0aWNEb29yJyk7XG5cbkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FdmVudEVtaXR0ZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcEludGVyaW9yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwSW50ZXJpb3IgZXh0ZW5kcyBUaWxlQ29udGFpbmVyIHtcbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0cygpIHtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmdhbWUubWFpblZpZXcuY29udGVudERpc3BsYXk7XG4gICAgICB9XG4gICAgICBpZiAoISh0aGlzLnRpbGVzLmxlbmd0aCA+IDApKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdhbWUubWFpblRpbGVDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZShnZW5lcmF0b3IpIHtcbiAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvciB8fCAobmV3IFNoaXBJbnRlcmlvci5HZW5lcmF0b3IoKSkudGFwKGZ1bmN0aW9uKCkge30pO1xuICAgICAgcmV0dXJuIGdlbmVyYXRvci5nZXRUaWxlcygpLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGlsZSh0aWxlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9O1xuXG4gIFNoaXBJbnRlcmlvci5pbmNsdWRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuXG4gIFNoaXBJbnRlcmlvci5wcm9wZXJ0aWVzKHtcbiAgICBjb250YWluZXI6IHt9LFxuICAgIGRpc3BsYXlDb250YWluZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gaW52YWxpZGF0b3IucHJvcCgnY29udGFpbmVyJyk7XG4gICAgICAgIGlmIChjb250YWluZXIgIT0gbnVsbCA/IGNvbnRhaW5lci5nZXRQcm9wZXJ0eSgnY29udGVudERpc3BsYXknKSA6IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBjb250YWluZXIuY29udGVudERpc3BsYXk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIuZ2V0UHJvcGVydHkoJ2Rpc3BsYXknKSA6IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBjb250YWluZXIuZGlzcGxheTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYXBwZW5kVG8odGhpcy5kaXNwbGF5Q29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc3BsYXk7XG4gICAgICAgIGRpc3BsYXkgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmFkZENsYXNzKCdzaGlwJyk7XG4gICAgICAgIGRpc3BsYXkuZ2V0KDApLl9wYXJhbGxlbGlvX29iaiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTaGlwSW50ZXJpb3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cblNoaXBJbnRlcmlvci5HZW5lcmF0b3IgPSBjbGFzcyBHZW5lcmF0b3IgZXh0ZW5kcyBEZWZhdWx0R2VuZXJhdG9yIHtcbiAgd2FsbEZhY3Rvcnkob3B0KSB7XG4gICAgcmV0dXJuIChuZXcgVGlsZShvcHQueCwgb3B0LnkpKS50YXAoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNscyA9ICd3YWxsJztcbiAgICAgIHJldHVybiB0aGlzLndhbGthYmxlID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBmbG9vckZhY3Rvcnkob3B0KSB7XG4gICAgcmV0dXJuIG5ldyBUaWxlLkZsb29yKG9wdC54LCBvcHQueSk7XG4gIH1cblxuICBkb29yRmFjdG9yeShvcHQpIHtcbiAgICByZXR1cm4gKG5ldyBUaWxlLkZsb29yKG9wdC54LCBvcHQueSkpLnRhcChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZENoaWxkKG5ldyBEb29yKG9wdC5kaXJlY3Rpb24pKTtcbiAgICB9KTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1NoaXBJbnRlcmlvci5qcy5tYXBcbiIsInZhciBCYXNlV2VhcG9uLCBEYW1hZ2VhYmxlLCBEb21VcGRhdGVyLCBQcm9qZWN0aWxlLCBTaGlwV2VhcG9uLCBUaWxlZDtcblxuVGlsZWQgPSByZXF1aXJlKCcuL1RpbGVkJyk7XG5cblByb2plY3RpbGUgPSByZXF1aXJlKCcuL1Byb2plY3RpbGUnKTtcblxuRGFtYWdlYWJsZSA9IHJlcXVpcmUoJy4vRGFtYWdlYWJsZScpO1xuXG5CYXNlV2VhcG9uID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNoaXBXZWFwb247XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwV2VhcG9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwV2VhcG9uIGV4dGVuZHMgQmFzZVdlYXBvbiB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aW9uKSB7XG4gICAgICBzdXBlcihkaXJlY3Rpb24pO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3dlYXBvbic7XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcFdlYXBvbi5leHRlbmQoVGlsZWQpO1xuXG4gIFNoaXBXZWFwb24uZXh0ZW5kKERhbWFnZWFibGUpO1xuXG4gIFNoaXBXZWFwb24ucHJvcGVydGllcyh7XG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnJlbW92ZUNsYXNzKG9sZC5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uLm5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmRpcmVjdGlvbi5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBwcm9qZWN0aWxlQ2xhc3M6IHtcbiAgICAgIGRlZmF1bHQ6IFByb2plY3RpbGVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTaGlwV2VhcG9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1NoaXBXZWFwb24uanMubWFwXG4iLCJ2YXIgQmFzZUZsb29yLCBCYXNlVGlsZSwgRGlzcGxheSwgVGlsZTtcblxuQmFzZVRpbGUgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykudGlsZXMuVGlsZTtcblxuQmFzZUZsb29yID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkZsb29yO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGlsZSBleHRlbmRzIEJhc2VUaWxlIHtcbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3RpbGUnO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgICB0aWxlVG9EaXNwbGF5WCh4KSB7XG4gICAgICByZXR1cm4geCAqIFRpbGUuc2l6ZTtcbiAgICB9XG5cbiAgICB0aWxlVG9EaXNwbGF5WSh5KSB7XG4gICAgICByZXR1cm4geSAqIFRpbGUuc2l6ZTtcbiAgICB9XG5cbiAgfTtcblxuICBUaWxlLmV4dGVuZChEaXNwbGF5KTtcblxuICBUaWxlLnNpemUgPSAyMDtcblxuICBUaWxlLnByb3BlcnRpZXMoe1xuICAgIGNvbnRhaW5lcjoge30sXG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBpbnZhbGlkYXRvci5wcm9wKCdjb250YWluZXInKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLmdldFByb3BlcnR5KCd0aWxlRGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ3RpbGVEaXNwbGF5JywgY29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXIgIT0gbnVsbCA/IGNvbnRhaW5lci5nZXRQcm9wZXJ0eSgnZGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ2Rpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlVG9EaXNwbGF5WChpbnZhbGlkYXRvci5wcm9wKCd4JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZVRvRGlzcGxheVkoaW52YWxpZGF0b3IucHJvcCgneScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBUaWxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5UaWxlLkZsb29yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBGbG9vciBleHRlbmRzIEJhc2VGbG9vciB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICd0aWxlJztcbiAgICAgIHJldHVybiB0aGlzLmNscyA9ICdmbG9vcic7XG4gICAgfVxuXG4gIH07XG5cbiAgRmxvb3IuZXh0ZW5kKFRpbGUpO1xuXG4gIHJldHVybiBGbG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9UaWxlLmpzLm1hcFxuIiwidmFyIEJhc2VUaWxlZCwgRGlzcGxheSwgRXZlbnRFbWl0dGVyLCBUaWxlZDtcblxuQmFzZVRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLnRpbGVzLlRpbGVkO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FdmVudEVtaXR0ZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZWQgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFRpbGVkIGV4dGVuZHMgQmFzZVRpbGVkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgVGlsZWQuZXh0ZW5kKERpc3BsYXkpO1xuXG4gIFRpbGVkLmluY2x1ZGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5cbiAgVGlsZWQucHJvcGVydGllcyh7XG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgdGlsZTtcbiAgICAgICAgdGlsZSA9IGludmFsaWRhdG9yLnByb3AoJ3RpbGUnKTtcbiAgICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCdkaXNwbGF5Q29udGFpbmVyJywgdGlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXlYOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciB0aWxlO1xuICAgICAgICB0aWxlID0gaW52YWxpZGF0b3IucHJvcCgndGlsZScpO1xuICAgICAgICBpZiAodGlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbGUuZGlzcGxheVggKyB0aWxlLnRpbGVUb0Rpc3BsYXlYKGludmFsaWRhdG9yLnByb3AoJ29mZnNldFgnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXlZOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciB0aWxlO1xuICAgICAgICB0aWxlID0gaW52YWxpZGF0b3IucHJvcCgndGlsZScpO1xuICAgICAgICBpZiAodGlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbGUuZGlzcGxheVkgKyB0aWxlLnRpbGVUb0Rpc3BsYXlZKGludmFsaWRhdG9yLnByb3AoJ29mZnNldFknKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBUaWxlZDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9UaWxlZC5qcy5tYXBcbiIsInZhciBCYXNlVXBkYXRlciwgVXBkYXRlcjtcblxuQmFzZVVwZGF0ZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuU3BhcmsuVXBkYXRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVyID0gY2xhc3MgVXBkYXRlciBleHRlbmRzIEJhc2VVcGRhdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnVwZGF0ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgfTtcbiAgICB0aGlzLmJpbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgIHRoaXMuYmluZGVkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RGcmFtZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RGcmFtZSgpIHtcbiAgICBpZiAoIXRoaXMuYmluZGVkKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXMuYmluZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHN1cGVyLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RnJhbWUoKTtcbiAgfVxuXG59O1xuXG5VcGRhdGVyLmluc3RhbmNlID0gbmV3IFVwZGF0ZXIoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9VcGRhdGVyLmpzLm1hcFxuIiwidmFyIEJhc2VWaWV3LCBEaXNwbGF5LCBEb21VcGRhdGVyLCBWaWV3O1xuXG5CYXNlVmlldyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5WaWV3O1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRpc3BsYXkgPSBudWxsKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgaWYgKGRpc3BsYXkgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgICAgfVxuICAgICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLmtleXNJbnRlcnZhbCA9IHt9O1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3ZpZXcnO1xuICAgICAgdGhpcy5ib3VuZHNTdHlsZXM7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdHMoKSB7XG4gICAgICBzdXBlci5zZXREZWZhdWx0cygpO1xuICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbnRhaW5lciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlDb250YWluZXIgPSAkKCdib2R5Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbW91c2VFbnRlcigpIHtcbiAgICAgIHRoaXMuaG92ZXJlZCA9IHRydWU7XG4gICAgICAkKCdib2R5Jykua2V5ZG93bih0aGlzLmNhbGxiYWNrKCdrZXlEb3duJykpO1xuICAgICAgcmV0dXJuICQoJ2JvZHknKS5rZXl1cCh0aGlzLmNhbGxiYWNrKCdrZXlVcCcpKTtcbiAgICB9XG5cbiAgICBtb3VzZUxlYXZlKCkge1xuICAgICAgdmFyIGNvZGUsIGludGVydmFsLCByZWYsIHJlc3VsdHM7XG4gICAgICB0aGlzLmhvdmVyZWQgPSBmYWxzZTtcbiAgICAgICQoJ2JvZHknKS5vZmYoJ2tleWRvd24nLCB0aGlzLmNhbGxiYWNrKCdrZXlEb3duJykpO1xuICAgICAgJCgnYm9keScpLm9mZigna2V5dXAnLCB0aGlzLmNhbGxiYWNrKCdrZXlVcCcpKTtcbiAgICAgIHJlZiA9IHRoaXMua2V5c0ludGVydmFsO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChjb2RlIGluIHJlZikge1xuICAgICAgICBpbnRlcnZhbCA9IHJlZltjb2RlXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIGtleURvd24oZSkge1xuICAgICAgdmFyIGtleTtcbiAgICAgIGlmIChWaWV3LmRpcmVjdGlvbmtleXNbZS53aGljaF0gIT0gbnVsbCkge1xuICAgICAgICBrZXkgPSBWaWV3LmRpcmVjdGlvbmtleXNbZS53aGljaF07XG4gICAgICAgIGlmICh0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5rZXlzSW50ZXJ2YWxba2V5Lm5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzSW50ZXJ2YWxba2V5Lm5hbWVdID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIHRoaXMueCArPSBrZXkueCAqIDI7XG4gICAgICAgICAgcmV0dXJuIHRoaXMueSArPSBrZXkueSAqIDI7XG4gICAgICAgIH0sIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlVcChlKSB7XG4gICAgICB2YXIga2V5O1xuICAgICAgaWYgKFZpZXcuZGlyZWN0aW9ua2V5c1tlLndoaWNoXSAhPSBudWxsKSB7XG4gICAgICAgIGtleSA9IFZpZXcuZGlyZWN0aW9ua2V5c1tlLndoaWNoXTtcbiAgICAgICAgaWYgKHRoaXMua2V5c0ludGVydmFsW2tleS5uYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwodGhpcy5rZXlzSW50ZXJ2YWxba2V5Lm5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZURpc3BsYXlQb3MoKSB7XG4gICAgICByZXR1cm4gJCgnLnZpZXdDb250ZW50JywgdGhpcy5kaXNwbGF5KS5jc3Moe1xuICAgICAgICBsZWZ0OiB0aGlzLnggKyAncHgnLFxuICAgICAgICB0b3A6IHRoaXMueSArICdweCdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRhaW5zUG9pbnQoeCwgeSkge1xuICAgICAgdmFyIGNvbnRhaW5lcjtcbiAgICAgIGNvbnRhaW5lciA9IHRoaXMuZGlzcGxheVswXTtcbiAgICAgIHdoaWxlIChjb250YWluZXIpIHtcbiAgICAgICAgeCAtPSBjb250YWluZXIub2Zmc2V0TGVmdDtcbiAgICAgICAgeSAtPSBjb250YWluZXIub2Zmc2V0VG9wO1xuICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIub2Zmc2V0UGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuICgwIDw9IHggJiYgeCA8PSB0aGlzLmRpc3BsYXkud2lkdGgoKSkgJiYgKDAgPD0geSAmJiB5IDw9IHRoaXMuZGlzcGxheS5oZWlnaHQoKSk7XG4gICAgfVxuXG4gIH07XG5cbiAgVmlldy5leHRlbmQoRGlzcGxheSk7XG5cbiAgVmlldy5kaXJlY3Rpb25rZXlzID0ge1xuICAgIDM4OiB7XG4gICAgICBuYW1lOiAndG9wJyxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAxXG4gICAgfSxcbiAgICAzOToge1xuICAgICAgbmFtZTogJ3JpZ2h0JyxcbiAgICAgIHg6IC0xLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgNDA6IHtcbiAgICAgIG5hbWU6ICdib3R0b20nLFxuICAgICAgeDogMCxcbiAgICAgIHk6IC0xXG4gICAgfSxcbiAgICAzNzoge1xuICAgICAgbmFtZTogJ2xlZnQnLFxuICAgICAgeDogMSxcbiAgICAgIHk6IDBcbiAgICB9XG4gIH07XG5cbiAgVmlldy5wcm9wZXJ0aWVzKHtcbiAgICB4OiB7XG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRGlzcGxheVBvcygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgeToge1xuICAgICAgZGVmYXVsdDogMCxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZURpc3BsYXlQb3MoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IsIG9yaWdpbmFsKSB7XG4gICAgICAgIHZhciBkaXNwbGF5O1xuICAgICAgICBkaXNwbGF5ID0gb3JpZ2luYWwoKTtcbiAgICAgICAgaWYgKCQoJy52aWV3Q29udGVudCcsIGRpc3BsYXkpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICQoZGlzcGxheSkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidmlld0NvbnRlbnRcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgICAkKGRpc3BsYXkpLm1vdXNlZW50ZXIodGhpcy5jYWxsYmFjaygnbW91c2VFbnRlcicpKTtcbiAgICAgICAgcmV0dXJuICQoZGlzcGxheSkubW91c2VsZWF2ZSh0aGlzLmNhbGxiYWNrKCdtb3VzZUxlYXZlJykpO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZURpc3BsYXlQb3MoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRlbnREaXNwbGF5OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJCgnLnZpZXdDb250ZW50JywgdGhpcy5kaXNwbGF5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJvdW5kc1N0eWxlczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRvcDogaW52YWxpZGF0b3IucHJvcCgndG9wJywgdGhpcy5ib3VuZHMpICogMTAwICsgJyUnLFxuICAgICAgICAgIGxlZnQ6IGludmFsaWRhdG9yLnByb3AoJ2xlZnQnLCB0aGlzLmJvdW5kcykgKiAxMDAgKyAnJScsXG4gICAgICAgICAgYm90dG9tOiAoMSAtIGludmFsaWRhdG9yLnByb3AoJ2JvdHRvbScsIHRoaXMuYm91bmRzKSkgKiAxMDAgKyAnJScsXG4gICAgICAgICAgcmlnaHQ6ICgxIC0gaW52YWxpZGF0b3IucHJvcCgncmlnaHQnLCB0aGlzLmJvdW5kcykpICogMTAwICsgJyUnXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmNzcyh0aGlzLmJvdW5kc1N0eWxlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVmlldztcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9WaWV3LmpzLm1hcFxuIiwidmFyIEJhc2VXaXJlLCBEb21VcGRhdGVyLCBUaWxlZCwgV2lyZTtcblxuVGlsZWQgPSByZXF1aXJlKCcuL1RpbGVkJyk7XG5cbkJhc2VXaXJlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLndpcmluZy5XaXJlO1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2lyZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgV2lyZSBleHRlbmRzIEJhc2VXaXJlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aXJlVHlwZSkge1xuICAgICAgc3VwZXIod2lyZVR5cGUpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3dpcmUnO1xuICAgICAgdGhpcy5jb25uZWN0ZWREaXJlY3Rpb25zO1xuICAgIH1cblxuICAgIGdldENsYXNzRnJvbURpcmVjdGlvbihkKSB7XG4gICAgICByZXR1cm4gJ2Nvbm4nICsgZC5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZC5uYW1lLnNsaWNlKDEpO1xuICAgIH1cblxuICB9O1xuXG4gIFdpcmUuZXh0ZW5kKFRpbGVkKTtcblxuICBXaXJlLnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IsIHN1cCkge1xuICAgICAgICByZXR1cm4gc3VwKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjb25uZWN0ZWREaXJlY3Rpb25zOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQpIHtcbiAgICAgICAgICAgIG9sZC5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3ModGhpcy5nZXRDbGFzc0Zyb21EaXJlY3Rpb24oZCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RlZERpcmVjdGlvbnMuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmdldENsYXNzRnJvbURpcmVjdGlvbihkKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICB3aXJlVHlwZToge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICBpZiAob2xkKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3Mob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLndpcmVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBXaXJlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1dpcmUuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJBdXRvbWF0aWNEb29yXCI6IHJlcXVpcmUoXCIuL0F1dG9tYXRpY0Rvb3JcIiksXG4gIFwiQ2hhcmFjdGVyXCI6IHJlcXVpcmUoXCIuL0NoYXJhY3RlclwiKSxcbiAgXCJEYW1hZ2VhYmxlXCI6IHJlcXVpcmUoXCIuL0RhbWFnZWFibGVcIiksXG4gIFwiRGlzcGxheVwiOiByZXF1aXJlKFwiLi9EaXNwbGF5XCIpLFxuICBcIkRvbVVwZGF0ZXJcIjogcmVxdWlyZShcIi4vRG9tVXBkYXRlclwiKSxcbiAgXCJEb29yXCI6IHJlcXVpcmUoXCIuL0Rvb3JcIiksXG4gIFwiR2FtZVwiOiByZXF1aXJlKFwiLi9HYW1lXCIpLFxuICBcIlBsYXllckNvbnRyb2xsZXJcIjogcmVxdWlyZShcIi4vUGxheWVyQ29udHJvbGxlclwiKSxcbiAgXCJQbGF5ZXJTZWxlY3Rpb25JbmZvXCI6IHJlcXVpcmUoXCIuL1BsYXllclNlbGVjdGlvbkluZm9cIiksXG4gIFwiUHJvamVjdGlsZVwiOiByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlXCIpLFxuICBcIlNoaXBJbnRlcmlvclwiOiByZXF1aXJlKFwiLi9TaGlwSW50ZXJpb3JcIiksXG4gIFwiU2hpcFdlYXBvblwiOiByZXF1aXJlKFwiLi9TaGlwV2VhcG9uXCIpLFxuICBcIlRpbGVcIjogcmVxdWlyZShcIi4vVGlsZVwiKSxcbiAgXCJUaWxlZFwiOiByZXF1aXJlKFwiLi9UaWxlZFwiKSxcbiAgXCJVcGRhdGVyXCI6IHJlcXVpcmUoXCIuL1VwZGF0ZXJcIiksXG4gIFwiVmlld1wiOiByZXF1aXJlKFwiLi9WaWV3XCIpLFxuICBcIldpcmVcIjogcmVxdWlyZShcIi4vV2lyZVwiKSxcbn0iLCJ2YXIgUGFyYWxsZWxpbywgbGlicztcblxubGlicyA9IHJlcXVpcmUoJy4vbGlicycpO1xuXG5QYXJhbGxlbGlvID0gcmVxdWlyZSgncGFyYWxsZWxpbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sIFBhcmFsbGVsaW8sIHtcbiAgRE9NOiBsaWJzXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9wYXJhbGxlbGlvLWRvbS5qcy5tYXBcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgR3JpZD1kZWZpbml0aW9uKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIj9QYXJhbGxlbGlvOnRoaXMuUGFyYWxsZWxpbyk7R3JpZC5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUdyaWQ7fWVsc2V7aWYodHlwZW9mIFBhcmFsbGVsaW8hPT1cInVuZGVmaW5lZFwiJiZQYXJhbGxlbGlvIT09bnVsbCl7UGFyYWxsZWxpby5HcmlkPUdyaWQ7fWVsc2V7aWYodGhpcy5QYXJhbGxlbGlvPT1udWxsKXt0aGlzLlBhcmFsbGVsaW89e307fXRoaXMuUGFyYWxsZWxpby5HcmlkPUdyaWQ7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cbnZhciBFbGVtZW50ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRWxlbWVudFwiKSA/IGRlcGVuZGVuY2llcy5FbGVtZW50IDogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG52YXIgRXZlbnRFbWl0dGVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRXZlbnRFbWl0dGVyXCIpID8gZGVwZW5kZW5jaWVzLkV2ZW50RW1pdHRlciA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FdmVudEVtaXR0ZXI7XG52YXIgR3JpZENlbGwgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJHcmlkQ2VsbFwiKSA/IGRlcGVuZGVuY2llcy5HcmlkQ2VsbCA6IHJlcXVpcmUoJy4vR3JpZENlbGwnKTtcbnZhciBHcmlkUm93ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiR3JpZFJvd1wiKSA/IGRlcGVuZGVuY2llcy5HcmlkUm93IDogcmVxdWlyZSgnLi9HcmlkUm93Jyk7XG52YXIgR3JpZDtcbkdyaWQgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdyaWQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBhZGRDZWxsKGNlbGwgPSBudWxsKSB7XG4gICAgICB2YXIgcm93LCBzcG90O1xuICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgIGNlbGwgPSBuZXcgR3JpZENlbGwoKTtcbiAgICAgIH1cbiAgICAgIHNwb3QgPSB0aGlzLmdldEZyZWVTcG90KCk7XG4gICAgICByb3cgPSB0aGlzLnJvd3MuZ2V0KHNwb3Qucm93KTtcbiAgICAgIGlmICghcm93KSB7XG4gICAgICAgIHJvdyA9IHRoaXMuYWRkUm93KCk7XG4gICAgICB9XG4gICAgICByb3cuYWRkQ2VsbChjZWxsKTtcbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICAgIGFkZFJvdyhyb3cgPSBudWxsKSB7XG4gICAgICBpZiAoIXJvdykge1xuICAgICAgICByb3cgPSBuZXcgR3JpZFJvdygpO1xuICAgICAgfVxuICAgICAgdGhpcy5yb3dzLnB1c2gocm93KTtcbiAgICAgIHJldHVybiByb3c7XG4gICAgfVxuXG4gICAgZ2V0RnJlZVNwb3QoKSB7XG4gICAgICB2YXIgc3BvdDtcbiAgICAgIHNwb3QgPSBudWxsO1xuICAgICAgdGhpcy5yb3dzLnNvbWUoKHJvdykgPT4ge1xuICAgICAgICBpZiAocm93LmNlbGxzLmxlbmd0aCA8IHRoaXMubWF4Q29sdW1ucykge1xuICAgICAgICAgIHJldHVybiBzcG90ID0ge1xuICAgICAgICAgICAgcm93OiByb3cucm93UG9zaXRpb24sXG4gICAgICAgICAgICBjb2x1bW46IHJvdy5jZWxscy5sZW5ndGhcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICghc3BvdCkge1xuICAgICAgICBpZiAodGhpcy5tYXhDb2x1bW5zID4gdGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgIHNwb3QgPSB7XG4gICAgICAgICAgICByb3c6IHRoaXMucm93cy5sZW5ndGgsXG4gICAgICAgICAgICBjb2x1bW46IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwb3QgPSB7XG4gICAgICAgICAgICByb3c6IDAsXG4gICAgICAgICAgICBjb2x1bW46IHRoaXMubWF4Q29sdW1ucyArIDFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3BvdDtcbiAgICB9XG5cbiAgfTtcblxuICBHcmlkLmV4dGVuZChFdmVudEVtaXR0ZXIpO1xuXG4gIEdyaWQucHJvcGVydGllcyh7XG4gICAgcm93czoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZSxcbiAgICAgIGl0ZW1BZGRlZDogZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIHJldHVybiByb3cuZ3JpZCA9IHRoaXM7XG4gICAgICB9LFxuICAgICAgaXRlbVJlbW92ZWQ6IGZ1bmN0aW9uKHJvdykge1xuICAgICAgICBpZiAocm93LmdyaWQgPT09IHRoaXMpIHtcbiAgICAgICAgICByZXR1cm4gcm93LmdyaWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBtYXhDb2x1bW5zOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciByb3dzO1xuICAgICAgICByb3dzID0gaW52YWxpZGF0b3IucHJvcCgncm93cycpO1xuICAgICAgICByZXR1cm4gcm93cy5yZWR1Y2UoZnVuY3Rpb24obWF4LCByb3cpIHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobWF4LCBpbnZhbGlkYXRvci5wcm9wKCdjZWxscycsIHJvdykubGVuZ3RoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gR3JpZDtcblxufSkuY2FsbCh0aGlzKTtcblxucmV0dXJuKEdyaWQpO30pOyIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgR3JpZENlbGw9ZGVmaW5pdGlvbih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCI/UGFyYWxsZWxpbzp0aGlzLlBhcmFsbGVsaW8pO0dyaWRDZWxsLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9R3JpZENlbGw7fWVsc2V7aWYodHlwZW9mIFBhcmFsbGVsaW8hPT1cInVuZGVmaW5lZFwiJiZQYXJhbGxlbGlvIT09bnVsbCl7UGFyYWxsZWxpby5HcmlkQ2VsbD1HcmlkQ2VsbDt9ZWxzZXtpZih0aGlzLlBhcmFsbGVsaW89PW51bGwpe3RoaXMuUGFyYWxsZWxpbz17fTt9dGhpcy5QYXJhbGxlbGlvLkdyaWRDZWxsPUdyaWRDZWxsO319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XG52YXIgRWxlbWVudCA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkVsZW1lbnRcIikgPyBkZXBlbmRlbmNpZXMuRWxlbWVudCA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xudmFyIEV2ZW50RW1pdHRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkV2ZW50RW1pdHRlclwiKSA/IGRlcGVuZGVuY2llcy5FdmVudEVtaXR0ZXIgOiByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRFbWl0dGVyO1xudmFyIEdyaWRDZWxsO1xuR3JpZENlbGwgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdyaWRDZWxsIGV4dGVuZHMgRWxlbWVudCB7fTtcblxuICBHcmlkQ2VsbC5leHRlbmQoRXZlbnRFbWl0dGVyKTtcblxuICBHcmlkQ2VsbC5wcm9wZXJ0aWVzKHtcbiAgICBncmlkOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCdncmlkJywgaW52YWxpZGF0b3IucHJvcCgncm93JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcm93OiB7fSxcbiAgICBjb2x1bW5Qb3NpdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgcm93O1xuICAgICAgICByb3cgPSBpbnZhbGlkYXRvci5wcm9wKCdyb3cnKTtcbiAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCdjZWxscycsIHJvdykuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wKCdjZWxscycsIGludmFsaWRhdG9yLnByb3AoJ3JvdycpKS5sZW5ndGg7XG4gICAgICB9XG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCd3aWR0aCcpICogaW52YWxpZGF0b3IucHJvcCgnY29sdW1uUG9zaXRpb24nKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCd3aWR0aCcpICogKGludmFsaWRhdG9yLnByb3AoJ2NvbHVtblBvc2l0aW9uJykgKyAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCgnaGVpZ2h0JywgaW52YWxpZGF0b3IucHJvcCgncm93JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9wOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCd0b3AnLCBpbnZhbGlkYXRvci5wcm9wKCdyb3cnKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ2JvdHRvbScsIGludmFsaWRhdG9yLnByb3AoJ3JvdycpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBHcmlkQ2VsbDtcblxufSkuY2FsbCh0aGlzKTtcblxucmV0dXJuKEdyaWRDZWxsKTt9KTsiLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIEdyaWRSb3c9ZGVmaW5pdGlvbih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCI/UGFyYWxsZWxpbzp0aGlzLlBhcmFsbGVsaW8pO0dyaWRSb3cuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1HcmlkUm93O31lbHNle2lmKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIiYmUGFyYWxsZWxpbyE9PW51bGwpe1BhcmFsbGVsaW8uR3JpZFJvdz1HcmlkUm93O31lbHNle2lmKHRoaXMuUGFyYWxsZWxpbz09bnVsbCl7dGhpcy5QYXJhbGxlbGlvPXt9O310aGlzLlBhcmFsbGVsaW8uR3JpZFJvdz1HcmlkUm93O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XG52YXIgRWxlbWVudCA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkVsZW1lbnRcIikgPyBkZXBlbmRlbmNpZXMuRWxlbWVudCA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xudmFyIEV2ZW50RW1pdHRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkV2ZW50RW1pdHRlclwiKSA/IGRlcGVuZGVuY2llcy5FdmVudEVtaXR0ZXIgOiByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRFbWl0dGVyO1xudmFyIEdyaWRDZWxsID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiR3JpZENlbGxcIikgPyBkZXBlbmRlbmNpZXMuR3JpZENlbGwgOiByZXF1aXJlKCcuL0dyaWRDZWxsJyk7XG52YXIgR3JpZFJvdztcbkdyaWRSb3cgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdyaWRSb3cgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBhZGRDZWxsKGNlbGwgPSBudWxsKSB7XG4gICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgY2VsbCA9IG5ldyBHcmlkQ2VsbCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jZWxscy5wdXNoKGNlbGwpO1xuICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuXG4gIH07XG5cbiAgR3JpZFJvdy5leHRlbmQoRXZlbnRFbWl0dGVyKTtcblxuICBHcmlkUm93LnByb3BlcnRpZXMoe1xuICAgIGdyaWQ6IHt9LFxuICAgIGNlbGxzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgaXRlbUFkZGVkOiBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgIHJldHVybiBjZWxsLnJvdyA9IHRoaXM7XG4gICAgICB9LFxuICAgICAgaXRlbVJlbW92ZWQ6IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgaWYgKGNlbGwucm93ID09PSB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucm93ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcm93UG9zaXRpb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIGdyaWQ7XG4gICAgICAgIGdyaWQgPSBpbnZhbGlkYXRvci5wcm9wKCdncmlkJyk7XG4gICAgICAgIGlmIChncmlkKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ3Jvd3MnLCBncmlkKS5pbmRleE9mKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wKCdyb3dzJywgaW52YWxpZGF0b3IucHJvcCgnZ3JpZCcpKS5sZW5ndGg7XG4gICAgICB9XG4gICAgfSxcbiAgICB0b3A6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ2hlaWdodCcpICogaW52YWxpZGF0b3IucHJvcCgncm93UG9zaXRpb24nKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCgnaGVpZ2h0JykgKiAoaW52YWxpZGF0b3IucHJvcCgncm93UG9zaXRpb24nKSArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEdyaWRSb3c7XG5cbn0pLmNhbGwodGhpcyk7XG5cbnJldHVybihHcmlkUm93KTt9KTsiLCJpZihtb2R1bGUpe1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBHcmlkOiByZXF1aXJlKCcuL0dyaWQuanMnKSxcbiAgICBHcmlkQ2VsbDogcmVxdWlyZSgnLi9HcmlkQ2VsbC5qcycpLFxuICAgIEdyaWRSb3c6IHJlcXVpcmUoJy4vR3JpZFJvdy5qcycpXG4gIH07XG59IiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBCaW5kZXI9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0JpbmRlci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUJpbmRlcjt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkJpbmRlcj1CaW5kZXI7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5CaW5kZXI9QmluZGVyO319fSkoZnVuY3Rpb24oKXtcclxudmFyIEJpbmRlcjtcclxuQmluZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIEJpbmRlciB7XHJcbiAgICBiaW5kKCkge1xyXG4gICAgICBpZiAoIXRoaXMuYmluZGVkICYmICh0aGlzLmNhbGxiYWNrICE9IG51bGwpICYmICh0aGlzLnRhcmdldCAhPSBudWxsKSkge1xyXG4gICAgICAgIHRoaXMuZG9CaW5kKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuYmluZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvQmluZCgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICAgIH1cclxuICAgIHVuYmluZCgpIHtcclxuICAgICAgaWYgKHRoaXMuYmluZGVkICYmICh0aGlzLmNhbGxiYWNrICE9IG51bGwpICYmICh0aGlzLnRhcmdldCAhPSBudWxsKSkge1xyXG4gICAgICAgIHRoaXMuZG9VbmJpbmQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5iaW5kZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGRvVW5iaW5kKCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgfVxyXG4gICAgZXF1YWxzKGJpbmRlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb21wYXJlUmVmZXJlZChiaW5kZXIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0UmVmKCkge31cclxuICAgIHN0YXRpYyBjb21wYXJlUmVmZXJlZChvYmoxLCBvYmoyKSB7XHJcbiAgICAgIHJldHVybiBvYmoxID09PSBvYmoyIHx8ICgob2JqMSAhPSBudWxsKSAmJiAob2JqMiAhPSBudWxsKSAmJiBvYmoxLmNvbnN0cnVjdG9yID09PSBvYmoyLmNvbnN0cnVjdG9yICYmIHRoaXMuY29tcGFyZVJlZihvYmoxLnJlZiwgb2JqMi5yZWYpKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21wYXJlUmVmKHJlZjEsIHJlZjIpIHtcclxuICAgICAgcmV0dXJuIChyZWYxICE9IG51bGwpICYmIChyZWYyICE9IG51bGwpICYmIChyZWYxID09PSByZWYyIHx8IChBcnJheS5pc0FycmF5KHJlZjEpICYmIEFycmF5LmlzQXJyYXkocmVmMSkgJiYgcmVmMS5ldmVyeSgodmFsLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVJlZmVyZWQocmVmMVtpXSwgcmVmMltpXSk7XHJcbiAgICAgIH0pKSB8fCAodHlwZW9mIHJlZjEgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlZjIgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXMocmVmMSkuam9pbigpID09PSBPYmplY3Qua2V5cyhyZWYyKS5qb2luKCkgJiYgT2JqZWN0LmtleXMocmVmMSkuZXZlcnkoKGtleSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVSZWZlcmVkKHJlZjFba2V5XSwgcmVmMltrZXldKTtcclxuICAgICAgfSkpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCaW5kZXIucHJvdG90eXBlLCAncmVmJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVmKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIEJpbmRlcjtcclxufSkuY2FsbCh0aGlzKTtcclxucmV0dXJuKEJpbmRlcik7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQmluZGVyLmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIENvbGxlY3Rpb249ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0NvbGxlY3Rpb24uZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1Db2xsZWN0aW9uO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuQ29sbGVjdGlvbj1Db2xsZWN0aW9uO31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuQ29sbGVjdGlvbj1Db2xsZWN0aW9uO319fSkoZnVuY3Rpb24oKXtcclxudmFyIENvbGxlY3Rpb247XHJcbkNvbGxlY3Rpb24gPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgQ29sbGVjdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcclxuICAgICAgaWYgKGFyciAhPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgdGhpcy5fYXJyYXkgPSBhcnIudG9BcnJheSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XHJcbiAgICAgICAgICB0aGlzLl9hcnJheSA9IGFycjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fYXJyYXkgPSBbYXJyXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fYXJyYXkgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hhbmdlZCgpIHt9XHJcbiAgICBjaGVja0NoYW5nZXMob2xkLCBvcmRlcmVkID0gdHJ1ZSwgY29tcGFyZUZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICBpZiAoY29tcGFyZUZ1bmN0aW9uID09IG51bGwpIHtcclxuICAgICAgICBjb21wYXJlRnVuY3Rpb24gPSBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIG9sZCA9IHRoaXMuY29weShvbGQuc2xpY2UoKSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvdW50KCkgIT09IG9sZC5sZW5ndGggfHwgKG9yZGVyZWQgPyB0aGlzLnNvbWUoZnVuY3Rpb24odmFsLCBpKSB7XHJcbiAgICAgICAgcmV0dXJuICFjb21wYXJlRnVuY3Rpb24ob2xkLmdldChpKSwgdmFsKTtcclxuICAgICAgfSkgOiB0aGlzLnNvbWUoZnVuY3Rpb24oYSkge1xyXG4gICAgICAgIHJldHVybiAhb2xkLnBsdWNrKGZ1bmN0aW9uKGIpIHtcclxuICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIGdldChpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9hcnJheVtpXTtcclxuICAgIH1cclxuICAgIHNldChpLCB2YWwpIHtcclxuICAgICAgdmFyIG9sZDtcclxuICAgICAgaWYgKHRoaXMuX2FycmF5W2ldICE9PSB2YWwpIHtcclxuICAgICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKTtcclxuICAgICAgICB0aGlzLl9hcnJheVtpXSA9IHZhbDtcclxuICAgICAgICB0aGlzLmNoYW5nZWQob2xkKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gICAgYWRkKHZhbCkge1xyXG4gICAgICBpZiAoIXRoaXMuX2FycmF5LmluY2x1ZGVzKHZhbCkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHZhbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZSh2YWwpIHtcclxuICAgICAgdmFyIGluZGV4LCBvbGQ7XHJcbiAgICAgIGluZGV4ID0gdGhpcy5fYXJyYXkuaW5kZXhPZih2YWwpO1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgb2xkID0gdGhpcy50b0FycmF5KCk7XHJcbiAgICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VkKG9sZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHBsdWNrKGZuKSB7XHJcbiAgICAgIHZhciBmb3VuZCwgaW5kZXgsIG9sZDtcclxuICAgICAgaW5kZXggPSB0aGlzLl9hcnJheS5maW5kSW5kZXgoZm4pO1xyXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpO1xyXG4gICAgICAgIGZvdW5kID0gdGhpcy5fYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgIHRoaXMuX2FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkKG9sZCk7XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKTtcclxuICAgIH1cclxuICAgIGNvdW50KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG5ld1N1YkNsYXNzKGZuLCBhcnIpIHtcclxuICAgICAgdmFyIFN1YkNsYXNzO1xyXG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIFN1YkNsYXNzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9O1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oU3ViQ2xhc3MucHJvdG90eXBlLCBmbik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJDbGFzcyhhcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhhcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb3B5KGFycikge1xyXG4gICAgICB2YXIgY29sbDtcclxuICAgICAgaWYgKGFyciA9PSBudWxsKSB7XHJcbiAgICAgICAgYXJyID0gdGhpcy50b0FycmF5KCk7XHJcbiAgICAgIH1cclxuICAgICAgY29sbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGFycik7XHJcbiAgICAgIHJldHVybiBjb2xsO1xyXG4gICAgfVxyXG4gICAgZXF1YWxzKGFycikge1xyXG4gICAgICByZXR1cm4gKHRoaXMuY291bnQoKSA9PT0gKHR5cGVvZiBhcnIuY291bnQgPT09ICdmdW5jdGlvbicgPyBhcnIuY291bnQoKSA6IGFyci5sZW5ndGgpKSAmJiB0aGlzLmV2ZXJ5KGZ1bmN0aW9uKHZhbCwgaSkge1xyXG4gICAgICAgIHJldHVybiBhcnJbaV0gPT09IHZhbDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXRBZGRlZEZyb20oYXJyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9hcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhYXJyLmluY2x1ZGVzKGl0ZW0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldFJlbW92ZWRGcm9tKGFycikge1xyXG4gICAgICByZXR1cm4gYXJyLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pbmNsdWRlcyhpdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBDb2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMgPSBbJ2V2ZXJ5JywgJ2ZpbmQnLCAnZmluZEluZGV4JywgJ2ZvckVhY2gnLCAnaW5jbHVkZXMnLCAnaW5kZXhPZicsICdqb2luJywgJ2xhc3RJbmRleE9mJywgJ21hcCcsICdyZWR1Y2UnLCAncmVkdWNlUmlnaHQnLCAnc29tZScsICd0b1N0cmluZyddO1xyXG4gIENvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMgPSBbJ2NvbmNhdCcsICdmaWx0ZXInLCAnc2xpY2UnXTtcclxuICBDb2xsZWN0aW9uLndyaXRlZnVuY3Rpb25zID0gWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXTtcclxuICBDb2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbihmdW5jdCkge1xyXG4gICAgcmV0dXJuIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uKC4uLmFyZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZyk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG4gIENvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbihmdW5jdCkge1xyXG4gICAgcmV0dXJuIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uKC4uLmFyZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb3B5KHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpKTtcclxuICAgIH07XHJcbiAgfSk7XHJcbiAgQ29sbGVjdGlvbi53cml0ZWZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmN0KSB7XHJcbiAgICByZXR1cm4gQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24oLi4uYXJnKSB7XHJcbiAgICAgIHZhciBvbGQsIHJlcztcclxuICAgICAgb2xkID0gdGhpcy50b0FycmF5KCk7XHJcbiAgICAgIHJlcyA9IHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpO1xyXG4gICAgICB0aGlzLmNoYW5nZWQob2xkKTtcclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH07XHJcbiAgfSk7XHJcbiAgcmV0dXJuIENvbGxlY3Rpb247XHJcbn0pLmNhbGwodGhpcyk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xsZWN0aW9uLnByb3RvdHlwZSwgJ2xlbmd0aCcsIHtcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY291bnQoKTtcclxuICB9XHJcbn0pO1xyXG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wgIT09IG51bGwgPyBTeW1ib2wuaXRlcmF0b3IgOiB2b2lkIDApIHtcclxuICBDb2xsZWN0aW9uLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gIH07XHJcbn1cclxucmV0dXJuKENvbGxlY3Rpb24pO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0NvbGxlY3Rpb24uanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgRWxlbWVudD1kZWZpbml0aW9uKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCI/U3Bhcms6dGhpcy5TcGFyayk7RWxlbWVudC5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUVsZW1lbnQ7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5FbGVtZW50PUVsZW1lbnQ7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5FbGVtZW50PUVsZW1lbnQ7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cclxudmFyIFByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5Jyk7XHJcbnZhciBNaXhhYmxlID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiTWl4YWJsZVwiKSA/IGRlcGVuZGVuY2llcy5NaXhhYmxlIDogcmVxdWlyZSgnLi9NaXhhYmxlJyk7XHJcbnZhciBFbGVtZW50O1xyXG5FbGVtZW50ID0gY2xhc3MgRWxlbWVudCBleHRlbmRzIE1peGFibGUge1xyXG4gIHRhcChuYW1lKSB7XHJcbiAgICB2YXIgYXJncztcclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5hbWUuYXBwbHkodGhpcywgYXJncy5zbGljZSgxKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjYWxsYmFjayhuYW1lKSB7XHJcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzW25hbWVdID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fY2FsbGJhY2tzW25hbWVdID0gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0ub3duZXIgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tuYW1lXTtcclxuICB9XHJcblxyXG4gIGdldEZpbmFsUHJvcGVydGllcygpIHtcclxuICAgIGlmICh0aGlzLl9wcm9wZXJ0aWVzICE9IG51bGwpIHtcclxuICAgICAgcmV0dXJuIFsnX3Byb3BlcnRpZXMnXS5jb25jYXQodGhpcy5fcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLm5hbWU7XHJcbiAgICAgIH0pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4dGVuZGVkKHRhcmdldCkge1xyXG4gICAgdmFyIGksIGxlbiwgb3B0aW9ucywgcHJvcGVydHksIHJlZiwgcmVzdWx0cztcclxuICAgIGlmICh0aGlzLl9wcm9wZXJ0aWVzICE9IG51bGwpIHtcclxuICAgICAgcmVmID0gdGhpcy5fcHJvcGVydGllcztcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBwcm9wZXJ0eSA9IHJlZltpXTtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcGVydHkub3B0aW9ucyk7XHJcbiAgICAgICAgcmVzdWx0cy5wdXNoKChuZXcgUHJvcGVydHkocHJvcGVydHkubmFtZSwgb3B0aW9ucykpLmJpbmQodGFyZ2V0KSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcHJvcGVydHkocHJvcCwgZGVzYykge1xyXG4gICAgcmV0dXJuIChuZXcgUHJvcGVydHkocHJvcCwgZGVzYykpLmJpbmQodGhpcy5wcm90b3R5cGUpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgdmFyIGRlc2MsIHByb3AsIHJlc3VsdHM7XHJcbiAgICByZXN1bHRzID0gW107XHJcbiAgICBmb3IgKHByb3AgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBkZXNjID0gcHJvcGVydGllc1twcm9wXTtcclxuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMucHJvcGVydHkocHJvcCwgZGVzYykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbnJldHVybihFbGVtZW50KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FbGVtZW50LmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIEV2ZW50QmluZD1kZWZpbml0aW9uKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCI/U3Bhcms6dGhpcy5TcGFyayk7RXZlbnRCaW5kLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9RXZlbnRCaW5kO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuRXZlbnRCaW5kPUV2ZW50QmluZDt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkV2ZW50QmluZD1FdmVudEJpbmQ7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cclxudmFyIEJpbmRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkJpbmRlclwiKSA/IGRlcGVuZGVuY2llcy5CaW5kZXIgOiByZXF1aXJlKCcuL0JpbmRlcicpO1xyXG52YXIgRXZlbnRCaW5kO1xyXG5FdmVudEJpbmQgPSBjbGFzcyBFdmVudEJpbmQgZXh0ZW5kcyBCaW5kZXIge1xyXG4gIGNvbnN0cnVjdG9yKGV2ZW50MSwgdGFyZ2V0MSwgY2FsbGJhY2spIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQxO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQxO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVmKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXHJcbiAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXHJcbiAgICAgIGNhbGxiYWNrOiB0aGlzLmNhbGxiYWNrXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZG9CaW5kKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQuYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFkZExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQub24gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9uKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZG9VbmJpbmQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjayk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjayk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5vZmYgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9mZih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZnVuY3Rpb24gdG8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyB3YXMgZm91bmQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVxdWFscyhldmVudEJpbmQpIHtcclxuICAgIHJldHVybiBzdXBlci5lcXVhbHMoZXZlbnRCaW5kKSAmJiBldmVudEJpbmQuZXZlbnQgPT09IHRoaXMuZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBtYXRjaChldmVudCwgdGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT09IHRoaXMuZXZlbnQgJiYgdGFyZ2V0ID09PSB0aGlzLnRhcmdldDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjaGVja0VtaXR0ZXIoZW1pdHRlciwgZmF0YWwgPSB0cnVlKSB7XHJcbiAgICBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZW1pdHRlci5hZGRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoZmF0YWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5yZXR1cm4oRXZlbnRCaW5kKTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FdmVudEJpbmQuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgRXZlbnRFbWl0dGVyPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtFdmVudEVtaXR0ZXIuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1FdmVudEVtaXR0ZXI7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5FdmVudEVtaXR0ZXI9RXZlbnRFbWl0dGVyO31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuRXZlbnRFbWl0dGVyPUV2ZW50RW1pdHRlcjt9fX0pKGZ1bmN0aW9uKCl7XHJcbnZhciBFdmVudEVtaXR0ZXI7XHJcbkV2ZW50RW1pdHRlciA9IChmdW5jdGlvbigpIHtcclxuICBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgZ2V0QWxsRXZlbnRzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcnMoZSkge1xyXG4gICAgICB2YXIgZXZlbnRzO1xyXG4gICAgICBldmVudHMgPSB0aGlzLmdldEFsbEV2ZW50cygpO1xyXG4gICAgICByZXR1cm4gZXZlbnRzW2VdIHx8IChldmVudHNbZV0gPSBbXSk7XHJcbiAgICB9XHJcbiAgICBoYXNMaXN0ZW5lcihlLCBsaXN0ZW5lcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRMaXN0ZW5lcnMoZSkuaW5jbHVkZXMobGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIoZSwgbGlzdGVuZXIpIHtcclxuICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVyKGUsIGxpc3RlbmVyKSkge1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGUpLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyQWRkZWQoZSwgbGlzdGVuZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsaXN0ZW5lckFkZGVkKGUsIGxpc3RlbmVyKSB7fVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIoZSwgbGlzdGVuZXIpIHtcclxuICAgICAgdmFyIGluZGV4LCBsaXN0ZW5lcnM7XHJcbiAgICAgIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGUpO1xyXG4gICAgICBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyUmVtb3ZlZChlLCBsaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxpc3RlbmVyUmVtb3ZlZChlLCBsaXN0ZW5lcikge31cclxuICAgIGVtaXRFdmVudChlLCAuLi5hcmdzKSB7XHJcbiAgICAgIHZhciBsaXN0ZW5lcnM7XHJcbiAgICAgIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGUpLnNsaWNlKCk7XHJcbiAgICAgIHJldHVybiBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXRFdmVudDtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXRFdmVudDtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XHJcbiAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcclxufSkuY2FsbCh0aGlzKTtcclxucmV0dXJuKEV2ZW50RW1pdHRlcik7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRXZlbnRFbWl0dGVyLmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIEludmFsaWRhdG9yPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtJbnZhbGlkYXRvci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUludmFsaWRhdG9yO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuSW52YWxpZGF0b3I9SW52YWxpZGF0b3I7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5JbnZhbGlkYXRvcj1JbnZhbGlkYXRvcjt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgQmluZGVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQmluZGVyXCIpID8gZGVwZW5kZW5jaWVzLkJpbmRlciA6IHJlcXVpcmUoJy4vQmluZGVyJyk7XHJcbnZhciBFdmVudEJpbmQgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJFdmVudEJpbmRcIikgPyBkZXBlbmRlbmNpZXMuRXZlbnRCaW5kIDogcmVxdWlyZSgnLi9FdmVudEJpbmQnKTtcclxudmFyIEludmFsaWRhdG9yLCBwbHVjaztcclxucGx1Y2sgPSBmdW5jdGlvbihhcnIsIGZuKSB7XHJcbiAgdmFyIGZvdW5kLCBpbmRleDtcclxuICBpbmRleCA9IGFyci5maW5kSW5kZXgoZm4pO1xyXG4gIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICBmb3VuZCA9IGFycltpbmRleF07XHJcbiAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuSW52YWxpZGF0b3IgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgSW52YWxpZGF0b3IgZXh0ZW5kcyBCaW5kZXIge1xyXG4gICAgY29uc3RydWN0b3IocHJvcGVydHksIG9iaiA9IG51bGwpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xyXG4gICAgICB0aGlzLm9iaiA9IG9iajtcclxuICAgICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMgPSBbXTtcclxuICAgICAgdGhpcy5yZWN5Y2xlZCA9IFtdO1xyXG4gICAgICB0aGlzLnVua25vd25zID0gW107XHJcbiAgICAgIHRoaXMuc3RyaWN0ID0gdGhpcy5jb25zdHJ1Y3Rvci5zdHJpY3Q7XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pbnZhbGlkYXRlQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrLm93bmVyID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpbnZhbGlkYXRlKCkge1xyXG4gICAgICB2YXIgZnVuY3ROYW1lO1xyXG4gICAgICB0aGlzLmludmFsaWRhdGVkID0gdHJ1ZTtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxsYmFjaygpO1xyXG4gICAgICB9IGVsc2UgaWYgKCh0aGlzLnByb3BlcnR5ICE9IG51bGwpICYmIHR5cGVvZiB0aGlzLnByb3BlcnR5LmludmFsaWRhdGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5LmludmFsaWRhdGUoKTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGZ1bmN0TmFtZSA9ICdpbnZhbGlkYXRlJyArIHRoaXMucHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnByb3BlcnR5LnNsaWNlKDEpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vYmpbZnVuY3ROYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmpbZnVuY3ROYW1lXSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmpbdGhpcy5wcm9wZXJ0eV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVua25vd24oKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS51bmtub3duID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eS51bmtub3duKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRCaW5kKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFkZEJpbmRlcihuZXcgRXZlbnRCaW5kKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQmluZGVyKGJpbmRlcikge1xyXG4gICAgICBpZiAoYmluZGVyLmNhbGxiYWNrID09IG51bGwpIHtcclxuICAgICAgICBiaW5kZXIuY2FsbGJhY2sgPSB0aGlzLmludmFsaWRhdGVDYWxsYmFjaztcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuaW52YWxpZGF0aW9uRXZlbnRzLnNvbWUoZnVuY3Rpb24oZXZlbnRCaW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5lcXVhbHMoYmluZGVyKTtcclxuICAgICAgfSkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMucHVzaChwbHVjayh0aGlzLnJlY3ljbGVkLCBmdW5jdGlvbihldmVudEJpbmQpIHtcclxuICAgICAgICAgIHJldHVybiBldmVudEJpbmQuZXF1YWxzKGJpbmRlcik7XHJcbiAgICAgICAgfSkgfHwgYmluZGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVua25vd25DYWxsYmFjayhwcm9wLCB0YXJnZXQpIHtcclxuICAgICAgdmFyIGNhbGxiYWNrO1xyXG4gICAgICBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRVbmtub3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcclxuICAgICAgICB9LCBwcm9wLCB0YXJnZXQpO1xyXG4gICAgICB9O1xyXG4gICAgICBjYWxsYmFjay5yZWYgPSB7XHJcbiAgICAgICAgcHJvcDogcHJvcCxcclxuICAgICAgICB0YXJnZXQ6IHRhcmdldFxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVW5rbm93bihmbiwgcHJvcCwgdGFyZ2V0KSB7XHJcbiAgICAgIGlmICghdGhpcy5maW5kVW5rbm93bihwcm9wLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgZm4ucmVmID0ge1xyXG4gICAgICAgICAgXCJwcm9wXCI6IHByb3AsXHJcbiAgICAgICAgICBcInRhcmdldFwiOiB0YXJnZXRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudW5rbm93bnMucHVzaChmbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5rbm93bigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFVua25vd24ocHJvcCwgdGFyZ2V0KSB7XHJcbiAgICAgIGlmICgocHJvcCAhPSBudWxsKSB8fCAodGFyZ2V0ICE9IG51bGwpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5rbm93bnMuZmluZChmdW5jdGlvbih1bmtub3duKSB7XHJcbiAgICAgICAgICByZXR1cm4gdW5rbm93bi5yZWYucHJvcCA9PT0gcHJvcCAmJiB1bmtub3duLnJlZi50YXJnZXQgPT09IHRhcmdldDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50KGV2ZW50LCB0YXJnZXQgPSB0aGlzLm9iaikge1xyXG4gICAgICBpZiAodGhpcy5jaGVja0VtaXR0ZXIodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEV2ZW50QmluZChldmVudCwgdGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlKHZhbCwgZXZlbnQsIHRhcmdldCA9IHRoaXMub2JqKSB7XHJcbiAgICAgIHRoaXMuZXZlbnQoZXZlbnQsIHRhcmdldCk7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvcChwcm9wLCB0YXJnZXQgPSB0aGlzLm9iaikge1xyXG4gICAgICBpZiAodHlwZW9mIHByb3AgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9wZXJ0eSBuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jaGVja0VtaXR0ZXIodGFyZ2V0KSkge1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRCaW5kKHByb3AgKyAnSW52YWxpZGF0ZWQnLCB0YXJnZXQsIHRoaXMuZ2V0VW5rbm93bkNhbGxiYWNrKHByb3AsIHRhcmdldCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlKHRhcmdldFtwcm9wXSwgcHJvcCArICdVcGRhdGVkJywgdGFyZ2V0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvcEluaXRpYXRlZChwcm9wLCB0YXJnZXQgPSB0aGlzLm9iaikge1xyXG4gICAgICB2YXIgaW5pdGlhdGVkO1xyXG4gICAgICBpbml0aWF0ZWQgPSB0YXJnZXQuZ2V0UHJvcGVydHlJbnN0YW5jZShwcm9wKS5pbml0aWF0ZWQ7XHJcbiAgICAgIGlmICghaW5pdGlhdGVkICYmIHRoaXMuY2hlY2tFbWl0dGVyKHRhcmdldCkpIHtcclxuICAgICAgICB0aGlzLmV2ZW50KHByb3AgKyAnVXBkYXRlZCcsIHRhcmdldCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGluaXRpYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdChmdW5jdCkge1xyXG4gICAgICB2YXIgaW52YWxpZGF0b3IsIHJlcztcclxuICAgICAgaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZFVua25vd24oKCkgPT4ge1xyXG4gICAgICAgICAgdmFyIHJlczI7XHJcbiAgICAgICAgICByZXMyID0gZnVuY3QoaW52YWxpZGF0b3IpO1xyXG4gICAgICAgICAgaWYgKHJlcyAhPT0gcmVzMikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaW52YWxpZGF0b3IpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmVzID0gZnVuY3QoaW52YWxpZGF0b3IpO1xyXG4gICAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKGludmFsaWRhdG9yKTtcclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZVVua25vd25zKHByb3AsIHRhcmdldCA9IHRoaXMub2JqKSB7XHJcbiAgICAgIHZhciB1bmtub3ducztcclxuICAgICAgdW5rbm93bnMgPSB0aGlzLnVua25vd25zO1xyXG4gICAgICB0aGlzLnVua25vd25zID0gW107XHJcbiAgICAgIHJldHVybiB1bmtub3ducy5mb3JFYWNoKGZ1bmN0aW9uKHVua25vd24pIHtcclxuICAgICAgICByZXR1cm4gdW5rbm93bigpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMubGVuZ3RoID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoKSB7XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRCaW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5iaW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlY3ljbGUoY2FsbGJhY2spIHtcclxuICAgICAgdmFyIGRvbmUsIHJlcztcclxuICAgICAgdGhpcy5yZWN5Y2xlZCA9IHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzO1xyXG4gICAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cyA9IFtdO1xyXG4gICAgICBkb25lID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVjeWNsZWQuZm9yRWFjaChmdW5jdGlvbihldmVudEJpbmQpIHtcclxuICAgICAgICAgIHJldHVybiBldmVudEJpbmQudW5iaW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjeWNsZWQgPSBbXTtcclxuICAgICAgfTtcclxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLCBkb25lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzID0gY2FsbGJhY2sodGhpcyk7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZG9uZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRW1pdHRlcihlbWl0dGVyKSB7XHJcbiAgICAgIHJldHVybiBFdmVudEJpbmQuY2hlY2tFbWl0dGVyKGVtaXR0ZXIsIHRoaXMuc3RyaWN0KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50QmluZCkge1xyXG4gICAgICAgIHJldHVybiBldmVudEJpbmQudW5iaW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBJbnZhbGlkYXRvci5zdHJpY3QgPSB0cnVlO1xyXG5cclxuICByZXR1cm4gSW52YWxpZGF0b3I7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxucmV0dXJuKEludmFsaWRhdG9yKTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9JbnZhbGlkYXRvci5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBNaXhhYmxlPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtNaXhhYmxlLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9TWl4YWJsZTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLk1peGFibGU9TWl4YWJsZTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLk1peGFibGU9TWl4YWJsZTt9fX0pKGZ1bmN0aW9uKCl7XHJcbnZhciBNaXhhYmxlLFxyXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mO1xyXG5NaXhhYmxlID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIE1peGFibGUge1xyXG4gICAgc3RhdGljIGV4dGVuZChvYmopIHtcclxuICAgICAgdGhpcy5FeHRlbnNpb24ubWFrZShvYmosIHRoaXMpO1xyXG4gICAgICBpZiAob2JqLnByb3RvdHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLnByb3RvdHlwZSwgdGhpcy5wcm90b3R5cGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5jbHVkZShvYmopIHtcclxuICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLCB0aGlzLnByb3RvdHlwZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBNaXhhYmxlLkV4dGVuc2lvbiA9IHtcclxuICAgIG1ha2U6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICAgIHZhciBpLCBsZW4sIHByb3AsIHJlZjtcclxuICAgICAgcmVmID0gdGhpcy5nZXRFeHRlbnNpb25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0KTtcclxuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgcHJvcCA9IHJlZltpXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wLm5hbWUsIHByb3ApO1xyXG4gICAgICB9XHJcbiAgICAgIHRhcmdldC5leHRlbnNpb25zID0gKHRhcmdldC5leHRlbnNpb25zIHx8IFtdKS5jb25jYXQoW3NvdXJjZV0pO1xyXG4gICAgICBpZiAodHlwZW9mIHNvdXJjZS5leHRlbmRlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBzb3VyY2UuZXh0ZW5kZWQodGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFsd2F5c0ZpbmFsOiBbJ2V4dGVuZGVkJywgJ2V4dGVuc2lvbnMnLCAnX19zdXBlcl9fJywgJ2NvbnN0cnVjdG9yJ10sXHJcbiAgICBnZXRFeHRlbnNpb25Qcm9wZXJ0aWVzOiBmdW5jdGlvbihzb3VyY2UsIHRhcmdldCkge1xyXG4gICAgICB2YXIgYWx3YXlzRmluYWwsIHByb3BzLCB0YXJnZXRDaGFpbjtcclxuICAgICAgYWx3YXlzRmluYWwgPSB0aGlzLmFsd2F5c0ZpbmFsO1xyXG4gICAgICB0YXJnZXRDaGFpbiA9IHRoaXMuZ2V0UHJvdG90eXBlQ2hhaW4odGFyZ2V0KTtcclxuICAgICAgcHJvcHMgPSBbXTtcclxuICAgICAgdGhpcy5nZXRQcm90b3R5cGVDaGFpbihzb3VyY2UpLmV2ZXJ5KGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHZhciBleGNsdWRlO1xyXG4gICAgICAgIGlmICghdGFyZ2V0Q2hhaW4uaW5jbHVkZXMob2JqKSkge1xyXG4gICAgICAgICAgZXhjbHVkZSA9IGFsd2F5c0ZpbmFsO1xyXG4gICAgICAgICAgaWYgKHNvdXJjZS5nZXRGaW5hbFByb3BlcnRpZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBleGNsdWRlID0gZXhjbHVkZS5jb25jYXQoc291cmNlLmdldEZpbmFsUHJvcGVydGllcygpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGV4Y2x1ZGUgPSBleGNsdWRlLmNvbmNhdChbXCJsZW5ndGhcIiwgXCJwcm90b3R5cGVcIiwgXCJuYW1lXCJdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHByb3BzID0gcHJvcHMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKChrZXkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuICF0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCIgJiYgaW5kZXhPZi5jYWxsKGV4Y2x1ZGUsIGtleSkgPCAwICYmICFwcm9wcy5maW5kKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcHJvcC5uYW1lID09PSBrZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgcHJvcDtcclxuICAgICAgICAgICAgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xyXG4gICAgICAgICAgICBwcm9wLm5hbWUgPSBrZXk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgfSxcclxuICAgIGdldFByb3RvdHlwZUNoYWluOiBmdW5jdGlvbihvYmopIHtcclxuICAgICAgdmFyIGJhc2VQcm90b3R5cGUsIGNoYWluO1xyXG4gICAgICBjaGFpbiA9IFtdO1xyXG4gICAgICBiYXNlUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdCk7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgY2hhaW4ucHVzaChvYmopO1xyXG4gICAgICAgIGlmICghKChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgJiYgb2JqICE9PSBPYmplY3QgJiYgb2JqICE9PSBiYXNlUHJvdG90eXBlKSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjaGFpbjtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiBNaXhhYmxlO1xyXG59KS5jYWxsKHRoaXMpO1xyXG5yZXR1cm4oTWl4YWJsZSk7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTWl4YWJsZS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBPdmVycmlkZXI9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO092ZXJyaWRlci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPU92ZXJyaWRlcjt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLk92ZXJyaWRlcj1PdmVycmlkZXI7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5PdmVycmlkZXI9T3ZlcnJpZGVyO319fSkoZnVuY3Rpb24oKXtcclxudmFyIE92ZXJyaWRlcjtcclxuT3ZlcnJpZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIE92ZXJyaWRlciB7XHJcbiAgICBzdGF0aWMgb3ZlcnJpZGVzKG92ZXJyaWRlcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5PdmVycmlkZS5hcHBseU1hbnkodGhpcy5wcm90b3R5cGUsIHRoaXMubmFtZSwgb3ZlcnJpZGVzKTtcclxuICAgIH1cclxuICAgIGdldEZpbmFsUHJvcGVydGllcygpIHtcclxuICAgICAgaWYgKHRoaXMuX292ZXJyaWRlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFsnX292ZXJyaWRlcyddLmNvbmNhdChPYmplY3Qua2V5cyh0aGlzLl9vdmVycmlkZXMpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGV4dGVuZGVkKHRhcmdldCkge1xyXG4gICAgICBpZiAodGhpcy5fb3ZlcnJpZGVzICE9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLk92ZXJyaWRlLmFwcGx5TWFueSh0YXJnZXQsIHRoaXMuY29uc3RydWN0b3IubmFtZSwgdGhpcy5fb3ZlcnJpZGVzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gT3ZlcnJpZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldC5leHRlbmRlZCA9IHRoaXMuZXh0ZW5kZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIE92ZXJyaWRlci5PdmVycmlkZSA9IHtcclxuICAgIG1ha2VNYW55OiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGVzKSB7XHJcbiAgICAgIHZhciBmbiwga2V5LCBvdmVycmlkZSwgcmVzdWx0cztcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcclxuICAgICAgICBmbiA9IG92ZXJyaWRlc1trZXldO1xyXG4gICAgICAgIHJlc3VsdHMucHVzaChvdmVycmlkZSA9IHRoaXMubWFrZSh0YXJnZXQsIG5hbWVzcGFjZSwga2V5LCBmbikpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfSxcclxuICAgIGFwcGx5TWFueTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlcykge1xyXG4gICAgICB2YXIga2V5LCBvdmVycmlkZSwgcmVzdWx0cztcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcclxuICAgICAgICBvdmVycmlkZSA9IG92ZXJyaWRlc1trZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3ZlcnJpZGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgb3ZlcnJpZGUgPSB0aGlzLm1ha2UodGFyZ2V0LCBuYW1lc3BhY2UsIGtleSwgb3ZlcnJpZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRzLnB1c2godGhpcy5hcHBseSh0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGUpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH0sXHJcbiAgICBtYWtlOiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgZm5OYW1lLCBmbikge1xyXG4gICAgICB2YXIgb3ZlcnJpZGU7XHJcbiAgICAgIG92ZXJyaWRlID0ge1xyXG4gICAgICAgIGZuOiB7XHJcbiAgICAgICAgICBjdXJyZW50OiBmblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmFtZTogZm5OYW1lXHJcbiAgICAgIH07XHJcbiAgICAgIG92ZXJyaWRlLmZuWyd3aXRoJyArIG5hbWVzcGFjZV0gPSBmbjtcclxuICAgICAgcmV0dXJuIG92ZXJyaWRlO1xyXG4gICAgfSxcclxuICAgIGVtcHR5Rm46IGZ1bmN0aW9uKCkge30sXHJcbiAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlKSB7XHJcbiAgICAgIHZhciBmbk5hbWUsIG92ZXJyaWRlcywgcmVmLCByZWYxLCB3aXRob3V0O1xyXG4gICAgICBmbk5hbWUgPSBvdmVycmlkZS5uYW1lO1xyXG4gICAgICBvdmVycmlkZXMgPSB0YXJnZXQuX292ZXJyaWRlcyAhPSBudWxsID8gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0Ll9vdmVycmlkZXMpIDoge307XHJcbiAgICAgIHdpdGhvdXQgPSAoKHJlZiA9IHRhcmdldC5fb3ZlcnJpZGVzKSAhPSBudWxsID8gKHJlZjEgPSByZWZbZm5OYW1lXSkgIT0gbnVsbCA/IHJlZjEuZm4uY3VycmVudCA6IHZvaWQgMCA6IHZvaWQgMCkgfHwgdGFyZ2V0W2ZuTmFtZV07XHJcbiAgICAgIG92ZXJyaWRlID0gT2JqZWN0LmFzc2lnbih7fSwgb3ZlcnJpZGUpO1xyXG4gICAgICBpZiAob3ZlcnJpZGVzW2ZuTmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgIG92ZXJyaWRlLmZuID0gT2JqZWN0LmFzc2lnbih7fSwgb3ZlcnJpZGVzW2ZuTmFtZV0uZm4sIG92ZXJyaWRlLmZuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvdmVycmlkZS5mbiA9IE9iamVjdC5hc3NpZ24oe30sIG92ZXJyaWRlLmZuKTtcclxuICAgICAgfVxyXG4gICAgICBvdmVycmlkZS5mblsnd2l0aG91dCcgKyBuYW1lc3BhY2VdID0gd2l0aG91dCB8fCB0aGlzLmVtcHR5Rm47XHJcbiAgICAgIGlmICh3aXRob3V0ID09IG51bGwpIHtcclxuICAgICAgICBvdmVycmlkZS5taXNzaW5nV2l0aG91dCA9ICd3aXRob3V0JyArIG5hbWVzcGFjZTtcclxuICAgICAgfSBlbHNlIGlmIChvdmVycmlkZS5taXNzaW5nV2l0aG91dCkge1xyXG4gICAgICAgIG92ZXJyaWRlLmZuW292ZXJyaWRlLm1pc3NpbmdXaXRob3V0XSA9IHdpdGhvdXQ7XHJcbiAgICAgIH1cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZm5OYW1lLCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgZmluYWxGbiwgZm4sIGtleSwgcmVmMjtcclxuICAgICAgICAgIGZpbmFsRm4gPSBvdmVycmlkZS5mbi5jdXJyZW50LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICByZWYyID0gb3ZlcnJpZGUuZm47XHJcbiAgICAgICAgICBmb3IgKGtleSBpbiByZWYyKSB7XHJcbiAgICAgICAgICAgIGZuID0gcmVmMltrZXldO1xyXG4gICAgICAgICAgICBmaW5hbEZuW2tleV0gPSBmbi5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBmbk5hbWUsIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogZmluYWxGblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmaW5hbEZuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG92ZXJyaWRlc1tmbk5hbWVdID0gb3ZlcnJpZGU7XHJcbiAgICAgIHJldHVybiB0YXJnZXQuX292ZXJyaWRlcyA9IG92ZXJyaWRlcztcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiBPdmVycmlkZXI7XHJcbn0pLmNhbGwodGhpcyk7XHJcbnJldHVybihPdmVycmlkZXIpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL092ZXJyaWRlci5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBQcm9wZXJ0eT1kZWZpbml0aW9uKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCI/U3Bhcms6dGhpcy5TcGFyayk7UHJvcGVydHkuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1Qcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLlByb3BlcnR5PVByb3BlcnR5O31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuUHJvcGVydHk9UHJvcGVydHk7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cclxudmFyIEJhc2ljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJCYXNpY1Byb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkJhc2ljUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQmFzaWNQcm9wZXJ0eScpO1xyXG52YXIgQ29sbGVjdGlvblByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQ29sbGVjdGlvblByb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkNvbGxlY3Rpb25Qcm9wZXJ0eSA6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9Db2xsZWN0aW9uUHJvcGVydHknKTtcclxudmFyIENvbXBvc2VkUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDb21wb3NlZFByb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkNvbXBvc2VkUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQ29tcG9zZWRQcm9wZXJ0eScpO1xyXG52YXIgRHluYW1pY1Byb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRHluYW1pY1Byb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkR5bmFtaWNQcm9wZXJ0eSA6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9EeW5hbWljUHJvcGVydHknKTtcclxudmFyIENhbGN1bGF0ZWRQcm9wZXJ0eSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkNhbGN1bGF0ZWRQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5DYWxjdWxhdGVkUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQ2FsY3VsYXRlZFByb3BlcnR5Jyk7XHJcbnZhciBJbnZhbGlkYXRlZFByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiSW52YWxpZGF0ZWRQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRlZFByb3BlcnR5IDogcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0ludmFsaWRhdGVkUHJvcGVydHknKTtcclxudmFyIEFjdGl2YWJsZVByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQWN0aXZhYmxlUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuQWN0aXZhYmxlUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQWN0aXZhYmxlUHJvcGVydHknKTtcclxudmFyIFVwZGF0ZWRQcm9wZXJ0eSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIlVwZGF0ZWRQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5VcGRhdGVkUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvVXBkYXRlZFByb3BlcnR5Jyk7XHJcbnZhciBQcm9wZXJ0eU93bmVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiUHJvcGVydHlPd25lclwiKSA/IGRlcGVuZGVuY2llcy5Qcm9wZXJ0eU93bmVyIDogcmVxdWlyZSgnLi9Qcm9wZXJ0eU93bmVyJyk7XHJcbnZhciBNaXhhYmxlID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiTWl4YWJsZVwiKSA/IGRlcGVuZGVuY2llcy5NaXhhYmxlIDogcmVxdWlyZSgnLi9NaXhhYmxlJyk7XHJcbnZhciBQcm9wZXJ0eTtcclxuUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgUHJvcGVydHkge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZCh0YXJnZXQpIHtcclxuICAgICAgdmFyIHBhcmVudCwgcHJvcDtcclxuICAgICAgcHJvcCA9IHRoaXM7XHJcbiAgICAgIGlmICghKHR5cGVvZiB0YXJnZXQuZ2V0UHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgdGFyZ2V0LmdldFByb3BlcnR5KHRoaXMubmFtZSkgPT09IHRoaXMpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQuZ2V0UHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgKChwYXJlbnQgPSB0YXJnZXQuZ2V0UHJvcGVydHkodGhpcy5uYW1lKSkgIT0gbnVsbCkpIHtcclxuICAgICAgICAgIHRoaXMub3ZlcnJpZGUocGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZVR5cGUoKS5iaW5kKHRhcmdldCwgcHJvcCk7XHJcbiAgICAgICAgdGFyZ2V0Ll9wcm9wZXJ0aWVzID0gKHRhcmdldC5fcHJvcGVydGllcyB8fCBbXSkuY29uY2F0KFtwcm9wXSk7XHJcbiAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0YXJnZXQuX3Byb3BlcnRpZXMgPSB0YXJnZXQuX3Byb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uKGV4aXN0aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZyAhPT0gcGFyZW50O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFrZU93bmVyKHRhcmdldCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGUocGFyZW50KSB7XHJcbiAgICAgIHZhciBrZXksIHJlZiwgcmVzdWx0cywgdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50ID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGFyZW50ID0gcGFyZW50Lm9wdGlvbnM7XHJcbiAgICAgICAgcmVmID0gcGFyZW50Lm9wdGlvbnM7XHJcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIGZvciAoa2V5IGluIHJlZikge1xyXG4gICAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zW2tleV0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLm9wdGlvbnNba2V5XS5vdmVycmlkZWQgPSB2YWx1ZSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMub3B0aW9uc1trZXldID0gdmFsdWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHZvaWQgMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZU93bmVyKHRhcmdldCkge1xyXG4gICAgICB2YXIgcmVmO1xyXG4gICAgICBpZiAoISgocmVmID0gdGFyZ2V0LmV4dGVuc2lvbnMpICE9IG51bGwgPyByZWYuaW5jbHVkZXMoUHJvcGVydHlPd25lci5wcm90b3R5cGUpIDogdm9pZCAwKSkge1xyXG4gICAgICAgIHJldHVybiBNaXhhYmxlLkV4dGVuc2lvbi5tYWtlKFByb3BlcnR5T3duZXIucHJvdG90eXBlLCB0YXJnZXQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5zdGFuY2VWYXJOYW1lKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmluc3RhbmNlVmFyTmFtZSB8fCAnXycgKyB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbnN0YW50aWF0ZWQob2JqKSB7XHJcbiAgICAgIHJldHVybiBvYmpbdGhpcy5nZXRJbnN0YW5jZVZhck5hbWUoKV0gIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnN0YW5jZShvYmopIHtcclxuICAgICAgdmFyIFR5cGUsIHZhck5hbWU7XHJcbiAgICAgIHZhck5hbWUgPSB0aGlzLmdldEluc3RhbmNlVmFyTmFtZSgpO1xyXG4gICAgICBpZiAoIXRoaXMuaXNJbnN0YW50aWF0ZWQob2JqKSkge1xyXG4gICAgICAgIFR5cGUgPSB0aGlzLmdldEluc3RhbmNlVHlwZSgpO1xyXG4gICAgICAgIG9ialt2YXJOYW1lXSA9IG5ldyBUeXBlKHRoaXMsIG9iaik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9ialt2YXJOYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnN0YW5jZVR5cGUoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnN0YW5jZVR5cGUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvc2Vycy5mb3JFYWNoKChjb21wb3NlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmNvbXBvc2UodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VUeXBlO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBQcm9wZXJ0eS5wcm90b3R5cGUuY29tcG9zZXJzID0gW0NvbXBvc2VkUHJvcGVydHksIENvbGxlY3Rpb25Qcm9wZXJ0eSwgRHluYW1pY1Byb3BlcnR5LCBCYXNpY1Byb3BlcnR5LCBVcGRhdGVkUHJvcGVydHksIENhbGN1bGF0ZWRQcm9wZXJ0eSwgSW52YWxpZGF0ZWRQcm9wZXJ0eSwgQWN0aXZhYmxlUHJvcGVydHldO1xyXG5cclxuICByZXR1cm4gUHJvcGVydHk7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxucmV0dXJuKFByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Qcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBQcm9wZXJ0eU93bmVyPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtQcm9wZXJ0eU93bmVyLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9UHJvcGVydHlPd25lcjt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLlByb3BlcnR5T3duZXI9UHJvcGVydHlPd25lcjt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLlByb3BlcnR5T3duZXI9UHJvcGVydHlPd25lcjt9fX0pKGZ1bmN0aW9uKCl7XHJcbnZhciBQcm9wZXJ0eU93bmVyO1xyXG5Qcm9wZXJ0eU93bmVyID0gY2xhc3MgUHJvcGVydHlPd25lciB7XHJcbiAgZ2V0UHJvcGVydHkobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXMgJiYgdGhpcy5fcHJvcGVydGllcy5maW5kKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgcmV0dXJuIHByb3AubmFtZSA9PT0gbmFtZTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBnZXRQcm9wZXJ0eUluc3RhbmNlKG5hbWUpIHtcclxuICAgIHZhciByZXM7XHJcbiAgICByZXMgPSB0aGlzLmdldFByb3BlcnR5KG5hbWUpO1xyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICByZXR1cm4gcmVzLmdldEluc3RhbmNlKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRQcm9wZXJ0aWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXMuc2xpY2UoKTtcclxuICB9XHJcbiAgZ2V0UHJvcGVydHlJbnN0YW5jZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcy5tYXAoKHByb3ApID0+IHtcclxuICAgICAgcmV0dXJuIHByb3AuZ2V0SW5zdGFuY2UodGhpcyk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZ2V0SW5zdGFudGlhdGVkUHJvcGVydGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzLmZpbHRlcigocHJvcCkgPT4ge1xyXG4gICAgICByZXR1cm4gcHJvcC5pc0luc3RhbnRpYXRlZCh0aGlzKTtcclxuICAgIH0pLm1hcCgocHJvcCkgPT4ge1xyXG4gICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBnZXRNYW51YWxEYXRhUHJvcGVydGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzLnJlZHVjZSgocmVzLCBwcm9wKSA9PiB7XHJcbiAgICAgIHZhciBpbnN0YW5jZTtcclxuICAgICAgaWYgKHByb3AuaXNJbnN0YW50aWF0ZWQodGhpcykpIHtcclxuICAgICAgICBpbnN0YW5jZSA9IHByb3AuZ2V0SW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgaWYgKGluc3RhbmNlLmNhbGN1bGF0ZWQgJiYgaW5zdGFuY2UubWFudWFsKSB7XHJcbiAgICAgICAgICByZXNbcHJvcC5uYW1lXSA9IGluc3RhbmNlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfSwge30pO1xyXG4gIH1cclxuICBzZXRQcm9wZXJ0aWVzKGRhdGEsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgdmFyIGtleSwgcHJvcCwgdmFsO1xyXG4gICAgZm9yIChrZXkgaW4gZGF0YSkge1xyXG4gICAgICB2YWwgPSBkYXRhW2tleV07XHJcbiAgICAgIGlmICgoKG9wdGlvbnMud2hpdGVsaXN0ID09IG51bGwpIHx8IG9wdGlvbnMud2hpdGVsaXN0LmluZGV4T2Yoa2V5KSAhPT0gLTEpICYmICgob3B0aW9ucy5ibGFja2xpc3QgPT0gbnVsbCkgfHwgb3B0aW9ucy5ibGFja2xpc3QuaW5kZXhPZihrZXkpID09PSAtMSkpIHtcclxuICAgICAgICBwcm9wID0gdGhpcy5nZXRQcm9wZXJ0eUluc3RhbmNlKGtleSk7XHJcbiAgICAgICAgaWYgKHByb3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgcHJvcC5zZXQodmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBkZXN0cm95UHJvcGVydGllcygpIHtcclxuICAgIHRoaXMuZ2V0SW5zdGFudGlhdGVkUHJvcGVydGllcygpLmZvckVhY2goKHByb3ApID0+IHtcclxuICAgICAgcmV0dXJuIHByb3AuZGVzdHJveSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgbGlzdGVuZXJBZGRlZChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3ApID0+IHtcclxuICAgICAgaWYgKHByb3AuZ2V0SW5zdGFuY2VUeXBlKCkucHJvdG90eXBlLmNoYW5nZUV2ZW50TmFtZSA9PT0gZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5nZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGV4dGVuZGVkKHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldC5saXN0ZW5lckFkZGVkID0gdGhpcy5saXN0ZW5lckFkZGVkO1xyXG4gIH1cclxufTtcclxucmV0dXJuKFByb3BlcnR5T3duZXIpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1Byb3BlcnR5T3duZXIuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgQWN0aXZhYmxlUHJvcGVydHk9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0FjdGl2YWJsZVByb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9QWN0aXZhYmxlUHJvcGVydHk7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5BY3RpdmFibGVQcm9wZXJ0eT1BY3RpdmFibGVQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkFjdGl2YWJsZVByb3BlcnR5PUFjdGl2YWJsZVByb3BlcnR5O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBJbnZhbGlkYXRvciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkludmFsaWRhdG9yXCIpID8gZGVwZW5kZW5jaWVzLkludmFsaWRhdG9yIDogcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcclxudmFyIEJhc2ljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJCYXNpY1Byb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkJhc2ljUHJvcGVydHkgOiByZXF1aXJlKCcuL0Jhc2ljUHJvcGVydHknKTtcclxudmFyIE92ZXJyaWRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIk92ZXJyaWRlclwiKSA/IGRlcGVuZGVuY2llcy5PdmVycmlkZXIgOiByZXF1aXJlKCcuLi9PdmVycmlkZXInKTtcclxudmFyIEFjdGl2YWJsZVByb3BlcnR5O1xyXG5BY3RpdmFibGVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcclxuICBjbGFzcyBBY3RpdmFibGVQcm9wZXJ0eSBleHRlbmRzIEJhc2ljUHJvcGVydHkge1xyXG4gICAgaXNBY3RpdmUoKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1hbnVhbEFjdGl2ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxiYWNrQWN0aXZlKCkge1xyXG4gICAgICB2YXIgaW52YWxpZGF0b3I7XHJcbiAgICAgIGludmFsaWRhdG9yID0gdGhpcy5hY3RpdmVJbnZhbGlkYXRvciB8fCBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5vYmopO1xyXG4gICAgICBpbnZhbGlkYXRvci5yZWN5Y2xlKChpbnZhbGlkYXRvciwgZG9uZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5jYWxsT3B0aW9uRnVuY3QodGhpcy5hY3RpdmVGdW5jdCwgaW52YWxpZGF0b3IpO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmUgfHwgaW52YWxpZGF0b3IuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICBpbnZhbGlkYXRvci51bmJpbmQoKTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUludmFsaWRhdG9yID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IGludmFsaWRhdG9yO1xyXG4gICAgICAgICAgdGhpcy5hY3RpdmVJbnZhbGlkYXRvciA9IGludmFsaWRhdG9yO1xyXG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLmJpbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbXBvc2UocHJvcCkge1xyXG4gICAgICBpZiAodHlwZW9mIHByb3Aub3B0aW9ucy5hY3RpdmUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBwcm9wLmluc3RhbmNlVHlwZS5leHRlbmQoQWN0aXZhYmxlUHJvcGVydHkpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmFjdGl2ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5hY3RpdmUgPSBwcm9wLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgICAgICAgcmV0dXJuIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IHRoaXMucHJvdG90eXBlLm1hbnVhbEFjdGl2ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9wLm9wdGlvbnMuYWN0aXZlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuYWN0aXZlRnVuY3QgPSBwcm9wLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgICAgICAgcmV0dXJuIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IHRoaXMucHJvdG90eXBlLmNhbGxiYWNrQWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBBY3RpdmFibGVQcm9wZXJ0eS5leHRlbmQoT3ZlcnJpZGVyKTtcclxuXHJcbiAgQWN0aXZhYmxlUHJvcGVydHkub3ZlcnJpZGVzKHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBvdXQ7XHJcbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICBvdXQgPSB0aGlzLmdldC53aXRob3V0QWN0aXZhYmxlUHJvcGVydHkoKTtcclxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nQ2hhbmdlcykge1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VkKHRoaXMucGVuZGluZ09sZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VkOiBmdW5jdGlvbihvbGQpIHtcclxuICAgICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0NoYW5nZXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBlbmRpbmdPbGQgPSB2b2lkIDA7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkLndpdGhvdXRBY3RpdmFibGVQcm9wZXJ0eShvbGQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0NoYW5nZXMgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wZW5kaW5nT2xkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpcy5wZW5kaW5nT2xkID0gb2xkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIEFjdGl2YWJsZVByb3BlcnR5O1xyXG5cclxufSkuY2FsbCh0aGlzKTtcclxuXHJcbnJldHVybihBY3RpdmFibGVQcm9wZXJ0eSk7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvUHJvcGVydHlUeXBlcy9BY3RpdmFibGVQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBCYXNpY1Byb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtCYXNpY1Byb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9QmFzaWNQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkJhc2ljUHJvcGVydHk9QmFzaWNQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkJhc2ljUHJvcGVydHk9QmFzaWNQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgTWl4YWJsZSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIk1peGFibGVcIikgPyBkZXBlbmRlbmNpZXMuTWl4YWJsZSA6IHJlcXVpcmUoJy4uL01peGFibGUnKTtcclxudmFyIEJhc2ljUHJvcGVydHk7XHJcbkJhc2ljUHJvcGVydHkgPSBjbGFzcyBCYXNpY1Byb3BlcnR5IGV4dGVuZHMgTWl4YWJsZSB7XHJcbiAgY29uc3RydWN0b3IocHJvcGVydHksIG9iaikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcclxuICAgIHRoaXMub2JqID0gb2JqO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuaW5nZXN0KHRoaXMuZGVmYXVsdCk7XHJcbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQoKSB7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KCk7XHJcbiAgfVxyXG5cclxuICBzZXQodmFsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXRBbmRDaGVja0NoYW5nZXModmFsKTtcclxuICB9XHJcblxyXG4gIGNhbGxiYWNrU2V0KHZhbCkge1xyXG4gICAgdGhpcy5jYWxsT3B0aW9uRnVuY3QoXCJzZXRcIiwgdmFsKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2V0QW5kQ2hlY2tDaGFuZ2VzKHZhbCkge1xyXG4gICAgdmFyIG9sZDtcclxuICAgIHZhbCA9IHRoaXMuaW5nZXN0KHZhbCk7XHJcbiAgICB0aGlzLnJldmFsaWRhdGVkKCk7XHJcbiAgICBpZiAodGhpcy5jaGVja0NoYW5nZXModmFsLCB0aGlzLnZhbHVlKSkge1xyXG4gICAgICBvbGQgPSB0aGlzLnZhbHVlO1xyXG4gICAgICB0aGlzLnZhbHVlID0gdmFsO1xyXG4gICAgICB0aGlzLm1hbnVhbCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjaGVja0NoYW5nZXModmFsLCBvbGQpIHtcclxuICAgIHJldHVybiB2YWwgIT09IG9sZDtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7fVxyXG5cclxuICBjYWxsT3B0aW9uRnVuY3QoZnVuY3QsIC4uLmFyZ3MpIHtcclxuICAgIGlmICh0eXBlb2YgZnVuY3QgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZ1bmN0ID0gdGhpcy5wcm9wZXJ0eS5vcHRpb25zW2Z1bmN0XTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgZnVuY3Qub3ZlcnJpZGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGFyZ3MucHVzaCgoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxPcHRpb25GdW5jdChmdW5jdC5vdmVycmlkZWQsIC4uLmFyZ3MpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdC5hcHBseSh0aGlzLm9iaiwgYXJncyk7XHJcbiAgfVxyXG5cclxuICByZXZhbGlkYXRlZCgpIHtcclxuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWU7XHJcbiAgICByZXR1cm4gdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaW5nZXN0KHZhbCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaW5nZXN0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB2YWwgPSB0aGlzLmNhbGxPcHRpb25GdW5jdChcImluZ2VzdFwiLCB2YWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG91dHB1dCgpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLm91dHB1dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWxsT3B0aW9uRnVuY3QoXCJvdXRwdXRcIiwgdGhpcy52YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZWQob2xkKSB7XHJcbiAgICB0aGlzLmNhbGxDaGFuZ2VkRnVuY3Rpb25zKG9sZCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub2JqLmVtaXRFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9iai5lbWl0RXZlbnQodGhpcy51cGRhdGVFdmVudE5hbWUsIFtvbGRdKTtcclxuICAgICAgdGhpcy5vYmouZW1pdEV2ZW50KHRoaXMuY2hhbmdlRXZlbnROYW1lLCBbb2xkXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNhbGxDaGFuZ2VkRnVuY3Rpb25zKG9sZCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuY2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhbGxPcHRpb25GdW5jdChcImNoYW5nZVwiLCBvbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzQ2hhbmdlZEZ1bmN0aW9ucygpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmNoYW5nZSA9PT0gJ2Z1bmN0aW9uJztcclxuICB9XHJcblxyXG4gIGhhc0NoYW5nZWRFdmVudHMoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMub2JqLmdldExpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLm9iai5nZXRMaXN0ZW5lcnModGhpcy5jaGFuZ2VFdmVudE5hbWUpLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICBpZiAocHJvcC5pbnN0YW5jZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICBwcm9wLmluc3RhbmNlVHlwZSA9IGNsYXNzIGV4dGVuZHMgQmFzaWNQcm9wZXJ0eSB7fTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuc2V0ID0gdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tTZXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuc2V0ID0gdGhpcy5wcm90b3R5cGUuc2V0QW5kQ2hlY2tDaGFuZ2VzO1xyXG4gICAgfVxyXG4gICAgcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmRlZmF1bHQgPSBwcm9wLm9wdGlvbnMuZGVmYXVsdDtcclxuICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5pbml0aWF0ZWQgPSB0eXBlb2YgcHJvcC5vcHRpb25zLmRlZmF1bHQgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0RXZlbnROYW1lcyhwcm9wKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzZXRFdmVudE5hbWVzKHByb3ApIHtcclxuICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5jaGFuZ2VFdmVudE5hbWUgPSBwcm9wLm9wdGlvbnMuY2hhbmdlRXZlbnROYW1lIHx8IHByb3AubmFtZSArICdDaGFuZ2VkJztcclxuICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS51cGRhdGVFdmVudE5hbWUgPSBwcm9wLm9wdGlvbnMudXBkYXRlRXZlbnROYW1lIHx8IHByb3AubmFtZSArICdVcGRhdGVkJztcclxuICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuaW52YWxpZGF0ZUV2ZW50TmFtZSA9IHByb3Aub3B0aW9ucy5pbnZhbGlkYXRlRXZlbnROYW1lIHx8IHByb3AubmFtZSArICdJbnZhbGlkYXRlZCc7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYmluZCh0YXJnZXQsIHByb3ApIHtcclxuICAgIHZhciBtYWosIG9wdDtcclxuICAgIG1haiA9IHByb3AubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3AubmFtZS5zbGljZSgxKTtcclxuICAgIG9wdCA9IHtcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLmdldEluc3RhbmNlKHRoaXMpLmdldCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYgKHByb3Aub3B0aW9ucy5zZXQgIT09IGZhbHNlKSB7XHJcbiAgICAgIG9wdC5zZXQgPSBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5zZXQodmFsKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AubmFtZSwgb3B0KTtcclxuICAgIHRhcmdldFsnZ2V0JyArIG1hal0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHByb3AuZ2V0SW5zdGFuY2UodGhpcykuZ2V0KCk7XHJcbiAgICB9O1xyXG4gICAgaWYgKHByb3Aub3B0aW9ucy5zZXQgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRhcmdldFsnc2V0JyArIG1hal0gPSBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBwcm9wLmdldEluc3RhbmNlKHRoaXMpLnNldCh2YWwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldFsnaW52YWxpZGF0ZScgKyBtYWpdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3AuZ2V0SW5zdGFuY2UodGhpcykuaW52YWxpZGF0ZSgpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbnJldHVybihCYXNpY1Byb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0Jhc2ljUHJvcGVydHkuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgQ2FsY3VsYXRlZFByb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtDYWxjdWxhdGVkUHJvcGVydHkuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1DYWxjdWxhdGVkUHJvcGVydHk7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5DYWxjdWxhdGVkUHJvcGVydHk9Q2FsY3VsYXRlZFByb3BlcnR5O31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuQ2FsY3VsYXRlZFByb3BlcnR5PUNhbGN1bGF0ZWRQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgSW52YWxpZGF0b3IgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJJbnZhbGlkYXRvclwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRvciA6IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJyk7XHJcbnZhciBEeW5hbWljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJEeW5hbWljUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuRHluYW1pY1Byb3BlcnR5IDogcmVxdWlyZSgnLi9EeW5hbWljUHJvcGVydHknKTtcclxudmFyIE92ZXJyaWRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIk92ZXJyaWRlclwiKSA/IGRlcGVuZGVuY2llcy5PdmVycmlkZXIgOiByZXF1aXJlKCcuLi9PdmVycmlkZXInKTtcclxudmFyIENhbGN1bGF0ZWRQcm9wZXJ0eTtcclxuQ2FsY3VsYXRlZFByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIENhbGN1bGF0ZWRQcm9wZXJ0eSBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eSB7XHJcbiAgICBjYWxjdWwoKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNhbGxPcHRpb25GdW5jdCh0aGlzLmNhbGN1bEZ1bmN0KTtcclxuICAgICAgdGhpcy5tYW51YWwgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZXZhbGlkYXRlZCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5jYWxjdWxGdW5jdCA9IHByb3Aub3B0aW9ucy5jYWxjdWw7XHJcbiAgICAgICAgaWYgKCEocHJvcC5vcHRpb25zLmNhbGN1bC5sZW5ndGggPiAwKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHByb3AuaW5zdGFuY2VUeXBlLmV4dGVuZChDYWxjdWxhdGVkUHJvcGVydHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBDYWxjdWxhdGVkUHJvcGVydHkuZXh0ZW5kKE92ZXJyaWRlcik7XHJcblxyXG4gIENhbGN1bGF0ZWRQcm9wZXJ0eS5vdmVycmlkZXMoe1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGluaXRpYXRlZCwgb2xkO1xyXG4gICAgICBpZiAodGhpcy5pbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IudmFsaWRhdGVVbmtub3ducygpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XHJcbiAgICAgICAgb2xkID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpbml0aWF0ZWQgPSB0aGlzLmluaXRpYXRlZDtcclxuICAgICAgICB0aGlzLmNhbGN1bCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQ2hhbmdlcyh0aGlzLnZhbHVlLCBvbGQpKSB7XHJcbiAgICAgICAgICBpZiAoaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5vYmouZW1pdEV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqLmVtaXRFdmVudCh0aGlzLnVwZGF0ZUV2ZW50TmFtZSwgW29sZF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIENhbGN1bGF0ZWRQcm9wZXJ0eTtcclxuXHJcbn0pLmNhbGwodGhpcyk7XHJcblxyXG5yZXR1cm4oQ2FsY3VsYXRlZFByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0NhbGN1bGF0ZWRQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBDb2xsZWN0aW9uUHJvcGVydHk9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0NvbGxlY3Rpb25Qcm9wZXJ0eS5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUNvbGxlY3Rpb25Qcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkNvbGxlY3Rpb25Qcm9wZXJ0eT1Db2xsZWN0aW9uUHJvcGVydHk7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5Db2xsZWN0aW9uUHJvcGVydHk9Q29sbGVjdGlvblByb3BlcnR5O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBEeW5hbWljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJEeW5hbWljUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuRHluYW1pY1Byb3BlcnR5IDogcmVxdWlyZSgnLi9EeW5hbWljUHJvcGVydHknKTtcclxudmFyIENvbGxlY3Rpb24gPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDb2xsZWN0aW9uXCIpID8gZGVwZW5kZW5jaWVzLkNvbGxlY3Rpb24gOiByZXF1aXJlKCcuLi9Db2xsZWN0aW9uJyk7XHJcbnZhciBDb2xsZWN0aW9uUHJvcGVydHk7XHJcbkNvbGxlY3Rpb25Qcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcclxuICBjbGFzcyBDb2xsZWN0aW9uUHJvcGVydHkgZXh0ZW5kcyBEeW5hbWljUHJvcGVydHkge1xyXG4gICAgaW5nZXN0KHZhbCkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcGVydHkub3B0aW9ucy5pbmdlc3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB2YWwgPSB0aGlzLmNhbGxPcHRpb25GdW5jdChcImluZ2VzdFwiLCB2YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsLnRvQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdmFsLnRvQXJyYXkoKTtcclxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgICByZXR1cm4gdmFsLnNsaWNlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFt2YWxdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tDaGFuZ2VkSXRlbXModmFsLCBvbGQpIHtcclxuICAgICAgdmFyIGNvbXBhcmVGdW5jdGlvbjtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbXBhcmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb21wYXJlRnVuY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbXBhcmU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIChuZXcgQ29sbGVjdGlvbih2YWwpKS5jaGVja0NoYW5nZXMob2xkLCB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLm9yZGVyZWQsIGNvbXBhcmVGdW5jdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0cHV0KCkge1xyXG4gICAgICB2YXIgY29sLCBwcm9wLCB2YWx1ZTtcclxuICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcGVydHkub3B0aW9ucy5vdXRwdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwib3V0cHV0XCIsIHRoaXMudmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHByb3AgPSB0aGlzO1xyXG4gICAgICBjb2wgPSBDb2xsZWN0aW9uLm5ld1N1YkNsYXNzKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMsIHZhbHVlKTtcclxuICAgICAgY29sLmNoYW5nZWQgPSBmdW5jdGlvbihvbGQpIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5jaGFuZ2VkKG9sZCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBjb2w7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbENoYW5nZWRGdW5jdGlvbnMob2xkKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLml0ZW1BZGRlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMudmFsdWUuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFvbGQuaW5jbHVkZXMoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiaXRlbUFkZGVkXCIsIGl0ZW0sIGkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLml0ZW1SZW1vdmVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgb2xkLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgIGlmICghdGhpcy52YWx1ZS5pbmNsdWRlcyhpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsT3B0aW9uRnVuY3QoXCJpdGVtUmVtb3ZlZFwiLCBpdGVtLCBpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VwZXIuY2FsbENoYW5nZWRGdW5jdGlvbnMob2xkKTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNDaGFuZ2VkRnVuY3Rpb25zKCkge1xyXG4gICAgICByZXR1cm4gc3VwZXIuaGFzQ2hhbmdlZEZ1bmN0aW9ucygpIHx8IHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaXRlbUFkZGVkID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaXRlbVJlbW92ZWQgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbXBvc2UocHJvcCkge1xyXG4gICAgICBpZiAocHJvcC5vcHRpb25zLmNvbGxlY3Rpb24gIT0gbnVsbCkge1xyXG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlID0gY2xhc3MgZXh0ZW5kcyBDb2xsZWN0aW9uUHJvcGVydHkge307XHJcbiAgICAgICAgcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmNvbGxlY3Rpb25PcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0Q29sbGVjdGlvbk9wdGlvbnMsIHR5cGVvZiBwcm9wLm9wdGlvbnMuY29sbGVjdGlvbiA9PT0gJ29iamVjdCcgPyBwcm9wLm9wdGlvbnMuY29sbGVjdGlvbiA6IHt9KTtcclxuICAgICAgICBpZiAocHJvcC5vcHRpb25zLmNvbGxlY3Rpb24uY29tcGFyZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmNoZWNrQ2hhbmdlcyA9IHRoaXMucHJvdG90eXBlLmNoZWNrQ2hhbmdlZEl0ZW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBDb2xsZWN0aW9uUHJvcGVydHkuZGVmYXVsdENvbGxlY3Rpb25PcHRpb25zID0ge1xyXG4gICAgY29tcGFyZTogZmFsc2UsXHJcbiAgICBvcmRlcmVkOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIENvbGxlY3Rpb25Qcm9wZXJ0eTtcclxuXHJcbn0pLmNhbGwodGhpcyk7XHJcblxyXG5yZXR1cm4oQ29sbGVjdGlvblByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0NvbGxlY3Rpb25Qcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBDb21wb3NlZFByb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtDb21wb3NlZFByb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9Q29tcG9zZWRQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkNvbXBvc2VkUHJvcGVydHk9Q29tcG9zZWRQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkNvbXBvc2VkUHJvcGVydHk9Q29tcG9zZWRQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgQ2FsY3VsYXRlZFByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQ2FsY3VsYXRlZFByb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkNhbGN1bGF0ZWRQcm9wZXJ0eSA6IHJlcXVpcmUoJy4vQ2FsY3VsYXRlZFByb3BlcnR5Jyk7XHJcbnZhciBJbnZhbGlkYXRvciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkludmFsaWRhdG9yXCIpID8gZGVwZW5kZW5jaWVzLkludmFsaWRhdG9yIDogcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcclxudmFyIENvbGxlY3Rpb24gPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDb2xsZWN0aW9uXCIpID8gZGVwZW5kZW5jaWVzLkNvbGxlY3Rpb24gOiByZXF1aXJlKCcuLi9Db2xsZWN0aW9uJyk7XHJcbnZhciBDb21wb3NlZFByb3BlcnR5O1xyXG5Db21wb3NlZFByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIENvbXBvc2VkUHJvcGVydHkgZXh0ZW5kcyBDYWxjdWxhdGVkUHJvcGVydHkge1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgc3VwZXIuaW5pdCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5pbml0Q29tcG9zZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q29tcG9zZWQoKSB7XHJcbiAgICAgIGlmICh0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSkge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IHRoaXMucHJvcGVydHkub3B0aW9ucy5kZWZhdWx0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IHRoaXMudmFsdWUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWVtYmVycyA9IG5ldyBDb21wb3NlZFByb3BlcnR5Lk1lbWJlcnModGhpcy5wcm9wZXJ0eS5vcHRpb25zLm1lbWJlcnMpO1xyXG4gICAgICB0aGlzLm1lbWJlcnMuY2hhbmdlZCA9IChvbGQpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB0aGlzLmpvaW4gPSB0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmNvbXBvc2VkID09PSAnZnVuY3Rpb24nID8gdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmNvbXBvc2VkIDogdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmRlZmF1bHQgPT09IGZhbHNlID8gQ29tcG9zZWRQcm9wZXJ0eS5qb2luRnVuY3Rpb25zLm9yIDogQ29tcG9zZWRQcm9wZXJ0eS5qb2luRnVuY3Rpb25zLmFuZDtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWwoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5vYmopO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tZW1iZXJzLnJlZHVjZSgocHJldiwgbWVtYmVyKSA9PiB7XHJcbiAgICAgICAgICB2YXIgdmFsO1xyXG4gICAgICAgICAgdmFsID0gdHlwZW9mIG1lbWJlciA9PT0gJ2Z1bmN0aW9uJyA/IG1lbWJlcih0aGlzLmludmFsaWRhdG9yKSA6IG1lbWJlcjtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmpvaW4ocHJldiwgdmFsKTtcclxuICAgICAgICB9LCB0aGlzLmRlZmF1bHQpO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgICAgICBpZiAoaW52YWxpZGF0b3IuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRvciA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5iaW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5yZXZhbGlkYXRlZCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICAgIGlmIChwcm9wLm9wdGlvbnMuY29tcG9zZWQgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZSA9IGNsYXNzIGV4dGVuZHMgQ29tcG9zZWRQcm9wZXJ0eSB7fTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBiaW5kKHRhcmdldCwgcHJvcCkge1xyXG4gICAgICBDYWxjdWxhdGVkUHJvcGVydHkuYmluZCh0YXJnZXQsIHByb3ApO1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcC5uYW1lICsgJ01lbWJlcnMnLCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5tZW1iZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIENvbXBvc2VkUHJvcGVydHkuam9pbkZ1bmN0aW9ucyA9IHtcclxuICAgIGFuZDogZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICByZXR1cm4gYSAmJiBiO1xyXG4gICAgfSxcclxuICAgIG9yOiBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgIHJldHVybiBhIHx8IGI7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIENvbXBvc2VkUHJvcGVydHk7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxuQ29tcG9zZWRQcm9wZXJ0eS5NZW1iZXJzID0gY2xhc3MgTWVtYmVycyBleHRlbmRzIENvbGxlY3Rpb24ge1xyXG4gIGFkZFByb3BlcnR5UmVmKG5hbWUsIG9iaikge1xyXG4gICAgdmFyIGZuO1xyXG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaikgPT09IC0xKSB7XHJcbiAgICAgIGZuID0gZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcclxuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcChuYW1lLCBvYmopO1xyXG4gICAgICB9O1xyXG4gICAgICBmbi5yZWYgPSB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBvYmo6IG9ialxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGZuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFZhbHVlUmVmKHZhbCwgbmFtZSwgb2JqKSB7XHJcbiAgICB2YXIgZm47XHJcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgobmFtZSwgb2JqKSA9PT0gLTEpIHtcclxuICAgICAgZm4gPSBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgIH07XHJcbiAgICAgIGZuLnJlZiA9IHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIG9iajogb2JqLFxyXG4gICAgICAgIHZhbDogdmFsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB0aGlzLnB1c2goZm4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWVSZWYodmFsLCBuYW1lLCBvYmopIHtcclxuICAgIHZhciBmbiwgaSwgcmVmO1xyXG4gICAgaSA9IHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaik7XHJcbiAgICBpZiAoaSA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWRkVmFsdWVSZWYodmFsLCBuYW1lLCBvYmopO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmdldChpKS5yZWYudmFsICE9PSB2YWwpIHtcclxuICAgICAgcmVmID0ge1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgb2JqOiBvYmosXHJcbiAgICAgICAgdmFsOiB2YWxcclxuICAgICAgfTtcclxuICAgICAgZm4gPSBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgIH07XHJcbiAgICAgIGZuLnJlZiA9IHJlZjtcclxuICAgICAgcmV0dXJuIHRoaXMuc2V0KGksIGZuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFZhbHVlUmVmKG5hbWUsIG9iaikge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5UmVmKG5hbWUsIG9iaikucmVmLnZhbDtcclxuICB9XHJcblxyXG4gIGFkZEZ1bmN0aW9uUmVmKGZuLCBuYW1lLCBvYmopIHtcclxuICAgIGlmICh0aGlzLmZpbmRSZWZJbmRleChuYW1lLCBvYmopID09PSAtMSkge1xyXG4gICAgICBmbi5yZWYgPSB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBvYmo6IG9ialxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGZuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRCeVJlZihuYW1lLCBvYmopIHtcclxuICAgIHJldHVybiB0aGlzLl9hcnJheVt0aGlzLmZpbmRSZWZJbmRleChuYW1lLCBvYmopXTtcclxuICB9XHJcblxyXG4gIGZpbmRSZWZJbmRleChuYW1lLCBvYmopIHtcclxuICAgIHJldHVybiB0aGlzLl9hcnJheS5maW5kSW5kZXgoZnVuY3Rpb24obWVtYmVyKSB7XHJcbiAgICAgIHJldHVybiAobWVtYmVyLnJlZiAhPSBudWxsKSAmJiBtZW1iZXIucmVmLm9iaiA9PT0gb2JqICYmIG1lbWJlci5yZWYubmFtZSA9PT0gbmFtZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUmVmKG5hbWUsIG9iaikge1xyXG4gICAgdmFyIGluZGV4LCBvbGQ7XHJcbiAgICBpbmRleCA9IHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaik7XHJcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpO1xyXG4gICAgICB0aGlzLl9hcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGFuZ2VkKG9sZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbnJldHVybihDb21wb3NlZFByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0NvbXBvc2VkUHJvcGVydHkuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgRHluYW1pY1Byb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtEeW5hbWljUHJvcGVydHkuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1EeW5hbWljUHJvcGVydHk7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5EeW5hbWljUHJvcGVydHk9RHluYW1pY1Byb3BlcnR5O31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuRHluYW1pY1Byb3BlcnR5PUR5bmFtaWNQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgSW52YWxpZGF0b3IgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJJbnZhbGlkYXRvclwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRvciA6IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJyk7XHJcbnZhciBCYXNpY1Byb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQmFzaWNQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5CYXNpY1Byb3BlcnR5IDogcmVxdWlyZSgnLi9CYXNpY1Byb3BlcnR5Jyk7XHJcbnZhciBEeW5hbWljUHJvcGVydHk7XHJcbkR5bmFtaWNQcm9wZXJ0eSA9IGNsYXNzIER5bmFtaWNQcm9wZXJ0eSBleHRlbmRzIEJhc2ljUHJvcGVydHkge1xyXG4gIGNhbGxiYWNrR2V0KCkge1xyXG4gICAgdmFyIHJlcztcclxuICAgIHJlcyA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiZ2V0XCIpO1xyXG4gICAgdGhpcy5yZXZhbGlkYXRlZCgpO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIGludmFsaWRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5jYWxjdWxhdGVkIHx8IHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5faW52YWxpZGF0ZU5vdGljZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBfaW52YWxpZGF0ZU5vdGljZSgpIHtcclxuICAgIGlmICh0aGlzLmlzSW1tZWRpYXRlKCkpIHtcclxuICAgICAgdGhpcy5nZXQoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9iai5lbWl0RXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLm9iai5lbWl0RXZlbnQodGhpcy5pbnZhbGlkYXRlRXZlbnROYW1lKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzSW1tZWRpYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcGVydHkub3B0aW9ucy5pbW1lZGlhdGUgIT09IGZhbHNlICYmICh0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaW1tZWRpYXRlID09PSB0cnVlIHx8ICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiaW1tZWRpYXRlXCIpIDogdGhpcy5oYXNDaGFuZ2VkRXZlbnRzKCkgfHwgdGhpcy5oYXNDaGFuZ2VkRnVuY3Rpb25zKCkpKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wb3NlKHByb3ApIHtcclxuICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmdldCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcHJvcC5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcHJvcC5vcHRpb25zLmFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBpZiAocHJvcC5pbnN0YW5jZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlID0gY2xhc3MgZXh0ZW5kcyBEeW5hbWljUHJvcGVydHkge307XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmdldCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmdldCA9IHRoaXMucHJvdG90eXBlLmNhbGxiYWNrR2V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5yZXR1cm4oRHluYW1pY1Byb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0R5bmFtaWNQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBJbnZhbGlkYXRlZFByb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtJbnZhbGlkYXRlZFByb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9SW52YWxpZGF0ZWRQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkludmFsaWRhdGVkUHJvcGVydHk9SW52YWxpZGF0ZWRQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkludmFsaWRhdGVkUHJvcGVydHk9SW52YWxpZGF0ZWRQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgSW52YWxpZGF0b3IgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJJbnZhbGlkYXRvclwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRvciA6IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJyk7XHJcbnZhciBDYWxjdWxhdGVkUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDYWxjdWxhdGVkUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuQ2FsY3VsYXRlZFByb3BlcnR5IDogcmVxdWlyZSgnLi9DYWxjdWxhdGVkUHJvcGVydHknKTtcclxudmFyIEludmFsaWRhdGVkUHJvcGVydHk7XHJcbkludmFsaWRhdGVkUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgSW52YWxpZGF0ZWRQcm9wZXJ0eSBleHRlbmRzIENhbGN1bGF0ZWRQcm9wZXJ0eSB7XHJcbiAgICB1bmtub3duKCkge1xyXG4gICAgICBpZiAodGhpcy5jYWxjdWxhdGVkIHx8IHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGVOb3RpY2UoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wLm9wdGlvbnMuY2FsY3VsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUuZXh0ZW5kKEludmFsaWRhdGVkUHJvcGVydHkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIEludmFsaWRhdGVkUHJvcGVydHkub3ZlcnJpZGVzKHtcclxuICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5vYmopO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jYWxsT3B0aW9uRnVuY3QodGhpcy5jYWxjdWxGdW5jdCwgaW52YWxpZGF0b3IpO1xyXG4gICAgICAgIHRoaXMubWFudWFsID0gZmFsc2U7XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIGlmIChpbnZhbGlkYXRvci5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLmJpbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnJldmFsaWRhdGVkKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3kud2l0aG91dEludmFsaWRhdGVkUHJvcGVydHkoKTtcclxuICAgICAgaWYgKHRoaXMuaW52YWxpZGF0b3IgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW52YWxpZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhbGN1bGF0ZWQgfHwgdGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVOb3RpY2UoKSAmJiAhdGhpcy5jYWxjdWxhdGVkICYmICh0aGlzLmludmFsaWRhdG9yICE9IG51bGwpKSB7XHJcbiAgICAgICAgICB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIEludmFsaWRhdGVkUHJvcGVydHk7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxucmV0dXJuKEludmFsaWRhdGVkUHJvcGVydHkpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL1Byb3BlcnR5VHlwZXMvSW52YWxpZGF0ZWRQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBVcGRhdGVkUHJvcGVydHk9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO1VwZGF0ZWRQcm9wZXJ0eS5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPVVwZGF0ZWRQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLlVwZGF0ZWRQcm9wZXJ0eT1VcGRhdGVkUHJvcGVydHk7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5VcGRhdGVkUHJvcGVydHk9VXBkYXRlZFByb3BlcnR5O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBJbnZhbGlkYXRvciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkludmFsaWRhdG9yXCIpID8gZGVwZW5kZW5jaWVzLkludmFsaWRhdG9yIDogcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcclxudmFyIER5bmFtaWNQcm9wZXJ0eSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkR5bmFtaWNQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5EeW5hbWljUHJvcGVydHkgOiByZXF1aXJlKCcuL0R5bmFtaWNQcm9wZXJ0eScpO1xyXG52YXIgT3ZlcnJpZGVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiT3ZlcnJpZGVyXCIpID8gZGVwZW5kZW5jaWVzLk92ZXJyaWRlciA6IHJlcXVpcmUoJy4uL092ZXJyaWRlcicpO1xyXG52YXIgVXBkYXRlZFByb3BlcnR5O1xyXG5VcGRhdGVkUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgVXBkYXRlZFByb3BlcnR5IGV4dGVuZHMgRHluYW1pY1Byb3BlcnR5IHtcclxuICAgIGluaXRSZXZhbGlkYXRlKCkge1xyXG4gICAgICB0aGlzLnJldmFsaWRhdGVDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdldCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0VXBkYXRlcigpLnVuYmluZCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdDaGFuZ2VzKSB7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZWQodGhpcy5wZW5kaW5nT2xkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIHRoaXMucmV2YWxpZGF0ZUNhbGxiYWNrLm93bmVyID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRVcGRhdGVyKCkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMudXBkYXRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0eS5vcHRpb25zLnVwZGF0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVyID0gdGhpcy5wcm9wZXJ0eS5vcHRpb25zLnVwZGF0ZXI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMudXBkYXRlci5nZXRCaW5kZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVyID0gdGhpcy51cGRhdGVyLmdldEJpbmRlcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnVwZGF0ZXIuYmluZCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgdGhpcy51cGRhdGVyLnVuYmluZCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVyLmNhbGxiYWNrID0gdGhpcy5yZXZhbGlkYXRlQ2FsbGJhY2s7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbXBvc2UocHJvcCkge1xyXG4gICAgICBpZiAocHJvcC5vcHRpb25zLnVwZGF0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZS5leHRlbmQoVXBkYXRlZFByb3BlcnR5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBVcGRhdGVkUHJvcGVydHkuZXh0ZW5kKE92ZXJyaWRlcik7XHJcblxyXG4gIFVwZGF0ZWRQcm9wZXJ0eS5vdmVycmlkZXMoe1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuaW5pdC53aXRob3V0VXBkYXRlZFByb3BlcnR5KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLmluaXRSZXZhbGlkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgX2ludmFsaWRhdGVOb3RpY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcmVzO1xyXG4gICAgICByZXMgPSB0aGlzLl9pbnZhbGlkYXRlTm90aWNlLndpdGhvdXRVcGRhdGVkUHJvcGVydHkoKTtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMuZ2V0VXBkYXRlcigpLmJpbmQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfSxcclxuICAgIGlzSW1tZWRpYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGNoYW5nZWQ6IGZ1bmN0aW9uKG9sZCkge1xyXG4gICAgICBpZiAodGhpcy51cGRhdGluZykge1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0NoYW5nZXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBlbmRpbmdPbGQgPSB2b2lkIDA7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkLndpdGhvdXRVcGRhdGVkUHJvcGVydHkob2xkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBlbmRpbmdDaGFuZ2VzID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucGVuZGluZ09sZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHRoaXMucGVuZGluZ09sZCA9IG9sZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRVcGRhdGVyKCkuYmluZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gVXBkYXRlZFByb3BlcnR5O1xyXG5cclxufSkuY2FsbCh0aGlzKTtcclxuXHJcbnJldHVybihVcGRhdGVkUHJvcGVydHkpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL1Byb3BlcnR5VHlwZXMvVXBkYXRlZFByb3BlcnR5LmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIFVwZGF0ZXI9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO1VwZGF0ZXIuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1VcGRhdGVyO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuVXBkYXRlcj1VcGRhdGVyO31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuVXBkYXRlcj1VcGRhdGVyO319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBCaW5kZXIgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJCaW5kZXJcIikgPyBkZXBlbmRlbmNpZXMuQmluZGVyIDogcmVxdWlyZSgnLi9CaW5kZXInKTtcclxudmFyIFVwZGF0ZXI7XHJcblVwZGF0ZXIgPSBjbGFzcyBVcGRhdGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XHJcbiAgICB0aGlzLm5leHQgPSBbXTtcclxuICAgIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHZhciBjYWxsYmFjaztcclxuICAgIHRoaXMudXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5uZXh0ID0gdGhpcy5jYWxsYmFja3Muc2xpY2UoKTtcclxuICAgIHdoaWxlICh0aGlzLmNhbGxiYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3Muc2hpZnQoKTtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FsbGJhY2tzID0gdGhpcy5uZXh0O1xyXG4gICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xyXG4gICAgaWYgKCF0aGlzLmNhbGxiYWNrcy5pbmNsdWRlcyhjYWxsYmFjaykpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy51cGRhdGluZyAmJiAhdGhpcy5uZXh0LmluY2x1ZGVzKGNhbGxiYWNrKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5uZXh0LnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dFRpY2soY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLnVwZGF0aW5nKSB7XHJcbiAgICAgIGlmICghdGhpcy5uZXh0LmluY2x1ZGVzKGNhbGxiYWNrKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5leHQucHVzaChjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUNhbGxiYWNrKGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgaW5kZXg7XHJcbiAgICBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgaW5kZXggPSB0aGlzLm5leHQuaW5kZXhPZihjYWxsYmFjayk7XHJcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5leHQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEJpbmRlcigpIHtcclxuICAgIHJldHVybiBuZXcgVXBkYXRlci5CaW5kZXIodGhpcyk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgIHJldHVybiB0aGlzLm5leHQgPSBbXTtcclxuICB9XHJcblxyXG59O1xyXG5cclxuVXBkYXRlci5CaW5kZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xyXG4gIGNsYXNzIEJpbmRlciBleHRlbmRzIHN1cGVyQ2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBjYWxsYmFjazEpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjazE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVmKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXHJcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBkb0JpbmQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5hZGRDYWxsYmFjayh0aGlzLmNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBkb1VuYmluZCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUNhbGxiYWNrKHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gQmluZGVyO1xyXG5cclxufSkuY2FsbCh0aGlzLCBCaW5kZXIpO1xyXG5cclxucmV0dXJuKFVwZGF0ZXIpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1VwZGF0ZXIuanMubWFwXHJcbiIsImlmKG1vZHVsZSl7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBCaW5kZXI6IHJlcXVpcmUoJy4vQmluZGVyLmpzJyksXHJcbiAgICBDb2xsZWN0aW9uOiByZXF1aXJlKCcuL0NvbGxlY3Rpb24uanMnKSxcclxuICAgIEVsZW1lbnQ6IHJlcXVpcmUoJy4vRWxlbWVudC5qcycpLFxyXG4gICAgRXZlbnRCaW5kOiByZXF1aXJlKCcuL0V2ZW50QmluZC5qcycpLFxyXG4gICAgRXZlbnRFbWl0dGVyOiByZXF1aXJlKCcuL0V2ZW50RW1pdHRlci5qcycpLFxyXG4gICAgSW52YWxpZGF0b3I6IHJlcXVpcmUoJy4vSW52YWxpZGF0b3IuanMnKSxcclxuICAgIE1peGFibGU6IHJlcXVpcmUoJy4vTWl4YWJsZS5qcycpLFxyXG4gICAgT3ZlcnJpZGVyOiByZXF1aXJlKCcuL092ZXJyaWRlci5qcycpLFxyXG4gICAgUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHkuanMnKSxcclxuICAgIFByb3BlcnR5T3duZXI6IHJlcXVpcmUoJy4vUHJvcGVydHlPd25lci5qcycpLFxyXG4gICAgVXBkYXRlcjogcmVxdWlyZSgnLi9VcGRhdGVyLmpzJyksXHJcbiAgICBBY3RpdmFibGVQcm9wZXJ0eTogcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0FjdGl2YWJsZVByb3BlcnR5LmpzJyksXHJcbiAgICBCYXNpY1Byb3BlcnR5OiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQmFzaWNQcm9wZXJ0eS5qcycpLFxyXG4gICAgQ2FsY3VsYXRlZFByb3BlcnR5OiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQ2FsY3VsYXRlZFByb3BlcnR5LmpzJyksXHJcbiAgICBDb2xsZWN0aW9uUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9Db2xsZWN0aW9uUHJvcGVydHkuanMnKSxcclxuICAgIENvbXBvc2VkUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9Db21wb3NlZFByb3BlcnR5LmpzJyksXHJcbiAgICBEeW5hbWljUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9EeW5hbWljUHJvcGVydHkuanMnKSxcclxuICAgIEludmFsaWRhdGVkUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9JbnZhbGlkYXRlZFByb3BlcnR5LmpzJyksXHJcbiAgICBVcGRhdGVkUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9VcGRhdGVkUHJvcGVydHkuanMnKVxyXG4gIH07XHJcbn0iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIFBhdGhGaW5kZXI9ZGVmaW5pdGlvbih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCI/UGFyYWxsZWxpbzp0aGlzLlBhcmFsbGVsaW8pO1BhdGhGaW5kZXIuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1QYXRoRmluZGVyO31lbHNle2lmKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIiYmUGFyYWxsZWxpbyE9PW51bGwpe1BhcmFsbGVsaW8uUGF0aEZpbmRlcj1QYXRoRmluZGVyO31lbHNle2lmKHRoaXMuUGFyYWxsZWxpbz09bnVsbCl7dGhpcy5QYXJhbGxlbGlvPXt9O310aGlzLlBhcmFsbGVsaW8uUGF0aEZpbmRlcj1QYXRoRmluZGVyO319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XG52YXIgRWxlbWVudCA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkVsZW1lbnRcIikgPyBkZXBlbmRlbmNpZXMuRWxlbWVudCA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xudmFyIFBhdGhGaW5kZXI7XG5QYXRoRmluZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBQYXRoRmluZGVyIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IodGlsZXNDb250YWluZXIsIGZyb20xLCB0bzEsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMudGlsZXNDb250YWluZXIgPSB0aWxlc0NvbnRhaW5lcjtcbiAgICAgIHRoaXMuZnJvbSA9IGZyb20xO1xuICAgICAgdGhpcy50byA9IHRvMTtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIGlmIChvcHRpb25zLnZhbGlkVGlsZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsaWRUaWxlQ2FsbGJhY2sgPSBvcHRpb25zLnZhbGlkVGlsZTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmFycml2ZWQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFycml2ZWRDYWxsYmFjayA9IG9wdGlvbnMuYXJyaXZlZDtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmVmZmljaWVuY3kgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVmZmljaWVuY3lDYWxsYmFjayA9IG9wdGlvbnMuZWZmaWNpZW5jeTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgIHRoaXMucGF0aHMgPSB7fTtcbiAgICAgIHRoaXMuc29sdXRpb24gPSBudWxsO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbGN1bCgpIHtcbiAgICAgIHdoaWxlICghdGhpcy5zb2x1dGlvbiAmJiAoIXRoaXMuc3RhcnRlZCB8fCB0aGlzLnF1ZXVlLmxlbmd0aCkpIHtcbiAgICAgICAgdGhpcy5zdGVwKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5nZXRQYXRoKCk7XG4gICAgfVxuXG4gICAgc3RlcCgpIHtcbiAgICAgIHZhciBuZXh0O1xuICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICAgIG5leHQgPSB0aGlzLnF1ZXVlLnBvcCgpO1xuICAgICAgICB0aGlzLmFkZE5leHRTdGVwcyhuZXh0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICBpZiAodGhpcy50byA9PT0gZmFsc2UgfHwgdGhpcy50aWxlSXNWYWxpZCh0aGlzLnRvKSkge1xuICAgICAgICB0aGlzLmFkZE5leHRTdGVwcygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXRoKCkge1xuICAgICAgdmFyIHJlcywgc3RlcDtcbiAgICAgIGlmICh0aGlzLnNvbHV0aW9uKSB7XG4gICAgICAgIHJlcyA9IFt0aGlzLnNvbHV0aW9uXTtcbiAgICAgICAgc3RlcCA9IHRoaXMuc29sdXRpb247XG4gICAgICAgIHdoaWxlIChzdGVwLnByZXYgIT0gbnVsbCkge1xuICAgICAgICAgIHJlcy51bnNoaWZ0KHN0ZXAucHJldik7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAucHJldjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFBvc0F0UHJjKHByYykge1xuICAgICAgaWYgKGlzTmFOKHByYykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlcicpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc29sdXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UG9zQXRUaW1lKHRoaXMuc29sdXRpb24uZ2V0VG90YWxMZW5ndGgoKSAqIHByYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UG9zQXRUaW1lKHRpbWUpIHtcbiAgICAgIHZhciBwcmMsIHN0ZXA7XG4gICAgICBpZiAodGhpcy5zb2x1dGlvbikge1xuICAgICAgICBpZiAodGltZSA+PSB0aGlzLnNvbHV0aW9uLmdldFRvdGFsTGVuZ3RoKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zb2x1dGlvbi5wb3NUb1RpbGVPZmZzZXQodGhpcy5zb2x1dGlvbi5nZXRFeGl0KCkueCwgdGhpcy5zb2x1dGlvbi5nZXRFeGl0KCkueSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RlcCA9IHRoaXMuc29sdXRpb247XG4gICAgICAgICAgd2hpbGUgKHN0ZXAuZ2V0U3RhcnRMZW5ndGgoKSA+IHRpbWUgJiYgKHN0ZXAucHJldiAhPSBudWxsKSkge1xuICAgICAgICAgICAgc3RlcCA9IHN0ZXAucHJldjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJjID0gKHRpbWUgLSBzdGVwLmdldFN0YXJ0TGVuZ3RoKCkpIC8gc3RlcC5nZXRMZW5ndGgoKTtcbiAgICAgICAgICByZXR1cm4gc3RlcC5wb3NUb1RpbGVPZmZzZXQoc3RlcC5nZXRFbnRyeSgpLnggKyAoc3RlcC5nZXRFeGl0KCkueCAtIHN0ZXAuZ2V0RW50cnkoKS54KSAqIHByYywgc3RlcC5nZXRFbnRyeSgpLnkgKyAoc3RlcC5nZXRFeGl0KCkueSAtIHN0ZXAuZ2V0RW50cnkoKS55KSAqIHByYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTb2x1dGlvblRpbGVMaXN0KCkge1xuICAgICAgdmFyIHN0ZXAsIHRpbGVsaXN0O1xuICAgICAgaWYgKHRoaXMuc29sdXRpb24pIHtcbiAgICAgICAgc3RlcCA9IHRoaXMuc29sdXRpb247XG4gICAgICAgIHRpbGVsaXN0ID0gW3N0ZXAudGlsZV07XG4gICAgICAgIHdoaWxlIChzdGVwLnByZXYgIT0gbnVsbCkge1xuICAgICAgICAgIHN0ZXAgPSBzdGVwLnByZXY7XG4gICAgICAgICAgdGlsZWxpc3QudW5zaGlmdChzdGVwLnRpbGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aWxlbGlzdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aWxlSXNWYWxpZCh0aWxlKSB7XG4gICAgICBpZiAodGhpcy52YWxpZFRpbGVDYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkVGlsZUNhbGxiYWNrKHRpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICh0aWxlICE9IG51bGwpICYmICghdGlsZS5lbXVsYXRlZCB8fCAodGlsZS50aWxlICE9PSAwICYmIHRpbGUudGlsZSAhPT0gZmFsc2UpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUaWxlKHgsIHkpIHtcbiAgICAgIHZhciByZWYxO1xuICAgICAgaWYgKHRoaXMudGlsZXNDb250YWluZXIuZ2V0VGlsZSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVzQ29udGFpbmVyLmdldFRpbGUoeCwgeSk7XG4gICAgICB9IGVsc2UgaWYgKCgocmVmMSA9IHRoaXMudGlsZXNDb250YWluZXJbeV0pICE9IG51bGwgPyByZWYxW3hdIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogeCxcbiAgICAgICAgICB5OiB5LFxuICAgICAgICAgIHRpbGU6IHRoaXMudGlsZXNDb250YWluZXJbeV1beF0sXG4gICAgICAgICAgZW11bGF0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb25uZWN0ZWRUb1RpbGUodGlsZSkge1xuICAgICAgdmFyIGNvbm5lY3RlZCwgdDtcbiAgICAgIGlmICh0aWxlLmdldENvbm5lY3RlZCAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aWxlLmdldENvbm5lY3RlZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29ubmVjdGVkID0gW107XG4gICAgICAgIGlmICh0ID0gdGhpcy5nZXRUaWxlKHRpbGUueCArIDEsIHRpbGUueSkpIHtcbiAgICAgICAgICBjb25uZWN0ZWQucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA9IHRoaXMuZ2V0VGlsZSh0aWxlLnggLSAxLCB0aWxlLnkpKSB7XG4gICAgICAgICAgY29ubmVjdGVkLnB1c2godCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgPSB0aGlzLmdldFRpbGUodGlsZS54LCB0aWxlLnkgKyAxKSkge1xuICAgICAgICAgIGNvbm5lY3RlZC5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ID0gdGhpcy5nZXRUaWxlKHRpbGUueCwgdGlsZS55IC0gMSkpIHtcbiAgICAgICAgICBjb25uZWN0ZWQucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFkZE5leHRTdGVwcyhzdGVwID0gbnVsbCkge1xuICAgICAgdmFyIGksIGxlbiwgbmV4dCwgcmVmMSwgcmVzdWx0cywgdGlsZTtcbiAgICAgIHRpbGUgPSBzdGVwICE9IG51bGwgPyBzdGVwLm5leHRUaWxlIDogdGhpcy5mcm9tO1xuICAgICAgcmVmMSA9IHRoaXMuZ2V0Q29ubmVjdGVkVG9UaWxlKHRpbGUpO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmMS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBuZXh0ID0gcmVmMVtpXTtcbiAgICAgICAgaWYgKHRoaXMudGlsZUlzVmFsaWQobmV4dCkpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5hZGRTdGVwKG5ldyBQYXRoRmluZGVyLlN0ZXAodGhpcywgKHN0ZXAgIT0gbnVsbCA/IHN0ZXAgOiBudWxsKSwgdGlsZSwgbmV4dCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgdGlsZUVxdWFsKHRpbGVBLCB0aWxlQikge1xuICAgICAgcmV0dXJuIHRpbGVBID09PSB0aWxlQiB8fCAoKHRpbGVBLmVtdWxhdGVkIHx8IHRpbGVCLmVtdWxhdGVkKSAmJiB0aWxlQS54ID09PSB0aWxlQi54ICYmIHRpbGVBLnkgPT09IHRpbGVCLnkpO1xuICAgIH1cblxuICAgIGFycml2ZWRBdERlc3RpbmF0aW9uKHN0ZXApIHtcbiAgICAgIGlmICh0aGlzLmFycml2ZWRDYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFycml2ZWRDYWxsYmFjayhzdGVwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVFcXVhbChzdGVwLnRpbGUsIHRoaXMudG8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFkZFN0ZXAoc3RlcCkge1xuICAgICAgdmFyIHNvbHV0aW9uQ2FuZGlkYXRlO1xuICAgICAgaWYgKHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF0gPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdID0ge307XG4gICAgICB9XG4gICAgICBpZiAoISgodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSAhPSBudWxsKSAmJiB0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdW3N0ZXAuZ2V0RXhpdCgpLnldLmdldFRvdGFsTGVuZ3RoKCkgPD0gc3RlcC5nZXRUb3RhbExlbmd0aCgpKSkge1xuICAgICAgICBpZiAodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVTdGVwKHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF1bc3RlcC5nZXRFeGl0KCkueV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF1bc3RlcC5nZXRFeGl0KCkueV0gPSBzdGVwO1xuICAgICAgICB0aGlzLnF1ZXVlLnNwbGljZSh0aGlzLmdldFN0ZXBSYW5rKHN0ZXApLCAwLCBzdGVwKTtcbiAgICAgICAgc29sdXRpb25DYW5kaWRhdGUgPSBuZXcgUGF0aEZpbmRlci5TdGVwKHRoaXMsIHN0ZXAsIHN0ZXAubmV4dFRpbGUsIG51bGwpO1xuICAgICAgICBpZiAodGhpcy5hcnJpdmVkQXREZXN0aW5hdGlvbihzb2x1dGlvbkNhbmRpZGF0ZSkgJiYgISgodGhpcy5zb2x1dGlvbiAhPSBudWxsKSAmJiB0aGlzLnNvbHV0aW9uLnByZXYuZ2V0VG90YWxMZW5ndGgoKSA8PSBzdGVwLmdldFRvdGFsTGVuZ3RoKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc29sdXRpb24gPSBzb2x1dGlvbkNhbmRpZGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVN0ZXAoc3RlcCkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgaW5kZXggPSB0aGlzLnF1ZXVlLmluZGV4T2Yoc3RlcCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGJlc3QoKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZVt0aGlzLnF1ZXVlLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGdldFN0ZXBSYW5rKHN0ZXApIHtcbiAgICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTdGVwUmFuayhzdGVwLmdldEVmZmljaWVuY3koKSwgMCwgdGhpcy5xdWV1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0U3RlcFJhbmsoZWZmaWNpZW5jeSwgbWluLCBtYXgpIHtcbiAgICAgIHZhciByZWYsIHJlZlBvcztcbiAgICAgIHJlZlBvcyA9IE1hdGguZmxvb3IoKG1heCAtIG1pbikgLyAyKSArIG1pbjtcbiAgICAgIHJlZiA9IHRoaXMucXVldWVbcmVmUG9zXS5nZXRFZmZpY2llbmN5KCk7XG4gICAgICBpZiAocmVmID09PSBlZmZpY2llbmN5KSB7XG4gICAgICAgIHJldHVybiByZWZQb3M7XG4gICAgICB9IGVsc2UgaWYgKHJlZiA+IGVmZmljaWVuY3kpIHtcbiAgICAgICAgaWYgKHJlZlBvcyA9PT0gbWluKSB7XG4gICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U3RlcFJhbmsoZWZmaWNpZW5jeSwgbWluLCByZWZQb3MgLSAxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlZlBvcyA9PT0gbWF4KSB7XG4gICAgICAgICAgcmV0dXJuIG1heCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN0ZXBSYW5rKGVmZmljaWVuY3ksIHJlZlBvcyArIDEsIG1heCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBQYXRoRmluZGVyLnByb3BlcnRpZXMoe1xuICAgIHZhbGlkVGlsZUNhbGxiYWNrOiB7fVxuICB9KTtcblxuICByZXR1cm4gUGF0aEZpbmRlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuUGF0aEZpbmRlci5TdGVwID0gY2xhc3MgU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHBhdGhGaW5kZXIsIHByZXYsIHRpbGUxLCBuZXh0VGlsZSkge1xuICAgIHRoaXMucGF0aEZpbmRlciA9IHBhdGhGaW5kZXI7XG4gICAgdGhpcy5wcmV2ID0gcHJldjtcbiAgICB0aGlzLnRpbGUgPSB0aWxlMTtcbiAgICB0aGlzLm5leHRUaWxlID0gbmV4dFRpbGU7XG4gIH1cblxuICBwb3NUb1RpbGVPZmZzZXQoeCwgeSkge1xuICAgIHZhciB0aWxlO1xuICAgIHRpbGUgPSBNYXRoLmZsb29yKHgpID09PSB0aGlzLnRpbGUueCAmJiBNYXRoLmZsb29yKHkpID09PSB0aGlzLnRpbGUueSA/IHRoaXMudGlsZSA6ICh0aGlzLm5leHRUaWxlICE9IG51bGwpICYmIE1hdGguZmxvb3IoeCkgPT09IHRoaXMubmV4dFRpbGUueCAmJiBNYXRoLmZsb29yKHkpID09PSB0aGlzLm5leHRUaWxlLnkgPyB0aGlzLm5leHRUaWxlIDogKHRoaXMucHJldiAhPSBudWxsKSAmJiBNYXRoLmZsb29yKHgpID09PSB0aGlzLnByZXYudGlsZS54ICYmIE1hdGguZmxvb3IoeSkgPT09IHRoaXMucHJldi50aWxlLnkgPyB0aGlzLnByZXYudGlsZSA6IGNvbnNvbGUubG9nKCdNYXRoLmZsb29yKCcgKyB4ICsgJykgPT0gJyArIHRoaXMudGlsZS54LCAnTWF0aC5mbG9vcignICsgeSArICcpID09ICcgKyB0aGlzLnRpbGUueSwgdGhpcyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgdGlsZTogdGlsZSxcbiAgICAgIG9mZnNldFg6IHggLSB0aWxlLngsXG4gICAgICBvZmZzZXRZOiB5IC0gdGlsZS55XG4gICAgfTtcbiAgfVxuXG4gIGdldEV4aXQoKSB7XG4gICAgaWYgKHRoaXMuZXhpdCA9PSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5uZXh0VGlsZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZXhpdCA9IHtcbiAgICAgICAgICB4OiAodGhpcy50aWxlLnggKyB0aGlzLm5leHRUaWxlLnggKyAxKSAvIDIsXG4gICAgICAgICAgeTogKHRoaXMudGlsZS55ICsgdGhpcy5uZXh0VGlsZS55ICsgMSkgLyAyXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmV4aXQgPSB7XG4gICAgICAgICAgeDogdGhpcy50aWxlLnggKyAwLjUsXG4gICAgICAgICAgeTogdGhpcy50aWxlLnkgKyAwLjVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZXhpdDtcbiAgfVxuXG4gIGdldEVudHJ5KCkge1xuICAgIGlmICh0aGlzLmVudHJ5ID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLnByZXYgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVudHJ5ID0ge1xuICAgICAgICAgIHg6ICh0aGlzLnRpbGUueCArIHRoaXMucHJldi50aWxlLnggKyAxKSAvIDIsXG4gICAgICAgICAgeTogKHRoaXMudGlsZS55ICsgdGhpcy5wcmV2LnRpbGUueSArIDEpIC8gMlxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbnRyeSA9IHtcbiAgICAgICAgICB4OiB0aGlzLnRpbGUueCArIDAuNSxcbiAgICAgICAgICB5OiB0aGlzLnRpbGUueSArIDAuNVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbnRyeTtcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT0gbnVsbCkge1xuICAgICAgdGhpcy5sZW5ndGggPSAodGhpcy5uZXh0VGlsZSA9PSBudWxsKSB8fCAodGhpcy5wcmV2ID09IG51bGwpID8gMC41IDogdGhpcy5wcmV2LnRpbGUueCA9PT0gdGhpcy5uZXh0VGlsZS54IHx8IHRoaXMucHJldi50aWxlLnkgPT09IHRoaXMubmV4dFRpbGUueSA/IDEgOiBNYXRoLnNxcnQoMC41KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0U3RhcnRMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRMZW5ndGggPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdGFydExlbmd0aCA9IHRoaXMucHJldiAhPSBudWxsID8gdGhpcy5wcmV2LmdldFRvdGFsTGVuZ3RoKCkgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGFydExlbmd0aDtcbiAgfVxuXG4gIGdldFRvdGFsTGVuZ3RoKCkge1xuICAgIGlmICh0aGlzLnRvdGFsTGVuZ3RoID09IG51bGwpIHtcbiAgICAgIHRoaXMudG90YWxMZW5ndGggPSB0aGlzLmdldFN0YXJ0TGVuZ3RoKCkgKyB0aGlzLmdldExlbmd0aCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50b3RhbExlbmd0aDtcbiAgfVxuXG4gIGdldEVmZmljaWVuY3koKSB7XG4gICAgaWYgKHRoaXMuZWZmaWNpZW5jeSA9PSBudWxsKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucGF0aEZpbmRlci5lZmZpY2llbmN5Q2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLmVmZmljaWVuY3kgPSB0aGlzLnBhdGhGaW5kZXIuZWZmaWNpZW5jeUNhbGxiYWNrKHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lZmZpY2llbmN5ID0gLXRoaXMuZ2V0UmVtYWluaW5nKCkgKiAxLjEgLSB0aGlzLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVmZmljaWVuY3k7XG4gIH1cblxuICBnZXRSZW1haW5pbmcoKSB7XG4gICAgdmFyIGZyb20sIHRvLCB4LCB5O1xuICAgIGlmICh0aGlzLnJlbWFpbmluZyA9PSBudWxsKSB7XG4gICAgICBmcm9tID0gdGhpcy5nZXRFeGl0KCk7XG4gICAgICB0byA9IHtcbiAgICAgICAgeDogdGhpcy5wYXRoRmluZGVyLnRvLnggKyAwLjUsXG4gICAgICAgIHk6IHRoaXMucGF0aEZpbmRlci50by55ICsgMC41XG4gICAgICB9O1xuICAgICAgeCA9IHRvLnggLSBmcm9tLng7XG4gICAgICB5ID0gdG8ueSAtIGZyb20ueTtcbiAgICAgIHRoaXMucmVtYWluaW5nID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmc7XG4gIH1cblxufTtcblxucmV0dXJuKFBhdGhGaW5kZXIpO30pOyIsImlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgIGdyZWVrQWxwaGFiZXQ6IHJlcXVpcmUoJy4vc3RyaW5ncy9ncmVla0FscGhhYmV0JyksXG4gICAgICBzdGFyTmFtZXM6IHJlcXVpcmUoJy4vc3RyaW5ncy9zdGFyTmFtZXMnKVxuICB9O1xufSIsIm1vZHVsZS5leHBvcnRzPVtcblwiYWxwaGFcIiwgICBcImJldGFcIiwgICAgXCJnYW1tYVwiLCAgIFwiZGVsdGFcIixcblwiZXBzaWxvblwiLCBcInpldGFcIiwgICAgXCJldGFcIiwgICAgIFwidGhldGFcIixcblwiaW90YVwiLCAgICBcImthcHBhXCIsICAgXCJsYW1iZGFcIiwgIFwibXVcIixcblwibnVcIiwgICAgICBcInhpXCIsICAgICAgXCJvbWljcm9uXCIsIFwicGlcIixcdFxuXCJyaG9cIiwgICAgIFwic2lnbWFcIiwgICBcInRhdVwiLCAgICAgXCJ1cHNpbG9uXCIsXG5cInBoaVwiLCAgICAgXCJjaGlcIiwgICAgIFwicHNpXCIsICAgICBcIm9tZWdhXCJcbl0iLCJtb2R1bGUuZXhwb3J0cz1bXG5cIkFjaGVybmFyXCIsICAgICBcIk1haWFcIiwgICAgICAgIFwiQXRsYXNcIiwgICAgICAgIFwiU2FsbVwiLCAgICAgICBcIkFsbmlsYW1cIiwgICAgICBcIk5la2thclwiLCAgICAgIFwiRWxuYXRoXCIsICAgICAgIFwiVGh1YmFuXCIsXG5cIkFjaGlyZFwiLCAgICAgICBcIk1hcmZpa1wiLCAgICAgIFwiQXV2YVwiLCAgICAgICAgIFwiU2FyZ2FzXCIsICAgICBcIkFsbml0YWtcIiwgICAgICBcIk5paGFsXCIsICAgICAgIFwiRW5pZlwiLCAgICAgICAgIFwiVG9yY3VsYXJpc1wiLFxuXCJBY3J1eFwiLCAgICAgICAgXCJNYXJrYWJcIiwgICAgICBcIkF2aW9yXCIsICAgICAgICBcIlNhcmluXCIsICAgICAgXCJBbHBoYXJkXCIsICAgICAgXCJOdW5raVwiLCAgICAgICBcIkV0YW1pblwiLCAgICAgICBcIlR1cmFpc1wiLFxuXCJBY3ViZW5zXCIsICAgICAgXCJNYXRhclwiLCAgICAgICBcIkF6ZWxmYWZhZ2VcIiwgICBcIlNjZXB0cnVtXCIsICAgXCJBbHBoZWtrYVwiLCAgICAgXCJOdXNha2FuXCIsICAgICBcIkZvbWFsaGF1dFwiLCAgICBcIlR5bFwiLFxuXCJBZGFyYVwiLCAgICAgICAgXCJNZWJzdXRhXCIsICAgICBcIkF6aGFcIiwgICAgICAgICBcIlNjaGVhdFwiLCAgICAgXCJBbHBoZXJhdHpcIiwgICAgXCJQZWFjb2NrXCIsICAgICBcIkZvcm5hY2lzXCIsICAgICBcIlVudWthbGhhaVwiLFxuXCJBZGhhZmVyYVwiLCAgICAgXCJNZWdyZXpcIiwgICAgICBcIkF6bWlkaXNrZVwiLCAgICBcIlNlZ2luXCIsICAgICAgXCJBbHJhaVwiLCAgICAgICAgXCJQaGFkXCIsICAgICAgICBcIkZ1cnVkXCIsICAgICAgICBcIlZlZ2FcIixcblwiQWRoaWxcIiwgICAgICAgIFwiTWVpc3NhXCIsICAgICAgXCJCYWhhbVwiLCAgICAgICAgXCJTZWdpbnVzXCIsICAgIFwiQWxyaXNoYVwiLCAgICAgIFwiUGhhZXRcIiwgICAgICAgXCJHYWNydXhcIiwgICAgICAgXCJWaW5kZW1pYXRyaXhcIixcblwiQWdlbmFcIiwgICAgICAgIFwiTWVrYnVkYVwiLCAgICAgXCJCZWNydXhcIiwgICAgICAgXCJTaGFtXCIsICAgICAgIFwiQWxzYWZpXCIsICAgICAgIFwiUGhlcmthZFwiLCAgICAgXCJHaWFuZmFyXCIsICAgICAgXCJXYXNhdFwiLFxuXCJBbGFkZmFyXCIsICAgICAgXCJNZW5rYWxpbmFuXCIsICBcIkJlaWRcIiwgICAgICAgICBcIlNoYXJhdGFuXCIsICAgXCJBbHNjaWF1a2F0XCIsICAgXCJQbGVpb25lXCIsICAgICBcIkdvbWVpc2FcIiwgICAgICBcIldlemVuXCIsXG5cIkFsYXRoZmFyXCIsICAgICBcIk1lbmthclwiLCAgICAgIFwiQmVsbGF0cml4XCIsICAgIFwiU2hhdWxhXCIsICAgICBcIkFsc2hhaW5cIiwgICAgICBcIlBvbGFyaXNcIiwgICAgIFwiR3JhZmZpYXNcIiwgICAgIFwiV2V6blwiLFxuXCJBbGJhbGRhaFwiLCAgICAgXCJNZW5rZW50XCIsICAgICBcIkJldGVsZ2V1c2VcIiwgICBcIlNoZWRpclwiLCAgICAgXCJBbHNoYXRcIiwgICAgICAgXCJQb2xsdXhcIiwgICAgICBcIkdyYWZpYXNcIiwgICAgICBcIlllZFwiLFxuXCJBbGJhbGlcIiwgICAgICAgXCJNZW5raWJcIiwgICAgICBcIkJvdGVpblwiLCAgICAgICBcIlNoZWxpYWtcIiwgICAgXCJBbHN1aGFpbFwiLCAgICAgXCJQb3JyaW1hXCIsICAgICBcIkdydW1pdW1cIiwgICAgICBcIllpbGR1blwiLFxuXCJBbGJpcmVvXCIsICAgICAgXCJNZXJha1wiLCAgICAgICBcIkJyYWNoaXVtXCIsICAgICBcIlNpcml1c1wiLCAgICAgXCJBbHRhaXJcIiwgICAgICAgXCJQcmFlY2lwdWFcIiwgICBcIkhhZGFyXCIsICAgICAgICBcIlphbmlhaFwiLFxuXCJBbGNoaWJhXCIsICAgICAgXCJNZXJnYVwiLCAgICAgICBcIkNhbm9wdXNcIiwgICAgICBcIlNpdHVsYVwiLCAgICAgXCJBbHRhcmZcIiwgICAgICAgXCJQcm9jeW9uXCIsICAgICBcIkhhZWRpXCIsICAgICAgICBcIlphdXJha1wiLFxuXCJBbGNvclwiLCAgICAgICAgXCJNZXJvcGVcIiwgICAgICBcIkNhcGVsbGFcIiwgICAgICBcIlNrYXRcIiwgICAgICAgXCJBbHRlcmZcIiwgICAgICAgXCJQcm9wdXNcIiwgICAgICBcIkhhbWFsXCIsICAgICAgICBcIlphdmlqYWhcIixcblwiQWxjeW9uZVwiLCAgICAgIFwiTWVzYXJ0aGltXCIsICAgXCJDYXBoXCIsICAgICAgICAgXCJTcGljYVwiLCAgICAgIFwiQWx1ZHJhXCIsICAgICAgIFwiUmFuYVwiLCAgICAgICAgXCJIYXNzYWxlaFwiLCAgICAgXCJaaWJhbFwiLFxuXCJBbGRlcmFtaW5cIiwgICAgXCJNZXRhbGxhaFwiLCAgICBcIkNhc3RvclwiLCAgICAgICBcIlN0ZXJvcGVcIiwgICAgXCJBbHVsYVwiLCAgICAgICAgXCJSYXNcIiwgICAgICAgICBcIkhlemVcIiwgICAgICAgICBcIlpvc21hXCIsXG5cIkFsZGhpYmFoXCIsICAgICBcIk1pYXBsYWNpZHVzXCIsIFwiQ2ViYWxyYWlcIiwgICAgIFwiU3VhbG9jaW5cIiwgICBcIkFseWFcIiwgICAgICAgICBcIlJhc2FsZ2V0aGlcIiwgIFwiSG9lZHVzXCIsICAgICAgIFwiQXF1YXJpdXNcIixcblwiQWxmaXJrXCIsICAgICAgIFwiTWlua2FyXCIsICAgICAgXCJDZWxhZW5vXCIsICAgICAgXCJTdWJyYVwiLCAgICAgIFwiQWx6aXJyXCIsICAgICAgIFwiUmFzYWxoYWd1ZVwiLCAgXCJIb21hbVwiLCAgICAgICAgXCJBcmllc1wiLFxuXCJBbGdlbmliXCIsICAgICAgXCJNaW50YWthXCIsICAgICBcIkNoYXJhXCIsICAgICAgICBcIlN1aGFpbFwiLCAgICAgXCJBbmNoYVwiLCAgICAgICAgXCJSYXN0YWJhblwiLCAgICBcIkh5YWR1bVwiLCAgICAgICBcIkNlcGhldXNcIixcblwiQWxnaWViYVwiLCAgICAgIFwiTWlyYVwiLCAgICAgICAgXCJDaG9ydFwiLCAgICAgICAgXCJTdWxhZmF0XCIsICAgIFwiQW5nZXRlbmFyXCIsICAgIFwiUmVndWx1c1wiLCAgICAgXCJJemFyXCIsICAgICAgICAgXCJDZXR1c1wiLFxuXCJBbGdvbFwiLCAgICAgICAgXCJNaXJhY2hcIiwgICAgICBcIkN1cnNhXCIsICAgICAgICBcIlN5cm1hXCIsICAgICAgXCJBbmthYVwiLCAgICAgICAgXCJSaWdlbFwiLCAgICAgICBcIkphYmJhaFwiLCAgICAgICBcIkNvbHVtYmFcIixcblwiQWxnb3JhYlwiLCAgICAgIFwiTWlyYW1cIiwgICAgICAgXCJEYWJpaFwiLCAgICAgICAgXCJUYWJpdFwiLCAgICAgIFwiQW5zZXJcIiwgICAgICAgIFwiUm90YW5ldlwiLCAgICAgXCJLYWphbVwiLCAgICAgICAgXCJDb21hXCIsXG5cIkFsaGVuYVwiLCAgICAgICBcIk1pcnBoYWtcIiwgICAgIFwiRGVuZWJcIiwgICAgICAgIFwiVGFsaXRoYVwiLCAgICBcIkFudGFyZXNcIiwgICAgICBcIlJ1Y2hiYVwiLCAgICAgIFwiS2F1c1wiLCAgICAgICAgIFwiQ29yb25hXCIsXG5cIkFsaW90aFwiLCAgICAgICBcIk1pemFyXCIsICAgICAgIFwiRGVuZWJvbGFcIiwgICAgIFwiVGFuaWFcIiwgICAgICBcIkFyY3R1cnVzXCIsICAgICBcIlJ1Y2hiYWhcIiwgICAgIFwiS2VpZFwiLCAgICAgICAgIFwiQ3J1eFwiLFxuXCJBbGthaWRcIiwgICAgICAgXCJNdWZyaWRcIiwgICAgICBcIkRoZW5lYlwiLCAgICAgICBcIlRhcmF6ZWRcIiwgICAgXCJBcmthYlwiLCAgICAgICAgXCJSdWtiYXRcIiwgICAgICBcIktpdGFscGhhXCIsICAgICBcIkRyYWNvXCIsXG5cIkFsa2FsdXJvcHNcIiwgICBcIk11bGlwaGVuXCIsICAgIFwiRGlhZGVtXCIsICAgICAgIFwiVGF5Z2V0YVwiLCAgICBcIkFybmViXCIsICAgICAgICBcIlNhYmlrXCIsICAgICAgIFwiS29jYWJcIiwgICAgICAgIFwiR3J1c1wiLFxuXCJBbGtlc1wiLCAgICAgICAgXCJNdXJ6aW1cIiwgICAgICBcIkRpcGhkYVwiLCAgICAgICBcIlRlZ21lblwiLCAgICAgXCJBcnJha2lzXCIsICAgICAgXCJTYWRhbGFjaGJpYVwiLCBcIktvcm5lcGhvcm9zXCIsICBcIkh5ZHJhXCIsXG5cIkFsa3VyaGFoXCIsICAgICBcIk11c2NpZGFcIiwgICAgIFwiRHNjaHViYmFcIiwgICAgIFwiVGVqYXRcIiwgICAgICBcIkFzY2VsbGFcIiwgICAgICBcIlNhZGFsbWVsaWtcIiwgIFwiS3JhelwiLCAgICAgICAgIFwiTGFjZXJ0YVwiLFxuXCJBbG1hYWtcIiwgICAgICAgXCJOYW9zXCIsICAgICAgICBcIkRzaWJhblwiLCAgICAgICBcIlRlcmViZWxsdW1cIiwgXCJBc2VsbHVzXCIsICAgICAgXCJTYWRhbHN1dWRcIiwgICBcIkt1bWFcIiwgICAgICAgICBcIk1lbnNhXCIsXG5cIkFsbmFpclwiLCAgICAgICBcIk5hc2hcIiwgICAgICAgIFwiRHViaGVcIiwgICAgICAgIFwiVGhhYml0XCIsICAgICBcIkFzdGVyb3BlXCIsICAgICBcIlNhZHJcIiwgICAgICAgIFwiTGVzYXRoXCIsICAgICAgIFwiTWFhc3ltXCIsXG5cIkFsbmF0aFwiLCAgICAgICBcIk5hc2hpcmFcIiwgICAgIFwiRWxlY3RyYVwiLCAgICAgIFwiVGhlZW1pbVwiLCAgICBcIkF0aWtcIiwgICAgICAgICBcIlNhaXBoXCIsICAgICAgIFwiUGhvZW5peFwiLCAgICAgIFwiTm9ybWFcIlxuXSIsInZhciBEaXJlY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0aW9uID0gY2xhc3MgRGlyZWN0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgeCwgeSwgaW52ZXJzZU5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmludmVyc2VOYW1lID0gaW52ZXJzZU5hbWU7XG4gIH1cblxuICBnZXRJbnZlcnNlKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yW3RoaXMuaW52ZXJzZU5hbWVdO1xuICB9XG5cbn07XG5cbkRpcmVjdGlvbi51cCA9IG5ldyBEaXJlY3Rpb24oJ3VwJywgMCwgLTEsICdkb3duJyk7XG5cbkRpcmVjdGlvbi5kb3duID0gbmV3IERpcmVjdGlvbignZG93bicsIDAsIDEsICd1cCcpO1xuXG5EaXJlY3Rpb24ubGVmdCA9IG5ldyBEaXJlY3Rpb24oJ2xlZnQnLCAtMSwgMCwgJ3JpZ2h0Jyk7XG5cbkRpcmVjdGlvbi5yaWdodCA9IG5ldyBEaXJlY3Rpb24oJ3JpZ2h0JywgMSwgMCwgJ2xlZnQnKTtcblxuRGlyZWN0aW9uLmFkamFjZW50cyA9IFtEaXJlY3Rpb24udXAsIERpcmVjdGlvbi5kb3duLCBEaXJlY3Rpb24ubGVmdCwgRGlyZWN0aW9uLnJpZ2h0XTtcblxuRGlyZWN0aW9uLnRvcExlZnQgPSBuZXcgRGlyZWN0aW9uKCd0b3BMZWZ0JywgLTEsIC0xLCAnYm90dG9tUmlnaHQnKTtcblxuRGlyZWN0aW9uLnRvcFJpZ2h0ID0gbmV3IERpcmVjdGlvbigndG9wUmlnaHQnLCAxLCAtMSwgJ2JvdHRvbUxlZnQnKTtcblxuRGlyZWN0aW9uLmJvdHRvbVJpZ2h0ID0gbmV3IERpcmVjdGlvbignYm90dG9tUmlnaHQnLCAxLCAxLCAndG9wTGVmdCcpO1xuXG5EaXJlY3Rpb24uYm90dG9tTGVmdCA9IG5ldyBEaXJlY3Rpb24oJ2JvdHRvbUxlZnQnLCAtMSwgMSwgJ3RvcFJpZ2h0Jyk7XG5cbkRpcmVjdGlvbi5jb3JuZXJzID0gW0RpcmVjdGlvbi50b3BMZWZ0LCBEaXJlY3Rpb24udG9wUmlnaHQsIERpcmVjdGlvbi5ib3R0b21SaWdodCwgRGlyZWN0aW9uLmJvdHRvbUxlZnRdO1xuXG5EaXJlY3Rpb24uYWxsID0gW0RpcmVjdGlvbi51cCwgRGlyZWN0aW9uLmRvd24sIERpcmVjdGlvbi5sZWZ0LCBEaXJlY3Rpb24ucmlnaHQsIERpcmVjdGlvbi50b3BMZWZ0LCBEaXJlY3Rpb24udG9wUmlnaHQsIERpcmVjdGlvbi5ib3R0b21SaWdodCwgRGlyZWN0aW9uLmJvdHRvbUxlZnRdO1xuIiwidmFyIERpcmVjdGlvbiwgRWxlbWVudCwgVGlsZTtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5EaXJlY3Rpb24gPSByZXF1aXJlKCcuL0RpcmVjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFRpbGUgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeTEpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnggPSB4MTtcbiAgICAgIHRoaXMueSA9IHkxO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgIHZhciBjb250YWluZXI7XG4gICAgICByZXR1cm4gY29udGFpbmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRSZWxhdGl2ZVRpbGUoeCwgeSkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmdldFRpbGUodGhpcy54ICsgeCwgdGhpcy55ICsgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmluZERpcmVjdGlvbk9mKHRpbGUpIHtcbiAgICAgIGlmICh0aWxlLnRpbGUpIHtcbiAgICAgICAgdGlsZSA9IHRpbGUudGlsZTtcbiAgICAgIH1cbiAgICAgIGlmICgodGlsZS54ICE9IG51bGwpICYmICh0aWxlLnkgIT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIERpcmVjdGlvbi5hbGwuZmluZCgoZCkgPT4ge1xuICAgICAgICAgIHJldHVybiBkLnggPT09IHRpbGUueCAtIHRoaXMueCAmJiBkLnkgPT09IHRpbGUueSAtIHRoaXMueTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoY2hpbGQsIGNoZWNrUmVmID0gdHJ1ZSkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgICAgaWYgKGNoZWNrUmVmKSB7XG4gICAgICAgIGNoaWxkLnRpbGUgPSB0aGlzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkKGNoaWxkLCBjaGVja1JlZiA9IHRydWUpIHtcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGVja1JlZiAmJiBjaGlsZC50aWxlID09PSB0aGlzKSB7XG4gICAgICAgIHJldHVybiBjaGlsZC50aWxlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXN0KHRpbGUpIHtcbiAgICAgIHZhciBjdG5EaXN0LCByZWYsIHgsIHk7XG4gICAgICBpZiAoKHRpbGUgIT0gbnVsbCA/IHRpbGUuZ2V0RmluYWxUaWxlIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgIHRpbGUgPSB0aWxlLmdldEZpbmFsVGlsZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCgodGlsZSAhPSBudWxsID8gdGlsZS54IDogdm9pZCAwKSAhPSBudWxsKSAmJiAodGlsZS55ICE9IG51bGwpICYmICh0aGlzLnggIT0gbnVsbCkgJiYgKHRoaXMueSAhPSBudWxsKSAmJiAodGhpcy5jb250YWluZXIgPT09IHRpbGUuY29udGFpbmVyIHx8IChjdG5EaXN0ID0gKHJlZiA9IHRoaXMuY29udGFpbmVyKSAhPSBudWxsID8gdHlwZW9mIHJlZi5kaXN0ID09PSBcImZ1bmN0aW9uXCIgPyByZWYuZGlzdCh0aWxlLmNvbnRhaW5lcikgOiB2b2lkIDAgOiB2b2lkIDApKSkge1xuICAgICAgICB4ID0gdGlsZS54IC0gdGhpcy54O1xuICAgICAgICB5ID0gdGlsZS55IC0gdGhpcy55O1xuICAgICAgICBpZiAoY3RuRGlzdCkge1xuICAgICAgICAgIHggKz0gY3RuRGlzdC54O1xuICAgICAgICAgIHkgKz0gY3RuRGlzdC55O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogeCxcbiAgICAgICAgICB5OiB5LFxuICAgICAgICAgIGxlbmd0aDogTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGaW5hbFRpbGUoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgfTtcblxuICBUaWxlLnByb3BlcnRpZXMoe1xuICAgIGNoaWxkcmVuOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfSxcbiAgICBjb250YWluZXI6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWRqYWNlbnRUaWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aWxlLmludmFsaWRhdGVBZGphY2VudFRpbGVzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFkamFjZW50VGlsZXM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0aW9uKSB7XG4gICAgICAgIGlmIChpbnZhbGlkYXRpb24ucHJvcCgnY29udGFpbmVyJykpIHtcbiAgICAgICAgICByZXR1cm4gRGlyZWN0aW9uLmFkamFjZW50cy5tYXAoKGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlbGF0aXZlVGlsZShkLngsIGQueSk7XG4gICAgICAgICAgfSkuZmlsdGVyKCh0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdCAhPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29sbGVjdGlvbjogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbGU7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJ2YXIgRWxlbWVudCwgVGlsZUNvbnRhaW5lciwgVGlsZVJlZmVyZW5jZTtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5UaWxlUmVmZXJlbmNlID0gcmVxdWlyZSgnLi9UaWxlUmVmZXJlbmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZUNvbnRhaW5lciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGlsZUNvbnRhaW5lciBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIF9hZGRUb0JvbmRhcmllcyh0aWxlLCBib3VuZGFyaWVzKSB7XG4gICAgICBpZiAoKGJvdW5kYXJpZXMudG9wID09IG51bGwpIHx8IHRpbGUueSA8IGJvdW5kYXJpZXMudG9wKSB7XG4gICAgICAgIGJvdW5kYXJpZXMudG9wID0gdGlsZS55O1xuICAgICAgfVxuICAgICAgaWYgKChib3VuZGFyaWVzLmxlZnQgPT0gbnVsbCkgfHwgdGlsZS54IDwgYm91bmRhcmllcy5sZWZ0KSB7XG4gICAgICAgIGJvdW5kYXJpZXMubGVmdCA9IHRpbGUueDtcbiAgICAgIH1cbiAgICAgIGlmICgoYm91bmRhcmllcy5ib3R0b20gPT0gbnVsbCkgfHwgdGlsZS55ID4gYm91bmRhcmllcy5ib3R0b20pIHtcbiAgICAgICAgYm91bmRhcmllcy5ib3R0b20gPSB0aWxlLnk7XG4gICAgICB9XG4gICAgICBpZiAoKGJvdW5kYXJpZXMucmlnaHQgPT0gbnVsbCkgfHwgdGlsZS54ID4gYm91bmRhcmllcy5yaWdodCkge1xuICAgICAgICByZXR1cm4gYm91bmRhcmllcy5yaWdodCA9IHRpbGUueDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5jb29yZHMgPSB7fTtcbiAgICAgIHJldHVybiB0aGlzLnRpbGVzID0gW107XG4gICAgfVxuXG4gICAgYWRkVGlsZSh0aWxlKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCF0aGlzLnRpbGVzLmluY2x1ZGVzKHRpbGUpKSB7XG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgaWYgKHRoaXMuY29vcmRzW3RpbGUueF0gPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY29vcmRzW3RpbGUueF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvb3Jkc1t0aWxlLnhdW3RpbGUueV0gPSB0aWxlO1xuICAgICAgICBpZiAodGhpcy5vd25lcikge1xuICAgICAgICAgIHRpbGUuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHJlZiA9IHRoaXMuX2JvdW5kYXJpZXMpICE9IG51bGwgPyByZWYuY2FsY3VsYXRlZCA6IHZvaWQgMCkge1xuICAgICAgICAgIHRoaXMuX2FkZFRvQm9uZGFyaWVzKHRpbGUsIHRoaXMuX2JvdW5kYXJpZXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZW1vdmVUaWxlKHRpbGUpIHtcbiAgICAgIHZhciBpbmRleCwgcmVmO1xuICAgICAgaW5kZXggPSB0aGlzLnRpbGVzLmluZGV4T2YodGlsZSk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLnRpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvb3Jkc1t0aWxlLnhdW3RpbGUueV07XG4gICAgICAgIGlmICh0aGlzLm93bmVyKSB7XG4gICAgICAgICAgdGlsZS5jb250YWluZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICgocmVmID0gdGhpcy5fYm91bmRhcmllcykgIT0gbnVsbCA/IHJlZi5jYWxjdWxhdGVkIDogdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYm91bmRhcmllcy50b3AgPT09IHRpbGUueSB8fCB0aGlzLmJvdW5kYXJpZXMuYm90dG9tID09PSB0aWxlLnkgfHwgdGhpcy5ib3VuZGFyaWVzLmxlZnQgPT09IHRpbGUueCB8fCB0aGlzLmJvdW5kYXJpZXMucmlnaHQgPT09IHRpbGUueCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0ZUJvdW5kYXJpZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVUaWxlQXQoeCwgeSkge1xuICAgICAgdmFyIHRpbGU7XG4gICAgICBpZiAodGlsZSA9IHRoaXMuZ2V0VGlsZSh4LCB5KSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVUaWxlKHRpbGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFRpbGUoeCwgeSkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICgoKHJlZiA9IHRoaXMuY29vcmRzW3hdKSAhPSBudWxsID8gcmVmW3ldIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvb3Jkc1t4XVt5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkTWF0cml4KG1hdHJpeCkge1xuICAgICAgdmFyIG9wdGlvbnMsIHJvdywgdGlsZSwgeCwgeTtcbiAgICAgIGZvciAoeSBpbiBtYXRyaXgpIHtcbiAgICAgICAgcm93ID0gbWF0cml4W3ldO1xuICAgICAgICBmb3IgKHggaW4gcm93KSB7XG4gICAgICAgICAgdGlsZSA9IHJvd1t4XTtcbiAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgeDogcGFyc2VJbnQoeCksXG4gICAgICAgICAgICB5OiBwYXJzZUludCh5KVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVGlsZSh0aWxlKG9wdGlvbnMpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGlsZS54ID0gb3B0aW9ucy54O1xuICAgICAgICAgICAgdGlsZS55ID0gb3B0aW9ucy55O1xuICAgICAgICAgICAgdGhpcy5hZGRUaWxlKHRpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5SYW5nZSh0aWxlLCByYW5nZSkge1xuICAgICAgdmFyIGZvdW5kLCBpLCBqLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHRpbGVzLCB4LCB5O1xuICAgICAgdGlsZXMgPSBbXTtcbiAgICAgIHJhbmdlLS07XG4gICAgICBmb3IgKHggPSBpID0gcmVmID0gdGlsZS54IC0gcmFuZ2UsIHJlZjEgPSB0aWxlLnggKyByYW5nZTsgKHJlZiA8PSByZWYxID8gaSA8PSByZWYxIDogaSA+PSByZWYxKTsgeCA9IHJlZiA8PSByZWYxID8gKytpIDogLS1pKSB7XG4gICAgICAgIGZvciAoeSA9IGogPSByZWYyID0gdGlsZS55IC0gcmFuZ2UsIHJlZjMgPSB0aWxlLnkgKyByYW5nZTsgKHJlZjIgPD0gcmVmMyA/IGogPD0gcmVmMyA6IGogPj0gcmVmMyk7IHkgPSByZWYyIDw9IHJlZjMgPyArK2ogOiAtLWopIHtcbiAgICAgICAgICBpZiAoTWF0aC5zcXJ0KCh4IC0gdGlsZS54KSAqICh4IC0gdGlsZS54KSArICh5IC0gdGlsZS55KSAqICh5IC0gdGlsZS55KSkgPD0gcmFuZ2UgJiYgKChmb3VuZCA9IHRoaXMuZ2V0VGlsZSh4LCB5KSkgIT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRpbGVzLnB1c2goZm91bmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbGVzO1xuICAgIH1cblxuICAgIGFsbFRpbGVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGlsZXMuc2xpY2UoKTtcbiAgICB9XG5cbiAgICBjbGVhckFsbCgpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlZiwgdGlsZTtcbiAgICAgIGlmICh0aGlzLm93bmVyKSB7XG4gICAgICAgIHJlZiA9IHRoaXMudGlsZXM7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHRpbGUgPSByZWZbaV07XG4gICAgICAgICAgdGlsZS5jb250YWluZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNvb3JkcyA9IHt9O1xuICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xvc2VzdChvcmlnaW5UaWxlLCBmaWx0ZXIpIHtcbiAgICAgIHZhciBjYW5kaWRhdGVzLCBnZXRTY29yZTtcbiAgICAgIGdldFNjb3JlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgIGlmIChjYW5kaWRhdGUuc2NvcmUgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBjYW5kaWRhdGUuc2NvcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZS5zY29yZSA9IGNhbmRpZGF0ZS5nZXRGaW5hbFRpbGUoKS5kaXN0KG9yaWdpblRpbGUpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNhbmRpZGF0ZXMgPSB0aGlzLnRpbGVzLmZpbHRlcihmaWx0ZXIpLm1hcCgodCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRpbGVSZWZlcmVuY2UodCk7XG4gICAgICB9KTtcbiAgICAgIGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gZ2V0U2NvcmUoYSkgLSBnZXRTY29yZShiKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlc1swXS50aWxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgIHZhciBvdXQ7XG4gICAgICBvdXQgPSBuZXcgVGlsZUNvbnRhaW5lcigpO1xuICAgICAgb3V0LmNvb3JkcyA9IHRoaXMuY29vcmRzO1xuICAgICAgb3V0LnRpbGVzID0gdGhpcy50aWxlcztcbiAgICAgIG91dC5vd25lciA9IGZhbHNlO1xuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBtZXJnZShjdG4sIG1lcmdlRm4sIGFzT3duZXIgPSBmYWxzZSkge1xuICAgICAgdmFyIG91dCwgdG1wO1xuICAgICAgb3V0ID0gbmV3IFRpbGVDb250YWluZXIoKTtcbiAgICAgIG91dC5vd25lciA9IGFzT3duZXI7XG4gICAgICB0bXAgPSBjdG4uY29weSgpO1xuICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbGVBKSB7XG4gICAgICAgIHZhciBtZXJnZWRUaWxlLCB0aWxlQjtcbiAgICAgICAgdGlsZUIgPSB0bXAuZ2V0VGlsZSh0aWxlQS54LCB0aWxlQS55KTtcbiAgICAgICAgaWYgKHRpbGVCKSB7XG4gICAgICAgICAgdG1wLnJlbW92ZVRpbGUodGlsZUIpO1xuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFRpbGUgPSBtZXJnZUZuKHRpbGVBLCB0aWxlQik7XG4gICAgICAgIGlmIChtZXJnZWRUaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIG91dC5hZGRUaWxlKG1lcmdlZFRpbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRtcC50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbGVCKSB7XG4gICAgICAgIHZhciBtZXJnZWRUaWxlO1xuICAgICAgICBtZXJnZWRUaWxlID0gbWVyZ2VGbihudWxsLCB0aWxlQik7XG4gICAgICAgIGlmIChtZXJnZWRUaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIG91dC5hZGRUaWxlKG1lcmdlZFRpbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gIH07XG5cbiAgVGlsZUNvbnRhaW5lci5wcm9wZXJ0aWVzKHtcbiAgICBvd25lcjoge1xuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgYm91bmRhcmllczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJvdW5kYXJpZXM7XG4gICAgICAgIGJvdW5kYXJpZXMgPSB7XG4gICAgICAgICAgdG9wOiBudWxsLFxuICAgICAgICAgIGxlZnQ6IG51bGwsXG4gICAgICAgICAgYm90dG9tOiBudWxsLFxuICAgICAgICAgIHJpZ2h0OiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRUb0JvbmRhcmllcyh0aWxlLCBib3VuZGFyaWVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBib3VuZGFyaWVzO1xuICAgICAgfSxcbiAgICAgIG91dHB1dDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbGVDb250YWluZXI7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJ2YXIgVGlsZVJlZmVyZW5jZTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlUmVmZXJlbmNlID0gY2xhc3MgVGlsZVJlZmVyZW5jZSB7XG4gIGNvbnN0cnVjdG9yKHRpbGUpIHtcbiAgICB0aGlzLnRpbGUgPSB0aWxlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIHg6IHtcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmluYWxUaWxlKCkueDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHk6IHtcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmluYWxUaWxlKCkueTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RmluYWxUaWxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpbGUuZ2V0RmluYWxUaWxlKCk7XG4gIH1cblxufTtcbiIsInZhciBFbGVtZW50LCBUaWxlZDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVkID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaWxlZCBleHRlbmRzIEVsZW1lbnQge1xuICAgIHB1dE9uUmFuZG9tVGlsZSh0aWxlcykge1xuICAgICAgdmFyIGZvdW5kO1xuICAgICAgZm91bmQgPSB0aGlzLmdldFJhbmRvbVZhbGlkVGlsZSh0aWxlcyk7XG4gICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZSA9IGZvdW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFJhbmRvbVZhbGlkVGlsZSh0aWxlcykge1xuICAgICAgdmFyIGNhbmRpZGF0ZSwgcG9zLCByZW1haW5pbmc7XG4gICAgICByZW1haW5pbmcgPSB0aWxlcy5zbGljZSgpO1xuICAgICAgd2hpbGUgKHJlbWFpbmluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJlbWFpbmluZy5sZW5ndGgpO1xuICAgICAgICBjYW5kaWRhdGUgPSByZW1haW5pbmcuc3BsaWNlKHBvcywgMSlbMF07XG4gICAgICAgIGlmICh0aGlzLmNhbkdvT25UaWxlKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjYW5Hb09uVGlsZSh0aWxlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRGaW5hbFRpbGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aWxlLmdldEZpbmFsVGlsZSgpO1xuICAgIH1cblxuICB9O1xuXG4gIFRpbGVkLnByb3BlcnRpZXMoe1xuICAgIHRpbGU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICAgIG9sZC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aWxlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGlsZS5hZGRDaGlsZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgb2Zmc2V0WDoge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgb2Zmc2V0WToge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbGVkO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiRGlyZWN0aW9uXCI6IHJlcXVpcmUoXCIuL0RpcmVjdGlvblwiKSxcbiAgXCJUaWxlXCI6IHJlcXVpcmUoXCIuL1RpbGVcIiksXG4gIFwiVGlsZUNvbnRhaW5lclwiOiByZXF1aXJlKFwiLi9UaWxlQ29udGFpbmVyXCIpLFxuICBcIlRpbGVSZWZlcmVuY2VcIjogcmVxdWlyZShcIi4vVGlsZVJlZmVyZW5jZVwiKSxcbiAgXCJUaWxlZFwiOiByZXF1aXJlKFwiLi9UaWxlZFwiKSxcbn0iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIFRpbWluZz1kZWZpbml0aW9uKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIj9QYXJhbGxlbGlvOnRoaXMuUGFyYWxsZWxpbyk7VGltaW5nLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9VGltaW5nO31lbHNle2lmKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIiYmUGFyYWxsZWxpbyE9PW51bGwpe1BhcmFsbGVsaW8uVGltaW5nPVRpbWluZzt9ZWxzZXtpZih0aGlzLlBhcmFsbGVsaW89PW51bGwpe3RoaXMuUGFyYWxsZWxpbz17fTt9dGhpcy5QYXJhbGxlbGlvLlRpbWluZz1UaW1pbmc7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cbnZhciBCYXNlVXBkYXRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkJhc2VVcGRhdGVyXCIpID8gZGVwZW5kZW5jaWVzLkJhc2VVcGRhdGVyIDogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLlVwZGF0ZXI7XG52YXIgVGltaW5nO1xuVGltaW5nID0gY2xhc3MgVGltaW5nIHtcbiAgY29uc3RydWN0b3IocnVubmluZyA9IHRydWUpIHtcbiAgICB0aGlzLnJ1bm5pbmcgPSBydW5uaW5nO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgfVxuXG4gIGFkZENoaWxkKGNoaWxkKSB7XG4gICAgdmFyIGluZGV4O1xuICAgIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAodGhpcy51cGRhdGVyKSB7XG4gICAgICBjaGlsZC51cGRhdGVyLmRpc3BhdGNoZXIgPSB0aGlzLnVwZGF0ZXI7XG4gICAgfVxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZW1vdmVDaGlsZChjaGlsZCkge1xuICAgIHZhciBpbmRleDtcbiAgICBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkLnBhcmVudCA9PT0gdGhpcykge1xuICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b2dnbGUodmFsKSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHZhbCA9ICF0aGlzLnJ1bm5pbmc7XG4gICAgfVxuICAgIHRoaXMucnVubmluZyA9IHZhbDtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQudG9nZ2xlKHZhbCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aW1lKSB7XG4gICAgdmFyIHRpbWVyO1xuICAgIHRpbWVyID0gbmV3IHRoaXMuY29uc3RydWN0b3IuVGltZXIodGltZSwgY2FsbGJhY2ssIHRoaXMucnVubmluZyk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aW1lcik7XG4gICAgcmV0dXJuIHRpbWVyO1xuICB9XG5cbiAgc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIHRpbWUpIHtcbiAgICB2YXIgdGltZXI7XG4gICAgdGltZXIgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5UaW1lcih0aW1lLCBjYWxsYmFjaywgdGhpcy5ydW5uaW5nLCB0cnVlKTtcbiAgICB0aGlzLmFkZENoaWxkKHRpbWVyKTtcbiAgICByZXR1cm4gdGltZXI7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGUoZmFsc2UpO1xuICB9XG5cbiAgdW5wYXVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGUodHJ1ZSk7XG4gIH1cblxufTtcblxuVGltaW5nLlRpbWVyID0gY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3Rvcih0aW1lMSwgY2FsbGJhY2ssIHJ1bm5pbmcgPSB0cnVlLCByZXBlYXQgPSBmYWxzZSkge1xuICAgIHRoaXMudGltZSA9IHRpbWUxO1xuICAgIHRoaXMucnVubmluZyA9IHJ1bm5pbmc7XG4gICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgdGhpcy5yZW1haW5pbmdUaW1lID0gdGhpcy50aW1lO1xuICAgIHRoaXMudXBkYXRlciA9IG5ldyBUaW1pbmcuVXBkYXRlcih0aGlzKTtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgQmFzZVVwZGF0ZXIoKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hlci5hZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMuX3N0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5vdygpIHtcbiAgICB2YXIgcmVmO1xuICAgIGlmICgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cgIT09IG51bGwgPyAocmVmID0gd2luZG93LnBlcmZvcm1hbmNlKSAhPSBudWxsID8gcmVmLm5vdyA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsID8gcHJvY2Vzcy51cHRpbWUgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzLnVwdGltZSgpICogMTAwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKHZhbCkge1xuICAgIGlmICh0eXBlb2YgdmFsID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB2YWwgPSAhdGhpcy5ydW5uaW5nO1xuICAgIH1cbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3RhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3N0b3AoKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGUoZmFsc2UpO1xuICB9XG5cbiAgdW5wYXVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGUodHJ1ZSk7XG4gIH1cblxuICBnZXRFbGFwc2VkVGltZSgpIHtcbiAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5ub3coKSAtIHRoaXMuc3RhcnRUaW1lICsgdGhpcy50aW1lIC0gdGhpcy5yZW1haW5pbmdUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy50aW1lIC0gdGhpcy5yZW1haW5pbmdUaW1lO1xuICAgIH1cbiAgfVxuXG4gIHNldEVsYXBzZWRUaW1lKHZhbCkge1xuICAgIHRoaXMuX3N0b3AoKTtcbiAgICB0aGlzLnJlbWFpbmluZ1RpbWUgPSB0aGlzLnRpbWUgLSB2YWw7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0KCk7XG4gIH1cblxuICBnZXRQcmMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxhcHNlZFRpbWUoKSAvIHRoaXMudGltZTtcbiAgfVxuXG4gIHNldFByYyh2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRFbGFwc2VkVGltZSh0aGlzLnRpbWUgKiB2YWwpO1xuICB9XG5cbiAgX3N0YXJ0KCkge1xuICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVyLmZvcndhcmRDYWxsYmFja3MoKTtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuY29uc3RydWN0b3Iubm93KCk7XG4gICAgaWYgKHRoaXMucmVwZWF0ICYmICF0aGlzLmludGVydXB0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmlkID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIHRoaXMucmVtYWluaW5nVGltZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmlkID0gc2V0VGltZW91dCh0aGlzLnRpY2suYmluZCh0aGlzKSwgdGhpcy5yZW1haW5pbmdUaW1lKTtcbiAgICB9XG4gIH1cblxuICBfc3RvcCgpIHtcbiAgICB2YXIgd2FzSW50ZXJ1cHRlZDtcbiAgICB3YXNJbnRlcnVwdGVkID0gdGhpcy5pbnRlcnVwdGVkO1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlci51bmZvcndhcmRDYWxsYmFja3MoKTtcbiAgICB0aGlzLnJlbWFpbmluZ1RpbWUgPSB0aGlzLnRpbWUgLSAodGhpcy5jb25zdHJ1Y3Rvci5ub3coKSAtIHRoaXMuc3RhcnRUaW1lKTtcbiAgICB0aGlzLmludGVydXB0ZWQgPSB0aGlzLnJlbWFpbmluZ1RpbWUgIT09IHRoaXMudGltZTtcbiAgICBpZiAodGhpcy5yZXBlYXQgJiYgIXdhc0ludGVydXB0ZWQpIHtcbiAgICAgIHJldHVybiBjbGVhckludGVydmFsKHRoaXMuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgdmFyIHdhc0ludGVydXB0ZWQ7XG4gICAgd2FzSW50ZXJ1cHRlZCA9IHRoaXMuaW50ZXJ1cHRlZDtcbiAgICB0aGlzLmludGVydXB0ZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5yZXBlYXQpIHtcbiAgICAgIHRoaXMucmVtYWluaW5nVGltZSA9IHRoaXMudGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1haW5pbmdUaW1lID0gMDtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaGVyLnVwZGF0ZSgpO1xuICAgIGlmICh0aGlzLnJlcGVhdCkge1xuICAgICAgaWYgKHdhc0ludGVydXB0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydFRpbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5vdygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5yZXBlYXQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmlkKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZGVzdHJveSgpO1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgIH1cbiAgfVxuXG59O1xuXG5UaW1pbmcuVXBkYXRlciA9IGNsYXNzIFVwZGF0ZXIge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgQmFzZVVwZGF0ZXIoKTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICB9XG5cbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB2YXIgcmVmO1xuICAgIGlmICghdGhpcy5jYWxsYmFja3MuaW5jbHVkZXMoY2FsbGJhY2spKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKCgocmVmID0gdGhpcy5wYXJlbnQpICE9IG51bGwgPyByZWYucnVubmluZyA6IHZvaWQgMCkgJiYgdGhpcy5kaXNwYXRjaGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaGVyLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHZhciBpbmRleDtcbiAgICBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpc3BhdGNoZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoZXIucmVtb3ZlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIGdldEJpbmRlcigpIHtcbiAgICBpZiAodGhpcy5kaXNwYXRjaGVyKSB7XG4gICAgICByZXR1cm4gbmV3IEJhc2VVcGRhdGVyLkJpbmRlcih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBmb3J3YXJkQ2FsbGJhY2tzKCkge1xuICAgIGlmICh0aGlzLmRpc3BhdGNoZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaGVyLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVuZm9yd2FyZENhbGxiYWNrcygpIHtcbiAgICBpZiAodGhpcy5kaXNwYXRjaGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5yZW1vdmVDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudW5mb3J3YXJkQ2FsbGJhY2tzKCk7XG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPSBudWxsO1xuICB9XG5cbn07XG5cbnJldHVybihUaW1pbmcpO30pOyIsInZhciBDb2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyLCBDb25uZWN0ZWQsIEVsZW1lbnQsIFNpZ25hbE9wZXJhdGlvbjtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5TaWduYWxPcGVyYXRpb24gPSByZXF1aXJlKCcuL1NpZ25hbE9wZXJhdGlvbicpO1xuXG5Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkludmFsaWRhdGVkLkNvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29ubmVjdGVkID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBDb25uZWN0ZWQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjYW5Db25uZWN0VG8odGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRhcmdldC5hZGRTaWduYWwgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9XG5cbiAgICBhY2NlcHRTaWduYWwoc2lnbmFsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkFkZENvbm5lY3Rpb24oY29ubikge31cblxuICAgIG9uUmVtb3ZlQ29ubmVjdGlvbihjb25uKSB7fVxuXG4gICAgb25OZXdTaWduYWxUeXBlKHNpZ25hbCkge31cblxuICAgIG9uQWRkU2lnbmFsKHNpZ25hbCwgb3ApIHt9XG5cbiAgICBvblJlbW92ZVNpZ25hbChzaWduYWwsIG9wKSB7fVxuXG4gICAgb25SZW1vdmVTaWduYWxUeXBlKHNpZ25hbCwgb3ApIHt9XG5cbiAgICBvblJlcGxhY2VTaWduYWwob2xkU2lnbmFsLCBuZXdTaWduYWwsIG9wKSB7fVxuXG4gICAgY29udGFpbnNTaWduYWwoc2lnbmFsLCBjaGVja0xhc3QgPSBmYWxzZSwgY2hlY2tPcmlnaW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hbHMuZmluZChmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBjLm1hdGNoKHNpZ25hbCwgY2hlY2tMYXN0LCBjaGVja09yaWdpbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRTaWduYWwoc2lnbmFsLCBvcCkge1xuICAgICAgdmFyIGF1dG9TdGFydDtcbiAgICAgIGlmICghKG9wICE9IG51bGwgPyBvcC5maW5kTGltaXRlcih0aGlzKSA6IHZvaWQgMCkpIHtcbiAgICAgICAgaWYgKCFvcCkge1xuICAgICAgICAgIG9wID0gbmV3IFNpZ25hbE9wZXJhdGlvbigpO1xuICAgICAgICAgIGF1dG9TdGFydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgb3AuYWRkT3BlcmF0aW9uKCgpID0+IHtcbiAgICAgICAgICB2YXIgc2ltaWxhcjtcbiAgICAgICAgICBpZiAoIXRoaXMuY29udGFpbnNTaWduYWwoc2lnbmFsLCB0cnVlKSAmJiB0aGlzLmFjY2VwdFNpZ25hbChzaWduYWwpKSB7XG4gICAgICAgICAgICBzaW1pbGFyID0gdGhpcy5jb250YWluc1NpZ25hbChzaWduYWwpO1xuICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2goc2lnbmFsKTtcbiAgICAgICAgICAgIHRoaXMub25BZGRTaWduYWwoc2lnbmFsLCBvcCk7XG4gICAgICAgICAgICBpZiAoIXNpbWlsYXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25OZXdTaWduYWxUeXBlKHNpZ25hbCwgb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhdXRvU3RhcnQpIHtcbiAgICAgICAgICBvcC5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2lnbmFsO1xuICAgIH1cblxuICAgIHJlbW92ZVNpZ25hbChzaWduYWwsIG9wKSB7XG4gICAgICB2YXIgYXV0b1N0YXJ0O1xuICAgICAgaWYgKCEob3AgIT0gbnVsbCA/IG9wLmZpbmRMaW1pdGVyKHRoaXMpIDogdm9pZCAwKSkge1xuICAgICAgICBpZiAoIW9wKSB7XG4gICAgICAgICAgb3AgPSBuZXcgU2lnbmFsT3BlcmF0aW9uO1xuICAgICAgICAgIGF1dG9TdGFydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgb3AuYWRkT3BlcmF0aW9uKCgpID0+IHtcbiAgICAgICAgICB2YXIgZXhpc3Rpbmc7XG4gICAgICAgICAgaWYgKChleGlzdGluZyA9IHRoaXMuY29udGFpbnNTaWduYWwoc2lnbmFsLCB0cnVlKSkgJiYgdGhpcy5hY2NlcHRTaWduYWwoc2lnbmFsKSkge1xuICAgICAgICAgICAgdGhpcy5zaWduYWxzLnNwbGljZSh0aGlzLnNpZ25hbHMuaW5kZXhPZihleGlzdGluZyksIDEpO1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZVNpZ25hbChzaWduYWwsIG9wKTtcbiAgICAgICAgICAgIG9wLmFkZE9wZXJhdGlvbigoKSA9PiB7XG4gICAgICAgICAgICAgIHZhciBzaW1pbGFyO1xuICAgICAgICAgICAgICBzaW1pbGFyID0gdGhpcy5jb250YWluc1NpZ25hbChzaWduYWwpO1xuICAgICAgICAgICAgICBpZiAoc2ltaWxhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uUmVwbGFjZVNpZ25hbChzaWduYWwsIHNpbWlsYXIsIG9wKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vblJlbW92ZVNpZ25hbFR5cGUoc2lnbmFsLCBvcCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RlcEJ5U3RlcCkge1xuICAgICAgICAgICAgcmV0dXJuIG9wLnN0ZXAoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXV0b1N0YXJ0KSB7XG4gICAgICAgICAgcmV0dXJuIG9wLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCkge1xuICAgICAgaWYgKHNpZ25hbC5sYXN0ID09PSB0aGlzKSB7XG4gICAgICAgIHJldHVybiBzaWduYWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2lnbmFsLndpdGhMYXN0KHRoaXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrRm9yd2FyZFdhdGNoZXIoKSB7XG4gICAgICBpZiAoIXRoaXMuZm9yd2FyZFdhdGNoZXIpIHtcbiAgICAgICAgdGhpcy5mb3J3YXJkV2F0Y2hlciA9IG5ldyBDb2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgICAgICBzY29wZTogdGhpcyxcbiAgICAgICAgICBwcm9wZXJ0eTogJ291dHB1dHMnLFxuICAgICAgICAgIG9uQWRkZWQ6IGZ1bmN0aW9uKG91dHB1dCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZGVkU2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZFNpZ25hbFRvKHNpZ25hbCwgb3V0cHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25SZW1vdmVkOiBmdW5jdGlvbihvdXRwdXQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcndhcmRlZFNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3BGb3J3YXJkZWRTaWduYWxUbyhzaWduYWwsIG91dHB1dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3J3YXJkV2F0Y2hlci5iaW5kKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yd2FyZFNpZ25hbChzaWduYWwsIG9wKSB7XG4gICAgICB2YXIgbmV4dDtcbiAgICAgIHRoaXMuZm9yd2FyZGVkU2lnbmFscy5hZGQoc2lnbmFsKTtcbiAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgIHRoaXMub3V0cHV0cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm4pIHtcbiAgICAgICAgaWYgKHNpZ25hbC5sYXN0ICE9PSBjb25uKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm4uYWRkU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5jaGVja0ZvcndhcmRXYXRjaGVyKCk7XG4gICAgfVxuXG4gICAgZm9yd2FyZEFsbFNpZ25hbHNUbyhjb25uLCBvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgICAgcmV0dXJuIGNvbm4uYWRkU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BGb3J3YXJkZWRTaWduYWwoc2lnbmFsLCBvcCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICB0aGlzLmZvcndhcmRlZFNpZ25hbHMucmVtb3ZlKHNpZ25hbCk7XG4gICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXRzLmZvckVhY2goZnVuY3Rpb24oY29ubikge1xuICAgICAgICBpZiAoc2lnbmFsLmxhc3QgIT09IGNvbm4pIHtcbiAgICAgICAgICByZXR1cm4gY29ubi5yZW1vdmVTaWduYWwobmV4dCwgb3ApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9wQWxsRm9yd2FyZGVkU2lnbmFsVG8oY29ubiwgb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICAgIHJldHVybiBjb25uLnJlbW92ZVNpZ25hbChuZXh0LCBvcCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3J3YXJkU2lnbmFsVG8oc2lnbmFsLCBjb25uLCBvcCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICBpZiAoc2lnbmFsLmxhc3QgIT09IGNvbm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbm4uYWRkU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wRm9yd2FyZGVkU2lnbmFsVG8oc2lnbmFsLCBjb25uLCBvcCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICBpZiAoc2lnbmFsLmxhc3QgIT09IGNvbm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbm4ucmVtb3ZlU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBDb25uZWN0ZWQucHJvcGVydGllcyh7XG4gICAgc2lnbmFsczoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZVxuICAgIH0sXG4gICAgaW5wdXRzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfSxcbiAgICBvdXRwdXRzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfSxcbiAgICBmb3J3YXJkZWRTaWduYWxzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQ29ubmVjdGVkO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwidmFyIEVsZW1lbnQsIFNpZ25hbDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hbCA9IGNsYXNzIFNpZ25hbCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4sIHR5cGUgPSAnc2lnbmFsJywgZXhjbHVzaXZlID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5leGNsdXNpdmUgPSBleGNsdXNpdmU7XG4gICAgdGhpcy5sYXN0ID0gdGhpcy5vcmlnaW47XG4gIH1cblxuICB3aXRoTGFzdChsYXN0KSB7XG4gICAgdmFyIHNpZ25hbDtcbiAgICBzaWduYWwgPSBuZXcgdGhpcy5fX3Byb3RvX18uY29uc3RydWN0b3IodGhpcy5vcmlnaW4sIHRoaXMudHlwZSwgdGhpcy5leGNsdXNpdmUpO1xuICAgIHNpZ25hbC5sYXN0ID0gbGFzdDtcbiAgICByZXR1cm4gc2lnbmFsO1xuICB9XG5cbiAgY29weSgpIHtcbiAgICB2YXIgc2lnbmFsO1xuICAgIHNpZ25hbCA9IG5ldyB0aGlzLl9fcHJvdG9fXy5jb25zdHJ1Y3Rvcih0aGlzLm9yaWdpbiwgdGhpcy50eXBlLCB0aGlzLmV4Y2x1c2l2ZSk7XG4gICAgc2lnbmFsLmxhc3QgPSB0aGlzLmxhc3Q7XG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxuXG4gIG1hdGNoKHNpZ25hbCwgY2hlY2tMYXN0ID0gZmFsc2UsIGNoZWNrT3JpZ2luID0gdGhpcy5leGNsdXNpdmUpIHtcbiAgICByZXR1cm4gKCFjaGVja0xhc3QgfHwgc2lnbmFsLmxhc3QgPT09IHRoaXMubGFzdCkgJiYgKGNoZWNrT3JpZ2luIHx8IHNpZ25hbC5vcmlnaW4gPT09IHRoaXMub3JpZ2luKSAmJiBzaWduYWwudHlwZSA9PT0gdGhpcy50eXBlO1xuICB9XG5cbn07XG4iLCJ2YXIgRWxlbWVudCwgU2lnbmFsT3BlcmF0aW9uO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbmFsT3BlcmF0aW9uID0gY2xhc3MgU2lnbmFsT3BlcmF0aW9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRoaXMubGltaXRlcnMgPSBbXTtcbiAgfVxuXG4gIGFkZE9wZXJhdGlvbihmdW5jdCwgcHJpb3JpdHkgPSAxKSB7XG4gICAgaWYgKHByaW9yaXR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS51bnNoaWZ0KGZ1bmN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUucHVzaChmdW5jdCk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGltaXRlcihjb25uZWN0ZWQpIHtcbiAgICBpZiAoIXRoaXMuZmluZExpbWl0ZXIoY29ubmVjdGVkKSkge1xuICAgICAgcmV0dXJuIHRoaXMubGltaXRlcnMucHVzaChjb25uZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRMaW1pdGVyKGNvbm5lY3RlZCkge1xuICAgIHJldHVybiB0aGlzLmxpbWl0ZXJzLmluZGV4T2YoY29ubmVjdGVkKSA+IC0xO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdmFyIHJlc3VsdHM7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIHdoaWxlICh0aGlzLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc3RlcCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIHZhciBmdW5jdDtcbiAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuY3QgPSB0aGlzLnF1ZXVlLnNoaWZ0KGZ1bmN0KTtcbiAgICAgIHJldHVybiBmdW5jdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBkb25lKCkge31cblxufTtcbiIsInZhciBDb25uZWN0ZWQsIFNpZ25hbCwgU2lnbmFsT3BlcmF0aW9uLCBTaWduYWxTb3VyY2U7XG5cbkNvbm5lY3RlZCA9IHJlcXVpcmUoJy4vQ29ubmVjdGVkJyk7XG5cblNpZ25hbCA9IHJlcXVpcmUoJy4vU2lnbmFsJyk7XG5cblNpZ25hbE9wZXJhdGlvbiA9IHJlcXVpcmUoJy4vU2lnbmFsT3BlcmF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbmFsU291cmNlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaWduYWxTb3VyY2UgZXh0ZW5kcyBDb25uZWN0ZWQge307XG5cbiAgU2lnbmFsU291cmNlLnByb3BlcnRpZXMoe1xuICAgIGFjdGl2YXRlZDoge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wO1xuICAgICAgICBvcCA9IG5ldyBTaWduYWxPcGVyYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZhdGVkKSB7XG4gICAgICAgICAgdGhpcy5mb3J3YXJkU2lnbmFsKHRoaXMuc2lnbmFsLCBvcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdG9wRm9yd2FyZGVkU2lnbmFsKHRoaXMuc2lnbmFsLCBvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaWduYWw6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2lnbmFsKHRoaXMsICdwb3dlcicsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFNpZ25hbFNvdXJjZTtcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBDb25uZWN0ZWQsIFN3aXRjaDtcblxuQ29ubmVjdGVkID0gcmVxdWlyZSgnLi9Db25uZWN0ZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTd2l0Y2ggPSBjbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDb25uZWN0ZWQge307XG4iLCJ2YXIgQ29ubmVjdGVkLCBEaXJlY3Rpb24sIFRpbGVkLCBXaXJlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZjtcblxuVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWQ7XG5cbkRpcmVjdGlvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5EaXJlY3Rpb247XG5cbkNvbm5lY3RlZCA9IHJlcXVpcmUoJy4vQ29ubmVjdGVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2lyZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgV2lyZSBleHRlbmRzIFRpbGVkIHtcbiAgICBjb25zdHJ1Y3Rvcih3aXJlVHlwZSA9ICdyZWQnKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy53aXJlVHlwZSA9IHdpcmVUeXBlO1xuICAgIH1cblxuICAgIGZpbmREaXJlY3Rpb25zVG8oY29ubikge1xuICAgICAgdmFyIGRpcmVjdGlvbnM7XG4gICAgICBkaXJlY3Rpb25zID0gY29ubi50aWxlcyAhPSBudWxsID8gY29ubi50aWxlcy5tYXAoKHRpbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZS5maW5kRGlyZWN0aW9uT2YodGlsZSk7XG4gICAgICB9KSA6IFt0aGlzLnRpbGUuZmluZERpcmVjdGlvbk9mKGNvbm4pXTtcbiAgICAgIHJldHVybiBkaXJlY3Rpb25zLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkICE9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5Db25uZWN0VG8odGFyZ2V0KSB7XG4gICAgICByZXR1cm4gQ29ubmVjdGVkLnByb3RvdHlwZS5jYW5Db25uZWN0VG8uY2FsbCh0aGlzLCB0YXJnZXQpICYmICgodGFyZ2V0LndpcmVUeXBlID09IG51bGwpIHx8IHRhcmdldC53aXJlVHlwZSA9PT0gdGhpcy53aXJlVHlwZSk7XG4gICAgfVxuXG4gICAgb25OZXdTaWduYWxUeXBlKHNpZ25hbCwgb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcndhcmRTaWduYWwoc2lnbmFsLCBvcCk7XG4gICAgfVxuXG4gIH07XG5cbiAgV2lyZS5leHRlbmQoQ29ubmVjdGVkKTtcblxuICBXaXJlLnByb3BlcnRpZXMoe1xuICAgIG91dHB1dHM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0aW9uKSB7XG4gICAgICAgIHZhciBwYXJlbnQ7XG4gICAgICAgIHBhcmVudCA9IGludmFsaWRhdGlvbi5wcm9wKCd0aWxlJyk7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0aW9uLnByb3AoJ2FkamFjZW50VGlsZXMnLCBwYXJlbnQpLnJlZHVjZSgocmVzLCB0aWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmNvbmNhdChpbnZhbGlkYXRpb24ucHJvcCgnY2hpbGRyZW4nLCB0aWxlKS5maWx0ZXIoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbkNvbm5lY3RUbyhjaGlsZCk7XG4gICAgICAgICAgICB9KS50b0FycmF5KCkpO1xuICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbm5lY3RlZERpcmVjdGlvbnM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRpb24ucHJvcCgnb3V0cHV0cycpLnJlZHVjZSgob3V0LCBjb25uKSA9PiB7XG4gICAgICAgICAgdGhpcy5maW5kRGlyZWN0aW9uc1RvKGNvbm4pLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgaWYgKGluZGV4T2YuY2FsbChvdXQsIGQpIDwgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gb3V0LnB1c2goZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSwgW10pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFdpcmU7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJDb25uZWN0ZWRcIjogcmVxdWlyZShcIi4vQ29ubmVjdGVkXCIpLFxuICBcIlNpZ25hbFwiOiByZXF1aXJlKFwiLi9TaWduYWxcIiksXG4gIFwiU2lnbmFsT3BlcmF0aW9uXCI6IHJlcXVpcmUoXCIuL1NpZ25hbE9wZXJhdGlvblwiKSxcbiAgXCJTaWduYWxTb3VyY2VcIjogcmVxdWlyZShcIi4vU2lnbmFsU291cmNlXCIpLFxuICBcIlN3aXRjaFwiOiByZXF1aXJlKFwiLi9Td2l0Y2hcIiksXG4gIFwiV2lyZVwiOiByZXF1aXJlKFwiLi9XaXJlXCIpLFxufSIsInZhciBBdXRvbWF0aWNEb29yLCBDaGFyYWN0ZXIsIERvb3I7XG5cbkRvb3IgPSByZXF1aXJlKCcuL0Rvb3InKTtcblxuQ2hhcmFjdGVyID0gcmVxdWlyZSgnLi9DaGFyYWN0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBBdXRvbWF0aWNEb29yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBBdXRvbWF0aWNEb29yIGV4dGVuZHMgRG9vciB7XG4gICAgdXBkYXRlVGlsZU1lbWJlcnMob2xkKSB7XG4gICAgICB2YXIgcmVmLCByZWYxLCByZWYyLCByZWYzO1xuICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgIGlmICgocmVmID0gb2xkLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICAgIHJlZi5yZW1vdmVSZWYoJ3VubG9ja2VkJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChyZWYxID0gb2xkLnRyYW5zcGFyZW50TWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICAgIHJlZjEucmVtb3ZlUmVmKCdvcGVuJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgICAgaWYgKChyZWYyID0gdGhpcy50aWxlLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICAgIHJlZjIuYWRkUHJvcGVydHlSZWYoJ3VubG9ja2VkJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChyZWYzID0gdGhpcy50aWxlLnRyYW5zcGFyZW50TWVtYmVycykgIT0gbnVsbCA/IHJlZjMuYWRkUHJvcGVydHlSZWYoJ29wZW4nLCB0aGlzKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMub3BlbjtcbiAgICB9XG5cbiAgICBpc0FjdGl2YXRvclByZXNlbnQoaW52YWxpZGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVhY3RpdmVUaWxlcyhpbnZhbGlkYXRlKS5zb21lKCh0aWxlKSA9PiB7XG4gICAgICAgIHZhciBjaGlsZHJlbjtcbiAgICAgICAgY2hpbGRyZW4gPSBpbnZhbGlkYXRlID8gaW52YWxpZGF0ZS5wcm9wKCdjaGlsZHJlbicsIHRpbGUpIDogdGlsZS5jaGlsZHJlbjtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuLnNvbWUoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2FuQmVBY3RpdmF0ZWRCeShjaGlsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuQmVBY3RpdmF0ZWRCeShlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbSBpbnN0YW5jZW9mIENoYXJhY3RlcjtcbiAgICB9XG5cbiAgICBnZXRSZWFjdGl2ZVRpbGVzKGludmFsaWRhdGUpIHtcbiAgICAgIHZhciBkaXJlY3Rpb24sIHRpbGU7XG4gICAgICB0aWxlID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCgndGlsZScpIDogdGhpcy50aWxlO1xuICAgICAgaWYgKCF0aWxlKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGRpcmVjdGlvbiA9IGludmFsaWRhdGUgPyBpbnZhbGlkYXRlLnByb3AoJ2RpcmVjdGlvbicpIDogdGhpcy5kaXJlY3Rpb247XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBEb29yLmRpcmVjdGlvbnMuaG9yaXpvbnRhbCkge1xuICAgICAgICByZXR1cm4gW3RpbGUsIHRpbGUuZ2V0UmVsYXRpdmVUaWxlKDAsIDEpLCB0aWxlLmdldFJlbGF0aXZlVGlsZSgwLCAtMSldLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICAgICAgcmV0dXJuIHQgIT0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3RpbGUsIHRpbGUuZ2V0UmVsYXRpdmVUaWxlKDEsIDApLCB0aWxlLmdldFJlbGF0aXZlVGlsZSgtMSwgMCldLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICAgICAgcmV0dXJuIHQgIT0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgQXV0b21hdGljRG9vci5wcm9wZXJ0aWVzKHtcbiAgICBvcGVuOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdGUpIHtcbiAgICAgICAgcmV0dXJuICFpbnZhbGlkYXRlLnByb3AoJ2xvY2tlZCcpICYmIHRoaXMuaXNBY3RpdmF0b3JQcmVzZW50KGludmFsaWRhdGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbG9ja2VkOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgdW5sb2NrZWQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4gIWludmFsaWRhdGUucHJvcCgnbG9ja2VkJyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQXV0b21hdGljRG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9BdXRvbWF0aWNEb29yLmpzLm1hcFxuIiwidmFyIENoYXJhY3RlciwgRGFtYWdlYWJsZSwgVGlsZWQsIFdhbGtBY3Rpb247XG5cblRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVkO1xuXG5EYW1hZ2VhYmxlID0gcmVxdWlyZSgnLi9EYW1hZ2VhYmxlJyk7XG5cbldhbGtBY3Rpb24gPSByZXF1aXJlKCcuL2FjdGlvbnMvV2Fsa0FjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJhY3RlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgVGlsZWQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgaWYgKCF0aGlzLnRpbGUgJiYgKHRoaXMuZ2FtZS5tYWluVGlsZUNvbnRhaW5lciAhPSBudWxsKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXRPblJhbmRvbVRpbGUodGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyLnRpbGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Hb09uVGlsZSh0aWxlKSB7XG4gICAgICByZXR1cm4gKHRpbGUgIT0gbnVsbCA/IHRpbGUud2Fsa2FibGUgOiB2b2lkIDApICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICB3YWxrVG8odGlsZSkge1xuICAgICAgdmFyIGFjdGlvbjtcbiAgICAgIGFjdGlvbiA9IG5ldyBXYWxrQWN0aW9uKHtcbiAgICAgICAgYWN0b3I6IHRoaXMsXG4gICAgICAgIHRhcmdldDogdGlsZVxuICAgICAgfSk7XG4gICAgICBhY3Rpb24uZXhlY3V0ZSgpO1xuICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGFibGVCeShwbGF5ZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICB9O1xuXG4gIENoYXJhY3Rlci5leHRlbmQoRGFtYWdlYWJsZSk7XG5cbiAgQ2hhcmFjdGVyLnByb3BlcnRpZXMoe1xuICAgIGdhbWU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBvZmZzZXRYOiB7XG4gICAgICBkZWZhdWx0OiAwLjVcbiAgICB9LFxuICAgIG9mZnNldFk6IHtcbiAgICAgIGRlZmF1bHQ6IDAuNVxuICAgIH0sXG4gICAgZGVmYXVsdEFjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBXYWxrQWN0aW9uKHtcbiAgICAgICAgICBhY3RvcjogdGhpc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF2YWlsYWJsZUFjdGlvbnM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWUsXG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciB0aWxlO1xuICAgICAgICB0aWxlID0gaW52YWxpZGF0b3IucHJvcChcInRpbGVcIik7XG4gICAgICAgIGlmICh0aWxlKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoXCJwcm92aWRlZEFjdGlvbnNcIiwgdGlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQ2hhcmFjdGVyO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0NoYXJhY3Rlci5qcy5tYXBcbiIsInZhciBBdHRhY2tNb3ZlQWN0aW9uLCBDaGFyYWN0ZXJBSSwgRG9vciwgUHJvcGVydHlXYXRjaGVyLCBUaWxlQ29udGFpbmVyLCBWaXNpb25DYWxjdWxhdG9yLCBXYWxrQWN0aW9uO1xuXG5UaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVDb250YWluZXI7XG5cblZpc2lvbkNhbGN1bGF0b3IgPSByZXF1aXJlKCcuL1Zpc2lvbkNhbGN1bGF0b3InKTtcblxuRG9vciA9IHJlcXVpcmUoJy4vRG9vcicpO1xuXG5XYWxrQWN0aW9uID0gcmVxdWlyZSgnLi9hY3Rpb25zL1dhbGtBY3Rpb24nKTtcblxuQXR0YWNrTW92ZUFjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9BdHRhY2tNb3ZlQWN0aW9uJyk7XG5cblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5JbnZhbGlkYXRlZC5Qcm9wZXJ0eVdhdGNoZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyQUkgPSBjbGFzcyBDaGFyYWN0ZXJBSSB7XG4gIGNvbnN0cnVjdG9yKGNoYXJhY3Rlcikge1xuICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xuICAgIHRoaXMubmV4dEFjdGlvbkNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubmV4dEFjdGlvbigpO1xuICAgIH07XG4gICAgdGhpcy52aXNpb25NZW1vcnkgPSBuZXcgVGlsZUNvbnRhaW5lcigpO1xuICAgIHRoaXMudGlsZVdhdGNoZXIgPSBuZXcgUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVZpc2lvbk1lbW9yeSgpO1xuICAgICAgfSxcbiAgICAgIHByb3BlcnR5OiB0aGlzLmNoYXJhY3Rlci5nZXRQcm9wZXJ0eUluc3RhbmNlKCd0aWxlJylcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMudGlsZVdhdGNoZXIuYmluZCgpO1xuICAgIHJldHVybiB0aGlzLm5leHRBY3Rpb24oKTtcbiAgfVxuXG4gIG5leHRBY3Rpb24oKSB7XG4gICAgdmFyIGVubmVteSwgdW5leHBsb3JlZDtcbiAgICB0aGlzLnVwZGF0ZVZpc2lvbk1lbW9yeSgpO1xuICAgIGlmIChlbm5lbXkgPSB0aGlzLmdldENsb3Nlc3RFbmVteSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRhY2tNb3ZlVG8oZW5uZW15KS5vbignZW5kJywgbmV4dEFjdGlvbkNhbGxiYWNrKTtcbiAgICB9IGVsc2UgaWYgKHVuZXhwbG9yZWQgPSB0aGlzLmdldENsb3Nlc3RVbmV4cGxvcmVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGtUbyh1bmV4cGxvcmVkKS5vbignZW5kJywgbmV4dEFjdGlvbkNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldFZpc2lvbk1lbW9yeSgpO1xuICAgICAgcmV0dXJuIHRoaXMud2Fsa1RvKHRoaXMuZ2V0Q2xvc2VzdFVuZXhwbG9yZWQoKSkub24oJ2VuZCcsIG5leHRBY3Rpb25DYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmlzaW9uTWVtb3J5KCkge1xuICAgIHZhciBjYWxjdWxhdG9yO1xuICAgIGNhbGN1bGF0b3IgPSBuZXcgVmlzaW9uQ2FsY3VsYXRvcih0aGlzLmNoYXJhY3Rlci50aWxlKTtcbiAgICBjYWxjdWxhdG9yLmNhbGN1bCgpO1xuICAgIHJldHVybiB0aGlzLnZpc2lvbk1lbW9yeSA9IGNhbGN1bGF0b3IudG9Db250YWluZXIoKS5tZXJnZSh0aGlzLnZpc2lvbk1lbW9yeSwgKGEsIGIpID0+IHtcbiAgICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgICAgYSA9IHRoaXMuYW5hbHl6ZVRpbGUoYSk7XG4gICAgICB9XG4gICAgICBpZiAoKGEgIT0gbnVsbCkgJiYgKGIgIT0gbnVsbCkpIHtcbiAgICAgICAgYS52aXNpYmlsaXR5ID0gTWF0aC5tYXgoYS52aXNpYmlsaXR5LCBiLnZpc2liaWxpdHkpO1xuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhIHx8IGI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhbmFseXplVGlsZSh0aWxlKSB7XG4gICAgdmFyIHJlZjtcbiAgICB0aWxlLmVubmVteVNwb3R0ZWQgPSAocmVmID0gdGlsZS5nZXRGaW5hbFRpbGUoKS5jaGlsZHJlbikgIT0gbnVsbCA/IHJlZi5maW5kKChjKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pc0VubmVteShjKTtcbiAgICB9KSA6IHZvaWQgMDtcbiAgICB0aWxlLmV4cGxvcmFibGUgPSB0aGlzLmlzRXhwbG9yYWJsZSh0aWxlKTtcbiAgICByZXR1cm4gdGlsZTtcbiAgfVxuXG4gIGlzRW5uZW15KGVsZW0pIHtcbiAgICB2YXIgcmVmO1xuICAgIHJldHVybiAocmVmID0gdGhpcy5jaGFyYWN0ZXIub3duZXIpICE9IG51bGwgPyB0eXBlb2YgcmVmLmlzRW5lbXkgPT09IFwiZnVuY3Rpb25cIiA/IHJlZi5pc0VuZW15KGVsZW0pIDogdm9pZCAwIDogdm9pZCAwO1xuICB9XG5cbiAgZ2V0Q2xvc2VzdEVuZW15KCkge1xuICAgIHJldHVybiB0aGlzLnZpc2lvbk1lbW9yeS5jbG9zZXN0KHRoaXMuY2hhcmFjdGVyLnRpbGUsICh0KSA9PiB7XG4gICAgICByZXR1cm4gdC5lbm5lbXlTcG90dGVkO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xvc2VzdFVuZXhwbG9yZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaW9uTWVtb3J5LmNsb3Nlc3QodGhpcy5jaGFyYWN0ZXIudGlsZSwgKHQpID0+IHtcbiAgICAgIHJldHVybiB0LnZpc2liaWxpdHkgPCAxICYmIHQuZXhwbG9yYWJsZTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzRXhwbG9yYWJsZSh0aWxlKSB7XG4gICAgdmFyIHJlZjtcbiAgICB0aWxlID0gdGlsZS5nZXRGaW5hbFRpbGUoKTtcbiAgICByZXR1cm4gdGlsZS53YWxrYWJsZSB8fCAoKHJlZiA9IHRpbGUuY2hpbGRyZW4pICE9IG51bGwgPyByZWYuZmluZCgoYykgPT4ge1xuICAgICAgcmV0dXJuIGMgaW5zdGFuY2VvZiBEb29yO1xuICAgIH0pIDogdm9pZCAwKTtcbiAgfVxuXG4gIGF0dGFja01vdmVUbyh0aWxlKSB7XG4gICAgdmFyIGFjdGlvbjtcbiAgICB0aWxlID0gdGlsZS5nZXRGaW5hbFRpbGUoKTtcbiAgICBhY3Rpb24gPSBuZXcgQXR0YWNrTW92ZUFjdGlvbih7XG4gICAgICBhY3RvcjogdGhpcy5jaGFyYWN0ZXIsXG4gICAgICB0YXJnZXQ6IHRpbGVcbiAgICB9KTtcbiAgICBpZiAoYWN0aW9uLmlzUmVhZHkoKSkge1xuICAgICAgYWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuICB9XG5cbiAgd2Fsa1RvKHRpbGUpIHtcbiAgICB2YXIgYWN0aW9uO1xuICAgIHRpbGUgPSB0aWxlLmdldEZpbmFsVGlsZSgpO1xuICAgIGFjdGlvbiA9IG5ldyBXYWxrQWN0aW9uKHtcbiAgICAgIGFjdG9yOiB0aGlzLmNoYXJhY3RlcixcbiAgICAgIHRhcmdldDogdGlsZVxuICAgIH0pO1xuICAgIGlmIChhY3Rpb24uaXNSZWFkeSgpKSB7XG4gICAgICBhY3Rpb24uZXhlY3V0ZSgpO1xuICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9DaGFyYWN0ZXJBSS5qcy5tYXBcbiIsInZhciBDb25mcm9udGF0aW9uLCBFbGVtZW50LCBTaGlwLCBWaWV3O1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblZpZXcgPSByZXF1aXJlKCcuL1ZpZXcnKTtcblxuU2hpcCA9IHJlcXVpcmUoJy4vU2hpcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbmZyb250YXRpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIENvbmZyb250YXRpb24gZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBzdGFydCgpIHtcbiAgICAgIGdhbWUubWFpblZpZXcgPSB0aGlzLnZpZXc7XG4gICAgICBzdWJqZWN0LmNvbnRhaW5lciA9IHRoaXMudmlldztcbiAgICAgIHJldHVybiBvcHBvbmVudC5jb250YWluZXIgPSB0aGlzLnZpZXc7XG4gICAgfVxuXG4gIH07XG5cbiAgQ29uZnJvbnRhdGlvbi5wcm9wZXJ0aWVzKHtcbiAgICBnYW1lOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBzdWJqZWN0OiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICB2aWV3OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZpZXcoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9wcG9uZW50OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNoaXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBDb25mcm9udGF0aW9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0NvbmZyb250YXRpb24uanMubWFwXG4iLCJ2YXIgRGFtYWdlUHJvcGFnYXRpb24sIERpcmVjdGlvbiwgRWxlbWVudCwgTGluZU9mU2lnaHQ7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuTGluZU9mU2lnaHQgPSByZXF1aXJlKCcuL0xpbmVPZlNpZ2h0Jyk7XG5cbkRpcmVjdGlvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5EaXJlY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gRGFtYWdlUHJvcGFnYXRpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIERhbWFnZVByb3BhZ2F0aW9uIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZXRUaWxlQ29udGFpbmVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGlsZS5jb250YWluZXI7XG4gICAgfVxuXG4gICAgYXBwbHkoKSB7XG4gICAgICB2YXIgZGFtYWdlLCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgIHJlZiA9IHRoaXMuZ2V0RGFtYWdlZCgpO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGRhbWFnZSA9IHJlZltpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGRhbWFnZS50YXJnZXQuZGFtYWdlKGRhbWFnZS5kYW1hZ2UpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIGdldEluaXRpYWxUaWxlcygpIHtcbiAgICAgIHZhciBjdG47XG4gICAgICBjdG4gPSB0aGlzLmdldFRpbGVDb250YWluZXIoKTtcbiAgICAgIHJldHVybiBjdG4uaW5SYW5nZSh0aGlzLnRpbGUsIHRoaXMucmFuZ2UpO1xuICAgIH1cblxuICAgIGdldEluaXRpYWxEYW1hZ2VzKCkge1xuICAgICAgdmFyIGRhbWFnZXMsIGRtZywgaSwgbGVuLCB0aWxlLCB0aWxlcztcbiAgICAgIGRhbWFnZXMgPSBbXTtcbiAgICAgIHRpbGVzID0gdGhpcy5nZXRJbml0aWFsVGlsZXMoKTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHRpbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRpbGUgPSB0aWxlc1tpXTtcbiAgICAgICAgaWYgKHRpbGUuZGFtYWdlYWJsZSAmJiAoZG1nID0gdGhpcy5pbml0aWFsRGFtYWdlKHRpbGUsIHRpbGVzLmxlbmd0aCkpKSB7XG4gICAgICAgICAgZGFtYWdlcy5wdXNoKGRtZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkYW1hZ2VzO1xuICAgIH1cblxuICAgIGdldERhbWFnZWQoKSB7XG4gICAgICB2YXIgYWRkZWQ7XG4gICAgICBpZiAodGhpcy5fZGFtYWdlZCA9PSBudWxsKSB7XG4gICAgICAgIGFkZGVkID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKGFkZGVkID0gdGhpcy5zdGVwKGFkZGVkKSkge1xuICAgICAgICAgIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9kYW1hZ2VkO1xuICAgIH1cblxuICAgIHN0ZXAoYWRkZWQpIHtcbiAgICAgIGlmIChhZGRlZCAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmV4dGVuZGVkRGFtYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBhZGRlZCA9IHRoaXMuZXh0ZW5kKGFkZGVkKTtcbiAgICAgICAgICB0aGlzLl9kYW1hZ2VkID0gYWRkZWQuY29uY2F0KHRoaXMuX2RhbWFnZWQpO1xuICAgICAgICAgIHJldHVybiBhZGRlZC5sZW5ndGggPiAwICYmIGFkZGVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGFtYWdlZCA9IHRoaXMuZ2V0SW5pdGlhbERhbWFnZXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbkRhbWFnZWQodGFyZ2V0LCBkYW1hZ2VkKSB7XG4gICAgICB2YXIgZGFtYWdlLCBpLCBpbmRleCwgbGVuO1xuICAgICAgZm9yIChpbmRleCA9IGkgPSAwLCBsZW4gPSBkYW1hZ2VkLmxlbmd0aDsgaSA8IGxlbjsgaW5kZXggPSArK2kpIHtcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlZFtpbmRleF07XG4gICAgICAgIGlmIChkYW1hZ2UudGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBleHRlbmQoZGFtYWdlZCkge1xuICAgICAgdmFyIGFkZGVkLCBjdG4sIGRhbWFnZSwgZGlyLCBkbWcsIGV4aXN0aW5nLCBpLCBqLCBrLCBsZW4sIGxlbjEsIGxlbjIsIGxvY2FsLCByZWYsIHRhcmdldCwgdGlsZTtcbiAgICAgIGN0biA9IHRoaXMuZ2V0VGlsZUNvbnRhaW5lcigpO1xuICAgICAgYWRkZWQgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGRhbWFnZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlZFtpXTtcbiAgICAgICAgbG9jYWwgPSBbXTtcbiAgICAgICAgaWYgKGRhbWFnZS50YXJnZXQueCAhPSBudWxsKSB7XG4gICAgICAgICAgcmVmID0gRGlyZWN0aW9uLmFkamFjZW50cztcbiAgICAgICAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICAgICAgZGlyID0gcmVmW2pdO1xuICAgICAgICAgICAgdGlsZSA9IGN0bi5nZXRUaWxlKGRhbWFnZS50YXJnZXQueCArIGRpci54LCBkYW1hZ2UudGFyZ2V0LnkgKyBkaXIueSk7XG4gICAgICAgICAgICBpZiAoKHRpbGUgIT0gbnVsbCkgJiYgdGlsZS5kYW1hZ2VhYmxlICYmIHRoaXMuaW5EYW1hZ2VkKHRpbGUsIHRoaXMuX2RhbWFnZWQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBsb2NhbC5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGsgPSAwLCBsZW4yID0gbG9jYWwubGVuZ3RoOyBrIDwgbGVuMjsgaysrKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gbG9jYWxba107XG4gICAgICAgICAgaWYgKGRtZyA9IHRoaXMuZXh0ZW5kZWREYW1hZ2UodGFyZ2V0LCBkYW1hZ2UsIGxvY2FsLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGlmICgoZXhpc3RpbmcgPSB0aGlzLmluRGFtYWdlZCh0YXJnZXQsIGFkZGVkKSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGFkZGVkLnB1c2goZG1nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFkZGVkW2V4aXN0aW5nXSA9IHRoaXMubWVyZ2VEYW1hZ2UoYWRkZWRbZXhpc3RpbmddLCBkbWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFkZGVkO1xuICAgIH1cblxuICAgIG1lcmdlRGFtYWdlKGQxLCBkMikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiBkMS50YXJnZXQsXG4gICAgICAgIHBvd2VyOiBkMS5wb3dlciArIGQyLnBvd2VyLFxuICAgICAgICBkYW1hZ2U6IGQxLmRhbWFnZSArIGQyLmRhbWFnZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBtb2RpZnlEYW1hZ2UodGFyZ2V0LCBwb3dlcikge1xuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQubW9kaWZ5RGFtYWdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRhcmdldC5tb2RpZnlEYW1hZ2UocG93ZXIsIHRoaXMudHlwZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IocG93ZXIpO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIERhbWFnZVByb3BhZ2F0aW9uLnByb3BlcnRpZXMoe1xuICAgIHRpbGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHBvd2VyOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgcmFuZ2U6IHtcbiAgICAgIGRlZmF1bHQ6IDFcbiAgICB9LFxuICAgIHR5cGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBEYW1hZ2VQcm9wYWdhdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuRGFtYWdlUHJvcGFnYXRpb24uTm9ybWFsID0gY2xhc3MgTm9ybWFsIGV4dGVuZHMgRGFtYWdlUHJvcGFnYXRpb24ge1xuICBpbml0aWFsRGFtYWdlKHRhcmdldCwgbmIpIHtcbiAgICB2YXIgZG1nO1xuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgdGhpcy5wb3dlcik7XG4gICAgaWYgKGRtZyA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwb3dlcjogdGhpcy5wb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbn07XG5cbkRhbWFnZVByb3BhZ2F0aW9uLlRoZXJtaWMgPSBjbGFzcyBUaGVybWljIGV4dGVuZHMgRGFtYWdlUHJvcGFnYXRpb24ge1xuICBleHRlbmRlZERhbWFnZSh0YXJnZXQsIGxhc3QsIG5iKSB7XG4gICAgdmFyIGRtZywgcG93ZXI7XG4gICAgcG93ZXIgPSAobGFzdC5kYW1hZ2UgLSAxKSAvIDIgLyBuYiAqIE1hdGgubWluKDEsIGxhc3QudGFyZ2V0LmhlYWx0aCAvIGxhc3QudGFyZ2V0Lm1heEhlYWx0aCAqIDUpO1xuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgcG93ZXIpO1xuICAgIGlmIChkbWcgPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgcG93ZXI6IHBvd2VyLFxuICAgICAgICBkYW1hZ2U6IGRtZ1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpbml0aWFsRGFtYWdlKHRhcmdldCwgbmIpIHtcbiAgICB2YXIgZG1nLCBwb3dlcjtcbiAgICBwb3dlciA9IHRoaXMucG93ZXIgLyBuYjtcbiAgICBkbWcgPSB0aGlzLm1vZGlmeURhbWFnZSh0YXJnZXQsIHBvd2VyKTtcbiAgICBpZiAoZG1nID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBvd2VyOiBwb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbn07XG5cbkRhbWFnZVByb3BhZ2F0aW9uLktpbmV0aWMgPSBjbGFzcyBLaW5ldGljIGV4dGVuZHMgRGFtYWdlUHJvcGFnYXRpb24ge1xuICBleHRlbmRlZERhbWFnZSh0YXJnZXQsIGxhc3QsIG5iKSB7XG4gICAgdmFyIGRtZywgcG93ZXI7XG4gICAgcG93ZXIgPSAobGFzdC5wb3dlciAtIGxhc3QuZGFtYWdlKSAqIE1hdGgubWluKDEsIGxhc3QudGFyZ2V0LmhlYWx0aCAvIGxhc3QudGFyZ2V0Lm1heEhlYWx0aCAqIDIpIC0gMTtcbiAgICBkbWcgPSB0aGlzLm1vZGlmeURhbWFnZSh0YXJnZXQsIHBvd2VyKTtcbiAgICBpZiAoZG1nID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBvd2VyOiBwb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbERhbWFnZSh0YXJnZXQsIG5iKSB7XG4gICAgdmFyIGRtZztcbiAgICBkbWcgPSB0aGlzLm1vZGlmeURhbWFnZSh0YXJnZXQsIHRoaXMucG93ZXIpO1xuICAgIGlmIChkbWcgPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgcG93ZXI6IHRoaXMucG93ZXIsXG4gICAgICAgIGRhbWFnZTogZG1nXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG1vZGlmeURhbWFnZSh0YXJnZXQsIHBvd2VyKSB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQubW9kaWZ5RGFtYWdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcih0YXJnZXQubW9kaWZ5RGFtYWdlKHBvd2VyLCB0aGlzLnR5cGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IocG93ZXIgKiAwLjI1KTtcbiAgICB9XG4gIH1cblxuICBtZXJnZURhbWFnZShkMSwgZDIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFyZ2V0OiBkMS50YXJnZXQsXG4gICAgICBwb3dlcjogTWF0aC5mbG9vcigoZDEucG93ZXIgKyBkMi5wb3dlcikgLyAyKSxcbiAgICAgIGRhbWFnZTogTWF0aC5mbG9vcigoZDEuZGFtYWdlICsgZDIuZGFtYWdlKSAvIDIpXG4gICAgfTtcbiAgfVxuXG59O1xuXG5EYW1hZ2VQcm9wYWdhdGlvbi5FeHBsb3NpdmUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEV4cGxvc2l2ZSBleHRlbmRzIERhbWFnZVByb3BhZ2F0aW9uIHtcbiAgICBnZXREYW1hZ2VkKCkge1xuICAgICAgdmFyIGFuZ2xlLCBpLCBpbnNpZGUsIHJlZiwgc2hhcmQsIHNoYXJkUG93ZXIsIHNoYXJkcywgdGFyZ2V0O1xuICAgICAgdGhpcy5fZGFtYWdlZCA9IFtdO1xuICAgICAgc2hhcmRzID0gTWF0aC5wb3codGhpcy5yYW5nZSArIDEsIDIpO1xuICAgICAgc2hhcmRQb3dlciA9IHRoaXMucG93ZXIgLyBzaGFyZHM7XG4gICAgICBpbnNpZGUgPSB0aGlzLnRpbGUuaGVhbHRoIDw9IHRoaXMubW9kaWZ5RGFtYWdlKHRoaXMudGlsZSwgc2hhcmRQb3dlcik7XG4gICAgICBpZiAoaW5zaWRlKSB7XG4gICAgICAgIHNoYXJkUG93ZXIgKj0gNDtcbiAgICAgIH1cbiAgICAgIGZvciAoc2hhcmQgPSBpID0gMCwgcmVmID0gc2hhcmRzOyAoMCA8PSByZWYgPyBpIDw9IHJlZiA6IGkgPj0gcmVmKTsgc2hhcmQgPSAwIDw9IHJlZiA/ICsraSA6IC0taSkge1xuICAgICAgICBhbmdsZSA9IHRoaXMucm5nKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXRUaWxlSGl0QnlTaGFyZChpbnNpZGUsIGFuZ2xlKTtcbiAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fZGFtYWdlZC5wdXNoKHtcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgcG93ZXI6IHNoYXJkUG93ZXIsXG4gICAgICAgICAgICBkYW1hZ2U6IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgc2hhcmRQb3dlcilcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2RhbWFnZWQ7XG4gICAgfVxuXG4gICAgZ2V0VGlsZUhpdEJ5U2hhcmQoaW5zaWRlLCBhbmdsZSkge1xuICAgICAgdmFyIGN0biwgZGlzdCwgdGFyZ2V0LCB2ZXJ0ZXg7XG4gICAgICBjdG4gPSB0aGlzLmdldFRpbGVDb250YWluZXIoKTtcbiAgICAgIGRpc3QgPSB0aGlzLnJhbmdlICogdGhpcy5ybmcoKTtcbiAgICAgIHRhcmdldCA9IHtcbiAgICAgICAgeDogdGhpcy50aWxlLnggKyAwLjUgKyBkaXN0ICogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICB5OiB0aGlzLnRpbGUueSArIDAuNSArIGRpc3QgKiBNYXRoLnNpbihhbmdsZSlcbiAgICAgIH07XG4gICAgICBpZiAoaW5zaWRlKSB7XG4gICAgICAgIHZlcnRleCA9IG5ldyBMaW5lT2ZTaWdodChjdG4sIHRoaXMudGlsZS54ICsgMC41LCB0aGlzLnRpbGUueSArIDAuNSwgdGFyZ2V0LngsIHRhcmdldC55KTtcbiAgICAgICAgdmVydGV4LnRyYXZlcnNhYmxlQ2FsbGJhY2sgPSAodGlsZSkgPT4ge1xuICAgICAgICAgIHJldHVybiAhaW5zaWRlIHx8ICgodGlsZSAhPSBudWxsKSAmJiB0aGlzLnRyYXZlcnNhYmxlQ2FsbGJhY2sodGlsZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdmVydGV4LmdldEVuZFBvaW50KCkudGlsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjdG4uZ2V0VGlsZShNYXRoLmZsb29yKHRhcmdldC54KSwgTWF0aC5mbG9vcih0YXJnZXQueSkpO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIEV4cGxvc2l2ZS5wcm9wZXJ0aWVzKHtcbiAgICBybmc6IHtcbiAgICAgIGRlZmF1bHQ6IE1hdGgucmFuZG9tXG4gICAgfSxcbiAgICB0cmF2ZXJzYWJsZUNhbGxiYWNrOiB7XG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgIHJldHVybiAhKHR5cGVvZiB0aWxlLmdldFNvbGlkID09PSAnZnVuY3Rpb24nICYmIHRpbGUuZ2V0U29saWQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gRXhwbG9zaXZlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0RhbWFnZVByb3BhZ2F0aW9uLmpzLm1hcFxuIiwidmFyIERhbWFnZWFibGUsIEVsZW1lbnQ7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBEYW1hZ2VhYmxlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEYW1hZ2VhYmxlIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgZGFtYWdlKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGVhbHRoID0gTWF0aC5tYXgoMCwgdGhpcy5oZWFsdGggLSB2YWwpO1xuICAgIH1cblxuICAgIHdoZW5Ob0hlYWx0aCgpIHt9XG5cbiAgfTtcblxuICBEYW1hZ2VhYmxlLnByb3BlcnRpZXMoe1xuICAgIGRhbWFnZWFibGU6IHtcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIG1heEhlYWx0aDoge1xuICAgICAgZGVmYXVsdDogMTAwMFxuICAgIH0sXG4gICAgaGVhbHRoOiB7XG4gICAgICBkZWZhdWx0OiAxMDAwLFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy53aGVuTm9IZWFsdGgoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIERhbWFnZWFibGU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRGFtYWdlYWJsZS5qcy5tYXBcbiIsInZhciBEb29yLCBUaWxlZDtcblxuVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9vciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRG9vciBleHRlbmRzIFRpbGVkIHtcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3Rpb24gPSBEb29yLmRpcmVjdGlvbnMuaG9yaXpvbnRhbCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHVwZGF0ZVRpbGVNZW1iZXJzKG9sZCkge1xuICAgICAgdmFyIHJlZiwgcmVmMSwgcmVmMiwgcmVmMztcbiAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoKHJlZiA9IG9sZC53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgICByZWYucmVtb3ZlUmVmKCdvcGVuJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChyZWYxID0gb2xkLnRyYW5zcGFyZW50TWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICAgIHJlZjEucmVtb3ZlUmVmKCdvcGVuJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgICAgaWYgKChyZWYyID0gdGhpcy50aWxlLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICAgIHJlZjIuYWRkUHJvcGVydHlSZWYoJ29wZW4nLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHJlZjMgPSB0aGlzLnRpbGUudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsID8gcmVmMy5hZGRQcm9wZXJ0eVJlZignb3BlbicsIHRoaXMpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIERvb3IucHJvcGVydGllcyh7XG4gICAgdGlsZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVGlsZU1lbWJlcnMob2xkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9wZW46IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBkaXJlY3Rpb246IHt9XG4gIH0pO1xuXG4gIERvb3IuZGlyZWN0aW9ucyA9IHtcbiAgICBob3Jpem9udGFsOiAnaG9yaXpvbnRhbCcsXG4gICAgdmVydGljYWw6ICd2ZXJ0aWNhbCdcbiAgfTtcblxuICByZXR1cm4gRG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Eb29yLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FbGVtZW50LmpzLm1hcFxuIiwidmFyIENvbmZyb250YXRpb24sIEVsZW1lbnQsIEVuY291bnRlck1hbmFnZXIsIFByb3BlcnR5V2F0Y2hlcjtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5Qcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuSW52YWxpZGF0ZWQuUHJvcGVydHlXYXRjaGVyO1xuXG5Db25mcm9udGF0aW9uID0gcmVxdWlyZSgnLi9Db25mcm9udGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW5jb3VudGVyTWFuYWdlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRW5jb3VudGVyTWFuYWdlciBleHRlbmRzIEVsZW1lbnQge1xuICAgIGluaXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbldhdGNoZXIuYmluZCgpO1xuICAgIH1cblxuICAgIHRlc3RFbmNvdW50ZXIoKSB7XG4gICAgICBpZiAoTWF0aC5yYW5kb20oKSA8PSB0aGlzLmJhc2VQcm9iYWJpbGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEVuY291bnRlcigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0RW5jb3VudGVyKCkge1xuICAgICAgdmFyIGVuY291bnRlcjtcbiAgICAgIGVuY291bnRlciA9IG5ldyBDb25mcm9udGF0aW9uKHtcbiAgICAgICAgc3ViamVjdDogdGhpcy5zdWJqZWN0XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbmNvdW50ZXIuc3RhcnQoKTtcbiAgICB9XG5cbiAgfTtcblxuICBFbmNvdW50ZXJNYW5hZ2VyLnByb3BlcnRpZXMoe1xuICAgIHN1YmplY3Q6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGJhc2VQcm9iYWJpbGl0eToge1xuICAgICAgZGVmYXVsdDogMC4yXG4gICAgfSxcbiAgICBsb2NhdGlvbldhdGNoZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVzdEVuY291bnRlcigpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcGVydHk6IHRoaXMuc3ViamVjdC5nZXRQcm9wZXJ0eUluc3RhbmNlKCdsb2NhdGlvbicpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEVuY291bnRlck1hbmFnZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRW5jb250ZXJNYW5hZ2VyLmpzLm1hcFxuIiwidmFyIEZsb29yLCBUaWxlO1xuXG5UaWxlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGU7XG5cbm1vZHVsZS5leHBvcnRzID0gRmxvb3IgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEZsb29yIGV4dGVuZHMgVGlsZSB7fTtcblxuICBGbG9vci5wcm9wZXJ0aWVzKHtcbiAgICB3YWxrYWJsZToge1xuICAgICAgY29tcG9zZWQ6IHRydWVcbiAgICB9LFxuICAgIHRyYW5zcGFyZW50OiB7XG4gICAgICBjb21wb3NlZDogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEZsb29yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0Zsb29yLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIEdhbWUsIFBsYXllciwgVGltaW5nLCBWaWV3O1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJyk7XG5cblZpZXcgPSByZXF1aXJlKCcuL1ZpZXcnKTtcblxuUGxheWVyID0gcmVxdWlyZSgnLi9QbGF5ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHYW1lIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgc3RhcnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyO1xuICAgIH1cblxuICAgIGFkZChlbGVtKSB7XG4gICAgICBlbGVtLmdhbWUgPSB0aGlzO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuXG4gIH07XG5cbiAgR2FtZS5wcm9wZXJ0aWVzKHtcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltaW5nKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWluVmlldzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMudmlld3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdzLmdldCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IHRoaXMuZGVmYXVsdFZpZXdDbGFzcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdmlld3M6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9LFxuICAgIGN1cnJlbnRQbGF5ZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcnMuZ2V0KDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmFkZChuZXcgdGhpcy5kZWZhdWx0UGxheWVyQ2xhc3MoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsYXllcnM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRWaWV3Q2xhc3MgPSBWaWV3O1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRQbGF5ZXJDbGFzcyA9IFBsYXllcjtcblxuICByZXR1cm4gR2FtZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9HYW1lLmpzLm1hcFxuIiwidmFyIENvbGxlY3Rpb24sIEludmVudG9yeTtcblxuQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5Db2xsZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVudG9yeSA9IGNsYXNzIEludmVudG9yeSBleHRlbmRzIENvbGxlY3Rpb24ge1xuICBnZXRCeVR5cGUodHlwZSkge1xuICAgIHZhciByZXM7XG4gICAgcmVzID0gdGhpcy5maWx0ZXIoZnVuY3Rpb24ocikge1xuICAgICAgcmV0dXJuIHIudHlwZSA9PT0gdHlwZTtcbiAgICB9KTtcbiAgICBpZiAocmVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlc1swXTtcbiAgICB9XG4gIH1cblxuICBhZGRCeVR5cGUodHlwZSwgcXRlLCBwYXJ0aWFsID0gZmFsc2UpIHtcbiAgICB2YXIgcmVzc291cmNlO1xuICAgIHJlc3NvdXJjZSA9IHRoaXMuZ2V0QnlUeXBlKHR5cGUpO1xuICAgIGlmICghcmVzc291cmNlKSB7XG4gICAgICByZXNzb3VyY2UgPSB0aGlzLmluaXRSZXNzb3VyY2UodHlwZSk7XG4gICAgfVxuICAgIGlmIChwYXJ0aWFsKSB7XG4gICAgICByZXR1cm4gcmVzc291cmNlLnBhcnRpYWxDaGFuZ2UocmVzc291cmNlLnF0ZSArIHF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNzb3VyY2UucXRlICs9IHF0ZTtcbiAgICB9XG4gIH1cblxuICBpbml0UmVzc291cmNlKHR5cGUsIG9wdCkge1xuICAgIHJldHVybiB0eXBlLmluaXRSZXNzb3VyY2Uob3B0KTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0ludmVudG9yeS5qcy5tYXBcbiIsInZhciBMaW5lT2ZTaWdodDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lT2ZTaWdodCA9IGNsYXNzIExpbmVPZlNpZ2h0IHtcbiAgY29uc3RydWN0b3IodGlsZXMsIHgxID0gMCwgeTEgPSAwLCB4MiA9IDAsIHkyID0gMCkge1xuICAgIHRoaXMudGlsZXMgPSB0aWxlcztcbiAgICB0aGlzLngxID0geDE7XG4gICAgdGhpcy55MSA9IHkxO1xuICAgIHRoaXMueDIgPSB4MjtcbiAgICB0aGlzLnkyID0geTI7XG4gIH1cblxuICBzZXRYMSh2YWwpIHtcbiAgICB0aGlzLngxID0gdmFsO1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhZGUoKTtcbiAgfVxuXG4gIHNldFkxKHZhbCkge1xuICAgIHRoaXMueTEgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZGFkZSgpO1xuICB9XG5cbiAgc2V0WDIodmFsKSB7XG4gICAgdGhpcy54MiA9IHZhbDtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkYWRlKCk7XG4gIH1cblxuICBzZXRZMih2YWwpIHtcbiAgICB0aGlzLnkyID0gdmFsO1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhZGUoKTtcbiAgfVxuXG4gIGludmFsaWRhZGUoKSB7XG4gICAgdGhpcy5lbmRQb2ludCA9IG51bGw7XG4gICAgdGhpcy5zdWNjZXNzID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XG4gIH1cblxuICB0ZXN0VGlsZSh0aWxlLCBlbnRyeVgsIGVudHJ5WSkge1xuICAgIGlmICh0aGlzLnRyYXZlcnNhYmxlQ2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhdmVyc2FibGVDYWxsYmFjayh0aWxlLCBlbnRyeVgsIGVudHJ5WSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodGlsZSAhPSBudWxsKSAmJiAodHlwZW9mIHRpbGUuZ2V0VHJhbnNwYXJlbnQgPT09ICdmdW5jdGlvbicgPyB0aWxlLmdldFRyYW5zcGFyZW50KCkgOiB0eXBlb2YgdGlsZS50cmFuc3BhcmVudCAhPT0gdm9pZCAwID8gdGlsZS50cmFuc3BhcmVudCA6IHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHRlc3RUaWxlQXQoeCwgeSwgZW50cnlYLCBlbnRyeVkpIHtcbiAgICByZXR1cm4gdGhpcy50ZXN0VGlsZSh0aGlzLnRpbGVzLmdldFRpbGUoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSksIGVudHJ5WCwgZW50cnlZKTtcbiAgfVxuXG4gIHJldmVyc2VUcmFjaW5nKCkge1xuICAgIHZhciB0bXBYLCB0bXBZO1xuICAgIHRtcFggPSB0aGlzLngxO1xuICAgIHRtcFkgPSB0aGlzLnkxO1xuICAgIHRoaXMueDEgPSB0aGlzLngyO1xuICAgIHRoaXMueTEgPSB0aGlzLnkyO1xuICAgIHRoaXMueDIgPSB0bXBYO1xuICAgIHRoaXMueTIgPSB0bXBZO1xuICAgIHJldHVybiB0aGlzLnJldmVyc2VkID0gIXRoaXMucmV2ZXJzZWQ7XG4gIH1cblxuICBjYWxjdWwoKSB7XG4gICAgdmFyIG5leHRYLCBuZXh0WSwgcG9zaXRpdmVYLCBwb3NpdGl2ZVksIHJhdGlvLCB0aWxlWCwgdGlsZVksIHRvdGFsLCB4LCB5O1xuICAgIHJhdGlvID0gKHRoaXMueDIgLSB0aGlzLngxKSAvICh0aGlzLnkyIC0gdGhpcy55MSk7XG4gICAgdG90YWwgPSBNYXRoLmFicyh0aGlzLngyIC0gdGhpcy54MSkgKyBNYXRoLmFicyh0aGlzLnkyIC0gdGhpcy55MSk7XG4gICAgcG9zaXRpdmVYID0gKHRoaXMueDIgLSB0aGlzLngxKSA+PSAwO1xuICAgIHBvc2l0aXZlWSA9ICh0aGlzLnkyIC0gdGhpcy55MSkgPj0gMDtcbiAgICB0aWxlWCA9IHggPSB0aGlzLngxO1xuICAgIHRpbGVZID0geSA9IHRoaXMueTE7XG4gICAgaWYgKHRoaXMucmV2ZXJzZWQpIHtcbiAgICAgIHRpbGVYID0gcG9zaXRpdmVYID8geCA6IE1hdGguY2VpbCh4KSAtIDE7XG4gICAgICB0aWxlWSA9IHBvc2l0aXZlWSA/IHkgOiBNYXRoLmNlaWwoeSkgLSAxO1xuICAgIH1cbiAgICB3aGlsZSAodG90YWwgPiBNYXRoLmFicyh4IC0gdGhpcy54MSkgKyBNYXRoLmFicyh5IC0gdGhpcy55MSkgJiYgdGhpcy50ZXN0VGlsZUF0KHRpbGVYLCB0aWxlWSwgeCwgeSkpIHtcbiAgICAgIG5leHRYID0gcG9zaXRpdmVYID8gTWF0aC5mbG9vcih4KSArIDEgOiBNYXRoLmNlaWwoeCkgLSAxO1xuICAgICAgbmV4dFkgPSBwb3NpdGl2ZVkgPyBNYXRoLmZsb29yKHkpICsgMSA6IE1hdGguY2VpbCh5KSAtIDE7XG4gICAgICBpZiAodGhpcy54MiAtIHRoaXMueDEgPT09IDApIHtcbiAgICAgICAgeSA9IG5leHRZO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnkyIC0gdGhpcy55MSA9PT0gMCkge1xuICAgICAgICB4ID0gbmV4dFg7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKChuZXh0WCAtIHgpIC8gKHRoaXMueDIgLSB0aGlzLngxKSkgPCBNYXRoLmFicygobmV4dFkgLSB5KSAvICh0aGlzLnkyIC0gdGhpcy55MSkpKSB7XG4gICAgICAgIHggPSBuZXh0WDtcbiAgICAgICAgeSA9IChuZXh0WCAtIHRoaXMueDEpIC8gcmF0aW8gKyB0aGlzLnkxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IChuZXh0WSAtIHRoaXMueTEpICogcmF0aW8gKyB0aGlzLngxO1xuICAgICAgICB5ID0gbmV4dFk7XG4gICAgICB9XG4gICAgICB0aWxlWCA9IHBvc2l0aXZlWCA/IHggOiBNYXRoLmNlaWwoeCkgLSAxO1xuICAgICAgdGlsZVkgPSBwb3NpdGl2ZVkgPyB5IDogTWF0aC5jZWlsKHkpIC0gMTtcbiAgICB9XG4gICAgaWYgKHRvdGFsIDw9IE1hdGguYWJzKHggLSB0aGlzLngxKSArIE1hdGguYWJzKHkgLSB0aGlzLnkxKSkge1xuICAgICAgdGhpcy5lbmRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy54MixcbiAgICAgICAgeTogdGhpcy55MixcbiAgICAgICAgdGlsZTogdGhpcy50aWxlcy5nZXRUaWxlKE1hdGguZmxvb3IodGhpcy54MiksIE1hdGguZmxvb3IodGhpcy55MikpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMuc3VjY2VzcyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5kUG9pbnQgPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHRpbGU6IHRoaXMudGlsZXMuZ2V0VGlsZShNYXRoLmZsb29yKHRpbGVYKSwgTWF0aC5mbG9vcih0aWxlWSkpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMuc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZvcmNlU3VjY2VzcygpIHtcbiAgICB0aGlzLmVuZFBvaW50ID0ge1xuICAgICAgeDogdGhpcy54MixcbiAgICAgIHk6IHRoaXMueTIsXG4gICAgICB0aWxlOiB0aGlzLnRpbGVzLmdldFRpbGUoTWF0aC5mbG9vcih0aGlzLngyKSwgTWF0aC5mbG9vcih0aGlzLnkyKSlcbiAgICB9O1xuICAgIHRoaXMuc3VjY2VzcyA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlZCA9IHRydWU7XG4gIH1cblxuICBnZXRTdWNjZXNzKCkge1xuICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XG4gICAgICB0aGlzLmNhbGN1bCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzO1xuICB9XG5cbiAgZ2V0RW5kUG9pbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNhbGN1bGF0ZWQpIHtcbiAgICAgIHRoaXMuY2FsY3VsKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVuZFBvaW50O1xuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTGluZU9mU2lnaHQuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgTWFwO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBNYXAgZXh0ZW5kcyBFbGVtZW50IHt9O1xuXG4gIE1hcC5wcm9wZXJ0aWVzKHtcbiAgICBsb2NhdGlvbnM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHtcbiAgICAgICAgY2xvc2VzdDogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgIHZhciBtaW4sIG1pbkRpc3Q7XG4gICAgICAgICAgbWluID0gbnVsbDtcbiAgICAgICAgICBtaW5EaXN0ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24obG9jYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBkaXN0O1xuICAgICAgICAgICAgZGlzdCA9IGxvY2F0aW9uLmRpc3QoeCwgeSk7XG4gICAgICAgICAgICBpZiAoKG1pbiA9PSBudWxsKSB8fCBtaW5EaXN0ID4gZGlzdCkge1xuICAgICAgICAgICAgICBtaW4gPSBsb2NhdGlvbjtcbiAgICAgICAgICAgICAgcmV0dXJuIG1pbkRpc3QgPSBkaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBtaW47XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3Nlc3RzOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgdmFyIGRpc3RzO1xuICAgICAgICAgIGRpc3RzID0gdGhpcy5tYXAoZnVuY3Rpb24obG9jYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGRpc3Q6IGxvY2F0aW9uLmRpc3QoeCwgeSksXG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkaXN0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLmRpc3QgLSBiLmRpc3Q7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29weShkaXN0cy5tYXAoZnVuY3Rpb24oZGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3QubG9jYXRpb247XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gTWFwO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL01hcC5qcy5tYXBcbiIsInZhciBPYnN0YWNsZSwgVGlsZWQ7XG5cblRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic3RhY2xlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBPYnN0YWNsZSBleHRlbmRzIFRpbGVkIHtcbiAgICB1cGRhdGVXYWxrYWJsZXMob2xkKSB7XG4gICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgIGlmICgocmVmID0gb2xkLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICAgIHJlZi5yZW1vdmVSZWYoJ3dhbGthYmxlJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgICAgcmV0dXJuIChyZWYxID0gdGhpcy50aWxlLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCA/IHJlZjEuc2V0VmFsdWVSZWYoZmFsc2UsICd3YWxrYWJsZScsIHRoaXMpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIE9ic3RhY2xlLnByb3BlcnRpZXMoe1xuICAgIHRpbGU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24ob2xkLCBvdmVycmlkZWQpIHtcbiAgICAgICAgb3ZlcnJpZGVkKG9sZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVdhbGthYmxlcyhvbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIE9ic3RhY2xlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL09ic3RhY2xlLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIEV2ZW50RW1pdHRlciwgUGF0aFdhbGssIFRpbWluZztcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5UaW1pbmcgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpO1xuXG5FdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRFbWl0dGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhdGhXYWxrID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBQYXRoV2FsayBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHdhbGtlciwgcGF0aCwgb3B0aW9ucykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMud2Fsa2VyID0gd2Fsa2VyO1xuICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgIGlmICghdGhpcy5wYXRoLnNvbHV0aW9uKSB7XG4gICAgICAgIHRoaXMucGF0aC5jYWxjdWwoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhdGguc29sdXRpb24pIHtcbiAgICAgICAgdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZpbmlzaCgpO1xuICAgICAgICB9LCB0aGlzLnRvdGFsVGltZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhUaW1lb3V0LnVwZGF0ZXIuYWRkQ2FsbGJhY2sodGhpcy5jYWxsYmFjaygndXBkYXRlJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoVGltZW91dC5wYXVzZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBwb3M7XG4gICAgICBwb3MgPSB0aGlzLnBhdGguZ2V0UG9zQXRQcmModGhpcy5wYXRoVGltZW91dC5nZXRQcmMoKSk7XG4gICAgICB0aGlzLndhbGtlci50aWxlID0gcG9zLnRpbGU7XG4gICAgICB0aGlzLndhbGtlci5vZmZzZXRYID0gcG9zLm9mZnNldFg7XG4gICAgICByZXR1cm4gdGhpcy53YWxrZXIub2Zmc2V0WSA9IHBvcy5vZmZzZXRZO1xuICAgIH1cblxuICAgIGZpbmlzaCgpIHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2ZpbmlzaGVkJyk7XG4gICAgICByZXR1cm4gdGhpcy5lbmQoKTtcbiAgICB9XG5cbiAgICBpbnRlcnJ1cHQoKSB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgdGhpcy50cmlnZ2VyKCdpbnRlcnJ1cHRlZCcpO1xuICAgICAgcmV0dXJuIHRoaXMuZW5kKCk7XG4gICAgfVxuXG4gICAgZW5kKCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdlbmQnKTtcbiAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgaWYgKHRoaXMud2Fsa2VyLndhbGsgPT09IHRoaXMpIHtcbiAgICAgICAgdGhpcy53YWxrZXIud2FsayA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLnBhdGhUaW1lb3V0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuZGVzdHJveVByb3BlcnRpZXMoKTtcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIH1cblxuICB9O1xuXG4gIFBhdGhXYWxrLmluY2x1ZGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5cbiAgUGF0aFdhbGsucHJvcGVydGllcyh7XG4gICAgc3BlZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IDVcbiAgICB9LFxuICAgIHRpbWluZzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhdGhMZW5ndGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGguc29sdXRpb24uZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvdGFsVGltZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aExlbmd0aCAvIHRoaXMuc3BlZWQgKiAxMDAwO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFBhdGhXYWxrO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1BhdGhXYWxrLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIExpbmVPZlNpZ2h0LCBQZXJzb25hbFdlYXBvbiwgVGltaW5nO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbkxpbmVPZlNpZ2h0ID0gcmVxdWlyZSgnLi9MaW5lT2ZTaWdodCcpO1xuXG5UaW1pbmcgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBlcnNvbmFsV2VhcG9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBQZXJzb25hbFdlYXBvbiBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY2FuQmVVc2VkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hhcmdlZDtcbiAgICB9XG5cbiAgICBjYW5Vc2VPbih0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhblVzZUZyb20odGhpcy51c2VyLnRpbGUsIHRhcmdldCk7XG4gICAgfVxuXG4gICAgY2FuVXNlRnJvbSh0aWxlLCB0YXJnZXQpIHtcbiAgICAgIGlmICh0aGlzLnJhbmdlID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluTWVsZWVSYW5nZSh0aWxlLCB0YXJnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5SYW5nZSh0aWxlLCB0YXJnZXQpICYmIHRoaXMuaGFzTGluZU9mU2lnaHQodGlsZSwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpblJhbmdlKHRpbGUsIHRhcmdldCkge1xuICAgICAgdmFyIHJlZiwgdGFyZ2V0VGlsZTtcbiAgICAgIHRhcmdldFRpbGUgPSB0YXJnZXQudGlsZSB8fCB0YXJnZXQ7XG4gICAgICByZXR1cm4gKChyZWYgPSB0aWxlLmRpc3QodGFyZ2V0VGlsZSkpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSA8PSB0aGlzLnJhbmdlO1xuICAgIH1cblxuICAgIGluTWVsZWVSYW5nZSh0aWxlLCB0YXJnZXQpIHtcbiAgICAgIHZhciB0YXJnZXRUaWxlO1xuICAgICAgdGFyZ2V0VGlsZSA9IHRhcmdldC50aWxlIHx8IHRhcmdldDtcbiAgICAgIHJldHVybiBNYXRoLmFicyh0YXJnZXRUaWxlLnggLSB0aWxlLngpICsgTWF0aC5hYnModGFyZ2V0VGlsZS55IC0gdGlsZS55KSA9PT0gMTtcbiAgICB9XG5cbiAgICBoYXNMaW5lT2ZTaWdodCh0aWxlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBsb3MsIHRhcmdldFRpbGU7XG4gICAgICB0YXJnZXRUaWxlID0gdGFyZ2V0LnRpbGUgfHwgdGFyZ2V0O1xuICAgICAgbG9zID0gbmV3IExpbmVPZlNpZ2h0KHRhcmdldFRpbGUuY29udGFpbmVyLCB0aWxlLnggKyAwLjUsIHRpbGUueSArIDAuNSwgdGFyZ2V0VGlsZS54ICsgMC41LCB0YXJnZXRUaWxlLnkgKyAwLjUpO1xuICAgICAgbG9zLnRyYXZlcnNhYmxlQ2FsbGJhY2sgPSBmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgIHJldHVybiB0aWxlLndhbGthYmxlO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBsb3MuZ2V0U3VjY2VzcygpO1xuICAgIH1cblxuICAgIHVzZU9uKHRhcmdldCkge1xuICAgICAgaWYgKHRoaXMuY2FuQmVVc2VkKCkpIHtcbiAgICAgICAgdGFyZ2V0LmRhbWFnZSh0aGlzLnBvd2VyKTtcbiAgICAgICAgdGhpcy5jaGFyZ2VkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2hhcmdlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVjaGFyZ2UoKSB7XG4gICAgICB0aGlzLmNoYXJnaW5nID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLmNoYXJnZVRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFyZ2luZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNoYXJnZWQoKTtcbiAgICAgIH0sIHRoaXMucmVjaGFyZ2VUaW1lKTtcbiAgICB9XG5cbiAgICByZWNoYXJnZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFyZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgaWYgKHRoaXMuY2hhcmdlVGltZW91dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFyZ2VUaW1lb3V0LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBQZXJzb25hbFdlYXBvbi5wcm9wZXJ0aWVzKHtcbiAgICByZWNoYXJnZVRpbWU6IHtcbiAgICAgIGRlZmF1bHQ6IDEwMDBcbiAgICB9LFxuICAgIGNoYXJnZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGNoYXJnaW5nOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBwb3dlcjoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIGRwczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCgncG93ZXInKSAvIGludmFsaWRhdG9yLnByb3AoJ3JlY2hhcmdlVGltZScpICogMTAwMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJhbmdlOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgdXNlcjoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgdGltaW5nOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbWluZygpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFBlcnNvbmFsV2VhcG9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1BlcnNvbmFsV2VhcG9uLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIEV2ZW50RW1pdHRlciwgUGxheWVyO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FdmVudEVtaXR0ZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgdmFyIGZpcnN0O1xuICAgICAgZmlyc3QgPSB0aGlzLmdhbWUucGxheWVycy5sZW5ndGggPT09IDA7XG4gICAgICB0aGlzLmdhbWUucGxheWVycy5hZGQodGhpcyk7XG4gICAgICBpZiAoZmlyc3QgJiYgIXRoaXMuY29udHJvbGxlciAmJiB0aGlzLmdhbWUuZGVmYXVsdFBsYXllckNvbnRyb2xsZXJDbGFzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyID0gbmV3IHRoaXMuZ2FtZS5kZWZhdWx0UGxheWVyQ29udHJvbGxlckNsYXNzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FuVGFyZ2V0QWN0aW9uT24oZWxlbSkge1xuICAgICAgdmFyIGFjdGlvbiwgcmVmO1xuICAgICAgYWN0aW9uID0gdGhpcy5zZWxlY3RlZEFjdGlvbiB8fCAoKHJlZiA9IHRoaXMuc2VsZWN0ZWQpICE9IG51bGwgPyByZWYuZGVmYXVsdEFjdGlvbiA6IHZvaWQgMCk7XG4gICAgICByZXR1cm4gKGFjdGlvbiAhPSBudWxsKSAmJiB0eXBlb2YgYWN0aW9uLmNhblRhcmdldCA9PT0gXCJmdW5jdGlvblwiICYmIGFjdGlvbi5jYW5UYXJnZXQoZWxlbSk7XG4gICAgfVxuXG4gICAgY2FuU2VsZWN0KGVsZW0pIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZWxlbS5pc1NlbGVjdGFibGVCeSA9PT0gXCJmdW5jdGlvblwiICYmIGVsZW0uaXNTZWxlY3RhYmxlQnkodGhpcyk7XG4gICAgfVxuXG4gICAgY2FuRm9jdXNPbihlbGVtKSB7XG4gICAgICBpZiAodHlwZW9mIGVsZW0uSXNGb2N1c2FibGVCeSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBlbGVtLklzRm9jdXNhYmxlQnkodGhpcyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtLklzU2VsZWN0YWJsZUJ5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGVsZW0uSXNTZWxlY3RhYmxlQnkodGhpcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0QWN0aW9uVGFyZ2V0KGVsZW0pIHtcbiAgICAgIHZhciBhY3Rpb24sIHJlZjtcbiAgICAgIGFjdGlvbiA9IHRoaXMuc2VsZWN0ZWRBY3Rpb24gfHwgKChyZWYgPSB0aGlzLnNlbGVjdGVkKSAhPSBudWxsID8gcmVmLmRlZmF1bHRBY3Rpb24gOiB2b2lkIDApO1xuICAgICAgYWN0aW9uID0gYWN0aW9uLndpdGhUYXJnZXQoZWxlbSk7XG4gICAgICBpZiAoYWN0aW9uLmlzUmVhZHkoKSkge1xuICAgICAgICBhY3Rpb24uc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRBY3Rpb24gPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRBY3Rpb24gPSBhY3Rpb247XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgUGxheWVyLmluY2x1ZGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5cbiAgUGxheWVyLnByb3BlcnRpZXMoe1xuICAgIG5hbWU6IHtcbiAgICAgIGRlZmF1bHQ6ICdQbGF5ZXInXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7fSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgaWYgKG9sZCAhPSBudWxsID8gb2xkLmdldFByb3BlcnR5KCdzZWxlY3RlZCcpIDogdm9pZCAwKSB7XG4gICAgICAgICAgb2xkLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChyZWYgPSB0aGlzLnNlbGVjdGVkKSAhPSBudWxsID8gcmVmLmdldFByb3BlcnR5KCdzZWxlY3RlZCcpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQuc2VsZWN0ZWQgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3RlZEFjdGlvbjoge30sXG4gICAgY29udHJvbGxlcjoge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlcikge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIucGxheWVyID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQbGF5ZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvUGxheWVyLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFByb2plY3RpbGUsIFRpbWluZztcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5UaW1pbmcgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RpbGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFByb2plY3RpbGUgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG9wdGlvbnMpO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHt9XG5cbiAgICBsYXVuY2goKSB7XG4gICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRlbGl2ZXJQYXlsb2FkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgfSwgdGhpcy5wYXRoTGVuZ3RoIC8gdGhpcy5zcGVlZCAqIDEwMDApO1xuICAgIH1cblxuICAgIGRlbGl2ZXJQYXlsb2FkKCkge1xuICAgICAgdmFyIHBheWxvYWQ7XG4gICAgICBwYXlsb2FkID0gbmV3IHRoaXMucHJvcGFnYXRpb25UeXBlKHtcbiAgICAgICAgdGlsZTogdGhpcy50YXJnZXQudGlsZSB8fCB0aGlzLnRhcmdldCxcbiAgICAgICAgcG93ZXI6IHRoaXMucG93ZXIsXG4gICAgICAgIHJhbmdlOiB0aGlzLmJsYXN0UmFuZ2VcbiAgICAgIH0pO1xuICAgICAgcGF5bG9hZC5hcHBseSgpO1xuICAgICAgdGhpcy5wYXlsb2FkRGVsaXZlcmVkKCk7XG4gICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBwYXlsb2FkRGVsaXZlcmVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZXN0cm95UHJvcGVydGllcygpO1xuICAgIH1cblxuICB9O1xuXG4gIFByb2plY3RpbGUucHJvcGVydGllcyh7XG4gICAgb3JpZ2luOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICB0YXJnZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHBvd2VyOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgYmxhc3RSYW5nZToge1xuICAgICAgZGVmYXVsdDogMVxuICAgIH0sXG4gICAgcHJvcGFnYXRpb25UeXBlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBzcGVlZDoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIHBhdGhMZW5ndGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXN0O1xuICAgICAgICBpZiAoKHRoaXMub3JpZ2luVGlsZSAhPSBudWxsKSAmJiAodGhpcy50YXJnZXRUaWxlICE9IG51bGwpKSB7XG4gICAgICAgICAgZGlzdCA9IHRoaXMub3JpZ2luVGlsZS5kaXN0KHRoaXMudGFyZ2V0VGlsZSk7XG4gICAgICAgICAgaWYgKGRpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXN0Lmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yaWdpblRpbGU6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIG9yaWdpbjtcbiAgICAgICAgb3JpZ2luID0gaW52YWxpZGF0b3IucHJvcCgnb3JpZ2luJyk7XG4gICAgICAgIGlmIChvcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvcmlnaW4udGlsZSB8fCBvcmlnaW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHRhcmdldFRpbGU6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHRhcmdldDtcbiAgICAgICAgdGFyZ2V0ID0gaW52YWxpZGF0b3IucHJvcCgndGFyZ2V0Jyk7XG4gICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQudGlsZSB8fCB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRhaW5lcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHZhciBvcmlnaW5UaWxlLCB0YXJnZXRUaWxlO1xuICAgICAgICBvcmlnaW5UaWxlID0gaW52YWxpZGF0ZS5wcm9wKCdvcmlnaW5UaWxlJyk7XG4gICAgICAgIHRhcmdldFRpbGUgPSBpbnZhbGlkYXRlLnByb3AoJ3RhcmdldFRpbGUnKTtcbiAgICAgICAgaWYgKG9yaWdpblRpbGUuY29udGFpbmVyID09PSB0YXJnZXRUaWxlLmNvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybiBvcmlnaW5UaWxlLmNvbnRhaW5lcjtcbiAgICAgICAgfSBlbHNlIGlmIChpbnZhbGlkYXRlLnByb3AoJ3ByY1BhdGgnKSA+IDAuNSkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXRUaWxlLmNvbnRhaW5lcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb3JpZ2luVGlsZS5jb250YWluZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICB2YXIgc3RhcnRQb3M7XG4gICAgICAgIHN0YXJ0UG9zID0gaW52YWxpZGF0ZS5wcm9wKCdzdGFydFBvcycpO1xuICAgICAgICByZXR1cm4gKGludmFsaWRhdGUucHJvcCgndGFyZ2V0UG9zJykueCAtIHN0YXJ0UG9zLngpICogaW52YWxpZGF0ZS5wcm9wKCdwcmNQYXRoJykgKyBzdGFydFBvcy54O1xuICAgICAgfVxuICAgIH0sXG4gICAgeToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHZhciBzdGFydFBvcztcbiAgICAgICAgc3RhcnRQb3MgPSBpbnZhbGlkYXRlLnByb3AoJ3N0YXJ0UG9zJyk7XG4gICAgICAgIHJldHVybiAoaW52YWxpZGF0ZS5wcm9wKCd0YXJnZXRQb3MnKS55IC0gc3RhcnRQb3MueSkgKiBpbnZhbGlkYXRlLnByb3AoJ3ByY1BhdGgnKSArIHN0YXJ0UG9zLnk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydFBvczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHZhciBjb250YWluZXIsIGRpc3QsIG9mZnNldCwgb3JpZ2luVGlsZTtcbiAgICAgICAgb3JpZ2luVGlsZSA9IGludmFsaWRhdGUucHJvcCgnb3JpZ2luVGlsZScpO1xuICAgICAgICBjb250YWluZXIgPSBpbnZhbGlkYXRlLnByb3AoJ2NvbnRhaW5lcicpO1xuICAgICAgICBvZmZzZXQgPSB0aGlzLnN0YXJ0T2Zmc2V0O1xuICAgICAgICBpZiAob3JpZ2luVGlsZS5jb250YWluZXIgIT09IGNvbnRhaW5lcikge1xuICAgICAgICAgIGRpc3QgPSBjb250YWluZXIuZGlzdChvcmlnaW5UaWxlLmNvbnRhaW5lcik7XG4gICAgICAgICAgb2Zmc2V0LnggKz0gZGlzdC54O1xuICAgICAgICAgIG9mZnNldC55ICs9IGRpc3QueTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IG9yaWdpblRpbGUueCArIG9mZnNldC54LFxuICAgICAgICAgIHk6IG9yaWdpblRpbGUueSArIG9mZnNldC55XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgb3V0cHV0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHZhbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0YXJnZXRQb3M6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICB2YXIgY29udGFpbmVyLCBkaXN0LCBvZmZzZXQsIHRhcmdldFRpbGU7XG4gICAgICAgIHRhcmdldFRpbGUgPSBpbnZhbGlkYXRlLnByb3AoJ3RhcmdldFRpbGUnKTtcbiAgICAgICAgY29udGFpbmVyID0gaW52YWxpZGF0ZS5wcm9wKCdjb250YWluZXInKTtcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy50YXJnZXRPZmZzZXQ7XG4gICAgICAgIGlmICh0YXJnZXRUaWxlLmNvbnRhaW5lciAhPT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgZGlzdCA9IGNvbnRhaW5lci5kaXN0KHRhcmdldFRpbGUuY29udGFpbmVyKTtcbiAgICAgICAgICBvZmZzZXQueCArPSBkaXN0Lng7XG4gICAgICAgICAgb2Zmc2V0LnkgKz0gZGlzdC55O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogdGFyZ2V0VGlsZS54ICsgb2Zmc2V0LngsXG4gICAgICAgICAgeTogdGFyZ2V0VGlsZS55ICsgb2Zmc2V0LnlcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdmFsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0T2Zmc2V0OiB7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHg6IDAuNSxcbiAgICAgICAgeTogMC41XG4gICAgICB9LFxuICAgICAgb3V0cHV0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHZhbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0YXJnZXRPZmZzZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgeDogMC41LFxuICAgICAgICB5OiAwLjVcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdmFsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHByY1BhdGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHJldHVybiAoKHJlZiA9IHRoaXMucGF0aFRpbWVvdXQpICE9IG51bGwgPyByZWYuZ2V0UHJjKCkgOiB2b2lkIDApIHx8IDA7XG4gICAgICB9XG4gICAgfSxcbiAgICB0aW1pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltaW5nKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3Zpbmc6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUHJvamVjdGlsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Qcm9qZWN0aWxlLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFJlc3NvdXJjZTtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3NvdXJjZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUmVzc291cmNlIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgcGFydGlhbENoYW5nZShxdGUpIHtcbiAgICAgIHZhciBhY2NlcHRhYmxlO1xuICAgICAgYWNjZXB0YWJsZSA9IE1hdGgubWF4KHRoaXMubWluUXRlLCBNYXRoLm1pbih0aGlzLm1heFF0ZSwgcXRlKSk7XG4gICAgICB0aGlzLnF0ZSA9IGFjY2VwdGFibGU7XG4gICAgICByZXR1cm4gcXRlIC0gYWNjZXB0YWJsZTtcbiAgICB9XG5cbiAgfTtcblxuICBSZXNzb3VyY2UucHJvcGVydGllcyh7XG4gICAgdHlwZToge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgcXRlOiB7XG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgaW5nZXN0OiBmdW5jdGlvbihxdGUpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4UXRlICE9PSBudWxsICYmIHF0ZSA+IHRoaXMubWF4UXRlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGhhdmUgbW9yZSB0aGFuICcgKyB0aGlzLm1heFF0ZSArICcgb2YgJyArIHRoaXMudHlwZS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5taW5RdGUgIT09IG51bGwgJiYgcXRlIDwgdGhpcy5taW5RdGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgaGF2ZSBsZXNzIHRoYW4gJyArIHRoaXMubWluUXRlICsgJyBvZiAnICsgdGhpcy50eXBlLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdGU7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYXhRdGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG1pblF0ZToge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJlc3NvdXJjZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9SZXNzb3VyY2UuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgUmVzc291cmNlLCBSZXNzb3VyY2VUeXBlO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblJlc3NvdXJjZSA9IHJlcXVpcmUoJy4vUmVzc291cmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzc291cmNlVHlwZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUmVzc291cmNlVHlwZSBleHRlbmRzIEVsZW1lbnQge1xuICAgIGluaXRSZXNzb3VyY2Uob3B0KSB7XG4gICAgICBpZiAodHlwZW9mIG9wdCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICBvcHQgPSB7XG4gICAgICAgICAgcXRlOiBvcHRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdCk7XG4gICAgICByZXR1cm4gbmV3IHRoaXMucmVzc291cmNlQ2xhc3Mob3B0KTtcbiAgICB9XG5cbiAgfTtcblxuICBSZXNzb3VyY2VUeXBlLnByb3BlcnRpZXMoe1xuICAgIG5hbWU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHJlc3NvdXJjZUNsYXNzOiB7XG4gICAgICBkZWZhdWx0OiBSZXNzb3VyY2VcbiAgICB9LFxuICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICBkZWZhdWx0OiB7fVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJlc3NvdXJjZVR5cGU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvUmVzc291cmNlVHlwZS5qcy5tYXBcbiIsInZhciBEaXJlY3Rpb24sIERvb3IsIEVsZW1lbnQsIFJvb21HZW5lcmF0b3IsIFRpbGUsIFRpbGVDb250YWluZXIsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblRpbGVDb250YWluZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZUNvbnRhaW5lcjtcblxuVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlO1xuXG5EaXJlY3Rpb24gPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuRGlyZWN0aW9uO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9Eb29yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vbUdlbmVyYXRvciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUm9vbUdlbmVyYXRvciBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaW5pdFRpbGVzKCkge1xuICAgICAgdGhpcy5maW5hbFRpbGVzID0gbnVsbDtcbiAgICAgIHRoaXMucm9vbXMgPSBbXTtcbiAgICAgIHJldHVybiB0aGlzLmZyZWUgPSB0aGlzLnRpbGVDb250YWluZXIuYWxsVGlsZXMoKS5maWx0ZXIoKHRpbGUpID0+IHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiwgaywgbGVuLCBuZXh0LCByZWY7XG4gICAgICAgIHJlZiA9IERpcmVjdGlvbi5hbGw7XG4gICAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIGRpcmVjdGlvbiA9IHJlZltrXTtcbiAgICAgICAgICBuZXh0ID0gdGhpcy50aWxlQ29udGFpbmVyLmdldFRpbGUodGlsZS54ICsgZGlyZWN0aW9uLngsIHRpbGUueSArIGRpcmVjdGlvbi55KTtcbiAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsKCkge1xuICAgICAgdmFyIGk7XG4gICAgICB0aGlzLmluaXRUaWxlcygpO1xuICAgICAgaSA9IDA7XG4gICAgICB3aGlsZSAodGhpcy5zdGVwKCkgfHwgdGhpcy5uZXdSb29tKCkpIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgdGhpcy5jcmVhdGVEb29ycygpO1xuICAgICAgdGhpcy5yb29tcztcbiAgICAgIHJldHVybiB0aGlzLm1ha2VGaW5hbFRpbGVzKCk7XG4gICAgfVxuXG4gICAgbWFrZUZpbmFsVGlsZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maW5hbFRpbGVzID0gdGhpcy50aWxlQ29udGFpbmVyLmFsbFRpbGVzKCkubWFwKCh0aWxlKSA9PiB7XG4gICAgICAgIHZhciBvcHQ7XG4gICAgICAgIGlmICh0aWxlLmZhY3RvcnkgIT0gbnVsbCkge1xuICAgICAgICAgIG9wdCA9IHtcbiAgICAgICAgICAgIHg6IHRpbGUueCxcbiAgICAgICAgICAgIHk6IHRpbGUueVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHRpbGUuZmFjdG9yeU9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0ID0gT2JqZWN0LmFzc2lnbihvcHQsIHRpbGUuZmFjdG9yeU9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGlsZS5mYWN0b3J5KG9wdCk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZpbHRlcigodGlsZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGlsZSAhPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0VGlsZXMoKSB7XG4gICAgICBpZiAodGhpcy5maW5hbFRpbGVzID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jYWxjdWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmZpbmFsVGlsZXM7XG4gICAgfVxuXG4gICAgbmV3Um9vbSgpIHtcbiAgICAgIGlmICh0aGlzLmZyZWUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudm9sdW1lID0gTWF0aC5mbG9vcih0aGlzLnJuZygpICogKHRoaXMubWF4Vm9sdW1lIC0gdGhpcy5taW5Wb2x1bWUpKSArIHRoaXMubWluVm9sdW1lO1xuICAgICAgICByZXR1cm4gdGhpcy5yb29tID0gbmV3IFJvb21HZW5lcmF0b3IuUm9vbSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJhbmRvbURpcmVjdGlvbnMoKSB7XG4gICAgICB2YXIgaSwgaiwgbywgeDtcbiAgICAgIG8gPSBEaXJlY3Rpb24uYWRqYWNlbnRzLnNsaWNlKCk7XG4gICAgICBqID0gdm9pZCAwO1xuICAgICAgeCA9IHZvaWQgMDtcbiAgICAgIGkgPSBvLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpKSB7XG4gICAgICAgIGogPSBNYXRoLmZsb29yKHRoaXMucm5nKCkgKiBpKTtcbiAgICAgICAgeCA9IG9bLS1pXTtcbiAgICAgICAgb1tpXSA9IG9bal07XG4gICAgICAgIG9bal0gPSB4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgc3RlcCgpIHtcbiAgICAgIHZhciBzdWNjZXNzLCB0cmllcztcbiAgICAgIGlmICh0aGlzLnJvb20pIHtcbiAgICAgICAgaWYgKHRoaXMuZnJlZS5sZW5ndGggJiYgdGhpcy5yb29tLnRpbGVzLmxlbmd0aCA8IHRoaXMudm9sdW1lIC0gMSkge1xuICAgICAgICAgIGlmICh0aGlzLnJvb20udGlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0cmllcyA9IHRoaXMucmFuZG9tRGlyZWN0aW9ucygpO1xuICAgICAgICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKHRyaWVzLmxlbmd0aCAmJiAhc3VjY2Vzcykge1xuICAgICAgICAgICAgICBzdWNjZXNzID0gdGhpcy5leHBhbmQodGhpcy5yb29tLCB0cmllcy5wb3AoKSwgdGhpcy52b2x1bWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHRoaXMucm9vbURvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFsbG9jYXRlVGlsZSh0aGlzLnJhbmRvbUZyZWVUaWxlKCksIHRoaXMucm9vbSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yb29tRG9uZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJvb21Eb25lKCkge1xuICAgICAgdGhpcy5yb29tcy5wdXNoKHRoaXMucm9vbSk7XG4gICAgICB0aGlzLmFsbG9jYXRlV2FsbHModGhpcy5yb29tKTtcbiAgICAgIHJldHVybiB0aGlzLnJvb20gPSBudWxsO1xuICAgIH1cblxuICAgIGV4cGFuZChyb29tLCBkaXJlY3Rpb24sIG1heCA9IDApIHtcbiAgICAgIHZhciBrLCBsZW4sIG5leHQsIHJlZiwgc2Vjb25kLCBzdWNjZXNzLCB0aWxlO1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmVmID0gcm9vbS50aWxlcztcbiAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICB0aWxlID0gcmVmW2tdO1xuICAgICAgICBpZiAobWF4ID09PSAwIHx8IHJvb20udGlsZXMubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgICAgaWYgKG5leHQgPSB0aGlzLnRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hbGxvY2F0ZVRpbGUobmV4dCwgcm9vbSk7XG4gICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKChzZWNvbmQgPSB0aGlzLnRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uLCAyKSkgJiYgIXRoaXMudGlsZU9mZnNldElzRnJlZSh0aWxlLCBkaXJlY3Rpb24sIDMpKSB7XG4gICAgICAgICAgICB0aGlzLmFsbG9jYXRlVGlsZShzZWNvbmQsIHJvb20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgYWxsb2NhdGVXYWxscyhyb29tKSB7XG4gICAgICB2YXIgZGlyZWN0aW9uLCBrLCBsZW4sIG5leHQsIG5leHRSb29tLCBvdGhlclNpZGUsIHJlZiwgcmVzdWx0cywgdGlsZTtcbiAgICAgIHJlZiA9IHJvb20udGlsZXM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgdGlsZSA9IHJlZltrXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbCwgbGVuMSwgcmVmMSwgcmVzdWx0czE7XG4gICAgICAgICAgcmVmMSA9IERpcmVjdGlvbi5hbGw7XG4gICAgICAgICAgcmVzdWx0czEgPSBbXTtcbiAgICAgICAgICBmb3IgKGwgPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4xOyBsKyspIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IHJlZjFbbF07XG4gICAgICAgICAgICBuZXh0ID0gdGhpcy50aWxlQ29udGFpbmVyLmdldFRpbGUodGlsZS54ICsgZGlyZWN0aW9uLngsIHRpbGUueSArIGRpcmVjdGlvbi55KTtcbiAgICAgICAgICAgIGlmICgobmV4dCAhPSBudWxsKSAmJiBuZXh0LnJvb20gIT09IHJvb20pIHtcbiAgICAgICAgICAgICAgaWYgKGluZGV4T2YuY2FsbChEaXJlY3Rpb24uY29ybmVycywgZGlyZWN0aW9uKSA8IDApIHtcbiAgICAgICAgICAgICAgICBvdGhlclNpZGUgPSB0aGlzLnRpbGVDb250YWluZXIuZ2V0VGlsZSh0aWxlLnggKyBkaXJlY3Rpb24ueCAqIDIsIHRpbGUueSArIGRpcmVjdGlvbi55ICogMik7XG4gICAgICAgICAgICAgICAgbmV4dFJvb20gPSAob3RoZXJTaWRlICE9IG51bGwgPyBvdGhlclNpZGUucm9vbSA6IHZvaWQgMCkgIT0gbnVsbCA/IG90aGVyU2lkZS5yb29tIDogbnVsbDtcbiAgICAgICAgICAgICAgICByb29tLmFkZFdhbGwobmV4dCwgbmV4dFJvb20pO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0Um9vbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0Um9vbS5hZGRXYWxsKG5leHQsIHJvb20pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXh0LmZhY3RvcnkgPSB0aGlzLndhbGxGYWN0b3J5O1xuICAgICAgICAgICAgICByZXN1bHRzMS5wdXNoKHRoaXMuYWxsb2NhdGVUaWxlKG5leHQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMxLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHMxO1xuICAgICAgICB9KS5jYWxsKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIGNyZWF0ZURvb3JzKCkge1xuICAgICAgdmFyIGRvb3IsIGssIGxlbiwgcmVmLCByZXN1bHRzLCByb29tLCB3YWxscztcbiAgICAgIHJlZiA9IHRoaXMucm9vbXM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgcm9vbSA9IHJlZltrXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbCwgbGVuMSwgcmVmMSwgcmVzdWx0czE7XG4gICAgICAgICAgcmVmMSA9IHJvb20ud2FsbHNCeVJvb21zKCk7XG4gICAgICAgICAgcmVzdWx0czEgPSBbXTtcbiAgICAgICAgICBmb3IgKGwgPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4xOyBsKyspIHtcbiAgICAgICAgICAgIHdhbGxzID0gcmVmMVtsXTtcbiAgICAgICAgICAgIGlmICgod2FsbHMucm9vbSAhPSBudWxsKSAmJiByb29tLmRvb3JzRm9yUm9vbSh3YWxscy5yb29tKSA8IDEpIHtcbiAgICAgICAgICAgICAgZG9vciA9IHdhbGxzLnRpbGVzW01hdGguZmxvb3IodGhpcy5ybmcoKSAqIHdhbGxzLnRpbGVzLmxlbmd0aCldO1xuICAgICAgICAgICAgICBkb29yLmZhY3RvcnkgPSB0aGlzLmRvb3JGYWN0b3J5O1xuICAgICAgICAgICAgICBkb29yLmZhY3RvcnlPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy50aWxlQ29udGFpbmVyLmdldFRpbGUoZG9vci54ICsgMSwgZG9vci55KS5mYWN0b3J5ID09PSB0aGlzLmZsb29yRmFjdG9yeSA/IERvb3IuZGlyZWN0aW9ucy52ZXJ0aWNhbCA6IERvb3IuZGlyZWN0aW9ucy5ob3Jpem9udGFsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJvb20uYWRkRG9vcihkb29yLCB3YWxscy5yb29tKTtcbiAgICAgICAgICAgICAgcmVzdWx0czEucHVzaCh3YWxscy5yb29tLmFkZERvb3IoZG9vciwgcm9vbSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0czEucHVzaCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0czE7XG4gICAgICAgIH0pLmNhbGwodGhpcykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgYWxsb2NhdGVUaWxlKHRpbGUsIHJvb20gPSBudWxsKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICBpZiAocm9vbSAhPSBudWxsKSB7XG4gICAgICAgIHJvb20uYWRkVGlsZSh0aWxlKTtcbiAgICAgICAgdGlsZS5mYWN0b3J5ID0gdGhpcy5mbG9vckZhY3Rvcnk7XG4gICAgICB9XG4gICAgICBpbmRleCA9IHRoaXMuZnJlZS5pbmRleE9mKHRpbGUpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJlZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uLCBtdWx0aXBseSA9IDEpIHtcbiAgICAgIHJldHVybiB0aGlzLnRpbGVJc0ZyZWUodGlsZS54ICsgZGlyZWN0aW9uLnggKiBtdWx0aXBseSwgdGlsZS55ICsgZGlyZWN0aW9uLnkgKiBtdWx0aXBseSk7XG4gICAgfVxuXG4gICAgdGlsZUlzRnJlZSh4LCB5KSB7XG4gICAgICB2YXIgdGlsZTtcbiAgICAgIHRpbGUgPSB0aGlzLnRpbGVDb250YWluZXIuZ2V0VGlsZSh4LCB5KTtcbiAgICAgIGlmICgodGlsZSAhPSBudWxsKSAmJiBpbmRleE9mLmNhbGwodGhpcy5mcmVlLCB0aWxlKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0aWxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJhbmRvbUZyZWVUaWxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZnJlZVtNYXRoLmZsb29yKHRoaXMucm5nKCkgKiB0aGlzLmZyZWUubGVuZ3RoKV07XG4gICAgfVxuXG4gIH07XG5cbiAgUm9vbUdlbmVyYXRvci5wcm9wZXJ0aWVzKHtcbiAgICBybmc6IHtcbiAgICAgIGRlZmF1bHQ6IE1hdGgucmFuZG9tXG4gICAgfSxcbiAgICBtYXhWb2x1bWU6IHtcbiAgICAgIGRlZmF1bHQ6IDI1XG4gICAgfSxcbiAgICBtaW5Wb2x1bWU6IHtcbiAgICAgIGRlZmF1bHQ6IDUwXG4gICAgfSxcbiAgICB3aWR0aDoge1xuICAgICAgZGVmYXVsdDogMzBcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgZGVmYXVsdDogMTVcbiAgICB9LFxuICAgIHRpbGVDb250YWluZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBrLCBsLCByZWYsIHJlZjEsIHRpbGVzLCB4LCB5O1xuICAgICAgICB0aWxlcyA9IG5ldyBUaWxlQ29udGFpbmVyKCk7XG4gICAgICAgIGZvciAoeCA9IGsgPSAwLCByZWYgPSB0aGlzLndpZHRoOyAoMCA8PSByZWYgPyBrIDw9IHJlZiA6IGsgPj0gcmVmKTsgeCA9IDAgPD0gcmVmID8gKytrIDogLS1rKSB7XG4gICAgICAgICAgZm9yICh5ID0gbCA9IDAsIHJlZjEgPSB0aGlzLmhlaWdodDsgKDAgPD0gcmVmMSA/IGwgPD0gcmVmMSA6IGwgPj0gcmVmMSk7IHkgPSAwIDw9IHJlZjEgPyArK2wgOiAtLWwpIHtcbiAgICAgICAgICAgIHRpbGVzLmFkZFRpbGUobmV3IFRpbGUoeCwgeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGlsZXM7XG4gICAgICB9XG4gICAgfSxcbiAgICBmbG9vckZhY3Rvcnk6IHtcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uKG9wdCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbGUob3B0LngsIG9wdC55KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHdhbGxGYWN0b3J5OiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBkb29yRmFjdG9yeToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxvb3JGYWN0b3J5O1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJvb21HZW5lcmF0b3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cblJvb21HZW5lcmF0b3IuUm9vbSA9IGNsYXNzIFJvb20ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy53YWxscyA9IFtdO1xuICAgIHRoaXMuZG9vcnMgPSBbXTtcbiAgfVxuXG4gIGFkZFRpbGUodGlsZSkge1xuICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICByZXR1cm4gdGlsZS5yb29tID0gdGhpcztcbiAgfVxuXG4gIGNvbnRhaW5zV2FsbCh0aWxlKSB7XG4gICAgdmFyIGssIGxlbiwgcmVmLCB3YWxsO1xuICAgIHJlZiA9IHRoaXMud2FsbHM7XG4gICAgZm9yIChrID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICB3YWxsID0gcmVmW2tdO1xuICAgICAgaWYgKHdhbGwudGlsZSA9PT0gdGlsZSkge1xuICAgICAgICByZXR1cm4gd2FsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkV2FsbCh0aWxlLCBuZXh0Um9vbSkge1xuICAgIHZhciBleGlzdGluZztcbiAgICBleGlzdGluZyA9IHRoaXMuY29udGFpbnNXYWxsKHRpbGUpO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgcmV0dXJuIGV4aXN0aW5nLm5leHRSb29tID0gbmV4dFJvb207XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGxzLnB1c2goe1xuICAgICAgICB0aWxlOiB0aWxlLFxuICAgICAgICBuZXh0Um9vbTogbmV4dFJvb21cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHdhbGxzQnlSb29tcygpIHtcbiAgICB2YXIgaywgbGVuLCBwb3MsIHJlZiwgcmVzLCByb29tcywgd2FsbDtcbiAgICByb29tcyA9IFtdO1xuICAgIHJlcyA9IFtdO1xuICAgIHJlZiA9IHRoaXMud2FsbHM7XG4gICAgZm9yIChrID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICB3YWxsID0gcmVmW2tdO1xuICAgICAgcG9zID0gcm9vbXMuaW5kZXhPZih3YWxsLm5leHRSb29tKTtcbiAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgIHBvcyA9IHJvb21zLmxlbmd0aDtcbiAgICAgICAgcm9vbXMucHVzaCh3YWxsLm5leHRSb29tKTtcbiAgICAgICAgcmVzLnB1c2goe1xuICAgICAgICAgIHJvb206IHdhbGwubmV4dFJvb20sXG4gICAgICAgICAgdGlsZXM6IFtdXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVzW3Bvc10udGlsZXMucHVzaCh3YWxsLnRpbGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWRkRG9vcih0aWxlLCBuZXh0Um9vbSkge1xuICAgIHJldHVybiB0aGlzLmRvb3JzLnB1c2goe1xuICAgICAgdGlsZTogdGlsZSxcbiAgICAgIG5leHRSb29tOiBuZXh0Um9vbVxuICAgIH0pO1xuICB9XG5cbiAgZG9vcnNGb3JSb29tKHJvb20pIHtcbiAgICB2YXIgZG9vciwgaywgbGVuLCByZWYsIHJlcztcbiAgICByZXMgPSBbXTtcbiAgICByZWYgPSB0aGlzLmRvb3JzO1xuICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgZG9vciA9IHJlZltrXTtcbiAgICAgIGlmIChkb29yLm5leHRSb29tID09PSByb29tKSB7XG4gICAgICAgIHJlcy5wdXNoKGRvb3IudGlsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Sb29tR2VuZXJhdG9yLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFNoaXAsIFRyYXZlbDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5UcmF2ZWwgPSByZXF1aXJlKCcuL1RyYXZlbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXAgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFNoaXAgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICB0cmF2ZWxUbyhsb2NhdGlvbikge1xuICAgICAgdmFyIHRyYXZlbDtcbiAgICAgIHRyYXZlbCA9IG5ldyBUcmF2ZWwoe1xuICAgICAgICB0cmF2ZWxsZXI6IHRoaXMsXG4gICAgICAgIHN0YXJ0TG9jYXRpb246IHRoaXMubG9jYXRpb24sXG4gICAgICAgIHRhcmdldExvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgICBpZiAodHJhdmVsLnZhbGlkKSB7XG4gICAgICAgIHRyYXZlbC5zdGFydCgpO1xuICAgICAgICByZXR1cm4gdGhpcy50cmF2ZWwgPSB0cmF2ZWw7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcC5wcm9wZXJ0aWVzKHtcbiAgICBsb2NhdGlvbjoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgdHJhdmVsOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2hpcDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TaGlwLmpzLm1hcFxuIiwidmFyIERhbWFnZWFibGUsIFByb2plY3RpbGUsIFNoaXBXZWFwb24sIFRpbGVkLCBUaW1pbmc7XG5cblRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVkO1xuXG5UaW1pbmcgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpO1xuXG5EYW1hZ2VhYmxlID0gcmVxdWlyZSgnLi9EYW1hZ2VhYmxlJyk7XG5cblByb2plY3RpbGUgPSByZXF1aXJlKCcuL1Byb2plY3RpbGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwV2VhcG9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwV2VhcG9uIGV4dGVuZHMgVGlsZWQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZmlyZSgpIHtcbiAgICAgIHZhciBwcm9qZWN0aWxlO1xuICAgICAgaWYgKHRoaXMuY2FuRmlyZSkge1xuICAgICAgICBwcm9qZWN0aWxlID0gbmV3IHRoaXMucHJvamVjdGlsZUNsYXNzKHtcbiAgICAgICAgICBvcmlnaW46IHRoaXMsXG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgICBwb3dlcjogdGhpcy5wb3dlcixcbiAgICAgICAgICBibGFzdFJhbmdlOiB0aGlzLmJsYXN0UmFuZ2UsXG4gICAgICAgICAgcHJvcGFnYXRpb25UeXBlOiB0aGlzLnByb3BhZ2F0aW9uVHlwZSxcbiAgICAgICAgICBzcGVlZDogdGhpcy5wcm9qZWN0aWxlU3BlZWQsXG4gICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvamVjdGlsZS5sYXVuY2goKTtcbiAgICAgICAgdGhpcy5jaGFyZ2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVjaGFyZ2UoKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RpbGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVjaGFyZ2UoKSB7XG4gICAgICB0aGlzLmNoYXJnaW5nID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLmNoYXJnZVRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFyZ2luZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNoYXJnZWQoKTtcbiAgICAgIH0sIHRoaXMucmVjaGFyZ2VUaW1lKTtcbiAgICB9XG5cbiAgICByZWNoYXJnZWQoKSB7XG4gICAgICB0aGlzLmNoYXJnZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuYXV0b0ZpcmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlyZSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFNoaXBXZWFwb24uZXh0ZW5kKERhbWFnZWFibGUpO1xuXG4gIFNoaXBXZWFwb24ucHJvcGVydGllcyh7XG4gICAgcmVjaGFyZ2VUaW1lOiB7XG4gICAgICBkZWZhdWx0OiAxMDAwXG4gICAgfSxcbiAgICBwb3dlcjoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIGJsYXN0UmFuZ2U6IHtcbiAgICAgIGRlZmF1bHQ6IDFcbiAgICB9LFxuICAgIHByb3BhZ2F0aW9uVHlwZToge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgcHJvamVjdGlsZVNwZWVkOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgdGFyZ2V0OiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0ZpcmUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maXJlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNoYXJnZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGNoYXJnaW5nOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBlbmFibGVkOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBhdXRvRmlyZToge1xuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgY3JpdGljYWxIZWFsdGg6IHtcbiAgICAgIGRlZmF1bHQ6IDAuM1xuICAgIH0sXG4gICAgY2FuRmlyZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ICYmIHRoaXMuZW5hYmxlZCAmJiB0aGlzLmNoYXJnZWQgJiYgdGhpcy5oZWFsdGggLyB0aGlzLm1heEhlYWx0aCA+PSB0aGlzLmNyaXRpY2FsSGVhbHRoO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGltaW5nOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbWluZygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcHJvamVjdGlsZUNsYXNzOiB7XG4gICAgICBkZWZhdWx0OiBQcm9qZWN0aWxlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2hpcFdlYXBvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TaGlwV2VhcG9uLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIE1hcCwgU3Rhck1hcEdlbmVyYXRvciwgU3RhclN5c3RlbSwgc3Rhck5hbWVzO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbk1hcCA9IHJlcXVpcmUoJy4vTWFwJyk7XG5cblN0YXJTeXN0ZW0gPSByZXF1aXJlKCcuL1N0YXJTeXN0ZW0nKTtcblxuc3Rhck5hbWVzID0gcmVxdWlyZSgncGFyYWxsZWxpby1zdHJpbmdzJykuc3Rhck5hbWVzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXJNYXBHZW5lcmF0b3IgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFN0YXJNYXBHZW5lcmF0b3IgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5vcHQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZk9wdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUoKSB7XG4gICAgICB0aGlzLm1hcCA9IG5ldyB0aGlzLm9wdC5tYXBDbGFzcygpO1xuICAgICAgdGhpcy5zdGFycyA9IHRoaXMubWFwLmxvY2F0aW9ucy5jb3B5KCk7XG4gICAgICB0aGlzLmxpbmtzID0gW107XG4gICAgICB0aGlzLmNyZWF0ZVN0YXJzKHRoaXMub3B0Lm5iU3RhcnMpO1xuICAgICAgdGhpcy5tYWtlTGlua3MoKTtcbiAgICAgIHJldHVybiB0aGlzLm1hcDtcbiAgICB9XG5cbiAgICBjcmVhdGVTdGFycyhuYikge1xuICAgICAgdmFyIGksIGssIHJlZiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IGsgPSAwLCByZWYgPSBuYjsgKDAgPD0gcmVmID8gayA8IHJlZiA6IGsgPiByZWYpOyBpID0gMCA8PSByZWYgPyArK2sgOiAtLWspIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuY3JlYXRlU3RhcigpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIGNyZWF0ZVN0YXIob3B0ID0ge30pIHtcbiAgICAgIHZhciBuYW1lLCBwb3MsIHN0YXI7XG4gICAgICBpZiAoIShvcHQueCAmJiBvcHQueSkpIHtcbiAgICAgICAgcG9zID0gdGhpcy5yYW5kb21TdGFyUG9zKCk7XG4gICAgICAgIGlmIChwb3MgIT0gbnVsbCkge1xuICAgICAgICAgIG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdCwge1xuICAgICAgICAgICAgeDogcG9zLngsXG4gICAgICAgICAgICB5OiBwb3MueVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIW9wdC5uYW1lKSB7XG4gICAgICAgIG5hbWUgPSB0aGlzLnJhbmRvbVN0YXJOYW1lKCk7XG4gICAgICAgIGlmIChuYW1lICE9IG51bGwpIHtcbiAgICAgICAgICBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHQsIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3RhciA9IG5ldyB0aGlzLm9wdC5zdGFyQ2xhc3Mob3B0KTtcbiAgICAgIHRoaXMubWFwLmxvY2F0aW9ucy5wdXNoKHN0YXIpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHN0YXIpO1xuICAgICAgcmV0dXJuIHN0YXI7XG4gICAgfVxuXG4gICAgcmFuZG9tU3RhclBvcygpIHtcbiAgICAgIHZhciBqLCBwb3M7XG4gICAgICBqID0gMDtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHBvcyA9IHtcbiAgICAgICAgICB4OiBNYXRoLmZsb29yKHRoaXMub3B0LnJuZygpICogKHRoaXMub3B0Lm1heFggLSB0aGlzLm9wdC5taW5YKSArIHRoaXMub3B0Lm1pblgpLFxuICAgICAgICAgIHk6IE1hdGguZmxvb3IodGhpcy5vcHQucm5nKCkgKiAodGhpcy5vcHQubWF4WSAtIHRoaXMub3B0Lm1pblkpICsgdGhpcy5vcHQubWluWSlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCEoaiA8IDEwICYmIHRoaXMuc3RhcnMuZmluZCgoc3RhcikgPT4ge1xuICAgICAgICAgIHJldHVybiBzdGFyLmRpc3QocG9zLngsIHBvcy55KSA8PSB0aGlzLm9wdC5taW5TdGFyRGlzdDtcbiAgICAgICAgfSkpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgICAgaWYgKCEoaiA+PSAxMCkpIHtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByYW5kb21TdGFyTmFtZSgpIHtcbiAgICAgIHZhciBuYW1lLCBwb3MsIHJlZjtcbiAgICAgIGlmICgocmVmID0gdGhpcy5vcHQuc3Rhck5hbWVzKSAhPSBudWxsID8gcmVmLmxlbmd0aCA6IHZvaWQgMCkge1xuICAgICAgICBwb3MgPSBNYXRoLmZsb29yKHRoaXMub3B0LnJuZygpICogdGhpcy5vcHQuc3Rhck5hbWVzLmxlbmd0aCk7XG4gICAgICAgIG5hbWUgPSB0aGlzLm9wdC5zdGFyTmFtZXNbcG9zXTtcbiAgICAgICAgdGhpcy5vcHQuc3Rhck5hbWVzLnNwbGljZShwb3MsIDEpO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtYWtlTGlua3MoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2VMaW5rc0Zyb20oc3Rhcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlTGlua3NGcm9tKHN0YXIpIHtcbiAgICAgIHZhciBjbG9zZSwgY2xvc2VzdHMsIGxpbmssIG5lZWRlZCwgcmVzdWx0cywgdHJpZXM7XG4gICAgICB0cmllcyA9IHRoaXMub3B0LmxpbmtUcmllcztcbiAgICAgIG5lZWRlZCA9IHRoaXMub3B0LmxpbmtzQnlTdGFycyAtIHN0YXIubGlua3MuY291bnQoKTtcbiAgICAgIGlmIChuZWVkZWQgPiAwKSB7XG4gICAgICAgIGNsb3Nlc3RzID0gdGhpcy5zdGFycy5maWx0ZXIoKHN0YXIyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHN0YXIyICE9PSBzdGFyICYmICFzdGFyLmxpbmtzLmZpbmRTdGFyKHN0YXIyKTtcbiAgICAgICAgfSkuY2xvc2VzdHMoc3Rhci54LCBzdGFyLnkpO1xuICAgICAgICBpZiAoY2xvc2VzdHMuY291bnQoKSA+IDApIHtcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGNsb3NlID0gY2xvc2VzdHMuc2hpZnQoKTtcbiAgICAgICAgICAgIGxpbmsgPSB0aGlzLmNyZWF0ZUxpbmsoc3RhciwgY2xvc2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVMaW5rKGxpbmspKSB7XG4gICAgICAgICAgICAgIHRoaXMubGlua3MucHVzaChsaW5rKTtcbiAgICAgICAgICAgICAgc3Rhci5hZGRMaW5rKGxpbmspO1xuICAgICAgICAgICAgICBuZWVkZWQgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyaWVzIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShuZWVkZWQgPiAwICYmIHRyaWVzID4gMCAmJiBjbG9zZXN0cy5jb3VudCgpID4gMCkpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVMaW5rKHN0YXIxLCBzdGFyMikge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzLm9wdC5saW5rQ2xhc3Moc3RhcjEsIHN0YXIyKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUxpbmsobGluaykge1xuICAgICAgcmV0dXJuICF0aGlzLnN0YXJzLmZpbmQoKHN0YXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHN0YXIgIT09IGxpbmsuc3RhcjEgJiYgc3RhciAhPT0gbGluay5zdGFyMiAmJiBsaW5rLmNsb3NlVG9Qb2ludChzdGFyLngsIHN0YXIueSwgdGhpcy5vcHQubWluTGlua0Rpc3QpO1xuICAgICAgfSkgJiYgIXRoaXMubGlua3MuZmluZCgobGluazIpID0+IHtcbiAgICAgICAgcmV0dXJuIGxpbmsyLmludGVyc2VjdExpbmsobGluayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfTtcblxuICBTdGFyTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5kZWZPcHQgPSB7XG4gICAgbmJTdGFyczogMjAsXG4gICAgbWluWDogMCxcbiAgICBtYXhYOiA1MDAsXG4gICAgbWluWTogMCxcbiAgICBtYXhZOiA1MDAsXG4gICAgbWluU3RhckRpc3Q6IDEwLFxuICAgIG1pbkxpbmtEaXN0OiAxMCxcbiAgICBsaW5rc0J5U3RhcnM6IDMsXG4gICAgbGlua1RyaWVzOiAzLFxuICAgIG1hcENsYXNzOiBNYXAsXG4gICAgc3RhckNsYXNzOiBTdGFyU3lzdGVtLFxuICAgIGxpbmtDbGFzczogU3RhclN5c3RlbS5MaW5rLFxuICAgIHJuZzogTWF0aC5yYW5kb20sXG4gICAgc3Rhck5hbWVzOiBzdGFyTmFtZXNcbiAgfTtcblxuICByZXR1cm4gU3Rhck1hcEdlbmVyYXRvcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TdGFyTWFwR2VuZXJhdG9yLmpzLm1hcFxuIiwidmFyIEVsZW1lbnQsIFN0YXJTeXN0ZW07XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFyU3lzdGVtID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTdGFyU3lzdGVtIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgc3VwZXIoZGF0YSk7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge31cblxuICAgIGxpbmtUbyhzdGFyKSB7XG4gICAgICBpZiAoIXRoaXMubGlua3MuZmluZFN0YXIoc3RhcikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGluayhuZXcgdGhpcy5jb25zdHJ1Y3Rvci5MaW5rKHRoaXMsIHN0YXIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRMaW5rKGxpbmspIHtcbiAgICAgIHRoaXMubGlua3MuYWRkKGxpbmspO1xuICAgICAgbGluay5vdGhlclN0YXIodGhpcykubGlua3MuYWRkKGxpbmspO1xuICAgICAgcmV0dXJuIGxpbms7XG4gICAgfVxuXG4gICAgZGlzdCh4LCB5KSB7XG4gICAgICB2YXIgeERpc3QsIHlEaXN0O1xuICAgICAgeERpc3QgPSB0aGlzLnggLSB4O1xuICAgICAgeURpc3QgPSB0aGlzLnkgLSB5O1xuICAgICAgcmV0dXJuIE1hdGguc3FydCgoeERpc3QgKiB4RGlzdCkgKyAoeURpc3QgKiB5RGlzdCkpO1xuICAgIH1cblxuICB9O1xuXG4gIFN0YXJTeXN0ZW0ucHJvcGVydGllcyh7XG4gICAgeDoge30sXG4gICAgeToge30sXG4gICAgbmFtZToge30sXG4gICAgbGlua3M6IHtcbiAgICAgIGNvbGxlY3Rpb246IHtcbiAgICAgICAgZmluZFN0YXI6IGZ1bmN0aW9uKHN0YXIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maW5kKGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5rLnN0YXIyID09PSBzdGFyIHx8IGxpbmsuc3RhcjEgPT09IHN0YXI7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIFN0YXJTeXN0ZW0uY29sbGVuY3Rpb25GbiA9IHtcbiAgICBjbG9zZXN0OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICB2YXIgbWluLCBtaW5EaXN0O1xuICAgICAgbWluID0gbnVsbDtcbiAgICAgIG1pbkRpc3QgPSBudWxsO1xuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXIpIHtcbiAgICAgICAgdmFyIGRpc3Q7XG4gICAgICAgIGRpc3QgPSBzdGFyLmRpc3QoeCwgeSk7XG4gICAgICAgIGlmICgobWluID09IG51bGwpIHx8IG1pbkRpc3QgPiBkaXN0KSB7XG4gICAgICAgICAgbWluID0gc3RhcjtcbiAgICAgICAgICByZXR1cm4gbWluRGlzdCA9IGRpc3Q7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1pbjtcbiAgICB9LFxuICAgIGNsb3Nlc3RzOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICB2YXIgZGlzdHM7XG4gICAgICBkaXN0cyA9IHRoaXMubWFwKGZ1bmN0aW9uKHN0YXIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkaXN0OiBzdGFyLmRpc3QoeCwgeSksXG4gICAgICAgICAgc3Rhcjogc3RhclxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBkaXN0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuZGlzdCAtIGIuZGlzdDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMuY29weShkaXN0cy5tYXAoZnVuY3Rpb24oZGlzdCkge1xuICAgICAgICByZXR1cm4gZGlzdC5zdGFyO1xuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU3RhclN5c3RlbTtcblxufSkuY2FsbCh0aGlzKTtcblxuU3RhclN5c3RlbS5MaW5rID0gY2xhc3MgTGluayBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzdGFyMSwgc3RhcjIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhcjEgPSBzdGFyMTtcbiAgICB0aGlzLnN0YXIyID0gc3RhcjI7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5zdGFyMS5saW5rcy5yZW1vdmUodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuc3RhcjIubGlua3MucmVtb3ZlKHRoaXMpO1xuICB9XG5cbiAgb3RoZXJTdGFyKHN0YXIpIHtcbiAgICBpZiAoc3RhciA9PT0gdGhpcy5zdGFyMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcjI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXIxO1xuICAgIH1cbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFyMS5kaXN0KHRoaXMuc3RhcjIueCwgdGhpcy5zdGFyMi55KTtcbiAgfVxuXG4gIGluQm91bmRhcnlCb3goeCwgeSwgcGFkZGluZyA9IDApIHtcbiAgICB2YXIgeDEsIHgyLCB5MSwgeTI7XG4gICAgeDEgPSBNYXRoLm1pbih0aGlzLnN0YXIxLngsIHRoaXMuc3RhcjIueCkgLSBwYWRkaW5nO1xuICAgIHkxID0gTWF0aC5taW4odGhpcy5zdGFyMS55LCB0aGlzLnN0YXIyLnkpIC0gcGFkZGluZztcbiAgICB4MiA9IE1hdGgubWF4KHRoaXMuc3RhcjEueCwgdGhpcy5zdGFyMi54KSArIHBhZGRpbmc7XG4gICAgeTIgPSBNYXRoLm1heCh0aGlzLnN0YXIxLnksIHRoaXMuc3RhcjIueSkgKyBwYWRkaW5nO1xuICAgIHJldHVybiB4ID49IHgxICYmIHggPD0geDIgJiYgeSA+PSB5MSAmJiB5IDw9IHkyO1xuICB9XG5cbiAgY2xvc2VUb1BvaW50KHgsIHksIG1pbkRpc3QpIHtcbiAgICB2YXIgYSwgYWJEaXN0LCBhYmNBbmdsZSwgYWJ4QW5nbGUsIGFjRGlzdCwgYWN4QW5nbGUsIGIsIGMsIGNkRGlzdCwgeEFiRGlzdCwgeEFjRGlzdCwgeUFiRGlzdCwgeUFjRGlzdDtcbiAgICBpZiAoIXRoaXMuaW5Cb3VuZGFyeUJveCh4LCB5LCBtaW5EaXN0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gdGhpcy5zdGFyMTtcbiAgICBiID0gdGhpcy5zdGFyMjtcbiAgICBjID0ge1xuICAgICAgXCJ4XCI6IHgsXG4gICAgICBcInlcIjogeVxuICAgIH07XG4gICAgeEFiRGlzdCA9IGIueCAtIGEueDtcbiAgICB5QWJEaXN0ID0gYi55IC0gYS55O1xuICAgIGFiRGlzdCA9IE1hdGguc3FydCgoeEFiRGlzdCAqIHhBYkRpc3QpICsgKHlBYkRpc3QgKiB5QWJEaXN0KSk7XG4gICAgYWJ4QW5nbGUgPSBNYXRoLmF0YW4oeUFiRGlzdCAvIHhBYkRpc3QpO1xuICAgIHhBY0Rpc3QgPSBjLnggLSBhLng7XG4gICAgeUFjRGlzdCA9IGMueSAtIGEueTtcbiAgICBhY0Rpc3QgPSBNYXRoLnNxcnQoKHhBY0Rpc3QgKiB4QWNEaXN0KSArICh5QWNEaXN0ICogeUFjRGlzdCkpO1xuICAgIGFjeEFuZ2xlID0gTWF0aC5hdGFuKHlBY0Rpc3QgLyB4QWNEaXN0KTtcbiAgICBhYmNBbmdsZSA9IGFieEFuZ2xlIC0gYWN4QW5nbGU7XG4gICAgY2REaXN0ID0gTWF0aC5hYnMoTWF0aC5zaW4oYWJjQW5nbGUpICogYWNEaXN0KTtcbiAgICByZXR1cm4gY2REaXN0IDw9IG1pbkRpc3Q7XG4gIH1cblxuICBpbnRlcnNlY3RMaW5rKGxpbmspIHtcbiAgICB2YXIgcywgczFfeCwgczFfeSwgczJfeCwgczJfeSwgdCwgeDEsIHgyLCB4MywgeDQsIHkxLCB5MiwgeTMsIHk0O1xuICAgIHgxID0gdGhpcy5zdGFyMS54O1xuICAgIHkxID0gdGhpcy5zdGFyMS55O1xuICAgIHgyID0gdGhpcy5zdGFyMi54O1xuICAgIHkyID0gdGhpcy5zdGFyMi55O1xuICAgIHgzID0gbGluay5zdGFyMS54O1xuICAgIHkzID0gbGluay5zdGFyMS55O1xuICAgIHg0ID0gbGluay5zdGFyMi54O1xuICAgIHk0ID0gbGluay5zdGFyMi55O1xuICAgIHMxX3ggPSB4MiAtIHgxO1xuICAgIHMxX3kgPSB5MiAtIHkxO1xuICAgIHMyX3ggPSB4NCAtIHgzO1xuICAgIHMyX3kgPSB5NCAtIHkzO1xuICAgIHMgPSAoLXMxX3kgKiAoeDEgLSB4MykgKyBzMV94ICogKHkxIC0geTMpKSAvICgtczJfeCAqIHMxX3kgKyBzMV94ICogczJfeSk7XG4gICAgdCA9IChzMl94ICogKHkxIC0geTMpIC0gczJfeSAqICh4MSAtIHgzKSkgLyAoLXMyX3ggKiBzMV95ICsgczFfeCAqIHMyX3kpO1xuICAgIHJldHVybiBzID4gMCAmJiBzIDwgMSAmJiB0ID4gMCAmJiB0IDwgMTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1N0YXJTeXN0ZW0uanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgVHJhdmVsO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhdmVsID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUcmF2ZWwgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBzdGFydChsb2NhdGlvbikge1xuICAgICAgaWYgKHRoaXMudmFsaWQpIHtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJhdmVsbGVyLmxvY2F0aW9uID0gdGhpcy50YXJnZXRMb2NhdGlvbjtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgVHJhdmVsLnByb3BlcnRpZXMoe1xuICAgIHRyYXZlbGxlcjoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgc3RhcnRMb2NhdGlvbjoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgdGFyZ2V0TG9jYXRpb246IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGN1cnJlbnRTZWN0aW9uOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydExvY2F0aW9uLmxpbmtzLmZpbmRTdGFyKHRoaXMudGFyZ2V0TG9jYXRpb24pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZHVyYXRpb246IHtcbiAgICAgIGRlZmF1bHQ6IDEwMDBcbiAgICB9LFxuICAgIG1vdmluZzoge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHZhbGlkOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXRMb2NhdGlvbiA9PT0gdGhpcy5zdGFydExvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy50YXJnZXRMb2NhdGlvbi5saW5rcyAhPSBudWxsKSAmJiAodGhpcy5zdGFydExvY2F0aW9uLmxpbmtzICE9IG51bGwpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNlY3Rpb24gIT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdGltaW5nOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbWluZygpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRyYXZlbDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9UcmF2ZWwuanMubWFwXG4iLCJ2YXIgRWxlbWVudCwgR3JpZCwgVmlldztcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5HcmlkID0gcmVxdWlyZSgncGFyYWxsZWxpby1ncmlkcycpLkdyaWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlldyA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVmlldyBleHRlbmRzIEVsZW1lbnQge1xuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGlmICghdGhpcy5ib3VuZHMpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gdGhpcy5ncmlkIHx8ICgocmVmID0gdGhpcy5nYW1lLl9tYWluVmlldykgIT0gbnVsbCA/IChyZWYxID0gcmVmLnZhbHVlKSAhPSBudWxsID8gcmVmMS5ncmlkIDogdm9pZCAwIDogdm9pZCAwKSB8fCBuZXcgR3JpZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5ib3VuZHMgPSB0aGlzLmdyaWQuYWRkQ2VsbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICByZXR1cm4gdGhpcy5nYW1lID0gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICBWaWV3LnByb3BlcnRpZXMoe1xuICAgIGdhbWU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgICB0aGlzLmdhbWUudmlld3MuYWRkKHRoaXMpO1xuICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkKSB7XG4gICAgICAgICAgcmV0dXJuIG9sZC52aWV3cy5yZW1vdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHg6IHtcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIHk6IHtcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIGdyaWQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGJvdW5kczoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFZpZXc7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvVmlldy5qcy5tYXBcbiIsInZhciBEaXJlY3Rpb24sIExpbmVPZlNpZ2h0LCBUaWxlQ29udGFpbmVyLCBUaWxlUmVmZXJlbmNlLCBWaXNpb25DYWxjdWxhdG9yO1xuXG5MaW5lT2ZTaWdodCA9IHJlcXVpcmUoJy4vTGluZU9mU2lnaHQnKTtcblxuRGlyZWN0aW9uID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLkRpcmVjdGlvbjtcblxuVGlsZUNvbnRhaW5lciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlQ29udGFpbmVyO1xuXG5UaWxlUmVmZXJlbmNlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVSZWZlcmVuY2U7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlzaW9uQ2FsY3VsYXRvciA9IGNsYXNzIFZpc2lvbkNhbGN1bGF0b3Ige1xuICBjb25zdHJ1Y3RvcihvcmlnaW5UaWxlLCBvZmZzZXQgPSB7XG4gICAgICB4OiAwLjUsXG4gICAgICB5OiAwLjVcbiAgICB9KSB7XG4gICAgdGhpcy5vcmlnaW5UaWxlID0gb3JpZ2luVGlsZTtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICB0aGlzLnB0cyA9IHt9O1xuICAgIHRoaXMudmlzaWJpbGl0eSA9IHt9O1xuICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGNhbGN1bCgpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3RlcCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdmFyIGZpcnN0QmF0Y2gsIGluaXRpYWxQdHM7XG4gICAgdGhpcy5wdHMgPSB7fTtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSB7fTtcbiAgICBpbml0aWFsUHRzID0gW1xuICAgICAge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAxLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAxXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAxLFxuICAgICAgICB5OiAxXG4gICAgICB9XG4gICAgXTtcbiAgICBpbml0aWFsUHRzLmZvckVhY2goKHB0KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRQdCh0aGlzLm9yaWdpblRpbGUueCArIHB0LngsIHRoaXMub3JpZ2luVGlsZS55ICsgcHQueSwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgZmlyc3RCYXRjaCA9IFtcbiAgICAgIHtcbiAgICAgICAgeDogLTEsXG4gICAgICAgIHk6IC0xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAtMSxcbiAgICAgICAgeTogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogLTEsXG4gICAgICAgIHk6IDFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IC0xLFxuICAgICAgICB5OiAyXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAyLFxuICAgICAgICB5OiAtMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMixcbiAgICAgICAgeTogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMixcbiAgICAgICAgeTogMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMixcbiAgICAgICAgeTogMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogLTFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDEsXG4gICAgICAgIHk6IC0xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAyXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAxLFxuICAgICAgICB5OiAyXG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4gdGhpcy5zdGFjayA9IGZpcnN0QmF0Y2gubWFwKChwdCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGhpcy5vcmlnaW5UaWxlLnggKyBwdC54LFxuICAgICAgICB5OiB0aGlzLm9yaWdpblRpbGUueSArIHB0LnlcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBzZXRQdCh4LCB5LCB2YWwpIHtcbiAgICB2YXIgYWRqYW5jZW50O1xuICAgIHRoaXMucHRzW3ggKyAnOicgKyB5XSA9IHZhbDtcbiAgICBhZGphbmNlbnQgPSBbXG4gICAgICB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IC0xLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAtMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogLTEsXG4gICAgICAgIHk6IC0xXG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4gYWRqYW5jZW50LmZvckVhY2goKHB0KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRWaXNpYmlsaXR5KHggKyBwdC54LCB5ICsgcHQueSwgdmFsID8gMSAvIGFkamFuY2VudC5sZW5ndGggOiAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFB0KHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5wdHNbeCArICc6JyArIHldO1xuICB9XG5cbiAgYWRkVmlzaWJpbGl0eSh4LCB5LCB2YWwpIHtcbiAgICBpZiAodGhpcy52aXNpYmlsaXR5W3hdID09IG51bGwpIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eVt4XSA9IHt9O1xuICAgIH1cbiAgICBpZiAodGhpcy52aXNpYmlsaXR5W3hdW3ldICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2liaWxpdHlbeF1beV0gKz0gdmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52aXNpYmlsaXR5W3hdW3ldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGdldFZpc2liaWxpdHkoeCwgeSkge1xuICAgIGlmICgodGhpcy52aXNpYmlsaXR5W3hdID09IG51bGwpIHx8ICh0aGlzLnZpc2liaWxpdHlbeF1beV0gPT0gbnVsbCkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52aXNpYmlsaXR5W3hdW3ldO1xuICAgIH1cbiAgfVxuXG4gIGNhblByb2Nlc3MoeCwgeSkge1xuICAgIHJldHVybiAhdGhpcy5zdGFjay5zb21lKChwdCkgPT4ge1xuICAgICAgcmV0dXJuIHB0LnggPT09IHggJiYgcHQueSA9PT0geTtcbiAgICB9KSAmJiAodGhpcy5nZXRQdCh4LCB5KSA9PSBudWxsKTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgdmFyIGxvcywgcHQ7XG4gICAgcHQgPSB0aGlzLnN0YWNrLnNoaWZ0KCk7XG4gICAgbG9zID0gbmV3IExpbmVPZlNpZ2h0KHRoaXMub3JpZ2luVGlsZS5jb250YWluZXIsIHRoaXMub3JpZ2luVGlsZS54ICsgdGhpcy5vZmZzZXQueCwgdGhpcy5vcmlnaW5UaWxlLnkgKyB0aGlzLm9mZnNldC55LCBwdC54LCBwdC55KTtcbiAgICBsb3MucmV2ZXJzZVRyYWNpbmcoKTtcbiAgICBsb3MudHJhdmVyc2FibGVDYWxsYmFjayA9ICh0aWxlLCBlbnRyeVgsIGVudHJ5WSkgPT4ge1xuICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5nZXRWaXNpYmlsaXR5KHRpbGUueCwgdGlsZS55KSA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiBsb3MuZm9yY2VTdWNjZXNzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRpbGUudHJhbnNwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuc2V0UHQocHQueCwgcHQueSwgbG9zLmdldFN1Y2Nlc3MoKSk7XG4gICAgaWYgKGxvcy5nZXRTdWNjZXNzKCkpIHtcbiAgICAgIHJldHVybiBEaXJlY3Rpb24uYWxsLmZvckVhY2goKGRpcmVjdGlvbikgPT4ge1xuICAgICAgICB2YXIgbmV4dFB0O1xuICAgICAgICBuZXh0UHQgPSB7XG4gICAgICAgICAgeDogcHQueCArIGRpcmVjdGlvbi54LFxuICAgICAgICAgIHk6IHB0LnkgKyBkaXJlY3Rpb24ueVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jYW5Qcm9jZXNzKG5leHRQdC54LCBuZXh0UHQueSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdGFjay5wdXNoKG5leHRQdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEJvdW5kcygpIHtcbiAgICB2YXIgYm91bmRhcmllcywgY29sLCByZWYsIHZhbCwgeCwgeTtcbiAgICBib3VuZGFyaWVzID0ge1xuICAgICAgdG9wOiBudWxsLFxuICAgICAgbGVmdDogbnVsbCxcbiAgICAgIGJvdHRvbTogbnVsbCxcbiAgICAgIHJpZ2h0OiBudWxsXG4gICAgfTtcbiAgICByZWYgPSB0aGlzLnZpc2liaWxpdHk7XG4gICAgZm9yICh4IGluIHJlZikge1xuICAgICAgY29sID0gcmVmW3hdO1xuICAgICAgZm9yICh5IGluIGNvbCkge1xuICAgICAgICB2YWwgPSBjb2xbeV07XG4gICAgICAgIGlmICgoYm91bmRhcmllcy50b3AgPT0gbnVsbCkgfHwgeSA8IGJvdW5kYXJpZXMudG9wKSB7XG4gICAgICAgICAgYm91bmRhcmllcy50b3AgPSB5O1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYm91bmRhcmllcy5sZWZ0ID09IG51bGwpIHx8IHggPCBib3VuZGFyaWVzLmxlZnQpIHtcbiAgICAgICAgICBib3VuZGFyaWVzLmxlZnQgPSB4O1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYm91bmRhcmllcy5ib3R0b20gPT0gbnVsbCkgfHwgeSA+IGJvdW5kYXJpZXMuYm90dG9tKSB7XG4gICAgICAgICAgYm91bmRhcmllcy5ib3R0b20gPSB5O1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYm91bmRhcmllcy5yaWdodCA9PSBudWxsKSB8fCB4ID4gYm91bmRhcmllcy5yaWdodCkge1xuICAgICAgICAgIGJvdW5kYXJpZXMucmlnaHQgPSB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBib3VuZGFyaWVzO1xuICB9XG5cbiAgdG9Db250YWluZXIoKSB7XG4gICAgdmFyIGNvbCwgcmVmLCByZXMsIHRpbGUsIHZhbCwgeCwgeTtcbiAgICByZXMgPSBuZXcgVGlsZUNvbnRhaW5lcigpO1xuICAgIHJlcy5vd25lciA9IGZhbHNlO1xuICAgIHJlZiA9IHRoaXMudmlzaWJpbGl0eTtcbiAgICBmb3IgKHggaW4gcmVmKSB7XG4gICAgICBjb2wgPSByZWZbeF07XG4gICAgICBmb3IgKHkgaW4gY29sKSB7XG4gICAgICAgIHZhbCA9IGNvbFt5XTtcbiAgICAgICAgdGlsZSA9IHRoaXMub3JpZ2luVGlsZS5jb250YWluZXIuZ2V0VGlsZSh4LCB5KTtcbiAgICAgICAgaWYgKHZhbCAhPT0gMCAmJiAodGlsZSAhPSBudWxsKSkge1xuICAgICAgICAgIHRpbGUgPSBuZXcgVGlsZVJlZmVyZW5jZSh0aWxlKTtcbiAgICAgICAgICB0aWxlLnZpc2liaWxpdHkgPSB2YWw7XG4gICAgICAgICAgcmVzLmFkZFRpbGUodGlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHRvTWFwKCkge1xuICAgIHZhciBpLCBqLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlcywgeCwgeTtcbiAgICByZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG1hcDogW11cbiAgICB9LCB0aGlzLmdldEJvdW5kcygpKTtcbiAgICBmb3IgKHkgPSBpID0gcmVmID0gcmVzLnRvcCwgcmVmMSA9IHJlcy5ib3R0b20gLSAxOyAocmVmIDw9IHJlZjEgPyBpIDw9IHJlZjEgOiBpID49IHJlZjEpOyB5ID0gcmVmIDw9IHJlZjEgPyArK2kgOiAtLWkpIHtcbiAgICAgIHJlcy5tYXBbeSAtIHJlcy50b3BdID0gW107XG4gICAgICBmb3IgKHggPSBqID0gcmVmMiA9IHJlcy5sZWZ0LCByZWYzID0gcmVzLnJpZ2h0IC0gMTsgKHJlZjIgPD0gcmVmMyA/IGogPD0gcmVmMyA6IGogPj0gcmVmMyk7IHggPSByZWYyIDw9IHJlZjMgPyArK2ogOiAtLWopIHtcbiAgICAgICAgcmVzLm1hcFt5IC0gcmVzLnRvcF1beCAtIHJlcy5sZWZ0XSA9IHRoaXMuZ2V0VmlzaWJpbGl0eSh4LCB5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1Zpc2lvbkNhbGN1bGF0b3IuanMubWFwXG4iLCJ2YXIgQWN0aW9uLCBFbGVtZW50LCBFdmVudEVtaXR0ZXI7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50RW1pdHRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEFjdGlvbiBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgd2l0aEFjdG9yKGFjdG9yKSB7XG4gICAgICBpZiAodGhpcy5hY3RvciAhPT0gYWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29weVdpdGgoe1xuICAgICAgICAgIGFjdG9yOiBhY3RvclxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvcHlXaXRoKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcihPYmplY3QuYXNzaWduKHtcbiAgICAgICAgYmFzZTogdGhpc1xuICAgICAgfSwgdGhpcy5nZXRNYW51YWxEYXRhUHJvcGVydGllcygpLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5leGVjdXRlKCk7XG4gICAgfVxuXG4gICAgdmFsaWRBY3RvcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdG9yICE9IG51bGw7XG4gICAgfVxuXG4gICAgaXNSZWFkeSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkQWN0b3IoKTtcbiAgICB9XG5cbiAgICBmaW5pc2goKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2ZpbmlzaGVkJyk7XG4gICAgICByZXR1cm4gdGhpcy5lbmQoKTtcbiAgICB9XG5cbiAgICBpbnRlcnJ1cHQoKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2ludGVycnVwdGVkJyk7XG4gICAgICByZXR1cm4gdGhpcy5lbmQoKTtcbiAgICB9XG5cbiAgICBlbmQoKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2VuZCcpO1xuICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZXN0cm95UHJvcGVydGllcygpO1xuICAgIH1cblxuICB9O1xuXG4gIEFjdGlvbi5pbmNsdWRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuXG4gIEFjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgICBhY3Rvcjoge31cbiAgfSk7XG5cbiAgcmV0dXJuIEFjdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9hY3Rpb25zL0FjdGlvbi5qcy5tYXBcbiIsInZhciBBY3Rpb25Qcm92aWRlciwgRWxlbWVudDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGlvblByb3ZpZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBBY3Rpb25Qcm92aWRlciBleHRlbmRzIEVsZW1lbnQge307XG5cbiAgQWN0aW9uUHJvdmlkZXIucHJvcGVydGllcyh7XG4gICAgcHJvdmlkZWRBY3Rpb25zOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQWN0aW9uUHJvdmlkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9BY3Rpb25Qcm92aWRlci5qcy5tYXBcbiIsInZhciBBdHRhY2tBY3Rpb24sIEV2ZW50QmluZCwgUHJvcGVydHlXYXRjaGVyLCBUYXJnZXRBY3Rpb24sIFdhbGtBY3Rpb247XG5cbldhbGtBY3Rpb24gPSByZXF1aXJlKCcuL1dhbGtBY3Rpb24nKTtcblxuVGFyZ2V0QWN0aW9uID0gcmVxdWlyZSgnLi9UYXJnZXRBY3Rpb24nKTtcblxuRXZlbnRCaW5kID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50QmluZDtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkludmFsaWRhdGVkLlByb3BlcnR5V2F0Y2hlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBBdHRhY2tBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEF0dGFja0FjdGlvbiBleHRlbmRzIFRhcmdldEFjdGlvbiB7XG4gICAgdmFsaWRUYXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXRJc0F0dGFja2FibGUoKSAmJiAodGhpcy5jYW5Vc2VXZWFwb24oKSB8fCB0aGlzLmNhbldhbGtUb1RhcmdldCgpKTtcbiAgICB9XG5cbiAgICB0YXJnZXRJc0F0dGFja2FibGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuZGFtYWdlYWJsZSAmJiB0aGlzLnRhcmdldC5oZWFsdGggPj0gMDtcbiAgICB9XG5cbiAgICBjYW5NZWxlZSgpIHtcbiAgICAgIHJldHVybiBNYXRoLmFicyh0aGlzLnRhcmdldC50aWxlLnggLSB0aGlzLmFjdG9yLnRpbGUueCkgKyBNYXRoLmFicyh0aGlzLnRhcmdldC50aWxlLnkgLSB0aGlzLmFjdG9yLnRpbGUueSkgPT09IDE7XG4gICAgfVxuXG4gICAgY2FuVXNlV2VhcG9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYmVzdFVzYWJsZVdlYXBvbiAhPSBudWxsO1xuICAgIH1cblxuICAgIGNhblVzZVdlYXBvbkF0KHRpbGUpIHtcbiAgICAgIHZhciByZWY7XG4gICAgICByZXR1cm4gKChyZWYgPSB0aGlzLmFjdG9yLndlYXBvbnMpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSAmJiB0aGlzLmFjdG9yLndlYXBvbnMuZmluZCgod2VhcG9uKSA9PiB7XG4gICAgICAgIHJldHVybiB3ZWFwb24uY2FuVXNlRnJvbSh0aWxlLCB0aGlzLnRhcmdldCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5XYWxrVG9UYXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrQWN0aW9uLmlzUmVhZHkoKTtcbiAgICB9XG5cbiAgICB1c2VXZWFwb24oKSB7XG4gICAgICB0aGlzLmJlc3RVc2FibGVXZWFwb24udXNlT24odGhpcy50YXJnZXQpO1xuICAgICAgcmV0dXJuIHRoaXMuZmluaXNoKCk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZSgpIHtcbiAgICAgIGlmICh0aGlzLmFjdG9yLndhbGsgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFjdG9yLndhbGsuaW50ZXJydXB0KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5iZXN0VXNhYmxlV2VhcG9uICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5jaGFyZ2VkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudXNlV2VhcG9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMud2VhcG9uQ2hhcmdlV2F0Y2hlci5iaW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMud2Fsa0FjdGlvbi5vbignZmluaXNoZWQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbnRlcnJ1cHRCaW5kZXIudW5iaW5kKCk7XG4gICAgICAgICAgaWYgKHRoaXMuaXNSZWFkeSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJydXB0QmluZGVyLmJpbmRUbyh0aGlzLndhbGtBY3Rpb24pO1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrQWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBBdHRhY2tBY3Rpb24ucHJvcGVydGllcyh7XG4gICAgd2Fsa0FjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdhbGtBY3Rpb247XG4gICAgICAgIHdhbGtBY3Rpb24gPSBuZXcgV2Fsa0FjdGlvbih7XG4gICAgICAgICAgYWN0b3I6IHRoaXMuYWN0b3IsXG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgICBwYXJlbnQ6IHRoaXMucGFyZW50XG4gICAgICAgIH0pO1xuICAgICAgICB3YWxrQWN0aW9uLnBhdGhGaW5kZXIuYXJyaXZlZENhbGxiYWNrID0gKHN0ZXApID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jYW5Vc2VXZWFwb25BdChzdGVwLnRpbGUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gd2Fsa0FjdGlvbjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJlc3RVc2FibGVXZWFwb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHJlZiwgdXNhYmxlV2VhcG9ucztcbiAgICAgICAgaW52YWxpZGF0b3IucHJvcFBhdGgoJ2FjdG9yLnRpbGUnKTtcbiAgICAgICAgaWYgKChyZWYgPSB0aGlzLmFjdG9yLndlYXBvbnMpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSB7XG4gICAgICAgICAgdXNhYmxlV2VhcG9ucyA9IHRoaXMuYWN0b3Iud2VhcG9ucy5maWx0ZXIoKHdlYXBvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdlYXBvbi5jYW5Vc2VPbih0aGlzLnRhcmdldCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXNhYmxlV2VhcG9ucy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYi5kcHMgLSBhLmRwcztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdXNhYmxlV2VhcG9uc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaW50ZXJydXB0QmluZGVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEV2ZW50QmluZCgnaW50ZXJydXB0ZWQnLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJydXB0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3k6IHRydWVcbiAgICB9LFxuICAgIHdlYXBvbkNoYXJnZVdhdGNoZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5jaGFyZ2VkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZVdlYXBvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcGVydHk6IHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5nZXRQcm9wZXJ0eUluc3RhbmNlKCdjaGFyZ2VkJylcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZGVzdHJveTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEF0dGFja0FjdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9hY3Rpb25zL0F0dGFja0FjdGlvbi5qcy5tYXBcbiIsInZhciBBdHRhY2tBY3Rpb24sIEF0dGFja01vdmVBY3Rpb24sIEV2ZW50QmluZCwgTGluZU9mU2lnaHQsIFBhdGhGaW5kZXIsIFByb3BlcnR5V2F0Y2hlciwgVGFyZ2V0QWN0aW9uLCBXYWxrQWN0aW9uO1xuXG5XYWxrQWN0aW9uID0gcmVxdWlyZSgnLi9XYWxrQWN0aW9uJyk7XG5cbkF0dGFja0FjdGlvbiA9IHJlcXVpcmUoJy4vQXR0YWNrQWN0aW9uJyk7XG5cblRhcmdldEFjdGlvbiA9IHJlcXVpcmUoJy4vVGFyZ2V0QWN0aW9uJyk7XG5cblBhdGhGaW5kZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXBhdGhmaW5kZXInKTtcblxuTGluZU9mU2lnaHQgPSByZXF1aXJlKCcuLi9MaW5lT2ZTaWdodCcpO1xuXG5Qcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuSW52YWxpZGF0ZWQuUHJvcGVydHlXYXRjaGVyO1xuXG5FdmVudEJpbmQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRCaW5kO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF0dGFja01vdmVBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEF0dGFja01vdmVBY3Rpb24gZXh0ZW5kcyBUYXJnZXRBY3Rpb24ge1xuICAgIGlzRW5lbXkoZWxlbSkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIHJldHVybiAocmVmID0gdGhpcy5hY3Rvci5vd25lcikgIT0gbnVsbCA/IHR5cGVvZiByZWYuaXNFbmVteSA9PT0gXCJmdW5jdGlvblwiID8gcmVmLmlzRW5lbXkoZWxlbSkgOiB2b2lkIDAgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgdmFsaWRUYXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrQWN0aW9uLnZhbGlkVGFyZ2V0KCk7XG4gICAgfVxuXG4gICAgdGVzdEVuZW15U3BvdHRlZCgpIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUVuZW15U3BvdHRlZCgpO1xuICAgICAgaWYgKHRoaXMuZW5lbXlTcG90dGVkKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrQWN0aW9uID0gbmV3IEF0dGFja0FjdGlvbih7XG4gICAgICAgICAgYWN0b3I6IHRoaXMuYWN0b3IsXG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLmVuZW15U3BvdHRlZFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hdHRhY2tBY3Rpb24ub24oJ2ZpbmlzaGVkJywgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzUmVhZHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludGVycnVwdEJpbmRlci5iaW5kVG8odGhpcy5hdHRhY2tBY3Rpb24pO1xuICAgICAgICB0aGlzLndhbGtBY3Rpb24uaW50ZXJydXB0KCk7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZVdhbGtBY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0YWNrQWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBleGVjdXRlKCkge1xuICAgICAgaWYgKCF0aGlzLnRlc3RFbmVteVNwb3R0ZWQoKSkge1xuICAgICAgICB0aGlzLndhbGtBY3Rpb24ub24oJ2ZpbmlzaGVkJywgKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZpbmlzaGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludGVycnVwdEJpbmRlci5iaW5kVG8odGhpcy53YWxrQWN0aW9uKTtcbiAgICAgICAgdGhpcy50aWxlV2F0Y2hlci5iaW5kKCk7XG4gICAgICAgIHJldHVybiB0aGlzLndhbGtBY3Rpb24uZXhlY3V0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIEF0dGFja01vdmVBY3Rpb24ucHJvcGVydGllcyh7XG4gICAgd2Fsa0FjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdhbGtBY3Rpb247XG4gICAgICAgIHdhbGtBY3Rpb24gPSBuZXcgV2Fsa0FjdGlvbih7XG4gICAgICAgICAgYWN0b3I6IHRoaXMuYWN0b3IsXG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgICBwYXJlbnQ6IHRoaXMucGFyZW50XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gd2Fsa0FjdGlvbjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVuZW15U3BvdHRlZDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgdGhpcy5wYXRoID0gbmV3IFBhdGhGaW5kZXIodGhpcy5hY3Rvci50aWxlLmNvbnRhaW5lciwgdGhpcy5hY3Rvci50aWxlLCBmYWxzZSwge1xuICAgICAgICAgIHZhbGlkVGlsZTogKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aWxlLnRyYW5zcGFyZW50ICYmIChuZXcgTGluZU9mU2lnaHQodGhpcy5hY3Rvci50aWxlLmNvbnRhaW5lciwgdGhpcy5hY3Rvci50aWxlLngsIHRoaXMuYWN0b3IudGlsZS55LCB0aWxlLngsIHRpbGUueSkpLmdldFN1Y2Nlc3MoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFycml2ZWQ6IChzdGVwKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcC5lbmVteSA9IHN0ZXAudGlsZS5jaGlsZHJlbi5maW5kKChjKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRW5lbXkoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVmZmljaWVuY3k6ICh0aWxlKSA9PiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wYXRoLmNhbGN1bCgpO1xuICAgICAgICByZXR1cm4gKHJlZiA9IHRoaXMucGF0aC5zb2x1dGlvbikgIT0gbnVsbCA/IHJlZi5lbmVteSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRpbGVXYXRjaGVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3RFbmVteVNwb3R0ZWQoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BlcnR5OiB0aGlzLmFjdG9yLmdldFByb3BlcnR5SW5zdGFuY2UoJ3RpbGUnKVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiB0cnVlXG4gICAgfSxcbiAgICBpbnRlcnJ1cHRCaW5kZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRCaW5kKCdpbnRlcnJ1cHRlZCcsIG51bGwsICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnJ1cHQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZGVzdHJveTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEF0dGFja01vdmVBY3Rpb247XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9BdHRhY2tNb3ZlQWN0aW9uLmpzLm1hcFxuIiwidmFyIEFjdGlvblByb3ZpZGVyLCBTaW1wbGVBY3Rpb25Qcm92aWRlcjtcblxuQWN0aW9uUHJvdmlkZXIgPSByZXF1aXJlKCcuL0FjdGlvblByb3ZpZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlQWN0aW9uUHJvdmlkZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFNpbXBsZUFjdGlvblByb3ZpZGVyIGV4dGVuZHMgQWN0aW9uUHJvdmlkZXIge307XG5cbiAgU2ltcGxlQWN0aW9uUHJvdmlkZXIucHJvcGVydGllcyh7XG4gICAgcHJvdmlkZWRBY3Rpb25zOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWN0aW9ucztcbiAgICAgICAgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucyB8fCB0aGlzLmNvbnN0cnVjdG9yLmFjdGlvbnM7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGFjdGlvbnMgPSBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uc1trZXldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zLm1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBhY3Rpb24oe1xuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFNpbXBsZUFjdGlvblByb3ZpZGVyO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL2FjdGlvbnMvU2ltcGxlQWN0aW9uUHJvdmlkZXIuanMubWFwXG4iLCJ2YXIgQWN0aW9uLCBUYXJnZXRBY3Rpb247XG5cbkFjdGlvbiA9IHJlcXVpcmUoJy4vQWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0QWN0aW9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUYXJnZXRBY3Rpb24gZXh0ZW5kcyBBY3Rpb24ge1xuICAgIHdpdGhUYXJnZXQodGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy50YXJnZXQgIT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3B5V2l0aCh7XG4gICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5UYXJnZXQodGFyZ2V0KSB7XG4gICAgICB2YXIgaW5zdGFuY2U7XG4gICAgICBpbnN0YW5jZSA9IHRoaXMud2l0aFRhcmdldCh0YXJnZXQpO1xuICAgICAgaWYgKGluc3RhbmNlLnZhbGlkVGFyZ2V0KCkpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkVGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ICE9IG51bGw7XG4gICAgfVxuXG4gICAgaXNSZWFkeSgpIHtcbiAgICAgIHJldHVybiBzdXBlci5pc1JlYWR5KCkgJiYgdGhpcy52YWxpZFRhcmdldCgpO1xuICAgIH1cblxuICB9O1xuXG4gIFRhcmdldEFjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgICB0YXJnZXQ6IHt9XG4gIH0pO1xuXG4gIHJldHVybiBUYXJnZXRBY3Rpb247XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9UYXJnZXRBY3Rpb24uanMubWFwXG4iLCJ2YXIgQWN0aW9uUHJvdmlkZXIsIE1peGFibGUsIFRpbGVkQWN0aW9uUHJvdmlkZXI7XG5cbkFjdGlvblByb3ZpZGVyID0gcmVxdWlyZSgnLi9BY3Rpb25Qcm92aWRlcicpO1xuXG5NaXhhYmxlID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLk1peGFibGU7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZWRBY3Rpb25Qcm92aWRlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGlsZWRBY3Rpb25Qcm92aWRlciBleHRlbmRzIEFjdGlvblByb3ZpZGVyIHtcbiAgICB2YWxpZEFjdGlvblRpbGUodGlsZSkge1xuICAgICAgcmV0dXJuIHRpbGUgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBwcmVwYXJlQWN0aW9uVGlsZSh0aWxlKSB7XG4gICAgICBpZiAoIXRpbGUuZ2V0UHJvcGVydHlJbnN0YW5jZSgncHJvdmlkZWRBY3Rpb25zJykpIHtcbiAgICAgICAgcmV0dXJuIE1peGFibGUuRXh0ZW5zaW9uLm1ha2UoQWN0aW9uUHJvdmlkZXIucHJvdG90eXBlLCB0aWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBUaWxlZEFjdGlvblByb3ZpZGVyLnByb3BlcnRpZXMoe1xuICAgIHRpbGU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24ob2xkLCBvdmVycmlkZWQpIHtcbiAgICAgICAgb3ZlcnJpZGVkKG9sZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcndhcmRlZEFjdGlvbnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBhY3Rpb25UaWxlczoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZSxcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIG15VGlsZTtcbiAgICAgICAgbXlUaWxlID0gaW52YWxpZGF0b3IucHJvcCgndGlsZScpO1xuICAgICAgICBpZiAobXlUaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uVGlsZXNDb29yZC5tYXAoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbXlUaWxlLmdldFJlbGF0aXZlVGlsZShjb29yZC54LCBjb29yZC55KTtcbiAgICAgICAgICB9KS5maWx0ZXIoKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkQWN0aW9uVGlsZSh0aWxlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGZvcndhcmRlZEFjdGlvbnM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgIHJldHVybiBhLmFjdGlvbiA9PT0gYi5hY3Rpb24gJiYgYS5sb2NhdGlvbiA9PT0gYi5sb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIGFjdGlvblRpbGVzLCBhY3Rpb25zO1xuICAgICAgICBhY3Rpb25UaWxlcyA9IGludmFsaWRhdG9yLnByb3AoJ2FjdGlvblRpbGVzJyk7XG4gICAgICAgIGFjdGlvbnMgPSBpbnZhbGlkYXRvci5wcm9wKCdwcm92aWRlZEFjdGlvbnMnKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvblRpbGVzLnJlZHVjZSgocmVzLCB0aWxlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5jb25jYXQoYWN0aW9ucy5tYXAoZnVuY3Rpb24oYWN0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBhY3Rpb246IGFjdCxcbiAgICAgICAgICAgICAgbG9jYXRpb246IHRpbGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LCBbXSk7XG4gICAgICB9LFxuICAgICAgaXRlbUFkZGVkOiBmdW5jdGlvbihmb3J3YXJkZWQpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlQWN0aW9uVGlsZShmb3J3YXJkZWQubG9jYXRpb24pO1xuICAgICAgICByZXR1cm4gZm9yd2FyZGVkLmxvY2F0aW9uLnByb3ZpZGVkQWN0aW9ucy5hZGQoZm9yd2FyZGVkLmFjdGlvbik7XG4gICAgICB9LFxuICAgICAgaXRlbVJlbW92ZWQ6IGZ1bmN0aW9uKGZvcndhcmRlZCkge1xuICAgICAgICByZXR1cm4gZm9yd2FyZGVkLmxvY2F0aW9uLnByb3ZpZGVkQWN0aW9ucy5yZW1vdmUoZm9yd2FyZGVkLmFjdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBUaWxlZEFjdGlvblByb3ZpZGVyLnByb3RvdHlwZS5hY3Rpb25UaWxlc0Nvb3JkID0gW1xuICAgIHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAtMVxuICAgIH0sXG4gICAge1xuICAgICAgeDogLTEsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAge1xuICAgICAgeDogKzEsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICB7XG4gICAgICB4OiAwLFxuICAgICAgeTogKzFcbiAgICB9XG4gIF07XG5cbiAgcmV0dXJuIFRpbGVkQWN0aW9uUHJvdmlkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9UaWxlZEFjdGlvblByb3ZpZGVyLmpzLm1hcFxuIiwidmFyIFBhdGhGaW5kZXIsIFBhdGhXYWxrLCBUYXJnZXRBY3Rpb24sIFdhbGtBY3Rpb247XG5cblBhdGhGaW5kZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXBhdGhmaW5kZXInKTtcblxuUGF0aFdhbGsgPSByZXF1aXJlKCcuLi9QYXRoV2FsaycpO1xuXG5UYXJnZXRBY3Rpb24gPSByZXF1aXJlKCcuL1RhcmdldEFjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdhbGtBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFdhbGtBY3Rpb24gZXh0ZW5kcyBUYXJnZXRBY3Rpb24ge1xuICAgIGV4ZWN1dGUoKSB7XG4gICAgICBpZiAodGhpcy5hY3Rvci53YWxrICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hY3Rvci53YWxrLmludGVycnVwdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy53YWxrID0gdGhpcy5hY3Rvci53YWxrID0gbmV3IFBhdGhXYWxrKHRoaXMuYWN0b3IsIHRoaXMucGF0aEZpbmRlcik7XG4gICAgICB0aGlzLmFjdG9yLndhbGsub24oJ2ZpbmlzaGVkJywgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5pc2goKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5hY3Rvci53YWxrLm9uKCdpbnRlcnJ1cHRlZCcsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJydXB0KCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLmFjdG9yLndhbGsuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgaWYgKHRoaXMud2Fsaykge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZFRhcmdldCgpIHtcbiAgICAgIHRoaXMucGF0aEZpbmRlci5jYWxjdWwoKTtcbiAgICAgIHJldHVybiB0aGlzLnBhdGhGaW5kZXIuc29sdXRpb24gIT0gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICBXYWxrQWN0aW9uLnByb3BlcnRpZXMoe1xuICAgIHBhdGhGaW5kZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUGF0aEZpbmRlcih0aGlzLmFjdG9yLnRpbGUuY29udGFpbmVyLCB0aGlzLmFjdG9yLnRpbGUsIHRoaXMudGFyZ2V0LCB7XG4gICAgICAgICAgdmFsaWRUaWxlOiAodGlsZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFjdG9yLmNhbkdvT25UaWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3IuY2FuR29PblRpbGUodGlsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdGlsZS53YWxrYWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFdhbGtBY3Rpb247XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvYWN0aW9ucy9XYWxrQWN0aW9uLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQXV0b21hdGljRG9vclwiOiByZXF1aXJlKFwiLi9BdXRvbWF0aWNEb29yXCIpLFxuICBcIkNoYXJhY3RlclwiOiByZXF1aXJlKFwiLi9DaGFyYWN0ZXJcIiksXG4gIFwiQ2hhcmFjdGVyQUlcIjogcmVxdWlyZShcIi4vQ2hhcmFjdGVyQUlcIiksXG4gIFwiQ29uZnJvbnRhdGlvblwiOiByZXF1aXJlKFwiLi9Db25mcm9udGF0aW9uXCIpLFxuICBcIkRhbWFnZWFibGVcIjogcmVxdWlyZShcIi4vRGFtYWdlYWJsZVwiKSxcbiAgXCJEYW1hZ2VQcm9wYWdhdGlvblwiOiByZXF1aXJlKFwiLi9EYW1hZ2VQcm9wYWdhdGlvblwiKSxcbiAgXCJEb29yXCI6IHJlcXVpcmUoXCIuL0Rvb3JcIiksXG4gIFwiRWxlbWVudFwiOiByZXF1aXJlKFwiLi9FbGVtZW50XCIpLFxuICBcIkVuY29udGVyTWFuYWdlclwiOiByZXF1aXJlKFwiLi9FbmNvbnRlck1hbmFnZXJcIiksXG4gIFwiRmxvb3JcIjogcmVxdWlyZShcIi4vRmxvb3JcIiksXG4gIFwiR2FtZVwiOiByZXF1aXJlKFwiLi9HYW1lXCIpLFxuICBcIkludmVudG9yeVwiOiByZXF1aXJlKFwiLi9JbnZlbnRvcnlcIiksXG4gIFwiTGluZU9mU2lnaHRcIjogcmVxdWlyZShcIi4vTGluZU9mU2lnaHRcIiksXG4gIFwiTWFwXCI6IHJlcXVpcmUoXCIuL01hcFwiKSxcbiAgXCJPYnN0YWNsZVwiOiByZXF1aXJlKFwiLi9PYnN0YWNsZVwiKSxcbiAgXCJQYXRoV2Fsa1wiOiByZXF1aXJlKFwiLi9QYXRoV2Fsa1wiKSxcbiAgXCJQZXJzb25hbFdlYXBvblwiOiByZXF1aXJlKFwiLi9QZXJzb25hbFdlYXBvblwiKSxcbiAgXCJQbGF5ZXJcIjogcmVxdWlyZShcIi4vUGxheWVyXCIpLFxuICBcIlByb2plY3RpbGVcIjogcmVxdWlyZShcIi4vUHJvamVjdGlsZVwiKSxcbiAgXCJSZXNzb3VyY2VcIjogcmVxdWlyZShcIi4vUmVzc291cmNlXCIpLFxuICBcIlJlc3NvdXJjZVR5cGVcIjogcmVxdWlyZShcIi4vUmVzc291cmNlVHlwZVwiKSxcbiAgXCJSb29tR2VuZXJhdG9yXCI6IHJlcXVpcmUoXCIuL1Jvb21HZW5lcmF0b3JcIiksXG4gIFwiU2hpcFwiOiByZXF1aXJlKFwiLi9TaGlwXCIpLFxuICBcIlNoaXBXZWFwb25cIjogcmVxdWlyZShcIi4vU2hpcFdlYXBvblwiKSxcbiAgXCJTdGFyTWFwR2VuZXJhdG9yXCI6IHJlcXVpcmUoXCIuL1N0YXJNYXBHZW5lcmF0b3JcIiksXG4gIFwiU3RhclN5c3RlbVwiOiByZXF1aXJlKFwiLi9TdGFyU3lzdGVtXCIpLFxuICBcIlRyYXZlbFwiOiByZXF1aXJlKFwiLi9UcmF2ZWxcIiksXG4gIFwiVmlld1wiOiByZXF1aXJlKFwiLi9WaWV3XCIpLFxuICBcIlZpc2lvbkNhbGN1bGF0b3JcIjogcmVxdWlyZShcIi4vVmlzaW9uQ2FsY3VsYXRvclwiKSxcbiAgXCJhY3Rpb25zXCI6IHtcbiAgICBcIkFjdGlvblwiOiByZXF1aXJlKFwiLi9hY3Rpb25zL0FjdGlvblwiKSxcbiAgICBcIkFjdGlvblByb3ZpZGVyXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvQWN0aW9uUHJvdmlkZXJcIiksXG4gICAgXCJBdHRhY2tBY3Rpb25cIjogcmVxdWlyZShcIi4vYWN0aW9ucy9BdHRhY2tBY3Rpb25cIiksXG4gICAgXCJBdHRhY2tNb3ZlQWN0aW9uXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvQXR0YWNrTW92ZUFjdGlvblwiKSxcbiAgICBcIlNpbXBsZUFjdGlvblByb3ZpZGVyXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvU2ltcGxlQWN0aW9uUHJvdmlkZXJcIiksXG4gICAgXCJUYXJnZXRBY3Rpb25cIjogcmVxdWlyZShcIi4vYWN0aW9ucy9UYXJnZXRBY3Rpb25cIiksXG4gICAgXCJUaWxlZEFjdGlvblByb3ZpZGVyXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvVGlsZWRBY3Rpb25Qcm92aWRlclwiKSxcbiAgICBcIldhbGtBY3Rpb25cIjogcmVxdWlyZShcIi4vYWN0aW9ucy9XYWxrQWN0aW9uXCIpLFxuICB9LFxufSIsInZhciBsaWJzO1xuXG5saWJzID0gcmVxdWlyZSgnLi9saWJzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSwgbGlicywge1xuICBncmlkczogcmVxdWlyZSgncGFyYWxsZWxpby1ncmlkcycpLFxuICBQYXRoRmluZGVyOiByZXF1aXJlKCdwYXJhbGxlbGlvLXBhdGhmaW5kZXInKSxcbiAgc3RyaW5nczogcmVxdWlyZSgncGFyYWxsZWxpby1zdHJpbmdzJyksXG4gIHRpbGVzOiByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJyksXG4gIFRpbWluZzogcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKSxcbiAgd2lyaW5nOiByZXF1aXJlKCdwYXJhbGxlbGlvLXdpcmluZycpLFxuICBTcGFyazogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9wYXJhbGxlbGlvLmpzLm1hcFxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInZhciBCaW5kZXIsIFJlZmVycmVkO1xuXG5SZWZlcnJlZCA9IHJlcXVpcmUoJy4vUmVmZXJyZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kZXIgPSBjbGFzcyBCaW5kZXIgZXh0ZW5kcyBSZWZlcnJlZCB7XG4gIHRvZ2dsZUJpbmQodmFsID0gIXRoaXMuYmluZGVkKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuYmluZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy51bmJpbmQoKTtcbiAgICB9XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGlmICghdGhpcy5iaW5kZWQgJiYgdGhpcy5jYW5CaW5kKCkpIHtcbiAgICAgIHRoaXMuZG9CaW5kKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmJpbmRlZCA9IHRydWU7XG4gIH1cblxuICBjYW5CaW5kKCkge1xuICAgIHJldHVybiAodGhpcy5jYWxsYmFjayAhPSBudWxsKSAmJiAodGhpcy50YXJnZXQgIT0gbnVsbCk7XG4gIH1cblxuICBkb0JpbmQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHVuYmluZCgpIHtcbiAgICBpZiAodGhpcy5iaW5kZWQgJiYgdGhpcy5jYW5CaW5kKCkpIHtcbiAgICAgIHRoaXMuZG9VbmJpbmQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYmluZGVkID0gZmFsc2U7XG4gIH1cblxuICBkb1VuYmluZCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgZXF1YWxzKGJpbmRlcikge1xuICAgIHJldHVybiB0aGlzLmNvbXBhcmVSZWZlcmVkKGJpbmRlcik7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHJldHVybiB0aGlzLnVuYmluZCgpO1xuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQmluZGVyLmpzLm1hcFxuIiwidmFyIENvbGxlY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvbiA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgICBpZiAoYXJyICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuX2FycmF5ID0gYXJyLnRvQXJyYXkoKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICB0aGlzLl9hcnJheSA9IGFycjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9hcnJheSA9IFthcnJdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9hcnJheSA9IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZWQoKSB7fVxuXG4gICAgY2hlY2tDaGFuZ2VzKG9sZCwgb3JkZXJlZCA9IHRydWUsIGNvbXBhcmVGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgIGlmIChjb21wYXJlRnVuY3Rpb24gPT0gbnVsbCkge1xuICAgICAgICBjb21wYXJlRnVuY3Rpb24gPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgICAgb2xkID0gdGhpcy5jb3B5KG9sZC5zbGljZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9sZCA9IFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY291bnQoKSAhPT0gb2xkLmxlbmd0aCB8fCAob3JkZXJlZCA/IHRoaXMuc29tZShmdW5jdGlvbih2YWwsIGkpIHtcbiAgICAgICAgcmV0dXJuICFjb21wYXJlRnVuY3Rpb24ob2xkLmdldChpKSwgdmFsKTtcbiAgICAgIH0pIDogdGhpcy5zb21lKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgcmV0dXJuICFvbGQucGx1Y2soZnVuY3Rpb24oYikge1xuICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYik7XG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdldChpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXlbaV07XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2FycmF5Lmxlbmd0aCldO1xuICAgIH1cblxuICAgIHNldChpLCB2YWwpIHtcbiAgICAgIHZhciBvbGQ7XG4gICAgICBpZiAodGhpcy5fYXJyYXlbaV0gIT09IHZhbCkge1xuICAgICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKTtcbiAgICAgICAgdGhpcy5fYXJyYXlbaV0gPSB2YWw7XG4gICAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICBhZGQodmFsKSB7XG4gICAgICBpZiAoIXRoaXMuX2FycmF5LmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaCh2YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZSh2YWwpIHtcbiAgICAgIHZhciBpbmRleCwgb2xkO1xuICAgICAgaW5kZXggPSB0aGlzLl9hcnJheS5pbmRleE9mKHZhbCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpO1xuICAgICAgICB0aGlzLl9hcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VkKG9sZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGx1Y2soZm4pIHtcbiAgICAgIHZhciBmb3VuZCwgaW5kZXgsIG9sZDtcbiAgICAgIGluZGV4ID0gdGhpcy5fYXJyYXkuZmluZEluZGV4KGZuKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpO1xuICAgICAgICBmb3VuZCA9IHRoaXMuX2FycmF5W2luZGV4XTtcbiAgICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VkKG9sZCk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRvQXJyYXkoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKTtcbiAgICB9XG5cbiAgICBjb3VudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hcnJheS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc3RhdGljIG5ld1N1YkNsYXNzKGZuLCBhcnIpIHtcbiAgICAgIHZhciBTdWJDbGFzcztcbiAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIFN1YkNsYXNzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKFN1YkNsYXNzLnByb3RvdHlwZSwgZm4pO1xuICAgICAgICByZXR1cm4gbmV3IFN1YkNsYXNzKGFycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoYXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb3B5KGFycikge1xuICAgICAgdmFyIGNvbGw7XG4gICAgICBpZiAoYXJyID09IG51bGwpIHtcbiAgICAgICAgYXJyID0gdGhpcy50b0FycmF5KCk7XG4gICAgICB9XG4gICAgICBjb2xsID0gbmV3IHRoaXMuY29uc3RydWN0b3IoYXJyKTtcbiAgICAgIHJldHVybiBjb2xsO1xuICAgIH1cblxuICAgIGVxdWFscyhhcnIpIHtcbiAgICAgIHJldHVybiAodGhpcy5jb3VudCgpID09PSAodHlwZW9mIGFyci5jb3VudCA9PT0gJ2Z1bmN0aW9uJyA/IGFyci5jb3VudCgpIDogYXJyLmxlbmd0aCkpICYmIHRoaXMuZXZlcnkoZnVuY3Rpb24odmFsLCBpKSB7XG4gICAgICAgIHJldHVybiBhcnJbaV0gPT09IHZhbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEFkZGVkRnJvbShhcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gIWFyci5pbmNsdWRlcyhpdGVtKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFJlbW92ZWRGcm9tKGFycikge1xuICAgICAgcmV0dXJuIGFyci5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH07XG5cbiAgQ29sbGVjdGlvbi5yZWFkRnVuY3Rpb25zID0gWydldmVyeScsICdmaW5kJywgJ2ZpbmRJbmRleCcsICdmb3JFYWNoJywgJ2luY2x1ZGVzJywgJ2luZGV4T2YnLCAnam9pbicsICdsYXN0SW5kZXhPZicsICdtYXAnLCAncmVkdWNlJywgJ3JlZHVjZVJpZ2h0JywgJ3NvbWUnLCAndG9TdHJpbmcnXTtcblxuICBDb2xsZWN0aW9uLnJlYWRMaXN0RnVuY3Rpb25zID0gWydjb25jYXQnLCAnZmlsdGVyJywgJ3NsaWNlJ107XG5cbiAgQ29sbGVjdGlvbi53cml0ZWZ1bmN0aW9ucyA9IFsncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J107XG5cbiAgQ29sbGVjdGlvbi5yZWFkRnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oZnVuY3QpIHtcbiAgICByZXR1cm4gQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24oLi4uYXJnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgQ29sbGVjdGlvbi5yZWFkTGlzdEZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmN0KSB7XG4gICAgcmV0dXJuIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uKC4uLmFyZykge1xuICAgICAgcmV0dXJuIHRoaXMuY29weSh0aGlzLl9hcnJheVtmdW5jdF0oLi4uYXJnKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgQ29sbGVjdGlvbi53cml0ZWZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmN0KSB7XG4gICAgcmV0dXJuIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uKC4uLmFyZykge1xuICAgICAgdmFyIG9sZCwgcmVzO1xuICAgICAgb2xkID0gdGhpcy50b0FycmF5KCk7XG4gICAgICByZXMgPSB0aGlzLl9hcnJheVtmdW5jdF0oLi4uYXJnKTtcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gQ29sbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbGxlY3Rpb24ucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvdW50KCk7XG4gIH1cbn0pO1xuXG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wgIT09IG51bGwgPyBTeW1ib2wuaXRlcmF0b3IgOiB2b2lkIDApIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH07XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQ29sbGVjdGlvbi5qcy5tYXBcbiIsInZhciBFbGVtZW50LCBNaXhhYmxlLCBQcm9wZXJ0eTtcblxuUHJvcGVydHkgPSByZXF1aXJlKCcuL1Byb3BlcnR5Jyk7XG5cbk1peGFibGUgPSByZXF1aXJlKCcuL01peGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50ID0gY2xhc3MgRWxlbWVudCBleHRlbmRzIE1peGFibGUge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgKHRoaXMuc2V0UHJvcGVydGllcyAhPSBudWxsKSkge1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKGRhdGEpO1xuICAgIH1cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7fVxuXG4gIHRhcChuYW1lKSB7XG4gICAgdmFyIGFyZ3M7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBuYW1lLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNhbGxiYWNrKG5hbWUpIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzW25hbWVdID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2NhbGxiYWNrc1tuYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICAgIHRoaXMuX2NhbGxiYWNrc1tuYW1lXS5vd25lciA9IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3NbbmFtZV07XG4gIH1cblxuICBnZXRGaW5hbFByb3BlcnRpZXMoKSB7XG4gICAgaWYgKHRoaXMuX3Byb3BlcnRpZXMgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFsnX3Byb3BlcnRpZXMnXS5jb25jYXQodGhpcy5fcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICByZXR1cm4gcHJvcC5uYW1lO1xuICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZXh0ZW5kZWQodGFyZ2V0KSB7XG4gICAgdmFyIGksIGxlbiwgb3B0aW9ucywgcHJvcGVydHksIHJlZiwgcmVzdWx0cztcbiAgICBpZiAodGhpcy5fcHJvcGVydGllcyAhPSBudWxsKSB7XG4gICAgICByZWYgPSB0aGlzLl9wcm9wZXJ0aWVzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHByb3BlcnR5ID0gcmVmW2ldO1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcGVydHkub3B0aW9ucyk7XG4gICAgICAgIHJlc3VsdHMucHVzaCgobmV3IFByb3BlcnR5KHByb3BlcnR5Lm5hbWUsIG9wdGlvbnMpKS5iaW5kKHRhcmdldCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHByb3BlcnR5KHByb3AsIGRlc2MpIHtcbiAgICByZXR1cm4gKG5ldyBQcm9wZXJ0eShwcm9wLCBkZXNjKSkuYmluZCh0aGlzLnByb3RvdHlwZSk7XG4gIH1cblxuICBzdGF0aWMgcHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIGRlc2MsIHByb3AsIHJlc3VsdHM7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAocHJvcCBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICBkZXNjID0gcHJvcGVydGllc1twcm9wXTtcbiAgICAgIHJlc3VsdHMucHVzaCh0aGlzLnByb3BlcnR5KHByb3AsIGRlc2MpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FbGVtZW50LmpzLm1hcFxuIiwidmFyIEJpbmRlciwgRXZlbnRCaW5kO1xuXG5CaW5kZXIgPSByZXF1aXJlKCcuL0JpbmRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50QmluZCA9IGNsYXNzIEV2ZW50QmluZCBleHRlbmRzIEJpbmRlciB7XG4gIGNvbnN0cnVjdG9yKGV2ZW50MSwgdGFyZ2V0MSwgY2FsbGJhY2spIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZXZlbnQgPSBldmVudDE7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQxO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGdldFJlZigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0LFxuICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tcbiAgICB9O1xuICB9XG5cbiAgYmluZFRvKHRhcmdldCkge1xuICAgIHRoaXMudW5iaW5kKCk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHRoaXMuYmluZCgpO1xuICB9XG5cbiAgZG9CaW5kKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjayk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQuYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5hZGRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9uKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGZ1bmN0aW9uIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMgd2FzIGZvdW5kJyk7XG4gICAgfVxuICB9XG5cbiAgZG9VbmJpbmQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudGFyZ2V0Lm9mZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9mZih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpO1xuICAgIH1cbiAgfVxuXG4gIGVxdWFscyhldmVudEJpbmQpIHtcbiAgICByZXR1cm4gc3VwZXIuZXF1YWxzKGV2ZW50QmluZCkgJiYgZXZlbnRCaW5kLmV2ZW50ID09PSB0aGlzLmV2ZW50O1xuICB9XG5cbiAgbWF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHJldHVybiBldmVudCA9PT0gdGhpcy5ldmVudCAmJiB0YXJnZXQgPT09IHRoaXMudGFyZ2V0O1xuICB9XG5cbiAgc3RhdGljIGNoZWNrRW1pdHRlcihlbWl0dGVyLCBmYXRhbCA9IHRydWUpIHtcbiAgICBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZW1pdHRlci5hZGRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChmYXRhbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRXZlbnRCaW5kLmpzLm1hcFxuIiwidmFyIEV2ZW50RW1pdHRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgZ2V0QWxsRXZlbnRzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgIH1cblxuICAgIGdldExpc3RlbmVycyhlKSB7XG4gICAgICB2YXIgZXZlbnRzO1xuICAgICAgZXZlbnRzID0gdGhpcy5nZXRBbGxFdmVudHMoKTtcbiAgICAgIHJldHVybiBldmVudHNbZV0gfHwgKGV2ZW50c1tlXSA9IFtdKTtcbiAgICB9XG5cbiAgICBoYXNMaXN0ZW5lcihlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdGVuZXJzKGUpLmluY2x1ZGVzKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBhZGRMaXN0ZW5lcihlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVyKGUsIGxpc3RlbmVyKSkge1xuICAgICAgICB0aGlzLmdldExpc3RlbmVycyhlKS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJBZGRlZChlLCBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGlzdGVuZXJBZGRlZChlLCBsaXN0ZW5lcikge31cblxuICAgIHJlbW92ZUxpc3RlbmVyKGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgaW5kZXgsIGxpc3RlbmVycztcbiAgICAgIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGUpO1xuICAgICAgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lclJlbW92ZWQoZSwgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpc3RlbmVyUmVtb3ZlZChlLCBsaXN0ZW5lcikge31cblxuICAgIGVtaXRFdmVudChlLCAuLi5hcmdzKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzO1xuICAgICAgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnMoZSkuc2xpY2UoKTtcbiAgICAgIHJldHVybiBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRzID0ge307XG4gICAgfVxuXG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0RXZlbnQ7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0RXZlbnQ7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG4gIHJldHVybiBFdmVudEVtaXR0ZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRXZlbnRFbWl0dGVyLmpzLm1hcFxuIiwidmFyIEFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlciwgSW52YWxpZGF0b3IsIFByb3BlcnR5V2F0Y2hlcjtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnLi9Qcm9wZXJ0eVdhdGNoZXInKTtcblxuSW52YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9JbnZhbGlkYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlciA9IGNsYXNzIEFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlciBleHRlbmRzIFByb3BlcnR5V2F0Y2hlciB7XG4gIGxvYWRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBzdXBlci5sb2FkT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmUgPSBvcHRpb25zLmFjdGl2ZTtcbiAgfVxuXG4gIHNob3VsZEJpbmQoKSB7XG4gICAgdmFyIGFjdGl2ZTtcbiAgICBpZiAodGhpcy5hY3RpdmUgIT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuaW52YWxpZGF0b3IgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMsIHRoaXMuc2NvcGUpO1xuICAgICAgICB0aGlzLmludmFsaWRhdG9yLmNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrQmluZCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdGhpcy5pbnZhbGlkYXRvci5yZWN5Y2xlKCk7XG4gICAgICBhY3RpdmUgPSB0aGlzLmFjdGl2ZSh0aGlzLmludmFsaWRhdG9yKTtcbiAgICAgIHRoaXMuaW52YWxpZGF0b3IuZW5kUmVjeWNsZSgpO1xuICAgICAgdGhpcy5pbnZhbGlkYXRvci5iaW5kKCk7XG4gICAgICByZXR1cm4gYWN0aXZlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9JbnZhbGlkYXRlZC9BY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXIuanMubWFwXG4iLCJ2YXIgQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlciwgUHJvcGVydHlXYXRjaGVyO1xuXG5Qcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCcuL1Byb3BlcnR5V2F0Y2hlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIgPSBjbGFzcyBDb2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyIGV4dGVuZHMgUHJvcGVydHlXYXRjaGVyIHtcbiAgbG9hZE9wdGlvbnMob3B0aW9ucykge1xuICAgIHN1cGVyLmxvYWRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMub25BZGRlZCA9IG9wdGlvbnMub25BZGRlZDtcbiAgICByZXR1cm4gdGhpcy5vblJlbW92ZWQgPSBvcHRpb25zLm9uUmVtb3ZlZDtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZSh2YWx1ZSwgb2xkKSB7XG4gICAgb2xkID0gdmFsdWUuY29weShvbGQgfHwgW10pO1xuICAgIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuc2NvcGUsIG9sZCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vbkFkZGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGlmICghb2xkLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub25BZGRlZC5jYWxsKHRoaXMuc2NvcGUsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG9sZC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGlmICghdmFsdWUuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vblJlbW92ZWQuY2FsbCh0aGlzLnNjb3BlLCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvSW52YWxpZGF0ZWQvQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlci5qcy5tYXBcbiIsInZhciBJbnZhbGlkYXRlZCwgSW52YWxpZGF0b3I7XG5cbkludmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnZhbGlkYXRlZCA9IGNsYXNzIEludmFsaWRhdGVkIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zICE9IG51bGwpIHtcbiAgICAgIHRoaXMubG9hZE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICghKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmluaXRCeUxvYWRlciA6IHZvaWQgMCkgJiYgKG9wdGlvbnMubG9hZGVyICE9IG51bGwpKSkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbG9hZE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLnNjb3BlO1xuICAgIGlmIChvcHRpb25zLmxvYWRlckFzU2NvcGUgJiYgKG9wdGlvbnMubG9hZGVyICE9IG51bGwpKSB7XG4gICAgICB0aGlzLnNjb3BlID0gb3B0aW9ucy5sb2FkZXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1bmtub3duKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yLnZhbGlkYXRlVW5rbm93bnMoKTtcbiAgfVxuXG4gIGludmFsaWRhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaW52YWxpZGF0b3IgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG5ldyBJbnZhbGlkYXRvcih0aGlzLCB0aGlzLnNjb3BlKTtcbiAgICB9XG4gICAgdGhpcy5pbnZhbGlkYXRvci5yZWN5Y2xlKCk7XG4gICAgdGhpcy5oYW5kbGVVcGRhdGUodGhpcy5pbnZhbGlkYXRvcik7XG4gICAgdGhpcy5pbnZhbGlkYXRvci5lbmRSZWN5Y2xlKCk7XG4gICAgdGhpcy5pbnZhbGlkYXRvci5iaW5kKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoYW5kbGVVcGRhdGUoaW52YWxpZGF0b3IpIHtcbiAgICBpZiAodGhpcy5zY29wZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuc2NvcGUsIGludmFsaWRhdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soaW52YWxpZGF0b3IpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuaW52YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL0ludmFsaWRhdGVkL0ludmFsaWRhdGVkLmpzLm1hcFxuIiwidmFyIEJpbmRlciwgUHJvcGVydHlXYXRjaGVyO1xuXG5CaW5kZXIgPSByZXF1aXJlKCcuLi9CaW5kZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9wZXJ0eVdhdGNoZXIgPSBjbGFzcyBQcm9wZXJ0eVdhdGNoZXIgZXh0ZW5kcyBCaW5kZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zMSkge1xuICAgIHZhciByZWY7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zMTtcbiAgICB0aGlzLmludmFsaWRhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGUoKTtcbiAgICB9O1xuICAgIHRoaXMudXBkYXRlQ2FsbGJhY2sgPSAob2xkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUob2xkKTtcbiAgICB9O1xuICAgIGlmICh0aGlzLm9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5sb2FkT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoISgoKHJlZiA9IHRoaXMub3B0aW9ucykgIT0gbnVsbCA/IHJlZi5pbml0QnlMb2FkZXIgOiB2b2lkIDApICYmICh0aGlzLm9wdGlvbnMubG9hZGVyICE9IG51bGwpKSkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbG9hZE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLnNjb3BlO1xuICAgIGlmIChvcHRpb25zLmxvYWRlckFzU2NvcGUgJiYgKG9wdGlvbnMubG9hZGVyICE9IG51bGwpKSB7XG4gICAgICB0aGlzLnNjb3BlID0gb3B0aW9ucy5sb2FkZXI7XG4gICAgfVxuICAgIHRoaXMucHJvcGVydHkgPSBvcHRpb25zLnByb3BlcnR5O1xuICAgIHRoaXMuY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuICAgIHJldHVybiB0aGlzLmF1dG9CaW5kID0gb3B0aW9ucy5hdXRvQmluZDtcbiAgfVxuXG4gIGNvcHlXaXRoKG9wdCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5fX3Byb3RvX18uY29uc3RydWN0b3IoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCBvcHQpKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b0JpbmQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrQmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldFByb3BlcnR5KCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5wcm9wZXJ0eSA9IHRoaXMuc2NvcGUuZ2V0UHJvcGVydHlJbnN0YW5jZSh0aGlzLnByb3BlcnR5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydHk7XG4gIH1cblxuICBjaGVja0JpbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlQmluZCh0aGlzLnNob3VsZEJpbmQoKSk7XG4gIH1cblxuICBzaG91bGRCaW5kKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2FuQmluZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eSgpICE9IG51bGw7XG4gIH1cblxuICBkb0JpbmQoKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgICB0aGlzLmdldFByb3BlcnR5KCkub24oJ2ludmFsaWRhdGVkJywgdGhpcy5pbnZhbGlkYXRlQ2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5KCkub24oJ3VwZGF0ZWQnLCB0aGlzLnVwZGF0ZUNhbGxiYWNrKTtcbiAgfVxuXG4gIGRvVW5iaW5kKCkge1xuICAgIHRoaXMuZ2V0UHJvcGVydHkoKS5vZmYoJ2ludmFsaWRhdGVkJywgdGhpcy5pbnZhbGlkYXRlQ2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5KCkub2ZmKCd1cGRhdGVkJywgdGhpcy51cGRhdGVDYWxsYmFjayk7XG4gIH1cblxuICBnZXRSZWYoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnNjb3BlLFxuICAgICAgICBjYWxsYmFjazogdGhpcy5jYWxsYmFja1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcGVydHk6IHRoaXMucHJvcGVydHkucHJvcGVydHkubmFtZSxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnByb3BlcnR5Lm9iaixcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaW52YWxpZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eSgpLmdldCgpO1xuICB9XG5cbiAgdXBkYXRlKG9sZCkge1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuZ2V0UHJvcGVydHkoKS5nZXQoKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUsIG9sZCk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UodmFsdWUsIG9sZCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5zY29wZSwgb2xkKTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL0ludmFsaWRhdGVkL1Byb3BlcnR5V2F0Y2hlci5qcy5tYXBcbiIsInZhciBCaW5kZXIsIEV2ZW50QmluZCwgSW52YWxpZGF0b3IsIHBsdWNrO1xuXG5CaW5kZXIgPSByZXF1aXJlKCcuL0JpbmRlcicpO1xuXG5FdmVudEJpbmQgPSByZXF1aXJlKCcuL0V2ZW50QmluZCcpO1xuXG5wbHVjayA9IGZ1bmN0aW9uKGFyciwgZm4pIHtcbiAgdmFyIGZvdW5kLCBpbmRleDtcbiAgaW5kZXggPSBhcnIuZmluZEluZGV4KGZuKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICBmb3VuZCA9IGFycltpbmRleF07XG4gICAgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRhdG9yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBJbnZhbGlkYXRvciBleHRlbmRzIEJpbmRlciB7XG4gICAgY29uc3RydWN0b3IoaW52YWxpZGF0ZWQsIHNjb3BlID0gbnVsbCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBpbnZhbGlkYXRlZDtcbiAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICAgIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzID0gW107XG4gICAgICB0aGlzLnJlY3ljbGVkID0gW107XG4gICAgICB0aGlzLnVua25vd25zID0gW107XG4gICAgICB0aGlzLnN0cmljdCA9IHRoaXMuY29uc3RydWN0b3Iuc3RyaWN0O1xuICAgICAgdGhpcy5pbnZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmludmFsaWRhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrLm93bmVyID0gdGhpcztcbiAgICB9XG5cbiAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgdmFyIGZ1bmN0TmFtZTtcbiAgICAgIHRoaXMuaW52YWxpZCA9IHRydWU7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuaW52YWxpZGF0ZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlZCgpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKCh0aGlzLmludmFsaWRhdGVkICE9IG51bGwpICYmIHR5cGVvZiB0aGlzLmludmFsaWRhdGVkLmludmFsaWRhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlZC5pbnZhbGlkYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmludmFsaWRhdGVkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGZ1bmN0TmFtZSA9ICdpbnZhbGlkYXRlJyArIHRoaXMuaW52YWxpZGF0ZWQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLmludmFsaWRhdGVkLnNsaWNlKDEpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2NvcGVbZnVuY3ROYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVbZnVuY3ROYW1lXSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNjb3BlW3RoaXMuaW52YWxpZGF0ZWRdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHVua25vd24oKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKHR5cGVvZiAoKHJlZiA9IHRoaXMuaW52YWxpZGF0ZWQpICE9IG51bGwgPyByZWYudW5rbm93biA6IHZvaWQgMCkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlZC51bmtub3duKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkRXZlbnRCaW5kKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRCaW5kZXIobmV3IEV2ZW50QmluZChldmVudCwgdGFyZ2V0LCBjYWxsYmFjaykpO1xuICAgIH1cblxuICAgIGFkZEJpbmRlcihiaW5kZXIpIHtcbiAgICAgIGlmIChiaW5kZXIuY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgICAgICBiaW5kZXIuY2FsbGJhY2sgPSB0aGlzLmludmFsaWRhdGVDYWxsYmFjaztcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuc29tZShmdW5jdGlvbihldmVudEJpbmQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5lcXVhbHMoYmluZGVyKTtcbiAgICAgIH0pKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKHBsdWNrKHRoaXMucmVjeWNsZWQsIGZ1bmN0aW9uKGV2ZW50QmluZCkge1xuICAgICAgICAgIHJldHVybiBldmVudEJpbmQuZXF1YWxzKGJpbmRlcik7XG4gICAgICAgIH0pIHx8IGJpbmRlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VW5rbm93bkNhbGxiYWNrKHByb3ApIHtcbiAgICAgIHZhciBjYWxsYmFjaztcbiAgICAgIGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRVbmtub3duKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBwcm9wLmdldCgpO1xuICAgICAgICB9LCBwcm9wKTtcbiAgICAgIH07XG4gICAgICBjYWxsYmFjay5yZWYgPSB7XG4gICAgICAgIHByb3A6IHByb3BcbiAgICAgIH07XG4gICAgICByZXR1cm4gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgYWRkVW5rbm93bihmbiwgcHJvcCkge1xuICAgICAgaWYgKCF0aGlzLmZpbmRVbmtub3duKHByb3ApKSB7XG4gICAgICAgIGZuLnJlZiA9IHtcbiAgICAgICAgICBcInByb3BcIjogcHJvcFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVua25vd25zLnB1c2goZm4pO1xuICAgICAgICByZXR1cm4gdGhpcy51bmtub3duKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmluZFVua25vd24ocHJvcCkge1xuICAgICAgaWYgKChwcm9wICE9IG51bGwpIHx8ICh0eXBlb2YgdGFyZ2V0ICE9PSBcInVuZGVmaW5lZFwiICYmIHRhcmdldCAhPT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5rbm93bnMuZmluZChmdW5jdGlvbih1bmtub3duKSB7XG4gICAgICAgICAgcmV0dXJuIHVua25vd24ucmVmLnByb3AgPT09IHByb3A7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50KGV2ZW50LCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgICBpZiAodGhpcy5jaGVja0VtaXR0ZXIodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRFdmVudEJpbmQoZXZlbnQsIHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsdWUodmFsLCBldmVudCwgdGFyZ2V0ID0gdGhpcy5zY29wZSkge1xuICAgICAgdGhpcy5ldmVudChldmVudCwgdGFyZ2V0KTtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgcHJvcChwcm9wLCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgICB2YXIgcHJvcEluc3RhbmNlO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoKHRhcmdldC5nZXRQcm9wZXJ0eUluc3RhbmNlICE9IG51bGwpICYmIChwcm9wSW5zdGFuY2UgPSB0YXJnZXQuZ2V0UHJvcGVydHlJbnN0YW5jZShwcm9wKSkpIHtcbiAgICAgICAgICBwcm9wID0gcHJvcEluc3RhbmNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuY2hlY2tQcm9wSW5zdGFuY2UocHJvcCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9wZXJ0eSBtdXN0IGJlIGEgUHJvcGVydHlJbnN0YW5jZSBvciBhIHN0cmluZycpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRFdmVudEJpbmQoJ2ludmFsaWRhdGVkJywgcHJvcCwgdGhpcy5nZXRVbmtub3duQ2FsbGJhY2socHJvcCkpO1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUocHJvcC5nZXQoKSwgJ3VwZGF0ZWQnLCBwcm9wKTtcbiAgICB9XG5cbiAgICBwcm9wUGF0aChwYXRoLCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgICB2YXIgcHJvcCwgdmFsO1xuICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICAgIHZhbCA9IHRhcmdldDtcbiAgICAgIHdoaWxlICgodmFsICE9IG51bGwpICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICBwcm9wID0gcGF0aC5zaGlmdCgpO1xuICAgICAgICB2YWwgPSB0aGlzLnByb3AocHJvcCwgdmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgcHJvcEluaXRpYXRlZChwcm9wLCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgICB2YXIgaW5pdGlhdGVkO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJyAmJiAodGFyZ2V0LmdldFByb3BlcnR5SW5zdGFuY2UgIT0gbnVsbCkpIHtcbiAgICAgICAgcHJvcCA9IHRhcmdldC5nZXRQcm9wZXJ0eUluc3RhbmNlKHByb3ApO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5jaGVja1Byb3BJbnN0YW5jZShwcm9wKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3BlcnR5IG11c3QgYmUgYSBQcm9wZXJ0eUluc3RhbmNlIG9yIGEgc3RyaW5nJyk7XG4gICAgICB9XG4gICAgICBpbml0aWF0ZWQgPSBwcm9wLmluaXRpYXRlZDtcbiAgICAgIGlmICghaW5pdGlhdGVkKSB7XG4gICAgICAgIHRoaXMuZXZlbnQoJ3VwZGF0ZWQnLCBwcm9wKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbml0aWF0ZWQ7XG4gICAgfVxuXG4gICAgZnVuY3QoZnVuY3QpIHtcbiAgICAgIHZhciBpbnZhbGlkYXRvciwgcmVzO1xuICAgICAgaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRVbmtub3duKCgpID0+IHtcbiAgICAgICAgICB2YXIgcmVzMjtcbiAgICAgICAgICByZXMyID0gZnVuY3QoaW52YWxpZGF0b3IpO1xuICAgICAgICAgIGlmIChyZXMgIT09IHJlczIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGludmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmVzID0gZnVuY3QoaW52YWxpZGF0b3IpO1xuICAgICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMucHVzaChpbnZhbGlkYXRvcik7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHZhbGlkYXRlVW5rbm93bnMoKSB7XG4gICAgICB2YXIgdW5rbm93bnM7XG4gICAgICB1bmtub3ducyA9IHRoaXMudW5rbm93bnM7XG4gICAgICB0aGlzLnVua25vd25zID0gW107XG4gICAgICByZXR1cm4gdW5rbm93bnMuZm9yRWFjaChmdW5jdGlvbih1bmtub3duKSB7XG4gICAgICAgIHJldHVybiB1bmtub3duKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBiaW5kKCkge1xuICAgICAgdGhpcy5pbnZhbGlkID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuZm9yRWFjaChmdW5jdGlvbihldmVudEJpbmQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5iaW5kKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZWN5Y2xlKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgZG9uZSwgcmVzO1xuICAgICAgdGhpcy5yZWN5Y2xlZCA9IHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzO1xuICAgICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMgPSBbXTtcbiAgICAgIGRvbmUgPSB0aGlzLmVuZFJlY3ljbGUuYmluZCh0aGlzKTtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpZiAoY2FsbGJhY2subGVuZ3RoID4gMSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLCBkb25lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBjYWxsYmFjayh0aGlzKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRvbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZW5kUmVjeWNsZSgpIHtcbiAgICAgIHRoaXMucmVjeWNsZWQuZm9yRWFjaChmdW5jdGlvbihldmVudEJpbmQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMucmVjeWNsZWQgPSBbXTtcbiAgICB9XG5cbiAgICBjaGVja0VtaXR0ZXIoZW1pdHRlcikge1xuICAgICAgcmV0dXJuIEV2ZW50QmluZC5jaGVja0VtaXR0ZXIoZW1pdHRlciwgdGhpcy5zdHJpY3QpO1xuICAgIH1cblxuICAgIGNoZWNrUHJvcEluc3RhbmNlKHByb3ApIHtcbiAgICAgIHJldHVybiB0eXBlb2YgcHJvcC5nZXQgPT09IFwiZnVuY3Rpb25cIiAmJiB0aGlzLmNoZWNrRW1pdHRlcihwcm9wKTtcbiAgICB9XG5cbiAgICB1bmJpbmQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuZm9yRWFjaChmdW5jdGlvbihldmVudEJpbmQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9O1xuXG4gIEludmFsaWRhdG9yLnN0cmljdCA9IHRydWU7XG5cbiAgcmV0dXJuIEludmFsaWRhdG9yO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0ludmFsaWRhdG9yLmpzLm1hcFxuIiwidmFyIExvYWRlciwgT3ZlcnJpZGVyO1xuXG5PdmVycmlkZXIgPSByZXF1aXJlKCcuL092ZXJyaWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgTG9hZGVyIGV4dGVuZHMgT3ZlcnJpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXRQcmVsb2FkZWQoKTtcbiAgICB9XG5cbiAgICBpbml0UHJlbG9hZGVkKCkge1xuICAgICAgdmFyIGRlZkxpc3Q7XG4gICAgICBkZWZMaXN0ID0gdGhpcy5wcmVsb2FkZWQ7XG4gICAgICB0aGlzLnByZWxvYWRlZCA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXMubG9hZChkZWZMaXN0KTtcbiAgICB9XG5cbiAgICBsb2FkKGRlZkxpc3QpIHtcbiAgICAgIHZhciBsb2FkZWQsIHRvTG9hZDtcbiAgICAgIHRvTG9hZCA9IFtdO1xuICAgICAgbG9hZGVkID0gZGVmTGlzdC5tYXAoKGRlZikgPT4ge1xuICAgICAgICB2YXIgaW5zdGFuY2U7XG4gICAgICAgIGlmIChkZWYuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgIGRlZiA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgbG9hZGVyOiB0aGlzXG4gICAgICAgICAgfSwgZGVmKTtcbiAgICAgICAgICBpbnN0YW5jZSA9IExvYWRlci5sb2FkKGRlZik7XG4gICAgICAgICAgZGVmID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2VcbiAgICAgICAgICB9LCBkZWYpO1xuICAgICAgICAgIGlmIChkZWYuaW5pdEJ5TG9hZGVyICYmIChpbnN0YW5jZS5pbml0ICE9IG51bGwpKSB7XG4gICAgICAgICAgICB0b0xvYWQucHVzaChpbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWY7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucHJlbG9hZGVkID0gdGhpcy5wcmVsb2FkZWQuY29uY2F0KGxvYWRlZCk7XG4gICAgICByZXR1cm4gdG9Mb2FkLmZvckVhY2goZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmluaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHByZWxvYWQoZGVmKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGVmKSkge1xuICAgICAgICBkZWYgPSBbZGVmXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnByZWxvYWRlZCA9ICh0aGlzLnByZWxvYWRlZCB8fCBbXSkuY29uY2F0KGRlZik7XG4gICAgfVxuXG4gICAgZGVzdHJveUxvYWRlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZWxvYWRlZC5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICB2YXIgcmVmO1xuICAgICAgICByZXR1cm4gKHJlZiA9IGRlZi5pbnN0YW5jZSkgIT0gbnVsbCA/IHR5cGVvZiByZWYuZGVzdHJveSA9PT0gXCJmdW5jdGlvblwiID8gcmVmLmRlc3Ryb3koKSA6IHZvaWQgMCA6IHZvaWQgMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZpbmFsUHJvcGVydGllcygpIHtcbiAgICAgIHJldHVybiBzdXBlci5nZXRGaW5hbFByb3BlcnRpZXMoKS5jb25jYXQoWydwcmVsb2FkZWQnXSk7XG4gICAgfVxuXG4gICAgZXh0ZW5kZWQodGFyZ2V0KSB7XG4gICAgICBzdXBlci5leHRlbmRlZCh0YXJnZXQpO1xuICAgICAgaWYgKHRoaXMucHJlbG9hZGVkKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQucHJlbG9hZGVkID0gKHRhcmdldC5wcmVsb2FkZWQgfHwgW10pLmNvbmNhdCh0aGlzLnByZWxvYWRlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWRNYW55KGRlZikge1xuICAgICAgcmV0dXJuIGRlZi5tYXAoKGQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZChkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkKGRlZikge1xuICAgICAgaWYgKHR5cGVvZiBkZWYudHlwZS5jb3B5V2l0aCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBkZWYudHlwZS5jb3B5V2l0aChkZWYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBkZWYudHlwZShkZWYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwcmVsb2FkKGRlZikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvdG90eXBlLnByZWxvYWQoZGVmKTtcbiAgICB9XG5cbiAgfTtcblxuICBMb2FkZXIucHJvdG90eXBlLnByZWxvYWRlZCA9IFtdO1xuXG4gIExvYWRlci5vdmVycmlkZXMoe1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbml0LndpdGhvdXRMb2FkZXIoKTtcbiAgICAgIHJldHVybiB0aGlzLmluaXRQcmVsb2FkZWQoKTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kZXN0cm95LndpdGhvdXRMb2FkZXIoKTtcbiAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3lMb2FkZWQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBMb2FkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTG9hZGVyLmpzLm1hcFxuIiwidmFyIE1peGFibGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1peGFibGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIE1peGFibGUge1xuICAgIHN0YXRpYyBleHRlbmQob2JqKSB7XG4gICAgICB0aGlzLkV4dGVuc2lvbi5tYWtlKG9iaiwgdGhpcyk7XG4gICAgICBpZiAob2JqLnByb3RvdHlwZSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkV4dGVuc2lvbi5tYWtlKG9iai5wcm90b3R5cGUsIHRoaXMucHJvdG90eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5jbHVkZShvYmopIHtcbiAgICAgIHJldHVybiB0aGlzLkV4dGVuc2lvbi5tYWtlKG9iaiwgdGhpcy5wcm90b3R5cGUpO1xuICAgIH1cblxuICB9O1xuXG4gIE1peGFibGUuRXh0ZW5zaW9uID0ge1xuICAgIG1ha2VPbmNlOiBmdW5jdGlvbihzb3VyY2UsIHRhcmdldCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghKChyZWYgPSB0YXJnZXQuZXh0ZW5zaW9ucykgIT0gbnVsbCA/IHJlZi5pbmNsdWRlcyhzb3VyY2UpIDogdm9pZCAwKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ha2U6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgaSwgbGVuLCBvcmlnaW5hbEZpbmFsUHJvcGVydGllcywgcHJvcCwgcmVmO1xuICAgICAgcmVmID0gdGhpcy5nZXRFeHRlbnNpb25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBwcm9wID0gcmVmW2ldO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wLm5hbWUsIHByb3ApO1xuICAgICAgfVxuICAgICAgaWYgKHNvdXJjZS5nZXRGaW5hbFByb3BlcnRpZXMgJiYgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcykge1xuICAgICAgICBvcmlnaW5hbEZpbmFsUHJvcGVydGllcyA9IHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXM7XG4gICAgICAgIHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc291cmNlLmdldEZpbmFsUHJvcGVydGllcygpLmNvbmNhdChvcmlnaW5hbEZpbmFsUHJvcGVydGllcy5jYWxsKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXMgPSBzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzIHx8IHRhcmdldC5nZXRGaW5hbFByb3BlcnRpZXM7XG4gICAgICB9XG4gICAgICB0YXJnZXQuZXh0ZW5zaW9ucyA9ICh0YXJnZXQuZXh0ZW5zaW9ucyB8fCBbXSkuY29uY2F0KFtzb3VyY2VdKTtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlLmV4dGVuZGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuZXh0ZW5kZWQodGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFsd2F5c0ZpbmFsOiBbJ2V4dGVuZGVkJywgJ2V4dGVuc2lvbnMnLCAnX19zdXBlcl9fJywgJ2NvbnN0cnVjdG9yJywgJ2dldEZpbmFsUHJvcGVydGllcyddLFxuICAgIGdldEV4dGVuc2lvblByb3BlcnRpZXM6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgYWx3YXlzRmluYWwsIHByb3BzLCB0YXJnZXRDaGFpbjtcbiAgICAgIGFsd2F5c0ZpbmFsID0gdGhpcy5hbHdheXNGaW5hbDtcbiAgICAgIHRhcmdldENoYWluID0gdGhpcy5nZXRQcm90b3R5cGVDaGFpbih0YXJnZXQpO1xuICAgICAgcHJvcHMgPSBbXTtcbiAgICAgIHRoaXMuZ2V0UHJvdG90eXBlQ2hhaW4oc291cmNlKS5ldmVyeShmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIGV4Y2x1ZGU7XG4gICAgICAgIGlmICghdGFyZ2V0Q2hhaW4uaW5jbHVkZXMob2JqKSkge1xuICAgICAgICAgIGV4Y2x1ZGUgPSBhbHdheXNGaW5hbDtcbiAgICAgICAgICBpZiAoc291cmNlLmdldEZpbmFsUHJvcGVydGllcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBleGNsdWRlID0gZXhjbHVkZS5jb25jYXQoc291cmNlLmdldEZpbmFsUHJvcGVydGllcygpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV4Y2x1ZGUgPSBleGNsdWRlLmNvbmNhdChbXCJsZW5ndGhcIiwgXCJwcm90b3R5cGVcIiwgXCJuYW1lXCJdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5maWx0ZXIoKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICF0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCIgJiYgaW5kZXhPZi5jYWxsKGV4Y2x1ZGUsIGtleSkgPCAwICYmICFwcm9wcy5maW5kKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3AubmFtZSA9PT0ga2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3A7XG4gICAgICAgICAgICBwcm9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgICAgICBwcm9wLm5hbWUgPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH0sXG4gICAgZ2V0UHJvdG90eXBlQ2hhaW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGJhc2VQcm90b3R5cGUsIGNoYWluO1xuICAgICAgY2hhaW4gPSBbXTtcbiAgICAgIGJhc2VQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0KTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNoYWluLnB1c2gob2JqKTtcbiAgICAgICAgaWYgKCEoKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSAmJiBvYmogIT09IE9iamVjdCAmJiBvYmogIT09IGJhc2VQcm90b3R5cGUpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGFpbjtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIE1peGFibGU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTWl4YWJsZS5qcy5tYXBcbiIsIi8vIHRvZG8gOiBcbi8vICBzaW1wbGlmaWVkIGZvcm0gOiBAd2l0aG91dE5hbWUgbWV0aG9kXG52YXIgT3ZlcnJpZGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE92ZXJyaWRlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgT3ZlcnJpZGVyIHtcbiAgICBzdGF0aWMgb3ZlcnJpZGVzKG92ZXJyaWRlcykge1xuICAgICAgcmV0dXJuIHRoaXMuT3ZlcnJpZGUuYXBwbHlNYW55KHRoaXMucHJvdG90eXBlLCB0aGlzLm5hbWUsIG92ZXJyaWRlcyk7XG4gICAgfVxuXG4gICAgZ2V0RmluYWxQcm9wZXJ0aWVzKCkge1xuICAgICAgaWYgKHRoaXMuX292ZXJyaWRlcyAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbJ19vdmVycmlkZXMnXS5jb25jYXQoT2JqZWN0LmtleXModGhpcy5fb3ZlcnJpZGVzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXh0ZW5kZWQodGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5fb3ZlcnJpZGVzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5PdmVycmlkZS5hcHBseU1hbnkodGFyZ2V0LCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsIHRoaXMuX292ZXJyaWRlcyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gT3ZlcnJpZGVyKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuZXh0ZW5kZWQgPSB0aGlzLmV4dGVuZGVkO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIE92ZXJyaWRlci5PdmVycmlkZSA9IHtcbiAgICBtYWtlTWFueTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlcykge1xuICAgICAgdmFyIGZuLCBrZXksIG92ZXJyaWRlLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrZXkgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICAgIGZuID0gb3ZlcnJpZGVzW2tleV07XG4gICAgICAgIHJlc3VsdHMucHVzaChvdmVycmlkZSA9IHRoaXMubWFrZSh0YXJnZXQsIG5hbWVzcGFjZSwga2V5LCBmbikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSxcbiAgICBhcHBseU1hbnk6IGZ1bmN0aW9uKHRhcmdldCwgbmFtZXNwYWNlLCBvdmVycmlkZXMpIHtcbiAgICAgIHZhciBrZXksIG92ZXJyaWRlLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrZXkgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICAgIG92ZXJyaWRlID0gb3ZlcnJpZGVzW2tleV07XG4gICAgICAgIGlmICh0eXBlb2Ygb3ZlcnJpZGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG92ZXJyaWRlID0gdGhpcy5tYWtlKHRhcmdldCwgbmFtZXNwYWNlLCBrZXksIG92ZXJyaWRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzLnB1c2godGhpcy5hcHBseSh0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0sXG4gICAgbWFrZTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIGZuTmFtZSwgZm4pIHtcbiAgICAgIHZhciBvdmVycmlkZTtcbiAgICAgIG92ZXJyaWRlID0ge1xuICAgICAgICBmbjoge1xuICAgICAgICAgIGN1cnJlbnQ6IGZuXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IGZuTmFtZVxuICAgICAgfTtcbiAgICAgIG92ZXJyaWRlLmZuWyd3aXRoJyArIG5hbWVzcGFjZV0gPSBmbjtcbiAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICB9LFxuICAgIGVtcHR5Rm46IGZ1bmN0aW9uKCkge30sXG4gICAgYXBwbHk6IGZ1bmN0aW9uKHRhcmdldCwgbmFtZXNwYWNlLCBvdmVycmlkZSkge1xuICAgICAgdmFyIGZuTmFtZSwgb3ZlcnJpZGVzLCByZWYsIHJlZjEsIHdpdGhvdXQ7XG4gICAgICBmbk5hbWUgPSBvdmVycmlkZS5uYW1lO1xuICAgICAgb3ZlcnJpZGVzID0gdGFyZ2V0Ll9vdmVycmlkZXMgIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24oe30sIHRhcmdldC5fb3ZlcnJpZGVzKSA6IHt9O1xuICAgICAgd2l0aG91dCA9ICgocmVmID0gdGFyZ2V0Ll9vdmVycmlkZXMpICE9IG51bGwgPyAocmVmMSA9IHJlZltmbk5hbWVdKSAhPSBudWxsID8gcmVmMS5mbi5jdXJyZW50IDogdm9pZCAwIDogdm9pZCAwKSB8fCB0YXJnZXRbZm5OYW1lXTtcbiAgICAgIG92ZXJyaWRlID0gT2JqZWN0LmFzc2lnbih7fSwgb3ZlcnJpZGUpO1xuICAgICAgaWYgKG92ZXJyaWRlc1tmbk5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgb3ZlcnJpZGUuZm4gPSBPYmplY3QuYXNzaWduKHt9LCBvdmVycmlkZXNbZm5OYW1lXS5mbiwgb3ZlcnJpZGUuZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3ZlcnJpZGUuZm4gPSBPYmplY3QuYXNzaWduKHt9LCBvdmVycmlkZS5mbik7XG4gICAgICB9XG4gICAgICBvdmVycmlkZS5mblsnd2l0aG91dCcgKyBuYW1lc3BhY2VdID0gd2l0aG91dCB8fCB0aGlzLmVtcHR5Rm47XG4gICAgICBpZiAod2l0aG91dCA9PSBudWxsKSB7XG4gICAgICAgIG92ZXJyaWRlLm1pc3NpbmdXaXRob3V0ID0gJ3dpdGhvdXQnICsgbmFtZXNwYWNlO1xuICAgICAgfSBlbHNlIGlmIChvdmVycmlkZS5taXNzaW5nV2l0aG91dCkge1xuICAgICAgICBvdmVycmlkZS5mbltvdmVycmlkZS5taXNzaW5nV2l0aG91dF0gPSB3aXRob3V0O1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZm5OYW1lLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZmluYWxGbiwgZm4sIGtleSwgcmVmMjtcbiAgICAgICAgICBmaW5hbEZuID0gb3ZlcnJpZGUuZm4uY3VycmVudC5iaW5kKHRoaXMpO1xuICAgICAgICAgIHJlZjIgPSBvdmVycmlkZS5mbjtcbiAgICAgICAgICBmb3IgKGtleSBpbiByZWYyKSB7XG4gICAgICAgICAgICBmbiA9IHJlZjJba2V5XTtcbiAgICAgICAgICAgIGZpbmFsRm5ba2V5XSA9IGZuLmJpbmQodGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAhPT0gdGhpcykge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGZuTmFtZSwge1xuICAgICAgICAgICAgICB2YWx1ZTogZmluYWxGblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaW5hbEZuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG92ZXJyaWRlc1tmbk5hbWVdID0gb3ZlcnJpZGU7XG4gICAgICByZXR1cm4gdGFyZ2V0Ll9vdmVycmlkZXMgPSBvdmVycmlkZXM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBPdmVycmlkZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvT3ZlcnJpZGVyLmpzLm1hcFxuIiwidmFyIEJhc2ljUHJvcGVydHksIENhbGN1bGF0ZWRQcm9wZXJ0eSwgQ29sbGVjdGlvblByb3BlcnR5LCBDb21wb3NlZFByb3BlcnR5LCBEeW5hbWljUHJvcGVydHksIEludmFsaWRhdGVkUHJvcGVydHksIE1peGFibGUsIFByb3BlcnR5LCBQcm9wZXJ0eU93bmVyO1xuXG5CYXNpY1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0Jhc2ljUHJvcGVydHknKTtcblxuQ29sbGVjdGlvblByb3BlcnR5ID0gcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0NvbGxlY3Rpb25Qcm9wZXJ0eScpO1xuXG5Db21wb3NlZFByb3BlcnR5ID0gcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0NvbXBvc2VkUHJvcGVydHknKTtcblxuRHluYW1pY1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0R5bmFtaWNQcm9wZXJ0eScpO1xuXG5DYWxjdWxhdGVkUHJvcGVydHkgPSByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQ2FsY3VsYXRlZFByb3BlcnR5Jyk7XG5cbkludmFsaWRhdGVkUHJvcGVydHkgPSByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvSW52YWxpZGF0ZWRQcm9wZXJ0eScpO1xuXG5Qcm9wZXJ0eU93bmVyID0gcmVxdWlyZSgnLi9Qcm9wZXJ0eU93bmVyJyk7XG5cbk1peGFibGUgPSByZXF1aXJlKCcuL01peGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgYmluZCh0YXJnZXQpIHtcbiAgICAgIHZhciBwYXJlbnQsIHByb3A7XG4gICAgICBwcm9wID0gdGhpcztcbiAgICAgIGlmICghKHR5cGVvZiB0YXJnZXQuZ2V0UHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgdGFyZ2V0LmdldFByb3BlcnR5KHRoaXMubmFtZSkgPT09IHRoaXMpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0LmdldFByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmICgocGFyZW50ID0gdGFyZ2V0LmdldFByb3BlcnR5KHRoaXMubmFtZSkpICE9IG51bGwpKSB7XG4gICAgICAgICAgdGhpcy5vdmVycmlkZShwYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0SW5zdGFuY2VUeXBlKCkuYmluZCh0YXJnZXQsIHByb3ApO1xuICAgICAgICB0YXJnZXQuX3Byb3BlcnRpZXMgPSAodGFyZ2V0Ll9wcm9wZXJ0aWVzIHx8IFtdKS5jb25jYXQoW3Byb3BdKTtcbiAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0Ll9wcm9wZXJ0aWVzID0gdGFyZ2V0Ll9wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbihleGlzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nICE9PSBwYXJlbnQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYWtlT3duZXIodGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9wO1xuICAgIH1cblxuICAgIG92ZXJyaWRlKHBhcmVudCkge1xuICAgICAgdmFyIGtleSwgcmVmLCByZXN1bHRzLCB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnBhcmVudCA9IHBhcmVudC5vcHRpb25zO1xuICAgICAgICByZWYgPSBwYXJlbnQub3B0aW9ucztcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zW2tleV0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5vcHRpb25zW2tleV0ub3ZlcnJpZGVkID0gdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMub3B0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMub3B0aW9uc1trZXldID0gdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFrZU93bmVyKHRhcmdldCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghKChyZWYgPSB0YXJnZXQuZXh0ZW5zaW9ucykgIT0gbnVsbCA/IHJlZi5pbmNsdWRlcyhQcm9wZXJ0eU93bmVyLnByb3RvdHlwZSkgOiB2b2lkIDApKSB7XG4gICAgICAgIHJldHVybiBNaXhhYmxlLkV4dGVuc2lvbi5tYWtlKFByb3BlcnR5T3duZXIucHJvdG90eXBlLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldEluc3RhbmNlVmFyTmFtZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaW5zdGFuY2VWYXJOYW1lIHx8ICdfJyArIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBpc0luc3RhbnRpYXRlZChvYmopIHtcbiAgICAgIHJldHVybiBvYmpbdGhpcy5nZXRJbnN0YW5jZVZhck5hbWUoKV0gIT0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRJbnN0YW5jZShvYmopIHtcbiAgICAgIHZhciBUeXBlLCB2YXJOYW1lO1xuICAgICAgdmFyTmFtZSA9IHRoaXMuZ2V0SW5zdGFuY2VWYXJOYW1lKCk7XG4gICAgICBpZiAoIXRoaXMuaXNJbnN0YW50aWF0ZWQob2JqKSkge1xuICAgICAgICBUeXBlID0gdGhpcy5nZXRJbnN0YW5jZVR5cGUoKTtcbiAgICAgICAgb2JqW3Zhck5hbWVdID0gbmV3IFR5cGUodGhpcywgb2JqKTtcbiAgICAgICAgb2JqW3Zhck5hbWVdLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbdmFyTmFtZV07XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2VUeXBlKCkge1xuICAgICAgaWYgKCF0aGlzLmluc3RhbmNlVHlwZSkge1xuICAgICAgICB0aGlzLmNvbXBvc2Vycy5mb3JFYWNoKChjb21wb3NlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21wb3Nlci5jb21wb3NlKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlVHlwZTtcbiAgICB9XG5cbiAgfTtcblxuICBQcm9wZXJ0eS5wcm90b3R5cGUuY29tcG9zZXJzID0gW0NvbXBvc2VkUHJvcGVydHksIENvbGxlY3Rpb25Qcm9wZXJ0eSwgRHluYW1pY1Byb3BlcnR5LCBCYXNpY1Byb3BlcnR5LCBDYWxjdWxhdGVkUHJvcGVydHksIEludmFsaWRhdGVkUHJvcGVydHldO1xuXG4gIHJldHVybiBQcm9wZXJ0eTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Qcm9wZXJ0eS5qcy5tYXBcbiIsInZhciBQcm9wZXJ0eU93bmVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3BlcnR5T3duZXIgPSBjbGFzcyBQcm9wZXJ0eU93bmVyIHtcbiAgZ2V0UHJvcGVydHkobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzICYmIHRoaXMuX3Byb3BlcnRpZXMuZmluZChmdW5jdGlvbihwcm9wKSB7XG4gICAgICByZXR1cm4gcHJvcC5uYW1lID09PSBuYW1lO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlJbnN0YW5jZShuYW1lKSB7XG4gICAgdmFyIHJlcztcbiAgICByZXMgPSB0aGlzLmdldFByb3BlcnR5KG5hbWUpO1xuICAgIGlmIChyZXMpIHtcbiAgICAgIHJldHVybiByZXMuZ2V0SW5zdGFuY2UodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcy5zbGljZSgpO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlJbnN0YW5jZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXMubWFwKChwcm9wKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluc3RhbnRpYXRlZFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXMuZmlsdGVyKChwcm9wKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcC5pc0luc3RhbnRpYXRlZCh0aGlzKTtcbiAgICB9KS5tYXAoKHByb3ApID0+IHtcbiAgICAgIHJldHVybiBwcm9wLmdldEluc3RhbmNlKHRoaXMpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TWFudWFsRGF0YVByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXMucmVkdWNlKChyZXMsIHByb3ApID0+IHtcbiAgICAgIHZhciBpbnN0YW5jZTtcbiAgICAgIGlmIChwcm9wLmlzSW5zdGFudGlhdGVkKHRoaXMpKSB7XG4gICAgICAgIGluc3RhbmNlID0gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKTtcbiAgICAgICAgaWYgKGluc3RhbmNlLmNhbGN1bGF0ZWQgJiYgaW5zdGFuY2UubWFudWFsKSB7XG4gICAgICAgICAgcmVzW3Byb3AubmFtZV0gPSBpbnN0YW5jZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LCB7fSk7XG4gIH1cblxuICBzZXRQcm9wZXJ0aWVzKGRhdGEsIG9wdGlvbnMgPSB7fSkge1xuICAgIHZhciBrZXksIHByb3AsIHZhbDtcbiAgICBmb3IgKGtleSBpbiBkYXRhKSB7XG4gICAgICB2YWwgPSBkYXRhW2tleV07XG4gICAgICBpZiAoKChvcHRpb25zLndoaXRlbGlzdCA9PSBudWxsKSB8fCBvcHRpb25zLndoaXRlbGlzdC5pbmRleE9mKGtleSkgIT09IC0xKSAmJiAoKG9wdGlvbnMuYmxhY2tsaXN0ID09IG51bGwpIHx8IG9wdGlvbnMuYmxhY2tsaXN0LmluZGV4T2Yoa2V5KSA9PT0gLTEpKSB7XG4gICAgICAgIHByb3AgPSB0aGlzLmdldFByb3BlcnR5SW5zdGFuY2Uoa2V5KTtcbiAgICAgICAgaWYgKHByb3AgIT0gbnVsbCkge1xuICAgICAgICAgIHByb3Auc2V0KHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZXN0cm95UHJvcGVydGllcygpIHtcbiAgICB0aGlzLmdldEluc3RhbnRpYXRlZFByb3BlcnRpZXMoKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcC5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fcHJvcGVydGllcyA9IFtdO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbGlzdGVuZXJBZGRlZChldmVudCwgbGlzdGVuZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBpZiAocHJvcC5nZXRJbnN0YW5jZVR5cGUoKS5wcm90b3R5cGUuY2hhbmdlRXZlbnROYW1lID09PSBldmVudCkge1xuICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5nZXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGV4dGVuZGVkKHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXQubGlzdGVuZXJBZGRlZCA9IHRoaXMubGlzdGVuZXJBZGRlZDtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1Byb3BlcnR5T3duZXIuanMubWFwXG4iLCJ2YXIgQmFzaWNQcm9wZXJ0eSwgRXZlbnRFbWl0dGVyLCBMb2FkZXIsIE1peGFibGUsIFByb3BlcnR5V2F0Y2hlciwgUmVmZXJyZWQ7XG5cbk1peGFibGUgPSByZXF1aXJlKCcuLi9NaXhhYmxlJyk7XG5cbkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJy4uL0V2ZW50RW1pdHRlcicpO1xuXG5Mb2FkZXIgPSByZXF1aXJlKCcuLi9Mb2FkZXInKTtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnLi4vSW52YWxpZGF0ZWQvUHJvcGVydHlXYXRjaGVyJyk7XG5cblJlZmVycmVkID0gcmVxdWlyZSgnLi4vUmVmZXJyZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNpY1Byb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBCYXNpY1Byb3BlcnR5IGV4dGVuZHMgTWl4YWJsZSB7XG4gICAgY29uc3RydWN0b3IocHJvcGVydHksIG9iaikge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcbiAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICB2YXIgcHJlbG9hZDtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmluZ2VzdCh0aGlzLmRlZmF1bHQpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlO1xuICAgICAgcHJlbG9hZCA9IHRoaXMuY29uc3RydWN0b3IuZ2V0UHJlbG9hZCh0aGlzLm9iaiwgdGhpcy5wcm9wZXJ0eSwgdGhpcyk7XG4gICAgICBpZiAocHJlbG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBMb2FkZXIubG9hZE1hbnkocHJlbG9hZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGVkID0gdHJ1ZTtcbiAgICAgIGlmICghdGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXRFdmVudCgndXBkYXRlZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0KCk7XG4gICAgfVxuXG4gICAgc2V0KHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0QW5kQ2hlY2tDaGFuZ2VzKHZhbCk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2tTZXQodmFsKSB7XG4gICAgICB0aGlzLmNhbGxPcHRpb25GdW5jdChcInNldFwiLCB2YWwpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0QW5kQ2hlY2tDaGFuZ2VzKHZhbCkge1xuICAgICAgdmFyIG9sZDtcbiAgICAgIHZhbCA9IHRoaXMuaW5nZXN0KHZhbCk7XG4gICAgICB0aGlzLnJldmFsaWRhdGVkKCk7XG4gICAgICBpZiAodGhpcy5jaGVja0NoYW5nZXModmFsLCB0aGlzLnZhbHVlKSkge1xuICAgICAgICBvbGQgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgICB0aGlzLm1hbnVhbCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2hlY2tDaGFuZ2VzKHZhbCwgb2xkKSB7XG4gICAgICByZXR1cm4gdmFsICE9PSBvbGQ7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAodGhpcy5wcm9wZXJ0eS5vcHRpb25zLmRlc3Ryb3kgPT09IHRydWUgJiYgKCgocmVmID0gdGhpcy52YWx1ZSkgIT0gbnVsbCA/IHJlZi5kZXN0cm95IDogdm9pZCAwKSAhPSBudWxsKSkge1xuICAgICAgICB0aGlzLnZhbHVlLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jYWxsT3B0aW9uRnVuY3QoJ2Rlc3Ryb3knLCB0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjYWxsT3B0aW9uRnVuY3QoZnVuY3QsIC4uLmFyZ3MpIHtcbiAgICAgIGlmICh0eXBlb2YgZnVuY3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZ1bmN0ID0gdGhpcy5wcm9wZXJ0eS5vcHRpb25zW2Z1bmN0XTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZnVuY3Qub3ZlcnJpZGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGFyZ3MucHVzaCgoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNhbGxPcHRpb25GdW5jdChmdW5jdC5vdmVycmlkZWQsIC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdC5hcHBseSh0aGlzLm9iaiwgYXJncyk7XG4gICAgfVxuXG4gICAgcmV2YWxpZGF0ZWQoKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbmdlc3QodmFsKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcGVydHkub3B0aW9ucy5pbmdlc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbCA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiaW5nZXN0XCIsIHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG91dHB1dCgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLm91dHB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsT3B0aW9uRnVuY3QoXCJvdXRwdXRcIiwgdGhpcy52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VkKG9sZCkge1xuICAgICAgdGhpcy5lbWl0RXZlbnQoJ3VwZGF0ZWQnLCBvbGQpO1xuICAgICAgdGhpcy5lbWl0RXZlbnQoJ2NoYW5nZWQnLCBvbGQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXBvc2UocHJvcCkge1xuICAgICAgaWYgKHByb3AuaW5zdGFuY2VUeXBlID09IG51bGwpIHtcbiAgICAgICAgcHJvcC5pbnN0YW5jZVR5cGUgPSBjbGFzcyBleHRlbmRzIEJhc2ljUHJvcGVydHkge307XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHByb3Aub3B0aW9ucy5zZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLnNldCA9IHRoaXMucHJvdG90eXBlLmNhbGxiYWNrU2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLnNldCA9IHRoaXMucHJvdG90eXBlLnNldEFuZENoZWNrQ2hhbmdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuZGVmYXVsdCA9IHByb3Aub3B0aW9ucy5kZWZhdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBiaW5kKHRhcmdldCwgcHJvcCkge1xuICAgICAgdmFyIG1haiwgb3B0LCBwcmVsb2FkO1xuICAgICAgbWFqID0gcHJvcC5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5uYW1lLnNsaWNlKDEpO1xuICAgICAgb3B0ID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3AuZ2V0SW5zdGFuY2UodGhpcykuZ2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAocHJvcC5vcHRpb25zLnNldCAhPT0gZmFsc2UpIHtcbiAgICAgICAgb3B0LnNldCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgIHJldHVybiBwcm9wLmdldEluc3RhbmNlKHRoaXMpLnNldCh2YWwpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcC5uYW1lLCBvcHQpO1xuICAgICAgdGFyZ2V0WydnZXQnICsgbWFqXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5nZXQoKTtcbiAgICAgIH07XG4gICAgICBpZiAocHJvcC5vcHRpb25zLnNldCAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGFyZ2V0WydzZXQnICsgbWFqXSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgIHByb3AuZ2V0SW5zdGFuY2UodGhpcykuc2V0KHZhbCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0YXJnZXRbJ2ludmFsaWRhdGUnICsgbWFqXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9wLmdldEluc3RhbmNlKHRoaXMpLmludmFsaWRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9O1xuICAgICAgcHJlbG9hZCA9IHRoaXMuZ2V0UHJlbG9hZCh0YXJnZXQsIHByb3ApO1xuICAgICAgaWYgKHByZWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICBNaXhhYmxlLkV4dGVuc2lvbi5tYWtlT25jZShMb2FkZXIucHJvdG90eXBlLCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnByZWxvYWQocHJlbG9hZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFByZWxvYWQodGFyZ2V0LCBwcm9wLCBpbnN0YW5jZSkge1xuICAgICAgdmFyIHByZWxvYWQsIHJlZiwgcmVmMSwgdG9Mb2FkO1xuICAgICAgcHJlbG9hZCA9IFtdO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wLm9wdGlvbnMuY2hhbmdlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdG9Mb2FkID0ge1xuICAgICAgICAgIHR5cGU6IFByb3BlcnR5V2F0Y2hlcixcbiAgICAgICAgICBsb2FkZXJBc1Njb3BlOiB0cnVlLFxuICAgICAgICAgIHByb3BlcnR5OiBpbnN0YW5jZSB8fCBwcm9wLm5hbWUsXG4gICAgICAgICAgaW5pdEJ5TG9hZGVyOiB0cnVlLFxuICAgICAgICAgIGF1dG9CaW5kOiB0cnVlLFxuICAgICAgICAgIGNhbGxiYWNrOiBwcm9wLm9wdGlvbnMuY2hhbmdlLFxuICAgICAgICAgIHJlZjoge1xuICAgICAgICAgICAgcHJvcDogcHJvcC5uYW1lLFxuICAgICAgICAgICAgY2FsbGJhY2s6IHByb3Aub3B0aW9ucy5jaGFuZ2UsXG4gICAgICAgICAgICBjb250ZXh0OiAnY2hhbmdlJ1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgKChyZWYgPSBwcm9wLm9wdGlvbnMuY2hhbmdlKSAhPSBudWxsID8gcmVmLmNvcHlXaXRoIDogdm9pZCAwKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRvTG9hZCA9IHtcbiAgICAgICAgICB0eXBlOiBwcm9wLm9wdGlvbnMuY2hhbmdlLFxuICAgICAgICAgIGxvYWRlckFzU2NvcGU6IHRydWUsXG4gICAgICAgICAgcHJvcGVydHk6IGluc3RhbmNlIHx8IHByb3AubmFtZSxcbiAgICAgICAgICBpbml0QnlMb2FkZXI6IHRydWUsXG4gICAgICAgICAgYXV0b0JpbmQ6IHRydWUsXG4gICAgICAgICAgcmVmOiB7XG4gICAgICAgICAgICBwcm9wOiBwcm9wLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBwcm9wLm9wdGlvbnMuY2hhbmdlLFxuICAgICAgICAgICAgY29udGV4dDogJ2NoYW5nZSdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoKHRvTG9hZCAhPSBudWxsKSAmJiAhKChyZWYxID0gdGFyZ2V0LnByZWxvYWRlZCkgIT0gbnVsbCA/IHJlZjEuZmluZChmdW5jdGlvbihsb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuIFJlZmVycmVkLmNvbXBhcmVSZWYodG9Mb2FkLnJlZiwgbG9hZGVkLnJlZikgJiYgIWluc3RhbmNlIHx8IChsb2FkZWQuaW5zdGFuY2UgIT0gbnVsbCk7XG4gICAgICB9KSA6IHZvaWQgMCkpIHtcbiAgICAgICAgcHJlbG9hZC5wdXNoKHRvTG9hZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlbG9hZDtcbiAgICB9XG5cbiAgfTtcblxuICBCYXNpY1Byb3BlcnR5LmV4dGVuZChFdmVudEVtaXR0ZXIpO1xuXG4gIHJldHVybiBCYXNpY1Byb3BlcnR5O1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL1Byb3BlcnR5VHlwZXMvQmFzaWNQcm9wZXJ0eS5qcy5tYXBcbiIsInZhciBDYWxjdWxhdGVkUHJvcGVydHksIER5bmFtaWNQcm9wZXJ0eSwgSW52YWxpZGF0b3IsIE92ZXJyaWRlcjtcblxuSW52YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9JbnZhbGlkYXRvcicpO1xuXG5EeW5hbWljUHJvcGVydHkgPSByZXF1aXJlKCcuL0R5bmFtaWNQcm9wZXJ0eScpO1xuXG5PdmVycmlkZXIgPSByZXF1aXJlKCcuLi9PdmVycmlkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYWxjdWxhdGVkUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIENhbGN1bGF0ZWRQcm9wZXJ0eSBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eSB7XG4gICAgY2FsY3VsKCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KHRoaXMuY2FsY3VsRnVuY3QpO1xuICAgICAgdGhpcy5tYW51YWwgPSBmYWxzZTtcbiAgICAgIHRoaXMucmV2YWxpZGF0ZWQoKTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wb3NlKHByb3ApIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuY2FsY3VsRnVuY3QgPSBwcm9wLm9wdGlvbnMuY2FsY3VsO1xuICAgICAgICBpZiAoIShwcm9wLm9wdGlvbnMuY2FsY3VsLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3AuaW5zdGFuY2VUeXBlLmV4dGVuZChDYWxjdWxhdGVkUHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgQ2FsY3VsYXRlZFByb3BlcnR5LmV4dGVuZChPdmVycmlkZXIpO1xuXG4gIENhbGN1bGF0ZWRQcm9wZXJ0eS5vdmVycmlkZXMoe1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5pdGlhdGVkLCBvbGQ7XG4gICAgICBpZiAodGhpcy5pbnZhbGlkYXRvcikge1xuICAgICAgICB0aGlzLmludmFsaWRhdG9yLnZhbGlkYXRlVW5rbm93bnMoKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XG4gICAgICAgIG9sZCA9IHRoaXMudmFsdWU7XG4gICAgICAgIGluaXRpYXRlZCA9IHRoaXMuaW5pdGlhdGVkO1xuICAgICAgICB0aGlzLmNhbGN1bCgpO1xuICAgICAgICBpZiAodGhpcy5jaGVja0NoYW5nZXModGhpcy52YWx1ZSwgb2xkKSkge1xuICAgICAgICAgIGlmIChpbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRFdmVudCgndXBkYXRlZCcsIG9sZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFpbml0aWF0ZWQpIHtcbiAgICAgICAgICB0aGlzLmVtaXRFdmVudCgndXBkYXRlZCcsIG9sZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm91dHB1dCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIENhbGN1bGF0ZWRQcm9wZXJ0eTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0NhbGN1bGF0ZWRQcm9wZXJ0eS5qcy5tYXBcbiIsInZhciBDb2xsZWN0aW9uLCBDb2xsZWN0aW9uUHJvcGVydHksIENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIsIER5bmFtaWNQcm9wZXJ0eSwgUmVmZXJyZWQ7XG5cbkR5bmFtaWNQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vRHluYW1pY1Byb3BlcnR5Jyk7XG5cbkNvbGxlY3Rpb24gPSByZXF1aXJlKCcuLi9Db2xsZWN0aW9uJyk7XG5cblJlZmVycmVkID0gcmVxdWlyZSgnLi4vUmVmZXJyZWQnKTtcblxuQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJy4uL0ludmFsaWRhdGVkL0NvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIENvbGxlY3Rpb25Qcm9wZXJ0eSBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eSB7XG4gICAgaW5nZXN0KHZhbCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaW5nZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbCA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiaW5nZXN0XCIsIHZhbCk7XG4gICAgICB9XG4gICAgICBpZiAodmFsID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsLnRvQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbC50b0FycmF5KCk7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICByZXR1cm4gdmFsLnNsaWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3ZhbF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tDaGFuZ2VkSXRlbXModmFsLCBvbGQpIHtcbiAgICAgIHZhciBjb21wYXJlRnVuY3Rpb247XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29tcGFyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb21wYXJlRnVuY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbXBhcmU7XG4gICAgICB9XG4gICAgICByZXR1cm4gKG5ldyBDb2xsZWN0aW9uKHZhbCkpLmNoZWNrQ2hhbmdlcyhvbGQsIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMub3JkZXJlZCwgY29tcGFyZUZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICBvdXRwdXQoKSB7XG4gICAgICB2YXIgY29sLCBwcm9wLCB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLm91dHB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwib3V0cHV0XCIsIHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgICAgcHJvcCA9IHRoaXM7XG4gICAgICBjb2wgPSBDb2xsZWN0aW9uLm5ld1N1YkNsYXNzKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMsIHZhbHVlKTtcbiAgICAgIGNvbC5jaGFuZ2VkID0gZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgIHJldHVybiBwcm9wLmNoYW5nZWQob2xkKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29sO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wb3NlKHByb3ApIHtcbiAgICAgIGlmIChwcm9wLm9wdGlvbnMuY29sbGVjdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlID0gY2xhc3MgZXh0ZW5kcyBDb2xsZWN0aW9uUHJvcGVydHkge307XG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5jb2xsZWN0aW9uT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdENvbGxlY3Rpb25PcHRpb25zLCB0eXBlb2YgcHJvcC5vcHRpb25zLmNvbGxlY3Rpb24gPT09ICdvYmplY3QnID8gcHJvcC5vcHRpb25zLmNvbGxlY3Rpb24gOiB7fSk7XG4gICAgICAgIGlmIChwcm9wLm9wdGlvbnMuY29sbGVjdGlvbi5jb21wYXJlICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmNoZWNrQ2hhbmdlcyA9IHRoaXMucHJvdG90eXBlLmNoZWNrQ2hhbmdlZEl0ZW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFByZWxvYWQodGFyZ2V0LCBwcm9wLCBpbnN0YW5jZSkge1xuICAgICAgdmFyIHByZWxvYWQsIHJlZiwgcmVmMTtcbiAgICAgIHByZWxvYWQgPSBbXTtcbiAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmNoYW5nZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBwcm9wLm9wdGlvbnMuaXRlbUFkZGVkID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBwcm9wLm9wdGlvbnMuaXRlbVJlbW92ZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVmID0ge1xuICAgICAgICAgIHByb3A6IHByb3AubmFtZSxcbiAgICAgICAgICBjb250ZXh0OiAnY2hhbmdlJ1xuICAgICAgICB9O1xuICAgICAgICBpZiAoISgocmVmMSA9IHRhcmdldC5wcmVsb2FkZWQpICE9IG51bGwgPyByZWYxLmZpbmQoZnVuY3Rpb24obG9hZGVkKSB7XG4gICAgICAgICAgcmV0dXJuIFJlZmVycmVkLmNvbXBhcmVSZWYocmVmLCBsb2FkZWQucmVmKSAmJiAobG9hZGVkLmluc3RhbmNlICE9IG51bGwpO1xuICAgICAgICB9KSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICBwcmVsb2FkLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlcixcbiAgICAgICAgICAgIGxvYWRlckFzU2NvcGU6IHRydWUsXG4gICAgICAgICAgICBzY29wZTogdGFyZ2V0LFxuICAgICAgICAgICAgcHJvcGVydHk6IGluc3RhbmNlIHx8IHByb3AubmFtZSxcbiAgICAgICAgICAgIGluaXRCeUxvYWRlcjogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9CaW5kOiB0cnVlLFxuICAgICAgICAgICAgY2FsbGJhY2s6IHByb3Aub3B0aW9ucy5jaGFuZ2UsXG4gICAgICAgICAgICBvbkFkZGVkOiBwcm9wLm9wdGlvbnMuaXRlbUFkZGVkLFxuICAgICAgICAgICAgb25SZW1vdmVkOiBwcm9wLm9wdGlvbnMuaXRlbVJlbW92ZWQsXG4gICAgICAgICAgICByZWY6IHJlZlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlbG9hZDtcbiAgICB9XG5cbiAgfTtcblxuICBDb2xsZWN0aW9uUHJvcGVydHkuZGVmYXVsdENvbGxlY3Rpb25PcHRpb25zID0ge1xuICAgIGNvbXBhcmU6IGZhbHNlLFxuICAgIG9yZGVyZWQ6IHRydWVcbiAgfTtcblxuICByZXR1cm4gQ29sbGVjdGlvblByb3BlcnR5O1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL1Byb3BlcnR5VHlwZXMvQ29sbGVjdGlvblByb3BlcnR5LmpzLm1hcFxuIiwidmFyIENhbGN1bGF0ZWRQcm9wZXJ0eSwgQ29sbGVjdGlvbiwgQ29tcG9zZWRQcm9wZXJ0eSwgSW52YWxpZGF0b3I7XG5cbkNhbGN1bGF0ZWRQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vQ2FsY3VsYXRlZFByb3BlcnR5Jyk7XG5cbkludmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcblxuQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL0NvbGxlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb3NlZFByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBDb21wb3NlZFByb3BlcnR5IGV4dGVuZHMgQ2FsY3VsYXRlZFByb3BlcnR5IHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5pbml0Q29tcG9zZWQoKTtcbiAgICAgIHJldHVybiBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdENvbXBvc2VkKCkge1xuICAgICAgaWYgKHRoaXMucHJvcGVydHkub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IHRoaXMucHJvcGVydHkub3B0aW9ucy5kZWZhdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gdGhpcy52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLm1lbWJlcnMgPSBuZXcgQ29tcG9zZWRQcm9wZXJ0eS5NZW1iZXJzKHRoaXMucHJvcGVydHkub3B0aW9ucy5tZW1iZXJzKTtcbiAgICAgIHRoaXMubWVtYmVycy5jaGFuZ2VkID0gKG9sZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMuam9pbiA9IHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuY29tcG9zZWQgPT09ICdmdW5jdGlvbicgPyB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuY29tcG9zZWQgOiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuZGVmYXVsdCA9PT0gZmFsc2UgPyBDb21wb3NlZFByb3BlcnR5LmpvaW5GdW5jdGlvbnMub3IgOiBDb21wb3NlZFByb3BlcnR5LmpvaW5GdW5jdGlvbnMuYW5kO1xuICAgIH1cblxuICAgIGNhbGN1bCgpIHtcbiAgICAgIGlmICghdGhpcy5pbnZhbGlkYXRvcikge1xuICAgICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMsIHRoaXMub2JqKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWVtYmVycy5yZWR1Y2UoKHByZXYsIG1lbWJlcikgPT4ge1xuICAgICAgICAgIHZhciB2YWw7XG4gICAgICAgICAgdmFsID0gdHlwZW9mIG1lbWJlciA9PT0gJ2Z1bmN0aW9uJyA/IG1lbWJlcih0aGlzLmludmFsaWRhdG9yKSA6IG1lbWJlcjtcbiAgICAgICAgICByZXR1cm4gdGhpcy5qb2luKHByZXYsIHZhbCk7XG4gICAgICAgIH0sIHRoaXMuZGVmYXVsdCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgaWYgKGludmFsaWRhdG9yLmlzRW1wdHkoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IuYmluZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmV2YWxpZGF0ZWQoKTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wb3NlKHByb3ApIHtcbiAgICAgIGlmIChwcm9wLm9wdGlvbnMuY29tcG9zZWQgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUgPSBjbGFzcyBleHRlbmRzIENvbXBvc2VkUHJvcGVydHkge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGJpbmQodGFyZ2V0LCBwcm9wKSB7XG4gICAgICBDYWxjdWxhdGVkUHJvcGVydHkuYmluZCh0YXJnZXQsIHByb3ApO1xuICAgICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AubmFtZSArICdNZW1iZXJzJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3AuZ2V0SW5zdGFuY2UodGhpcykubWVtYmVycztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH07XG5cbiAgQ29tcG9zZWRQcm9wZXJ0eS5qb2luRnVuY3Rpb25zID0ge1xuICAgIGFuZDogZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEgJiYgYjtcbiAgICB9LFxuICAgIG9yOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYSB8fCBiO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ29tcG9zZWRQcm9wZXJ0eTtcblxufSkuY2FsbCh0aGlzKTtcblxuQ29tcG9zZWRQcm9wZXJ0eS5NZW1iZXJzID0gY2xhc3MgTWVtYmVycyBleHRlbmRzIENvbGxlY3Rpb24ge1xuICBhZGRQcm9wZXJ0eVJlZihuYW1lLCBvYmopIHtcbiAgICB2YXIgZm47XG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaikgPT09IC0xKSB7XG4gICAgICBmbiA9IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKG5hbWUsIG9iaik7XG4gICAgICB9O1xuICAgICAgZm4ucmVmID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvYmo6IG9ialxuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzLnB1c2goZm4pO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZhbHVlUmVmKHZhbCwgbmFtZSwgb2JqKSB7XG4gICAgdmFyIGZuO1xuICAgIGlmICh0aGlzLmZpbmRSZWZJbmRleChuYW1lLCBvYmopID09PSAtMSkge1xuICAgICAgZm4gPSBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfTtcbiAgICAgIGZuLnJlZiA9IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgb2JqOiBvYmosXG4gICAgICAgIHZhbDogdmFsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMucHVzaChmbik7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWVSZWYodmFsLCBuYW1lLCBvYmopIHtcbiAgICB2YXIgZm4sIGksIHJlZjtcbiAgICBpID0gdGhpcy5maW5kUmVmSW5kZXgobmFtZSwgb2JqKTtcbiAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZhbHVlUmVmKHZhbCwgbmFtZSwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0KGkpLnJlZi52YWwgIT09IHZhbCkge1xuICAgICAgcmVmID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvYmo6IG9iaixcbiAgICAgICAgdmFsOiB2YWxcbiAgICAgIH07XG4gICAgICBmbiA9IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9O1xuICAgICAgZm4ucmVmID0gcmVmO1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KGksIGZuKTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZVJlZihuYW1lLCBvYmopIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQnlSZWYobmFtZSwgb2JqKS5yZWYudmFsO1xuICB9XG5cbiAgYWRkRnVuY3Rpb25SZWYoZm4sIG5hbWUsIG9iaikge1xuICAgIGlmICh0aGlzLmZpbmRSZWZJbmRleChuYW1lLCBvYmopID09PSAtMSkge1xuICAgICAgZm4ucmVmID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvYmo6IG9ialxuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzLnB1c2goZm4pO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRCeVJlZihuYW1lLCBvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbdGhpcy5maW5kUmVmSW5kZXgobmFtZSwgb2JqKV07XG4gIH1cblxuICBmaW5kUmVmSW5kZXgobmFtZSwgb2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5LmZpbmRJbmRleChmdW5jdGlvbihtZW1iZXIpIHtcbiAgICAgIHJldHVybiAobWVtYmVyLnJlZiAhPSBudWxsKSAmJiBtZW1iZXIucmVmLm9iaiA9PT0gb2JqICYmIG1lbWJlci5yZWYubmFtZSA9PT0gbmFtZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVJlZihuYW1lLCBvYmopIHtcbiAgICB2YXIgaW5kZXgsIG9sZDtcbiAgICBpbmRleCA9IHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgb2xkID0gdGhpcy50b0FycmF5KCk7XG4gICAgICB0aGlzLl9hcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlZChvbGQpO1xuICAgIH1cbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL1Byb3BlcnR5VHlwZXMvQ29tcG9zZWRQcm9wZXJ0eS5qcy5tYXBcbiIsInZhciBCYXNpY1Byb3BlcnR5LCBEeW5hbWljUHJvcGVydHksIEludmFsaWRhdG9yO1xuXG5JbnZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJyk7XG5cbkJhc2ljUHJvcGVydHkgPSByZXF1aXJlKCcuL0Jhc2ljUHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEeW5hbWljUHJvcGVydHkgPSBjbGFzcyBEeW5hbWljUHJvcGVydHkgZXh0ZW5kcyBCYXNpY1Byb3BlcnR5IHtcbiAgY2FsbGJhY2tHZXQoKSB7XG4gICAgdmFyIHJlcztcbiAgICByZXMgPSB0aGlzLmNhbGxPcHRpb25GdW5jdChcImdldFwiKTtcbiAgICB0aGlzLnJldmFsaWRhdGVkKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGludmFsaWRhdGUoKSB7XG4gICAgaWYgKHRoaXMuY2FsY3VsYXRlZCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9pbnZhbGlkYXRlTm90aWNlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2ludmFsaWRhdGVOb3RpY2UoKSB7XG4gICAgdGhpcy5lbWl0RXZlbnQoJ2ludmFsaWRhdGVkJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wLm9wdGlvbnMuZ2V0ID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBwcm9wLm9wdGlvbnMuY2FsY3VsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAocHJvcC5pbnN0YW5jZVR5cGUgPT0gbnVsbCkge1xuICAgICAgICBwcm9wLmluc3RhbmNlVHlwZSA9IGNsYXNzIGV4dGVuZHMgRHluYW1pY1Byb3BlcnR5IHt9O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByb3Aub3B0aW9ucy5nZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuZ2V0ID0gdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tHZXQ7XG4gICAgfVxuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvUHJvcGVydHlUeXBlcy9EeW5hbWljUHJvcGVydHkuanMubWFwXG4iLCJ2YXIgQ2FsY3VsYXRlZFByb3BlcnR5LCBJbnZhbGlkYXRlZFByb3BlcnR5LCBJbnZhbGlkYXRvcjtcblxuSW52YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9JbnZhbGlkYXRvcicpO1xuXG5DYWxjdWxhdGVkUHJvcGVydHkgPSByZXF1aXJlKCcuL0NhbGN1bGF0ZWRQcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRhdGVkUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEludmFsaWRhdGVkUHJvcGVydHkgZXh0ZW5kcyBDYWxjdWxhdGVkUHJvcGVydHkge1xuICAgIHVua25vd24oKSB7XG4gICAgICBpZiAodGhpcy5jYWxjdWxhdGVkIHx8IHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlTm90aWNlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3Aub3B0aW9ucy5jYWxjdWwgPT09ICdmdW5jdGlvbicgJiYgcHJvcC5vcHRpb25zLmNhbGN1bC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZS5leHRlbmQoSW52YWxpZGF0ZWRQcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgSW52YWxpZGF0ZWRQcm9wZXJ0eS5vdmVycmlkZXMoe1xuICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG5ldyBJbnZhbGlkYXRvcih0aGlzLCB0aGlzLm9iaik7XG4gICAgICB9XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnJlY3ljbGUoKGludmFsaWRhdG9yLCBkb25lKSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNhbGxPcHRpb25GdW5jdCh0aGlzLmNhbGN1bEZ1bmN0LCBpbnZhbGlkYXRvcik7XG4gICAgICAgIHRoaXMubWFudWFsID0gZmFsc2U7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgaWYgKGludmFsaWRhdG9yLmlzRW1wdHkoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IuYmluZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmV2YWxpZGF0ZWQoKTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRlc3Ryb3kud2l0aG91dEludmFsaWRhdGVkUHJvcGVydHkoKTtcbiAgICAgIGlmICh0aGlzLmludmFsaWRhdG9yICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0b3IudW5iaW5kKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbnZhbGlkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmNhbGN1bGF0ZWQgfHwgdGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlTm90aWNlKCk7XG4gICAgICAgIGlmICghdGhpcy5jYWxjdWxhdGVkICYmICh0aGlzLmludmFsaWRhdG9yICE9IG51bGwpKSB7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkYXRvci51bmJpbmQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gSW52YWxpZGF0ZWRQcm9wZXJ0eTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0ludmFsaWRhdGVkUHJvcGVydHkuanMubWFwXG4iLCJ2YXIgUmVmZXJyZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVmZXJyZWQgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFJlZmVycmVkIHtcbiAgICBjb21wYXJlUmVmZXJlZChyZWZlcmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb21wYXJlUmVmZXJlZChyZWZlcmVkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRSZWYoKSB7fVxuXG4gICAgc3RhdGljIGNvbXBhcmVSZWZlcmVkKG9iajEsIG9iajIpIHtcbiAgICAgIHJldHVybiBvYmoxID09PSBvYmoyIHx8ICgob2JqMSAhPSBudWxsKSAmJiAob2JqMiAhPSBudWxsKSAmJiBvYmoxLmNvbnN0cnVjdG9yID09PSBvYmoyLmNvbnN0cnVjdG9yICYmIHRoaXMuY29tcGFyZVJlZihvYmoxLnJlZiwgb2JqMi5yZWYpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29tcGFyZVJlZihyZWYxLCByZWYyKSB7XG4gICAgICByZXR1cm4gKHJlZjEgIT0gbnVsbCkgJiYgKHJlZjIgIT0gbnVsbCkgJiYgKHJlZjEgPT09IHJlZjIgfHwgKEFycmF5LmlzQXJyYXkocmVmMSkgJiYgQXJyYXkuaXNBcnJheShyZWYxKSAmJiByZWYxLmV2ZXJ5KCh2YWwsIGkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVJlZmVyZWQocmVmMVtpXSwgcmVmMltpXSk7XG4gICAgICB9KSkgfHwgKHR5cGVvZiByZWYxID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWYyID09PSBcIm9iamVjdFwiICYmIE9iamVjdC5rZXlzKHJlZjEpLmpvaW4oKSA9PT0gT2JqZWN0LmtleXMocmVmMikuam9pbigpICYmIE9iamVjdC5rZXlzKHJlZjEpLmV2ZXJ5KChrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVJlZmVyZWQocmVmMVtrZXldLCByZWYyW2tleV0pO1xuICAgICAgfSkpKTtcbiAgICB9XG5cbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVmZXJyZWQucHJvdG90eXBlLCAncmVmJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWYoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBSZWZlcnJlZDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9SZWZlcnJlZC5qcy5tYXBcbiIsInZhciBCaW5kZXIsIFVwZGF0ZXI7XG5cbkJpbmRlciA9IHJlcXVpcmUoJy4vQmluZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlciA9IGNsYXNzIFVwZGF0ZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdmFyIHJlZjtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgIHRoaXMubmV4dCA9IFtdO1xuICAgIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcbiAgICBpZiAoKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuY2FsbGJhY2sgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYWRkQ2FsbGJhY2sob3B0aW9ucy5jYWxsYmFjayk7XG4gICAgfVxuICAgIGlmICgob3B0aW9ucyAhPSBudWxsID8gKHJlZiA9IG9wdGlvbnMuY2FsbGJhY2tzKSAhPSBudWxsID8gcmVmLmZvckVhY2ggOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB2YXIgY2FsbGJhY2s7XG4gICAgdGhpcy51cGRhdGluZyA9IHRydWU7XG4gICAgdGhpcy5uZXh0ID0gdGhpcy5jYWxsYmFja3Muc2xpY2UoKTtcbiAgICB3aGlsZSAodGhpcy5jYWxsYmFja3MubGVuZ3RoID4gMCkge1xuICAgICAgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrcy5zaGlmdCgpO1xuICAgICAgdGhpcy5ydW5DYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIHRoaXMuY2FsbGJhY2tzID0gdGhpcy5uZXh0O1xuICAgIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJ1bkNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH1cblxuICBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5jYWxsYmFja3MuaW5jbHVkZXMoY2FsbGJhY2spKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudXBkYXRpbmcgJiYgIXRoaXMubmV4dC5pbmNsdWRlcyhjYWxsYmFjaykpIHtcbiAgICAgIHJldHVybiB0aGlzLm5leHQucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgbmV4dFRpY2soY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy51cGRhdGluZykge1xuICAgICAgaWYgKCF0aGlzLm5leHQuaW5jbHVkZXMoY2FsbGJhY2spKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5leHQucHVzaChjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHZhciBpbmRleDtcbiAgICBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGluZGV4ID0gdGhpcy5uZXh0LmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLm5leHQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBnZXRCaW5kZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBVcGRhdGVyLkJpbmRlcih0aGlzKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICByZXR1cm4gdGhpcy5uZXh0ID0gW107XG4gIH1cblxufTtcblxuVXBkYXRlci5CaW5kZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBjbGFzcyBCaW5kZXIgZXh0ZW5kcyBzdXBlckNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNhbGxiYWNrMSkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrMTtcbiAgICB9XG5cbiAgICBnZXRSZWYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0LFxuICAgICAgICBjYWxsYmFjazogdGhpcy5jYWxsYmFja1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBkb0JpbmQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuYWRkQ2FsbGJhY2sodGhpcy5jYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZG9VbmJpbmQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlQ2FsbGJhY2sodGhpcy5jYWxsYmFjayk7XG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIEJpbmRlcjtcblxufSkuY2FsbCh0aGlzLCBCaW5kZXIpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1VwZGF0ZXIuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJCaW5kZXJcIjogcmVxdWlyZShcIi4vQmluZGVyXCIpLFxuICBcIkNvbGxlY3Rpb25cIjogcmVxdWlyZShcIi4vQ29sbGVjdGlvblwiKSxcbiAgXCJFbGVtZW50XCI6IHJlcXVpcmUoXCIuL0VsZW1lbnRcIiksXG4gIFwiRXZlbnRCaW5kXCI6IHJlcXVpcmUoXCIuL0V2ZW50QmluZFwiKSxcbiAgXCJFdmVudEVtaXR0ZXJcIjogcmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpLFxuICBcIkludmFsaWRhdG9yXCI6IHJlcXVpcmUoXCIuL0ludmFsaWRhdG9yXCIpLFxuICBcIkxvYWRlclwiOiByZXF1aXJlKFwiLi9Mb2FkZXJcIiksXG4gIFwiTWl4YWJsZVwiOiByZXF1aXJlKFwiLi9NaXhhYmxlXCIpLFxuICBcIk92ZXJyaWRlclwiOiByZXF1aXJlKFwiLi9PdmVycmlkZXJcIiksXG4gIFwiUHJvcGVydHlcIjogcmVxdWlyZShcIi4vUHJvcGVydHlcIiksXG4gIFwiUHJvcGVydHlPd25lclwiOiByZXF1aXJlKFwiLi9Qcm9wZXJ0eU93bmVyXCIpLFxuICBcIlJlZmVycmVkXCI6IHJlcXVpcmUoXCIuL1JlZmVycmVkXCIpLFxuICBcIlVwZGF0ZXJcIjogcmVxdWlyZShcIi4vVXBkYXRlclwiKSxcbiAgXCJJbnZhbGlkYXRlZFwiOiB7XG4gICAgXCJBY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXJcIjogcmVxdWlyZShcIi4vSW52YWxpZGF0ZWQvQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyXCIpLFxuICAgIFwiQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlclwiOiByZXF1aXJlKFwiLi9JbnZhbGlkYXRlZC9Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyXCIpLFxuICAgIFwiSW52YWxpZGF0ZWRcIjogcmVxdWlyZShcIi4vSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWRcIiksXG4gICAgXCJQcm9wZXJ0eVdhdGNoZXJcIjogcmVxdWlyZShcIi4vSW52YWxpZGF0ZWQvUHJvcGVydHlXYXRjaGVyXCIpLFxuICB9LFxuICBcIlByb3BlcnR5VHlwZXNcIjoge1xuICAgIFwiQmFzaWNQcm9wZXJ0eVwiOiByZXF1aXJlKFwiLi9Qcm9wZXJ0eVR5cGVzL0Jhc2ljUHJvcGVydHlcIiksXG4gICAgXCJDYWxjdWxhdGVkUHJvcGVydHlcIjogcmVxdWlyZShcIi4vUHJvcGVydHlUeXBlcy9DYWxjdWxhdGVkUHJvcGVydHlcIiksXG4gICAgXCJDb2xsZWN0aW9uUHJvcGVydHlcIjogcmVxdWlyZShcIi4vUHJvcGVydHlUeXBlcy9Db2xsZWN0aW9uUHJvcGVydHlcIiksXG4gICAgXCJDb21wb3NlZFByb3BlcnR5XCI6IHJlcXVpcmUoXCIuL1Byb3BlcnR5VHlwZXMvQ29tcG9zZWRQcm9wZXJ0eVwiKSxcbiAgICBcIkR5bmFtaWNQcm9wZXJ0eVwiOiByZXF1aXJlKFwiLi9Qcm9wZXJ0eVR5cGVzL0R5bmFtaWNQcm9wZXJ0eVwiKSxcbiAgICBcIkludmFsaWRhdGVkUHJvcGVydHlcIjogcmVxdWlyZShcIi4vUHJvcGVydHlUeXBlcy9JbnZhbGlkYXRlZFByb3BlcnR5XCIpLFxuICB9LFxufSJdfQ==
