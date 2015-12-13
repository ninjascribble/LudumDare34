import Actor from './Actor';
import actors from '../services/actorFactory';

export default class Player extends Actor {

  constructor (x, y, group) {
    super(x, y, actors.types.DUDE04, group);
    this.maxHealth = 3;
    this.health = 3;
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
      this.attack();
    }

    if (!game.input.keyboard.isDown(Phaser.Keyboard.DOWN) &&
        !game.input.keyboard.isDown(Phaser.Keyboard.UP) &&
        !game.input.keyboard.isDown(Phaser.Keyboard.LEFT) &&
        !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.idle();
    }
  }

}
