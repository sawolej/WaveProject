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
  elmnt: HTMLElement;
  pos1: number;
  pos2: number;
  pos3: number;
  pos4: number;

  constructor() {
    this.apps = glob.document.getElementById("os_apps") as HTMLElement
    this.osWindow = glob.document.getElementsByClassName("app_window")[0] as HTMLButtonElement
    this.brandWindow = glob.document.getElementsByClassName("brand")[0] as HTMLElement
    this.mainApp = glob.document.getElementById("app-main") as HTMLElement
    this.maximise = glob.document.getElementById("maximise") as HTMLButtonElement
    this.shorter = glob.document.getElementById("shorter") as HTMLButtonElement
    this.cross = glob.document.getElementById("cross") as HTMLButtonElement

    // Initialise elmnt as any element, since its changed on click anyway
    this.elmnt = glob.document.getElementById("window-header") as HTMLElement
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;

    /* Sound effects */
    this.click = new Audio("./src/assets/sounds/click.mp3")
  }

  init() {
    /* Reseting window */
    this.toggleVisibility(this.osWindow)

    this.osWindow.ondragend = (e: any) => {
      let go_top = e.pageY
      let go_left = e.pageX

      if (go_top < 0) go_top = Number(e)
      if (go_left < 0) go_left = 0

      this.osWindow.style.top = go_top + "px"
      this.osWindow.style.left = go_left + "px"
    }

    /* Creating apps */
    this.createApp("File manager", './src/assets/pics/fileIcon.png', "file-manager")
    this.createApp("Recycle bin", "./src/assets/pics/binIcon.png", "recycle-bin")
    this.createApp("Settings", "./src/assets/pics/settingsIcon.png", "settings")
    this.createApp("System Info", "./src/assets/pics/systemIcon.png", "system-info")
    this.createApp("Whats that?", "./src/assets/pics/gameIcon.png", "game");

    // Return to room view on clicking shutdown
    (glob.document.getElementById('shutdown') as HTMLElement).onclick = () => glob.document.location.hash = "#room";
    
    // Make the window draggable
    this.dragElement(document.getElementById("window")!);
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

    this.osWindow.style.top = "0px"
    this.osWindow.style.left = "0px"
    this.osWindow.style.width = "100%"
    this.osWindow.style.height = "100%"
  }

  shortenWindow() {
    this.toggleVisibility(this.maximise)
    this.toggleVisibility(this.shorter)

    this.osWindow.style.width = "60%"
    this.osWindow.style.height = "60%"
  }

  dragElement(elmnt: HTMLElement) {
    if (document.getElementById(elmnt.id + "-header")) {
      document.getElementById(elmnt.id + "-header")!.onmousedown = this.dragMouseDown;
    } else {
      elmnt.onmousedown = this.dragMouseDown;
    }
  }

  dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    document.onmousemove = this.elementDrag;
  }

  elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
    this.elmnt.style.left = (this.elmnt.offsetLeft - this.pos1) + "px";
  }

  closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
