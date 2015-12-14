export default class Menu extends Phaser.State {
  preload () {
    game.load.bitmapFont('8bit-light', 'assets/8bit_wonder-light.png', 'assets/8bit_wonder-light.fnt');
  }

  create () {
    global.pixel = {
      scale: 4,
      canvas: null,
      context: null,
      width: 0,
      height: 0
    };

    game.stage.smooth = false;

    // Scaling the canvas up
    // See: http://www.photonstorm.com/phaser/pixel-perfect-scaling-a-phaser-game
    // game.canvas.style.display = 'none';
    pixel.canvas = Phaser.Canvas.create('', game.width * pixel.scale, game.height * pixel.scale);
    pixel.context = pixel.canvas.getContext('2d');
    Phaser.Canvas.addToDOM(pixel.canvas, 'content');
    Phaser.Canvas.setImageRenderingCrisp(pixel.canvas);
    Phaser.Canvas.setSmoothingEnabled(pixel.context, false);
    pixel.width = pixel.canvas.width;
    pixel.height = pixel.canvas.height;

    this.titleText = this.game.add.bitmapText(game.world.centerX, 30, '8bit-light', 'Goblinheart', 14);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.bitmapText(this.game.world.centerX, 90, '8bit-light', 'press space to start', 8);
    this.instructionsText.anchor.setTo(0.5, 0.5);

    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.RIGHT);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.LEFT);
  }

  update () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      game.state.start('GameState');
    }
  }

  render () {
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
  }
}
