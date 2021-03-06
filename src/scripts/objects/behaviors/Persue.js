import Behavior from './Behavior';

export default class Persue extends Behavior {
  constructor (config) {
    super(config);
    this.lastPosition = config.position;
    this.strayDistance = config.strayDistance;
    this.target = config.target;
  }

  update (actor) {
    super.update(actor);

    if (this.lastPosition.distance(actor.position) > this.strayDistance) {
      actor.resumeBehavior();
    } else {
      actor.animations.play('walk');
      game.physics.arcade.moveToObject(actor, this.target, actor.speed);
    }
  }
}
