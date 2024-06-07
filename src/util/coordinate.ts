type Coordinate = {
  top: number;
  left: number;
  width: number;
  height: number;
};

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

export function setCoords(el: HTMLElement, coords: Coordinate) {
  console.log(el);

  el.style.setProperty('top', `${coords.top}px`, 'important');
  el.style.setProperty('left', `${coords.left}px`, 'important');
  el.style.setProperty('height', `${coords.height}px`, 'important');
  el.style.setProperty('width', `${coords.width}px`, 'important');
}
