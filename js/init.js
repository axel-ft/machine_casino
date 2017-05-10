var divPoints = document.getElementById('points');

// Define initial variables
if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    if (localStorage.getItem("points") !== null && localStorage.getItem("points") > 0) {
        divPoints.innerHTML = localStorage.points;
    } else {
        localStorage.setItem("points", 20);
        divPoints.innerHTML = localStorage.points;
    }

    if (localStorage.getItem("pseudo") !== null && localStorage.getItem("pseudo") !== undefined) {
        document.getElementById('pseudo').getElementsByTagName('input')[0].value = localStorage.pseudo;
    }
} else {
    // Sorry! No Web Storage support..
    if ((document.cookie.match(/^(?:.*;)?\s*points\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1] == null ) {
        document.cookie = "points=20";
    }
}

var pseudo = document.getElementById('pseudo').getElementsByTagName('input')[0];
var bras = document.getElementById('bras');
var slots = document.getElementsByClassName('slot');
