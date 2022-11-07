import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { Game as GameEngine } from '../comp/Game.js'

// import '../../assets/css/main.css'

export const GameView = {
  init() {
    replaceHTML(canvas, GameView.html)
    insertHTML(canvas, GameView.audio)
    
    const newGame = new GameEngine
    newGame.init()

    // Music fix: DOMException: play() failed because the user didn't interact with the document first.
    // glob.document.onclick = () => {
    //   const audio = document.getElementById("player") as HTMLAudioElement
    //   audio.play()
    //   Game.countdownTrigger()
    // }
    GameView.countdownTrigger()
  },

  countdownTrigger() { 
    setTimeout( () => {
      const audio = document.getElementById("countdownSound") as HTMLAudioElement
      audio.play();
    }, 3800)
  },

  html: `<div id="game-wrapper" class="centred">
  <canvas id="canvas1"></canvas>
  <p id="introText">COLLECT ALL DISKS BEFORE THE TIME RUNS OUT!</p>
  <p id="introCountdown"></p>
  <p id="countdown"></p>
</div>

<div id="endgame-text" class="text">
 
  <!-- text gets injected here // this should be dynamic, DOM createElement -->

</div>

<img id="playerImage" src="./assets/pics/player.png">
<img id="backgroundImage" src="./assets/pics/background.png">
<img id="smallPlatformImage" src="./assets/pics/smallPlatform.png">
<img id="bigPlatformImage" src="./assets/pics/bigPlatform.png">
<img id="groundImage" src="./assets/pics/ground.png">
<img id="diskBehavioralImage" src="./assets/pics/FloppyDiskBehavioralHoney.png">
<img id="diskBiologyImage" src="./assets/pics/FloppyDiskBiologyLime.png">
<img id="diskChadImage" src="./assets/pics/FloppyDiskChadColour.png">
<img id="diskChemistryImage" src="./assets/pics/FloppyDiskChemistryMarine.png">
<img id="diskEksocImage" src="./assets/pics/FloppyDiskEksocPurple.png">
<img id="diskGeographyImage" src="./assets/pics/FloppyDiskGeographyDingyGreen.png">
<img id="diskInternationalImage" src="./assets/pics/FloppyDiskInternationalBlue.png">
<img id="diskLawImage" src="./assets/pics/FloppyDiskLawRaspberry.png">
<img id="diskMathsImage" src="./assets/pics/FloppyDiskMathsGreen.png">
<img id="diskManagementImage" src="./assets/pics/FloppyDiskManagementAzure.png">
<img id="diskPhilologyImage" src="./assets/pics/FloppyDiskPhilologyNavy.png">
<img id="diskPhilosophyImage" src="./assets/pics/FloppyDiskPhilosophyTurquoise.png">
<img id="diskTomaszowImage" src="./assets/pics/FloppyDiskTomaszowCrimson.png">
<img id="sunImage" src="./assets/pics/sun.png">
<img id="glowImage" src="./assets/pics/diskGlow.png">
<img id="mountainsImage" src="./assets/pics/mountains.png">
<img id="palmLeftOneImage" src="./assets/pics/palmLeftOne.png">
<img id="palmLeftTwoImage" src="./assets/pics/palmLeftTwo.png">
<img id="palmRightOneImage" src="./assets/pics/palmRightOne.png">
<img id="palmRightTwoImage" src="./assets/pics/palmRightTwo.png">

<!-- Trigger/Open The Modal -->
<div id = "endDisks" class="centred">
  <img id="myBtn" src="./assets/pics/FloppyDiskBehavioralHoney.png">
  <img id="diskBehavioralImageE" src="./assets/pics/beh.gif" class="undraggable">
  <img id="diskBiologyImageE" src="./assets/pics/lime.gif" class="undraggable">
  <img id="diskChadImageE" src="./assets/pics/hom.gif" class="undraggable">
  <img id="diskChemistryImageE" src="./assets/pics/chem.gif" class="undraggable">
  <img id="diskEksocImageE" src="./assets/pics/eks.gif" class="undraggable">
  <img id="diskGeographyImageE" src="./assets/pics/geo.gif" class="undraggable">
  <img id="diskInternationalImageE" src="./assets/pics/inter.gif" class="undraggable">
  <img id="diskLawImageE" src="./assets/pics/law.gif" class="undraggable">
  <img id="diskMathsImageE" src="./assets/pics/mata.gif" class="undraggable">
  <img id="diskManagementImageE" src="./assets/pics/mana.gif" class="undraggable">
  <img id="diskPhilologyImageE" src="./assets/pics/philo.gif" class="undraggable">
  <img id="diskPhilosophyImageE" src="./assets/pics/sofy.gif" class="undraggable">
  <img id="diskTomaszowImageE" src="./assets/pics/toma.gif" class="undraggable">
</div>

<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p id="tip">Some text in the Modal..</p>
  </div>
</div>`,

  audio: `<audio id="countdownSound" src="./assets/sounds/countdown.mp3"></audio>
<audio id="player" autoplay loop>
  <source src="./assets/sounds/mainGameMusic.mp3" type="audio/mp3">
</audio>`,

// <audio id="countdownSound" src="./assetssounds/countdown.mp3"></audio>
//
// `<audio id="countdownSound" autoplay>
//   <source src="./assets/sounds/countdown.mp3" type="audio/mp3">
// </audio>`
}