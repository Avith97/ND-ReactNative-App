import actions from '../action_types/actions'

export const handleSetOngoingEvents = payload => {
  return {
    type: actions.SET_ONGOING_EVENTS,
    payload
  }
}
