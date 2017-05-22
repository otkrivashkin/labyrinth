var lab = [
    '111111111111111111111','100010000010001000001','111010111010111011101',
    '100010101000000000101','101110101010111110111','100000100010100000101',
    '101111111110101110101','101000100000100010001','111011101110111111111',
    '100010000010000000001','101111101010111111101','100000001010001000001',
    '111111111111111111111'
];

// var labyrinth = document.querySelector("#labyrinth");
var labyrinth = document.createElement('div');

for (var column = 0; column < lab.length; column++) {
    var p = document.createElement('p');
    for (var row = 0; row < lab[column].length; row++) {
        var span = document.createElement('span');
        span.innerHTML = lab[column][row];
        p.appendChild(span);
    }
    labyrinth.appendChild(p);
}
document.body.appendChild(labyrinth);