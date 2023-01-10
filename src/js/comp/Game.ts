// import { Application, Loader, Texture, AnimatedSprite } from "pixi.js";

import { glob, canvas as canvasRender, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { InputHandler } from './modules/inputHandler';
import { Player } from './modules/player';
import { Sun, Palms, Mountains, Ground, Background, SmallPlatform, BigPlatform, Disk } from './modules/Items';
import { Countdown } from './modules/countdown';

import { audioLoader, setTimeoutHandler, setIntervalHandler } from "../../App"
const view = "Game";

import * as desc from "./txt"; // import text content

export const Game = class {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  player: Player;
  input: InputHandler;
  background: Background;
  ground: Ground;
  sun: Sun;
  mountains: Mountains;

  platforms: { [key: string]: SmallPlatform | BigPlatform };
  palms: { [key: string]: Palms };
  disks: { [key: string]: Disk };

  diskCounter: number;
  ihaveit: string[];
  wasAdded: boolean[];

  countdown: Countdown;
  quit: boolean;
  time: number;
  countdownEl: HTMLElement;
  tip: HTMLElement;

  startTime: number = 0;
  now: number = 0;
  then: number = 0;
  elapsed: number = 0;
  fpsInterval: number = 0;
  FPS: number = 60; // declare FPS

  introText: HTMLElement;

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

    this.platforms = {
      smallPlatform1, smallPlatform2, smallPlatform3, smallPlatform4, smallPlatform5,
      smallPlatform6, smallPlatform7, smallPlatform8, smallPlatform9, smallPlatform10, smallPlatform11,
      smallPlatform12, bigPlatform1, bigPlatform2, bigPlatform3, bigPlatform4, bigPlatform5, bigPlatform6,
      bigPlatform7
    };

    this.palms = {
      palmLeftOne1, palmLeftTwo1, palmLeftTwo2, palmLeftTwo3,
      palmRightOne1, palmRightOne2, palmRightOne3, palmRightTwo1, palmRightTwo2, palmRightTwo3,
      palmRightTwo4, palmRightTwo5
    };

    this.disks = {
      diskBehav, diskBio, diskChad, diskChem, diskEksoc, diskGeo, diskInter, diskLaw,
      diskManagement, diskMaths, diskPhilology, diskPhilosophy, diskTomaszow
    };

    this.diskCounter = 0;
    this.ihaveit = [];
    this.wasAdded = [];

    this.countdown = new Countdown();
    this.quit = false;

    // Draw countdown timer when the game runs. Move this to a countdown.js class later.
    this.time = 600;
    this.countdownEl = glob.document.getElementById("countdown") as HTMLElement

    this.tip = glob.document.getElementById("tip") as HTMLElement

    this.introText = glob.document.getElementById('introText') as HTMLElement;
  }

  init() {

    for (let i = 0; i < Object.keys(this.disks).length; ++i) this.wasAdded[i] = false;

    // Draw the intro
    setTimeoutHandler(view,
      setTimeout(() => { this.countdown.update() }, 2550)
    );

    // End the game after 60 seconds
    setTimeoutHandler(view,
      setTimeout(() => {
        this.quit = true;
        if (!this.countdown.wasCleared) {
          this.countdown.wasCleared = true;
          clearInterval(this.countdown.introInterval);
          this.countdownEl.style.display = "none"
        }
      }, 67550) // 67550 = 60 seconds
    );

    // Toggle timer visibility
    setTimeoutHandler(view,
      setTimeout(() => {
        // Top right counter
        if (!this.quit) { this.countdownEl.style.display = "inline-flex" }
        else { this.countdownEl.style.display = "none" };

        // Controls hint
        this.introText.innerHTML = "Use WSAD to move your character";
        this.introText.classList.remove("hide")

        const controlsHint = () => {
          if (glob.document.location.hash === "#game")
            this.introText.classList.add("hide")
          glob.document.body.removeEventListener('keypress', controlsHint);
        };
        glob.document.body.addEventListener('keypress', controlsHint);
      }, 6550 + 30) // 30ms wait for canvas load
    );

    // Timer
    setIntervalHandler(view, setInterval(this.update, 1000));

    // Main game loop - refresh every frame
    setTimeoutHandler(view,
      setTimeout(() => this.renderer(this.FPS), 6550)
    );

    this.listeners()
  }

  listeners = () => {
    // Get the modal
    const modal = glob.document.getElementById("myModal") as HTMLElement;

    // Get the button that opens the modal
    // const btn = glob.document.getElementById("myBtn") as HTMLButtonElement;

    // Get the <span> element that closes the modal
    const span = glob.document.getElementsByClassName("close")[0] as HTMLButtonElement;

    // define ids
    const diskBehavioralImageE = glob.document.getElementById('diskBehavioralImageE') as HTMLElement
    const diskBiologyImageE = glob.document.getElementById('diskBiologyImageE') as HTMLElement
    const diskChadImageE = glob.document.getElementById('diskChadImageE') as HTMLElement
    const diskChemistryImageE = glob.document.getElementById('diskChemistryImageE') as HTMLElement
    const diskEksocImageE = glob.document.getElementById('diskEksocImageE') as HTMLElement
    const diskGeographyImageE = glob.document.getElementById('diskGeographyImageE') as HTMLElement
    const diskInternationalImageE = glob.document.getElementById('diskInternationalImageE') as HTMLElement
    const diskLawImageE = glob.document.getElementById('diskLawImageE') as HTMLElement
    const diskMathsImageE = glob.document.getElementById('diskMathsImageE') as HTMLElement
    const diskManagementImageE = glob.document.getElementById('diskManagementImageE') as HTMLElement
    const diskPhilologyImageE = glob.document.getElementById('diskPhilologyImageE') as HTMLElement
    const diskPhilosophyImageE = glob.document.getElementById('diskPhilosophyImageE') as HTMLElement
    const diskTomaszowImageE = glob.document.getElementById('diskTomaszowImageE') as HTMLElement

    // When the user clicks on the button, open the modal
    diskBehavioralImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtWNOW;
    }

    diskBiologyImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtWBIOS;
    }

    diskChadImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtWFIS;
    }

    diskChemistryImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtCHEMIA;
    }

    diskEksocImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtEKSOC;
    }

    diskGeographyImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtGEO;
    }

    diskInternationalImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtWSMIP;
    }

    diskLawImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtWPIA;
    }
    diskMathsImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtMATH;
    }

    diskManagementImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtWZ;
    }

    diskPhilologyImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtFILOLOG;
    }

    diskPhilosophyImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtFILHIST;
    }

    diskTomaszowImageE.onclick = () => {
      modal.style.display = "block";
      this.tip.innerHTML = desc.txtFILIA;
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
      modal.style.display = "none";
    }


    // When the user clicks anywhere outside of the modal, close it
    glob.document.body.onclick = (event) => { if (event.target == modal) modal.style.display = "none" }

  }

  update = () => { // arrow function in order to reach class by this.
    setTimeoutHandler(view,
      setTimeout(() => {
        let seconds: string = String(this.time % 60);
        seconds = Number(seconds) < 10 ? '0' + seconds : seconds;
        this.countdownEl.innerHTML = seconds;
        --this.time;
      }, 4550)
    );
  }

  renderer = (fps: number) => {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;
    // console.log(this.startTime);
    this.animate();
  }

  animate = () => { // arrow function in order to reach class by this.
    // Request another frame
    if (!this.quit) requestAnimationFrame(this.animate);
    // Clear the main game canvas on game end (else is faster)
    else {
      // console.log("animate(): this.quit = " + this.quit)
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.style.visibility = "hidden"
      this.countdown.drawEnd(this.diskCounter, this.ihaveit);

      // Make the animated disks visible after delay
      setTimeoutHandler(view,
        setTimeout(() => {
          for (let i = 0; i < this.diskCounter; i++) {
            (glob.document.getElementById(this.ihaveit[i]) as HTMLElement).style.display = "inline";//visibility = 'visible';
          }
          setTimeoutHandler(view,
            setTimeout(() => {
              const butt = (glob.document.getElementById('endGameButtons') as HTMLElement);
              (butt.children[0] as HTMLElement).style.display = "inline";
              (butt.children[1] as HTMLElement).style.display = "inline";
            }, 400)
          );
        }, 4550 + this.diskCounter * 250)
      );
    }

    // Calc elapsed time since the last loop
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    // if enough time has elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      // then draw animating objects

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
        setTimeoutHandler(view,
          setTimeout(callEndscreen, 30)
        );
        if (!this.countdown.wasCleared) {
          this.countdown.wasCleared = true;
          clearInterval(this.countdown.introInterval);
        }
      }


      // Test performance, check if the frame is animating at the specified fps

      // let sinceStart = this.now - this.startTime;
      // let currentFps = Math.round((1000 / (sinceStart / ++this.frameCount)) * 100) / 100;
      // console.log("Elapsed time= " 
      //   + Math.round((sinceStart / 1000) * 100) / 100 
      //   + " secs @ " + currentFps + " fps.");
    }
  }
}
