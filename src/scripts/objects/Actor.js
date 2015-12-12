export default class Actor extends Phaser.Sprite {
  constructor (x, y, animationKey, group) {
    super(game, x, y, 'actors', 1);
    game.physics.arcade.enableBody(this);
    this.body.setSize(4, 11, 0, 0);
    this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 1);
    const idleFrames = Phaser.Animation.generateFrameNames(animationKey, 1, 2, '', 2);
    const walkFrames = [
      `${animationKey}01`,
      `${animationKey}03`,
      `${animationKey}04`,
      `${animationKey}05`
    ];
    const walkUpFrames = [
      `${animationKey}13`,
      `${animationKey}14`,
      `${animationKey}15`,
      `${animationKey}14`
    ];
    const attackFrames = [
      `${animationKey}02`,
      `${animationKey}07`,
      `${animationKey}08`,
      `${animationKey}09`,
      `${animationKey}08`,
      `${animationKey}07`,
      `${animationKey}02`
    ];

    this.animations.add('idle', idleFrames, 3, true);
    this.animations.add('walk', walkFrames, 8, true);
    this.animations.add('walkUp', walkUpFrames, 6, true);
    this.animations.add('attack', attackFrames, 6, false);
    this.idle();

    if (group) {
      group.add(this);
    } else {
      game.add.existing(this);
    }
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

  moveUp () {
    this.body.velocity.y = -60;
    this.animations.play('walkUp');
  }

  moveDown () {
    this.body.velocity.y = 60;
    this.animations.play('walk');
  }

  attack () {
    this.animations.play('attack');
  }

  preUpdate () {
    super.preUpdate();
    if (Math.abs(this.body.velocity.x) > 1) {
      this.body.velocity.x = this.game.physics.arcade.computeVelocity(1, this.body, this.body.velocity.x, -24, -24, 0);
      this.body.velocity.y = this.game.physics.arcade.computeVelocity(1, this.body, this.body.velocity.y, -24, -24, 0);
    } else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }
  }
}
