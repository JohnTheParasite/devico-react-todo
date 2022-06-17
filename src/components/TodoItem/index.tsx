import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type TodoItemPropsTypes = {
  id: string
  done: boolean
  content: string
  changeTask: (id: string, done: boolean, content: string) => void
  changeContent: (id: string, value: string) => void
  removeItem: (id: string) => void
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

  const previewClasses = `${styles.preview} ${edit ? styles.hidden : ''}`
  const editInputClasses = `${styles.edit} ${!edit ? styles.hidden : ''}`
  const listItemClasses = `${styles['list-item']} ${done ? styles.done : ''}`

  return (
    <li className={listItemClasses}>
      <div className={previewClasses}>
        <input type="checkbox" className={styles.checkbox} checked={done} onChange={toggleDone} />
        <p className={styles.paragraph} onDoubleClick={toggleEdit}>
          {content}
        </p>
        <div className={styles.remove} onClick={removeTodo} role="button" tabIndex={0}>
          ×
        </div>
      </div>

      <input
        type="text"
        ref={inputEl}
        className={editInputClasses}
        value={content}
        onChange={changePropContent}
        onBlur={beforeChangeContent}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}

export default TodoItem
