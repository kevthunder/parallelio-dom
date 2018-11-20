assert = chai.assert;
Display = Parallelio.DOM.Display

describe 'Display', ->
  createBasicDisplay = ->
    class Test extends Display
      constructor: () ->
        super()
        @baseCls = 'test'

    container = document.createElement("div");
    document.body.appendChild(container)

    test = (new Test()).tap ->
      @displayContainer = container

    return container

  it 'create a div', (done)->
    container = createBasicDisplay()

    window.requestAnimationFrame ->
      assert.isNotNull container.querySelector('.test')
      done()

  it 'create a div with no initial position', (done)->
    container = createBasicDisplay()

    window.requestAnimationFrame ->
      display = container.querySelector('.test')
      assert.isFalse display.hasAttribute("style")
      done()

  it 'can update position', (done)->
    class Test extends Display
      constructor: () ->
        super()
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

    window.requestAnimationFrame ->
      display = container.querySelector('.test')
      assert.isTrue display.hasAttribute("style")
      assert.equal "5px", display.style.top
      assert.equal "5px", display.style.top
      done()


    