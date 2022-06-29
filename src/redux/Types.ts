export type TodolistType = {
  id: number | string
  content: string
  done: boolean
}[]

export type UserType = {
  id: string
  login: string
  email: string
  roleId: number
  createdAt: string
}

export type ErrorMessage = {
  message: string
}

export type ActionFormat<T> = { type: string; payload: T }

export type AddChangeTodoAction = { id: string | number; content: string; done: boolean }
export type DeleteTodoAction = { id: string | number }
export type ToggleAllTodosAction = { done: boolean }
export type SetFilterAction = { filter: string }
export type GetTodosAction = { todos: TodolistType }
export type SetCurrentUser = { user: UserType }

export type ActionOptions = AddChangeTodoAction | DeleteTodoAction | ToggleAllTodosAction | GetTodosAction
