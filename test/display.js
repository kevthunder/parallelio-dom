(function() {
  var Display, assert,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  assert = chai.assert;

  Display = Parallelio.DOM.Display;

  describe('Display', function() {
    var createBasicDisplay;
    createBasicDisplay = function() {
      var Test, container, test;
      Test = (function(superClass) {
        extend(Test, superClass);

        function Test() {
          this.baseCls = 'test';
        }

        return Test;

      })(Display);
      container = document.createElement("div");
      document.body.appendChild(container);
      test = (new Test()).tap(function() {
        return this.displayContainer = container;
      });
      return container;
    };
    it('create a div', function() {
      var container;
      container = createBasicDisplay();
      return assert.isNotNull(container.querySelector('.test'));
    });
    it('create a div with no initial position', function() {
      var container, display;
      container = createBasicDisplay();
      display = container.querySelector('.test');
      return window.requestAnimationFrame(function() {
        return assert.isFalse(display.hasAttribute("style"));
      });
    });
    return it('can update position', function() {
      var Test, container, display, test;
      Test = (function(superClass) {
        extend(Test, superClass);

        function Test() {
          this.baseCls = 'test';
          this.initDisplay();
        }

        Test.properties({
          displayX: {
            calcul: function() {
              return 5;
            }
          },
          displayY: {
            calcul: function() {
              return 5;
            }
          }
        });

        return Test;

      })(Display);
      container = document.createElement("div");
      document.body.appendChild(container);
      test = (new Test()).tap(function() {
        return this.displayContainer = container;
      });
      display = container.querySelector('.test');
      return window.requestAnimationFrame(function() {
        assert.isTrue(display.hasAttribute("style"));
        assert.equal("5px", display.style.top);
        return assert.equal("5px", display.style.top);
      });
    });
  });

}).call(this);
