assert = chai.assert;
Tile = Parallelio.DOM.Tile

describe 'Tile', ->
  it 'create a div', ->
  	container = document.createElement("div");
  	document.body.appendChild(container)
  	tile = (new Tile()).tap ->
  		@displayContainer = container
  	assert.isNotNull container.querySelector('.tile')