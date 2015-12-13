import Behavior from './Behavior';

export default class Resume extends Behavior {
  constructor (config) {
    super(config);
    this.lastPosition = config.lastPosition;
    this.lastBehavior = config.lastBehavior;
  }

  update (actor) {
    super.update(actor);
    if (actor.position.distance(this.lastPosition) < 2) {
      actor.behavior = this.lastBehavior;
    } else {
      game.physics.arcade.moveToObject(actor, this.lastPosition, actor.speed);
    }
  }
}
