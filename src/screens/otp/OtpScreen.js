//react native components
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

// common components
import OtpUI from './OtpUI'
import { appsnackbar } from '../../common/functions/snackbar_actions'

// constants strings & URL's
import { services } from '../../services/axios/services'
import { URL } from '../../utils/constants/Urls'
import Strings from '../../utils/constants/Strings'
import { store } from '../../redux/store'
import { set_user_details } from '../../redux/actions/login_action'

const OtpScreen = props => {
  const route = useRoute()

  const [state, setstate] = useState({
    otp: '',
    userId: ''
  })

  const [err, seterr] = useState({
    otpErr: false
  })

  useEffect(() => {
    let msg = route.params.message
    let userId = route.params.userId
    appsnackbar.showSuccessMsg(msg)
  }, [])

  function handleChange(params, value) {
    setstate({
      ...state,
      [params]: value
    })
  }

  function validate(params, val) {
    let valid = true
    let err = {}
    console.log('validate params', params, state.otp)

    // if (params === 'otp' && val?.length < 6) {
    if (state.otp?.length < 6) {
      err.otpErr = 'Enter valid 6 digit OTP'
      valid = false
      appsnackbar.showErrMsg(err.otpErr)
    }
    console.log('validate params', params, err)
    // seterr(err);
    // setTimeout(() => {
    //   seterr({});
    // }, 2000);

    return valid
  }

  async function handleSubmit(params, val) {
    let isValid = validate(params, val)
    // if (!isValid) return
    try {
      let syncObj = {
        otp: state.otp,
        userName: route?.params?.userName || '',
        byEmail: route?.params?.byEmail || false,
        byMobile: route?.params?.byMobile || false // { userName: "***", byEmail: true || false, byMobile:false || false }
      }

      let resp = await services._post(URL.otp_verify, syncObj) // verify otp request

      // if (resp.type !== 'success') return;

      if (resp && resp?.error_config) {
        appsnackbar.showErrMsg(resp?.error_data || resp?.verbose)
        seterr({ otpErr: resp?.verbose })
        setTimeout(() => {
          seterr({ otpErr: false })
        }, 3000)
      } else if (resp?.api_response?.status === 200) {
        // If new user, navigate to create profile screen (newUser === true)
        store.dispatch(set_user_details(resp?.api_response?.data))

        console.log('token refreshed', resp?.api_response?.data)

        services?.refreshInstance(resp?.api_response?.data?.token)
        if (resp?.api_response?.data?.newUser) {
          props.navigation.navigate(Strings.NAVIGATION.create_profile)
        } else {
          props.navigation.navigate(Strings.NAVIGATION.app, {
            isLoggedIn: true
          })
        }
      }
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <OtpUI
        {...props}
        {...state}
        {...err}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

export default OtpScreen
