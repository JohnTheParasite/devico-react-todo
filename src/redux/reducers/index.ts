import { combineReducers } from 'redux'
import taskListReducer from './taskListReducer'
import filterReducer from './filterReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  taskListReducer,
  filterReducer,
  usersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
