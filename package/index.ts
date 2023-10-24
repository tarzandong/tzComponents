import DNDList from "./dndlist"
import {App} from "vue";
let comps = [DNDList]
const install = (Vue:App) =>{
    comps.map((component:any)=>{
      Vue.component(component.name as string, component);
    })
}

let windowObj = window as any
/* 支持使用标签的方式引入 */
if (typeof windowObj !== 'undefined' && windowObj.Vue) {
    install(windowObj.Vue);
}

export default {install}