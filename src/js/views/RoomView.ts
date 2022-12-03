import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { audioLoader, isPlaying } from "../../App"

export class RoomView {
  constructor() {}

  init() {
    replaceHTML(canvas, this.html)
    this.loadAudio()

    // Workaround to not play music for a second time in parallel on localhost,
    // its not needed if we would make first quest: turn on the music
    // if (glob.location.hostname === "localhost") this.music = true

    // click event listener
    glob.document.body.addEventListener('click', this.firstClick)
  }

  loadAudio = () => audioLoader("./src/assets/sounds/tlo.mp3", true, .1)//, 2.137),

  // Music fix: DOMException: play() failed because the user didn't interact with the document first.
  firstClick = () => {
    if (!isPlaying()) this.loadAudio() 

    // removing of a listener like below is propably ok as long as
    // we dont use any other document.body listeners in this view,
    // otherwise, we can try to add this to id or class element instead
    glob.document.body.removeEventListener('click', this.firstClick)
  }

  destruct = () => {
    // clearTimeout(this.countdownTrigger)
  }

  html = `
  <div class="room">
    <a href="#board"><div class="board"></div></a>
    <a target="_blank" rel="noopener noreferrer" href="https://sklep.uni.lodz.pl/">
      <div class="cup-wrapper cup"></div>
    </a>
    <div class="plant-wrapper plant"></div>
    <div class="pc-wrapper pc"><a href="#boot"><img class="screen-gif" src="./src/assets/pics/screen.gif"></a></div>
  </div>`
}
