class Ground {
  gameWidth: any;
  gameHeight: any;
  image: HTMLElement;
  width: number;
  height: number;
  x: any;
  y: number;
  
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
