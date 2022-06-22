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
