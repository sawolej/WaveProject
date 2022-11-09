import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { Board as BoardEngine } from '../comp/Board.js'

import { audioLoader } from "../../App.js"

export const BoardView = {
  init() {
    replaceHTML(canvas, BoardView.html)
    audioLoader("./assets/sounds/tlo_b.mp3")

    const newBoard = new BoardEngine()
    newBoard.init()
  },

  html: `<div id="wrapper" class="board-wrapper">
  <img id="arrow" src="./assets/pics/arrow.png">
  <img id="sheet1" src="./assets/pics/sheet1.png" class="undraggable">
  <img id="sheet1click" src="./assets/pics/sheet1.png" class="undraggable">
  <img id="sheet2click" src="./assets/pics/sheet1.png" class="undraggable">
  <img id="sheet3click" src="./assets/pics/sheet1.png" class="undraggable">
  <img id="sheet4click" src="./assets/pics/sheet1.png" class="undraggable">
  <img id="sheet2" src="./assets/pics/sheet2.png" class="undraggable">
  <img id="sheet3" src="./assets/pics/sheet3.png" class="undraggable">
  <img id="sheet4" src="./assets/pics/sheet4.png" class="undraggable">
  
  <button id="fb" onclick="location.href='http://stackoverflow.com';">Facebook</button>
  <button id="insta">Instagram</button>
  <button id="tiktok" onclick="location.href='http://stackoverflow.com';">Tik tok</button>
  
  <div id="buttonsUL">
    <form>
      <button id="UL1" formaction="https://rekrutacja.uni.lodz.pl/pl/">Portal Rekrutacyjny</button>
      <button id="UL2" formaction="http://static.uni.lodz.pl/dso/irk2/terminarz_2022_2023.pdf">Terminarz Rekrutacji
        2022/2023</button>
    </form>
  </div>
</div>`,
}
