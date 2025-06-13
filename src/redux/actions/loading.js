import actions from '../action_types/actions'

export const handleSync = payload => {
  return {
    type: actions.HANDLE_SYNC,
    payload
  }
}
