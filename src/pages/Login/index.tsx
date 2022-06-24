import React from 'react'
import LoginContainer from '@/components/LoginContainer'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginContainer></LoginContainer>
    </div>
  )
}

export default Login
