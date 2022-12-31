import * as Phaser from "phaser";

import rockImage from "../images/rock.png"
import groundImage from "../images/ground.png"
import bulletImage from "../images/bullet.png"
import launcherImage from "../images/launcher.png"

type Vector2 = Phaser.Math.Vector2
type PhysicsGroup = Phaser.Physics.Arcade.Group

function shootBullet(start: Vector2, target: Vector2, bullets: PhysicsGroup){
    const startVelocity = target.subtract(start).normalize().scale(600)

    const bullet: Phaser.Physics.Arcade.Image = bullets.create(start.x, start.y)
    bullet.setVelocity(startVelocity.x, startVelocity.y)
}

function launcher(launchX: number, launchY: number, pointer: Phaser.Input.Pointer, bullets: PhysicsGroup){
    return () => {
        const start = new Phaser.Math.Vector2(launchX, launchY)
        const target = new Phaser.Math.Vector2(pointer.x, pointer.y)
        shootBullet(start, target, bullets)
    }
}

export default class LevelOne extends Phaser.Scene {
    ground: Phaser.Physics.Arcade.Image
    rocks: PhysicsGroup
    dustParticles: Phaser.GameObjects.Particles.ParticleEmitterManager

    scoreText: Phaser.GameObjects.Text
    score: integer

    launchers: Phaser.GameObjects.Sprite[]

    constructor () {
        super("LevelOne")
    }

    preload()  {
        this.load.image('rock', rockImage);
        this.load.image('dust', rockImage);
        this.load.image('ground', groundImage);
        this.load.image('bullet', bulletImage);
        this.load.image('launcher', launcherImage)
    }
    
    create() {
        this.dustParticles = this.add.particles('dust');
        this.ground = this.physics.add.staticImage(400, 580, 'ground');
        this.rocks = this.physics.add.group({defaultKey: "rock"})

        const bullets = this.physics.add.group({defaultKey: "bullet"})

        const pointer = this.input.activePointer

        this.launchers = []

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE).onDown = launcher(
            100, 580,
            pointer,
            bullets
        )
        this.launchers.push(this.add.sprite(100, 580, "launcher"))

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO).onDown = launcher(
            400, 580,
            pointer,
            bullets
        )
        this.launchers.push(this.add.sprite(400, 580, "launcher"))

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).onDown = launcher(
            700, 580,
            pointer,
            bullets
        )
        this.launchers.push(this.add.sprite(700, 580, "launcher"))

        this.physics.add.collider(this.rocks, this.ground, (_, rock) => {
            rock.destroy()
            this.score -= 100
            this.scoreText.setText(`Score: ${this.score}`)
        })

        this.physics.add.collider(this.rocks, bullets, (obj1, obj2) => {
            obj1.destroy()
            obj2.destroy()
            this.score += 10
            this.scoreText.setText(`Score: ${this.score}`)
        })

        this.score = 500

        this.scoreText = this.add.text(0,0, `Score: ${this.score}`)

        
    }
    update(time: number, delta: number): void {
        if (Math.random() < 1.0/150.0){

            var emitter = this.dustParticles.createEmitter({
                speed: 10,
                scale: { start: 0.05, end: 0 },
                blendMode: 'ADD'
            });

            const rock: Phaser.Physics.Arcade.Image = this.rocks.create(Math.random()*600.0 + 100.0, -100)
            rock.scale = 0.2
            rock.setVelocity((Math.random() - 0.5) * 400, 0);
    
            emitter.startFollow(rock);

            rock.on("destroy", () => {
                emitter.setSpeed(100)
                emitter.explode(50, 0, 0)
            })
        }

        this.launchers.forEach((launcher) => {
            const directionVector = launcher.getCenter().subtract(this.input.activePointer.position)
            launcher.setAngle(Phaser.Math.RadToDeg(directionVector.angle())-90.0)
        })
    }
}