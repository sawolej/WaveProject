import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { Boot as BootEngine } from '../comp/Boot'

export class BootView {
  // audio: any = {}
  timeouts: any = [];
  intervals: any = [];

  constructor() {}
  
  init() {
    replaceHTML(canvas, this.html)

    const newBoot = new BootEngine()
    newBoot.init()
  }

  destruct = () => {
    // for (let a in this.audio) if (this.audio.hasOwnProperty(a)) this.audio[a].pause()
    for (let a in this.timeouts) if (this.timeouts.hasOwnProperty(a)) clearTimeout(this.timeouts[a])
    for (let a in this.intervals) if (this.intervals.hasOwnProperty(a)) clearInterval(this.intervals[a])
  }

  html = `
  <div class="monitor">
    <award-boot></award-boot>
  </div>`
}
