// react native components
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

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

  // useEffect(() => {
  // console.log('re-render', props?.timer)
  // }, [props?.timer])

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
        <ResendOtp {...props} />
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

const ResendOtp = props => {
  const timerValue = 30

  const [timer, setTimer] = useState(timerValue)
  const [canResend, setCanResend] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const startTimer = () => {
    if (timerRef.current) return // prevent multiple intervals

    const duration = timerValue // seconds
    let timeLeft = duration
    setTimer(timeLeft)
    setCanResend(false)
    timerRef.current = setInterval(() => {
      timeLeft -= 1
      setTimer(timeLeft)

      if (timeLeft <= 0) {
        setCanResend(true)
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }, 1000)
  }

  async function handleResend(params) {
    if (canResend) {
      props.handleResendOtp()
      startTimer()
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
      <Text
        onPress={handleResend}
        style={{
          fontWeight: 'bold',
          textAlign: 'left',
          color: canResend ? Colors.otp_resent : Colors.gray_06,
          opacity: canResend ? 1 : 0.6
        }}>
        {LABELS.resendOtp}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          textAlign: 'right',
          color: canResend ? Colors.gray_06 : Colors.otp_resent
        }}>
        {String(Math.floor(timer / 60)).padStart(2, '0')}:
        {String(timer % 60).padStart(2, '0')}
      </Text>
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
