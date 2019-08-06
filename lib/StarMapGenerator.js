var BaseStarMapGenerator, Map, StarMapGenerator, StarSystem;

BaseStarMapGenerator = require('parallelio').StarMapGenerator;

Map = require('./Map');

StarSystem = require('./StarSystem');

module.exports = StarMapGenerator = (function() {
  class StarMapGenerator extends BaseStarMapGenerator {};

  StarMapGenerator.prototype.defOpt = Object.assign({}, BaseStarMapGenerator.prototype.defOpt, {
    mapClass: Map,
    starClass: StarSystem,
    linkClass: StarSystem.Link
  });

  return StarMapGenerator;

}).call(this);

//# sourceMappingURL=maps/StarMapGenerator.js.map
