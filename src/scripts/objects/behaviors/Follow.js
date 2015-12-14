import Watch from './Watch';
import pathfinding from '../../services/pathfinding';

export default class Follow extends Watch {
  constructor (config) {
    super(config);
    this.followDistance = 10;
    this.currentTarget = null;
    this.path = [];
  }

  pathToPlayer (actor) {
    this.signal.dispatch(this.type, actor, (playerPosition) => {
      // are we close enough to the player?
      if (actor.position.distance(playerPosition) < 20) {
        return;
      }
      // debugger;
      pathfinding.findPathTo(playerPosition, actor, (path) => {
        if (path) {
          path.shift();
          path.pop();
          this.path = path;
        }
      });
    });
  }

  update (actor) {
    super.update(actor);

    if (!this.paused) {
      this.paused = true;
      game.time.events.add(500, () => {
        this.paused = false;
        this.pathToPlayer(actor);
      });
    }

    // we have arrived
    if (this.currentTarget && this.currentTarget.distance(actor.position) < 2) {
      this.currentTarget = null;
    }

    //are we already going somewhere?
    if (this.currentTarget && !this.currentTarget.isZero()) {
      game.physics.arcade.moveToObject(actor, this.currentTarget, actor.speed);
    } else if (this.path && this.path.length) { // do we have a path?
      this.currentTarget = pathfinding.tileToPoint(this.path.shift());
    } else {
      actor.idle();
    }

    // if (!this.path) {
    //   return actor.idle();
    // }

    // if (this.path.length && (!this.currentTarget || this.currentTarget.isZero())) {
    //   this.currentTarget = pathfinding.tileToPoint(this.path.shift());
    // } else if (this.currentTarget && !this.currentTarget.isZero()) {
    //   if (actor.position.distance(this.currentTarget) < 2) {
    //     this.currentTarget = pathfinding.tileToPoint(this.path.shift());
    //   }
    // }

    // if (this.currentTarget && !this.currentTarget.isZero()) {
    //   game.physics.arcade.moveToObject(actor, this.currentTarget, actor.speed);
    // } else {
    //   actor.idle();
    // }

    // this.signal.dispatch(this.type, actor, (distance, player) => {
    //   if (distance > this.followDistance) {
    //     game.physics.arcade.moveToObject(actor, player, actor.speed);
    //   }
    // });
  }
}
