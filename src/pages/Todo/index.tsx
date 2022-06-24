import React from 'react'
import TodoList from '@/components/TodoList'
import logo from '@/images/logo.svg'
import styles from './styles.module.scss'

function Todo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header>
          <h1 className={styles['header-label']}>todos on</h1>
          <img src={logo} className={styles['App-logo']} alt="logo" />
        </header>
        <TodoList />
      </div>
    </div>
  )
}

export default Todo
