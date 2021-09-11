import { BehaviorSubject, fromEvent, Scheduler, interval } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { clearCanvas, renderNode } from './render';
import updateNode from './update';
import { initState, getMouseXY } from './helpers';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nNodes = 500;
const initialState = initState(nNodes, canvas);
const nodes$ = new BehaviorSubject(initialState);

function next({ x, y }) {
  const nodes$Value = nodes$.getValue();
  nodes$.next({
    cs: [...nodes$Value.cs],
    ms: {
      x,
      y,
    },
  });
}

function update() {
  const nodes = nodes$.getValue();
  nodes$.next({ ...nodes, cs: nodes.cs.map(updateNode) });
}

function render() {
  clearCanvas();
  const { ms, cs } = nodes$.getValue();
  cs.forEach(renderNode(ms, cs));
}

const clicks = fromEvent(canvas, 'click');
clicks.pipe(debounceTime(50), map(getMouseXY)).subscribe({ next });
interval(0, Scheduler.animationFrame).subscribe(render);
interval(Math.round(1000 / 60)).subscribe(update);
