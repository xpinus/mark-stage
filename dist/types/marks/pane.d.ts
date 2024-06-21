/**
 * @description A pane with all the annotations rendered on it
 */
export default class Pane {
    $pane: SVGSVGElement;
    constructor();
    mount(container: HTMLElement): void;
    group(): SVGElement;
    createElement(name: string): SVGElement;
}
