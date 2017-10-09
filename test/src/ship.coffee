assert = chai.assert;
Ship = Parallelio.DOM.Ship.Tiled

describe 'Ship', ->
  it 'create a div', ->
  	container = document.createElement("div");
  	document.body.appendChild(container)
  	ship = (new Ship()).tap ->
  		@displayContainer = container
  	assert.isNotNull container.querySelector('.ship')
  it 'generate tiles', ->
  	container = document.createElement("div");
  	document.body.appendChild(container)
  	ship = (new Ship()).tap ->
  		@displayContainer = container
  	ship.generate()
  	assert.isNotNull container.querySelector('.ship')
  	assert.isNotNull container.querySelector('.tile')