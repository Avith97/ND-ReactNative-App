import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
// import { hp, wp } from '../../functions/styles'
import { useSelector } from 'react-redux'
import { hp, wp } from '../../functions/dimensions'

const Loader = props => {
    const options = global.navigation?.getCurrentOptions()
    const isLoading = useSelector(state => state.settings.isLoading)
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    if (!props?.fromWebView) {
        if (typeof props?.isLoading === 'boolean') {
            if (!props?.isLoading) {
                return
            }
        }
        else if (!isLoading) {
            return
        }
    }
    return (
        <View
            style={{
                flex: 1,
                zIndex: 1,
                position: 'absolute',
                backgroundColor: `rgba(0,0,0,${props?.opacity || 0.8})`
            }}>
            <View
                style={{
                    // flex: 1,
                    width: wp('100'),
                    // height: options?.headerShown ? hp('90') : hp('100'),   //old values
                    height: options?.headerShown ? hp('94.4') : hp('100'),
                    // height: '100%',
                    justifyContent: 'center'
                }}>
                <ActivityIndicator
                    size={hp(4)}
                    color={'#9BBF05'}
                    role="progressbar"
                    style={
                        {
                            // flex: 1,
                        }
                    }
                />
            </View>
        </View>
    )
}

export default Loader
