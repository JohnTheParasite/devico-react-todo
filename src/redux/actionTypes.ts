export type ActionFormat<T> = { type: string; payload: T }

export type AddChangeTodoAction = { id: string | number; content: string; done: boolean }
export type DeleteTodoAction = { id: string | number }
export type ToggleAllTodosAction = { done: boolean }
export type SetFilterAction = { filter: string }

export type ActionOptions = AddChangeTodoAction | DeleteTodoAction | ToggleAllTodosAction
