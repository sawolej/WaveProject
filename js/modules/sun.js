class Sun {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById('sunImage');
    this.width = 655;
    this.height = 655;
    this.x = 372.5;
    this.y = 200;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

export {Sun};
