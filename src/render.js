import { checkPoint, colors } from './helpers';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

export function clearCanvas() {
  context.fillStyle = '#fffff8';
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawLine(x1, y1, color, x2, y2) {
  context.strokeStyle = color;
  context.lineWidth = 5;
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

function drawLinkNeighbors(node, cs) {
  for (const n of cs) {
    const isNeighbor = checkPoint(node.x, node.y, n.x, n.y, 100);
    if (isNeighbor) {
      drawLine(node.x, node.y, colors[node.color], n.x, n.y);
    }
  }
}

export function renderNode({ x, y }, cs) {
  return (node) => {
    if (checkPoint(x, y, node.x, node.y, 200)) {
      drawLine(x, y, colors[0], node.x, node.y);
    }
    drawLinkNeighbors(node, cs);
    drawCircle(node.x, node.y, colors[node.color], node.size);
  };
}
