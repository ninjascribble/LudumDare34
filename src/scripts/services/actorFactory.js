import Bot from '../objects/Bot';
import Player from '../objects/Player';

var types = {
  PLAYER: 'man04_',
  SQUIRE: 'man01_',
  KNIGHT: 'man02_',
  LINK: 'man03_',
  GOBLIN: 'man05_',
  WIZARD: 'man06_',
  WIZARD2: 'man07_',
  AXEMAN: 'man08_',
  VIKING: 'man09_',
  REDMAGE: 'man10_'
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
