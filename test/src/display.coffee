assert = chai.assert;
Display = Parallelio.DOM.Display

describe 'Display', ->
  createBasicDisplay = ->
    class Test extends Display
      constructor: () ->
        @baseCls = 'test'

    container = document.createElement("div");
    document.body.appendChild(container)

    test = (new Test()).tap ->
      @displayContainer = container

    return container

  it 'create a div', ->
    container = createBasicDisplay()
    assert.isNotNull container.querySelector('.test')

  it 'create a div with no initial position', ->
    container = createBasicDisplay()
    display = container.querySelector('.test')

    window.requestAnimationFrame ->
      assert.isFalse display.hasAttribute("style")

  it 'can update position', ->
    class Test extends Display
      constructor: () ->
        @baseCls = 'test'
        @initDisplay()
      @properties
        displayX:
          calcul: -> 5
        displayY:
          calcul: -> 5

    container = document.createElement("div");
    document.body.appendChild(container)

    test = (new Test()).tap ->
      @displayContainer = container

    display = container.querySelector('.test')

    window.requestAnimationFrame ->
      assert.isTrue display.hasAttribute("style")
      assert.equal "5px", display.style.top
      assert.equal "5px", display.style.top


    