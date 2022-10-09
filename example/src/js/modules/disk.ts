class Disk {
  gameWidth: any;
  gameHeight: any;
  image: HTMLElement;
  glowImage: HTMLElement;
  glowWidth: number;
  glowHeight: number;
  width: number;
  height: number;
  x: any;
  y: any;
  isPicked: boolean;
  name: any;
  constructor(gameWidth, gameHeight, imageName, x, y) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById(imageName);
    this.glowImage = document.getElementById('glowImage');
    this.glowWidth = 122; 
    this.glowHeight = 122;
    this.width = 24;
    this.height = 24;
    this.x = x;
    this.y = y;
    this.isPicked = false;
    this.name = imageName;
  }
  
    drawGlow(context) {
      if (!this.isPicked) context.drawImage(this.glowImage, this.x - 49, this.y - 49)
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
    var audio = new Audio('./sounds/diskPickupSound.mp3');
    audio.play();
  }

  draw(context) {
    if (!this.isPicked) context.drawImage(this.image, this.x, this.y);
  }

}

export {Disk};
