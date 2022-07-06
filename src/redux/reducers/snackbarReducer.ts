import { ActionFormat, SetSnackbar } from '@/redux/Types'
import { AlertColor } from '@mui/material/Alert/Alert'

export interface IInitialState {
  snackbarOpen: boolean
  snackbarType: AlertColor
  snackbarMessage: string
}

const initialState: IInitialState = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: '',
}

const snackbarReducer = (state = initialState, action: ActionFormat<SetSnackbar>) => {
  switch (action.type) {
    case 'SET_SNACKBAR':
      return {
        ...state,
        snackbarOpen: action.payload.open,
        snackbarType: action.payload.type,
        snackbarMessage: action.payload.message,
      }
    default:
      return state
  }
}

export default snackbarReducer
