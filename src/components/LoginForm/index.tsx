import React, { useState } from 'react'
import { Button, TextField, Alert } from '@mui/material'
import { useFormik, Field, FormikProvider } from 'formik'
import * as yup from 'yup'
import logo from '@/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import Api from '@/services/api'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorMessage, UserResponse } from '@/redux/Types'
import { setCurrentUser } from '@/redux/actions'
import { useDispatch } from 'react-redux'
import styles from '@/components/LoginForm/styles.module.scss'

const schemaRegistration = yup.object().shape({
  login: yup.string(),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password should be of minimum 4 characters length').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const schemaLogin = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password should be of minimum 4 characters length').required('Password is required'),
})

interface IFormInput {
  login: string
  email: string
  password: string
  confirmPassword: string
}

export default function LoginForm({ formType }: { formType: string }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginError, setLoginError] = useState('')

  const schema = formType === 'registration' ? schemaRegistration : schemaLogin

  const initialValues = (
    formType === 'registration'
      ? { login: '', email: '', password: '', confirmPassword: '' }
      : { email: '', password: '' }
  ) as IFormInput

  const formik = useFormik({
    initialValues: initialValues as IFormInput,
    validationSchema: schema,
    onSubmit: (values: IFormInput) => {
      if (formType === 'registration') {
        const regData = values
        regData.login = regData.login === '' ? regData.email.split('@')[0] : regData.login
        registration(regData)
      } else {
        login(values)
      }
    },
  })

  const login = (data: IFormInput) => {
    const { email, password } = data
    Api.authorize(email, password)
      .then((res: AxiosResponse<UserResponse>) => {
        if (res?.status === 200) {
          dispatch(setCurrentUser(res.data.user))
          localStorage.setItem('token', res.data.accessToken)
          localStorage.setItem('refreshToken', res.data.refreshToken)
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

  const registration = (data: IFormInput) => {
    const { login, email, password } = data
    Api.register(login, email, password)
      .then((res: AxiosResponse<UserResponse>) => {
        if (res.status === 200) {
          dispatch(setCurrentUser(res.data.user))
          localStorage.setItem('token', res.data.accessToken)
          localStorage.setItem('refreshToken', res.data.refreshToken)
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

  const loginMessage = loginError.length ? <Alert severity="error">{loginError}</Alert> : ''
  const loginTextField = (
    <Field as={TextField} name="login" id="login" label="Login" variant="standard" type="text" size="small" />
  )
  const emailTextField = (
    <Field
      as={TextField}
      name="email"
      id="email"
      label="Email"
      variant="standard"
      required
      placeholder="John.Doe@gmail.com"
      type="text"
      size="small"
    />
  )

  const passwordTextField = (
    <Field
      as={TextField}
      name="password"
      id="password"
      label="Password"
      variant="standard"
      required
      type="password"
      size="small"
    />
  )

  const confirmPasswordTextField = (
    <Field
      as={TextField}
      name="confirmPassword"
      id="confirmPassword"
      label="Confirm password"
      variant="standard"
      required
      type="password"
      size="small"
      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
      helperText={
        formik.touched.confirmPassword && formik.errors.confirmPassword && 'The confirmation password does not match'
      }
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
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            {formType === 'registration' ? loginTextField : ''}
            {emailTextField}
            {passwordTextField}
            {formType === 'registration' ? confirmPasswordTextField : ''}
            {loginMessage}
            <Button variant="contained" color="info" className={styles.button} type="submit">
              {formType === 'registration' ? 'Sign up' : 'Login'}
            </Button>
            {LinkContainer}
          </form>
        </FormikProvider>
      </div>
    </div>
  )
}
