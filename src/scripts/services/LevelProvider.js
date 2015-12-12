const TILESETS = [{
  key: 'LevelTiles',
  width: 8,
  height: 8,
  collide: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}];

const LEVELS = [{
  background: 'Level01',
  tileset: TILESETS[0],
  playerOrigin: new Phaser.Point(16, 16)
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
    let map = game.add.tilemap(level.background, level.tileset.width, level.tileset.height);

    this.backgroundLayer = map.createLayer(0);
    this.playerOrigin = level.playerOrigin;

    map.addTilesetImage('Background', level.tileset.key);
    map.setCollision(level.tileset.collide);
  }
}
