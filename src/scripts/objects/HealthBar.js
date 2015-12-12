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
      this.drawHeartContainer(i);
    }
  }

  drawHeartContainer (index) {
    let x = 7 * index + 2;
    let y = 2;
    let container = new HeartContainer(this.game, x, y, this.group);

    if (this.health > index) {
      container.full();
    } else {
      container.empty();
    }
  }
}
