import axios from 'axios'

const baseURL = 'http://localhost:5245'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export default axiosInstance
