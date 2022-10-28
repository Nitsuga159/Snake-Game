import generateFood from "./generateFood.js";
import eatFood from "./eatFood.js";

export default function checkFood(
  snake,
  $food,
  $board,
  positions,
  headTop,
  headLeft,
  tailLeft,
  tailRight,
  size
) {
  if (!$food) return $board.appendChild(generateFood(positions, size));

  if ($food.style.top + $food.style.left === `${headTop}px${headLeft}px`) {
    eatFood($board, snake, tailLeft, tailRight, size);
    $board.removeChild($food);
  }
}
