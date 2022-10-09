class Background {
  constructor(gameWidth, gameHeight, x) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById('backgroundImage');
    this.width = 5760;
    this.height = 1080;
    this.x = x;
    this.y = 0;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

export {Background};
