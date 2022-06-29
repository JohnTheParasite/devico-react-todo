import { TodolistType, UserType } from '@/redux/Types'

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

export const asyncRefreshTodos = (userId: string) => {
  return {
    type: 'ASYNC_GET_TODOS',
    payload: {
      userId,
    },
  }
}

export const asyncAddTodo = (content: string, userId: string) => {
  return {
    type: 'ASYNC_ADD_TODO',
    payload: {
      content,
      userId,
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

export const asyncToggleAllTodo = (userId: string, done: boolean) => {
  return {
    type: 'ASYNC_TOGGLE_ALL_TODO',
    payload: {
      userId,
      done,
    },
  }
}

export const asyncDeleteCompletedTodos = (userId: string) => {
  return {
    type: 'ASYNC_DELETE_COMPLETED_TODOS',
    payload: {
      userId,
    },
  }
}

export const setCurrentUser = (user: UserType) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      user,
    },
  }
}
