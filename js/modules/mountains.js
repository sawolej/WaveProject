class Mountains {
  constructor(gameWidth, gameHeight, x) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById('mountainsImage');
    this.width = 5760;
    this.height = 476;
    this.x = x;
    this.y = gameHeight - this.height + 80;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

export {Mountains};
