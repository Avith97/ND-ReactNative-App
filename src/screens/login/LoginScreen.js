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

const LoginScreen = props => {
  const [state, setstate] = useState({
    userId: null
  })

  const [err, seterr] = useState(null)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '308570200209-egcv1h57uud5vk5fp6inan6js3gtjoo0.apps.googleusercontent.com', // required for web & Android
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
      // You can now send userInfo.idToken or userInfo.user to your backend
    } catch (error) {
      console.error('Google Sign-in error', error)
      Alert.alert('Login failed', error.message)
    }
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
