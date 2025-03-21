import { View, Text } from 'react-native'
import React, { useState } from 'react'
import LoginUI from './LoginUI'
import Snackbar from 'react-native-snackbar'
import Colors from '../../utils/constants/Colors'
import Fonts from '../../utils/constants/Fonts'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import Strings from '../../utils/constants/Strings'

const LoginScreen = (props) => {
    const [state, setstate] = useState({
        userId: null
    })

    const [err, seterr] = useState(null)


    async function handleChange(params, val) {
        setstate({
            ...state,
            [params]: val
        })
    }

    function validate(params) {
        let err = {}
        let isValid = true
        if (!state.userId) {
            isValid = false
            err = { userIdErr: true }
            console.log('invalid')
            appsnackbar.showErrMsg('Please enter valid email or mobile number')
        }

        seterr(err)
        setTimeout(() => { seterr(null) }, 1000 * 5);

        return isValid
    }

    async function handleSubmit(params) {
        if (params === 'signup') {
            props.navigation.navigate(Strings.NAVIGATION.signup)
            return
        }
        let isValid = validate()
        if (!isValid) return

        // console.log(state)
    }


    return (
        <View style={{ flex: 1 }}>
            <LoginUI
                {...props}
                {...state}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </View>
    )
}

export default LoginScreen