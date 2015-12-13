export default class Actor extends Phaser.Sprite {
  constructor (x, y, animationKey, group) {
    super(game, x, y, 'actors', 1);
    game.physics.arcade.enableBody(this);
    this.body.setSize(4, 8, 0, 0);
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
    this.animations.add('attack', attackFrames, 15, false);
    this.idle();

    this.invincible = false;
    this.stunned = false;
    this.maxHealth = 1;
    this.health = 1;
    this.atk = 1;

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
    if (this.stunned !== true) {
      this.scale.x = Math.abs(this.scale.x) * -1;
      this.body.velocity.x = -60;
      if (!this.attacking) {
        this.animations.play('walk');
      }
    }
  }

  moveRight () {
    if (this.stunned !== true) {
      this.scale.x = Math.abs(this.scale.x);
      this.body.velocity.x = 60;
      if (!this.attacking) {
        this.animations.play('walk');
      }
    }
  }

  moveUp () {
    if (this.stunned !== true) {
      this.body.velocity.y = -60;
      if (!this.attacking) {
        this.animations.play('walkUp');
      }
    }
  }

  moveDown () {
    if (this.stunned !== true) {
      this.body.velocity.y = 60;
      if (!this.attacking) {
        this.animations.play('walk');
      }
    }
  }

  attack (callback) {
    if (this.stunned !== true && !this.attacking) {
      this.attacking = true;
      const anim = this.animations.play('attack');
      anim.enableUpdate = true;

      anim.onUpdate.add(() => {
        // frame 53 is the sword down position
        if (anim.frame === 53) {
          callback();
        }
      });

      anim.onComplete.add(() => {
        this.attacking = false;
        anim.onComplete.removeAll();
        anim.onUpdate.removeAll();
        anim.enableUpdate = false;
      });
    }
  }

  takeDamage (num) {

    if (this.invincible === true || this.alive !== true) {
      return false;
    }

    this.health -= num;
    this.knockBack();
    this.stun(500);
    this.turnInvincible(1000);

    return true;
  }

  knockBack () {
    let x = 0;
    let y = 0;

    if (this.body.touching.up) {
      y = 16;
    }
    if (this.body.touching.right) {
      x = -16;
    }
    if (this.body.touching.down) {
      y = -16;
    }
    if (this.body.touching.left) {
      x = 16;
    }

    let tween = this.game.add.tween(this).to({
      x: this.x + x,
      y: this.y + y
    }, 100);

    tween.onComplete.add(() => {
      if (this.health <= 0) {
        this.kill();
      }
    });

    tween.start();
  }

  stun (ms) {
    this.stunned = true;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.game.time.events.add(ms, () => {
      this.stunned = false;
    });
  }

  turnInvincible (ms) {
    let tween = this.game.add.tween(this).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
    this.invincible = true;
    this.game.time.events.add(ms, () => {
      tween.stop();
      this.invincible = false;
      this.alpha = 1;
    });
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
