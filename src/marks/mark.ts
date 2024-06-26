import { generateUUID } from '../util/uuid';
import type Pane from '../pane';

export type MarkOptions = {
  uuid?: string;
  range: Range;
  classList: string[];
  style?: string;
};

abstract class Mark {
  uuid: string;
  $group: SVGElement | null = null;
  pane: Pane | null = null;
  range: Range;
  classList: string[];
  style?: string;

  constructor({ uuid, range, classList = [], style }: MarkOptions) {
    this.uuid = uuid || generateUUID();
    this.range = range;
    this.classList = classList;
    this.style = style;
  }

  // 抽象的渲染方法
  abstract render(): void;

  bind(pane: Pane) {
    this.pane = pane;

    const g = this.pane.group();
    g.setAttribute('data-uuid', this.uuid);
    this.pane.$pane.appendChild(g);
    this.$group = g;
  }

  unbind() {
    const el = this.$group;
    this.$group = null;
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

  // Empty element
  _empty() {
    if (!this.$group) return;

    while (this.$group.firstChild) {
      this.$group.removeChild(this.$group.firstChild);
    }
  }
}

export default Mark;
