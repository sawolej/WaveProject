class Countdown {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.imageBase = document.getElementById('countdownImageBase');
    this.imageFirst = document.getElementById('countdownImageFirst');
    this.imageSecond = document.getElementById('countdownImageSecond');
    this.imageThird = document.getElementById('countdownImageThird');
    this.imageBlack = document.getElementById('blackscreen');
  }

  drawBase(context) {
    context.drawImage(this.imageBase, this.x, this.y);
  }

  drawFirst(context) {
    context.drawImage(this.imageFirst, this.x, this.y);
  }

  drawSecond(context) {
    context.drawImage(this.imageSecond, this.x, this.y);
  }

  drawThird(context) {
    context.drawImage(this.imageThird, this.x, this.y);
  }


  //=========================================================
  drawEnd(context, discI, arr) {
    let end =0;
    //context.drawImage(this.imageBlack, this.x, this.y);
    var count=0;
    setInterval(()=>{
    if (count<=discI) {
      console.log(count++);}
    },1000)
    var container = document.querySelector(".text");

    function showDisks(x){
     let result = "";
      for(let i=0; i<x; i++){
        result += i + " ";
        console.log(arr[i]);
       // document.getElementById(arr[i]).style.visibility = "visable";
      }
      return result;
    }
    function showRest(x){
     
        container.replaceChildren(" ");
        console.log(arr);
    
      return " ";
     }
    /////////


    var speeds = {
      pause: 500, //Higher number = longer delay
      slow: 120,
      normal: 90,
      fast: 40,
      superFast: 10
    };

    var textLines = [
      { speed: 1, string: "GAME OVER", classes: ["red"] },
      { speed: 500, string:  "", pause: true},
      { speed: 40, string: "  ", classes: ["red"] },
      { speed: 80, string: "floppy disks collected:"},
      { speed: 40, string: "  ", classes: ["red"] },
      { speed: 40, string: "  ", classes: ["red"] },
      { speed: 500, string: showDisks(discI) },
      { speed: 500, string: `   ${discI}` , classes: ["gold"]},
      { speed: 200, string: showRest(discI) }
    ];


    var characters = [];
    textLines.forEach((line, index) => {
      if (index < textLines.length - 1) {
          line.string += " \n"; //Add a space between lines
      }

      line.string.split("").forEach((character) => {
          var span = document.createElement("span");
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

    function revealOneCharacter(list) {
      var next = list.splice(0, 1)[0];
      next.span.classList.add("revealed");
      next.classes.forEach((c) => {
          next.span.classList.add(c);
      });
      var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

      if (list.length > 0) {
          setTimeout(function () {
            revealOneCharacter(list);
          }, delay);

      }
      
    }

    //Kick it off
    setTimeout(() => {
      revealOneCharacter(characters);   
    }, 600)


    /////////
    return end;
  }

}

export {Countdown};
