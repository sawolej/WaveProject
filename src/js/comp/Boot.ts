import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

import { audioLoader, setTimeoutHandler, setIntervalHandler } from "../../App"
const view = "Boot";

import * as desc from "./txt";

export class Boot {
  shadowRoot: any // errors because its not inicialised

  constructor() { }

  init() {
    const SIZES = desc.sizes;

    const DISKS = desc.discs

    const DEVICES = desc.devices;

    const EVENTS = desc.events;

    //AWARD BOOT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    class AwardBoot extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      static get styles() {
        return desc.style_1;
      }

      connectedCallback() {
        this.render();
        this.rebootSystem();
      }

      setVisible(className: any, duration = 0) {
        return new Promise(resolve => {
          setTimeoutHandler(view,
            setTimeout(() => {
              resolve(true)
            }, duration)
          );
        });
      }

      setHTML(className: any, HTML: any, duration = 0) {
        return new Promise(resolve => {
          setTimeoutHandler(view,
            setTimeout(() => {
              const div = (this.shadowRoot as ShadowRoot).querySelector(className);
              div.innerHTML = HTML;
              resolve(true)
            }, duration)
          );
        });
      }

      addHTML(className: any, HTML: any) {
        const div = (this.shadowRoot as ShadowRoot).querySelector(className);
        div.innerHTML += HTML;
      }

      async detectDevice(place: any, label: any) {
        const n = ~~(Math.random() * 4);

        if (n === 0) {
          const device = DEVICES[~~(Math.random() * DEVICES.length)];
          await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>[Press <strong>F4</strong> to skip]</span>`);
          await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>${device}</span>`, 4000);
        }
        else if (n === 1) {
          const disk = DISKS[~~(Math.random() * DISKS.length)];
          await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>[Press <strong>F4</strong> to skip]</span>`);
          await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>${disk}</span>`, 4000);
        }
        else {
          await this.setHTML(`.hdd p:nth-child(${place})`, `Detecting IDE ${label.padEnd(16, " ")}... <span>None</span>`, 50);
        }
      }

      async detectHardDisks() {

        const disk = DISKS[~~(Math.random() * DISKS.length)];
        const size = SIZES[~~(Math.random() * SIZES.length)];

        await this.setHTML(".hdd p:nth-child(1)", `Detecting IDE Primary Master  ... <span>[Press <strong>F4</strong> to skip]</span>`);
        await this.setHTML(".hdd p:nth-child(1)", `Detecting IDE Primary Master  ... <span>${disk} ${size}</span>`, 2000);

        await this.detectDevice(2, "Primary Slave");
        await this.detectDevice(3, "Secondary Master");
        await this.detectDevice(4, "Secondary Slave");
      }

      turnOn() {
        return this.setHTML(".header", desc.style_2, 2000);
      }

      enterBIOS() {
        const monitor = document.querySelector(".monitor") as HTMLElement;
        const bios = document.createElement("award-bios");
        monitor.appendChild(bios);
        this.remove();
      }

      async rebootSystem() {
        const timeline = [
          { action: () => this.turnOn() },
          { action: () => this.checkMemory() },
          { action: () => this.setVisible(".pnp-stage", 3000) },
          { action: () => this.detectHardDisks() },
          { action: () => this.createRandomEvent(2000) },
          { action: () => this.setVisible(".last", 3500) },
          { action: () => this.enterBIOS() }
        ];

        // sound.play();
        audioLoader("./src/assets/sounds/startup.mp3", false, 1)

        let i = 0;
        while (i < timeline.length) {
          await timeline[i].action();
          i++;
        }
      }

      checkMemory() {
        return new Promise(resolve => {
          const BLOCK = 8;
          const memory = (this.shadowRoot as ShadowRoot).querySelector(".memory") as HTMLElement;
          const max = Number(memory.textContent);
          memory.textContent = "";
          for (let i = 0; i < max; i = i + BLOCK) {
            setTimeoutHandler(view,
              setTimeout(() => {
                memory.textContent = `${i}K`;
              }, i / BLOCK)
            );
          }
          setTimeoutHandler(view,
            setTimeout(() => this.disableEPA(), 5000)
          );
          setTimeoutHandler(view,
            setTimeout(() => {
              memory.textContent += " OK";
              resolve(true);
            }, max / BLOCK)
          );
        });
      }

      createRandomEvent(duration = 0) {
        const eventName = EVENTS[~~(Math.random() * EVENTS.length)];
        this.setHTML(".event", eventName, duration);
      }

      disableEPA() {
        (this.shadowRoot as ShadowRoot).querySelector(".epa");
      }

      render() {
        (this.shadowRoot as ShadowRoot).innerHTML = `
    <style>${AwardBoot.styles}</style>` + desc.style_3;
      }
    }

    try { customElements.define("award-boot", AwardBoot) }
    catch (error) { /*console.log(error)*/ }


    //AWARD-BIOS/////////////////////////////////////////////////////////////////////////////////////
    class AwardBios extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      static get styles() {
        return desc.style_5;
      }

      connectedCallback() {
        this.render();
        setTimeoutHandler(view,
          setTimeout(() => this.showExit(), 4000)
        );
      }

      showExit() {
        ((this.shadowRoot as ShadowRoot).querySelector(".screen") as HTMLElement).innerHTML += desc.style_7;
        setTimeoutHandler(view,
          setTimeout(() => this.exitBIOS(), 2000)
        );
        setTimeoutHandler(view,
          setTimeout(() => this.remove(), 4000)
        );
        setTimeoutHandler(view,
          setTimeout(() => glob.document.location.hash = "#desktop", 4000)
        );
      }

      exitBIOS() {
        const screen = (this.shadowRoot as ShadowRoot).querySelector(".screen") as HTMLElement;
        screen.classList.remove("blue");
        screen.innerHTML = desc.style_6;
      }

      render() {
        (this.shadowRoot as ShadowRoot).innerHTML = `
  <style>${AwardBios.styles}</style>` + desc.style_4;
      }
    }
    // click to skip
    const redirect = () => {
      if (glob.document.location.hash === "#boot")
        glob.document.location.hash = "#desktop";

      glob.document.body.removeEventListener('click', redirect);
      glob.document.body.removeEventListener('keypress', redirect);
    };
    glob.document.body.addEventListener('click', redirect);
    glob.document.body.addEventListener('keypress', redirect);

    try { customElements.define("award-bios", AwardBios) }
    catch (error) { /*console.log(error)*/ }
  }
}
