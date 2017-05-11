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
        console.error("Vous n'avez plus de points. Cliquez sur nouvelle partie ou actualisez pour commencer une nouvelle partie");
        error.innerHTML = "Vous n'avez plus de points. Cliquez sur nouvelle partie ou actualisez pour commencer une nouvelle partie";
        error.classList.toggle('fade');
        error.style.display = "block";
        setTimeout(() => error.classList.toggle('fade'), 4000);
        setTimeout(() => error.innerHTML = "", 5000);
        return false;
    } else {
        console.error("Vos points ne sont pas correctement définis. Rechargez la pae");
        error.innerHTML = "Vos points ne sont pas correctement définis. Rechargez la pae";
        error.classList.toggle('fade');
        error.style.display = "block";
        setTimeout(() => error.classList.toggle('fade'), 4000);
        setTimeout(() => error.innerHTML = "", 5000);
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
    success.innerHTML = "Bravo ! Vous avez gagné 5 points";
    success.classList.toggle('fade');
    success.style.display = "block";
    setTimeout(() => success.classList.toggle('fade'), 4000);
    setTimeout(() => success.innerHTML = "", 5000);
    return true;
}

var displayScore = function() {
    if (localStorage.highscores === "[]") {
        while (highscoresTable.childNodes.length > 2) {
            highscoresTable.removeChild(highscoresTable.lastChild);
        }

        var score = document.createElement('tr');

        for (let i = 0; i < 2; i++) {
            var td = document.createElement('td');
            td.innerHTML = ".";
            score.appendChild(td);
        }

        var aucun = document.createElement('td');
        aucun.innerHTML = "<h3>Aucun score disponible pour le moment</h3>";
        score.appendChild(aucun);

        for (let i = 0; i < 2; i++) {
            var td = document.createElement('td');
            td.innerHTML = ".";
            score.appendChild(td);
        }

        highscoresTable.appendChild(score);

        return;
    }

    if (localStorage.getItem("highscores") !== null && JSON.parse(localStorage.highscores).length > 0) {
        var highscores = JSON.parse(localStorage.highscores);
        var highlength = highscores.length;

        while (highscoresTable.childNodes.length > 2) {
            highscoresTable.removeChild(highscoresTable.lastChild);
        }

        for (let i = highlength - 1; i >= 0; i--) {
            var score = document.createElement('tr');

            var pseudo = document.createElement('td');
            pseudo.innerHTML = "<strong>" + highscores[i]["pseudo"] + "</strong>";
            score.appendChild(pseudo);

            var max = document.createElement('td');
            max.innerHTML = highscores[i]["max"];
            score.appendChild(max);

            var tirages = document.createElement('td');
            tirages.innerHTML = highscores[i]["tirages"];
            score.appendChild(tirages);

            var gagnant = document.createElement('td');
            gagnant.innerHTML = highscores[i]["gagnants"];
            score.appendChild(gagnant);

            var perdu = document.createElement('td');
            perdu.innerHTML = (highscores[i]["gameOver"] ? "Oui" : "Non");
            score.appendChild(perdu);

            highscoresTable.appendChild(score);
        }
    }
}

var registerScore = function() {
    if (localStorage.getItem("pseudo") !== null && localStorage.getItem("points") !== null && localStorage.getItem("highscores") !== null) {
        var highscores = JSON.parse(localStorage.highscores);
        var highlength = highscores.length;
        if (highlength === 0) {
            highscores.push({
                "pseudo":localStorage.pseudo,
                "max":localStorage.points,
                "tirages":1,
                "gagnants":0,
                "gameOver":false
            });
        } else {
            if (highscores[highlength - 1]["pseudo"] !== localStorage.pseudo || highscores[highlength - 1]["gameOver"]) {
                localStorage.points = 19;
                highscores.push({
                    "pseudo":localStorage.pseudo,
                    "max":localStorage.points,
                    "tirages": 1,
                    "gagnants":0,
                    "gameOver":false
                });
                divPoints.innerHTML = localStorage.points;
            } else {
                highscores[highlength - 1]["tirages"]++;
            }

            if (highscores[highlength - 1]["pseudo"] === localStorage.pseudo && highscores[highlength - 1]["max"] < parseInt(localStorage.points)) {
                highscores[highlength - 1]["max"] = localStorage.points;
            }

            if (localStorage.points == 0) {
                highscores[highlength - 1]["gameOver"] = true;
            }
        }

        localStorage.highscores = JSON.stringify(highscores);
    }
    displayScore();
}

var gagnantPlusOne = function() {
    if (localStorage.getItem("highscores") !== null) {
        var highscores = JSON.parse(localStorage.highscores);
        var highlength = highscores.length;
        highscores[highlength - 1]["gagnants"]++;
        localStorage.highscores = JSON.stringify(highscores);
        displayScore();
    }
}
