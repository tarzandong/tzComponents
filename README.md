# Drag and Drop in list component

## How to use
```
/// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import dndlist from 'dndlist'
import 'dndlist/lib/style.css'

const app = createApp(App)
app.use(dndlist)
...
```

```
/// foo.vue
<template>
  <DNDList :list="testList" item-id="id" v-slot="{item}" @change="change" ref="listRef">
    <div>
      <div>{{ item.name }}</div>
      <div>{{ item.age + ' ' +item.id }}</div>
    </div>
  </DNDList>
</template>

<script lang='ts' setup>
  const testList = ref([
    {id:...,
    name,
    age},
    ...
  ])

  const listRef = ref(null)

  function change(list) {
    console.log(list)
  }

  function cancelChange() {
    listRef.restore()
  }
</script>
```

## Props and others in DNDList component
* list: The target list you want to render in row flex display
* item-id: The unique id key of the list item obj, if the list is just a string[], you can keep **item-id=''**
* wrap-class: The css class you want use on the flex wrap
* @change: The **drop** event will emit with param of the updated list
* *method* restore: The component expose a method restore to cancel the update about the list
* You need render the item in your own way by the default slot. please refer the example in *How to use*

## Notice
* Recommand to render the slot item with fixed width & height, or the position maybe change not by your expectation.