import {InputHandler} from './modules/inputHandler.js';
import {Player} from './modules/player.js';
import {Background} from './modules/background.js';
import {Ground} from './modules/ground.js';
import {BigPlatform} from './modules/bigPlatform.js';
import {SmallPlatform} from './modules/smallPlatform.js';
import {Disk} from './modules/disk.js';
import { states } from './modules/state.js';

// TODO: Add jumping on platforms
// TODO: Add sound effects to floppy disks on pickup
// TODO: Add floppy disk counter "UI" for picked up ones (?)

window.addEventListener('load', function() {

  // Define canvas properties
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1920;
  canvas.height = 1080;

  // Instantiate objects
  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();
  const background = new Background(canvas.width, canvas.height, -1920);
  const ground = new Ground(canvas.width, canvas.height, -1920);
  const bigPlatform = new BigPlatform(canvas.width, canvas.height, 1250, 720);
  const smallPlatform = new SmallPlatform(canvas.width, canvas.height, 700, 790);
  const diskBehav = new Disk(canvas.width, canvas.height, "diskBehavioralImage", 500, 800);
  
  // Main game loop - refresh every frame
  function animate() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    ground.draw(ctx);
    bigPlatform.draw(ctx);
    bigPlatform.onPlatform(player);
    smallPlatform.draw(ctx);
    smallPlatform.onPlatform(player);
    if (!diskBehav.isNear(player)) diskBehav.draw(ctx);
    player.update(input.keys);
    player.draw(ctx);


    // Side scrolling effect for moving rightwards
    if ((player.currentState === player.states[3] || player.currentState === player.states[5]) && 
      player.x === 800) {
      smallPlatform.x -= 10;
      diskBehav.x -= 10;
      bigPlatform.x -= 10;
      background.x -= 3;
      ground.x -= 10;
    }
    // Side scrolling effect for moving leftwards
    else if ((player.currentState == player.states[2] || player.currentState === player.states[4]) && 
      player.x === 400) {
      smallPlatform.x += 10;
      diskBehav.x += 10;
      bigPlatform.x += 10;
      background.x += 3;
      ground.x += 10;
    }

    // Repaint the background image for bugless scrolling
    if (background.x <= -3840 || background.x >= 0) background.x = -1920;
    if (ground.x <= -3840 || ground.x >= 0) ground.x = -1920;

    requestAnimationFrame(animate);
  }

  animate();
})