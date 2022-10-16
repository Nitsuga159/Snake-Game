import generateFood from "./generateFood.js";
import eatFood from "./eatFood.js";

export default function checkFood(
  snake,
  $food,
  $board,
  positions,
  sizeOfBoard,
  headTop,
  headLeft,
  size,
  move
) {
  if (!$food)
    return $board.appendChild(generateFood(positions, sizeOfBoard, size, move));

  if ($food.style.top + $food.style.left === `${headTop}px${headLeft}px`) {
    eatFood($board, snake, headTop, headLeft, move);
    $board.removeChild($food);
  }
}
