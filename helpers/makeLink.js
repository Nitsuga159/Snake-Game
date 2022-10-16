export default function (size, top, left, color, addClass) {
  const s = document.createElement("div");
  s.style.width = `${size}px`;
  s.style.height = `${size}px`;
  s.style.backgroundColor = color;
  s.style.top = `${top}px`;
  s.style.left = `${left}px`;

  addClass && s.classList.add(addClass);

  return s;
}
