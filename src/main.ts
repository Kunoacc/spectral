import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import api from './api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide('$api', api())

app.mount('#app')
