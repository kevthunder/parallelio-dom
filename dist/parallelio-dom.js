(function() {
  var DOM;

  DOM = typeof module !== "undefined" && module !== null ? module.exports = {} : (this.Parallelio == null ? this.Parallelio = {} : void 0, this.Parallelio.DOM == null ? this.Parallelio.DOM = {} : void 0, this.Parallelio.DOM);

  (function(definition) {
    DOM.Updater = definition();
    return DOM.Updater.definition = definition;
  })(function(dependencies = {}) {
    var BaseUpdater, Updater;
    BaseUpdater = dependencies.hasOwnProperty("BaseUpdater") ? dependencies.BaseUpdater : Parallelio.Spark.Updater;
    Updater = class Updater extends BaseUpdater {
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
    return Updater;
  });

  (function(definition) {
    DOM.Display = definition();
    return DOM.Display.definition = definition;
  })(function(dependencies = {}) {
    var Display, Element, EventEmitter, Updater;
    Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : Parallelio.Element;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : Parallelio.Spark.EventEmitter;
    Display = (function() {
      class Display extends Element {
        initDisplay() {
          this.cls;
          this.displayX;
          this.displayY;
          return this.displayContainer;
        }

        destroyDisplay() {
          if (this._display != null) {
            return this.display.remove();
          }
        }

      };

      Display.include(EventEmitter.prototype);

      Display.properties({
        displayContainer: {
          updater: Updater.instance,
          default: null,
          change: function() {
            if (this.displayContainer != null) {
              return this.display.appendTo(this.displayContainer);
            }
          }
        },
        cls: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            if (old != null) {
              this.display.removeClass(old);
            }
            if (this.cls != null) {
              return this.display.addClass(this.cls);
            }
          }
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
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            return this.display.css({
              left: this.displayX
            });
          }
        },
        displayY: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            return this.display.css({
              top: this.displayY
            });
          }
        }
      });

      return Display;

    }).call(this);
    return Display;
  });

  (function(definition) {
    DOM.Tiled = definition();
    return DOM.Tiled.definition = definition;
  })(function(dependencies = {}) {
    var BaseTiled, Display, EventEmitter, Tiled;
    BaseTiled = dependencies.hasOwnProperty("BaseTiled") ? dependencies.BaseTiled : Parallelio.Tiled;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : Parallelio.Spark.EventEmitter;
    Tiled = (function() {
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
    return Tiled;
  });

  (function(definition) {
    DOM.Door = definition();
    return DOM.Door.definition = definition;
  })(function(dependencies = {}) {
    var BaseDoor, Door, Element, Tiled, Updater;
    Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : DOM.Tiled;
    BaseDoor = dependencies.hasOwnProperty("BaseDoor") ? dependencies.BaseDoor : Parallelio.Door;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : Parallelio.Spark.Element;
    Door = (function() {
      class Door extends BaseDoor {
        constructor(direction) {
          super(direction);
          this.initDisplay();
          this.open;
          this.baseCls = 'door';
        }

      };

      Door.extend(Tiled.definition({
        BaseTiled: Element
      }));

      Door.properties({
        direction: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            if (old != null) {
              this.display.removeClass(old);
            }
            if (this.direction != null) {
              return this.display.addClass(this.direction);
            }
          }
        },
        open: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            this.display.toggleClass('close', !this.open);
            return this.display.toggleClass('open', this.open);
          }
        }
      });

      return Door;

    }).call(this);
    return Door;
  });

  (function(definition) {
    DOM.AutomaticDoor = definition();
    return DOM.AutomaticDoor.definition = definition;
  })(function(dependencies = {}) {
    var AutomaticDoor, BaseAutomaticDoor, Door;
    Door = dependencies.hasOwnProperty("Door") ? dependencies.Door : DOM.Door;
    BaseAutomaticDoor = dependencies.hasOwnProperty("BaseAutomaticDoor") ? dependencies.BaseAutomaticDoor : Parallelio.AutomaticDoor;
    AutomaticDoor = class AutomaticDoor extends Door.definition({
        BaseDoor: BaseAutomaticDoor
      }) {};
    return AutomaticDoor;
  });

  (function(definition) {
    DOM.Character = definition();
    return DOM.Character.definition = definition;
  })(function(dependencies = {}) {
    var BaseCharacter, Character, Element, Tiled, Updater;
    Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : DOM.Tiled;
    BaseCharacter = dependencies.hasOwnProperty("BaseCharacter") ? dependencies.BaseCharacter : Parallelio.Character;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : Parallelio.Spark.Element;
    Character = (function() {
      class Character extends BaseCharacter {
        constructor() {
          super();
          this.initDisplay();
          this.baseCls = 'character';
        }

      };

      Character.extend(Tiled.definition({
        BaseTiled: Element
      }));

      Character.properties({
        selected: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            return this.display.toggleClass('selected', this.selected);
          }
        }
      });

      return Character;

    }).call(this);
    return Character;
  });

  (function(definition) {
    DOM.Damageable = definition();
    return DOM.Damageable.definition = definition;
  })(function(dependencies = {}) {
    var BaseDamageable, Damageable, Display, EventEmitter, Updater;
    BaseDamageable = dependencies.hasOwnProperty("BaseDamageable") ? dependencies.BaseDamageable : Parallelio.Damageable;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : Parallelio.Spark.EventEmitter;
    Damageable = (function() {
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
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          calcul: function(invalidator) {
            return 'health-' + (Math.ceil(invalidator.prop('health') / invalidator.prop('maxHealth') * invalidator.prop('healthClsSteps')));
          },
          change: function(old) {
            if (old != null) {
              this.display.removeClass(old);
            }
            if (this.healthCls != null) {
              return this.display.addClass(this.healthCls);
            }
          }
        }
      });

      return Damageable;

    }).call(this);
    return Damageable;
  });

  (function(definition) {
    DOM.PlayerController = definition();
    return DOM.PlayerController.definition = definition;
  })(function(dependencies = {}) {
    var Element, PlayerController;
    Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : Parallelio.Spark.Element;
    PlayerController = (function() {
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
    return PlayerController;
  });

  (function(definition) {
    DOM.View = definition();
    return DOM.View.definition = definition;
  })(function(dependencies = {}) {
    var BaseView, Display, Updater, View;
    BaseView = dependencies.hasOwnProperty("BaseView") ? dependencies.BaseView : Parallelio.View;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    View = (function() {
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
          updater: Updater.instance,
          calcul: function(invalidator) {
            return {
              top: invalidator.prop('top', this.bounds) * 100 + '%',
              left: invalidator.prop('left', this.bounds) * 100 + '%',
              bottom: (1 - invalidator.prop('bottom', this.bounds)) * 100 + '%',
              right: (1 - invalidator.prop('right', this.bounds)) * 100 + '%'
            };
          },
          active: function(invalidator) {
            return invalidator.propInitiated('display') && (invalidator.prop('bounds') != null);
          },
          change: function(old) {
            return this.display.css(this.boundsStyles);
          }
        }
      });

      return View;

    }).call(this);
    return View;
  });

  (function(definition) {
    DOM.Game = definition();
    return DOM.Game.definition = definition;
  })(function(dependencies = {}) {
    var BaseGame, Game, PlayerController, Updater, View;
    BaseGame = dependencies.hasOwnProperty("BaseGame") ? dependencies.BaseGame : Parallelio.Game;
    View = dependencies.hasOwnProperty("View") ? dependencies.View : DOM.View;
    PlayerController = dependencies.hasOwnProperty("PlayerController") ? dependencies.PlayerController : DOM.PlayerController;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
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
    return Game;
  });

  (function(definition) {
    DOM.PlayerSelectionInfo = definition();
    return DOM.PlayerSelectionInfo.definition = definition;
  })(function(dependencies = {}) {
    var Display, PlayerSelectionInfo, Updater;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
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
    return PlayerSelectionInfo;
  });

  (function(definition) {
    DOM.Projectile = definition();
    return DOM.Projectile.definition = definition;
  })(function(dependencies = {}) {
    var BaseProjectile, Display, Projectile, Updater;
    BaseProjectile = dependencies.hasOwnProperty("BaseProjectile") ? dependencies.BaseProjectile : Parallelio.Projectile;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Projectile = (function() {
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
    return Projectile;
  });

  (function(definition) {
    DOM.Tile = definition();
    return DOM.Tile.definition = definition;
  })(function(dependencies = {}) {
    var BaseFloor, BaseTile, Display, Tile;
    BaseTile = dependencies.hasOwnProperty("BaseTile") ? dependencies.BaseTile : Parallelio.Tile;
    BaseFloor = dependencies.hasOwnProperty("BaseFloor") ? dependencies.BaseFloor : Parallelio.Floor;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    Tile = (function() {
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
    Tile.Floor = class Floor extends BaseFloor.definition({
        Tile: Tile
      }) {
      init() {
        super.init();
        return this.cls = 'floor';
      }

    };
    return Tile;
  });

  (function(definition) {
    DOM.Ship = definition();
    return DOM.Ship.definition = definition;
  })(function(dependencies = {}) {
    var DefaultGenerator, Door, EventEmitter, Ship, Tile, TileContainer;
    Tile = dependencies.hasOwnProperty("Tile") ? dependencies.Tile : DOM.Tile;
    TileContainer = dependencies.hasOwnProperty("TileContainer") ? dependencies.TileContainer : Parallelio.TileContainer;
    DefaultGenerator = dependencies.hasOwnProperty("DefaultGenerator") ? dependencies.DefaultGenerator : Parallelio.RoomGenerator;
    Door = dependencies.hasOwnProperty("Door") ? dependencies.Door : DOM.AutomaticDoor;
    EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : Parallelio.Spark.EventEmitter;
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
    return Ship;
  });

  (function(definition) {
    DOM.Weapon = definition();
    return DOM.Weapon.definition = definition;
  })(function(dependencies = {}) {
    var BaseWeapon, Damageable, Projectile, Tiled, Updater, Weapon;
    Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : DOM.Tiled;
    Projectile = dependencies.hasOwnProperty("Projectile") ? dependencies.Projectile : DOM.Projectile;
    Damageable = dependencies.hasOwnProperty("Damageable") ? dependencies.Damageable : DOM.Damageable;
    BaseWeapon = dependencies.hasOwnProperty("BaseWeapon") ? dependencies.BaseWeapon : Parallelio.Weapon.definition({
      Tiled: Tiled,
      Damageable: Damageable,
      Projectile: Projectile
    });
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Weapon = (function() {
      class Weapon extends BaseWeapon {
        constructor(direction) {
          super(direction);
          this.baseCls = 'weapon';
        }

      };

      Weapon.properties({
        direction: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            if (old != null) {
              this.display.removeClass(old.name);
            }
            if (this.direction.name != null) {
              return this.display.addClass(this.direction.name);
            }
          }
        }
      });

      return Weapon;

    }).call(this);
    return Weapon;
  });

  (function(definition) {
    DOM.Wire = definition();
    return DOM.Wire.definition = definition;
  })(function(dependencies = {}) {
    var BaseWire, Tiled, Updater, Wire;
    Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : DOM.Tiled;
    BaseWire = dependencies.hasOwnProperty("BaseWire") ? dependencies.BaseWire : Parallelio.Wire.definition({
      Tiled: Tiled
    });
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Wire = (function() {
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

      Wire.properties({
        display: {
          calcul: function(invalidator, sup) {
            return sup();
          }
        },
        connectedDirections: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            if (old) {
              old.forEach((d) => {
                return this.display.removeClass(this.getClassFromDirection(d));
              });
            }
            return this.connectedDirections.forEach((d) => {
              return this.display.addClass(this.getClassFromDirection(d));
            });
          }
        },
        wireType: {
          updater: Updater.instance,
          active: function(invalidator) {
            return invalidator.propInitiated('display');
          },
          change: function(old) {
            if (old) {
              this.display.removeClass(old);
            }
            return this.display.addClass(this.wireType);
          }
        }
      });

      return Wire;

    }).call(this);
    return Wire;
  });

}).call(this);
