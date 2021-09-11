import { BehaviorSubject, fromEvent, Scheduler, interval } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { clearCanvas, renderNode } from './render';
import updateNode from './update';
import { getRandomValue, getMouseXY } from './helpers';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nNodes = 300;
const nodes$ = new BehaviorSubject({
  cs: Array.from({ length: nNodes }, (_) => {
    const val = getRandomValue(1, 5);
    return {
      x: getRandomValue(-100, window.innerWidth + 100),
      y: getRandomValue(-100, window.innerHeight + 100),
      dx: getRandomValue(2, 5),
      dy: getRandomValue(2, 5),
      color: val,
      size: val,
    };
  }),
  ms: {
    x: -1000,
    y: -1000,
  },
});

const observeMouseEvent = {
  next: ({ x, y }) => {
    const nodes$Value = nodes$.getValue();
    nodes$.next({
      cs: [...nodes$Value.cs],
      ms: {
        x,
        y,
      },
    });
  },
};
const clicks = fromEvent(canvas, 'click');
clicks.pipe(debounceTime(50), map(getMouseXY)).subscribe(observeMouseEvent);

function update() {
  const nodes = nodes$.getValue();
  nodes$.next({ ...nodes, cs: nodes.cs.map(updateNode) });
}

function render() {
  clearCanvas();
  const { ms, cs } = nodes$.getValue();
  cs.forEach(renderNode(ms, cs));
}

interval(0, Scheduler.animationFrame).subscribe(render);
interval(Math.round(1000 / 60)).subscribe(update);
