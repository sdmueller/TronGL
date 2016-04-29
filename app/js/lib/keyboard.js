// code from here: http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var Key = {
  _pressed: {},
  keysPressed: 0,

  A: 65,
  C: 67,
  W: 87,
  D: 68,
  S: 83,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,

  isIdle: function() {
    if(this.keysPressed == 0) {
      return true;
    } else {
      return false;
    }
  },

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
    this.keysPressed++;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
    this.keysPressed--;
  }
};
