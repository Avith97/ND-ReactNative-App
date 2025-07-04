import actions from '../action_types/actions'

const initialState = {
  eventData: null
}

export default EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_EVENT_DETAILS:
      return { ...state, ...action.payload }

    case actions.LOG_OUT:
      return {
        eventData: null
      }

    default:
      return state
  }
}
