type Coordinate = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export declare function coords(el: HTMLElement, container: HTMLElement): Coordinate;
export declare function setCoords(el: HTMLElement, coords: Coordinate): void;
export {};
