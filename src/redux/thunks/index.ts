import { catchAxiosError } from '@/services/api'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { refreshTodos } from '@/redux/actions'
import { Dispatch } from 'redux'
import { TodolistType } from '@/redux/Types'

type ResponseType = AxiosResponse<TodolistType>

const Api = axios.create({
  baseURL: 'http://localhost:8081',
})

export function fetchTodos() {
  return async (dispatch: Dispatch) => {
    Api.get('/api/tasks')
      .then((res: ResponseType) => {
        if (res && res.data.length) {
          dispatch(refreshTodos(res.data))
        } else {
          dispatch(refreshTodos([]))
        }
      })
      .catch((error: AxiosError) => {
        catchAxiosError(error)
      })
  }
}

export function addTodo(content: string) {
  return async (dispatch: Dispatch) => {
    Api.post('/api/tasks', { content })
      .then((res: ResponseType) => {
        if (res && res.data.length) {
          dispatch(refreshTodos(res.data))
        } else {
          dispatch(refreshTodos([]))
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
  }
}

export function changeTodo(id: number | string, done: boolean, content: string) {
  return async (dispatch: Dispatch) => {
    Api.put(`/api/tasks/${id}`, { done, content })
      .then((res: ResponseType) => {
        if (res && res.data.length) {
          dispatch(refreshTodos(res.data))
        } else {
          dispatch(refreshTodos([]))
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
  }
}

export function deleteTodo(id: number | string) {
  return async (dispatch: Dispatch) => {
    Api.delete(`/api/tasks/${id}`)
      .then((res: ResponseType) => {
        if (res && res.data.length) {
          dispatch(refreshTodos(res.data))
        } else {
          dispatch(refreshTodos([]))
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
  }
}

export function toggleAllTodos(done: boolean) {
  return async (dispatch: Dispatch) => {
    Api.put('/api/tasks/bulk/update', { done })
      .then((res: ResponseType) => {
        if (res && res.data.length) {
          dispatch(refreshTodos(res.data))
        } else {
          dispatch(refreshTodos([]))
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
  }
}

export function deleteCompletedTodos() {
  return async (dispatch: Dispatch) => {
    Api.delete('/api/tasks/bulk/delete')
      .then((res: ResponseType) => {
        if (res && res.data.length) {
          dispatch(refreshTodos(res.data))
        } else {
          dispatch(refreshTodos([]))
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
  }
}
