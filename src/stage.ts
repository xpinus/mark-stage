import Pane from './annotations/pane';
import { coords, setCoords } from './util/coordinate';

import type Annotation from './annotations/annotation';

class Stage {
  pane: Pane;
  annotations: Annotation[] = [];
  target: HTMLElement;
  container: HTMLElement;

  constructor(target: HTMLElement, container: HTMLElement = document.body) {
    this.target = target;
    this.container = container;

    // Set up mouse event proxying between the target element and the marks
    // events.proxyMouse(this.target, this.marks);

    this.pane = new Pane();
    this.pane.mount(this.container);

    this.render();
  }

  render() {
    setCoords(this.pane.$pane as unknown as HTMLElement, coords(this.target, this.container));
    for (const annot of this.annotations) {
      annot.render();
    }
  }

  add(annot: Annotation) {
    annot.bind(this.pane);
    this.annotations.push(annot);

    annot.render();

    return annot;
  }

  remove(annot: Annotation) {
    const idx = this.annotations.indexOf(annot);
    if (idx === -1) {
      return;
    }

    const el = annot.unbind();
    if (el) {
      this.pane.$pane.removeChild(el);
    }
    this.annotations.splice(idx, 1);
  }
}

export default Stage;
