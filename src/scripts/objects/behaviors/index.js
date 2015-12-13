import Behavior from './Behavior';
import Patrol from './Patrol';
import Watch from './Watch';
import Persue from './Persue';
import Resume from './Resume';

let player = {};
const types = {
  RESUME: 'RESUME',
  PERSUE: 'PERSUE',
  PATROL: 'PATROL',
  WATCH: 'WATCH',
  NONE: 'NONE'
};

export default {
  get: (config) => {
    if (!config) {
      return new Watch({ player: player });
    }

    config.player = player;

    switch (config.type) {
      case types.PATROL:
        return new Patrol(config);
      case types.WATCH:
        return new Watch(config);
      case types.PERSUE:
        return new Persue(config);
      case types.RESUME:
        return new Resume(config);
    }
  },

  registerPlayer: (actor) => {
    player = actor;
  },

  types: types
};
