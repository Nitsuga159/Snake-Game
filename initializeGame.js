import makeLink from "./helpers/makeLink.js";

export default function ($board, snake, size, move) {
  $board.innerHTML = "";

  const $cubo1 = makeLink(size, 0, move, "rgb(225, 40, 40)", "head");
  const $cubo2 = makeLink(size, 0, 0, "rgb(240, 10, 10)");

  $board.appendChild($cubo1);
  $board.appendChild($cubo2);

  snake.push($cubo1);
  snake.push($cubo2);
}
