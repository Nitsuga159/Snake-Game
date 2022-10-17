import makeLink from "./makeLink.js";

export default function (positions, size) {
  let top, left;

  let filerPositions = [];

  positions.forEach(
    (arr) =>
      (filerPositions = [...filerPositions, ...arr.filter((item) => item)])
  );

  [top, left] =
    filerPositions[Math.floor(Math.random() * filerPositions.length)].split(
      "-"
    );

  const $food = makeLink(size, top, left, "blue");
  $food.id = "food";

  return $food;
}
