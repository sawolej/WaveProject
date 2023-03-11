import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { audioLoader } from "../../App"

export class BoardView {
  ap1: any;
  ap2: any;
  ap3: any;
  ule: any;
  p1: any;
  p2: any;
  boardWrapper: any;

  constructor() { }

  init() {
    replaceHTML(canvas, this.html)
    audioLoader("./src/assets/sounds/tlo_b.mp3", true)

    this.initBoard()
  }

  initBoard() {
    this.ap1 = glob.document.getElementById("insta") as HTMLElement;
    this.ap2 = glob.document.getElementById("fb") as HTMLElement;
    this.ap3 = glob.document.getElementById("tiktok") as HTMLElement;
    this.ule = glob.document.getElementById("buttonsUL") as HTMLElement;
    this.p1 = glob.document.getElementById("programs_1") as HTMLElement;
    this.p2 = glob.document.getElementById("programs_2") as HTMLElement;

    // click listeners
    (glob.document.getElementById('arrow') as HTMLElement).onclick = () => this.goBack();
    (glob.document.getElementById('sheet1click') as HTMLElement).onclick = () => this.openSheet('sheet1');
    (glob.document.getElementById('sheet2click') as HTMLElement).onclick = () => this.openSheet('sheet2');
    (glob.document.getElementById('sheet3click') as HTMLElement).onclick = () => this.openSheet('sheet3');
    (glob.document.getElementById('sheet4click') as HTMLElement).onclick = () => this.openSheet('sheet4');

    // close by click
    this.boardWrapper = glob.document.getElementsByClassName("board-wrapper")[0]
    this.boardWrapper.addEventListener('click', this.closeByClick);
    // close by key
    glob.document.body.addEventListener('keypress', this.closeAll);

  }

  openSheet(id: any) {
    const x = glob.document.getElementById(id) as HTMLElement;
    this.closeAll();
    x.style.visibility = 'visible';
    if (id === "sheet1") this.openApp()
    else if (id === "sheet2") this.openUL()
    else if (id === "sheet3") this.p2.style.visibility = 'visible';
    else if (id === "sheet4") this.p1.style.visibility = 'visible';
  }

  closeAll() {
    for (let i = 1; i < 5; i++) (glob.document.getElementById(`sheet${i}`) as HTMLElement).style.visibility = 'hidden';
    this.closeApp();
    this.closeUL();
    this.p1.style.visibility = 'hidden';
    this.p2.style.visibility = 'hidden';
  }

  closeApp() {
    this.ap2.style.visibility = 'hidden';
    this.ap1.style.visibility = 'hidden';
    this.ap3.style.visibility = 'hidden';
  }

  openApp() {
    this.ap2.style.visibility = 'visible';
    this.ap1.style.visibility = 'visible';
    this.ap3.style.visibility = 'visible';
  }

  openUL() {
    this.ule.style.visibility = 'visible';
  }

  closeUL() {
    this.ule.style.visibility = 'hidden';
  }

  closeByClick = (e: any) => {
    if (!e.target.classList.contains("undraggable") && e.target.localName !== "a")
      this.closeAll()
  }

  goBack() {
    glob.document.location.hash = "";
  }

  destruct() {
    this.boardWrapper.removeEventListener('click', this.closeByClick);
    glob.document.body.removeEventListener('keypress', this.closeAll);
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
  
    <a target="_blank" rel="noopener noreferrer" id="fb" href="https://www.facebook.com/uni.lodz.studiuj">Facebook</a>
    <a target="_blank" rel="noopener noreferrer" id="tiktok" href="https://www.tiktok.com/@unilodz">Tik tok</a>
    <a target="_blank" rel="noopener noreferrer" id="insta" href="https://www.instagram.com/unilodz">Instagram</a>
  
    <div id="buttonsUL">
    <a target="_blank" rel="noopener noreferrer" id="UL1" href="https://www.uni.lodz.pl/strefa-kandydata/rekrutacja">Rekrutacja</a>
    <a target="_blank" rel="noopener noreferrer" id="UL2" href=
      "http://static.uni.lodz.pl/dso/irk2/terminarz_2023_2024.pdf">Terminarz Rekrutacji</a>
    </div>

    <div id="programs_1">
    <a target="_blank" rel="noopener noreferrer" id="P1_1" href="https://www.uni.lodz.pl/sport-na-unilodz/program-studia-i-sport">Studia i sport</a>
    <a target="_blank" rel="noopener noreferrer" id="P1_2" href="https://www.uni.lodz.pl/zuss">Zdolny uczeń - świetny student</a>
    <a target="_blank" rel="noopener noreferrer" id="P1_3" href="https://www.uni.lodz.pl/strefa-studenta/rozwoj/studenckie-granty-badawcze ">Studenckie granty badawcze</a>
    </div>

    <div id="programs_2">
    <a target="_blank" rel="noopener noreferrer" id="P2_1" href="https://www.uni.lodz.pl/wyjazdy-zagraniczne ">Wyjazdy zagraniczne</a>
    <a target="_blank" rel="noopener noreferrer" id="P2_2" href="https://www.uni.lodz.pl/strony/akademiki">Akademiki</a>
    <a target="_blank" rel="noopener noreferrer" id="P2_3" href="https://www.uni.lodz.pl/strefa-studenta/wsparcie/stypendia">Stypendia </a>
    </div>

  </div>`
}
