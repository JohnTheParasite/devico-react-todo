import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import TaskListSagaWatchers from '@/redux/saga/taskListSaga'

export const sagaMiddleware = createSagaMiddleware()

export function* rootWatcher() {
  yield all([...TaskListSagaWatchers])
}
