<template>
  
  
  <div id="main" :style="{top: props.top ?? 'auto', left: props.left ?? 'auto', position: props.notFixed ? 'static' : 'fixed' }">
    <slot ></slot>
  </div>
</template>

<script lang='ts' setup>
  import { DragWindow } from './drag_window';
  import { onMounted } from 'vue';
  const props = defineProps<{
    handlerId?: string
    left?: string
    top?: string
    notFixed?: boolean
  }>()
  const emit = defineEmits<{
    (e:'drag-start', position:{x:number, y:number}):void
    (e:'drag-end', position:{x:number, y:number}):void
  }>()

  // function myEmit(e:'drag-start' | 'drag-end', position: {x: number, y: number}) {
  //   emit(e, position)
  // })
  onMounted(() => {
    new DragWindow(props.handlerId? props.handlerId : 'main', 'main', emit)
  })
  

</script>

<script lang="ts">
export default {
  name: 'DNDEle'
}
</script>

<style lang='scss' scoped>
  
</style>