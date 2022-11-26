import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { audioLoader } from "../../App.js"

export class RoomView {
  music: any

  constructor() { this.music = false }

  init() {
    replaceHTML(canvas, this.html)
    this.loadAudio()

    // Workaround to not play music for a second time in parallel on localhost,
    // its not needed if we would make first quest: turn on the music
    if (glob.location.hostname === "localhost") this.music = true

    // click event listener
    glob.document.body.addEventListener('click', this.firstClick)
  }

  loadAudio = () => audioLoader("./assets/sounds/tlo.mp3", true, .1)//, 2.137),

  // Music fix: DOMException: play() failed because the user didn't interact with the document first.
  firstClick = () => {
    if (this.music === false) {
      this.loadAudio()
      this.music = true
    }
    // removing of a listener like below is propably ok as long as
    // we dont use any other document.body listeners in this view,
    // otherwise, we can try to add this to id or class element instead
    
    glob.document.body.removeEventListener('click', this.firstClick)
  }

  html = `
  <div class="room">
    <a href="#board"><div class="board"></div></a>
    <a target="_blank" rel="noopener noreferrer" href="https://sklep.uni.lodz.pl/">
      <div class="cup-wrapper cup"></div>
    </a>
    <div class="plant-wrapper plant"></div>
    <div class="pc-wrapper pc"><a href="#boot"><img class="screen-gif" src="./assets/pics/screen.gif"></a></div>
  </div>`
}
