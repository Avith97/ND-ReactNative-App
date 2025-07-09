import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStore from '../../data/async/AsyncStore'
import {
  login_action,
  logout_action,
  set_user_details
} from '../../redux/actions/login_action'
import { store } from '../../redux/store'
import { services } from '../../services/axios/services'
import Strings from '../../utils/constants/Strings'
import actions from '../../redux/action_types/actions'

// GoogleSignin.configure({
//   webClientId:
//     '752736423968-qp92tlhrt89ukonb3o6chfvkrbvnjt46.apps.googleusercontent.com',
//   // webClientId: '308570200209-egcv1h57uud5vk5fp6inan6js3gtjoo0.apps.googleusercontent.com', // required for web & Android
//   offlineAccess: true, // if you need to get refreshToken
//   forceCodeForRefreshToken: true // Optional, depending on your use case
// })

export const perform_login = async (auth, user, restore_offline) => {
  services.refreshInstance(auth.token)
  if (!restore_offline) {
    AsyncStore.setData(Strings.ASYNC_KEY.offline, { auth: auth, user: user })
  }
  auth && store.dispatch(login_action(auth))
  user && store.dispatch(set_user_details(user))
}

export const perform_logout = async () => {
  let auth = store.getState().auth

  try {
    await AsyncStore.clearData(Strings.ASYNC_KEY.offline)

    store.dispatch(logout_action())
    store.dispatch({
      type: actions.SET_EVENT_DETAILS,
      // payload: resp?.data  // hide it because of data parsing like eventData?.program?.id
      payload: null
    })
    global.distKey = null

    global.navigation.reset({
      index: 0,
      routes: [{ name: Strings.NAVIGATION.auth }]
    })
  } catch (error) {
    console.log('perform_logout error:', error)
  }
}
