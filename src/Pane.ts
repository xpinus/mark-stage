import type { PROXY_EVENTS } from '@/util/event.ts';
import { Mark } from './Mark';

/**
 * @description A pane with all the annotations rendered on it
 */
export default abstract class Pane {
  $pane: unknown;
  marks: Map<string, Mark> = new Map();

  constructor() {}

  /**
   * 将$pane挂载在容器内
   * @param container
   */
  mount(container: HTMLElement) {
    if (!this.$pane) {
      throw new Error('not found $pane');
    }

    const containerPosition = window.getComputedStyle(container, null).position;
    // Pane会通过position: absolute将自己覆盖在target之上产生重叠，因此需要对container的position进行约束
    if (containerPosition === 'static' || !containerPosition) {
      container.style.position = 'relative';
    }

    container.appendChild(this.$pane as any);
  }

  /**
   * 渲染所有的mark
   */
  render() {
    for (const mark of this.marks.values()) {
      mark.draw();
    }
  }

  /**
   * 添加新的mark
   */
  add(mark: Mark) {
    this.marks.set(mark.uuid, mark);
    mark.bind(this);
    mark.draw();

    return mark;
  }

  /**
   * 根据id移除标记
   * @param uuid
   */
  remove(uuid: string) {
    if (!this.marks.has(uuid)) {
      console.warn(`cancel remove mark, ${uuid} not found.`);
      return;
    }

    const mark = this.marks.get(uuid)!;
    mark.unbind();
    this.marks.delete(uuid);
  }

  /**
   * 清空所有标记
   */
  clear() {
    this.marks.forEach((mark) => {
      this.remove(mark.uuid);
    });
    this.marks = new Map();
  }

  /**
   * 销毁画布
   */
  abstract destroy(): void;

  /**
   * 添加事件
   */
  abstract addEventListener(
    eventName: PROXY_EVENTS,
    callback: (e: MouseEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
}
