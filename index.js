import checkFood from "./helpers/checkFood.js";
import initializeGame from "./initializeGame.js";

const d = document,
  $board = d.querySelector(".area");

// DIRECCIONES
const LEFT = "LEFT",
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN";

// VARIABLES DE DESPLAZAMIENTO Y ÁREA
let move = 35,
  delay = 100,
  size = 35,
  sizeOfBoard = 700,
  direction = RIGHT;

// CREACIÓN DE LA TABLA
$board.style.width = `${sizeOfBoard}px`;
$board.style.height = `${sizeOfBoard}px`;
$board.style.backgroundColor = "black";
$board.style.position = "relative";

// CUBOS DE LA SNAKE Y LAS POSICIONES DE LOS CASILLEROS
let snake = [],
  positions = {};

const choiceDirection = (e) => {
  d.removeEventListener("keydown", choiceDirection);

  if (e.key === "ArrowLeft" && direction !== RIGHT) return (direction = LEFT);

  if (e.key === "ArrowUp" && direction !== DOWN) return (direction = UP);

  if (e.key === "ArrowRight" && direction !== LEFT) return (direction = RIGHT);

  if (e.key === "ArrowDown" && direction !== UP) return (direction = DOWN);
};

const startGame = (e) => {
  if (e.key === " ") {
    initializeGame($board, snake, size, move);
    game();
    document.querySelector(".score").textContent = 0;
    d.addEventListener("keydown", choiceDirection);
    d.removeEventListener("keydown", startGame);
  }
};

const gameOver = (interval) => {
  clearInterval(interval);
  snake = [];
  positions = {};
  direction = RIGHT;
  const $gameOver = d.createElement("p");
  $gameOver.className = "game-over";
  $gameOver.textContent = `Game Over, Score: ${
    d.querySelector(".score").textContent
  }`;
  $board.appendChild($gameOver);
  document.addEventListener("keydown", startGame);
};

let game = () => {
  let interval = setInterval(() => {
    let prevHeadLeft = +snake[0].style.left.slice(0, -2),
      prevHeadTop = +snake[0].style.top.slice(0, -2),
      aux1 = [`${prevHeadTop}px`, `${prevHeadLeft}px`];

    const $food = d.querySelector("#food");

    switch (direction) {
      case LEFT:
        snake[0].style.left = `${prevHeadLeft - move}px`;
        break;
      case UP:
        snake[0].style.top = `${prevHeadTop - move}px`;
        break;
      case RIGHT:
        snake[0].style.left = `${prevHeadLeft + move}px`;
        break;
      case DOWN:
        snake[0].style.top = `${prevHeadTop + move}px`;
        break;
    }

    d.addEventListener("keydown", choiceDirection);

    let headLeft = +snake[0].style.left.slice(0, -2),
      headTop = +snake[0].style.top.slice(0, -2);

    let colision = false;
    if (positions[`${headTop}px${headLeft}px`]) colision = true;

    positions[`${headTop}px${headLeft}px`] = true;

    for (let piece of snake.slice(1)) {
      let aux2 = [piece.style.top, piece.style.left];
      positions[piece.style.top + piece.style.left] = true;
      piece.style.top = aux1[0];
      piece.style.left = aux1[1];
      aux1 = aux2;
    }

    positions[aux1.join("")] = null;

    checkFood(
      snake,
      $food,
      $board,
      positions,
      sizeOfBoard,
      headTop,
      headLeft,
      size,
      move
    );

    if (snake.length >= (sizeOfBoard / size) ** 2 - 2 || colision) {
      return gameOver(interval);
    }

    if (headTop < 0 || headTop > sizeOfBoard - size) return gameOver(interval);
    if (headLeft < 0 || headLeft > sizeOfBoard - size)
      return gameOver(interval);
  }, delay);
};

d.addEventListener("keydown", startGame);
