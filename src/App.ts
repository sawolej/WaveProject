import { Main } from './js/comp/Main.js'
// import { Board } from './js/comp/Board.js'
// import { Boot } from './js/comp/Boot.js'
// import { Desktop } from './js/comp/Desktop.js'
// import { Game } from './js/comp/Game.js'

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
    glob.window.addEventListener("resize", () => App.setAspect() , true);

    App.render();
  },

  setAspect() {
    canvas.style.width = String(glob.window.innerWidth) + 'px';
    canvas.style.height = String(21 * glob.window.innerWidth / 35) + 'px';
  },

  render() {
    // probably better to put this in Router
    //
    console.log(glob.document.location.hash)
    switch (glob.document.location.hash) { // or window?
      case "#desktop":
        console.log("loading component.. [desktop]")
        // desktop.init()
        break
      case "#board":
        console.log("loading component.. [board]")
        // board.init()
        break
      case "#screen":
        console.log("loading component.. [screen]")
        // screen.init()
        break
      case "#game":
        console.log("loading component.. [game]")
        // game.init()
        break
      default:
        console.log("loading component.. [main]")
        Main.init()
        break
    }
  },
};

App.init();