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
  "data:image/webp;base64,UklGRqoEAABXRUJQVlA4TJ0EAAAvV8AZEBcgJEgx3eEKBJIEVp9ZIJBksPPk8x9Q/cGSs+1xI0kvhaSA8Kqqu2VA2vUcEadgz8OKCYhCS6seLCPFU7iq514xC5YBe+UEJCP4HzPIGNAniOi/A7eRFMm9cLAQ7f6CV8fw6nwA0MBBZQ5Z2QAc6qTM1m8KYBEFa2J6gPWcPInGSA+EiwYjfRKlfDYpWC5lMulX+ES2iU9EtljxxQtWfJltqhdW+dkLlnnQ2DgoWLNNHO64lq3TGOcUtL4C49wG40c3YruM06SEOzievbDESw3OOVKChrCKV3FYa4yXsyJLwK7SqVV8RRA5KWbxNfx59SflZF8pe5PuMykBrrOfVR8HKe0opwsuDj/9kHNxqFSYZS7o4xA3XAd3U/3aPWKdXws+rd3DB0ycOz4NY00YnQMzjI/AFEqMn+Bwm0swPnuDvXlWtcDyueRFgqlMhWl2wPEXJdC0CsyDaRL1gql3CqgzTwqWX2zJcl8MugXsoUl4/4Q3GG1URvFUAEQFLN6UGM2hMJctYE4lEL3asHhMeZAGCLEBzqJqoldsggzANTEi+j4dSn3NLDKAcZPepUO5v/ouu34HB+n0NR3KbpEJePJ94ovwjXSaazt3QDs//gDjfHH4VnxBWP1D9qV+UkYc5rfu2eG7oUouOjQ4p/ijONKpe8C4hqj6c0ntnIL/iQeCTIQmXkru06H0MmQcxLjX7NKhfJI18T2E2JVc476Cox+Bo38EkhC7mtD7CY4iNbCsms+xawgf3cRRulUDdlVmuLkajDwcZBtuyfEGv+iqRzCn0lRYVwJPW2CtaqC/A8IvtsCfeqCtAFwJZqAHrAN2SRgaoGcE2hGMc9m7qwF72ALHDugT/qx5Y1rH+ydk7t5MiA0QRL2RYGQAFtFvJATxQJTy/5QwZPQbCX+WQcFNqlcTslwFUbZvJbgxe7rl6wnWZrmrVGCzn1fRhNN6KjG9n+CcEkJKML6LDWGaRXHu4iZLgHiTirCKUziRBruKKE7ej9gog2KWS4WN0iv+FbuaP0eZFRe51FyjnBXDxTeERaLCy/DsJrPCT7HhOu9T2NQ9m/cptzvXXMfZw7GbG8zoouI4OE24zT+DcJIN7KKA1Q5ovziwsi1g8T+F8IsbcJxucKiqZ+3HH0LQi3o2dGDLvoSd3cOxPCqYThVYPQHT5xIWnbQ2MwLrLzRYLPCV0WDUV0BLNhjeN+FVhdUAVnHluskSNIdiaQBiw47VAywNQcU9YKLnnihZ2J6riaLAiKd+kRBF7TJYEbV5VuTuzeSSyf2iNGNmcqo2s5RgZ/m2MBcpIR27MZIconynzOo0GJHfllmCPUT3BYZss7p/FjgpmXAygosKcHJSpncqNMa5e8zeAaZ3XwjeEVXYjzVGBNKxO6xIaLA3v8keLFiRe+zso8KefYk5ZWZfE06+gTB7hRlEw3X2d4TOq8wFzpNoFudrZfoJCMMlwOJW0Us7nQp8BRy6ETjeWP3i5kLRNwDrAzAdwV0/TgrafaYCU18VYCtgcQBTDba0DdA+AK0GqCaw21AmTsFUAfTnAjMZBbhJwdwBzIpssg3ZAAA=";

