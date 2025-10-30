const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  scene: {
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

// Game variables
let snake = [];
let snakeSize = 15;
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food;
let score = 0;
let scoreText;
let titleBlocks = [];
let gameOver = false;
let moveTimer = 0;
let moveDelay = 150;
let graphics;

function create() {
  const scene = this;
  graphics = this.add.graphics();

  // Keyboard input
  this.input.keyboard.on("keydown", onInput);

  playTone(this, 440, 0.1);
}

function onInput(event) {}

function update(_time, delta) {
  if (gameOver) return;
  endGame(this);

  drawGame();
}

function drawGame() {
  graphics.clear();
}

function endGame(scene) {
  gameOver = true;
}

function restartGame(scene) {
  scene.scene.restart();
}

function playTone(scene, frequency, duration) {
  const audioContext = scene.sound.context;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "square";

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}
