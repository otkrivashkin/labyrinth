var lab = [
    '111111111111111111111','110010000010001000001','111010111010111011101',
    '100010101000000000101','101110101010111110111','100000100010100000101',
    '101111111110101110101','101000100000100010001','111011101110111111111',
    '100010000010000000001','101111101010111111101','100000001010001000001',
    '111111111111111111111'
];

var labyrinth = document.createElement('div');
// create board
for (var column = 0; column < lab.length; column++) {
    var p = document.createElement('p');
    for (var row = 0; row < lab[column].length; row++) {
        var span = document.createElement('span');
        span.innerHTML = lab[column][row];
        if (lab[column][row] > 0) {
            span.className = 'wall';
        }
        p.appendChild(span);
    }
    labyrinth.appendChild(p);
}
// create random number from lab array
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// add className in document
function setClassName(className) {
    while (true) {
        var randomP = getRandom(1, lab.length - 1);
        var randomSpan = getRandom(1, lab[randomP].length - 1);
        var innerText = labyrinth.querySelector("p:nth-child(" + randomP + ") span:nth-child(" + randomSpan + ")").innerText;
        if (innerText < 1) {
            labyrinth.querySelector("p:nth-child(" + randomP + ") span:nth-child(" + randomSpan + ")").className = className;
            break;
        }
    }
}
// add class names in div labyrinth
setClassName('gold');
setClassName('start');
// add labyrinth in body
document.body.appendChild(labyrinth);
// BUTTONS!!!
var buttons = ["up", "bottom", "left", "right"];

function addButtons(array) {
    var buttonContainer = document.createElement("div");
    for (var i = 0; i < array.length; i++) {
        var button = document.createElement("button");
        button.innerText = array[i];
        button.className = array[i];
        button.type = "button";
        button.style.display = "inline-block";
        buttonContainer.style.display = "inline-block";
        // buttonContainer.className = "buttonContainer";
        buttonContainer.appendChild(button);
    }
    document.body.appendChild(buttonContainer);
}
addButtons(buttons);
var upBtn = document.querySelector('.up');
var downBtn = document.querySelector('.bottom');
var leftBtn = document.querySelector('.left');
var rightBtn = document.querySelector('.right');
upBtn.addEventListener("click", function () {
   console.log("You click up!");
});
downBtn.addEventListener("click", function () {
    console.log("You click down!");
});
leftBtn.addEventListener("click", function () {
    console.log("You click left!");
});
rightBtn.addEventListener("click", function () {
    console.log("You click right!");
});
//
var start = document.querySelector(".start");




