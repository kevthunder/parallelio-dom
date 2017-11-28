(function() {
  var Door, Tile, assert;

  assert = chai.assert;

  Tile = Parallelio.DOM.Tile;

  Door = Parallelio.DOM.Door;

  describe('Door', function() {
    return it('create a div', function() {
      var container, door, tile;
      container = document.createElement("div");
      document.body.appendChild(container);
      tile = (new Tile()).tap(function() {
        return this.displayContainer = container;
      });
      door = (new Door()).tap(function() {
        return this.displayContainer = container;
      });
      assert.isNotNull(container.querySelector('.tile'));
      return assert.isNotNull(container.querySelector('.door'));
    });
  });

}).call(this);
