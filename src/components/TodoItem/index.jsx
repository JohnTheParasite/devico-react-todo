import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

function TodoItem({ id, done, content, changeTask, changeContent, removeItem }) {
  const inputEl = React.useRef(null)
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    if (edit) {
      inputEl.current.focus()
    }
  }, [edit])

  const toggleDone = () => {
    changeTask(id, !done, content)
  }

  const changePropContent = (event) => {
    const newContent = event.target.value.trim()
    changeContent(id, newContent)
  }

  const beforeChangeContent = () => {
    const newContent = inputEl.current.value.trim()

    if (newContent) {
      changeTask(id, done, newContent)

      setEdit(false)
    } else {
      removeItem(id)
    }
  }

  const handleKeyDown = (event) => {
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
        <input type="checkbox" className={styles.checkbox} value={done} checked={done} onChange={toggleDone} />
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
