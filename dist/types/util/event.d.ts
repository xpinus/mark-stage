import type Stage from '../stage';
import type Annotation from '../marks/mark';
export declare enum PROXY_EVENTS {
    click = "click",
    mousedown = "mousedown",
    mouseup = "mouseup",
    touchstart = "touchstart"
}
/**
 * @description 将target的事件代理到stage的annotation上
 */
export default class ProxyMouseEvent {
    source: HTMLElement | Document;
    stage: Stage;
    constructor(stage: Stage);
    dispatch(e: PointerEvent): void;
    /**
     * @description Check if the Annotation contains the point denoted by the passed coordinates
     */
    contains(annot: Annotation, x: number, y: number): boolean;
    /**
     * @description Clone a mouse event object.
     */
    clone(e: PointerEvent): MouseEvent;
    on(eventName: PROXY_EVENTS, callback: (e: MouseEvent) => void, options?: boolean | AddEventListenerOptions): void;
}
