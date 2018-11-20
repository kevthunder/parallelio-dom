assert = chai.assert;
Tile = Parallelio.DOM.Tile

describe 'Tile', ->
  it 'create a div', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    tile = (new Tile()).tap ->
      @displayContainer = container

    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.tile')
      done()