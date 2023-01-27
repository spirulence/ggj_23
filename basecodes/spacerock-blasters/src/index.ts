import * as Phaser from "phaser";

import MainMenu from "./scenes/menu-scene";
import LevelOne from "./scenes/level1-scene";
import Tutorial from "./scenes/tutorial";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 80 },
    },
  },
  fps: {
    target: 20,
  },
  scene: [MainMenu, Tutorial, LevelOne],
};

var game = new Phaser.Game(config);
