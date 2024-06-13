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
class n {
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
      let n, s;
      if (
        (t instanceof TouchEvent ? ((n = t.touches[0].clientX), (s = t.touches[0].clientY)) : ((n = t.clientX), (s = t.clientY)),
        this.contains(e, n, s))
      ) {
        e.$group.dispatchEvent(this.clone(t));
        break;
      }
    }
  }
  contains(t, e, n) {
    const s = t.$group.getBoundingClientRect(),
      i = s.top,
      r = s.left,
      o = i + s.height,
      a = r + s.width;
    return i <= n && r <= e && o > n && a > e;
  }
  clone(t) {
    const e = Object.assign({}, t, { bubbles: !0 });
    try {
      return new PointerEvent(t.type, e);
    } catch (n) {
      const s = document.createEvent('MouseEvents');
      return (
        s.initMouseEvent(
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
        s
      );
    }
  }
  on(t, e, n = !1) {
    this.stage.pane.$pane.addEventListener(t, (t) => e(t), n);
  }
}
class s {
  constructor(e, s = document.body) {
    (this.annotations = new Map()),
      (this.target = e),
      (this.container = s),
      (this.pane = new t()),
      this.pane.mount(this.container),
      (this.event = new n(this)),
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
        const n = e.getBoundingClientRect(),
          s = t.getBoundingClientRect();
        return { top: s.top - n.top, left: s.left - n.left, height: t.scrollHeight, width: t.scrollWidth };
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
  clear() {
    this.annotations.forEach((t) => {
      this.remove(t.uuid);
    });
  }
}
class i {
  constructor({ uuid: t, range: e, classList: n = [] }) {
    (this.$group = null),
      (this.pane = null),
      (this.uuid =
        t ||
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
          const e = (16 * Math.random()) | 0;
          return ('x' == t ? e : (3 & e) | 8).toString(16);
        })),
      (this.range = e),
      (this.classList = n);
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
class r extends i {
  constructor(t) {
    super(t);
  }
  render() {
    if (!this.$group || !this.pane) return;
    this.empty();
    const t = this.$group.ownerDocument.createDocumentFragment(),
      e = this.filteredRanges(),
      n = this.$group.getBoundingClientRect();
    for (let s = 0, i = e.length; s < i; s++) {
      const i = e[s],
        r = this.pane.createElement('rect');
      r.setAttribute('x', i.left - n.left + ''),
        r.setAttribute('y', i.top - n.top + ''),
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
}
class o extends i {
  constructor(t) {
    super(t);
  }
  render() {
    if (!this.$group || !this.pane) return;
    this.empty();
    const t = this.$group.ownerDocument.createDocumentFragment(),
      e = this.filteredRanges(),
      n = this.$group.getBoundingClientRect();
    for (let s = 0, i = e.length; s < i; s++) {
      const i = e[s],
        r = this.pane.createElement('rect');
      r.setAttribute('x', i.left - n.left + ''),
        r.setAttribute('y', i.top - n.top + ''),
        r.setAttribute('height', i.height),
        r.setAttribute('width', i.width),
        r.setAttribute('fill', 'none'),
        t.appendChild(r);
      const o = this.pane.createElement('line');
      o.setAttribute('x1', i.left - n.left + ''),
        o.setAttribute('y1', i.top - n.top + i.height - 1 + ''),
        o.setAttribute('x2', i.left - n.left + i.width),
        o.setAttribute('y2', i.top - n.top + i.height - 1 + ''),
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
}
export { r as Highlight, s as MarkStage, o as Underline };
