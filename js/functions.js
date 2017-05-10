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

var toggleRotation = function() {
    for (var i = 0; i < slots.length; i++) {
        var items = slots[i].getElementsByClassName('item');
        for (var j = 0; j < items.length; j++) {
            switch(j) {
                case 0: items[j].className = "item pique";
                        break;
                case 1: items[j].className = "item coeur";
                        break;
                case 2: items[j].className = "item carreau";
                        break;
                case 3: items[j].className = "item trefle";
                        break;
                case 4: items[j].className = "item pique";
                        break;
            }
            items[j].classList.toggle('rotation');
        }
    }
}

var toggleOneRotation = function(ind) {
    var items = slots[ind].getElementsByClassName('item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.toggle('rotation');
    }
}

var addClassToOneSlot = function(ind, classToAdd) {
        var items = slots[ind].getElementsByClassName('item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle(classToAdd);
        }
    }

var stopSlots = function(turn) {
    console.log(turn);

    for (let i = 0; i < turn.length; i++) {
        setTimeout(() => {
            toggleOneRotation(i);
            switch(turn[i]) {
                case 0: addClassToOneSlot(i, "vpique");
                        break;
                case 1: addClassToOneSlot(i, "vcoeur");
                        break;
                case 2: addClassToOneSlot(i, "vcarreau");
                        break;
                case 3: addClassToOneSlot(i, "vtrefle");
                        break;
            }
        }, 3000);
    }
}

var win = function() {
    var turn = randomize();
    stopSlots(turn);

    for(var i = 0; i < turn.length; i++) {
        if (turn[i] !== turn[0]) return false;
    }
    console.log("Vous avez gagné 5 points");
    return true;
}

var registerScore = function() {
    if (localStorage.getItem("pseudo") !== null && localStorage.getItem("points") !== null && localStorage.getItem("highscores") !== null) {
        var highscores = JSON.parse(localStorage.highscores);
        var highlength = highscores.length;

        if (highscores.length === 0) {
            highscores.push({"pseudo":localStorage.pseudo, "max":localStorage.points, "gameOver": false});
        } else {
            if (highscores[highlength - 1]["pseudo"] !== localStorage.pseudo) highscores.push({"pseudo":localStorage.pseudo, "max":localStorage.points, "gameOver": false})
            if (highscores[highlength - 1]["pseudo"] === localStorage.pseudo && highscores[highlength - 1]["max"] < localStorage.points) highscores[highlength - 1]["max"] = localStorage.points;
        }

        localStorage.highscores = JSON.stringify(highscores);
    }
    displayScore();
}

var displayScore = function() {
    if (localStorage.getItem("highscores") !== null) {
        console.log(JSON.parse(localStorage.highscores));
    }
}
