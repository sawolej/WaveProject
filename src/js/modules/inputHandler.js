export class InputHandler {
  constructor() {
    
    this.keys = {
      d: {
        pressed: false
      },
      a: {
        pressed: false
      },
      w: {
        pressed: false
      },
      e: {
        pressed: false
      }      
    }

    // Assign last WSAD 
    window.addEventListener('keydown', (e) => {

      switch(e.key) {

        case 'a':
          this.keys.a.pressed = true;
          break;

        case 'A':
          this.keys.a.pressed = true;
          break;

        case 'd':
          this.keys.d.pressed = true;
          break;

        case 'D':
          this.keys.d.pressed = true;
          break;

        case 'w':
          this.keys.w.pressed = true;
          break;

        case 'W':
          this.keys.w.pressed = true;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {

      switch(e.key) {

        case 'a':
          this.keys.a.pressed = false;
        break;

        case 'A':
          this.keys.a.pressed = false;
          break;

        case 'd':
          this.keys.d.pressed = false;
          break;

        case 'D':
          this.keys.d.pressed = false;
          break;

        case 'w':
          this.keys.w.pressed = false;
          break;

        case 'W':
          this.keys.w.pressed = false;
          break;
      }
    })
  }
}
