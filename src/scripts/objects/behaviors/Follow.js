import Watch from './Watch';
import pathfinding from '../../services/pathfinding';

export default class Follow extends Watch {
  constructor (config) {
    super(config);
    this.followDistance = 25;
    this.currentTarget = null;
    this.path = [];
    this.paused = false;
    this.pauseTimer = null;
  }

  pathToPlayer (actor, playerPosition) {
    pathfinding.findPathTo(playerPosition, actor, (path) => {
      if (path) {
        path.shift();
        path.pop();
        this.path = path;
      }
    });
  }

  update (actor) {
    super.update(actor);
    this.signal.dispatch(this.type, actor, (playerPosition) => {
      // are we close enough to the player?
      if (actor.position.distance(playerPosition) < this.followDistance) {
        this.path = [];
        this.currentTarget = null;
        return actor.idle();
      }

      if (!this.paused) {
        if (this.currentTarget && this.currentTarget.distance(actor.position) < 2) {
          this.currentTarget = null;
        }

        //are we already going somewhere?
        if (this.currentTarget && !this.currentTarget.isZero()) {
          game.physics.arcade.moveToObject(actor, this.currentTarget, actor.speed);
        } else if (this.path && this.path.length) { // do we have a path?
          this.currentTarget = pathfinding.tileToPoint(this.path.shift());
        } else {
          this.pathToPlayer(actor, playerPosition);
        }
      } else {
        if (!this.pauseTimer) {
          actor.idle();

          this.pauseTimer = game.time.events.add(500, () => {
            this.pathToPlayer(actor, playerPosition);
            this.paused = false;
            this.pauseTimer = null;
          });
        }
      }
    });
  }
}
