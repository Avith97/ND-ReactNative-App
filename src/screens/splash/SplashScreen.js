import { View, Text, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashUI from './SplashUI'
import Strings from '../../utils/constants/Strings'
import { appsnackbar } from '../../common/functions/snackbar_actions'
import { useSelector } from 'react-redux'
import { services } from '../../services/axios/services'
import { URL } from '../../utils/constants/Urls'
import { store } from '../../redux/store'
import actions from '../../redux/action_types/actions'

const SplashScreen = props => {
  const [state, setState] = useState({
    isLoggedIn: false
  })

  // useEffect(() => {
  //   checkAppLaunch()
  //   setTimeout(() => {
  //     if (!state.isLoggedIn) {
  //       // props.navigation.replace(Strings.NAVIGATION.app, {
  //       //   isLoggedIn:false,
  //       // });
  //     }
  //     // props.navigation.replace(Strings.NAVIGATION.auth)
  //   }, 5000)
  //   return () => {
  //     console.log('first unmount')
  //     Linking.removeAllListeners('url')
  //   }
  // }, [])

  const isInitiating = useSelector(state => state.settings.isInitiating)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    console.log('user login status ---->', isLoggedIn)
    if (!isInitiating) {
      handleDeepLink()
    }
  }, [isInitiating])

  // useEffect(() => {
  //   console.log('user login status ---->', isLoggedIn)
  //   if (!isInitiating) {
  //     if (isLoggedIn) {
  //       props.navigation.replace(Strings.NAVIGATION.app)
  //     } else {
  //       props.navigation.replace(Strings.NAVIGATION.auth)
  //     }
  //   }
  // }, [isInitiating])

  // useEffect(() => {
  //   const linkListener = Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     linkListener.remove();
  //   };
  // }, []);

  async function fetchEventDetails(distKey) {
    let resp = await services._get('event', {
      headers: {
        distKey: encodeURIComponent(distKey),
        timezone: 'Asia/Calcutta'
      }
    })

    if (resp.type !== 'success') {
      appsnackbar.showErrMsg('Something went wrong!Please try again')
      return
    }
    store.dispatch({
      type: actions.SET_EVENT_DETAILS,
      payload: resp?.data
    })
    return resp?.data
  }

  async function handleDeepLink() {
    let url = await Linking.getInitialURL()
    console.log('deeplink', url)

    if (url) {
      try {
        const match = url.match(/distKey=([^&]+)/)
        const distKey = match && decodeURIComponent(match[1])
        console.log('executed distKey ------>', distKey)
        // appsnackbar.showSuccessMsg(`${url}\nApp open from link`)
        let event_details = await fetchEventDetails(distKey)
        if (event_details) {
          //check for registered /unregistered user
          handleNavigate({
            screen: Strings.NAVIGATION.eventstarted
          })
        }
      } catch (error) {
        console.log('deeplink error --->', error)
      }
    } else {
      handleNavigate()
    }
  }

  function handleNavigate(params) {
    if (isLoggedIn) {
      props.navigation.replace(Strings.NAVIGATION.app, params)
    } else {
      props.navigation.replace(Strings.NAVIGATION.auth)
    }
  }

  // async function checkAppLaunch(params) {
  //   try {
  //     // getdevice()
  // let x = await Linking.getInitialURL()
  // if (x) {
  //   console.log('<==== new console ====>', x)
  //   appsnackbar.showSuccessMsg(`${x}\nApp open from link`)
  // }

  //     Linking.addEventListener('url', e => {
  //       console.log('token from appA -->', e)
  //       // setTimeout(() => {
  //       appsnackbar.showSuccessMsg(`${e.url}\nApp open from link`)
  //       // }, 6000);
  //       //   Linking.openURL(`dummyApp://token${`newtoken123`}`)
  //       // Linking.openURL(`dummyApp://token${`newtoken123`}`)
  //     })
  //   } catch (e) {
  //     console.log('error --->', e)
  //   }
  // }

  return (
    <View style={{ flex: 1 }}>
      <SplashUI />
    </View>
  )
}

export default SplashScreen
