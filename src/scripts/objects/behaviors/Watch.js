import Behavior from './Behavior';

export default class Watch extends Behavior {
  constructor (config) {
    super(config);
  }

  update (actor) {
    super.update(actor);
    this.signal.dispatch(this.type, actor, (target) => {
      if (target) {
        actor.foeDetected(target);
      }
    });
  }
}
