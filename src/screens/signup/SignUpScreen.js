import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SignupUI from './SignupUI'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import Strings from '../../utils/constants/Strings'

const SignUpScreen = (props) => {

    const [state, setstate] = useState({
        userId: null
    })

    function handleChange(params, val) {
        setstate({ ...state, [params]: val })
    }


    function validate() {
        let isValid = true
        if (!state.userId) {
            isValid = false
            appsnackbar.showErrMsg('Please enter valid Email/Mobile Number')
        }
        return isValid
    }


    function handleSubmit(params) {
        if (params === 'otp') {
            props.navigation.navigate(Strings.NAVIGATION.otp)
            return
        }
        let isValid = validate()
        if (!isValid) return

    }

    return (
        <View style={{ flex: 1 }}>
            <SignupUI
                {...props}
                {...state}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </View>
    )
}

export default SignUpScreen