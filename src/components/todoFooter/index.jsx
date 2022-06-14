import React from 'react'
import TodoFilters from '@/components/todoFilters'
import { useTodoData } from '@/hooks/TodoDataProvider'
import styles from './styles.module.scss'

function TodoFooter({ filter, changeFilter, removeDoneTodos }) {
  const { getLength } = useTodoData()
  const { todoLength, todoDoneLength, todoActiveLength } = getLength()

  const footerClasses = `${styles.footer} ${todoLength ? '' : styles.hidden}`
  const removeDoneClasses = `${styles['remove-all-done']} ${todoDoneLength ? '' : styles.hidden}`

  return (
    <div className={footerClasses}>
      <div className={styles['items-left']}>{todoActiveLength} items left</div>
      <TodoFilters filter={filter} changeFilter={changeFilter} />
      <div>
        <div className={removeDoneClasses} onClick={removeDoneTodos} role="button" tabIndex={0}>
          Clear completed
        </div>
      </div>
    </div>
  )
}

export default TodoFooter
