import Behavior from './Behavior';

export default class Patrol extends Behavior {
  constructor (config) {
    super(config);
    this.cachedRoute = config.patrolRoute;
    this.startRoute();
  }

  startRoute () {
    this.patrolRoute = Object.create(this.cachedRoute);
    this.currentTarget = this.patrolRoute.shift();
  }

  moveTo (actor, point) {
    actor.animations.play('walk');
    game.physics.arcade.moveToXY(actor, this.currentTarget.x, this.currentTarget.y, actor.speed);
  }

  update (actor) {
    if (this.currentTarget.isZero() || actor.position.distance(this.currentTarget) < 2) {
      this.currentTarget = this.patrolRoute.shift();
      if (!this.currentTarget) {
        this.startRoute();
      }
    }

    this.moveTo(actor, this.currentTarget);
  }
}
