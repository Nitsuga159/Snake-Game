import generateFood from "./generateFood.js";
import eatFood from "./eatFood.js";

export default function checkFood(
  snake,
  $food,
  $board,
  positions,
  headTop,
  headLeft,
  size
) {
  if (!$food) return $board.appendChild(generateFood(positions, size));

  if ($food.style.top + $food.style.left === `${headTop}px${headLeft}px`) {
    eatFood($board, snake, headTop, headLeft, size);
    $board.removeChild($food);
  }
}
