import Pane from './marks/pane';
import { coords, setCoords } from './util/coordinate';
import ProxyMouseEvent from './util/event';

import type Annotation from './marks/mark';

class Stage {
  pane: Pane;
  annotations: Map<string, Annotation> = new Map();
  target: HTMLElement;
  container: HTMLElement;
  event: ProxyMouseEvent;

  constructor(target: HTMLElement, container: HTMLElement = document.body) {
    this.target = target;
    this.container = container;

    // Set up mouse event proxying between the target element and the marks
    // events.proxyMouse(this.target, this.marks);

    this.pane = new Pane();
    this.pane.mount(this.container);

    this.event = new ProxyMouseEvent(this);

    this.render();
  }

  render() {
    setCoords(this.pane.$pane as unknown as HTMLElement, coords(this.target, this.container));

    for (const annot of this.annotations.values()) {
      annot.render();
    }
  }

  add(annot: Annotation) {
    this.annotations.set(annot.uuid, annot);
    annot.bind(this.pane);
    annot.render();

    return annot;
  }

  remove(uuid: string) {
    if (!this.annotations.has(uuid)) return;

    const annot = this.annotations.get(uuid)!;

    const el = annot.unbind();
    if (el) {
      this.pane.$pane.removeChild(el);
    }
    this.annotations.delete(uuid);
  }
}

export default Stage;
