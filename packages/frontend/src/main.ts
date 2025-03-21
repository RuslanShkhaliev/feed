import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from '@/router'
import { ToastPlugin } from '@/plugins/toast.ts'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})
app.use(ToastService)
app.use(ToastPlugin)
app.mount('#app')
