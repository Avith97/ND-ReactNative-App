import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageBackground from '../../common/components/background/CustomImageBackground'
import { hp, wp } from '../../common/functions/dimensions'
import CustomTextInput from '../../common/components/textInput/CustomTextInput'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'
import CustomButton from '../../common/components/buttons/CustomButton'
import { store } from '../../redux/store'
import { Images } from '../../utils/constants/Images'
import { iconType } from '../../assets/icons/Icons'

const LoginUI = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <CustomImageBackground>
                {/* <Text>Login UI</Text> */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: wp(45),
                        height: hp(18),
                        // backgroundColor: 'pink',
                        marginBottom: hp(2),
                        top: -hp(6)
                    }}>
                        <Image
                            source={{ uri: 'https://events.necessarydevil.com/Org_logo/Interface.png' }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode='contain'
                        />
                    </View>
                    <View>
                        <CustomTextInput
                            name={'userId'}
                            inputStyle={{ ...styles.textInputStyle }}
                            onChangeText={props?.handleChange}
                            inputProps={{
                                // flex: 1,
                                value: props.userId,
                                placeholder: 'Email or Mobile',
                            }}
                        />
                    </View>
                    <View >
                        <CustomButton
                            title={'Login using OTP'}
                            name={'getOtp'}
                            onPress={props?.handleSubmit}
                            // isLoading={store.getState().settings.isLoading}
                            btnStyles={styles.btnStyles}
                            btnTitleStyles={{
                                ...styles.textStyle,
                                ...styles.btnTextStyle
                            }}
                        />
                        <Text style={{ fontSize: fontSize.s, textAlign: 'center' }}>or</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: hp(1) }}>
                        <Text style={{ fontSize: fontSize.normal, textAlign: 'center' }}>New User? </Text>
                        <Text
                            onPress={() => props.handleSubmit('signup')}
                            style={{ fontSize: fontSize.normal, color: Colors.color1 }}
                        >
                            Sign-Up
                        </Text>
                    </View>
                    <Text style={{ fontSize: fontSize.s, textAlign: 'center', marginVertical: hp(1) }}>or</Text>
                    <View>
                        <CustomButton
                            title={'Sign in With Google'}
                            name={'sign_in_google'}
                            onPress={props?.handleSubmit}
                            // isLoading={store.getState().settings.isLoading}
                            btnStyles={{ ...styles.btnStyles, elevation: 5, backgroundColor: Colors.smoky_white, borderRadius: 2 }}
                            btnTitleStyles={{
                                ...styles.textStyle,
                                marginLeft: wp(5)
                            }}
                            leftImg={{
                                source: Images.google_logo,
                                style: {
                                    height: hp(3),
                                    width: wp(6),
                                }
                            }}
                        />
                    </View>
                    <View>
                        <CustomButton
                            title={'Help Videos'}
                            name={'videos'}
                            onPress={props?.handleSubmit}
                            // isLoading={store.getState().settings.isLoading}
                            btnStyles={{ ...styles.btnStyles, elevation: 5, backgroundColor: Colors.smoky_white, borderRadius: 2 }}
                            btnTitleStyles={{
                                ...styles.textStyle,
                                marginLeft: wp(2.5)
                            }}
                            leftIcon={{
                                type: iconType.materialCommunity,
                                name: 'youtube',
                                size: fontSize.l,
                                color: Colors.red
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

export default LoginUI