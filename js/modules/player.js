import {StandingLeft, StandingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight} from './state.js';

export class Player {
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
    else if (this.x >= 800) this.x = 800;

    // Vertical movement & boundaries
    this.y += this.vy;
    if (!this.canJump()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }
    if (this.y > this.gameHeight - this.height - 105) this.y = this.gameHeight - this.height - 105;

  }
  
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  // KNOWN BUG - Can't jump on platforms
  canJump() {
    // Case on ground
    if (this.y >= this.gameHeight - this.height - 105) return true;
  }

}
