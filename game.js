const ARCADE_CONTROLS = {
  P1U: ["w"],
  P1D: ["x"],
  P1L: ["a"],
  P1R: ["d"],
  P1DL: ["z"],
  P1DR: ["c"],
  P1UL: ["q"],
  P1UR: ["e"],

  P1A: ["r"],
  P1B: ["t"],
  P1C: ["y"],
  P1X: ["f"],
  P1Y: ["g"],
  P1Z: ["h"],

  START1: ["s", "space"],

  P2U: ["8"],
  P2D: ["2"],
  P2L: ["4"],
  P2R: ["6"],
  P2DL: ["1"],
  P2DR: ["3"],
  P2UL: ["7"],
  P2UR: ["9"],

  P2A: ["i"],
  P2B: ["o"],
  P2C: ["p"],
  P2X: ["k"],
  P2Y: ["l"],
  P2Z: ["ñ"],

  START2: ["5", "0"],
};

const KEYBOARD_TO_ARCADE = {};
for (const [arcadeCode, keyboardKeys] of Object.entries(ARCADE_CONTROLS)) {
  if (keyboardKeys) {
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

const ARCADE_DIRECTIONS = {
  U: DIRECTIONS.up,
  D: DIRECTIONS.down,
  L: DIRECTIONS.left,
  R: DIRECTIONS.right,
  UL: DIRECTIONS.upLeft,
  UR: DIRECTIONS.upRight,
  DL: DIRECTIONS.downLeft,
  DR: DIRECTIONS.downRight,
};

const DATA_PREFIX = "data:image/webp;base64,";
const CASTLE =
  DATA_PREFIX +
  "UklGRt4CAABXRUJQVlA4TNICAAAvK8AKEGegJpIk5Rjii07Ax+xf2CtRU9tqw8hhrgogRUD3P0RNJKiJJLf5TjlUgiAG4o/FNFzNfwDA6Lc4GBBFgPgqgd9ob0nqj2f+8+6CXPf/27j5p/dEdJMPntLbFj+BE7nBU4pc0t3LFAYHkMJNLgBJcLoCSASnFNtJNqUdhX+eTuJdXiGi/wrbtm1k1BltfQgABNBP/fKWT/yHT15e8HLkPzUe8eph3L8sb1R5wfzRxnDfOr8xPwzw/jBefwFIkOAlvPRv+fDlRgwQHE3Gd0ARRcx5c8GSl88mR0oOf2yQTFtpsFv8zsTy0cZAySihQ0LyAyGFEDJthDQs6XIRsj5KXcKHSpCx8Df6cpglUVRZquRdjtrH3cPadGX2Ixdd6/foXDrDzwGAwAn0VFjUWst8okJpitYD0SLqnFYYpN4zaZ0X65tk1O81elB62lv3wRaoe4xL74lGTxp3vfUoTihrEC1W35zMvaDlPz3fvHiN+UrF0xEqe47WqDV5eRYgmI8nELWzTqNDRLu8EQPM78zHWYHOswzdq8Mf82c+bfzYiP9omemekJc/4o14+Wh9fj53iM7D4uHLnfl5WC7f/XRjY5jbfAw1kvmX88NQPCWMNGvEEEJrTUV2w3g4hMwodqB5w/7GA64UUhQ8BOOSeidLTWLSRJnUNBuSlfZQsUfjT8bHx7130V5RS0KgNRUx2VVCo5RS8rRb46chDzmrMy75XJRxxoWYG+XngJqkzozJZlvYNsakIjUlTZtMi9Gm2a/tula6qxpFyk8DzZL6QY2aXUJoi++qNM1mSktmptlsWzXJ9WYz7RjWsKy0ZKbOFJf0+o3dXZkJwcz0OUgLNV2Xku1ejyiVStYLw4dgVvOISj5drWmdsXZHTg8BbyhGCCE3u4pcv/H45p4xLIQPyUwIAEEzivZOA0CQcXYCgBCoyAv8XQEBOQG9ClqEeAYAAA==";
const HEALING_ICON =
  DATA_PREFIX +
  "UklGRl4BAABXRUJQVlA4TFEBAAAvH8AHEEegIACQhPr/jRENxhy1bdswPtl/Z+wVUBpJknKUf3bnLgFy9C/nPwDgqzZ+Lk7LSIiecr5lFsDRtrdtQ6ccQOXJnKjNieC2RoQ8N8J7hS7gh/CeIp2bpMsRIvqvsG3bhkm6xx/qMwuiBsiy+kmpDTFby8xsmSdqCYC/w1Vcts8AGvtrfQcHvNXPf4bqWu/ALOA/kbOEzd7vX7ooOgdPVvugf4uinfj3qr3f75xv23uHYRiEU4el943fxySKvpBlkMfIIgpiL+L0g6ShyHpyuUu6KtQ4pbfIYufDXBEe+2v6aIWD5kAeTbjjci0yZfDgsGfHdodpEftmU522xZr5gJlrVkQTonzNi7zRGEWaNqVXZDUSIhqitdNkmWmICIM55VlmWgIiolq3ps0zQ0RUAGhsyWBeAhG1LYZRr5eg8Ubkk1cFtyNX6j27GU8KAA==";

const HIT_ICON =
  DATA_PREFIX +
  "UklGRrwAAABXRUJQVlA4TK8AAAAvH8AHECegkI0kOLavxuqcwpFJ2/RvdU7GtCto24ZNtfsP3OY/ANS+u9v5Hhw0kiQ3JxnB3JrArQPA6w4BJ8uf1D15EET0fwLKyfJWCoBpCJSzu3PPvDNg45PxRPqS2uR+xrcCg2AWGi94DbB4z6pMUmAjvTIlMNHbKH71BIsB1l4pLSmQ3OvCOFho7hIrjteVOK68vC5l5uMXzTMz9x/E8UfnJ1vpml+AAaWcLG8FAA==";

const THUNDER_ICON =
  DATA_PREFIX +
  "UklGRlYBAABXRUJQVlA4TEkBAAAvH8AHAE+gNAAIKYnSL9rE/tUg3DOMkQZoHKMBGoci6ps9w/1TmGmA5OVn/FTgpIGVzGsAK8x/zN/sCIjLIA9JdFGuP6sXANfW3kZKZmqR6RZ5QztnhJezHUFTTDnrEaHLTGuSXZMpc5jnTaQXiOj/BOA/HTvrjSG2GmCe97Dxmffdb7luXndW8t0zVFXOl3PXxcrQBt4HgfUjYQUiusD7vIcNI2cVNo6c7TWj3FIVKcRza50NWqWIhkohRnaPKtQbxQrxfDzsjiGiHrImClfxcI9QRUYGJcLO4Ug3ItKGeGBIkRwGfSJDOuGEtdZET0QkYpgzETF6fK+vDemMOYsTbehwhF6NWZE4K4SF9c1anxORbFfKcQogLCy1szAKsC4iElcAZOsAqYhIUX4GmIb0uahdgqR4LpbSBunVMiwtPpceqxevHr/ZAAA=";

const RADIAL_ICON =
  DATA_PREFIX +
  "UklGRvABAABXRUJQVlA4TOQBAAAvH8AHAF+goI0k5fju+Y28nPdvhGwoaCSpEfC9vwXU4N8MKGzbtslOuvtDD+j/ry1g/mPQOmOSF1zNAfD/9/dIbfygepuF3fYNkrRtchoHxjnTLWevaF3AotAJVO1ZzzMN3iYG52x36WE1K4R8AauYrVOjjXNQXc+PzxDR/wmIogvRf345EpnEGK3MZDIyRmt9LTU61UkGAKPUpNqoU6nRKQAAjI3RyqRGxQC7mANcSrXWSqcZ7CIWU8hirYzWCsaI1jmAsVImvT0BRFciIoCKVJzlM0REhziFkVIZACK6vQIxH42VBrCuwjd005aIuZrADNEVVJO16OBQBrPKoq/JbxcWp9cALDrnieietS6HnQqx+Ei0ILqBOM3hvcXCU9vNaRt/lfkDxKoiWnE3J1thfrtwBVG7Yp5TaavzM2c9fWxD6Duiop7u4T0ivwp9WHoqSyyw9vcWHPqBie7VV388Ilq0PHDo73uq35atv9euAm965nt0rzns6V7H/SBrZqqpOVzfW3TMG5Gel56ah+3vruMgIgdhef9j8+LF/DP/Y+iXXd08v9WtOPyVRNYcNnHz4iG94yCnki8i/PfipevNzp/1X/kafZE+DB/3L8Ynet6IRCIHQ/Ank3v7GxE5JV9ERLqH";

const ANIMATION_BATCHES = [
  ["melee_walk", ["up", "left", "down", "right"], 4],
  ["melee_attack", ["up", "left", "down", "right"], 3],
  ["melee_walk", ["idle"], 1, 9],
  ["range_walk", ["up", "left", "down", "right"], 4],
  ["range_attack", ["up", "left", "down", "right"], 3],
  ["range_walk", ["idle"], 1, 9],
  ["goblin_walk", ["up", "left", "down", "right"], 4],
  ["goblin_attack", ["up", "left", "down", "right"], 3],
  ["goblin_walk", ["idle"], 1, 9],
];

const MELEE_WALK =
  DATA_PREFIX +
  "UklGRqoEAABXRUJQVlA4TJ0EAAAvV8AZEBcgJEgx3eEKBJIEVp9ZIJBksPPk8x9Q/cGSs+1xI0kvhaSA8Kqqu2VA2vUcEadgz8OKCYhCS6seLCPFU7iq514xC5YBe+UEJCP4HzPIGNAniOi/A7eRFMm9cLAQ7f6CV8fw6nwA0MBBZQ5Z2QAc6qTM1m8KYBEFa2J6gPWcPInGSA+EiwYjfRKlfDYpWC5lMulX+ES2iU9EtljxxQtWfJltqhdW+dkLlnnQ2DgoWLNNHO64lq3TGOcUtL4C49wG40c3YruM06SEOzievbDESw3OOVKChrCKV3FYa4yXsyJLwK7SqVV8RRA5KWbxNfx59SflZF8pe5PuMykBrrOfVR8HKe0opwsuDj/9kHNxqFSYZS7o4xA3XAd3U/3aPWKdXws+rd3DB0ycOz4NY00YnQMzjI/AFEqMn+Bwm0swPnuDvXlWtcDyueRFgqlMhWl2wPEXJdC0CsyDaRL1gql3CqgzTwqWX2zJcl8MugXsoUl4/4Q3GG1URvFUAEQFLN6UGM2hMJctYE4lEL3asHhMeZAGCLEBzqJqoldsggzANTEi+j4dSn3NLDKAcZPepUO5v/ouu34HB+n0NR3KbpEJePJ94ovwjXSaazt3QDs//gDjfHH4VnxBWP1D9qV+UkYc5rfu2eG7oUouOjQ4p/ijONKpe8C4hqj6c0ntnIL/iQeCTIQmXkru06H0MmQcxLjX7NKhfJI18T2E2JVc476Cox+Bo38EkhC7mtD7CY4iNbCsms+xawgf3cRRulUDdlVmuLkajDwcZBtuyfEGv+iqRzCn0lRYVwJPW2CtaqC/A8IvtsCfeqCtAFwJZqAHrAN2SRgaoGcE2hGMc9m7qwF72ALHDugT/qx5Y1rH+ydk7t5MiA0QRL2RYGQAFtFvJATxQJTy/5QwZPQbCX+WQcFNqlcTslwFUbZvJbgxe7rl6wnWZrmrVGCzn1fRhNN6KjG9n+CcEkJKML6LDWGaRXHu4iZLgHiTirCKUziRBruKKE7ej9gog2KWS4WN0iv+FbuaP0eZFRe51FyjnBXDxTeERaLCy/DsJrPCT7HhOu9T2NQ9m/cptzvXXMfZw7GbG8zoouI4OE24zT+DcJIN7KKA1Q5ovziwsi1g8T+F8IsbcJxucKiqZ+3HH0LQi3o2dGDLvoSd3cOxPCqYThVYPQHT5xIWnbQ2MwLrLzRYLPCV0WDUV0BLNhjeN+FVhdUAVnHluskSNIdiaQBiw47VAywNQcU9YKLnnihZ2J6riaLAiKd+kRBF7TJYEbV5VuTuzeSSyf2iNGNmcqo2s5RgZ/m2MBcpIR27MZIconynzOo0GJHfllmCPUT3BYZss7p/FjgpmXAygosKcHJSpncqNMa5e8zeAaZ3XwjeEVXYjzVGBNKxO6xIaLA3v8keLFiRe+zso8KefYk5ZWZfE06+gTB7hRlEw3X2d4TOq8wFzpNoFudrZfoJCMMlwOJW0Us7nQp8BRy6ETjeWP3i5kLRNwDrAzAdwV0/TgrafaYCU18VYCtgcQBTDba0DdA+AK0GqCaw21AmTsFUAfTnAjMZBbhJwdwBzIpssg3ZAAA=";

const MELEE_ATTACK =
  DATA_PREFIX +
  "UklGRoYEAABXRUJQVlA4THkEAAAvicAhEBdAIEBR2G+/mrYNmHTx/4pXQdoGTPfUz/T8B2Db/0DZ2TapsfMXEugcrzKBZFaZB19FZR5WRHKhQ60yGKvhKsg8rIjUtNJesTBW13+Z5vt/OJ1xGdF/B27bRhILJHPsYtzjFaSOvXMupeccD8zM/jFwvoqRzoDNCn0mjWijeCqEVgmJWMthELdG6IRImXAMLLNkuZ3fjfI2rEF8gcm+q0jkrGIpBJhsJ5NyJmcVdxG6EesRSSmaSmMNOjCDJ7OCJoGcU4zMsWJM9i4GReW2TemcM/MGtOBVmFYrD9PhcuJWbKYNQG7HPTcosK9FsfP/lD/2zYBLsg/s8DHAgib24Fk4aX+7tDmIZl/VXIL3Jm+6SPBTrpXxlgdQXREJgTNNMbQONOWg2N9zrJZSRNr7oJVJHEj5twuuXn7WyuRVFIYEMya9VganczbGxKaPlVlXk25rc3AbaWyrs1JvxkSRFrqdQARx5HrE6k1KWgpNEdPaoZbkuVlz9V8xbPQI+gWFWZVgIl3I1yVYmC37dQkWXNp1CRYWhFuzOoGyIs6bVQl0IzuzKsGS08oE+s1wWk5gy2FB36bLCbpTm2o/25F1DmkJ7FHJwhuYzWVekoUEtUzAO5g5S1/wUSgYjdDpwFWMPuZKElmYmch2R3YJ+owHOVXM0l3xrj9VnKbomSpNJea6bNKdOHlNEAizWOR7l76H23EsJxJEFtBek+Yx9tdOGVKynJnhrLkt9rwYFK7CzwXmOeNNg92MVS4dDnLV4avVHjvZPFVu9kY/PsfBQKexkrrjAqLWQCfqM1Lakjnz2VxZUuzp/9p4AbwL3lzwVKrNLJ9ZTlQ9G2TbbD5CCYbJVGeORcY2vxoNhslVgRM5DX91Q48gFzKdvNm7Qb6hP7lUXTiVi9HOb0QGv1AydMttId7QwW1VlZOP3XakXMZMVJO8qbh8/zuRqA6pumNV2yB2dTIZ5NxR1QxscK/ZH2tlSo1qYoeRB/ZTLjiuNF8F9lju2Be/S3eZ6kGU7o4zaxJ0r/9knPgei+dMOZGhiVV3R9QdayVx710OItC4C5ZLmUuheR90BInCJJb+/L7UnXhTwf/ForVOnAezlZMObTibq3fF7nxyMuDGprIwM2+IHjZ401ovpmGVg/fAOMTMj3aLGb3VNhtFonuBUnpF3QNmlhGSmGJ6zlHQf/948zGcpb25WhmiLw0KCVgVwooUlvG4KCHWpCi4BUqIhRSPyDuVdzrv0MRmpoVYkaJnQQmxIkXROCxKCD3Fe/DZgZESQk/RwFdKR8QcoXLhJ6U7wgHAb/IOZu1TASMNyeyWedbxBhZmt9Xciv3YT6eISLwspvwJEJE8qCZfvzCXuY1THmuqKQduyKvQMTO31zJ4lRuA9e50rlnoS58BEUkaCga7mWOjwql87DdUgGtUW/s/YN4yEmasYvgUnoP6Jwpaq7B0ZTLvztyv/Mn0SuvLBBQfQxRceuu2pLXiS+miHpjyYkhph6FBOakDsgThdiMCx7pi1kdKpP+SQQA=";

const RANGE_WALK =
  DATA_PREFIX +
  "UklGRgQEAABXRUJQVlA4TPgDAAAvN8AYECdAkG2bG8Fs5nCHE2Tb5saxjOkQV9O2AZvKVTgLU+c/AKb/bZYDirXtBLWtDf4CAC0AEwrQhAKuIf0XdUWH978GIvrvwG3bSPLM7L2E5hv441Gdv0u161g+S4fr0M+SDO8av0p6H8u/kORe/AdS1b9L/FGS/0HSjxLJX6Qqoqr8USIhVab6TbJ2T8p+r1z07v1OiJptX6ReyyDiWNdB06aK2WtILduCSQqopWWLcwVFoIcRAPQ8AOCK03oWAImw0yRRAECLBQCcOQB1BCu3lHsEYPEsQJXk9zzYCiTPHqY3U6FPb5CRwyxhOqaPOeDPR9Xp/kD0rHiTRJUnacySvklHV9WI2lU5zhUvkg1XXfAzRn+peJFUVW6vq8a54kUSEWKCiIo+K14kIiKNIsIkz4qHVI1IdTmIXyseEsxItMHsteIpVSdRhflrxVNKRH4p6mhlCBLRGPqUTlHfFHUXV8VBl7dbslty88GKi/vNXd7pTRrDhQSXO9HvRudVbklZUDvTSjhG70KoXddGSF1VCNX7uUWkJptwza5kC5Kr7RGUT2q/cyeOR8knjYiUr36P3SKQpMUFdaUeLKJSaxGoZUQAlagAwNUCgLO0CCCx3DvKztPWaWsP97SuQDpjkgCA98mlMwLQdruHBkgEdt5XAMcs5WwNSBKSR2A0K9PHvgEAcpiklAGkuQFp9irFP0gyOH6WqqryZ0lUtcfvkvc/SL13XT9LrPxdIiam8lXaiZm2j1Ii9tbCV0ku940+SpLZezk/SnQ5l6FfJXW1sdGYJX2XKo3mXD5KaOLO61PiW6I0SWvK52iUn1I7RytzRck/LZvu/pDqJNlPf1TIurPVPksu677ywwNZkY1Acku1SZEVgBVpDFi8VgDnNkkWLU4V5wbgDEcEUJdJOoMFAHWrCwCJ5/SwTtKI570j3g/Jl6sBsO1qU4Xd7rVeDqQefvpUsRcAGWMD4FvK+PMhnQGgUnxUvElVVSNQxyzpuySq2gFS1faoeJFUhw9A1Md4VLx5ojpNnxUvUiUWkXuiMle8SMJEJDiI9FnxIqkyGU0V/Kx4SLUrmUWoslmsXelNOlTJGqYKf1Y8pXE1KjhsJWccYzCVpySrd5UgOjrtEHbfZZImfgy3/26ujSBrE/endJCYj+VgsruisPoIB+kt1cKkDVWku6LSpnOF6gaUfvrvtHTagEEyth10ydgAapL3CGLzDTCWnAV0es4AzBpHYKFeAItnKwxQawQAthKARDRV7B4AgDYJAIRWAJWzAEAe085NA5D4uHcWSAZA+wIAspfJ3fsCSMSpQOKdwyTpPS85ALbhLEAy8gVIPn+cpxtLGY9jCsgZAA==";
const RANGE_ATTACK =
  DATA_PREFIX +
  "UklGRnAFAABXRUJQVlA4TGQFAAAvTcAeED+gqJEUNnjUZ9UCLiASgMySTeCB5AU1jaTA0fugpMYMDpj/ACDSjctl49ie+/g9UNq2vWrjfMWDve0x3XI5ddi6oTbb6SmzZUiRtmkYfdq6otL7/0HfB+lxG9F/CG4kKZKiFo7PDa+gbAraMltEN73qDaJOL9AbRAe1E62I3tAbRINapYNoWIHrRV9uXlKEUQ3wW0UvABQ5AOxXRCocVu78kl0R6XCobvgVkQ5HKUpzvE3UJQBexglsSBfJOMEzyZjnVkSyeWTOMyevi1bgckkMn+DLTSIHMLAXbgDw+xWRhC9j5C4smRWRKKkNDM9sdkKkxwnKDg28TNxtFa12WRMpCsfyZjnHPJAqkkuibkmKurlSQSwZqTDsLqTIzZ5IFSlW6t1AsnONklZESnFo9YqtIkI8aIiT3W0WTbHUqlBuFhFOekOxVUTRllpxVaS3I33WRP/YOW6v0usOev1Be9Y69aTX11qB1ELhYTW4g1VW5+BLBfQCQF7H+KohYgfAKFYA3gpErSGqOgI+yc/7ucQiOwdW3VzKJXl4Zmn18D4vFPCwWtYa5lIizILIY+ZBVA0d+5lkMsQvHbNJOeK3wjhm9nmeXDtw8lkPC+IpR6Do8GwS8rcHOrd2wKKInrNBs5t7JcLECfu8huBdXBTvfzhOPvknAHNjs5vAqbVLZ57gOWE8CMTIV3ZLnNDwtZmes65T6xMQM+x90/gE5ucsa6++hRdfniw+DBezVNPNAlc22ZfPwNi2bu4mduuC/RLTDfDPvJe1X7lhAX3niYBf0ZTZeRFF+I9mQaCgCOTUmbPUplEiEq6Oaa4vaIKdqVmhoLZp3SARl0kgugM9NraTl7EgRNtRVgWKElEdqAeeO5IKGyyJ6etBQZyoH9BLUSScbKEoQi0RoejqWMq6GoegKKpYSERVd/OrjEIoe0VxQ6EgOtSdVapORbQK4qghqvAYbEHaHNcRmpb+V2Z4LbW6YbPopYbdK0+GKTeKXA3vFYQN3mwUpVQDn4n4YbOoS6i930vRA9ZFSv2M+AtELvWGZcy92Sj6PMXe8U7CXe/MmkjEsb9EsQ0353vntomGO/TtVeZt37IUfauK7uIfIdx9zLu0qQ93oiuSJmIXU2hFd09XvH5lRD5pIv4UQ8LvAvF0/elPibgCmsg9wQew6PrEAaP4Mk+a6PxLGsNYKif5wQ5CRBGaiM6/GjuSmAsefvGKKCZNROmpLWVdQms0UdJEFO57Ugb320Uh6GG76IZHrY4fV0Rqfav2y2ZRhb5W12fqFZFWsFZD1LVdE6kkW2ifRBSbRacjKfXB7jaLClqZFdF/5lRvqdCrVcOwUtAfNxVxXHsocgdfWhURT8qpJphbqRhgVxAoFCsg5TcGcKpVRKhFfsGKb7ulgyUNUYs6nsOtzDPwOIRCRVhZREJVixzzXpZyhGhg5rwXz8zDvn+nIn56l5WY2bjq16UIYyZL4ZAjPiyI2z57h3cXlBUyKjhNB3op5s7NOHI2WJYEzy2IHhaqnzhh14y7uQnTU8KEer98GifPaM/NVZwj8wTeL9nxmTnmCLq0zchXeF5WdAFaY/PO44jWtE1T5NswpTHGvPj8CWjzL7+4ISkIMtN0BXb5lyfP2SQ7I9w3Wa9Zg/l+ktEVnxZD+LDsFpsMlJ/XC18ASxUya3pe6gX8o0Rka4poqTplVtO1TUGWNiCIy9jcU37lum6CLagmDRHKvPICnOhW5KRgh6IqSSAwHC2JOWE4US8Q8WQpFAqitoWss6Gs6rzKVnY2KAiUJAtlKCW8m0VWc1fHWimWQcH2eAxH0hBHBVHF+r4uJCLjbEPQsaB/5BA=";

const GOBLIN_WALK =
  DATA_PREFIX +
  "UklGRl4EAABXRUJQVlA4TFIEAAAvO8AXECdApG2bm4PB8Ss4QbbNBjHGyx5KadsGbCqwqGzNfwBSn7nYDxJrawvb5oNoAAlrAPj0D5CIDCD9/vYfSvyS004Q0X8Ibhs5kng5uXS7v8A/vxzOaTDzP2VQ8kt12fSHjIMyAjAX818yJNlFkv57htlAuV/oHzMOc4k2iZL55wyIIicc5kbH54yTpCfMRnIFjseMCbPsYjh1UQYfMyxViS4ll1Fa5w8ZU3VJYqIkWalhiYlhr5zFXdaKNZMK2y2DMeNMdCt1XSvF5GceGa1YpbjwLJvbdhbbqf1l57K5dS/6GRl+Wu99ZOy9981uGYkxo+7PGeu5DgCGt+G7c+85ZnxhXh690gU12HDBvOfvYENPQCsAL62Epcr0/brUDSwAV8DjAS9BZQJYAr/xaL5YihkZmBOwpHEgLAGohnDkv7yY+f3A49LhnMKSng48ZZjClWqmfD/wlOHuNkiRFEiRNOji0/3AfenQRcAhN073Aw8ZMtGB310kbgcelo7tbcyAJCNuB+5L4YvIfMLtwG0poAAcFPP9QFwqAMyNCaikr5d5HIhL4fklFSNlgWRxSeni0hoedtMgmcKSPAOnZFG5ocW589JkvCyyYgDgq69Ac2Odxi7PkdH7uQ7dLQHsfasr8N238HTf1O4F0RkZLlt/JYyMpWdg2ftXy8A+asK7N8KB+s4Afl9fwGUbjQBbfJgzGsNeGVrxHPYWJqAxYWbCwoUIu+dwWrOE8DM34FRjOEKGM3Aivizjii8LxvbikSw4lP+UYbJpVLj8TxlUOFBdNv0h43AXAZjJ8l8ypPAfStIfMo7gwBRMnzP4+96NMO/2Zv6YAde7m6Pq9/fN6XNGdTkngDJzfM5YzFkS5pPGBcBjBjCLpAynka4M3jJEOlOVXZRcwzp/yMiVMjcmuiiWqscMrY0uGQspifyYcS4X1nVtkmU/i0tspYyM4meixLau1WXLLUNFzWXJz7X3/lbRT+/d7Sy9982LjYxXzOi3jO2WsWDZx67NP33bYwb7K9XSt94BjIxtRe2oPY0M9C+g9rwPP7eMAvDSCloGwFTXS11jDTEzA25gAWblSozI2WPNrDVwAw7l0xLgFmtWwKLzMi84dZFhSfj3l4M23ZYCiwfMPS7Jn5ZQXQyRClfczJ6WYPKxV+WeBymQAkkKpIsumu5LOBj2DpMkwCh/WkI1H1cOuoVZ+u8+3ZdwOH+3L4DU9h4kDfEL0MTp4uELiGFPDMJmHkse0M2flkByvGsMs7NIxqVymRWfHDcyhaPmcangIWOWNBwmWVxaL6dJupikYfWhmkd02UDZ+GKl1oRZRXlYbhnNLfz7P31LQNP+BcBT71sB3Hq/Gwd834Yc1QhL34b99dMBnLn1rxT2er4cPbzz7XssAXvIwL4F1VoGKhNYBu6vwQvTpZVWgPB9JmBmszS0jMGaEqpy+BEqqTzmyKF6mFsSwsu8tDU8dGUBAA==";

const GOBLIN_ATTACK =
  DATA_PREFIX +
  "UklGRm4FAABXRUJQVlA4TGEFAAAvXMAdECegkG0EOHQvw/kcmbRNa6f25n6XmrYNWJyzBOb8B8DUZj+wg/fatvLWtraty3IAcHAAWtMKQLgRgKbo+Qe1Cwx5na/fEf134LZtGNG7+tz+RP8T+eyx00Oe3zvsR8RD/uo77bm2z/STzuhLsNwcDm6b/YJF0ulZpRH543lutrsrDUk6n5I2PwRx0e1noBnG0lPSZd9JfIKHbnsNnJJsP2+9u9voY/s5mtLdAChllCt8gofuBkApk8svIKoK8PE61tZfQFhHH7+pJQCu6UGf8Ztb+vhVgTw7AJY+TmkrFciBrXegeBqiAuXYl+n7bVC8aE4ar9dRagCNPj3r5voLB2Pew/GVowDUMqqjrClpUBTkXCuQXpMCoCDpVW9aR7nCg3yLCjxCdNufWel2i/3aLZTett3WmW+Iy3ZIm98/fmpMqra9RDaXP37eeMhTS7/W4UfsIe+hA6kWTfldtcUqUi+hilSZHCxKhIMiVWJNqm3WFyXW0EuqLZSylJZJYlHqobRItejvkvX/JT+Pv5TyErvsyPmUUl5iNEKb7agsiUbcQFhXYG4grANYo87ZLeqndADr9xKtrEFbX6jE8wOMPavczNxjFVjirdxv/HYgeImdg98OfH19wjRHX13H+3p1KPO2JNWbrdTpr0lya/eODu1utAn8RtdndPSojgzMClBuJPLNw0GbbZXi2l/ztpQqdGqJrqHM41ELlRaw+tCVQO7RkMjzw2nbTxfRScwP2x+7vgKVRl9n+7Uv6m65Tzb/2HUNHEAtweGn5O48jcv71rwrSKKVg8hjMP2/7Ke4WmSz91CTVN9tdNp+iEyouR3ReEuqK+ug202VzBIelyXNVulgrUWSNttv5UxI/LQl0B5Syhmm3R6SclaUurIG3hqSsyRd9lu3OVhr0ZChw1z/9L2UM4wObn46eOur5Kxv86P/kmyPv5DzN+xJpdw5aOWLtsdKdNYbFbh32s/BAbcFsPynXfb+rYXWWeIvdFRaI9906y2qBJI8jURvZg1V3CFoOiWiCrCEEsAaNgweg4TvrlOFkm/1WQVqfPQCeLi+oSGm08Pr1AH6NFPFjarL+7QBYkD4QLcp+niN1NAxKpNKh0XH9HIAnfD6XGmdPEt0inSOW0eBEjtK7Y0UHBVYdT4n2D8oysFlu74mnU5vyzm+6Oi+Shmck27b05EYcz005s/V+j7wWNnvz7Uvo2OQuaZDlz3yc5T8uPyYXwrQlN6T03Yrkjy1Epf3dbYCRcpT2+5Gp+fWcdkUjemF3l+aczqIplx2gwnFduSy291vs/3+bfOozW6Bqee7sb0qyGldnm23PW1FuXZdwbF197uf7lqsqiUYfWxF6Td9sKiyzH5s+6kwV4u7suiM6Lz9aXvoP5yfx9/J+c5mP0MpL9IZOLi5lk7b4Y9WJD1nFcqtuA5AkmcAd6O/8m+gAot0DvUdfeg87k1VAZYbCVjCzSrJ/9SolzsH8J4k6OUpyWMd0PsX6BFa4IvraVPmhwp9kXTO8+Z60vJzkoE1kkxHNwHa67WMw/y+FgXzaHdjun7XMjgatawhKDU0zcKoQqmMnqN2e3Ro8DvodKAsOicvKHfdAJZteKECR/+XbHs8elnuX/J4p4NEe+m9n5PUfr3/idVCY51t9q7kfSJ+vV97iAIso8ThtkuX7fFhc9s3+xG8sNDRnNPXLp2eHf6scvSllrtb4PBnlbZIqasu28HIbg7UUldJfVZLZTlsr8FVjLWySJ8AJS9bt/fZ0Y8yS5DzIh2zlBdJn3DWUtfgyFnSOHcF2br9mB/WyqLbHDf0CSRI+Qv68AhtMI+c9W+Itof+AwEA";
// path points
const CASTLE_CORNERS = [
  { x: 0.45, y: 0.45 },
  { x: 0.55, y: 0.45 },
  { x: 0.55, y: 0.55 },
  { x: 0.45, y: 0.55 },
];

const HORDE_LANES = [
  { spawn: { x: 0.3, y: -0.05 }, cornerIndex: 0 },
  { spawn: { x: 0.7, y: -0.05 }, cornerIndex: 1 },
  { spawn: { x: 1.05, y: 0.3 }, cornerIndex: 1 },
  { spawn: { x: 1.05, y: 0.7 }, cornerIndex: 2 },
  { spawn: { x: 0.7, y: 1.05 }, cornerIndex: 2 },
  { spawn: { x: 0.3, y: 1.05 }, cornerIndex: 3 },
  { spawn: { x: -0.05, y: 0.7 }, cornerIndex: 3 },
  { spawn: { x: -0.05, y: 0.3 }, cornerIndex: 0 },
];

const STATES = { IDLE: 0, WALK: 1, ATTACK: 2, DIE: 3 };
const KIND = { PATH: 0, HERO: 1, CREEP: 2, BASE: 3, UI: 4 };
const BACKGROUND_TEXTURE_KEY = "arena-bg";
const SHUTDOWN = Phaser.Scenes.Events.SHUTDOWN;
// Game variables
let scene;
let graphics;
let player1 = null;
let player2 = null;
let round = 0;
let drawnImages = [];
let enemiesCount = 0;
let roundStarting = false;
let ctrlMode = { P1: true, P2: true };
let defenderUnits = [];
let castleWaypoints = [];
let neutrals = [];
let gold = 0;
const BUTTON_TO_INDEX = { A: 1, B: 2, C: 3, X: 4, Y: 5, Z: 6 };
const SPELL_TYPES = { AOE_SELF: 0, AOE_RANDOM: 1, MASS_HEAL: 2 };
const SPELL_DEFS = [
  { id: 0, type: SPELL_TYPES.AOE_SELF },
  { id: 1, type: SPELL_TYPES.AOE_RANDOM },
  { id: 2, type: SPELL_TYPES.MASS_HEAL },
];
const HERO_UPGRADE_COST = {
  health: 90,
  mana: 90,
  spell: 120,
  healthRegen: 70,
  manaRegen: 70,
};
const BASE_COST = {
  spell: [200, 220, 260],
  goldRate: 150,
  maxHealth: 180,
  regen: 140,
};

const BEST_RUN_KEY = "arcade_best_run";
const LAST_RUN_KEY = "arcade_last_run";

function readStoredRun(key) {
  try {
    if (typeof localStorage === "undefined") {
      return null;
    }
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_e) {
    return null;
  }
}

function writeStoredRun(key, data) {
  try {
    if (typeof localStorage === "undefined") {
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  } catch (_e) {
    // ignore storage errors
  }
}

function recordRun(data) {
  writeStoredRun(LAST_RUN_KEY, data);
  const best = readStoredRun(BEST_RUN_KEY);
  if (!best || data.round > best.round) {
    writeStoredRun(BEST_RUN_KEY, data);
  }
}

function getBestRun() {
  return readStoredRun(BEST_RUN_KEY);
}

class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
    this.startCounts = { P1: 0, P2: 0 };
    this.startButtons = {};
    this.gameStarted = false;
  }

  create() {
    round = 0;
    enemiesCount = 0;
    roundStarting = false;
    player1 = null;
    player2 = null;
    ctrlMode = { P1: true, P2: true };
    this.startCounts = { P1: 0, P2: 0 };
    this.gameStarted = false;
    placeBackground(this);
    centeredText(this, config.width / 2, 70, "Arcade Briefing", {
      fontSize: "36px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    centeredText(
      this,
      config.width / 2,
      150,
      "Press both START buttons once to begin in 2P mode.\nDouble tap the same START button to play solo on that side.\nP1 START = S or Space | P2 START = 5 or 0",
      {
        fontSize: "20px",
        color: "#d0d0d0",
        align: "center",
        wordWrap: { width: config.width - 80 },
      }
    );

    this.createControllerDisplays();
    this.bestRunText = centeredText(
      this,
      config.width / 2,
      config.height - 110,
      this.getBestLabel(),
      {
        fontSize: "22px",
        color: "#80ff80",
        align: "center",
      }
    );
    this.statusText = centeredText(
      this,
      config.width / 2,
      config.height - 60,
      "Waiting for players...",
      {
        fontSize: "22px",
        color: "#ffff00",
        align: "center",
      }
    );

    bindKeys(this, this.handleKey);
  }

  getBestLabel() {
    const best = getBestRun();
    if (!best) {
      return "Top Team: No runs recorded yet.";
    }
    const names = [];
    if (best.p1Name) {
      names.push(best.p1Name);
    }
    if (best.p2Name) {
      names.push(best.p2Name);
    }
    const namePart =
      names.length > 1
        ? `${names[0]} & ${names[1]}`
        : names[0] || "Unknown Heroes";
    return `Top Team: ${namePart} - Round ${best.round}`;
  }

  createControllerDisplays() {
    this.startButtons = {};
    this.drawController(200, "PLAYER ONE", "left", "P1");
    this.drawController(600, "PLAYER TWO", "right", "P2");
  }

  drawController(x, label, layout, key) {
    const container = this.add.container(x, 340);
    const side = layout === "right" ? "right" : "left";
    const panel = this.add
      .rectangle(0, 10, 320, 240, 0x060606, 1)
      .setStrokeStyle(2, 0xffffff);
    container.add(panel);

    const joystickX = side === "right" ? -60 : -90;
    const buttonStartX = side === "left" ? 10 : 40;
    const startX = side === "left" ? 120 : -120;
    const startY = -80;

    const stickBase = this.add.circle(joystickX, 40, 45, 0x1a1a1a);
    const stick = this.add.rectangle(joystickX, -5, 12, 100, 0x555555);
    const knob = this.add.circle(joystickX, -90, 28, 0x3b7bff);
    [stickBase, stick, knob].forEach((part) => container.add(part));

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const btn = this.add.circle(
          buttonStartX + col * 45,
          10 + row * 45,
          18,
          0x0f49bf
        );
        btn.setStrokeStyle(2, 0x6fb1ff);
        container.add(btn);
      }
    }

    const startButton = this.add
      .circle(startX, startY, 24, 0x333333)
      .setStrokeStyle(2, 0xffff00);
    const startLabel = centeredText(this, startX, startY + 35, "START", {
      fontSize: "18px",
      color: "#ffff00",
    });

    const title = centeredText(this, 0, -145, label, {
      fontSize: "22px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    container.add(startButton);
    container.add(startLabel);
    container.add(title);
    this.startButtons[key] = startButton;
  }

  handleKey(event) {
    const key = KEYBOARD_TO_ARCADE[event.key] || event.key;
    if (key === "START1" || key === "START2") {
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
    if (key === "START1") {
      this.processStart("P1");
    } else if (key === "START2") {
      this.processStart("P2");
    }
  }

  processStart(controllerKey) {
    if (this.gameStarted) {
      return;
    }
    this.startCounts[controllerKey]++;
    this.flashStart(controllerKey);
    this.updateStatus();

    const otherKey = controllerKey === "P1" ? "P2" : "P1";
    if (this.startCounts.P1 >= 1 && this.startCounts.P2 >= 1) {
      ctrlMode = { P1: true, P2: true };
      this.launchMain({ players: 2 });
      return;
    }

    if (
      this.startCounts[controllerKey] >= 2 &&
      this.startCounts[otherKey] === 0
    ) {
      ctrlMode = {
        P1: controllerKey === "P1",
        P2: controllerKey === "P2",
      };
      this.launchMain({ players: 1, solo: controllerKey });
    }
  }

  flashStart(key) {
    const button = this.startButtons[key];
    if (!button) {
      return;
    }
    button.setFillStyle(0x00aa00);
    this.time.delayedCall(200, () => button.setFillStyle(0x333333));
  }

  updateStatus() {
    const { P1, P2 } = this.startCounts;
    if (P1 && P2) {
      this.statusText.setText("Both players ready! Starting co-op...");
    } else if (P1 && !P2) {
      this.statusText.setText(
        "Player 1 ready. Double tap START for solo or wait for Player 2."
      );
    } else if (P2 && !P1) {
      this.statusText.setText(
        "Player 2 ready. Double tap START for solo or wait for Player 1."
      );
    } else {
      this.statusText.setText("Waiting for players...");
    }
  }

  launchMain(data) {
    if (this.gameStarted) {
      return;
    }
    this.gameStarted = true;
    const message =
      data.players === 2
        ? "Launching 2 player mode!"
        : `Launching solo mode on ${
            data.solo === "P1" ? "Player 1" : "Player 2"
          } controls!`;
    this.statusText.setText(message);
    this.time.delayedCall(250, () => {
      this.scene.start("MainScene", data);
    });
  }
}

class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
    this.controllers = { P1: true, P2: true };
    this.nameEntries = {};
    this.roundAchieved = 0;
    this.saving = false;
  }

  init(data) {
    this.roundAchieved = data?.round ?? 0;
    this.controllers = data?.controllers || { P1: true, P2: true };
    this.saving = false;
  }

  create() {
    placeBackground(this);
    centeredText(this, config.width / 2, 80, "Record Your Team", {
      fontSize: "38px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    centeredText(
      this,
      config.width / 2,
      140,
      `Round Reached: ${this.roundAchieved}`,
      {
        fontSize: "26px",
        color: "#ffd966",
      }
    );

    centeredText(
      this,
      config.width / 2,
      190,
      "Use your joystick to move the cursor.\nUp/Down change letters, Left/Right move slots.\nPress START to confirm and save.",
      {
        fontSize: "20px",
        color: "#d0d0d0",
        align: "center",
      }
    );

    this.nameEntries = {
      P1: this.createNameEntry(220, "PLAYER ONE", this.controllers.P1),
      P2: this.createNameEntry(580, "PLAYER TWO", this.controllers.P2),
    };

    this.statusText = centeredText(
      this,
      config.width / 2,
      config.height - 60,
      "Press START to save.",
      {
        fontSize: "22px",
        color: "#80ff80",
      }
    );

    bindKeys(this, this.handleKey);
  }

  createNameEntry(x, label, enabled) {
    const NAME_LEN = 6;
    this.add
      .rectangle(x, 340, 320, 220, 0x050505, 0.85)
      .setStrokeStyle(2, enabled ? 0xffffff : 0x555555);
    centeredText(this, x, 240, label, {
      fontSize: "22px",
      color: "#ffffff",
    });
    centeredText(this, x, 260, enabled ? "Active" : "Not participating", {
      fontSize: "16px",
      color: enabled ? "#00ffea" : "#888888",
    });
    const letters = Array(NAME_LEN).fill("A");
    if (!enabled) {
      letters.fill("-");
    }
    const nameText = centeredText(this, x, 330, letters.join(""), {
      fontFamily: "monospace",
      fontSize: "34px",
      color: "#ffffff",
    });
    const pointer = this.add
      .triangle(x, 360, 0, 0, 14, 0, 7, -18, 0xffff00, 1)
      .setOrigin(0.5, 0)
      .setVisible(enabled);

    const entry = {
      enabled,
      letters,
      index: 0,
      nameText,
      pointer,
    };
    this.updateNameEntry(entry);
    return entry;
  }

  handleKey(event) {
    const key = KEYBOARD_TO_ARCADE[event.key] || event.key;
    if (key === "START1" || key === "START2") {
      if (event.preventDefault) {
        event.preventDefault();
      }
      this.confirmSave();
      return;
    }
    const match = key && key.match(/^(P[12])(UL|UR|DL|DR|U|D|L|R)$/);
    if (!match) {
      return;
    }
    const playerKey = match[1];
    if (!this.controllers[playerKey]) {
      return;
    }
    const code = match[2];
    this.applyDirection(playerKey, code);
  }

  applyDirection(playerKey, code) {
    const entry = this.nameEntries[playerKey];
    if (!entry || !entry.enabled) {
      return;
    }
    if (code.includes("L")) {
      entry.index =
        (entry.index + entry.letters.length - 1) % entry.letters.length;
    }
    if (code.includes("R")) {
      entry.index = (entry.index + 1) % entry.letters.length;
    }
    if (code.includes("U")) {
      this.shiftLetter(entry, 1);
    }
    if (code.includes("D")) {
      this.shiftLetter(entry, -1);
    }
    this.updateNameEntry(entry);
  }

  shiftLetter(entry, delta) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    const current = entry.letters[entry.index];
    const idx = alphabet.indexOf(current);
    const safeIndex = idx === -1 ? 0 : idx;
    const nextIndex = (safeIndex + delta + alphabet.length) % alphabet.length;
    entry.letters[entry.index] = alphabet[nextIndex];
  }

  updateNameEntry(entry) {
    const display = entry.letters.map((ch) => (ch === " " ? "_" : ch)).join("");
    entry.nameText.setText(display);
    if (!entry.enabled) {
      entry.pointer.setVisible(false);
      return;
    }
    entry.pointer.setVisible(true);
    const width = entry.nameText.displayWidth || entry.letters.length * 24;
    const slot = width / entry.letters.length;
    const left = entry.nameText.x - width / 2;
    entry.pointer.x = left + slot * entry.index + slot / 2;
    entry.pointer.y = entry.nameText.y + 24;
  }

  confirmSave() {
    if (this.saving) {
      return;
    }
    this.saving = true;
    const payload = {
      round: this.roundAchieved,
      p1Name: this.extractName("P1"),
      p2Name: this.extractName("P2"),
      timestamp: Date.now(),
    };
    recordRun(payload);
    this.statusText.setText("Score saved! Returning to main menu...");
    ctrlMode = { P1: true, P2: true };
    this.time.delayedCall(400, () => {
      this.scene.start("StartScene");
    });
  }

  extractName(key) {
    const entry = this.nameEntries[key];
    if (!entry || !entry.enabled) {
      return null;
    }
    const name = entry.letters.join("").trim();
    return name || (key === "P1" ? "Player 1" : "Player 2");
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init(data) {
    const isSolo = data?.players === 1;
    ctrlMode = isSolo
      ? {
          P1: data?.solo === "P1",
          P2: data?.solo === "P2",
        }
      : { P1: true, P2: true };
    this.modeData = data || { players: 2 };
  }

  preload() {
    this.load.image("castle", CASTLE, {
      frameWidth: 44,
      frameHeight: 44,
    });
    this.load.image("heal_icon", HEALING_ICON, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("hit_icon", HIT_ICON, {
      frameWidth: 32,
      frameHeight: 32,
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

  create() {
    scene = this;
    placeBackground(this);
    graphics = this.add.graphics();
    neutrals = [];
    const base = createBase();
    this.baseEntity = base;
    this.castleWaypoints = createCastleWaypoints(scene);
    this.defenders = [];
    this.isPaused = false;
    this.pauseMenu = null;
    this.pauseSelection = 0;
    this.pauseOptionTexts = [];
    this.pauseOptionLabels = [
      "Resume Game",
      "Main Menu (no record)",
      "Finish Run (record names)",
    ];
    this.gameEnded = false;

    initAnimations(scene);

    player1 = new Player(1);
    player2 = new Player(2);
    player1.linkBase(base);
    player2.linkBase(base);

    this.defenders = createDefenderFormation(scene);
    assignDefendersToPlayers(this.defenders);
    base.onDeath = () => this.handleCastleDestroyed();

    playTone(this, 440, 0.1);

    this.goldText = centeredText(this, config.width / 2, 24, "", {
      fontSize: "20px",
      color: "#ffff88",
      align: "center",
    });
    refreshGoldText();

    bindKeys(this, this.handleArcadeInput);
    this.events.once(SHUTDOWN, () => {
      this.pauseMenu?.destroy();
      this.pauseMenu = null;
      graphics?.destroy();
      graphics = null;
      this.goldText = null;
      neutrals = [];
      drawnImages = [];
      player1 = null;
      player2 = null;
      scene = null;
    });
  }

  update(_time, delta) {
    if (this.isPaused) {
      return;
    }
    if (this.gameEnded) {
      return;
    }
    if (player1) {
      player1.entities.forEach((entity) => {
        entity.update(_time, delta);
      });
    }
    if (player2) {
      player2.entities.forEach((entity) => {
        entity.update(_time, delta);
      });
    }
    neutrals = neutrals.filter((entity) => {
      if (!entity || !entity.active) {
        return false;
      }
      entity.update(_time, delta);
      return true;
    });
    drawGame();
    if (enemiesCount <= 0 && !roundStarting) {
      roundStarting = true;
      round++;
      enemiesCount = 0;
      this.time.delayedCall(4000, () => {
        if (!this.gameEnded) {
          resetDefenders(this.defenders);
          spawnEnemyWave(
            this,
            this.defenders,
            this.baseEntity,
            this.castleWaypoints
          );
        }
        roundStarting = false;
      });
    }
  }

  handleArcadeInput(event) {
    if (this.gameEnded) {
      return;
    }
    const key = KEYBOARD_TO_ARCADE[event.key] || event.key;
    if (key === "START1" || key === "START2") {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (this.pauseMenu) {
        this.confirmPauseSelection();
      } else {
        this.openPauseMenu();
      }
      return;
    }
    const actionMatch = key && key.match(/^(P[12])(A|B|C|X|Y|Z)$/);
    if (actionMatch) {
      const btnIndex = BUTTON_TO_INDEX[actionMatch[2]];
      const player =
        actionMatch[1] === "P1" ? player1 : actionMatch[1] === "P2" ? player2 : null;
      player?.onPress(btnIndex);
      return;
    }
    const match = key && key.match(/^(P[12])(UL|UR|DL|DR|U|D|L|R)$/);

    if (!match) {
      return;
    }

    if (this.pauseMenu) {
      this.navigatePauseMenu(match[2]);
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    }

    const playerKey = match[1];
    const directionKey = match[2];
    if (
      (playerKey === "P1" && !ctrlMode.P1) ||
      (playerKey === "P2" && !ctrlMode.P2)
    ) {
      return;
    }
    const direction = ARCADE_DIRECTIONS[directionKey];

    if (!direction) {
      return;
    }

    if (playerKey === "P1") {
      player1?.moveSelectionTo(direction);
    } else if (playerKey === "P2") {
      player2?.moveSelectionTo(direction);
    }
  }

  openPauseMenu() {
    if (this.gameEnded) {
      return;
    }
    if (this.pauseMenu) {
      return;
    }
    this.isPaused = true;
    if (this.physics.world) {
      this.physics.world.pause();
    }
    this.pauseSelection = 0;
    const overlay = this.add
      .rectangle(0, 0, config.width, config.height, 0x000000, 0.65)
      .setOrigin(0, 0);
    const panel = this.add
      .rectangle(config.width / 2, config.height / 2, 420, 280, 0x111111, 0.95)
      .setStrokeStyle(2, 0xffffff);
    const title = centeredText(
      this,
      config.width / 2,
      config.height / 2 - 110,
      "Game Paused",
      {
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    );
    const help = centeredText(
      this,
      config.width / 2,
      config.height / 2 - 70,
      "Use joystick to move / Press START to choose",
      { fontSize: "18px", color: "#dddddd" }
    );

    this.pauseOptionTexts = this.pauseOptionLabels.map((label, index) =>
      centeredText(
        this,
        config.width / 2,
        config.height / 2 - 10 + index * 60,
        label,
        {
          fontSize: "22px",
          color: "#ffffff",
        }
      )
    );

    this.pauseMenu = this.add.container(0, 0, [
      overlay,
      panel,
      title,
      help,
      ...this.pauseOptionTexts,
    ]);
    this.pauseMenu.setDepth(1000);
    this.updatePauseMenuVisuals();
  }

  closePauseMenu() {
    this.isPaused = false;
    if (this.physics.world) {
      this.physics.world.resume();
    }
    this.pauseMenu?.destroy();
    this.pauseMenu = null;
    this.pauseOptionTexts = [];
  }

  navigatePauseMenu(code) {
    if (!this.pauseMenu) {
      return;
    }
    if (code.includes("U") || code.includes("L")) {
      this.pauseSelection =
        (this.pauseSelection + this.pauseOptionLabels.length - 1) %
        this.pauseOptionLabels.length;
    }
    if (code.includes("D") || code.includes("R")) {
      this.pauseSelection =
        (this.pauseSelection + 1) % this.pauseOptionLabels.length;
    }
    this.updatePauseMenuVisuals();
  }

  updatePauseMenuVisuals() {
    this.pauseOptionTexts.forEach((txt, idx) => {
      if (!txt) {
        return;
      }
      const selected = idx === this.pauseSelection;
      txt.setColor(selected ? "#ffff66" : "#ffffff");
      txt.setStyle({ fontStyle: selected ? "bold" : "normal" });
    });
  }

  confirmPauseSelection() {
    if (!this.pauseMenu) {
      return;
    }
    this.applyPauseSelection(this.pauseSelection);
  }

  applyPauseSelection(index) {
    switch (index) {
      case 0:
        this.closePauseMenu();
        break;
      case 1:
        this.closePauseMenu();
        this.scene.start("StartScene");
        break;
      case 2:
        this.closePauseMenu();
        this.concludeRun();
        break;
      default:
        this.closePauseMenu();
    }
  }

  concludeRun(message) {
    if (this.gameEnded) {
      return;
    }
    this.gameEnded = true;
    this.isPaused = true;
    if (this.pauseMenu) {
      this.pauseMenu.destroy();
      this.pauseMenu = null;
      this.pauseOptionTexts = [];
    }
    if (this.physics.world && !this.physics.world.isPaused) {
      this.physics.world.pause();
    }
    let banner = null;
    if (message) {
      banner = centeredText(
        this,
        config.width / 2,
        config.height / 2,
        message,
        {
          fontSize: "40px",
          color: "#ff7676",
          fontStyle: "bold",
          backgroundColor: "#000000aa",
          padding: { x: 16, y: 8 },
        }
      );
    }
    this.time.delayedCall(message ? 1500 : 200, () => {
      banner?.destroy();
      this.scene.start("EndScene", {
        round,
        controllers: { ...ctrlMode },
      });
    });
  }

  handleCastleDestroyed() {
    this.concludeRun("Castle Destroyed!");
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  pixelArt: true,
  scene: [StartScene, MainScene, EndScene],
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
};

const game = new Phaser.Game(config);

function drawGame() {
  clearDrawn();
  if (player1 && ctrlMode.P1) {
    player1.placeUI();
  }
  if (player2 && ctrlMode.P2) {
    player2.placeUI();
  }
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

function playHitSound(scene, baseFreq = 440) {
  const ctx = scene.sound?.context;
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const freq = baseFreq * (0.85 + Math.random() * 0.3);
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(freq, now);
  osc.type = "triangle";
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  osc.start(now);
  osc.stop(now + 0.15);
}

function flashDamage(entity) {
  flashTint(entity, 0xff5555, 120);
}

function handleDamageFeedback(entity) {
  if (!entity) return;
  flashDamage(entity);
  if (entity.damageTone) {
    playHitSound(entity.scene, entity.damageTone);
  }
}

function playLevelSound(scene) {
  const ctx = scene.sound?.context;
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(500, now);
  osc.frequency.linearRampToValueAtTime(750, now + 0.25);
  osc.type = "sawtooth";
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.start(now);
  osc.stop(now + 0.3);
}

function applyHeroScaling(hero) {
  const scale = Math.pow(1.12, hero.level - 1);
  hero.maxhealth = hero.baseMaxhealth * scale;
  hero.health = hero.maxhealth;
  hero.damage = hero.baseDamage * scale;
  hero.maxmana = hero.baseMaxmana * scale;
  hero.mana = hero.maxmana;
  hero.attackable = true;
  hero.setTint(0xffff88);
  hero.scene.time.delayedCall(250, () => hero.setTint());
}

function grantHeroXP(hero, amount) {
  if (!hero || hero.kind !== KIND.HERO) return;
  hero.xp = (hero.xp || 0) + amount;
  hero.xpToLevel = hero.xpToLevel || 100;
  while (hero.xp >= hero.xpToLevel) {
    hero.xp -= hero.xpToLevel;
    hero.xpToLevel = Math.floor(hero.xpToLevel * 1.2);
    hero.level++;
    applyHeroScaling(hero);
    playLevelSound(hero.scene);
  }
}

function playHealSound(scene) {
  const ctx = scene.sound?.context;
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.linearRampToValueAtTime(520, now + 0.2);
  osc.type = "sine";
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  osc.start(now);
  osc.stop(now + 0.25);
}

function flashTint(entity, color, duration = 150) {
  if (!entity?.setTint) return;
  entity.setTint(color);
  entity.scene.time.delayedCall(duration, () => entity.setTint());
}

class Entity extends Phaser.GameObjects.Sprite {
  pathTargets = [];
  attackTargets = [];
  targettable = [];
  currentTarget = null;
  kind = ""; // path, hero, enemy,  base, ui
  attackRadius = 0.02;
  hitboxRadius = 0.01;
  visionRadius = 0.2;
  damage = 1;
  baseDamage = 1;
  health = 50;
  maxhealth = 50;
  baseMaxhealth = 50;
  healthRegenPerSec = 0;
  mana = 100;
  maxmana = 100;
  manaRegenPerSec = 0;
  xp = 0;
  xpToLevel = 100;
  speed = 40;
  level = 1;
  attackable = true;
  onDeath = (killed, killer) => {}; // to be overridden by player
  spells = []; // to be overridden by player, must be 6
  walkAnimationPrefix = "";
  attackAnimationPrefix = "";
  attacking = false;
  player = null;
  damageTone = 0;

  constructor(scene, x, y, kind, texture) {
    super(scene, x * config.width, y * config.height, texture);
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this, 0);
    this.kind = kind;
    this.baseDamage = this.damage;
    this.baseMaxhealth = this.maxhealth;
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

  appendTarget(entity, prioritize = false) {
    if (entity.kind !== KIND.PATH) {
      if (entity.attackable === false) {
        return;
      }
      const existingIndex = this.attackTargets.indexOf(entity);
      if (existingIndex !== -1) {
        if (prioritize && existingIndex !== 0) {
          this.attackTargets.splice(existingIndex, 1);
          this.attackTargets.unshift(entity);
          this.currentTarget = entity;
        }
        return;
      }
      if (prioritize) {
        this.attackTargets.unshift(entity);
        this.currentTarget = entity;
      } else {
        this.attackTargets.push(entity);
        if (!this.currentTarget || this.currentTarget.kind === KIND.PATH) {
          this.currentTarget = this.attackTargets[0];
        }
      }
      return;
    }
    if (!this.pathTargets.includes(entity)) {
      this.pathTargets.push(entity);
    }
    if (!this.currentTarget || this.currentTarget.kind === KIND.PATH) {
      this.currentTarget = this.pathTargets[0];
    }
  }
  popTarget() {
    if (this.currentTarget) {
      if (this.currentTarget.kind !== KIND.PATH) {
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
    if (this.health <= 0) return;
    handleDamageFeedback(this);
    this.health -= amount;
    if (this.health <= 0) {
      this.die(from);
    }
  }

  die(by) {
    if (!this.active) return;
    this.body.setVelocity(0, 0);
    this.attackable = false;
    if (this.kind === KIND.CREEP) enemiesCount--;
    this.onDeath(this, by);
    if (this.kind === KIND.HERO) {
      this.setActive(false);
      this.setVisible(false);
      if (this.body) {
        this.body.enable = false;
        this.body.setVelocity(0, 0);
      }
      const delay =
        this.healthRegenPerSec > 0
          ? ((this.maxhealth * 0.5) / this.healthRegenPerSec) * 1000
          : 5000;
      this.scene.time.delayedCall(delay, () => {
        if (!this.scene || this.health > 0) return;
        this.health = this.maxhealth * 0.5;
        this.attackable = true;
        this.pathTargets = [];
        this.attackTargets = [];
        this.currentTarget = null;
        this.setPosition(this.home?.x ?? this.x, this.home?.y ?? this.y);
        this.setActive(true);
        this.setVisible(true);
        if (this.body) {
          this.body.enable = true;
          this.body.setVelocity(0, 0);
        }
      });
    } else {
      this.destroy();
    }
  }

  update(_time, delta) {
    if (!this.active) return;
    const dt = delta / 1000;
    if (this.healthRegenPerSec > 0 && this.health < this.maxhealth) {
      this.health = Math.min(
        this.maxhealth,
        this.health + this.healthRegenPerSec * dt
      );
    }
    if (this.manaRegenPerSec > 0 && this.mana < this.maxmana) {
      this.mana = Math.min(this.maxmana, this.mana + this.manaRegenPerSec * dt);
    }
    if (this.kind === KIND.PATH) return;
    if (this.kind === KIND.BASE) {
      if (this.goldPerSec) {
        gold += this.goldPerSec * dt;
        this.scene?.goldText?.setText(
          `Gold: ${gold.toFixed(0)} (+${this.goldPerSec.toFixed(1)}/s)`
        );
      }
      return;
    }
    if (this.currentTarget?.health <= 0) this.popTarget();
    if (!this.currentTarget || this.currentTarget.kind === KIND.PATH)
      this.lookForTargets();
    if (this.currentTarget) {
      const distance = this.distanceTo(this.currentTarget);
      if (distance < this.attackRadius + this.currentTarget.hitboxRadius) {
        if (this.currentTarget.kind === KIND.PATH) {
          this.popTarget();
        } else {
          if (!this.attacking && this.currentTarget.attackable) this.attack();
        }
      } else {
        this.walkTo(this.currentTarget);
      }
    } else if (this.kind === KIND.HERO && this.home) {
      const dx = this.home.x - this.x;
      const dy = this.home.y - this.y;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq > 25) {
        this.scene.physics.moveTo(this, this.home.x, this.home.y, 40);
        this.play(`${this.walkAnimationPrefix}_${this.getDirection()}`, true);
      } else {
        this.idle();
      }
    } else {
      this.idle();
    }
    if (this.kind === KIND.HERO) {
      attemptHeroCast(this);
    }
  }

  lookForTargets(entities = this.targettable) {
    for (const entity of entities) {
      if (entity === this) continue;
      if (entity.health <= 0) continue;
      const distance = this.distanceTo(entity);
      if (distance > this.visionRadius) continue;
      switch (this.kind) {
        case KIND.CREEP:
          if (entity.kind === KIND.HERO) {
            this.appendTarget(entity, true);
          } else if (
            entity.kind === KIND.BASE &&
            this.attackTargets.length === 0
          ) {
            this.appendTarget(entity);
          }
          break;
        case KIND.HERO:
          if (entity.kind === KIND.CREEP) {
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
    this.heroes = [];
    this.faith = 0;
    this.luck = 0;
    this.base = null;
    this.entities = []; // all the entities this player can select
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
      let fallback = killer && this.entities.includes(killer) ? killer : null;
      if (!fallback) {
        fallback = this.entities.find(
          (entity) => entity !== killed && entity.health > 0
        );
      }
      if (fallback) {
        this.select(fallback);
      } else {
        this.selection = null;
      }
    }
    if (killed.kind !== KIND.HERO) {
      this.entities = this.entities.filter((e) => e !== killed);
    }
  }

  linkBase(base) {
    this.base = base;
    this.entities.push(base);
    this.select(base);
  }

  addControllable(entity) {
    if (!entity) {
      return;
    }
    if (!this.entities.includes(entity)) {
      this.entities.push(entity);
    }
    if (entity.kind === KIND.HERO && !this.heroes.includes(entity)) {
      this.heroes.push(entity);
      entity.spells = entity.spells || [null, null];
      ensureHeroSpellSlots(entity, this);
    }
    entity.player = this;
    if (entity.kind === KIND.HERO) {
      entity.onDeath = (killed) => this.onEntityDeath(killed);
    }
  }

  onPress(button) {
    const selection = this.selection;
    if (!selection) {
      return;
    }
    if (selection.kind === KIND.BASE) {
      handleBaseButton(this, selection, button);
    } else if (selection.kind === KIND.HERO) {
      handleHeroButton(this, selection, button);
    }
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
    if (!this.selection || this.selection.health <= 0) {
      const fallback = this.entities.find((e) => e.health > 0);
      if (fallback) {
        this.select(fallback);
      } else {
        return;
      }
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
    //drawRect(0xff0000, x, y, cellSide * 76, cellSide * 38);
    const selection = this.selection;
    if (!selection || selection.health <= 0) {
      return;
    }
    const isBase = selection.kind === KIND.BASE;
    // portrait
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 34,
      cellSide * 34,
      isBase ? "castle" : selection.anims.currentFrame?.textureKey,
      isBase ? undefined : selection.anims.currentFrame?.textureFrame
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
      cellSide * 10
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
    drawRect(
      0x00ff00,
      x + x_offset,
      y + y_offset,
      cellSide * 34 * (selection.health / selection.maxhealth),
      cellSide * 4
    );
    y_offset += cellSide * 6;
    drawRect(0xffff00, x + x_offset, y + y_offset, cellSide * 34, cellSide * 4);
    drawRect(
      0x0000ff,
      x + x_offset,
      y + y_offset,
      cellSide * 34 * (selection.mana / selection.maxmana),
      cellSide * 4
    );
  }
}

function handleBaseButton(player, base, button) {
  switch (button) {
    case 1:
    case 2:
    case 3:
      upgradeBaseSpell(base, button - 1);
      break;
    case 4:
      upgradeBaseGold(base);
      break;
    case 5:
      upgradeBaseHealth(base);
      break;
    case 6:
      upgradeBaseRegen(base);
      break;
    default:
      break;
  }
}

function handleHeroButton(player, hero, button) {
  const levelMultiplier = Math.max(hero.level, 1);
  switch (button) {
    case 1:
      heroUpgradeMaxHealth(hero, levelMultiplier);
      break;
    case 2:
      heroUpgradeMaxMana(hero, levelMultiplier);
      break;
    case 3:
      rerollHeroSpell(player, hero, 0);
      break;
    case 4:
      heroUpgradeRegen(hero, levelMultiplier, "health");
      break;
    case 5:
      heroUpgradeRegen(hero, levelMultiplier, "mana");
      break;
    case 6:
      rerollHeroSpell(player, hero, 1);
      break;
    default:
      break;
  }
}

function upgradeCost(baseCost, levelMultiplier) {
  return Math.floor(baseCost * levelMultiplier);
}

function upgradeBaseSpell(base, index) {
  const nextLevel = (base.spellLevels[index] || 0) + 1;
  const cost = BASE_COST.spell[index] * nextLevel;
  if (!spendGold(cost)) return;
  base.spellLevels[index] = nextLevel;
  [player1, player2].forEach((p) => {
    if (!p) return;
    p.heroes.forEach((hero) => ensureHeroSpellSlots(hero, p));
  });
}

function upgradeBaseGold(base) {
  const cost = BASE_COST.goldRate * (base.goldUpgradeLevel + 1);
  if (!spendGold(cost)) return;
  base.goldUpgradeLevel++;
  base.goldPerSec += 1;
  refreshGoldText();
}

function upgradeBaseHealth(base) {
  const cost = BASE_COST.maxHealth * (base.maxHealthLevel + 1);
  if (!spendGold(cost)) return;
  base.maxHealthLevel++;
  base.maxhealth *= 1.15;
  base.baseMaxhealth = base.maxhealth;
  base.health = base.maxhealth;
}

function upgradeBaseRegen(base) {
  const cost = BASE_COST.regen * (base.regenLevel + 1);
  if (!spendGold(cost)) return;
  base.regenLevel++;
  base.healthRegenPerSec = (base.healthRegenPerSec || 0) + 1;
}

function heroUpgradeMaxHealth(hero, levelMultiplier) {
  const cost = upgradeCost(HERO_UPGRADE_COST.health, levelMultiplier);
  if (!spendGold(cost)) return;
  hero.baseMaxhealth *= 1.15;
  hero.maxhealth = hero.baseMaxhealth;
  hero.health = hero.maxhealth;
}

function heroUpgradeMaxMana(hero, levelMultiplier) {
  const cost = upgradeCost(HERO_UPGRADE_COST.mana, levelMultiplier);
  if (!spendGold(cost)) return;
  hero.baseMaxmana = (hero.baseMaxmana || hero.maxmana || 100) * 1.15;
  hero.maxmana = hero.baseMaxmana;
  hero.mana = hero.maxmana;
}

function heroUpgradeRegen(hero, levelMultiplier, type) {
  const cost =
    type === "health"
      ? upgradeCost(HERO_UPGRADE_COST.healthRegen, levelMultiplier)
      : upgradeCost(HERO_UPGRADE_COST.manaRegen, levelMultiplier);
  if (!spendGold(cost)) return;
  if (type === "health") {
    hero.healthRegenPerSec += 1;
  } else {
    hero.manaRegenPerSec += 1;
  }
}

function rerollHeroSpell(player, hero, slot) {
  if (!player?.base?.spellLevels?.some((lvl) => lvl > 0)) return;
  const cost = upgradeCost(HERO_UPGRADE_COST.spell, hero.level);
  if (!spendGold(cost)) return;
  assignHeroSpell(hero, player, slot, true);
}

function getUnlockedSpellIds(player) {
  if (!player?.base?.spellLevels) return [];
  const result = [];
  player.base.spellLevels.forEach((lvl, idx) => {
    if (lvl > 0) result.push(idx);
  });
  return result;
}

function ensureHeroSpellSlots(hero, player) {
  if (!hero.spells) hero.spells = [null, null];
  const unlocked = getUnlockedSpellIds(player);
  if (!unlocked.length) return;
  hero.spells.forEach((spell, slot) => {
    if (!spell) {
      assignHeroSpell(hero, player, slot, true);
    }
  });
}

function assignHeroSpell(hero, player, slot, forceDifferent = true) {
  const unlocked = getUnlockedSpellIds(player);
  if (!unlocked.length) return;
  let available = unlocked.slice();
  const otherSlot = slot === 0 ? hero.spells?.[1] : hero.spells?.[0];
  if (otherSlot?.id !== undefined && forceDifferent !== false) {
    available = available.filter((id) => id !== otherSlot.id);
    if (!available.length) {
      available = unlocked.slice();
    }
  }
  const spellId =
    available[Math.floor(Math.random() * available.length)] ?? unlocked[0];
  hero.spells[slot] = createSpellInstance(spellId);
}

function createSpellInstance(id) {
  switch (id) {
    case 0:
      return {
        id,
        type: SPELL_TYPES.AOE_SELF,
        radius: Phaser.Math.Between(60, 140),
        baseValue: Phaser.Math.Between(30, 60),
      };
    case 1:
      return {
        id,
        type: SPELL_TYPES.AOE_RANDOM,
        radius: Phaser.Math.Between(80, 180),
        baseValue: Phaser.Math.Between(25, 55),
      };
    case 2:
      return {
        id,
        type: SPELL_TYPES.MASS_HEAL,
        baseValue: Phaser.Math.Between(35, 70),
      };
    default:
      return null;
  }
}

function attemptHeroCast(hero) {
  if (
    !hero.spells ||
    hero.health <= 0 ||
    !hero.currentTarget ||
    hero.mana < hero.maxmana
  )
    return;
  const readySlots = [];
  hero.spells.forEach((spell, idx) => {
    if (!spell) return;
    if (hero.mana >= spell.baseValue) {
      readySlots.push(idx);
    }
  });
  if (!readySlots.length) return;
  const slot =
    readySlots[Math.floor(Math.random() * readySlots.length)] ?? readySlots[0];
  const spell = hero.spells[slot];
  if (!spell) return;
  if (executeHeroSpell(hero, spell)) {
    hero.mana = Math.max(0, hero.mana - spell.baseValue);
  }
}

function executeHeroSpell(hero, spell) {
  const player = hero.player;
  const base = player?.base;
  const spellLevel = base?.spellLevels?.[spell.id] || 1;
  const multiplier = Math.pow(1.2, Math.max(0, spellLevel - 1));
  const potency = spell.baseValue * multiplier;
  switch (spell.type) {
    case SPELL_TYPES.AOE_SELF:
      castAreaDamage(hero.x, hero.y, spell.radius, potency, hero);
      return true;
    case SPELL_TYPES.AOE_RANDOM: {
      const target = randomCreepInRange(hero, hero.visionRadius);
      const centerX = target?.x ?? hero.x;
      const centerY = target?.y ?? hero.y;
      castAreaDamage(centerX, centerY, spell.radius, potency, hero);
      return true;
    }
    case SPELL_TYPES.MASS_HEAL:
      castMassHeal(hero, potency);
      return true;
    default:
      return false;
  }
}

function castAreaDamage(cx, cy, radius, damage, caster) {
  neutrals.forEach((creep) => {
    if (!creep || creep.health <= 0) return;
    const dist = Phaser.Math.Distance.Between(cx, cy, creep.x, creep.y);
    if (dist <= radius) {
      creep.takeDamage(damage, caster);
    }
  });
}

function randomCreepInRange(hero, maxRadius) {
  const candidates = neutrals.filter(
    (creep) =>
      creep &&
      creep.health > 0 &&
      Phaser.Math.Distance.Between(hero.x, hero.y, creep.x, creep.y) /
        config.width <= maxRadius
  );
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function castMassHeal(hero, amount) {
  const player = hero.player;
  if (!player) return;
  playHealSound(hero.scene);
  player.entities.forEach((entity) => {
    if (!entity || entity.health <= 0) return;
    entity.health = Math.min(entity.maxhealth || entity.health, entity.health + amount);
    flashTint(entity, 0x55ff55, 200);
  });
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
      entity.kind === KIND.UI ||
      entity.kind === KIND.PATH ||
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
    drawnImages.push(img);
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

function initAnimations(scene) {
  ANIMATION_BATCHES.forEach((def) =>
    createAnimations(scene, def[0], def[1], def[2], def[3] || 0)
  );
}

function clearDrawn() {
  graphics.clear();
  drawnImages.forEach((img) => img.destroy());
  drawnImages = [];
}

function ensureBackgroundTexture(targetScene) {
  if (targetScene.textures.exists(BACKGROUND_TEXTURE_KEY)) {
    return;
  }
  const width = config.width;
  const height = config.height;
  const rt = targetScene.add.renderTexture(0, 0, width, height).setOrigin(0, 0);
  const baseColor = 0x6b9b40;
  rt.fill(baseColor, 1);

  const tempGraphics = targetScene.add.graphics();
  const grassCount = 5000;
  const grassColor = 0x5a8840;

  for (let i = 0; i < grassCount; i++) {
    const x = Phaser.Math.Between(0, width);
    const y = Phaser.Math.Between(0, height);
    const h = Phaser.Math.Between(2, 8);
    const w = 1;
    tempGraphics.fillStyle(grassColor, Phaser.Math.FloatBetween(0.4, 1));
    tempGraphics.fillRect(x, y, w, h);
  }

  rt.draw(tempGraphics);
  tempGraphics.destroy();
  rt.saveTexture(BACKGROUND_TEXTURE_KEY);
  rt.destroy();
}

function placeBackground(targetScene) {
  ensureBackgroundTexture(targetScene);
  return targetScene.add
    .image(0, 0, BACKGROUND_TEXTURE_KEY)
    .setOrigin(0, 0)
    .setDepth(-10);
}

function centeredText(scene, x, y, text, style) {
  return scene.add.text(x, y, text, style).setOrigin(0.5);
}

function bindKeys(scene, handler) {
  scene.input.keyboard.on("keydown", handler, scene);
  scene.events.once(SHUTDOWN, () =>
    scene.input.keyboard.off("keydown", handler, scene)
  );
}

function refreshGoldText() {
  const rate = player1?.base?.goldPerSec || player2?.base?.goldPerSec || 0;
  scene?.goldText?.setText(
    `Gold: ${gold.toFixed(0)} (+${rate.toFixed(1)}/s)`
  );
}

function spendGold(amount) {
  if (gold < amount) {
    return false;
  }
  gold -= amount;
  refreshGoldText();
  return true;
}

function clampToArena(vec) {
  return new Phaser.Math.Vector2(
    Phaser.Math.Clamp(vec.x, 0.08, 0.92),
    Phaser.Math.Clamp(vec.y, 0.08, 0.92)
  );
}

function createHeroUnit(scene, position, type) {
  const texture = type === "range" ? "range_walk" : "melee_walk";
  const hero = new Entity(scene, position.x, position.y, KIND.HERO, texture);
  hero.walkAnimationPrefix = texture;
  hero.attackAnimationPrefix =
    type === "range" ? "range_attack" : "melee_attack";
  hero.damage = type === "range" ? 40 : 60;
  hero.health = hero.maxhealth = type === "range" ? 80 : 120;
  hero.attackRadius = type === "range" ? 0.2 : 0.08;
  hero.visionRadius = type === "range" ? 0.25 : 0.15;
  hero.hitboxRadius = 0.02;
  hero.attackable = true;
  hero.home = { x: hero.x, y: hero.y };
  hero.damageTone = type === "range" ? 640 : 520;
  hero.healthRegenPerSec = type === "range" ? 6 : 9;
  hero.baseDamage = hero.damage;
  hero.baseMaxhealth = hero.maxhealth;
  hero.maxmana = type === "range" ? 140 : 110;
  hero.baseMaxmana = hero.maxmana;
  hero.mana = 0;
  hero.manaRegenPerSec = type === "range" ? 8 : 6;
  hero.spells = [null, null];
  hero.xp = 0;
  hero.xpToLevel = 100;
  return hero;
}

function createDefenderFormation(scene) {
  const defenders = [];
  const center = new Phaser.Math.Vector2(0.5, 0.5);
  HORDE_LANES.forEach((lane) => {
    const direction = new Phaser.Math.Vector2(lane.spawn.x, lane.spawn.y)
      .subtract(center)
      .normalize();
    const rangePos = clampToArena(
      center.clone().add(direction.clone().scale(0.18))
    );
    const meleePos = clampToArena(
      center.clone().add(direction.clone().scale(0.32))
    );
    defenders.push(
      createHeroUnit(scene, rangePos, "range"),
      createHeroUnit(scene, meleePos, "melee")
    );
  });
  defenderUnits = defenders;
  return defenders;
}

function createCastleWaypoints(scene) {
  castleWaypoints = CASTLE_CORNERS.map((corner) => {
    const marker = new Entity(scene, corner.x, corner.y, KIND.PATH, "");
    marker.disappear();
    return marker;
  });
  return castleWaypoints;
}

function assignDefendersToPlayers(defenders) {
  const activeP1 = ctrlMode.P1;
  const activeP2 = ctrlMode.P2;
  defenders.forEach((hero) => {
    if (!hero) {
      return;
    }
    const normalizedX = hero.x / config.width;
    if (activeP1 && activeP2) {
      if (normalizedX < 0.5) {
        player1?.addControllable(hero);
      } else {
        player2?.addControllable(hero);
      }
    } else if (activeP1) {
      player1?.addControllable(hero);
    } else if (activeP2) {
      player2?.addControllable(hero);
    } else {
      player1?.addControllable(hero);
      player2?.addControllable(hero);
    }
  });
}

function spawnEnemyWave(scene, defenders, base, waypoints) {
  if (
    !base ||
    !defenders ||
    !defenders.length ||
    !waypoints ||
    !waypoints.length
  ) {
    return;
  }
  HORDE_LANES.forEach((lane) => {
    const spawn = lane.spawn;
    const creep = new Entity(
      scene,
      spawn.x,
      spawn.y,
      KIND.CREEP,
      "goblin_walk"
    );
    creep.walkAnimationPrefix = "goblin_walk";
    creep.attackAnimationPrefix = "goblin_attack";
    const roundMultiplier = Math.pow(1.2, Math.max(0, round - 1));
    creep.damage = 12 * roundMultiplier;
    creep.health = creep.maxhealth = 90 * roundMultiplier;
    creep.damageTone = 300;
    creep.attackRadius = 0.08;
    creep.visionRadius = 0.4;
    creep.hitboxRadius = 0.02;
    creep.targettable.push(...defenders, base);
    defenders.forEach((hero) => {
      if (!hero || !hero.targettable) {
        return;
      }
      if (!hero.targettable.includes(creep)) {
        hero.targettable.push(creep);
      }
    });
    const waypoint = waypoints[lane.cornerIndex];
    if (waypoint) {
      creep.appendTarget(waypoint);
    }
    creep.onDeath = () => {
      defenders.forEach((hero) => {
        if (!hero || !hero.targettable) {
          return;
        }
        const idx = hero.targettable.indexOf(creep);
        if (idx >= 0) {
          hero.targettable.splice(idx, 1);
        }
      });
      const deathX = creep.x;
      const deathY = creep.y;
      defenders.forEach((hero) => {
        if (!hero || hero.kind !== KIND.HERO || hero.health <= 0) return;
        const dist =
          Phaser.Math.Distance.Between(hero.x, hero.y, deathX, deathY) /
          config.width;
        if (dist <= hero.visionRadius) {
          grantHeroXP(hero, 25);
        }
      });
      neutrals = neutrals.filter((entity) => entity !== creep);
    };
    neutrals.push(creep);
    enemiesCount++;
  });
}

function resetDefenders(defenders) {
  defenders.forEach((hero) => {
    if (!hero || !hero.home) {
      return;
    }
    hero.pathTargets = [];
    hero.attackTargets = [];
    hero.currentTarget = null;
    hero.attacking = false;
  });
}

function createBase() {
  const base = new Entity(scene, 0.5, 0.5, KIND.BASE, "castle");
  base.setScale(3);
  base.maxhealth = 800;
  base.health = base.maxhealth;
  base.baseMaxhealth = base.maxhealth;
  base.hitboxRadius = 0.08;
  base.attackable = true;
  base.damageTone = 200;
  base.goldPerSec = 5;
  base.baseGoldPerSec = base.goldPerSec;
  base.healthRegenPerSec = 3;
  base.goldUpgradeLevel = 0;
  base.maxHealthLevel = 0;
  base.regenLevel = 0;
  base.spellLevels = [0, 0, 0];
  return base;
}
