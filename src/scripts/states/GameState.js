import Player from '../objects/Player';
import Hud from '../objects/Hud';
import LevelProvider from '../services/LevelProvider';

var game;
var levelProvider;
var player;
var hud;

export default class GameState extends Phaser.State {

  preload () {
    game = Phaser.game = this.game;
    levelProvider = new LevelProvider(game);
    game.load.spritesheet('LevelTiles', 'assets/LevelTiles.png', 8, 8);
    game.load.tilemap('Level01', 'assets/Level01.csv', null, Phaser.Tilemap.CSV);
    game.load.spritesheet('player_01', 'assets/player_01.png', 10, 12);
    game.load.spritesheet('HeartContainers', 'assets/HeartContainers.png', 7, 6);
  }

  create () {
    levelProvider.setIndex(0);
    levelProvider.backgroundLayer.resizeWorld();

    game.stage.backgroundColor = 'rgb(12, 17, 67)';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = new Player(game, levelProvider.playerOrigin.x, levelProvider.playerOrigin.y, game.world);

    hud = new Hud(game, {
      maxHealth: 3,
      health: 2
    });

    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
  }

  update () {
    game.physics.arcade.collide(player, levelProvider.backgroundLayer);

    if (game.input.keyboard.downDuration(Phaser.Keyboard.UP)) {
      player.jump();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.moveRight();
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.moveLeft();
    } else {
      player.idle();
    }
  }

  render () {
    //   game.world.forEach((child) => {
    //       game.debug.body(child, 'rgba(255, 0, 0, .6)');
    //   });
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
  }
}
