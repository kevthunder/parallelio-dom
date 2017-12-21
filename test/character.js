(function() {
  var Character, assert;

  assert = chai.assert;

  Character = Parallelio.DOM.Character;

  describe('Character', function() {
    return it('create a div', function() {
      var character, container;
      container = document.createElement("div");
      document.body.appendChild(container);
      character = (new Character()).tap(function() {
        return this.displayContainer = container;
      });
      return assert.isNotNull(container.querySelector('.character'));
    });
  });

}).call(this);
