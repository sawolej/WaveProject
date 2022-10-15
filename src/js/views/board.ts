import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { Board as BoardEngine } from '../comp/Board.js'

// import '../../assets/css/main.css'

export const Board = {
  init() {
    insertHTML(glob.document.body, Board.audio)
    replaceHTML(canvas, Board.html)

    BoardEngine.init()

    glob.document.onclick = () => {
      const audio = document.getElementById("audio") as HTMLAudioElement
      audio.play()
    }
  },

  html: `<div id="wrapper" class="board-wrapper">
  <img id="arrow" src="./assets/graphics/arrow.png" onclick="goBack()">
  <img id="sheet1" src="./assets/pics/sheet1.png" class="undraggable">
  <img id="sheet1click" src="./assets/pics/sheet1.png" onclick="openSheet('sheet1')" class="undraggable">
  <img id="sheet2click" src="./assets/pics/sheet1.png" onclick="openSheet('sheet2')" class="undraggable">
  <img id="sheet3click" src="./assets/pics/sheet1.png" onclick="openSheet('sheet3')" class="undraggable">
  <img id="sheet4click" src="./assets/pics/sheet1.png" onclick="openSheet('sheet4')" class="undraggable">
  <img id="sheet2" src="./assets/pics/sheet2.png" class="undraggable">
  <img id="sheet3" src="./assets/pics/sheet3.png" class="undraggable">
  <img id="sheet4" src="./assets/pics/sheet4.png" class="undraggable">
  
  <button id="fb" onclick="location.href='http://stackoverflow.com';">Facebook</button>
  <button id="insta" onclick="location.href='http://stackoverflow.com';">Instagram</button>
  <button id="tiktok" onclick="location.href='http://stackoverflow.com';">Tik tok</button>
  
  <div id="buttonsUL">
    <form>
      <button id="UL1" formaction="https://rekrutacja.uni.lodz.pl/pl/">Portal Rekrutacyjny</button>
      <button id="UL2" formaction="http://static.uni.lodz.pl/dso/irk2/terminarz_2022_2023.pdf">Terminarz Rekrutacji
        2022/2023</button>
    </form>
  </div>
</div>`,

  audio: `<audio id="audio" autoplay loop>
  <source src="./assets/sounds/tlo_b.mp3" type="audio/mp3">
</audio>`
}
