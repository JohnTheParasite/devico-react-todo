import React from 'react'
import TodoList from '@/components/TodoList'
import logo from '@/../public/logo.svg'
import { FilterProvider } from '@/hooks/filterProvider'
import styles from './styles.module.scss'

function Todo() {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles['header-label']}>todos on</h1>
        <img src={logo} className={styles['App-logo']} alt="logo" />
      </header>
      <FilterProvider>
        <TodoList />
      </FilterProvider>
    </div>
  )
}

export default Todo
