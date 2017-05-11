displayScore();

reinit.addEventListener('click', function(e) {
    var highscores = JSON.parse(localStorage.highscores);
    var highlength = highscores.length;

    highscores[highlength - 1]["gameOver"] = true;

    localStorage.pseudo = "Anonymous";
    document.getElementById('pseudo').getElementsByTagName('input')[0].value = localStorage.pseudo;
    
    localStorage.points = 20;
    divPoints.innerHTML = localStorage.points;

    localStorage.highscores = JSON.stringify(highscores);
    displayScore();
}, false);

resetHighscores.addEventListener('click', function(e) {
    localStorage.highscores = "[]";
    displayScore();
}, false);

pseudo.addEventListener('change', function(e) {
    e.preventDefault();
    if (localStorage.getItem("pseudo") === null) {
        localStorage.setItem("pseudo", this.value);
    } else {
        localStorage.pseudo = this.value;
    }
}, false);

bras.addEventListener('click', function(e) {
    if (playable() && this.dataset.inactive === "true") {
        this.dataset.inactive = false;
        this.classList.toggle('bras-active');

        setTimeout(toggleRotation, 500);
        localStorage.points--;
        divPoints.innerHTML = localStorage.points;
 
        if (win()) {
            localStorage.points = parseInt(localStorage.points) + 5;
            divPoints.innerHTML = localStorage.points;
            gagnantPlusOne();
        }

        registerScore();

        setTimeout(() => this.classList.toggle('bras-active'), 1000);
        setTimeout(() => this.dataset.inactive = true, 5000);
    }
}, false);
