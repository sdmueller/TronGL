/**
 * @author sdmueller (http://github.com/sdmueller)
 */

requirejs.config({
  // By default load any module IDs from js/lib
  baseUrl: 'js',
  paths: {}
});

requirejs(["app/game"], function(game) {
  game.setup();
});
