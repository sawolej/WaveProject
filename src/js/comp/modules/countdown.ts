class Countdown {
  gameWidth: number;
  gameHeight: number;
  x: number;
  y: number;
  seconds: number;
  introInterval: any;
  wasCleared: boolean;
  countdownEl: HTMLElement;
  introText: HTMLElement;
  introNumbers: HTMLElement;
  imageFirst: HTMLElement;
  imageSecond: HTMLElement;
  imageThird: HTMLElement;
  imageBlack: HTMLElement;
  
  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.seconds = 3;
    this.introInterval;
    this.wasCleared = false;
    this.countdownEl = document.getElementById('countdown') as HTMLElement;
    this.introText = document.getElementById('introText') as HTMLElement;
    this.introNumbers = document.getElementById('introCountdown') as HTMLElement;
    this.imageFirst = document.getElementById('countdownImageFirst') as HTMLElement;
    this.imageSecond = document.getElementById('countdownImageSecond') as HTMLElement;
    this.imageThird = document.getElementById('countdownImageThird') as HTMLElement;
    this.imageBlack = document.getElementById('blackscreen') as HTMLElement;
  }

  update() {
    let close = false;
    if (!close) {
      this.introInterval = setInterval(() => {
        this.introNumbers.innerHTML = String(this.seconds);
        if (this.seconds === 3) this.introNumbers.style.display = "inline-flex";
        if (this.seconds > 0) this.seconds--;
        else {
          this.introNumbers.style.display = "none";
          this.introText.style.display = "none";
          close = true;
        };
      }, 1000)
    }

    // Clear the interval after 
    if (close) clearInterval(this.introInterval);
  }


  drawEnd(discI: number, arr: any[]) {
    let end = 0;
    let count = 0;
    setInterval(() => {if (count <= discI) {console.log(count++)}}, 1000)

    const container = document.querySelector(".text") as HTMLElement;

    function showDisks(x: number) {
      let result = "";
      
      for (let i = 0; i < x; i++) {
        result += i + " ";
        console.log(arr[i]);
      }

      return result;
    }
    
    function showRest(x: any) {
      container.replaceChildren(" "); // TODO: check what it does
      console.log(arr);
      return " ";
    }

    const speeds = {
      pause: 500, // Higher number = longer delay
      slow: 120,
      normal: 90,
      fast: 40,
      superFast: 10
    };

    const textLines = [
      {speed: 10, string: " GAME OVER", classes: ["red"]},
      {speed: 500, string: "", pause: true},
      {speed: 40, string: "  ", classes: ["red"]},
      {speed: 80, string: "floppy disks collected:"},
      {speed: 40, string: "  ", classes: ["red"]},
      {speed: 40, string: "  ", classes: ["red"]},
      {speed: 500, string: showDisks(discI)},
      {speed: 500, string: `   ${discI}` , classes: ["gold"]},
      {speed: 200, string: showRest(discI)}
    ];

    const characters: { span: HTMLSpanElement; isSpace: boolean; delayAfter: number; classes: string[]; }[] = [];

    textLines.forEach((line, index) => {
      if (index < textLines.length - 1) {
        line.string += " \n"; // Add a space between lines
      }

      // string.slice(0, -2) do empty chars algin this?
      line.string.split("").forEach((character) => {
          const span = document.createElement("span");
          span.textContent = character;
          container.appendChild(span);
          
          characters.push({
            span: span,
            isSpace: character === " " && !line.pause,
            delayAfter: line.speed,
            classes: line.classes || []
          });
      });
    });

    function revealOneCharacter(list: any[]) {
      const next = list.splice(0, 1)[0];
      next.span.classList.add("revealed");
      next.classes.forEach((c: any) => {
          next.span.classList.add(c);
      });

      const delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

      if (list.length > 0) {
          setTimeout(function () {
            revealOneCharacter(list);
          }, delay);
      }
    }

    // Kick it off
    setTimeout(() => {revealOneCharacter(characters)}, 600)

    return end;
  }
}

export {Countdown};
