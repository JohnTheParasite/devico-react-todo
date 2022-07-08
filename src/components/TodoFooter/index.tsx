import React from 'react'
import TodoFilters from '@/components/TodoFilters'
import { getCurrentUserId, getLengths } from '@/redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { asyncDeleteCompletedTodos } from '@/redux/actions'
import { styled } from '@mui/material'

function TodoFooter() {
  const userId = useSelector(getCurrentUserId) as string
  const lengths = useSelector(getLengths)
  const dispatch = useDispatch()

  const removeDone = () => {
    dispatch(asyncDeleteCompletedTodos(userId))
  }

  return (
    <Footer show={lengths.all}>
      <ItemsLeft>{lengths.active} items left</ItemsLeft>
      <TodoFilters />
      <div>
        <ButtonRemoveDone show={lengths.completed} onClick={removeDone} role="button" tabIndex={0}>
          Clear completed
        </ButtonRemoveDone>
      </div>
    </Footer>
  )
}

export default TodoFooter

const Footer = styled('div')<{
  show: number
}>`
  display: ${({ show }) => (show ? 'grid' : 'none')};
  grid-template-columns: 1fr 2fr 1fr;
  padding: 10px 15px;
  color: rgb(119, 119, 119);
  font-size: 14px;
`

const ItemsLeft = styled('div')`
  display: flex;
  align-items: center;
`

const ButtonRemoveDone = styled('div')<{
  show: number
}>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  cursor: pointer;
  text-align: right;
  margin: 3px;
  padding: 3px 0 3px 7px;

  &:hover {
    text-decoration: underline;
  }
`
