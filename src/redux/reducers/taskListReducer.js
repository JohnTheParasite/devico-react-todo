const initState = {
  lengths: {
    all: 1,
    active: 1,
    completed: 0,
  },
  todos: [
    {
      id: 0,
      content: 'Just content',
      done: false,
    },
  ],
}

function calculateLengths(list) {
  return {
    all: list.length,
    active: list.filter((el) => !el.done).length,
    completed: list.filter((el) => el.done).length,
  }
}

const taskListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newList = [...state.todos, { ...action.payload, done: false }]
      return {
        ...state,
        todos: newList,
        lengths: calculateLengths(newList),
      }
    }
    case 'CHANGE_TODO': {
      const newList = [...state.todos]
      const item = newList.find((el) => el.id === action.payload.id)
      if (item) {
        item.done = action.payload.done
        item.content = action.payload.content
      }
      return {
        ...state,
        todos: newList,
        lengths: calculateLengths(newList),
      }
    }
    case 'CHANGE_TODO_CONTENT': {
      const newList = [...state.todos]
      const item = newList.find((el) => el.id === action.payload.id)
      if (item) {
        item.content = action.payload.content
      }
      return {
        ...state,
        todos: newList,
      }
    }
    case 'DELETE_TODO': {
      const newList = [...state.todos]
      const index = newList.findIndex((el) => el.id === action.payload.id)
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
      const newList = [...state.todos].map((el) => ({ ...el, done: action.payload.done }))
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
