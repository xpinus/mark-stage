import Pane from './pane';
import { coords, setCoords } from './util/coordinate';
import ProxyMouseEvent from './util/event';

import type Mark from './marks/mark';

class Stage {
  pane: Pane;
  marks: Map<string, Mark> = new Map();
  target: HTMLElement;
  container: HTMLElement;
  event: ProxyMouseEvent;

  constructor(target: HTMLElement, container: HTMLElement = document.body) {
    this.target = target;
    this.container = container;

    this.pane = new Pane();
    this.pane.mount(this.container);

    // Set up mouse event proxying between the target element and the marks
    this.event = new ProxyMouseEvent(this);

    this.render();
  }

  render() {
    setCoords(this.pane.$pane as unknown as HTMLElement, coords(this.target, this.container));

    for (const mark of this.marks.values()) {
      mark.render();
    }
  }

  add(mark: Mark) {
    this.marks.set(mark.uuid, mark);
    mark.bind(this.pane);
    mark.render();

    return mark;
  }

  remove(uuid: string) {
    if (!this.marks.has(uuid)) return;

    const mark = this.marks.get(uuid)!;

    const el = mark.unbind();
    if (el) {
      this.pane.$pane.removeChild(el);
    }
    this.marks.delete(uuid);
  }

  clear() {
    this.marks.forEach((mark) => {
      this.remove(mark.uuid);
    });
  }

  destroy() {
    this.clear();
    this.pane.$pane?.remove();
  }
}

export default Stage;
