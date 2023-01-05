import { glob, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers";

export const Board = class {
  constructor() { }

  init() {
    // click listeners
    (glob.document.getElementById('arrow') as HTMLElement).onclick = () => goBack();
    (glob.document.getElementById('sheet1click') as HTMLElement).onclick = () => openSheet('sheet1');
    (glob.document.getElementById('sheet2click') as HTMLElement).onclick = () => openSheet('sheet2');
    (glob.document.getElementById('sheet3click') as HTMLElement).onclick = () => openSheet('sheet3');
    (glob.document.getElementById('sheet4click') as HTMLElement).onclick = () => openSheet('sheet4');

    let ap1 = glob.document.getElementById("insta") as HTMLElement;
    let ap2 = glob.document.getElementById("fb") as HTMLElement;
    let ap3 = glob.document.getElementById("tiktok") as HTMLElement;
    let ule = glob.document.getElementById("buttonsUL") as HTMLElement;

   // glob.document.body.addEventListener('click', closeAll);
    glob.document.body.addEventListener('keypress', closeAll);
    function openSheet(id: any) {
      
    const x = glob.document.getElementById(id) as HTMLElement;
    
        closeAll();
        
        x.style.visibility = 'visible';
        if (id === "sheet1") openApp()
        else if (id === "sheet2")openUL()        
      } 
    

    function closeAll() {
      for (let i = 1; i < 5; i++) (glob.document.getElementById(`sheet${i}`) as HTMLElement).style.visibility = 'hidden';
      closeApp();
        closeUL();
    }

    function closeApp() {
      ap2.style.visibility = 'hidden';
      ap1.style.visibility = 'hidden';
      ap3.style.visibility = 'hidden';
    }

    function openApp() {
      ap2.style.visibility = 'visible';
      ap1.style.visibility = 'visible';
      ap3.style.visibility = 'visible';
    }

    function openUL() {
      ule.style.visibility = 'visible';
    }

    function closeUL() {
      ule.style.visibility = 'hidden';
    }

    function goBack() {
      glob.document.location.hash = "";
    }

  }

  goBack() {
    glob.document.location.hash = "";
  }
}
