import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SignupUI from './SignupUI'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import Strings from '../../utils/constants/Strings'
import { services } from '../../services/axios/services'
import { URL } from '../../utils/constants/Urls'

const SignUpScreen = (props) => {

    const [state, setstate] = useState({
        userId: '',
        showOtp: false
    })

    useEffect(() => {
        console.log('state -->', state)


    }, [state.showOtp])


    function handleChange(params, val) {
        if (params === 'change') {
            setstate({ ...state, showOtp: false })
            return
        }
        setstate({ ...state, [params]: val })
    }


    function validate() {
        let isValid = true
        if (!state?.userId?.length) {
            isValid = false
            appsnackbar.showErrMsg('Please enter valid Email/Mobile Number')
        }
        return isValid
    }


    async function handleSubmit(params) {
        console.log('handleSubmit -->', params)
    // if (params === 'otp') {
    //     props.navigation.navigate(Strings.NAVIGATION.otp)
    //     return
    // }
        let isValid = validate()
        if (!isValid) return
        try {
            if (params === 'signup') {
                let resp = await services._postFormData(state.userId, { byEmail: true })
                if (resp.type !== 'success') return
                console.log('resp', resp)
                if (resp.data.success.code === '404') {
                    handleChange('showOtp', true)
                }
            }
            else if (params === 'otp') {
                let resp = await services._post(URL.otp, {
                    distKey: "TXK8vWYRPSXm08uXrZYV0g==",
                    userName: state.userId
                })
                if (resp.type !== 'success') return
                if (resp.data.success.code === '200') {
                    // appsnackbar.showSuccessMsg(resp?.data?.success?.verbose)
                    props.navigation.navigate(Strings.NAVIGATION.otp, {
                        userId: state.userId,
                        message: resp?.data?.success?.verbose
                    })
                }
            }
        } catch (error) {
            console.log('try err -->', error)
        }


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