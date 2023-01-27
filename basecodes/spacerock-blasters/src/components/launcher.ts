import launcherImage from "../images/launcher.png";

type Vector2 = Phaser.Math.Vector2;
type PhysicsGroup = Phaser.Physics.Arcade.Group;

export default class Launcher {
  sprite: Phaser.GameObjects.Sprite;

  static preload(scene: Phaser.Scene) {
    scene.load.image("launcher", launcherImage);
  }

  constructor(scene: Phaser.Scene, options: { x: number; y: number }) {
    this.sprite = scene.add.sprite(options.x, options.y, "launcher");
  }

  shoot(target: Vector2, bulletGroup: PhysicsGroup) {
    const startVelocity = this.sprite
      .getCenter()
      .subtract(target)
      .negate()
      .normalize()
      .scale(600);

    const bullet: Phaser.Physics.Arcade.Image = bulletGroup.create(
      this.sprite.getCenter().x,
      this.sprite.getCenter().y
    );
    bullet.setVelocity(startVelocity.x, startVelocity.y);
  }

  pointAt(target: Vector2) {
    const directionVector = this.sprite.getCenter().subtract(target);
    this.sprite.setAngle(Phaser.Math.RadToDeg(directionVector.angle()) - 90.0);
  }
}
