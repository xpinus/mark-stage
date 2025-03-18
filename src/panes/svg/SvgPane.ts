import BasePane from '@/Pane';
import type { PROXY_EVENTS } from '@/util/event.ts';

export default class SvgPane extends BasePane {
  $pane: SVGSVGElement;

  constructor() {
    super();

    const svg = this.createElement('svg') as SVGSVGElement;
    // Match the coordinates of the target element
    svg.style.position = 'absolute';
    // Disable pointer events
    svg.setAttribute('pointer-events', 'none');
    this.$pane = svg;
  }

  destroy(): void {
    this.clear();
    this.$pane.remove();
  }

  group() {
    const g = this.createElement('g');
    return g;
  }

  createElement(name: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  }

  addEventListener(
    eventName: PROXY_EVENTS,
    callback: (e: MouseEvent) => void,
    options: boolean | AddEventListenerOptions = false,
  ) {
    this.$pane.addEventListener(eventName, (e) => callback(e as MouseEvent), options);
  }
}
