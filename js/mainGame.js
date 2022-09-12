import {InputHandler} from './modules/inputHandler.js';
import {Player} from './modules/player.js';
import {Background} from './modules/background.js';
import {Ground} from './modules/ground.js';
import {BigPlatform} from './modules/bigPlatform.js';
import {SmallPlatform} from './modules/smallPlatform.js';
import {Disk} from './modules/disk.js';
import {Sun} from './modules/sun.js';
import {Mountains} from './modules/mountains.js';
import {Palms} from './modules/palms.js'; 
import {Countdown} from './modules/countdown.js'; 

// Define canvas properties
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

// Instantiate exportable disk objects
export const diskBehav = new Disk(canvas.width, canvas.height, "diskBehavioralImage", 264, 380);
export const diskBio = new Disk(canvas.width, canvas.height, "diskBiologyImage", 1307, 270);
export const diskChad = new Disk(canvas.width, canvas.height, "diskChadImage", 9640, 135);
export const diskChem = new Disk(canvas.width, canvas.height, "diskChemistryImage", 1499, 640);
export const diskEksoc = new Disk(canvas.width, canvas.height, "diskEksocImage", 2859, 625);
export const diskGeo = new Disk(canvas.width, canvas.height, "diskGeographyImage", 3005, 224);
export const diskInter = new Disk(canvas.width, canvas.height, "diskInternationalImage", 4134, 676);
export const diskLaw = new Disk(canvas.width, canvas.height, "diskLawImage", 5235, 303);
export const diskMaths = new Disk(canvas.width, canvas.height, "diskMathsImage", 519, 640);
export const diskManagement = new Disk(canvas.width, canvas.height, "diskManagementImage", 7344, 645);
export const diskPhilology = new Disk(canvas.width, canvas.height, "diskPhilologyImage", 6076, 204);
export const diskPhilosophy = new Disk(canvas.width, canvas.height, "diskPhilosophyImage", 4850, 150);
export const diskTomaszow = new Disk(canvas.width, canvas.height, "diskTomaszowImage", 6710, 424);

window.addEventListener('load', function() {

  const countdown = new Countdown(canvas.width, canvas.height);
  let quit = false;

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


  let diskCounter = 0;
  let ihaveit = [];
  let wasAdded = [];
  let container = document.querySelector(".text");

  const disks = [diskBehav, diskBio, diskChad, diskChem, diskEksoc, diskGeo, diskInter, diskLaw, diskManagement, 
  diskMaths, diskPhilology, diskPhilosophy, diskTomaszow];

  const palms = [palmLeftOne1, palmLeftTwo1, palmLeftTwo2, palmLeftTwo3, 
  palmRightOne1, palmRightOne2, palmRightOne3, palmRightTwo1, palmRightTwo2, palmRightTwo3,
  palmRightTwo4, palmRightTwo5];

  const platforms = [smallPlatform1, smallPlatform2, smallPlatform3, smallPlatform4, smallPlatform5, 
  smallPlatform6, smallPlatform7, smallPlatform8, smallPlatform9, smallPlatform10, smallPlatform11, 
  smallPlatform12, bigPlatform1, bigPlatform2, bigPlatform3, bigPlatform4, bigPlatform5, bigPlatform6, 
  bigPlatform7]; 

  for (let i = 0; i < disks.length; ++i) wasAdded[i] = false;

  // Draw game intro
  countdown.drawBase(ctx);
function setText(arr){
  document.getElementById("tip").innerHTML = document.getElementById("tip").innerHTML + " \n New text!";
}
  this.setTimeout(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    countdown.drawFirst(ctx);
  }, 3550)

  this.setTimeout(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    countdown.drawSecond(ctx);
  }, 4550)
  
  this.setTimeout(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    countdown.drawThird(ctx);
  }, 5550)

  // End the game after 60 seconds
  this.setTimeout(function() {
    quit = true;
  }, 33550)

  // Main game loop - refresh every frame
  this.setTimeout(function() {
    function animate() {

      // Draw background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      background.draw(ctx);
      sun.draw(ctx);
      mountains.draw(ctx);
      ground.draw(ctx);
  
      // Draw palms
      for (let i = 0; i < palms.length; ++i) {
        palms[i].draw(ctx, diskCounter);
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
        mountains.x += 5;
      }
      
      // Scroll the background images endlessly
      if (background.x <= -3840 || background.x >= 0) background.x = -1920;
      if (mountains.x <= -3840 || mountains.x >= 0) mountains.x = -1920;
      if (ground.x <= -3840 || ground.x >= 0) ground.x = -1920;

      // Win after picking up all disks
      for (let i = 0; i < disks.length; ++i) {
        if (disks[i].isPicked && !wasAdded[i]) {
          wasAdded[i] = true;
          ++diskCounter;
          ihaveit.push(disks[i].name+"E");
        }
      }

      // Known bug - set.Timeout is an immediate function call,no 3s interval after collecting all the disks 
      // this.setTimeout(function() {
      //   if (diskCounter === disks.length) quit = true;
      // }, 3000)

      ///POPUP

      // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
diskBehavioralImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip")
  .innerHTML = `Wydział Nauk o Wychowaniu<br>
  <br>
  <a href="wnow.uni.lodz.pl">Strona internetowa wydziału</a><br>
  <br>
  <b>Czy wiesz, że...</b><br>
  Na Uniwersytecie Łódzkim masz możliwość rozwijania swojej ścieżki naukowej między innymi dzięki grantom badawczym. 
  Zespół badawczy związany z Wydziałem NAuk o Wychowaniu otrzymał 
  grant Miniatura NCN pt. Zastosowanie rzeczywistości wirtualnej i stymulacji bilateralnej w redukcji stresu u osób dorosłych. 
  Głównym celem projektu jest stworzenie aplikacji wspierającej psychoterapię osób z zaburzeniami lękowymi, która od wybuchu wojny w Ukrainie daje uchodźcom możliwość relaksu w wirtualnej rzeczywistości.

  `//"Wydział Nauk o Wychowaniu \n bajojajo";
}
diskBiologyImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Biologii i Ochrony Środowiska";
}
diskChadImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Fizyki i Informatyki Stosowanej";
}
diskChemistryImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Chemii";
}
diskEksocImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Ekonomiczno-Socjologiczny";
}
diskGeographyImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Nauk Geograficznych";
}
diskInternationalImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Studiów Międzynarodowych i Politologicznych";
}
diskLawImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Prawa i Administracji";
}
diskMathsImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Matematyki i Informatyki";
}
diskManagementImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Zarządzania";
}
diskPhilologyImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Filologiczny";
}
diskPhilosophyImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Wydział Filozoficzno-Historyczny";
}
diskTomaszowImageE.onclick = function() {
  modal.style.display = "block";
  document.getElementById("tip").innerHTML = "Filia w Tomaszowie Mazowieckim";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/////
      if (!quit) requestAnimationFrame(animate);
      if (quit){ 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        countdown.drawEnd(ctx, diskCounter, ihaveit);
        console.log(ihaveit);
        setText(ihaveit);
        
        setTimeout(function() {
          for(let i =0; i<diskCounter;i++) {
          document.getElementById(ihaveit[i]).style.visibility = 'visible';
          console.log(ihaveit[i]);
        }
        }, 3550 + diskCounter*900)

      }
    }
    
    animate();
      
  }, 6550)
})
