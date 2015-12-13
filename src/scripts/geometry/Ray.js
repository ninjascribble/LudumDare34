export default class Ray extends Phaser.Line {
  constructor (x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
  }

  intersects (obj) {
    if (obj instanceof Array) {
      return obj.some(this.intersects);
    } else if (obj.body) {
      return this.intersectRayVsBody(obj.body);
    } else if (obj instanceof Phaser.TilemapLayer) {
      return this.intersectRayVsTilemapLayer(obj);
    } else {
      console.warn('not implemented', obj);
      return false;
    }
  }

  intersectRayVsBody (body) {
    let a = new Phaser.Point(body.x, body.y);
    let b = new Phaser.Point(body.x + body.width, body.y);
    let c = new Phaser.Point(body.x + body.width, body.y + body.height);
    let d = new Phaser.Point(body.x, body.y + body.height);
    let top = new Phaser.Line(a.x, a.y, b.x, b.y);
    let right = new Phaser.Line(b.x, b.y, c.x, c.y);
    let bottom = new Phaser.Line(d.x, d.y, c.x, c.y);
    let left = new Phaser.Line(a.x, a.y, d.x, d.y);

    return [top, right, left, bottom].some((line) => {
      return Boolean(super.intersects(line));
    });
  }

  intersectRayVsTilemapLayer (tilemap) {
    let tiles = tilemap.getTiles(this.x, this.y, this.width, this.height, true);
    return tiles.some((tile) => {
      return this.intersectRayVsBody({
        x: tile.x * tile.width,
        y: tile.y * tile.height,
        width: tile.width,
        height: tile.height
      });
    });
  }
}
