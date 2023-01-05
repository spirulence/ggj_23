import * as Phaser from "phaser";

import rockImage from "../images/rock.png";
import groundImage from "../images/ground.png";
import bulletImage from "../images/bullet.png";

import Launcher from "../components/launcher";

export default class Tutorial extends Phaser.Scene {
  launchers: Launcher[];
  dustParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;

  constructor() {
    super("Tutorial");
  }

  preload() {
    this.load.image("rock", rockImage);
    this.load.image("ground", groundImage);
    this.load.image("bullet", bulletImage);
    this.load.image("dust", rockImage);
    Launcher.preload(this);
  }

  create() {
    this.physics.add.staticImage(400, 580, "ground");
    const rock = this.physics.add.staticImage(100, 100, "rock").setScale(0.2);

    this.addLaunchers();

    const bullets = this.physics.add.group({ defaultKey: "bullet" });

    this.addLauncherKeys(bullets);

    this.addTutorialText();

    this.dustParticles = this.add.particles("dust");
    const emitter = this.dustParticles.createEmitter({
      speed: 10,
      scale: { start: 0.05, end: 0 },
      blendMode: "ADD",
    });
    emitter.setPosition(100, 100);
    emitter.setFrequency(-1);
    emitter.setSpeed(100);
    emitter.startFollow(rock);

    this.physics.add.collider(bullets, rock, (obj1, obj2) => {
      obj1.destroy();
      obj2.destroy();
      emitter.explode(50, 0, 0);
    });
  }

  private addLaunchers() {
    this.launchers = [
      new Launcher(this, { x: 100, y: 580 }),
      new Launcher(this, { x: 400, y: 580 }),
      new Launcher(this, { x: 700, y: 580 }),
    ];
  }

  private addTutorialText() {
    this.add.text(120, 100, "<- This rock wants to destroy things!", {
      fontSize: "2em",
      fontFamily: "monospace",
    });
    this.add.text(
      50,
      450,
      [
        "Aim with the mouse, and press 1, 2, or 3 to shoot.",
        "Blow up the rock with a bullet to continue.",
      ],
      {
        fontSize: "2.7em",
        fontFamily: "monospace",
      }
    );
  }

  private addLauncherKeys(bullets: Phaser.Physics.Arcade.Group) {
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;
    [keyCodes.ONE, keyCodes.TWO, keyCodes.THREE].forEach((keyCode, index) => {
      const key = this.input.keyboard.addKey(keyCode);
      key.onDown = () => {
        this.launchers[index].shoot(this.input.activePointer.position, bullets);
      };
    });
  }

  update(time: number, delta: number): void {
    this.pointLaunchers();
  }

  private pointLaunchers() {
    this.launchers.forEach((launcher) => {
      launcher.pointAt(this.input.activePointer.position);
    });
  }
}
