// react native components
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

// common components
import PinCodeTextInput from '../../common/components/pincode/PinCodeTextInput'
import CustomButton from '../../common/components/buttons/CustomButton'

// constants assets & dimensions
import { hp, wp } from '../../common/functions/dimensions'
import Fonts, { fontSize } from '../../utils/constants/Fonts'
import Colors from '../../utils/constants/Colors'

// Static labels object
import { en as LABELS } from '../../utils/labels/en'
import { useSelector } from 'react-redux'

const OtpUI = props => {
  const isLoading = useSelector(state => state.settings.isLoading)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{LABELS.enterOtp}</Text>
      <Text style={{ marginBottom: hp(1) }}>{LABELS.otpSubTitle} </Text>
      <View style={{ alignItems: 'center' }}>
        <PinCodeTextInput
          value={props.pin}
          name={'otp'}
          codeLength={6}
          handleChange={props.handleChange}
          // onPinSubmit={props?.handleSubmit}
          pinErr={props.otpErr}
        />
      </View>
      <View style={{ marginVertical: hp(2) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
          <Text
            onPress={props.canResend ? props.handleResendOtp : null}
            style={{
              fontWeight: 'bold',
              textAlign: 'left',
              color: props.canResend ? Colors.otp_resent : Colors.gray_06,
              opacity: props.canResend ? 1 : 0.6
            }}>
            {LABELS.resendOtp}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'right',
              color: props.canResend ? Colors.gray_06 : Colors.otp_resent
            }}>
            {String(Math.floor(props.timer / 60)).padStart(2, '0')}:
            {String(props.timer % 60).padStart(2, '0')}
          </Text>
        </View>
        <CustomButton
          title={LABELS.submit}
          name={'submit'}
          onPress={props?.handleSubmit}
          isLoading={isLoading}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    marginBottom: 20,
    fontSize: fontSize.l,
    fontWeight: 'bold'
  },
  textInputStyle: {
    fontSize: fontSize.normal,
    elevation: 5,
    height: hp('6'),
    width: wp('90'), // Matches the text input width with the remaining space
    color: Colors.text_black
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
