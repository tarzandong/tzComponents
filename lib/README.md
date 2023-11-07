https://github.com/tarzandong/tzComponents.git

# Drag and Drop in list component
## How to use
```
/// main.ts
import { createApp } from 'vue'
import App from './App.vue'
//import dndComponents from 'dndlist' //global import, not recommended
import 'dndlist/style.css'

const app = createApp(App)
//app.use(dndComponents)
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
import {DNDList} from 'dndlist' //import by required
  const testList = ref([
    {id:...,
    name,
    age},
    ...
  ])

  const listRef = ref(null)

  function change(list: any[], changeLog: {from: number, to: number}) {
    console.log(list)
    console.log(`you have changed the item from ${changeLog.from} to ${changeLog.to}`)
  }

  function cancelChange() {
    listRef.restore()
  }
</script>
```

## Props and others in DNDList component
* list: The target list you want to render in row flex display.
* item-id: The unique id key of the list item obj, if the list is just a string[], you can keep **item-id=''**.
* wrap-class?: The css class you want use on the flex wrap.
* item-class?: The css class you want use on the list item. That item will be the parent Node of the default slot.
* direction?: the flex-direction. can be 'row' or 'column'.
* @change: The **drop** event will emit with param of the updated list and the changed item info of the index in the list.
* *method* restore: The component expose a method restore to cancel the update about the list.
* You need render the item in your own way by the default slot. please refer the example in *How to use*.

## Notice
* Recommand to render the slot item with fixed width & height, or the position maybe change not by your expectation.

# Drag Element component
## How to use
```
/// main.ts
same as the list component
```

```
/// foo.vue
<template>
  <drag-element :list="list" :drag-handle="dragHandle" @drag="drag">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="drag-handle" @click="dragHandle(index)"></div>
```

```
/// foo.vue
<template>
  <DNDEle handlerId="handler" left="200px" top="500px">
    <div>
      <div class="w100 h50 bcwarning" id="handler"></div>
      <div class="w100 h150 bcwhite" ></div>
    </div>
  </DNDEle>
</template>

<script lang='ts' setup>
import {DNDEle} from 'dndlist' //import by required
  
</script>
```

## Props and others in DNDList component
* handlerId: string, The drag-and-drop handler element id.
* left: string, The init left position of the target, must with unit like 'px'.
* top: string, The init top position of the target, must with unit like 'px'.
* notFixed: boolean, the DNDEle's default style.position is fixed, if you want to use static, you need set the prop to true. 

## Notice
When you drag the DNDEle, the DNDEle positon style will change to and maintain 'fixed'.

