import HeartContainer from '../objects/HeartContainer';

export default class HealthBar extends Phaser.Sprite {

  constructor (game, x, y, group) {
    super(game, x, y);
    this.group = group;
    this.maxHealth = 0;
    this.health = 0;
    group.add(this);
  }

  setMaxHealth (value) {
    this.maxHealth = value;
    this.drawHeartContainers();
  }

  setHealth (value) {
    this.health = value;
    this.drawHeartContainers();
  }

  drawHeartContainers () {
    for (let i = 0; i < this.maxHealth; i++) {
      let container = new HeartContainer(this.game, 7 * i, 0, this.group);
      if (this.health > i) {
        container.full();
      } else {
        container.empty();
      }
    }
  }
}
