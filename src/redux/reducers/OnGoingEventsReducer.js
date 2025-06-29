import actions from '../action_types/actions'

const initialState = {
  onGoingEvents: []
}

export default OnGoingEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ONGOING_EVENTS:
      return { ...state, onGoingEvents: [...action.payload] }

    case actions.LOG_OUT:
      return {
        onGoingEvents: []
      }

    default:
      return state
  }
}
