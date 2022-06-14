import React, { useEffect, useState } from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/todoFooter'
import { Api, catchAxiosError } from '@/services/api'
import { useFilter } from '@/hooks/filterProvider'
import { FILTER_ALL, FILTER_ACTIVE } from '@/constants'
import styles from './styles.module.scss'

function TodoList() {
  const [newInputLabel, setNewInputLabel] = useState('')
  const [list, setList] = useState([])
  const filter = useFilter()

  const validateResponseListAndSetState = (res) => {
    if (res && res.data.length) {
      setList(res.data)
    } else {
      setList([])
    }
  }

  const getData = () => {
    Api.get('/api/tasks')
      .then(validateResponseListAndSetState)
      .catch((error) => {
        catchAxiosError(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (value) => {
    setNewInputLabel(value)
  }

  const toggleAllItems = () => {
    const items = list.length
    const doneItems = list.filter((el) => el.done).length
    const done = doneItems < items

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

  const listLength = list.length
  const doneListLength = list.filter((el) => el.done).length
  const itemLeft = listLength - doneListLength

  let listToRender = list
  if (filter !== FILTER_ALL) {
    listToRender = listToRender.filter((el) => (filter === FILTER_ACTIVE ? !el.done : el.done))
  }

  const listItems = listToRender.map((el) => (
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
        listLength={listLength}
        doneListLength={doneListLength}
        onNewInputChange={handleChange}
        addItem={addNewItem}
        arrowClick={toggleAllItems}
      />
      <ul>{listItems}</ul>
      <TodoFooter
        itemsLength={listLength}
        itemsDone={doneListLength}
        itemsLeft={itemLeft}
        removeDoneTodos={removeDoneTodos}
      />
    </div>
  )
}

export default TodoList
