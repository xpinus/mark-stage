import { generateUUID } from '@/util/uuid';
import { isArray } from '@/util/common';
import type SvgPane from '../SvgPane';
import type { Mark } from '@/Mark';

export type MarkOptions = {
  uuid?: string;
  range: any;
  classList?: string[];
  style?: string;
};

export default abstract class BaseSvgMark implements Mark {
  uuid: string;
  $group: SVGElement | null = null;
  pane: SvgPane | null = null;
  abstract range: any;
  classList: string[];
  style?: string;
  options: MarkOptions;

  constructor(options: MarkOptions) {
    this.options = options;
    this.uuid = options.uuid || generateUUID();
    this.classList = options.classList || [];
    this.style = options.style || '';
  }

  abstract draw(): void;

  bind(pane: SvgPane) {
    this.pane = pane;

    const g = this.pane.group();
    g.setAttribute('data-uuid', this.uuid);
    this.pane.$pane.appendChild(g);
    this.$group = g;

    if (this.options.range instanceof Range) {
      this.range = this.filteredRanges(this.options.range);
    } else {
      this.range = this.options.range;
    }
  }

  unbind() {
    if (!this.$group) return;
    this.pane?.$pane.removeChild(this.$group);
    this.$group = null;
  }

  /**
   * 用于将Range转换为实际需要的相对位置，可以被子类重写
   */
  filteredRanges(range: Range) {
    if (!this.$group) {
      throw new Error('only be use after stage bind');
    }
    const offset = this.$group.getBoundingClientRect();

    // De-duplicate the boxes
    const rects = Array.from(range.getClientRects());
    const stringRects = rects.map((r) => JSON.stringify(r));
    const setRects = new Set(stringRects);
    return Array.from(setRects).map((sr) => {
      const rect = JSON.parse(sr);
      return {
        left: rect.left - offset.left,
        top: rect.top - offset.top,
        width: rect.width,
        height: rect.height,
      };
    });
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
