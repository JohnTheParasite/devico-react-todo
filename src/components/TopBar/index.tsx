import React, { useEffect } from 'react'
import { Avatar, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import avatar from '@/images/avatar.gif'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '@/redux/selectors'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { setCurrentUser } from '@/redux/actions'

export default function TopBar() {
  const currentUser = useSelector(getCurrentUser)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser === null) {
      navigate('/')
      return
    }
  }, [])

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    dispatch(setCurrentUser(null))
    navigate('/')
    handleCloseUserMenu()
  }

  const topBarStyles = `${styles.container} ${currentUser === null ? styles.hidden : ''}`
  const role = currentUser?.roleId === 1 ? 'user' : currentUser?.roleId === 2 ? 'admin' : 'super admin'

  return (
    <div className={topBarStyles}>
      <div className={styles['top-bar']}>
        <div></div>
        <div className={styles.text}>
          Welcome,
          <div className={styles.username}>{currentUser?.login}</div>
          <div className={styles.role}>({role})</div>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="avatar" src={avatar} className={styles.avatar} />
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
        </div>
      </div>
    </div>
  )
}
