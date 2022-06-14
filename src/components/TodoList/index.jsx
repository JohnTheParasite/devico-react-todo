import React, { useState } from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import { Api, catchAxiosError } from '@/services/api'
import { useTodoData } from '@/hooks/TodoDataProvider'
import styles from './styles.module.scss'

function TodoList() {
  const [newInputLabel, setNewInputLabel] = useState('')
  const { list, setList, getLength, getFilteredList } = useTodoData()
  const { todoLength, todoDoneLength } = getLength()

  const validateResponseListAndSetState = (res) => {
    if (res && res.data.length) {
      setList(res.data)
    } else {
      setList([])
    }
  }

  const handleChange = (value) => {
    setNewInputLabel(value)
  }

  const toggleAllItems = () => {
    const done = todoDoneLength < todoLength

    Api.put('/api/tasks/bulk/update', { done })
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  const addNewItem = (content) => {
    Api.post('/api/tasks', { content })
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
    setNewInputLabel('')
  }

  const changeTask = (id, done, content) => {
    Api.put(`/api/tasks/${id}`, { done, content })
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  const changeContent = (id, value) => {
    const changedList = [...list]
    const item = changedList.find((el) => el.id === id)
    if (item) {
      item.content = value
    }

    setList(changedList)
  }

  const removeItem = (id) => {
    Api.delete(`/api/tasks/${id}`)
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  const removeDoneTodos = () => {
    Api.delete('/api/tasks/bulk/delete')
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  const listItems = getFilteredList().map((el) => (
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
      <TodoFooter removeDoneTodos={removeDoneTodos} />
    </div>
  )
}

export default TodoList
