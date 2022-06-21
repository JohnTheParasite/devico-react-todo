let nextTodoId = 0

export const addTodo = (content: string) => {
  return {
    type: 'ADD_TODO',
    payload: {
      // eslint-disable-next-line no-plusplus
      id: ++nextTodoId,
      content,
    },
  }
}

export const changeTodo = (id: number | string, done: boolean, content: string) => {
  return {
    type: 'CHANGE_TODO',
    payload: { id, done, content },
  }
}

export const changeTodoContent = (id: number | string, content: string) => {
  return {
    type: 'CHANGE_TODO_CONTENT',
    payload: { id, content },
  }
}

export const deleteTodo = (id: number | string) => {
  return {
    type: 'DELETE_TODO',
    payload: { id },
  }
}

export const toggleAllTodos = (done: boolean) => {
  return {
    type: 'TOGGLE_TODOS',
    payload: { done },
  }
}

export const deleteCompletedTodos = () => {
  return {
    type: 'DELETE_COMPLETED_TODOS',
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