const MELEE_ATTACK =
  "data:image/webp;base64,UklGRoYEAABXRUJQVlA4THkEAAAvicAhEBdAIEBR2G+/mrYNmHTx/4pXQdoGTPfUz/T8B2Db/0DZ2TapsfMXEugcrzKBZFaZB19FZR5WRHKhQ60yGKvhKsg8rIjUtNJesTBW13+Z5vt/OJ1xGdF/B27bRhILJHPsYtzjFaSOvXMupeccD8zM/jFwvoqRzoDNCn0mjWijeCqEVgmJWMthELdG6IRImXAMLLNkuZ3fjfI2rEF8gcm+q0jkrGIpBJhsJ5NyJmcVdxG6EesRSSmaSmMNOjCDJ7OCJoGcU4zMsWJM9i4GReW2TemcM/MGtOBVmFYrD9PhcuJWbKYNQG7HPTcosK9FsfP/lD/2zYBLsg/s8DHAgib24Fk4aX+7tDmIZl/VXIL3Jm+6SPBTrpXxlgdQXREJgTNNMbQONOWg2N9zrJZSRNr7oJVJHEj5twuuXn7WyuRVFIYEMya9VganczbGxKaPlVlXk25rc3AbaWyrs1JvxkSRFrqdQARx5HrE6k1KWgpNEdPaoZbkuVlz9V8xbPQI+gWFWZVgIl3I1yVYmC37dQkWXNp1CRYWhFuzOoGyIs6bVQl0IzuzKsGS08oE+s1wWk5gy2FB36bLCbpTm2o/25F1DmkJ7FHJwhuYzWVekoUEtUzAO5g5S1/wUSgYjdDpwFWMPuZKElmYmch2R3YJ+owHOVXM0l3xrj9VnKbomSpNJea6bNKdOHlNEAizWOR7l76H23EsJxJEFtBek+Yx9tdOGVKynJnhrLkt9rwYFK7CzwXmOeNNg92MVS4dDnLV4avVHjvZPFVu9kY/PsfBQKexkrrjAqLWQCfqM1Lakjnz2VxZUuzp/9p4AbwL3lzwVKrNLJ9ZTlQ9G2TbbD5CCYbJVGeORcY2vxoNhslVgRM5DX91Q48gFzKdvNm7Qb6hP7lUXTiVi9HOb0QGv1AydMttId7QwW1VlZOP3XakXMZMVJO8qbh8/zuRqA6pumNV2yB2dTIZ5NxR1QxscK/ZH2tlSo1qYoeRB/ZTLjiuNF8F9lju2Be/S3eZ6kGU7o4zaxJ0r/9knPgei+dMOZGhiVV3R9QdayVx710OItC4C5ZLmUuheR90BInCJJb+/L7UnXhTwf/ForVOnAezlZMObTibq3fF7nxyMuDGprIwM2+IHjZ401ovpmGVg/fAOMTMj3aLGb3VNhtFonuBUnpF3QNmlhGSmGJ6zlHQf/948zGcpb25WhmiLw0KCVgVwooUlvG4KCHWpCi4BUqIhRSPyDuVdzrv0MRmpoVYkaJnQQmxIkXROCxKCD3Fe/DZgZESQk/RwFdKR8QcoXLhJ6U7wgHAb/IOZu1TASMNyeyWedbxBhZmt9Xciv3YT6eISLwspvwJEJE8qCZfvzCXuY1THmuqKQduyKvQMTO31zJ4lRuA9e50rlnoS58BEUkaCga7mWOjwql87DdUgGtUW/s/YN4yEmasYvgUnoP6Jwpaq7B0ZTLvztyv/Mn0SuvLBBQfQxRceuu2pLXiS+miHpjyYkhph6FBOakDsgThdiMCx7pi1kdKpP+SQQA=";

