import Actor from './Actor';
import actors from '../services/actorFactory';

export default class Player extends Actor {

  constructor (x, y, group) {
    super(x, y, actors.types.PLAYER, group);
    this.maxHealth = 3;
    this.health = 3;
    this.persuadeStrength = 10;
    this.persuadeDistance = 40;
    this.onPersuade = new Phaser.Signal();
  }

  update () {
    super.update();

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.moveRight();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.moveLeft();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.moveUp();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.moveDown();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.attack(() => {
        this.onPersuade.dispatch();
      });
    }

    if (!game.input.keyboard.isDown(Phaser.Keyboard.DOWN) &&
        !game.input.keyboard.isDown(Phaser.Keyboard.UP) &&
        !game.input.keyboard.isDown(Phaser.Keyboard.LEFT) &&
        !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) &&
        !this.attacking) {
      this.idle();
    }
  }

}
