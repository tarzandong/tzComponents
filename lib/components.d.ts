import DNDList from "./dndlist"
import DNDEle from "./dndElement"

declare module 'vue' {
  export interface GlobalComponents {
    DNDList: typeof DNDList,
    DNDEle: typeof DNDEle
  }
}