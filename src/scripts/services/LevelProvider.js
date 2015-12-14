import actors from './actorFactory';
import pathfinding from './pathfinding';

const TILESETS = [{
  key: 'LevelTiles',
  width: 8,
  height: 8,
  collide: [[1, 18], [31, 32], [37, 38], [43, 54]],
  callbacks: [
    { event: 'enterAcid', indexes: [33, 34, 39, 40] },
    { event: 'enterLava', indexes: [35, 36, 41, 42] }
  ]
}];

const LEVELS = [{
  background: 'Level01',
  tileset: TILESETS[0]
}];

const walkables = [29, 23, 30, 24, 22, 21, 27, 28, 25, 26];
let backgroundMap;

export default class LevelProvider {

  constructor (game, signal) {
    this.game = game;
    this.signal = signal;
    this.index = NaN;
    this.backgroundLayer = null;
    this.playerOrigin = null;
    pathfinding.init();
  }

  checkMapTile (tile) {
    const mapData = backgroundMap.layers[0].data;
    const up = mapData[tile.x][tile.y - 1];
    const down = mapData[tile.x][tile.y + 1];
    const left = mapData[tile.x - 1][tile.y];
    const right = mapData[tile.x + 1][tile.y];

    return {
      up: walkables.indexOf(up) > -1,
      down: walkables.indexOf(down) > -1,
      left: walkables.indexOf(left) > -1,
      right: walkables.indexOf(right) > -1
    };
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
    backgroundMap = game.add.tilemap(level.background, level.tileset.width, level.tileset.height);

    this.player = playerProperties(backgroundMap);
    this.enemies = enemyProperties(backgroundMap);
    this.backgroundLayer = backgroundMap.createLayer(0);

    backgroundMap.addTilesetImage(level.tileset.key, level.tileset.key);
    pathfinding.setGrid(backgroundMap.layers[0].data, walkables);

    level.tileset.collide.forEach((obj) => {
      if (obj instanceof Array) {
        backgroundMap.setCollisionBetween(obj[0], obj[1]);
      } else {
        backgroundMap.setCollision(obj);
      }
    });

    level.tileset.callbacks.forEach((obj) => {
      obj.indexes.forEach((i) => {
        backgroundMap.setTileIndexCallback(i, (sprite, tile) => {
          this.signal.dispatch({ type: obj.event, actor: sprite, tile: tile });
        });
      });
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
