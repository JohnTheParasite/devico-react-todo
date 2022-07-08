import React, { useEffect } from 'react'
import { Avatar, Tooltip, IconButton, Menu, MenuItem, Typography, styled } from '@mui/material'
import avatar from '@/images/avatar.gif'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '@/redux/selectors'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser, setUserIsPending } from '@/redux/actions'
import Api from '@/services/api'
import axios from 'axios'

export default function TopBar() {
  const currentUser = useSelector(getCurrentUser)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const refreshToken = localStorage.getItem('refreshToken') as string
    if (!refreshToken) {
      dispatch(setUserIsPending(false))
      return
    }

    await axios
      .post('http://localhost:8081/api/refresh', { refreshToken })
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setCurrentUser(res.data.user))
        navigate('/todos')
      })
      .catch((e) => {
        console.log(e.response?.data?.message)
        navigate('/')
      })
      .finally(() => {
        dispatch(setUserIsPending(false))
      })
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = async () => {
    handleCloseUserMenu()
    await Api.logout(localStorage.getItem('refreshToken') as string)
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    dispatch(setCurrentUser(null))
    navigate('/')
  }

  const role = currentUser?.roleId === 1 ? 'user' : currentUser?.roleId === 2 ? 'admin' : 'super admin'

  return (
    <TopBarContainer ishidden={currentUser === null ? 1 : 0}>
      <TopFlexBar>
        <div></div>
        <Text>
          Welcome,
          <TextUsername>{currentUser?.login}</TextUsername>
          <TextRole>({role})</TextRole>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <StyledAvatar alt="avatar" src={avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="logout" onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Text>
      </TopFlexBar>
    </TopBarContainer>
  )
}

const TopBarContainer = styled('div')<{
  ishidden: number
}>`
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  z-index: 22;
  display: ${({ ishidden }) => (ishidden ? 'none' : 'block')};
`

const TopFlexBar = styled('div')`
  padding: 0.8rem 1rem;
  background: white;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.428rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Text = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`

const TextUsername = styled('div')`
  font-weight: bold;
`

const TextRole = styled('div')`
  margin-right: 0.6rem;
`

const StyledAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
  cursor: pointer;
`
