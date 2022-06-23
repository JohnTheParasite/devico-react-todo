import { TodolistType } from '@/redux/Types'

export const changeTodoContent = (id: number | string, content: string) => {
  return {
    type: 'CHANGE_TODO_CONTENT',
    payload: { id, content },
  }
}

export const setFilter = (filter: string) => {
  return {
    type: 'SET_FILTER',
    payload: {
      filter,
    },
  }
}

export const refreshTodos = (todos: TodolistType) => {
  return {
    type: 'GET_TODOS',
    payload: {
      todos,
    },
  }
}

export const asyncRefreshTodos = () => {
  return {
    type: 'ASYNC_GET_TODOS',
  }
}

export const asyncAddTodo = (content: string) => {
  return {
    type: 'ASYNC_ADD_TODO',
    payload: {
      content,
    },
  }
}

export const asyncChangeTodo = (id: string | number, done: boolean, content: string) => {
  return {
    type: 'ASYNC_CHANGE_TODO',
    payload: {
      id,
      done,
      content,
    },
  }
}

export const asyncDeleteTodo = (id: string | number) => {
  return {
    type: 'ASYNC_DELETE_TODO',
    payload: {
      id,
    },
  }
}

export const asyncToggleAllTodo = (done: boolean) => {
  return {
    type: 'ASYNC_TOGGLE_ALL_TODO',
    payload: {
      done,
    },
  }
}

export const asyncDeleteCompletedTodos = () => {
  return {
    type: 'ASYNC_DELETE_COMPLETED_TODOS',
  }
}
