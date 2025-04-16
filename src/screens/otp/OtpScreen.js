import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import OtpUI from './OtpUI'
import { useRoute } from '@react-navigation/native'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { services } from '../../services/axios/services'
import { URL } from '../../utils/constants/Urls'
import Strings from '../../utils/constants/Strings'

const OtpScreen = (props) => {
    const route = useRoute()
    const [state, setstate] = useState({
        otp: '',
        userId: ''
    })

    const [err, seterr] = useState({
        otpErr: false
    })

    useEffect(() => {
        let msg = route.params.message
        let userId = route.params.userId
        handleChange('userId', userId)
        appsnackbar.showSuccessMsg(msg)
    }, [])


    function handleChange(params, value) {
        // console.log('handleChange-->', params, value)
        setstate({
            ...state,
            [params]: value
        })
    }

    function validate(params, val) {

        let valid = true
        let err = {}
        if (params === 'otp' && val?.length < 6) {
            err.otpErr = 'Enter valid 6 digit OTP'
            valid = false
            appsnackbar.showErrMsg(err.otpErr)
        }
        seterr(err)
        setTimeout(() => {
            seterr({})
        }, 4000);

        return valid

    }

    async function handleSubmit(params, val) {
        console.log('submit', params, val)
        let isValid = validate(params, val)
        if (!isValid) return

        try {
            let resp = await services._post(URL.otp_verify, {
                userName: "vinit@anssoft.in",
                otp: val,
                distKey: "TXK8vWYRPSXm08uXrZYV0g=="
            })
            console.log('otp ==>', resp.data)
            if (resp.type !== 'success') {
                //{ code: "401", verbose: "Invalid OTP" }
                return
            }
            resp = resp?.data?.success
            if (resp && resp?.code === '401') {
                props.navigation.navigate(Strings.NAVIGATION.create_profile)
                seterr({ pinErr: resp?.verbose })
                appsnackbar.showErrMsg(resp?.verbose)
                setTimeout(() => {
                    seterr({ pinErr: false })
                }, 3000);
            } else if (resp && resp?.code === '200') {
                //{"success":{"code":"200","verbose":"OTP verified"}}
                appsnackbar.showSuccessMsg(resp?.verbose)
                setTimeout(() => {
                    props.navigation.navigate(Strings.NAVIGATION.register)
                }, 2000);
            }
        } catch (error) {
            console.log('handleSubmit-->', error)
            appsnackbar.showErrMsg('Something went wrong')
        }



    }

    return (
        <View style={{ flex: 1 }}>
            <OtpUI
                {...props}
                {...state}
                {...err}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </View>
    )
}

export default OtpScreen