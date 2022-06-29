import React, { useState } from 'react'
import styles from './styles.module.scss'
import logo from '@/images/logo.svg'
import { Button, TextField, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import Api from '@/services/api'
import { AxiosResponse, AxiosError } from 'axios'
import { ErrorMessage, UserType } from '@/redux/Types'
import { setCurrentUser } from '@/redux/actions'

const schemaReg = yup.object().shape({
  login: yup.string(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const schemaLog = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
})

interface IFormInputReg {
  login: string
  email: string
  password: string
  confirmPassword: string
}

interface IFormInputLog {
  email: string
  password: string
}

export default function LoginForm({ formType }: { formType: string }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let validationError = ''
  const [loginError, setLoginError] = useState('')

  type IFormInput = IFormInputReg | IFormInputLog

  const schema = formType === 'registration' ? schemaReg : schemaLog

  const formMethods = useForm<IFormInput>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: IFormInput) => {
    if (formType === 'registration') {
      const regData = data as IFormInputReg
      regData.login = regData.login === '' ? regData.email.split('@')[0] : regData.login
      registration(regData)
    } else {
      login(data as IFormInputLog)
    }
  }

  const login = (data: IFormInputLog) => {
    const { email, password } = data
    Api.authorize(email, password)
      .then((res: AxiosResponse<UserType>) => {
        if (res.status === 200) {
          dispatch(setCurrentUser(res.data))
          navigate('/todos')
        }
      })
      .catch((res: AxiosError<ErrorMessage>) => {
        let error = ''
        if (res.response?.status === 400) {
          error = res.response?.data.message
        }
        setLoginError(error)
      })
  }

  const registration = (data: IFormInputReg) => {
    const { login, email, password } = data
    Api.register(login, email, password)
      .then((res: AxiosResponse<UserType>) => {
        if (res.status === 200) {
          dispatch(setCurrentUser(res.data))
          navigate('/todos')
        }
      })
      .catch((res: AxiosError<ErrorMessage>) => {
        let error = ''
        if (res.response?.status === 400) {
          error = res.response?.data.message
        }
        setLoginError(error)
      })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods

  if (formType === 'login') {
    if ('email' in errors) {
      validationError = 'Email must be valid'
    } else if ('password' in errors) {
      validationError = errors.password?.message as string
    }
  }

  const alertMessage = validationError.length ? <Alert severity="error">{validationError}</Alert> : ''
  const loginMessage = loginError.length ? <Alert severity="error">{loginError}</Alert> : ''

  const loginTextField = <TextField label="Login" variant="standard" type="text" size="small" {...register('login')} />

  const confirmPasswordTextField = (
    <TextField
      label="Confirm password"
      variant="standard"
      required={true}
      type="password"
      size="small"
      error={'confirmPassword' in errors}
      helperText={'confirmPassword' in errors ? 'The confirmation password does not match' : ''}
      {...register('confirmPassword')}
    />
  )

  const emailTextFieldReg = (
    <TextField
      label="Email"
      variant="standard"
      required={true}
      placeholder="John.Doe@gmail.com"
      type="text"
      size="small"
      error={'email' in errors}
      helperText={'email' in errors ? 'Email must be valid' : ''}
      {...register('email')}
    />
  )

  const emailTextFieldLog = (
    <TextField
      label="Email"
      variant="standard"
      required={true}
      placeholder="John.Doe@gmail.com"
      type="text"
      size="small"
      {...register('email')}
    />
  )

  const LinkContainer =
    formType === 'registration' ? (
      <div className={styles['link-container']}>
        <div>Already a user?</div>
        <Link to="/" className={styles.link}>
          LOGIN
        </Link>
      </div>
    ) : (
      <div className={styles['link-container']}>
        <div>Need an account?</div>
        <Link to="/registration" className={styles.link}>
          SIGN UP
        </Link>
      </div>
    )

  return (
    <div className={styles.inner}>
      <div className={styles.login}>
        <div className={styles.logo}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formType === 'registration' ? loginTextField : ''}
          {formType === 'registration' ? emailTextFieldReg : emailTextFieldLog}
          <TextField
            label="Password"
            variant="standard"
            required={true}
            type="password"
            size="small"
            {...register('password')}
          />
          {formType === 'registration' ? confirmPasswordTextField : ''}
          {alertMessage}
          {loginMessage}
          <Button variant="contained" className={styles.button} type="submit">
            {formType === 'registration' ? 'Sign up' : 'Login'}
          </Button>
          {LinkContainer}
        </form>
      </div>
    </div>
  )
}
