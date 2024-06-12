'use strict';
class t {
  constructor() {
    const t = this.createElement('svg');
    (t.style.position = 'absolute'), t.setAttribute('pointer-events', 'none'), (this.$pane = t);
  }
  mount(t) {
    const e = window.getComputedStyle(t, null).position;
    ('static' !== e && e) || (t.style.position = 'relative'), t.appendChild(this.$pane);
  }
  group() {
    return this.createElement('g');
  }
  createElement(t) {
    return document.createElementNS('http://www.w3.org/2000/svg', t);
  }
}
var e;
!(function (t) {
  (t.click = 'click'), (t.mousedown = 'mousedown'), (t.mouseup = 'mouseup'), (t.touchstart = 'touchstart');
})(e || (e = {}));
class s {
  constructor(t) {
    if (((this.source = t.target), (this.stage = t), 'iframe' === this.source.nodeName.toLowerCase()))
      try {
        this.source = this.source.contentDocument;
      } catch (e) {
        this.source = t.target;
      }
    for (const t in e) console.log(t), this.source.addEventListener(t, (t) => this.dispatch(t));
  }
  dispatch(t) {
    for (const e of this.stage.annotations.values()) {
      let s, n;
      if (
        (t instanceof TouchEvent ? ((s = t.touches[0].clientX), (n = t.touches[0].clientY)) : ((s = t.clientX), (n = t.clientY)),
        this.contains(e, s, n))
      ) {
        e.$group.dispatchEvent(this.clone(t));
        break;
      }
    }
  }
  contains(t, e, s) {
    const n = t.$group.getBoundingClientRect(),
      i = n.top,
      r = n.left,
      o = i + n.height,
      a = r + n.width;
    return i <= s && r <= e && o > s && a > e;
  }
  clone(t) {
    const e = Object.assign({}, t, { bubbles: !0 });
    try {
      return new PointerEvent(t.type, e);
    } catch (s) {
      const n = document.createEvent('MouseEvents');
      return (
        n.initMouseEvent(
          t.type,
          !1,
          e.cancelable,
          e.view,
          e.detail,
          e.screenX,
          e.screenY,
          e.clientX,
          e.clientY,
          e.ctrlKey,
          e.altKey,
          e.shiftKey,
          e.metaKey,
          e.button,
          e.relatedTarget,
        ),
        n
      );
    }
  }
  on(t, e, s = !1) {
    this.stage.pane.$pane.addEventListener(t, (t) => e(t), s);
  }
}
class n {
  constructor({ range: t, classList: e = [] }) {
    (this.$group = null),
      (this.pane = null),
      (this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
        const e = (16 * Math.random()) | 0;
        return ('x' == t ? e : (3 & e) | 8).toString(16);
      })),
      (this.range = t),
      (this.classList = e);
  }
  bind(t) {
    this.pane = t;
    const e = this.pane.group();
    e.setAttribute('data-uuid', this.uuid), this.pane.$pane.appendChild(e), (this.$group = e);
  }
  unbind() {
    const t = this.$group;
    return (this.$group = null), t;
  }
  filteredRanges() {
    if (!this.range) return [];
    const t = Array.from(this.range.getClientRects()).map((t) => JSON.stringify(t)),
      e = new Set(t);
    return Array.from(e).map((t) => JSON.parse(t));
  }
  empty() {
    if (this.$group) for (; this.$group.firstChild; ) this.$group.removeChild(this.$group.firstChild);
  }
}
(exports.Highlight = class extends n {
  constructor(t) {
    super(t);
  }
  render() {
    if (!this.$group || !this.pane) return;
    this.empty();
    const t = this.$group.ownerDocument.createDocumentFragment(),
      e = this.filteredRanges(),
      s = this.$group.getBoundingClientRect();
    for (let n = 0, i = e.length; n < i; n++) {
      const i = e[n],
        r = this.pane.createElement('rect');
      r.setAttribute('x', i.left - s.left + ''),
        r.setAttribute('y', i.top - s.top + ''),
        r.setAttribute('height', i.height),
        r.setAttribute('width', i.width),
        r.setAttribute('fill', 'rgba(0,0,0,.3)');
      try {
        r.classList.add(...this.classList);
      } catch (t) {
        console.error(t);
      }
      t.appendChild(r);
    }
    this.$group.appendChild(t);
  }
}),
  (exports.MarkStage = class {
    constructor(e, n = document.body) {
      (this.annotations = new Map()),
        (this.target = e),
        (this.container = n),
        (this.pane = new t()),
        this.pane.mount(this.container),
        (this.event = new s(this)),
        this.render();
    }
    render() {
      !(function (t, e) {
        console.log(t),
          t.style.setProperty('top', `${e.top}px`, 'important'),
          t.style.setProperty('left', `${e.left}px`, 'important'),
          t.style.setProperty('height', `${e.height}px`, 'important'),
          t.style.setProperty('width', `${e.width}px`, 'important');
      })(
        this.pane.$pane,
        (function (t, e) {
          const s = e.getBoundingClientRect(),
            n = t.getBoundingClientRect();
          return { top: n.top - s.top, left: n.left - s.left, height: t.scrollHeight, width: t.scrollWidth };
        })(this.target, this.container),
      );
      for (const t of this.annotations.values()) t.render();
    }
    add(t) {
      return this.annotations.set(t.uuid, t), t.bind(this.pane), t.render(), t;
    }
    remove(t) {
      if (!this.annotations.has(t)) return;
      const e = this.annotations.get(t).unbind();
      e && this.pane.$pane.removeChild(e), this.annotations.delete(t);
    }
  }),
  (exports.Underline = class extends n {
    constructor(t) {
      super(t);
    }
    render() {
      if (!this.$group || !this.pane) return;
      this.empty();
      const t = this.$group.ownerDocument.createDocumentFragment(),
        e = this.filteredRanges(),
        s = this.$group.getBoundingClientRect();
      for (let n = 0, i = e.length; n < i; n++) {
        const i = e[n],
          r = this.pane.createElement('rect');
        r.setAttribute('x', i.left - s.left + ''),
          r.setAttribute('y', i.top - s.top + ''),
          r.setAttribute('height', i.height),
          r.setAttribute('width', i.width),
          r.setAttribute('fill', 'none'),
          t.appendChild(r);
        const o = this.pane.createElement('line');
        o.setAttribute('x1', i.left - s.left + ''),
          o.setAttribute('y1', i.top - s.top + i.height - 1 + ''),
          o.setAttribute('x2', i.left - s.left + i.width),
          o.setAttribute('y2', i.top - s.top + i.height - 1 + ''),
          o.setAttribute('stroke-width', '1'),
          o.setAttribute('stroke', '#FED900'),
          o.setAttribute('stroke-linecap', 'square');
        try {
          o.classList.add(...this.classList);
        } catch (t) {
          console.error(t);
        }
        t.appendChild(o);
      }
      this.$group.appendChild(t);
    }
  });
