import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'
const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
