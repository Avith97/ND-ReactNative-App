import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SplashUI from './SplashUI'
import Strings from '../../utils/constants/Strings'

const SplashScreen = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.replace(Strings.NAVIGATION.auth)
        }, 5000)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <SplashUI />
        </View>
    )
}

export default SplashScreen