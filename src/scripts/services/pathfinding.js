let pathfinder;

function pointToTile (point) {
  return new Phaser.Point(Math.floor(point.x / 8), Math.floor(point.y / 8));
}

function tileToPoint (point) {
  return new Phaser.Point(Math.floor(point.x * 8), Math.floor(point.y * 8));
}

export default {
  init: () => {
    pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
  },

  findPathTo: (target, actor, callback) => {
    const actorTile = pointToTile(actor.position);
    const targetTile = pointToTile(target);

    pathfinder.setCallbackFunction((path) => {
      callback(path);
    });

    pathfinder.preparePathCalculation([actorTile.x, actorTile.y], [targetTile.x, targetTile.y]);
    pathfinder.calculatePath();
  },

  setGrid: (mapData, walkables) => {
    pathfinder.setGrid(mapData, walkables);
  },

  pointToTile: pointToTile,

  tileToPoint: tileToPoint
};
