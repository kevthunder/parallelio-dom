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

  it 'gets correctly positioned', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    tile = (new Tile()).tap ->
      @displayContainer = container
      @x = 2
      @y = 3

    window.requestAnimationFrame ->
      elem = container.querySelector('.tile')
      assert.equal elem.style.top, Tile.size*3 + "px"
      assert.equal elem.style.left, Tile.size*2 + "px"
      done()