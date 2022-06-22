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

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector