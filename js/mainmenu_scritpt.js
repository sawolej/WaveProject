
function click_screen() {
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
