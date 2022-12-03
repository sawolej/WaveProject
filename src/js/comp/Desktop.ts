import { glob, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

export const Desktop = class {
  constructor(){}
  init() {
    //ELements
    const apps = document.querySelector("#os_apps")
    var menu = document.querySelector("#os-ct-menu")
    const os_window = document.querySelector(".app_window") as HTMLButtonElement
    const brand_window = document.querySelector(".brand")
    const app_main = document.querySelector("#app-main")
    const maximise = document.querySelector("#maximise") as HTMLButtonElement
    const shorter = document.querySelector("#shorter") as HTMLButtonElement
    const cross = document.querySelector("#cross") as HTMLButtonElement
    const taskbar = document.querySelector("#taskbar")
    const pickedOnes = []
    /* Sound effects */
    const click = new Audio("./assets/sounds/click.mp3")
    // const con = new Audio("sounds/not.wav")


    //Operations
    /* Reseting window */
    close(os_window)
    /* Creating apps */
    create_app("File manager", './assets/pics/fileIcon.png', "file-manager")
    create_app("Recycle bin", "./assets/pics/binIcon.png", "recycle-bin")
    create_app("Settings", "./assets/pics/settingsIcon.png", "settings")
    create_app("System Info", "./assets/pics/systemIcon.png", "system-info")
    create_app("Whats that?", "./assets/pics/gameIcon.png", "game")



    //Functions
    function click_game() {
      glob.document.location.hash = "#game"
    }
    
    function create_app(name, image, id) {
      let app = document.createElement("div")
      app.classList.add("app")
      app.id = id
      // if (app.id == "game") {
      //   app.setAttribute("onclick", "click_game()")
      // } else {
      //   app.setAttribute("onclick", "window_open('" + id + "')")
      // }
      app.onclick = () => {
        if(id === "game") click_game()
        else window_open(id)
      }
      
      app.oncontextmenu = (e) => {
        click.play()
        // open_menu(e, id)
      }

      let img = document.createElement("img")
      img.src = image
      img.setAttribute("alt", name)
      let p = document.createElement("p")
      p.innerText = name
      app.appendChild(img)
      app.appendChild(p)
      apps.appendChild(app)
    }

    function open(tag) {
      tag.style.display = "inline-block"
    }

    function close(tag) {
      tag.style.display = "none"
    }

    function window_open(id) {
      click.play()
      brand_window.innerHTML = ""
      app_main.innerHTML = ""
      init_window()

      let main = document.querySelector("#" + id)

      let img = document.createElement("img")
      img.src = (main.childNodes[0] as HTMLImageElement).src
      img.setAttribute("alt", (main.childNodes[0] as HTMLElement).getAttribute("alt"))

      let p = document.createElement("p")
      p.innerText = (main.childNodes[1] as HTMLElement).innerText
      brand_window.appendChild(img)
      brand_window.appendChild(p)

      open(os_window)
    }

    function init_window() {
      close(shorter)
      maximise.onclick = () => {
        click.play()
        maximise_window()
      }
      shorter.onclick = () => {
        click.play()
        shorter_window()
      }
      cross.onclick = () => {
        click.play()
        close(os_window)
        os_window
      }

    }

    function maximise_window() {
      open(shorter)
      close(maximise)
      // window.restoreX = os_window.style.left  // what is restoreX and Y? its undefined
      // window.restoreY = os_window.style.top   // should we get sceen x and y here?

      // here we would have to cut "px" and cast it as Number(os_window.style.top) bcs now its String -> Number
      // glob.window.innerHeight = Number(os_window.style.top.split('p')[0]) // like this ;>

      os_window.style.top = "0px"
      os_window.style.left = "0px"
      os_window.style.width = "100%"
      os_window.style.height = "100vh"
    }

    function shorter_window() {
      open(maximise)
      close(shorter)
      // os_window.style.top = window.restoreY + "px" // "px" here :3
      // os_window.style.left = window.restoreX
      os_window.style.width = "60%"
      os_window.style.height = "60vh"
    }

    // window.onclick = () => {
    //   if (menu.classList.contains("active")) {
    //     menu.classList.remove("active")
    //   }
    // }

    os_window.ondragend = (e) => {
      let go_top = e.pageY
      let go_left = e.pageX
      if (go_top < 0) {
        go_top = Number(e)
      }
      if (go_left < 0) {
        go_left = 0
      }
      os_window.style.top = go_top + "px"
      os_window.style.left = go_left + "px"
    }
  }
}
