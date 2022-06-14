import React from 'react'
import { useTodoData } from '@/hooks/TodoDataProvider'
import styles from './styles.module.scss'

function TodoInput({ inputValue, onNewInputChange, addItem, arrowClick }) {
  const { getLength } = useTodoData()
  const { todoLength, todoDoneLength } = getLength()

  let arrowClasses = styles.arrow
  if (todoLength === 0) {
    arrowClasses = `${styles.arrow} ${styles.invisible}`
  } else if (todoLength === todoDoneLength) {
    arrowClasses = `${styles.arrow} ${styles.darker}`
  }

  const handleChange = (event) => {
    onNewInputChange(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      addItem(event.target.value.trim())
    }
  }

  return (
    <div className={styles.input}>
      <div className={arrowClasses} onClick={arrowClick} role="button" tabIndex={0} />
      <input
        name="newItemLabel"
        className={styles['add-input']}
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default TodoInput
