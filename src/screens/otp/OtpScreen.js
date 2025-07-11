//react native components
import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'

// common components
import OtpUI from './OtpUI'
import { appsnackbar } from '../../common/functions/snackbar_actions'

// constants strings & URL's
import { services } from '../../services/axios/services'
import { URL } from '../../utils/constants/Urls'
import Strings from '../../utils/constants/Strings'
import { store } from '../../redux/store'
import {
  login_action,
  set_user_details
} from '../../redux/actions/login_action'
import { perform_login } from '../../common/functions/login'
import { useSelector } from 'react-redux'

const OtpScreen = props => {
  const route = useRoute()

  let eventData = useSelector(store => store.eventData)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

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

    // if (params === 'otp' && val?.length < 6) {
    if (state.otp?.length < 6) {
      err.otpErr = 'Enter valid 6 digit OTP'
      valid = false
      appsnackbar.showErrMsg(err.otpErr)
    }
    // seterr(err);
    // setTimeout(() => {
    //   seterr({});
    // }, 2000);

    return valid
  }

  const handleResendOtp = async () => {
    try {
      let resendObj = {
        userName: route?.params?.userName || '',
        byEmail: route?.params?.byEmail || false,
        byMobile: route?.params?.byMobile || false
      }

      let resp = await services._post(URL.otp, resendObj) // send otp request

      if (resp.type !== 'success') return
      if (resp.data.success.code === '200') {
        props.navigation.navigate(Strings.NAVIGATION.otp, {
          ...resendObj,
          message: resp?.data?.success?.verbose
        })
      }
    } catch (error) {
      console.log('sent otp request error -->', error)
      appsnackbar.showErrMsg('Something went wrong, please try again later.')
    }
  }

  async function handleSubmit(params, val) {
    let isValid = validate(params, val)
    if (!isValid) return
    try {
      let syncObj = {
        otp: state.otp,
        userName: route?.params?.userName || '',
        byEmail: route?.params?.byEmail || false,
        byMobile: route?.params?.byMobile || false, // { userName: "***", byEmail: true || false, byMobile:false || false }
        fcmToken: global.fcm_token,
        deviceId: null
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
        // store.dispatch(set_user_details(resp?.api_response?.data))
        // services?.refreshInstance(resp?.api_response?.data?.token)
        // return

        // checking event data is present or not
        const isEventPresent = !!eventData?.id
        if (resp?.api_response?.data?.newUser) {
          props.navigation.replace(Strings.NAVIGATION.create_profile, {
            userName: route?.params?.userName,
            byEmail: route?.params?.byEmail || false,
            byMobile: route?.params?.byMobile || false
          })
        } else {
          await set_data_storage(resp?.api_response?.data)
          if (isEventPresent) {
            handleNavigate({
              screen: Strings.NAVIGATION.eventstarted
            })
          } else {
            props.navigation.replace(Strings.NAVIGATION.app, {
              isLoggedIn: true
            })
          }
        }
      }
    } catch (error) {
      appsnackbar.showErrMsg('Something went wrong')
    }
  }

  async function data_separation(data) {
    let auth = {
      token: data?.token,
      isLoggedIn: true,
      contactNumber: data?.contactNumber,
      email: data?.email,
      user_id: data?.id,
      runnerId: data?.runnerId,
      isAuthorized: data?.isAuthorized,
      googleSource: false
    }
    return auth
  }

  async function set_data_storage(data) {
    // use to set data in storage
    services?.refreshInstance(data?.token)
    const auth = await data_separation(data)
    await perform_login(auth, (user = { ...data }))
  }

  function handleNavigate(params) {
    if (isLoggedIn) {
      props.navigation.replace(Strings.NAVIGATION.app, params)
    } else {
      props.navigation.replace(Strings.NAVIGATION.app, { isLoggedIn: true })
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
        handleResendOtp={handleResendOtp}
      />
    </View>
  )
}

export default OtpScreen
