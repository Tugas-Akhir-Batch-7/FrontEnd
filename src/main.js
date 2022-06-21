import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
axios.interceptors.request.use((config) => {
    config.baseURL = 'http://localhost:5000'
        // config.withCredentials = true
    return config
})



const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
