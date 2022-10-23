import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { Boot as BootEngine } from '../comp/Boot.js'

// import '../../assets/css/main.css'

export const Boot = {
  init() {
    replaceHTML(canvas, Boot.html)

    const newBoot = new BootEngine
    newBoot.init()
  },

  html: `<div class="monitor">
  <award-boot></award-boot>
</div>`
}

// body { // added to style.css as class .monitor
//     background: #000;
//     font-family: "Perfect DOS VGA 437", monospace;
//     font-size: 22px;
//     color: #888;
//     display: flex;
//     justify-content: center;
//     overflow: hidden;
//     margin: 0;
//   }

