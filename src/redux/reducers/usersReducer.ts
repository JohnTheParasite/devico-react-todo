import { ActionFormat, UserType, SetCurrentUser, SetUserIsPending } from '@/redux/Types'

export interface IInitialState {
  isPending: boolean
  currentUser: UserType | null
}

const initialState: IInitialState = {
  isPending: true,
  currentUser: null,
}

type Action = ActionFormat<SetCurrentUser | SetUserIsPending>

const usersReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      const { user } = action.payload as SetCurrentUser
      return {
        ...state,
        currentUser: user,
      }
    }

    case 'SET_USER_IS_PENDING': {
      const { isPending } = action.payload as SetUserIsPending
      return {
        ...state,
        isPending: isPending,
      }
    }
    default:
      return state
  }
}

export default usersReducer
