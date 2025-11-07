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

const MELEE_ATTACK =
  "data:image/webp;base64,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";

const RANGE_WALK =
  "data:image/webp;base64,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";
const RANGE_ATTACK =
  "data:image/webp;base64,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";

const GOBLIN_WALK =
  "data:image/webp;base64,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";

const GOBLIN_ATTACK =
  "data:image/webp;base64,UklGRgYKAABXRUJQVlA4TPkJAAAvucAdECegkG0EOHQvw/kcmbRNa6f25n6XmrYNWJyzBOb8B8DUZj+wg/fatrPWtrZNfAQAUw7A2yYA5D4CwKjnHxQao4u51j4fPyP6D8GR5LhNUxTjI0bPcsVHpP/647Pd4xw99OOvsZPjrcmtcZB/8Qred5bDxXhVOuaUOldBVizAkHpSnRtvGJK09tXrCpKclSks5ni1EAbJgopJ8A/lS1TksGI+SeMjStJzMBUAU5DYEqCWc7sSQy6o5KxWwH1Oqw1Wi5KHg0wR7zdKnuTcYcGH3Lq09fIjaUpydkKzppJbJBS6y7vSNC65XfrP2pc8rnXJcMM9PTQ0co5t453K4FgL2jI6SnFK00Fze/TpSOoVyI76AOLiiiGlguGHk1qBcm7+h9KnJ3k4FmXyrHxIr4Tr0o3lpM9NRhwKU+CJjiR9yxVlslcGixhybRkju5Ou/uV6Udf3z8HYuR8peXB78SJfPIL2xwzIlrQGvtEKpVnv23CxsFx0zpmFTtKzkXyPi2ueGKP4t6WGsvKGhjqF6sVLFxTZ49M+8OfY4cd7UAlcv/yKrJ8KFN/FnQ3AoBOuXiKL9N2CSPBjF1PEHMLTlib1DWRZ2zK4Wmi+q1LZ3RwXfEkBTtJUHfCPqRtWj5J4dyhZqTxBw3jpVU0lOSpAcovkSlokk7QuJGPO5+vlzoOLTYg1JuV5urLeylHasc8O+5stQWdcHl9GnhwTZyV12uuMUktpOeJeHVxPV1stean0qFPahd1iKZ2bZEuHKPqXzVAZPR09yZ7Kgqm9L9q4PScKJzVEJpHDqT5t6CfYuyp1atsYscZwK7HzaQm1xOT5hUrCRY3suDBFvaiR2qS1RA30VPpjHXQN157QGn2gpdekytdT+ZtjTf+vjNeoIMn5dyzo7v2ydtujs70nGTlI9v5gX7NU5A6ldlLuFZPiSXIU8bq3Y+5rhuO7IzLpjNChz4acHWMGzd+woGnd9nquK82X7s482NdcGuufY4HlyX8pfq0IS843MOuF2NF5uUCH/AjlPawLDEMkanaYJEcxYFAUkxREp2e9CDWINbyhuXzRpaJxM/RTkT6tpTTkjRotFj5RIr95+4CzENfsa5gHz52+LCi95wnAeruvzkeVFh9uKX1jgQ/OWvOI0r2z//sAZcpiQmNhr+s+dfQkQYL5GPTkXvmXklElMjTwdeVR15ZWC1Dc8GiHhOh4aHLpdJbUaPmRJfs5ftsnitI0oaiWTYPawWnE/84s9SHBZ0V2BT8cKwDLGCLZkHWJW+KvpCiNsWQUmN46V28LJ8W8W1szpnTQV5T2I9lP2AbFUvQDg1V/4Pe2OBO2cdiww6aSFdS3p5Gan5MP1VfFN+GNU8rz4k87jnJ5xJ598ZxXNTmymgp5bhfoRCi5hzkTupHSYXyU9sJd58kxRV7cUq0cRUSOp9Dwx2Pe0TlIKrAisHmaD921v8lNnSRTKm8MYrJ5TbKg3HqkSlsweKYW+8wBtieixmsnOe6YYsFdDfZcJEbbcwfS1oCNDR/6cCmRvy1rCGFpWVdAZJwW5JLl7WRKPU4Oa/K402PxBXeQRr/sF+/ms66Os9VgWQtkifCyoUd9c0yet3MumNRCVtJiCFnooLmsg6JMmHoUv3v00sGzu1xCta2Kp8vYG64Ruvi2PTrSncXRQmhuaCbfCD0T5OI2FzckA/FFzwvor6IRen4XN0ec71YipA7PMf31cTTmX6v+7bB38b9yq8q3HeW+/CEzVCUqD7oO+qgW/MKsExFTD3fQ3mwp4M7yO7P9It9mh+U/QUH+s5zk5nXpx+9YUDHdZdkrLC93qWTnyqgV2V/9qnTMhFIFkeXO+0dyFvH9wTKGClZDuo0yk8U0wyRbNgsGWMUwHO7Qik2HfJ9bZqVpdJwco1utGoZEi2+V5tGdBWZo3XzLbL1Yhx71ItS2aRy1pQxaOd/4plGUfO+Y7XYt9XEDYTG5Z5nWOAwG6/+Wbsxvx6xYc7IwC2go6eQWNJAHz1v4I3UX3YiAjligRVHZDD+cXPyHz3u0NZJx6zbcBR2NgtocdroMFY0hnbS3kLTcpaLiEbGqY5t7eEtg8T90bDJwvl6/kqcApU9niwBthhXEFCnFtc4xi2+ioHJUu7V9ph5LF3vUSfAm+aiDKm214ZgCVpHKOaYINwv5Z386jY6SlRnPj9x5krRBpgfO0VOqIe2bqs6LcOVzNT2a8fZ6/civLCRXZfG115s/4dFzrDjDrZKWlkHwJM1xtOePYWyWZ2H24ptqw77bk7EmJbueX94KpjhCDAxtXimeHrx/8neLnLRUFOVNfiLTRU4pnFAr3ydHxdFWm1KLGsF4bms1MflOso+vKY64mlHrQ4YYDg3FmBuV7rk7t7TbEFNfnsVvfciNeN4hk1TslhZcUypWMVN6Aa9mly87j2/JXXCS9sNAKUaaAJMUDF3p6B47rdej2Dv1qmB6N9PJyO6YBGdnVdEvvhYZu0wRt2+nCXh9Y1W3D+3OdGb625LDrXoDbpxZgp3Vz/vjpI0dUb26nS0YbvM8/X/8gr2tnRdIinJx/IKUfjtTet3w+I8ar7HH8cvdXZA7PbX2rNahtz29COIk0NZSDBWyVUrFoEHFjQL1ttePTVofqiSAXuCOmI7V8Pvq+0tZH3OH+xHT3gnpTsHH+k33LmlN0dUX+JOkDyrGSHjYjsYoiQuA+hDARZQZfcj7G7TDmuXToawPqhurrADs28PWDvvFW5d78Fi0dsxKEppaZYTG4wa1gz/4xmitSWv/7cedt/sbNEqJyR2E7441qbSzoriI/cbqb5CsNq/bNZW15mtAcczOInNwCCubUupv0GOICavN6bBXtMxck3wJRNhAxiqp7YfufKWEKvoXHIVlRgmI7cIQAbDmXn3Wi/4GIbCUi+M9KKUVk4OBCvPMjYoeFT0qYMBX3dY3Ars1pVZxevbcJAW16EPMewyd1VyFn16CrXpi/0oGMGEb4sG3o3CTt7dZ/fTaZu1/smYpkbMIjanUOuznSMmJxuEhbVN8M/kzSkqGiQ36+j5RnOSYvjwDaf3SZvFMFLDOp7r2ixflhSxz1AJKylRZR3/ChSfsxSob67wsntxcjOAxntwiCwZUCIkdsCQHt1YAwfOkC33QU1rPVdoYqBua0ya+uVZaYMdSQ15pmdIZeFZyQ3ZzDhXBZSXEscLVdxYeNAp2dliwNvbASXIEqPoqr6uzmoVmTpU0Ia5I68HqUCVEbpVyOF2G4ZTXIXkrC+AK+WnRo3jds2odOzXFlSQlhys0ArOykynWNYScxU8VdVRgEhKiJBe70z4ualwjIcXUC7mpHL7rQ2fkdGvUgKm1l2LuhIwswLJGdkzAPZ54p/acqdldxk7Idhqo/RHk9KvxqZ0pfd89j1f6K8N9h39IMQEA";
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
  this.load.spritesheet("melee_attack", MELEE_ATTACK, {
    frameWidth: 46,
    frameHeight: 34,
  });
  this.load.spritesheet("range_walk", RANGE_WALK, {
    frameWidth: 14,
    frameHeight: 25,
  });
  this.load.spritesheet("range_attack", RANGE_ATTACK, {
    frameWidth: 26,
    frameHeight: 32,
  });
  this.load.spritesheet("goblin_walk", GOBLIN_WALK, {
    frameWidth: 15,
    frameHeight: 24,
  });
  this.load.spritesheet("goblin_attack", GOBLIN_ATTACK, {
    frameWidth: 31,
    frameHeight: 30,
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
  createAnimations(scene, "melee_walk", ["up", "left", "down", "right"], 9);
  createAnimations(scene, "melee_attack", ["up", "left", "down", "right"], 6);
  // archer
  createAnimations(scene, "range_walk", ["up", "left", "down", "right"], 9);
  createAnimations(scene, "range_attack", ["up", "left", "down", "right"], 13);
  // goblin
  createAnimations(scene, "goblin_walk", ["up", "left", "down", "right"], 9);
  createAnimations(scene, "goblin_attack", ["up", "left", "down", "right"], 6);
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
  damage = 1;
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
  attackAnimationPrefix = "";

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
    this.scene.physics.moveTo(
      this,
      this.currentTarget.x,
      this.currentTarget.y,
      4
    );
    this.play(`${this.attackAnimationPrefix}_${this.getDirection()}`, true);
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
      creep.attackAnimationPrefix = "goblin_attack";
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
    rangeHero.attackRadius = 0.2;
    rangeHero.walkAnimationPrefix = "range_walk";
    rangeHero.attackAnimationPrefix = "range_attack";
    this.heroes.push(rangeHero);
    this.entities.push(rangeHero);
    // Melee hero
    y += 0.34;
    const meleeHero = new Entity(scene, x, y, HERO, "melee_walk");
    meleeHero.damage = 100;
    meleeHero.health = 1000;
    meleeHero.walkAnimationPrefix = "melee_walk";
    meleeHero.attackAnimationPrefix = "melee_attack";
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

function createAnimations(scene, prefix, rows, columns) {
  rows.forEach((row, i) => {
    scene.anims.create({
      key: `${prefix}_${row}`,
      frames: scene.anims.generateFrameNumbers(prefix, {
        start: i * columns,
        end: i * columns + (columns - 1),
      }),
      frameRate: columns,
      repeat: -1,
    });
  });
}
