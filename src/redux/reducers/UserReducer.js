import actions from "../action_types/actions"

const initialState = {
    username: null,
    email: null,
    mobileNo: null,
    fullName: null,
    pan: null
}

export default UserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.SET_USER_DETAILS:
            return { ...state, ...payload }
        case actions.LOG_OUT:
            return {
                username: null,
                email: null,
                mobileNo: null,
                fullName: null,
                pan: null
            }

        default:
            return state
    }
}
