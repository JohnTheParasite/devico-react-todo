import React from 'react'
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '@/constants'
import styles from './styles.module.scss'
import { getFilter, useTypedSelector } from '@/redux/selectors'
import { useDispatch } from 'react-redux'
import { setFilter } from '@/redux/actions'

function TodoFilters() {
  const filter = useTypedSelector((state) => getFilter(state))
  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement
    dispatch(setFilter(target.innerText))
  }

  const filterAllClasses = `${styles.filter} ${filter === FILTER_ALL ? styles.active : ''}`
  const filterActiveClasses = `${styles.filter} ${filter === FILTER_ACTIVE ? styles.active : ''}`
  const filterCompletedClasses = `${styles.filter} ${filter === FILTER_COMPLETED ? styles.active : ''}`

  return (
    <div className={styles.filters}>
      <div className={filterAllClasses} onClick={handleClick} role="button" tabIndex={0}>
        All
      </div>
      <div className={filterActiveClasses} onClick={handleClick} role="button" tabIndex={0}>
        Active
      </div>
      <div className={filterCompletedClasses} onClick={handleClick} role="button" tabIndex={0}>
        Completed
      </div>
    </div>
  )
}

export default TodoFilters
