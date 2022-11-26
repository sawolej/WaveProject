export class Sun {
  gameWidth: any;
  gameHeight: any;
  image: HTMLElement;
  width: number;
  height: number;
  x: number;
  y: number;
  
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

export class Palms {
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

export class Mountains {
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

export class Ground {
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

export class Background {
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

export class SmallPlatform {
  gameWidth: any;
  gameHeight: any;
  image: HTMLElement;
  width: number;
  height: number;
  x: any;
  y: any;
  
  constructor(gameWidth, gameHeight, x, y) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById('smallPlatformImage');
    this.width = 108;
    this.height = 42;
    this.x = x;
    this.y = y;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  collide(player) {
    if (player.x + player.width >= this.x && player.x <= this.x + this.width && 
      player.y + player.height <= this.y && player.y + player.height + player.vy >= this.y) player.vy = 0;
  }
}

export class BigPlatform {
  width: number;
  gameWidth: any;
  gameHeight: any;
  image: HTMLElement;
  height: number;
  x: any;
  y: any;
  
  constructor(gameWidth, gameHeight, x, y) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById('bigPlatformImage');
    this.width = 282;
    this.height = 60;
    this.x = x;
    this.y = y;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  collide(player) {
    if (player.x + player.width >= this.x && player.x <= this.x + this.width && 
      player.y + player.height <= this.y && player.y + player.height + player.vy >= this.y) player.vy = 0;
  }
}

export class Disk {
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
    var audio = new Audio('./assets/sounds/diskPickupSound.mp3');
    audio.play();
  }

  draw(context) {
    if (!this.isPicked) context.drawImage(this.image, this.x, this.y);
  }
}
