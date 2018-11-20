assert = chai.assert;
Character = Parallelio.DOM.Character

describe 'Character', ->
  it 'create a div', (done)->
    container = document.createElement("div");
    document.body.appendChild(container)
    character = (new Character()).tap ->
      @displayContainer = container
    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.character')
      done()