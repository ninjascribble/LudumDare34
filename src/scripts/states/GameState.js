import actors from '../services/actorFactory';
import Hud from '../objects/Hud';
import LevelProvider from '../services/LevelProvider';
import behaviors from '../objects/behaviors';
import Ray from '../geometry/Ray';
import pathfinding from '../services/pathfinding';

var game;
var events;
var levelProvider;
var player;
var friends;
var enemies;
var hud;

export default class GameState extends Phaser.State {

  preload () {
    game = Phaser.game = this.game;
    events = new Phaser.Signal();
    events.add(this.eventHandler.bind(this));
    levelProvider = new LevelProvider(game, events);
    game.load.image('LevelTiles', 'assets/LevelTiles.png');
    game.load.tilemap('Level01', 'assets/Level01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.atlas('actors', 'assets/8_bit_fantasy/actors.png', 'assets/8_bit_fantasy/actors.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.spritesheet('HeartContainers', 'assets/HeartContainers.png', 7, 6);
    global.state = this;
  }

  create () {
    behaviors.onBehaviorCheck.add((behaviorType, actor, callback) => {
      switch (behaviorType) {
        case behaviors.types.WATCH:
          this.watchHandler(actor, callback);
          break;
        case behaviors.types.FOLLOW:
          this.followHandler(actor, callback);
          break;
      }
    });

    game.stage.backgroundColor = 'rgb(12, 17, 67)';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    levelProvider.setIndex(0);
    levelProvider.backgroundLayer.resizeWorld();

    friends = game.add.group(this.game.world, 'friends');
    enemies = game.add.group(this.game.world, 'enemies');

    player = actors.buildPlayer(levelProvider.player.x, levelProvider.player.y, friends);
    player.onPersuade.add(() => {
      this.persuadeCheck();
    });

    levelProvider.enemies.forEach((config) => {
      actors.buildBot(config, enemies);
    });

    hud = new Hud(game);
    this.updateHud();

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
  }

  followHandler (actor, callback) {
    callback(player.position);
  }

  watchHandler (actor, callback) {
    let foes;
    let target;

    if (actor.isFriendly) {
      foes = enemies;
    } else {
      foes = friends;
    }

    foes.forEachAlive((foe) => {
      if (!target && actor.position.distance(foe.position) < actor.watchDistance) {
        let ray = new Ray(actor.x, actor.y, foe.x, foe.y);
        if (!ray.intersects(levelProvider.backgroundLayer)) {
          target = foe;
        }
      }
    });

    callback(target);
  }

  persuadeCheck () {
    enemies.forEachAlive((enemy) => {
      if (player.position.distance(enemy.position) < player.persuadeDistance &&
        player.persuadeStrength >= enemy.persuadeResistance) {
        enemy.befriend();
        enemies.removeChild(enemy);
        friends.add(enemy);
      }
    });
  }

  update () {
    if (player.alive !== true) {
      this.game.state.start('GameState', true, true);
    }

    game.physics.arcade.collide(player, enemies, (_, enemy) => {
      if (!enemy.isFriendly) {
        player.takeDamage(enemy.atk);
        this.updateHud();
      }
    });
    game.physics.arcade.collide(enemies, enemies);
    game.physics.arcade.collide(friends, levelProvider.backgroundLayer, (friend, wall) => {
      console.dir(friend);
    });
    game.physics.arcade.collide(enemies, levelProvider.backgroundLayer);
  }

  render () {
    if (debug === true) {
      game.world.forEach((child) => {
        game.debug.body(child, 'rgba(0, 180, 180, .6)');
      });
      enemies.forEach((child) => {
        game.debug.body(child, 'rgba(255, 0, 0, .6)');

        game.debug.geom(new Phaser.Circle(child.position.x, child.position.y, 70));
      });
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        game.debug.geom(new Phaser.Circle(player.position.x, player.position.y, 80));
      }

      friends.forEachAlive((friend) => {
        if (friend.behavior && friend.behavior.type === 'FOLLOW') {
          friend.behavior.path.forEach((tile) => {
            const point = pathfinding.tileToPoint(tile);
            game.debug.geom(new Phaser.Circle(point.x, point.y, 3));
          });
        }
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

    levelProvider.enemies.forEach((config) => {
      actors.buildBot(config, enemies);
    });
  }

  eventHandler (evt) {
    switch (evt.type) {
      case 'enterAcid':
      case 'enterLava':
        evt.actor.takeDamage(evt.tile.properties.atk);
        this.updateHud();
        break;
      default:
        console.warn('unhandled event', evt);
        break;
    }
  }
}
