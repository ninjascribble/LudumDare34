import Player from '../objects/Player';
import Hud from '../objects/Hud';
import LevelProvider from '../services/LevelProvider';

export default class GameState extends Phaser.State {

  preload () {
    Phaser.game = this.game;
    this.game.load.spritesheet('LevelTiles', 'assets/LevelTiles.png', 8, 8);
    this.game.load.tilemap('Level01', 'assets/Level01.csv', null, Phaser.Tilemap.CSV);
    this.game.load.spritesheet('player_01', 'assets/player_01.png', 10, 12);
    this.game.load.spritesheet('HeartContainers', 'assets/HeartContainers.png', 7, 6);
    this.levelProvider = new LevelProvider(this.game);
  }

  create () {

    this.game.stage.backgroundColor = 'rgb(12, 17, 67)';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.level = this.levelProvider.build();
    this.player = new Player(this.game, 16, 16, this.game.world);

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

    this.hud = new Hud(this.game, {
      maxHealth: 3,
      health: 2
    });
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.level);

    if (this.game.input.keyboard.downDuration(Phaser.Keyboard.UP)) {
      this.player.jump();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.moveRight();
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.moveLeft();
    } else {
      this.player.idle();
    }
  }

  render () {
    //   this.game.world.forEach((child) => {
    //       this.game.debug.body(child, 'rgba(255, 0, 0, .6)');
    //   });
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
  }
}
