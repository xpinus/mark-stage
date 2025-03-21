import BaseSvgMark from './BaseSvgMark';
import type { MarkOptions } from './BaseSvgMark';
import { DEFAULT_FILL_COLOR } from '@/util/constant';

type UnderlineRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export default class Underline extends BaseSvgMark {
  range: UnderlineRect[] = [];
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
      el.setAttribute('fill', 'none');
      fragment.appendChild(el);

      const line = this.pane.createElement('line');
      line.setAttribute('x1', r.left + '');
      line.setAttribute('y1', r.top + r.height - 1 + '');

      line.setAttribute('x2', r.left + r.width + '');
      line.setAttribute('y2', r.top + r.height - 1 + '');

      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke', `var(--mark-underline-color, ${DEFAULT_FILL_COLOR.Underline})`);
      line.setAttribute('stroke-linecap', 'square');

      try {
        line.classList.add(...this.classList);
      } catch (e) {
        console.error(e);
      }

      if (this.style) {
        line.setAttribute('style', this.style);
      }

      fragment.appendChild(line);
    }

    this.$group.appendChild(fragment);
  }
}
