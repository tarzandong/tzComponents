// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const userInfo = {
  id: 0,
  name: '',
  token: ''
}
export const useBaseInfo = defineStore({
  id: 'baseInfo',
  state: () => ({
    fullW: 0,
    fullH: 0,
    userInfo,
    baseUrl: 'http://192.168.31.185:3000',
    wsUrl: "ws://192.168.31.185:8080/ws",
    loading: false,
    reqList: {},
    inGame: 0,
    gameStage: 0,
    wsSocket: null as WebSocket | null,
    quitRoom: ()=>{},
    dismissRoom: ()=>{}
  }),
  actions: {
    setSize(w:number, h:number) {
      this.fullW = w
      this.fullH = h
    }
  }
})
