


const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Add click event to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

function handleCellClick(cell, index) {
  if (cell.textContent !== '' || !gameActive) return;

  // Mark the cell
  cell.textContent = currentPlayer;

  // Check for a win or draw
  if (checkWin()) {
    message.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
  } else if (Array.from(cells).every(cell => cell.textContent !== '')) {
    message.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

// Restart the game
restartButton.addEventListener('click', () => {
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = "Player X's turn";
});
