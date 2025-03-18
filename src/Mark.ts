export interface Mark {
  uuid: string;
  draw: Function;
  bind: Function;
  unbind: Function;
  dispatch: Function;
  getBoundingClientRect: Function;
}
