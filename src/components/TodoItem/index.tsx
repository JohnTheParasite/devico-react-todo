import React, { useEffect, useState } from 'react'
import { css, styled } from '@mui/material'

type TodoItemPropsTypes = {
  id: string | number
  done: boolean
  content: string
  changeTask: (id: string | number, done: boolean, content: string) => void
  changeContent: (id: string | number, value: string) => void
  removeItem: (id: string | number) => void
}

function TodoItem({ id, done, content, changeTask, changeContent, removeItem }: TodoItemPropsTypes) {
  const inputEl = React.useRef<HTMLInputElement>(null)
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    if (edit) {
      const currentInput = inputEl.current as HTMLInputElement
      currentInput.focus()
    }
  }, [edit])

  const toggleDone = () => {
    changeTask(id, !done, content)
  }

  const changePropContent = () => {
    const currentInput = inputEl.current as HTMLInputElement
    const newContent = currentInput.value.trim()
    changeContent(id, newContent)
  }

  const beforeChangeContent = () => {
    const currentInput = inputEl.current as HTMLInputElement
    const newContent = currentInput.value.trim()

    if (newContent) {
      changeTask(id, done, newContent)

      setEdit(false)
    } else {
      removeItem(id)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      beforeChangeContent()
    }
  }

  const toggleEdit = () => {
    setEdit(!edit)
  }

  const removeTodo = () => {
    removeItem(id)
  }

  return (
    <ListItem>
      <Preview ishidden={edit ? 1 : 0}>
        <Checkbox ishidden={edit ? 1 : 0} type="checkbox" checked={done} onChange={toggleDone} />
        <Paragraph done={done ? 1 : 0} onDoubleClick={toggleEdit}>
          {content}
        </Paragraph>
        <Remove className="remove" onClick={removeTodo} role="button" tabIndex={0}>
          ×
        </Remove>
      </Preview>

      <Edit
        show={edit ? 0 : 1}
        type="text"
        ref={inputEl}
        value={content}
        onChange={changePropContent}
        onBlur={beforeChangeContent}
        onKeyDown={handleKeyDown}
      />
    </ListItem>
  )
}

export default TodoItem

const ListItem = styled('li')`
  display: flex;
  align-items: center;
  font-size: 24px;
  border-bottom: 1px solid #d9d9d9;
  &:hover {
    .remove {
      display: block;
    }
  }
`

const Remove = styled('div')`
  display: none;
  cursor: default;
  color: #cc9a9a;
  margin-right: 20px;
  font-size: 30px;

  &:hover {
    color: #ae5a5d;
  }
`

const Preview = styled('div')<{
  ishidden: number
}>`
  align-items: center;
  width: 100%;
  display: ${({ ishidden }) => (ishidden ? 'none' : 'flex')};
`

const Edit = styled('input')<{
  show: number
}>`
  display: ${({ show }) => (show ? 'none' : 'block')};
  box-sizing: border-box;
  width: 100%;
  padding: 11px 16px 11px 9px;
  font-size: 24px;
  outline: none;
  margin-left: 53px;
`

const Checkbox = styled('input')<{
  ishidden: number
}>`
  appearance: none;
  display: ${({ ishidden }) => (ishidden ? 'none' : '')};

  &::before {
    content: '';
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    width: 30px;
    height: 30px;
    border: 1px solid #e1edeb;
    border-radius: 50%;
  }

  &:checked::before {
    content: '✓';
    color: #5cc0ae;
    border: 1px solid rgba(92, 192, 174, 0.35);
  }
`

const donePStyle = css`
  text-decoration: line-through;
  color: #d9d9d9;
  transition: all 0.2s ease;
`

const Paragraph = styled('p')<{
  done: number
}>`
  ${({ done }) => (done ? donePStyle : '')}
  cursor: default;
  margin: 15px 15px;
  width: 100%;
`
