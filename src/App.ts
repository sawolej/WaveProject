import { Store } from './js/comp/Store'
const Storage = new Store("wave");

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
  // app.prototype.audio.volume = 0.0 // FOR DEVELOPING ;~~))) // now as default @param

  // sound mute functionality
  const soundState = Storage.getSoundState()
  if (!soundState) app.prototype.audio.pause()
  // play sound
  else app.prototype.audio.play()
}

/**
 * Audio App.prototype currentTime check handler
 * @public
 */
export const isPlaying = (): boolean => app.prototype.audio.currentTime !== 0

/**
 * Audio
 * @private
 */
const updateSoundStateIcon = (soundMuteSwitchButton: HTMLElement, soundState = Storage.getSoundState()): void => {
  soundMuteSwitchButton.innerHTML = soundState 
  ? `<div style="left: 3px;position: relative;"><?xml version="1.0" encoding="UTF-8"?> <svg viewBox="0 0 72 72"xmlns=http://www.w3.org/2000/svg><g><path d="m12.079 44.411v-16.694c0-1.1046 0.8954-2 2-2h11.712v20.692h-11.712c-1.1038 0-1.9989-0.8942-2-1.998z"fill=#9b9b9a /><path d="m42.268 58.433-14.5-11.579c0.036-0.0961 0.0565-0.1974 0.061-0.3v-21.25c-0.0055-0.0394-0.0135-0.0785-0.024-0.117l14.459-11.74 4e-3 44.986z"fill=#d0cfce /></g><g fill=none stroke=#000 stroke-linecap=round stroke-width=2><path d="m43.219 11.375-16.435 13.346h-12.712c-1.6548 5e-3 -2.995 1.3452-3 3v16.692c5e-3 1.6548 1.3452 2.995 3 3h12.712l16.436 13.128-1e-3 -49.166z"stroke-linejoin=round /><line stroke-linejoin=round x1=26.784 x2=26.784 y1=25.333 y2=46.583 /><path d="m54.674 24.612c5.0427 6.7235 5.0427 15.968 0 22.692"stroke-miterlimit=10 /></g></svg></div>` //String.fromCodePoint(0x1F508)
  : `<div><?xml version="1.0" encoding="UTF-8"?> <svg viewBox="0 0 72 72"xmlns=http://www.w3.org/2000/svg><g stroke-miterlimit=10><path d="m33.77 47.413 16.436 13.128-1e-3 -49.166-16.435 13.346"fill=#d0cfce stroke=#d0cfce stroke-width=2 stroke-linecap=round stroke-linejoin=round /><line x1=33.715 x2=33.715 y1=24.801 y2=46.051 fill=#d0cfce stroke=#d0cfce stroke-linecap=round stroke-linejoin=round stroke-width=2 /><path d="m32.793 24.721h-11.937c-1.554 5e-3 -2.8125 1.3452-2.8172 3v16.692c0.0047 1.6548 1.2632 2.995 2.8172 3h11.937"fill=#9b9b9a stroke=#9b9b9a stroke-width=1.9381 /></g><g fill=none stroke=#000 stroke-linecap=round stroke-linejoin=round stroke-width=2><path d="m50.22 45.488-7e-4 -34.113-16.435 13.346h-4.1277"/><path d="m20.229 24.843c-1.2445 0.3664-2.1535 1.5155-2.1576 2.8778v16.692c5e-3 1.6548 1.3452 2.995 3 3h12.712l16.436 13.128-1e-4 -5.659"/><line x1=33.784 x2=33.784 y1=25.333 y2=29 /><line x1=33.784 x2=33.784 y1=39 y2=47.051 /><line x1=11.605 x2=60.105 y1=11.782 y2=60.282 /></g></svg></div>` //String.fromCodePoint(0x1F50A) 
}

/**
 * Audio
 * @private
 */
const soundMuteSwitch = (soundMuteSwitchButton: HTMLElement): void => {
  const soundState: boolean = !Storage.getSoundState()
  Storage.update(soundState)

  if (!soundState) app.prototype.audio.pause()
  // play sound
  else if (isPlaying()) app.prototype.audio.play()
}

/**
 * setTimeout handler
 * - Stores events for later destruction
 * @public
 *  @param {string} component
 *  @param {number} event
 * @var app.prototype.comp
 */
export const setTimeoutHandler = (component: string, event: number) => {
  // console.log("currently waiting for: " + event)
  app.prototype.comp[component].timeouts.push(event)
}

/**
 * setInterval handler
 * - Stores events for later destruction
 * @public
 *  @param {string} component
 *  @param {number | NodeJS.Timer} event
 * @var app.prototype.comp
 */
export const setIntervalHandler = (component: string, event: number) => {
  // console.log("currently waiting for: " + event)
  app.prototype.comp[component].intervals.push(event)
}

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

  constructor() { }

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

    const soundMuteSwitchButton = glob.document.getElementById('soundMuteSwitch') as HTMLElement
    soundMuteSwitchButton.onclick = () => { 
      soundMuteSwitch(); 
      updateSoundStateIcon(soundMuteSwitchButton) 
    }
    updateSoundStateIcon(soundMuteSwitchButton) 
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
      case "#reload": // game reload
        glob.document.location.hash = "#game";
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
