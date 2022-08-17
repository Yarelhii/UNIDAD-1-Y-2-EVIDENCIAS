var jugadoruno = "R";
var jugadordos = "Y";
var currjugador = jugadoruno;
var gameOver = false;
var board;
var rows = 6;
var columns = 7;
var currColumns = []; 

window.onload = function() {
    setGame();
}
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currColumns[c]; 
    if (r < 0) { 
        return;
    }
    board[r][c] = currjugador;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currjugador == jugadoruno) {
        tile.classList.add("azul");
        currjugador = jugadordos;
    }
    else {
        tile.classList.add("rosa");
        currjugador = jugadoruno;
    }
    r -= 1; 
    currColumns[c] = r;
    checkganador();
}
function checkganador() {
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setganador(r, c);
                    return;
                }
            }
         }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setganador(r, c);
                    return;
                }
            }
        }
    }
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setganador(r, c);
                    return;
                }
            }
        }
    }
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setganador(r, c);
                    return;
                }
            }
        }
    }
}

function setganador(r, c) {
    let ganador = document.getElementById("ganador");
    if (board[r][c] == jugadoruno) {
        ganador.innerText = "GANA JUGADOR UNO";             
    } else {
        ganador.innerText = "GANA JUGADOR DOS";
    }
    gameOver = true;
}
