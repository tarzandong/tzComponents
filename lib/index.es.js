var z = Object.defineProperty;
var F = (l, i, d) => i in l ? z(l, i, { enumerable: !0, configurable: !0, writable: !0, value: d }) : l[i] = d;
var h = (l, i, d) => (F(l, typeof i != "symbol" ? i + "" : i, d), d);
import { defineComponent as D, ref as c, onMounted as L, watch as $, nextTick as V, openBlock as p, createElementBlock as u, createElementVNode as S, normalizeClass as b, normalizeStyle as C, Fragment as O, renderList as j, renderSlot as B, createTextVNode as A, toDisplayString as M } from "vue";
const q = { id: "p" }, G = ["id"], J = {
  name: "DNDList"
}, K = /* @__PURE__ */ D({
  ...J,
  props: {
    wrapClass: {},
    itemClass: {},
    direction: {},
    itemId: {},
    list: {}
  },
  emits: ["change"],
  setup(l, { expose: i, emit: d }) {
    const s = l, n = c([...s.list]);
    let f = c(0);
    const y = { from: 0, to: 0 }, w = c(n.value[0]), a = [];
    function H(t) {
      _(), a.some((o, e) => o.x == t.srcElement.offsetLeft && o.y == t.srcElement.offsetTop ? (f.value = e, m.value = e, w.value = n.value[e], y.from = e, !0) : !1);
    }
    const m = c(0);
    let r, v, g;
    L(() => {
      r = document.getElementById("p"), v = r.style.width, g = r.style.height, window.onresize = () => {
        r = document.getElementById("p"), v = r.style.width, g = r.style.height;
      };
    });
    function _() {
      r.style.height = r.offsetHeight + "px", r.style.width = r.offsetWidth + "px", a.splice(0);
      for (let t = n.value.length; t > 0; t--) {
        const o = n.value[t - 1], e = document.getElementById(s.itemId ? o[s.itemId] : o);
        a.unshift({ x: e.offsetLeft, y: e.offsetTop }), e.style.left = e.offsetLeft + "px", e.style.top = e.offsetTop + "px", e.style.position = "fixed";
      }
    }
    function E() {
      n.value.forEach((t) => {
        const o = document.getElementById(s.itemId ? t[s.itemId] : t);
        o.style.position = "static";
      }), r.style.width = v, r.style.height = g;
    }
    $(() => m.value, (t) => {
      f.value != t && (E(), n.value.splice(f.value, 1), n.value.splice(t, 0, w.value), f.value = t, y.to = t, V(_));
    });
    function N(t) {
      t.preventDefault();
      for (let o = a.length; o--; o > 0) {
        const e = a[o + 1], I = a[o];
        if (t.x > I.x && t.y > I.y && (s.direction === "column" ? !e || t.y < e.y : !e || t.x < e.x)) {
          m.value = o;
          break;
        }
      }
    }
    function k(t) {
      t.preventDefault(), E(), d("change", n.value, y);
    }
    function W() {
      console.log("restore"), n.value = [...s.list], setTimeout(() => {
        for (let t = n.value.length; t > 0; t--) {
          const o = n.value[t - 1], e = document.getElementById(s.itemId ? o[s.itemId] : o);
          e.style.left = "auto", e.style.top = "auto", a.unshift({ x: e.offsetLeft, y: e.offsetTop });
        }
      }, 200);
    }
    return i({ restore: W }), (t, o) => (p(), u("div", q, [
      S("div", {
        class: b([s.wrapClass ?? "", "wrapClass"]),
        draggable: "true",
        onDragover: N,
        onDrop: k,
        style: C({ "flex-direction": t.$props.direction ?? "row", display: "flex" })
      }, [
        (p(!0), u(O, null, j(n.value, (e) => (p(), u("div", {
          id: s.itemId ? e[s.itemId] : e,
          key: s.itemId ? e[s.itemId] : e,
          draggable: "true",
          class: b(["trp", s.itemClass ?? ""]),
          onDragstart: H,
          onDragend: E
        }, [
          B(t.$slots, "default", { item: e }, () => [
            A(M(e), 1)
          ], !0)
        ], 42, G))), 128))
      ], 38)
    ]));
  }
});
const Q = (l, i) => {
  const d = l.__vccOpts || l;
  for (const [s, n] of i)
    d[s] = n;
  return d;
}, R = /* @__PURE__ */ Q(K, [["__scopeId", "data-v-fbf2dd46"]]);
class U {
  constructor(i, d) {
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
    this.ent = document.getElementById(d), this.handle = document.getElementById(i);
    const s = this.ent.parentElement;
    this.ent.style.zIndex = "10", this.left = this.ent.offsetLeft, this.top = this.ent.offsetTop, this.ent.style.left = this.left + "px", this.ent.style.top = this.top + "px", this.dx = 0, this.dy = 0, this.newEle = document.createElement("div"), this.newEle.style.width = "100vw", this.newEle.style.height = "100vh", this.newEle.style.position = "fixed", this.newEle.style.zIndex = "1", this.newEle.style.left = "0", this.newEle.style.top = "0", this.newEle.draggable = !0, this.newEle.style.opacity = "0", this.handle.addEventListener("mousedown", () => {
      console.log("handle"), this.ent.style.position = "fixed", document.getElementsByTagName("body")[0].appendChild(this.newEle), s == null || s.removeChild(this.ent), this.newEle.appendChild(this.ent), this.newEle.addEventListener("dragover", this.over), this.ent.draggable = !0, this.ent.addEventListener("dragstart", this.start), this.ent.addEventListener("dragend", this.end);
    }), this.start = (n) => {
      this.dx = n.x - this.left, this.dy = n.y - this.top;
    }, this.end = (n) => {
      this.left = n.x - this.dx, this.top = n.y - this.dy, this.left > document.body.clientWidth - this.ent.offsetWidth && (this.left = document.body.clientWidth - this.ent.offsetWidth), this.top > document.body.clientHeight - this.ent.offsetHeight && (this.top = document.body.clientHeight - this.ent.offsetHeight), this.dx = 0, this.dy = 0, this.ent.style.left = this.left + "px", this.ent.style.top = this.top + "px", console.log(this.ent.style.top), this.ent.draggable = !1, this.ent.removeEventListener("dragstart", this.start), this.ent.removeEventListener("dragend", this.end);
      const f = document.getElementsByTagName("body")[0];
      this.newEle.removeEventListener("dragover", this.over), this.newEle.removeChild(this.ent), f.removeChild(this.newEle), s == null || s.appendChild(this.ent);
    }, this.over = (n) => {
      n.preventDefault(), this.left = n.x - this.dx, this.top = n.y - this.dy, this.ent.style.left = this.left + "px", this.ent.style.top = this.top + "px";
    };
  }
}
const X = {
  name: "DNDEle"
}, Y = /* @__PURE__ */ D({
  ...X,
  props: {
    handlerId: {},
    left: {},
    top: {},
    notFixed: { type: Boolean }
  },
  setup(l) {
    const i = l;
    return L(() => {
      new U(i.handlerId ? i.handlerId : "main", "main");
    }), (d, s) => (p(), u("div", {
      id: "main",
      style: C({ top: i.top ?? "auto", left: i.left ?? "auto", position: i.notFixed ? "static" : "fixed" })
    }, [
      B(d.$slots, "default")
    ], 4));
  }
});
let Z = [R, Y];
const T = (l) => {
  Z.map((i) => {
    l.component(i.name, i);
  });
};
let x = window;
typeof x < "u" && x.Vue && T(x.Vue);
const et = { install: T };
export {
  Y as DNDEle,
  R as DNDList,
  U as DragWindow,
  et as default
};
