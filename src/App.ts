import { RoomView } from './js/views/room.js'
import { BoardView } from './js/views/board.js'
import { BootView } from './js/views/boot.js'
import { DesktopView } from './js/views/desktop.js'
import { GameView } from './js/views/game.js'

import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "./js/helpers.js";

import './css/style.css'
import './css/app.css' // should be room.css?
import './css/board.css'
import './css/desktop.css'
import './css/boot.css'
import './css/game.css'

const aspectRatio = { 
  width: 35, 
  height: 21 
}

const App = {
  filter: null,
  comp: {
    Desktop: null,
    Boot: null,
    Board: null,
    Game: null,
    Room: null
  },

  init() {
    App.filter = getURLHash()
    glob.window.addEventListener("hashchange", () => {
      App.filter = getURLHash()

      App.destructor() // call destructing function
      App.render()
    });
    App.render()

    App.setAspect()
    glob.window.addEventListener("resize", () => App.setAspect(), true);
  },

  setAspect() {
    const ratio = aspectRatio
    const h1 = ratio.height * glob.window.innerWidth / ratio.width;
    const h2  = ratio.width * glob.window.innerHeight / ratio.height;
    canvas.style.width = h1 < glob.window.innerHeight
      ? String(glob.window.innerWidth) + 'px'
      : String(h2) + 'px'
    canvas.style.height = h1 < glob.window.innerHeight
      ? String(h1) + 'px'
      : String(glob.window.innerHeight) + 'px'
  },

  render() {
    // probably better to put this in Router, but do we need it to be responsive so much?
    switch (App.filter) {
      case "#desktop":
        console.log("loading component.. [desktop]")
        App.comp.Desktop = DesktopView
        App.comp.Desktop.init()
        break
      case "#board":
        console.log("loading component.. [board]")
        App.comp.Board = BoardView
        App.comp.Board.init()
        break
      case "#boot": // or booting..
        console.log("loading component.. [boot]")
        App.comp.Boot = BootView
        App.comp.Boot.init()
        break
      case "#game":
        console.log("loading component.. [game]")
        App.comp.Game = GameView
        App.comp.Game.init()
        break
      default:
        console.log("loading component.. [room]")
        App.comp.Room = RoomView
        App.comp.Room.init()
        break
    }
  },

  destructor() {
    for (let c in App.comp) {
      if (App.comp.hasOwnProperty(c))
        App.comp[c] = null
    }
  },
}

App.init()