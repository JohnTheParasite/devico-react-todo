import { combineReducers } from 'redux'
import taskListReducer from './taskListReducer'
import filterReducer from './filterReducer'

const rootReducer = combineReducers({
  taskListReducer,
  filterReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
