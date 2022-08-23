import {InputHandler} from './modules/inputHandler.js';
import {Player} from './modules/player.js';
import {Background} from './modules/background.js';
import {Ground} from './modules/ground.js';
import {BigPlatform} from './modules/bigPlatform.js';
import {SmallPlatform} from './modules/smallPlatform.js';
import {Disk} from './modules/disk.js';

// TODO: Add jumping on platforms
// TODO: Add floppy disk counter "UI" for picked up ones (?)
// TODO: Multiply frames by Time.deltatime JS counterpart - faster PCs run the game... faster

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
  const diskBio = new Disk(canvas.width, canvas.height, "diskBiologyImage", 600, 600);
  const diskChad = new Disk(canvas.width, canvas.height, "diskChadImage", 300, 370);
  const diskChem = new Disk(canvas.width, canvas.height, "diskChemistryImage", 900, 120);
  const diskEksoc = new Disk(canvas.width, canvas.height, "diskEksocImage", 546, 756);
  const diskGeo = new Disk(canvas.width, canvas.height, "diskGeographyImage", 762, 583);
  const diskInter = new Disk(canvas.width, canvas.height, "diskInternationalImage", 845, 935);
  const diskLaw = new Disk(canvas.width, canvas.height, "diskLawImage", 1205, 935);
  const diskMaths = new Disk(canvas.width, canvas.height, "diskMathsImage", 2305, 500);
  const diskMenagement = new Disk(canvas.width, canvas.height, "diskMenagementImage", 1505, 600);
  const diskPhilology = new Disk(canvas.width, canvas.height, "diskPhilologyImage", 3205, 500);
  const diskPhilosophy = new Disk(canvas.width, canvas.height, "diskPhilosophyImage", 1705, 500);
  const diskTomaszow = new Disk(canvas.width, canvas.height, "diskTomaszowImage", 1905, 700);
  
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
    if (!diskBio.isNear(player)) diskBio.draw(ctx);
    if (!diskChad.isNear(player)) diskChad.draw(ctx);
    if (!diskChem.isNear(player)) diskChem.draw(ctx);
    if (!diskEksoc.isNear(player)) diskEksoc.draw(ctx);
    if (!diskGeo.isNear(player)) diskGeo.draw(ctx);
    if (!diskInter.isNear(player)) diskInter.draw(ctx);
    if (!diskLaw.isNear(player)) diskLaw.draw(ctx);
    if (!diskMaths.isNear(player)) diskMaths.draw(ctx);
    if (!diskMenagement.isNear(player)) diskMenagement.draw(ctx);
    if (!diskPhilology.isNear(player)) diskPhilology.draw(ctx);
    if (!diskPhilosophy.isNear(player)) diskPhilosophy.draw(ctx);
    if (!diskTomaszow.isNear(player)) diskTomaszow.draw(ctx);
    player.update(input.keys);
    player.draw(ctx);


    // Side scrolling effect for moving rightwards
    if ((player.currentState === player.states[3] || player.currentState === player.states[5]) && 
      player.x === 800) {
      smallPlatform.x -= 10;
      diskBehav.x -= 10;
      diskBio.x -= 10;
      diskChad.x -= 10;
      diskChem.x -= 10;
      diskEksoc.x -= 10;
      diskGeo.x -= 10;
      diskInter.x -= 10;
      diskLaw.x -= 10;
      diskMaths.x -= 10;
      diskMenagement.x -= 10;
      diskPhilology.x -= 10;
      diskPhilosophy.x -= 10;
      diskTomaszow.x -= 10;
      bigPlatform.x -= 10;
      background.x -= 3;
      ground.x -= 10;
    }

    // Side scrolling effect for moving leftwards
    else if ((player.currentState == player.states[2] || player.currentState === player.states[4]) && 
      player.x === 400) {
      smallPlatform.x += 10;
      diskBehav.x += 10;
      diskBio.x += 10;
      diskChad.x += 10;
      diskChem.x += 10;
      diskEksoc.x += 10;
      diskGeo.x += 10;
      diskInter.x += 10;
      diskLaw.x += 10;
      diskMaths.x += 10;
      diskMenagement.x += 10;
      diskPhilology.x += 10;
      diskPhilosophy.x += 10;
      diskTomaszow.x += 10;
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