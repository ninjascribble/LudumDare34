import Player from '../objects/Player';

const GRAVITY = 1200;

export default class GameState extends Phaser.State {

  preload () {
    Phaser.game = this.game;
    this.game.load.spritesheet('level_tiles', 'assets/level_tiles.png', 8, 8);
    this.game.load.tilemap('level_map', 'assets/level_tiles.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level_map_fore', 'assets/level_tiles_fore.csv', null, Phaser.Tilemap.CSV);
    this.game.load.spritesheet('player_01', 'assets/player_01.png', 10, 12);
  }

  create () {

    let map = this.game.add.tilemap('level_map', 8, 8);
    let layer = map.createLayer(0);

    map.addTilesetImage('Gumdrop-Level-01', 'level_tiles');
    map.setCollisionBetween(1, 4);
    layer.resizeWorld();

    this.game.stage.backgroundColor = 'rgb(12, 17, 67)';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = GRAVITY;
    this.level = layer;
    this.player = new Player(this.game, 8, 64, this.game.world);

    let map_fore = this.game.add.tilemap('level_map_fore', 8, 8);
    let layer_fore = map_fore.createLayer(0);

    map_fore.addTilesetImage('Gumdrop-Level-02', 'level_tiles');
    layer_fore.resizeWorld();

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
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
