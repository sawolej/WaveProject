import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { audioLoader, playAudio, isPlaying, setTimeoutHandler } from "../../App"

let isFirstOpen = true //maybe there is a better place for this? 
export class RoomView {
  animation: any;

  constructor() { }

  init() {
    replaceHTML(canvas, this.html)
    this.loadAudio()

    // Workaround to not play music for a second time in parallel on localhost,
    // its not needed if we would make first quest: turn on the music
    // if (glob.location.hostname === "localhost") this.music = true

    // pc custom hover area
    const pc = glob.document.getElementsByClassName('pc')[0]
    const pcClickBox = glob.document.getElementsByClassName('pc-click-box') as HTMLCollectionOf<Element>

    for (let i = 0; i < pcClickBox.length; i++) {
      (pcClickBox[i] as HTMLElement).onmouseover = () => { pc.classList.add('highlight') };
      (pcClickBox[i] as HTMLElement).onmouseout = () => { pc.classList.remove('highlight') };
    }

    const butt = (glob.document.getElementById('playGame') as HTMLElement);
    butt.addEventListener('click', () => { glob.document.location.hash = "#game"; });

    // click event listener
    glob.document.body.addEventListener('click', this.firstClick)

    // Animation
    // in the future we can use js to detect loading of site
    // and extend animation depending on the assetsload time
    if (isFirstOpen) { 
      glob.document.body.className = 'hidden';
      this.animation = setTimeout(() => {
        glob.document.body.className = 'visible';
        isFirstOpen = false;
      }, 1000)
    }
  }

  loadAudio = () => audioLoader("./src/assets/sounds/tlo.mp3", true)

  // Music fix: DOMException: play() failed because the user didn't interact with the document first.
  firstClick = () => {
    if (!isPlaying()) playAudio()

    // removing of a listener like below is propably ok as long as
    // we dont use any other glob.document.body listeners in this view,
    // otherwise, we can try to add this to id or class element instead
    glob.document.body.removeEventListener('click', this.firstClick)
  }

  destruct = () => {
    clearTimeout(this.animation) // destruct animation event in case of page back etc.
  }

  html = `
  <div class="room">
    <a href="#board"><div class="board"></div></a>
    <a target="_blank" rel="noopener noreferrer" href="https://sklep.uni.lodz.pl/">
      <div class="cup-wrapper cup"></div>
    </a>
    <div class="plant-wrapper plant"></div>
    <div class="pc-wrapper pc">
      <a href="#boot">
        <img class="screen-gif" src="./src/assets/pics/screen.gif">
        <div class="pc-click-box box-one"></div>
        <div class="pc-click-box box-two"></div>
        <div class="pc-click-box box-three"></div>
      </a>
    </div>
    <div id="playGame" class="playGameButton"></div>
  </div>`
}
