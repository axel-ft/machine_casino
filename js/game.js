var pseudo = document.getElementById('pseudo').getElementsByTagName('input')[0];
pseudo.addEventListener('change', function(e) {
    e.preventDefault();
    if (localStorage.getItem("pseudo") === null) {
        localStorage.setItem("pseudo", this.value);
    } else {
        localStorage.pseudo = this.value;
    }
}, false);

var poignee = document.getElementById('poignee');
poignee.addEventListener('click', function(e) {
    if (playable()) {
        localStorage.points--;
        divPoints.innerHTML = localStorage.points;
        if (win()) {
            localStorage.points = parseInt(localStorage.points) + 5;
            divPoints.innerHTML = localStorage.points;
        }
    }
}, false);
