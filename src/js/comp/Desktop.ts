import { glob, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

export const Desktop = class {
  constructor() { }

  init() {
    const apps = glob.document.querySelector("#os_apps") as HTMLElement
    const osWindow = glob.document.querySelector(".app_window") as HTMLButtonElement
    const brandWindow = glob.document.querySelector(".brand") as HTMLElement
    const mainApp = glob.document.querySelector("#app-main") as HTMLElement
    const maximise = glob.document.querySelector("#maximise") as HTMLButtonElement
    const shorter = glob.document.querySelector("#shorter") as HTMLButtonElement
    const cross = glob.document.querySelector("#cross") as HTMLButtonElement

    /* Sound effects */
    const click = new Audio("./src/assets/sounds/click.mp3")

    /* Reseting window */
    toggleVisibility(osWindow)

    /* Creating apps */
    createApp("File manager", './src/assets/pics/fileIcon.png', "file-manager")
    createApp("Recycle bin", "./src/assets/pics/binIcon.png", "recycle-bin")
    createApp("Settings", "./src/assets/pics/settingsIcon.png", "settings")
    createApp("System Info", "./src/assets/pics/systemIcon.png", "system-info")
    createApp("Whats that?", "./src/assets/pics/gameIcon.png", "game")

    function createApp(name: any, image: any, id: any) {

      let app = glob.document.createElement("div")
      let img = glob.document.createElement("img")
      let p = glob.document.createElement("p")

      app.classList.add("app")
      app.id = id
      img.src = image
      p.innerText = name

      img.setAttribute("alt", name)
      app.appendChild(img)
      app.appendChild(p)
      apps.appendChild(app)

      app.oncontextmenu = (e) => {
        click.play()
      }

      app.onclick = () => {
        if (id === "game") glob.document.location.hash = "#game"
        else openWindow(id)
      }
    }

    function toggleVisibility(tag: any) {
      if (tag.style.display === "none") tag.style.display = "inline-block"
      else tag.style.display = "none"
    }

    function openWindow(id: any) {
      initWindow()
      click.play()
      brandWindow.innerHTML = ""
      mainApp.innerHTML = ""

      let main = glob.document.getElementById(id) as HTMLImageElement
      let tmp = main.getAttribute("alt") as string
      let img = glob.document.createElement("img")
      let p = glob.document.createElement("p")

      p.innerText = (main.childNodes[1] as HTMLElement).innerText
      img.src = main.src
      img.setAttribute("alt", tmp)
      brandWindow.appendChild(img)
      brandWindow.appendChild(p)

      toggleVisibility(osWindow)
    }

    function initWindow() {
      toggleVisibility(shorter)

      maximise.onclick = () => {
        click.play()
        maximiseWindow()
      }

      shorter.onclick = () => {
        click.play()
        shortenWindow()
      }

      cross.onclick = () => {
        click.play()
        toggleVisibility(osWindow)
      }
    }

    function maximiseWindow() {
      toggleVisibility(shorter)
      toggleVisibility(maximise)

      osWindow.style.top = "0px"
      osWindow.style.left = "0px"
      osWindow.style.width = "100%"
      osWindow.style.height = "100%"
    }

    function shortenWindow() {
      toggleVisibility(maximise)
      toggleVisibility(shorter)

      osWindow.style.width = "60%"
      osWindow.style.height = "60%"
    }

    osWindow.ondragend = (e) => {
      let go_top = e.pageY
      let go_left = e.pageX

      if (go_top < 0) go_top = Number(e)
      if (go_left < 0) go_left = 0

      osWindow.style.top = go_top + "px"
      osWindow.style.left = go_left + "px"
    }
  }
}
