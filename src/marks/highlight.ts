import Mark from './mark';
import type { MarkOptions } from './mark';

const DEFAULT_FILL_COLOR = 'rgba(0,0,0,.3)';

export default class Highlight extends Mark {
  constructor(options: MarkOptions) {
    super(options);
  }

  render() {
    if (!this.$group || !this.pane) return;

    this.empty();

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
      el.setAttribute('fill', DEFAULT_FILL_COLOR);
      try {
        el.classList.add(...this.classList);
      } catch (e) {
        console.error(e);
      }
      fragment.appendChild(el);
    }

    this.$group.appendChild(fragment);
  }
}
