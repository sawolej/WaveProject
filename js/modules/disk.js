class Disk {
  constructor(gameWidth, gameHeight, imageName, x, y) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById(imageName);
    this.width = 24;
    this.height = 24;
    this.x = x;
    this.y = y;
    this.isPicked = false;
  }

  isNear(player) {
    if (Math.abs(player.x - this.x) <= 30 && Math.abs(player.y - this.y) <= 40) {
      
      if (!this.isPicked) {
        this.playSound();
        this.isPicked = true;
      }

      return true;
    }
    else return false;
  }

  playSound() {
    console.log("Sound!!!");
  }

  draw(context) {
    if (!this.isPicked) context.drawImage(this.image, this.x, this.y);
  }

}

export {Disk};