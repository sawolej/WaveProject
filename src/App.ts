import { Room } from './js/views/room.js'
import { Board } from './js/views/board.js'
import { Boot } from './js/views/boot.js'
import { Desktop } from './js/views/desktop.js'
import { Game } from './js/views/game.js'

import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "./js/helpers.js";
// import { TodoStore } from "./store.js";
// const Todos = new TodoStore("todo-modern-vanillajs");

import './style.css'

const App = {
  filter: null,
  // newRoom: null,
  // newBoot: null,
  comp: {
    Desktop,
    Boot,
    Board,
    Game,
    Room
  },
  // $: {
  // },

  init() {
    // Todos.addEventListener("save", App.render);

    App.filter = getURLHash();
    glob.window.addEventListener("hashchange", () => {
      App.filter = getURLHash();
      App.render();
    });

    App.setAspect()
    glob.window.addEventListener("resize", () => App.setAspect(), true);

    App.render();
  },

  setAspect() {
    const h1 = 21 * glob.window.innerWidth / 35;
    const h2  = 35 * glob.window.innerHeight / 21;
    canvas.style.width = h1 < glob.window.innerHeight
      ? String(glob.window.innerWidth) + 'px'
      : String(h2) + 'px'
    canvas.style.height = h1 < glob.window.innerHeight
      ? String(h1) + 'px'
      : String(glob.window.innerHeight) + 'px'
  },

  render() {
    // probably better to put this in Router, but do we need it to be responsive so much?
    //
    console.log(glob.document.location.hash)
    switch (glob.document.location.hash) {
      case "#desktop":
        console.log("loading component.. [desktop]")
        // Desktop.init()
        App.comp.Desktop = Desktop
        App.comp.Desktop.init()
        App.destructor('desktop')
        break
      case "#board":
        console.log("loading component.. [board]")
        // Board.init()
        App.comp.Board = Board
        App.comp.Board.init()
        App.destructor('board')
        break
      case "#boot": // or booting..
        console.log("loading component.. [boot]")
        // Boot.init()
        App.comp.Boot = Boot
        App.comp.Boot.init()
        App.destructor('boot')
        break
      case "#game":
        console.log("loading component.. [game]")
        // Game.init()
        App.comp.Game = Game
        App.comp.Game.init()
        App.destructor('game')
        break
      default:
        console.log("loading component.. [room]")
        // Room.init()
        App.comp.Room = Room
        App.comp.Room.init()
        App.destructor('room')
        break
    }
  },

  // some destructing here when we define components as classes: const -> classes
  destructor(id) {
    id !== "desktop" ? delete App.comp.Desktop : ''
    id !== "board" ? delete App.comp.Board : ''
    id !== "game" ? delete App.comp.Game : ''
    id !== "room" ? delete App.comp.Room : ''
  }
};

App.init();