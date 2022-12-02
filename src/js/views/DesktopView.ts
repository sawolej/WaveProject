import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { Desktop as DesktopEngine } from '../comp/Desktop'

import { audioLoader } from "../../App"

export class DesktopView {
  constructor() {}

  init() {
    replaceHTML(canvas, this.html)
    audioLoader("./src/assets/sounds/desktop.mp3")

    const newDesktop = new DesktopEngine()
    newDesktop.init()
  }

  destruct = () => {
    // clearTimeout(this.countdownTrigger)
  }

  html = `<div id="wrapper">
  <!-- App container and bottom taskbar -->
  <div class="os_container">
    <!--br-os-container -->
    <div id="os_apps">
      <div class="app"></div>
      <div id="taskbar"></div>
    </div>

    <!-- App window -->
    <div class="app_window" draggable="true">
      <!--br-os-window -->
      <!-- Top window -->
      <div class="window_bar">
        <!--window-bar-->
        <!-- Icon -->
        <div class="brand"></div>
        <!-- Maximize, cross etc buttons -->

        <div class="buttons">
          <!-- Maximize button -->
          <button id="maximise">
            <i class="fa fa-window-maximize"></i>
          </button>
          <!-- Window size restore button -->
          <button id="shorter">
            <i class="fa fa-window-restore"></i>
          </button>
          <!-- App close button -->
          <button id="cross">
            <i class="fa fa-times"></i>
          </button>
        </div>

      </div>
      <!-- Main app -->
      <div class="app" id="app-main"></div>
    </div>

    <!-- Hide App -->
    <div id="app-hide"></div>
  </div>`
}
