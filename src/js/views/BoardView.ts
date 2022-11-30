import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { Board as BoardEngine } from '../comp/Board'

import { audioLoader } from "../../App"

export class BoardView {
  constructor() {}

  init() {
    replaceHTML(canvas, this.html)
    audioLoader("./src/assets/sounds/tlo_b.mp3", true, .1)//, 2.137)

    const newBoard = new BoardEngine()
    newBoard.init()
  }

  html = `
  <div class="board-wrapper cork-board">
    <div id="arrow" class="arrow-wrapper"></div>
    <div id="sheet1click" class="undraggable"></div>
    <div id="sheet2click" class="undraggable"></div>
    <div id="sheet3click" class="undraggable"></div>
    <div id="sheet4click" class="undraggable"></div>
    <img id="sheet1" src="./src/assets/pics/sheet1.png" class="undraggable">
    <img id="sheet2" src="./src/assets/pics/sheet2.png" class="undraggable">
    <img id="sheet3" src="./src/assets/pics/sheet3.png" class="undraggable">
    <img id="sheet4" src="./src/assets/pics/sheet4.png" class="undraggable">
  
    <a target="_blank" rel="noopener noreferrer" id="fb" href="https://www.facebook.com/unilodz/">Facebook</a>
    <a target="_blank" rel="noopener noreferrer" id="tiktok" href="https://www.tiktok.com/@unilodz">Tik tok</a>
    <a target="_blank" rel="noopener noreferrer" id="insta" href="https://www.instagram.com/unilodz">Instagram</a>
  
    <div id="buttonsUL">
    <a target="_blank" rel="noopener noreferrer" id="UL1" href="https://rekrutacja.uni.lodz.pl/pl/">Portal Rekrutacyjny</a>
    <a target="_blank" rel="noopener noreferrer" id="UL2" href=
      "http://static.uni.lodz.pl/dso/irk2/terminarz_2022_2023.pdf">Terminarz Rekrutacji</a>
    </div>
  </div>`
}
