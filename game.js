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

// Game Constants
const SPRITE_SHEET =
  "data:image/webp;base64,UklGRkQAAABXRUJQVlA4TDgAAAAvP8ADAB8gFkz8kXLoHJyQgNjjvz12iAIBIkiJCKHu5j/GHY0AYbbRJCc5yUO4b0T/Y9uqVAH+Ag==";

const Castle =
  "data:image/webp;base64,UklGRrwXAABXRUJQVlA4TK8XAAAv/8A/EE+gqJEkZV8MR25Y87lVHElScvpSPBWKfAlUaQAQjNlW0pzhAEf7TiGQtHH9O/8BAOabvfuN09D3fZTMzMygqv9vrAmIiNDTs+1x2/7/5zeQod29h4zPJgEoW961ffFW3J0LRJS7SwBHvF+7VwDZvF67yX0NT5e8STu6/Z43Ef2XIEly2DZ90TGARNSBkg9/8DNte+Y21rY5sDwr5Sx9pasxs/IBZK9a2aXh2SKVSWOcTTmz1qibcjaqIgUoZBVlwNn14Y/i38V5ACIhhVcQ0X8IjiTHbZr2Wjwzu6SWecPk/x/xpOz8CHjtqo8A3qn6AYJy5bqlA+/06Zb+wzFADOWij8K53jVRH+t6St4dA6+3Mo7gAuFc63o8WOviQ6Let+TlTOcacASCxJ3mFVCmeFl6HIEn5M71Pg3w2VFwCvqQO1fkC7qz8ccuh07RtsSNzvXIrfQsQy747nRkH5wv8Gd67xQwd9ORtcfBlVMztr6oU9OjkLx3pyOPj8KyD2VnI9/ti/zZUej+HfNFo/94jjDx7yP72nORWufvUKz9ZGR3xQSv1/d8qe9Uo9dsC1jz4NsUaqfd6OZUsJjo+cllJydpsO1Wat4rmpAT0eigVhZNE022LfjLyP46t06i6gh0pCJejwLlxWug49BmzPhMgVH1uX3USj+VfFN1lxXfVrv3WiydHAUi80+rVdQ+Hodpp8XmGm2V00NZyzwK0+h2ZD9baqXqvaqfpJmezpOyic0/UqklqibKCguNbZ6Z6muyX2+lgI5E+5jZja86EvTorhLz52F/Fj//+f4NpvIXs1M2p0I6O6is+92hniLXp4LV3Um2MrtwiA9/HpxClLWdE2W1LN9SVbA8myxPJxMXXyeTD/HbeIwVxELaWNJJ5lq4SgUPup5qap33zjW5pbPVJI7u6GRi7OQuVmBPCoWcLk+Tv0rBO0drZTNq5XTuqTdGrGciE1eafBAVZIU8ncmByQZE6/MjQcZLPjFFd2XL8wwJKb1T9ZPPy6fH34U7Ywwbg9oMECuFQgVrNna2FtaLDFVe+dwJheMTF3J6CjAjBgeAAc9giGAEdE72A87TBhNdG5CExa0cXEFsNyCLPSXgupPtqlAv18o+bHyy9V2VpSu8KfyNTHP7ErrEL06V3bVb8Wgd0U6YXbzRzORt34l6H+hE24O8rcktLt8Gs6ZADl7eK3uCc9kHpe7qjWqXa1rBv1PG8NlS0flkeb7q93zPK+ewJ1w6FqL4v76L84AywHe52OOXVT1gX3DYw8Qfur0QnHhBewz43L2ZGNO87HnMaW9cfAi+qczEXMxJ2ka6fT8EgLuCZ2O65z2ze3nfTQ3MhcmAAda0lM9SoAjGuLBH55w/yJwoG+sOl2kM5J4ROJh90x7YOz0w8Lsh8c/LXuDUkM8ebpuYZ8+BzRpvDLMOkRhM+yDrnqvZZY/UT4UfQ+T28fulF/9u0/XRZ7XNSevM+YKMe3RNJP7QgA5erNQzWgBNwKoP7KIt8CXOhz+SaTYGfte6mLagShAtaMDjmmt6AVUMO6CuAFvhgQaepRI2YpnIFnRfz5Te6XNdE714ICzMEIxBbQYYw7UZ4vwalUkrsTFI82Ck1PqQ65S0vvDX7NqGOFWQdhnNzMDGID2FWpYgl1vfJAG8h5+e6FiXuY0oQSpuNvHpSch0LYWFa1xJc6rDlXRu64VFWs9ybTaIHsxLmJkBxvJMLu2NFScRr1xRd66jLxKnm9jOCJF3wr5I69ArCYwDdIcLQPBgX+K12j5n2Bea/Tgpi5Bjr3b0BmTxELwGvy6kUy1DnnavKni+ySwmWqz8t0pHbkFziPZA1/N2K9Skd+5/Fjsiqkb00W1zN5ZEKc03p+bOCA1Vr+P5UiQO/941l0YNGSufnPlxNL0r+cPIRIb01CS2SdUYShMFlqbRlAY95p4enXOWqu9D6bYvb5OlILVSpWcmFROcS3s6TLcFfNHvQudoMGp3Xnpq5Udui942aIp+lrc19L09VQPBFXE02uA+x1/OtNa6CLJyKfABqTkQc0CJrcL9iZIPl7BZ2m0RDuJC2uEq/bz2JWZgnsOMlLhX2ColiUNBn6fSfXtBeJSuGyXVMz4n04iC47DaRgFdH9gBix68YmAb0L0gVbLqAYcQV2JXSFTxtdaN5vWBbDaguhpgK9S0ZqqwoLWvqsB2zfU0sLWoW1lXO3g75doOYU6tsMaNFhoeqH1h3znafavN2huD2gwwBjMzsDFhZoZUQl7QnpV+nBP13ncRfzzTWms1lY+O7EZuKMzKeGHWkJWEfWZm7R+y9BK0lvpwwcGT5IeYIp/tUn4L/sGsOf8mMoWnMGOibICPJyp+MMAguM0sa/zs2Xv4FMjD44DwAfzzsBCpqaHVeD5sgAWLP/NQ3brx42eLVXr5lxBWpzp6oI6fBK+a6kJF2wfEouPgptFp+0MkB6Ti3rYum2alpSiaZWinYE6ZAaEmFS1iHAUGB9I6dhAO0L9ZfwB4DjqNx3BMdr/WvTmavaqAwNWJxp0VYrJt5svoruZEooxUPqzGUstNTHyAy7H0VyZr+8JKxRVifBaaohGT1HwDlBrP3UUAQBkz/uA3kzHJg8Z0s0aBI/M1FwAcrk9f8V6WGVBpPPTqgTDdzzVEb5lNNe2HAAQN7WtKU5Kqr26sKMkqftxqTZtXjkzGjO9nKxPNxe+nUoGi6laPCaJ+hbZ3GaLFi77q4cUDYXE6ftu59AFYXeod/Pe5bhN0Gt/dBaLZRYGXAQ+IeQ4ckMIz4EXIQuR980IyiD6qGWTjn1a7IAXI8CFVEAIYyLD3ECG10mzto3r8xkfPiNG82izt0saK4FncDrnXENh3RTwn6duMQkIKbU94fpDdqxp8Fpy9kITAIeTiCF4KqGVqhusGOo3HCtXzQrxBtJbvQzxbsb2QLcsRp5o6Lx6HrGpG0vqmSjXejJ8IKrSKPeLCvQzzUaIb0LkQC0LivYen6L1zoIoZiJ7isySeC16B+NX07NPN17P2i/06bR9k3Jebr9OzNSiw68mZs+tpG2+SAi8K/M1iepbGTc6ivZmcDTfraB8Fu/csaW9+EKb0ib6e0Rf6OqWHNE4UTHDcWmREWkwo4Lj1lEK7viLfrmf0o735QN9pHS+Bq/r4GMPtoZ/SmuyUloVxj2QnogDCAN5OyMu4KDiJwDGtTwvj/DVw/aZ62nExxtl+BG8n9CgsyOYyCloirXF4Pm6NO2B9FgF/ugDzujohRjeh+TAM8+GZy3QtTGvDKzFXj9dbO9NVoheOWQj8HGnPdZ+vh+cvh8fPk/jsyscYefUyIOdjPOK92mkvxOhp/SIYUUx4qp32Fi5Gx4vRS2DFS0x81dOecPwyuHyMzrmr2sQY/Xw4qkJ3vyOju8v74Jy/7iunHeGKntd0Oadr71y4omfAEZo899XOQYcZo9N1Mq5y4uM7YbbMOdjxj+zMjH3CcX3i/OBohEsdPmtldNTF6N0Rv6nJsBKGw1HG8IwcIjEcX1eFwEzXT9A9z9SjBCVipNdVWT1JiDHc1gROTW6uMv5WN+0IHEajuxeQ9ker7lGomvg+CiF2q9FotCMuFe925xKYc00OgWFUB7cjo8T1Em7+oWra8wLVwMcYK3C6EGZUFRejj3ScaExWVNM0SptGJ4tFNfg+KpVkjelE1CUxUESuCEncETBdV017YmYHR4nkanIr87dcdKq56Fx0plwKuiBU5mCUJjK+Rnv16O5CjPEWME16EhqlsvUMjFDbQPLVxU+j9xNHyGU9PkLaDbeHiUstu62M0EC7UcpopRutGt1D5aT0nLQ88QMcd8D1XvW0J5pPDXiSXCictqJjLZFNFueaZgznMz8UEIi/CxR9jP70dUWiz9Lu6DfVKHBCNUU0KtBkuWV7YhTE2KhSf5lJ9cR/cRBdjJFXgsQXj5ApeFQQ0CYoAUXLgOLGFLjjpYsx3nJFXCxgDLSJT4W+AmRtd055s5YB+Z7IHihj3kPie/SJo3oMhzHh+ztAJbSSaOokIftzKAIqRDBWCqxX+pV4jYH7GKM/HiqmPTwno8RbWCd5qxPgTWmkNmTbHmh0hs6+utEa4iGV03WQxE/VmKwFB/wi8lMsoc00hX1Fp4i+WsDAulpluU83MC+pLCXeUBH2cE8cSNpP3qQmqchKJlmV+6UEsmzRVZUa8C/hVI0REq56L9Vqie8jr2Ih7Y5wfpOajYzTEIXkGeQYorZnBl9xM5TWGAWcqpqfRfstJt569Dnw1QAMlEiCU1kZW+5tR0YDqEsbnWhguCg+KCbeN7VG5mkXMGm9bK7SIAJRIsO21jLlRmsl5yFrT+gkBxI/BaFa4v2LXCHtXzZ5axbtXIEC54i+MqCyd6GQgXINSpiRq8rFoy+kvVPxpnTPKAyDdOkmYZmYWwlCkyuSYGcDYZx0BL4XAte69ZcRgLQnHoJHTRqfPMnTGiiQaUzJqCzdZNWsNcVAQ+JfdY/CcS2GEdCJ+YdqNAQV185/tIIEPE49ljmviBZTKhgJuHiuka7SRF6FolEFD3CeBFlG6KRoTLaVew+AsJTOm9GNyNFw8Vwu0VTqoDVkKRqJabKgZq0oA2ZLjMkyC6oBbYW+pERljWOhcuKfrl2MPtJx4ledyc8bVQMHykhOR85TM+4JjEVZjejVECiBFrCV9FOdmb0rpf1fGg0/mFWyNwCuoiQIsEQnCrRJL4ZFNAiiVhhdseCu6jRfHHjgEK6dpByNxjDmAcblrIV7L4mSmKRxmUytYF+0vCDCUS/4y74SkCNuDyXtZ14aIX1VaXMlxHDvtnRiMDSwBG6RyJNgpJAAQ3SJUVfxv44w3UeSfiVjG50inbdAKLRMI+45QzXFAhUjcg8EiiExo0rXjuAg7Y/QV+lSWoknRmtkbAykvVROnng3FFLQsp+YUnSpTOvAjwAHuXbEWyhK/zkMKpHFAdrJtmwHEjnZeqoRZ/9zP5jC5++JyMvoXPB1Eh/81+Ed32XXDj6ZYc43wzvJNo3ogH87LLfWtpQdQ62y5Yf7dujPTJO0mAQmPhdjiPwM6MZA+bO7mW/Oh+zaUVqaxskQ9zl5+c/867k7G97BQcyAxB/iZQ0+DndSmWPaNybrGDaf+u+bD/9sGgknNo+JE2wTdNKU+LZ5mH0/f6eQn8F8liHx+k2VtA9EGgkq52xzP3zfnL8r3PBGuojIWnsCBgSZxLDZfJl/39xkCn/HxB+F09cV+CvnGK49ndW/bx7cZrPpkwakASxZtidam3GqZgt0SZ9Le/TOlIHE39bgYulD4upReGuUyuqbTfd9A8EENBruWkqYJm9OK51tNg/3SedbQEHiP+aIN28FuoPgpfkgw0ht3CXm/7PZfBL/tGwvkN+7sHb2+fN7Rp+9Ikiox6GPIcb+UDiB1xkMlpvsZQJU4d41jVaFDekyjW9RDdIh3ZvdGQ5B4XB4hCSfpPmbcE7/KqRXnZkbouRcCk9h2p9fhQ/n8I42xgDD5xhDHdp9LwoJ0r786kbnpLOctaa6YG3LLeF4lQMaz88//FMb1SQOEofkAapQma6DMF0AplHZQuBLr2FEAxeQMZTdu80TRXeAHBEAIkgw5Ih+2j3tcQQ4JK5NclGpRjraBL8rDEseAWR7ewKhMEor3UjmB4120Ab2QkPivVoK/mqvAi7KWrySaw8SWnpU+v3Q2v7s1/xsm2QaaW6Z+W2pYoT3/ay13VuMjkYul3CcL3l3DuDaue3g2knCZbaWK62/b8E/CQMgzWS5L1cUvGmNHc7GSuHLaPDiYeB6qACYWx4B4gSY5AC2mkJRZsycjP2l3K9g3h+yA0lsiQEYdTvzX/vexxgmdAyYbDezvKaVaXT+ze6dlhD95PK5Uv0eKiS4Ge0OviAxQ4ny5JLRBnxJX1WktXRj7dvSV5fIDmJjxqNUpmtwZ7I7/Ah0eO1o1TxRjMkNJQXNmJjJ2pN8rBzPJwaAUCNEji5G73lvZ1YZR3DtmCS+FMvsOXtsTMIy5UBYylWFcQKO+HOEiTvT3Qm+y9K+MQr8leVUoxrwI807weXIcneeNWeno/hReDsg/eeQOL58s+vMYXXrOYZ+JCUJF5QuutJAG/zo8bllpkLel6cnjFYlhmW8jfx556UuiHnWf76iNaR9NBr8zQOQjRwbk5pt27cZBhTp8imFJ7x4RrS46pfMp3u7mpZpQnfcA3DCQD2ioVFDJ6RDK/eOzYwCMYWnUn7al6WoH7ULotmOAy/4nhIL+ubRFCku36QH2FW4eOikURAVMy58MEAKRGPimzHRkhYTuxv/3ZKTMvk6g2tHNVIroo1KEnIVv7eWLPNb8FZeA8rQKDH7EXO3+YYeUbx4sz17ju4B5/gQ0m5jdGZUA/7KwcpPojQzJ5IyOQwndFI2uD+ZufyxcFj8h377tt5lJTh7Nhr9pg0WrUy2JuyvQrcSlpj79iS5B0E+MWXgjMik94m0VnBYNtvD3x6cB6L7QYns3IqnWARlVJNXpIcTyV0xhp4c3EDUBH5wMQvpj/Pt75xNMhneHoz+oQsDFZi0LKhomp9TKFTzP9wS93yicb2xPIxL51IbECQXzym5UnmY7W3J5EsJxwcjOdHM5j1z857fKpDRNn9A+37D/Otpz9Qzn1ymMcxsRSRo/bUBcWz+YDKcXLijUPx82pL+3hXN7DHjtw/M/37PB+KoZm7+kHaQ8O2cub1hbi+ZiLndxyCZS/51lET+DBJYXSZmS1fkA2/Zc1fEzRaRaBGI7iZEbkL7gejGtSKB/ITW90SiLE6J3CmtHdHiSBS1IGMuMkQCyoizz0X85my7nJcolsl+Yu2RMKV9T+CdmyIR8YlwCjLWk5KigBHxp7TwlHjK/FhsN3r/LhSZOx9TcS6kGiiIPsBKULx3UWSE4IOPMcRCCdGLUu9BXgyi1E0WZcLVVvxFIRb3hh9Bd8HPgE5E8NeHIPNijM774OITD16scxGUuuBTiU8QwuVWAz9+jmVtvIKAxeBcjCI+9yqPbvTBw7hsX4IPMA+CBJuVbAgi0XvXl4nXW3Fx6Mt0owgFdG5dfEnAFsU9IeJHGecu32zFgStDo1CBWCDsih9dPpY5fb0V+2Vm4UesSdyZ+HD6xMDZT1tNoxxxlh8efFXcroQfp+syvLfVtN7lHd7Nh09f8HA7Hwr4GEMWjeBd9D46F2Wl+ERsvAvR++w4BC/zfrj5owsFv7rt4GWGd27y/XztkRCjK51r0BIc7oiPXnAxhuCC8znBJUSOix4kxcniA7tYMDd/e7VN6e5jhneTrxQ6fowDr0LH8bbjOGeOV7z0Pch59CjFi5xb5nDNj1EkJbXHHYek1M07DnN+9EllpA0vQkaY0JbXLi0zXTN203UUel4l9asr4CDedgdx4GVgfgwDu9sO++QPCEOCATcf2F0N7K67PrUv3fTbubvP95Xdlv92zDrnYRu7dsFrz7TwLd3NiFYzvHoip/aWFg5vFj8jihOieEVwu4kkUXtsyR+1FKct+Uuy4ZQWccoPrl+6EL1zs/71dvw1k+7g2H34umhDJHBwFRLT7IKb0sJTRkEKxSmtQ8LjVbg+InITvPgihmMdnXXRsnfOz5ab7z+92rJqN3O+6/husuBF9ETrrD1MMgcBdNBnjk0Q8TcLR5hkSjM5UVTGK57QwnX8o+d07W4JTx46Xs3aO8fcD6ncD89YtpDdMU8WRwI53pZXSwf/ZiwGZq7s4byGtI77wcmJoMXs1dbc9GHi/XyoCUuptD/Mfd/fT9bODWfbc9GXNqmv+dz1tcgPw94OMNIP3NaAixLu69BlCl5vz6uCKzVM94SKvkZPyadXdeDKm90t5/XodsJ2Bdrd9/G+zIcqM3P2duGir2j4sMz7/qXAFekPjRm33FNryZgKcKIwskZHx3yzO40i7ixR36rm991w7gle7UZfL/H0R1qPuWMitkZVMKV6uxs2j06igtGpwpYsm2Tq9ryMDj5UekzD2Q3ZVPnjJWLvd0WM7bu+ZTKqAk/01BlYwQzaGEql5SrT+Fnod6UnIuaO2TIRVwTqNTIf896rF1UuuNRT6Sd9X1j5mFMhQsibV69e6KeKQPy+wJKF8/8blFcA";
