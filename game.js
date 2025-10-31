const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
};

const game = new Phaser.Game(config);

const SPRITE_SHEET =
  "data:image/webp;base64,UklGRkQAAABXRUJQVlA4TDgAAAAvP8ADAB8gFkz8kXLoHJyQgNjjvz12iAIBIkiJCKHu5j/GHY0AYbbRJCc5yUO4b0T/Y9uqVAH+Ag==";

// anim states: idle, walk, attack, die
const IDLE = "idle";
const WALK = "walk";
const ATTACK = "attack";
const DIE = "die";
// Game variables
let graphics;
const resources = [];

function preload() {
  this.load.spritesheet("test", SPRITE_SHEET, {
    frameWidth: 16,
    frameHeight: 16,
  });
}
function create() {
  const scene = this;
  graphics = this.add.graphics();

  for (let i = 0; i < 2; i++) {
    resources.push({ x: 0.1, y: i * 0.33 + 0.33, size: 0.05 });

    resources.push({ x: 0.9, y: i * 0.33 + 0.33, size: 0.05 });
  }

  // Keyboard input
  this.input.keyboard.on("keydown", onInput);

  // Animations
  scene.anims.create({
    key: IDLE,
    frames: scene.anims.generateFrameNumbers("test", { start: 0, end: 0 }),
    frameRate: 2,
    repeat: -1,
  });
  scene.anims.create({
    key: WALK,
    frames: scene.anims.generateFrameNumbers("test", { start: 1, end: 1 }),
    frameRate: 2,
    repeat: -1,
  });
  scene.anims.create({
    key: ATTACK,
    frames: scene.anims.generateFrameNumbers("test", { start: 2, end: 2 }),
    frameRate: 2,
    repeat: -1,
  });
  scene.anims.create({
    key: DIE,
    frames: scene.anims.generateFrameNumbers("test", { start: 3, end: 3 }),
    frameRate: 2,
    repeat: -1,
  });

  // Entities
  const player = new Entity(scene, config.width / 2, config.height / 2, "test");
  player.walkTo(0.7, 0.7);

  playTone(this, 440, 0.1);
}

function onInput(event) {}

function update(_time, delta) {
  drawGame();
}

function drawGame() {
  graphics.clear();

  const colors = [0x00ff00, 0x0000ff, 0xffff00];
  resources.forEach((res, index) => {
    drawRect(colors[index % colors.length], res.x, res.y, res.size);
  });
  // UI
  drawRect(0xff0000, 0.2, 0.9, 0.4, 0.2);
  drawRect(0xff0000, 0.8, 0.1, 0.4, 0.2);
  // bases
  drawRect(0x00ff00, 0.2, 0.1, 0.4, 0.2);
  drawRect(0x00ff00, 0.8, 0.9, 0.4, 0.2);
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

function drawRect(color, x, y, width, height = null) {
  if (height === null) {
    height = width;
  }
  graphics.fillStyle(color, 1);
  const w = width * config.width;
  const h = height * config.width;
  graphics.fillRect(x * config.width - w / 2, y * config.height - h / 2, w, h);
}

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    console.log(scene);
    scene.add.existing(this);
    scene.physics.add.existing(this, 0);
  }

  disappear() {
    this.setActive(false);
    this.setVisible(false);
  }

  appear() {
    this.setActive(true);
    this.setVisible(true);
  }

  walkTo(x, y) {
    this.appear();
    this.play(WALK);
    this.scene.physics.moveTo(this, x * config.width, y * config.height, 8 * 8);
  }
}
