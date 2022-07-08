import React from 'react'
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '@/constants'
import { getFilter } from '@/redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@/redux/actions'
import { styled, css } from '@mui/material'

function TodoFilters() {
  const filter = useSelector(getFilter)
  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement
    dispatch(setFilter(target.innerText))
  }

  return (
    <Filters>
      <Filter active={filter === FILTER_ALL ? 1 : 0} onClick={handleClick} role="button" tabIndex={0}>
        All
      </Filter>
      <Filter active={filter === FILTER_ACTIVE ? 1 : 0} onClick={handleClick} role="button" tabIndex={0}>
        Active
      </Filter>
      <Filter active={filter === FILTER_COMPLETED ? 1 : 0} onClick={handleClick} role="button" tabIndex={0}>
        Completed
      </Filter>
    </Filters>
  )
}

export default TodoFilters

const Filters = styled('div')`
  display: flex;
  justify-content: center;
  gap: 5px;
`

const activeStyles = css`
  border: 1px solid rgba(175, 47, 47, 0.2);
  border-radius: 3px;
`

const Filter = styled('div')<{
  active: number
}>`
  margin: 3px;
  padding: 3px 7px;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(175, 47, 47, 0.1);
    border-radius: 3px;
  }
  ${({ active }) => (active ? activeStyles : '')}
`
