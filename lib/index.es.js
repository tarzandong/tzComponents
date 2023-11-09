var z = Object.defineProperty;
var F = (d, i, o) => i in d ? z(d, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : d[i] = o;
var h = (d, i, o) => (F(d, typeof i != "symbol" ? i + "" : i, o), o);
import { defineComponent as b, ref as u, onMounted as L, watch as $, nextTick as S, openBlock as y, createElementBlock as m, createElementVNode as V, normalizeClass as D, normalizeStyle as C, Fragment as O, renderList as j, renderSlot as B, createTextVNode as A, toDisplayString as M } from "vue";
const q = { id: "p" }, G = ["id"], J = {
  name: "DNDList"
}, K = /* @__PURE__ */ b({
  ...J,
  props: {
    wrapClass: {},
    itemClass: {},
    direction: {},
    itemId: {},
    list: {}
  },
  emits: ["change"],
  setup(d, { expose: i, emit: o }) {
    const s = d, n = u([...s.list]);
    let r = u(0);
    const c = { from: 0, to: 0 }, _ = u(n.value[0]), f = [];
    function H(t) {
      I(), f.some((l, e) => l.x == t.srcElement.offsetLeft && l.y == t.srcElement.offsetTop ? (r.value = e, g.value = e, _.value = n.value[e], c.from = e, !0) : !1);
    }
    const g = u(0);
    let a, v, E;
    L(() => {
      a = document.getElementById("p"), v = a.style.width, E = a.style.height, window.onresize = () => {
        a = document.getElementById("p"), v = a.style.width, E = a.style.height;
      };
    });
    function I() {
      a.style.height = a.offsetHeight + "px", a.style.width = a.offsetWidth + "px", f.splice(0);
      for (let t = n.value.length; t > 0; t--) {
        const l = n.value[t - 1], e = document.getElementById(s.itemId ? l[s.itemId] : l);
        f.unshift({ x: e.offsetLeft, y: e.offsetTop }), e.style.left = e.offsetLeft + "px", e.style.top = e.offsetTop + "px", e.style.position = "fixed";
      }
    }
    function x() {
      n.value.forEach((t) => {
        const l = document.getElementById(s.itemId ? t[s.itemId] : t);
        l.style.position = "static";
      }), a.style.width = v, a.style.height = E;
    }
    $(() => g.value, (t) => {
      r.value != t && (x(), n.value.splice(r.value, 1), n.value.splice(t, 0, _.value), r.value = t, c.to = t, S(I));
    });
    function N(t) {
      t.preventDefault();
      for (let l = f.length; l--; l > 0) {
        const e = f[l + 1], p = f[l];
        if (t.x > p.x && t.y > p.y && (s.direction === "column" ? !e || t.y < e.y : !e || t.x < e.x)) {
          g.value = l;
          break;
        }
      }
    }
    function k(t) {
      t.preventDefault(), x(), o("change", n.value, c);
    }
    function W() {
      console.log("restore"), n.value = [...s.list], setTimeout(() => {
        for (let t = n.value.length; t > 0; t--) {
          const l = n.value[t - 1], e = document.getElementById(s.itemId ? l[s.itemId] : l);
          e.style.left = "auto", e.style.top = "auto", f.unshift({ x: e.offsetLeft, y: e.offsetTop });
        }
      }, 200);
    }
    return i({ restore: W }), (t, l) => (y(), m("div", q, [
      V("div", {
        class: D([s.wrapClass ?? "", "wrapClass"]),
        draggable: "true",
        onDragover: N,
        onDrop: k,
        style: C({ "flex-direction": t.$props.direction ?? "row", display: "flex" })
      }, [
        (y(!0), m(O, null, j(n.value, (e, p) => (y(), m("div", {
          id: s.itemId ? e[s.itemId] : e,
          key: s.itemId ? e[s.itemId] : e + String(p),
          draggable: "true",
          class: D(["trp", s.itemClass ?? ""]),
          onDragstart: H,
          onDragend: x
        }, [
          B(t.$slots, "default", { item: e }, () => [
            A(M(e), 1)
          ], !0)
        ], 42, G))), 128))
      ], 38)
    ]));
  }
});
const Q = (d, i) => {
  const o = d.__vccOpts || d;
  for (const [s, n] of i)
    o[s] = n;
  return o;
}, R = /* @__PURE__ */ Q(K, [["__scopeId", "data-v-e0d2e348"]]);
class U {
  constructor(i, o, s) {
    h(this, "ent");
    h(this, "handle");
    h(this, "left");
    h(this, "top");
    h(this, "dx");
    h(this, "dy");
    h(this, "newEle");
    h(this, "start");
    h(this, "end");
    h(this, "over");
    this.ent = document.getElementById(o), this.handle = document.getElementById(i);
    const n = this.ent.parentElement;
    this.ent.style.zIndex = "10", this.left = this.ent.offsetLeft, this.top = this.ent.offsetTop, this.ent.style.left = this.left + "px", this.ent.style.top = this.top + "px", this.dx = 0, this.dy = 0, this.newEle = document.createElement("div"), this.newEle.style.width = "100vw", this.newEle.style.height = "100vh", this.newEle.style.position = "fixed", this.newEle.style.zIndex = "1", this.newEle.style.left = "0", this.newEle.style.top = "0", this.newEle.draggable = !0, this.newEle.style.opacity = "0", this.handle.addEventListener("mousedown", () => {
      this.ent.style.position = "fixed", document.getElementsByTagName("body")[0].appendChild(this.newEle), n == null || n.removeChild(this.ent), this.newEle.appendChild(this.ent), this.newEle.addEventListener("dragover", this.over), this.ent.draggable = !0, this.ent.addEventListener("dragstart", this.start), this.ent.addEventListener("dragend", this.end), s && s("drag-start", { x: this.left, y: this.top });
    }), this.start = (r) => {
      this.dx = r.x - this.left, this.dy = r.y - this.top;
    }, this.end = (r) => {
      this.left = r.x - this.dx, this.top = r.y - this.dy, this.left > document.body.clientWidth - this.ent.offsetWidth && (this.left = document.body.clientWidth - this.ent.offsetWidth), this.top > document.body.clientHeight - this.ent.offsetHeight && (this.top = document.body.clientHeight - this.ent.offsetHeight), this.dx = 0, this.dy = 0, this.ent.style.left = this.left + "px", this.ent.style.top = this.top + "px", this.ent.draggable = !1, this.ent.removeEventListener("dragstart", this.start), this.ent.removeEventListener("dragend", this.end);
      const c = document.getElementsByTagName("body")[0];
      this.newEle.removeEventListener("dragover", this.over), this.newEle.removeChild(this.ent), c.removeChild(this.newEle), n == null || n.appendChild(this.ent), s && s("drag-end", { x: this.left, y: this.top });
    }, this.over = (r) => {
      r.preventDefault(), this.left = r.x - this.dx, this.top = r.y - this.dy, this.ent.style.left = this.left + "px", this.ent.style.top = this.top + "px";
    };
  }
}
const X = {
  name: "DNDEle"
}, Y = /* @__PURE__ */ b({
  ...X,
  props: {
    handlerId: {},
    left: {},
    top: {},
    notFixed: { type: Boolean }
  },
  emits: ["drag-start", "drag-end"],
  setup(d, { emit: i }) {
    const o = d;
    return L(() => {
      new U(o.handlerId ? o.handlerId : "main", "main", i);
    }), (s, n) => (y(), m("div", {
      id: "main",
      style: C({ top: o.top ?? "auto", left: o.left ?? "auto", position: o.notFixed ? "static" : "fixed" })
    }, [
      B(s.$slots, "default")
    ], 4));
  }
});
let Z = [R, Y];
const T = (d) => {
  Z.map((i) => {
    d.component(i.name, i);
  });
};
let w = window;
typeof w < "u" && w.Vue && T(w.Vue);
const et = { install: T };
export {
  Y as DNDEle,
  R as DNDList,
  U as DragWindow,
  et as default
};
