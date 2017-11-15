(function() {
  var DOM,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  DOM = typeof module !== "undefined" && module !== null ? module.exports = {} : (this.Parallelio == null ? this.Parallelio = {} : void 0, this.Parallelio.DOM == null ? this.Parallelio.DOM = {} : void 0, this.Parallelio.DOM);

  (function(definition) {
    DOM.Tile = definition();
    return DOM.Tile.definition = definition;
  })(function(dependencies) {
    var BaseTile, Tile;
    if (dependencies == null) {
      dependencies = {};
    }
    BaseTile = dependencies.hasOwnProperty("BaseTile") ? dependencies.BaseTile : Parallelio.Tile;
    Tile = (function(superClass) {
      extend(Tile, superClass);

      function Tile() {
        return Tile.__super__.constructor.apply(this, arguments);
      }

      Tile.include(EventEmitter.prototype);

      Tile.size = 20;

      Tile.prototype.init = function() {
        Tile.__super__.init.call(this);
        return this.displayContainer;
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
          },
          change: function() {
            if (this.displayContainer != null) {
              return this.display.appendTo(this.displayContainer);
            }
          }
        },
        cls: {
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
            var display, displayPos, newDiv;
            newDiv = document.createElement("div");
            displayPos = this.getDisplayPos();
            display = jQuery(newDiv).addClass('tile').addClass(this.cls).css({
              top: displayPos.y,
              left: displayPos.x
            });
            display.get(0)._parallelio_obj = this;
            return display;
          }
        }
      });

      Tile.prototype.getDisplayPos = function() {
        return this.tileToDisplayPos(this.x, this.y);
      };

      Tile.prototype.tileToDisplayPos = function(x, y) {
        return {
          x: x * Tile.size,
          y: y * Tile.size
        };
      };

      return Tile;

    })(BaseTile);
    return Tile;
  });

  (function(definition) {
    DOM.Ship = definition();
    return DOM.Ship.definition = definition;
  })(function(dependencies) {
    var DefaultGenerator, Ship, Tile, TileContainer;
    if (dependencies == null) {
      dependencies = {};
    }
    Tile = dependencies.hasOwnProperty("Tile") ? dependencies.Tile : DOM.Tile;
    TileContainer = dependencies.hasOwnProperty("TileContainer") ? dependencies.TileContainer : Parallelio.TileContainer;
    DefaultGenerator = dependencies.hasOwnProperty("DefaultGenerator") ? dependencies.DefaultGenerator : Parallelio.RoomGenerator;
    Ship = {};
    Ship.Tiled = (function(superClass) {
      extend(Tiled, superClass);

      function Tiled() {
        return Tiled.__super__.constructor.apply(this, arguments);
      }

      Tiled.include(EventEmitter.prototype);

      Tiled.prototype.init = function() {
        Tiled.__super__.init.call(this);
        return this.displayContainer;
      };

      Tiled.properties({
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

      Tiled.prototype.generate = function(generator) {
        generator = generator || (new DefaultGenerator()).tap(function() {
          this.wallFactory = function(opt) {
            return (new Tile(opt.x, opt.y)).tap(function() {
              this.cls = 'wall';
              return this.walkable = false;
            });
          };
          return this.floorFactory = function(opt) {
            return (new Tile(opt.x, opt.y)).tap(function() {
              this.cls = 'floor';
              return this.walkable = true;
            });
          };
        });
        return generator.getTiles().forEach((function(_this) {
          return function(tile) {
            return _this.addTile(tile);
          };
        })(this));
      };

      return Tiled;

    })(TileContainer);
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
