import { api } from '../../services/axios/Api'
import actions from '../action_types/actions'

const initialState = {
  environment: 'LIVE', //ignore
  isLoading: false,
  isInitiating: true,
  isSoftSyncing: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.HANDLE_SYNC:
      return { ...state, isLoading: payload }

    case actions.HANDLE_SOFT_SYNC:
      return { ...state, isSoftSyncing: payload }
    case actions.HANDLE_INIT:
      return { ...state, isInitiating: payload }

    case actions.SET_ENVIRONMENT:
      // api.refreshInstance()
      return { ...state, environment: payload }

    default:
      return state
  }
}
