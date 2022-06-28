import React from 'react'
import LoginForm from '@/components/LoginForm'
import styles from './styles.module.scss'

function Registration() {
  return (
    <div className={styles.wrapper}>
      <LoginForm formType="registration"></LoginForm>
    </div>
  )
}

export default Registration
