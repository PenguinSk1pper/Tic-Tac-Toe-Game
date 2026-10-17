const board = document.getElementById('board');
const cells = document.getElementsByClassName('cell');
const players = ['X', 'O'];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let currentPlayer = players[0];
let startPlayer = players[0];
let isEnded = false;

let scoreX = 0;
let scoreO = 0;
let getScoreX = document.querySelector("#wins-x");
let getScoreO = document.querySelector("#wins-o");
getScoreO.textContent = 0;
getScoreX.textContent = 0;

const endMessage = document.getElementById('title');
endMessage.textContent = "X's turn!";

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', () => {
        if (isEnded == true)
            return;
        if (cells[i].textContent !== '')
            return;
        cells[i].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            isEnded = true;
            updateScore();
            return;
        }
        if (checkTie()) {
            endMessage.textContent = `Game is tied!`;
            isEnded = true;
            return;
        }
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        endMessage.textContent = `${currentPlayer}'s turn!`;
    })
}

function checkWin (currentPlayer) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (cells[a].textContent === currentPlayer && cells[b].textContent === currentPlayer && cells[c].textContent === currentPlayer) {
            isEnded = true;
            cells[a].style.backgroundColor = "lightgreen";
            cells[b].style.backgroundColor = "lightgreen";
            cells[c].style.backgroundColor = "lightgreen";
            return true;
        }
    }
    return false;
}

function checkTie () {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '')
            return false;
    }
    return true;
}

function updateScore() {
    if (currentPlayer == players[0]) {
        scoreX++;
        getScoreX.textContent = scoreX;
    }
    else {
        scoreO++;
        getScoreO.textContent = scoreO;
    }
}

function restartButton() {
    isEnded = false;
    for (let cell of cells) {
        cell.textContent = "";
        cell.style.backgroundColor = "#fff";
    }

    startPlayer = startPlayer === players[0] ? players[1] : players[0];
    
    endMessage.textContent = `${startPlayer}'s turn!`;
    currentPlayer = startPlayer;
}