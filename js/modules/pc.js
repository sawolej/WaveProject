class Pc {
  constructor(gameWidth, gameHeight, x, y) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById('pcImage'); 
    this.width = 98;
    this.height = 137;
    this.x = x;
    this.y = y;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

}

export {Pc};
