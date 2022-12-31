import * as Phaser from "phaser";

import rockImage from "../images/rock.png"
import groundImage from "../images/ground.png"

export default class LevelOneIntro extends Phaser.Scene {

    constructor () {
        super("LevelOneIntro")
    }

    preload()  {
        this.load.image('rock', rockImage);
        this.load.image('ground', groundImage);
    }

    create() {
        this.physics.add.staticImage(400, 580, 'ground');
        this.physics.add.staticImage(100, 100, 'rock').setScale(0.2);
        this.add.text(120, 100, "<- This rock wants to destroy things!", {fontSize: "2em", fontFamily: "monospace"})

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).onUp = () => {
            this.scene.start("LevelOne")
        }
    }
}