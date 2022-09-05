class Countdown {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.imageBase = document.getElementById('countdownImageBase');
    this.imageFirst = document.getElementById('countdownImageFirst');
    this.imageSecond = document.getElementById('countdownImageSecond');
    this.imageThird = document.getElementById('countdownImageThird');
  }

  drawBase(context) {
    context.drawImage(this.imageBase, this.x, this.y);
  }

  drawFirst(context) {
    context.drawImage(this.imageFirst, this.x, this.y);
  }

  drawSecond(context) {
    context.drawImage(this.imageSecond, this.x, this.y);
  }

  drawThird(context) {
    context.drawImage(this.imageThird, this.x, this.y);
  }

}

export {Countdown};
