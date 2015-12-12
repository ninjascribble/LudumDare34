import actors from '../services/actorFactory';
import Player from '../objects/Player';
import Hud from '../objects/Hud';
import LevelProvider from '../services/LevelProvider';

var game;
var levelProvider;
var player;
var enemies;
var hud;

export default class GameState extends Phaser.State {

  preload () {
    game = Phaser.game = this.game;
    levelProvider = new LevelProvider(game);
    game.load.atlas('actors', 'assets/8_bit_fantasy/actors.png', 'assets/8_bit_fantasy/actors.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.spritesheet('player_01', 'assets/player_01.png', 10, 12);
    game.load.spritesheet('LevelTiles', 'assets/LevelTiles.png', 8, 8);
    game.load.tilemap('Level01', 'assets/Level01.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Level01Objects', 'assets/Level01Objects.csv', null, Phaser.Tilemap.CSV);
    game.load.spritesheet('player_01', 'assets/player_01.png', 10, 12);
    game.load.spritesheet('HeartContainers', 'assets/HeartContainers.png', 7, 6);
  }

  create () {
    levelProvider.setIndex(0);
    levelProvider.backgroundLayer.resizeWorld();

    game.stage.backgroundColor = 'rgb(12, 17, 67)';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = actors.buildPlayer(levelProvider.player.x, levelProvider.player.y);
    enemies = game.add.group(this.game.world, 'enemies');

    levelProvider.enemies.forEach((config) => {
      actors.buildBot(config.type, config.x, config.y, enemies);
    });

    hud = new Hud(game, {
      maxHealth: 3,
      health: 2
    });

    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
  }

  update () {
    game.physics.arcade.collide(player, enemies);
    game.physics.arcade.collide(player, levelProvider.backgroundLayer);
    game.physics.arcade.collide(enemies, levelProvider.backgroundLayer);
    game.physics.arcade.collide(player, levelProvider.objectsLayer, (a, b) => {
      console.log(a, b);
    });
  }

  render () {
    if (debug === true) {
      game.world.forEach((child) => {
        game.debug.body(child, 'rgba(0, 180, 180, .6)');
      });
      enemies.forEach((child) => {
        game.debug.body(child, 'rgba(255, 0, 0, .6)');
      });
    }

    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
  }
}
