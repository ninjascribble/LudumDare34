import Behavior from './Behavior';
import behaviors from './';

export default class Watch extends Behavior {
  constructor (config) {
    super(config);
  }

  update (actor) {
    super.update(actor);
    this.signal.dispatch(behaviors.types.WATCH, actor, (target) => {
      if (target) {
        actor.foeDetected(target);
      }
    });
  }
}
