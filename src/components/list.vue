<template>
  <div id="p">
    <div :class="props.wrapClass" class="wrapClass" draggable="true" @dragover="overHandler" @drop="dropHandler" style="gap:0">
      <div v-for="(item) in list" :id="props.itemId? (item[props.itemId] as string) : item" :key="props.itemId? (item[props.itemId] as string) : item" 
      draggable="true" class="trp" :class="props.itemClass ?? 'itemClass'" @dragstart="startHandler" style="margin: 0" >
        <slot :item="item">{{ item }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  wrapClass?: string
  itemClass?: string
  itemId: string
  list: any[]
}>()

const emit = defineEmits<{
  (event: 'change', list: any[]):void
}>()

// const eleWidth = ref(0)
const list = ref([...props.list])
let srcP = ref(0)
const srcItem = ref(list.value[0])
const positionArr: {x: number, y: number}[] = []
function startHandler(e:any) {
  // eleWidth.value = e.srcElement.offsetWidth
  toFixed()
  positionArr.some((item, index)=>{
    if (item.x == e.srcElement.offsetLeft && item.y == e.srcElement.offsetTop) {
      srcP.value = index
      tempP.value = index
      srcItem.value = list.value[index]
      return true
    } else return false
  })
  // nextTick(toFixed)
}

const tempP = ref(0)

function toFixed() {
  const pEle = document.getElementById('p') as HTMLElement
  pEle.style.height = pEle.offsetHeight + 'px'
  pEle.style.width = (pEle.offsetWidth + 5) + 'px'
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

function restoreFix() {
  list.value.forEach((item)=>{
    const tempEl = document.getElementById(props.itemId? (item[props.itemId] as string) : item) as HTMLElement
    tempEl.style.position = 'static'
  });
  (document.getElementById('p') as HTMLElement).style.width = 'auto';
  (document.getElementById('p') as HTMLElement).style.height = 'auto';
}

watch(()=>tempP.value, (p)=>{
  if (srcP.value == p) return
  restoreFix()
  list.value.splice(srcP.value, 1)
  list.value.splice(p, 0, srcItem.value)
  srcP.value = p
  nextTick(toFixed)
})

function overHandler(e:any) {
  e.preventDefault()
  positionArr.some((item, index)=>{
    if (item.x == e.srcElement.offsetLeft && item.y == e.srcElement.offsetTop) {
      tempP.value = index
      return true
    } else {
      return false}
  })
}

function dropHandler(e:any) {
  e.preventDefault();
  restoreFix()
  emit('change', list.value)
}

function restore() {
  console.log('restore')
  list.value = [...props.list]
  console.log(list.value)
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
  flex-direction: row;
  flex-wrap: wrap;
 }
 .itemClass {
  padding: 10px
 }
 .wfull {
  width: 100%
 }

</style>