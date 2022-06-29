import { put, takeEvery } from 'redux-saga/effects'
import ApiCall from '@/services/api'
import { refreshTodos } from '@/redux/actions'
import {
  ActionFormat,
  ActionOptions,
  AddTodoAction,
  ChangeTodoAction,
  DeleteAllCompletedType,
  DeleteTodoAction,
  GetTodos,
  TodolistType,
  ToggleAllTodosAction,
} from '@/redux/Types'
import { AxiosResponse } from 'axios'

type ActionType = ActionFormat<ActionOptions>
type AxResponse = AxiosResponse<TodolistType>

function* GetDataWorker(action: ActionType) {
  const { userId } = action.payload as GetTodos
  const res: AxResponse = yield ApiCall.getAllTodos(userId as string)
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
  const { content, userId } = action.payload as AddTodoAction
  const res: AxResponse = yield ApiCall.addTodo(content, userId)
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
  const { id, done, content } = action.payload as ChangeTodoAction
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
  const { userId, done } = action.payload as ToggleAllTodosAction
  const res: AxResponse = yield ApiCall.toggleAll(userId, done)
  if (res && res.data.length) {
    yield put(refreshTodos(res.data))
  } else {
    yield put(refreshTodos([]))
  }
}

function* watchToggleAllTodos() {
  yield takeEvery('ASYNC_TOGGLE_ALL_TODO', ToggleAllTodosWorker)
}

function* DeleteCompletedTodosWorker(action: ActionType) {
  const { userId } = action.payload as DeleteAllCompletedType
  const res: AxResponse = yield ApiCall.deleteCompleted(userId)
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
