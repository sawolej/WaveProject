import { Room } from './js/views/room.js'
import { Board } from './js/views/board.js'
import { Boot } from './js/views/boot.js'
import { Desktop } from './js/views/desktop.js'
import { Game } from './js/views/game.js'

import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "./js/helpers.js";
// import { TodoStore } from "./store.js";
// const Todos = new TodoStore("todo-modern-vanillajs");

import './assets/css/style.css'

const App = {
  filter: null,
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
    // probably better to put this in Router
    //
    console.log(glob.document.location.hash)
    switch (glob.document.location.hash) { // or window?
      case "#desktop":
        console.log("loading component.. [desktop]")
        Desktop.init()
        break
      case "#board":
        console.log("loading component.. [board]")
        Board.init()
        break
      case "#boot": // or booting..
        console.log("loading component.. [boot]")
        Boot.init()
        break
      case "#game":
        console.log("loading component.. [game]")
        Game.init()
        break
      default:
        console.log("loading component.. [main]")
        Room.init()
        break
    }
  },

  // some destructing here when we define components as classes: const -> classes
  destructor(id) {
    // id != "desktop" ? 
    // id != "board" ? 
    // id != "game" ? 
  }
};

App.init();