import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { Boot as BootEngine } from '../comp/Boot'

export class BootView {
  constructor() {}
  
  init() {
    replaceHTML(canvas, this.html)

    const newBoot = new BootEngine()
    newBoot.init()
  }

  html = `
  <div class="monitor">
    <award-boot></award-boot>
  </div>`
}
