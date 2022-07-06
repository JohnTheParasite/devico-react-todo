import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { getSnackbarMessage, getSnackbarOpen, getSnackbarType } from '@/redux/selectors'
import { setSnackbar } from '@/redux/actions'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
  const dispatch = useDispatch()
  const snackbarOpen = useSelector(getSnackbarOpen)
  const snackbarType = useSelector(getSnackbarType)
  const snackbarMessage = useSelector(getSnackbarMessage)

  const handleClick = () => {
    dispatch(setSnackbar(true, 'success', 'hey new message'))
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setSnackbar(false, snackbarType, ''))
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
