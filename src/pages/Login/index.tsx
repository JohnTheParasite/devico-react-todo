import React from 'react'
import LoginForm from '@/components/LoginForm'
import { styled } from '@mui/material'

function Login() {
  return (
    <PageCenteredWrapper>
      <LoginForm formType="login"></LoginForm>
    </PageCenteredWrapper>
  )
}

export default Login

const PageCenteredWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`
