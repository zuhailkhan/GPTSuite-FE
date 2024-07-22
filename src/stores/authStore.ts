import axiosInstance from '@/plugins/axios'
import type { ILoggedUser, ILoginPayload } from '@/Types/typings'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useSnackToast } from './snackToast'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<ILoggedUser | null>(null)

  const isLoggedIn = computed(() => !!user.value)

  const { showSnackBar } = useSnackToast()

  async function login(payload: ILoginPayload) {
    try {
      const { email, password } = payload
      const loginResponse = await axiosInstance.post('/User/login', {
        email,
        password
      })

      user.value = loginResponse.data.user ?? null

      if (loginResponse.status === 403) {
        showSnackBar('Wrong Credentials')
      }
      return loginResponse.data.user
    } catch (error: unknown) {
      if (error instanceof AxiosError && error?.response?.status === 403) {
        showSnackBar('Wrong Credentials')
      } else if (error instanceof Error) {
        showSnackBar(`Error: ${error.message}`)
      }
    }
  }

  async function logout() {
    try {
      const response = await axiosInstance.get('/User/logout')

      if (response.status === 200) {
        user.value = null
        return true
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function revalidateAuth() {
    try {
      const response = await axiosInstance.get('/User/refresh')

      if (response.status === 201) {
        user.value = response.data
        return response.data
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          user.value = null
          return null
        }
        console.error(error.response)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    revalidateAuth,
    logout
  }
})
