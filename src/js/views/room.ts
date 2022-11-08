import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { audioLoader } from "../../App.js"

export const RoomView = {
  music: false,
  init() {
    replaceHTML(canvas, RoomView.html)
    audioLoader("./assets/sounds/tlo.mp3")
  },

  html: `<div id="room" class="room-background">
  <a href="#board"><img id="board" class="undraggable"></a>
  <a href="#boot"><img id="ekranGif" src="./assets/pics/ekran.gif" class="undraggable"></a>
  <a href="https://sklep.uni.lodz.pl/"><img id="cup" src="./assets/pics/cup.png" class="undraggable"></a>
</div>`,
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
