import React from 'react'
import TodoList from '@/components/TodoList'
import logo from '@/images/logo.svg'
import { styled } from '@mui/material'

function Todo() {
  return (
    <CenteredWrapper>
      <Container>
        <StyledHeader>
          <HeaderLabel>todos on</HeaderLabel>
          <AppLogo src={logo} alt="logo" />
        </StyledHeader>
        <TodoList />
      </Container>
    </CenteredWrapper>
  )
}

export default Todo

const CenteredWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled('div')`
  width: 550px;
`

const StyledHeader = styled('header')`
  display: flex;
  justify-content: center;
`

const HeaderLabel = styled('h1')`
  display: flex;
  justify-content: center;
  font-size: 100px;
  font-weight: 100;
  color: rgba(175, 47, 47, 0.15);
  margin: 5px auto;
`

const AppLogo = styled('img')`
  width: 25%;
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
