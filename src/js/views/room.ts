import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

// import '../../assets/css/main.css'

export const Room = {
  music: false,
  init() {
    replaceHTML(canvas, Room.html)
    insertHTML(canvas, Room.audio)
    
    // Music
    const audio = glob.document.getElementById("tlo") as HTMLAudioElement
    // fix: make it less distorted
    audio.volume = 0.1//0.7; // FOR DEVELOPING ;~~)))

    // Music fix: DOMException: play() failed because the user didn't interact with the document first.
    if (this.music === false && audio.duration === 0) { 
      // Music fix: audio.duration === 0 
      // fixes music playing in the background from previous 
      // instances not yet destroyed by js garbage collector
      glob.document.onclick = () => audio.play();
      this.music = true
    }
  },

  html: `<div id="room" class="room-background">
  <a href="#board"><img id="board" class="undraggable"></a>
  <a href="#boot"><img id="ekranGif" src="./assets/pics/ekran.gif" class="undraggable"></a>
  <div id="cup" class="cup-wrapper"></div>
  <a href="https://sklep.uni.lodz.pl/"><div id="cupOutline" class="cup-outline-wrapper"></div></a>
</div>`,

  audio: `<audio id="tlo" autoplay loop>
  <source src="./assets/sounds/tlo.mp3" type="audio/mp3">
</audio>`
}

// do we need it? use DOM <a href="url"> instead
//
// const click_screen = () => {
//   glob.window.location.href="screen.html";
// }

// const click_board = () =>  {
//   glob.window.location.href="board.html";
// }

// const click_cup = () =>  {
//   glob.window.location.href="https://sklep.uni.lodz.pl/";
// }