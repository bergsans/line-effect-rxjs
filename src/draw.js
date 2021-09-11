import { checkPoint, colors } from './helpers';

const context = canvas.getContext('2d');

function clearCanvas(context) {
  context.fillStyle = '#fffff8';
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

export const drawLine = (x1, y1, color, x2, y2, context) => {
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

export const drawCircle = (x, y, color, radius, context) => {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
};

function render() {
  clearCanvas(context);
  const { ms, cs } = nodes$.getValue();
  cs.forEach(renderNode(ms, cs, context));
}

function getNeighbors(n) {
  return function (node) {
    checkPoint(node.x, node.y, n.x, n.y, 100);
  };
}

function linkNeighbors(node) {
  return function (n) {
    drawLine(node.x, node.y, colors[node.color], n.x, n.y, context);
  };
}

export function renderNode({ x, y }, cs, context) {
  return (node) => {
    if (checkPoint(x, y, node.x, node.y, 200)) {
      drawLine(x, y, 'red', node.x, node.y, context);
    }
    cs.filter(getNeighbors(node)).forEach(linkNeighbors(node));
    drawCircle(node.x, node.y, colors[node.color], node.size, context);
  };
}
