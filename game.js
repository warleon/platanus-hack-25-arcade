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

const ARCADE_CONTROLS = {
  // ===== PLAYER 1 CONTROLS =====
  // Joystick - Left hand on WASD
  P1U: ["w"],
  P1D: ["x"],
  P1L: ["a"],
  P1R: ["d"],
  P1DL: ["z"],
  P1DR: ["c"],
  P1UL: ["q"],
  P1UR: ["e"],

  // Action Buttons - Right hand on home row area (ergonomic!)
  // Top row (ABC): U, I, O  |  Bottom row (XYZ): J, K, L
  P1A: ["r"],
  P1B: ["t"],
  P1C: ["y"],
  P1X: ["f"],
  P1Y: ["g"],
  P1Z: ["h"],

  // Start Button
  START1: ["s", "space"],

  // ===== PLAYER 2 CONTROLS =====
  // Joystick - Right hand on Arrow Keys
  P2U: ["8"],
  P2D: ["2"],
  P2L: ["4"],
  P2R: ["6"],
  P2DL: ["1"],
  P2DR: ["3"],
  P2UL: ["7"],
  P2UR: ["9"],

  // Action Buttons - Left hand (avoiding P1's WASD keys)
  // Top row (ABC): R, T, Y  |  Bottom row (XYZ): F, G, H
  P2A: ["i"],
  P2B: ["o"],
  P2C: ["p"],
  P2X: ["k"],
  P2Y: ["l"],
  P2Z: ["ñ"],

  // Start Button
  START2: ["5", "0"],
};

// Build reverse lookup: keyboard key → arcade button code
const KEYBOARD_TO_ARCADE = {};
for (const [arcadeCode, keyboardKeys] of Object.entries(ARCADE_CONTROLS)) {
  if (keyboardKeys) {
    // Handle both array and single value
    const keys = Array.isArray(keyboardKeys) ? keyboardKeys : [keyboardKeys];
    keys.forEach((key) => {
      KEYBOARD_TO_ARCADE[key] = arcadeCode;
    });
  }
}

const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  upLeft: { x: -1, y: -1 },
  upRight: { x: 1, y: -1 },
  downLeft: { x: -1, y: 1 },
  downRight: { x: 1, y: 1 },
};

const SPRITE_SHEET =
  "data:image/webp;base64,UklGRkQAAABXRUJQVlA4TDgAAAAvP8ADAB8gFkz8kXLoHJyQgNjjvz12iAIBIkiJCKHu5j/GHY0AYbbRJCc5yUO4b0T/Y9uqVAH+Ag==";

const HEALING_ICON =
  "data:image/webp;base64,UklGRl4BAABXRUJQVlA4TFEBAAAvH8AHEEegIACQhPr/jRENxhy1bdswPtl/Z+wVUBpJknKUf3bnLgFy9C/nPwDgqzZ+Lk7LSIiecr5lFsDRtrdtQ6ccQOXJnKjNieC2RoQ8N8J7hS7gh/CeIp2bpMsRIvqvsG3bhkm6xx/qMwuiBsiy+kmpDTFby8xsmSdqCYC/w1Vcts8AGvtrfQcHvNXPf4bqWu/ALOA/kbOEzd7vX7ooOgdPVvugf4uinfj3qr3f75xv23uHYRiEU4el943fxySKvpBlkMfIIgpiL+L0g6ShyHpyuUu6KtQ4pbfIYufDXBEe+2v6aIWD5kAeTbjjci0yZfDgsGfHdodpEftmU522xZr5gJlrVkQTonzNi7zRGEWaNqVXZDUSIhqitdNkmWmICIM55VlmWgIiolq3ps0zQ0RUAGhsyWBeAhG1LYZRr5eg8Ubkk1cFtyNX6j27GU8KAA==";

