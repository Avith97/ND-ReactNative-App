import { View, Text, Linking } from 'react-native'
import React, { useEffect } from 'react'
import SplashUI from './SplashUI'
import Strings from '../../utils/constants/Strings'
import { appsnackbar } from '../../common/functions/snackbar_actions'

const SplashScreen = (props) => {
    useEffect(() => {
        checkAppLaunch()
        setTimeout(() => {
            props.navigation.replace(Strings.NAVIGATION.auth)
        }, 5000)
        return () => {
            Linking.removeAllListeners('url')
        }
    }, [])



    async function checkAppLaunch(params) {

        // getdevice()
        let x = await Linking.getInitialURL()
        if (x) {
            console.log('<==== new console ====>', x)
            appsnackbar.showSuccessMsg(`${x}\nApp open from link`)
        }

        Linking.addEventListener('url', (e) => {
            console.log('token from appA -->', e)
            // setTimeout(() => {
            appsnackbar.showSuccessMsg(`${e.url}\nApp open from link`)
            // }, 6000);
            //   Linking.openURL(`dummyApp://token${`newtoken123`}`)
            // Linking.openURL(`dummyApp://token${`newtoken123`}`)

        })
    }

    return (
        <View style={{ flex: 1 }}>
            <SplashUI />
        </View>
    )
}

export default SplashScreen