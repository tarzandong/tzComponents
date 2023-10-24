import { defineComponent as T, ref as d, onMounted as b, watch as k, nextTick as C, openBlock as y, createElementBlock as h, createElementVNode as H, normalizeClass as N, Fragment as V, renderList as F, renderSlot as z, createTextVNode as O, toDisplayString as P } from "vue";
const S = { id: "p" }, W = ["id"], j = {
  name: "DNDList"
}, A = /* @__PURE__ */ T({
  ...j,
  props: {
    wrapClass: {},
    itemId: {},
    list: {}
  },
  emits: ["change"],
  setup(i, { expose: r, emit: u }) {
    const s = i, l = d([...s.list]);
    let c = d(0);
    const g = d(l.value[0]), a = [];
    function E(t) {
      _(), a.some((o, e) => o.x == t.srcElement.offsetLeft && o.y == t.srcElement.offsetTop ? (c.value = e, f.value = e, g.value = l.value[e], !0) : !1);
    }
    const f = d(0);
    let n, p, m;
    b(() => {
      n = document.getElementById("p"), p = n.style.width, m = n.style.height, window.onresize = () => {
        n = document.getElementById("p"), p = n.style.width, m = n.style.height;
      };
    });
    function _() {
      n.style.height = n.offsetHeight + "px", n.style.width = n.offsetWidth + "px", a.splice(0);
      for (let t = l.value.length; t > 0; t--) {
        const o = l.value[t - 1], e = document.getElementById(s.itemId ? o[s.itemId] : o);
        a.unshift({ x: e.offsetLeft, y: e.offsetTop }), e.style.width = e.offsetWidth + "px", e.style.height = e.offsetHeight + "px", e.style.left = e.offsetLeft + "px", e.style.top = e.offsetTop + "px", e.style.position = "fixed";
      }
    }
    function x() {
      l.value.forEach((t) => {
        const o = document.getElementById(s.itemId ? t[s.itemId] : t);
        o.style.width = "auto", o.style.height = "auto", o.style.position = "static";
      }), n.style.width = p, n.style.height = m;
    }
    k(() => f.value, (t) => {
      console.log(t, a), c.value != t && (x(), l.value.splice(c.value, 1), l.value.splice(t, 0, g.value), c.value = t, C(_));
    });
    function D(t) {
      t.preventDefault();
      for (let o = a.length; o--; o > 0) {
        const e = a[o + 1], I = a[o];
        if (t.x > I.x && t.y > I.y && (!e || t.x < e.x)) {
          f.value = o;
          break;
        }
      }
    }
    function B(t) {
      t.preventDefault(), x(), u("change", l.value);
    }
    function L() {
      console.log("restore"), l.value = [...s.list], console.log(l.value), setTimeout(() => {
        for (let t = l.value.length; t > 0; t--) {
          const o = l.value[t - 1], e = document.getElementById(s.itemId ? o[s.itemId] : o);
          e.style.left = "auto", e.style.top = "auto", a.unshift({ x: e.offsetLeft, y: e.offsetTop });
        }
      }, 200);
    }
    return r({ restore: L }), (t, o) => (y(), h("div", S, [
      H("div", {
        class: N([s.wrapClass, "wrapClass"]),
        draggable: "true",
        onDragover: D,
        onDrop: B,
        style: { gap: "0" }
      }, [
        (y(!0), h(V, null, F(l.value, (e) => (y(), h("div", {
          id: s.itemId ? e[s.itemId] : e,
          key: s.itemId ? e[s.itemId] : e,
          draggable: "true",
          class: "trp",
          onDragstart: E,
          style: { margin: "0" }
        }, [
          z(t.$slots, "default", { item: e }, () => [
            O(P(e), 1)
          ], !0)
        ], 40, W))), 128))
      ], 34)
    ]));
  }
});
const M = (i, r) => {
  const u = i.__vccOpts || i;
  for (const [s, l] of r)
    u[s] = l;
  return u;
}, $ = /* @__PURE__ */ M(A, [["__scopeId", "data-v-646aa57b"]]);
let q = [$];
const w = (i) => {
  q.map((r) => {
    i.component(r.name, r);
  });
};
let v = window;
typeof v < "u" && v.Vue && w(v.Vue);
const J = { install: w };
export {
  J as default
};
