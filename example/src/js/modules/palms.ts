class Palms {
  gameWidth: any;
  gameHeight: any;
  image: HTMLElement;
  width: any;
  height: any;
  x: any;
  y: number;
  constructor(gameWidth, gameHeight, imageName, imageWidth, imageHeight, x) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById(imageName);
    this.width = imageWidth;
    this.height = imageHeight;
    this.x = x;
    this.y = gameHeight - this.height - 105;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

export {Palms};
