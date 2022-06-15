import React, { useState } from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import { Api, catchAxiosError } from '@/services/api'
import { useTodoData } from '@/hooks/TodoDataProvider'
import styles from './styles.module.scss'
import { AxiosResponse } from 'axios'

function TodoList() {
  const [newInputLabel, setNewInputLabel] = useState('')
  const { list, setList, getLength, getFilteredList } = useTodoData()
  const { todoLength, todoDoneLength } = getLength()

  const validateResponseListAndSetState = (res: AxiosResponse) => {
    if (res && res.data.length) {
      setList(res.data)
    } else {
      setList([])
    }
  }

  const handleChange = (value: string) => {
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

  const addNewItem = (content: string) => {
    Api.post('/api/tasks', { content })
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
    setNewInputLabel('')
  }

  const changeTask = (id: string, done: boolean, content: string) => {
    Api.put(`/api/tasks/${id}`, { done, content })
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  const changeContent = (id: string, value: string) => {
    const changedList = [...list]
    const item = changedList.find((el) => el.id === id)
    if (item) {
      item.content = value
    }

    setList(changedList)
  }

  const removeItem = (id: string) => {
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
