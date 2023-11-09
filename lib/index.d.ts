import DNDList from "./dndlist";
import DNDEle from "./dndElement";
import { DragWindow } from "./dndElement";
import { App } from "vue";
import * as componentsTypes from './components';
export type { componentsTypes };
declare const _default: {
    install: (Vue: App<any>) => void;
};
export default _default;
export { DNDList, DNDEle, DragWindow };
