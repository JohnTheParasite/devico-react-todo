import React, { useState } from 'react'
import { Button, TextField, Alert, styled } from '@mui/material'
import { useFormik, Field, FormikProvider } from 'formik'
import * as yup from 'yup'
import logo from '@/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import Api from '@/services/api'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorMessage, UserResponse } from '@/redux/Types'
import { setCurrentUser } from '@/redux/actions'
import { useDispatch } from 'react-redux'

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
      <StyledLinkContainer>
        <div>Already a user?</div>
        <LinkStyled to="/">LOGIN</LinkStyled>
      </StyledLinkContainer>
    ) : (
      <StyledLinkContainer>
        <div>Need an account?</div>
        <LinkStyled to="/registration">SIGN UP</LinkStyled>
      </StyledLinkContainer>
    )

  return (
    <InnerBlock>
      <LoginBlock>
        <LogoBlock>
          <AppLogo src={logo} alt="logo" />
        </LogoBlock>
        <FormikProvider value={formik}>
          <StyledForm onSubmit={formik.handleSubmit}>
            {formType === 'registration' ? loginTextField : ''}
            {emailTextField}
            {passwordTextField}
            {formType === 'registration' ? confirmPasswordTextField : ''}
            {loginMessage}
            <StyledButton variant="contained" color="info" type="submit">
              {formType === 'registration' ? 'Sign up' : 'Login'}
            </StyledButton>
            {LinkContainer}
          </StyledForm>
        </FormikProvider>
      </LoginBlock>
    </InnerBlock>
  )
}

const InnerBlock = styled('div')`
  width: 400px;
  border-radius: 0.428rem;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
`

const LoginBlock = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 21px;
  gap: 14px;
`

const LogoBlock = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: rgb(96, 216, 249);
`

const AppLogo = styled('img')`
  width: 20%;
  height: auto;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const StyledLinkContainer = styled('div')`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  color: grey;
  font-size: 14px;
`

const StyledButton = styled(Button)`
  margin: 15px 0;
`

const LinkStyled = styled(Link)`
  color: black;
`

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 14px;
`
