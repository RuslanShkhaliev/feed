import { type ToastMessageOptions, type ToastServiceMethods } from 'primevue'
import { type App, inject, type Plugin } from 'vue'

type ToastAction = (message: Omit<ToastMessageOptions, 'severity'>) => void
export const TOAST_KEY_APP = 'toast-app'
interface ToastApp {
  success: ToastAction
  info: ToastAction
  warn: ToastAction
  error: ToastAction
  secondary: ToastAction
  contrast: ToastAction
}
export const ToastPlugin: Plugin = {
  install(app: App) {
    const _toast = app.config.globalProperties.$toast as ToastServiceMethods
    const variants = ['success', 'info', 'warn', 'error', 'secondary', 'contrast']

    const toast = {}

    variants.forEach((variant) => {
      Reflect.set(toast, variant, (message: Omit<ToastMessageOptions, 'severity'>) => {
        _toast.add({
          group: TOAST_KEY_APP,
          severity: variant as ToastMessageOptions['severity'],
          life: 333000,
          ...message,
        })
      })
    })

    app.provide('toast', toast as ToastApp)
  },
}

export const useToast = () => inject<ToastApp>('toast')!
