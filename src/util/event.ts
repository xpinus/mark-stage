import type Stage from '../stage';
import type Mark from '../marks/mark';

export enum PROXY_EVENTS {
  click = 'click',
  mousedown = 'mousedown',
  mouseup = 'mouseup',
  touchstart = 'touchstart',
}

/**
 * @description 将target的事件代理到stage的annotation上
 */
export default class ProxyMouseEvent {
  source: HTMLElement | Document;
  stage: Stage;

  constructor(stage: Stage) {
    this.source = stage.target;
    this.stage = stage;

    if (this.source.nodeName.toLowerCase() === 'iframe') {
      try {
        // Try to get the contents if same domain
        this.source = (this.source as HTMLIFrameElement).contentDocument!;
      } catch (err) {
        this.source = stage.target;
      }
    }
    console.log(this.source);

    for (const ev in PROXY_EVENTS) {
      console.log(ev);

      this.source.addEventListener(ev, (e) => this.dispatch(e as PointerEvent));
    }
  }

  dispatch(e: PointerEvent) {
    for (const mark of this.stage.marks.values()) {
      let x, y;
      if (e instanceof TouchEvent) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      if (!this.contains(mark, x, y)) {
        continue;
      }

      console.log('dispatch', x, y, mark.$group!.getBoundingClientRect());

      // The event targets this mark, so dispatch a cloned event:
      mark.$group!.dispatchEvent(this.clone(e));
      // We only dispatch the cloned event to the first matching mark.
      break;
    }
  }

  /**
   * @description Check if the Mark contains the point denoted by the passed coordinates
   */
  contains(mark: Mark, x: number, y: number) {
    const rect = mark.$group!.getBoundingClientRect();

    const top = rect.top;
    const left = rect.left;
    const bottom = top + rect.height;
    const right = left + rect.width;
    return top <= y && left <= x && bottom > y && right > x;
  }

  /**
   * @description Clone a mouse event object.
   */
  clone(e: PointerEvent) {
    const opts = Object.assign({}, e, { bubbles: true });
    try {
      return new PointerEvent(e.type, opts);
    } catch (err) {
      // compat: webkit
      const copy = document.createEvent('MouseEvents');
      copy.initMouseEvent(
        e.type,
        false,
        opts.cancelable,
        opts.view!,
        opts.detail,
        opts.screenX,
        opts.screenY,
        opts.clientX,
        opts.clientY,
        opts.ctrlKey,
        opts.altKey,
        opts.shiftKey,
        opts.metaKey,
        opts.button,
        opts.relatedTarget,
      );
      return copy;
    }
  }

  on(eventName: PROXY_EVENTS, callback: (e: MouseEvent) => void, options: boolean | AddEventListenerOptions = false) {
    this.stage.pane.$pane.addEventListener(eventName, (e) => callback(e as MouseEvent), options);
  }
}
