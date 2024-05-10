const board = document.getElementById('board')
const status = document.getElementById('status')
const cells = Array.from({ length: 9 })

let currentPlayer = "X"
let winner = null

function initialze() {
    winner = null
    currentPlayer = "X"
    cells.fill(null)
    render()
    status.textContent = ""
}

function render() {
    board.innerHTML = ''
    cells.forEach((value, index) => {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.textContent = value || ''
        cell.addEventListener('click', () => handleCellClick(index))
        board.appendChild(cell)
    })
}

function handleCellClick(index) {
    if (cells[index] || winner) return
    cells[index] = currentPlayer
    if (checkWinner()) {
        winner = currentPlayer
    } else if (cells.every(cell => cell !== null)) {
        winner = 'draw'
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"
    }
    render();
    showStatus(); 
}


function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    return winPatterns.some(parent => parent.every(index => cells[index] === currentPlayer))
}

function showStatus() {
    if (winner) {
        if (winner === "draw") {
            status.textContent = 'Ничья'
        } else {
            status.textContent = `Победил игрок ${currentPlayer}`
        }
    } else {
        status.textContent = `Ходит игрок ${currentPlayer} `

    }
       
}

initialze();

showStatus()

