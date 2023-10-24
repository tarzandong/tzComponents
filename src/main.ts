import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/scss/all.scss'
import dndlist from '../package/index'

console.log(dndlist)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(dndlist)

app.mount('#app')

