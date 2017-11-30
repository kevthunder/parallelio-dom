assert = chai.assert;
Tile = Parallelio.DOM.Tile
Weapon = Parallelio.DOM.Weapon
Timing = Parallelio.Timing

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
  it 'fire a projectile', (done)->
    timing = new Timing(false)
    container = document.createElement("div");
    document.body.appendChild(container)

    tile = (new Tile(1,1)).tap ->
      @displayContainer = container
    tile2 = (new Tile(2,2)).tap ->
      @displayContainer = container

    weapon = new Weapon({
      autoFire: false,
      target: tile2,
      timing: timing
    })
    tile.addChild weapon
    weapon.lastProjectile = weapon.fire();

    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.tile')
      assert.isNotNull container.querySelector('.weapon')
      assert.isNotNull container.querySelector('.projectile')
      done()
    