import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { Game as GameEngine } from '../comp/Game.js'

// import '../../assets/css/main.css'

export const Game = {
  init() {
    insertHTML(glob.document.body, Game.audio)
    replaceHTML(canvas, Game.html)
    
    GameEngine.init()

    // Music fix: DOMException: play() failed because the user didn't interact with the document first.
    glob.document.onclick = () => {
      const audio = document.getElementById("player") as HTMLAudioElement
      audio.play()
      Game.countdownTrigger()
    }
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

<img id="playerImage" src="./assets/graphics/player.png">
<img id="backgroundImage" src="./assets/graphics/background.png">
<img id="smallPlatformImage" src="./assets/graphics/smallPlatform.png">
<img id="bigPlatformImage" src="./assets/graphics/bigPlatform.png">
<img id="groundImage" src="./assets/graphics/ground.png">
<img id="diskBehavioralImage" src="./assets/graphics/FloppyDiskBehavioralHoney.png">
<img id="diskBiologyImage" src="./assets/graphics/FloppyDiskBiologyLime.png">
<img id="diskChadImage" src="./assets/graphics/FloppyDiskChadColour.png">
<img id="diskChemistryImage" src="./assets/graphics/FloppyDiskChemistryMarine.png">
<img id="diskEksocImage" src="./assets/graphics/FloppyDiskEksocPurple.png">
<img id="diskGeographyImage" src="./assets/graphics/FloppyDiskGeographyDingyGreen.png">
<img id="diskInternationalImage" src="./assets/graphics/FloppyDiskInternationalBlue.png">
<img id="diskLawImage" src="./assets/graphics/FloppyDiskLawRaspberry.png">
<img id="diskMathsImage" src="./assets/graphics/FloppyDiskMathsGreen.png">
<img id="diskManagementImage" src="./assets/graphics/FloppyDiskManagementAzure.png">
<img id="diskPhilologyImage" src="./assets/graphics/FloppyDiskPhilologyNavy.png">
<img id="diskPhilosophyImage" src="./assets/graphics/FloppyDiskPhilosophyTurquoise.png">
<img id="diskTomaszowImage" src="./assets/graphics/FloppyDiskTomaszowCrimson.png">
<img id="pcImage" src="./assets/graphics/pc.png">
<img id="sunImage" src="./assets/graphics/sun.png">
<img id="glowImage" src="./assets/graphics/diskGlow.png">
<img id="mountainsImage" src="./assets/graphics/mountains.png">
<img id="palmLeftOneImage" src="./assets/graphics/palmLeftOne.png">
<img id="palmLeftTwoImage" src="./assets/graphics/palmLeftTwo.png">
<img id="palmRightOneImage" src="./assets/graphics/palmRightOne.png">
<img id="palmRightTwoImage" src="./assets/graphics/palmRightTwo.png">

<!-- Trigger/Open The Modal -->
<div id = "endDisks" class="centred">
  <img id="myBtn" src="./assets/graphics/FloppyDiskBehavioralHoney.png"> <!-- Why is myBtn a disk image? -->
  <img id="diskBehavioralImageE" src="./assets/graphics/beh.gif" class="undraggable">
  <img id="diskBiologyImageE" src="./assets/graphics/lime.gif" class="undraggable">
  <img id="diskChadImageE" src="./assets/graphics/hom.gif" class="undraggable">
  <img id="diskChemistryImageE" src="./assets/graphics/chem.gif" class="undraggable">
  <img id="diskEksocImageE" src="./assets/graphics/eks.gif" class="undraggable">
  <img id="diskGeographyImageE" src="./assets/graphics/geo.gif" class="undraggable">
  <img id="diskInternationalImageE" src="./assets/graphics/inter.gif" class="undraggable">
  <img id="diskLawImageE" src="./assets/graphics/law.gif" class="undraggable">
  <img id="diskMathsImageE" src="./assets/graphics/mata.gif" class="undraggable">
  <img id="diskManagementImageE" src="./assets/graphics/mana.gif" class="undraggable">
  <img id="diskPhilologyImageE" src="./assets/graphics/philo.gif" class="undraggable">
  <img id="diskPhilosophyImageE" src="./assets/graphics/sofy.gif" class="undraggable">
  <img id="diskTomaszowImageE" src="./assets/graphics/toma.gif" class="undraggable">
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