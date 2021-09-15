import { checkPoint } from './helpers';

export default function updateNode(n, nodes) {
  const dx = n.x < 0 || n.x > window.innerWidth ? -n.dx : n.dx;
  const dy = n.y < 0 || n.y > window.innerHeight ? -n.dy : n.dy;
  const ns = nodes.filter((node) => checkPoint(n.x, n.y, node.x, node.y, 100));
  return {
    ...n,
    dx,
    dy,
    x: n.x + dx,
    y: n.y + dy,
    ns,
  };
}
