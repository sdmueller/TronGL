/**
 * @author sdmueller (http://github.com/sdmueller)
 */

define(["app/cameraHelper",
        "app/props",
        "lib/keyboard",
        "lib/three.min",
        "lib/stats.min"], function(cameraHelper, props, keyboard, three, stats) {
  var renderer, scene, camera, cube, keyPressed, delta, path, stats;
  var clock = new THREE.Clock();
  var time = 0;
  var update = false;
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
    scene.add(path.mesh);

    // add 2nd cube/path
    player2 = new props.Bike(0.5, 3, 1);
    scene.add(player2.mesh);
    path2 = new props.Path(player2);
    scene.add(path2.mesh);

    stats = new Stats();
    c.appendChild(stats.dom);
  }

  function draw() {
    // loop draw() function
    requestAnimationFrame(draw);

    delta = clock.getDelta();

    handleInput();

    updateCamera();

    // updateRange used: http://stackoverflow.com/questions/17410761/how-to-quickly-update-a-large-buffergeometry
    path.mesh.geometry.attributes.position.needsUpdate = true; // required after the first render
    path2.mesh.geometry.attributes.position.needsUpdate = true;

    // draw THREE.JS scene
    renderer.render(scene, camera.cam);

    stats.update();
  }

  function handleInput() {
    if(clock.getElapsedTime() - time >= 0.15) {
      update = true;
      time = clock.getElapsedTime();
    }
    if(Key.isDown(Key.A)) {
        bikeCube.rotate("left", delta);
    }
    if(Key.isDown(Key.D)) {
        bikeCube.rotate("right", delta);
    }
    if(Key.isDown(Key.W)) {
        bikeCube.translate(0, 1, 0);
        if(update)
          path.update();
    }
    if(Key.isDown(Key.S)) {
        bikeCube.translate(0, -1, 0);
        if(update)
          path.update();
    }
    if(Key.isDown(Key.LEFT)) {
        player2.rotate("left", delta);
    }
    if(Key.isDown(Key.RIGHT)) {
        player2.rotate("right", delta);
    }
    if(Key.isDown(Key.UP)) {
        player2.translate(0, 1, 0);
        if(update)
          path2.update();
    }
    if(Key.isDown(Key.DOWN)) {
        player2.translate(0, -1, 0);
        if(update)
          path2.update();
    }
    update = false;
  }

  function updateCamera() {
    camera.cam.lookAt(bikeCube.mesh.position);
  }

  return {
    setup: setup
  };

});
