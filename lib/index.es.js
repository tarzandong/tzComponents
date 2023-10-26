import { defineComponent as T, ref as d, onMounted as k, watch as b, nextTick as H, openBlock as v, createElementBlock as y, createElementVNode as N, normalizeClass as w, normalizeStyle as V, Fragment as z, renderList as F, renderSlot as S, createTextVNode as O, toDisplayString as P } from "vue";
const $ = { id: "p" }, j = ["id"], A = {
  name: "DNDList"
}, M = /* @__PURE__ */ T({
  ...A,
  props: {
    wrapClass: {},
    itemClass: {},
    direction: {},
    itemId: {},
    list: {}
  },
  emits: ["change"],
  setup(r, { expose: a, emit: c }) {
    const o = r, l = d([...o.list]);
    let u = d(0);
    const h = d(l.value[0]), i = [];
    function D(e) {
      _(), i.some((s, t) => s.x == e.srcElement.offsetLeft && s.y == e.srcElement.offsetTop ? (u.value = t, f.value = t, h.value = l.value[t], !0) : !1);
    }
    const f = d(0);
    let n, p, m;
    k(() => {
      n = document.getElementById("p"), p = n.style.width, m = n.style.height, window.onresize = () => {
        n = document.getElementById("p"), p = n.style.width, m = n.style.height;
      };
    });
    function _() {
      n.style.height = n.offsetHeight + "px", n.style.width = n.offsetWidth + "px", i.splice(0);
      for (let e = l.value.length; e > 0; e--) {
        const s = l.value[e - 1], t = document.getElementById(o.itemId ? s[o.itemId] : s);
        i.unshift({ x: t.offsetLeft, y: t.offsetTop }), t.style.left = t.offsetLeft + "px", t.style.top = t.offsetTop + "px", t.style.position = "fixed";
      }
    }
    function x() {
      l.value.forEach((e) => {
        const s = document.getElementById(o.itemId ? e[o.itemId] : e);
        s.style.position = "static";
      }), n.style.width = p, n.style.height = m;
    }
    b(() => f.value, (e) => {
      console.log(e, i), u.value != e && (x(), l.value.splice(u.value, 1), l.value.splice(e, 0, h.value), u.value = e, H(_));
    });
    function B(e) {
      e.preventDefault();
      for (let s = i.length; s--; s > 0) {
        const t = i[s + 1], I = i[s];
        if (e.x > I.x && e.y > I.y && (o.direction === "row" ? !t || e.x < t.x : !t || e.y < t.y)) {
          f.value = s;
          break;
        }
      }
    }
    function C(e) {
      e.preventDefault(), x(), c("change", l.value);
    }
    function L() {
      console.log("restore"), l.value = [...o.list], console.log(l.value), setTimeout(() => {
        for (let e = l.value.length; e > 0; e--) {
          const s = l.value[e - 1], t = document.getElementById(o.itemId ? s[o.itemId] : s);
          t.style.left = "auto", t.style.top = "auto", i.unshift({ x: t.offsetLeft, y: t.offsetTop });
        }
      }, 200);
    }
    return a({ restore: L }), (e, s) => (v(), y("div", $, [
      N("div", {
        class: w([o.wrapClass ?? "", "wrapClass"]),
        draggable: "true",
        onDragover: B,
        onDrop: C,
        style: V({ "flex-direction": e.$props.direction ?? "row" })
      }, [
        (v(!0), y(z, null, F(l.value, (t) => (v(), y("div", {
          id: o.itemId ? t[o.itemId] : t,
          key: o.itemId ? t[o.itemId] : t,
          draggable: "true",
          class: w(["trp", o.itemClass ?? ""]),
          onDragstart: D
        }, [
          S(e.$slots, "default", { item: t }, () => [
            O(P(t), 1)
          ], !0)
        ], 42, j))), 128))
      ], 38)
    ]));
  }
});
const W = (r, a) => {
  const c = r.__vccOpts || r;
  for (const [o, l] of a)
    c[o] = l;
  return c;
}, q = /* @__PURE__ */ W(M, [["__scopeId", "data-v-5123fe8a"]]);
let G = [q];
const E = (r) => {
  G.map((a) => {
    r.component(a.name, a);
  });
};
let g = window;
typeof g < "u" && g.Vue && E(g.Vue);
const K = { install: E };
export {
  K as default
};
