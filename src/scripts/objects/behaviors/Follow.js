import Watch from './Watch';

export default class Follow extends Watch {
  constructor (config) {
    super(config);
    this.followDistance = 10;
  }

  update (actor) {
    super.update(actor);

    this.signal.dispatch(this.type, actor, (distance, player) => {
      if (distance > this.followDistance) {
        game.physics.arcade.moveToObject(actor, player, actor.speed);
      }
    });
  }
}
