export default {

  create: (game) => {
    let map = game.add.tilemap('Level01', 8, 8);
    let layer = map.createLayer(0);

    map.addTilesetImage('FooBarBaz', 'LevelTiles');
    map.setCollisionBetween(1, 4);
    layer.resizeWorld();

    return layer;
  }
};
