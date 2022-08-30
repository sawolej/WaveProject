class SmallPlatform {
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

  onPlatform(player) {
    if (player.x + player.width >= this.x && player.x <= this.x + this.width && 
      player.y + player.height <= this.y && player.y + player.height + player.vy >= this.y) player.vy = 0;
  }

}

export {SmallPlatform};
