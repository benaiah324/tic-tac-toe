// Tic Tac Toe game module encapsulated to minimize globals
const TicTacToe = (function() {
    // private state
    let board;
    let currentPlayer;
    let isGameActive;

    // cached DOM elements
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');

    // winning triplets
    const WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // initialize or restart the game
    function initializeGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameActive = true;

        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('win');
            cell.addEventListener('click', handleCellClick);
        });

        resetButton.addEventListener('click', resetGame);
    }

    function handleCellClick(event) {
        const index = parseInt(event.target.dataset.index, 10);

        if (!isGameActive || board[index] !== "") {
            return;
        }

        updateBoard(index);
        event.target.textContent = currentPlayer;

        if (checkForWin()) {
            isGameActive = false;
            highlightWinningCells();
            return;
        }

        if (checkForDraw()) {
            isGameActive = false;
            return;
        }

        switchPlayer();
    }

    function updateBoard(index) {
        board[index] = currentPlayer;
    }

    function checkForWin() {
        return WINNING_COMBINATIONS.some(combination => {
            const [a, b, c] = combination;
            return (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            );
        });
    }

    function highlightWinningCells() {
        WINNING_COMBINATIONS.forEach(combination => {
            const [a, b, c] = combination;
            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
            }
        });
    }

    function checkForDraw() {
        return board.every(cell => cell !== "");
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function resetGame() {
        initializeGame();
    }

    // expose only init (others remain private)
    return {
        init: initializeGame
    };
})();

// start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', TicTacToe.init);
} else {
    TicTacToe.init();
}
