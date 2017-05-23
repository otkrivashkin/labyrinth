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
function addClass(className) {
    while (true) {
        var randomP = getRandom(1, lab.length - 1);
        var randomSpan = getRandom(1, lab[randomP].length - 1);
        var innerText = labyrinth.querySelector("p:nth-child(" + randomP + ") span:nth-child(" + randomSpan + ")").innerText;
        if (innerText < 1) {
            labyrinth.querySelector("p:nth-child(" + randomP + ") span:nth-child(" + randomSpan + ")").className = className;
            return {
                "row" : randomP,
                "column" : randomSpan
            };
        }
    }
}
// add class names in div labyrinth
addClass('gold');
var start = addClass('start');
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
        buttonContainer.className = "buttonContainer";
        buttonContainer.appendChild(button);
    }
    document.body.appendChild(buttonContainer);
}
addButtons(buttons);

var upBtn = document.querySelector('.up');
var downBtn = document.querySelector('.bottom');
var leftBtn = document.querySelector('.left');
var rightBtn = document.querySelector('.right');
/*
* [1,1,1,1,1,1,1,1],
* [1,0,0,0,0,0,0,1],
* [1,0,0,s,0,0,0,1], -> pos[2][3] : up    -> pos[1][3]
* [1,0,0,0,0,0,0,1], -> pos[2][3] : down  -> pos[3][3]
* [1,0,0,0,0,0,0,1], -> pos[2][3] : left  -> pos[2][2]
* [1,0,0,0,0,0,0,1], -> pos[2][3] : right -> pos[2][4]
* [1,1,1,1,1,1,1,1]
* */

//TODO how to check if element is a wall?

function canMove(row, column) {
    column = start[column];
    row = --start[row];
    var isWallUp = labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + column +
            ")").className === "wall";
    if (row === "wall") {
        return true;
    }
    var isWallDown = labyrinth.querySelector("p:nth-child("
            + ++row +
            ") span:nth-child("
            + column +
            ")").className === "wall";
    if (isWallDown) {
        return true;
    }
    var isWallLeft = labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + --column +
            ")").className === "wall";
    if (isWallLeft) {
        return true;
    }
    var isWallRight = labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + column +
            ")").className === "wall";
    if (isWallRight) {
        return true;
    }
}

function move(direction) {
    var row = start["row"];
    var column = start["column"];
    if (direction === "up" && !canMove(row, column)) {
        console.log("native row ", row);
        row = --start["row"];
        labyrinth.querySelector("p:nth-child("
            + (row+1) +
            ") span:nth-child("
            + column +
            ")").style.backgroundColor = "white";

        labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + column +
            ")").style.backgroundColor = "red";
    }
    else if(direction === "down") {
        row = ++start["row"];
        labyrinth.querySelector("p:nth-child("
            + (row-1) +
            ") span:nth-child("
            + column +
            ")").style.backgroundColor = "white";

        labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + column +
            ")").style.backgroundColor = "red";
    }
    else if(direction === "left") {
        column = ++start["column"];
        labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + (column-1) +
            ")").style.backgroundColor = "white";

        labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + column +
            ")").style.backgroundColor = "red";
    }
    else if(direction === "right") {
        column = --start["column"];
        labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + (column+1) +
            ")").style.backgroundColor = "white";

        labyrinth.querySelector("p:nth-child("
            + row +
            ") span:nth-child("
            + column +
            ")").style.backgroundColor = "red";
    }
}

upBtn.addEventListener("click", function () {
    console.log("You click up!");
    move("up");
});
downBtn.addEventListener("click", function () {
    console.log("You click down!");
    move("down");
});
rightBtn.addEventListener("click", function () {
    console.log("You click right!");
    move("left");
});
leftBtn.addEventListener("click", function () {
    console.log("You click left!");
    move("right");
});






