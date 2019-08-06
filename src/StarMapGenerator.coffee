
BaseStarMapGenerator = require('parallelio').StarMapGenerator
Map = require('./Map')
StarSystem = require('./StarSystem')

module.exports = class StarMapGenerator extends BaseStarMapGenerator
  defOpt: Object.assign({}, BaseStarMapGenerator::defOpt, {
    mapClass: Map
    starClass: StarSystem
    linkClass: StarSystem.Link
  })