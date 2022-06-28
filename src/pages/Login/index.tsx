import React from 'react'
import LoginForm from '@/components/LoginForm'
import styles from './styles.module.scss'

function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginForm formType="login"></LoginForm>
    </div>
  )
}

export default Login
