import Patrol from './Patrol';
import Watch from './Watch';
import Persue from './Persue';
import Resume from './Resume';
import Follow from './Follow';

const onBehaviorCheck = new Phaser.Signal();
const types = {
  FOLLOW: 'FOLLOW',
  RESUME: 'RESUME',
  PERSUE: 'PERSUE',
  PATROL: 'PATROL',
  WATCH: 'WATCH',
  NONE: 'NONE'
};

export default {
  get: (config) => {
    if (!config) {
      return new Watch({ type: types.WATCH, signal: onBehaviorCheck });
    }

    config.signal = onBehaviorCheck;

    switch (config.type) {
      case types.PATROL:
        return new Patrol(config);
      case types.WATCH:
        return new Watch(config);
      case types.PERSUE:
        return new Persue(config);
      case types.RESUME:
        return new Resume(config);
      case types.FOLLOW:
        return new Follow(config);
    }
  },

  types: types,

  onBehaviorCheck: onBehaviorCheck
};
