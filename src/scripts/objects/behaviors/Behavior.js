import Player from '../Player';

export default class Behavior {
  constructor (config) {
    if (!config.player || config.player.constructor !== Player) {
      throw new Error('Behaviors require a player object. Make sure \'registerPlayer\' is called before using behaviors.');
    }

    this.type = config.type;
    this.player = config.player;
    this.settings = config;
  }

  update () {

  }
}
