type Coordinate = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/**
 * 获取el相对于container的偏移，以及自身的宽高
 * @param el
 * @param container
 * @returns
 */
export function coords(el: HTMLElement, container: HTMLElement): Coordinate {
  const offset = container.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top - offset.top,
    left: rect.left - offset.left,
    height: el.scrollHeight,
    width: el.scrollWidth,
  };
}

/**
 * 设置el的偏移和宽高
 * @param el
 * @param coords
 */
export function setCoords(el: HTMLElement, coords: Coordinate) {
  console.log(el);

  el.style.setProperty('top', `${coords.top}px`, 'important');
  el.style.setProperty('left', `${coords.left}px`, 'important');
  el.style.setProperty('height', `${coords.height}px`, 'important');
  el.style.setProperty('width', `${coords.width}px`, 'important');
}
