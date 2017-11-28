assert = chai.assert;
Tile = Parallelio.DOM.Tile
Door = Parallelio.DOM.Door

describe 'Door', ->
  it 'create a div', ->
    container = document.createElement("div");
    document.body.appendChild(container)
    tile = (new Tile()).tap ->
      @displayContainer = container
    door = (new Door()).tap ->
      @displayContainer = container
    assert.isNotNull container.querySelector('.tile')
    assert.isNotNull container.querySelector('.door')
    