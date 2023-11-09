<template>
  <div id="p">
    <div :class="props.wrapClass ?? ''" class="wrapClass" draggable="true" @dragover="overHandler" @drop="dropHandler" :style="{'flex-direction': $props.direction ?? 'row', 'display': 'flex' }" >
      <div v-for="(item, index) in list" :id="props.itemId? (item[props.itemId] as string) : item" :key="props.itemId? (item[props.itemId] as string) : item+String(index)" 
      draggable="true" class="trp" :class="props.itemClass ?? ''" @dragstart="startHandler" @dragend="restoreFix" >
        <slot :item="item">{{ item }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps<{
  wrapClass?: string
  itemClass?: string
  direction?: 'row' | 'column'
  itemId: string
  list: any[]
}>()

const emit = defineEmits<{
  (event: 'change', list: any[], changeLog: {from: number, to: number}):void
}>()

// const eleWidth = ref(0)
const list = ref([...props.list])
let srcP = ref(0) //被拖放元素初始位
const changeLog = {from: 0, to: 0}
const srcItem = ref(list.value[0]) //被拖放的元素
const positionArr: {x: number, y: number}[] = [] //存放列表各元素的定位
function startHandler(e:any) {
  toFixed()
  positionArr.some((item, index)=>{
    if (item.x == e.srcElement.offsetLeft && item.y == e.srcElement.offsetTop) {
      srcP.value = index
      tempP.value = index
      srcItem.value = list.value[index]
      changeLog.from = index
      return true
    } else return false
  })
}

const tempP = ref(0) //存放临时目标位

let pEle: HTMLElement //父元素
let pw: string //父元素原宽高属性保持
let ph: string

onMounted(() => {
  pEle = document.getElementById('p') as HTMLElement
  pw = pEle.style.width
  ph = pEle.style.height
  window.onresize = ()=>{
    pEle = document.getElementById('p') as HTMLElement
    pw = pEle.style.width
    ph = pEle.style.height
  }
})
function toFixed() { //拖放过程中为实现移动的动画，将元素定位变成fixed
  pEle.style.height = (pEle.offsetHeight ) + 'px'
  pEle.style.width = (pEle.offsetWidth) + 'px'
  positionArr.splice(0)
  for (let i = list.value.length; i > 0; i--) {
    const item = list.value[i-1]
    const tempEl = document.getElementById(props.itemId? (item[props.itemId] as string) : item) as HTMLElement
    positionArr.unshift({x: tempEl.offsetLeft, y: tempEl.offsetTop})
    tempEl.style.left = tempEl.offsetLeft+'px'
    tempEl.style.top = tempEl.offsetTop+'px'
    tempEl.style.position = 'fixed'
  }
}

function restoreFix() { //恢复元素的定位为static
  list.value.forEach((item)=>{
    const tempEl = document.getElementById(props.itemId? (item[props.itemId] as string) : item) as HTMLElement
    tempEl.style.position = 'static'
  });
  pEle.style.width = pw;
  pEle.style.height = ph;
}

watch(()=>tempP.value, (p)=>{
  if (srcP.value == p) return
  restoreFix()
  list.value.splice(srcP.value, 1)
  list.value.splice(p, 0, srcItem.value)
  srcP.value = p
  changeLog.to = p
  nextTick(toFixed)
})

function overHandler(e:any) {
  e.preventDefault()
  for (let i= positionArr.length; i--; i>0) {
    const nextItem = positionArr[i+1]
    const curItem = positionArr[i]
    if (e.x > curItem.x && e.y > curItem.y && (props.direction === 'column' ? (nextItem? e.y < nextItem.y : true) : (nextItem? e.x < nextItem.x : true))) {
      tempP.value = i
      break
    }  
  }
}

function dropHandler(e:any) {
  e.preventDefault();
  restoreFix()
  emit('change', list.value, changeLog)
}

function restore() {
  console.log('restore')
  list.value = [...props.list]
  setTimeout(()=>{
    for (let i = list.value.length; i > 0; i--) {
      const item = list.value[i-1]
      const tempEl = document.getElementById(props.itemId? (item[props.itemId] as string) : item) as HTMLElement
      tempEl.style.left = 'auto'
      tempEl.style.top = 'auto'
      positionArr.unshift({x: tempEl.offsetLeft, y: tempEl.offsetTop})
    }
  }, 200)
}

defineExpose({restore})
</script>
<script lang="ts">
export default {
  name: 'DNDList'
}
</script>

<style scoped>
 
 #p {
  box-sizing: border-box;
 }
 .trp {
  transition: left 0.5s, top 0.5s;
 }
 .wrapClass {
  display: flex;
  width: 100%;
  /* height: 100%; */
 }
 .itemClass {
  /* padding: 10px; */
  box-sizing: border-box;
 }
 .wfull {
  width: 100%
 }

</style>