import Annotation from './annotation';

export default class Highlight extends Annotation {
  render() {
    if (!this.wrap || !this.pane) return;

    // Empty element
    while (this.wrap.firstChild) {
      this.wrap.removeChild(this.wrap.firstChild);
    }

    const fragment = this.wrap.ownerDocument.createDocumentFragment();
    const filtered = this.filteredRanges();
    const offset = this.wrap.getBoundingClientRect();
    // const container = this.container.getBoundingClientRect();

    console.log(filtered, offset);

    for (let i = 0, len = filtered.length; i < len; i++) {
      const r = filtered[i];
      const el = this.pane.createElement('rect');
      el.setAttribute('x', r.left - offset.left + '');
      el.setAttribute('y', r.top - offset.top + '');
      el.setAttribute('height', r.height);
      el.setAttribute('width', r.width);
      fragment.appendChild(el);
    }

    this.wrap.appendChild(fragment);
  }
}
