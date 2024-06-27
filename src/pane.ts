/**
 * @description A pane with all the annotations rendered on it
 */
export default class Pane {
  $pane: SVGSVGElement;

  constructor() {
    const svg = this.createElement('svg') as SVGSVGElement;
    // Match the coordinates of the target element
    svg.style.position = 'absolute';
    // Disable pointer events
    svg.setAttribute('pointer-events', 'none');
    this.$pane = svg;
  }

  mount(container: HTMLElement) {
    const containerPosition = window.getComputedStyle(container, null).position;
    if (containerPosition === 'static' || !containerPosition) {
      container.style.position = 'relative';
    }

    container.appendChild(this.$pane);
  }

  group() {
    const g = this.createElement('g');
    return g;
  }

  createElement(name: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  }
}
