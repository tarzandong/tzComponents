import { defineComponent as k, ref as d, onMounted as b, watch as H, nextTick as N, openBlock as g, createElementBlock as h, createElementVNode as V, normalizeClass as E, normalizeStyle as z, Fragment as F, renderList as S, renderSlot as O, createTextVNode as P, toDisplayString as $ } from "vue";
const j = { id: "p" }, A = ["id"], M = {
  name: "DNDList"
}, W = /* @__PURE__ */ k({
  ...M,
  props: {
    wrapClass: {},
    itemClass: {},
    direction: {},
    itemId: {},
    list: {}
  },
  emits: ["change"],
  setup(i, { expose: a, emit: c }) {
    const o = i, l = d([...o.list]);
    let u = d(0);
    const f = { from: 0, to: 0 }, I = d(l.value[0]), r = [];
    function L(e) {
      x(), r.some((s, t) => s.x == e.srcElement.offsetLeft && s.y == e.srcElement.offsetTop ? (u.value = t, p.value = t, I.value = l.value[t], f.from = t, !0) : !1);
    }
    const p = d(0);
    let n, m, y;
    b(() => {
      n = document.getElementById("p"), m = n.style.width, y = n.style.height, window.onresize = () => {
        n = document.getElementById("p"), m = n.style.width, y = n.style.height;
      };
    });
    function x() {
      n.style.height = n.offsetHeight + "px", n.style.width = n.offsetWidth + "px", r.splice(0);
      for (let e = l.value.length; e > 0; e--) {
        const s = l.value[e - 1], t = document.getElementById(o.itemId ? s[o.itemId] : s);
        r.unshift({ x: t.offsetLeft, y: t.offsetTop }), t.style.left = t.offsetLeft + "px", t.style.top = t.offsetTop + "px", t.style.position = "fixed";
      }
    }
    function v() {
      l.value.forEach((e) => {
        const s = document.getElementById(o.itemId ? e[o.itemId] : e);
        s.style.position = "static";
      }), n.style.width = m, n.style.height = y;
    }
    H(() => p.value, (e) => {
      u.value != e && (v(), l.value.splice(u.value, 1), l.value.splice(e, 0, I.value), u.value = e, f.to = e, N(x));
    });
    function B(e) {
      e.preventDefault();
      for (let s = r.length; s--; s > 0) {
        const t = r[s + 1], w = r[s];
        if (e.x > w.x && e.y > w.y && (o.direction === "column" ? !t || e.y < t.y : !t || e.x < t.x)) {
          p.value = s;
          break;
        }
      }
    }
    function C(e) {
      e.preventDefault(), v(), c("change", l.value, f);
    }
    function T() {
      console.log("restore"), l.value = [...o.list], setTimeout(() => {
        for (let e = l.value.length; e > 0; e--) {
          const s = l.value[e - 1], t = document.getElementById(o.itemId ? s[o.itemId] : s);
          t.style.left = "auto", t.style.top = "auto", r.unshift({ x: t.offsetLeft, y: t.offsetTop });
        }
      }, 200);
    }
    return a({ restore: T }), (e, s) => (g(), h("div", j, [
      V("div", {
        class: E([o.wrapClass ?? "", "wrapClass"]),
        draggable: "true",
        onDragover: B,
        onDrop: C,
        style: z({ "flex-direction": e.$props.direction ?? "row" })
      }, [
        (g(!0), h(F, null, S(l.value, (t) => (g(), h("div", {
          id: o.itemId ? t[o.itemId] : t,
          key: o.itemId ? t[o.itemId] : t,
          draggable: "true",
          class: E(["trp", o.itemClass ?? ""]),
          onDragstart: L,
          onDragend: v
        }, [
          O(e.$slots, "default", { item: t }, () => [
            P($(t), 1)
          ], !0)
        ], 42, A))), 128))
      ], 38)
    ]));
  }
});
const q = (i, a) => {
  const c = i.__vccOpts || i;
  for (const [o, l] of a)
    c[o] = l;
  return c;
}, G = /* @__PURE__ */ q(W, [["__scopeId", "data-v-00eedcff"]]);
let J = [G];
const D = (i) => {
  J.map((a) => {
    i.component(a.name, a);
  });
};
let _ = window;
typeof _ < "u" && _.Vue && D(_.Vue);
const Q = { install: D };
export {
  Q as default
};
