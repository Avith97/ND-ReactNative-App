import actions from '../action_types/actions'

const initialState = {
  token: null,
  refresh_token: null,
  isLoggedIn: false,
  riskProfileCompleted: null,
  tokenType: null,
  userId: null,
  clientId: null,
  roles: null,
  isFamily: 'N'
}

export default AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      return { ...state, ...action.payload }

    case actions.UPDATE_TOKEN:
      return { ...state, token: action.payload }

    case actions.SET_USER_DETAILS:
      return { ...state, ...action.payload }

    case actions.LOG_OUT:
      return {
        token: null,
        refresh_token: null,
        isLoggedIn: false,
        riskProfileCompleted: null,
        tokenType: null,
        userId: null,
        clientId: null,
        roles: null
      }

    default:
      return state
  }
}
