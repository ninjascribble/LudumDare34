import Behavior from './Behavior';

export default class Watch extends Behavior {
  constructor (config) {
    super(config);
  }

  update (actor) {
    super.update(actor);
    if (actor.position.distance(this.player) < actor.watchDistance) {
      actor.playerDetected();
    }
  }
}
