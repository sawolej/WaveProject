import {InputHandler} from './modules/inputHandler.js';
import {Player} from './modules/player.js';
import {Background} from './modules/background.js';
import {Ground} from './modules/ground.js';
import {BigPlatform} from './modules/bigPlatform.js';
import {SmallPlatform} from './modules/smallPlatform.js';
import {Disk} from './modules/disk.js';
import {Pc} from './modules/pc.js';
import {Sun} from './modules/sun.js';
import {Mountains} from './modules/mountains.js';
import {Palms} from './modules/palms.js';

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
  const bigPlatform1 = new BigPlatform(canvas.width, canvas.height, 390, 715);
  const bigPlatform2 = new BigPlatform(canvas.width, canvas.height, 1370, 715);
  const bigPlatform3 = new BigPlatform(canvas.width, canvas.height, 2730, 715);
  const bigPlatform4 = new BigPlatform(canvas.width, canvas.height, 4005, 751);
  const bigPlatform5 = new BigPlatform(canvas.width, canvas.height, 4555, 565);
  const bigPlatform6 = new BigPlatform(canvas.width, canvas.height, 5106, 378);
  const bigPlatform7 = new BigPlatform(canvas.width, canvas.height, 8464, 565);
  const smallPlatform1 = new SmallPlatform(canvas.width, canvas.height, 222, 455);
  const smallPlatform2 = new SmallPlatform(canvas.width, canvas.height, 1620, 505);
  const smallPlatform3 = new SmallPlatform(canvas.width, canvas.height, 1265, 345);
  const smallPlatform4 = new SmallPlatform(canvas.width, canvas.height, 2285, 590);
  const smallPlatform5 = new SmallPlatform(canvas.width, canvas.height, 2520, 380);
  const smallPlatform6 = new SmallPlatform(canvas.width, canvas.height, 6034, 279);
  const smallPlatform7 = new SmallPlatform(canvas.width, canvas.height, 6351, 389);
  const smallPlatform8 = new SmallPlatform(canvas.width, canvas.height, 6668, 499);
  const smallPlatform9 = new SmallPlatform(canvas.width, canvas.height, 6985, 610);
  const smallPlatform10 = new SmallPlatform(canvas.width, canvas.height, 7302, 720);
  const smallPlatform11 = new SmallPlatform(canvas.width, canvas.height, 8008, 755);
  const smallPlatform12 = new SmallPlatform(canvas.width, canvas.height, 9095, 375);
  const diskBehav = new Disk(canvas.width, canvas.height, "diskBehavioralImage", 264, 380);
  const diskBio = new Disk(canvas.width, canvas.height, "diskBiologyImage", 1307, 270);
  const diskChad = new Disk(canvas.width, canvas.height, "diskChadImage", 9640, 135);
  const diskChem = new Disk(canvas.width, canvas.height, "diskChemistryImage", 1499, 640);
  const diskEksoc = new Disk(canvas.width, canvas.height, "diskEksocImage", 2859, 625);
  const diskGeo = new Disk(canvas.width, canvas.height, "diskGeographyImage", 3005, 224);
  const diskInter = new Disk(canvas.width, canvas.height, "diskInternationalImage", 4134, 676);
  const diskLaw = new Disk(canvas.width, canvas.height, "diskLawImage", 5235, 303);
  const diskMaths = new Disk(canvas.width, canvas.height, "diskMathsImage", 519, 640);
  const diskManagement = new Disk(canvas.width, canvas.height, "diskManagementImage", 7344, 645);
  const diskPhilology = new Disk(canvas.width, canvas.height, "diskPhilologyImage", 6076, 204);
  const diskPhilosophy = new Disk(canvas.width, canvas.height, "diskPhilosophyImage", 4850, 150);
  const diskTomaszow = new Disk(canvas.width, canvas.height, "diskTomaszowImage", 6710, 424);
  const pc = new Pc(canvas.width, canvas.height, 12390, 838); 
  const sun = new Sun(canvas.width, canvas.height);
  const mountains = new Mountains(canvas.width, canvas.height, -1920);
  const palmLeftOne1 = new Palms(canvas.width, canvas.height, "palmLeftOneImage", 155, 265, 3360);
  const palmLeftTwo1 = new Palms(canvas.width, canvas.height, "palmLeftTwoImage", 165, 270, 1710);
  const palmLeftTwo2 = new Palms(canvas.width, canvas.height, "palmLeftTwoImage", 165, 270, 4690);
  const palmLeftTwo3 = new Palms(canvas.width, canvas.height, "palmLeftTwoImage", 165, 270, 8660);
  const palmRightOne1 = new Palms(canvas.width, canvas.height, "palmRightOneImage", 185, 265, 135);
  const palmRightOne2 = new Palms(canvas.width, canvas.height, "palmRightOneImage", 185, 265, 5900);
  const palmRightOne3 = new Palms(canvas.width, canvas.height, "palmRightOneImage", 185, 265, 9130);
  const palmRightTwo1 = new Palms(canvas.width, canvas.height, "palmRightTwoImage", 120, 185, 1070);
  const palmRightTwo2 = new Palms(canvas.width, canvas.height, "palmRightTwoImage", 120, 185, 2200);
  const palmRightTwo3 = new Palms(canvas.width, canvas.height, "palmRightTwoImage", 120, 185, 5500);
  const palmRightTwo4 = new Palms(canvas.width, canvas.height, "palmRightTwoImage", 120, 185, 6830);
  const palmRightTwo5 = new Palms(canvas.width, canvas.height, "palmRightTwoImage", 120, 185, 8170);

  const disks = [diskBehav, diskBio, diskChad, diskChem, diskEksoc, diskGeo, diskInter, diskLaw, diskManagement, 
    diskMaths, diskPhilology, diskPhilosophy, diskTomaszow];

  const palms = [palmLeftOne1, palmLeftTwo1, palmLeftTwo2, palmLeftTwo3, 
    palmRightOne1, palmRightOne2, palmRightOne3, palmRightTwo1, palmRightTwo2, palmRightTwo3,
    palmRightTwo4, palmRightTwo5];

  const platforms = [smallPlatform1, smallPlatform2, smallPlatform3, smallPlatform4, smallPlatform5, 
    smallPlatform6, smallPlatform7, smallPlatform8, smallPlatform9, smallPlatform10, smallPlatform11, 
    smallPlatform12, bigPlatform1, bigPlatform2, bigPlatform3, bigPlatform4, bigPlatform5, bigPlatform6, 
    bigPlatform7];

  // Main game loop - refresh every frame
  function animate() {

    // Draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    sun.draw(ctx);
    mountains.draw(ctx);
    ground.draw(ctx);
    
    for (let i = 0; i < palms.length; ++i) {
      palms[i].draw(ctx);
    }

    // Draw platforms
    for (let i = 0; i < platforms.length; ++i) {
      platforms[i].draw(ctx);
      platforms[i].collide(player);
    }

    // Draw disks
    for (let i = 0; i < disks.length; ++i) {
      if (!disks[i].isNear(player)) {disks[i].drawGlow(ctx); disks[i].draw(ctx);}
    }

    pc.draw(ctx);
    player.update(input.keys);
    player.draw(ctx);

    // Only the one called platform will work for onGround - fix in the future
    player.getPlatformInfo(bigPlatform1);

    // Side scrolling effect for moving rightwards
    if ((player.currentState === player.states[3] || (player.currentState === player.states[5] &&
      input.keys.d.pressed)) && player.x === 948) {
      
      for (let i = 0; i < disks.length; ++i) disks[i].x -= 10;
      for (let i = 0; i < palms.length; ++i) palms[i].x -= 7;
      for (let i = 0; i < platforms.length; ++i) platforms[i].x -= 10;

      background.x -= 0.05;
      ground.x -= 10;
      pc.x -= 10;
      mountains.x -= 5;
    }

    // Side scrolling effect for moving leftwards
    else if ((player.currentState == player.states[2] || (player.currentState === player.states[4] &&
      input.keys.a.pressed)) && player.x === 400) {

      for (let i = 0; i < disks.length; ++i) disks[i].x += 10;
      for (let i = 0; i < palms.length; ++i) palms[i].x += 7;
      for (let i = 0; i < platforms.length; ++i) platforms[i].x += 10;

      background.x += 0.05;
      ground.x += 10;
      pc.x += 10;
      mountains.x += 5;
    }
    
    // Scroll the background images endlessly
    if (background.x <= -3840 || background.x >= 0) background.x = -1920;
    if (mountains.x <= -3840 || mountains.x >= 0) mountains.x = -1920;
    if (ground.x <= -3840 || ground.x >= 0) ground.x = -1920;

    requestAnimationFrame(animate);
  }

  animate();
})
