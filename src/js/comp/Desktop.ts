import { doc } from "prettier";
import { glob, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

export const Desktop = class {
  apps: HTMLElement;
  osWindow: HTMLButtonElement;
  brandWindow: HTMLElement;
  mainApp: HTMLElement;
  maximise: HTMLButtonElement;
  shorter: HTMLButtonElement;
  cross: HTMLButtonElement;
  click: HTMLAudioElement;
  ele: HTMLElement;
  x: number;
  y: number;

  constructor() {
    this.apps = glob.document.getElementById("os_apps") as HTMLElement
    this.osWindow = glob.document.getElementsByClassName("app_window")[0] as HTMLButtonElement
    this.brandWindow = glob.document.getElementsByClassName("brand")[0] as HTMLElement
    this.mainApp = glob.document.getElementById("app-main") as HTMLElement
    this.maximise = glob.document.getElementById("maximise") as HTMLButtonElement
    this.shorter = glob.document.getElementById("shorter") as HTMLButtonElement
    this.cross = glob.document.getElementById("cross") as HTMLButtonElement

    // Initialise elmnt as any element, since its changed on click anyway
    this.ele = glob.document.getElementById("window-header") as HTMLElement
    this.x = 0;
    this.y = 0;

    /* Sound effects */
    this.click = new Audio("./src/assets/sounds/click.mp3")
  }

  init() {
    /* Reseting window */
    this.toggleVisibility(this.osWindow)

    /* Creating apps */
    this.createApp("File manager", './src/assets/pics/fileIcon.png', "file-manager")
    this.createApp("Recycle bin", "./src/assets/pics/binIcon.png", "recycle-bin")
    this.createApp("Settings", "./src/assets/pics/settingsIcon.png", "settings")
    this.createApp("System Info", "./src/assets/pics/systemIcon.png", "system-info")
    this.createApp("Whats that?", "./src/assets/pics/gameIcon.png", "game");

    // Return to room view on clicking shutdown
    (glob.document.getElementById('shutdown') as HTMLElement).onclick = () => glob.document.location.hash = "#room";

    // Make the window draggable
    this.ele.addEventListener('mousedown', this.mouseDownHandler);
  }

  createApp(name: any, image: any, id: any) {

    const app = glob.document.createElement("div")
    const img = glob.document.createElement("img")
    const p = glob.document.createElement("p")

    app.classList.add("app")
    app.id = id
    img.src = image
    p.innerText = name

    img.setAttribute("alt", name)
    app.appendChild(img)
    app.appendChild(p)
    this.apps.appendChild(app)

    app.oncontextmenu = (e) => {
      this.click.play()
    }

    app.onclick = () => {
      if (id === "game") glob.document.location.hash = "#game"
      else this.openWindow(id)
    }
  }

  toggleVisibility(tag: any) {
    if (tag.style.display === "none") tag.style.display = "inline-block"
    else tag.style.display = "none"
  }

  openWindow(id: any) {
    this.initWindow()
    this.click.play()
    this.brandWindow.innerHTML = ""
    this.mainApp.innerHTML = ""

    const main = glob.document.getElementById(id) as HTMLImageElement
    const img = glob.document.createElement("img")
    const p = glob.document.createElement("p")

    p.innerText = (main.childNodes[1] as HTMLElement).innerText
    img.src = (main.children[0] as HTMLImageElement).src
    img.setAttribute("alt", (main.children[0] as HTMLImageElement).getAttribute("alt") as string)
    this.brandWindow.appendChild(img)
    this.brandWindow.appendChild(p)

    this.toggleVisibility(this.osWindow)
  }

  initWindow() {
    this.toggleVisibility(this.shorter)

    this.maximise.onclick = () => {
      this.click.play()
      this.maximiseWindow()
    }

    this.shorter.onclick = () => {
      this.click.play()
      this.shortenWindow()
    }

    this.cross.onclick = () => {
      this.click.play()
      this.toggleVisibility(this.osWindow)
    }
  }

  maximiseWindow() {
    this.toggleVisibility(this.shorter)
    this.toggleVisibility(this.maximise)

    this.osWindow.style.top = "6%"
    this.osWindow.style.left = "0px"
    this.osWindow.style.width = "100%"
    this.osWindow.style.height = "94%"
  }

  shortenWindow() {
    this.toggleVisibility(this.maximise)
    this.toggleVisibility(this.shorter)

    this.osWindow.style.width = "60%"
    this.osWindow.style.height = "60%"
  }

  // Handle the mousedown event that's triggered when user drags the element
  mouseDownHandler = (e: any) => {
    // Get the current mouse position
    this.x = e.clientX;
    this.y = e.clientY;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  };

  mouseMoveHandler = (e: any) => {
    // How far the mouse has been moved
    const dx = e.clientX - this.x;
    const dy = e.clientY - this.y;

    if (this.ele !== null) {
      this.ele = global.document.getElementById("window")!;
    }

    // Set the position of element if its contained on the screen
    if (this.canBeDragged(e)) {
      this.ele.style.top = `${this.ele.offsetTop + dy}px`;
      this.ele.style.left = `${this.ele.offsetLeft + dx}px`;
    }

    // Reassign the position of mouse
    this.x = e.clientX;
    this.y = e.clientY;
  };

  mouseUpHandler = () => {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  canBeDragged = (e: any) => {
    let widthMax = glob.document.getElementById("os_apps")!.clientWidth;
    let heightMax = glob.document.getElementById("os_apps")!.clientHeight;
    let deltaLeft = (window.innerWidth - widthMax) / 2;
    let pxLeft = this.ele.style.left;
    let pxTop = this.ele.style.top;
    let width = this.ele.clientWidth;
    let height = this.ele.clientHeight;
    let pxToLeft = parseInt(pxLeft)
    let pxToTop = parseInt(pxTop)
    
    // Horizontal bound
    if ((pxToLeft <= 0 || pxToLeft + width >= widthMax) && (e.clientX <= deltaLeft || e.clientX >= widthMax)) return false;

    // Vertical element bound
    if ((pxToTop <= 0 || pxToTop + height >= heightMax) && (e.clientY <= 0 || e.clientY >= heightMax)) return false;

    return true;
  }
}
