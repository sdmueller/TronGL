/**
 * @author sdmueller (http://github.com/sdmueller)
 */

define(["lib/three.min"], function(three) {

  var Camera = function(name) {
    this.name = name;
    this.viewport = null;
    this.cam = null;
    this.controls = null;
    this.speed = 1
  }

  Camera.prototype.getName = function() {
    return this.name;
  }

  Camera.prototype.setViewport = function(viewSize, width, height, near, far) {
    var aspectRatio = width / height;

    this.viewport = {
      viewSize: viewSize,
      aspectRatio: aspectRatio,
      left: (-aspectRatio * viewSize) / 2,
      right: (aspectRatio * viewSize) / 2,
      top: viewSize / 2,
      bottom: -viewSize / 2,
      near: near,
      far: far
    };
  }

  Camera.prototype.createCameraOrtho = function() {
    if(this.viewport) {
      this.cam = new  THREE.OrthographicCamera(this.viewport.left, this.viewport.right, this.viewport.top, this.viewport.bottom, this.viewport.near, this.viewport.far);
    } else {
      console.log("Viewport is null! Set viewport first with method setViewport().");
    }
  }

  Camera.prototype.createCameraPersp = function(fov) {
    if(this.viewport) {
      this.cam = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, this.viewport.near, this.viewport.far);
    } else {
      console.log("Viewport is null! Set viewport first with method setViewport().");
    }
  }

  Camera.prototype.setPosition = function(x, y, z) {
    this.cam.position.x = x;
    this.cam.position.y = y;
    this.cam.position.z = z;
  }

  Camera.prototype.follow = function(objectToFollow) {
    // TODO make camera follow the object
    var relativeCameraOffset = new THREE.Vector3(0, 1, 10);
    var cameraOffset = relativeCameraOffset.applyMatrix4(objectToFollow.mesh.matrixWorld);
    this.cam.position.x = cameraOffset.x;
    this.cam.position.y = cameraOffset.y;
    this.cam.position.z = cameraOffset.z;
    this.cam.lookAt(objectToFollow.mesh.position);
  }

  return {
    Camera: Camera
  }

});
