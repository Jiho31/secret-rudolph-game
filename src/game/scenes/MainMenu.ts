import { GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;
  item: GameObjects.Group;

  constructor() {
    super("MainMenu");
  }

  create() {
    // this.background = this.add.image(512, 384, "background");
    this.background = this.make.image({
      x: 182,
      y: this.scene.systems.scale.height / 2,
      key: "background",
      scale: { x: 1.1, y: 1.1 },
    });

    this.logo = this.add.image(512, 300, "logo").setDepth(100);

    this.title = this.add
      .text(182, this.scene.systems.scale.height / 2, "Start Game", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    this.title.setInteractive().on(
      "pointerdown",
      function () {
        // ...
        // console.log("clicked");
        this.changeScene();
      },
      this
    );

    // this.item = this.physics.add.group();

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    // this.scene.start("Game");
    this.scene.start("RudolphGame");
  }

  spawnItem(itemKey) {
    let newItem = this.add.image(10, Math.floor(Math.random() * 100), itemKey);
    console.log("SPAWN ITEM!", itemKey);

    // this.item.add(newItem);
  }

  moveLogo(reactCallback: ({ x, y }: { x: number; y: number }) => void) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
        y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if (reactCallback) {
            reactCallback({
              x: Math.floor(this.logo.x),
              y: Math.floor(this.logo.y),
            });
          }
        },
      });
    }
  }
}

