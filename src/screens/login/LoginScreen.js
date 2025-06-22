//React Native Imports
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

//  common functions
import { appsnackbar } from '../../common/functions/snackbar_actions'

//  Constants string
import Strings from '../../utils/constants/Strings'

// UI Components
import LoginUI from './LoginUI'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { services } from '../../services/axios/services'

const LoginScreen = props => {
  const [state, setstate] = useState({
    userId: null
  })

  const [err, seterr] = useState(null)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '752736423968-qp92tlhrt89ukonb3o6chfvkrbvnjt46.apps.googleusercontent.com',
      // webClientId: '308570200209-egcv1h57uud5vk5fp6inan6js3gtjoo0.apps.googleusercontent.com', // required for web & Android
      offlineAccess: true // if you need to get refreshToken
    })
  }, [])

  async function handleChange(params, val) {
    setstate({
      ...state,
      [params]: val
    })
  }

  function validate(params) {
    let err = {}
    let isValid = true
    if (!state.userId) {
      isValid = false
      err = { userIdErr: true }
      console.log('invalid')
      appsnackbar.showErrMsg('Please enter valid email or mobile number')
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
    }
  }

  async function handleSubmit(params) {
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
      console.log('User Info:', userInfo)
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

  async function performLogin(params) {
    let syncObj = {
      firstName: params.user.givenName,
      lastName: params.user.familyName,
      email: params.user.email,
      sourceUniqueId: params.user.id, //check
      signinSource: 'GOOGLE',
      signinToken: params.idToken,
      profilePicLink: params.user.photo
    }

    // Create FormData
    const formData = new FormData()
    formData.append('userRequest', JSON.stringify(syncObj))
    formData.append('profilePicture', syncObj.profilePicLink)

    let resp = await services._postFormData('signup', formData)
    console.log('google login --->', resp)
  }

  return (
    <View style={{ flex: 1 }}>
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
