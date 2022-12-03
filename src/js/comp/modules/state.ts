import { Player } from "./player";

export const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  RUNNING_LEFT: 2,
  RUNNING_RIGHT: 3,
  JUMPING_LEFT: 4,
  JUMPING_RIGHT: 5
}

class State {
  state: any;

  constructor(state: any) {
    this.state = state;
  }
}


export class StandingLeft extends State {
  player: any;

  constructor(player: Player) {
    super("STANDING_LEFT");
    this.player = player;
  }

  enter() {
    this.player.speed = 0;
  }

  handleInput(input: { [key: string]: { pressed: boolean } }) {
    if (input.a.pressed && input.d.pressed && input.w.pressed) this.player.setState(states.JUMPING_LEFT);
    else if (input.a.pressed && input.d.pressed) this.player.setState(states.STANDING_LEFT);
    else if (input.d.pressed) this.player.setState(states.RUNNING_RIGHT);
    else if (input.a.pressed) this.player.setState(states.RUNNING_LEFT);
    else if (input.w.pressed) this.player.setState(states.JUMPING_LEFT);
  }
}


export class StandingRight extends State {
  player: any;

  constructor(player: Player) {
    super("STANDING_RIGHT");
    this.player = player;
  }

  enter() {
    this.player.speed = 0;
  }

  handleInput(input: { [key: string]: { pressed: boolean } }) {
    if (input.a.pressed && input.d.pressed && input.w.pressed) this.player.setState(states.JUMPING_RIGHT);
    else if (input.a.pressed && input.d.pressed) this.player.setState(states.STANDING_RIGHT);
    else if (input.a.pressed) this.player.setState(states.RUNNING_LEFT);
    else if (input.d.pressed) this.player.setState(states.RUNNING_RIGHT);
    else if (input.w.pressed) this.player.setState(states.JUMPING_RIGHT);
  }
}


export class RunningLeft extends State {
  player: any;

  constructor(player: Player) {
    super("RUNNING_LEFT");
    this.player = player;
  }

  enter() {
    this.player.speed = -this.player.maxSpeed;
  }

  handleInput(input: { [key: string]: { pressed: boolean } }) {
    if (input.a.pressed && input.d.pressed) this.player.setState(states.STANDING_LEFT);
    else if (input.d.pressed) this.player.setState(states.RUNNING_RIGHT);
    else if (!input.a.pressed) this.player.setState(states.STANDING_LEFT);
    else if (input.w.pressed) this.player.setState(states.JUMPING_LEFT);
  }
}


export class RunningRight extends State {
  player: any;

  constructor(player: Player) {
    super("RUNNING_RIGHT");
    this.player = player;
  }

  enter() {
    this.player.speed = this.player.maxSpeed;
  }

  handleInput(input: { [key: string]: { pressed: boolean } }) {
    if (input.a.pressed && input.d.pressed) this.player.setState(states.STANDING_RIGHT);
    else if (input.a.pressed) this.player.setState(states.RUNNING_LEFT);
    else if (!input.d.pressed) this.player.setState(states.STANDING_RIGHT);
    else if (input.w.pressed) this.player.setState(states.JUMPING_RIGHT); // removed this.player.vy === 0: inf junp fix
  }
}


export class JumpingLeft extends State {
  player: any;

  constructor(player: Player) {
    super("JUMPING_LEFT");
    this.player = player;
  }

  enter() {
    if (this.player.vy === 0) this.player.vy -= 20;
  }

  handleInput(input: { [key: string]: { pressed: boolean } }) {
    // prob. still could cause inf junp issue: this.player.vy === 0
    if (!input.a.pressed && this.player.vy === 0) this.player.setState(states.STANDING_LEFT);
    else if (input.d.pressed && this.player.vy !== 0) this.player.setState(states.RUNNING_RIGHT);
    else if (input.a.pressed && !input.w.pressed) this.player.setState(states.RUNNING_LEFT);
    else if (input.a.pressed && input.w.pressed && this.player.onGround()) this.player.setState(states.RUNNING_LEFT);
    else if (!input.w.pressed && this.player.onGround()) this.player.setState(states.STANDING_LEFT);
  }
}


export class JumpingRight extends State {
  player: any;
  
  constructor(player: Player) {
    super("JUMPING_RIGHT");
    this.player = player;
  }

  enter() {
    if (this.player.vy === 0) this.player.vy -= 20;
  }

  handleInput(input: { [key: string]: { pressed: boolean } }) {
    // prob. still could cause inf junp issue: this.player.vy === 0
    if (!input.d.pressed && this.player.vy === 0) this.player.setState(states.STANDING_RIGHT);
    else if (input.a.pressed && this.player.vy !== 0) this.player.setState(states.RUNNING_LEFT);
    else if (input.d.pressed && !input.w.pressed) this.player.setState(states.RUNNING_RIGHT);
    else if (input.d.pressed && input.w.pressed && this.player.onGround()) this.player.setState(states.RUNNING_RIGHT);
    else if (!input.w.pressed && this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
  }
}