const HIT_ICON =
  "data:image/webp;base64,UklGRrwAAABXRUJQVlA4TK8AAAAvH8AHECegkI0kOLavxuqcwpFJ2/RvdU7GtCto24ZNtfsP3OY/ANS+u9v5Hhw0kiQ3JxnB3JrArQPA6w4BJ8uf1D15EET0fwLKyfJWCoBpCJSzu3PPvDNg45PxRPqS2uR+xrcCg2AWGi94DbB4z6pMUmAjvTIlMNHbKH71BIsB1l4pLSmQ3OvCOFho7hIrjteVOK68vC5l5uMXzTMz9x/E8UfnJ1vpml+AAaWcLG8FAA==";

const THUNDER_ICON =
  "data:image/webp;base64,UklGRlYBAABXRUJQVlA4TEkBAAAvH8AHAE+gNAAIKYnSL9rE/tUg3DOMkQZoHKMBGoci6ps9w/1TmGmA5OVn/FTgpIGVzGsAK8x/zN/sCIjLIA9JdFGuP6sXANfW3kZKZmqR6RZ5QztnhJezHUFTTDnrEaHLTGuSXZMpc5jnTaQXiOj/BOA/HTvrjSG2GmCe97Dxmffdb7luXndW8t0zVFXOl3PXxcrQBt4HgfUjYQUiusD7vIcNI2cVNo6c7TWj3FIVKcRza50NWqWIhkohRnaPKtQbxQrxfDzsjiGiHrImClfxcI9QRUYGJcLO4Ug3ItKGeGBIkRwGfSJDOuGEtdZET0QkYpgzETF6fK+vDemMOYsTbehwhF6NWZE4K4SF9c1anxORbFfKcQogLCy1szAKsC4iElcAZOsAqYhIUX4GmIb0uahdgqR4LpbSBunVMiwtPpceqxevHr/ZAAA=";

const RADIAL_ICON =
  "data:image/webp;base64,UklGRvABAABXRUJQVlA4TOQBAAAvH8AHAF+goI0k5fju+Y28nPdvhGwoaCSpEfC9vwXU4N8MKGzbtslOuvtDD+j/ry1g/mPQOmOSF1zNAfD/9/dIbfygepuF3fYNkrRtchoHxjnTLWevaF3AotAJVO1ZzzMN3iYG52x36WE1K4R8AauYrVOjjXNQXc+PzxDR/wmIogvRf345EpnEGK3MZDIyRmt9LTU61UkGAKPUpNqoU6nRKQAAjI3RyqRGxQC7mANcSrXWSqcZ7CIWU8hirYzWCsaI1jmAsVImvT0BRFciIoCKVJzlM0REhziFkVIZACK6vQIxH42VBrCuwjd005aIuZrADNEVVJO16OBQBrPKoq/JbxcWp9cALDrnieietS6HnQqx+Ei0ILqBOM3hvcXCU9vNaRt/lfkDxKoiWnE3J1thfrtwBVG7Yp5TaavzM2c9fWxD6Duiop7u4T0ivwp9WHoqSyyw9vcWHPqBie7VV388Ilq0PHDo73uq35atv9euAm965nt0rzns6V7H/SBrZqqpOVzfW3TMG5Gel56ah+3vruMgIgdhef9j8+LF/DP/Y+iXXd08v9WtOPyVRNYcNnHz4iG94yCnki8i/PfipevNzp/1X/kafZE+DB/3L8Ynet6IRCIHQ/Ank3v7GxE5JV9ERLqH";

