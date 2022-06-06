import React from 'react'
import TodoList from '@/components/TodoList'
import logo from '@/../public/logo.svg'
import styles from './styles.module.scss'

class Todo extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <header>
          <h1 className={styles['header-label']}>todos on</h1>
          <img src={logo} className={styles['App-logo']} alt="logo" />
        </header>
        <TodoList />
      </div>
    )
  }
}

export default Todo
