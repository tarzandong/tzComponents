import DNDList from "./dndlist"

declare module 'vue' {
  export interface GlobalComponents {
    DNDList: typeof DNDList
  }
}