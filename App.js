import checkFood from "./helpers/checkFood.js";
import initializeGame from "./helpers/initializeGame.js";
import setPositions from "./helpers/setPositions.js";

export default function (sizeOfBoard, size, move) {
  // CREAMOS UNA CONSTANTE D QUE GUARDA UNA REFERENCIA DE DOCUMENT (POR COMODIDAD)
  // TRAEMOS EL TABLERO DEL DOM
  const d = document,
    $board = d.querySelector(".area");

  // DIRECCIONES
  const LEFT = "LEFT",
    UP = "UP",
    RIGHT = "RIGHT",
    DOWN = "DOWN";

  // VARIABLES DE DESPLAZAMIENTO
  let delay = 100,
    direction = RIGHT;

  // CREACIÓN DE LA TABLA
  $board.style.width = `${sizeOfBoard}px`;
  $board.style.height = `${sizeOfBoard}px`;
  $board.style.position = "relative";

  // TAMAÑO DE LA SNAKE Y LAS POSICIONES DE LOS CASILLEROS
  let snake = [],
    positions = Array.from(
      new Array(sizeOfBoard / size),
      () => new Array(sizeOfBoard / size)
    );

  setPositions(positions, size);

  const choiceDirection = (e) => {
    d.removeEventListener("keydown", choiceDirection);

    if (e.key === "ArrowLeft" && direction !== RIGHT) return (direction = LEFT);

    if (e.key === "ArrowUp" && direction !== DOWN) return (direction = UP);

    if (e.key === "ArrowRight" && direction !== LEFT)
      return (direction = RIGHT);

    if (e.key === "ArrowDown" && direction !== UP) return (direction = DOWN);
  };

  const startGame = (e) => {
    if (e.key === " ") {
      initializeGame($board, snake, size, move);
      game();
      d.querySelector(".score").textContent = 0;
      d.addEventListener("keydown", choiceDirection);
      d.removeEventListener("keydown", startGame);
    }
  };

  const gameOver = (interval, theWinner) => {
    clearInterval(interval);
    setPositions(positions, size);
    d.removeEventListener("keydown", choiceDirection);
    snake = [];
    direction = RIGHT;
    const $gameOver = d.createElement("p");
    $gameOver.className = "game-over";
    $gameOver.textContent = `Game Over! Score: ${
      d.querySelector(".score").textContent
    }`;

    if (theWinner) $gameOver.textContent = "YOU'RE GOD";
    $board.appendChild($gameOver);

    d.addEventListener("keydown", startGame);
  };

  const game = () => {
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

      for (let cube of snake.slice(1)) {
        cube = cube.style;
        let aux2 = [cube.top, cube.left],
          cubeTop = +cube.top.slice(0, -2),
          cubeLeft = +cube.left.slice(0, -2);

        positions[cubeTop / size][cubeLeft / size] = false;

        cube.top = aux1[0];
        cube.left = aux1[1];
        aux1 = aux2;
      }

      let headLeft = +snake[0].style.left.slice(0, -2),
        headTop = +snake[0].style.top.slice(0, -2);

      if (headTop < 0 || headTop > sizeOfBoard - size)
        return gameOver(interval);
      if (headLeft < 0 || headLeft > sizeOfBoard - size)
        return gameOver(interval);
      if (positions[headTop / size][headLeft / size] === false)
        return gameOver(interval);

      positions[headTop / size][headLeft / size] = false;

      let top = +aux1[0].slice(0, -2),
        left = +aux1[1].slice(0, -2);

      positions[top / size][left / size] = `${top}-${left}`;

      checkFood(snake, $food, $board, positions, headTop, headLeft, size);

      snake.length >= (sizeOfBoard / size) ** 2 - 2 && gameOver(interval, true);
    }, delay);
  };

  const $select = d.querySelector("#select");

  $select.addEventListener("change", () => {
    if (!$select.value) return;

    console.log("cambio hecho");
    delay = +$select.value;
  });

  d.addEventListener("keydown", startGame);
}
