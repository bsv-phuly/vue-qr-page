import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQrcodeReader } from 'vue-qrcode-reader'
import { createVfm, VueFinalModal } from 'vue-final-modal'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQrcodeReader)
app.use(createVfm)
app.component('VueFinalModal', VueFinalModal)

app.mount('#app')
