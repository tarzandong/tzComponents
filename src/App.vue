<script setup lang="ts">
// import DNDList from '@components/list.vue'
import { ref } from 'vue'

const listRef = ref<{restore: ()=>void} | null>(null)
const testList = [
  {name: '小明', age: 18, id:0},
  {name: '小亮', age: 18, id:1},
  {name: '小李', age: 28, id:2},
  {name: 'tt', age: 18, id:3},
  {name: 'Sam', age: 47, id:4},
  {name: 'zz', age: 18, id:5},
  {name: '小明123124234', age: 18, id:6},
  {name: '小亮', age: 18, id:7},
  {name: '小李', age: 28, id:8},
  {name: 'tt', age: 18, id:9},
  {name: 'Sam', age: 47, id:10}
]

function change(list: any[]) {
  console.log(listRef.value);
  console.log(list);
  // (listRef.value as {restore: ()=>void}).restore()
}
</script>

<template>
  <div>header</div>
  <div class="flxR">
    <DNDList class="w1000" :list="testList" item-id="id" direction="row" wrapClass="wrap" :itemWidth="200" v-slot="{item: item1}" @change="change" ref="listRef">
      <div class="bcwarning flxC w100 h80">
        <div class="fs20 fwb">{{ item1.name }}</div>
        <div >{{ item1.age + ' ' +item1.id }}</div>
      </div>
    </DNDList>
    <button>confirm</button>
  </div>
  
  <div class="w100 h150 bcwhite"></div>
</template>

<style>
.wrap {
  flex-wrap: wrap;
  gap: 10px;
}
</style>
