const clickable_ekram = document.getElementById("ekran");
clickable_ekram.hidden = true;

function click_screen() {
    console.log("you clicked the board");
    var password = prompt("enter the password! (jakas zagadka związana z UŁ here)");
    if (password == "kupapsia"){
        //goto new screen
        window.location.href="screen.html"
    } else {
        alert("wrong password")
    }
}
function click_board() {
    window.location.href="board.html"
}