(function() {
  var Display, assert;

  assert = chai.assert;

  Display = Parallelio.DOM.Display;

  describe('Display', function() {
    var createBasicDisplay;
    createBasicDisplay = function() {
      var Test, container, test;
      Test = class Test extends Display {
        constructor() {
          super();
          this.baseCls = 'test';
        }

      };
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
      Test = (function() {
        class Test extends Display {
          constructor() {
            super();
            this.baseCls = 'test';
            this.initDisplay();
          }

        };

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

      }).call(this);
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
