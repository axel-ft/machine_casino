var divPoints = document.getElementById('points');

var randomize = function() {
    var randomArray = new Array();
    for (var i = 0; i < 4; i++) {
        randomArray[i] = Math.floor(Math.random()*4);
    }
    return randomArray;
}

var playable = function() {
    if (localStorage.getItem("points") !== null && localStorage.getItem("points") > 0) {
        return true;
    } else if (localStorage.getItem("points") <= 0) {
        console.error("Vous n'avez plus de points. Rechargez la page pour commencer une nouvelle partie")
        return false;
    } else {
        console.error("Vos points ne sont pas correctement définis. Rechargez la page");
        return false;
    }
}

var winOrLose = function() {
    localStorage.points = parseInt(localStorage.points) + 5;
    divPoints.innerHTML = localStorage.points;
}
