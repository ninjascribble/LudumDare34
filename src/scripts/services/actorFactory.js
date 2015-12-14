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
  REDMAGE: 'man10_',
  DRAGON: 'dragon'
};

export default {
  buildBot: (config, group) => {
    return new Bot(config.x, config.y, config.type, config.defaultBehavior, group);
  },

  buildPlayer: (x, y, group) => {
    return new Player(x, y, group);
  },

  buildDragon: (x, y, group) => {
    let dragon = new Bot(x, y, types.WIZARD, { type: 'WATCH' }, group, true);
    // dragon.animations.destroy();
    // dragon.animations.add('idle', null, 1, true);
    // dragon.animations.add('walk', null, 1, true);
    // dragon.animations.add('walkUp', null, 1, true);
    // dragon.animations.add('attack', null, 1, false);
    // dragon.idle();
    return dragon;
  },

  types: types
};
