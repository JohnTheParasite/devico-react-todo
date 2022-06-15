import React from 'react'
import { useTodoData } from '@/hooks/TodoDataProvider'
import styles from './styles.module.scss'

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
  const { getLength } = useTodoData()
  const { todoLength, todoDoneLength } = getLength()

  let arrowClasses = styles.arrow
  if (todoLength === 0) {
    arrowClasses = `${styles.arrow} ${styles.invisible}`
  } else if (todoLength === todoDoneLength) {
    arrowClasses = `${styles.arrow} ${styles.darker}`
  }

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
