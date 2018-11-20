assert = chai.assert;
Tile = Parallelio.DOM.Tile
Door = Parallelio.DOM.Door

describe 'Door', ->
  it 'create a div', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    tile = (new Tile()).tap ->
      @displayContainer = container
    door = (new Door()).tap ->
      @displayContainer = container
    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.tile')
      assert.isNotNull container.querySelector('.door')
      done()
    