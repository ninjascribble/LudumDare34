import Behavior from './Behavior';
import Patrol from './Patrol';

export default {
  get: (config) => {
    if (!config) {
      return new Behavior({ type: 'NONE' });
    }

    switch (config.type) {
      case 'PATROL':
        return new Patrol(config);
    }
  }
};
