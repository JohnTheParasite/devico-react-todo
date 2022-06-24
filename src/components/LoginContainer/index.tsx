import React, { useState } from 'react'
import styles from './styles.module.scss'
import logo from '@/images/logo.svg'
import { Button, TextField } from '@mui/material'

function LoginContainer() {
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function changeLogin(event: React.ChangeEvent<HTMLInputElement>) {
    setLogin(event.currentTarget.value.trim())
  }

  function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value.trim())
  }

  function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value.trim())
  }

  const buttonDisabled = login.length === 0 || email.length === 0 || password.length === 0

  return (
    <div className={styles.inner}>
      <div className={styles.login}>
        <div className={styles.logo}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
        </div>
        <TextField
          label="Login"
          variant="standard"
          required={true}
          type="text"
          size="small"
          value={login}
          onChange={changeLogin}
        ></TextField>
        <TextField
          label="Email"
          variant="standard"
          required={true}
          placeholder="John.Doe@gmail.com"
          type="email"
          size="small"
          value={email}
          onChange={changeEmail}
        ></TextField>
        <TextField
          label="Password"
          variant="standard"
          required={true}
          type="password"
          size="small"
          value={password}
          onChange={changePassword}
        ></TextField>
        <Button variant="contained" className={styles.button} disabled={buttonDisabled}>
          Create account
        </Button>
      </div>
    </div>
  )
}

export default LoginContainer
