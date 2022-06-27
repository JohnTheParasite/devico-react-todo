import React from 'react'
import styles from './styles.module.scss'
import logo from '@/images/logo.svg'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  login: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

interface IFormInput {
  login: string
  email: string
  password: string
  confirmPassword: string
}

export default function LoginForm({ type }: { type: string }) {
  console.log(type)
  const formMethods = useForm<IFormInput>({
    resolver: yupResolver(schema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods

  function onSubmit(data: IFormInput) {
    console.log(data)
  }

  return (
    <div className={styles.inner}>
      <div className={styles.login}>
        <div className={styles.logo}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Login" variant="standard" required={true} type="text" size="small" {...register('login')} />
          <TextField
            label="Email"
            variant="standard"
            required={true}
            placeholder="John.Doe@gmail.com"
            type="email"
            size="small"
            {...register('email')}
          />
          <TextField
            label="Password"
            variant="standard"
            required={true}
            type="password"
            size="small"
            {...register('password')}
          />
          <TextField
            label="Confirm password"
            variant="standard"
            required={true}
            type="password"
            size="small"
            {...register('confirmPassword')}
          ></TextField>
          <Button variant="contained" className={styles.button} type="submit">
            Sign up
          </Button>
        </form>
        <div className={styles['link-container']}>
          <div>Already a user?</div>
          <Link to="/" className={styles.link}>
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  )
}
