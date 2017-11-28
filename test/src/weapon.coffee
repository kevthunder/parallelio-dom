assert = chai.assert;
Tile = Parallelio.DOM.Tile
Weapon = Parallelio.DOM.Weapon

describe 'Weapon', ->
  it 'create a div', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    tile = (new Tile()).tap ->
      @displayContainer = container
    tile.addChild new Weapon()
    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.tile')
      assert.isNotNull container.querySelector('.weapon')
      done()
    