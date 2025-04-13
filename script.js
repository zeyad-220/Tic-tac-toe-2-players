const boardElement = document.getElementById('board');
        const infoElement = document.getElementById('info');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        let winLine = [];

        // Board
        function createBoard() {
            boardElement.innerHTML = '';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            winLine = [];
            gameActive = true;
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-index', i);
                cell.addEventListener('click', handleClick);
                boardElement.appendChild(cell);
            }
        }

        // Clicks
        function handleClick(event) {
            if (!gameActive) return;
            const index = event.target.getAttribute('data-index');
            if (gameBoard[index] !== '') return;
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add(currentPlayer);
            if (checkWinner()) {
                setTimeout(() => {
                    highlightWinner();
                    alert(currentPlayer + ' Wins!');
                    resetGame();
                }, 100);
            } else if (gameBoard.every(cell => cell !== '')) {
                setTimeout(() => {
                    alert("Draw!");
                    resetGame();
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                infoElement.textContent = `Player Turn ${currentPlayer === 'X' ? 1 : 2}`;
            }
        }

        // Check Winner
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    winLine = pattern;
                    return true;
                }
                return false;
            });
        }

        // Highlight winner
        function highlightWinner() {
            winLine.forEach(index => {
                const cell = boardElement.children[index];
                cell.style.backgroundColor = '#d4edda'; 
            });
        }

        // Reset Game
        function resetGame() {
            createBoard();
            currentPlayer = 'X';
            infoElement.textContent = 'Your Turn (X)';
        }

        // Start Game
        createBoard();