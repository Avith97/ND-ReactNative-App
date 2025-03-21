import { View, Text } from 'react-native'
import React, { useState } from 'react'
import OtpUI from './OtpUI'

const OtpScreen = (props) => {
    const [state, setstate] = useState({
        pin: ''
    })

    const [err, seterr] = useState({
        pinErr: false
    })

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