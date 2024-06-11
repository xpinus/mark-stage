import Annotation from './annotation';
import type { AnnotationOptions } from './annotation';

const DEFAULT_FILL_COLOR = '#FED900';

export default class Underline extends Annotation {
  constructor(options: AnnotationOptions) {
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
      el.setAttribute('fill', 'none');
      fragment.appendChild(el);

      const line = this.pane.createElement('line');
      line.setAttribute('x1', r.left - offset.left + '');
      line.setAttribute('y1', r.top - offset.top + r.height - 1 + '');

      line.setAttribute('x2', r.left - offset.left + r.width);
      line.setAttribute('y2', r.top - offset.top + r.height - 1 + '');

      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke', DEFAULT_FILL_COLOR);
      line.setAttribute('stroke-linecap', 'square');

      try {
        line.classList.add(...this.classList);
      } catch (e) {
        console.error(e);
      }

      fragment.appendChild(line);
    }

    this.$group.appendChild(fragment);
  }
}
