const TILESETS = [{
  key: 'LevelTiles',
  width: 8,
  height: 8,
  collide: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}];

const LEVELS = [
  { tilemap: 'Level01', tileset: TILESETS[0] }
];

export default class LevelProvider {

  constructor (game) {
    this.game = game;
    this.index = 0;
  }

  build (index) {

    if (Number(index) > -1) {
      this.index = index;
    }

    if (this.index >= LEVELS.length) {
      this.index = LEVELS.length - this.index;
    }

    let level = LEVELS[this.index];
    let map = game.add.tilemap(level.tilemap, level.tileset.width, level.tileset.height);
    let layer = map.createLayer(0);

    map.addTilesetImage('FooBarBaz', level.tileset.key);
    map.setCollision(level.tileset.collide);
    layer.resizeWorld();

    return layer;
  }
}
