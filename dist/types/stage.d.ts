import Pane from './marks/pane';
import ProxyMouseEvent from './util/event';
import type Annotation from './marks/mark';
declare class Stage {
    pane: Pane;
    annotations: Map<string, Annotation>;
    target: HTMLElement;
    container: HTMLElement;
    event: ProxyMouseEvent;
    constructor(target: HTMLElement, container?: HTMLElement);
    render(): void;
    add(annot: Annotation): Annotation;
    remove(uuid: string): void;
    clear(): void;
}
export default Stage;
