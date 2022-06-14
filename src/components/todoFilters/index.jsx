import React from 'react'
import { useTodoData } from '@/hooks/TodoDataProvider'
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '@/constants'
import styles from './styles.module.scss'

function TodoFilters() {
  const { filter, changeFilter } = useTodoData()
  const handleClick = (event) => {
    changeFilter(event.target.innerText)
  }

  const filterAllClasses = `${styles.filter} ${filter === FILTER_ALL ? styles.active : ''}`
  const filterActiveClasses = `${styles.filter} ${filter === FILTER_ACTIVE ? styles.active : ''}`
  const filterCompletedClasses = `${styles.filter} ${filter === FILTER_COMPLETED ? styles.active : ''}`

  return (
    <div className={styles.filters}>
      <div className={filterAllClasses} onClick={handleClick} role="button" tabIndex="0">
        All
      </div>
      <div className={filterActiveClasses} onClick={handleClick} role="button" tabIndex="0">
        Active
      </div>
      <div className={filterCompletedClasses} onClick={handleClick} role="button" tabIndex="0">
        Completed
      </div>
    </div>
  )
}

export default TodoFilters
