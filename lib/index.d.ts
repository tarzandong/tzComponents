import DNDList from "./dndlist";
import { App } from "vue";
declare module 'vue' {
    interface GlobalComponents {
        DNDList: typeof DNDList;
    }
}
declare const _default: {
    install: (Vue: App<any>) => void;
};
export default _default;
export { DNDList };
