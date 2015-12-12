import actors from './actorFactory';

const TILESETS = [{
  key: 'LevelTiles',
  width: 8,
  height: 8,
  collide: [
    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
    42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
    53, 54, 55, 56, 57, 58, 59
  ]
}];

const LEVELS = [{
  background: 'Level01',
  objects: 'Level01Objects',
  tileset: TILESETS[0],
  player: new Phaser.Point(62, 200),
  enemies: [
    { type: actors.types.DUDE02, x: 24, y: 16 },
    {
      type: actors.types.DUDE02,
      x: 104,
      y: 16,
      defaultBehavior: {
        type: 'PATROL',
        patrolRoute: [
          new Phaser.Point(32, 16),
          new Phaser.Point(104, 16)
        ]
      }
    }
  ]
}, {
  background: 'Level02',
  objects: 'Level02Objects',
  tileset: TILESETS[0],
  player: new Phaser.Point(62, 200),
  enemies: [
    { type: actors.types.DUDE02, x: 48, y: 24 },
    { type: actors.types.DUDE02, x: 88, y: 24 }
  ]
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

    let level = LEVELS[this.index];
    let backgroundMap = game.add.tilemap(level.background, level.tileset.width, level.tileset.height);
    let objectsMap = game.add.tilemap(level.objects, level.tileset.width, level.tileset.height);

    this.player = level.player;
    this.enemies = level.enemies;
    this.backgroundLayer = backgroundMap.createLayer(0);
    this.objectsLayer = objectsMap.createLayer(0);

    backgroundMap.addTilesetImage('Background', level.tileset.key);
    backgroundMap.setCollision(level.tileset.collide);

    objectsMap.addTilesetImage('Objects', level.tileset.key);
    objectsMap.setCollision(level.tileset.collide);
  }
}