const CHURCH =
  "data:image/webp;base64,UklGRkYCAABXRUJQVlA4TDoCAAAvP8APECdAkG0bG8FGc4wLBMiUAz06EGTbxmawSRzj8x8AdWbNP0iMbTVsJexU8FAKME8qIBYq4G9E/03ZxvFsAxH9nwBJLvL0c/ZYfWx5bH2s/H+vh7a6PFVufV5PbesNL/ut14294KH+g/WGF6wPKZbcpyK3ebnR0bGkzAv2TAdYcr0qkNgImlrKXYH1YitQsmPJVWA5+XSQAPm2xOZe9ILHg2K9cnoB8PqI6InC2HW52NxPIFJqyi4+Xk8oX/DcjKy4+KvuBWZ05aWCqFwuZmvFjDSStAMUUOIiZoAkcagsRgWwGy8a5pugAgDJxpNuSKmegUpSd8BUEyNhpkaqYQdv8AykKVSNTMTwN6lnIGrXaopE6/GmKk7NuJNkZjvBOQE1Wqq/55hvvQDQDMzMNiP8jUvTSiWNypPvmBEjvFzAzHgguYo4vxETETVBgnowEWGfEYExhl7AqGcqIjIjonHEKICeKUgjuB7iWCNGw6kZ1UiqrZI4jnIwKhVU2CpXzXtEtArAeCCpqyQ6vUcEC5QHklgkU7GPGTELmFhTBRgWMQapeoJVcgpr3xggwINJds4D2jfiQrEk1OscKSUViyRHLe4FCaOpSfLT3L1njGqrpNy9Kt3R5oHURdJbre7dp9cDSaxyc6N6+HCr3wijyu3q/3xG67t7D4Pcd61zRFS3XieWe3/u3/cc3mute+EPtmmjh7sr3WnyQ4RHmzvYXclfSPU233C4gvLbfXifuuj+kh9/ejgX+TU=";

const CASINO =
  "data:image/webp;base64,UklGRpIFAABXRUJQVlA4TIUFAAAvP8APEKfAJgCANDi8Lr810P5NSAGTHGwkSU4jZooUKmT8/9dsVamJJEk5enBA2UVfr+L9m4GUa/4DAAAMhC8DH4PSoNqDZBJMYXOYa508pPDtv6g6+McSk1rIaVG8r1OgkbQCBdt24zaSepAJfALEx7D/zUpJVXV6ARH9n4DrT/f10/8H9Kfl/nH4Wd0F/qjs5P5RF1uvn521fxaztv6orAJ/0vQkiZ8xz6pqAPP6H+qZGTzZnTsBmBlmZvifmMHXrGru/WLAdHf/IW+SADYAi5NVtYGNE2E455zu4R/wHgeArOI5EZFdhU0g4gSraOcEZ34XuwkAJ6ryPHd2cu9CnBeYxTnk75pugNvNmYVTmZkk9q6srF2EmbkzzszvmAGArDrmu/IJzcy9AWRVVoLOKiKi59c4BGCHVcyq5N4bux/7nMNn5slKmEVEzy9wHHB3P6zi1g0Ftr6R55w+3KyCmRkZM/29caCOu7OqNoBDAJkvSQBJdLKqzAhEnPHvNAGcLHrWBvbWz0c+8oU8N5EgMwmQGcH5BgcA47CyFEDzXqtn7bclIuvv9cmTyJ1JHvOI0V/wHSdLAezuJWtx+QtERHqt1ansrtxqbhEDfZsZwM3tJAHwI9JrLVGSubFlSctaopLNgypzOydm4oUc4HD7rlLsLUtEWkSqs/bemJHPWp9e6yaTWZubZAz8K8+sqkwA3iJL1qd7mJl7I05n6lpLOERmVSUBDkKvS+NhJ7NSFeeWliXa2fwqJpNL1Hv17oeZWQyC1zWcgbs7s3Tvs0S6PWs69stGRGtl32ut6QbfbABeV3OACPfMhJyPPKsq4vgLgJjeLbLWWoLdVf7sgd8vx9288mws6W6VqmScYyc3ntN7s5+O01WVWcVB3Bc5w2flJtdaIl5VOR3nnAMAFtx77yVLZIFdhePuPTDXxwYOsvIhIqxKVDNezbSBvbcsEREQVeruNkC84cSJzGSqqKpWpZLD84jTeBMR1Z1Z5W7mA5hrRwwiztlZwEdElmRls9jdTZJ7o/fea60ln/NIbu8BwnUiOCSBSkXfS4RZVYMiq/YTe+8tIkukWVUA2a2AuXSQg3POySqivVVWVlaNAgQA7r23LtEtBDN3nHPOABaiTcb4OUyy6lBkrSWdVVX57P2krCWSullFnhN8+D/KmeY0YcaqvVvWallSWc/9/vn3wyVUZiZskz0ALP7V4TA4NHPfVckW/6wlazVJPvqvtdYSdmZV1Xb3HsUAvpQvHHPzYlZWy1oia4187S/ZWVVadPcZzKjrunQYEez2qsLOLGSKSLesx1oPkcy9q0hj8ewGdOD3v5eyGREzueFmvisrs6ra+XU3kJlJmLk5OW5mFvf653KdjmBwtpudzVRWVWZWfZX1hBaOm51RmMHCP/LQJhkRM0bsopmhqrIqs96zCjCr8nAbvEbct/xzXarajCeHnWlmXji+d2YmM1kwY5mZVZIDgxks5Jb1z3WF6swb2Q3zzXJ35wYUAMoeNLPdM26P8Lhvua7rclVtPp4z47vOCyICEUYzs0qzmQEMMLOIz5I3V1U2g49zprPwqHg3dzNjdjcUT7Og3Ev+flxuqurNL86Zd0aQEcGYV4XBzAxh7vd9L7ne3VW1m4w4355vEmZmMNhrRNz3LXJ9T6e7+ZgvXgH7EjMKs4hwv+97yf3V5W76nMfM+Lfs65kBgIj7KSLXd90cqqpokmHnu/ZdHY8IvZ8icn3f3VwVKtBm8zvxjYigyOff+76XiPz7C9flavrO3+1yf+7nEpF1/UY1hUJFRUQg8855uz/3uzzX9VtUYa7yq/f9ue/P59/7fa3Hun6viLiqukK/9215vf7kxwyq6qqi+gtLvrz+/Dde5X3J6/Vf/V3X7wUA";

