
function openSheet(x) {
  console.log("hehe open");
  var x = document.getElementById(x);
  if (x.style.visibility === 'hidden') {
    closeAll();
    x.style.visibility = 'visible';
    if(x==sheet1){

    }
  } else {
    x.style.visibility = 'hidden';
  }
}

function closeAll(){
    for (let i=1; i<5; i++) document.getElementById(`sheet${i}`).style.visibility = 'hidden';

}