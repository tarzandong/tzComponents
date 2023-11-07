import DNDList from "./dndlist";
import DNDEle from "./dndElement";
import { DragWindow } from "./dndElement";
import { App } from "vue";
declare module 'vue' {
    interface GlobalComponents {
        DNDList: typeof DNDList;
        DNDEle: typeof DNDEle;
    }
}
declare const _default: {
    install: (Vue: App<any>) => void;
};
export default _default;
export { DNDList, DNDEle, DragWindow };
