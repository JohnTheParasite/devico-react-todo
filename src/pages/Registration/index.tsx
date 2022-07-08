import React from 'react'
import LoginForm from '@/components/LoginForm'
import { styled } from '@mui/material'

function Registration() {
  return (
    <PageCenteredWrapper>
      <LoginForm formType="registration"></LoginForm>
    </PageCenteredWrapper>
  )
}

export default Registration

const PageCenteredWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`
