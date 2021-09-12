import { BehaviorSubject, fromEvent, Scheduler, interval } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { clearCanvas, renderNode } from './render';
import updateNode from './update';
import { initState, getMouseXY } from './helpers';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nNodes = 500;
const initialState = initState(nNodes);
const nodes$ = new BehaviorSubject(initialState);

function next({ x, y }) {
  const { nodes } = nodes$.getValue();
  nodes$.next({
    nodes,
    mousePosClicked: {
      x,
      y,
    },
  });
}

function update() {
  const { mousePosClicked, nodes } = nodes$.getValue();
  nodes$.next({ mousePosClicked, nodes: nodes.map(updateNode) });
}

function render() {
  clearCanvas();
  const { mousePosClicked, nodes } = nodes$.getValue();
  nodes.forEach(renderNode(mousePosClicked, nodes));
}

const clicks = fromEvent(canvas, 'click');
clicks.pipe(debounceTime(50), map(getMouseXY)).subscribe({ next });
interval(0, Scheduler.animationFrame).subscribe(render);
interval(Math.round(1000 / 60)).subscribe(update);
