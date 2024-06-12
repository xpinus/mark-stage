import type Pane from './pane';
export type MarkOptions = {
  range: Range;
  classList: string[];
};
declare abstract class Mark {
  uuid: string;
  $group: SVGElement | null;
  pane: Pane | null;
  range: Range;
  classList: string[];
  constructor({ range, classList }: MarkOptions);
  abstract render(): void;
  bind(pane: Pane): void;
  unbind(): SVGElement | null;
  filteredRanges(): any[];
  empty(): void;
}
export default Mark;
