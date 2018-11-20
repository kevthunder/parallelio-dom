(function() {
  var Character, assert;

  assert = chai.assert;

  Character = Parallelio.DOM.Character;

  describe('Character', function() {
    return it('create a div', function(done) {
      var character, container;
      container = document.createElement("div");
      document.body.appendChild(container);
      character = (new Character()).tap(function() {
        return this.displayContainer = container;
      });
      return window.requestAnimationFrame(function() {
        assert.isNotNull(container.querySelector('.character'));
        return done();
      });
    });
  });

}).call(this);
