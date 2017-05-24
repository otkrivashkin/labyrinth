var lab = [
    '111111111111111111111','110010000010001000001','111010111010111011101',
    '100010101000000000101','101110101010111110111','100000100010100000101',
    '101111111110101110101','101000100000100010001','111011101110111111111',
    '100010000010000000001','101111101010111111101','100000001010001000001',
    '111111111111111111111'
];

var labyrinth = document.createElement('div');
// create board
function initBoard() {
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

}
initBoard();
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
var gold = addClass('gold');
var player = addClass('player');
// add labyrinth in body
document.body.appendChild(labyrinth);
// BUTTONS!!!
var buttons = ["up", "down", "left", "right"];

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
    labyrinth.appendChild(buttonContainer);
}
addButtons(buttons);

var upBtn = document.querySelector('.up');
var downBtn = document.querySelector('.down');
var leftBtn = document.querySelector('.left');
var rightBtn = document.querySelector('.right');

function isGold() {
    if(gold["row"] === player["row"] && gold["column"] === player["column"]) {
        alert("I GOT A POWER!!!");
        document.body.removeChild(labyrinth);
        labyrinth = document.createElement('div');
        initBoard();
        gold = addClass('gold');
        player = addClass('player');
        document.body.appendChild(labyrinth);
        addButtons(buttons);
        upBtn = document.querySelector('.up');
        downBtn = document.querySelector('.bottom');
        leftBtn = document.querySelector('.left');
        rightBtn = document.querySelector('.right');
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
            move("right");
        });
        leftBtn.addEventListener("click", function () {
            console.log("You click left!");
            move("left");
        });
    }
    else {
        console.log("keep tracking...");
    }
}
function move(direction, elementName, bgColor) {
    var row = elementName["row"];
    var column = elementName["column"];
    var tempRow = row;
    var tempColumn = column;
    if (direction === "up") {
        var isWallUp = labyrinth.querySelector("p:nth-child("
                + --tempRow +
                ") span:nth-child("
                + column +
                ")").className === "wall";
        if (!isWallUp) {
            row = --elementName["row"];
            labyrinth.querySelector("p:nth-child("
                + (row+1) +
                ") span:nth-child("
                + column +
                ")").style.backgroundColor = "white";

            labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + column +
                ")").style.background = bgColor;
            isGold();
        }
    }
    else if(direction === "down") {
        var isWallDown = labyrinth.querySelector("p:nth-child("
                + ++tempRow +
                ") span:nth-child("
                + column +
                ")").className === "wall";
        if (!isWallDown) {
            row = ++elementName["row"];
            labyrinth.querySelector("p:nth-child("
                + (row-1) +
                ") span:nth-child("
                + column +
                ")").style.backgroundColor = "white";

            labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + column +
                ")").style.backgroundColor = bgColor;
            isGold();
        }
    }
    else if(direction === "left") {
        var isWallLeft = labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + --tempColumn +
                ")").className === "wall";
        if (!isWallLeft) {
            column = --elementName["column"];
            labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + (column+1) +
                ")").style.backgroundColor = "white";

            labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + column +
                ")").style.backgroundColor = bgColor;
            isGold();
        }
    }
    else if(direction === "right") {
        var isWallRight = labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + ++tempColumn +
                ")").className === "wall";
        if (!isWallRight) {
            column = ++elementName["column"];
            labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + (column-1) +
                ")").style.backgroundColor = "white";

            labyrinth.querySelector("p:nth-child("
                + row +
                ") span:nth-child("
                + column +
                ")").style.backgroundColor = bgColor;
            isGold();
        }
    }

}
// Minos
var minos = addClass('minos');

function findPlayer() {
    if (player["row"] === minos["row"] && player["column"] === minos["column"]) {
        console.log("YOU SHALL NO PASS!!! I FOUND YOU!!!");
    }
    else {
        if (player["row"] > minos["row"] ) { // игрок снизу
            if (player["column"] < minos["column"]) { // игрок слева
                return move("left", minos, "red"); //
            }
            else if (player["column"] > minos["column"]) {
                return move("right", minos, "red");
            }
            return move("down", minos, "red");
        }
        else if (player["row"] < minos["row"]) { // if player below minos
            if (player["column"] < minos["column"]) { // игрок слева
                return move("left", minos, "red"); //
            }
            else if (player["column"] > minos["column"]) {
                return move("right", minos, "red");
            }
            return move("up", minos, "red");
        }
        else if (player["column"] < minos["column"] && player["row"] !== minos["row"]) { // if player by left side from minos
            if (player["row"] < minos["row"]) { // игрок слева
                return move("up", minos, "red"); //
            }
            else if (player["row"] > minos["row"]) {
                return move("down", minos, "red");
            }
            return move("left", minos, "red");
        }
        else if (player["column"] > minos["column"] && player["row"] !== minos["row"]) { // if player by right side from minos
            if (player["row"] < minos["row"]) { // игрок слева
                return move("up", minos, "red"); //
            }
            else if (player["row"] > minos["row"]) {
                return move("down", minos, "red");
            }
            return move("right", minos, "red");
        }
    }
}

upBtn.addEventListener("click", function () {
    console.log("You click up!");
    move("up", player, "green");
    findPlayer();
});
downBtn.addEventListener("click", function () {
    console.log("You click down!");
    move("down", player, "green");
    findPlayer();
});
rightBtn.addEventListener("click", function () {
    console.log("You click right!");
    move("right", player, "green");
    findPlayer();
});
leftBtn.addEventListener("click", function () {
    console.log("You click left!");
    move("left", player, "green");
    findPlayer();
});





