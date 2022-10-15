import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

// import '../../assets/css/main.css'

export const Room = {
  init() {
    insertHTML(glob.document.body, Room.audio)
    replaceHTML(canvas, Room.html)

    // Music fix: DOMException: play() failed because the user didn't interact with the document first.
    glob.document.onclick = () => {
      const audio = document.getElementById("tlo") as HTMLAudioElement
      audio.play()
    }
  },

  html: `<div id="room" class="room-background">
  <a href="#board"><img id="board" class="undraggable"></a>
  <a href="#boot"><img id="ekranGif" src="./assets/pics/ekran.gif" class="undraggable"></a>
  <a href="https://sklep.uni.lodz.pl/"><img id="cup" src="./assets/pics/cup.png" class="undraggable"></a>
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