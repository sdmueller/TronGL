/**
 * @author sdmueller (http://github.com/sdmueller)
 */

define(["app/cameraHelper",
        "app/props",
        "lib/keyboard",
        "lib/three.min"], function(cameraHelper, props, keyboard, three) {
  var renderer, scene, camera, cube, orbitControls;
  var camSpeed = 1;

  function setup() {
    createScene();
    draw();
  }

  function createScene() {
    // set scene size
    var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
    var viewSize = 3;
    var near = 0.1;
    var far = 1000;

    // create WebGL renderer
    renderer = new THREE.WebGLRenderer();

    // attach renderer-supplied DOM element (gameCanvas)
    var c = document.getElementById("gameCanvas");
    c.appendChild(renderer.domElement);

    // configure camera
    camera = new cameraHelper.Camera("mainCam");
    camera.setViewport(viewSize, WIDTH, HEIGHT, near, far);
    camera.createCameraPersp(45);
    camera.setPosition(0, 0, 10);
    camera.attachOrbitControls(renderer.domElement, 0);

    // create scene
    scene = new THREE.Scene();

    // start renderer
    renderer.setSize(WIDTH, HEIGHT);

    // add small cube
    backgroundCube = new props.Cube(5, 5);
    backgroundCube.isWireframe(true);
    scene.add(backgroundCube.mesh);
  }

  function draw() {
    // loop draw() function
    requestAnimationFrame(draw);

    handleInput();
    // draw THREE.JS scene
    renderer.render(scene, camera.cam);
  }

  function handleInput() {
    if(Key.isDown(Key.A)) {
      camera.moveOnKey("A");
    }
    if(Key.isDown(Key.D)) {
      camera.moveOnKey("D");
    }
    if(Key.isDown(Key.W)) {
      camera.moveOnKey("W");
    }
    if(Key.isDown(Key.S)) {
      camera.moveOnKey("S");
    }

    camera.controls.update();
  }

  return {
    setup: setup
  };

});
