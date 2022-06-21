export type ActionFormat<T> = { type: string; payload: T }

export type AddTodoAction = { content: string }
export type ChangeTodoAction = { id: string | number; content: string; done: boolean }
export type ChangeTodoContentAction = { id: string | number; content: string }
export type DeleteTodoAction = { id: string | number }
export type ToggleAllTodosAction = { done: boolean }
export type SetFilterAction = { filter: string }

export type ActionOptions =
  | AddTodoAction
  | ChangeTodoAction
  | ChangeTodoContentAction
  | DeleteTodoAction
  | ToggleAllTodosAction
