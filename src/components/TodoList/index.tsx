import React, { ReducerState, useState } from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import {
  addTodo,
  changeTodo,
  changeTodoContent,
  deleteTodo,
  deleteCompletedTodos,
  toggleAllTodos,
} from '@/redux/actions'
import { getFilter, getFilteredTodos, getLengths, getTodos, useTypedSelector } from '@/redux/selectors'

function TodoList() {
  const [newInputLabel, setNewInputLabel] = useState('')

  const lengths = useTypedSelector((state) => getLengths(state))
  const filteredList = useTypedSelector((state) => getFilteredTodos(state))
  const dispatch = useDispatch()

  const handleChange = (value: string) => {
    setNewInputLabel(value)
  }

  const toggleAllItems = () => {
    const done = lengths.completed < lengths.all
    dispatch(toggleAllTodos(done))
  }

  const addNewItem = (content: string) => {
    dispatch(addTodo(content))
    setNewInputLabel('')
  }

  const changeTask = (id: string, done: boolean, content: string) => {
    dispatch(changeTodo(id, done, content))
  }

  const changeContent = (id: string, value: string) => {
    dispatch(changeTodoContent(id, value))
  }

  const removeItem = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const removeDoneTodos = () => {
    dispatch(deleteCompletedTodos())
  }

  const listItems = filteredList.map((el) => (
    <TodoItem
      key={el.id}
      id={el.id}
      done={el.done}
      content={el.content}
      changeTask={changeTask}
      changeContent={changeContent}
      removeItem={removeItem}
    />
  ))

  return (
    <div className={styles['list-container']}>
      <TodoInput
        inputValue={newInputLabel}
        onNewInputChange={handleChange}
        addItem={addNewItem}
        arrowClick={toggleAllItems}
      />
      <ul>{listItems}</ul>
      <TodoFooter />
    </div>
  )
}

export default TodoList
