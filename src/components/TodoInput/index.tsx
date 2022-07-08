import React from 'react'
import { getLengths } from '@/redux/selectors'
import { useSelector } from 'react-redux'
import { styled, css } from '@mui/material'

function TodoInput({
  inputValue,
  onNewInputChange,
  addItem,
  arrowClick,
}: {
  inputValue: string
  onNewInputChange: (v: string) => void
  addItem: (v: string) => void
  arrowClick: () => void
}) {
  const lengths = useSelector(getLengths)

  const handleChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    onNewInputChange(target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    if (event.key === 'Enter' && target.value.trim()) {
      addItem(target.value.trim())
    }
  }

  return (
    <InputContainer>
      <Arrow
        invisible={lengths.all === 0 ? 1 : 0}
        darker={lengths.all === lengths.completed ? 1 : 0}
        onClick={arrowClick}
        role="button"
        tabIndex={0}
      />
      <AddInput
        name="newItemLabel"
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </InputContainer>
  )
}

export default TodoInput

const InputContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`

const invisibleArrow = css`
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
`

const darkerArrow = css`
  border-right: 3px solid rgb(119, 119, 119);
  border-bottom: 3px solid rgb(119, 119, 119);
`

const Arrow = styled('div')<{
  invisible: number
  darker: number
}>`
  ${({ darker }) => (darker ? darkerArrow : '')}
  ${({ invisible }) => (invisible ? invisibleArrow : '')}
  width: 10px;
  height: 10px;
  border-right: 3px solid #d9d9d9;
  border-bottom: 3px solid #d9d9d9;
  transform: rotate(45deg);
  margin: 0 20px 3px 20px;
`

const AddInput = styled('input')`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px 16px 11px;
  font-size: 24px;
  border: none;
  outline: none;
  &::placeholder {
    font-style: italic;
    color: #d9d9d9;
  }
`
