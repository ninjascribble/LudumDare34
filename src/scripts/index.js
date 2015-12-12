import GameState from './states/GameState';
import Menu from './states/Menu';

const TILE_W = 8;
const TILE_H = 8;
const VIEW_W = 16;
const VIEW_H = 10;

class Game extends Phaser.Game {
  constructor () {
    let w = TILE_W * VIEW_W;
    let h = TILE_H * VIEW_H;

    super(w, h, Phaser.AUTO, '', false, false);
    this.state.add('GameState', GameState, false);
    this.state.add('Menu', Menu, false);
    this.state.start('Menu');
  }
}

global.game = new Game();
