assert = chai.assert;
Tile = Parallelio.DOM.Tile
Wire = Parallelio.DOM.Wire
TileContainer = Parallelio.tiles.TileContainer
Display = Parallelio.DOM.Display

createWireStage = ->
  class Container extends TileContainer
    @extend(Display)

  (new Container).tap ->
      container = document.createElement("div");
      document.body.appendChild(container)
      @display = container
      # tile with red wire
      r = (opt) ->
        (new Tile(opt.x,opt.y)).tap ->
          @addChild(new Wire("red"))
      # tile with blue wire
      b = (opt) ->
        (new Tile(opt.x,opt.y)).tap ->
          @addChild(new Wire("blue"))
      # tile with red and blue wire
      m = (opt) ->
        (new Tile(opt.x,opt.y)).tap ->
          @addChild(new Wire("red"))
          @addChild(new Wire("blue"))
      # tile with no wire
      n = (opt) ->
        new Tile(opt.x,opt.y)
      @loadMatrix([
        [n, b, r, n],
        [r, m, r, r],
        [b, b, r, n],
        [n, b, r, n],
      ]);

describe 'Wire', ->
  it 'create a div', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    tile = (new Tile()).tap ->
      @displayContainer = container
    tile.addChild new Wire("blue")
    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.tile')
      assert.isNotNull container.querySelector('.wire.blue')
      done()

  it 'add directionnal classes', (done)->
    container = createWireStage()
    window.requestAnimationFrame ->
      assert.isTrue container.getTile(1,2).children.get(0).display.is(".connUp")
      assert.isTrue container.getTile(1,2).children.get(0).display.is(".connDown")
      assert.isTrue container.getTile(1,2).children.get(0).display.is(".connLeft")
      assert.isFalse container.getTile(1,2).children.get(0).display.is(".connRight")
      done()

