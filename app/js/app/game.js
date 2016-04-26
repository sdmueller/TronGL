/**
 * @author sdmueller (http://github.com/sdmueller)
 */

define(["app/cameraHelper",
        "app/props",
        "lib/keyboard",
        "lib/three.min"], function(cameraHelper, props, keyboard, three) {
  var renderer, scene, camera, cube, keyPressed, delta, path;
  var clock = new THREE.Clock();
  var camSpeed = 1;
  var isFreeCam = true;

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
    camera.setPosition(0, 0, -50);

    // create scene
    scene = new THREE.Scene();

    // start renderer
    renderer.setSize(WIDTH, HEIGHT);

    var floor = new props.Floor(50, 50);
    floor.isWireframe(true);
    scene.add(floor.mesh);

    // add cube representing bike
    bikeCube = new props.Bike(0.5, 3, 1);
    scene.add(bikeCube.mesh);

    // add path object
    path = new props.Path(bikeCube);

  }

  function draw() {
    // loop draw() function
    requestAnimationFrame(draw);

    delta = clock.getDelta();

    handleInput();

    updateCamera();

    // draw THREE.JS scene
    renderer.render(scene, camera.cam);
  }

  function handleInput() {
    if(Key.isDown(Key.A)) {
        bikeCube.rotate("left", delta);
        path.update();
    }
    if(Key.isDown(Key.D)) {
        bikeCube.rotate("right", delta);
        path.update();
    }
    if(Key.isDown(Key.W)) {
        bikeCube.translate(0, 1, 0);
        path.update();
    }
    if(Key.isDown(Key.S)) {
        bikeCube.translate(0, -1, 0);
        path.update();
    }

  }

  function updateCamera() {
    camera.cam.lookAt(bikeCube.mesh.position);
  }

  return {
    setup: setup
  };

});
