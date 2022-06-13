import React from 'react'
import TodoFilters from '@/components/todoFilters'
import styles from './styles.module.scss'

function TodoFooter({ itemsLength, itemsDone, itemsLeft, filter, changeFilter, removeDoneTodos }) {
  const footerClasses = `${styles.footer} ${itemsLength ? '' : styles.hidden}`
  const removeDoneClasses = `${styles['remove-all-done']} ${itemsDone ? '' : styles.hidden}`

  return (
    <div className={footerClasses}>
      <div className={styles['items-left']}>{itemsLeft} items left</div>
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
