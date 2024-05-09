import axios from 'axios'

const jwtAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust this URL based on your environment
  headers: {
    'Content-Type': 'application/json'
  }
})

jwtAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default jwtAxios
