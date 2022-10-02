let ap1 = document.getElementById("insta");
let ap2 = document.getElementById("fb");
let ap3 = document.getElementById("tiktok");
let ule = document.getElementById("buttonsUL");

function openSheet(x) {
  console.log("hehe open");
  var x = document.getElementById(x);
  if (x.style.visibility === 'hidden') {
    closeAll();
    closeApp();
    closeUL();
    x.style.visibility = 'visible';
    if(x==sheet1){
        if (ap1.style.visibility === 'hidden') {            
            openApp();
          } else {
            ap1.style.visibility = 'hidden';
          }
    }else if(x==sheet2){
      if (ule.style.visibility === 'hidden') {            
        openUL();
        } else {
          ule.style.visibility = 'hidden';
        }
  }
  } else {
    x.style.visibility = 'hidden';
    closeApp();
    closeUL();
  }
}

function closeAll() {
    for (let i=1; i<5; i++) document.getElementById(`sheet${i}`).style.visibility = 'hidden';

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
  location.href = "main.html";
}
