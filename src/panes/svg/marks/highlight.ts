import BaseSvgMark from './BaseSvgMark';
import type { MarkOptions } from './BaseSvgMark';
import { DEFAULT_FILL_COLOR } from '@/util/constant';

type HighlightRange = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export default class Highlight extends BaseSvgMark {
  range: HighlightRange[] = [];

  constructor(options: MarkOptions) {
    super(options);
  }

  draw() {
    if (!this.$group || !this.pane) return;

    this._empty();

    const fragment = this.$group.ownerDocument.createDocumentFragment();

    for (let i = 0, len = this.range.length; i < len; i++) {
      const r = this.range[i];
      const el = this.pane.createElement('rect');
      el.setAttribute('x', r.left + '');
      el.setAttribute('y', r.top + '');
      el.setAttribute('height', r.height + '');
      el.setAttribute('width', r.width + '');
      el.setAttribute('fill', `var(--mark-highlight-color, ${DEFAULT_FILL_COLOR.Highlight})`);
      try {
        el.classList.add(...this.classList);
      } catch (e) {
        console.error(e);
      }
      if (this.style) {
        el.setAttribute('style', this.style);
      }
      fragment.appendChild(el);
    }

    this.$group.appendChild(fragment);
  }
}
