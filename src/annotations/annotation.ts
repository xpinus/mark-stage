import type Pane from './pane';

type AnnotationOptions = {
  range: Range;
  className: string;
};

abstract class Annotation {
  wrap: SVGElement | null = null;
  pane: Pane | null = null;
  range: Range;
  className: string;

  constructor({ range, className = '' }: AnnotationOptions) {
    this.range = range;
    this.className = className;
  }

  abstract render(): void;

  bind(pane: Pane) {
    this.pane = pane;

    const g = this.pane.group();
    this.pane.$pane.appendChild(g);
    this.wrap = g;
  }

  unbind() {
    const el = this.wrap;
    this.wrap = null;
    return el;
  }

  filteredRanges() {
    if (!this.range) {
      return [];
    }

    // De-duplicate the boxes
    const rects = Array.from(this.range.getClientRects());
    const stringRects = rects.map((r) => JSON.stringify(r));
    const setRects = new Set(stringRects);
    return Array.from(setRects).map((sr) => JSON.parse(sr));
  }
}

export default Annotation;
