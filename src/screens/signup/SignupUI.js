import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import CustomImageBackground from '../../common/components/background/CustomImageBackground'
import { hp, wp } from '../../common/functions/dimensions'
import CustomButton from '../../common/components/buttons/CustomButton'
import CustomTextInput from '../../common/components/textInput/CustomTextInput'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'

const SignupUI = (props) => {
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
                        top: -hp(22)
                    }}>
                        <Image
                            source={{ uri: 'https://events.necessarydevil.com/Org_logo/Interface.png' }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode='contain'
                            progressiveRenderingEnabled
                            // loadingIndicatorSource={require('../../assets/images/loading.gif')}
                        />
                    </View>
                    <View style={{ top: -hp(10) }}>
                        <CustomTextInput
                            name={'userId'}
                            inputStyle={{ ...styles.textInputStyle }}
                            onChangeText={props?.handleChange}
                            inputProps={{
                                // flex: 1,
                                editable: props.showOtp ? false : true,
                                value: props.userId,
                                placeholder: 'Email or Mobile',
                            }}
                        />
                    </View>
                    <View style={{ top: -hp(8) }}>
                        {!props.showOtp &&
                            <CustomButton
                                title={'Check'}
                                name={'signup'}
                                onPress={props?.handleSubmit}
                                // isLoading={store.getState().settings.isLoading}
                                btnStyles={styles.btnStyles}
                                btnTitleStyles={{
                                    ...styles.textStyle,
                                    ...styles.btnTextStyle
                                }}
                            />
                        }
                        {props.showOtp &&
                            <CustomButton
                                title={'Change'}
                                name={'change'}
                                onPress={props?.handleChange}
                                // isLoading={store.getState().settings.isLoading}
                                btnStyles={styles.btnStyles}
                                btnTitleStyles={{
                                    ...styles.textStyle,
                                    ...styles.btnTextStyle
                                }}
                            />
                        }
                        {props.showOtp &&
                            <CustomButton
                                title={'Send OTP'}
                                name={'otp'}
                                onPress={props?.handleSubmit}
                                // isLoading={store.getState().settings.isLoading}
                                btnStyles={styles.btnStyles}
                                btnTitleStyles={{
                                    ...styles.textStyle,
                                    ...styles.btnTextStyle
                                }}
                            />
                        }
                    </View>
                </View>
                {/* <View style={{ bottom: hp(1), position: 'absolute' }}>
                    <CustomButton
                        title={'otp'}
                        name={'otp'}
                        onPress={props?.handleSubmit}
                        // isLoading={store.getState().settings.isLoading}
                        btnStyles={styles.btnStyles}
                        btnTitleStyles={{
                            ...styles.textStyle,
                            ...styles.btnTextStyle
                        }}
                    />
                </View> */}
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

export default SignupUI