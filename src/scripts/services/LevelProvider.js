import actors from './actorFactory';

const TILESETS = [{
  key: 'LevelTiles',
  width: 8,
  height: 8,
  collide: [[1, 18], [31, 54]]
}];

const LEVELS = [{
  background: 'Level01',
  tileset: TILESETS[0]
}];

export default class LevelProvider {

  constructor (game) {
    this.game = game;
    this.index = NaN;
    this.backgroundLayer = null;
    this.playerOrigin = null;
  }

  setIndex (index) {

    if (Number(index) > -1) {
      this.index = index;
    } else {
      this.index = 0;
    }

    if (this.index >= LEVELS.length) {
      this.index = LEVELS.length - this.index;
    }

    if (this.backgroundLayer) {
      this.backgroundLayer.destroy();
    }

    let level = LEVELS[this.index];
    let backgroundMap = game.add.tilemap(level.background, level.tileset.width, level.tileset.height);

    console.log(backgroundMap);

    this.player = playerProperties(backgroundMap);
    this.enemies = enemyProperties(backgroundMap);
    this.backgroundLayer = backgroundMap.createLayer(0);

    backgroundMap.addTilesetImage(level.tileset.key, level.tileset.key);

    level.tileset.collide.forEach((obj) => {
      if (obj instanceof Array) {
        backgroundMap.setCollisionBetween(obj[0], obj[1]);
      } else {
        backgroundMap.setCollision(obj);
      }
    });

    this.backgroundLayer.sendToBack();
  }
}

function playerProperties (map) {
  return {
    x: parseInt(map.properties.playerX, 10),
    y: parseInt(map.properties.playerY, 10)
  };
}

function enemyProperties (map) {
  let result = [];

  map.objects.Actors.forEach((actor) => {
    result.push({
      type: actors.types[actor.properties.Actor],
      x: actor.x,
      y: actor.y,
      defaultBehavior: behaviorProperties(actor)
    });
  });

  console.log(result);

  return result;
}

function behaviorProperties (behavior) {
  let result = { type: behavior.type };

  switch (behavior.type) {

    case 'PATROL':
      result.patrolRoute = behavior.polyline.map((polyline) => {
        return new Phaser.Point(behavior.x + polyline[0], behavior.y + polyline[1]);
      });
      break;

    case 'WATCH':
    default:
      break;
  }

  return result;
}
