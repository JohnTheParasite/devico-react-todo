import { put, takeEvery } from 'redux-saga/effects'
import ApiCall from '@/services/api'
import { refreshTodos } from '@/redux/actions'
import {
  ActionFormat,
  ActionOptions,
  AddChangeTodoAction,
  DeleteTodoAction,
  TodolistType,
  ToggleAllTodosAction,
} from '@/redux/Types'
import { AxiosResponse } from 'axios'

type ActionType = ActionFormat<ActionOptions>
type AxResponse = AxiosResponse<TodolistType>

function* GetDataWorker() {
  const res: AxResponse = yield ApiCall.getAllTodos()
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchGetData() {
  yield takeEvery('ASYNC_GET_TODOS', GetDataWorker)
}

function* AddTodoWorker(action: ActionType) {
  const { content } = action.payload as AddChangeTodoAction
  const res: AxResponse = yield ApiCall.addTodo(content)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchAddTodo() {
  yield takeEvery('ASYNC_ADD_TODO', AddTodoWorker)
}

function* ChangeTodoWorker(action: ActionType) {
  const { id, done, content } = action.payload as AddChangeTodoAction
  const res: AxResponse = yield ApiCall.changeTodo(id, done, content)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchChangeTodo() {
  yield takeEvery('ASYNC_CHANGE_TODO', ChangeTodoWorker)
}

function* DeleteTodoWorker(action: ActionType) {
  const { id } = action.payload as DeleteTodoAction
  const res: AxResponse = yield ApiCall.deleteTodo(id)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchDeleteTodo() {
  yield takeEvery('ASYNC_DELETE_TODO', DeleteTodoWorker)
}

function* ToggleAllTodosWorker(action: ActionType) {
  const { done } = action.payload as ToggleAllTodosAction
  const res: AxResponse = yield ApiCall.toggleAll(done)
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
  const res: AxResponse = yield ApiCall.deleteCompleted()
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
