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
    it('create a div', function(done) {
      var container;
      container = createBasicDisplay();
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.test'));
        return done();
      });
    });
    it('create a div with no initial position', function(done) {
      var container;
      container = createBasicDisplay();
      return window.requestAnimationFrame(function() {
        var display;
        display = container.querySelector('.test');
        assert.isFalse(display.hasAttribute("style"));
        return done();
      });
    });
    return it('can update position', function(done) {
      var Test, container, test;
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
      return window.requestAnimationFrame(function() {
        var display;
        display = container.querySelector('.test');
        assert.isTrue(display.hasAttribute("style"));
        assert.equal("5px", display.style.top);
        assert.equal("5px", display.style.top);
        return done();
      });
    });
  });

}).call(this);
