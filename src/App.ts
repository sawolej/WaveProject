import { RoomView } from './js/views/RoomView'
import { BoardView } from './js/views/BoardView'
import { BootView } from './js/views/BootView'
import { DesktopView } from './js/views/DesktopView'
import { GameView } from './js/views/GameView'

import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "./js/helpers";

/* Stylesheets */
import './css/style.css'
import './css/room.css'
import './css/board.css'
import './css/desktop.css'
import './css/boot.css'
import './css/game.css'

/**
 * Aspect Ratio
 */
const aspectRatio: { width: number, height: number } = {
  width: 35,
  height: 21
}

/**
 * Audio App.prototype handler
 * - Initializes new Audio()
 * @public
 *  @param {string} filename
 *  @param {boolean} loop
 *  @param {number} volume
 *  @param {number} playbackRate
 * @var app.prototype.audio
 */
export const audioLoader = (filename: string, loop: boolean = true, volume: number = 0.1, playbackRate: number = 1) => {
  console.log("currently playing: " + filename)
  app.prototype.audio = new Audio(filename)

  if (loop !== false) app.prototype.audio.loop = true
  if (volume !== 1) app.prototype.audio.volume = volume
  if (playbackRate !== 1) app.prototype.audio.playbackRate = playbackRate
  // app.prototype.audio.playbackRate = 2.137; // SUPER SONIC SPEED
  // app.prototype.audio.volume = 0.1 // FOR DEVELOPING ;~~))) // now as default @param
  app.prototype.audio.play()
}

/**
 * Audio App.prototype currentTime check handler
 * @public
 */
export const isPlaying = () => app.prototype.audio.currentTime !== 0

/**
 * Local class App
 * - const in order to use App.prototype (one unique instance of class)
 * @private
 */
const app = class App {
  filter: string = "" 
  interacted: boolean = false
  audio: any
  comp: any

  constructor() {  }

  /**
   * Init function
   */
  public init() {
    this.comp = {}
    this.interacted = false

    this.filter = getURLHash()

    glob.window.addEventListener("hashchange", () => {

      this.destructor() // call destructing function

      this.filter = getURLHash()

      this.render()
    });
    this.render()

    this.setAspect()
    glob.window.addEventListener("resize", () => this.setAspect(), true);
  }

  /**
   * Set aspect function
   * @const aspectRatio @const canvas
   */
  private setAspect() {
    const ratio = aspectRatio
    const h1 = ratio.height * glob.window.innerWidth / ratio.width;
    const h2 = ratio.width * glob.window.innerHeight / ratio.height;
    canvas.style.width = h1 < glob.window.innerHeight
      ? String(glob.window.innerWidth) + 'px'
      : String(h2) + 'px'
    canvas.style.height = h1 < glob.window.innerHeight
      ? String(h1) + 'px'
      : String(glob.window.innerHeight) + 'px'
  }

  /**
   * Render function
   * @var this.filter @var this.comp
   */
  private render() {
    // const rndstr = `<div id="render"></div>`
    // insertHTML(glob.document.body, rndstr)
    // probably better to put this in Router, but do we need it to be responsive so much?
    switch (this.filter) {
      case "#desktop":
        console.log("loading component.. [desktop]")
        this.comp.Desktop = new DesktopView()
        this.comp.Desktop.init()
        break
      case "#board":
        console.log("loading component.. [board]")
        this.comp.Board = new BoardView()
        this.comp.Board.init()
        break
      case "#boot": // or booting..
        console.log("loading component.. [boot]")
        this.comp.Boot = new BootView()
        this.comp.Boot.init()
        break
      case "#game":
        console.log("loading component.. [game]")
        this.comp.Game = new GameView()
        this.comp.Game.init()
        break
      default:
        console.log("loading component.. [room]")
        this.comp.Room = new RoomView()
        this.comp.Room.init()
        break
    }
  }

  /**
   * Destruct function
   * @var this.audio @var this.comp
   */
  private destructor() {
    // pause and destruct audio
    if (this.audio) {
      this.audio.pause()
      // this.audio = null
      delete this.audio
    }

    // destruct comp
    for (let c in this.comp) {
      if (this.comp.hasOwnProperty(c)) {
        this.comp[c].destruct() // TODO: clear all setTimeout, listeners, etc
        delete this.comp[c]
      }
    }
  }
}

// Initialize the App
app.prototype.init()
