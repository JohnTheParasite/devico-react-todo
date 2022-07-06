import { AlertColor } from '@mui/material/Alert/Alert'

export const addTodoAlerts = {
  success: {
    type: 'success' as AlertColor,
    message: 'Todo created.',
  },
  error: {
    type: 'error' as AlertColor,
    message: 'Server error.',
  },
}

export const changeTodoAlerts = {
  success: {
    type: 'success' as AlertColor,
    message: 'Todo changed.',
  },
  error: {
    type: 'error' as AlertColor,
    message: 'Server error.',
  },
}

export const deleteTodoAlerts = {
  success: {
    type: 'success' as AlertColor,
    message: 'Todo deleted.',
  },
  error: {
    type: 'error' as AlertColor,
    message: 'Server error.',
  },
}

export const toggleAllTodoAlerts = {
  success: {
    type: 'success' as AlertColor,
    message: 'Todos were toggled.',
  },
  error: {
    type: 'error' as AlertColor,
    message: 'Server error.',
  },
}

export const deleteCompletedTodoAlerts = {
  success: {
    type: 'success' as AlertColor,
    message: 'Completed were cleared.',
  },
  error: {
    type: 'error' as AlertColor,
    message: 'Server error.',
  },
}
