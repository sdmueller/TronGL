/**
 * @author sdmueller (http://github.com/sdmueller)
 */

define(["lib/three.min",
        "lib/threeOrbitControls"], function(three, orbit) {

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

  var xOffset = new THREE.Vector3();
  var yOffset = new THREE.Vector3();
  Camera.prototype.moveOnKey = function(key) {
    var lookAtOffset = new THREE.Vector3();
    var camLocal = this.cam.matrix.elements;
    var posChange = this.speed * 0.1;
    switch(key) {
      case "A":
        // Get X column
        xOffset.set(camLocal[0], camLocal[1], camLocal[2]);
        // add translation on axis
        xOffset.multiplyScalar(-posChange);
        // add axisOffset to totalOffset
        lookAtOffset.add(xOffset);
        // translate camera
        this.cam.translateX(-posChange);
        // apply offset to target (=lookAt from threeOrbitControls)
        this.controls.target.add(lookAtOffset);
        break;
      case "D":
        xOffset.set(camLocal[0], camLocal[1], camLocal[2]);
        xOffset.multiplyScalar(posChange);
        lookAtOffset.add(xOffset);
        this.cam.translateX(posChange);
        this.controls.target.add(lookAtOffset);
        break;
      case "W":
        yOffset.set(camLocal[8], camLocal[9], camLocal[10]);
        yOffset.multiplyScalar(-posChange);
        lookAtOffset.add(yOffset);
        this.cam.translateZ(-posChange);
        this.controls.target.add(lookAtOffset);
        break;
      case "S":
        yOffset.set(camLocal[8], camLocal[9], camLocal[10]);
        yOffset.multiplyScalar(posChange);
        lookAtOffset.add(yOffset);
        this.cam.translateZ(posChange);
        this.controls.target.add(lookAtOffset);
        break;
      default:
        // Do nothing
    }
  }

  Camera.prototype.attachOrbitControls = function(domElement, dampingFactor) {
    this.controls = new THREE.OrbitControls(this.cam, domElement);
    //controls.enableKeys = false;
    if(dampingFactor == 0) {
      this.controls.enableDamping = false;
    } else {
      this.controls.enableDamping = true;
      this.controls.dampingFactor = dampingFactor;
    }
    this.controls.userPanSpeed = 0.05;
  }

  return {
    Camera: Camera
  }

});
