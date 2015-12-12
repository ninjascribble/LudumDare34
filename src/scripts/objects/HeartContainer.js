const ASSET_KEY = 'HeartContainers';
const YELLOW_OUTLINE = 0;
const ORANGE_OUTLINE = 1;
const DK_GRAY_OUTLINE = 2;
const LT_GRAY_OUTLINE = 3;
const RED_FILL = 4;
const TEAL_FILL = 5;
const GRAY_FILL = 6;
const BLUE_FILL = 7;
const GREEN_FILL = 8;
const LILAC_FILL = 9;
const LT_GRAY_FILL = 10;
const GOLD_FILL = 11;

export default class HeartContainer extends Phaser.Sprite {

  constructor (game, x, y, group) {
    super(game, x, y);
    this.group = group;
    this.outline = this.game.add.sprite(x, y, ASSET_KEY, LT_GRAY_OUTLINE, this.group);
    this.fill = this.game.add.sprite(x, y, ASSET_KEY, RED_FILL, this.group);
  }

  full () {
    this.fill.visible = true;
  }

  empty () {
    this.fill.visible = false;
  }
}
