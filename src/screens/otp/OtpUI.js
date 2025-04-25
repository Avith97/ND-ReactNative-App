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
        <View style={styles.container}>
               <Text style={styles.title}>Enter OTP</Text>
           
                
                   
                    <View style={{alignItems:"center"}}>
                        {/* <Text style={{ marginBottom: hp(1.4) }}>Enter OTP for Authentication </Text> */}
                        <PinCodeTextInput
                            value={props.pin}
                            name={'otp'}
                            codeLength={6}
                            handleChange={props.handleChange}
                            onPinSubmit={props?.handleSubmit}
                            pinErr={props.otpErr}
                        />
                    </View>

                    <View style={{marginVertical:hp(2)}}>
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
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#fff"
    },
    title: {
        marginBottom: 20,
        fontSize: fontSize.l,
        fontWeight: 'bold',
      },
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
        width: wp('90'),
        marginVertical: hp(2)
    },
    btnTextStyle: {
        color: 'white'
    }
})

export default OtpUI