const RANGE_WALK =
  "data:image/webp;base64,UklGRgQEAABXRUJQVlA4TPgDAAAvN8AYECdAkG2bG8Fs5nCHE2Tb5saxjOkQV9O2AZvKVTgLU+c/AKb/bZYDirXtBLWtDf4CAC0AEwrQhAKuIf0XdUWH978GIvrvwG3bSPLM7L2E5hv441Gdv0u161g+S4fr0M+SDO8av0p6H8u/kORe/AdS1b9L/FGS/0HSjxLJX6Qqoqr8USIhVab6TbJ2T8p+r1z07v1OiJptX6ReyyDiWNdB06aK2WtILduCSQqopWWLcwVFoIcRAPQ8AOCK03oWAImw0yRRAECLBQCcOQB1BCu3lHsEYPEsQJXk9zzYCiTPHqY3U6FPb5CRwyxhOqaPOeDPR9Xp/kD0rHiTRJUnacySvklHV9WI2lU5zhUvkg1XXfAzRn+peJFUVW6vq8a54kUSEWKCiIo+K14kIiKNIsIkz4qHVI1IdTmIXyseEsxItMHsteIpVSdRhflrxVNKRH4p6mhlCBLRGPqUTlHfFHUXV8VBl7dbslty88GKi/vNXd7pTRrDhQSXO9HvRudVbklZUDvTSjhG70KoXddGSF1VCNX7uUWkJptwza5kC5Kr7RGUT2q/cyeOR8knjYiUr36P3SKQpMUFdaUeLKJSaxGoZUQAlagAwNUCgLO0CCCx3DvKztPWaWsP97SuQDpjkgCA98mlMwLQdruHBkgEdt5XAMcs5WwNSBKSR2A0K9PHvgEAcpiklAGkuQFp9irFP0gyOH6WqqryZ0lUtcfvkvc/SL13XT9LrPxdIiam8lXaiZm2j1Ii9tbCV0ku940+SpLZezk/SnQ5l6FfJXW1sdGYJX2XKo3mXD5KaOLO61PiW6I0SWvK52iUn1I7RytzRck/LZvu/pDqJNlPf1TIurPVPksu677ywwNZkY1Acku1SZEVgBVpDFi8VgDnNkkWLU4V5wbgDEcEUJdJOoMFAHWrCwCJ5/SwTtKI570j3g/Jl6sBsO1qU4Xd7rVeDqQefvpUsRcAGWMD4FvK+PMhnQGgUnxUvElVVSNQxyzpuySq2gFS1faoeJFUhw9A1Md4VLx5ojpNnxUvUiUWkXuiMle8SMJEJDiI9FnxIqkyGU0V/Kx4SLUrmUWoslmsXelNOlTJGqYKf1Y8pXE1KjhsJWccYzCVpySrd5UgOjrtEHbfZZImfgy3/26ujSBrE/endJCYj+VgsruisPoIB+kt1cKkDVWku6LSpnOF6gaUfvrvtHTagEEyth10ydgAapL3CGLzDTCWnAV0es4AzBpHYKFeAItnKwxQawQAthKARDRV7B4AgDYJAIRWAJWzAEAe085NA5D4uHcWSAZA+wIAspfJ3fsCSMSpQOKdwyTpPS85ALbhLEAy8gVIPn+cpxtLGY9jCsgZAA==";
