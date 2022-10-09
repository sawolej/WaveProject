class Ground {
  constructor(gameWidth, gameHeight, x) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById('groundImage');
    this.width = 5760;
    this.height = 105;
    this.x = x;
    this.y = gameHeight - this.height;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

export {Ground};
