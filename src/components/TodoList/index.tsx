import React, { useEffect, useState } from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changeTodoContent } from '@/redux/actions'
import { getFilteredTodos, getLengths } from '@/redux/selectors'
import { fetchTodos, addTodo, changeTodo, deleteTodo, toggleAllTodos } from '@/redux/thunks'

function TodoList() {
  const [newInputLabel, setNewInputLabel] = useState('')

  const lengths = useSelector(getLengths)
  const filteredList = useSelector(getFilteredTodos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos() as any)
  }, [])

  const handleChange = (value: string) => {
    setNewInputLabel(value)
  }

  const toggleAllItems = () => {
    const done = lengths.completed < lengths.all
    dispatch(toggleAllTodos(done) as any)
  }

  const addNewItem = (content: string) => {
    dispatch(addTodo(content) as any)
    setNewInputLabel('')
  }

  const changeTask = (id: string | number, done: boolean, content: string) => {
    dispatch(changeTodo(id, done, content) as any)
  }

  const changeContent = (id: string | number, value: string) => {
    dispatch(changeTodoContent(id, value))
  }

  const removeItem = (id: string | number) => {
    dispatch(deleteTodo(id) as any)
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
