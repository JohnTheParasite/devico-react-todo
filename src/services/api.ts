import axios, { AxiosError, AxiosInstance } from 'axios'
import { setUserIsPending } from '@/redux/actions'

class Api {
  private readonly api: AxiosInstance

  public constructor(endpoint: string) {
    this.api = axios.create({
      baseURL: endpoint,
    })

    this.api.interceptors.request.use((config) => {
      config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('token')}` }
      return config
    })

    this.api.interceptors.response.use(
      (config) => {
        return config
      },
      async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && error.config && !error.config._isRetry) {
          originalRequest._isRetry = true
          try {
            const refreshToken = localStorage.getItem('refreshToken') as string
            if (refreshToken) {
              const res = await axios.post('http://localhost:8081/api/refresh', { refreshToken })
              localStorage.setItem('token', res.data.accessToken)
              return this.api.request(originalRequest)
            }
          } catch (e) {
            console.log(e)
          }
          return error
        }
      },
    )
  }

  getAllTodos(userId: string) {
    return this.api.get(`/api/tasks/${userId}`)
  }

  addTodo(content: string, userId: string) {
    return this.api.post('/api/tasks', { content, userId })
  }

  changeTodo(id: string | number, done: boolean, content: string) {
    return this.api.put(`/api/tasks/${id}`, { done, content })
  }

  deleteTodo(id: string | number) {
    return this.api.delete(`/api/tasks/${id}`)
  }

  toggleAll(userId: string, done: boolean) {
    return this.api.put('/api/tasks/bulk/update', { userId, done })
  }

  deleteCompleted(userId: string) {
    return this.api.delete(`/api/tasks/bulk/delete/${userId}`)
  }

  authorize(email: string, password: string) {
    return this.api.post('/api/login', { email, password })
  }

  register(login: string, email: string, password: string) {
    return this.api.post('/api/users', { login, email, password })
  }

  logout(refreshToken: string) {
    return this.api.post('/api/logout', { refreshToken })
  }
}

export function catchAxiosError(error: AxiosError) {
  if (error.response) {
    // eslint-disable-next-line no-console
    console.error(error.response)
  } else if (error.request) {
    // eslint-disable-next-line no-console
    console.error(error.request)
  } else {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export default new Api('http://localhost:8081')
