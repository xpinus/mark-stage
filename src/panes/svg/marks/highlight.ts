import BaseSvgMark from './BaseSvgMark';
import type { MarkOptions } from './BaseSvgMark';

const DEFAULT_FILL_COLOR = '#DCCD7980';

export default class Highlight extends BaseSvgMark {
  constructor(options: MarkOptions) {
    super(options);
  }

  draw() {
    if (!this.$group || !this.pane) return;

    this._empty();

    const fragment = this.$group.ownerDocument.createDocumentFragment();
    const filtered = this.filteredRanges();
    const offset = this.$group.getBoundingClientRect();

    for (let i = 0, len = filtered.length; i < len; i++) {
      const r = filtered[i];
      const el = this.pane.createElement('rect');
      el.setAttribute('x', r.left - offset.left + '');
      el.setAttribute('y', r.top - offset.top + '');
      el.setAttribute('height', r.height);
      el.setAttribute('width', r.width);
      el.setAttribute('fill', `var(--mark-highlight-color, ${DEFAULT_FILL_COLOR})`);
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
