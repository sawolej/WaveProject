import {StandingLeft, StandingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight} from './state.js';

export class Player {
  gameWidth: any;
  currentState: any;
  gameHeight: any;
  states: (StandingLeft | StandingRight | RunningLeft | RunningRight | JumpingLeft | JumpingRight)[];
  width: number;
  height: number;
  x: number;
  y: number;
  image: HTMLElement;
  speed: number;
  maxSpeed: number;
  vy: number;
  weight: number;
  platformX: any;
  platformY: any;
  platformWidth: any;
  
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [new StandingLeft(this), new StandingRight(this), new RunningLeft(this), 
      new RunningRight(this), new JumpingLeft(this), new JumpingRight(this)];
    this.currentState = this.states[0];
    this.width = 24;
    this.height = 45;
    this.x = 400;
    this.y = this.gameHeight - this.height - 105;
    this.image = document.getElementById('playerImage');
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.weight = 1;
    this.platformX;
    this.platformY;
    this.platformWidth;
  }

  // Draw player method
  draw(context) {
    context.fillStyle = 'transparent';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y);
  } 

  update(input) {
    this.currentState.handleInput(input);

    // Horizontal movement & boundaries
    this.x += this.speed;
    if (this.x < 400) this.x = 400;
    else if (this.x >= 690) this.x = 690;

    // Vertical movement & boundaries
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    
    if (this.y > this.gameHeight - this.height - 105) this.y = this.gameHeight - this.height - 105;
  }
  
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  getPlatformInfo(platform) {
    this.platformX = platform.x;
    this.platformY = platform.y;
    this.platformWidth = platform.width;
  }

  onGround() {
    if (this.y >= this.gameHeight - this.height - 105 || (this.x + this.width >= this.platformX && 
      this.x <= this.platformX + this.platformWidth && this.y + this.height <= this.platformY && 
      this.y + this.height + this.vy >= this.platformY)) return true;
    else return false;
  }
}
