import Actor from './Actor';

export default class Bot extends Actor {
  constructor (x, y, type, group) {
    super(x, y, type, group);
    this.patrolRoute = [];
    this.patrolIdle = false;
    this.currentTarget = new Phaser.Point();
    this.currentAction = 'NONE';
  }

  patrol (points) {
    this.patrolRoute = points;
    this.currentAction = 'PATROL';
  }

  moveTo (point) {
    this.animations.play('walk');
    game.physics.arcade.moveToXY(this, this.currentTarget.x, this.currentTarget.y, 30);
  }

  update () {
    super.update();

    switch (this.currentAction) {
      case 'PATROL':
        if (this.currentTarget.isZero() || this.position.distance(this.currentTarget) < 2) {
          this.currentTarget = this.patrolRoute.shift();
        }

        this.moveTo(this.currentTarget);
        break;
      default:
        this.idle();
        break;
    }
  }
}
