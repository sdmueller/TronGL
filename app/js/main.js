/**
 * @author sdmueller (http://github.com/sdmueller)
 */

requirejs.config({
  // By default load any module IDs from js/lib
  baseUrl: 'js',
  paths: {},
  shim: {
    // load deps for modules w/o AMD
    "lib/threeOrbitControls": {
      deps: ["lib/three.min"]
      //exports:"THREE.OrbitControls"
    }
  }
});

requirejs(["app/game"], function(game) {
  game.setup();
});
