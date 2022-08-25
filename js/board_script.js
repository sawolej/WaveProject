
function openSheet(x) {
  console.log("hehe open");
  var x = document.getElementById(x);
  if (x.style.visibility === 'hidden') {
    //closeAll();
    x.style.visibility = 'visible';
    if(x==sheet1){
        console.log("itis");
        document.getElementById('insta').style.visibility = 'visable';
        document.getElementById('fb').style.visibility = 'visable';
        console.log("itis");
    }
  } else {
    x.style.visibility = 'hidden';
  }
}

function closeAll(){
    for (let i=1; i<5; i++) document.getElementById(`sheet${i}`).style.visibility = 'hidden';
    if (butFb.style.visibility === 'visable') butFb.style.visibility = 'hidden';
    if (butInsta.style.visibility === 'visable') butInsta.style.visibility = 'hidden';
}