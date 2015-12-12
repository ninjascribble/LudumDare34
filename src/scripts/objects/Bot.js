import Actor from './Actor';
import behaviors from './behaviors';

export default class Bot extends Actor {
  constructor (x, y, type, behavior, group) {
    super(x, y, type, group);
    this.speed = 30;
    this.behavior = behaviors.get(behavior);
  }

  update () {
    super.update();
    this.behavior.update(this);
  }
}
