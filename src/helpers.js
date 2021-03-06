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
  const canvas = document.querySelector('canvas');
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = Math.round((e.clientX - rect.left) * scaleX);
  const y = Math.round((e.clientY - rect.top) * scaleY);
  return { x, y };
}

export function checkPoint(a, b, x, y, r) {
  const distPoints = (a - x) * (a - x) + (b - y) * (b - y);
  return distPoints < r ** 2;
}

function getRandomValueNoZero(v1, v2) {
  const randomValue = getRandomValue(v1, v2 + 1);
  return randomValue !== 0 ? randomValue : getRandomValueNoZero(v1, v2);
}

export function initState(nNodes) {
  return {
    nodes: Array.from({ length: nNodes }, (_) => {
      const val = getRandomValue(1, 5);
      const dx = getRandomValueNoZero(-5, 5);
      const dy = getRandomValueNoZero(-5, 5);
      return {
        x: getRandomValue(-100, window.innerWidth + 100),
        y: getRandomValue(-100, window.innerHeight + 100),
        dx,
        dy,
        color: colors[val],
        size: val,
        ns: [],
      };
    }),
    mousePosClicked: {
      x: -1000,
      y: -1000,
    },
  };
}
