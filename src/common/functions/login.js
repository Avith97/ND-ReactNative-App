import AsyncStore from '../../data/async/AsyncStore'
import {
  login_action,
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
