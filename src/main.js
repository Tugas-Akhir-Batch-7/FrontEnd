import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'

import axios from 'axios'
import store from './store'

// https://stackoverflow.com/questions/34308004/moment-js-with-vuejs
import moment from 'moment'

// Vue.prototype.moment = moment


axios.interceptors.request.use((config) => {
    config.baseURL = 'http://localhost:5000'
        // config.withCredentials = true
    return config
})



const app = createApp(App)

// app.use(createPinia())
app.use(store)
app.use(router)

// https://stackoverflow.com/questions/65654465/using-momentjs-globally-in-vuejs-3
app.config.globalProperties.$moment=moment;
// app.use(moment)

app.mount('#app')




