assert = chai.assert;
ShipInterior = Parallelio.DOM.ShipInterior

describe 'ShipInterior', ->
  it 'create a div', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    ship = (new ShipInterior()).tap ->
      @displayContainer = container
    
    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.ship')
      done()
      
  it 'generate tiles', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    ship = (new ShipInterior()).tap ->
      @displayContainer = container
    ship.generate()

    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.ship')
      assert.isNotNull container.querySelector('.tile')
      assert.isNotNull container.querySelector('.door')
      assert.isNotNull container.querySelector('.door.vertical')
      done()