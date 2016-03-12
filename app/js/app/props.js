/**
 * @author sdmueller (http://github.com/sdmueller)
 */

define(["lib/three.min"], function(three) {

  //--------------- Cube ---------------------//
  var Cube = function(sides, segments) {
    this.geometry = new THREE.BoxGeometry(sides, sides, sides, segments, segments, segments);
    this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  Cube.prototype.isWireframe = function(isWireframe) {
    this.material.wireframe = isWireframe;
  }

  return {
    Cube: Cube
  }
});
