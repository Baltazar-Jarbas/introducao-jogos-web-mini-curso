const boardSize = 10; // Tamanho do tabuleiro 10x10
const mineCount = 10; // Número de minas

let board = new Array();
let gameBoard = document.getElementById("game-board");

// Função para criar o tabuleiro
function createBoard() {
  for(var rowCount =0;rowCount<boardSize;rowCount++) {
    const row = new Array();
    for(var colCount=0;colCount<boardSize;colCount++) {
      row.push(
        { 
          row: rowCount, 
          col: colCount, 
          mine: false, 
          revealed: false, 
          nearbyMines: 0 
        });
    }
    board.push(row);
  }
}

// Função para posicionar minas aleatoriamente
function placeMines() {
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    let row = Math.floor(Math.random() * boardSize);
    let col = Math.floor(Math.random() * boardSize);
    if (!board[row][col].mine) {
      board[row][col].mine = true;
      minesPlaced++;
    }
  }
}

// Função para renderizar o tabuleiro na tela
function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach(row => {
    row.forEach(cellItem => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = cellItem.row;
      cell.dataset.col = cellItem.col;
      cell.addEventListener("click", handleCellClick);
      gameBoard.appendChild(cell);
    });
  });
}

// Função de clique em uma célula
function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  revealCell(row, col);
}

// Função para revelar uma célula
function revealCell(row, col) {
  const cell = board[row][col];
  //console.log(cell);
  if (cell.revealed) return;

  cell.revealed = true;
  const cellElement = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
  cellElement.classList.add("revealed");

  if (cell.mine) {
    cellElement.classList.add("mine");
    cellElement.textContent = "💣";
    alert("Você perdeu!");
    revealAllMines();
  } else {
    cellElement.textContent = cell.nearbyMines || "";
  }
}

// Função para revelar todas as minas quando o jogo termina
function revealAllMines() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col].mine) {
        const cellElement = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cellElement.classList.add("revealed", "mine");
        cellElement.textContent = "💣";
      }
    }
  }
}

// Função para inicializar o tabuleiro
function initBoard() {  
  createBoard();
  placeMines();
  renderBoard();
}

// Inicializar o tabuleiro ao carregar a página
initBoard();