const MELEE_WALK =
  "data:image/webp;base64,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";

const RANGE_WALK =
  "data:image/webp;base64,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";

const GOBLIN_WALK =
  "data:image/webp;base64,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";

// path points
const pathPoints = [
  [
    //player 2
    { x: 0.55, y: 1.1 },
    { x: 0.55, y: 0.6 },
    { x: 0.8, y: 0.6 },
    { x: 0.8, y: 0.4 },
    { x: 0.55, y: 0.4 },
    { x: 0.55, y: -0.1 },
  ],
  [
    // player 1
    { x: 0.45, y: 1.1 },
    { x: 0.45, y: 0.6 },
    { x: 0.2, y: 0.6 },
    { x: 0.2, y: 0.4 },
    { x: 0.45, y: 0.4 },
    { x: 0.45, y: -0.1 },
  ],
];

// anim states: idle, walk, attack, die
const IDLE = "idle";
const WALK = "walk";
const ATTACK = "attack";
const DIE = "die";
// entity kinds
const PATH = "path";
const HERO = "hero";
const CREEP = "creep";
const RESOURCE = "resource";
const BASE = "base";
const UI = "ui";
// Game variables
let scene;
let graphics;
let player1 = null;
let player2 = null;
let round = 0;

// Game functions
function preload() {
  this.load.spritesheet("test", SPRITE_SHEET, {
    frameWidth: 16,
    frameHeight: 16,
  });

  this.load.image("heal_icon", HEALING_ICON, {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.image("hit_icon", HIT_ICON, {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.image("church", CHURCH, {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.image("casino", CASINO, {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("melee_walk", MELEE_WALK, {
    frameWidth: 22,
    frameHeight: 26,
  });
  this.load.spritesheet("range_walk", RANGE_WALK, {
    frameWidth: 14,
    frameHeight: 25,
  });
  this.load.spritesheet("goblin_walk", GOBLIN_WALK, {
    frameWidth: 15,
    frameHeight: 24,
  });
}

function create() {
  scene = this;
  graphics = this.add.graphics();

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
  // knight
  scene.anims.create({
    key: "melee_walk_up",
    frames: scene.anims.generateFrameNumbers("melee_walk", {
      start: 1,
      end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "melee_walk_left",
    frames: scene.anims.generateFrameNumbers("melee_walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "melee_idle_down",
    frames: scene.anims.generateFrameNumbers("melee_walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "melee_walk_down",
    frames: scene.anims.generateFrameNumbers("melee_walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "melee_walk_right",
    frames: scene.anims.generateFrameNumbers("melee_walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 9,
    repeat: -1,
  });
  // archer
  scene.anims.create({
    key: "range_walk_up",
    frames: scene.anims.generateFrameNumbers("range_walk", {
      start: 1,
      end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "range_walk_left",
    frames: scene.anims.generateFrameNumbers("range_walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "range_idle_down",
    frames: scene.anims.generateFrameNumbers("range_walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "range_walk_down",
    frames: scene.anims.generateFrameNumbers("range_walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "range_walk_right",
    frames: scene.anims.generateFrameNumbers("range_walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 9,
    repeat: -1,
  });
  // goblin
  scene.anims.create({
    key: "goblin_walk_up",
    frames: scene.anims.generateFrameNumbers("goblin_walk", {
      start: 1,
      end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "goblin_walk_left",
    frames: scene.anims.generateFrameNumbers("goblin_walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "goblin_walk_down",
    frames: scene.anims.generateFrameNumbers("goblin_walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 9,
    repeat: -1,
  });
  scene.anims.create({
    key: "goblin_walk_right",
    frames: scene.anims.generateFrameNumbers("goblin_walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 9,
    repeat: -1,
  });
  // entities
  player1 = new Player(1);
  player2 = new Player(2);
  // p1
  player1.createPath(scene);
  player1.createBase(scene);
  player1.createResources(scene);
  player1.createHeroes(scene);
  player1.createEnemies(scene);
  //p2
  player2.createPath(scene);
  player2.createBase(scene);
  player2.createResources(scene);
  player2.createHeroes(scene);
  player2.createEnemies(scene);

  playTone(this, 440, 0.1);
}

function onInput(event) {
  // Normalize keyboard input to arcade codes for easier testing
  const key = KEYBOARD_TO_ARCADE[event.key] || event.key;
  const match = key && key.match(/^(P[12])(UL|UR|DL|DR|U|D|L|R)$/);

  if (!match) {
    return;
  }

  if (event.preventDefault) {
    event.preventDefault();
  }

  const playerKey = match[1];
  const directionKey = match[2];
  const directionVectors = {
    U: DIRECTIONS.up,
    D: DIRECTIONS.down,
    L: DIRECTIONS.left,
    R: DIRECTIONS.right,
    UL: DIRECTIONS.upLeft,
    UR: DIRECTIONS.upRight,
    DL: DIRECTIONS.downLeft,
    DR: DIRECTIONS.downRight,
  };
  const direction = directionVectors[directionKey];

  if (!direction) {
    return;
  }

  if (playerKey === "P1") {
    player1.moveSelectionTo(direction);
  } else if (playerKey === "P2") {
    player2.moveSelectionTo(direction);
  }
}

function update(_time, delta) {
  player1.entities.forEach((entity) => {
    entity.update(_time, delta);
  });
  player2.entities.forEach((entity) => {
    entity.update(_time, delta);
  });
  drawGame();
}

function drawGame() {
  graphics.clear();
  player1.placeUI();
  player2.placeUI();
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

class Entity extends Phaser.GameObjects.Sprite {
  pathTargets = [];
  attackTargets = [];
  targettable = [];
  currentTarget = null;
  kind = ""; // path, hero, enemy, resource, base, ui
  attackRadius = 0.02;
  xpRadius = 0.1;
  hitboxRadius = 0.01;
  visionRadius = 0.2;
  damage = 10;
  health = 100;
  healthRegeneration = 0;
  mana = 100;
  manaRegeneration = 0;
  speed = 40;
  level = 1;
  attackable = true;
  generateResource = () => {}; //to be overridden by player
  onSelectedDeath = (killed, killer) => {}; // to be overridden by player
  spells = []; // to be overridden by player, must be 6
  walkAnimationPrefix = "";

  constructor(scene, x, y, kind, texture) {
    super(scene, x * config.width, y * config.height, texture);
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this, 0);
    this.kind = kind;
  }
  resize(w, h) {
    const width = (config.width * w) / this.body.width;
    let height = (config.height * h) / this.body.height;
    if (h === undefined) {
      height = width;
    }
    this.setScale(width, height);
  }
  distanceTo(entity) {
    return (
      Phaser.Math.Distance.Between(this.x, this.y, entity.x, entity.y) /
      config.width
    );
  }

  appendTarget(entity) {
    if (entity.kind !== PATH) {
      if (entity.attackable === false) {
        return;
      }
      this.attackTargets.push(entity);
      this.currentTarget = this.attackTargets[0];
      return;
    }
    this.pathTargets.push(entity);
    if (!this.currentTarget) {
      this.currentTarget = this.pathTargets[0];
    }
  }
  popTarget() {
    if (this.currentTarget) {
      if (this.currentTarget.kind !== PATH) {
        this.attackTargets.shift();
        this.currentTarget = this.attackTargets[0];
      } else {
        this.pathTargets.shift();
        this.currentTarget = this.pathTargets[0];
      }
    }
    if (!this.currentTarget) {
      if (this.attackTargets.length) this.currentTarget = this.attackTargets[0];
      else if (this.pathTargets.length)
        this.currentTarget = this.pathTargets[0];
    }
  }

  disappear() {
    this.setActive(false);
    this.setVisible(false);
  }

  appear() {
    this.setActive(true);
    this.setVisible(true);
  }

  walkTo(entity) {
    this.appear();
    this.scene.physics.moveTo(this, entity.x, entity.y, 40);
    this.play(`${this.walkAnimationPrefix}_${this.getDirection()}`, true);
  }

  idle() {
    this.appear();
    this.play(IDLE);
    this.body.setVelocity(0, 0);
  }

  attack() {
    this.appear();
    this.play(ATTACK);
    this.body.setVelocity(0, 0);
    this.currentTarget.takeDamage(this.damage, this);
    if (this.currentTarget.health <= 0) {
      this.popTarget();
    }
  }

  takeDamage(amount, from) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die(from);
    }
  }

  die(by) {
    this.appear();
    this.play(DIE);
    this.body.setVelocity(0, 0);
    this.attackable = false;
    this.disappear();
    this.onSelectedDeath(this, by);
  }

  update(_time, delta) {
    this.lookForTargets();
    if (this.currentTarget) {
      const distance = this.distanceTo(this.currentTarget);
      if (distance < this.attackRadius + this.currentTarget.hitboxRadius) {
        if (this.currentTarget.kind === PATH) {
          this.popTarget();
        } else {
          this.attack();
        }
      } else {
        this.walkTo(this.currentTarget);
      }
    }
  }

  lookForTargets(entities = this.targettable) {
    for (const entity of entities) {
      if (entity === this) continue;
      if (entity.health <= 0) continue;
      const distance = this.distanceTo(entity);
      if (distance > this.visionRadius) continue;
      switch (this.kind) {
        case CREEP:
          if (entity.kind === RESOURCE || entity.kind === HERO) {
            this.appendTarget(entity);
          }
          break;
        case HERO:
          if (entity.kind === CREEP) {
            this.appendTarget(entity);
          }
      }
    }
  }

  getDirection() {
    const { x, y } = this.body.velocity;

    if (x === 0 && y === 0) return "down"; // not moving

    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (absX > absY) {
      // horizontal movement dominates
      return x > 0 ? "right" : "left";
    } else {
      // vertical movement dominates
      return y > 0 ? "down" : "up";
    }
  }
}

class Player {
  constructor(id) {
    this.id = id;
    this.selection = null;
    this.resources = [];
    this.heroes = [];
    this.faith = 0;
    this.luck = 0;
    this.base = null;
    this.entities = []; // all the entities this player can select
    this.path = [];
    this.creepPower = 10;

    this.mirror = id % 2;
    this.tint = id % 2 ? 0x00ff00 : 0x0000ff;
    this.players = [this];
    if (id % 2) {
      this.players.push(player2);
      if (player2) player2.players[1] = this;
    } else {
      this.players.push(player1);
      if (player1) player1.players[1] = this;
    }
  }

  onSelectionDeath(killed, killer) {
    if (this.selection === killed) {
      this.select(killer);
    }
  }
  createPath(scene) {
    const points = pathPoints[this.id % 2];
    points.forEach((point) => {
      const pathEntity = new Entity(scene, point.x, point.y, PATH, "test");
      pathEntity.disappear();
      this.path.push(pathEntity);
    });
  }

  createResources(scene) {
    const x = 0.95 - this.mirror * 0.9;
    let y = 0.33;
    // Church
    const church = new Entity(scene, x, y, RESOURCE, "church");
    church.flipX = this.mirror;
    church.onSelectedDeath = this.onSelectionDeath.bind(this);
    this.resources.push(church);
    this.entities.push(church);
    // Casino
    y += 0.34;
    const casino = new Entity(scene, x, y, RESOURCE, "casino");
    church.flipX = this.mirror;
    casino.onSelectedDeath = this.onSelectionDeath.bind(this);
    this.resources.push(casino);
    this.entities.push(casino);
  }
  createBase(scene) {
    let x = 0.8 - this.mirror * 0.6;
    let y = 0.1;
    const base = new Entity(scene, x, y, BASE, "test");
    base.resize(0.4, 0.2);
    this.base = base;
    this.select(base);
    this.entities.push(base);
  }
  createEnemies(scene) {
    let currentPower = 0;
    let i = 0;
    while (currentPower < this.creepPower) {
      const creep = new Entity(
        scene,
        this.path[0].x / config.width,
        this.path[0].y / config.height,
        CREEP,
        "goblin_walk"
      );
      creep.walkAnimationPrefix = "goblin_walk";
      creep.targettable.push(...this.heroes);
      creep.targettable.push(...this.resources);
      for (const hero of this.heroes) {
        hero.targettable.push(creep);
      }
      creep.onSelectedDeath = this.onSelectionDeath.bind(this);
      this.entities.push(creep);
      currentPower += 1;
      setTimeout(() => {
        this.path.forEach((pathEntity) => {
          creep.appendTarget(pathEntity);
        });
      }, i * 1000);
      i++;
    }
  }
  createHeroes(scene) {
    const x = 0.8 - this.mirror * 0.6;
    let y = 0.33;
    // Range hero
    const rangeHero = new Entity(scene, x, y, HERO, "range_walk");
    rangeHero.walkAnimationPrefix = "range_walk";
    this.heroes.push(rangeHero);
    this.entities.push(rangeHero);
    // Melee hero
    y += 0.34;
    const meleeHero = new Entity(scene, x, y, HERO, "melee_walk");
    meleeHero.walkAnimationPrefix = "melee_walk";
    this.heroes.push(meleeHero);
    this.entities.push(meleeHero);
  }
  // 1-2-3
  // 4-5-6
  onPress(button) {
    if (!this.selection || this.selection.spells.length < button) {
      return;
    }
    this.selection.spells[button - 1]();
  }
  select(entity) {
    if (!entity) {
      return;
    }
    this.selection?.clearTint(); // previous selection always clear tint
    this.selection = entity;
    const selectedByOther = entity === this.players[1]?.selection;
    this.selection.setTint(this.tint);
    if (this.players[1]) {
      this.players[1].selection?.setTint(this.players[1].tint);
    }
    if (selectedByOther) {
      this.selection?.setTint(0xffff00);
    }
  }

  moveSelectionTo(direction) {
    if (!this.selection) {
      this.select(this.base);
    }
    const next = findClosestInDirection(
      this.selection,
      direction,
      this.entities
    );
    if (next) {
      this.select(next);
    }
  }

  placeUI() {
    if (this.id % 2) {
      this.drawUI(0, config.height - 152);
    } else {
      this.drawUI(config.width - 304, config.height - 152);
    }
  }

  // width = 304 = 76 cells of 4px
  // height = 152 = 38 cells of 4px
  // grid:      76
  //        -----------
  //     38 |         |
  //        -----------
  drawUI(x, y) {
    const cellSide = 4;
    let x_offset = cellSide * 2;
    let y_offset = cellSide * 2;
    //BG
    drawRect(0xff0000, x, y, cellSide * 76, cellSide * 38);
    // portrait
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 34,
      cellSide * 34,
      this.selection.walkAnimationPrefix,
      18
    );
    // icon 1
    x_offset += cellSide * 38;
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 10,
      cellSide * 10
    );
    // icon 2
    x_offset += cellSide * 12;
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 10,
      cellSide * 10
    );
    // icon 3
    x_offset += cellSide * 12;
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 10,
      cellSide * 10
    );
    // icon 4
    y_offset += cellSide * 12;
    x_offset -= cellSide * 24;
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 10,
      cellSide * 10,
      "hit_icon"
    );
    // icon 5
    x_offset += cellSide * 12;
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 10,
      cellSide * 10,
      "heal_icon"
    );
    // icon 6
    x_offset += cellSide * 12;
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 10,
      cellSide * 10
    );
    // health/mana bars
    y_offset += cellSide * 12;
    x_offset -= cellSide * 24;
    drawRect(0xffff00, x + x_offset, y + y_offset, cellSide * 34, cellSide * 4);
    drawRect(0x00ff00, x + x_offset, y + y_offset, cellSide * 17, cellSide * 4);
    y_offset += cellSide * 6;
    drawRect(0xffff00, x + x_offset, y + y_offset, cellSide * 34, cellSide * 4);
    drawRect(0x0000ff, x + x_offset, y + y_offset, cellSide * 17, cellSide * 4);
  }
}

//Finds the closes entity to the current selection in the given direction
function findClosestInDirection(current, dir, entities) {
  if (!current || !dir) return null;

  const direction = new Phaser.Math.Vector2(dir.x, dir.y).normalize(); // Normalize input direction
  if (direction.lengthSq() === 0) return null;

  let closest = null;
  let closestDistanceSq = Infinity;

  for (const entity of entities) {
    // Skip invalid or irrelevant entities
    if (
      !entity ||
      entity === current ||
      entity.kind === UI ||
      entity.kind === PATH ||
      entity.health <= 0
    )
      continue;

    if (
      entity.x > config.width ||
      entity.y > config.height ||
      entity.x < 0 ||
      entity.y < 0
    )
      continue;

    // Vector from current to candidate entity
    const toTarget = new Phaser.Math.Vector2(
      entity.x - current.x,
      entity.y - current.y
    );
    const distanceSq = toTarget.lengthSq();

    // Skip if same position or farther than current closest
    if (distanceSq === 0 || distanceSq >= closestDistanceSq) continue;

    // Projection of target vector onto input direction (dot product)
    const projection = toTarget.dot(direction);

    // Ignore targets behind the current entity (negative projection)
    if (projection <= 0) continue;

    // Cosine of the angle between toTarget and direction
    const cosAngle = projection / Math.sqrt(distanceSq);

    // Filter out entities that are too far off-angle (> 45° from direction)
    if (cosAngle < 0.7) continue;

    // This candidate is closer and in the right direction
    closest = entity;
    closestDistanceSq = distanceSq;
  }

  return closest;
}

function drawRect(color, x, y, width, height, sprite, frame) {
  if (!height) {
    height = width;
  }
  const w = width;
  const h = height;
  if (!sprite) {
    graphics.fillStyle(color, 1);
    graphics.fillRect(x, y, w, h);
  } else {
    const img = scene.add.image(x + w / 2, y + h / 2, sprite, frame);
    img.setDisplaySize(w, h);
  }
}
