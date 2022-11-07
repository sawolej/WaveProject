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

const aspectRatio: { width: number, height: number } = { 
  width: 35, 
  height: 21 
}

export function audioLoader(filename: string, loop=true, volume=1) {
  App.audio = new Audio(filename)
  //App.audio.play()
  if (loop !== false) App.audio.loop = true
  if (volume !== 1) App.audio.volume = volume
  // App.audio.playbackRate = 1;
  App.audio.volume = 0.1 // FOR DEVELOPING ;~~)))
  App.audio.play()
}

const App = {
  filter: null,
  audio: null,
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
    // pause and destruct audio
    if (App.audio) {     // necessary this is
      App.audio.pause()  // https://meme-generator.com/wp-content/uploads/mememe/2020/05/mememe_75419badc3525afde64fdfaf0d166f11-1.jpg
      App.audio = null   // https://pics.onsizzle.com/everything-is-important-9903115.png
    }

    // destruct comp
    for (let c in App.comp) {
      if (App.comp.hasOwnProperty(c))
        App.comp[c] = null
    }
  },
}

App.init()