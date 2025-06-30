//React Native Imports
import React, { useEffect, useRef, useState } from 'react'
import { Alert, View } from 'react-native'

//  common functions
import { appsnackbar } from '../../common/functions/snackbar_actions'

//  Constants string
import Strings from '../../utils/constants/Strings'

// UI Components
import LoginUI from './LoginUI'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { services } from '../../services/axios/services'

import { en as labels } from '../../utils/labels/en'
import { perform_login } from '../../common/functions/login'
import ToastModal from '../../common/components/Modal/ToastModal'
import UpdateForm from './UpdateForm'
import moment from 'moment'
import { URL } from '../../utils/constants/Urls'
import { TemplateService } from '../../services/templates/TemplateService'
import { store } from '../../redux/store'
import actions from '../../redux/action_types/actions'
import { useSelector } from 'react-redux'

const LoginScreen = props => {
  const [state, setState] = useState({
    userId: null,
    email: null,
    country: null,
    dob: null,
    gender: null
  })

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const eventData = useSelector(state => state?.eventData)

  const actionRef = useRef(null)

  const [err, seterr] = useState(null)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '752736423968-qp92tlhrt89ukonb3o6chfvkrbvnjt46.apps.googleusercontent.com',
      // webClientId: '308570200209-egcv1h57uud5vk5fp6inan6js3gtjoo0.apps.googleusercontent.com', // required for web & Android
      offlineAccess: true // if you need to get refreshToken
    })
  }, [])

  // useEffect(() => {
  //   console.log('eventData', eventData)
  // }, [eventData])

  async function handleChange(params, val) {
    // console.log(params, val)

    setState({
      ...state,
      [params]: val
    })
  }

  function validate(params) {
    let err = {}
    let isValid = true
    if (!state.country?.label?.trim()?.length) {
      isValid = false
      err = { countryErr: true }
      appsnackbar.showErrMsg('Please select country')
    } else if (!state.gender?.label?.trim()?.length) {
      isValid = false
      err = { countryErr: true }
      appsnackbar.showErrMsg('Please select country')
    } else if (!state.dob) {
      isValid = false
      err = { dobErr: true }
      appsnackbar.showErrMsg('Please select date of birth')
    }

    seterr(err)
    setTimeout(() => {
      seterr(null)
    }, 1000 * 5)

    return isValid
  }

  const handleNavigate = async route => {
    const isSignup = route === 'signup'

    if (route === 'signup' || route === 'login') {
      props.navigation.navigate(Strings.NAVIGATION.signup, {
        isSignup: isSignup
      })
    } else {
      if (isLoggedIn) {
        props.navigation.replace(Strings.NAVIGATION.app, route)
      } else {
        props.navigation.replace(Strings.NAVIGATION.app, route)
      }
    }
  }

  async function handleSubmit(params) {
    let syncObj = {
      firstName: state?.firstName,
      lastName: state?.lastName,
      email: state?.email,
      country: state?.country?.label,
      countryCode: state?.country?.value,
      gender: state?.gender?.value,
      dob: moment(state?.dob).format('DD-MM-yyyy')
    }

    let url = TemplateService._userId(URL.update_profile, state?.userId)

    let resp = await services._put(url, syncObj)

    if (resp?.type === 'success') {
      // if event data then goes to start page
    } else {
    }

    //  country: formState?.country?.label,
    //         countryCode: formState?.country?.value,
    //         gender: formState?.gender?.value,
    //         dob: moment(formState.dob).format('DD-MM-yyyy')

    // console.log(syncObj)

    // console.log(':submitting')

    return
    if (params === 'signup') {
      props.navigation.navigate(Strings.NAVIGATION.signup)
      return
    }
    props.navigation.navigate(Strings.NAVIGATION.signup)

    let isValid = validate()
    if (!isValid) return

    // console.log(state)
  }

  async function signUpWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      // console.log('User Info:', userInfo)
      if (userInfo?.type === 'success') {
        await performLogin(userInfo?.data)
      } else {
        appsnackbar.showErrMsg('Something went wrong !!!')
      }

      // You can now send userInfo.idToken or userInfo.user to your backend
    } catch (error) {
      console.error('Google Sign-in error', error)
      Alert.alert('Login failed', error.message)
    }
  }

  async function fetchEventDetails(distKey) {
    let resp = await services._get('event', {
      headers: {
        distKey: encodeURIComponent(distKey),
        timezone: 'Asia/Calcutta'
      }
    })

    if (resp.type !== 'success') {
      appsnackbar.showErrMsg('Something went wrong!Please try again')
      handleNavigate()
      return
    }
    store.dispatch({
      type: actions.SET_EVENT_DETAILS,
      // payload: resp?.data  // hide it because of data parsing like eventData?.program?.id
      payload: resp?.data
    })
    return resp?.data
  }

  async function performLogin(params) {
    let syncObj = {
      firstName: params.user.givenName,
      lastName: params.user.familyName,
      email: params.user.email,
      sourceUniqueId: params.user.id, //check
      signinSource: 'GOOGLE',
      signinToken: params.idToken,
      profilePicLink: params.user.photo,
      fcmToken: global.fcm_token,
      deviceId: null
    }

    // Create FormData
    const formData = new FormData()
    formData.append('userRequest', JSON.stringify(syncObj))
    formData.append('profilePicture', syncObj.profilePicLink)
    // console.log(global?.distKey, '')

    let eventData
    if (global?.distKey) {
      eventData = await fetchEventDetails(global?.distKey)
      // console.log('eventdata', eventData)
    }

    let resp = await services._postFormData('signup', formData)
    // console.log('google login --->', resp.data)

    if (resp?.type !== 'success') {
      appsnackbar.showErrMsg(labels.some_thing_went_wrong)
      return
    }

    // setState({
    //   ...state,
    //   email: resp.data?.email,
    //   userId: resp.data?.runnerId || resp?.data?.id,
    //   firstName: resp?.data?.firstName,
    //   lastName: resp?.data?.lastName
    // })
    await set_data_storage(resp?.data)
    if (resp?.data?.newUser) {
      // showActionItem()
      handleNavigate({
        screen: Strings.NAVIGATION.complete_profile,
        params: { InCompleteGoogleResponse: resp.data }
      })
    } else {
      // props?.navigation.replace(Strings.NAVIGATION?.app
      let isEventPresent = !!eventData?.id
      if (isEventPresent) {
        handleNavigate({
          screen: Strings.NAVIGATION.eventstarted
        })
      } else {
        handleNavigate()
      }
    }

    return resp?.data

    //replace
  }

  async function data_separation(data) {
    let auth = {
      token: data?.token,
      isLoggedIn: true,
      contactNumber: data?.contactNumber,
      email: data?.email,
      user_id: data?.id,
      runnerId: data?.runnerId,
      isAuthorized: data?.isAuthorized
    }
    return auth
  }

  async function set_data_storage(data) {
    // use to set data in storage
    // console.log('testing the offline =====', data)

    services?.refreshInstance(data?.token)
    const auth = await data_separation(data)
    await perform_login(auth, (user = { ...data }))
  }

  const showActionItem = () => {
    actionRef?.current?.show?.({
      // data: mockRequests,
      timeout: 1000 * 100
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <ToastModal ref={actionRef}>
        <UpdateForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          {...state}
        />
      </ToastModal>
      <LoginUI
        {...props}
        {...state}
        handleChange={handleChange}
        handleNavigate={handleNavigate}
        handleSubmit={handleSubmit}
        signUpWithGoogle={signUpWithGoogle}
      />
    </View>
  )
}

export default LoginScreen
