import Player from '../objects/Player';
import Hud from '../objects/Hud';

const GRAVITY = 1200;

export default class GameState extends Phaser.State {

  preload () {
    Phaser.game = this.game;
    this.game.load.spritesheet('LevelTiles', 'assets/LevelTiles.png', 8, 8);
    this.game.load.tilemap('level_map', 'assets/level_tiles.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level_map_fore', 'assets/level_tiles_fore.csv', null, Phaser.Tilemap.CSV);
    this.game.load.spritesheet('player_01', 'assets/player_01.png', 10, 12);
    this.game.load.spritesheet('HeartContainers', 'assets/HeartContainers.png', 7, 6);
  }

  create () {

    this.game.stage.backgroundColor = 'rgb(12, 17, 67)';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = GRAVITY;

    let map = this.game.add.tilemap('level_map', 8, 8);
    let layer = map.createLayer(0);

    map.addTilesetImage('Gumdrop-Level-01', 'LevelTiles');
    map.setCollisionBetween(1, 4);
    layer.resizeWorld();

    this.level = layer;
    this.player = new Player(this.game, 8, 64, this.game.world);

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
