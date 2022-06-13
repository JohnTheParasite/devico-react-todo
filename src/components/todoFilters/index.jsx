import React from 'react'
import styles from './styles.module.scss'

function TodoFilters({ filter, changeFilter }) {
  const handleClick = (event) => {
    changeFilter(event.target.innerText)
  }

  const filterAllClasses = `${styles.filter} ${filter === 'All' ? styles.active : ''}`
  const filterActiveClasses = `${styles.filter} ${filter === 'Active' ? styles.active : ''}`
  const filterCompletedClasses = `${styles.filter} ${filter === 'Completed' ? styles.active : ''}`

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
