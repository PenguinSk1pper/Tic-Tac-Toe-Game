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
let isEnded = false;

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
            return;
        }
        if (checkTie()) {
            endMessage.textContent = `Game is tied!`;
            isEnded = true;
            return;
        }
        if (currentPlayer == players[0])
            currentPlayer = players[1];
        else
            currentPlayer = players[0];

        if (currentPlayer == players[0])
            endMessage.textContent = "X's turn!";
        else
            endMessage.textContent = "O's turn!";
    })
}

function checkWin (currentPlayer) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (cells[a].textContent === currentPlayer && cells[b].textContent === currentPlayer && cells[c].textContent === currentPlayer) {
            isEnded = true;
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

function restartButton() {
    isEnded = false;
    for (let i = 0; i < cells.length; i++)
        cells[i].textContent = "";
    
    endMessage.textContent = "X's turn!";
    currentPlayer = players[0];
}