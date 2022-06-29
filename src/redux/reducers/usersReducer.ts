import { ActionFormat, UserType, SetCurrentUser } from '@/redux/Types'

export interface IInitialState {
  currentUser: UserType | null
}

const initialState: IInitialState = {
  currentUser: null,
}

const usersReducer = (state = initialState, action: ActionFormat<SetCurrentUser>) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload.user,
      }
    default:
      return state
  }
}

export default usersReducer
