import { combineReducers } from 'redux'
import taskListReducer from './taskListReducer'
import filterReducer from './filterReducer'
import usersReducer from './usersReducer'
import snackbarReducer from './snackbarReducer'

const rootReducer = combineReducers({
  taskListReducer,
  filterReducer,
  usersReducer,
  snackbarReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
