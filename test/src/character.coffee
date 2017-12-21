assert = chai.assert;
Character = Parallelio.DOM.Character

describe 'Character', ->
  it 'create a div', ->
    container = document.createElement("div");
    document.body.appendChild(container)
    character = (new Character()).tap ->
      @displayContainer = container
    assert.isNotNull container.querySelector('.character')