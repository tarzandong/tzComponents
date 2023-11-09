import DNDList from "./dndlist"
import DNDEle from "./dndElement"
import { DragWindow } from "./dndElement";
import {App} from "vue";
import * as componentsTypes from './components'
// import { GlobalComponents } from "vue";
let comps = [DNDList, DNDEle]
const install = (Vue:App) =>{
    comps.map((component:any)=>{
      Vue.component(component.name as string, component);
    })
}
// declare module 'vue' {
//   export interface GlobalComponents {
//     DNDList: typeof DNDList,
//     DNDEle: typeof DNDEle
//   }
// }
let windowObj = window as any
/* 支持使用标签的方式引入 */
if (typeof windowObj !== 'undefined' && windowObj.Vue) {
    install(windowObj.Vue);
}

export type {componentsTypes}
export default {install}
export {DNDList, DNDEle, DragWindow}