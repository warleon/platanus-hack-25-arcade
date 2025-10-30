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
let gameOver = false;
let graphics;
const resources = [];

function create() {
  const scene = this;
  graphics = this.add.graphics();

  for (let i = 0; i < 3; i++) {
    resources.push({ x: 0.1, y: i * 0.25 + 0.25 });
    resources.push({ x: 0.9, y: i * 0.25 + 0.25 });
  }

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

  const colors = [0x00ff00, 0x0000ff, 0xffff00];
  resources.forEach((res, index) => {
    drawSquare(res.x, res.y, 0.1, colors[index % colors.length]);
  });
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

function drawSquare(x, y, size, color) {
  graphics.fillStyle(color, 1);
  const w = size * config.width;
  graphics.fillRect(x * config.width - w / 2, y * config.height - w / 2, w, w);
}
