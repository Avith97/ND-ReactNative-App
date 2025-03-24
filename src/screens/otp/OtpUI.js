import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import CustomImageBackground from '../../common/components/background/CustomImageBackground'
import { hp, wp } from '../../common/functions/dimensions'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import CustomButton from '../../common/components/buttons/CustomButton'
import CustomTextInput from '../../common/components/textInput/CustomTextInput'
import Colors from '../../utils/constants/Colors'
import PinCodeTextInput from '../../common/components/pincode/PinCodeTextInput'


const OtpUI = (props) => {

    return (
        <View style={{ flex: 1 }}>
            <CustomImageBackground>
                {/* <Text>Login UI</Text> */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)', width: wp(100) }}>
                    <View style={{
                        width: wp(45),
                        height: hp(18),
                        // backgroundColor: 'pink',
                        marginBottom: hp(2),
                        top: -hp(22)
                    }}>
                        <Image
                            source={{ uri: 'https://events.necessarydevil.com/Org_logo/Interface.png' }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{ top: -hp(10) }}>
                        <Text style={{ marginBottom: hp(1.4) }}>Please Enter your OTP </Text>
                        <PinCodeTextInput
                            value={props.pin}
                            name={'otp'}
                            codeLength={6}
                            handleChange={props.handleChange}
                            onPinSubmit={props?.handleSubmit}
                            pinErr={props.pinErr}
                        />
                    </View>

                    <View style={{ top: -hp(5) }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Resend OTP</Text>
                        <CustomButton
                            title={'Submit'}
                            name={'submit'}
                            onPress={props?.handleSubmit}
                            // isLoading={store.getState().settings.isLoading}
                            btnStyles={styles.btnStyles}
                            btnTitleStyles={{
                                ...styles.textStyle,
                                ...styles.btnTextStyle
                            }}
                        />
                    </View>
                </View>
            </CustomImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        fontSize: fontSize.normal,
        elevation: 5,
        height: hp('6'),
        width: wp('90'), // Matches the text input width with the remaining space
        color: Colors.text_black,
    },
    textStyle: {
        fontSize: fontSize.normal,
        fontFamily: Fonts.medium,
        color: 'black'
    },
    btnStyles: {
        width: wp('57'),
        marginVertical: hp(2)
    },
    btnTextStyle: {
        color: 'white'
    }
})

export default OtpUI