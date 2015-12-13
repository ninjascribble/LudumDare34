import Bot from '../objects/Bot';
import Player from '../objects/Player';

var types = {

  // Player
  DUDE04: 'man04_',

  // Others
  DUDE01: 'man01_',
  DUDE02: 'man02_',
  DUDE03: 'man03_',
  DUDE05: 'man05_',
  DUDE06: 'man06_',
  DUDE07: 'man07_',
  DUDE08: 'man08_',
  DUDE09: 'man09_',
  DUDE10: 'man10_'
};

export default {
  buildBot: (config, group) => {
    return new Bot(config.x, config.y, config.type, config.defaultBehavior, group);
  },

  buildPlayer: (x, y, group) => {
    return new Player(x, y, group);
  },

  types: types
};
