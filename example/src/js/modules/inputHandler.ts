export class InputHandler {
  keys: { d: { pressed: boolean; }; a: { pressed: boolean; }; w: { pressed: boolean; }; e: { pressed: boolean; }; };
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

    // Assign last WSAD + E input to keys
    window.addEventListener('keydown', (e) => {

      switch(e.key) {
        case 'a':
          this.keys.a.pressed = true;
          break;
        case 'd':
          this.keys.d.pressed = true;
          break;
        case 'w':
          this.keys.w.pressed = true;
          break;
        case 'e':
          this.keys.e.pressed = true;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {

      switch(e.key) {
        case 'a':
          this.keys.a.pressed = false;
          break;
        case 'd':
          this.keys.d.pressed = false;
          break;
        case 'w':
          this.keys.w.pressed = false;
          break;
        case 'e':
          this.keys.e.pressed = false;
          break;
      }
    })
  }
}
