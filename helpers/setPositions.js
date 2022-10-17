export default function (positions, size) {
  let top = 0;
  for (let i = 0; i < positions.length; i++) {
    let left = 0;
    for (let j = 0; j < positions[0].length; j++) {
      positions[top / size][left / size] = `${top}-${left}`;
      left += size;
    }
    top += size;
  }
}
