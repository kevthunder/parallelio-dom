(function() {
  var Tile, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  describe('Tile', function() {
    return it('create a div', function() {
      var container, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        return this.displayContainer = container;
      });
      return assert.isNotNull(container.querySelector('.tile'));
    });
  });

}).call(this);
