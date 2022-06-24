import React from 'react'
import TodoFilters from '@/components/TodoFilters'
import styles from './styles.module.scss'
import { getLengths } from '@/redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { asyncDeleteCompletedTodos } from '@/redux/actions'

function TodoFooter() {
  const lengths = useSelector(getLengths)
  const dispatch = useDispatch()

  const footerClasses = `${styles.footer} ${lengths.all ? '' : styles.hidden}`
  const removeDoneClasses = `${styles['remove-all-done']} ${lengths.completed ? '' : styles.hidden}`

  const removeDone = () => {
    dispatch(asyncDeleteCompletedTodos())
  }

  return (
    <div className={footerClasses}>
      <div className={styles['items-left']}>{lengths.active} items left</div>
      <TodoFilters />
      <div>
        <div className={removeDoneClasses} onClick={removeDone} role="button" tabIndex={0}>
          Clear completed
        </div>
      </div>
    </div>
  )
}

export default TodoFooter
