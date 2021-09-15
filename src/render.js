import { checkPoint, colors } from './helpers';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

const darkGray = colors[0];
const background = '#fffff8';

export function clearCanvas() {
  context.fillStyle = background;
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawLine(x1, y1, color, x2, y2, w) {
  context.strokeStyle = color;
  context.lineWidth = w;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function drawCircle(x, y, color, radius) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

function drawLinkNeighbors(node, ns) {
  for (let i = 0; i < ns.length; i++) {
    drawLine(node.x, node.y, node.color, ns[i].x, ns[i].y, node.size);
  }
}

export function renderNode({ x, y }) {
  return (node) => {
    if (checkPoint(x, y, node.x, node.y, 200)) {
      drawLine(x, y, darkGray, node.x, node.y);
    }
    drawLinkNeighbors(node, node.ns);
    drawCircle(node.x, node.y, node.color, node.size);
  };
}
