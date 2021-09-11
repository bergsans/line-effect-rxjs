export default function updateNode(n) {
  const dx = n.x < 0 || n.x > window.innerWidth ? -n.dx : n.dx;
  const dy = n.y < 0 || n.y > window.innerHeight ? -n.dy : n.dy;
  return {
    ...n,
    dx,
    dy,
    x: n.x + dx,
    y: n.y + dy,
  };
}
