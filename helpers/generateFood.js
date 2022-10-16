import makeLink from "./makeLink.js";

export default function (positions, sizeOfBoard, size, move) {
  let top,
    left,
    count = 0;

  do {
    top = Math.round((Math.random() * (sizeOfBoard - size)) / move) * move;
    left = Math.round((Math.random() * (sizeOfBoard - size)) / move) * move;
    console.log(count++);
  } while (positions[`${top}px${left}px`]);

  const $food = makeLink(size, top, left, "blue");
  $food.id = "food";

  return $food;
}
