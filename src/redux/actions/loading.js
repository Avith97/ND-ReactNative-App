import actions from '../action_types/actions'

export const handleSync = payload => {
  return {
    type: actions.HANDLE_SYNC,
    payload
  }
}
export const handleInit = payload => {
  return {
    type: actions.HANDLE_INIT,
    payload
  }
}

export const handleSoftSync = payload => {
  return {
    type: actions.HANDLE_SOFT_SYNC,
    payload
  }
}
