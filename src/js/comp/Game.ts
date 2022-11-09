import { glob, canvas as canvasRender, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { InputHandler } from './modules/inputHandler.js';
import { Player } from './modules/player.js';
import { Background } from './modules/background.js';
import { Ground } from './modules/ground.js';
import { BigPlatform } from './modules/bigPlatform.js';
import { SmallPlatform } from './modules/smallPlatform.js';
import { Disk } from './modules/disk.js';
import { Sun } from './modules/sun.js';
import { Mountains } from './modules/mountains.js';
import { Palms } from './modules/palms.js';
import { Countdown } from './modules/countdown.js';

import { GameView } from "../views/game.js";

export const Game = class {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D 

  player: Player;
  input: InputHandler;
  background: Background;
  ground: Ground;
  sun: Sun;
  mountains: Mountains;

  platforms: { smallPlatform1: SmallPlatform; smallPlatform2: SmallPlatform; smallPlatform3: SmallPlatform; 
    smallPlatform4: SmallPlatform; smallPlatform5: SmallPlatform; smallPlatform6: SmallPlatform; 
    smallPlatform7: SmallPlatform; smallPlatform8: SmallPlatform; smallPlatform9: SmallPlatform; 
    smallPlatform10: SmallPlatform; smallPlatform11: SmallPlatform; smallPlatform12: SmallPlatform; 
    bigPlatform1: BigPlatform; bigPlatform2: BigPlatform; bigPlatform3: BigPlatform; bigPlatform4: BigPlatform; 
    bigPlatform5: BigPlatform; bigPlatform6: BigPlatform; bigPlatform7: BigPlatform; };
  palms: { palmLeftOne1: Palms; palmLeftTwo1: Palms; palmLeftTwo2: Palms; palmLeftTwo3: Palms; 
    palmRightOne1: Palms; palmRightOne2: Palms; palmRightOne3: Palms; palmRightTwo1: Palms; palmRightTwo2: Palms; 
    palmRightTwo3: Palms; palmRightTwo4: Palms; palmRightTwo5: Palms; };
  disks: {
    diskBehav: Disk; diskBio: Disk; diskChad: Disk; diskChem: Disk; diskEksoc: Disk; diskGeo: Disk; 
    diskInter: Disk; diskLaw: Disk; diskManagement: Disk; diskMaths: Disk; diskPhilology: Disk; 
    diskPhilosophy: Disk; diskTomaszow: Disk; };

  diskCounter: number;
  ihaveit: any[];
  wasAdded: any[];

  countdown: Countdown;
  quit: boolean;
  time: number;
  countdownEl: HTMLElement;

  constructor() {
        // Define canvas properties
        this.canvas = glob.document.getElementById('canvas1') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = 1400;
        this.canvas.height = 900;
    
        // Define InputHandler
        this.input = new InputHandler();
    
        // Instantiate objects
        this.player = new Player(this.canvas.width, this.canvas.height);
        this.background = new Background(this.canvas.width, this.canvas.height, -1920);
        this.ground = new Ground(this.canvas.width, this.canvas.height, -1920);
        this.sun = new Sun(this.canvas.width, this.canvas.height);
        this.mountains = new Mountains(this.canvas.width, this.canvas.height, -1920);
    
        const bigPlatform1 = new BigPlatform(this.canvas.width, this.canvas.height, 390, 625);
        const bigPlatform2 = new BigPlatform(this.canvas.width, this.canvas.height, 1370, 625);
        const bigPlatform3 = new BigPlatform(this.canvas.width, this.canvas.height, 2730, 625);
        const bigPlatform4 = new BigPlatform(this.canvas.width, this.canvas.height, 4005, 641);
        const bigPlatform5 = new BigPlatform(this.canvas.width, this.canvas.height, 4555, 475);
        const bigPlatform6 = new BigPlatform(this.canvas.width, this.canvas.height, 5106, 308);
        const bigPlatform7 = new BigPlatform(this.canvas.width, this.canvas.height, 8464, 475);
        const smallPlatform1 = new SmallPlatform(this.canvas.width, this.canvas.height, 222, 465);
        const smallPlatform2 = new SmallPlatform(this.canvas.width, this.canvas.height, 1620, 435);
        const smallPlatform3 = new SmallPlatform(this.canvas.width, this.canvas.height, 1265, 295);
        const smallPlatform4 = new SmallPlatform(this.canvas.width, this.canvas.height, 2285, 530);
        const smallPlatform5 = new SmallPlatform(this.canvas.width, this.canvas.height, 2520, 350);
        const smallPlatform6 = new SmallPlatform(this.canvas.width, this.canvas.height, 6034, 190);
        const smallPlatform7 = new SmallPlatform(this.canvas.width, this.canvas.height, 6351, 299);
        const smallPlatform8 = new SmallPlatform(this.canvas.width, this.canvas.height, 6668, 409);
        const smallPlatform9 = new SmallPlatform(this.canvas.width, this.canvas.height, 6985, 520);
        const smallPlatform10 = new SmallPlatform(this.canvas.width, this.canvas.height, 7302, 630);
        const smallPlatform11 = new SmallPlatform(this.canvas.width, this.canvas.height, 8128, 665);
        const smallPlatform12 = new SmallPlatform(this.canvas.width, this.canvas.height, 8975, 285);
        
        const palmLeftOne1 = new Palms(this.canvas.width, this.canvas.height, "palmLeftOneImage", 155, 265, 3360);
        const palmLeftTwo1 = new Palms(this.canvas.width, this.canvas.height, "palmLeftTwoImage", 165, 270, 1710);
        const palmLeftTwo2 = new Palms(this.canvas.width, this.canvas.height, "palmLeftTwoImage", 165, 270, 4690);
        const palmLeftTwo3 = new Palms(this.canvas.width, this.canvas.height, "palmLeftTwoImage", 165, 270, 8660);
        const palmRightOne1 = new Palms(this.canvas.width, this.canvas.height, "palmRightOneImage", 185, 265, 135);
        const palmRightOne2 = new Palms(this.canvas.width, this.canvas.height, "palmRightOneImage", 185, 265, 5900);
        const palmRightOne3 = new Palms(this.canvas.width, this.canvas.height, "palmRightOneImage", 185, 265, 9130);
        const palmRightTwo1 = new Palms(this.canvas.width, this.canvas.height, "palmRightTwoImage", 120, 185, 1070);
        const palmRightTwo2 = new Palms(this.canvas.width, this.canvas.height, "palmRightTwoImage", 120, 185, 2200);
        const palmRightTwo3 = new Palms(this.canvas.width, this.canvas.height, "palmRightTwoImage", 120, 185, 5500);
        const palmRightTwo4 = new Palms(this.canvas.width, this.canvas.height, "palmRightTwoImage", 120, 185, 6830);
        const palmRightTwo5 = new Palms(this.canvas.width, this.canvas.height, "palmRightTwoImage", 120, 185, 8170);
    
        // Instantiate exportable disk objects
        const diskBehav = new Disk(this.canvas.width, this.canvas.height, "diskBehavioralImage", 264, 380);
        const diskBio = new Disk(this.canvas.width, this.canvas.height, "diskBiologyImage", 1307, 205);
        const diskChad = new Disk(this.canvas.width, this.canvas.height, "diskChadImage", 9460, 135);
        const diskChem = new Disk(this.canvas.width, this.canvas.height, "diskChemistryImage", 1499, 545);
        const diskEksoc = new Disk(this.canvas.width, this.canvas.height, "diskEksocImage", 2859, 535);
        const diskGeo = new Disk(this.canvas.width, this.canvas.height, "diskGeographyImage", 2925, 189);
        const diskInter = new Disk(this.canvas.width, this.canvas.height, "diskInternationalImage", 4134, 551);
        const diskLaw = new Disk(this.canvas.width, this.canvas.height, "diskLawImage", 5235, 223);
        const diskMaths = new Disk(this.canvas.width, this.canvas.height, "diskMathsImage", 519, 535);
        const diskManagement = new Disk(this.canvas.width, this.canvas.height, "diskManagementImage", 7344, 540);
        const diskPhilology = new Disk(this.canvas.width, this.canvas.height, "diskPhilologyImage", 6076, 99);
        const diskPhilosophy = new Disk(this.canvas.width, this.canvas.height, "diskPhilosophyImage", 4850, 85);
        const diskTomaszow = new Disk(this.canvas.width, this.canvas.height, "diskTomaszowImage", 6710, 319);
    
        this.platforms = { smallPlatform1, smallPlatform2, smallPlatform3, smallPlatform4, smallPlatform5,
          smallPlatform6, smallPlatform7, smallPlatform8, smallPlatform9, smallPlatform10, smallPlatform11,
          smallPlatform12, bigPlatform1, bigPlatform2, bigPlatform3, bigPlatform4, bigPlatform5, bigPlatform6,
          bigPlatform7 };
    
        this.palms = { palmLeftOne1, palmLeftTwo1, palmLeftTwo2, palmLeftTwo3,
          palmRightOne1, palmRightOne2, palmRightOne3, palmRightTwo1, palmRightTwo2, palmRightTwo3,
          palmRightTwo4, palmRightTwo5 };
    
        this.disks = { diskBehav, diskBio, diskChad, diskChem, diskEksoc, diskGeo, diskInter, diskLaw,
          diskManagement, diskMaths, diskPhilology, diskPhilosophy, diskTomaszow };
    
        this.diskCounter = 0;
        this.ihaveit = [];
        this.wasAdded = [];
    
        this.countdown = new Countdown(this.canvas.width, this.canvas.height);
        this.quit = false;
    
        // Draw countdown timer when the game runs. Move this to a countdown.js class later.
        this.time = 600;
        this.countdownEl = glob.document.getElementById("countdown") as HTMLElement //this.countdown.getCountdownEl()
  }

  init() {


      for (let i = 0; i < Object.keys(this.disks).length; ++i) this.wasAdded[i] = false;

      // Draw the intro
      setTimeout(() => { this.countdown.update() }, 2550)

      // End the game after 60 seconds
      setTimeout(() => {
        this.quit = true;
        if (!this.countdown.wasCleared) {
          this.countdown.wasCleared = true;
          clearInterval(this.countdown.introInterval);
          this.countdownEl.style.display = "none"
        }
      }, 67550) // 67550 = 60 seconds

      // Toggle timer visibility
      setTimeout(() => {
        if (!this.quit) { this.countdownEl.style.display = "inline-flex" }
        else { this.countdownEl.style.display = "none" };
      }, 6550)

      // Timer
      setInterval(this.update, 1000);

      // Main game loop - refresh every frame
      setTimeout(() => this.animate(), 6550)
  }

  update = () => {
    setTimeout(() => {
      let seconds: string = String(this.time % 60);
      seconds = Number(seconds) < 10 ? '0' + seconds : seconds;
      this.countdownEl.innerHTML = seconds;
      --this.time;
    }, 4550)
  }

  animate = () => {
    // Draw background
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw(this.ctx);
    this.sun.draw(this.ctx);
    this.mountains.draw(this.ctx);
    this.ground.draw(this.ctx);

    // Draw palms
    for (let key in this.palms) {
      this.palms[key].draw(this.ctx); // expected 1 argument not 2: (this.ctx, diskCounter)
    }

    // Draw platforms
    for (let key in this.platforms) {
      this.platforms[key].draw(this.ctx);
      this.platforms[key].collide(this.player);
    }

    // Draw disks
    for (let key in this.disks) {
      if (!this.disks[key].isNear(this.player)) { this.disks[key].drawGlow(this.ctx); this.disks[key].draw(this.ctx); }
    }

    this.player.update(this.input.keys);
    this.player.draw(this.ctx);

    // Only the one called platform will work for onGround - fix in the future
    this.player.getPlatformInfo(this.platforms.bigPlatform1);

    // Side scrolling effect for moving rightwards
    if ((this.player.currentState === this.player.states[3] || (this.player.currentState === this.player.states[5] &&
      this.input.keys.d.pressed && !this.input.keys.a.pressed)) && this.player.x === 690 && this.palms.palmRightOne3.x >= 2500) {

      for (let key in this.disks) this.disks[key].x -= 10;
      for (let key in this.palms) this.palms[key].x -= 7;
      for (let key in this.platforms) this.platforms[key].x -= 10;

      this.background.x -= 0.05;
      this.ground.x -= 10;
      this.mountains.x -= 5;
    }

    // Side scrolling effect for moving leftwards
    else if ((this.player.currentState == this.player.states[2] || (this.player.currentState === this.player.states[4] &&
      this.input.keys.a.pressed)) && this.player.x === 400 && this.palms.palmRightOne3.x <= 9500) {

      for (let key in this.disks) this.disks[key].x += 10;
      for (let key in this.palms) this.palms[key].x += 7;
      for (let key in this.platforms) this.platforms[key].x += 10;

      this.background.x += 0.05;
      this.ground.x += 10;
      this.mountains.x += 5;
    }

    // Redraw the background images endlessly
    if (this.background.x <= -3840 || this.background.x >= 0) this.background.x = -1920;
    if (this.mountains.x <= -3840 || this.mountains.x >= 0) this.mountains.x = -1920;
    if (this.ground.x <= -3840 || this.ground.x >= 0) this.ground.x = -1920;

    // Store picked disks to render them on endscreen
    for (let key in this.disks) {
      const i = Object.keys(this.disks).map(e => e).indexOf(key);
      if (this.disks[key].isPicked && !this.wasAdded[i]) {
        this.wasAdded[i] = true;
        ++this.diskCounter;
        this.ihaveit.push(this.disks[key].name + "E");
      }
    }

    // Render endscreen with a 3s delay after win condition
    const callEndscreen = () => {
      this.quit = true;
      this.countdownEl.style.display = "none";
    }

    // Call endscreen with a 3s delay after picking up all the disks 
    if (this.diskCounter === Object.keys(this.disks).length) {
      setTimeout(callEndscreen, 3000);
      if (!this.countdown.wasCleared) {
        this.countdown.wasCleared = true;
        clearInterval(this.countdown.introInterval);
      }
    }

    // Get the modal
    var modal = glob.document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = glob.document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = glob.document.getElementsByClassName("close")[0] as HTMLButtonElement;

    // define ids
    const diskBehavioralImageE = glob.document.getElementById('diskBehavioralImageE')
    const diskBiologyImageE = glob.document.getElementById('diskBiologyImageE')
    const diskChadImageE = glob.document.getElementById('diskChadImageE')
    const diskChemistryImageE = glob.document.getElementById('diskChemistryImageE')
    const diskEksocImageE = glob.document.getElementById('diskEksocImageE')
    const diskGeographyImageE = glob.document.getElementById('diskGeographyImageE')
    const diskInternationalImageE = glob.document.getElementById('diskInternationalImageE')
    const diskLawImageE = glob.document.getElementById('diskLawImageE')
    const diskMathsImageE = glob.document.getElementById('diskMathsImageE')
    const diskManagementImageE = glob.document.getElementById('diskManagementImageE')
    const diskPhilologyImageE = glob.document.getElementById('diskPhilologyImageE')
    const diskPhilosophyImageE = glob.document.getElementById('diskPhilosophyImageE')
    const diskTomaszowImageE = glob.document.getElementById('diskTomaszowImageE')

    // When the user clicks on the button, open the modal
    diskBehavioralImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML =
        `Wydział Nauk o Wychowaniu<br>
  <br>
  <a href="wnow.uni.lodz.pl">Strona internetowa wydziału</a><br>
  <br>
  <b>Czy wiesz, że...</b><br>
  Na Uniwersytecie Łódzkim masz możliwość rozwijania swojej ścieżki naukowej między innymi 
  dzięki grantom badawczym. Zespół badawczy związany z Wydziałem NAuk o Wychowaniu otrzymał 
  grant Miniatura NCN pt. Zastosowanie rzeczywistości wirtualnej i stymulacji bilateralnej 
  w redukcji stresu u osób dorosłych. Głównym celem projektu jest stworzenie aplikacji 
  wspierającej psychoterapię osób z zaburzeniami lękowymi, która od wybuchu wojny 
  w Ukrainie daje uchodźcom możliwość relaksu w wirtualnej rzeczywistości.
  `
    }

    diskBiologyImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Biologii i Ochrony Środowiska";
    }

    diskChadImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Fizyki i Informatyki Stosowanej";
    }

    diskChemistryImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Chemii";
    }

    diskEksocImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Ekonomiczno-Socjologiczny";
    }

    diskGeographyImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Nauk Geograficznych";
    }

    diskInternationalImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Studiów Międzynarodowych i Politologicznych";
    }

    diskLawImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Prawa i Administracji";
    }
    diskMathsImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Matematyki i Informatyki";
    }

    diskManagementImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Zarządzania";
    }

    diskPhilologyImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Filologiczny";
    }

    diskPhilosophyImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Wydział Filozoficzno-Historyczny";
    }

    diskTomaszowImageE.onclick = () => {
      modal.style.display = "block";
      glob.document.getElementById("tip").innerHTML = "Filia w Tomaszowie Mazowieckim";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
      modal.style.display = "none";
    }

    
    // When the user clicks anywhere outside of the modal, close it
    glob.document.body.onclick = (event) => { if (event.target == modal) modal.style.display = "none" }
    
    const setText = (arr) => {
      let text = document.getElementById("tip").innerHTML
      text = text + " \n New text!";
    }

    // Clear the main game canvas on game end
    if (!this.quit) requestAnimationFrame(this.animate);
    if (this.quit) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.countdown.drawEnd(this.diskCounter, this.ihaveit);
      setText(this.ihaveit);
      
      // Make the animated disks visible after delay
      setTimeout(() => {
        for (let i = 0; i < this.diskCounter; i++) {
          glob.document.getElementById(this.ihaveit[i]).style.visibility = 'visible';
        }
      }, 4550 + this.diskCounter * 900)
    }
  }
}
