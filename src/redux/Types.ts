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
} | null

export type UserResponse = {
  user: UserType
  accessToken: string
  refreshToken: string
}

export type ErrorMessage = {
  message: string
}

export type ActionFormat<T> = { type: string; payload: T }

export type GetTodos = { userId: string }
export type AddTodoAction = { id: string | number; userId: string; content: string; done: boolean }
export type ChangeTodoAction = { id: string | number; content: string; done: boolean }
export type DeleteTodoAction = { id: string | number }
export type DeleteAllCompletedType = { userId: string }
export type ToggleAllTodosAction = { userId: string; done: boolean }
export type SetFilterAction = { filter: string }
export type GetTodosAction = { todos: TodolistType }
export type SetCurrentUser = { user: UserType }
export type SetUserIsPending = { isPending: boolean }

export type ActionOptions =
  | GetTodos
  | AddTodoAction
  | ChangeTodoAction
  | DeleteTodoAction
  | DeleteAllCompletedType
  | ToggleAllTodosAction
  | GetTodosAction
