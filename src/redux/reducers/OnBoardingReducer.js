import actions from '../action_types/actions'

const initialState = {
  list: [],
  image: [],
  'list-multiselect': [],
  'check-box': []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_ONBOARDING_DATA:
      return { ...state, ...payload }

    default:
      return state
  }
}
