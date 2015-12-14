import Watch from './Watch';

export default class Patrol extends Watch {
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
    game.physics.arcade.moveToObject(actor, this.currentTarget, actor.speed);
  }

  update (actor) {
    super.update(actor);
    if (this.currentTarget.isZero() || actor.position.distance(this.currentTarget) < 2) {
      this.currentTarget = this.patrolRoute.shift();
      if (!this.currentTarget) {
        this.startRoute();
      }
    }

    this.moveTo(actor, this.currentTarget);
  }
}
