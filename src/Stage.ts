import Pane from './Pane';
import { Mark } from './Mark';
import { coords, setCoords } from './util/coordinate';
import ProxyMouseEvent from './util/event';

import SvgPane from './panes/svg/SvgPane';

const supportedPanes = ['svg'] as const;

type PnaeType = (typeof supportedPanes)[number];

/**
 * @param container 插入画布的容器，默认值 document.body
 * @param pane 画布类型
 */
type StageOption = {
  container?: HTMLElement;
  pane?: PnaeType;
};

export class Stage {
  pane: Pane;
  target: HTMLElement;
  container: HTMLElement;
  event: ProxyMouseEvent;

  constructor(target: HTMLElement, option?: StageOption) {
    this.target = target;
    this.container = option?.container || target.parentElement || document.body;
    this.pane = this.createPane(option?.pane || 'svg');

    this.pane.mount(this.container);

    // Set up mouse event proxying between the target element and the marks
    this.event = new ProxyMouseEvent(this);

    this.render();
  }

  createPane(type: PnaeType): Pane {
    switch (type) {
      case 'svg':
        return new SvgPane();
      default:
        // eslint-disable-next-line no-case-declarations
        const unSupport: never = type;
        throw new Error(`unknown pane: ${unSupport}, pane must be ${supportedPanes.join(' | ')}`);
    }
  }

  render() {
    setCoords(this.pane.$pane as unknown as HTMLElement, coords(this.target, this.container));

    this.pane.render();
  }

  add(mark: Mark) {
    this.pane.add(mark);
  }

  remove(uuid: string) {
    this.pane.remove(uuid);
  }

  clear() {
    this.pane.clear();
  }

  destroy() {
    this.pane.destroy();
  }
}
