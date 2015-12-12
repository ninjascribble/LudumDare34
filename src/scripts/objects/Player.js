const ASSET_KEY = 'player_01';

export default class Player extends Phaser.Sprite {

  constructor (game, x, y, group) {
    super(game, x, y, ASSET_KEY, 1);
    game.physics.arcade.enableBody(this);
    this.body.setSize(4, 11, 0, 0);
    this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 1);
    this.animations.add('idle', [0, 1], 5, true);
    this.animations.add('walk', [3, 4, 5], 6, true);
    this.idle();
    group.add(this);
  }

  idle () {
    this.animations.play('idle');
  }

  moveLeft () {
    this.scale.x = Math.abs(this.scale.x) * -1;
    this.body.velocity.x = -60;
    this.animations.play('walk');
  }

  moveRight () {
    this.scale.x = Math.abs(this.scale.x);
    this.body.velocity.x = 60;
    this.animations.play('walk');
  }

  jump () {
    if (this.body.onFloor()) {
      this.body.velocity.y = -280;
    }
  }

  preUpdate () {
    super.preUpdate();
    if (Math.abs(this.body.velocity.x) > 1) {
      this.body.velocity.x = this.game.physics.arcade.computeVelocity(1, this.body, this.body.velocity.x, -24, -24, 0);
    } else {
      this.body.velocity.x = 0;
    }
  }
}
