import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import { Images } from '../../utils/constants/Images'
import CustomImageBackground from '../../common/components/background/CustomImageBackground'
import Colors from '../../utils/constants/Colors'
import InfiniteProgressBar from '../../common/components/progressbar/InfiniteProgressBar'
import { hp, wp } from '../../common/functions/dimensions'

const SplashUI = (props) => {
    return (
        <>
            <StatusBar
                backgroundColor={Colors.background_transperant_dark}
                networkActivityIndicatorVisible={false}
                // hidden
                translucent={true}
                barStyle="light-content"
            />
            <CustomImageBackground
                source={Images.walking}
                style={{ backgroundColor: 'rgba(0,0,0,1)' }}
            >
                <View style={{
                    position: 'absolute',
                    bottom: hp(3),
                }}>
                    <InfiniteProgressBar />
                </View>
            </CustomImageBackground> 
        </>
    )
}

export default SplashUI