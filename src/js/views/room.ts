import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { audioLoader } from "../../App.js"

export const RoomView = {
  music: false,

  init() {
    replaceHTML(canvas, RoomView.html)
    RoomView.loadAudio()

    // Workaround to not play music for a second time in parallel on localhost,
    // its not needed if we would make first quest: turn on the music
    if (glob.location.hostname === "localhost") RoomView.music = true

    // click event listener
    glob.document.body.addEventListener('click', RoomView.firstClick)
  },

  loadAudio: () => audioLoader("./assets/sounds/tlo.mp3"),

  // Music fix: DOMException: play() failed because the user didn't interact with the document first.
  firstClick: () => {
    if (RoomView.music === false) {
      RoomView.loadAudio()
      RoomView.music = true
    }
    // removing of a listener like below is propably ok as long as
    // we dont use any other document.body listeners in this view,
    // otherwise, we can try to add this to id or class element instead
    glob.document.body.removeEventListener('click', RoomView.firstClick)
  },

  html: `
  <div class="room">
    <a href="#board"><div class="board"></div></a>
    <a target="_blank" rel="noopener noreferrer" href="https://sklep.uni.lodz.pl/">
      <div class="cup-wrapper cup"></div>
    </a>
    <div class="plant-wrapper plant"></div>
    <div class="pc-wrapper pc"><a href="#boot"><img class="screen-gif" src="./assets/pics/screen.gif"></a></div>
  </div>`
}
