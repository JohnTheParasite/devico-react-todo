import { combineReducers } from 'redux'
import taskListReducer from './taskListReducer'
import filterReducer from './filterReducer'

const allReducers = combineReducers({
  taskList: taskListReducer,
  filterReducer,
})

export default allReducers
