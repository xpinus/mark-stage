import { generateUUID } from '@/util/uuid';
import type SvgPane from '../SvgPane';
import type { Mark } from '@/Mark';

export type MarkOptions = {
  uuid?: string;
  range: Range;
  classList: string[];
  style?: string;
};

export default abstract class BaseSvgMark implements Mark {
  uuid: string;
  $group: SVGElement | null = null;
  pane: SvgPane | null = null;
  range: Range;
  classList: string[];
  style?: string;

  constructor({ uuid, range, classList = [], style }: MarkOptions) {
    this.uuid = uuid || generateUUID();
    this.range = range;
    this.classList = classList;
    this.style = style;
  }

  abstract draw(): void;

  bind(pane: SvgPane) {
    this.pane = pane;

    const g = this.pane.group();
    g.setAttribute('data-uuid', this.uuid);
    this.pane.$pane.appendChild(g);
    this.$group = g;
  }

  unbind() {
    if (!this.$group) return;
    this.pane?.$pane.removeChild(this.$group);
    this.$group = null;
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

  dispatch(event: PointerEvent) {
    this.$group!.dispatchEvent(event);
  }

  getBoundingClientRect() {
    return this.$group?.getBoundingClientRect();
  }
}