const RANGE_ATTACK =
  "data:image/webp;base64,UklGRnAFAABXRUJQVlA4TGQFAAAvTcAeED+gqJEUNnjUZ9UCLiASgMySTeCB5AU1jaTA0fugpMYMDpj/ACDSjctl49ie+/g9UNq2vWrjfMWDve0x3XI5ddi6oTbb6SmzZUiRtmkYfdq6otL7/0HfB+lxG9F/CG4kKZKiFo7PDa+gbAraMltEN73qDaJOL9AbRAe1E62I3tAbRINapYNoWIHrRV9uXlKEUQ3wW0UvABQ5AOxXRCocVu78kl0R6XCobvgVkQ5HKUpzvE3UJQBexglsSBfJOMEzyZjnVkSyeWTOMyevi1bgckkMn+DLTSIHMLAXbgDw+xWRhC9j5C4smRWRKKkNDM9sdkKkxwnKDg28TNxtFa12WRMpCsfyZjnHPJAqkkuibkmKurlSQSwZqTDsLqTIzZ5IFSlW6t1AsnONklZESnFo9YqtIkI8aIiT3W0WTbHUqlBuFhFOekOxVUTRllpxVaS3I33WRP/YOW6v0usOev1Be9Y69aTX11qB1ELhYTW4g1VW5+BLBfQCQF7H+KohYgfAKFYA3gpErSGqOgI+yc/7ucQiOwdW3VzKJXl4Zmn18D4vFPCwWtYa5lIizILIY+ZBVA0d+5lkMsQvHbNJOeK3wjhm9nmeXDtw8lkPC+IpR6Do8GwS8rcHOrd2wKKInrNBs5t7JcLECfu8huBdXBTvfzhOPvknAHNjs5vAqbVLZ57gOWE8CMTIV3ZLnNDwtZmes65T6xMQM+x90/gE5ucsa6++hRdfniw+DBezVNPNAlc22ZfPwNi2bu4mduuC/RLTDfDPvJe1X7lhAX3niYBf0ZTZeRFF+I9mQaCgCOTUmbPUplEiEq6Oaa4vaIKdqVmhoLZp3SARl0kgugM9NraTl7EgRNtRVgWKElEdqAeeO5IKGyyJ6etBQZyoH9BLUSScbKEoQi0RoejqWMq6GoegKKpYSERVd/OrjEIoe0VxQ6EgOtSdVapORbQK4qghqvAYbEHaHNcRmpb+V2Z4LbW6YbPopYbdK0+GKTeKXA3vFYQN3mwUpVQDn4n4YbOoS6i930vRA9ZFSv2M+AtELvWGZcy92Sj6PMXe8U7CXe/MmkjEsb9EsQ0353vntomGO/TtVeZt37IUfauK7uIfIdx9zLu0qQ93oiuSJmIXU2hFd09XvH5lRD5pIv4UQ8LvAvF0/elPibgCmsg9wQew6PrEAaP4Mk+a6PxLGsNYKif5wQ5CRBGaiM6/GjuSmAsefvGKKCZNROmpLWVdQms0UdJEFO57Ugb320Uh6GG76IZHrY4fV0Rqfav2y2ZRhb5W12fqFZFWsFZD1LVdE6kkW2ifRBSbRacjKfXB7jaLClqZFdF/5lRvqdCrVcOwUtAfNxVxXHsocgdfWhURT8qpJphbqRhgVxAoFCsg5TcGcKpVRKhFfsGKb7ulgyUNUYs6nsOtzDPwOIRCRVhZREJVixzzXpZyhGhg5rwXz8zDvn+nIn56l5WY2bjq16UIYyZL4ZAjPiyI2z57h3cXlBUyKjhNB3op5s7NOHI2WJYEzy2IHhaqnzhh14y7uQnTU8KEer98GifPaM/NVZwj8wTeL9nxmTnmCLq0zchXeF5WdAFaY/PO44jWtE1T5NswpTHGvPj8CWjzL7+4ISkIMtN0BXb5lyfP2SQ7I9w3Wa9Zg/l+ktEVnxZD+LDsFpsMlJ/XC18ASxUya3pe6gX8o0Rka4poqTplVtO1TUGWNiCIy9jcU37lum6CLagmDRHKvPICnOhW5KRgh6IqSSAwHC2JOWE4US8Q8WQpFAqitoWss6Gs6rzKVnY2KAiUJAtlKCW8m0VWc1fHWimWQcH2eAxH0hBHBVHF+r4uJCLjbEPQsaB/5BA=";

