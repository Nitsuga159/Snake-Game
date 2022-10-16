import makeLink from "./makeLink.js";

export default function ($board, snake, top, left, size) {
  const cuboTemp = makeLink(size, top, left, "rgb(240, 10, 10)");
  $board.appendChild(cuboTemp);
  snake.push(cuboTemp);
  document.querySelector(".score").textContent =
    +document.querySelector(".score").textContent + 1;
}
