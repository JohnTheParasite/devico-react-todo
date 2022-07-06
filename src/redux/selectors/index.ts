import { RootState } from '@/redux/reducers'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const getFilterReducer = (state: RootState) => state.filterReducer
export const getFilter = (state: RootState) => getFilterReducer(state).filter

export const getTaskListReducer = (state: RootState) => state.taskListReducer
export const getTodos = (state: RootState) => getTaskListReducer(state).todos
export const getFilteredTodos = (state: RootState) => {
  const filter = getFilter(state)
  let filteredTodos = getTodos(state)
  if (filter !== 'All') {
    filteredTodos = filteredTodos.filter((el) => (filter === 'Active' ? !el.done : el.done))
  }
  return filteredTodos
}
export const getLengths = (state: RootState) => getTaskListReducer(state).lengths

export const getUsersReducer = (state: RootState) => state.usersReducer
export const getCurrentUser = (state: RootState) => getUsersReducer(state).currentUser
export const getCurrentUserId = (state: RootState) => getCurrentUser(state)?.id

export const getUserIsPending = (state: RootState) => getUsersReducer(state).isPending

export const getSnackbarReducer = (state: RootState) => state.snackbarReducer
export const getSnackbarOpen = (state: RootState) => getSnackbarReducer(state).snackbarOpen
export const getSnackbarType = (state: RootState) => getSnackbarReducer(state).snackbarType
export const getSnackbarMessage = (state: RootState) => getSnackbarReducer(state).snackbarMessage

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
