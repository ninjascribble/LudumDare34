import actors from './actorFactory';

const TILESETS = [{
  key: 'LevelTiles',
  width: 8,
  height: 8,
  collide: [[1, 18], [31, 54]]
}];

const LEVELS = [{
  background: 'Level01',
  tileset: TILESETS[0],
  player: new Phaser.Point(24, 454),
  enemies: [
    {
      type: actors.types.DUDE02,
      x: 62,
      y: 64,
      defaultBehavior: {
        type: 'WATCH'
      }
    },
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

    this.player = level.player;
    this.enemies = level.enemies;
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
