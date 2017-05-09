// Define initial variables
if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    sessionStorage.setItem("points", 20);
} else {
    // Sorry! No Web Storage support..
    if ((document.cookie.match(/^(?:.*;)?\s*points\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1] == null ) {
        document.cookie = "points=20";
    }
}



