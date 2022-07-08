import React, { useEffect, useState } from 'react'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/TodoFooter'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeTodoContent,
  asyncRefreshTodos,
  asyncAddTodo,
  asyncChangeTodo,
  asyncDeleteTodo,
  asyncToggleAllTodo,
} from '@/redux/actions'
import { getCurrentUserId, getFilteredTodos, getLengths, getUserIsPending } from '@/redux/selectors'
import { styled } from '@mui/material'

function TodoList() {
  const [newInputLabel, setNewInputLabel] = useState('')

  const lengths = useSelector(getLengths)
  const filteredList = useSelector(getFilteredTodos)
  const userId = useSelector(getCurrentUserId) as string
  const isPending = useSelector(getUserIsPending) as boolean
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isPending) {
      dispatch(asyncRefreshTodos(userId))
    }
  }, [isPending])

  const handleChange = (value: string) => {
    setNewInputLabel(value)
  }

  const toggleAllItems = () => {
    const done = lengths.completed < lengths.all
    dispatch(asyncToggleAllTodo(userId, done))
  }

  const addNewItem = (content: string) => {
    dispatch(asyncAddTodo(content, userId))
    setNewInputLabel('')
  }

  const changeTask = (id: string | number, done: boolean, content: string) => {
    dispatch(asyncChangeTodo(id, done, content))
  }

  const changeContent = (id: string | number, value: string) => {
    dispatch(changeTodoContent(id, value))
  }

  const removeItem = (id: string | number) => {
    dispatch(asyncDeleteTodo(id))
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
    <ListContainer>
      <TodoInput
        inputValue={newInputLabel}
        onNewInputChange={handleChange}
        addItem={addNewItem}
        arrowClick={toggleAllItems}
      />
      <StyledList>{listItems}</StyledList>
      <TodoFooter />
    </ListContainer>
  )
}

export default TodoList

const ListContainer = styled('div')`
  background-color: white;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
`

const StyledList = styled('ul')`
  padding: 0;
  margin: 0;
`
