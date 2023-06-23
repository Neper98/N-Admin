import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
// import 'element-plus/es/components/message/style/css'
// import 'element-plus/es/components/icon/style/css'
import 'element-plus/dist/index.css'

import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)


app.use(router)
app.use(createPinia())
app.mount('#app')
