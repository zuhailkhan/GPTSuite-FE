import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackToast = defineStore('snackToast', () => {
  const message = ref('')
  const snackBarVisible = ref(false)
  const snackBarTimeout = ref(2000)

  function showSnackBar(msg: string) {
    message.value = msg
    snackBarVisible.value = true

    setTimeout(() => {
      hideSnackBar()
    }, snackBarTimeout.value)
  }

  function hideSnackBar() {
    message.value = ''
    snackBarVisible.value = false
  }

  return {
    message,
    snackBarVisible,
    showSnackBar,
    closeSnackBar: hideSnackBar
  }
})
