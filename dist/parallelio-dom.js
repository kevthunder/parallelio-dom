(function() {
  var DOM,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  DOM = typeof module !== "undefined" && module !== null ? module.exports = {} : (this.Parallelio == null ? this.Parallelio = {} : void 0, this.Parallelio.DOM == null ? this.Parallelio.DOM = {} : void 0, this.Parallelio.DOM);

  (function(definition) {
    DOM.Updater = definition();
    return DOM.Updater.definition = definition;
  })(function(dependencies) {
    var BaseUpdater, Updater;
    if (dependencies == null) {
      dependencies = {};
    }
    BaseUpdater = dependencies.hasOwnProperty("BaseUpdater") ? dependencies.BaseUpdater : Parallelio.Spark.Updater;
    Updater = (function(superClass) {
      extend(Updater, superClass);

      function Updater() {
        Updater.__super__.constructor.call(this);
        this.updateCallback = (function(_this) {
          return function() {
            return _this.update();
          };
        })(this);
        this.binded = false;
      }

      Updater.prototype.update = function() {
        while (true) {
          if (this.callbacks.length === 0) {
            break;
          }
          this.callbacks[0]();
        }
        return this.binded = false;
      };

      Updater.prototype.requestFrame = function() {
        if (!this.binded) {
          window.requestAnimationFrame(this.updateCallback);
          return this.binded = true;
        }
      };

      Updater.prototype.addCallback = function(callback) {
        Updater.__super__.addCallback.call(this, callback);
        return this.requestFrame();
      };

      return Updater;

    })(BaseUpdater);
    Updater.instance = new Updater();
    return Updater;
  });

  (function(definition) {
    DOM.Display = definition();
    return DOM.Display.definition = definition;
  })(function(dependencies) {
    var Display, Element, Updater;
    if (dependencies == null) {
      dependencies = {};
    }
    Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : Parallelio.Element;
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Display = (function(superClass) {
      extend(Display, superClass);

      function Display() {
        return Display.__super__.constructor.apply(this, arguments);
      }

      Display.include(EventEmitter.prototype);

      Display.prototype.initDisplay = function() {
        return this.displayContainer;
      };

      Display.properties({
        displayContainer: {
          updater: Updater.instance,
          change: function() {
            if (this.displayContainer != null) {
              return this.display.appendTo(this.displayContainer);
            }
          }
        },
        cls: {
          updater: Updater.instance,
          change: function(old) {
            if (this.getPropertyInstance('display').calculated) {
              if (old != null) {
                this.display.removeClass(old);
              }
              if (this.cls != null) {
                return this.display.addClass(this.cls);
              }
            }
          }
        },
        display: {
          calcul: function() {
            var display, newDiv;
            newDiv = document.createElement("div");
            display = jQuery(newDiv).addClass(this.baseCls).addClass(this.cls).css({
              top: this.displayY,
              left: this.displayX
            });
            display.get(0)._parallelio_obj = this;
            return display;
          }
        },
        displayX: {
          updater: Updater.instance,
          "default": 0,
          change: function(old) {
            if (this.getPropertyInstance('display').calculated) {
              return this.display.css({
                left: this.displayX
              });
            }
          }
        },
        displayY: {
          updater: Updater.instance,
          "default": 0,
          change: function(old) {
            if (this.getPropertyInstance('display').calculated) {
              return this.display.css({
                top: this.displayY
              });
            }
          }
        }
      });

      return Display;

    })(Element);
    return Display;
  });

  (function(definition) {
    DOM.Tiled = definition();
    return DOM.Tiled.definition = definition;
  })(function(dependencies) {
    var BaseTiled, Display, Tiled;
    if (dependencies == null) {
      dependencies = {};
    }
    BaseTiled = dependencies.hasOwnProperty("BaseTiled") ? dependencies.BaseTiled : Parallelio.Tiled;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    Tiled = (function(superClass) {
      extend(Tiled, superClass);

      Tiled.extend(Display);

      Tiled.include(EventEmitter.prototype);

      function Tiled() {
        Tiled.__super__.constructor.call(this);
        this.initDisplay();
      }

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
            var ref;
            return (ref = invalidator.prop('tile')) != null ? ref.displayX : void 0;
          }
        },
        displayY: {
          calcul: function(invalidator) {
            var ref;
            return (ref = invalidator.prop('tile')) != null ? ref.displayY : void 0;
          }
        }
      });

      return Tiled;

    })(BaseTiled);
    return Tiled;
  });

  (function(definition) {
    DOM.Door = definition();
    return DOM.Door.definition = definition;
  })(function(dependencies) {
    var BaseDoor, Door, Tiled, Updater;
    if (dependencies == null) {
      dependencies = {};
    }
    Tiled = dependencies.hasOwnProperty("Tiled") ? dependencies.Tiled : DOM.Tiled;
    BaseDoor = dependencies.hasOwnProperty("BaseDoor") ? dependencies.BaseDoor : Parallelio.Door.definition({
      Tiled: Tiled
    });
    Updater = dependencies.hasOwnProperty("Updater") ? dependencies.Updater : DOM.Updater;
    Door = (function(superClass) {
      extend(Door, superClass);

      function Door(direction) {
        this.baseCls = 'door';
        Door.__super__.constructor.call(this, direction);
      }

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
        }
      });

      return Door;

    })(BaseDoor);
    return Door;
  });

  (function(definition) {
    DOM.Tile = definition();
    return DOM.Tile.definition = definition;
  })(function(dependencies) {
    var BaseTile, Display, Floor, Tile;
    if (dependencies == null) {
      dependencies = {};
    }
    BaseTile = dependencies.hasOwnProperty("BaseTile") ? dependencies.BaseTile : Parallelio.Tile;
    Floor = dependencies.hasOwnProperty("Floor") ? dependencies.Floor : Parallelio.Floor;
    Display = dependencies.hasOwnProperty("Display") ? dependencies.Display : DOM.Display;
    Tile = (function(superClass) {
      extend(Tile, superClass);

      function Tile() {
        return Tile.__super__.constructor.apply(this, arguments);
      }

      Tile.extend(Display);

      Tile.size = 20;

      Tile.prototype.init = function() {
        Tile.__super__.init.call(this);
        this.baseCls = 'tile';
        return this.initDisplay();
      };

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

      Tile.prototype.tileToDisplayX = function(x) {
        return x * Tile.size;
      };

      Tile.prototype.tileToDisplayY = function(y) {
        return y * Tile.size;
      };

      return Tile;

    })(BaseTile);
    Tile.Floor = (function(superClass) {
      extend(Floor, superClass);

      function Floor() {
        return Floor.__super__.constructor.apply(this, arguments);
      }

      Floor.prototype.init = function() {
        Floor.__super__.init.call(this);
        return this.cls = 'floor';
      };

      return Floor;

    })(Floor.definition({
      Tile: Tile
    }));
    return Tile;
  });

  (function(definition) {
    DOM.Ship = definition();
    return DOM.Ship.definition = definition;
  })(function(dependencies) {
    var DefaultGenerator, Door, Ship, Tile, TileContainer;
    if (dependencies == null) {
      dependencies = {};
    }
    Tile = dependencies.hasOwnProperty("Tile") ? dependencies.Tile : DOM.Tile;
    TileContainer = dependencies.hasOwnProperty("TileContainer") ? dependencies.TileContainer : Parallelio.TileContainer;
    DefaultGenerator = dependencies.hasOwnProperty("DefaultGenerator") ? dependencies.DefaultGenerator : Parallelio.RoomGenerator;
    Door = dependencies.hasOwnProperty("Door") ? dependencies.Door : DOM.Door;
    Ship = (function(superClass) {
      extend(Ship, superClass);

      function Ship() {
        return Ship.__super__.constructor.apply(this, arguments);
      }

      Ship.include(EventEmitter.prototype);

      Ship.prototype.init = function() {
        Ship.__super__.init.call(this);
        return this.displayContainer;
      };

      Ship.properties({
        container: {},
        displayContainer: {
          calcul: function(invalidator) {
            var container;
            container = invalidator.prop('container');
            if (container != null ? container.getProperty('display') : void 0) {
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
        }
      });

      Ship.prototype.generate = function(generator) {
        generator = generator || (new Ship.Generator()).tap(function() {});
        return generator.getTiles().forEach((function(_this) {
          return function(tile) {
            return _this.addTile(tile);
          };
        })(this));
      };

      return Ship;

    })(TileContainer);
    Ship.Generator = (function(superClass) {
      extend(Generator, superClass);

      function Generator() {
        return Generator.__super__.constructor.apply(this, arguments);
      }

      Generator.prototype.wallFactory = function(opt) {
        return (new Tile(opt.x, opt.y)).tap(function() {
          this.cls = 'wall';
          return this.walkable = false;
        });
      };

      Generator.prototype.floorFactory = function(opt) {
        return new Tile.Floor(opt.x, opt.y);
      };

      Generator.prototype.doorFactory = function(opt) {
        return (new Tile.Floor(opt.x, opt.y)).tap(function() {
          return this.addChild(new Door(opt.direction));
        });
      };

      return Generator;

    })(DefaultGenerator);
    return Ship;
  });

  (function(definition) {
    DOM.View = definition();
    return DOM.View.definition = definition;
  })(function(dependencies) {
    var Element, View;
    if (dependencies == null) {
      dependencies = {};
    }
    Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : Parallelio.Element;
    View = (function(superClass) {
      extend(View, superClass);

      function View(display1) {
        this.display = display1 != null ? display1 : null;
        this.hovered = false;
        this.keysInterval = {};
      }

      View.directionkeys = {
        38: {
          name: 'top',
          x: 0,
          y: -1
        },
        39: {
          name: 'right',
          x: 1,
          y: 0
        },
        40: {
          name: 'bottom',
          x: 0,
          y: 1
        },
        37: {
          name: 'left',
          x: -1,
          y: 0
        }
      };

      View.properties({
        x: {
          "default": 0,
          change: function() {
            return this.updateDisplayPos();
          }
        },
        y: {
          "default": 0,
          change: function() {
            return this.updateDisplayPos();
          }
        },
        display: {
          change: function() {
            if ($('.viewContent', this.display).length === 0) {
              $(this.display).append('<div class="viewContent"></div>');
            }
            this.updateDisplayPos();
            $(this.display).mouseenter(this.callback('mouseEnter'));
            return $(this.display).mouseleave(this.callback('mouseLeave'));
          }
        }
      });

      View.prototype.mouseEnter = function() {
        this.hovered = true;
        $('body').keydown(this.callback('keyDown'));
        return $('body').keyup(this.callback('keyUp'));
      };

      View.prototype.mouseLeave = function() {
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
      };

      View.prototype.keyDown = function(e) {
        var key;
        if (View.directionkeys[e.which] != null) {
          key = View.directionkeys[e.which];
          if (this.keysInterval[key.name] != null) {
            clearInterval(this.keysInterval[key.name]);
          }
          return this.keysInterval[key.name] = setInterval((function(_this) {
            return function() {
              _this.x += key.x * 2;
              return _this.y += key.y * 2;
            };
          })(this), 10);
        }
      };

      View.prototype.keyUp = function(e) {
        var key;
        if (View.directionkeys[e.which] != null) {
          key = View.directionkeys[e.which];
          if (this.keysInterval[key.name] != null) {
            return clearInterval(this.keysInterval[key.name]);
          }
        }
      };

      View.prototype.updateDisplayPos = function() {
        return $('.viewContent', this.display).css({
          left: this.x + 'px',
          top: this.y + 'px'
        });
      };

      View.prototype.containsPoint = function(x, y) {
        var container;
        container = this.display[0];
        while (container) {
          x -= container.offsetLeft;
          y -= container.offsetTop;
          container = container.offsetParent;
        }
        return (0 <= x && x <= this.display.width()) && (0 <= y && y <= this.display.height());
      };

      return View;

    })(Element);
    return View;
  });

}).call(this);
