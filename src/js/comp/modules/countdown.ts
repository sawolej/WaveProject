import { glob } from "../../helpers";

import { setTimeoutHandler, setIntervalHandler } from "../../../App"
const view = "Game";

class Countdown {
  x: number;
  y: number;
  score: number;
  seconds: number;
  introInterval: any;
  wasCleared: boolean;
  countdownEl: HTMLElement;
  // introText: HTMLElement;
  introCountdown: HTMLElement;
  imageFirst: HTMLElement;
  imageSecond: HTMLElement;
  imageThird: HTMLElement;
  imageBlack: HTMLElement;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.seconds = 3;
    this.score = 0;
    this.introInterval;
    this.wasCleared = false;
    this.countdownEl = glob.document.getElementById('countdown') as HTMLElement;
    // this.introText = glob.document.getElementById('introText') as HTMLElement;
    this.introCountdown = glob.document.getElementById('introCountdown') as HTMLElement;
    this.imageFirst = glob.document.getElementById('countdownImageFirst') as HTMLElement;
    this.imageSecond = glob.document.getElementById('countdownImageSecond') as HTMLElement;
    this.imageThird = glob.document.getElementById('countdownImageThird') as HTMLElement;
    this.imageBlack = glob.document.getElementById('blackscreen') as HTMLElement;
  }

  update() {
    let close = false;
    let flag = true;
    if (!close) {
      this.introInterval = setInterval(() => {
        this.introCountdown.innerHTML = String(this.seconds);
        if (this.seconds === 3) this.introCountdown.style.display = "inline-flex";
        if (this.seconds > 0) this.seconds--;
        else if (flag) {
          this.introCountdown.style.display = "none";
          this.introCountdown.remove()
          // this.introText.classList.add("hide") // hide after 3 sec
          close = true;
          flag = false;
        };
      }, 1000)
      setIntervalHandler(view, this.introInterval)
    }

    // Clear the interval after 
    if (close) clearInterval(this.introInterval);
  }

  showDisks(x: number, arr: any[]) {
    let result = "";
    for (let i = 0; i < x; i++) {
      result += i + " ";
      // console.log(arr[i]);
    }
    return result;
  }

  revealOneCharacter(list: any[]) {
    const next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c: any) => {
      next.span.classList.add(c);
    });

    const delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

    if (list.length > 0) {
      setTimeoutHandler(view,
        setTimeout(() => {
          this.revealOneCharacter(list);
        }, delay)
      );
    }
  }

  drawEnd(discI: number, arr: any[], time: any, introText: HTMLElement) {
    introText.classList.add("hide") // hide hints
    let end = 0;
    let count = 0;
   // let final;
    //(discI==12) ? final = "YOU WIN" : "GAME OVER";
    // setInterval(() => { if (count <= discI) { console.log(count++) } }, 1000)
    let sc= (time%60 -1)*10 + discI*100;
    console.log((time%60 -1));
    console.log(discI);
    const container = glob.document.querySelector(".text") as HTMLElement;

    const textLines = [
      { speed: 10, string:  (discI==13) ? "YOU WIN!" : "GAME OVER", classes: ["red"] },
      { speed: 500, string: " ", pause: true },
      { speed: 0, string: "<br>" },
      { speed: 80, string: "floppy disks collected:" },
      { speed: 0, string: "<br>" },      
      { speed: 250, string: this.showDisks(discI, arr), classes: ["huge"] },
      { speed: 250, string: `${discI}`, classes: ["gold"] },
      { speed: 0, string: "<br>" },
      { speed: 10, string:"Your score: " + sc }
      
    ];

    const characters: { span: HTMLSpanElement; isSpace: boolean; delayAfter: number; classes: string[]; }[] = [];

    let skip = false
    let skipped = false
    textLines.forEach((line, index) => {
      // new line
      if (line.string === "<br>") {
        const br = glob.document.createElement("br");
        container.appendChild(br);
      } else {
        // printing
        line.string.split("").forEach((character, id) => {
          const span = glob.document.createElement("span");
          span.textContent = character;

          if (Number(character) === (discI-10)) skip = false
          if (Number(character) === 9 && !skipped) {skip = true; skipped = true;} // set flag for 2 digit numbers; 
          
          // conditions to print 2 digit numbers as one
          if (skip === true
            && (index === 5 && (id === 20 || id === 23 || id === 26))) {
            // do nothing and skip rest of conditions
          } else if ((index === 5 && (id === 21 || id === 24 || id === 27))
            || (index === 6 && (id === 1))) {
            span.textContent = "1" + character;
            container.appendChild(span);
            characters.push({
              span: span,
              isSpace: false,
              delayAfter: line.speed,
              classes: line.classes || []
            });
          } else if (skip === false || character === " " || character === "9") { // XD 
            container.appendChild(span);
            characters.push({
              span: span,
              isSpace: character === " " && !line.pause,
              delayAfter: line.speed,
              classes: line.classes || []
            });
          }
        });
      }
    });

    // Kick it off
    setTimeoutHandler(view,
      setTimeout(() => { this.revealOneCharacter(characters) }, 600)
    );

    return end;
  }
}

export { Countdown };
