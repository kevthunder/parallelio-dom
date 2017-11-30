(function(definition){var View=definition(typeof Parallelio.DOM!=="undefined"?Parallelio.DOM:this.Parallelio.DOM);View.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=View;}else{if(typeof Parallelio.DOM!=="undefined"&&Parallelio.DOM!==null){Parallelio.DOM.View=View;}else{if(this.Parallelio.DOM==null){this.Parallelio.DOM={};}this.Parallelio.DOM.View=View;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('parallelio').Element;
var View, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
View = (function(superClass) {
  extend(View, superClass);

  function View(display) {
    this.display = display != null ? display : null;
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

return(View);});