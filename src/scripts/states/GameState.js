import actors from '../services/actorFactory';
import Hud from '../objects/Hud';
import LevelProvider from '../services/LevelProvider';
import behaviors from '../objects/behaviors';

var game;
var levelProvider;
var player;
var enemies;
var hud;

export default class GameState extends Phaser.State {

  preload () {
    game = Phaser.game = this.game;
    levelProvider = new LevelProvider(game);
    game.load.image('LevelTiles', 'assets/LevelTiles.png');
    game.load.tilemap('Level01', 'assets/Level01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.atlas('actors', 'assets/8_bit_fantasy/actors.png', 'assets/8_bit_fantasy/actors.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.spritesheet('HeartContainers', 'assets/HeartContainers.png', 7, 6);
    global.state = this;
  }

  create () {
    game.stage.backgroundColor = 'rgb(12, 17, 67)';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    levelProvider.setIndex(0);
    levelProvider.backgroundLayer.resizeWorld();

    player = actors.buildPlayer(levelProvider.player.x, levelProvider.player.y);
    behaviors.registerPlayer(player);
    enemies = game.add.group(this.game.world, 'enemies');

    levelProvider.enemies.forEach((config) => {
      actors.buildBot(config, enemies);
    });

    hud = new Hud(game);
    this.updateHud();

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
  }

  update () {
    if (player.alive !== true) {
      this.game.state.start('GameState', true, true);
    }

    game.physics.arcade.collide(player, enemies, (_, enemy) => {
      player.takeDamage(enemy.atk);
      this.updateHud();
    });
    game.physics.arcade.collide(enemies, enemies);
    game.physics.arcade.collide(player, levelProvider.backgroundLayer);
    game.physics.arcade.collide(enemies, levelProvider.backgroundLayer);
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

  updateHud () {
    hud.healthBar.setMaxHealth(player.maxHealth);
    hud.healthBar.setHealth(player.health);
  }

  cleanUp () {
    enemies.destroy(true, true);
  }

  shutdown () {
    super.shutdown();
    hud.destroy(true);
  }

  nextLevel () {
    this.cleanUp();

    levelProvider.setIndex(levelProvider.index + 1);
    levelProvider.backgroundLayer.resizeWorld();

    player.x = levelProvider.player.x;
    player.y = levelProvider.player.y;

    behaviors.registerPlayer(player);
    levelProvider.enemies.forEach((config) => {
      actors.buildBot(config, enemies);
    });
  }
}
