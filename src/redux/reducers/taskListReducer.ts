import {
  ActionFormat,
  ActionOptions,
  AddTodoAction,
  ChangeTodoAction,
  DeleteTodoAction,
  GetTodosAction,
  TodolistType,
  ToggleAllTodosAction,
} from '@/redux/Types'

type lengthsType = { all: number; active: number; completed: number }

export interface IInitialState {
  lengths: lengthsType
  todos: TodolistType
}

const initialState: IInitialState = {
  lengths: {
    all: 0,
    active: 0,
    completed: 0,
  },
  todos: [],
}

function calculateLengths(list: TodolistType): lengthsType {
  return {
    all: list.length,
    active: list.filter((el) => !el.done).length,
    completed: list.filter((el) => el.done).length,
  }
}

const taskListReducer = (state = initialState, action: ActionFormat<ActionOptions>) => {
  switch (action.type) {
    case 'GET_TODOS': {
      const actualTodo = action.payload as GetTodosAction
      return {
        ...state,
        todos: actualTodo.todos,
        lengths: calculateLengths(actualTodo.todos),
      }
    }
    case 'ADD_TODO': {
      const addPayload = action.payload as AddTodoAction
      const newList = [...state.todos, { ...addPayload, done: false }]
      return {
        ...state,
        todos: newList,
        lengths: calculateLengths(newList),
      }
    }
    case 'CHANGE_TODO': {
      const changePayload = action.payload as ChangeTodoAction
      const newList = [...state.todos]
      const item = newList.find((el) => el.id === changePayload.id)
      if (item) {
        item.done = changePayload.done
        item.content = changePayload.content
      }
      return {
        ...state,
        todos: newList,
        lengths: calculateLengths(newList),
      }
    }
    case 'CHANGE_TODO_CONTENT': {
      const changePayload = action.payload as ChangeTodoAction
      const newList = [...state.todos]
      const item = newList.find((el) => el.id === changePayload.id)
      if (item) {
        item.content = changePayload.content
      }
      return {
        ...state,
        todos: newList,
      }
    }
    case 'DELETE_TODO': {
      const deletePayload = action.payload as DeleteTodoAction
      const newList = [...state.todos]
      const index = newList.findIndex((el) => el.id === deletePayload.id)
      if (index >= 0) {
        newList.splice(index, 1)
      }
      return {
        ...state,
        todos: newList,
        lengths: calculateLengths(newList),
      }
    }
    case 'TOGGLE_TODOS': {
      const togglePayload = action.payload as ToggleAllTodosAction
      const newList = [...state.todos].map((el) => ({ ...el, done: togglePayload.done }))
      return {
        ...state,
        todos: newList,
        lengths: calculateLengths(newList),
      }
    }
    case 'DELETE_COMPLETED_TODOS': {
      const newList = [...state.todos].filter((el) => !el.done)
      return {
        ...state,
        todos: newList,
        lengths: calculateLengths(newList),
      }
    }
    default:
      return state
  }
}

export default taskListReducer
