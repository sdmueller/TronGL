/**
 * @author sdmueller (http://github.com/sdmueller)
 */

define(["lib/three.min"], function(three) {
  var moveSpeed = 0.2;

  //--------------- Cube ---------------------//
  var Cube = function(sides, segments) {
    this.geometry = new THREE.BoxGeometry(sides, sides, sides, segments, segments, segments);
    this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  Cube.prototype.isWireframe = function(isWireframe) {
    this.material.wireframe = isWireframe;
  }

  //--------------- Bike ---------------------//
 var Bike = function(width, height, depth) {
   this.geometry = new THREE.BoxGeometry(width, height, depth);
   this.material = new THREE.MeshBasicMaterial( {color: 0x000183 });
   this.mesh = new THREE.Mesh(this.geometry, this.material);
 }

 Bike.prototype.rotate = function(direction, delta) {
   var rotateAngle = Math.PI / 2 * delta; // 90 degrees per sec
   if(direction == "left") {
     this.mesh.rotateZ(-rotateAngle);
   } else if(direction == "right") {
     this.mesh.rotateZ(rotateAngle);
   }
 }

 Bike.prototype.translate = function(x, y, z) {
   if(x)
     this.mesh.translateX(x * moveSpeed);
   if(y)
     this.mesh.translateY(y * moveSpeed);
   if(z)
     this.mesh.translateZ(z * moveSpeed);
 }

 Bike.prototype.getWorldPosition2 = function() {
   var position2 = new THREE.Vector2();
   var position3 = new THREE.Vector3();
   position3.setFromMatrixPosition(this.mesh.matrixWorld);
   position2.set(position3.x, position3.y);
   return position2;
 }

 //--------------- Floor ---------------------//
var Floor = function(width, height) {
  this.geometry = new THREE.PlaneGeometry(width, height);
  this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00 });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
}

Floor.prototype.isWireframe = function(isWireframe) {
  this.material.wireframe = isWireframe;
}

//--------------- Path ---------------------//
var MAX_POINTS = 1000;
var Path = function(parentObj) {
  this.parentObj = parentObj;
  this.curve = new THREE.SplineCurve();
  this.geometry = new THREE.BufferGeometry();
  this.positions = new Float32Array(MAX_POINTS * 3);
  this.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));

  this.drawCount = 2; // draw the first 2 points, only
  this.geometry.setDrawRange(0, this.drawCount);

  this.material =  new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 2});

  this.mesh = new THREE.Line(this.geometry, this.material);
}

var pointNbr = 0;
var index = 0;
Path.prototype.update = function() {
  // push coordinates of bike into curve
  this.curve.points.push(this.parentObj.getWorldPosition2());

  // set draw range
  this.drawCount = this.curve.points.length;
  this.mesh.geometry.setDrawRange(0, this.drawCount);

  console.log(this.drawCount);

  // add curve points to the buffer geometry
  this.mesh.geometry.attributes.position.array[index++] = this.curve.points[pointNbr].x;
  this.mesh.geometry.attributes.position.array[index++] = this.curve.points[pointNbr++].y;
  this.mesh.geometry.attributes.position.array[index++] = 0;
}

  return {
    Cube: Cube,
    Bike: Bike,
    Floor: Floor,
    Path: Path
  }
});
