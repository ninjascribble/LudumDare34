import Actor from './Actor';
import behaviors from './behaviors';

export default class Bot extends Actor {
  constructor (x, y, type, behavior, group) {
    super(x, y, type, group);
    this.speed = 30;
    this.watchDistance = 35;
    this.isFriendly = false;
    this.persuadeResistance = 10;
    this.behavior = behaviors.get(behavior);
  }

  update () {
    super.update();
    this.behavior.update(this);
  }

  foeDetected (target) {
    const behaviorConfig = {
      type: behaviors.types.PERSUE,
      position: new Phaser.Point(this.position.x, this.position.y),
      strayDistance: 30,
      target: target
    };

    this.lastBehavior = this.behavior;
    this.lastPosition = behaviorConfig.position;
    this.behavior = behaviors.get(behaviorConfig);
  }

  befriend () {
    this.isFriendly = true;
    this.behavior = behaviors.get({ type: behaviors.types.FOLLOW });
    this.lastBehavior = null;
    this.lastPosition = null;
  }

  resumeBehavior () {
    const behaviorConfig = {
      type: behaviors.types.RESUME,
      lastBehavior: this.lastBehavior,
      lastPosition: this.lastPosition
    };

    this.behavior = behaviors.get(behaviorConfig);
  }
}