// path points
const pathPoints = [
  // bottom to top
  { x: 0.55, y: 1.1 }, // outside , spawn point
  { x: 0.55, y: 0.7 },
  { x: 0.8, y: 0.7 },
  { x: 0.8, y: 0.3 },
  { x: 0.55, y: 0.3 },
  { x: 0.55, y: -0.1 },
  // top to bottom
  { x: 0.45, y: -0.1 },
  { x: 0.45, y: 0.3 },
  { x: 0.2, y: 0.3 },
  { x: 0.2, y: 0.7 },
  { x: 0.45, y: 0.7 },
  { x: 0.45, y: 1.1 }, // outside , spawn point
];

// anim states: idle, walk, attack, die
const IDLE = "idle";
const WALK = "walk";
const ATTACK = "attack";
const DIE = "die";
// Game variables
let graphics;
const resources = [];
const entities = [];

// Game functions
function preload() {
  this.load.spritesheet("test", SPRITE_SHEET, {
    frameWidth: 16,
    frameHeight: 16,
  });

  this.load.image("castle", Castle);
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
  const base = new Entity(scene, 0.2, 0.12, "castle");
  base.setScale(1.2, 0.5);

  const enemy = new Entity(scene, pathPoints[0].x, pathPoints[0].y, "test");
  const enemiesPath = pathPoints.map((point) => {
    const p = new Entity(scene, point.x, point.y, "test");
    p.idle();
    return p;
  });
  for (const target of enemiesPath) {
    enemy.appendTarget(target);
  }
  entities.push(enemy);

  playTone(this, 440, 0.1);
}

