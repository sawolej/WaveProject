import { Router } from './Router.js'

// https://stackoverflow.com/questions/26068026/pushstate-change-equivalent-to-chrome-extension-onhistorystateupdated/26068962#26068962
// https://www.javascripttutorial.net/web-apis/javascript-history-pushstate/ <---- example

export class Main {
    router: Router
    
    constructor() {
        this.router = new Router()

        // probably better to put this in Router
        //
        // const glob = globalThis
        // switch(glob.window.location.hash) {
        //     case "#desktop":
        //         // return new 
        //         break
        //     case "#board":
        //         break
        //     case "#screen":
        //         break
        //     case "#game":
        //         break    
        //     default:
        //         // return new main page
        //         break
        // }
    }
}