const GOBLIN_WALK =
  "data:image/webp;base64,UklGRl4EAABXRUJQVlA4TFIEAAAvO8AXECdApG2bm4PB8Ss4QbbNBjHGyx5KadsGbCqwqGzNfwBSn7nYDxJrawvb5oNoAAlrAPj0D5CIDCD9/vYfSvyS004Q0X8Ibhs5kng5uXS7v8A/vxzOaTDzP2VQ8kt12fSHjIMyAjAX818yJNlFkv57htlAuV/oHzMOc4k2iZL55wyIIicc5kbH54yTpCfMRnIFjseMCbPsYjh1UQYfMyxViS4ll1Fa5w8ZU3VJYqIkWalhiYlhr5zFXdaKNZMK2y2DMeNMdCt1XSvF5GceGa1YpbjwLJvbdhbbqf1l57K5dS/6GRl+Wu99ZOy9981uGYkxo+7PGeu5DgCGt+G7c+85ZnxhXh690gU12HDBvOfvYENPQCsAL62Epcr0/brUDSwAV8DjAS9BZQJYAr/xaL5YihkZmBOwpHEgLAGohnDkv7yY+f3A49LhnMKSng48ZZjClWqmfD/wlOHuNkiRFEiRNOji0/3AfenQRcAhN073Aw8ZMtGB310kbgcelo7tbcyAJCNuB+5L4YvIfMLtwG0poAAcFPP9QFwqAMyNCaikr5d5HIhL4fklFSNlgWRxSeni0hoedtMgmcKSPAOnZFG5ocW589JkvCyyYgDgq69Ac2Odxi7PkdH7uQ7dLQHsfasr8N238HTf1O4F0RkZLlt/JYyMpWdg2ftXy8A+asK7N8KB+s4Afl9fwGUbjQBbfJgzGsNeGVrxHPYWJqAxYWbCwoUIu+dwWrOE8DM34FRjOEKGM3Aivizjii8LxvbikSw4lP+UYbJpVLj8TxlUOFBdNv0h43AXAZjJ8l8ypPAfStIfMo7gwBRMnzP4+96NMO/2Zv6YAde7m6Pq9/fN6XNGdTkngDJzfM5YzFkS5pPGBcBjBjCLpAynka4M3jJEOlOVXZRcwzp/yMiVMjcmuiiWqscMrY0uGQspifyYcS4X1nVtkmU/i0tspYyM4meixLau1WXLLUNFzWXJz7X3/lbRT+/d7Sy9982LjYxXzOi3jO2WsWDZx67NP33bYwb7K9XSt94BjIxtRe2oPY0M9C+g9rwPP7eMAvDSCloGwFTXS11jDTEzA25gAWblSozI2WPNrDVwAw7l0xLgFmtWwKLzMi84dZFhSfj3l4M23ZYCiwfMPS7Jn5ZQXQyRClfczJ6WYPKxV+WeBymQAkkKpIsumu5LOBj2DpMkwCh/WkI1H1cOuoVZ+u8+3ZdwOH+3L4DU9h4kDfEL0MTp4uELiGFPDMJmHkse0M2flkByvGsMs7NIxqVymRWfHDcyhaPmcangIWOWNBwmWVxaL6dJupikYfWhmkd02UDZ+GKl1oRZRXlYbhnNLfz7P31LQNP+BcBT71sB3Hq/Gwd834Yc1QhL34b99dMBnLn1rxT2er4cPbzz7XssAXvIwL4F1VoGKhNYBu6vwQvTpZVWgPB9JmBmszS0jMGaEqpy+BEqqTzmyKF6mFsSwsu8tDU8dGUBAA==";