function onInput(event) {}

function update(_time, delta) {
  entities.forEach((entity) => {
    entity.update(_time, delta);
  });
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
  targets = [];
  currentTarget = null;

  constructor(scene, x, y, texture, frame) {
    super(scene, x * config.width, y * config.height, texture, frame);
    this.scene = scene;
    console.log(scene);
    scene.add.existing(this);
    scene.physics.add.existing(this, 0);
  }

  appendTarget(entity) {
    this.targets.push(entity);
    this.currentTarget = this.targets[0];
  }
  prependTarget(entity) {
    this.targets.unshift(entity);
    this.currentTarget = this.targets[0];
  }
  popTarget() {
    this.targets.shift();
    this.currentTarget = this.targets[0];
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
    this.play(WALK);
    this.scene.physics.moveTo(this, entity.x, entity.y, 8 * 8);
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
  }

  die() {
    this.appear();
    this.play(DIE);
    this.body.setVelocity(0, 0);
    setTimeout(() => {
      this.disappear();
    }, 2000);
  }

  update(_time, delta) {
    if (this.currentTarget) {
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.currentTarget.x,
        this.currentTarget.y
      );
      if (distance < 4) {
        this.idle();
        this.popTarget();
      } else {
        this.walkTo(this.currentTarget);
      }
    }
  }
}
