BaseStarSystem = require('parallelio').StarSystem
Display = require('./Display')

module.exports = class StarSystem extends BaseStarSystem
  @extend Display


  @properties
    displayX:
      calcul: (invalidator) ->
        invalidator.prop('x')
    displayY:
      calcul: (invalidator) ->
        invalidator.prop('y')

  init: ->
    @baseCls = 'star'
    super()

  draw: (map, context)-> 
    context.beginPath();
    context.lineWidth = 1.5
    context.strokeStyle = "#336"
    context.arc(@x-map.boundaries.left+map.starMargin, @y-map.boundaries.top+map.starMargin, map.starMargin, 0, 2 * Math.PI);
    context.stroke();


    @links.forEach (link)=>
      if link.star1 == this
        link.draw?(map, context)

class StarSystem.Link extends BaseStarSystem.Link
  draw: (map, context)-> 
    xDist = @star2.x - @star1.x
    yDist = @star2.y - @star1.y
    dist = Math.sqrt((xDist*xDist)+(yDist*yDist))
    x1 = @star1.x + map.starMargin * xDist/dist - map.boundaries.left+map.starMargin
    y1 = @star1.y + map.starMargin * yDist/dist - map.boundaries.top+map.starMargin
    x2 = @star2.x - map.starMargin * xDist/dist - map.boundaries.left+map.starMargin
    y2 = @star2.y - map.starMargin * yDist/dist - map.boundaries.top+map.starMargin

    context.beginPath();
    context.lineWidth = 1
    context.strokeStyle = "#336"
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke();


