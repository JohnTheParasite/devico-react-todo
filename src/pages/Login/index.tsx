import React from 'react'
import LoginForm from '@/components/LoginForm'
import styles from './styles.module.scss'

function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginForm type="login"></LoginForm>
    </div>
  )
}

export default Login