const GOBLIN_ATTACK =
  "data:image/webp;base64,UklGRm4FAABXRUJQVlA4TGEFAAAvXMAdECegkG0EOHQvw/kcmbRNa6f25n6XmrYNWJyzBOb8B8DUZj+wg/fatvLWtraty3IAcHAAWtMKQLgRgKbo+Qe1Cwx5na/fEf134LZtGNG7+tz+RP8T+eyx00Oe3zvsR8RD/uo77bm2z/STzuhLsNwcDm6b/YJF0ulZpRH543lutrsrDUk6n5I2PwRx0e1noBnG0lPSZd9JfIKHbnsNnJJsP2+9u9voY/s5mtLdAChllCt8gofuBkApk8svIKoK8PE61tZfQFhHH7+pJQCu6UGf8Ztb+vhVgTw7AJY+TmkrFciBrXegeBqiAuXYl+n7bVC8aE4ar9dRagCNPj3r5voLB2Pew/GVowDUMqqjrClpUBTkXCuQXpMCoCDpVW9aR7nCg3yLCjxCdNufWel2i/3aLZTett3WmW+Iy3ZIm98/fmpMqra9RDaXP37eeMhTS7/W4UfsIe+hA6kWTfldtcUqUi+hilSZHCxKhIMiVWJNqm3WFyXW0EuqLZSylJZJYlHqobRItejvkvX/JT+Pv5TyErvsyPmUUl5iNEKb7agsiUbcQFhXYG4grANYo87ZLeqndADr9xKtrEFbX6jE8wOMPavczNxjFVjirdxv/HYgeImdg98OfH19wjRHX13H+3p1KPO2JNWbrdTpr0lya/eODu1utAn8RtdndPSojgzMClBuJPLNw0GbbZXi2l/ztpQqdGqJrqHM41ELlRaw+tCVQO7RkMjzw2nbTxfRScwP2x+7vgKVRl9n+7Uv6m65Tzb/2HUNHEAtweGn5O48jcv71rwrSKKVg8hjMP2/7Ke4WmSz91CTVN9tdNp+iEyouR3ReEuqK+ug202VzBIelyXNVulgrUWSNttv5UxI/LQl0B5Syhmm3R6SclaUurIG3hqSsyRd9lu3OVhr0ZChw1z/9L2UM4wObn46eOur5Kxv86P/kmyPv5DzN+xJpdw5aOWLtsdKdNYbFbh32s/BAbcFsPynXfb+rYXWWeIvdFRaI9906y2qBJI8jURvZg1V3CFoOiWiCrCEEsAaNgweg4TvrlOFkm/1WQVqfPQCeLi+oSGm08Pr1AH6NFPFjarL+7QBYkD4QLcp+niN1NAxKpNKh0XH9HIAnfD6XGmdPEt0inSOW0eBEjtK7Y0UHBVYdT4n2D8oysFlu74mnU5vyzm+6Oi+Shmck27b05EYcz005s/V+j7wWNnvz7Uvo2OQuaZDlz3yc5T8uPyYXwrQlN6T03Yrkjy1Epf3dbYCRcpT2+5Gp+fWcdkUjemF3l+aczqIplx2gwnFduSy291vs/3+bfOozW6Bqee7sb0qyGldnm23PW1FuXZdwbF197uf7lqsqiUYfWxF6Td9sKiyzH5s+6kwV4u7suiM6Lz9aXvoP5yfx9/J+c5mP0MpL9IZOLi5lk7b4Y9WJD1nFcqtuA5AkmcAd6O/8m+gAot0DvUdfeg87k1VAZYbCVjCzSrJ/9SolzsH8J4k6OUpyWMd0PsX6BFa4IvraVPmhwp9kXTO8+Z60vJzkoE1kkxHNwHa67WMw/y+FgXzaHdjun7XMjgatawhKDU0zcKoQqmMnqN2e3Ro8DvodKAsOicvKHfdAJZteKECR/+XbHs8elnuX/J4p4NEe+m9n5PUfr3/idVCY51t9q7kfSJ+vV97iAIso8ThtkuX7fFhc9s3+xG8sNDRnNPXLp2eHf6scvSllrtb4PBnlbZIqasu28HIbg7UUldJfVZLZTlsr8FVjLWySJ8AJS9bt/fZ0Y8yS5DzIh2zlBdJn3DWUtfgyFnSOHcF2br9mB/WyqLbHDf0CSRI+Qv68AhtMI+c9W+Itof+AwEA";
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
    frameHeight: 31,
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
  createAnimations(scene, "melee_walk", ["up", "left", "down", "right"], 4);
  createAnimations(scene, "melee_attack", ["up", "left", "down", "right"], 3);
  createAnimations(scene, "melee_walk", ["idle"], 1, 9);
  // archer
  createAnimations(scene, "range_walk", ["up", "left", "down", "right"], 4);
  createAnimations(scene, "range_attack", ["up", "left", "down", "right"], 3);
  createAnimations(scene, "range_walk", ["idle"], 1, 9);
  // goblin
  createAnimations(scene, "goblin_walk", ["up", "left", "down", "right"], 4);
  createAnimations(scene, "goblin_attack", ["up", "left", "down", "right"], 3);
  createAnimations(scene, "goblin_walk", ["idle"], 1, 9);
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
  health = 50;
  healthRegeneration = 0;
  mana = 100;
  manaRegeneration = 0;
  speed = 40;
  level = 1;
  attackable = true;
  generateResource = () => {}; //to be overridden by player
  onDeath = (killed, killer) => {}; // to be overridden by player
  spells = []; // to be overridden by player, must be 6
  walkAnimationPrefix = "";
  attackAnimationPrefix = "";
  attacking = false;

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

  walkTo(entity) {
    if (!this.active) return;
    this.scene.physics.moveTo(this, entity.x, entity.y, 40);
    this.play(`${this.walkAnimationPrefix}_${this.getDirection()}`, true);
  }

  idle() {
    if (!this.active) return;
    this.play(`${this.walkAnimationPrefix}_idle`);
    this.body.setVelocity(0, 0);
  }

  attack() {
    if (!this.active) return;
    console.assert(this.currentTarget);
    this.scene.physics.moveTo(
      this,
      this.currentTarget.x,
      this.currentTarget.y,
      1
    );

    this.attacking = true;
    this.play(`${this.attackAnimationPrefix}_${this.getDirection()}`, true);
    setTimeout(() => {
      if (this.health > 0) {
        this.currentTarget?.takeDamage(this.damage, this);
        if (this.currentTarget?.health <= 0) {
          this.popTarget();
        }
      }
      this.attacking = false;
    }, 1000);
  }

  takeDamage(amount, from) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die(from);
    }
  }

  die(by) {
    if (!this.active) return;
    this.play(DIE);
    this.body.setVelocity(0, 0);
    this.attackable = false;
    this.onDeath(this, by);
    this.destroy();
  }

  update(_time, delta) {
    if (this.kind === PATH) return;
    if (this.kind === BASE) return;
    if (this.currentTarget?.health <= 0) this.popTarget();
    if (!this.currentTarget || this.currentTarget.kind === PATH)
      this.lookForTargets();
    if (this.currentTarget) {
      const distance = this.distanceTo(this.currentTarget);
      if (distance < this.attackRadius + this.currentTarget.hitboxRadius) {
        if (this.currentTarget.kind === PATH) {
          this.popTarget();
        } else {
          if (!this.attacking && this.currentTarget.attackable) this.attack();
        }
      } else {
        this.walkTo(this.currentTarget);
      }
    } else {
      if (this.kind === RESOURCE) return;
      this.idle();
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

  onEntityDeath(killed, killer) {
    if (this.selection === killed) {
      this.select(killer);
    }
    this.entities = this.entities.filter((e) => e !== killed);
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
    church.onDeath = this.onEntityDeath.bind(this);
    this.resources.push(church);
    this.entities.push(church);
    // Casino
    y += 0.34;
    const casino = new Entity(scene, x, y, RESOURCE, "casino");
    church.flipX = this.mirror;
    casino.onDeath = this.onEntityDeath.bind(this);
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
      creep.onDeath = this.onEntityDeath.bind(this);
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
    rangeHero.visionRadius = 0.3;
    rangeHero.attackRadius = 0.3;
    rangeHero.damage = 100;
    rangeHero.health = 1000;
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
      this.selection.walkAnimationPrefix
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

function createAnimations(scene, prefix, rows, columns, offset = 0) {
  rows.forEach((row, i) => {
    scene.anims.create({
      key: `${prefix}_${row}`,
      frames: scene.anims.generateFrameNumbers(prefix, {
        start: i * columns + offset,
        end: i * columns + (columns - 1) + offset,
      }),
      frameRate: columns,
      repeat: -1,
    });
  });
}
