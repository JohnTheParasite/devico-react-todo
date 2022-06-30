import axios, { AxiosError, AxiosInstance } from 'axios'

class Api {
  private readonly api: AxiosInstance

  public constructor(endpoint: string) {
    this.api = axios.create({
      baseURL: endpoint,
    })

    // this.api.interceptors.request.use((config) => {
    //   config.headers?.Authorization
    // })
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
