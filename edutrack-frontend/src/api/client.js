




import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || ''

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})



client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)



client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      const isAuthEndpoint =
        error.config?.url?.includes('/auth/login') ||
        error.config?.url?.includes('/auth/register')

      if (!isAuthEndpoint) {
        localStorage.removeItem('token')
        window.dispatchEvent(new CustomEvent('auth:logout'))
      }
    }

    const normalized = {
      status,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Error inesperado',
      details: error.response?.data?.details || {},
      raw: error.response?.data,
    }

    return Promise.reject(normalized)
  }
)




export const uploadFile = (url, file, fieldName = 'file') => {
  const formData = new FormData()
  formData.append(fieldName, file)

  const token = localStorage.getItem('token')
  return client.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}

export default client