import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { Board as BoardEngine } from '../comp/Board.js'

// import '../../assets/css/main.css'

export const Board = {
  init() {
    replaceHTML(canvas, Board.html)
    insertHTML(canvas, Board.audio)

    const newBoard = new BoardEngine
    newBoard.init()

    const audio = document.getElementById("audio") as HTMLAudioElement
    // fix: make it less distorted
    audio.volume = 0.1//0.7; // FOR DEVELOPING ;~~)))
  },

  html: `
  <div id="wrapper" class="board-wrapper">
    <div id="arrow" class="arrow-wrapper"></div>
    <img id="sheet1" src="./assets/pics/sheet1.png" class="undraggable">
    <img id="sheet1click" src="./assets/pics/sheet1.png" class="undraggable">
    <img id="sheet2click" src="./assets/pics/sheet1.png" class="undraggable">
    <img id="sheet3click" src="./assets/pics/sheet1.png" class="undraggable">
    <img id="sheet4click" src="./assets/pics/sheet1.png" class="undraggable">
    <img id="sheet2" src="./assets/pics/sheet2.png" class="undraggable">
    <img id="sheet3" src="./assets/pics/sheet3.png" class="undraggable">
    <img id="sheet4" src="./assets/pics/sheet4.png" class="undraggable">
  
    <a target="_blank" rel="noopener noreferrer" id="fb" href="https://www.facebook.com/unilodz/">Facebook</a>
    <a target="_blank" rel="noopener noreferrer" id="tiktok" href="https://www.tiktok.com/@unilodz">Tik tok</a>
    <a target="_blank" rel="noopener noreferrer" id="insta" href="https://www.instagram.com/unilodz">Instagram</a>
  
    <div id="buttonsUL">
    <a target="_blank" rel="noopener noreferrer" id="UL1" href="https://rekrutacja.uni.lodz.pl/pl/">Portal Rekrutacyjny</a>
    <a target="_blank" rel="noopener noreferrer" id="UL2" href=
      "http://static.uni.lodz.pl/dso/irk2/terminarz_2022_2023.pdf">Terminarz Rekrutacji</a>
    </div>
  </div>`,

  audio: `
    <audio id="audio" autoplay loop>
    <source src="./assets/sounds/tlo_b.mp3" type="audio/mp3">
  </audio>`
}
