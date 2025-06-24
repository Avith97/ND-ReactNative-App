import AsyncStore from '../../data/async/AsyncStore'
import {
  login_action,
  logout_action,
  set_user_details
} from '../../redux/actions/login_action'
import { store } from '../../redux/store'
import Strings from '../../utils/constants/Strings'

export const perform_login = async (auth, user, restore_offline) => {
  console.log('before write --->', auth, '\n', user)
  if (!restore_offline) {
    AsyncStore.setData(Strings.ASYNC_KEY.offline, { auth: auth, user: user })
  }
  auth && store.dispatch(login_action(auth))
  user && store.dispatch(set_user_details(user))
}

export const perform_logout = async (auth, user, restore_offline) => {
  console.log('perform logout')
  try {
    store.dispatch(logout_action())
    AsyncStore.clearData(Strings.ASYNC_KEY.offline)
    global.navigation.reset({
      index: 0,
      routes: [
        {
          name: Strings.NAVIGATION.auth
        }
      ]
    })
  } catch (error) {
    console.log('perform logout', error)
  }
}
