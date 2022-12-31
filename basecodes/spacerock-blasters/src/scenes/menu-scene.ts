import * as Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
    spaceBarText: Phaser.GameObjects.Text
    updateNumber: integer

    constructor () {
        super("MainMenu")
    }

    create() {
        this.add.text(0,100, "Spacerock Blasters", {fontSize: "7em",fontFamily: "monospace", align: "center", fixedWidth: 800})

        this.spaceBarText = this.add.text(0, 500, "Press <spacebar> to continue", {fontSize: "5em", fontFamily: "monospace", align: "center", fixedWidth: 800})

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).onUp = () => {
            this.scene.start("LevelOneIntro")
        }

        this.updateNumber = 0
    }

    update(time: number, delta: number): void {
        this.updateNumber += 1
        this.spaceBarText.setTint(new Phaser.Display.Color().setFromRGB({r: this.updateNumber % 127 + 127}).color32) //red text that glows a little
    }
}