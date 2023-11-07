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

  onMounted(() => {
    new DragWindow(props.handlerId? props.handlerId : 'main', 'main')
  })
  

</script>

<script lang="ts">
export default {
  name: 'DNDEle'
}
</script>

<style lang='scss' scoped>
  
</style>