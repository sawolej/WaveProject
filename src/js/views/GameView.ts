import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { Game as GameEngine } from '../comp/Game'

import { audioLoader } from "../../App"

export class GameView {
  countdownTrigger: any
  audio: any = {}

  constructor() { }

  init() {
    replaceHTML(canvas, this.html)
    audioLoader("./src/assets/sounds/mainGameMusic.mp3")

    const newGame = new GameEngine()
    newGame.init()

    // Timeout function
    this.countdownTrigger = setTimeout(() => { // this timeout bugs music
      this.audio.countdown = new Audio("./src/assets/sounds/countdown.mp3")
      this.audio.countdown.play()
    }, 3800)
  }

  destruct = () => {
    clearTimeout(this.countdownTrigger)
    for (let a in this.audio) if (this.audio.hasOwnProperty(a)) this.audio[a].pause()
  }

  html = `<div id="game-wrapper">
  <canvas id="canvas1"></canvas>
  <p id="introText">COLLECT ALL DISKS BEFORE THE TIME RUNS OUT!</p>
  <p id="introCountdown"></p>
  <p id="countdown"></p>
</div>

<div id="endgame-text" class="text">
 
  <!-- text gets injected here // this should be dynamic, DOM createElement -->

</div>

<img id="playerImage" src="./src/assets/pics/player.png">
<img id="backgroundImage" src="./src/assets/pics/background.png">
<img id="smallPlatformImage" src="./src/assets/pics/smallPlatform.png">
<img id="bigPlatformImage" src="./src/assets/pics/bigPlatform.png">
<img id="groundImage" src="./src/assets/pics/ground.png">
<img id="diskBehavioralImage" src="./src/assets/pics/FloppyDiskBehavioralHoney.png">
<img id="diskBiologyImage" src="./src/assets/pics/FloppyDiskBiologyLime.png">
<img id="diskChadImage" src="./src/assets/pics/FloppyDiskChadColour.png">
<img id="diskChemistryImage" src="./src/assets/pics/FloppyDiskChemistryMarine.png">
<img id="diskEksocImage" src="./src/assets/pics/FloppyDiskEksocPurple.png">
<img id="diskGeographyImage" src="./src/assets/pics/FloppyDiskGeographyDingyGreen.png">
<img id="diskInternationalImage" src="./src/assets/pics/FloppyDiskInternationalBlue.png">
<img id="diskLawImage" src="./src/assets/pics/FloppyDiskLawRaspberry.png">
<img id="diskMathsImage" src="./src/assets/pics/FloppyDiskMathsGreen.png">
<img id="diskManagementImage" src="./src/assets/pics/FloppyDiskManagementAzure.png">
<img id="diskPhilologyImage" src="./src/assets/pics/FloppyDiskPhilologyNavy.png">
<img id="diskPhilosophyImage" src="./src/assets/pics/FloppyDiskPhilosophyTurquoise.png">
<img id="diskTomaszowImage" src="./src/assets/pics/FloppyDiskTomaszowCrimson.png">
<img id="sunImage" src="./src/assets/pics/sun.png">
<img id="glowImage" src="./src/assets/pics/diskGlow.png">
<img id="mountainsImage" src="./src/assets/pics/mountains.png">
<img id="palmLeftOneImage" src="./src/assets/pics/palmLeftOne.png">
<img id="palmLeftTwoImage" src="./src/assets/pics/palmLeftTwo.png">
<img id="palmRightOneImage" src="./src/assets/pics/palmRightOne.png">
<img id="palmRightTwoImage" src="./src/assets/pics/palmRightTwo.png">

<!-- Trigger/Open The Modal -->
<div id = "endDisks" class="endDisks">
  <!-- <img id="myBtn" src="./src/assets/pics/FloppyDiskBehavioralHoney.png"> -->
  <img id="diskBehavioralImageE" src="./src/assets/pics/beh.gif" class="undraggable">
  <img id="diskBiologyImageE" src="./src/assets/pics/lime.gif" class="undraggable">
  <img id="diskChadImageE" src="./src/assets/pics/hom.gif" class="undraggable">
  <img id="diskChemistryImageE" src="./src/assets/pics/chem.gif" class="undraggable">
  <img id="diskEksocImageE" src="./src/assets/pics/eks.gif" class="undraggable">
  <img id="diskGeographyImageE" src="./src/assets/pics/geo.gif" class="undraggable">
  <img id="diskInternationalImageE" src="./src/assets/pics/inter.gif" class="undraggable">
  <img id="diskLawImageE" src="./src/assets/pics/law.gif" class="undraggable">
  <img id="diskMathsImageE" src="./src/assets/pics/mata.gif" class="undraggable">
  <img id="diskManagementImageE" src="./src/assets/pics/mana.gif" class="undraggable">
  <img id="diskPhilologyImageE" src="./src/assets/pics/philo.gif" class="undraggable">
  <img id="diskPhilosophyImageE" src="./src/assets/pics/sofy.gif" class="undraggable">
  <img id="diskTomaszowImageE" src="./src/assets/pics/toma.gif" class="undraggable">
</div>

<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p id="tip">...</p>
  </div>
</div>`
}
