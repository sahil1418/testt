
var changecolor = "#fff";
setTimeout(function(){ changecolor = "rgb(255,189,27)";}, 8500);

function stars() {
    let e = document.createElement('div');
    e.setAttribute('class', 'star');
    document.getElementById("cont").appendChild(e);
    e.style.left = Math.random() * + innerWidth + 'px';

    const colors = [
        "#e74c3c", "#8e44ad", "#3498db", "#1abc9c", "#2ecc71",
        "#f1c40f", "#e67e22", "#e74c3c", "#9b59b6", "#2980b9",
        "#27ae60", "#f39c12", "#d35400", "#c0392b"
    ];

    let size = Math.random() * 12;
    let duration = Math.random() * 3;   

    // e.style.zIndex = -2;
    e.style.fontSize = 12 + 'px';
    e.style.animationDuration = 4 + duration + 's';
    e.style.color = changecolor;
    // e.style.color = colors[Math.floor(Math.random()*colors.length)];
    // e.style.befo
    setTimeout(function () {
        document.body.removeChild(e);
    }, 5000);
}

setInterval(function () {
    stars()
}, 100);
