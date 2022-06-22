import { ActionFormat, SetFilterAction } from '@/redux/actionTypes'

export interface IInitialState {
  filter: string
}

const initialState: IInitialState = {
  filter: 'All',
}

const filterReducer = (state = initialState, action: ActionFormat<SetFilterAction>) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      }
    default:
      return state
  }
}

export default filterReducer
