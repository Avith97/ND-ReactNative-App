import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import OtpUI from './OtpUI'
import { useRoute } from '@react-navigation/native'
import { appsnackbar } from '../../common/functions/snackbar_actions'

const OtpScreen = (props) => {
    const route = useRoute()
    const [state, setstate] = useState({
        pin: ''
    })

    const [err, seterr] = useState({
        pinErr: false
    })

    useEffect(() => {
        let msg = route.params.message
        appsnackbar.showSuccessMsg(msg)
    }, [])


    function handleChange(params, value) {
        // console.log('handleChange-->', params, value)
        setstate({
            ...state,
            [params]: value
        })
    }

    async function handleSubmit(params, val) {
        seterr({
            pinErr: true
        })
        console.log('submit', params, val)
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