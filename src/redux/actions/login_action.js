import AsyncStore from '../../data/async/AsyncStore.js'
import Strings from '../../utils/constants/Strings.js'
import actions from '../action_types/actions'
import { store } from '../store'

export const login_action = payload => {
  return {
    type: actions.LOG_IN,
    payload: payload
  }
}

export const logout_action = payload => {
  return {
    type: actions.LOG_OUT,
    payload: payload
  }
}

export const update_token = async payload => {
  await AsyncStore.updateData(Strings.ASYNC_KEY.offline_details, {
    accessToken: payload.toString()
  })
  store.dispatch({
    type: actions.UPDATE_TOKEN,
    payload: payload
  })
}

export const set_user_details = payload => {
  return {
    type: actions.SET_USER_DETAILS,
    payload: payload
  }
}
