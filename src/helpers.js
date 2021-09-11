export function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const colors = [
  '#3b4252',
  '#e1e1e1',
  '#c3c3c3',
  '#a5a5a5',
  '#878787',
  '#696969',
];

export function getMouseXY(e) {
  return { x: e.clientX, y: e.clientY };
}

export function checkPoint(a, b, x, y, r) {
  const distPoints = (a - x) * (a - x) + (b - y) * (b - y);
  return distPoints < Math.pow(r, 2);
}
