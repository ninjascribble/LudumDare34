import HealthBar from '../objects/HealthBar';

export default class Hud extends Phaser.Group {

  constructor (game, config) {
    super(game, null, 'hud', true);
    this.healthBar = new HealthBar(this.game, 2, 2, this);

    if (config.maxHealth) {
      this.healthBar.setMaxHealth(config.maxHealth);
    }

    if (config.health) {
      this.healthBar.setHealth(config.health);
    }
  }
}
