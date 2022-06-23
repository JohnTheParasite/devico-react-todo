import { call, put, takeEvery } from 'redux-saga/effects'
import ApiCall from '@/services/api'
import { refreshTodos } from '@/redux/actions'

function* GetDataWorker() {
  const res = yield ApiCall.getAllTodos()
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchGetData() {
  yield takeEvery('ASYNC_GET_TODOS', GetDataWorker)
}

function* AddTodoWorker(action) {
  const addTodo = (content) => ApiCall.addTodo(content)
  const { content } = action.payload
  const res = yield call(addTodo, content)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchAddTodo() {
  yield takeEvery('ASYNC_ADD_TODO', AddTodoWorker)
}

function* ChangeTodoWorker(action) {
  const changeTodo = (id, done, content) => ApiCall.changeTodo(id, done, content)
  const { id, done, content } = action.payload
  const res = yield call(changeTodo, id, done, content)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchChangeTodo() {
  yield takeEvery('ASYNC_CHANGE_TODO', ChangeTodoWorker)
}

function* DeleteTodoWorker(action) {
  const deleteTodo = (id) => ApiCall.deleteTodo(id)
  const { id } = action.payload
  const res = yield call(deleteTodo, id)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchDeleteTodo() {
  yield takeEvery('ASYNC_DELETE_TODO', DeleteTodoWorker)
}

function* ToggleAllTodosWorker(action) {
  const toggleAll = (done) => ApiCall.toggleAll(done)
  const { done } = action.payload
  const res = yield call(toggleAll, done)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchToggleAllTodos() {
  yield takeEvery('ASYNC_TOGGLE_ALL_TODO', ToggleAllTodosWorker)
}

function* DeleteCompletedTodosWorker() {
  const deleteCompleted = () => ApiCall.deleteCompleted()
  const res = yield call(deleteCompleted)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchDeleteCompletedTodos() {
  yield takeEvery('ASYNC_DELETE_COMPLETED_TODOS', DeleteCompletedTodosWorker)
}

const TaskListSagaWatchers = [
  watchGetData(),
  watchAddTodo(),
  watchChangeTodo(),
  watchDeleteTodo(),
  watchToggleAllTodos(),
  watchDeleteCompletedTodos(),
]

export default TaskListSagaWatchers
