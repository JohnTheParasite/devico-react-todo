import React from 'react'
import TodoFilters from '@/components/todoFilters'
import styles from './styles.module.scss'
import { getLengths, useTypedSelector } from '@/redux/selectors'
import { useDispatch } from 'react-redux'
import { deleteCompletedTodos } from '@/redux/actions'

function TodoFooter() {
  const lengths = useTypedSelector((state) => getLengths(state))
  const dispatch = useDispatch()

  const footerClasses = `${styles.footer} ${lengths.all ? '' : styles.hidden}`
  const removeDoneClasses = `${styles['remove-all-done']} ${lengths.completed ? '' : styles.hidden}`

  const removeDone = () => {
    dispatch(deleteCompletedTodos())
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
